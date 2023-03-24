<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMileage extends Model {
    protected $primaryKey = 'ml_id';
    protected $table = 'user_mileage';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['refine_content', 'expiration'];

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

    public function scopeEnable($query) { return $query->whereRaw("created_at > SUBDATE(NOW(), INTERVAL 1 YEAR)"); }
    public function scopeUid($query, $id) { return $query->where('ml_uid', $id); }
    // public function scopeWriter($query, $id) { return $query->where('created_id', $id); }
    public function scopeTbl($query, $v) { return $query->where('ml_tbl', $v); }
    public function scopeType($query, $v) { return $query->where('ml_type', $v); }
    public function scopeKey($query, $v) { return $query->where('ml_key', $v); }

    
    public function enableMileage($id) { return $this->Uid($id)->Enable()->sum('ml_enable_m'); }
    /*
    회원 등급별로 구매 적립 마일러지를 계산해준다.
    */
    public function mileage_calculation($p, $ea, $lv) {
        $rst = 0;
        if ( $lv == 2 )                 $rst = $p * $ea * 0.5 / 100;
        else if ( $lv == 3 )            $rst = $p * $ea * 1   / 100;
        else if ( $lv == 4 || $lv > 10) $rst = $p * $ea * 1.5 / 100;
        return round($rst);
    }

}
