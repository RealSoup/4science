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

    public function estimateModel() {   return $this->morphMany(EstimateModel::class, 'estimateAble', 'em_type', "em_papa_id"); }
    public function estimateReply() {   return $this->hasMany(EstimateReply::class, "er_eq_id"); }
    public function fileInfo() {        return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function mng()       {       return $this->belongsTo(User::class, 'eq_mng'); }

    public function scopeEqId($query, $id_arr=[0]) {
        if ($id_arr->count() == 0) $id_arr = [0];
        return $query->whereIn('eq_id', $id_arr);
    }
    public function scopeEqName($query, $keyword) { return $query->where('eq_name', 'like', "%" . $keyword . "%"); }
    public function scopeEqDepartment($query, $keyword) { return $query->where('eq_department', 'like', "%" . $keyword . "%"); }
    public function scopeEqTel($query, $keyword) { return $query->where('eq_tel', 'like', "%" . $keyword . "%"); }
    public function scopeEqEmail($query, $keyword) { return $query->where('eq_email', 'like', "%" . $keyword . "%"); }

    public function scopeEqHp($query, $keyword) { return $query->where('eq_hp', 'like', "%" . $keyword . "%"); }
    public function scopeStartDate($q, $d)          { return $q->whereDate('shop_estimate_req.created_at', '>=', $d); }
    public function scopeEndDate($q, $d)            { return $q->whereDate('shop_estimate_req.created_at', '<=', $d); }
    public function scopeEqType($query, $type) { return $query->where('eq_type', $type); }
    public function scopeEqStep($query, $step) { return $query->where('eq_step', $step); }
    public function scopeEqMng($query, $mng) { return $query->where('eq_mng', $mng); }
    public function scopeCreatedId($query, $id) { return $query->where('shop_estimate_req.created_id', $id); }
    public function scopeCreatedIdArr($query, $id_arr) { return $query->whereIn('shop_estimate_req.created_id', $id_arr); }


}
