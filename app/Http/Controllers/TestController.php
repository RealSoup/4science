<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Imports\MerckImport;
use Excel;

class TestController extends Controller {
    public function index() {
        $addr = DB::table('user_addr')->whereRaw('LENGTH(ua_zip) = 4')->orderBy('ua_id', 'DESC')->get();
        foreach ($addr as $k => $v) {

            // dd(2);
            $rst = DB::table('nc_addr_relation')->where([
                ['receive_nm', '=', $v->ua_name],
                ['doro_zip', 'like', $v->ua_zip.'%'],
                ['doro_address', '=', $v->ua_addr1],
                ['doro_address_detail', '=', $v->ua_addr2],
                ['receive_hp_no', '=', $v->ua_hp],
            ])->first();

            if ( $rst && $rst->doro_zip )
                DB::table('user_addr')->where('ua_id', $v->ua_id)->update(['ua_zip'=> $rst->doro_zip]);
            
            // exit;
        }
    }
    
    // function merck_upload() {
    //     $mc = Excel::toCollection(new MerckImport, public_path('merck/a01.xlsx'));
    //     foreach ($mc[0] as $k => $v) {
    //         dd($v);
    //         $gd = DB::table('shop_goods')->where('gd_fk', $v[0])->first();
    //         if(!$gd){
    //             DB::table('shop_goods')->where('gd_id', $gm->gm_gd_id)->insert([
    //                 'gd_name'       => $v[],
    //                 'gd_desc'       => $v[],
    //                 'gd_keyword'    => $v[],
    //                 'gd_video'      => $v[],
    //                 'gd_dlvy_at'    => $v[],
    //                 'gd_enable'     => $v[],
    //                 'gd_type'       => $v[],
    //                 'gd_mk_id'      => $v[],
    //                 'gd_pa_id'      => $v[],
    //                 'gd_view_cnt'   => $v[],
    //                 'gd_mng_info'   => $v[],
    //                 'gd_memo'       => $v[],
    //                 'gd_rank'       => $v[],
    //                 'gd_seq'        => $v[],
    //                 'gd_fk'         => $v[],
    //                 'created_id'    => $v[],

    //                 'gd_name'    => $v[],
    //                 'gd_desc'    => $v[],
    //                 'gd_type'    => $v[],
    //                 'gd_mk_id'   => $v[],
    //                 'updated_id' => 9999
    //             ]);
    //         }
    //         $gm = DB::table('shop_goods_model')->where('gm_code', $v[1])->where('gm_catno01', '40')->first();
    //         // if($gd){
    //         //     DB::table('shop_goods_model')->where('gm_code', $v[1])->where('gm_catno01', '40')->update([
    //         //         'gm_name'    => $v[],
    //         //         'gm_spec'    => $v[],
    //         //         'gm_unit'    => $v[],
    //         //         'gm_price'   => $v[],
    //         //         'gm_enable'  => $v[],
    //         //         'updated_id' => 9999
    //         //     ]);
    //         //     DB::table('shop_goods')->where('gd_id', $gm->gm_gd_id)->update([
    //         //         'gd_name'    => $v[],
    //         //         'gd_desc'    => $v[],
    //         //         'gd_type'    => $v[],
    //         //         'gd_mk_id'   => $v[],
    //         //         'updated_id' => 9999
    //         //     ]);
    //         // } else{
    //         //     DB::table('shop_goods_model')->where('gm_code', $v[1])->where('gm_catno01', '40')->update([
    //         //         'gm_name'    => $v[],
    //         //         'gm_spec'    => $v[],
    //         //         'gm_unit'    => $v[],
    //         //         'gm_price'   => $v[],
    //         //         'gm_enable'  => $v[],
    //         //         'updated_id' => 9999
    //         //     ]);
    //         //     DB::table('shop_goods')->where('gd_id', $gm->gm_gd_id)->update([
    //         //         'gd_name'    => $v[],
    //         //         'gd_desc'    => $v[],
    //         //         'gd_type'    => $v[],
    //         //         'gd_mk_id'   => $v[],
    //         //         'updated_id' => 9999
    //         //     ]);
    //         // }
    //     }
        
    // }

    function post($url, $fields) {
        $post_field_string = http_build_query($fields, '', '&');
        $ch = curl_init();                                         // curl 초기화
        curl_setopt($ch, CURLOPT_URL, $url);                       // url 지정하기
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);            // 요청결과를 문자열로 반환
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);              // connection timeout : 10초
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);           // 원격 서버의 인증서가 유효한지 검사 여부
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_field_string);  // POST DATA
        curl_setopt($ch, CURLOPT_POST, true);                      // POST 전송 여부
        $response = curl_exec($ch);
        curl_close ($ch);
        return $response;
    }
}