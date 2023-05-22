<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Storage;

use App\Models\ShowWindow;
use App\Models\Shop\Goods;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;


class RealsoupController extends Controller {

    public function index(Request $req) {
        $rst = DB::select( "
                select glt_no, gd_id
                from la_shop_goods a
                where 
                    glt_no <= ?
                order by glt_no
            ", [359]);
        foreach( $rst as $v ){
            $gf = DB::select( "
                SELECT * 
                FROM nc_site_meta_file 
                WHERE mtf_parent_tbl = 'item_file' AND 
                mtf_delete_yn = 'N' AND 
                mtf_parent_no = ?
                limit 1
            ", [$v->glt_no]); 
            if($gf && $gf[0]) {
                DB::table('file_goods')->where('fi_key', $v->gd_id)->where('fi_kind', 'add')->delete();

                $fi_path = @intval($v->gd_id/1000)+1;
                $size = @intval($gf[0]->mtf_size??0) * 1024;
                $ext=null;
                $origin = '';
                if(isset($gf[0]->mtf_file_origin) && $gf[0]->mtf_file_origin) $origin = $gf[0]->mtf_file_origin;
                else $origin = $gf[0]->mtf_file;
                $ext = explode('.', $origin);
                $ext = strtolower(end($ext));
                
                $fi_new = uniqid().".{$ext}";
                DB::table('file_goods')->insert([
                    'fi_key'  => $v->gd_id, 
                    'fi_room' => $fi_path,
                    'fi_kind' => 'add',
                    'fi_original' => addslashes($origin),
                    'fi_new'  => $fi_new,
                    'fi_size' => $size,
                    'fi_ext'  => $ext
                ]);
                

                $file01 = "https://www.4science.net/UserFiles2/item_file/".rawurlencode($gf[0]->mtf_file_origin);
                $file02 = "api_goods/{$fi_path}/add/".$fi_new;

                $file_headers = get_headers($file01);
                if(strpos($file_headers[0], '404') === false)
                    Storage::disk('s3')->put($file02, file_get_contents($file01));
            }
            
            
            //  keyword

            $gl = DB::select( " SELECT goods_keyword FROM nc_goods_list WHERE glt_no = ? limit 1 ", [$v->glt_no]);
            if($gl && $gl[0] && $gl[0]->goods_keyword!='')
                DB::table('shop_goods')->where('gd_id', $v->gd_id)->update([ 'gd_keyword'   => $gl[0]->goods_keyword ]);


            echo "{$v->glt_no} <br>";








            
        }
        echo " <br>end <br>";
    }
    public function test (Request $req) {
        
    }
    public function play (Request $req) {
        
    }

    public function index00(Request $req) {
        // Redis::set('name',  '김진국'); // 10 Minutes
        // $lists = Cache::rememberForever('list_cache', function(){
        //     return auth()->user()->name;
        // });

        // dd(Redis::get('name'));
    }

    public function es_update_000(Request $req) {
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
            ->where('er_id', '>', 449266)
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
                
                if ($rst_gd !== null&&$rst_gd->gd_pa_id) $pa_id = $rst_gd->gd_pa_id;
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