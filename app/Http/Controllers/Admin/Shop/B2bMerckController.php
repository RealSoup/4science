<?php
namespace App\Http\Controllers\Admin\shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop\{OrderModel, B2bMerck, B2bMerckModel, B2bMerckConfirmation, B2bMerckStock};
use DB;

class B2bMerckController extends Controller {
	protected $MerckMemberCode	= 'INESUS2035422570';
	protected $B2b_url = "https://api.sigmaaldrich.com/B2B/handler";
    public function order() {
        $data = OrderModel::leftJoin('shop_b2b_merck_model', 'shop_order_model.odm_id', '=', 'shop_b2b_merck_model.bmm_odm_id')
							->whereRaw('LEFT(odm_gm_catno, 3)=?', ['40-'])
							->whereNull('shop_b2b_merck_model.bmm_odm_id')
							->get();
		return response()->json($data);
    }

    public function orderExe(Request $req) {		
		$todayCnt = DB::table('shop_b2b_merck')->whereDate('created_at', date('Y-m-d'))->count();
		$todayCnt = $todayCnt < 10 ? '0'.$todayCnt : $todayCnt;

		$DeploymentMode	= "production";//"test";
		$xmlVersion		= '1.2.009';
		$payloadID		= 'payloadID_'.date("ymd").$todayCnt;
		$xmlLang		= 'en-US';
		$Domain			= 'DUNS';
		$currency		= 'KRW';
		$DeliverTo		= 'iNexus_'.auth()->user()->name;
		$ContactNm		= 'iNexus_'.auth()->user()->name;
		$Street			= '경기도 성남시 분당구';
		$City			= '판교로 253 C동 402호';
		$PostalCode		= '13486';
		$Country		= 'Republic Of Korea';
		$isoCountryCode	= 'KR';
		$Email			= auth()->user()->email;
		$ToIdentity		= 'SIGMAALDRICH';
		$SenderSharedSecret	= 'SIG01ALD123';
		$UserAgent		= 'iNexus';
		
		$orderID		= 'PO'.date("ymd").$todayCnt;
		
		$total_amt		= collect($req->list)->sum('odm_price');
		$currentTime 	= date("Y-m-d H:i:s");  // 현재시간

		$work_number 	= '031-8018-7284';
		$fax_number 	= '031-8018-7272';

		$addressID		= '2035422570';
		$FromIdentity	= $this -> MerckMemberCode;
		$SenderIdentity	= $this -> MerckMemberCode;

		$bm_id = DB::table('shop_b2b_merck')->insertGetId([ 'bm_orderid'	=> $orderID,
															'bm_req_dlvy'	=> $req->req_dlvy,
															'bm_total_amt'	=> $total_amt,
															'created_id'	=> auth()->user()->id, ]);
		$xml = new \XMLWriter;
		$xml->openMemory();
		$xml->startDocument('1.0', 'UTF-8');
		$xml->startDtd('cXML', null, 'http://xml.cXML.org/schemas/cXML/'.$xmlVersion.'/cXML.dtd');
		$xml->endDtd();

		$xml->startElement('cXML');
			$xml->writeAttribute('payloadID', $payloadID);
			$xml->writeAttribute('timestamp', $currentTime);
			$xml->writeAttribute('xml:lang', $xmlLang);

			$xml->startElement('Header');
				$xml->startElement('From');
					$xml->startElement('Credential');
						$xml->writeAttribute('domain', $Domain);
						$xml->writeElement('Identity', $FromIdentity);
					$xml->endElement();
				$xml->endElement();
				$xml->startElement('To');
					$xml->startElement('Credential');
						$xml->writeAttribute('domain', $Domain);
						$xml->writeElement('Identity', $ToIdentity);
					$xml->endElement();
				$xml->endElement();
				$xml->startElement('Sender');
					$xml->startElement('Credential');
						$xml->writeAttribute('domain', $Domain);
						$xml->writeElement('Identity', $SenderIdentity);
						$xml->writeElement('SharedSecret', $SenderSharedSecret);
					$xml->endElement();
					$xml->writeElement('UserAgent', $UserAgent);

				$xml->endElement();
			$xml->endElement();

			$xml->startElement('Request');
				$xml->writeAttribute('deploymentMode', $DeploymentMode);
				$xml->startElement('OrderRequest');
					$xml->startElement('OrderRequestHeader');
						$xml->writeAttribute('orderID', $orderID);
						$xml->writeAttribute('orderDate', $currentTime);
						$xml->writeAttribute('type', 'new');
						$xml->startElement('Total');
							$xml->startElement('Money');
								$xml->writeAttribute('currency', $currency);
								$xml->text($total_amt);
							$xml->endElement();
						$xml->endElement();
						$xml->startElement('ShipTo');
							$xml->startElement('Address');
								$xml->writeAttribute('addressID', $addressID);
								$xml->startElement('Name');
									$xml->writeAttribute('xml:lang', $xmlLang);
									$xml->text($UserAgent);
								$xml->endElement();
								$xml->startElement('PostalAddress');
									$xml->writeAttribute('name', 'default');
									$xml->writeElement('DeliverTo', $DeliverTo);
									$xml->writeElement('Street', $Street);
									$xml->writeElement('City', $City);
									$xml->writeElement('State', '');
									$xml->writeElement('PostalCode', $PostalCode);
									$xml->startElement('Country');
										$xml->writeAttribute('isoCountryCode', $isoCountryCode);
										$xml->text($Country);
									$xml->endElement();
								$xml->endElement();
								$xml->writeElement('Email', $Email);
							$xml->endElement();
						$xml->endElement();
						$xml->startElement('BillTo');
							$xml->startElement('Address');
								$xml->writeAttribute('addressID', $addressID);
								$xml->startElement('Name');
									$xml->writeAttribute('xml:lang', $xmlLang);
									$xml->text($UserAgent);
								$xml->endElement();
								$xml->startElement('PostalAddress');
									$xml->writeAttribute('name', 'default');
									$xml->writeElement('DeliverTo', $DeliverTo);
									$xml->writeElement('Street', $Street);
									$xml->writeElement('City', $City);
									$xml->writeElement('State', '');
									$xml->writeElement('PostalCode', $PostalCode);
									$xml->startElement('Country');
										$xml->writeAttribute('isoCountryCode', $isoCountryCode);
										$xml->text($Country);
									$xml->endElement();
								$xml->endElement();
							$xml->endElement();
						$xml->endElement();
						$xml->startElement('Contact');
							$xml->writeAttribute('role', 'buyer');
							$xml->startElement('Name');
								$xml->writeAttribute('xml:lang', $xmlLang);
								$xml->text($ContactNm);
							$xml->endElement();
							$xml->writeElement('Email', $Email);
						$xml->endElement();


						$xml->startElement('Tax');
							$xml->startElement('Money');
								$xml->writeAttribute('currency', $currency);
								$xml->text('0.0');
							$xml->endElement();
							$xml->startElement('Description');
								$xml->writeAttribute('xml:lang', $xmlLang);
								$xml->text('');
							$xml->endElement();
						$xml->endElement();
						$xml->startElement('Payment');
							$xml->startElement('PCard');
								$xml->writeAttribute('number', '');
								$xml->writeAttribute('expiration', '');
							$xml->endElement();
						$xml->endElement();
						$xml->startElement('Comments');
							$xml->writeAttribute('xml:lang', $xmlLang);
							$xml->text($req->req_dlvy);
						$xml->endElement();
					$xml->endElement();

					foreach ($req->list as $k => $v) {
						$bmm_id = DB::table('shop_b2b_merck_model')->insertGetId([
							'bmm_bm_id'			=> $bm_id,
							'bmm_lineNumber'	=> $k+1,
							'bmm_odm_id'		=> $v['odm_id'],
							'bmm_gm_id'			=> $v['odm_gm_id'],
							'bmm_gm_name'		=> $v['odm_gm_name'],
							'bmm_gm_code'		=> $v['odm_gm_code'],
							'bmm_gm_spec'		=> $v['odm_gm_spec'],
							'bmm_gm_unit'		=> $v['odm_gm_unit'],
							'bmm_gm_price'		=> $v['odm_price'],
							'bmm_ea'			=> $v['odm_ea'],
							'bmm_req_order'		=> $v['req_order'],
						]);

						// if ( !$v['is_extra'] ) {
						// 	$param2['purchase_opt'] = 1;
						// 	$where['itm_no'] = $_POST['po_itm_no'][$i];
						// 	$update_rst = $this->purchaseOrder_model->_updateOrderItem($param2, $where);
						// }

						$xml->startElement('ItemOut');
							$xml->writeAttribute('quantity', $v['odm_ea']);
							$xml->writeAttribute('lineNumber', $k+1);
							$xml->writeAttribute('requestedDeliveryDate', $currentTime);
							$xml->startElement('ItemID');
								$xml->writeElement('SupplierPartID', $v['odm_gm_code']);
								$xml->writeElement('SupplierPartAuxiliaryID', "");
							$xml->endElement();
							$xml->startElement('ItemDetail');
								$xml->startElement('UnitPrice');
									$xml->startElement('Money');
										$xml->writeAttribute('currency', $currency);
										$xml->text($v['odm_price'],);
									$xml->endElement();
								$xml->endElement();
								$xml->startElement('Description');
									$xml->writeAttribute('xml:lang', $xmlLang);
								$xml->endElement();
								$xml->writeElement('UnitOfMeasure', $v['odm_gm_unit']);
								$xml->startElement('Classification');
									$xml->writeAttribute('domain', $Domain);
									$xml->text('분류');
								$xml->endElement();
								$xml->writeElement('Extrinsic', "");
								$xml->writeElement('ManufacturerName', $v['odm_mk_name']);
								$xml->writeElement('ManufacturerPartID', $v['odm_mk_name']);
								$xml->writeElement('URL', '');
							$xml->endElement();
							$xml->startElement('Comments');
								$xml->writeAttribute('xml:lang', $xmlLang);
								$xml->text($v['req_order']);
							$xml->endElement();
						$xml->endElement();
					}
				$xml->endElement();
			$xml->endElement();
		$xml->endElement();
		$xml->endDocument();
		$XmlData = $xml->outputMemory(TRUE);
				header('Content-type: text/xml; charset=UTF-8');
				echo $XmlData;
				exit;
		$options = array(
			'http' => array(
				'header'  => "Content-type: text/xml\r\n",
				'method'  => 'POST',
				//'content' => http_build_query($xml)
				'content' => $XmlData
			)
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($this->B2b_url, false, $context);
		if ($result === FALSE) {
			echo "발주 실패";
			var_dump($result);
		} else {			
			if ( DB::table('shop_b2b_merck')->where('bm_id', $bm_id)->update(['bm_data' => $XmlData, 'bm_result' => $result]) )
				return response()->json(["msg"=>'success'], 200);
			else
				return response()->json(["msg"=>"Fail"], 500);
		}
    }


	public function orderRst(Request $req) {
		$data = B2bMerck::with(['b2bMerckConfirmation' => fn($q) => $q->whereNotNull('bmc_id')])
				->whereHas('b2bMerckConfirmation', fn($q) => $q->whereNotNull('bmc_id') )
				->with('b2bMerckModel')
				->paginate();
		$data->appends($req->all())->links();
		return response()->json($data);		
    }


	public function OrderConfirmation(Request $req) {
		//	머크에 발주를 넣으면 얼마뒤 주문 확인서를 xml롤 보내준다

		$uid	= "merck";
		$upw	= "jL5fqnoahmzf";
		if ( $uid == $req->reqid & $upw == $req->reqpw ) {

			ini_set("always_populate_raw_post_data", "true"); 
			// xml 데이터를 받는다
			$xml = $GLOBALS['HTTP_RAW_POST_DATA'];
			$bmm_id = DB::table('shop_b2b_merck_confirmation')->insertGetId([ 
				'bmc_orderid'	=> $xml['Request']['ConfirmationRequest']['OrderReference']['@attributes']['orderID'], 
				'bmc_data' 		=> $xml ]);
			if ( $bmm_id ) {
				echo "success";
				echo "\nbmc_id : ".$bmm_id."\n";
			} else {
				echo "DB Insert error";
			}
			return; 
		} else {
			header('HTTP/1.0 401 Unauthorized');
			exit;
		}
	}


	 /**
     * 재고 가격 확인
     */
    public function stockCheck (Request $req) {
		$data = array();
		$SupplierPartNumber	= $req->code;
		$Quantity			= $req->ea;
		$MessageId			= uniqid('iNexus_'.date("Ymd").'_');
		$Timestamp			= date("Y-m-d H:i:s");
		$Customer_code		= $this -> MerckMemberCode;

		$xml = new \XMLWriter;
		$xml->openMemory();
		$xml->startDocument('1.0', 'UTF-8');
		/******************			컨텐트 시작			********************/
		$xml->startElement('PriceAvailabilityRequest');
			$xml->startElement('Header');
				$xml->writeElement('MessageId', $MessageId);
				$xml->writeElement('Timestamp', $Timestamp);
			$xml->endElement();
			$xml->startElement('RequesterInfo');
				$xml->startElement('Customer');
					$xml->writeAttribute('code', $Customer_code);
				$xml->endElement();
				$xml->startElement('Location');
					$xml->writeAttribute('code', 'KR');
				$xml->endElement();
				$xml->writeElement('PreferredLanguage', 'en-US');
				$xml->writeElement('PreferredCountry', 'KR');
			$xml->endElement();
			$xml->startElement('ProductRequest');
				$xml->writeElement('SupplierPartNumber', $SupplierPartNumber);
				$xml->startElement('UnitOfMeasure');
					$xml->writeAttribute('unit', 'EA');
				$xml->endElement();
				$xml->writeElement('Quantity', $Quantity);
			$xml->endElement();
		$xml->endElement();
		/******************			컨텐트 끝			********************/
		$xml->endDocument();
		$XmlData = $xml->outputMemory(TRUE);
//		header('Content-type: text/xml; charset=UTF-8');
//		echo $XmlData;
//		exit;

/* $afd = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE PriceAvailabilityResponse SYSTEM "PriceAvailabilityMessage.dtd"><priceavailabilityresponse><header><messageid>iNexus_20180227_5a94fa4ea3a3e</messageid><relatedmessageid>iNexus_20180227_5a94fa4ea3a3e</relatedmessageid><timestamp>2018-02-27T00:27:31-06:00</timestamp></header><productresponse status="OK" itemnumber=""><supplierpartnumber>PDSIRNA2H</supplierpartnumber><unitprice currency="KRW">400800</unitprice><quantityavailable>0.0</quantityavailable><quantitybackordered>1.0</quantitybackordered><shipdate></shipdate><backordershipdate></backordershipdate><substitutepartnumber></substitutepartnumber><substituteunitofmeasure unit="" quantity=""></substituteunitofmeasure><otherinfo type="text" name="Availability Phrase"></otherinfo><otherinfo type="url" name="MSDS">http://webqws.sial.com/MSDS/MSDS/PleaseWaitMSDSPage.do?productNumber=PDSIRNA2H&amp;country=KR&amp;language=en-US</otherinfo><otherinfo type="text" name="Description">MISSION Pre-designed siRNA- 2 OD, HPLC</otherinfo><otherinfo type="text" name="Additional Fees or Shipping Restrictions"></otherinfo></productresponse></priceavailabilityresponse>';
$xmlData = new SimpleXMLElement($afd);
$xmlArr = json_decode( json_encode($xmlData) , 1);
echo $this -> arrayToString($xmlArr);
echo "<br /><br /><pre>_____________________";
var_dump($xmlArr);
exit; */
		$options = array(
			'http' => array(
				'header'  => "Content-type: text/xml\r\n",
				'method'  => 'POST',
				//'content' => http_build_query($xml)
				'content' => $XmlData
			)
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($this->B2b_url, false, $context);
		if ($result === FALSE) {
			echo "ERR :: ";
		} else {
			if ( DB::table('shop_b2b_merck_stock')->insertGetId([ 'bms_data' => $xml ]) )
				return response()->json(["msg"=>'success'], 200);
			else
				return response()->json(["msg"=>"Fail"], 500);
		}
/* 		$ch = curl_init(); // initialize curl handle
		curl_setopt($ch, CURLOPT_VERBOSE, 1); // set url to post to
		curl_setopt($ch, CURLOPT_URL, $url); // set url to post to
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // return into a variable
		curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/xml"));
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_TIMEOUT, 400); // times out after 4s
		curl_setopt($ch, CURLOPT_POSTFIELDS, $XmlData); // add POST fields
		curl_setopt($ch, CURLOPT_POST, 1);
		$result = curl_exec($ch); // run the whole process
		if (empty($result)) {
		   // some kind of an error happened
		   die(curl_error($ch));
		   curl_close($ch); // close cURL handler
		} else {
			$info = curl_getinfo($ch);
			curl_close($ch); // close cURL handler
			if (empty($info['http_code'])) {
				die("No HTTP code was returned");
			} else {
				if ( $info['http_code'] == 200 ) {

				}
			}
		} */
    }


	/**
     * 재고 가격 리스트
     */
    public function stockRst (Request $req) {
		$data = B2bMerckStock::paginate();
		$data->appends($req->all())->links();
		return response()->json($data);
	}	
}