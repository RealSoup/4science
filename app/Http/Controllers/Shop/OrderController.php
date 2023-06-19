<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{ Goods, GoodsModel, GoodsOption, Cart, OptionChild, Order, OrderPurchaseAt, OrderModel, OrderOption, OrderExtraInfo, OrderDlvyInfo, OrderPg,
    EstimateModel, EstimateOption};
use App\Models\{FileInfo, User};
use App\Http\Requests\SaveOrderRequest;
use App\Events\{Mileage};
use App\Traits\{InicisUtil, InicisHttpClient};
use Session;
use Exception;
use Log;
use Mail;
use DB;
use PDF;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ {OrderEstimateExport, OrderTransactionExport};
use Illuminate\Support\Arr;
use Carbon\Carbon;
use App\Mail\OrderEmail;

class OrderController extends Controller {
    use InicisUtil;    //  trait
    use InicisHttpClient;    //  trait
    protected $c_nm_guest_id;
	protected $order;
	protected $signKey;
	protected $apiKey;
    protected $mid;
    protected $goods;
    protected $orderExtraInfo;
    public function __construct(Order $od, OrderExtraInfo $oex, Goods $gd) {
        // $this->signKey       = 'V2NwNzNyODZjK1FkUWJmeVZrNWM4QT09';
        // $this->signKey       = "SU5JTElURV9UUklQTEVERVNfS0VZU1RS";
        // $this->apiKey        = '';
        // $this->apiKey        = "ItEQKi3rY7uvDS8l";
        // $this->mid           = "4science00";
        // $this->mid           = "INIpayTest";
        $this->signKey = env('INICIS_SIGNKEY');
        $this->apiKey  = env('INICIS_APIKEY');
        $this->mid     = env('INICIS_MID');
        $this->c_nm_guest_id = config('const.cookie_nm.guest_id');
        $this->order         = $od;
        $this->goods = $gd;
        $this->orderExtraInfo = $oex;
    }

    public function settle(Request $req){
        $type = $req->filled('type') ? $req->type : 'buy_inst';
        $params = $this->goods->getGoodsDataCollection($req, $type);
        $params['goods_def'] = $this->goods;
        $params['sale_env'] = $this->saleEnv();
        $params['md_cnt'] = 0;
        $params['od_name'] = '';
        foreach ($params['lists'] as $pa_group) {    //  주문 갯수
            $go_required_chk = true;
            foreach ($pa_group as $item){
                // 판매 가능 여부 재확인
                if(isset($item['gd_enable']) && $item['gd_enable'] == 'N')    abort(500, '판매중지 상품이 있습니다.\\n다시 확인해 주시기 바랍니다.');
                if($req->type === 'buy_inst' || $req->type === 'buy_cart') {
                    if(isset($item['gm_enable']) && $item['gm_enable'] == 'N')    abort(500, '재고 부족 상품이 있습니다.\\n다시 확인해 주시기 바랍니다.');
                    //  견적가(0원) 구매 금지
                    if($item['price']<1)   abort(500, '견적가 상품이 있습니다. 견적 요청하여 가격을 견적 받으세요.');
                }

                //  필수옵션 누락 체크
                foreach(GoodsOption::Gd_id($item['gd_id'])->get() as $go) {
                    if($go->go_required == 'Y') {
                        $go_required_chk = false;
                        foreach ($pa_group as $v){
                            if ($v['type']=='option' && $v['go_id']==$go->go_id) {
                                $go_required_chk = true;
                                break 2;
                            }
                        }
                    }
                }
                if(!$go_required_chk) abort(500, '필수 옵션과 같이 구매하세요');
                //  필수옵션 누락 체크

                if ($params['od_name'] == '')
                    $params['od_name'] = $item['gd_name'] ? $item['gd_name'] : $item['gm_name'];
                if ( $item['type'] == 'model' )
                    $params['md_cnt']++;
            }
        }
        if($params['price']['total']<30000)   abort(500, '3만원 미만의 주문은 하실 수 없습니다.');
        if ($params['md_cnt'] > 1)
            $params['od_name'] .= '외 ['.($params['md_cnt']-1).']';

        $params['config'] = $this->order->getOrderConfig();        
        $params['config']['email_domain'] = auth()->user()::$option['email_domain'];
        $params['addr'] = auth()->check() ? auth()->user()->userAddr : [];
        
        return response()->json($params);
    }

