<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{UserMileage};
use App\Models\Shop\{Order, EstimateReq};
use DB;

class CommonController extends Controller {
	protected $order;
    protected $estimateReq;

    public function __construct(Order $od, EstimateReq $eq) {
        $this->order = $od;
        $this->estimateReq = $eq;
        // $this->middleware('auth');
    }

    public function index(Request $req) {
        $rst['reqOrder'] = $this->order->StartDate(date('Y-m-d'))->whereNull('od_mng')->count();
        $rst['reqEstimate'] = $this->estimateReq->EqStep('DONOT')->StartDate(date('Y-m-d'))->count();
        
        $rst['reqAsk']['inquiry']    = DB::table('board_inquiry')   ->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->whereNull('deleted_at')->groupBy('bo_seq')->having('cnt', 1)->get();
        $rst['reqAsk']['as']         = DB::table('board_as')        ->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->whereNull('deleted_at')->groupBy('bo_seq')->having('cnt', 1)->get();
        $rst['reqAsk']['cancel']     = DB::table('board_cancel')    ->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->whereNull('deleted_at')->groupBy('bo_seq')->having('cnt', 1)->get();
        $rst['reqAsk']['gd_inquiry'] = DB::table('board_gd_inquiry')->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->whereNull('deleted_at')->groupBy('bo_seq')->having('cnt', 1)->get();
        
        //  ml_key=0 => 상품권 요청
        $rst['reqVoucher'] = UserMileage::with('user')->Type('REQ')->Tbl('voucher')->Key(0)->latest()->get();

        return response()->json($rst, 200);
    }
}
