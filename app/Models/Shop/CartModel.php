<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class CartModel extends Model {
    protected $table = 'shop_cart_model';
    protected $primaryKey = 'cm_id';
    public $timestamps = false;
    protected $fillable = ['cm_ct_id', 'cm_gm_id', 'cm_ea']; // 수정가능 필드 입력

    public function goodsModel() { return $this->hasOne(GoodsModel::class, 'gm_id', 'cm_gm_id'); }
    public function goodsDiscount() { return $this->hasMany(GoodsDiscount::class, 'cm_gm_id', 'gdc_gm_id'); }

    public function scopeCm_ct_id($query, int $cm_ct_id) { return $query->where('cm_ct_id', $cm_ct_id); }
}
