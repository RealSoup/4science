<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Shop\Order;
use DB;

class CronTabController extends Controller {

/**
     * 2주후 자동 수취확인
	 * 정기 자동 수취 확인을 위해
	 * 로그인을 묻지 않게 하기 위해 메인으로 이동
     */
	public function receiveConfirm(){
		$now = date("Y-m-d H:i:s");
        $od = Order::with('user')
			->select('shop_order.od_id', 'shop_order.created_id', 'shop_order_model.odm_id', 'shop_order_model.odm_ea', 'shop_order_model.odm_price')
			->join('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
			->join('shop_order_dlvy_info', 'shop_order_model.odm_id', '=', 'shop_order_dlvy_info.oddi_odm_id')
			->OdStep('50')
			->where('od_type', '<>', 'buy_temp')
			->StartDate('2022-01-01')
			->EndDate(date('Y-m-d', strtotime(date('Y-m-d')." -2 week")))
			->whereNull('shop_order_dlvy_info.oddi_receive_date')
			->where('shop_order.created_id', 130)
			->orderBy('shop_order.od_id')
			->get();

		foreach( $od as $v ){
			$p = $v->odm_price*$v->odm_ea*$v->user->mileage_mul;
			DB::table('user_mileage')->insert([
				'ml_uid'	  => $v->created_id,
				'ml_tbl'	  => 'shop_order_model',
				'ml_key'	  => $v->odm_id,
				'ml_type'	  => 'SV',
				'ml_content'  => '수취확인(자동)',
				'ml_mileage'  => $p,
				'ml_enable_m' => $p,
			]);
			//	일반회원이 구매를 하면 브론즈 등급으로 레벨업
			if(intval($v->user->level) == 1)
				DB::table('users')->where('id', $v->user->id)->update(['level' => 2]);
		}
		Order::join('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
			->join('shop_order_dlvy_info', 'shop_order_model.odm_id', '=', 'shop_order_dlvy_info.oddi_odm_id')
			->where('od_step', '50')
			->where('od_type', '<>', 'buy_temp')
			->StartDate('2022-01-01')
			->EndDate(date('Y-m-d', strtotime(date('Y-m-d')." -2 week")))
			->whereNull('shop_order_dlvy_info.oddi_receive_date')
			->where('shop_order.created_id', 130)
			->update(['shop_order_dlvy_info.oddi_receive_date' => \Carbon\Carbon::now()]);
	}


	/**
     * 매월 1일
	 * 3개월간의 구매 금액합으로
	 * 회원등급 조정
	 * 구매 완료시 브론즈
	 * 200만원 달성 및 유지시 실버
	 * 500만원 달성 및 유지시 골드
     */
	public function adjustMemberLevel(){
		//	모든 유저 레벨 초기화
		DB::update('update la_users set level = CASE WHEN level>10 THEN 11 WHEN level>1 THEN 2 ELSE 1 END where level > 1 and id > 286');
		$od = Order::select(DB::raw('SUM(od_all_price) AS total'), "created_id")
			->where('od_type', '<>', 'buy_temp')	// 임의 주문 제외
			->where('od_step', '>=', '20')	//	입금 완료부터
			->where('od_step', '<=', '50')	//	배송완료까지
			->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -3 month")))//	지정 기간안에 주문만
			->groupBy('created_id')
			->orderBy('total', 'DESC')
			->get();
			
		foreach( $od as $v ){
			if ( intval($v->created_id) == 0 )  continue;
			if ( intval($v->total) < 2000000 )	break;

			$u = User::find($v->created_id);
		
			if (		intval($v->total) >= 5000000 )	//	3달에 5백넘게 주문하면
				$lv = 4;
			else if (	intval($v->total) >= 2000000 )	//	3달에 2백넘게 주문하면
				$lv = 3;
			else
				$lv = 2;

			if ( intval($u->level) > 10 )	//	딜러회원은 2자리 숫자
				$lv += 10;

			User::where('id', $u->id)->update(['level' => $lv]);
		}
	}
### 주문 2주후 자동으로 수취확인 및 포인트 적립   ###
// 0 6 * * * /usr/bin/curl https://4science.net/admin/crontab/receiveConfirm >> /home/ec2-user/receive_confirm_crontab.log

### 매월1일 5시에 3달 구매 실적에 따라 회원등급조정  ###
// 0 5 1 * * /usr/bin/curl https://4science.net/admin/crontab/adjustMemberLevel >> /home/ec2-user/adjust_member_level_crontab.log

}