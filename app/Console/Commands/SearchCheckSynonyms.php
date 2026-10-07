<?php

namespace App\Console\Commands;

use App\Services\GoodsElasticSearch;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

//  ES 동의어 점검 (AI 검색) - ES가 재시작될 때 동의어 세트(shop_goods_v2)를 못 읽고 시작하는 경우가 있어 5분마다 확인
//  꺼져 있으면 다시 읽기(reload) - 정상일 때는 로그 안 남김
class SearchCheckSynonyms extends Command {
    protected $signature   = 'search:check-synonyms {--reload : 확인 없이 바로 다시 읽기}';
    protected $description = 'ES 동의어 세트가 적용 중인지 확인, 꺼져 있으면 다시 읽기';

    const SAMPLE = 5;   //  확인할 동의어 줄 수 - 이 중 하나라도 확장되면 정상

    public function handle() {
        $index = GoodsElasticSearch::index();
        if (!$set = config("search.synonym_sets.{$index}")) {
            $this->line("{$index}는 txt 파일 동의어라 점검 대상이 아닙니다");
            return 0;
        }

        $es = Http::withBasicAuth((string) env('ELASTICSEARCH_USER'), (string) env('ELASTICSEARCH_PASSWORD'))
            ->withoutVerifying()->baseUrl(env('ELASTICSEARCH_HOST'));

        if (!$this->option('reload')) {
            //  동의어 줄의 첫 단어("에탄올, ethanol, …" → 에탄올)가 동의어 분석기에서 더 많은 단어로 늘어나면 적용 중
            $tokens = fn($analyzer, $word) => count($es->post("/{$index}/_analyze", ['analyzer' => $analyzer, 'text' => $word])->json('tokens') ?? []);
            foreach ($es->get("/_synonyms/{$set}", ['size' => self::SAMPLE])->json('synonyms_set') ?? [] as $rule) {
                $word = trim(preg_split('/,|=>/', $rule['synonyms'])[0]);
                if ($tokens('korean_search', $word) > $tokens('korean', $word)) {
                    $this->info("{$index} 동의어 적용 중 (확인 단어: {$word})");
                    return 0;
                }
            }
        }

        $res = $es->send('POST', "/{$index}/_reload_search_analyzers");
        $msg = "search:check-synonyms - {$index} 동의어 " . ($this->option('reload') ? '다시 읽기' : '꺼져 있어 다시 읽기')
             . ($res->successful() ? ' 완료' : ' 실패: ' . $res->body());
        \Log::channel('search-synonyms')->{$res->successful() ? 'warning' : 'error'}($msg);
        $res->successful() ? $this->info($msg) : $this->error($msg);
        return $res->successful() ? 0 : 1;
    }
}