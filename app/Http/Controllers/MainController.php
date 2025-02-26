<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShowWindow;
use App\Models\Shop\Goods;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use DB;

class MainController extends Controller {
    public function index(Request $request) {
        return response('{ "best_cate" : '.Redis::get('best_cate').', 
                           "best_main" : '.Redis::get('best_main').'}', 200)->header('Content-Type', 'application/json');
    }
}
