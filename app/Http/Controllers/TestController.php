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
        echo_query(
Order::with('user')
			->select('shop_order.od_id', 'shop_order.created_id', 'shop_order_model.odm_id', 'shop_order_model.odm_ea', 'shop_order_model.odm_price')
			->join('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
			->join('shop_order_dlvy_info', 'shop_order_model.odm_id', '=', 'shop_order_dlvy_info.oddi_odm_id')
			->OdStep('50')
			->where('od_type', '<>', 'buy_temp')
			->StartDate('2022-01-01')
			->EndDate(date('Y-m-d', strtotime(date('Y-m-d')." -2 week")))
			->whereNull('shop_order_dlvy_info.oddi_receive_date')
			->orderBy('shop_order.od_id'));
            exit;

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
    
    public function merck_upload() {
        $mk = [ 'ALDRICH'	=> 2773,
                'AVANTI'	=> 3120,
                'SIAL' 		=> 2776,
                'SIGALD'	=> 2777,
                'SIGMA' 	=> 2778,
                'SUPELCO'	=> 2779,
                'USP' 		=> 3121 ];
        $mc = Excel::toCollection(new MerckImport, public_path('merck/a01.xlsx'));
        foreach ($mc[0] as $k => $v) {
            $gd_fk    = $v[0];
            $gm_code  = $v[1];
            $gm_name  = $v[2];
            $mk_name  = $v[3];
            $gm_price = $v[4];
            $gm_unit  = $v[5];
            $gm_spec  = '';
            $gm_prime = 'Y';
            $gm_catno = '40';
            $gm_catno01 = '40';
            $gm_catno02 = '40';
            $gm_catno03 = '40';

            $gd_name = $v[2];
            // IF($k==5)
            dd($v);
            $gm = DB::table('shop_goods_model')->where('gm_code', $v[1])->first();
            if ($gm) {
                DB::table('shop_goods_model')->where('gm_id', $gm->gm_id)->update([                    
                    'gm_name'  => $gm_name,
                    'gm_code'  => $gm_code,
                    'gm_spec'  => $gm_spec,
                    'gm_unit'  => $gm_unit,
                    'gm_price' => $gm_price,
                    'ip'       => 1234
                ]);
            } else {
                $gd = DB::table('shop_goods')->where('gd_fk', $gd_fk)->first();

                if($gd){
                    DB::table('shop_goods')
                    ->where('gd_id', $gd->gd_id)
                    ->where('ip', '<>', 1234)
                    ->update([
                        'gd_name'       => $gm_name,
                        'gd_desc'       => '',
                        'gd_dlvy_at'    => '1~4주',
                        'gd_mk_id'      => $mk[$mk_name],
                        'gd_rank'       => 999999,
                        'gd_seq'        => 999999,
                        'gd_fk'         => $gd_fk,
                        'ip'            => 1234
                    ]);
                    $gd_id = $gd->gd_id;
                } else {
                    $gd_id = DB::table('shop_goods')->where('gd_id', $gm->gm_gd_id)->insertGetId([
                        'gd_name'       => $gm_name,
                        'gd_desc'       => '',
                        'gd_dlvy_at'    => '1~4주',
                        'gd_mk_id'      => $mk[$mk_name],
                        'gd_rank'       => 999999,
                        'gd_seq'        => 999999,
                        'gd_fk'         => $gd_fk,
                    ]);
                }

                
                DB::table('shop_goods_model')->insert([
                    'gm_gd_id'   => $gd_id,
                    'gm_catno'   => $gm_catno,
                    'gm_catno01' => $gm_catno01,
                    'gm_catno02' => $gm_catno02,
                    'gm_catno03' => $gm_catno03,
                    'gm_prime'   => $gm_prime,
                    'gm_name'    => $gm_name,
                    'gm_code'    => $gm_code,
                    'gm_spec'    => $gm_spec,
                    'gm_unit'    => $gm_unit,
                    'gm_price'   => $gm_price,
                    'gm_enable'  => 'Y',
                    'ip'         => 1234
                ]);
                
            }

	// gm_id
	// gm_gd_id
	// gm_catno
	// gm_catno01
	// gm_catno02
	// gm_catno03
	// gm_prime
	// gm_name
	// gm_code
	// gm_spec
	// gm_unit
	// gm_price
	// gm_enable
	// created_id
	// updated_id
	// deleted_at
	// created_at
	// updated_at
	

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