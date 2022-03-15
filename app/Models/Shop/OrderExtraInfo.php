<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderExtraInfo extends Model {
    protected $table = 'shop_order_extra_info';
    protected $primaryKey = 'oex_id';
    public $timestamps = false;
    protected $guarded = [];

    public function scopeDepositor($query, $txt) { return $query->where('oex_depositor', 'like' , "%$txt%"); }
}
