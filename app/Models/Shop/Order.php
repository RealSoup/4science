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
            10 => '주문접수',
            11 => '승인대기',
            12 => '결제대기',
            20 => '결제완료',
            30 => '배송준비',
            31 => '배송중',
            32 => '배송완료',
            40 => '구매확정',
            50 => '주문취소',
            51 => '결제실패',
        ],
        'type' => [
            'inst' => '바로구매',
            'cart' => '장바구니',
            'quote' => '견적구매',
        ],
        'pay_method' => [
            'C' => '카드',
            'B' => '계좌이체',
            'P' => 'PSYS',
            'S' => '전표',
            'E' => '에스크로',
        ],
    ];
    //  이거 안하면 디비랑 다른(UTC) 시간을 내보낸다.
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }

    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }

    public function getOrderConfig() { return $this->orderConfig; }

    // public function getStepAttribute() { return self::gdImgSrc(); }

    public function user() { return $this->belongsTo(\App\Models\User::class, 'created_id'); }
    public function mng() { return $this->belongsTo(\App\Models\User::class, 'od_mng'); }
    public function orderGoods() { return $this->hasMany(OrderGoods::class, "odg_od_id"); }//->orderBy('gm_order'); }
    public function orderModel() { return $this->hasMany(OrderModel::class, "odm_od_id"); }
    public function orderExtraInfo() { return $this->hasOne(OrderExtraInfo::class, 'oex_od_id', 'od_id'); }
    // public function fileInfo() {    return $this->morphOne(\App\Models\FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function pg() { return $this->hasOne(Pg::class, 'pg_od_no', 'od_no'); }
    public function orderAnswer() { return $this->hasOne(OrderAnswer::class, 'oda_od_id', 'od_id'); }



    public function scopeSchStartDate($query, $date) { return $query->where('shop_order.created_at', '>=', $date); }
    public function scopeSchEndDate($query, $date) { return $query->where('shop_order.created_at', '<=', $date); }
    public function scopeSchType($query, $type) { return $query->where('od_type', $type); }
    public function scopeSchPayMethod($query, $method) { return $query->where('od_pay_method', $method); }
    public function scopeSchStep($query, $step) { return $query->where('od_step', $step); }
    public function scopeSchManager($query, $mng) { return $query->where('od_mng', $mng); }
    public function scopeSchStartPrice($query, $price) { return $query->where('od_all_price', '>=', $price); }
    public function scopeSchEndPrice($query, $price) { return $query->where('od_all_price', '<=', $price); }
    public function scopeSchMngGroup($query, $group) { return $query->whereIn('od_mng', (count($group) ? $group : [''])); }

    public function scopeSchOrderer($query, $txt) { return $query->where('od_orderer', 'like', "%$txt%"); }
    public function scopeSchWriter($query, $id) { return $query->where('created_id', $id); }
    public function scopeSchWriterArr($query, $ids) { return $query->whereIn('created_id', (count($ids) ? $ids : [''])); }
    public function scopeSchOrdererHp($query, $txt) { return $query->where('od_orderer_hp', 'like', "%$txt%"); }
    public function scopeSchOdNo($query, $txt) { return $query->where('od_no', 'like' , "%$txt%"); }
    public function scopeSchOdId($query, $txt) { return $query->where('od_id', $txt); }
    public function scopeSchOdIdArr($query, $ids) { return $query->whereIn('od_id', (count($ids) ? $ids : [''])); }
    public function scopeSchReceiver($query, $txt) { return $query->where('od_receiver', 'like' , "%$txt%"); }
    public function scopeSchAddr1($query, $txt) { return $query->where('od_addr1', 'like' , "%$txt%"); }




    public function scopeToday($query) { return $query->whereRaw('created_at > CURDATE()'); }
    public function scopeSchDepositor($query, $name) { return $query->where('od_depositor', $name); }

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
