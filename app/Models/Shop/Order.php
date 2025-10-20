<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use DateTimeInterface;

class Order extends Model {
    use SoftDeletes;
    protected $table = 'shop_order';
    protected $primaryKey = 'od_id';
    protected $fillable = ['od_no', 'od_step', 'od_receive_confirm_possible', 'od_depositor', 'od_mng', 'created_id', 'created_at', 'ip']; // 수정가능 필드 입력
    
    public static $orderConfig = [
        'step' => [
            // 0 => [ 'receiveable' => false, 'class' => '',   'name' => '임시저장'],
            10 => [ 'receiveable' => false, 'class' => 'plum',    'name' => '주문접수',     'sm_name' => '접수' ],
            11 => [ 'receiveable' => false, 'class' => 'white',   'name' => '입금확인요청', 'sm_name' => '확요' ],
            12 => [ 'receiveable' => false, 'class' => 'white',   'name' => '입금확인중',   'sm_name' => '확중' ],
            20 => [ 'receiveable' => false, 'class' => 'green',   'name' => '입금완료',     'sm_name' => '입완' ],
            30 => [ 'receiveable' => false, 'class' => 'mint',    'name' => '제품준비중',   'sm_name' => '준중' ],
            31 => [ 'receiveable' => false, 'class' => 'teal',    'name' => '직배송',       'sm_name' => '직배' ],
            40 => [ 'receiveable' => true,  'class' => 'd_blue',  'name' => '배송중',       'sm_name' => '배중' ],
            50 => [ 'receiveable' => true,  'class' => 'gray',    'name' => '배송완료',     'sm_name' => '배완' ],
            60 => [ 'receiveable' => false, 'class' => 'black',   'name' => '주문취소',     'sm_name' => '취소' ],
            61 => [ 'receiveable' => false, 'class' => 'black',   'name' => '결제실패',     'sm_name' => '실패' ],
        ],
        'type' => [
            'buy_inst'      => '바로주문',
            'buy_cart'      => '장바구니주문',
            'buy_estimate'  => '견적주문',
            'buy_temp'      => '임의주문',
        ],
        'pay_method' => [
            'C' => '카드',
            'CP' => '카드(포사페이)',
            'CK' => '카드(수기입력)',
            'B' => '계좌이체',
            'L' => '후불결제(학교/연구소)',
            'P' => 'PSYS(즉시결제)',
            'S' => 'PSYS(후결제)',
            'R' => '원격결제',
            'BL' => '빌링',
            // 'E' => '에스크로',
        ],
        'delivery_com' => [
            "우체국택배" => "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=&displayHeader=N[송장번호]",
            "한진택배"   => "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&schLang=KR&wblnumText2=[송장번호]",
            "CJ대한통운" => "https://trace.cjlogistics.com/web/detail.jsp?slipno=[송장번호]",
            "롯데택배"   => "https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=[송장번호]",
            "로젠택배"   => "https://www.ilogen.com/m/personal/trace.pop/[송장번호]",
            "경동택배"   => "https://kdexp.com/service/delivery/etc/delivery.do?barcode=[송장번호]",
            "대신택배"   => "https://www.ds3211.co.kr/freight/internalFreightSearch.ht?billno=[송장번호]",
            "건영택배"   => "https://www.kunyoung.com/goods/goods_01.php?mulno=[송장번호]",
        ],
        'dlvy_msg' => [
            1 => "부재시 경비실에 맡겨주세요.",
            2 => "부재시 핸드폰으로 연락바랍니다.",
            3 => "빠른 배송 부탁드립니다.",
            4 => "배송 전 연락바랍니다.",
        ],
        'sale_env' => [
            'P' => 'PC', 
            'M' => 'MOBILE', 
            'A' => 'APP',
        ],
        'od_plan' => [
            'w1' => '1주',
            'w2' => '2주',
            'w3' => '3주',
            'w4' => '4주',
            'm2' => '2개월',
        ],
        'do_list' => [
            '서울',
            '경기', '인천', 
            '강원', 
            '충청', '충북', '세종', 
            '충남', '대전', 
            '전라', '전북', 
            '전남', '광주', 
            '경상', '경북', '대구', 
            '경남', '부산', '울산', 
            '제주', 
        ],
    ];
    //  이거 안하면 디비랑 다른(UTC) 시간을 내보낸다.
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }

    // 디폴트로 임시저장한 주문건은 제외
    // public function newQuery($excludeDeleted = true) { return parent::newQuery($excludeDeleted)->where('od_step', '!=', '0'); }
    public function newQuery() { return parent::newQuery()->where('od_step', '!=', '0'); }

    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }
    // public function getStepAttribute() { return self::gdImgSrc(); }

    public function user() { return $this->belongsTo(\App\Models\User::class, 'created_id')->withDefault(); }
    public function mng() { return $this->belongsTo(\App\Models\User::class, 'od_mng'); }
    public function orderPurchaseAt() { return $this->hasMany(OrderPurchaseAt::class, "odpa_od_id"); }//->orderBy('gm_order'); }
    public function orderModel() { return $this->hasMany(OrderModel::class, "odm_od_id"); }
    public function orderExtraInfo() { return $this->hasOne(OrderExtraInfo::class, 'oex_od_id', 'od_id')->withDefault(); }
    public function fileInfo() {    return $this->morphOne(\App\Models\FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function orderPg() { return $this->hasOne(OrderPg::class, 'pg_od_id', 'od_id')->withDefault(); }
    public function orderCoupon() { return $this->hasMany(OrderCoupon::class, 'odc_od_id'); }

    public function scopeStartDate($q, $d)  { return $q->whereDate('shop_order.created_at', '>=', $d); }
    public function scopeEndDate($q, $d)    { return $q->whereDate('shop_order.created_at', '<=', $d); }
    public function scopeSchWriter($q, $id) { return $q->where('created_id', $id); }
    // public function scopeToday($query) { return $query->whereRaw('created_at > CURDATE()'); }
    public function scopeOdStep($q, $v) { return $q->where('od_step', $v); }
    public function scopeSchOd_addr($q, $sch_text) { return $q->where('od_addr1', 'like', "%$sch_text%"); }    
    public function scopeOdAccept($q) { $q->where('od_type', '<>', 'buy_temp')	// 임의 주문 제외
                                          ->where('od_step', '>=', '20')	//	입금 완료부터
                                          ->where('od_step', '<=', '50');	//	배송완료까지
    }
    public function scopeMb_yn($q) { return $q->where('od_mb_yn', 'Y'); }


    // public function getPg() { return Pg::where('pg_od_no', $this->od_no)->first(); }

    public function odPapa() { return $this->find($this->od_id_papa); }


}
