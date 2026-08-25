<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Shop\Maker;
use App\Models\Shop\ExchangeRate;
use Illuminate\Support\Facades\DB;

class RecalcForeignGoodsPrice extends Command {
    protected $signature   = 'goods:recalc-foreign-price';
    protected $description = '외화 제조사 상품의 판매가를 최신 환율로 배치 단위 재계산';

    const CHUNK_SIZE = 5000;

    public function handle() {
        $prefix = DB::getTablePrefix(); // 'la_' — 별칭에도 프리픽스가 붙으므로 raw SQL에서 맞춰줘야 함
        $currencies = Maker::where('mk_currency', '!=', 'KRW')->distinct()->pluck('mk_currency');
        $total = 0;

        foreach ($currencies as $currency) {
            $rate = ExchangeRate::current($currency);
            if (!$rate) {
                $this->warn("[{$currency}] 환율 정보 없음, 건너뜀");
                \Log::channel('goods-recalc-foreign-price')->warning("goods:recalc-foreign-price - [{$currency}] 환율 정보 없음, 건너뜀");
                continue;
            }

            $unit = 1;
            if (preg_match('/\((\d+)\)/', $currency, $m)) $unit = intval($m[1]);
            $unitRate = $rate->er_rate / $unit;

            $lastId = 0;
            do {
                $ids = DB::table('shop_goods_model as gm')
                    ->join('shop_goods as g', 'g.gd_id', '=', 'gm.gm_gd_id')
                    ->join('shop_makers as mk', 'mk.mk_id', '=', 'g.gd_mk_id')
                    ->where('mk.mk_currency', $currency)
                    ->where('gm.gm_price_origin', '>', 0)
                    ->where('gm.gm_id', '>', $lastId)
                    ->orderBy('gm.gm_id')
                    ->limit(self::CHUNK_SIZE)
                    ->pluck('gm.gm_id');

                if ($ids->isEmpty()) break;

                $affected = DB::table('shop_goods_model as gm')
                    ->join('shop_goods as g', 'g.gd_id', '=', 'gm.gm_gd_id')
                    ->join('shop_makers as mk', 'mk.mk_id', '=', 'g.gd_mk_id')
                    ->whereIn('gm.gm_id', $ids)
                    ->update([
                        'gm.gm_price' => DB::raw(
                            "CEIL(({$prefix}gm.gm_price_origin * " . floatval($unitRate) . " * (1 + {$prefix}mk.mk_customs_rate/100) * (1 + {$prefix}mk.mk_margin_rate/100)) / 100) * 100"
                        ),
                    ]);

                $total += $affected;
                $lastId = $ids->max();
                usleep(50000);

            } while ($ids->count() == self::CHUNK_SIZE);
        }

        $this->info("판매가 재계산 완료: {$total}건");
        \Log::channel('goods-recalc-foreign-price')->info("goods:recalc-foreign-price - {$total}건 갱신 완료");
    }
}