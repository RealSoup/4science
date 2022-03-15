<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderAnswer extends Model {
    protected $table = 'shop_order_answer';
    protected $primaryKey = 'oda_id';
    public $timestamps = false;
    protected $guarded = [];

}
