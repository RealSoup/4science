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

    public static function getSelectedCate ($ca01=0, $ca02=0, $ca03=0) {
        $cate = \Cache::get('categoryAll');
        $rst = Array();
        $rst[0] = self::filterCate($cate);
        foreach ($cate as $v_1){
            if ( $v_1['ca_id'] == $ca01 ) {
                $rst[1] = self::filterCate($v_1['sub']);
                foreach ($v_1['sub'] as $v_2) {
                    if ( $v_2['ca_id'] == $ca02 ) {
                        $rst[2] = self::filterCate($v_2['sub']);
                        foreach ($v_2['sub'] as $v_3) {
                            if ( $v_3['ca_id'] == $ca03 )
                                $rst[3] = self::filterCate($v_3['sub']);
                        }
                    }
                }
            }
        }
        return $rst;
    }

    public static function filterCate($cate) {
        $rst = Array();
        foreach ($cate as $v) {
            Arr::forget($v, 'sub');
            Arr::forget($v, 'sub_show');
            $rst[] = $v;
        }
        return $rst;
    }

    public function cateTree01(int $ca_id=0, int $depth=1) {
		$ca = self::select('ca_id', 'ca_papa', 'ca_name', 'ca_seq', 'ca_seq')->ca_papa($ca_id)->oldest('ca_seq')->get()->toArray();
		if ($depth < 4) {
			foreach ($ca as $key => $val)
				$ca[$key]['sub'] = self::cateTree($val['ca_id'], $depth+1);
		}
		return $ca;
    }
    public function cateTree(int $ca_id=0, int $depth=1) {
        $json_string = file_get_contents("xx.json");
        return $json_string;
    }
}