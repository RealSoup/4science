<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model {
    protected $primaryKey = 'lg_id';
    protected $table = 'ledger';
    protected $guarded = [];
    protected $appends = ['chk_cplt'];

    public static $config = [
        'pay_type'=>[
            'CARD' => '온라인카드',
            'PSYS' => 'PSYS',
            'BILL' => '세금계산서',
            'RPAY' => '원격결제',
            'CASH' => '현금영수증',
            'MEMB' => '회원',
            'NOT'  => '미발급',
            'CXL'  => '거래 취소',
        ],
    ];
    public function getChkCpltAttribute() { return false; }

    
    public function ledgerModel() {  return $this->hasMany(LedgerModel::class, "lm_lg_id"); }

    public function scopeStartDate($query, $d) { return $query->whereDate('created_at', '>=', $d); }
    public function scopeEndDate($query, $d) { return $query->whereDate('created_at', '<=', $d); }
    public function scopeMng($query, $m) { return $query->where('lg_mng', $m); }
    public function scopePayType($query, $t) { return $query->where('lg_pay_type', $t); }

    public function scopeLgIdArr($query, $ids) { return $query->whereIn('lg_id', (count($ids) ? $ids : [''])); }
}
