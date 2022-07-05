<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model {
    protected $primaryKey = 'lg_id';
    protected $table = 'ledger';
    protected $guarded = [];

    // protected $dates = [
    //     'created_at',
    //     'updated_at',
    //     'deleted_at'
    // ];
    
    public function ledgerModel() {  return $this->hasMany(LedgerModel::class, "lm_lg_id"); }

    public function scopeStartDate($query, $d) { return $query->whereDate('created_at', '>=', $d); }
    public function scopeEndDate($query, $d) { return $query->whereDate('created_at', '<=', $d); }
    public function scopeMng($query, $m) { return $query->where('lg_mng', $m); }
    public function scopePayType($query, $t) { return $query->where('lg_pay_type', $t); }

    public function scopeLgIdArr($query, $ids) { return $query->whereIn('lg_id', (count($ids) ? $ids : [''])); }
}
