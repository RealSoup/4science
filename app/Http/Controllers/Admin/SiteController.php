<?php

namespace App\Http\Controllers\Admin;

use App\Models\{Info, ShowWindow};
use App\Models\Shop\{Category};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Cache;
use DB;

class SiteController extends Controller {
    public function index() {
        $cfg = Info::all()->keyBy('key');
        foreach ($cfg as $v) {
            $v->var = json_decode($v->var);
        }
        return response()->json($cfg);
    }

    public function update(Request $req, Info $info) {
        if ($req->filled('site')) $info->updateOrCreate(['key' => 'site'], ['var' => json_encode($req->site)]);
        if ($req->filled('biz')) $info->updateOrCreate(['key' => 'biz'], ['var' => json_encode($req->biz)]);
        if ($req->filled('bank')) $info->updateOrCreate(['key' => 'bank'], ['var' => json_encode($req->bank)]);
        Cache::forget("site");   Cache::put('site', $req->site);
        Cache::forget("biz");   Cache::put('biz', $req->biz);
        Cache::forget("bank");  Cache::put('bank', $req->bank);
    }


    public function mainCateGoods(Request $req, $ca_id) {  
        $sw = ShowWindow::with('goods')->where([['sw_type', 'ca_best'], ['sw_group', $ca_id]])->orderBy("sw_seq")->get();    
        return response()->json($sw);
    }

    public function mainCateGoodsUpdate(Request $req) {
        foreach ($req->show_window as $sw) {
            ShowWindow::updateOrCreate(
                ['sw_id' => $sw['sw_id'] ?? ''],
                [   'sw_type'   => "ca_best",
                    'sw_group'  => $sw['sw_group'],
                    'sw_seq'    => $sw['sw_seq'],
                    'sw_key'    => $sw['sw_key'], ]
            );
        }

        foreach ($req->del_list as $dl) {
            DB::table('show_window')->where('sw_id', $dl)->delete();
        }

        return response()->json("success", 200);
    }
}
