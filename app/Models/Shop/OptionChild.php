<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OptionChild extends Model {
    protected $table = 'shop_option_child';
    protected $primaryKey = 'opc_id';
    protected $fillable = ['opc_op_id', 'opc_name', 'opc_price']; // 수정가능 필드 입력
    public $timestamps = false;
    protected $appends = ['show', 'ct_check_opt', 'opc_price_add_vat'];

    public function getShowAttribute() { return false; }
    public function getCtCheckOptAttribute() { return 'Y'; }
    public function getOpcPriceAddVatAttribute() { return (int)($this->opc_price*1.1); }

    public function option() { return $this->belongsTo(Option::class, 'opc_op_id'); }

    public function scopeOp_id($query, $op_id) { return $query->where('opc_op_id', $op_id); }

    public function getOpcNm($opc_id) { return OptionChild::select("opc_name")->find($opc_id)->opc_name; }
}
