<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Shop\{Order, OrderModel};

class UserMileage extends Model {
    use SoftDeletes;
    protected $primaryKey = 'ml_id';
    protected $table = 'user_mileage';
    // public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['refine_content', 'expiration', 'expire_date', 'expire_dday'];

    public static $config = [
        'voucher'=>[
            1 => [  'name' => '신세계 상품권 5만원',
                    'point' => 50000, ],
            2 => [  'name' => '신세계 상품권 10만원',
                    'point' => 100000, ], ],
        'v_option' => [ 'REQ' => '요청',
                        'OK' => '승인',
                        'NO' => '반려' ],
        'board' => [
            'write' => 10,
            'comment' => 5,
            'good' => 3, ],
    ];
    

    public function user() { return $this->belongsTo(User::class, 'ml_uid'); }
    public function orderModel() {  return $this->belongsTo(OrderModel::class, "ml_key"); }

    public function getRefineContentAttribute() {
        $arr_con = null;
        if ( $this->ml_tbl == 'voucher' && strpos($this->ml_content, '||') !== false ) $arr_con = explode('||', $this->ml_content); 
        return $arr_con; 
    }
    public function getExpirationAttribute() { 
        $prev_1_year = strtotime(date("Y-m-d H:i:s", strtotime('-1 years')));
        $reg_date = strtotime($this->created_at);
        if ($prev_1_year >= $reg_date)  return true;
        else                            return false;
    }
    // 소멸 예정일 (적립일 + 1년) — scopeEnable 기준과 동일
    public function getExpireDateAttribute() {
        if (!$this->created_at) return null;
        return $this->created_at->copy()->addYearNoOverflow()->format('Y-m-d');
    }
    // 소멸까지 남은 일수 (음수면 이미 소멸)
    public function getExpireDdayAttribute() {
        if (!$this->created_at) return null;
        return (int) now()->startOfDay()->diffInDays($this->created_at->copy()->addYearNoOverflow()->startOfDay(), false);
    }

    public function scopeEnable($query) { return $query->whereRaw("created_at > SUBDATE(NOW(), INTERVAL 1 YEAR)")->where('ml_type', '<>', 'NO'); }
    public function scopeUid($query, $id) { return $query->where('ml_uid', $id); }
    // public function scopeWriter($query, $id) { return $query->where('created_id', $id); }
    public function scopeTbl($query, $v) { return $query->where('ml_tbl', $v); }
    public function scopeType($query, $v) { return $query->where('ml_type', $v); }
    public function scopeKey($query, $v) { return $query->where('ml_key', $v); }
        // N일 이내 소멸 예정인 잔여 마일리지 (유효 + 잔액이 남은 적립건)
    public function scopeExpiringWithin($query, $days) {
        return $query->Enable()
            ->where('ml_enable_m', '>', 0)
            ->whereRaw("created_at <= DATE_ADD(SUBDATE(NOW(), INTERVAL 1 YEAR), INTERVAL ? DAY)", [$days]);
    }

    
    public function enableMileage($id) { return $this->Uid($id)->Enable()->sum('ml_enable_m'); }
    
    // 회원 등급별로 구매 적립 마일러지를 계산해준다.
    public function mileage_calculation($p, $ea, $lv) {
        $rate = User::mileageRate($lv);
        return round($p * $ea * $rate / 100);
    }

    // 주문 상품 구매 적립 마일리지 (포사페이 이벤트 반영)
    // 수취확인(직접/자동), 수량 변경 차감 모두 이 함수로 계산
    // 첫 구매는 0%, 두 번째 구매부터 브론즈 0.5% (이벤트 시작일 주문부터, 그 전 주문은 첫 구매도 0.5%)
    // (배송완료 때 레벨1 -> 2로 올라가므로 수취확인 시점 레벨이 아니라 주문으로 첫 구매를 판단)
    public function order_mileage($od, $p, $ea, $lv) {
        $lv = intval($lv);
        if ($od && $lv <= 2)
            $lv = (Order::isFirstOrderRule($od->created_at) && $this->isFirstOrder($od)) ? 1 : 2;
        if ($od && $od->isFosapayEvent()) {
            if ($lv < 2) $lv = 2;   //  포사페이 이벤트 - 첫 구매도 0.5% 기준
            return $this->mileage_calculation($p, $ea, $lv) * 2;    //  포사페이 이벤트 2배
        }
        return $this->mileage_calculation($p, $ea, $lv);
    }

    // 회원의 첫 구매 주문인지 (이 주문 전에 결제된 주문이 없으면 첫 구매, 임의 주문 제외)
    public function isFirstOrder($od) {
        return !Order::where('created_id', $od->created_id)
            ->where('od_id', '<', $od->od_id)
            ->where('od_type', '<>', 'buy_temp')
            ->whereIn('od_step', ['20', '30', '31', '40', '50'])  //  od_step은 ENUM이라 문자로 비교
            ->exists();
    }

    // 포사페이 이벤트 - 기간 안 포사페이 첫 결제 3000점 (회원당 1회, 수취확인 때 지급)
    public function fosapay_first_pay($od) {
        if (!$od || !$od->isFosapayEvent() || $od->od_proc_mileage == 'ZERO') return;

        // 이미 받았으면 제외
        if ($this->withTrashed()->Uid($od->created_id)->Tbl('event_fosapay')->exists()) return;

        // 이벤트 전에 포사페이로 결제한 적 있으면 신규 아님 (od_step은 ENUM이라 문자로 비교)
        $before = Order::where('created_id', $od->created_id)
            ->where('od_pay_method', 'CP')
            ->whereIn('od_step', ['20', '30', '31', '40', '50'])
            ->where('created_at', '<', Order::$fosapayEvent['start'])
            ->exists();
        if ($before) return;

        event(new \App\Events\Mileage("insert", $od->created_id, 'event_fosapay', $od->od_id, 'SV', '포사페이 첫 결제 이벤트', 3000));
    }

}
