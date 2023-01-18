<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ShowWindow;
use App\Models\Shop\{Goods, GoodsCategory, Hash, HashJoin};

class OutletController extends Controller {
	  public function index(Request $req, $type, $group) {
        $arr_id = Array();
        $mk_id = null;
        $hot_kind = false;
        switch ($type) {
            case 'pipette':
                $arr_id = ShowWindow::select('sw_key')->Type("outlet_{$type}")->Group($group)->pluck('sw_key');
            break;
            case 'tweezer':
                $h = Hash::HsTag($group)->first();                
                $arr_id = HashJoin::HsId($h->hs_id)->pluck('gd_id');
            break;
            case 'hotplate':
                if ( in_array($group, ['01', '02', '03', '04']) ) {
                    $arr_id = ShowWindow::select('sw_key')->Type("outlet_{$type}")->Group($group)->pluck('sw_key');
                    $hot_kind = true;
                } else {
                    $arr_id = GoodsCategory::CaId01(26)->CaId02(1095)->where(function ($q) {
                        $q->where('gc_ca03', 1100)->orWhere('gc_ca03', 1101);
                    })->pluck('gc_gd_id');
                    if ($group == 'IKA') $mk_id = 481;
                    else if ($group == 'AS ONE') $mk_id = 13;
                    else if ($group == '대한과학') $mk_id = 1180;
                    else if ($group == 'Lab companion') $mk_id = 23;
                    else if ($group == 'Global Lab') $mk_id = 423;
                    else if ($group == 'Corning') $mk_id = 25;
                    else if ($group == '미성과학기기') $mk_id = 720;
                }
            break;
            case 'meter':
                $arr_id = ShowWindow::select('sw_key')->Type("outlet_{$type}")->Group($group)->pluck('sw_key');
            break;
        }
        $rst = Goods::SchGd_id($arr_id)->orderBy('gd_rank')->orderBy('gd_view_cnt')
                  ->when($mk_id, fn ($q, $v) => $q->where("gd_mk_id", $v));
                  
        if ($hot_kind) {
            $rst = $rst->join('show_window', function ($join) use($type, $group) { 
                $join->on('shop_goods.gd_id', '=', 'show_window.sw_key')->where('sw_type', '=', "outlet_{$type}")->where('sw_group', '=', $group); 
            })->paginate(1000);
        }
        else $rst = $rst->paginate();

        
        $rst->appends($req->all())->links();

		    return response()->json($rst, 200);
    }
}
