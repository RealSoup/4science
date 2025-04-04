<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Wish extends Model {
    protected $primaryKey = 'wi_id';
    protected $table = 'shop_wish';
    protected $guarded = [];
    protected $appends = ['check'];
    public $timestamps = false;
    
    public function getCheckAttribute() { return false; }
    public function goodsModel() {  return $this->hasOne(GoodsModel::class, 'gm_id', 'wi_gm_id'); }
}
