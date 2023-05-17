<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsSearch extends Model {
    protected $table = 'shop_goods_search';
    public $timestamps = false;
    protected $guarded = [];

    public function goods() {           return $this->belongsTo(Goods::class, 'gd_id'); }
    public function goodsModelPrime() { return $this->hasOne(GoodsModel::class, "gm_gd_id", 'gd_id')->Prime(); }
    public function scopeEnable($q, $v)             { return $q->where('gd_enable', $v); }
}
