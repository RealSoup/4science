<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use DB;
use App\Services\KcpCrypto;


class KcpController extends Controller {
        
    public function person_verification(Request $req) {
        $site_cd  = env('KCP_SITE_CD');
        $enc_key  = env('KCP_ENC_KEY');
        $ret_url  = env('KCP_RET_URL');
        $cert_url = env('KCP_CERT_URL');

        $ordr_idxx = $req->ordr_idxx ?? '';

        $req_json = json_encode([
            "site_cd"     => $site_cd,
            "ordr_idxx"   => $ordr_idxx,
            "Ret_URL"     => $ret_url,
            "web_siteid"  => "",
            "param_opt_1" => "",
            "param_opt_2" => "",
            "param_opt_3" => "",
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $encrypted = KcpCrypto::encryptJson($req_json, $enc_key, $site_cd);

        $result = $this->curlPost($cert_url, [
            "Content-Type: application/json",
            "site_cd: {$site_cd}",
            "rv: {$encrypted['rv']}",
        ], $encrypted['encData']);
\Log::info('KCP_CERT_RESULT', $result);
        if (($result['res_cd'] ?? '') !== '0000') {
            return response()->json([
                'res_cd'  => $result['res_cd'] ?? 'ERR',
                'res_msg' => $result['res_msg'] ?? '거래등록 실패',
            ]);
        }

        session([
            'kcp_reg_cert_key' => $result['reg_cert_key'],
            'kcp_ordr_idxx'    => $ordr_idxx,
        ]);

        return response()->json([
            'res_cd'       => '0000',
            'call_url'     => $result['call_url'],
            'reg_cert_key' => $result['reg_cert_key'],
        ]);
    }

    public function ReqPopUp(Request $req)
    {
        $res_cd          = $req->input('res_cd', '');
        $res_msg         = $req->input('res_msg', '');
        $cb_reg_cert_key = $req->input('reg_cert_key', '');

        $fail_params = ['is_adult' => 'false', 'res_cd' => $res_cd, 'res_msg' => $res_msg];

        // reg_cert_key 검증
        $sess_reg_cert_key = session('kcp_reg_cert_key', '');
        $ordr_idxx         = session('kcp_ordr_idxx', '');

        if ($cb_reg_cert_key !== $sess_reg_cert_key) {
            session()->forget(['kcp_reg_cert_key', 'kcp_ordr_idxx']);
            return redirect()->route('shop.order.adult_popup', array_merge($fail_params, ['res_msg' => '거래등록키 불일치']));
        }

        if ($res_cd !== '0000') {
            session()->forget(['kcp_reg_cert_key', 'kcp_ordr_idxx']);
            return redirect()->route('shop.order.adult_popup', $fail_params);
        }

        // 결과조회
        $site_cd = env('KCP_SITE_CD');
        $enc_key = env('KCP_ENC_KEY');
        $dec_url = env('KCP_DEC_URL');

        $query_result = $this->curlPost($dec_url, [
            "Content-Type: application/json",
            "site_cd: {$site_cd}",
        ], json_encode([
            "reg_cert_key" => $sess_reg_cert_key,
            "ordr_idxx"    => $ordr_idxx,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        session()->forget(['kcp_reg_cert_key', 'kcp_ordr_idxx']);

        if (($query_result['res_cd'] ?? '') !== '0000') {
            return redirect()->route('shop.order.adult_popup', array_merge($fail_params, [
                'res_msg' => $query_result['res_msg'] ?? '결과조회 실패'
            ]));
        }

        // 복호화
        $cert_data = json_decode(
            KcpCrypto::decryptJson(
                $query_result['enc_cert_data'] ?? '',
                $query_result['rv'] ?? '',
                $enc_key,
                $site_cd
            ),
            true
        );

        if (!$cert_data) {
            return redirect()->route('shop.order.adult_popup', array_merge($fail_params, ['res_msg' => '복호화 실패']));
        }

        // 성인 여부
        $birth_day = $cert_data['birth_day'] ?? '';
        $is_adult  = $this->checkAdult($birth_day);
        
        // $is_adult  = empty($birth_day) ? true : $this->checkAdult($birth_day);

        if ($is_adult && auth()->check()) {
            DB::table('users')
                ->where('id', auth()->id())
                ->update(['adult_verified_at' => now()]);
        }

        return redirect()->route('shop.order.adult_popup', [
            'is_adult'  => $is_adult ? 'true' : 'false',
            'user_name' => $cert_data['user_name'] ?? '',
            'phone_no'  => $cert_data['phone_no']  ?? '',
            'birth_day' => $birth_day,
        ]);
    }

    private function curlPost(string $url, array $headers, string $body): array
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST,           true);
        curl_setopt($ch, CURLOPT_HTTPHEADER,     $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS,     $body);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        curl_close($ch);
        return json_decode($res, true) ?? [];
    }

    private function checkAdult(string $birth_day): bool
    {
        if (strlen($birth_day) !== 8) return false;
        $year  = (int) substr($birth_day, 0, 4);
        $month = (int) substr($birth_day, 4, 2);
        $day   = (int) substr($birth_day, 6, 2);
        $today = now();
        $age   = $today->year - $year;
        if ($today->month < $month || ($today->month === $month && $today->day < $day)) $age--;
        return $age >= 20;
    }
}
