<?php

namespace App\Console\Commands;

use App\Services\{GoodsElasticSearch, SearchSpec};
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

//  검색 비교 채점 (AI 검색) - 채점표(search:testset) 검색어를 인덱스마다 똑같이 검색해 점수 비교
//  손님 검색과 같은 조건 (노출 상품만·점수순), 개인화 가산점만 뺌
class SearchCompare extends Command {
    protected $signature   = 'search:compare
                                {a=shop_goods : 기준 인덱스}
                                {b? : 비교 인덱스 (없으면 기준만 채점)}
                                {--spec=0 : 비교 쪽(b)에 규격 가산점 (shop_goods_v2 전용, 권장 5000)}
                                {--spec-a=0 : 기준 쪽(a)에 규격 가산점 (같은 인덱스끼리 새 방식만 비교할 때)}
                                {--attr : 비교 쪽(b) 규격 가산점을 속성 방식으로 (1l=1000ml, 범위·순도 - .env SEARCH_ATTR와 같음)}
                                {--testset= : 채점표 위치 (기본: storage/app/search/testset.json)}
                                {--show=15 : 검색어 목록 표시 개수}
                                {--watch= : 눈으로 볼 검색어 (쉼표로 구분, 없으면 기본 목록)}';
    protected $description = '검색 비교 채점 (정답 순위·종합 점수·규격 일치율)';

    const PAGE = 15;    //  한 페이지 상품 수

    //  꼭 눈으로 볼 검색어 - 규격·동의어를 바꾸면 달라지기 쉬운 것 (3m = 제조사, 1m = 1몰 농도)
    const WATCH = ['3m 장갑', '1m hcl', '비커 500ml', '비커 1l', 'pp 병 500ml', 'duran 500ml', '에탄올 95%', '에탄올 99%', 'tip 100ul', '2inch wafer', 'hplc 헥산', 'hplc 바이알', 'gc 바이알'];

    protected $es;
    protected $client;
    protected $names = [];  //  gd_id => 상품명

    public function handle() {
        $path = $this->option('testset') ?: storage_path('app/search/testset.json');
        if (!file_exists($path)) {
            $this->error("채점표가 없습니다: {$path} (먼저 search:testset)");
            return 1;
        }
        $set = json_decode(file_get_contents($path), true);

        $this->es     = new GoodsElasticSearch;
        $this->client = app(\Elastic\Elasticsearch\Client::class);

        $this->info('채점표: 정답 검색어 ' . count($set['queries']) . '개 + 규격 검색어 ' . count($set['spec_queries']) . "개 ({$set['created_at']} 생성)");

        //  채점 대상 - 이름표 => [인덱스, 규격 가산점]  (같은 인덱스끼리도 가산점 유무로 비교 가능)
        $specA = (int) $this->option('spec-a');
        $runs  = [$this->argument('a') . ($specA ? "+규격{$specA}" : '') => ['index' => $this->argument('a'), 'spec' => $specA, 'attr' => false]];
        if ($this->argument('b')) {
            $spec  = (int) $this->option('spec');
            $attr  = (bool) $this->option('attr');
            $label = $this->argument('b') . ($spec ? "+규격{$spec}" : '') . ($attr ? '+속성' : '');
            if (isset($runs[$label])) {
                $this->error("기준과 비교가 같은 조건입니다: {$label}");
                return 1;
            }
            $runs[$label] = ['index' => $this->argument('b'), 'spec' => $spec, 'attr' => $attr];
        }

        $score = [];
        foreach ($runs as $label => $run) {
            $this->line("  {$label} 채점 중...");
            $score[$label] = [
                'queries' => $this->scoreQueries($run, $set['queries']),
                'spec'    => $this->scoreSpecs($run, $set['spec_queries']),
            ];
        }

        $this->summary($score);
        count($score) == 2 ? $this->changes($score, $set['queries']) : $this->misses($score, $set['queries']);
        $this->watch($runs);
        return 0;
    }

    //  손님 검색과 같은 조건으로 상위 2페이지 gd_id + 총개수
    private function search(array $run, string $kw): array {
        $res = $this->client->search(['index' => $run['index'], 'body' => [
            'query'   => $this->es->buildQuery($kw, null, GoodsElasticSearch::customerFilters(), SearchSpec::functions($kw, $run['spec'], $run['attr'])),
            'sort'    => GoodsElasticSearch::sort('hot', true),
            'size'    => self::PAGE * 2,
            '_source' => ['gd_id'],
            'track_total_hits' => true,
        ]])->asArray();

        return [array_map(fn($h) => (int) $h['_source']['gd_id'], $res['hits']['hits']), $res['hits']['total']['value']];
    }

