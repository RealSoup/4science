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
        $schedule->command('exchange-rate:fetch')->dailyAt('11:30')->withoutOverlapping();
        // 5분후 해외가격 한화로 계산 등록
        $schedule->command('goods:recalc-foreign-price')->dailyAt('11:35')->withoutOverlapping();
        // 견적서 PDF 임시파일 정리 (큐 발송 여유 24시간 확보 후 삭제)
        $schedule->command('cleanup:estimate-pdf')->dailyAt('05:00');
        // 가격 엑셀 임시 폴더 정리 (사용 빈도 낮음 - 주 1회, 사람 없는 일요일)
        $schedule->command('cleanup:tmp-price-excel')->weeklyOn(0, '05:10'); // 매주 일요일 05:10
    }
}
