<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;

class FlushBehaviorLogs extends Command {
    protected $signature = 'behavior:flush';
    protected $description = 'Redis behavior_queue를 DB에 저장';

    public function handle() {
        $count = 0;
        $batch = [];

        while (true) {
            $item = Redis::rpop('behavior_queue');
            if (!$item) break;

            $data = json_decode($item, true);

            $batch[] = [
                'ubl_uuid'        => $data['uuid'],
                'ubl_action_type' => $data['ubl_action_type'],
                'ubl_keyword'     => $data['ubl_keyword'] ?? null,
                'ubl_gd_id'       => $data['ubl_gd_id'] ?? null,
                'ubl_gm_id'       => $data['ubl_gm_id'] ?? null,
                'ubl_ca01'        => $data['ubl_ca01'] ?? null,
                'ubl_ca01_name'   => $data['ubl_ca01_name'] ?? null,
                'ubl_ca02'        => $data['ubl_ca02'] ?? null,
                'ubl_ca02_name'   => $data['ubl_ca02_name'] ?? null,
                'ubl_ca03'        => $data['ubl_ca03'] ?? null,
                'ubl_ca03_name'   => $data['ubl_ca03_name'] ?? null,
                'ubl_ca04'        => $data['ubl_ca04'] ?? null,
                'ubl_ca04_name'   => $data['ubl_ca04_name'] ?? null,
                'created_id'      => $data['created_id'] ?? null,
                'ip'              => $data['ip'] ?? null,
                'created_at'      => $data['created_at'],
            ];

            if (count($batch) >= 500) {
                DB::table('user_behavior_logs')->insert($batch);
                $count += count($batch);
                $batch = [];
            }
        }

        if (!empty($batch)) {
            DB::table('user_behavior_logs')->insert($batch);
            $count += count($batch);
        }

        \Log::channel('behavior')->info("behavior:flush - 총 {$count}건 저장");
        $this->info("총 {$count}건 저장 완료");
    }
}