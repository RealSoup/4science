<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Cookie;

class Cart extends Model {
    protected $table = 'shop_cart';
    protected $primaryKey = 'ct_id';
    public $timestamps = false;
    protected $fillable = ['ct_gd_id', 'ct_gm_id', 'created_id', 'created_at', 'ip']; // 수정가능 필드 입력

    public function user() { return $this->belongsTo(User::class, 'created_id'); }
    public function cartModel() { return $this->hasMany(CartModel::class, "cm_ct_id", "ct_id"); }
    public function cartOption() { return $this->hasMany(CartOption::class, "co_ct_id", "ct_id"); }
    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'ct_gd_id'); }

    public function scopeCreated_id($query, $created_id) { return $query->where('created_id', $created_id); }


    public function getCartModelCnt(){
        return Cart::join('shop_cart_model', 'shop_cart_model.cm_ct_id', '=', 'shop_cart.ct_id')
                    ->Created_id(auth()->user()->id)
                    ->count();
    }
}
