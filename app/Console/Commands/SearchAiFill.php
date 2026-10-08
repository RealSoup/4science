<?php

namespace App\Console\Commands;

use App\Services\SearchAi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, Log};

//  AI 통역 채우기 (AI 검색 2-2) - 1분마다 대기 목록(la_search_ai_queue)을 AI에 물어 수첩(la_search_ai)에 저장
//  성공하면 대기 줄 삭제 / 실패하면 2분·30분 뒤 다시, 3번 실패하면 멈춤 / 차단기가 내려가 있으면 아무것도 안 함
//  --ask="비커 500ml" : 글자 하나를 바로 물어 결과만 보기 (저장은 --save)
class SearchAiFill extends Command {
    protected $signature = 'search:ai-fill
                            {--limit= : 한 번에 물어볼 최대 개수 (기본 config search.ai.per_run)}
                            {--seconds=50 : 이 시간이 지나면 다음 실행으로 넘김}
                            {--ask= : 글자 하나만 바로 물어보기 (대기 목록 안 봄)}
                            {--kind=query : --ask 종류 query / spec}
                            {--model= : --ask 모델 (비우면 .env)}
                            {--provider= : --ask openai / anthropic}
                            {--save : --ask 결과를 수첩에 저장}';
    protected $description = 'AI 검색어 통역 - 대기 목록을 AI에 물어 수첩 채우기 (1분마다)';

    public function handle() {
        if ($this->option('ask') !== null)
            return $this->askOne();

        if ($why = SearchAi::blocked()) {
            $this->line("차단 중 (5분 안에 풀림): {$why}");
            return 0;
        }

        $limit = (int) ($this->option('limit') ?: config('search.ai.per_run', 40));
        $until = microtime(true) + (int) $this->option('seconds');
        $rows  = DB::table('search_ai_queue')
            ->where('sq_tries', '<', SearchAi::MAX_TRIES)
            ->where(fn($q) => $q->whereNull('sq_next_at')->orWhere('sq_next_at', '<=', now()))
            ->orderByRaw("sq_from = 'search' DESC")->orderBy('sq_id')       //  손님이 방금 찾은 검색어 먼저
            ->limit($limit)->get();

        $n = ['ok' => 0, 'fail' => 0, 'kept' => 0];
        $stop = null;
        foreach ($rows as $r) {
            if (microtime(true) > $until)
                break;
            if (!SearchAi::countCall()) {
                $stop = '하루 호출 상한';
                break;
            }
            try {
                $a = SearchAi::ask($r->sq_kind, $r->sq_text);
                SearchAi::save($r->sq_kind, $r->sq_text, $a) ? $n['ok']++ : $n['kept']++;
                DB::table('search_ai_queue')->where('sq_id', $r->sq_id)->delete();
                SearchAi::succeeded();
            } catch (\RuntimeException $e) {
                $n['fail']++;
                $ours = $e->getCode() === SearchAi::OUR_SIDE;
                $tries = $r->sq_tries + ($ours ? 0 : 1);       //  우리 쪽 문제는 검색어 탓이 아님 → 횟수 안 깎음
                DB::table('search_ai_queue')->where('sq_id', $r->sq_id)->update([
                    'sq_tries'   => $tries,
                    'sq_error'   => mb_substr($e->getMessage(), 0, 200),
                    'sq_next_at' => now()->addMinutes($ours ? 5 : (SearchAi::RETRY_MIN[$tries] ?? 60)),
                ]);
                if (SearchAi::failed($e)) {
                    $stop = '차단기 내려감';
                    break;
                }
            }
        }

        if ($rows->isEmpty())
            return 0;
        $left = DB::table('search_ai_queue')->where('sq_tries', '<', SearchAi::MAX_TRIES)->count();
        $msg  = "search:ai-fill - 저장 {$n['ok']}, 검수본 유지 {$n['kept']}, 실패 {$n['fail']}, 남은 대기 {$left}" . ($stop ? " ({$stop})" : '');
        $this->info($msg);
        Log::channel('search-ai-detail')->info($msg);      //  1분마다라 작업 기록 표에는 안 남김 (문제는 SearchAi::alert가 남김)
        return 0;
    }

    //  글자 하나 바로 묻기 - 프롬프트·모델 확인용
    protected function askOne(): int {
        $kind = $this->option('kind');
        $text = $kind === 'query' ? \App\Services\GoodsElasticSearch::keyword($this->option('ask')) : trim($this->option('ask'));
        try {
            $a = SearchAi::ask($kind, $text, $this->option('model') ?: null, $this->option('provider') ?: null);
        } catch (\RuntimeException $e) {
            $this->error(($e->getCode() === SearchAi::OUR_SIDE ? '[키·요청 문제] ' : '') . $e->getMessage());
            return 1;
        }
        $this->line("글자: {$text}");
        $this->line("모델: {$a['model']} / {$a['prompt']} / {$a['ms']}ms / 토큰 {$a['tok_in']}+{$a['tok_out']}");
        $this->line("AI 원문: {$a['raw']}");
        $this->info("결과({$a['status']}): " . json_encode($a['result'], JSON_UNESCAPED_UNICODE));
        foreach ($a['dropped'] as $d)
            $this->warn("버림: {$d}");
        if ($this->option('save'))
            $this->line(SearchAi::save($kind, $text, $a) ? '수첩에 저장함' : '검수된 줄이라 저장 안 함');
        return 0;
    }
}