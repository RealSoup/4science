<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShowWindow;
use Illuminate\Support\Facades\Cache;
use DB;
use App\Models\Shop\{Order};

class ExcelController extends Controller {
    public function index(Request $req, Order $order) {
        $data = $order->with('OrderPurchaseAt')->with('OrderExtraInfo')->with('mng')->find(400);
		foreach ($data->orderPurchaseAt as $opa) {
			foreach ($opa->orderModel as $odm) {
				$odm->orderDlvyInfo;
			}
		}

		if ($data->orderExtraInfo && !$data->orderExtraInfo->oex_biz_name) $data->fileInfo;		
		$data['order_config'] = $order->getOrderConfig();

        dump($data);

        return view("admin.order.excel.order_estimate", $data);
    }
}
