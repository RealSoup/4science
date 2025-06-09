<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, GoodsCategory, Maker};
use Illuminate\Support\Arr;

class MakerController extends Controller {

	public function index() {
        return response()->json(Maker::all(), 200);
    }

	public function makerShop(Request $req, $mk_id) {
        $rst['mk'] = Maker::with('fileInfo')->find($mk_id);
        // $rst['gd'] = Goods::where('gd_mk_id', $mk_id)->get();

        $raw_data = Goods::join('shop_goods_category', 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id')
            ->select('gc_ca01', 'gc_ca01_name', 'gc_ca02', 'gc_ca02_name', 'gc_ca03', 'gc_ca03_name', 'gc_ca04', 'gc_ca04_name',
                    'gd_id', 'gd_name')
            ->where('gd_mk_id', $mk_id)->get();
        $ca_data = array();
        foreach ($raw_data as $k => $v) {
            if (!empty($v['gc_ca01'])) {
                if (!array_key_exists($v['gc_ca01'], $ca_data))
                    $ca_data[$v['gc_ca01']] = [];

                if (empty($v['gc_ca02'])) {
                    $ca_data[$v['gc_ca01']]['data'][] = $v;
                } else {
                    if (!array_key_exists($v['gc_ca02'], $ca_data[$v['gc_ca01']]))
                        $ca_data[$v['gc_ca01']][$v['gc_ca02']] = [];

                    if (empty($v['gc_ca03'])) {
                        $ca_data[$v['gc_ca01']][$v['gc_ca02']]['data'][] = $v;
                    } else {
                        if (!array_key_exists($v['gc_ca03'], $ca_data[$v['gc_ca01']][$v['gc_ca02']]))
                            $ca_data[$v['gc_ca01']][$v['gc_ca02']][$v['gc_ca03']] = [];
                        
                        if (empty($v['gc_ca04'])) {
                            $ca_data[$v['gc_ca01']][$v['gc_ca02']][$v['gc_ca03']]['data'][] = $v;
                        } else {
                            if (!array_key_exists($v['gc_ca04'], $ca_data[$v['gc_ca01']][$v['gc_ca02']][$v['gc_ca03']]))
                                $ca_data[$v['gc_ca01']][$v['gc_ca02']][$v['gc_ca03']][$v['gc_ca04']] = [];

                            $ca_data[$v['gc_ca01']][$v['gc_ca02']][$v['gc_ca03']][$v['gc_ca04']]['data'][] = $v;
                        }
                    }
                }
            }
        }
        $rst['gd'] = $ca_data;
        return response()->json($rst, 200);
    }
    


}
