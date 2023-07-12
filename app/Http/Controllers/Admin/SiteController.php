<?php

namespace App\Http\Controllers\Admin;

use App\Models\{Info, ShowWindow};
use App\Models\Shop\{Category};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Cache;
use DB;

class SiteController extends Controller {
    public function index() {
        $cfg = Info::all()->keyBy('key');
        foreach ($cfg as $v) {
            $v->val = json_decode($v->val);
        }
        return response()->json($cfg);
    }

    public function update(Request $req, Info $info) {
        if ($req->filled('site')) $info->updateOrCreate(['key' => 'site'], ['val' => json_encode($req->site)]);
        if ($req->filled('biz')) $info->updateOrCreate(['key' => 'biz'], ['val' => json_encode($req->biz)]);
        if ($req->filled('bank')) $info->updateOrCreate(['key' => 'bank'], ['val' => json_encode($req->bank)]);
        
        // DB::table('infos')->where('key', 'update_key_site_info')->update(['val' => uniqid()]);
        Cache::forget("site");
        Cache::forget("biz");
        Cache::forget("bank");
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

        foreach ($req->del_list as $dl) 
            DB::table('show_window')->where('sw_id', $dl)->delete();
  
        DB::table('infos')->where('key', 'update_key_best_cate')->update(['val' => uniqid()]);
        return response()->json("success", 200);
    }

    public function mainBest(Request $req) {  
        $sw = ShowWindow::select('sw_id', 'sw_seq', 'sw_key')->with('goods')->Type('best')->orderBy("sw_seq")->limit(6)->get();
        return response()->json($sw);
    }

    public function mainBestUpdate(Request $req) {
        foreach ($req->best as $sw) {
            ShowWindow::updateOrCreate(
                ['sw_id'   => $sw['sw_id'] ?? ''],
                ['sw_type' => "best",
                 'sw_seq'  => $sw['sw_seq'],
                 'sw_key'  => $sw['sw_key'], ]
            );
        }

        foreach ($req->del_list as $dl)
            DB::table('show_window')->where('sw_id', $dl)->delete();
        
        DB::table('infos')->where('key', 'update_key_best_main')->update(['val' => uniqid()]);
        return response()->json("success", 200);
    }
}
