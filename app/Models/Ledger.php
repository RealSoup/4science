<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model {
    protected $primaryKey = 'lg_id';
    protected $table = 'ledger';
    protected $guarded = [];
    protected $appends = ['edit'];
    public function getEditAttribute() { return false; }


    public function scopeStartDate($query, $d) { return $query->where('lg_order_dt', '>=', $d); }
    public function scopeEndDate($query, $d) { return $query->where('lg_order_dt', '<=', $d); }
    public function scopeStartGmPrice($query, $p) { return $query->where('lg_gm_price', '>=', $p); }
    public function scopeEndGmPrice($query, $p) { return $query->where('lg_gm_price', '<=', $p); }
    public function scopeStartEaPrice($query, $p) { return $query->where('lg_ea_price', '>=', $p); }
    public function scopeEndEaPrice($query, $p) { return $query->where('lg_ea_price', '<=', $p); }
    public function scopeStartSurtax($query, $p) { return $query->where('lg_surtax', '>=', $p); }
    public function scopeEndSurtax($query, $p) { return $query->where('lg_surtax', '<=', $p); }
    public function scopeStartSumPrice($query, $p) { return $query->where('lg_sum_price', '>=', $p); }
    public function scopeEndSumPrice($query, $p) { return $query->where('lg_sum_price', '<=', $p); }
    public function scopeMng($query, $m) { return $query->where('lg_mng', $m); }
    public function scopePayType($query, $t) { return $query->where('lg_pay_type', $t); }
}
