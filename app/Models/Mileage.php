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

    public function getMileageAttribute() { return $this->mileage; }
    public function getRefineContentAttribute() {
        $arr_con = null;
        if ( $this->ml_type == 'voucher' )
            $arr_con = explode('||', $this->ml_content); 
        return $arr_con; 
    }

    public function scopeEnable($query) { return $query->whereRaw("created_at > SUBDATE(NOW(), INTERVAL 1 YEAR)"); }
    public function scopeUid($query, $id) { return $query->where('ml_uid', $id); }
}
