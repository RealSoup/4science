<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsRelate extends Model {
    protected $table = 'shop_goods_relate';
    protected $primaryKey = 'gr_id';
    public $timestamps = false;
    protected $guarded = [];
    
    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'gr_val'); }
}
