<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use DateTimeInterface;
use App\Models\{FileInfo, User};

class EstimateReq extends Model {
    use HasFactory;
    use SoftDeletes;
    protected $table = 'shop_estimate_req';
    protected $primaryKey = 'eq_id';
    protected $dates = [ 'created_at', 'updated_at', 'deleted_at' ];
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }
    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }
    public static $option = [
        "custom_made_category" => [
            "1"  => "분광기",
            "2"  => "Stage (Manipulation system)",
            "3"  => "Drying Chamber",
            "4"  => "FFU unit system (간이형 clean bench)",
            "5"  => "Dark Room",
            "6"  => "Bending Machine",
            "7"  => "Vision system",
            "8"  => "Impeller(오버헤드스터러 용)",
            "9"  => "실험가구",
            "10" => "PCB 기판 제작",
            "11" => "신발장 (방진화장)",
            "12" => "클린락카",
            "13" => "표준선반",
            "14" => "장갑, 마스크 소모품 보관함",
            "15" => "클린룸 테이블",
            "16" => "클린룸 캐비닛(옷장)",
            "17" => "방진복 제작",
            "18" => "강화유리 제작",
            "19" => "석영 제작",
            "20" => "순물질",
            "21" => "글로브박스",
            "22" => "데시게이터",
            "23" => "하드웨어 개발(전기/전자 장치)",
            "24" => "전자부품 구매대행"
        ]
    ];
    public function estimateModel() {   return $this->morphMany(EstimateModel::class, 'estimateAble', 'em_type', "em_papa_id"); }
    public function estimateReply() {   return $this->hasMany(EstimateReply::class, "er_eq_id"); }
    public function estimateReplyCplt() {   return $this->hasMany(EstimateReply::class, "er_eq_id")->Cplt(); }
    public function estimateCustom() {  return $this->hasMany(EstimateCustom::class, "ec_eq_id"); }
    public function fileInfo() {        return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function mng()       {       return $this->belongsTo(User::class, 'eq_mng'); }
    public function user()       {      return $this->belongsTo(User::class, 'created_id')->withDefault();; }

    public function scopeEqId($query, $id_arr=[0]) {
        // if ($id_arr->count() == 0) $id_arr = [0];
        return $query->whereIn('eq_id', $id_arr);
    }
    public function scopeEqName($query, $keyword) { return $query->where('eq_name', 'like', "%" . $keyword . "%"); }
    public function scopeEqCompany($query, $keyword) { return $query->where('eq_company', 'like', "%" . $keyword . "%"); }
    public function scopeEqTel($query, $keyword) { return $query->where('eq_tel', 'like', "%" . $keyword . "%"); }
    public function scopeEqEmail($query, $keyword) { return $query->where('eq_email', 'like', "%" . $keyword . "%"); }

    public function scopeEqHp($query, $keyword) { return $query->where('eq_hp', 'like', "%" . $keyword . "%"); }
    public function scopeStartDate($q, $d)          { return $q->whereDate('shop_estimate_req.created_at', '>=', $d); }
    public function scopeEndDate($q, $d)            { return $q->whereDate('shop_estimate_req.created_at', '<=', $d); }
    public function scopeEqStep($query, $step) { return $query->where('eq_step', $step); }
    public function scopeEqMng($query, $mng) { return $query->where('eq_mng', $mng); }
    public function scopeCreatedId($query, $id) { return $query->where('shop_estimate_req.created_id', $id); }
    public function scopeCreatedIdArr($query, $id_arr) { return $query->whereIn('shop_estimate_req.created_id', $id_arr); }

    public function scopeErStartDate( $q, $v) { return $q->where('shop_estimate_reply.created_at', '>=', $v); }
    public function scopeErEndDate(   $q, $v) { return $q->where('shop_estimate_reply.created_at', '<=', $v); }
    public function scopeErStartPrice($q, $v) { return $q->where('er_all_price', '>=', $v); }
    public function scopeErEndPrice(  $q, $v) { return $q->where('er_all_price', '<=', $v); }
}
