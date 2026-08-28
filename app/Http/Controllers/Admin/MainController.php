<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop\{Order, EstimateReq};
use DB;

class MainController extends Controller {
	protected $order;
    protected $estimateReq;

    public function __construct(Order $od, EstimateReq $eq) {
        $this->order = $od;
        $this->estimateReq = $eq;
        // $this->middleware('auth');
    }

    public function index(Request $req) {
		$rst['today_order'] = $this->order->StartDate(date('Y-m-d'))->count();
		$rst['today_estimate'] = $this->estimateReq->StartDate(date('Y-m-d'))->count();
        $od = $this->order->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -1 week")))->get();
        $rst['order'] = $od->countBy(function ($item) { return $item['od_step']; });   
        if (!array_key_exists(10, $rst['order']->toArray())) $rst['order'][10] = 0;
        if (!array_key_exists(11, $rst['order']->toArray())) $rst['order'][11] = 0;
        if (!array_key_exists(12, $rst['order']->toArray())) $rst['order'][12] = 0;
        if (!array_key_exists(20, $rst['order']->toArray())) $rst['order'][20] = 0;
        if (!array_key_exists(30, $rst['order']->toArray())) $rst['order'][30] = 0;
        if (!array_key_exists(40, $rst['order']->toArray())) $rst['order'][40] = 0;
        if (!array_key_exists(50, $rst['order']->toArray())) $rst['order'][50] = 0;
        if (!array_key_exists(60, $rst['order']->toArray())) $rst['order'][60] = 0;
        $rst['estimateReq'] = $this->estimateReq->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -1 week")))->latest()->get();
        return response()->json($rst, 200);
    }

    private const JOB_LABELS = [
        'cleanup:estimate-pdf'       => '견적서 PDF 임시파일 정리',
        'exchange-rate:fetch'        => '환율 정보 갱신',
        'goods:recalc-foreign-price' => '해외상품 판매가 재계산',
        'search:update-score'        => '검색 순위 점수 갱신',
        'cleanup:tmp-price-excel'    => '가격표 엑셀 임시폴더 정리',
        'top-selling-cache'          => '인기상품 캐시 갱신',
    ];

    public function scheduleLog(Request $req) {
        $days = 7;

        $rows = DB::table('schedule_logs')
            ->where('created_at', '>=', now()->subDays($days)->startOfDay())
            ->orderBy('created_at')
            ->get();

        $grouped = $rows
            ->groupBy(fn($r) => \Carbon\Carbon::parse($r->created_at)->format('Y-m-d'))
            ->sortKeysDesc()
            ->map(fn($rows, $date) => [
                'date'     => $date,
                'jobs'     => $rows->map(fn($r) => [
                    'time'    => \Carbon\Carbon::parse($r->created_at)->format('H:i:s'),
                    'level'   => $r->level,
                    'label'   => self::JOB_LABELS[$r->job] ?? $r->job,
                    'message' => $r->message,
                ])->values(),
                'hasIssue' => $rows->contains(fn($r) => in_array($r->level, ['WARNING', 'ERROR'])),
            ])
            ->values();

        return response()->json($grouped, 200);
    }
}
