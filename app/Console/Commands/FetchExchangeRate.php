<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Shop\ExchangeRate;
use Carbon\Carbon;

class FetchExchangeRate extends Command {
    protected $signature   = 'exchange-rate:fetch';
    protected $description = '한국수출입은행 API에서 최신 고시 환율을 가져와 저장';

    public function handle() {
        $searchDate = Carbon::today();
        $rates = [];

        // 최대 7일 전까지 거슬러 올라가며 가장 최근 고시된 환율을 찾음
        //  매매기준율 (은행 간 도매가) 가격을 가져온다
        for ($i = 0; $i < 7; $i++) {

            try {
                $response = Http::retry(3, 2000)
                    ->timeout(10)
                    ->get('https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON', [
                        'authkey'    => env('EXCHANGE_RATE_API_KEY'),
                        'searchdate' => $searchDate->format('Ymd'),
                        'data'       => 'AP01',
                    ]);
            } catch (\Illuminate\Http\Client\ConnectionException $e) {
                // 연결 자체가 실패한 경우 (TCP reset, timeout 등) - 그날 고시 없음과 구분해서 다음날로 폴백
                Log::channel('exchange-rate')->error('[ExchangeRate] 연결 실패, 하루 전 날짜로 재시도', [
                    'date'    => $searchDate->format('Ymd'),
                    'message' => $e->getMessage(),
                ]);
                $searchDate->subDay();
                continue;
            }
            
            if (!$response->successful()) {
                Log::channel('exchange-rate')->error('[ExchangeRate] API 호출 실패', ['status' => $response->status()]);
                return;
            }

            $rates = $response->json();
            if (!empty($rates)) break;

            $searchDate->subDay();
        }

        if (empty($rates)) {
            Log::channel('exchange-rate')->warning('[ExchangeRate] 최근 7일 내 고시된 환율을 찾지 못함. 기존 값 유지.');
            return;
        }

        $saved = 0;
        foreach ($rates as $item) {
            if (($item['result'] ?? null) != 1) continue;

            ExchangeRate::updateOrCreate(
                [
                    'er_cur_unit'  => $item['cur_unit'],
                    'er_rate_date' => $searchDate->format('Y-m-d'), // 실제 고시일
                ],
                [
                    'er_rate' => str_replace(',', '', $item['tts']),
                ]
            );
            $saved++;
        }

        $this->info("환율 저장 완료: {$saved}건 (고시일 " . $searchDate->format('Y-m-d') . ')');
        Log::channel('exchange-rate')->info("exchange-rate:fetch - {$saved}건 저장 (고시일 " . $searchDate->format('Y-m-d') . ')');
    }
}