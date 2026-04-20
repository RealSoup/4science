<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use App\Services\UserBehaviorService;

class BehaviorController extends Controller {
    public function log(Request $request) {
        $request->validate([
            'action' => 'required|in:view,revisit,search,cart,estimate,purchase,dwell',
            'target' => 'nullable|string|max:100',
        ]);

        // if (!if_not_my_ip($request->ip()))      return response()->json(['ok' => true]);    //  사무실 IP 차단
        // if (!$this->isKoreanIp($request->ip())) return response()->json(['ok' => true]);    //  해외 IP 차단

        $uuid   = $request->cookie('tracking_uuid');
        $userId = auth()->id();

        if (!$uuid) return response()->json(['ok' => false]);

        (new UserBehaviorService)->log($uuid, $userId, $request->action, $request->target, $request->ip());

        return response()->json(['ok' => true]);
    }

    private function isKoreanIp(string $ip): bool {
        $cacheKey = "ip_country:{$ip}";
        $cached = Redis::get($cacheKey);
        if ($cached !== null) return $cached === 'KR';

        try {
            $url = 'http://apis.data.go.kr/B551505/whois/ipas_country_code'
                . '?serviceKey=' . urlencode('4ab51baf4387e1cb8cbedf363f58ec0771b33532baef15d1c872b56ed165cc63')
                . '&query=' . urlencode($ip)
                . '&answer=json';

            $response = @file_get_contents($url);
            $data = json_decode($response, true);
            $country = $data['response']['body']['countryCode'] ?? 'XX';
        } catch (\Exception $e) {
            $country = 'KR';
        }

        Redis::setex($cacheKey, 86400 * 7, $country);
        return $country === 'KR';
    }
}