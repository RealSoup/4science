<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsOption extends Model {
    protected $table = 'shop_goods_option';
    protected $primaryKey = 'go_id';
    protected $fillable = ['go_gd_id', 'go_required', 'go_name']; // 수정가능 필드 입력
    public $timestamps = false;
    protected $appends = ['show'];

    public function getShowAttribute() { return false; }
    // public function goods() { return $this->belongsTo(Goods::class); }
    public function goodsOptionChild() { return $this->hasMany(GoodsOptionChild::class, "goc_go_id"); }

    public function scopeGd_id($query, $gd_id) { return $query->where('go_gd_id', $gd_id); }
}
