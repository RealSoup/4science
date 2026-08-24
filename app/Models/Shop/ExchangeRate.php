<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model {
    protected $table = 'shop_exchange_rate';
    protected $primaryKey = 'er_id';
    public $timestamps = false;
    protected $guarded = [];
    protected $casts = ['er_rate_date' => 'date'];   // 추가

    public static function current($curUnit) {
        return static::where('er_cur_unit', $curUnit)->orderByDesc('er_rate_date')->first();
    }
}