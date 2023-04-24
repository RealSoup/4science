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
        $rst['reqOrder'] = $this->order->OdStep('10')->StartDate(date('Y-m-d'))->latest()->get();
        $rst['reqEstimate'] = $this->estimateReq->EqStep('DONOT')->StartDate(date('Y-m-d'))->latest()->get();
        
        $rst['reqAsk']['inquiry']    = DB::table('board_inquiry')   ->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->groupBy('bo_seq')->having('cnt', 1)->get();
        $rst['reqAsk']['as']         = DB::table('board_as')        ->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->groupBy('bo_seq')->having('cnt', 1)->get();
        $rst['reqAsk']['cancel']     = DB::table('board_cancel')    ->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->groupBy('bo_seq')->having('cnt', 1)->get();
        $rst['reqAsk']['gd_inquiry'] = DB::table('board_gd_inquiry')->select('bo_id', 'bo_subject', DB::raw('COUNT(bo_seq) AS cnt'))->groupBy('bo_seq')->having('cnt', 1)->get();
        
        //  ml_key=0 => 상품권 요청
        $rst['reqVoucher'] = UserMileage::with('user')->Type('REQ')->Tbl('voucher')->Key(0)->latest()->get();

        return response()->json($rst, 200);
    }
}