    //  정답 검색어 - 첫 정답 순위(1페이지 안), 종합 점수 nDCG (정답이 많이·위에 있을수록 1, 손님 많은 정답일수록 무게 큼)
    private function scoreQueries(array $run, array $queries): array {
        $per = [];
        foreach ($queries as $q) {
            [$ids, $total] = $this->search($run, $q['kw']);
            $ids = array_slice($ids, 0, self::PAGE);

            $gain = [];
            foreach ($q['goods'] as $g)
                $gain[$g['gd_id']] = log(1 + $g['users'], 2);

            $first = null;
            $dcg   = 0;
            foreach ($ids as $i => $id) {
                if (!isset($gain[$id])) continue;
                $first = $first ?? $i + 1;
                $dcg  += $gain[$id] / log($i + 2, 2);
            }
            $ideal = array_values($gain);
            rsort($ideal);
            $idcg = 0;
            foreach (array_slice($ideal, 0, self::PAGE) as $i => $g)
                $idcg += $g / log($i + 2, 2);

            $per[$q['kw']] = ['first' => $first, 'ndcg' => $dcg / $idcg, 'zero' => $total == 0, 'ids' => $ids];
        }
        return $per;
    }

    //  규격 검색어 - 1페이지 상품 중 검색어의 규격이 모두 맞는 상품 비율 (상품명·모델명·모델 규격에서 확인)
    private function scoreSpecs(array $run, array $queries): array {
        $per = [];
        foreach ($queries as $q) {
            [$ids, $total] = $this->search($run, $q['kw']);
            $ids   = array_slice($ids, 0, self::PAGE);
            $texts = $this->goodsTexts($ids);
            $ok    = count(array_filter($ids, fn($id) => collect($q['specs'])->every(fn($s) => collect(SearchSpec::equivalents($s))->contains(fn($e) => SearchSpec::contains($texts[$id] ?? '', $e)))));

            $per[$q['kw']] = ['rate' => $ids ? $ok / count($ids) : 0, 'ok' => $ok, 'n' => count($ids), 'zero' => $total == 0];
        }
        return $per;
    }

    //  상품명 + 모델명·규격 전체
    private function goodsTexts(array $ids): array {
        if (!$ids) return [];
        $texts = DB::table('shop_goods')->whereIn('gd_id', $ids)->pluck('gd_name', 'gd_id')->all();
        foreach (DB::table('shop_goods_model')->whereIn('gm_gd_id', $ids)->get(['gm_gd_id', 'gm_name', 'gm_spec']) as $m)
            $texts[$m->gm_gd_id] = ($texts[$m->gm_gd_id] ?? '') . " {$m->gm_name} {$m->gm_spec}";
        return $texts;
    }

    //  1. 점수판
    private function summary(array $score) {
        $rate = fn($rows, $f) => round(collect($rows)->filter($f)->count() / max(count($rows), 1) * 100, 1);
        $metrics = [
            ['3위 안에 정답 (%)',      fn($s) => $rate($s['queries'], fn($r) => $r['first'] && $r['first'] <= 3)],
            ['1페이지 안에 정답 (%)',  fn($s) => $rate($s['queries'], fn($r) => $r['first'] !== null)],
            ['종합 점수 (0~100)',      fn($s) => round(collect($s['queries'])->avg('ndcg') * 100, 1)],
            ['규격 일치율 (%)',        fn($s) => round(collect($s['spec'])->avg('rate') * 100, 1)],
            ['결과 0건 (개, 적을수록 좋음)', fn($s) => collect($s['queries'])->where('zero', true)->count() + collect($s['spec'])->where('zero', true)->count()],
        ];

        $table = [];
        foreach ($metrics as [$label, $f]) {
            $vals = array_map($f, array_values($score));
            $table[] = count($vals) == 2 ? [$label, ...$vals, sprintf('%+g', round($vals[1] - $vals[0], 1))] : [$label, ...$vals];
        }
        $this->section('1. 점수판');
        $this->table(['', ...array_keys($score), ...(count($score) == 2 ? ['차이'] : [])], $table);
    }

