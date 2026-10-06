<?php

namespace App\Console\Commands;

use App\Services\GoodsElasticSearch;
use Illuminate\Console\Command;

//  검색 인덱스 상품 문서 복사 (AI 검색) - 되돌리기용: 손님이 쓰던 인덱스(v2)의 최신 상품 정보를 옛 인덱스(v1)에 덮어쓰기
//  받는 쪽에 규격 칸(spec_all)이 없으면 빼고 복사 → 받는 쪽 검색 동작은 그대로
//  ※ 원본에서 완전히 지워진 상품(드묾)은 받는 쪽에 남음
class SearchCopy extends Command {
    protected $signature   = 'search:copy
                                {from : 최신 상품 정보가 있는 인덱스 (예: shop_goods_v2)}
                                {to : 덮어쓸 인덱스 (예: shop_goods)}';
    protected $description = '검색 인덱스 상품 문서 복사 (되돌리기 전 옛 인덱스를 최신으로)';

    public function handle() {
        [$from, $to] = [$this->argument('from'), $this->argument('to')];
        $client  = app(\Elastic\Elasticsearch\Client::class);
        $indices = $client->indices();

        if ($from === $to || !$indices->exists(['index' => $from])->asBool() || !$indices->exists(['index' => $to])->asBool()) {
            $this->error('두 인덱스가 모두 있어야 하고 서로 달라야 합니다');
            return 1;
        }
        //  손님이 쓰는 인덱스가 아닌 쪽에서 복사하면 옛 정보로 덮어쓸 수 있음
        if ($from !== GoodsElasticSearch::index()
            && !$this->confirm("{$from}는 지금 손님이 쓰는 인덱스(" . GoodsElasticSearch::index() . ")가 아닙니다. 그래도 {$to}에 덮어쓸까요?"))
            return 1;

        $body = ['source' => ['index' => $from], 'dest' => ['index' => $to]];
        if (!isset($indices->getMapping(['index' => $to])->asArray()[$to]['mappings']['properties']['spec_all']))
            $body['script'] = ['source' => "ctx._source.remove('spec_all')", 'lang' => 'painless'];

        $total = $client->count(['index' => $from])->asArray()['count'];
        $task  = $client->reindex(['wait_for_completion' => false, 'body' => $body])->asArray()['task'];

        $this->info("{$from} → {$to} 복사 중 ({$total}건)");
        $bar = $this->output->createProgressBar($total);
        do {
            sleep(2);
            $t = $client->tasks()->get(['task_id' => $task])->asArray();
            $bar->setProgress($t['task']['status']['created'] + $t['task']['status']['updated']);
        } while (!$t['completed']);
        $bar->finish();
        $this->newLine();

        $s   = $t['task']['status'];
        $msg = "search:copy - {$from} → {$to}: 새로 {$s['created']}건, 덮어씀 {$s['updated']}건, 실패 " . count($t['response']['failures'] ?? []) . '건';
        empty($t['response']['failures']) ? $this->info($msg) : $this->error($msg);
        \Log::info($msg);
        return empty($t['response']['failures']) ? 0 : 1;
    }
}