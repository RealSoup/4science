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
        $today       = date('Y-m-d');
        $weekAgo     = date('Y-m-d', strtotime($today . ' -1 week'));
        $twelveHrAgo = date('Y-m-d H:i:s', strtotime('-12 hours'));

        $rst['today_order']    = $this->order->StartDate($today)->count();
        $rst['today_estimate'] = $this->estimateReq->StartDate($today)->count();

        $od = $this->order->StartDate($weekAgo)
            ->select('od_id', 'od_step')
            ->get();
        $rst['order'] = $od->countBy(function ($item) { return $item['od_step']; });
        if (!array_key_exists(10, $rst['order']->toArray())) $rst['order'][10] = 0;
        if (!array_key_exists(11, $rst['order']->toArray())) $rst['order'][11] = 0;
        if (!array_key_exists(12, $rst['order']->toArray())) $rst['order'][12] = 0;
        if (!array_key_exists(20, $rst['order']->toArray())) $rst['order'][20] = 0;
        if (!array_key_exists(30, $rst['order']->toArray())) $rst['order'][30] = 0;
        if (!array_key_exists(40, $rst['order']->toArray())) $rst['order'][40] = 0;
        if (!array_key_exists(50, $rst['order']->toArray())) $rst['order'][50] = 0;
        if (!array_key_exists(60, $rst['order']->toArray())) $rst['order'][60] = 0;

        // 상단 "최근 7일 견적" 숫자 - count()만 하면 되니까 row 자체를 안 끌고 옴 (가볍다)
        $rst['estimateReqCount'] = $this->estimateReq->StartDate($weekAgo)->count();

        // 아래 리스트는 최근 12시간치만
        $rst['estimateReq'] = $this->estimateReq->StartDate($twelveHrAgo)
            ->select('eq_id', 'created_at', 'eq_email', 'eq_name', 'eq_title', 'eq_content', 'eq_type')
            ->latest()->get();

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