    public function pay(Request $req) {
        // try {
        //     DB::beginTransaction();
            
            $params['inicis']['returnUrl'] = config('app.url')."shop/order/payReturn";
            $params['inicis']['returnUrlMobaile'] = config('app.url')."shop/order/payReturnMobile";
            $params['inicis']['closeUrl'] = config('app.url')."shop/order/pgClose";            
           
            /************************** 이니시스 값 설정 Start **************************/
            /**/$params['inicis']['mid'] = $this->mid;  // 가맹점 ID(가맹점 수정후 고정)
            /**/$params['inicis']['timestamp'] = $this->getTimestamp();   // util에 의해서 자동생성
            /**/$params['inicis']['od_no'] = $this->getNew_od_no();
            /**/$params['inicis']['mKey'] = $this->makeHash($this->signKey, "sha256");
            /**/$signParams = array(    "oid"       => $params['inicis']['od_no'],
            /**/                        "price"     => $req->price['total'],
            /**/                        "timestamp" => $params['inicis']['timestamp'] );
            /**/$params['inicis']['sign'] = $this->makeSignature($signParams, "sha256");
            /************************** 이니시스 값 설정 End **************************/
            
            $od_id = $this->order->insertGetId([
                'od_no'            => $params['inicis']['od_no'],
                'od_name'          => $req->filled('od_name')          ? $req->od_name          : '',
                'od_type'          => $req->filled('od_type')          ? $req->od_type          : 'buy_inst',
                'od_er_id'         => $req->filled('od_er_id')         ? $req->od_er_id         : NULL,
                'od_step'          => $req->od_pay_method == 'C'       ? '0'                    : '10',
                'od_gd_price'      => $req->filled('price')            ? $req->price['goods']           : 0,
                'od_surtax'        => $req->filled('price')            ? $req->price['surtax']          : 0,
                'od_dlvy_price'    => $req->filled('price')            ? $req->price['dlvy_add_vat']    : 0,
                'od_air_price'     => $req->filled('price')            ? $req->price['air_add_vat']     : 0,
                'od_all_price'     => $req->filled('price')            ? $req->price['total']           : 0,
                'od_orderer'       => auth()->check()                  ? auth()->user()->name   : '',
                'od_orderer_hp'    => auth()->check()                  ? auth()->user()->hp     : '',
                'od_orderer_email' => auth()->check()                  ? auth()->user()->email  : '',
                'od_company'       => auth()->check()                  ? auth()->user()->company : '',
                'od_part'          => auth()->check()                  ? auth()->user()->part   : '',
                'od_receiver'      => $req->filled('od_receiver')      ? $req->od_receiver      : '',
                'od_receiver_hp'   => $req->filled('od_receiver_hp')   ? $req->od_receiver_hp   : '',
        	   	'od_zip'           => $req->filled('od_zip')           ? $req->od_zip           : '',
        	   	'od_addr1'         => $req->filled('od_addr1')         ? $req->od_addr1         : '',
                'od_addr2'         => $req->filled('od_addr2')         ? $req->od_addr2         : '',
        	   	'od_memo'          => $req->filled('od_memo')          ? $req->od_memo          : '',
                'od_pay_method'    => $req->filled('od_pay_method')    ? $req->od_pay_method    : 'C',
                'od_sale_env'      => $req->filled('sale_env')         ? $req->sale_env         : 'P',
                'ip'               => $req->ip(),
                'created_id'       => (auth()->check() ? auth()->user()->id : 0)
            ], 'od_id');
            $params['od_id'] = $od_id;
            
            foreach ($req->lists as $pa_id => $pa) {
                $insert_tmp = array();
                foreach ($pa as $k => $item) {
                    // $gd_name = DB::table('shop_goods')->where('gd_id', $item['gd_id'])->first()->gd_name;
                    if ( $k == 0 ) {
                        $odpa_id = OrderPurchaseAt::insertGetId([   'odpa_od_id'   => $od_id,
                                                                    'odpa_pa_id'   => $pa_id,
                                                                    'odpa_pa_type' => $item['pa_type'],
                                                                    'odpa_pa_name' => isset($item['pa_name']) ? $item['pa_name'] : '',
                                                                    'odpa_dlvy_p'  => isset($item['pa_dlvy_p']) ? $item['pa_dlvy_p'] : 0 ], 'odpa_id');
                    }

                    if ($item['type'] == 'model') {
                        $insert_tmp[] = array(
                            'odm_od_id'    => $od_id,
                            'odm_odpa_id'  => $odpa_id,
                            'odm_type'     => 'MODEL',
                            'odm_gd_id'    => $item['gd_id'],
                            'odm_gm_id'    => $item['gm_id'],
                            'odm_gm_catno' => $item['gm_catno'],
                            'odm_gd_name'  => $item['gd_name'],
                            'odm_gm_name'  => $item['gm_name'],
                            'odm_gm_code'  => $item['gm_code'],
                            'odm_gm_spec'  => $item['gm_spec'],
                            'odm_gm_unit'  => $item['gm_unit'],
                            'odm_mk_name'  => $item['mk_name'],
                            'odm_ea'       => $item['ea'],
                            'odm_price'    => (auth()->user()->is_dealer&&$req->od_pay_method=='B') ? $item['price_deal'] : $item['price'],
                        );
                        Cart::Target(auth()->user()->id, $item['gd_id'], $item['gm_id'], 'MODEL')->delete();
                    } else if ($item['type'] == 'option') {
                        $insert_tmp[] = array(
                            'odm_od_id'    => $od_id,
                            'odm_odpa_id'  => $odpa_id,
                            'odm_type'     => 'OPTION',
                            'odm_gd_id'    => $item['gd_id'],
                            'odm_gm_id'    => $item['goc_id'],
                            'odm_gm_catno' => '',
                            'odm_gd_name'  => '',
                            'odm_gm_name'  => $item['go_name'],
                            'odm_gm_code'  => '',
                            'odm_gm_spec'  => $item['goc_name'],
                            'odm_gm_unit'  => '',
                            'odm_mk_name'  => '',
                            'odm_ea'       => $item['ea'],
                            'odm_price'    => $item['price'],
                        );
                        Cart::Target(auth()->user()->id, $item['gd_id'], $item['goc_id'], 'OPTION')->delete();
                    }
                }                    
                DB::table('shop_order_model')->insert($insert_tmp);
            }
            

            //  지출 증빙 & 요청 첨부서류 등록
            $this->orderExtraInfo->oex_od_id = $od_id;
            if ($req->od_pay_method == 'B'){
                $this->orderExtraInfo->oex_bank = array_key_exists('oex_bank', $req->extra) ? $req->extra['oex_bank'] : "";
                $this->orderExtraInfo->oex_depositor = array_key_exists('oex_depositor', $req->extra) ? $req->extra['oex_depositor'] : "";
            }
            if ($req->od_pay_method == 'B' || $req->od_pay_method == 'P' || $req->od_pay_method == 'R') //  계좌이체, PSYS, 원격결제는 결제 예정일 등록
                $this->orderExtraInfo->oex_pay_plan = array_key_exists('oex_pay_plan', $req->extra) ? $req->extra['oex_pay_plan'] : "";
            
            $this->orderExtraInfo->oex_type = array_key_exists('oex_type', $req->extra) ? $req->extra['oex_type'] : "";
            if ($req->extra['oex_type'] != 'NO') {    //  지출증빙 방법 ( IV, IN, HP, CN, BN, NO )
                switch ($req->extra['oex_type']) {
                    case 'IV': 
                        if (!$req->extra['oex_hasBizLicense']) {
                            $this->orderExtraInfo->oex_biz_name    =  array_key_exists('oex_biz_name', $req->extra)    ? $req->extra['oex_biz_name'] : '';
                            $this->orderExtraInfo->oex_biz_num     =  array_key_exists('oex_biz_num', $req->extra)     ? str_replace('-', '', $req->extra['oex_biz_num']) : '';
                            $this->orderExtraInfo->oex_biz_type    =  array_key_exists('oex_biz_type', $req->extra)    ? $req->extra['oex_biz_type'] : '';
                            $this->orderExtraInfo->oex_biz_item    =  array_key_exists('oex_biz_item', $req->extra)    ? $req->extra['oex_biz_item'] : '';
                            $this->orderExtraInfo->oex_ceo         =  array_key_exists('oex_ceo', $req->extra)         ? $req->extra['oex_ceo'] : '';
                            $this->orderExtraInfo->oex_addr        =  array_key_exists('oex_addr', $req->extra)        ? $req->extra['oex_addr'] : '';
                            $this->orderExtraInfo->oex_requirement =  array_key_exists('oex_requirement', $req->extra) ? $req->extra['oex_requirement'] : '';
                        }
                        $this->orderExtraInfo->oex_mng   = array_key_exists('oex_mng', $req->extra)     ? $req->extra['oex_mng'] : '';
                        $this->orderExtraInfo->oex_email = array_key_exists('oex_email', $req->extra)   ? $req->extra['oex_email'] : '';
                        $this->orderExtraInfo->oex_num   = array_key_exists('oex_num_tel', $req->extra) ? $req->extra['oex_num_tel'] : '';
                    break;
                    case 'IN': 
                    case 'HP': 
                    case 'CN': 
                    case 'BN': $this->orderExtraInfo->oex_num = array_key_exists('oex_num', $req->extra) ? $req->extra['oex_num'] : ''; break;
                }
            }

            if ($req->od_pay_method == 'R') {
                $this->orderExtraInfo->oex_mng   = array_key_exists('oex_mng', $req->extra)     ? $req->extra['oex_mng'] : '';
                $this->orderExtraInfo->oex_num   = array_key_exists('oex_num_tel', $req->extra) ? $req->extra['oex_num_tel'] : '';
            }  
            $this->orderExtraInfo->oex_req_est  = array_key_exists('oex_req_est', $req->extra)  ? $req->extra['oex_req_est']  : 'N';
            $this->orderExtraInfo->oex_req_tran = array_key_exists('oex_req_tran', $req->extra) ? $req->extra['oex_req_tran'] : 'N';
            $this->orderExtraInfo->oex_req_biz  = array_key_exists('oex_req_biz', $req->extra)  ? $req->extra['oex_req_biz']  : 'N';
            $this->orderExtraInfo->oex_req_bank = array_key_exists('oex_req_bank', $req->extra) ? $req->extra['oex_req_bank'] : 'N';
            $this->orderExtraInfo->oex_memo     = array_key_exists('oex_memo', $req->extra)     ? $req->extra['oex_memo']     : '';
            $this->orderExtraInfo->save();

            $order_goodsInfo = $this->goods->getGoodsDataCollection($req, $req->od_type, 'buy_chk');
            
            if ( (int)$req->price['total'] != (int)$order_goodsInfo['price']['total'] )
                throw new Exception("최종가격이 다릅니다.");
            // DB::commit();
            return response()->json($params, 200);
        // } catch (Exception $e) {
        //     Log::debug("구매 트랜젝션 에러");
        //     Log::channel('4s_log')->alert($e->getMessage());
        //     DB::rollBack();
        
        //     return response()->json("주문 에러", 400);
        // }
    }
    
