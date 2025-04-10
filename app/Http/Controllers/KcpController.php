<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use DB;


class KcpController extends Controller {
    
    protected $key_data;        // privatekey 파일 read
    protected $pri_key;     // privatekey 추출,  'changeit' 은 테스트용 개인키비밀번호
        
    public function __construct() {
        $this->key_data = Storage::disk('public')->get('kcp/KCP_AUTH_AKZZO_PRIKEY.pem');
        $this->pri_key = openssl_pkey_get_private($this->key_data, "4science20@%");
    }

    public function person_verification(Request $req) {
        $hash_data = env('g_conf_site_cd')."^".$req->ct_type."^".$req->make_req_dt; //up_hash 생성 서명 데이터
        
        //서명 데이터(무결성 검증)
        openssl_sign($hash_data, $signature, $this->pri_key, "sha256WithRSAEncryption");
        $kcp_sign_data = base64_encode($signature);

        $data = array(
            "site_cd"       => env('g_conf_site_cd'),
            "kcp_cert_info" => env('g_conf_cert_info'),
            "ct_type"       => $req->ct_type,
            "ordr_idxx"     => $req->ordr_idxx,
            "web_siteid"    => env('g_conf_web_siteid'),
            "make_req_dt"   => $req->make_req_dt,
            "kcp_sign_data" => $kcp_sign_data
        );

        $req_data = json_encode($data);
        $header_data = ["Content-Type: application/json", "charset=utf-8"];

        // up_hash 생성 REQ DATA
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, env('g_conf_cert_url'));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header_data);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $req_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // API RES
        $res_data = curl_exec($ch);

        // RES JSON DATA Parsing
        $json_res = json_decode($res_data, true);
        
        curl_close($ch);

        $json_res['site_cd'] = env('g_conf_site_cd');
        $json_res['web_siteid_hashYN'] = env('g_conf_web_siteid_hashYN');
        $json_res['web_siteid'] = env('g_conf_web_siteid');
        $json_res['return_url'] = env('APP_URL')."shop/order/adult_popup";
        return response()->json($json_res, 200);
    }

    public function ReqPopUp(Request $req) {
        // dd($req->all());
        // $req->res_msg = 123;

        if( $req->res_cd =="0000" ) {
            $ct_type = "CHK";
            $hash_data = env('g_conf_site_cd')."^".$ct_type."^".$req->cert_no."^".$req->dn_hash; // dn_hash 검증  서명 데이터

            //서명 데이터(무결성 검증)
            openssl_sign($hash_data, $signature, $this->pri_key, "sha256WithRSAEncryption");
            $kcp_sign_data = base64_encode($signature);

            $data = [
                "site_cd" => $req->site_cd,
                "kcp_cert_info" => env('g_conf_cert_info'),
                "ct_type" => $ct_type,
                "ordr_idxx" => $req->ordr_idxx, // dn_hash 검증 요청 전 가맹점 DB상의 주문번호와 동일한지 검증 후 요청 바랍니다.
                "cert_no" => $req->cert_no,
                "dn_hash" => $req->dn_hash,
                "kcp_sign_data" => $kcp_sign_data,
            ];

            $req_data = json_encode($data);
            $header_data = ["Content-Type: application/json", "charset=UTF-8"];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, env('g_conf_cert_url'));
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header_data);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $req_data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            // API RES
            $res_data = curl_exec($ch);

            // RES JSON DATA Parsing
            $json_res = json_decode($res_data, true);
            $dn_res_cd = $json_res["res_cd"];            
            curl_close($ch); 

            if($dn_res_cd == "0000"){ //dn_hash 검증이 완료 일 때
                $ct_type = "DEC";
                $hash_data = env('g_conf_site_cd')."^".$ct_type."^".$req->cert_no; // dn_hash 검증  서명 데이터

                //서명 데이터(무결성 검증)
                openssl_sign($hash_data, $signature, $this->pri_key, "sha256WithRSAEncryption");
                $kcp_sign_data = base64_encode($signature);
        
                $data = [
                    "site_cd" => $req->site_cd,
                    "kcp_cert_info" => env('g_conf_cert_info'),
                    "ct_type" => $ct_type,
                    "ordr_idxx" => $req->ordr_idxx,
                    "cert_no" => $req->cert_no,
                    "enc_cert_Data" => $req->enc_cert_data2,
                    "kcp_sign_data" => $kcp_sign_data,
                ];
        
                $req_data = json_encode($data);
                $header_data = ["Content-Type: application/json", "charset=UTF-8"];
        
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, env('g_conf_cert_url'));
                curl_setopt($ch, CURLOPT_HTTPHEADER, $header_data);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, $req_data);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        
                // API RES
                $res_data = curl_exec($ch);
        
                // RES JSON DATA Parsing
                $json_res = json_decode($res_data, true);

                $res_cd = $json_res["res_cd"];
                $res_msg = $json_res["res_msg"];
                $comm_id = $json_res["comm_id"];
                $phone_no = $json_res["phone_no"];
                $user_name = $json_res["user_name"];
                $birth_day = $json_res["birth_day"];
                $sex_code = $json_res["sex_code"];
                $local_code = $json_res["local_code"];

                $ci = $json_res["ci"];
                $di = $json_res["di"];
                $ci_url = $json_res["ci_url"];
                $di_url = $json_res["di_url"];
                $web_siteid = $json_res["web_siteid"];
                curl_close($ch); 

                // echo "결과코드 : ".$res_cd."<br>";
                // echo "결과메세지 : ".$res_msg."<br>";
                // echo "이동통신사 코드 : ".$comm_id."<br>";
                // echo "전화번호 : ".$phone_no."<br>";
                // echo "이름 : ".$user_name."<br>";
                // echo "생년월일 : ".$birth_day."<br>";
                // echo "성별코드 : ".$sex_code."<br>";
                // echo "내/외국인 정보 : ".$local_code."<br>";
                // echo "CI : ".$ci."<br>";
                // echo "DI : ".$di."<br>";
                // echo "CI_URL : ".$ci_url."<br>";
                // echo "DI_URL : ".$di_url."<br>";

         

 
                $year = substr($birth_day,0,4);
                $month = substr($birth_day,2,2);
                $day = substr($birth_day,4,2);  


                $a_year  = intval(date("Y"))-intval($year);
                $a_month = date("m");
                $a_day  = date("d");

                if( ($month <= $a_month) && ($day <= $a_day)) // 만 나이를 가져온다.
                    $age = $a_year;
                else
                    $age = ($a_year-1);

                if($age < 20)
                    $json_res["is_adult"] = 'false';
                else {
                    dump(auth()->user());
                    dd(auth()->user()->id);
                    DB::table('users')->where('id', auth()->user()->id)->update(['adult_verified_at'=> \Carbon\Carbon::now()]);
                    $json_res["is_adult"] = 'true';
                }
            } else { 
                dd($json_res); 
            }
        } else/*if( res_cd.equals( "0000" ) != true )*/ { // 인증실패
            echo "인증 실패<br>";
            if (isset($res_cd)) echo "결과코드 : ".$res_cd."<br>";
            if (isset($res_msg)) echo "결과메세지 : ".$res_msg."<br>";
            $json_res["rst"] = 'fail';
        }

        // return response()->json($json_res, 200);
        return redirect()->route('shop.order.adult_popup', $json_res);
    }
}
