<?php

namespace App\Services;

use MaxMind\Db\Reader;

//  IP 국가 판별 - 서버에 둔 ip-location-db user-country 파일에서 조회 (외부 API 호출 없음, PDDL - 출처 표시 불필요)
//  파일 없음·조회 실패·사설 IP·IPv6는 한국으로 간주 (로그 누락보다 소량 혼입이 낫다)
class GeoIp {
    protected static $reader = false;   //  false: 아직 안 엶 / null: 파일 없음

    public static function path(): string {
        return storage_path('app/geoip/user-country-ipv4.mmdb');
    }

    //  파일 형식 차이 대비 - country_code(ip-location-db) / country.iso_code(MaxMind 형식) 둘 다 확인
    public static function codeOf($record): ?string {
        return $record['country_code'] ?? $record['country']['iso_code'] ?? null;
    }

    public static function country(string $ip): ?string {
        if (self::$reader === false) {
            try {
                self::$reader = is_file(self::path()) ? new Reader(self::path()) : null;
            } catch (\Throwable $e) {
                self::$reader = null;
            }
        }
        if (!self::$reader) return null;

        try {
            return self::codeOf(self::$reader->get($ip));
        } catch (\Throwable $e) {
            return null;
        }
    }

    public static function isKorea(string $ip): bool {
        $country = self::country($ip);
        return $country === null || $country === 'KR';
    }
}