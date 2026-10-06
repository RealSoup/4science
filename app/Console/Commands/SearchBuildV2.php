<?php

namespace App\Console\Commands;

use App\Services\{GoodsElasticSearch, SearchSpec};
use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, Http};

//  비교용 검색 인덱스 만들기 (AI 검색) - 지금 인덱스(shop_goods)는 읽기만, 새 인덱스에 그대로 복사 + 바뀐 부분만 적용
//  바뀐 부분: ① 동의어를 ES 안에 저장 (동의어 세트 - 관리자 화면에서 바로 편집·반영, HPLC/GC 분리)
//            ② 규격 칸 spec_all (상품명·모델명·모델 규격의 "500ml" "6inch" 모음)
class SearchBuildV2 extends Command {
    protected $signature   = 'search:build-v2
                                {--index=shop_goods_v2 : 만들 인덱스}
                                {--source=shop_goods : 복사할 원본 인덱스 (읽기만)}
                                {--synonyms= : 지금 동의어 txt 파일 (기본: storage/app/search/synonyms_final.txt) → ES 동의어 세트로 넣음}
                                {--force : 같은 이름 인덱스가 있으면 지우고 다시 만들기}';
    protected $description = '비교용 검색 인덱스 만들기 (지금 인덱스 복사 + ES 동의어 세트 + 규격 칸)';

    const CHUNK = 2000;             //  규격 칸 채우기 상품 번호 묶음

    //  동의어 고칠 줄 - HPLC로 찾으면 GC가 섞이지 않게 ("크로마토그래피"로 찾으면 둘 다)
    const SYNONYM_FIXES = [
        '크로마토그래피, chromatography, HPLC, GC' => '크로마토그래피, chromatography => 크로마토그래피, chromatography, hplc, gc',
    ];

    protected $client;

