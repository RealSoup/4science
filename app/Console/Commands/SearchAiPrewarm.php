<?php

namespace App\Console\Commands;

use App\Services\SearchAi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, Log};

//  AI 통역 미리 채우기 (AI 검색 2-2, 밤마다) - 대기 목록에 넣기만 하고 실제 묻기는 1분 작업(search:ai-fill)이 함
//  1. 최근 인기 검색어 중 수첩에 없는 것  2. 프롬프트 버전이 바뀐 검수 안 한 줄  3. 7일 지난 대기 줄 정리
class SearchAiPrewarm extends Command {
    protected $signature = 'search:ai-prewarm
                            {--days=30 : 최근 며칠 검색 로그}
                            {--top=500 : 인기 검색어 최대 개수}
                            {--min=2 : 최소 검색한 사람 수}
                            {--stale=1000 : 다시 물을 옛 버전 줄 최대 개수}
                            {--dry-run : 넣지 않고 개수만}';
    protected $description = 'AI 검색어 통역 - 인기 검색어·옛 버전 줄을 대기 목록에 넣고 오래된 대기 줄 정리 (밤마다)';

    public function handle() {
        $dry = $this->option('dry-run');

        //  1. 인기 검색어 (사람 수 = uuid, 없으면 IP)
        $popular = DB::table('search_logs')
            ->where('created_at', '>=', now()->subDays((int) $this->option('days'))->startOfDay())
            ->where(fn($q) => $q->whereNull('sl_mode')->orWhereNotIn('sl_mode', ['cat_no', 'gm_code']))
            ->groupBy('sl_keyword_norm')
            ->havingRaw('COUNT(DISTINCT COALESCE(sl_uuid, ip)) >= ?', [(int) $this->option('min')])
            ->orderByRaw('COUNT(DISTINCT COALESCE(sl_uuid, ip)) DESC')
            ->limit((int) $this->option('top'))
            ->pluck('sl_keyword_norm')
            ->filter(fn($k) => SearchAi::askable((string) $k));

        $have = DB::table('search_ai')->where('sa_kind', 'query')->whereIn('sa_hash', $popular->map(fn($k) => md5($k))->values())->pluck('sa_hash')->flip();
        $new  = $popular->reject(fn($k) => isset($have[md5($k)]));

        //  2. 프롬프트 버전이 바뀐 줄 - 새 답이 올 때까지 옛 답을 계속 씀
        $stale = DB::table('search_ai')->where('sa_checked', 'N')
            ->where(fn($q) => $q->where(fn($q) => $q->where('sa_kind', 'query')->where('sa_prompt', '<>', SearchAi::PROMPT['query']))
                                ->orWhere(fn($q) => $q->where('sa_kind', 'spec')->where('sa_prompt', '<>', SearchAi::PROMPT['spec'])))
            ->orderBy('sa_id')->limit((int) $this->option('stale'))
            ->get(['sa_kind', 'sa_text']);

        $added = 0;
        $old   = DB::table('search_ai_queue')->where('created_at', '<', now()->subDays(7));
        if (!$dry) {
            foreach ($new as $k)
                $added += SearchAi::enqueue('query', $k, 'nightly');
            foreach ($stale as $s)
                $added += SearchAi::enqueue($s->sa_kind, $s->sa_text, 'nightly');
            $purged = $old->delete();
        } else {
            $purged = $old->count();
        }

        $msg = 'search:ai-prewarm - ' . ($dry ? '미리보기: ' : '')
             . "인기 검색어 {$popular->count()}개 중 새로 {$new->count()}개, 옛 버전 {$stale->count()}줄, 대기 목록에 넣음 {$added}, 7일 지난 대기 줄 정리 {$purged}";
        $this->info($msg);
        if (!$dry)
            Log::channel('search-ai')->info($msg);
        return 0;
    }
}