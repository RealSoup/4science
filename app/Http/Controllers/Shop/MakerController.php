<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, GoodsCategory, Maker};
use Illuminate\Support\Arr;
use DB;

class MakerController extends Controller {

	public function index() {
        return response()->json(Maker::all(), 200);
    }

	public function makerShop(Request $req, $mk_id) {
        $rst['mk'] = Maker::with('fileInfo')->find($mk_id);
        $raw_data = DB::table('shop_goods')->join('shop_goods_category', 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id')
            ->select('gc_ca01', 'gc_ca01_name', 'gc_ca02', 'gc_ca02_name', 'gc_ca03', 'gc_ca03_name', 'gc_ca04', 'gc_ca04_name',
                    'gd_id', 'gd_name')
            ->where('gd_mk_id', $mk_id)->get();
            
        $ca_data = array();
        foreach ($raw_data as $k => $v) {
            if (!empty($v->gc_ca01)) {
                if (!array_key_exists($v->gc_ca01, $ca_data))
                    $ca_data[$v->gc_ca01] = [];


                ///////////////  이미지 추출 시작 ////////////////////////
                $fi = DB::table('file_goods')
                    ->select('fi_group', 'fi_room', 'fi_kind', 'fi_new')
                    ->where('fi_key', $v->gd_id)
                    ->where('fi_kind', 'goods')
                    ->orderBy('fi_seq')
                    ->first();

                $src = "";
                if (strpos($fi->fi_new, "https://") === 0 || strpos($fi->fi_new, "http://") === 0)
                    $src = $fi->fi_new;
                else
                    $src = "/storage/api_{$fi->fi_group}/{$fi->fi_room}/{$fi->fi_kind}/thumb/{$fi->fi_new}";
             

                $noimg_p = null;
            
                if ($v->gc_ca01 == 28 ) {
                    if ( $v->gc_ca02 == 3614 ) { $src = NULL; $noimg_p = 'trc.png'; }
                    else {
                        if ( $rst['mk']->mk_name == 'Burdick & Jackson' )  $noimg_p = 'Burdick Jackson.png';
                        else if ( $rst['mk']->mk_name == 'DAEJUNG' )       $noimg_p = 'DAEJUNG.png';
                        else if ( $rst['mk']->mk_name == 'DUKSAN' )        $noimg_p = 'DUKSAN.png';
                        else if ( $rst['mk']->mk_name == 'J.T.Baker' )     $noimg_p = 'J_T_Baker.png';
                        else if ( $rst['mk']->mk_name == 'JUNSEI' )        $noimg_p = 'JUNSEI.png';
                        else if ( $rst['mk']->mk_name == 'KANTO' )         $noimg_p = 'KANTO.png';
                        else if ( $rst['mk']->mk_name == 'SAMCHUN' )       $noimg_p = 'SAMCHUN.png';
                        else if ( $rst['mk']->mk_name == 'YAKURI' )        $noimg_p = 'YAKURI.png';
                    }
                    
                } else if ($v->gc_ca01 == 40 ) {
                    $noimg_p = 'noimg_merck.png';
                }
                    
                if ($noimg_p)
                    $src = noimg($noimg_p);

                
                ////////////////    이미지 추출 시작  끝   ////////////////


                $v->img_src_thumb = $src;
                if (empty($v->gc_ca02)) {
                    $ca_data[$v->gc_ca01]['data'][] = $v;
                } else {
                    if (!array_key_exists($v->gc_ca02, $ca_data[$v->gc_ca01]))
                        $ca_data[$v->gc_ca01][$v->gc_ca02] = [];

                    if (empty($v->gc_ca03)) {
                        $ca_data[$v->gc_ca01][$v->gc_ca02]['data'][] = $v;
                    } else {
                        if (!array_key_exists($v->gc_ca03, $ca_data[$v->gc_ca01][$v->gc_ca02]))
                            $ca_data[$v->gc_ca01][$v->gc_ca02][$v->gc_ca03] = [];
                        
                        if (empty($v->gc_ca04)) {
                            $ca_data[$v->gc_ca01][$v->gc_ca02][$v->gc_ca03]['data'][] = $v;
                        } else {
                            if (!array_key_exists($v->gc_ca04, $ca_data[$v->gc_ca01][$v->gc_ca02][$v->gc_ca03]))
                                $ca_data[$v->gc_ca01][$v->gc_ca02][$v->gc_ca03][$v->gc_ca04] = [];

                            $ca_data[$v->gc_ca01][$v->gc_ca02][$v->gc_ca03][$v->gc_ca04]['data'][] = $v;
                        }
                    }
                }
            }
        }
        $rst['gd'] = $ca_data;
        return response()->json($rst, 200);
    }
    


}
