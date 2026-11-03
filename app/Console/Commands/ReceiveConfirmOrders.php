<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Shop\{Order, OrderDlvyInfo};
use DB;

//  배송 2주 지난 주문 자동 수취확인 + 마일리지 적립 (매일 06:00)
//  예전에는 서버 크론이 curl로 /admin/crontab/receiveConfirm 주소를 불렀음 → 스케줄러로 옮김
class ReceiveConfirmOrders extends Command {
    protected $signature   = 'order:receive-confirm';
    protected $description = '배송 2주 지난 주문 자동 수취확인 및 마일리지 적립';

    public function handle() {
        $od = Order::with('user')->with('orderCoupon')
            ->select('shop_order.od_id', 'shop_order.od_proc_mileage', 'shop_order.od_pay_method', 'shop_order.created_at', 'shop_order.created_id', 'shop_order_model.odm_id', 'shop_order_model.odm_ea', 'shop_order_model.odm_price', 'shop_order_dlvy_info.oddi_id')
            ->join('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
            ->join('shop_order_dlvy_info', 'shop_order_model.odm_id', '=', 'shop_order_dlvy_info.oddi_odm_id')
            ->OdStep('50')
            ->where('od_type', '<>', 'buy_temp')
            ->StartDate('2022-01-01')
            ->whereDate('shop_order.od_dlvy_date', '<=', date('Y-m-d', strtotime(date('Y-m-d')." -2 week")))
            ->whereNull('shop_order_dlvy_info.oddi_receive_date')
            ->groupBy('shop_order_model.odm_id')
            ->orderBy('shop_order.od_id')
            ->get();

        $confirmed = 0;
        $mileage   = 0;
        foreach ($od as $v) {
            if ($v->user && (intval($v->user->level) < 6 || intval($v->user->level) > 20)) {    //  딜러회원은 제외
                $m = new \App\Models\UserMileage;
                $p = $m->order_mileage($v, $v->odm_price, $v->odm_ea, $v->user->level);  //  직접 수취확인과 같은 계산 (포사페이 이벤트 2배 포함)
                $content = '수취확인(자동)';
                if ($v->orderCoupon && count($v->orderCoupon)) {
                    $content .= ' - 쿠폰 사용으로 마일리지 지급 비대상';
                    $p = 0;
                } else {
                    if ($v->od_proc_mileage == 'ZERO') {
                        $p = 0;
                        $content .= ' - 본 주문 건은 마일리지가 적립되지 않습니다.';
                    } else if ($v->isFosapayEvent()) {
                        $content .= ' - 포사페이 이벤트 2배 적립';
                    }
                }

                DB::table('user_mileage')->insert([
                    'ml_uid'      => $v->created_id,
                    'ml_tbl'      => 'shop_order_model',
                    'ml_key'      => $v->odm_id,
                    'ml_type'     => 'SV',
                    'ml_content'  => $content,
                    'ml_mileage'  => $p,
                    'ml_enable_m' => $p,
                ]);
                $m->fosapay_first_pay($v);  //  포사페이 첫 결제 이벤트 3000점
                $mileage++;
            }

            OrderDlvyInfo::where('oddi_id', $v->oddi_id)->update(['oddi_receive_date' => \Carbon\Carbon::now()]);
            $confirmed++;
        }

        $this->info("자동 수취확인 완료: {$confirmed}건 (마일리지 기록 {$mileage}건)");
        \Log::channel('receive-confirm')->info("order:receive-confirm - 수취확인 {$confirmed}건, 마일리지 기록 {$mileage}건");
    }
}