    public function handle() {
        $index  = $this->option('index');
        $source = $this->option('source');
        if ($index === GoodsElasticSearch::index() || $index === $source) {     //  손님이 쓰는 인덱스는 절대 지우거나 만들지 않음
            $this->error("{$index}에는 만들 수 없습니다 (손님용·원본 인덱스 보호)");
            return 1;
        }

        $synFile = $this->option('synonyms') ?: storage_path('app/search/synonyms_final.txt');
        if (!is_file($synFile)) {
            $this->error("동의어 파일이 없습니다: {$synFile} (ES 서버의 synonyms_final.txt를 이 위치로 가져오거나 --synonyms로 지정)");
            return 1;
        }

        $this->client = app(\Elastic\Elasticsearch\Client::class);
        $indices      = $this->client->indices();

        if ($indices->exists(['index' => $index])->asBool()) {
            if (!$this->option('force')) {
                $this->error("{$index}가 이미 있습니다 (다시 만들려면 --force)");
                return 1;
            }
            $indices->delete(['index' => $index]);
            $this->info("기존 {$index} 삭제");
        }

        //  1. 동의어 세트 - txt 줄을 ES 안에 저장 (빈 줄·주석 제외, 고칠 줄 적용)
        $set   = config("search.synonym_sets.{$index}", $index);
        $rules = collect(explode("\n", file_get_contents($synFile)))
            ->map(fn($l) => trim($l))
            ->filter(fn($l) => $l !== '' && $l[0] !== '#')
            ->map(fn($l) => self::SYNONYM_FIXES[$l] ?? $l)
            ->unique()->values();
        $fixed = $rules->intersect(self::SYNONYM_FIXES)->count();

        $res = Http::withBasicAuth((string) env('ELASTICSEARCH_USER'), (string) env('ELASTICSEARCH_PASSWORD'))->withoutVerifying()
            ->put(env('ELASTICSEARCH_HOST') . "/_synonyms/{$set}", ['synonyms_set' => $rules->map(fn($r) => ['id' => md5($r), 'synonyms' => $r])->all()]);
        if (!$res->successful()) {
            $this->error('동의어 세트 저장 실패: ' . $res->body());
            return 1;
        }
        $this->info("동의어 세트 {$set}: {$rules->count()}줄 (고친 줄 {$fixed}개)");

        //  2. 원본과 같은 설정·구조 + 바뀐 부분
        $settings = $indices->getSettings(['index' => $source])->asArray()[$source]['settings']['index'];
        $mappings = $indices->getMapping(['index' => $source])->asArray()[$source]['mappings'];

        $analysis = $settings['analysis'];
        $analysis['filter']['synonym_filter'] = ['type' => 'synonym', 'synonyms_set' => $set, 'updateable' => true];
        $mappings['properties']['spec_all'] = ['type' => 'keyword'];

        $indices->create(['index' => $index, 'body' => [
            'settings' => array_filter([
                'number_of_shards'   => $settings['number_of_shards'],
                'number_of_replicas' => 0,          //  채우는 동안은 빠르게, 끝나고 원본과 같게
                'refresh_interval'   => '-1',
                'similarity'         => $settings['similarity'] ?? null,
                'analysis'           => $analysis,
            ], fn($v) => $v !== null),
            'mappings' => $mappings,
        ]]);
        $this->info("{$index} 생성");

        //  3. 상품 문서 복사 - ES 안에서 복사 (인기도 점수 포함)
        $total = $this->client->count(['index' => $source])->asArray()['count'];
        $task  = $this->client->reindex([
            'wait_for_completion' => false,
            'body' => ['source' => ['index' => $source], 'dest' => ['index' => $index]],
        ])->asArray()['task'];

        $this->info("상품 문서 복사 중 ({$total}건)");
        $bar = $this->output->createProgressBar($total);
        do {
            sleep(2);
            $t = $this->client->tasks()->get(['task_id' => $task])->asArray();
            $bar->setProgress($t['task']['status']['created'] + $t['task']['status']['updated']);
        } while (!$t['completed']);
        $bar->finish();
        $this->newLine();
        if (!empty($t['response']['failures'])) {
            $this->error('복사 실패: ' . json_encode(array_slice($t['response']['failures'], 0, 3), JSON_UNESCAPED_UNICODE));
            return 1;
        }

        //  4. 규격 칸 채우기 - DB의 상품명·모델명·모델 규격 → 규격 토큰
        $maxId = (int) DB::table('shop_goods')->max('gd_id');
        $this->info('규격 칸 채우는 중');
        $bar = $this->output->createProgressBar((int) ceil(($maxId + 1) / self::CHUNK));
        $filled = $missing = $failed = 0;
        for ($from = 0; $from <= $maxId; $from += self::CHUNK) {
            $range = [$from, $from + self::CHUNK - 1];
            $texts = DB::table('shop_goods')->whereBetween('gd_id', $range)->pluck('gd_name', 'gd_id')->all();
            foreach (DB::table('shop_goods_model')->whereBetween('gm_gd_id', $range)->get(['gm_gd_id', 'gm_name', 'gm_spec']) as $m)
                $texts[$m->gm_gd_id] = ($texts[$m->gm_gd_id] ?? '') . " {$m->gm_name} {$m->gm_spec}";

            $body = '';
            foreach ($texts as $gdId => $text) {
                if (!$specs = SearchSpec::tokens((string) $text))
                    continue;
                $body .= json_encode(['update' => ['_index' => $index, '_id' => $gdId]]) . "\n";
                $body .= json_encode(['doc' => ['spec_all' => $specs]], JSON_UNESCAPED_UNICODE) . "\n";
            }
            if ($body) {
                foreach ($this->client->bulk(['body' => $body])->asArray()['items'] as $it) {
                    if (!isset($it['update']['error']))     $filled++;
                    elseif ($it['update']['status'] == 404) $missing++;     //  인덱스에 없는 상품
                    else                                    $failed++;
                }
            }
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        //  5. 마무리 - 원본과 같은 복제본 수·새로고침 주기
        $indices->putSettings(['index' => $index, 'body' => ['index' => [
            'number_of_replicas' => $settings['number_of_replicas'],
            'refresh_interval'   => $settings['refresh_interval'] ?? null,
        ]]]);
        $indices->refresh(['index' => $index]);

        $count = $this->client->count(['index' => $index])->asArray()['count'];
        $msg   = "search:build-v2 - {$index} 완료: 문서 {$count}건 (원본 {$total}건), 동의어 {$rules->count()}줄, 규격 칸 {$filled}건, 인덱스에 없는 상품 {$missing}건, 실패 {$failed}건";
        $failed ? $this->error($msg) : $this->info($msg);
        \Log::info($msg);
        return $failed ? 1 : 0;
    }
}