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
        $gd = new Goods;

        
        // return response('{ 
        //                    "banner_goods" : '.Redis::get('banner_goods').', 
        //                    "best_main" : '.Redis::get('best_main').', 
        //                    "best_cate" : '.Redis::get('best_cate').'}', 200)->header('Content-Type', 'application/json');
        return response()->json([
            "makers"          => Maker::with('fileInfo')->whereNotNull('mk_desc')->where('mk_desc', '!=', '')->orderBy('mk_name')->get()->chunk(12),  
            "newest"          => $gd->with('maker')->latest()->limit(4)->get(),
            "recommend_goods" => $gd->recommend_goods(10), // 배열
            "banner_goods"    => json_decode(Redis::get('banner_goods'), true),
            "best_main"       => json_decode(Redis::get('best_main'), true),
            "best_cate"       => json_decode(Redis::get('best_cate'), true), 
        ]);
    }
}
