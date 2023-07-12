<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Shop\{GoodsCategory};

class ShowWindow extends Model {
    protected $primaryKey = 'sw_id';
    protected $table = 'show_window';
    public $timestamps = false;
    protected $guarded = [];
    
    public function goods() {  return $this->hasOne(\App\Models\Shop\Goods::class, 'gd_id', 'sw_key'); }
    public function goodsCategoryFirst() {  return $this->hasOne(GoodsCategory::class, "gc_gd_id", 'sw_key')->Prime(); }

    public function scopeType($query, $v) { return $query->where('sw_type', $v); }
    public function scopeGroup($query, $v) { return $query->where('sw_group', $v); }
}
