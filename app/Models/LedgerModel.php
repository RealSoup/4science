<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LedgerModel extends Model {
    protected $primaryKey = 'lm_id';
    protected $table = 'ledger_model';
    protected $guarded = [];
    protected $appends = ['show_menu', 'is_edit'];
    
    public function getShowMenuAttribute() { return false; }
    public function getIsEditAttribute() { return false; }

    public function scopeStartGmPrice($query, $p) { return $query->where('lm_gm_price', '>=', $p); }
    public function scopeEndGmPrice($query, $p) { return $query->where('lm_gm_price', '<=', $p); }
    public function scopeStartEaPrice($query, $p) { return $query->where('lm_ea_price', '>=', $p); }
    public function scopeEndEaPrice($query, $p) { return $query->where('lm_ea_price', '<=', $p); }
    public function scopeStartSurtax($query, $p) { return $query->where('lm_surtax', '>=', $p); }
    public function scopeEndSurtax($query, $p) { return $query->where('lm_surtax', '<=', $p); }
    public function scopeStartSumPrice($query, $p) { return $query->where('lm_sum_price', '>=', $p); }
    public function scopeEndSumPrice($query, $p) { return $query->where('lm_sum_price', '<=', $p); }
}
