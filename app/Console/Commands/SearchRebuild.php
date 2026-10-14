<?php

namespace App\Console\Commands;

use App\Models\Shop\Goods;
use App\Services\{GoodsAttr, GoodsElasticSearch};
use Illuminate\Console\Command;

//  검색 인덱스 새로 만들기 (복구용) - ES 서버를 새로 깔았거나 인덱스가 망가졌을 때만 씀
//  ① 동의어 세트 (없을 때만 - 관리자 동의어 화면 [txt 내려받기] 파일로)  ② 인덱스 (설정·구조는 아래 settings·mappings)
//  ③ DB의 상품 전체 넣기 (scout:import - 규격 칸·속성 칸 포함)  ④ 인기도 점수 (search:update-score)
//  --check: 아무것도 바꾸지 않고 이 명령의 설정·구조가 지금 운영 인덱스와 같은지만 비교
class SearchRebuild extends Command {
    protected $signature   = 'search:rebuild
                                {--check : 지금 인덱스와 설정·구조 비교만 (바꾸지 않음)}
                                {--synonyms= : 동의어 세트가 없을 때 넣을 txt (관리자 동의어 화면 [txt 내려받기])}
                                {--force : 인덱스가 이미 있어도 지우고 다시 만들기 (다 만들 때까지 손님 검색 안 됨)}';
    protected $description = '검색 인덱스 새로 만들기 (복구용) - 동의어 세트·설정·상품 전체·인기도';

    public function handle() {
        $index   = GoodsElasticSearch::INDEX;
        $indices = app(\Elastic\Elasticsearch\Client::class)->indices();

        if ($this->option('check'))
            return $this->check($indices, $index);

        //  1. 동의어 세트 - 인덱스 분석기가 이 세트를 읽으므로 먼저 있어야 함
        if (!$this->synonyms())
            return 1;

        //  2. 인덱스
        if ($indices->exists(['index' => $index])->asBool()) {
            if (!$this->option('force')) {
                $this->error("{$index}가 이미 있습니다. 정말 다시 만들려면 --force (다 만들 때까지 손님 검색이 안 됨)");
                return 1;
            }
            if (!$this->confirm("{$index}를 지우고 다시 만듭니다. 상품을 다 넣을 때까지 손님 검색이 안 됩니다. 계속할까요?"))
                return 1;
            $indices->delete(['index' => $index]);
            $this->info("기존 {$index} 삭제");
        }
        $indices->create(['index' => $index, 'body' => ['settings' => self::settings(), 'mappings' => self::mappings()]]);
        $this->info("{$index} 생성");

        //  3. 상품 전체 (삭제 상품 포함 - 관리자 삭제상품 조회용, config/scout.php soft_delete)
        if ($this->call('scout:import', ['model' => Goods::class]) !== 0) {
            $this->error('상품 넣기 실패 - 인기도 점수는 건너뜀');
            \Log::error("search:rebuild - {$index} 상품 넣기 실패");
            return 1;
        }

        //  4. 인기도 점수 (새 인덱스라 0점으로 들어갔음)
        $this->call('search:update-score');

        \Log::info("search:rebuild - {$index} 새로 만들기 완료");
        $this->info('완료');
        return 0;
    }

    //  동의어 세트가 없으면 txt 파일로 넣음 - 있으면 그대로 씀
    protected function synonyms(): bool {
        $set = GoodsElasticSearch::SYNONYM_SET;
        $es  = GoodsElasticSearch::http();
        if ($es->get("/_synonyms/{$set}", ['size' => 1])->successful()) {
            $this->info("동의어 세트 {$set}: 있음 (그대로 씀)");
            return true;
        }

        $file = (string) $this->option('synonyms');
        if (!is_file($file)) {
            $this->error("동의어 세트 {$set}가 없습니다. 관리자 동의어 화면에서 내려받은 txt를 --synonyms=파일 로 지정하세요");
            return false;
        }
        $rules = collect(file($file, FILE_IGNORE_NEW_LINES))
            ->map(fn($l) => trim($l))->filter(fn($l) => $l !== '' && $l[0] !== '#')->unique()->values();
        $res = $es->put("/_synonyms/{$set}", ['synonyms_set' => $rules->map(fn($r) => ['id' => md5($r), 'synonyms' => $r])->all()]);
        if (!$res->successful()) {
            $this->error('동의어 세트 저장 실패: ' . $res->body());
            return false;
        }
        $this->info("동의어 세트 {$set}: {$rules->count()}줄 넣음");
        return true;
    }

