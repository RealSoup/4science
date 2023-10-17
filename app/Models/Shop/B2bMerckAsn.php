<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class B2bMerckAsn extends Model {
    protected $table = 'shop_b2b_merck_asn';
    protected $primaryKey = 'bma_id';
    public $timestamps = false;
    protected $guarded = [];

    public function getBmaDataAttribute($v) { return $xmlData = new \SimpleXMLElement($v); }
    // public function getBmaDataOtherInfoAttribute($v) {
    //     $tmp = json_decode( json_encode($this->bma_data->Request->ShipNoticeRequest) , 1); 
    //     return self::arrayToString($tmp['ShipNoticePortion']); 
    // }

    // //	배열 키와 값을 이쁘게 출력
	// public function arrayToString($array, $depth=0, $type=null) {
	// 	$depth++;
	// 	$htmlString = '';
	// 	foreach ( $array as $k => $v ) {
	// 		$htmlString .= '
	// 			<div class="depth0'.$depth.'">
	// 				<span class="attributes'.$type.'">'.$k.'</span>';
	// 		if ( is_array($v) ) {
	// 			if ( $k == 'OtherInfo' )
	// 				$htmlString .= self::arrayToString($v, $depth, ' indent');
	// 			else
	// 				$htmlString .= self::arrayToString($v, $depth);
	// 		} else if ( gettype($v) == "string" ) {
	// 			$htmlString .= '
	// 				<span class="data'.$type.'">'.$v.'</span>';
	// 		}
	// 		$htmlString .= '
	// 			</div>';
	// 	}
	// 	return $htmlString;
	// }
}
