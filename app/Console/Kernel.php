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
            \DB::table('infos')->where('key', 'update_key_top_selling')->update(['val' => uniqid()]);
        })->dailyAt('04:00');

        // 검색 score 업데이트
        $schedule->command('search:update-score')->dailyAt('03:00');

        $schedule->command('behavior:flush')->everyFifteenMinutes();
    }
}
