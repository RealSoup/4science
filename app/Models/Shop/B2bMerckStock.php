<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class B2bMerckStock extends Model {
    protected $table = 'shop_b2b_merck_stock';
    protected $primaryKey = 'bms_id';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['bms_data_other_info'];

    public function getBmsDataAttribute($v) { return $xmlData = new \SimpleXMLElement($v); }
    public function getBmsDataOtherInfoAttribute($v) {
        $tmp = json_decode( json_encode($this->bms_data->ProductResponse) , 1); 
        return self::arrayToString($tmp['OtherInfo']); 
    }

    //	배열 키와 값을 이쁘게 출력
	public function arrayToString($array, $depth=0, $type=null) {
		$depth++;
		$htmlString = '';
		foreach ( $array as $key => $value ) {
			$htmlString .= '
				<div class="depth0'.$depth.'">
					<span class="attributes'.$type.'">'.$key.'</span>';
			if ( is_array($value) ) {
				if ( $key == 'OtherInfo' )
					$htmlString .= $this -> arrayToString($value, $depth, ' indent');
				else
					$htmlString .= $this -> arrayToString($value, $depth);
			} else if ( gettype($value) == "string" ) {
				$htmlString .= '
					<span class="data'.$type.'">'.$value.'</span>';
			}
			$htmlString .= '
				</div>';
		}
		return $htmlString;
	}
}
