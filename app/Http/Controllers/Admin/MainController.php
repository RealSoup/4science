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
        $rst['estimateReq'] = $this->estimateReq->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -1 week")))->latest()->get();
        return response()->json($rst, 200);
    }
}
