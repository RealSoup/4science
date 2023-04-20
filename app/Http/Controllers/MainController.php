<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShowWindow;
use App\Models\Shop\Goods;
use Illuminate\Support\Facades\Cache;
use DB;

class MainController extends Controller {
    public function index(Request $request) {     
        $rst = Array();
        // $json = json_encode(Cache::get('categoryAll'), JSON_PRETTY_PRINT);
        // dd(file_put_contents("xx.json", $json));
        foreach (Cache::get('categoryAll') as $ca) {
            $rst['bestByCate'][$ca['ca_id']] = ShowWindow::with('goods')
            ->where('sw_type', 'ca_best')
            ->where('sw_group', $ca['ca_id'])
            ->orderBy('sw_seq')
            ->get();
        }
        $rst['best'] = Goods::SchGd_id(
            ShowWindow::select('sw_key')
            ->where('sw_type', 'best')
            ->orderBy('sw_seq')->orderBy('sw_id')
            ->limit(6)
            ->pluck('sw_key')
        )->with('goodsCategoryFirst')
        ->get();
        return response()->json($rst);
    }
}
