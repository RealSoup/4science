<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use App\Models\Shop\Goods;
use DB;

class UserBehaviorService {
    public function log(string $uuid, ?int $userId, string $action, ?string $target = null, ?string $ip = null): void {
        $goods = null;
        $gd_id = null;
        $gm_id = null;

        if ($target) {
            if (in_array($action, ['view', 'revisit', 'dwell'])) {

                if ($action === 'dwell') {
                    $redisKey = "behavior_check:{$uuid}:{$target}:dwell:" . date('Y-m-d');
                    if (Redis::get($redisKey)) return;
                    Redis::setex($redisKey, now()->secondsUntilEndOfDay(), 1);
                }

                $goods = \DB::table('shop_goods_category')
                    ->join('shop_goods', 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id')
                    ->where('gc_gd_id', $target)
                    ->where('gc_prime', 'Y')
                    ->select('gd_id', 'gd_name as gm_name', 'gc_ca01', 'gc_ca01_name', 'gc_ca02', 'gc_ca02_name', 'gc_ca03', 'gc_ca03_name', 'gc_ca04', 'gc_ca04_name')
                    ->first();

                $gd_id = $goods->gd_id ?? null;

                if ($action === 'view') {
                    $alreadyViewed = \DB::table('user_behavior_logs')
                        ->where('ubl_uuid', $uuid)
                        ->where('ubl_gd_id', $gd_id)
                        ->whereIn('ubl_action_type', ['view', 'revisit'])
                        ->whereDate('created_at', today())
                        ->exists();

                    if ($alreadyViewed) {
                        $action = 'revisit';
                    } else {
                        $redisKey = "behavior_check:{$uuid}:{$target}:view:" . date('Y-m-d');
                        if (Redis::get($redisKey)) return;
                        Redis::setex($redisKey, now()->secondsUntilEndOfDay(), 1);
                    }
                }

            } elseif (in_array($action, ['cart', 'purchase', 'estimate'])) {
                $goods = \DB::table('shop_goods_model')
                    ->join('shop_goods_category', 'shop_goods_category.gc_gd_id', '=', 'shop_goods_model.gm_gd_id')
                    ->where('shop_goods_model.gm_id', $target)
                    ->where('gc_prime', 'Y')
                    ->select('gm_id', 'gm_gd_id', 'gm_name', 'gc_ca01', 'gc_ca01_name', 'gc_ca02', 'gc_ca02_name', 'gc_ca03', 'gc_ca03_name', 'gc_ca04', 'gc_ca04_name')
                    ->first();

                $gd_id = $goods->gm_gd_id ?? null;
                $gm_id = $goods->gm_id ?? null;

            } elseif ($action === 'search') {
                $dedupKey = "behavior_dedup:search:{$uuid}:" . md5($target);
                if (Redis::get($dedupKey)) return;
                Redis::setex($dedupKey, 1800, 1);
            }
        }

        Redis::lpush('behavior_queue', json_encode([
            'uuid'            => $uuid,
            'created_id'      => $userId,
            'ubl_action_type' => $action,
            'ubl_keyword'     => $goods->gm_name ?? $target,
            'ubl_gd_id'       => $gd_id,
            'ubl_gm_id'       => $gm_id,
            'ubl_ca01'        => $goods->gc_ca01 ?? null,
            'ubl_ca01_name'   => $goods->gc_ca01_name ?? null,
            'ubl_ca02'        => $goods->gc_ca02 ?? null,
            'ubl_ca02_name'   => $goods->gc_ca02_name ?? null,
            'ubl_ca03'        => $goods->gc_ca03 ?? null,
            'ubl_ca03_name'   => $goods->gc_ca03_name ?? null,
            'ubl_ca04'        => $goods->gc_ca04 ?? null,
            'ubl_ca04_name'   => $goods->gc_ca04_name ?? null,
            'ip'              => $ip,
            'created_at'      => now()->toDateTimeString(),
        ]));

        Redis::ltrim('behavior_queue', 0, 9999);
    }
}