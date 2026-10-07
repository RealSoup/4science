<?php

namespace App\Console\Commands;

use App\Services\{GoodsAttr, GoodsElasticSearch};
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

//  상품 속성 채우기 (AI 검색 2단계) - 모델 규격에서 용량·순도·포장량·이름표 규격을 규칙으로 뽑아 la_shop_goods_attr에 저장
//  다시 돌려도 됨 - 규칙으로 채운 줄만 지우고 다시 넣음 (사람이 고치거나 검수한 속성은 그대로)
//  --es: 저장한 값을 검색 색인의 속성 칸(attr_volume 등)에도 넣음 / --es-only: 다시 뽑지 않고 색인에만 넣음
class SearchExtractAttrs extends Command {
    protected $signature   = 'search:extract-attrs
                                {--dry-run : 저장하지 않고 속성별 개수·예시만 보기}
                                {--gd= : 상품 번호 하나만 (뽑힌 줄을 모두 보여 줌)}
                                {--sample=5 : 미리보기에서 속성별 예시 수}
                                {--es : 저장 후 검색 색인의 속성 칸에도 넣기}
                                {--es-only : 다시 뽑지 않고 저장된 속성을 검색 색인에만 넣기}
                                {--index= : 속성을 넣을 색인 (기본: 지금 손님이 쓰는 색인)}';
    protected $description = '상품 속성 채우기 (규칙) - 용량·순도·포장량·이름표 규격, 검색 색인 반영';

    const CHUNK = 2000;             //  상품 번호 묶음

    protected $client, $index;
    protected $es = ['done' => 0, 'missing' => 0, 'failed' => 0];

    public function handle() {
        $dry     = (bool) $this->option('dry-run');
        $esOnly  = (bool) $this->option('es-only');
        $toEs    = ($this->option('es') || $esOnly) && !$dry;
        $extract = !$esOnly;

        $defs = GoodsAttr::defs();
        if (!$defs) {
            $this->error('속성 사전(la_shop_goods_attr_def)에 사용 중인 속성이 없습니다');
            return 1;
        }
        if ($toEs && !$this->prepareIndex())
            return 1;

        //  상품 하나 - 뽑힌 줄을 모두 보여 줌 (규칙 확인용)
        if ($gdId = (int) $this->option('gd')) {
            if ($extract) {
                $rows = GoodsAttr::sync($gdId, $gdId, $dry);
                $this->table(['모델', '속성', '값', '신뢰도', '어디서', '원본'], array_map(fn($r) => [
                    $r['ga_gm_id'], $r['ga_key'], $r['ga_value'], $r['ga_conf'], $r['ga_from'], mb_strimwidth($r['ga_raw'], 0, 60, '…'),
                ], $rows));
                $this->info(($dry ? '미리보기' : '저장') . " - {$gdId}번 상품 " . count($rows) . '줄');
            }
            if ($toEs) {
                $doc = GoodsAttr::esDocs([$gdId])[$gdId];
                $this->pushEs([$gdId => $doc]);
                $this->line(json_encode(array_filter($doc), JSON_UNESCAPED_UNICODE));
                $this->info("색인 {$this->index}: " . ($this->es['done'] ? '반영' : ($this->es['missing'] ? '색인에 없는 상품' : '실패')));
            }
            return 0;
        }

        $sample = max(0, (int) $this->option('sample'));
        $maxId  = (int) DB::table('shop_goods')->max('gd_id');
        $stats  = $samples = [];
        $total  = $lowTotal = 0;

        $bar = $this->output->createProgressBar((int) ceil(($maxId + 1) / self::CHUNK));
        for ($from = 0; $from <= $maxId; $from += self::CHUNK) {
            $to = $from + self::CHUNK - 1;
            foreach ($extract ? GoodsAttr::sync($from, $to, $dry) : [] as $r) {
                $key = $r['ga_key'];
                $low = $r['ga_conf'] < $defs[$key]['min_conf'];
                $stats[$key]['rows'] = ($stats[$key]['rows'] ?? 0) + 1;
                $stats[$key]['low']  = ($stats[$key]['low'] ?? 0) + (int) $low;
                $total++;
                $lowTotal += (int) $low;

                //  예시는 앞쪽 상품만이 아니라 골고루 (뽑힌 순서대로 n번째가 sample/n 확률로 자리 차지)
                $type = $low ? 'low' : 'ok';
                $n    = $stats[$key][$type] = ($stats[$key][$type] ?? 0) + 1;
                if ($sample && $n <= $sample)                $samples[$key][$type][] = $r;
                elseif ($sample && mt_rand(1, $n) <= $sample) $samples[$key][$type][mt_rand(0, $sample - 1)] = $r;
            }

            //  색인 - 이 범위의 모든 상품 (속성이 없어진 상품은 빈 칸으로)
            if ($toEs && $gdIds = DB::table('shop_goods')->whereBetween('gd_id', [$from, $to])->pluck('gd_id')->all())
                $this->pushEs(GoodsAttr::esDocs($gdIds));
            $bar->advance();
        }
        $bar->finish();
        $this->newLine(2);

        $msgs = [];
        if ($extract) {
            $this->table(['속성', '이름', '줄 수', '검수 대상(신뢰도 낮음)'], array_map(fn($key) => [
                $key, $defs[$key]['name'] ?? '', number_format($stats[$key]['rows'] ?? 0), number_format($stats[$key]['low'] ?? 0),
            ], array_keys($defs)));

            if ($dry && $sample) {
                foreach ($samples as $key => $types) {
                    foreach (['ok' => '예시', 'low' => '검수 대상 예시'] as $type => $title) {
                        if (empty($types[$type]))
                            continue;
                        $this->line("<comment>[{$key}] {$title}</comment>");
                        foreach ($types[$type] as $r)
                            $this->line(sprintf('  %-16s %.2f  %s  ← %s', $r['ga_value'], $r['ga_conf'], $r['ga_from'], mb_strimwidth($r['ga_raw'], 0, 90, '…')));
                    }
                }
            }
            $msgs[] = ($dry ? '미리보기 (저장 안 함)' : '저장') . ': ' . number_format($total) . '줄, 검수 대상 ' . number_format($lowTotal) . '줄';
        }
        if ($toEs) {
            $this->client->indices()->refresh(['index' => $this->index]);
            $msgs[] = "색인 {$this->index}: 상품 " . number_format($this->es['done']) . '건, 색인에 없는 상품 ' . number_format($this->es['missing']) . "건, 실패 {$this->es['failed']}건"
                    . (isset($this->es['error']) ? " (첫 실패: {$this->es['error']})" : '');
        }

        $msg = 'search:extract-attrs - ' . implode(' / ', $msgs);
        $this->es['failed'] ? $this->error($msg) : $this->info($msg);
        if (!$dry)
            \Log::channel('search-attrs')->{$this->es['failed'] ? 'error' : 'info'}($msg);
        return $this->es['failed'] ? 1 : 0;
    }