    //  지금 인덱스와 비교 - ES가 돌려주는 값은 글자라서 모두 글자로 펼쳐서 비교 ("1.2" = 1.2)
    protected function check($indices, string $index): int {
        if (!$indices->exists(['index' => $index])->asBool()) {
            $this->warn("{$index}가 없습니다 (비교할 대상 없음)");
            return 1;
        }
        $live = $indices->getSettings(['index' => $index])->asArray()[$index]['settings']['index'];
        $map  = $indices->getMapping(['index' => $index])->asArray()[$index]['mappings'];
        $code = self::settings();

        $diff = array_merge(
            $this->compare('similarity', $live['similarity'] ?? [], $code['similarity']),
            $this->compare('analysis', $live['analysis'] ?? [], $code['analysis']),
            $this->compare('mappings', $map['properties'] ?? [], self::mappings()['properties'], true));

        if (!$diff) {
            $this->info("{$index}: 설정·구조가 이 명령과 같습니다");
            return 0;
        }
        $this->table(['칸', '지금 인덱스', '이 명령'], $diff);
        $this->warn('다른 곳이 있습니다 - 인덱스를 손으로 바꿨다면 이 명령의 settings·mappings에도 반영하세요');
        return 1;
    }

    //  두 배열을 "a.b.c" => 글자로 펼쳐 다른 칸만 [칸, 지금, 명령] - $liveExtra: 지금 인덱스에만 있는 칸은 무시 (상품 문서에서 자동으로 생긴 칸)
    protected function compare(string $name, array $live, array $code, bool $liveExtra = false): array {
        $flat = function (array $a, string $prefix) use (&$flat): array {
            $out = [];
            foreach ($a as $k => $v)
                $out += is_array($v) ? $flat($v, "{$prefix}.{$k}") : ["{$prefix}.{$k}" => is_bool($v) ? ($v ? 'true' : 'false') : (string) $v];
            return $out;
        };
        $l = $flat($live, $name);
        $c = $flat($code, $name);
        $rows = [];
        foreach ($c as $k => $v)
            if (($l[$k] ?? null) !== $v)
                $rows[] = [$k, $l[$k] ?? '(없음)', $v];
        if (!$liveExtra)
            foreach (array_diff_key($l, $c) as $k => $v)
                $rows[] = [$k, $v, '(없음)'];
        return $rows;
    }