    public function saleEnv () {
        $sale_env = "P";
        $mobile_agent = '/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/';
        if(preg_match($mobile_agent, $_SERVER['HTTP_USER_AGENT'])) $sale_env = "M"; // preg_match() 함수를 이용해 모바일 기기로 접속하였는지 확인
        return $sale_env;
    }    

    public function getNew_od_no() {
        $today_cnt = DB::table('shop_order')->whereRaw('created_at > CURDATE()')->count();
        return date("ymd").substr('000'.$today_cnt, -4);
    }

    public function pgClose () { echo '<script>parent.INIStdPay.viewOff();</script>'; }
    
    public function index(Request $req) {
        $data = array();
        $od = $this->order
                ->when($req->startDate, fn ($q, $v) => $q->StartDate($v))
                ->when($req->endDate,   fn ($q, $v) => $q->EndDate($v))
                ->when($req->od_type, function ($q, $v) {
                    if ($v == 'no_buy_temp') return $q->where('od_type', '!=', 'buy_temp');
                    else                     return $q->where('od_type', $v);
                })
                ->when($req->od_step, function ($q, $v) {
                    if ($v == 'early')  return $q->whereIn('od_step', ['10', '11', '12', '13', '14', '15']);
                    else                return $q->OdStep($v);
                });
        
        $od = $od->SchWriter(auth()->user()->id)->latest();

        $od->when(request('type', 'with_gm'), fn ($q) => $q->with('orderModel'));

        if ($req->filled('limit'))
            $data['order'] = $od->limit($req->limit)->get();
        else {
			$data['order'] = $od->paginate();
			$data['order']->appends($req->all())->links();
		}

        $data['order_config'] = $this->order->getOrderConfig();
        return response()->json($data, 200);
    }

