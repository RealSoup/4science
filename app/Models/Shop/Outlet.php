<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Outlet extends Model {
    protected $primaryKey = 'ol_id';
    protected $table = 'shop_outlet';
    protected $guarded = [];
    public $timestamps = false;

    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'ol_key'); }

    public function scopeCode($query, string $code) { return $query->where('ol_code', $code); }
    public function scopeGroup($query, string $group) { return $query->where('ol_group', $group); }
}
