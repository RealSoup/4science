<?php

namespace App\Logging;

use Monolog\Handler\AbstractProcessingHandler;
use Illuminate\Support\Facades\DB;

class ScheduleSummaryHandler extends AbstractProcessingHandler
{
    protected function write(array $record): void
    {
        $job     = 'unknown';
        $message = (string) $record['message'];

        // "작업명 - 상세내용" 형태에서 작업명만 분리
        // (작업명 자체에 하이픈이 섞여 있어도 " - "(공백-하이픈-공백)만 구분자로 봄)
        if (preg_match('/^(.+?) - (.*)$/s', $message, $m)) {
            $job     = trim($m[1]);
            $message = trim($m[2]);
        }

        DB::table('schedule_logs')->insert([
            'job'        => $job,
            'level'      => $record['level_name'],
            'message'    => $message,
            'created_at' => $record['datetime'],
        ]);
    }
}