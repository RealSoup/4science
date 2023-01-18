<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class HashJoin extends Model {
    protected $table = 'shop_hash_join';
    public $timestamps = false;
    protected $fillable = ['gd_id', 'hs_id']; // 수정가능 필드 입력

    public function goods() { return $this->belongsTo(Goods::class); }
    public function hash() { return $this->hasOne(Hash::class, 'hs_id', 'hs_id'); }
    public function joinHash() { return $this->join('shop_hash', 'shop_hash_join.hs_id', '=', 'shop_hash.hs_id')->select('shop_hash.hs_id', 'shop_hash.hs_tag'); }

    public function scopeGdId($query, $gd_id) { return $query->where('gd_id', $gd_id); }
    public function scopeHsId($query, $hs_id) { return $query->where('hs_id', $hs_id); }

}
