<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Elastic\Elasticsearch\ClientBuilder;

class UpdateSearchScore extends Command {
    protected $signature   = 'search:update-score';
    protected $description = 'ES 검색 score 업데이트 (클릭수 + 구매수)';

    public function handle() {
        $client = ClientBuilder::create()
            ->setHosts([env('ELASTICSEARCH_HOST')])
            ->setBasicAuthentication(env('ELASTICSEARCH_USER'), env('ELASTICSEARCH_PASSWORD'))
            ->setSSLVerification(false)
            ->build();

        $this->info('집계 시작...');

        $rows = DB::select("
            SELECT
                g.gd_id,
                g.gd_view_cnt,
                COALESCE(o.purchase_cnt, 0) AS purchase_cnt
            FROM la_shop_goods g
            LEFT JOIN (
                SELECT m.odm_gd_id, COUNT(*) AS purchase_cnt
                FROM la_shop_order_model m
                JOIN la_shop_order od ON od.od_id = m.odm_od_id
                WHERE od.od_step BETWEEN '20' AND '59'
                GROUP BY m.odm_gd_id
            ) o ON o.odm_gd_id = g.gd_id
            WHERE g.gd_id IS NOT NULL
        ");

        $this->info('집계 완료: ' . count($rows) . '건');

        // 클릭수 절대값 변환 (마이너스 → 양수, 클수록 많이 클릭)
        $clickCounts = array_map(fn($r) => abs($r->gd_view_cnt ?? 0), (array)$rows);
        $maxClick    = max($clickCounts ?: [1]);
        $maxPurchase = max(array_column((array)$rows, 'purchase_cnt') ?: [1]);

        // 1000건씩 bulk update
        $chunks = array_chunk($rows, 1000);
        foreach ($chunks as $ci => $chunk) {
            $body = '';
            foreach ($chunk as $i => $row) {
                $clickScore    = round(($clickCounts[($ci * 1000) + $i] / $maxClick) * 10, 4);
                $purchaseScore = round(($row->purchase_cnt / $maxPurchase) * 10, 4);

                $body .= json_encode(['update' => ['_index' => 'shop_goods', '_id' => $row->gd_id]]) . "\n";
                $body .= json_encode(['doc' => [
                    'purchase_score' => round($clickScore + $purchaseScore, 4),
                ]]) . "\n";
            }
            $client->bulk(['body' => $body]);
            $this->info('청크 ' . ($ci + 1) . '/' . count($chunks) . ' 완료');
        }

        $this->info('✅ ES 업데이트 완료!');
    }
}