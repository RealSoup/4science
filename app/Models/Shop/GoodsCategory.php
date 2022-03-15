<?php
namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsCategory extends Model {
    protected $primaryKey = 'gc_id';
    protected $table = 'shop_goods_category';
    protected $guarded = [];
    public $timestamps = false;
}
