<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model {
    protected $primaryKey = 'li_id';
    protected $table = 'shop_listing';
    protected $guarded = [];
    public $timestamps = false;

    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'li_gd_id'); }

    public function scopeCode($query, string $code) { return $query->where('li_code', $code); }
}
