<?php
namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderCoupon extends Model {
    protected $primaryKey = 'odc_id';
    protected $table = 'shop_order_coupon';
    protected $guarded = [];
    public $timestamps = false;
}
