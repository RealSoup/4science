<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use DateTimeInterface;

class Order extends Model {
    protected $table = 'shop_order';
    protected $primaryKey = 'od_id';
    protected $fillable = ['od_no', 'od_step', 'od_receive_confirm_possible', 'od_depositor', 'od_mng', 'created_id', 'created_at', 'ip']; // 수정가능 필드 입력
    
    protected $orderConfig = [
        'step' => [
            10 => [ 'receiveable' => false, 'class' => 'primary',   'name' => '주문접수'],
            11 => [ 'receiveable' => false, 'class' => 'warning',   'name' => '입금확인요청'],
            12 => [ 'receiveable' => false, 'class' => 'warning',   'name' => '입금확인중'],
            20 => [ 'receiveable' => false, 'class' => 'success',   'name' => '입금완료'],
            30 => [ 'receiveable' => false, 'class' => 'info',      'name' => '제품준비중'],
            40 => [ 'receiveable' => true,  'class' => 'info',      'name' => '배송중'],
            50 => [ 'receiveable' => true,  'class' => 'secondary', 'name' => '배송완료'],
            60 => [ 'receiveable' => false, 'class' => 'danger',    'name' => '주문취소'],
            61 => [ 'receiveable' => false, 'class' => 'danger',    'name' => '결제실패'],
        ],
        'type' => [
            'buy_inst'      => '바로주문',
            'buy_cart'      => '장바구니주문',
            'buy_estimate'  => '견적주문',
            'buy_temp'      => '임의주문',
        ],
        'pay_method' => [
            'C' => '카드',
            'B' => '계좌이체',
            'P' => 'PSYS',
            'R' => '원격결제',
            'E' => '에스크로',
        ],
        'delivery_com' => [
            "우체국택배" => "http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=[송장번호]",
            "한진택배"   => "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&wblnumText2=[송장번호]&schLang=KR",
            "CJ대한통운" => "https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=[송장번호]",
            "롯데택배"   => "https://www.lotteglogis.com/open/tracking?invno=[송장번호]",
            "로젠택배"   => "http://d2d.ilogen.com/d2d/delivery/invoice_tracesearch_quick.jsp?slipno=[송장번호]",
            "경동택배"   => "https://kdexp.com/basicNewDelivery.kd?barcode=[송장번호]",
        ],
        'dlvy_msg' => [
            1 => "부재시 경비실에 맡겨주세요.",
            2 => "부재시 핸드폰으로 연락바랍니다.",
            3 => "빠른 배송 부탁드립니다.",
            4 => "배송 전 연락바랍니다.",
        ]
    ];
    //  이거 안하면 디비랑 다른(UTC) 시간을 내보낸다.
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }

    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }
    public function getOrderConfig() { return $this->orderConfig; }
    // public function getStepAttribute() { return self::gdImgSrc(); }

    public function user() { return $this->belongsTo(\App\Models\User::class, 'created_id'); }
    public function mng() { return $this->belongsTo(\App\Models\User::class, 'od_mng'); }
    public function orderPurchaseAt() { return $this->hasMany(OrderPurchaseAt::class, "odpa_od_id"); }//->orderBy('gm_order'); }
    public function orderModel() { return $this->hasMany(OrderModel::class, "odm_od_id"); }
    public function orderExtraInfo() { return $this->hasOne(OrderExtraInfo::class, 'oex_od_id', 'od_id'); }
    public function fileInfo() {    return $this->morphOne(\App\Models\FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function pg() { return $this->hasOne(Pg::class, 'pg_od_no', 'od_no'); }

    public function scopeStartDate($q, $d)          { return $q->whereDate('shop_order.created_at', '>=', $d); }
    public function scopeEndDate($q, $d)            { return $q->whereDate('shop_order.created_at', '<=', $d); }
    public function scopeSchWriter($query, $id) { return $query->where('created_id', $id); }
    public function scopeToday($query) { return $query->whereRaw('created_at > CURDATE()'); }

    public function scopeSchOd_addr($query, $sch_text) { return $query->where('od_addr1', 'like', "%$sch_text%"); }

    public function scopeSchDepartment($query, $id) { return $query->whereIn('created_id', $id)->whereNotNull('od_no'); }
    public function scopeOdinLast3Mths($query) {
        return $query->where([
            ['od_step', '>=', 30],
            ['od_step', '<=', 70],
            ['created_at', '>=', Carbon::now()->subMonths(3)->toDateString().' 00:00:00'] ]);
    }
    public function scopeMb_yn($query) { return $query->where('od_mb_yn', 'Y'); }


    // public function getPg() { return Pg::where('pg_od_no', $this->od_no)->first(); }

    public function odPapa() { return $this->find($this->od_id_papa); }


}
