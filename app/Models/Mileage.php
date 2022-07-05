<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mileage extends Model {
    protected $primaryKey = 'ml_id';
    protected $table = 'mileage';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['mileage', 'refine_content'];

    protected $mileage = [
        'write' => 10,
        'comment' => 5,
        'good' => 3,
    ];

    public function user() { return $this->belongsTo(User::class, 'ml_uid'); }

    public function getMileageAttribute() { return $this->mileage; }
    public function getRefineContentAttribute() {
        $arr_con = null;
        if ( $this->ml_type == 'voucher' )
            $arr_con = explode('||', $this->ml_content); 
        return $arr_con; 
    }

    public function scopeEnable($query) { return $query->whereRaw("created_at > SUBDATE(NOW(), INTERVAL 1 YEAR)"); }
    public function scopeUid($query, $id) { return $query->where('ml_uid', $id); }
    public function scopeWriter($query, $id) { return $query->where('created_id', $id); }
    public function scopeType($query, $v) { return $query->where('ml_type', $v); }
    public function scopeKey($query, $v) { return $query->where('ml_key', $v); }
}