    //  규격 칸이 있는 색인(shop_goods_v2)인지 확인하고 속성 칸 추가 (이미 있으면 그대로 - 색인을 다시 만들 필요 없음)
    //  .env SEARCH_ATTR 스위치와 상관없이 넣을 수 있음 → 값을 다 채운 뒤에 스위치를 켬
    protected function prepareIndex(): bool {
        $this->index = $this->option('index') ?: GoodsElasticSearch::index();
        if (!in_array($this->index, config('search.spec_indexes', []))) {
            $this->error("{$this->index}는 속성 칸을 넣을 색인이 아닙니다 (config/search.php spec_indexes)");
            return false;
        }
        $this->client = app(\Elastic\Elasticsearch\Client::class);
        $this->client->indices()->putMapping(['index' => $this->index, 'body' => ['properties' => GoodsAttr::esMapping()]]);
        return true;
    }

    //  상품 문서의 속성 칸만 부분 수정 (다른 칸은 그대로)
    protected function pushEs(array $docs): void {
        $body = '';
        foreach ($docs as $gdId => $doc) {
            $body .= json_encode(['update' => ['_index' => $this->index, '_id' => $gdId]]) . "\n";
            $body .= json_encode(['doc' => $doc], JSON_UNESCAPED_UNICODE) . "\n";
        }
        foreach ($this->client->bulk(['body' => $body])->asArray()['items'] as $it) {
            if (!isset($it['update']['error']))     $this->es['done']++;
            elseif ($it['update']['status'] == 404) $this->es['missing']++;     //  색인에 없는 상품 (삭제·미등록)
            else {
                $this->es['failed']++;
                $this->es['error'] ??= json_encode($it['update']['error'], JSON_UNESCAPED_UNICODE);
            }
        }
    }
}