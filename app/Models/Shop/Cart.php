<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Cookie;

class Cart extends Model {
    protected $table = 'shop_cart';
    protected $primaryKey = 'ct_id';
    protected $guarded = [];
    public $timestamps = false;

    public function user() { return $this->belongsTo(User::class, 'created_id'); }
    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'ct_gd_id'); }

    public function scopeCreated_id($q, $v) { return $q->where('created_id', $v); }
    public function scopeTarget($q, $v1, $v2, $v3, $v4) { return $q->where(['created_id'=>$v1, 'ct_gd_id'=>$v2, 'ct_key'=>$v3, 'ct_type'=>$v4]); }


    public function getCartModelCnt(){ return Cart::Created_id(auth()->user()->id) ->count(); }
}
