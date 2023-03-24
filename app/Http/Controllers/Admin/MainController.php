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
}