    //  2. (기준만 채점할 때) 1페이지에 정답이 없는 검색어 - 지금 검색의 약점
    private function misses(array $score, array $queries) {
        [$index] = array_keys($score);
        $rows = collect($queries)->filter(fn($q) => $score[$index]['queries'][$q['kw']]['first'] === null)->take((int) $this->option('show'));

        $this->section("2. 1페이지에 정답이 없는 검색어 (손님 많은 순, " . $rows->count() . '개 표시)');
        $this->table(['검색어', '손님', '지금 1위 상품', '손님이 가장 많이 고른 상품'],
            $rows->map(fn($q) => [
                $q['kw'],
                $q['users'],
                $this->name($score[$index]['queries'][$q['kw']]['ids'][0] ?? null),
                $this->name($q['goods'][0]['gd_id']),
            ])->all());

        $spec = collect($score[$index]['spec'])->sortBy('rate')->take((int) $this->option('show'));
        $this->section('3. 규격이 잘 안 맞는 규격 검색어');
        $this->table(['검색어', '1페이지 중 규격 맞음'], $spec->map(fn($r, $kw) => [$kw, "{$r['ok']} / {$r['n']}"])->values()->all());
    }

    //  2. (두 인덱스) 많이 바뀐 검색어 - 나빠진 것은 꼭 눈으로 확인
    private function changes(array $score, array $queries) {
        [$a, $b] = array_keys($score);
        $show = (int) $this->option('show');
        $diff = collect($queries)->map(fn($q) => [
            'q'    => $q,
            'a'    => $score[$a]['queries'][$q['kw']],
            'b'    => $score[$b]['queries'][$q['kw']],
            'diff' => $score[$b]['queries'][$q['kw']]['ndcg'] - $score[$a]['queries'][$q['kw']]['ndcg'],
        ]);
        $row = fn($d) => [
            $d['q']['kw'],
            round($d['a']['ndcg'] * 100) . ' → ' . round($d['b']['ndcg'] * 100),
            $this->name($d['a']['ids'][0] ?? null),
            $this->name($d['b']['ids'][0] ?? null),
        ];
        $head = ['검색어', "점수 {$a} → {$b}", "{$a} 1위", "{$b} 1위"];

        $this->section('2. 나빠진 검색어');
        $this->table($head, $diff->filter(fn($d) => $d['diff'] < 0)->sortBy('diff')->take($show)->map($row)->values()->all());
        $this->section('3. 좋아진 검색어');
        $this->table($head, $diff->filter(fn($d) => $d['diff'] > 0)->sortByDesc('diff')->take($show)->map($row)->values()->all());

        $spec = collect($score[$a]['spec'])->map(fn($r, $kw) => [$kw, "{$r['ok']} / {$r['n']}", "{$score[$b]['spec'][$kw]['ok']} / {$score[$b]['spec'][$kw]['n']}", $score[$b]['spec'][$kw]['rate'] - $r['rate']])
            ->filter(fn($r) => $r[3] != 0)->sortBy(fn($r) => $r[3])->take($show);
        $this->section('4. 규격 일치가 바뀐 규격 검색어 (나빠진 것부터)');
        $this->table(['검색어', "{$a} 규격 맞음", "{$b} 규격 맞음"], $spec->map(fn($r) => array_slice($r, 0, 3))->values()->all());
    }

    //  꼭 눈으로 볼 검색어 - 상위 5개 나란히
    private function watch(array $runs) {
        $this->section('눈으로 확인할 검색어 (상위 5개)');
        $labels = array_keys($runs);
        foreach ($this->option('watch') ? array_map('trim', explode(',', $this->option('watch'))) : self::WATCH as $kw) {
            $lists = $totals = [];
            foreach ($runs as $label => $run)
                [$lists[$label], $totals[$label]] = $this->search($run, GoodsElasticSearch::keyword($kw));

            $this->line("  [{$kw}] 결과 " . implode(' / ', array_map(fn($l) => "{$l} " . number_format($totals[$l]) . '개', $labels)));
            $rows = [];
            for ($i = 0; $i < 5; $i++)
                $rows[] = [$i + 1, ...array_map(fn($l) => $this->name($lists[$l][$i] ?? null), $labels)];
            $this->table(['순위', ...$labels], $rows);
        }
    }

    private function name(?int $gdId): string {
        if (!$gdId) return '-';
        $this->names[$gdId] = $this->names[$gdId] ?? DB::table('shop_goods')->where('gd_id', $gdId)->value('gd_name');
        return mb_strimwidth((string) $this->names[$gdId], 0, 40, '…');
    }

    private function section(string $title) {
        $this->newLine();
        $this->info($title);
    }
}