<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Shop\{Order, OrderDlvyInfo};
use DB;

class CronTabController extends Controller {

//  자동 수취확인(receiveConfirm)·회원 등급 조정(adjustMemberLevel)은
//  스케줄러 명령으로 옮김 → app/Console/Commands/ReceiveConfirmOrders.php, AdjustMemberLevel.php

	public function billingByCycle(){
// 		SELECT a.created_at, b.ob_od_plan, c.* from la_shop_order a 
// JOIN la_shop_order_billing b ON a.od_id = b.ob_od_id
// left JOIN la_user_billing c ON b.ob_ub_id = c.ub_id
// WHERE a.od_pay_method = 'BL' AND od_step >= '20' AND od_step <= '50' AND a.deleted_at IS NULL
		$od = Order::select('shop_order.od_id', 'shop_order.created_at', 'shop_order_billing.ob_od_plan', "user_billing.ub_customer_key", "user_billing.ub_billing_key")
			->join('shop_order_billing', 'shop_order.od_id', '=', 'shop_order_billing.ob_od_id')
			->join('user_billing', 'shop_order_billing.ob_ub_id', '=', 'user_billing.ub_id')
			->where('od_pay_method', 'BL')	// 임의 주문 제외
			->where('od_step', '>=', '20')	//	입금 완료부터
			->where('od_step', '<=', '50')	//	배송완료까지
			// ->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -3 month")))//	지정 기간안에 주문만
			// ->groupBy('created_id')
			// ->orderBy('total', 'DESC')
			->get();

		foreach( $od as $v ){
			$pg = DB::table('shop_order_pg')->where('pg_od_id', $v->od_id)->latest()->get();
			dd($pg);
			
		}
	}

}