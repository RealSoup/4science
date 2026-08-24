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
            $response = Http::get('https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON', [
                'authkey'    => env('EXCHANGE_RATE_API_KEY'),
                'searchdate' => $searchDate->format('Ymd'),
                'data'       => 'AP01',
            ]);

            if (!$response->successful()) {
                Log::error('[ExchangeRate] API 호출 실패', ['status' => $response->status()]);
                return;
            }

            $rates = $response->json();
            if (!empty($rates)) break;

            $searchDate->subDay();
        }

        if (empty($rates)) {
            Log::warning('[ExchangeRate] 최근 7일 내 고시된 환율을 찾지 못함. 기존 값 유지.');
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
                    'er_rate' => str_replace(',', '', $item['deal_bas_r']),
                ]
            );
            $saved++;
        }

        $this->info("환율 저장 완료: {$saved}건 (고시일 " . $searchDate->format('Y-m-d') . ')');
    }
}