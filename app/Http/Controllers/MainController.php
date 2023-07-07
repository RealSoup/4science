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
// dd(Hash::make('qwe123'));
// $2y$10$RPjQs/w.0FobQmOLQzbsd.7uMlIzpVzL/TzAgYe.4ovhvpNXVmdwy

        $data = Array();
        // $json = json_encode(Cache::get('categoryAll'), JSON_PRETTY_PRINT);
        // dd(file_put_contents("xx.json", $json));
        if ( !Redis::get('bestByCate') ) {
            foreach (Cache::get('categoryAll') as $ca) {
                $data['bestByCate'][$ca['ca_id']] = ShowWindow::with('goods')
                ->where('sw_type', 'ca_best')
                ->where('sw_group', $ca['ca_id'])
                ->orderBy('sw_seq')
                ->get();
            }
            Redis::set('bestByCate',  json_encode($data['bestByCate']));
        }
        if ( !Redis::get('best') ) {
            $data['best'] = Goods::SchGd_id(
                ShowWindow::select('sw_key')
                ->where('sw_type', 'best')
                ->orderBy('sw_seq')->orderBy('sw_id')
                ->limit(6)
                ->pluck('sw_key')
            )->with('goodsCategoryFirst')
            ->get()
            ->toJson();
            Redis::set('best',  $data['best']);
        }
        $rst = '{
            "bestByCate" : '.Redis::get('bestByCate').', 
            "best" : '.Redis::get('best').'
        }';
        return response($rst);
    }
}
