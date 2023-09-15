<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class TestController extends Controller {
    public function index() { }
    public function psys() {
        $headers = array(); 
        array_push($headers, "content-type: application/json; charset=utf-8");
        array_push($headers, "WebKey: ".env('PSYS_APIKEY'));

        $psys_api_url = "https://sandbox.psys.co.kr/EdiAuth/edi_encrypt";

        $edi_date = date('YmdHis');
        $request_data_array = array(
            'WEB_ID' => env('PSYS_APIID'),
            'AMOUNT' => '100',
            'EDI_DATE'=> $edi_date,
        );

        $psys_api_json = json_encode($request_data_array, TRUE);

        $ch = curl_init(); // curl 초기화

        curl_setopt($ch,CURLOPT_URL, $psys_api_url);
        curl_setopt($ch,CURLOPT_POST, false);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $psys_api_json);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
        curl_setopt($ch,CURLOPT_TIMEOUT, 20);
        curl_setopt($ch,CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        curl_close($ch);

        $result_array = json_decode($response, true);

        $rst['edi_date'] = $edi_date;
        $rst['api_key'] = env('PSYS_APIKEY');
        $rst['api_id']  = env('PSYS_APIID');
        $rst['api_url'] = 'https://sandbox.psys.co.kr/outvendnew/vendor/input';
        $rst['ReturnURL'] = env('APP_URL').'test/psysReturn';
        $rst['Psys_securekey'] = $result_array['encryptData'];
        if($result_array['RESULTCODE'] == "9999") { 
            echo "result_code=E009\r\nresult_msg=웹연동 결제 설정이 되어있지 않습니다.";
            exit;
        }
        // dd($rst);

        return response()->json($rst, 200); 
    }

    public function psysReturn(Request $req) {
        dd($req->all());
        return redirect("/test/psys_return");
    }

}
