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
                'uuid'        => $data['uuid'],
                'action'      => $data['action'],
                'target'      => $data['target'] ?? null,
                'target_type' => $data['target_type'] ?? null,
                'goods_id'    => $data['goods_id'] ?? null,
                'ca01'        => $data['ca01'] ?? null,
                'ca01_name'   => $data['ca01_name'] ?? null,
                'ca02'        => $data['ca02'] ?? null,
                'ca02_name'   => $data['ca02_name'] ?? null,
                'ca03'        => $data['ca03'] ?? null,
                'ca03_name'   => $data['ca03_name'] ?? null,
                'ca04'        => $data['ca04'] ?? null,
                'ca04_name'   => $data['ca04_name'] ?? null,
                'created_id'  => $data['created_id'] ?? null,
                'ip'          => $data['ip'] ?? null,
                'created_at'  => $data['created_at'],
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