    //  인덱스 설정 - 분석기: korean(상품명 등 한글 형태소), korean_search(검색어 + 동의어 세트), korean_exact(띄어쓰기만)
    //  a~z 한 글자·0~999 숫자는 일부러 빼고 셈 (잡음 줄이기 - 규격은 spec_all 칸으로 따로 찾음)
    public static function settings(): array {
        return [
            'similarity' => [
                'no_idf' => ['type' => 'BM25', 'b' => 0, 'k1' => 1.2],
            ],
            'analysis' => [
                'normalizer' => [
                    'lowercase_normalizer' => ['type' => 'custom', 'filter' => ['lowercase']],
                ],
                'char_filter' => [
                    'special_chars' => ['type' => 'pattern_replace', 'pattern' => '[()]', 'replacement' => ' '],
                ],
                'filter' => [
                    'synonym_filter'   => ['type' => 'synonym', 'synonyms_set' => GoodsElasticSearch::SYNONYM_SET, 'updateable' => true],
                    'single_char_stop' => ['type' => 'stop', 'stopwords' => range('a', 'z')],
                    'number_filter'    => ['type' => 'stop', 'stopwords' => array_map('strval', range(0, 999))],
                ],
                'tokenizer' => [
                    'nori_tokenizer' => [
                        'type'                  => 'nori_tokenizer',
                        'decompound_mode'       => 'mixed',
                        'user_dictionary_rules' => ['줄자루 줄 자루'],     //  줄자루 = 줄 + 자루 로 강제 분리
                    ],
                ],
                'analyzer' => [
                    'korean'        => ['type' => 'custom', 'tokenizer' => 'nori_tokenizer', 'filter' => ['lowercase', 'single_char_stop', 'number_filter']],
                    'korean_search' => ['type' => 'custom', 'tokenizer' => 'nori_tokenizer', 'filter' => ['lowercase', 'single_char_stop', 'number_filter', 'synonym_filter']],
                    'korean_exact'  => ['type' => 'custom', 'tokenizer' => 'whitespace', 'filter' => ['lowercase'], 'char_filter' => ['special_chars']],
                ],
            ],
        ];
    }

    //  문서 구조 - 칸 내용은 Goods::toSearchableArray
    public static function mappings(): array {
        $text = fn(string $analyzer, array $fields) => ['type' => 'text', 'analyzer' => $analyzer, 'similarity' => 'no_idf'] + ($fields ? ['fields' => $fields] : []);
        $kw    = ['type' => 'keyword', 'normalizer' => 'lowercase_normalizer'];
        $exact = ['type' => 'text', 'analyzer' => 'korean_exact'];

        return ['properties' => [
            'gd_name'      => $text('korean', ['keyword' => $kw, 'exact' => $exact]) + ['search_analyzer' => 'korean_search'],
            'gm_name'      => $text('korean', ['keyword' => $kw, 'exact' => $exact]),
            'mk_name'      => $text('korean_exact', ['keyword' => $kw, 'exact' => $exact]),
            'gd_keyword'   => $text('korean_exact', []),
            'gm_name_all'  => $text('korean', ['exact' => $exact]),
            'gm_code'      => $kw,
            'gm_catno'     => ['type' => 'keyword'],
            'gm_code_all'  => ['type' => 'text', 'fields' => ['keyword' => $kw]],
            'gm_catno_all' => ['type' => 'text', 'fields' => ['keyword' => ['type' => 'keyword']]],
            'gd_seq'       => ['type' => 'integer'],
            'gd_rank'      => ['type' => 'integer'],
            'gd_view_cnt'  => ['type' => 'integer'],
            'gm_price'     => ['type' => 'integer'],
            'purchase_score' => ['type' => 'float'],
            'gd_enable'    => ['type' => 'keyword'],
            'gd_type'      => ['type' => 'keyword'],
            'gd_mk_id'     => ['type' => 'integer'],
            'gc_ca01'      => ['type' => 'integer'],
            'gc_ca02'      => ['type' => 'integer'],
            'gc_ca03'      => ['type' => 'integer'],
            'gc_ca04'      => ['type' => 'integer'],
            //  관리자 검색용
            'created_at'   => ['type' => 'long'],
            'updated_at'   => ['type' => 'long'],
            'updated_id'   => ['type' => 'integer'],
            'is_deleted'   => ['type' => 'boolean'],
            //  전체 카테고리 경로 (다중 카테고리)
            'cate_path1'   => ['type' => 'keyword'],
            'cate_path2'   => ['type' => 'keyword'],
            'cate_path3'   => ['type' => 'keyword'],
            'cate_path4'   => ['type' => 'keyword'],
            //  규격 칸 ("500ml" "6inch") - SearchSpec::tokens
            'spec_all'     => ['type' => 'keyword'],
        ] + GoodsAttr::esMapping()];       //  속성 칸 (attr_volume 등)
    }
}
