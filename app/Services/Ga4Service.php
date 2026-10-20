<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

//  GA4 Data API로 방문자 통계를 가져온다 (관리자 메인 "방문자현황")
//  구글 공식 PHP 라이브러리는 PHP 8.1 이상이라 서비스 계정 토큰을 직접 만들어 REST로 호출한다
class Ga4Service {
    private const API   = 'https://analyticsdata.googleapis.com/v1beta/properties/';
    private const TOKEN = 'https://oauth2.googleapis.com/token';

    private const CHANNELS = [
        'Organic Search'   => '자연 검색',
        'Direct'           => '직접 접속',
        'Referral'         => '추천 사이트',
        'Organic Social'   => '소셜',
        'Paid Search'      => '유료 검색',
        'Email'            => '이메일',
        'Organic Shopping' => '쇼핑',
        'Display'          => '디스플레이',
        'Unassigned'       => '미분류',
    ];

    private const DEVICES = [ 'desktop' => 'PC', 'mobile' => '모바일', 'tablet' => '태블릿' ];

    private string $propertyId;
    private string $keyFile;

    public function __construct() {
        $this->propertyId = (string) config('services.ga4.property_id');
        $this->keyFile    = (string) config('services.ga4.key_file');
    }

    public function enabled(): bool {
        return $this->propertyId !== '' && is_file($this->keyFile);
    }

    //  하루 단위 숫자들 (1시간 캐시)
    public function summary(): array {
        return Cache::remember('ga4_summary', 3600, function () {
            $today      = Carbon::today();
            $weekEnd    = $today->copy()->startOfWeek()->subDay();              //  지난주 일요일
            $weekStart  = $weekEnd->copy()->subWeeks(8)->addDay();              //  8주 전 월요일
            $monthEnd   = $today->copy()->startOfMonth()->subDay();             //  지난달 말일
            $monthStart = $monthEnd->copy()->subMonthsNoOverflow(5)->startOfMonth(); //  6개월 전 1일
            $d = fn(Carbon $c) => $c->format('Y-m-d');

            [$daily, $weekly, $monthly, $pages, $channels] = $this->batch([
                $this->req('30daysAgo', 'today', 'date', 'activeUsers'),
                $this->req($d($weekStart), $d($weekEnd), 'isoYearIsoWeek', 'activeUsers'),
                $this->req($d($monthStart), $d($monthEnd), 'yearMonth', 'activeUsers'),
                $this->req('7daysAgo', 'today', 'pageTitle', 'screenPageViews', 5),
                $this->req('7daysAgo', 'today', 'sessionDefaultChannelGroup', 'sessions'),
            ]);
            [$devices, $returning] = $this->batch([
                $this->req('7daysAgo', 'today', 'deviceCategory', 'activeUsers'),
                $this->req('7daysAgo', 'today', 'newVsReturning', 'activeUsers'),
            ]);

            //  날짜별 (빈 날짜는 0으로 채움)
            $byDate = array_column($daily, 1, 0);
            $days   = [];
            for ($c = $today->copy()->subDays(30); $c->lte($today); $c->addDay())
                $days[] = [ 'date' => $c->format('m/d'), 'users' => (int) ($byDate[$c->format('Ymd')] ?? 0) ];

            $past = array_column(array_slice($days, 0, -1), 'users');   //  오늘(집계 중)은 평균에서 뺀다
            $ret  = array_column($returning, 1, 0);
            $retTotal = array_sum($ret);

            return [
                'today'      => end($days)['users'],
                'yesterday'  => $days[count($days) - 2]['users'],
                'avgDay'     => $this->avg($past),
                'avgWeek'    => $this->avg(array_column($weekly, 1)),
                'avgMonth'   => $this->avg(array_column($monthly, 1)),
                'days'       => $days,
                'pages'      => array_map(fn($r) => [ 'name' => $r[0], 'cnt' => (int) $r[1] ], $pages),
                'channels'   => $this->ratio($channels, self::CHANNELS),
                'devices'    => $this->ratio($devices, self::DEVICES),
                'returning'  => $retTotal ? round(($ret['returning'] ?? 0) / $retTotal * 100, 1) : 0,
                'updated_at' => now()->format('H:i'),
            ];
        });
    }

