<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{UserMileage};
use App\Models\Shop\{Order, OrderModel};
use DB;

class CronTabController extends Controller {

/**
     * 2주후 자동 수취확인
	 * 정기 자동 수취 확인을 위해
	 * 로그인을 묻지 않게 하기 위해 메인으로 이동
     */
	public function receiveConfirm(){
        // SELECT
		// 		od.ord_seq, od.ord_no, od.mbr_no, odi.itm_no, odi.goods_name, order_step, order_date, receive_confirm, receive_confirm_date
        //     FROM
        //         nc_order as od
		// 		left join nc_order_item as odi	ON od.ord_no = odi.ord_no
        //     WHERE
        //         od.order_step = 60
        //         AND odi.delivery_yn != 'C'
		// 		AND od.order_date < (NOW() - INTERVAL {$params["order_term"]} DAY)
		// 		AND ( odi.receive_confirm != 'Y' OR odi.receive_confirm IS NULL )
        //     ORDER BY
        //         od.order_date desc
		$now = date("Y-m-d H:i:s");
        $od = Order::join('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
        ->join('shop_order_dlvy_info', 'shop_order_model.odm_id', '=', 'shop_order_dlvy_info.oddi_odm_id')
        ->OdStep('50')
        ->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -3 week")))
        ->whereNull('shop_order_dlvy_info.oddi_receive_date')
        ->get();

        dd($od);

echo '
';
		foreach( $rst01 as $key => $val ){
			//	마일리지
			if ( $val['mbr_no'] > 1 ) {
				$update_where["itm_no"] = $val['itm_no'];
				$item_data = $this->order_item_option_model->_select_row($update_where);
				$member_data = $this->member_model->_select_row(array("mbr_no"=>$val['mbr_no']));
				$point = _mileage_calculation($item_data['itm_amt'], $item_data['ea'], $member_data['mlv_no']);

				$insert_data["ml_type"] = "10";
				$insert_data["ml_mbr_no"] = $val['mbr_no'];
				$insert_data["ml_sub_data"] = $val['ord_no'];
				$insert_data["ml_title"] = "수취확인(자동)";
				$insert_data["ml_content"] = $val["goods_name"];
				$insert_data["ml_point"] = $point;
				$insert_data["ml_enable_point"] = $point;

				// 마일리지 로그 기록
				$rst03 = $this->mileage_log_model->_insert($insert_data);

				//	일반회원이 구매를 하면 브론즈 등급으로 레벨업
				if(intval($member_data['mlv_no']) == 1)
					$this->member_model->_update(array("mlv_no" => 2), array("mbr_no" => $member_data['mbr_no']));

				$rst02 = $this->order_model->update_last_order_receive_confirm($where);
				if ( $rst02 )				$rst02 = "ok";
				echo $now."   주문번호 : ".$val['ord_no']." ___ 주문상품번호 : ".$val['itm_no']." ___ 주문일 : ".$val['order_date'].' ___  수취확인 : '.$rst02.'  ___ 마일리지 적립 : '.$point.'
';
			}
		}

		//debug_var($rst01);
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
exit;
		$now = date("Y-m-d H:i:s");
		$this->load->model("order_model");
		$this->load->model("member_model");
		$where['order_term'] = '3 MONTH';
		//$where['order_term'] = '666 DAY';
        $rst01 = $this->order_model->order_by_member($where);

		$lv = 1;
		//	일반회원은 회원레벨을 모두 1 OR 2
		//	딜러회원은 회원레벨을 모두 11 로 초기화 후 3달 구매 실적으로 재설정
		$rst02 = $this->member_model->member_level_init();
		$cnt = 1;
		//exit;
		foreach( $rst01 as $key => $val ){
			if ( intval($val['mbr_no']) == 1 )		continue;
			if ( intval($val['total']) < 2000000 )	break;

			$member = $this->member_model->_select_row(array("mbr_no" => $val['mbr_no']));

			//	마일리지
			if (		intval($val['total']) >= 5000000 )	//	3달에 5백넘게 주문하면
				$lv = 4;
			else if (	intval($val['total']) >= 2000000 )	//	3달에 2백넘게 주문하면
				$lv = 3;
			else
				$lv = 2;

			if ( intval($member['mlv_no']) > 10 )	//	딜러회원은 2자리 숫자
				$lv += 10;

			$rst03 = $this->member_model->_update(array("mlv_no" => $lv), array("mbr_no" => $val['mbr_no']));
			if ( $rst03 )
				echo $cnt."___".$now."__ 회원 번호 : ".$val['mbr_no']."____	\t  금액 : ".number_format(intval($val['total']))."  ______ \t  Lv ".$lv."
";
			$cnt++;
		}
		echo "
";
		//debug_var($rst01);
	}



### 주문 2주후 자동으로 수취확인 및 포인트 적립   ###
// 0 6 * * * /usr/bin/curl https://www.4science.net/main/receive_confirm_crontab.do >> /home/4science/receive_confirm_crontab.log

### 매월1일 5시에 3달 구매 실적에 따라 회원등급조정  ###
// 0 5 1 * * /usr/bin/curl https://www.4science.net/main/adjust_member_level_crontab.do >> /home/4science/adjust_member_level_crontab.log

}