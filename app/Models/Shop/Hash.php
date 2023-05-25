<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Hash extends Model {
    protected $primaryKey = 'hs_id';
    protected $table = 'shop_hash';
    protected $fillable = ['hs_tag']; // 수정가능 필드 입력
    public $timestamps = false;

    // public function hashJoin() { return $this->hasOne(HashJoin::class, "hs_id"); }

    public function scopeHsTag($query, $hs_tag) { return $query->where('hs_tag', $hs_tag); }

    // 카테고리 목록
    public function hashList($hash_tag=null) {
        $where = array();
        if ($hash_tag)
            $where[] = ['hs_tag', 'like', '%'.$hash_tag.'%'];
		return Hash::where($where)
            	->orderBy('hs_tag')
        		->get();


    }


}
