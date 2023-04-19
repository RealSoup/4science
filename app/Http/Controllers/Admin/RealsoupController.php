<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class RealsoupController extends Controller {
    public function es_update(Request $req) {
        $paarray = [
            14 => ["pa_type" => "LAND", "pa_name" => "덕산", "pa_price" => 0, "mk_no" => 31],
            15 => ["pa_type" => "LAND", "pa_name" => "대정", "pa_price" => 0, "mk_no" => 30],
            16 => ["pa_type" => "LAND", "pa_name" => "삼전", "pa_price" => 0, "mk_no" => 29],
            17 => ["pa_type" => "LAND", "pa_name" => "s&s", "pa_price" => 0, "mk_no" => 32],
            18 => ["pa_type" => "LAND", "pa_name" => "Dk-Lok", "pa_price" => 0, "mk_no" => 33],
            19 => ["pa_type" => "AIR", "pa_name" => "Spherotech", "pa_price" => 70000, "mk_no" => 34],
            20 => ["pa_type" => "AIR", "pa_name" => "\r\nPlasmaChem", "pa_price" => 100000, "mk_no" => 35],
            21 => ["pa_type" => "AIR", "pa_name" => "\r\nUS Research Nanomaterials, Inc.", "pa_price" => 100000, "mk_no" => 36],
            22 => ["pa_type" => "AIR", "pa_name" => "Nanocomposix", "pa_price" => 100000, "mk_no" => 37],
            23 => ["pa_type" => "AIR", "pa_name" => "\r\nNovarials", "pa_price" => 120000, "mk_no" => 38],
            24 => ["pa_type" => "LAND", "pa_name" => "BGI", "pa_price" => 0, "mk_no" => 39],
            25 => ["pa_type" => "LAND", "pa_name" => "Ecotech", "pa_price" => 0, "mk_no" => 40],
            26 => ["pa_type" => "AIR", "pa_name" => "OMEGA", "pa_price" => 35000, "mk_no" => 41],
        ];
        
        $rst_er = DB::table('shop_estimate_reply')
            ->where('updated_at', '<=', '2023-04-17 08:21:59')
            ->where('created_at', '<', '2023-01-01 00:00:00')
            ->where('er_all_price', 0)
            ->where('er_id', '>', 89323)
            ->get();
        foreach( $rst_er as $er ){
            $rst_em = DB::table('shop_estimate_model')
            ->where('em_type', 'estimateReply')
            ->where('em_papa_id', $er->er_id)
            ->get();
           
            $collect = [];
            $pa_id = $er_dlvy_price = $er_gd_price = $er_air_price = $er_surtax = 0;
            foreach( $rst_em as $em ){
                $rst_gd = null;
                if($em->em_gd_id>0)
                    $rst_gd = DB::table('shop_goods')->where('gd_id', $em->em_gd_id)->first();
                
                if (!$rst_gd->exists()&&$rst_gd->gd_pa_id) $pa_id = $rst_gd->gd_pa_id;
                else $pa_id =0;

                if (!array_key_exists($pa_id, $collect)) {
                    if ($pa_id>0 && $paarray[$pa_id]["pa_type"] == "AIR")
                        $collect[$pa_id] = ['goods'=>0, 'dlvy'=>0, 'air'=>intval($paarray[$pa_id]["pa_price"]*1.1)];
                    else
                        $collect[$pa_id] = ['goods'=>0, 'dlvy'=>4400, 'free_dlvy_max'=>100000, 'air'=>0];
                }

                $collect[$pa_id]['goods'] += intval($em->em_price) * intval($em->em_ea);
            }

            foreach ($collect as $k => $v) {
                $er_gd_price += $v['goods'];
                $er_air_price = $v['air'];

                if ($v['dlvy'] && $v['goods'] < $v['free_dlvy_max']) {
                    $er_dlvy_price += intval($v['dlvy']);
                }
            }
            $er_surtax = intval($er_gd_price*0.1);

            $er_all_price = $er_gd_price+$er_surtax+$er_dlvy_price+$er_air_price;
            DB::table('shop_estimate_reply')->where('er_id', $er->er_id)->update([
                'er_gd_price'   => $er_gd_price,
                'er_surtax'     => $er_surtax,
                'er_dlvy_price' => $er_dlvy_price,
                'er_air_price'  => $er_air_price,
                'er_all_price'  => $er_all_price,
            ]);

            echo "{$er->er_id} <br>";
        }
        echo " <br>ORDER end <br>";
    }
}