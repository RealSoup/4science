<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ShowWindow;
use App\Models\Shop\{Goods, GoodsCategory};

class OutletController extends Controller {
	  public function index(Request $req, $type, $group) {
        $arr_id = Array();
        $mk_id = null;
        $hot_kind = false;
        $rst = Goods::orderBy('gd_rank')->orderBy('gd_view_cnt')
                    ->whereNull('shop_goods.deleted_at') //  삭제 상품 제외
                    ->where('gd_enable', 'Y')               //  활성화 상품만 검색되게
                    ->where('gd_type', 'NON');               //  렌탈은 검색 안되게
        switch ($type) {
            case 'pipette':
                $arr_id = ShowWindow::select('sw_key')->Type("outlet_{$type}")->Group($group)->pluck('sw_key');
            break;
            case 'tweezer':
                $rst->whereFullText('gd_keyword', $group, ['mode' => 'boolean']);
            break;
            case 'hotplate':
                if ( in_array($group, ['01', '02', '03', '04']) ) {
                    $arr_id = ShowWindow::select('sw_key')->Type("outlet_{$type}")->Group($group)->pluck('sw_key');
                    $hot_kind = true;
                } else {
                    $arr_id = GoodsCategory::CaId01(26)->CaId02(1096)->where(function ($q) {
                        $q->where('gc_ca03', 1101)->orWhere('gc_ca03', 1102);
                    })->pluck('gc_gd_id');
                    if ($group == 'IKA') $mk_id = 446;
                    else if ($group == 'AS ONE') $mk_id = 14;
                    else if ($group == '대한과학') $mk_id = 1078;
                    else if ($group == 'Lab companion') $mk_id = 3224;
                    else if ($group == 'Global Lab') $mk_id = 394;
                    else if ($group == 'Corning') $mk_id = 26;
                    else if ($group == '미성과학기기') $mk_id = 656;
                    else if ($group == 'etc') $mk_id = [26, 965, 2613, 3050];
                    
                }
            break;
            case 'meter':
                $arr_id = ShowWindow::select('sw_key')->Type("outlet_{$type}")->Group($group)->pluck('sw_key');
            break;
        }
        
        $rst->when($type != 'tweezer', function ($q, $v) use($arr_id) { return $q->SchGd_id($arr_id); })
            ->when($mk_id, function ($q, $v) { 
                                if (is_array($v)) {
                                    return $q->whereIn("gd_mk_id", $v);
                                } else {
                                    return $q->where("gd_mk_id", $v);
                                }
                            }
            );
                  
        if ($hot_kind) {
            $rst = $rst->join('show_window', function ($join) use($type, $group) { 
                $join->on('shop_goods.gd_id', '=', 'show_window.sw_key')->where('sw_type', '=', "outlet_{$type}")->where('sw_group', '=', $group); 
            })->paginate(1000);
        } else $rst = $rst->paginate();
        
        $rst->appends($req->all())->links();
        return response()->json($rst, 200);
    }
}
