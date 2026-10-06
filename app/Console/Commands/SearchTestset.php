<?php

namespace App\Console\Commands;

use App\Services\{GoodsElasticSearch, SearchSpec};
use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, File};

//  검색 채점표 만들기 (AI 검색) - 검색 규칙·인덱스를 바꿀 때 전후 비교 기준 (search:compare)
//  정답 = 손님이 검색 → 그 상품 페이지를 열고 → 30분 안에 장바구니·견적·구매한 상품 (행동 직전의 마지막 검색에만 연결)
//  규격 검색어("비커 500ml")는 정답 데이터가 적어 따로 모음 → "1페이지 중 규격이 맞는 상품 비율"로 채점
class SearchTestset extends Command {
    protected $signature   = 'search:testset
                                {--from= : 기록 시작일 (기본: 전체)}
                                {--to= : 기록 종료일 (기본: 전체)}
                                {--min-users=3 : 정답 검색어 - 행동한 손님이 이 수 이상}
                                {--limit=200 : 정답 검색어 최대 개수 (손님 많은 순)}
                                {--spec-limit=50 : 규격 검색어 최대 개수 (검색 많은 순)}
                                {--path= : 저장 위치 (기본: storage/app/search/testset.json)}
                                {--force : 이미 있어도 덮어쓰기}';
    protected $description = '검색 채점표 만들기 (손님 행동 기록 → 검색어별 정답 상품)';

    public function handle() {
        $path = $this->option('path') ?: storage_path('app/search/testset.json');
        if (file_exists($path) && !$this->option('force')) {
            $this->error("채점표가 이미 있습니다: {$path} - 비교 기준이 바뀌지 않게 덮어쓰지 않음 (새로 만들려면 --force)");
            return 1;
        }

        $from = $this->option('from') ? $this->option('from') . ' 00:00:00' : '2000-01-01 00:00:00';
        $to   = $this->option('to') ? $this->option('to') . ' 23:59:59' : now()->toDateTimeString();

        $this->info('정답 찾는 중... (수십 초 걸림)');
        $rows = DB::select("
            SELECT s.ubl_keyword AS kw, a.ubl_gd_id AS gd_id, a.ubl_uuid AS uuid
            FROM la_user_behavior_logs a
            JOIN la_user_behavior_logs s ON s.ubl_id = (
                SELECT s2.ubl_id FROM la_user_behavior_logs s2
                WHERE s2.ubl_uuid = a.ubl_uuid AND s2.ubl_action_type = 'search'
                  AND s2.created_at BETWEEN a.created_at - INTERVAL 30 MINUTE AND a.created_at
                ORDER BY s2.created_at DESC, s2.ubl_id DESC LIMIT 1)
            JOIN la_shop_goods g ON g.gd_id = a.ubl_gd_id AND g.gd_enable = 'Y' AND g.gd_type = 'NON' AND g.deleted_at IS NULL
            WHERE a.ubl_action_type IN ('cart', 'estimate', 'purchase')
              AND a.created_at BETWEEN ? AND ?
              AND s.ubl_keyword <> ''
              AND EXISTS (SELECT 1 FROM la_user_behavior_logs v
                          WHERE v.ubl_uuid = a.ubl_uuid AND v.ubl_gd_id = a.ubl_gd_id AND v.ubl_action_type IN ('view', 'revisit')
                            AND v.created_at BETWEEN s.created_at AND a.created_at)", [$from, $to]);

        //  검색어별 손님 / 검색어·상품별 손님
        $kws = [];
        foreach ($rows as $r) {
            $kw = self::kw($r->kw);
            $kws[$kw]['users'][$r->uuid] = 1;
            $kws[$kw]['goods'][$r->gd_id][$r->uuid] = 1;
        }
        $queries = collect($kws)
            ->map(fn($v, $kw) => [
                'kw'    => (string) $kw,
                'users' => count($v['users']),
                'goods' => collect($v['goods'])->map(fn($u, $gdId) => ['gd_id' => (int) $gdId, 'users' => count($u)])
                    ->sort(fn($a, $b) => [$b['users'], $a['gd_id']] <=> [$a['users'], $b['gd_id']])->values()->all(),
            ])
            ->filter(fn($q) => $q['users'] >= (int) $this->option('min-users'))
            ->sort(fn($a, $b) => [$b['users'], $a['kw']] <=> [$a['users'], $b['kw']])     //  손님 많은 순, 같으면 가나다순 (누가 만들어도 같은 채점표)
            ->take((int) $this->option('limit'))->values();

        //  규격 검색어 - 제조사 이름("3M")은 규격으로 보지 않음
        $specs = collect(DB::select("
                SELECT ubl_keyword AS kw, COUNT(*) AS cnt FROM la_user_behavior_logs
                WHERE ubl_action_type = 'search' AND created_at BETWEEN ? AND ? AND ubl_keyword REGEXP '[0-9]'
                GROUP BY ubl_keyword", [$from, $to]))
            ->groupBy(fn($r) => self::kw($r->kw))
            ->map(fn($g, $kw) => ['kw' => (string) $kw, 'searches' => (int) $g->sum('cnt'), 'specs' => SearchSpec::tokens((string) $kw, SearchSpec::makers())])
            ->filter(fn($q) => $q['specs'])
            ->sort(fn($a, $b) => [$b['searches'], $a['kw']] <=> [$a['searches'], $b['kw']])
            ->take((int) $this->option('spec-limit'))->values();

        File::ensureDirectoryExists(dirname($path));
        file_put_contents($path, json_encode([
            'created_at'   => now()->toDateTimeString(),
            'period'       => [$this->option('from') ?: '전체', $this->option('to') ?: '전체'],
            'rule'         => '검색 → 상품 페이지 열람 → 30분 안에 장바구니·견적·구매 (마지막 검색 기준), 손님 ' . $this->option('min-users') . '명 이상',
            'queries'      => $queries->all(),
            'spec_queries' => $specs->all(),
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        $this->info("저장: {$path}");
        $this->line("  정답 검색어 {$queries->count()}개 (정답 상품 " . $queries->sum(fn($q) => count($q['goods'])) . "개), 규격 검색어 {$specs->count()}개");
        $this->table(['정답 검색어 (손님 많은 순)', '손님', '정답 상품'],
            $queries->take(10)->map(fn($q) => [$q['kw'], $q['users'], count($q['goods'])])->all());
        $this->table(['규격 검색어 (검색 많은 순)', '검색', '규격'],
            $specs->take(10)->map(fn($q) => [$q['kw'], $q['searches'], implode(', ', $q['specs'])])->all());
        return 0;
    }

    //  손님 검색과 같은 모양으로 (소문자·앞뒤 공백 제거) + 연속 공백 하나로
    private static function kw(string $kw): string {
        return GoodsElasticSearch::keyword(preg_replace('/\s+/u', ' ', $kw));
    }
}