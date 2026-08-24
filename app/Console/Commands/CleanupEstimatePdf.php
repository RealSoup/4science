<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CleanupEstimatePdf extends Command {
    protected $signature   = 'cleanup:estimate-pdf';
    protected $description = '견적서 메일 발송용으로 임시 생성된 PDF 중 하루 지난 파일 정리';

    const KEEP_HOURS = 24; // 큐 발송/재시도 여유 시간

    public function handle() {
        $threshold = Carbon::now()->subHours(self::KEEP_HOURS)->timestamp;
        $files = Storage::files('public/estimatePdf');
        $deleted = 0;

        foreach ($files as $file) {
            if (Storage::lastModified($file) < $threshold) {
                Storage::delete($file);
                $deleted++;
            }
        }

        $this->info("견적서 PDF 정리 완료: {$deleted}건 삭제 (전체 {$this->countFiles($files)}건 중)");
    }

    private function countFiles($files) {
        return count($files);
    }
}