<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\MerckImport;
use App\Models\{EngReform};
use App\Models\Shop\{Order};
use DB;
use Excel;

class TestController extends Controller {

    public function index() {
        
        
        exit;



        $gm = DB::table('shop_goods_model')->where('gm_catno01', '47')->orderBy('gm_gd_id')->orderBy('gm_catno03')->get();

        $cnt = 1;
        foreach ($gm->groupBy('gm_gd_id') as $group) {
            foreach ($group as $k => $v) {
                $cat02 = substr("00000{$cnt}", -6);
                DB::table('shop_goods_model')->where('gm_id', $v->gm_id)->update(['gm_catno' => "47-{$cat02}-{$v->gm_catno03}", 'gm_catno02'=> $cat02]);
            }
            // $rst = DB::table('nc_addr_relation')->where([
            //     ['receive_nm', '=', $v->ua_name],
            //     ['doro_zip', 'like', $v->ua_zip.'%'],
            //     ['doro_address', '=', $v->ua_addr1],
            //     ['doro_address_detail', '=', $v->ua_addr2],
            //     ['receive_hp_no', '=', $v->ua_hp],
            // ])->first();

            // if ( $rst && $rst->doro_zip )
            //     DB::table('user_addr')->where('ua_id', $v->ua_id)->update(['ua_zip'=> $rst->doro_zip]);
            $cnt++;
            // if ($cnt == 4) break;
        }
    }
    
    
    function mail_display () {
        $data['con'] = EngReform::find(416);
        $data['con']->fileInfo;
        //  배열값을 넘겨줘야 하는데 values 함수 안쓰면 Object가 넘어온다.
        $data['con']->file_info_cplt = $data['con']->fileInfo->where('fi_kind', 'cplt')->values();
        $data['con']->mng;
        $data['option'] = EngReform::$option;
        dump($data);
        return view('admin.eng_reform.response', $data);
    }

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

    function download() {
        return response()->download(public_path('img/estimate_logo.png'));
    }
}