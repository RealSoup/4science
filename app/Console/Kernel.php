<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel {
    protected function commands() {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }


    protected function schedule(Schedule $schedule) {
        // 많이 팔린 상품 탑20 캐시 새로고침
        $schedule->call(function () {
            $affected = \DB::table('infos')->where('key', 'update_key_top_selling')->update(['val' => uniqid()]);
            \Log::channel('top-selling-cache')->info("top-selling-cache - infos.update_key_top_selling 갱신 완료 (영향받은 행: {$affected}건)");
        })->dailyAt('04:00');

        // 검색 score 업데이트
        $schedule->command('search:update-score')->dailyAt('03:00');
        //  15분마다 유저 패턴 입력
        $schedule->command('behavior:flush')->everyFifteenMinutes();
        // 일일 환율 갱신 (수출입은행)
        $schedule->command('exchange-rate:fetch')->dailyAt('11:25')->withoutOverlapping();
        // 5분후 해외가격 한화로 계산 등록
        $schedule->command('goods:recalc-foreign-price')->dailyAt('11:28')->withoutOverlapping();
        // 견적서 PDF 임시파일 정리 (큐 발송 여유 24시간 확보 후 삭제)
        $schedule->command('cleanup:estimate-pdf')->dailyAt('05:00');
        // 가격 엑셀 임시 폴더 정리 (사용 빈도 낮음 - 주 1회, 사람 없는 일요일)
        $schedule->command('cleanup:tmp-price-excel')->weeklyOn(0, '05:10'); // 매주 일요일 05:10
        // 해외 IP 판별용 국가 IP 파일 갱신 (매월 1일)
        $schedule->command('geoip:update')->monthlyOn(1, '04:30')->withoutOverlapping();
        // 검색 동의어 점검 - ES 재시작 후 동의어 세트가 꺼져 있으면 다시 읽기 (정상일 땐 기록 없음)
        $schedule->command('search:check-synonyms')->everyFiveMinutes()->withoutOverlapping();
        // 상품 속성 다시 뽑기 + 검색 색인 반영 (AI 검색) - 엑셀 일괄 수정 등 관리자 저장을 안 거친 변경까지 반영, 속성 칸이 켜진 경우만
        $schedule->command('search:extract-attrs --es')->dailyAt('02:30')->withoutOverlapping()->when(fn() => \App\Services\GoodsElasticSearch::hasAttr());
        // AI 검색어 통역 (AI 검색 2-2) - 대기 목록을 AI에 물어 수첩 채우기 / 밤에 인기 검색어 미리 넣기, SEARCH_AI_FILL이 켜진 경우만
        $schedule->command('search:ai-fill')->everyMinute()->withoutOverlapping(5)->runInBackground()->when(fn() => config('search.ai.fill'));
        $schedule->command('search:ai-prewarm')->dailyAt('04:00')->withoutOverlapping()->when(fn() => config('search.ai.fill'));
    }
}
