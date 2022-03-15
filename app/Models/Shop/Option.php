<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class Option extends Model {
    protected $table = 'shop_option';
    protected $primaryKey = 'op_id';
    protected $fillable = ['op_gd_id', 'op_gm_id', 'op_order', 'op_required', 'op_duplicate', 'op_sequence', 'op_name']; // 수정가능 필드 입력
    public $timestamps = false;
    protected $appends = ['show'];

    public function getShowAttribute() { return false; }
    // public function goods() { return $this->belongsTo(Goods::class); }
    public function optionChild() { return $this->hasMany(OptionChild::class, "opc_op_id"); }

    public function scopeGd_id($query, $gd_id) { return $query->where('op_gd_id', $gd_id); }
    public function scopeSequence($query, $yORn) { return $query->where('op_sequence', $yORn); }
}
