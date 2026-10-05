<?php

namespace App\Console\Commands;

use App\Services\GeoIp;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use MaxMind\Db\Reader;

//  ip-location-db user-country 국가 IP 파일 (PDDL - 출처 표시 불필요)
class UpdateGeoIp extends Command {
    protected $signature   = 'geoip:update';
    protected $description = '국가 IP 파일 갱신 (실패 시 기존 파일 유지)';

    const URL = 'https://github.com/sapics/ip-location-db/releases/download/latest/user-country-ipv4.mmdb';

    public function handle() {
        File::ensureDirectoryExists(dirname(GeoIp::path()));
        $temp = GeoIp::path() . '.download';

        try {
            $res = Http::timeout(120)->withOptions(['sink' => $temp])->get(self::URL);
            if (!$res->successful())
                throw new \Exception("다운로드 실패 HTTP {$res->status()}");

            //  새 파일 정상 여부 확인 (구글 DNS IP 조회) 후 교체
            $reader = new Reader($temp);
            $check  = GeoIp::codeOf($reader->get('8.8.8.8'));
            $reader->close();
            if (!$check)
                throw new \Exception('새 파일 조회 테스트 실패');

            rename($temp, GeoIp::path());
            \Log::channel('geoip')->info('geoip:update - 갱신 완료 (' . round(filesize(GeoIp::path()) / 1048576, 1) . 'MB)');
            $this->info('갱신 완료');
        } catch (\Throwable $e) {
            \Log::channel('geoip')->error('geoip:update - 갱신 실패, 기존 파일 유지: ' . $e->getMessage());
            $this->error($e->getMessage());
            return 1;
        } finally {
            File::delete($temp);
        }
        return 0;
    }
}