    public function show($od_id) {
        $data = $this->order->with('orderPurchaseAt')->with('orderExtraInfo')->with('orderPg')->find($od_id);

        foreach ($data->orderPurchaseAt as $opa) {
			foreach ($opa->orderModel as $odm)
				$odm->orderDlvyInfo;
		}
        
        $data['order_config'] = $this->order->getOrderConfig();
        return response()->json($data, 200);
    }

    public function update(Request $req, $id) {
		if ($req->filled('type')) {
			if ($req->type == 'receipt_confirm')
                $rst = DB::table('shop_order_dlvy_info')->where('oddi_id', $req->order_dlvy_info['oddi_id'])->update(['oddi_receive_date'=> \Carbon\Carbon::now()]);
		}
		if ($rst) {
            if ( auth()->user()->level < 5 || auth()->user()->level > 20 ) {
                $m = new \App\Models\UserMileage;
                event(new Mileage("insert", auth()->user()->id, 'shop_order_model', $req->odm_id, 'SV', '수취 확인', $m->mileage_calculation($req->odm_price, $req->odm_ea, auth()->user()->level)));
            }
            return response()->json(["msg"=>"success"], 200);
        } else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function bought(Request $req) {
        $rst = array();
        $order = $this->order->with('orderModel')->SchWriter(auth()->user()->id)->get();
        foreach ($order as $od)
            foreach ($od->orderModel as $odm)
                $rst[] = $odm;
        return $rst;
    }

    public function cnt_od_step(Request $req) {
        $od = $this->order->SchWriter(auth()->user()->id)->StartDate(date('Y-m-d', strtotime(date('Y-m-d')." -1 month")))->get();
        $rst = $od->countBy(function ($item) { return $item['od_step']; });

        return response()->json($rst, 200);
    }

    public function payReturn(Request $req){
        /*
        크롬의 쿠키 정책의 의해
        결제시 외부 도메인을 타면 쿠키가 삭제되어
        로그인이 풀린다
        그래서 아래의 설정 추가
        /config/session.php
            'same_site' => 'lax', <<- 주석

        \app\Http\Middleware\VerifyCsrfToken.php
            protected $except = [
                'shop/order/payReturn',
                'shop/order/payReturnMobaile',
            ];
        */
        $params['msg'] = '';
        try {
            if (strcmp("0000", $req->resultCode) == 0) { // 인증이 성공일 경우만
                $timestamp 		= $this->getTimestamp();
                $mKey 			= hash("sha256", $this->signKey);
                $signParam["authToken"] 	= $req->authToken;
                $signParam["timestamp"] 	= $timestamp;
                $signature = $this->makeSignature($signParam);

                $authMap["mid"] 			= $req->mid;   		// 필수
                $authMap["authToken"] 		= $req->authToken;  // 필수
                $authMap["signature"] 		= $signature; 	    // 필수
                $authMap["timestamp"] 		= $timestamp; 	    // 필수
                $authMap["charset"] 		= "UTF-8";
                $authMap["format"] 			= "JSON";
                try { // 4.API 통신 시작
                    if ($this->processHTTP($req->authUrl, $authMap)) {
                        $resultMap = json_decode($this->body, true);
                    } else {
                        echo "Http Connect Error\n".$this->errormsg;
                        throw new Exception("Http Connect Error");
                    }
                    $secureMap["mid"]		= $req->mid;
                    $secureMap["tstamp"]	= $timestamp;
                    $secureMap["MOID"]		= $resultMap["MOID"];
                    $secureMap["TotPrice"]	= $resultMap["TotPrice"];

                    // signature 데이터 생성
                    $secureSignature = $this->makeSignatureAuth($secureMap);

                    $pgdb_rst = OrderPg::insert([
                        'pg_od_id'    => $req->merchantData,
                        'pg_app_no'   => $resultMap['applNum'],
                        'pg_tid'      => $resultMap['tid'],
                        'pg_pay_type' => $resultMap['payMethod'],
                        'pg_price'    => $resultMap['CARD_ApplPrice'],
                        'pg_card_com' => OrderPg::$option['cardComNm'][$resultMap['CARD_Code']],
                        'pg_buyer_nm' => $resultMap['buyerName'],
                        'pg_code'     => $resultMap['resultCode'],
                        'pg_msg'      => $resultMap['resultMsg']]);

                    if ((strcmp("0000", $resultMap["resultCode"]) == 0) && (strcmp($secureSignature, $resultMap["authSignature"]) == 0) ){ // 결제 성공시
                        DB::table('shop_order')->where('od_id', $req->merchantData)->update(['od_step'=> '20']);
                        return redirect("/shop/order/done/{$req->merchantData}");
                    } else {
                        $params['msg'] = "거래 실패<br />";
                        $params['msg'] .= "결과 코드:". @(in_array($resultMap["resultCode"] , $resultMap) ? $resultMap["resultCode"] : "null" );
                        //결제보안키가 다른 경우.
                        if (isset($resultMap["authSignature"]) && strcmp($secureSignature, $resultMap["authSignature"]) != 0) { //망취소
                            if(strcmp("0000", $resultMap["resultCode"]) == 0) throw new Exception("데이터 위변조 체크 실패");
                        } else {
                            $params['msg'] .= @(in_array($resultMap["resultMsg"] , $resultMap) ? $resultMap["resultMsg"] : "null" );
                        }
                        return redirect("/shop/order/payCardFail?msg=".$params['msg']);
                    }
                } catch (Exception $e) { // 실패시 처리
                    $params['msg'] .= $e->getMessage().'(오류코드:'.$e->getCode().')';
                    // 망취소 API
                    $netcancelResultString = ""; // 망취소 요청 API url(고정, 임의 세팅 금지)
                    if ($this->processHTTP($req->netCancelUrl, $authMap)) {
                        $netcancelResultString = $this->body;
                    } else {
                        $params['msg'] .= "Http Connect Error\n".$this->errormsg;
                        throw new Exception("Http Connect Error");
                    }
                    $params['msg'] .= "<br/>## 망취소 API 결과 ##<br/><p>". $netcancelResultString . "</p>";
                    return redirect("/shop/order/payCardFail?msg=".$params['msg']);
                }
            } else { // 인증 실패시
                $params['msg'] .= "<br/>####인증실패####<pre>" . var_dump($_REQUEST) . "</pre>";
                return redirect("/shop/order/payCardFail?msg=".$params['msg']);
            }
        } catch (Exception $e) {
            $params['msg'] .= $e->getMessage().'(오류코드:'.$e->getCode().')';
            return redirect("/shop/order/payCardFail?msg=".$params['msg']);
        }
    }
    public function payRequestMobile(Request $req) {
        $params=1;
        return view("payRequestMobile", $params);
    }
    public function payReturnMobile(Request $req){
        if ($req->P_STATUS != "00") {
            $msg = "오류코드:".$req->P_STATUS."\\n".$req->P_RMESG1;
            return alertRedirect($msg);
        } else {
            $result = array();
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $req->P_REQ_URL);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // 이 셋팅은 1로 고정하는 것이 정신건강에 좋음
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); //true로 설정시 일부 https 사이트는 안 열림
            curl_setopt($ch, CURLOPT_SSLVERSION,3); //ssl 셋팅
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, array('P_MID' => $this->mid, 'P_TID' => $req->P_TID));
            // $inipay = iconv('euc-kr', 'utf-8', curl_exec($ch));
            $inipay = curl_exec($ch);
            curl_close($ch);
            parse_str($inipay, $result);

