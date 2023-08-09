<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class B2bMerckInvoice extends Model {
    protected $table = 'shop_b2b_merck_invoice';
    protected $primaryKey = 'bmi_id';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['bmi_data_other_info'];

    public function getBmiDataAttribute($v) { return $xmlData = new \SimpleXMLElement($v); }
    public function getBmiDataOtherInfoAttribute($v) {
        $tmp = json_decode( json_encode($this->bmi_data->Request) , 1); 
        return self::arrayToString($tmp); 
    }

    //	배열 키와 값을 이쁘게 출력
	public function arrayToString($array, $depth=0, $type=null) {
		$depth++;
		$htmlString = '';
		foreach ( $array as $k => $v ) {
			$htmlString .= '
				<div class="depth0'.$depth.'">
					<span class="attributes'.$type.'">'.$k.'</span>';
			if ( is_array($v) ) {
				if ( $k == 'OtherInfo' )
					$htmlString .= self::arrayToString($v, $depth, ' indent');
				else
					$htmlString .= self::arrayToString($v, $depth);
			} else if ( gettype($v) == "string" ) {
				$htmlString .= '
					<span class="data'.$type.'">'.$v.'</span>';
			}
			$htmlString .= '
				</div>';
		}
		return $htmlString;
	}
}
