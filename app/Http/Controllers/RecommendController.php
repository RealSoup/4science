<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use App\Models\Shop\Goods;
use DB;

class RecommendController extends Controller {
    public function index() {
        $goods = Goods::where('gd_enable', 'Y')
        ->whereNull('deleted_at')
        ->orderByDesc('gd_view_cnt')
        ->limit(4)
        ->get();

        return response()->json(['goods' => $goods]);
    }
}