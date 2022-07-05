<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\{DB, Validator, Input};

class Category extends Model {
    use SoftDeletes;
    protected $primaryKey = 'ca_id';
    protected $table = 'shop_category';
    // public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['sub_show'];

    // 사용자 속성 추가
    public function getSubShowAttribute() { return false; }

	// 선택한 카테고리 자식 리턴
    public function getCate($ca_id, $hasChild=false) {
        if ($hasChild) {
            $ca = $this->select("shop_category.*",
                                DB::raw("EXISTS(SELECT * FROM la_shop_category as inner_ca
                                WHERE inner_ca.ca_papa = la_shop_category.ca_id) as hasChild"));
        } else {
            $ca = $this->select('ca_id', 'ca_papa', 'ca_name', 'ca_seq', 'ca_tel');
        }
        return $ca->ca_papa($ca_id)->orderBy('ca_seq')->get();
    }

    public function scopeCa_papa($query, int $ca_id) { return $query->where('ca_papa', $ca_id); }

    // 카테고리 자식 갯수
    public function cateChildCount($ca_id) { return $this->where('ca_papa', $ca_id)->count(); }

    // 카테고리 이름 리턴
    // public function getName($ca_id) { return Category::find($ca_id)->ca_name; }
    public function getName($ca_id) { return $this->find($ca_id)->ca_name; }
}