    //  최근 30분 실시간 (1분 캐시)
    public function realtime(): array {
        return Cache::remember('ga4_realtime', 60, function () {
            $total   = $this->realtimeReport([]);
            $minutes = $this->realtimeReport([ 'minutesAgo' ]);
            $pages   = $this->realtimeReport([ 'unifiedScreenName' ], 5);

            $byMin  = array_column($minutes, 1, 0);
            $perMin = [];
            for ($m = 29; $m >= 0; $m--)    //  30분 전 → 지금 순서
                $perMin[] = (int) ($byMin[sprintf('%02d', $m)] ?? 0);

            return [
                'active'     => (int) ($total[0][0] ?? 0),
                'perMin'     => $perMin,
                'pages'      => array_map(fn($r) => [ 'name' => $r[0], 'cnt' => (int) $r[1] ], $pages),
                'updated_at' => now()->format('H:i'),
            ];
        });
    }

    private function req(string $start, string $end, string $dim, string $metric, ?int $limit = null): array {
        $r = [
            'dateRanges' => [[ 'startDate' => $start, 'endDate' => $end ]],
            'dimensions' => [[ 'name' => $dim ]],
            'metrics'    => [[ 'name' => $metric ]],
            'orderBys'   => [[ 'metric' => [ 'metricName' => $metric ], 'desc' => true ]],
        ];
        if ($limit) $r['limit'] = $limit;
        return $r;
    }

    //  보고서 여러 개를 한 번에 요청 (최대 5개) → 보고서마다 [[차원값, 측정값], ...]
    private function batch(array $requests): array {
        $res = $this->post(':batchRunReports', [ 'requests' => $requests ]);
        return array_map(fn($rep) => $this->rows($rep), $res['reports'] ?? []);
    }

    private function realtimeReport(array $dims, ?int $limit = null): array {
        $body = [ 'metrics' => [[ 'name' => 'activeUsers' ]] ];
        if ($dims)  $body['dimensions'] = array_map(fn($n) => [ 'name' => $n ], $dims);
        if ($limit) $body['limit'] = $limit;
        return $this->rows($this->post(':runRealtimeReport', $body));
    }

    private function rows(array $rep): array {
        return array_map(function ($row) {
            $dim = array_column($row['dimensionValues'] ?? [], 'value');
            $met = array_column($row['metricValues'] ?? [], 'value');
            return array_merge($dim, $met);
        }, $rep['rows'] ?? []);
    }

    private function post(string $method, array $body): array {
        return Http::withToken($this->token())
            ->timeout(10)
            ->post(self::API . $this->propertyId . $method, $body)
            ->throw()
            ->json();
    }

    //  서비스 계정 키로 접근 토큰 발급 (유효 1시간 → 50분 캐시)
    private function token(): string {
        return Cache::remember('ga4_token', 3000, function () {
            $key = json_decode(file_get_contents($this->keyFile), true);
            $b64 = fn($v) => rtrim(strtr(base64_encode($v), '+/', '-_'), '=');
            $now = time();

            $head  = $b64(json_encode([ 'alg' => 'RS256', 'typ' => 'JWT' ]));
            $claim = $b64(json_encode([
                'iss'   => $key['client_email'],
                'scope' => 'https://www.googleapis.com/auth/analytics.readonly',
                'aud'   => self::TOKEN,
                'iat'   => $now,
                'exp'   => $now + 3600,
            ]));
            openssl_sign("{$head}.{$claim}", $sig, $key['private_key'], OPENSSL_ALGO_SHA256);

            return Http::asForm()->timeout(10)->post(self::TOKEN, [
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion'  => "{$head}.{$claim}." . $b64($sig),
            ])->throw()->json('access_token');
        });
    }

    private function avg(array $nums): int {
        return $nums ? (int) round(array_sum(array_map('intval', $nums)) / count($nums)) : 0;
    }

    //  [[이름, 값], ...] → 비율(%) 목록 (한글 이름으로)
    private function ratio(array $rows, array $names): array {
        $sum = array_sum(array_column($rows, 1));
        return array_map(fn($r) => [
            'name' => $names[$r[0]] ?? $r[0],
            'pct'  => $sum ? round($r[1] / $sum * 100, 1) : 0,
        ], array_slice($rows, 0, 4));
    }
}
