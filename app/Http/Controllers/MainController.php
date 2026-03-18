<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShowWindow;
use App\Models\Shop\{Goods, Maker};
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use DB;

class MainController extends Controller {
    public function index(Request $request) {
        return response()->json([
            "maker_shop"      => json_decode(Redis::get('maker_shop'), true),
            "newest"          => json_decode(Redis::get('newest'), true),
            "recommend_goods" => json_decode(Goods::recommend_goods(10), true),
            "banner_goods"    => json_decode(Redis::get('banner_goods'), true),
            "best_main"       => json_decode(Redis::get('best_main'), true),
            "best_cate"       => json_decode(Redis::get('best_cate'), true), 
        ]);
    }
}
