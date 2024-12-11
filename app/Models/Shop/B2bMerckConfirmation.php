<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class B2bMerckConfirmation extends Model {
    protected $table = 'shop_b2b_merck_confirmation';
    protected $primaryKey = 'bmc_id';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['bmc_data_item'];

    // public function getBmcDataAttribute($v) { return $xmlData = new \SimpleXMLElement($v); }
    public function getBmcDataItemAttribute() {
        $xmlData = new \SimpleXMLElement($this->bmc_data);
        $item = json_decode( json_encode($xmlData->Request->ConfirmationRequest) , 1);

        $rst = array();
            // dump($xmlData->Request->ConfirmationRequest);
        
        if (array_key_exists('OrderReference', $item))
            if(strpos($item['OrderReference']['@attributes']['orderID'], "취소") !== false)   
                return "cancel";
        
        if ( isset($item['ConfirmationItem'][0]) ) {
            $tmp = array();
            foreach( $item['ConfirmationItem'] as $v ) {
                $tmp['no'] = $v['@attributes']['lineNumber'];
                $tmp['ea'] = number_format($v['@attributes']['quantity']).' '.$v['UnitOfMeasure'];
                $tmp['rst'] = self::makeConfirmationStatus($v);
                $rst[] = $tmp;
            }
        } else {
            $rst[0]['no'] = $item['ConfirmationItem']['@attributes']['lineNumber'];
            $rst[0]['ea'] = number_format($item['ConfirmationItem']['@attributes']['quantity']).' '.$item['ConfirmationItem']['UnitOfMeasure'];
            $rst[0]['rst'] = self::makeConfirmationStatus($item['ConfirmationItem']);
        }
        return $rst;
    }

    public function makeConfirmationStatus($v) {
        $rst = array();
        
        if ( array_key_exists('ConfirmationStatus', $v) ) {
            if ( isset($v['ConfirmationStatus'][0]) ) {
                $rst02 = array();
                foreach( $v['ConfirmationStatus'] as $v2 ) {
                    $rst02['dlvy'] = $v2['@attributes']['deliveryDate'];
                    $rst02['ea'] = number_format($v2['@attributes']['quantity']).' '.$v2['UnitOfMeasure'];
                    $rst02['accept'] = $v2['@attributes']['type'];
                    $rst02['price'] = number_format($v2['UnitPrice']['Money']).' 원';
                    $rst[] = $rst02;
                }
            } else {
                $rst[0]['dlvy']      = $v['ConfirmationStatus']['@attributes']['deliveryDate'];
                $rst[0]['ea']        = number_format($v['ConfirmationStatus']['@attributes']['quantity']).' '.$v['ConfirmationStatus']['UnitOfMeasure'];
                $rst[0]['accept']    = $v['ConfirmationStatus']['@attributes']['type'];
                $rst[0]['price']     = number_format($v['ConfirmationStatus']['UnitPrice']['Money']).' 원';
            }
        } else {
            $rst[] = "데이터 없음";
        }
        return $rst;
    }
}
