<?php

namespace app\Http\Controllers\admin\shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\ExchangeRate;

class ExchangeRateController extends Controller {
    public function latest($currency) {
        $rate = ExchangeRate::current($currency);
        if (!$rate) return response()->json(null, 200);

        return response()->json([
            'er_cur_unit'  => $rate->er_cur_unit,
            'er_rate'      => $rate->er_rate,
            'er_rate_date' => $rate->er_rate_date->format('Y-m-d'),
            'is_today'     => $rate->er_rate_date->format('Y-m-d') === now()->format('Y-m-d'),
        ], 200);
    }
}