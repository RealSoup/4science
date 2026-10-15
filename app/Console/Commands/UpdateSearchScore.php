<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Services\{GoodsElasticSearch, SearchRank};

//  매일 밤 검색 순서 재료 2가지 - ① 전체 인기도(모든 검색에 적용) ② 검색어별 자리 보정 점수(AI 검색 2-5, la_search_rank)
class UpdateSearchScore extends Command {
    protected $signature   = 'search:update-score
                                {--rank-only : 검색어별 자리 보정 점수만 (전체 인기도 건너뜀)}';
    protected $description = 'ES 검색 score 업데이트 (클릭수 + 구매수) + 검색어별 자리 보정 점수';

    public function handle() {
        if (!$this->option('rank-only'))
            $this->popularity();
        return $this->rank();
    }

    //  ① 전체 인기도 (purchase_score) - 조회수 + 주문 + 견적 답변, 모든 검색에 적용 (ES 문서에 저장)
    private function popularity() {
        $client = app(\Elastic\Elasticsearch\Client::class);
        $index  = GoodsElasticSearch::INDEX;
        $this->info('집계 시작...');

        $rows = DB::select("
            SELECT
                g.gd_id,
                g.gd_view_cnt,
                COALESCE(o.purchase_cnt, 0) AS purchase_cnt,
                COALESCE(e.estimate_cnt, 0) AS estimate_cnt
            FROM la_shop_goods g
            LEFT JOIN (
                SELECT m.odm_gd_id, COUNT(*) AS purchase_cnt
                FROM la_shop_order_model m
                JOIN la_shop_order od ON od.od_id = m.odm_od_id
                WHERE od.od_step BETWEEN '20' AND '59'
                GROUP BY m.odm_gd_id
            ) o ON o.odm_gd_id = g.gd_id
            LEFT JOIN (
                SELECT em_gd_id, COUNT(*) AS estimate_cnt
                FROM la_shop_estimate_model
                WHERE em_type = 'estimateReply'
                GROUP BY em_gd_id
            ) e ON e.em_gd_id = g.gd_id
            WHERE g.gd_id IS NOT NULL
        ");

        $this->info('집계 완료: ' . count($rows) . '건');

        // 클릭수 절대값 변환 (마이너스 → 양수, 클수록 많이 클릭)
        $clickCounts = array_map(fn($r) => abs($r->gd_view_cnt ?? 0), (array)$rows);
        $maxClick    = max($clickCounts ?: [1]);
        $maxPurchase = max(array_column((array)$rows, 'purchase_cnt') ?: [1]);
        $maxEstimate = max(array_column((array)$rows, 'estimate_cnt') ?: [1]);

        // 1000건씩 bulk update
        $chunks = array_chunk($rows, 1000);
        foreach ($chunks as $ci => $chunk) {
            $body = '';
            foreach ($chunk as $i => $row) {
                $clickScore    = round((log($clickCounts[($ci * 1000) + $i] + 1) / log($maxClick + 1)) * 10, 4);
                $purchaseScore = round((log($row->purchase_cnt + 1) / log($maxPurchase + 1)) * 10, 4);
                $estimateScore = round((log($row->estimate_cnt + 1) / log($maxEstimate + 1)) * 10, 4);

                $body .= json_encode(['update' => ['_index' => $index, '_id' => $row->gd_id]]) . "\n";
                $body .= json_encode(['doc' => [
                    'purchase_score' => round($clickScore + $purchaseScore + $estimateScore, 4),
                ]]) . "\n";
            }
            $client->bulk(['body' => $body]);
            $this->info('청크 ' . ($ci + 1) . '/' . count($chunks) . ' 완료');
        }

        \Log::channel('search-score')->info('search:update-score - ' . $index . ' ES 문서 ' . count($rows) . '건, ' . count($chunks) . '개 청크로 score 갱신 완료 (max click=' . $maxClick . ', max purchase=' . $maxPurchase . ', max estimate=' . $maxEstimate . ')');
        $this->info('✅ ES 업데이트 완료!');
    }

    //  ② 검색어별 자리 보정 점수 - 최근 90일 검색 기록으로 la_search_rank 통째로 다시 채움 (계산식은 App\Services\SearchRank)
    //  검색할 때 SEARCH_RANK_WEIGHT만큼 가산점 (0이면 표만 채우고 검색에는 안 씀)
    private function rank(): int {
        $this->info('검색어별 자리 보정 점수 계산...');
        try {
            $r = SearchRank::rebuild();
        } catch (\Throwable $e) {
            \Log::channel('search-score')->error('search:update-score - 자리 보정 점수 실패: ' . $e->getMessage());
            $this->error($e->getMessage());
            return 1;
        }

        $s   = $r['stats'];
        $ctr = $r['curve']['list'];
        $msg = "search:update-score - 자리 보정 점수 {$s['rows']}줄 (가산점 {$s['boosted']}줄, 검색어 {$s['keywords']}개, 최근 " . SearchRank::DAYS . "일 검색 {$s['searches']}줄)"
             . ' / 클릭률 1위 ' . round(($ctr[1] ?? 0) * 100, 1) . '%, 3위 ' . round(($ctr[3] ?? 0) * 100, 1) . '%, 10위 ' . round(($ctr[10] ?? 0) * 100, 1) . '%'
             . ', PICK ' . round($r['curve']['pick'] * 100, 1) . '%';
        \Log::channel('search-score')->info($msg);
        $this->info('✅ ' . $msg);

        //  손으로 돌렸을 때 확인용 - 가산점 큰 순 15줄
        $this->table(['검색어', '상품', '가산점 비율', '실제', '기대', '본 손님', '클릭', '장바구니·견적', '주문', '본 자리 평균'],
            collect($r['rows'])->sortByDesc('sr_gain')->take(15)->map(fn($x) => [
                $x['sr_keyword'], $x['sr_gd_id'], $x['sr_score'], $x['sr_actual'], $x['sr_expected'],
                $x['sr_seen'], $x['sr_clicks'], $x['sr_carts'], $x['sr_orders'], $x['sr_avg_pos'],
            ])->values()->all());
        return 0;
    }
}