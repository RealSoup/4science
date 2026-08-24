<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class CleanupTmpPriceExcel extends Command {
    protected $signature   = 'cleanup:tmp-price-excel';
    protected $description = '가격 엑셀 다운로드용으로 생성된 임시 폴더 일요일 아침 05:10 정리';

    const KEEP_HOURS = 1; // 다운로드는 보통 몇 초~몇 분 안에 끝나므로 1시간이면 충분

    public function handle() {
        $baseDir = storage_path('app');
        $threshold = Carbon::now()->subHours(self::KEEP_HOURS)->timestamp;
        $deleted = 0;

        foreach (glob("{$baseDir}/tmp_price_excel_*", GLOB_ONLYDIR) as $dir) {
            if (filemtime($dir) < $threshold) {
                $this->deleteDir($dir);
                $deleted++;
            }
        }

        $this->info("임시 폴더 정리 완료: {$deleted}건 삭제");
    }

    private function deleteDir($dir) {
        foreach (glob("{$dir}/*") as $file) {
            is_dir($file) ? $this->deleteDir($file) : unlink($file);
        }
        rmdir($dir);
    }
}