            if ($result['P_STATUS'] == '00'){
                $pgdb_rst = OrderPg::insert([
                    'pg_od_id'    => $result['P_NOTI'],
                    'pg_app_no'   => $result['P_AUTH_NO'],
                    'pg_tid'      => $result['P_TID'],
                    'pg_pay_type' => $result['P_TYPE'],
                    'pg_price'    => $result['P_AMT'],
                    'pg_card_com' => OrderPg::$option['cardComNm'][$result['P_FN_CD1']],
                    'pg_buyer_nm' => $result['P_UNAME'],
                    'pg_code'     => $result['P_STATUS'],
                    'pg_msg'      => $result['P_RMESG1']]);       
                DB::table('shop_order')->where('od_id', $result['P_NOTI'])->update(['od_step'=> '20']);
                return redirect("/shop/order/done/{$result['P_NOTI']}");               
            } else {
                return redirect("/shop/order/payCardFail?msg=카드결제에 실패 했습니다.\\n다시 해주시기 바랍니다.");
            }
        }
    }
    
    public function done($od_id){
        $data = $this->order->with('orderExtraInfo')->find($od_id);
        // dd($od_id);
        $bank = '';
        $account = '';
        if ($data->od_pay_method == "B" ) {
            if ($data->orderExtraInfo->bank_type == 'W') {
                $bank = cache('bank')['name01'];
                $account = cache('bank')['num01'];
            } else {
                $bank = cache('bank')['name02'];
                $account = cache('bank')['num02'];
            }
            if ( auth()->user()->receive_sms == 'Y' )
                sendSms($data->od_orderer_hp, $data->od_orderer, $data->od_no, ['bank'=>$bank, 'account'=>$account, 'holder'=>cache('bank')['owner'], 'price'=>number_format($data->od_all_price)]);
        }
        
        $params['subject'] = "주문완료";
        $params['od_no'] = $data->od_no;
        $params['od_orderer'] = $data->od_orderer;
        $params['od_orderer_hp'] = $data->od_orderer_hp;
        $params['bank'] = $bank;
        $params['account'] = $account;
        $params['holder'] = cache('bank')['owner'];
        $params['price'] = number_format($data->od_all_price);
        $params['addr'] = "[$data->od_zip] $data->od_addr1 $data->od_addr2 $data->od_memo";
        if ( auth()->user()->receive_mail == 'Y' ) {
            try { Mail::to($data->od_orderer_email)->queue(new OrderEmail(config('mail.mailers.smtp.username'), $params['subject'], $params));
            } catch(\Swift_TransportException $e){
                // if($e->getMessage()) dd($e->getMessage());
            }
        }
        return response()->json($data, 200);
    }

   
    public function downEstimateExcel(Request $req, int $od_id) {
        $data = $this->order->with('OrderPurchaseAt')->with('mng')->find($od_id);
		foreach ($data->orderPurchaseAt as $opa)
            $opa->orderModel;
		return Excel::download(new OrderEstimateExport($data->toArray()), 'order.xlsx');
	}

    public function downTransactionExcel(Request $req, int $od_id) {
        $data = $this->order->with('OrderPurchaseAt')->with('mng')->find($od_id);
        if ($data->mng)
			$data->mng->userMng;
		foreach ($data->orderPurchaseAt as $opa)
            $opa->orderModel;
		return Excel::download(new OrderTransactionExport($data->toArray()), 'order.xlsx');
	}

    public function printEstimate(Request $req, int $od_id) {
        $data = $this->order->with('OrderPurchaseAt')->with('mng')->find($od_id);
		foreach ($data->orderPurchaseAt as $opa)
            $opa->orderModel;		
        $data->type = 'print';        
        return view('admin.order.pdf.order_estimate', $data);
	}

}