<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use App\Models\Shop\Goods;
use DB;

class UserBehaviorService {
    // Redis에 행동 임시 저장 (배치로 DB에 flush)
    public function log(string $uuid, ?int $userId, string $action, ?string $target = null, ?string $ip = null): void {
        $goods = null;
        $targetType = null;

        if ($target) {
            if (in_array($action, ['view', 'revisit', 'dwell'])) {
                $targetType = 'gd';

                // [추가] view/dwell Redis + DB 중복 체크
                $redisKey = "behavior_check:{$uuid}:{$target}:{$action}:" . date('Y-m-d');
                if (Redis::get($redisKey)) return;

                $alreadyLogged = \DB::table('user_behavior_logs')
                    ->where('uuid', $uuid)
                    ->where('goods_id', $target)
                    ->where('action', $action)
                    ->whereDate('created_at', today())
                    ->exists();
                if ($alreadyLogged) return;

                Redis::setex($redisKey, now()->secondsUntilEndOfDay(), 1);

                $goods = \DB::table('shop_goods_category')
                    ->join('shop_goods', 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id')
                    ->where('gc_gd_id', $target)
                    ->where('gc_prime', 'Y')
                    ->select('gd_id as goods_id', 'gd_name as gm_name', 'gc_ca01', 'gc_ca01_name', 'gc_ca02', 'gc_ca02_name', 'gc_ca03', 'gc_ca03_name', 'gc_ca04', 'gc_ca04_name')
                    ->first();

            } elseif (in_array($action, ['cart', 'purchase', 'estimate'])) {
                $targetType = 'gm';
                $goods = \DB::table('shop_goods_model')
                    ->join('shop_goods_category', 'shop_goods_category.gc_gd_id', '=', 'shop_goods_model.gm_gd_id')
                    ->where('shop_goods_model.gm_id', $target)
                    ->where('gc_prime', 'Y')
                    ->select('gm_id as goods_id', 'gm_name', 'gc_ca01', 'gc_ca01_name', 'gc_ca02', 'gc_ca02_name', 'gc_ca03', 'gc_ca03_name', 'gc_ca04', 'gc_ca04_name')
                    ->first();
            } elseif ($action === 'search') {
                $targetType = 'keyword';
            }
        }

        // [수정] view → revisit 체크
        if ($action === 'view' && $goods) {
            $alreadyViewed = \DB::table('user_behavior_logs')
                ->where('uuid', $uuid)
                ->where('goods_id', $target)
                ->whereIn('action', ['view', 'revisit'])
                ->whereDate('created_at', today())
                ->exists();

            if ($alreadyViewed) $action = 'revisit';
        }

        Redis::lpush('behavior_queue', json_encode([
            'uuid'        => $uuid,
            'created_id'  => $userId,
            'action'      => $action,
            'target'      => $goods->gm_name ?? $target,
            'target_type' => $targetType,
            'goods_id'    => $goods->goods_id ?? null,
            'ca01'        => $goods->gc_ca01 ?? null,
            'ca01_name'   => $goods->gc_ca01_name ?? null,
            'ca02'        => $goods->gc_ca02 ?? null,
            'ca02_name'   => $goods->gc_ca02_name ?? null,
            'ca03'        => $goods->gc_ca03 ?? null,
            'ca03_name'   => $goods->gc_ca03_name ?? null,
            'ca04'        => $goods->gc_ca04 ?? null,
            'ca04_name'   => $goods->gc_ca04_name ?? null,
            'ip'          => $ip,
            'created_at'  => now()->toDateTimeString(),
        ]));

        Redis::ltrim('behavior_queue', 0, 9999);
    }
}