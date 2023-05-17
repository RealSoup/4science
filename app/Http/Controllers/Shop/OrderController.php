<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{ Goods, GoodsModel, Cart, CartModel, CartOption, OptionChild, Order, OrderPurchaseAt, OrderModel, OrderOption, OrderExtraInfo, OrderDlvyInfo, OrderPg,
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
        $type = $req->filled('type') ? $req->type : 'buy';
        $params = $this->goods->getGoodsDataCollection($req, $type);
        $params['sale_env'] = $this->saleEnv();
        $params['md_cnt'] = 0;
        $params['od_name'] = '';
        foreach ($params['lists'] as $pa_group) {    //  주문 갯수
            foreach ($pa_group as $item){
                // 판매 가능 여부 재확인
                if(isset($item['gd_enable']) && $item['gd_enable'] == 'N')    abort(500, '판매중지 상품이 있습니다.\\n다시 확인해 주시기 바랍니다.');
                if($req->type === 'buy_inst' || $req->type === 'buy_cart') {
                    if(isset($item['gm_enable']) && $item['gm_enable'] == 'N')    abort(500, '재고 부족 상품이 있습니다.\\n다시 확인해 주시기 바랍니다.');
                    //  견적가(0원) 구매 금지
                    // if($item['price']<1)   abort(500, '견적가 상품이 있습니다. 견적 요청하여 가격을 견적 받으시겠습니까?');
                    if($item['price']<1)   abort(500, '견적가 상품이 있습니다. 견적 요청하여 가격을 견적 받으세요.');
                }

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
                'od_orderer'       => $req->filled('od_orderer')       ? $req->od_orderer       : '',
                'od_orderer_hp'    => $req->filled('od_orderer_hp')    ? $req->od_orderer_hp    : '',
                'od_orderer_email' => $req->filled('od_orderer_email') ? $req->od_orderer_email : '',
                'od_department'    => $req->filled('od_department')    ? $req->od_department   : '',
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
            // if ($req->od_type == 'buy_estimate') {
            //     //  견적 주문일때 주문 정보 저장
            //     dd($req->all());
            //     foreach (collect($req->goods)->groupBy('gd_id') as $gd_id => $gd) {
            //         $odg_id = 0;
            //         foreach ($gd as $seq => $v) {
            //             if (array_key_exists('em_id', $v)) {
            //                 $em = EstimateModel::find($v['em_id']);
            //                 if ($seq == 0) {
            //                     $odg_id = OrderGoods::insertGetId([
            //                         'odg_od_id'     => $od_id,
            //                         'odg_gd_id'     => $gd_id,
            //                         'odg_gd_name'   => $em->em_name
            //                     ], 'odg_id');
            //                 }
            //                 OrderModel::insert([
            //                     'odm_od_id'     => $od_id,
            //                     'odm_odg_id'    => $odg_id,
            //                     'odm_gm_id'     => $em->em_gm_id,
            //                     'odm_gm_catno'  => $em->em_catno,
            //                     'odm_gm_name'   => $em->em_name,
            //                     'odm_gm_code'   => $em->em_code,
            //                     'odm_gm_spec'   => $em->em_spec,
            //                     'odm_gm_unit'   => $em->em_unit,
            //                     'odm_ea'        => $em->em_ea,
            //                     'odm_price'     => $em->em_price
            //                 ]);
                            
            //             } else if (array_key_exists('eo_id', $v)) {
            //                 $eo = EstimateOption::find($v['eo_id']);
            //                 OrderOption::insert([
            //                     'odo_od_id'     => $od_id,
            //                     'odo_odg_id'    => $odg_id,
            //                     'odo_opc_id'    => $eo->eo_opc_id,
            //                     'odo_opc_name'  => $eo->eo_tit." ".$eo->eo_name,
            //                     'odo_ea'        => $eo->eo_ea,
            //                     'odo_price'     => $eo->eo_price
            //                 ]);
            //             }
                        
            //         }
            //     }
            // } else {
                //  바로주문, 장바구니 주문 정보 저장
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
                        if(auth()->check() && $req->od_type == 'buy_cart')
                            $ct = Cart::where([['ct_gd_id', $item['gd_id']], ['created_id', auth()->user()->id]])->first();

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
                                'odm_price'    => $item['price'],
                            );

                            //  장바구니 주문일 경우 주문 성공시 바구니 비우기
                            if(isset($ct)) {
                                $ct->delete();
                                CartModel::where([['cm_ct_id', $ct->ct_id], ['cm_gm_id', $item['gm_id']]])->delete();
                            }
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
                            
                            if(isset($ct))
                                CartOption::where([['co_ct_id', $ct->ct_id], ['co_goc_id', $item['goc_id']]])->delete();                        
                        }
                    }                    
                    DB::table('shop_order_model')->insert($insert_tmp);
                }
            // }

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

            $order_goodsInfo = $this->goods->getGoodsDataCollection($req, $req->od_type);
          
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
            $m = new \App\Models\UserMileage;
            event(new Mileage("insert", auth()->user()->id, 'shop_order_model', $req->odm_id, 'SV', '수취 확인', $m->mileage_calculation($req->odm_price, $req->odm_ea, auth()->user()->level)));
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





















































//===============================================================
    

    


    public function payer(SaveOrderRequest $req) {
        try {
            DB::beginTransaction();
            //DB::enableQueryLog();
            $todayOrderCnt = $this->order->Today()->count();
            //dump(DB::getQueryLog());

            

            if(auth()->check()){    $mb_yn = 'Y'; $created_id = auth()->user()->id;
            } else {                $mb_yn = 'N'; $created_id = $req->cookie($this->c_nm_guest_id); }

            $od_pay_method = $req->filled('od_pay_method') ? $req->od_pay_method : 'C';
            if ($od_pay_method == 'B')
                $od_pay_method = $req->filled('bank_type') ? $req->bank_type : 'K';

            $od_id = $this->order->insertGetId([
                'od_no'                  => $req->filled('od_no')                  ? $req->od_no                  : 0,
                'od_type'                => $req->filled('od_type')                ? $req->od_type                : 'inst',
                'od_mb_yn'               => $mb_yn,
                'od_step'                => $req->filled('od_step')                ? $req->od_step                : '10',
                'od_gd_price'            => $req->filled('od_gd_price')            ? $req->od_gd_price            : 0,
                'od_dlvy_price'          => $req->filled('od_dlvy_price')          ? $req->od_dlvy_price          : 0,
                'od_all_price'           => $req->filled('od_all_price')           ? $req->od_all_price           : 0,
                'od_orderer'             => $req->filled('od_orderer')             ? $req->od_orderer             : '',
                'od_orderer_hp'          => $req->filled('od_orderer_hp')          ? $req->od_orderer_hp          : '',
                'od_receiver'            => $req->filled('od_receiver')            ? $req->od_receiver            : '',
                'od_receiver_hp'         => $req->filled('od_receiver_hp')         ? $req->od_receiver_hp         : '',
        	   	'od_zip'                 => $req->filled('od_zip')                 ? $req->od_zip                 : '',
        	   	'od_addr1'               => $req->filled('od_addr1')               ? $req->od_addr1               : '',
                'od_addr2'               => $req->filled('od_addr2')               ? $req->od_addr2               : '',
        	   	'od_memo'                => $req->filled('od_memo')                ? $req->od_memo                : '',
                'od_pay_receipt'         => $req->filled('od_pay_receipt')         ? $req->od_pay_receipt         : '',
                'od_dlvy_method'         => $req->filled('od_dlvy_method')         ? $req->od_dlvy_method         : '',
                'biz_company_nm'         => $req->filled('biz_company_nm')         ? $req->biz_company_nm         : '',
                'biz_reg_no'             => $req->filled('biz_reg_no')             ? $req->biz_reg_no             : '',
                'biz_cond'               => $req->filled('biz_cond')               ? $req->biz_cond               : '',
                'biz_type'               => $req->filled('biz_type')               ? $req->biz_type               : '',
                'biz_ceo_nm'             => $req->filled('biz_ceo_nm')             ? $req->biz_ceo_nm             : '',
                'biz_address_dtl'        => $req->filled('biz_address_dtl')        ? $req->biz_address_dtl        : '',
                'biz_request_memo'       => $req->filled('biz_request_memo')       ? $req->biz_request_memo       : '',
                'biz_contact_man'        => $req->filled('biz_contact_man')        ? $req->biz_contact_man        : '',
                'biz_contact_email_addr' => $req->filled('biz_contact_email_addr') ? $req->biz_contact_email_addr : '',
                'biz_contact_hp'         => $req->filled('biz_contact_hp')         ? $req->biz_contact_hp         : '',
                'od_pay_receipt_method'  => $req->filled('od_pay_receipt_method')  ? $req->od_pay_receipt_method  : '',
                'cashReceipt_01'         => $req->filled('cashReceipt_01')         ? $req->cashReceipt_01         : '',
                'cashReceipt_02'         => $req->filled('cashReceipt_02')         ? $req->cashReceipt_02         : '',
                'od_sale_env'            => $sale_env,
                'od_pay_method'          => $od_pay_method,
                'od_depositor'           => $req->filled('od_depositor')           ? $req->od_depositor           : '',
                'ip'                     => $req->ip(),
                'created_id'             => $created_id], 'od_id');

            foreach ($req->gm_id as $gd_id => $md_arr) {
                $odg_id = OrderGoods::insertGetId([
                    'odg_od_id'     => $od_id,
                    'odg_gd_id'     => $gd_id,
                    'odg_gd_name'   => Goods::find($gd_id)->gd_name], 'od_id');

                if(auth()->check())  $ct = Cart::where([['ct_gd_id', $gd_id], ['created_id', $created_id], ['ct_mb_yn', 'Y']])->get();
                else                 $ct = Cart::where([['ct_gd_id', $gd_id], ['created_id', $created_id], ['ct_mb_yn', 'N']])->get();

                foreach ($md_arr as $gm_key => $gm_id) {
                    $gm = GoodsModel::find($gm_id);
                    OrderModel::insert([
                        'odm_od_id'     => $od_id,
                        'odm_odg_id'    => $odg_id,
                        'odm_gm_id'     => $gm_id,
                        'odm_gm_catno'  => $gm->gm_catno01.'-'.$gm->gm_catno02.'-'.$gm->gm_catno03,
                        'odm_gm_name'   => $gm->gm_name,
                        'odm_gm_code'   => $gm->gm_code,
                        'odm_ea'        => $req->gm_ea[$gm_id],
                        'odm_price'     => rrp($gm->gm_price, 0)
                    ]);

                    if(sizeof($ct) != 0) {
                        if(auth()->check()) {
                            $cm = CartModel::where([['cm_ct_id', $ct[0]->ct_id], ['cm_ea', $req->gm_ea[$gm_id]]])->get();
                            if(sizeof($cm) != 0) {
                                $cm[0]->delete();
                                $ct[0]->delete();
                            }
                        } else {
                            $cm = CartModel::where([['cm_ct_id', $ct[0]->ct_id], ['cm_ea', $req->gm_ea[$gm_id]]])->get();
                            if(sizeof($cm) != 0)  {
                                $cm[0]->delete();
                                $ct[0]->delete();
                            }
                        }
                    }
                }

                if (isset($req->opc_id[$gd_id])) {
                    foreach ($req->opc_id[$gd_id] as $opc_id) {
                        $opc = OptionChild::find($opc_id);
                        OrderOption::insert([
                            'odo_od_id'     => $od_id,
                            'odo_odg_id'    => $odg_id,
                            'odo_opc_id'    => $opc_id,
                            'odo_opc_name'  => $opc->opc_name,
                            'odo_ea'        => $req->opc_ea[$opc_id],
                            'odo_price'     => rrp($opc->opc_price, 0)]);
                    }
                }
            }
            $order_goodsInfo = getGoodsDataCollection($req);
            if($req->dlvy_method == "N") {  //일반배송일때만 비교(퀵서비스는 js에서 가격 변동이 있기 때문에 항상 false)
                if ( (int)$req->od_all_price != (int)$order_goodsInfo['price']['final_p'] )
                    throw new Exception("최종가격이 다릅니다.");
            }
            $bank = '';
            $account = '';
            if ($od_pay_method != "C" ) {
                if ($req->bank_type == 'W') {
                    $bank = cache("config.company")->bankNm01;
                    $account = cache("config.company")->acctNum01;
                } else {
                    $bank = cache("config.company")->bankNm02;
                    $account = cache("config.company")->acctNum02;
                }
                sendSms($req->od_orderer_hp, $req->od_orderer, $req->od_no, ['bank'=>$bank, 'account'=>$account, 'holder'=>cache("config.company")->acctHolder, 'price'=>number_format($req->od_all_price)]);
            }


            $params['subject'] = "주문완료";
            $params['od_no'] = $req->od_no;
            $params['od_orderer'] = $req->od_orderer;
            $params['od_orderer_hp'] = $req->od_orderer_hp;
            $params['bank'] = $bank;
            $params['account'] = $account;
            $params['holder'] = cache("config.company")->acctHolder;
            $params['price'] = number_format($req->od_all_price);
            $params['addr'] = "[$req->od_zip] $req->od_addr1 $req->od_addr2 $req->od_memo";
            $rst = Mail::to($req->od_orderer_email)->queue(new Buy(cache("config.company")->email, "주문완료", $params));

            DB::commit();
            return redirect()->route('shop.order.done', $od_id);
        } catch (Exception $e) {
            Log::debug("구매 트랜젝션 에러");
            Log::channel('ezlab_log')->alert($e->getMessage());
            DB::rollBack();
            return alert('주문 오류');
        }
    }

    public function findQuickPrice(Request $req) {
        $addr1 = explode(" ", $req->addr1);
        $quicks = QuickService::all();
        foreach ($quicks as $quick) {
            $quick_location = explode(" ", $quick->qs_location);
            if($quick_location[0] == $addr1[0] && $quick_location[1] == $addr1[1])
                return $quick;
            if($quick_location[0] == "인천" && $addr1[0] == "인천")
                return $quick;
        }
        return false;
    }

    // public function partialCancel(Request $req) {
    //     dd($req);
    //     $od = $this->order->find($req->od_id);
    //     $tid = $od->getPg()->pg_tid;
    //     $httpCode = 400;
    //     $msg = '주문 취소 오류';
    //     if ($od->od_step == '20' && $od->od_pay_method == 'C') {
    //         $timestamp = date('YmdHis');
    //         $hashStr = $this->apiKey."Refund"."Card".$timestamp.$req->ip().$this->mid.$tid;
    //         $hashData = $this->makeHash($hashStr, "sha512");
    //
    //         $inputArray = array(
    //             "type" => "Refund",
    //             "paymethod" => "Card",
    //             "timestamp" => $timestamp,
    //             "clientIp" => $req->ip(),
    //             "mid" => $this->mid,
    //             "tid" => $tid,
    //             "msg" => "배송전 주문 취소",
    //             "hashData" => $hashData);
    //         if ($this->processHTTP('https://iniapi.inicis.com/api/v1/refund', $inputArray)) {
    //             $resultMap = json_decode($this->body, true);
    //             if($resultMap['resultCode'] == '00'){
    //                 $od->od_step = '80';
    //                 if($od->save()){
    //                     $msg = 'success';
    //                     $httpCode = 200;
    //                 } else { $msg = '주문단계 수정 오류'; }
    //             } else { $msg = $resultMap['resultMsg']; }
    //         } else { $msg = 'API 통신 오류'; }
    //     } else {
    //         $msg = '배송준비전에만 가능합니다.';
    //     }
    //     return response()->json($msg, $httpCode);
    // }
    //
    // public function cancel(Request $req) {
    //     $od = $this->order->find($req->od_id);
    //     $tid = $od->pg->pg_tid;
    //     if ($od->od_step < '30') {
    //         if ($od->od_pay_method == 'C') {
    //             $timestamp = date('YmdHis');
    //             $hashStr = $this->apiKey."Refund"."Card".$timestamp.$req->ip().$this->mid.$tid;
    //             $hashData = $this->makeHash($hashStr, "sha512");
    //
    //             $inputArray = array(
    //                 "type" => "Refund",
    //                 "paymethod" => "Card",
    //                 "timestamp" => $timestamp,
    //                 "clientIp" => $req->ip(),
    //                 "mid" => $this->mid,
    //                 "tid" => $tid,
    //                 "msg" => "배송전 주문 취소",
    //                 "hashData" => $hashData);
    //             if ($this->processHTTP('https://iniapi.inicis.com/api/v1/refund', $inputArray)) {
    //                 $resultMap = json_decode($this->body, true);
    //                 if($resultMap['resultCode'] == '00'){
    //                     /*  카드 취소 완료
    //                     *
    //                     *
    //                     내용 작성
    //                     *
    //                     */
    //                 } else { $msg = $resultMap['resultMsg']; }
    //             } else { $msg = 'API 통신 오류'; }
    //         }
    //
    //         $od->od_step = '80';
    //         if($od->save()){
    //             $msg = 'success';
    //             $httpCode = 200;
    //         } else { $msg = '주문단계 수정 오류'; }
    //     } else {
    //         $msg = '배송준비전에만 가능합니다.';
    //     }
    //     return response()->json($msg, $httpCode);
    // }

    public function edit(Request $req) {
        // dd($req->input());
        $od = $this->order->find($req->od_id); // if (!$od->od_id_papa) $od->od_id_papa = $od->od_id;
        $new_od_step = '10';
        if ($od->od_step == '10' || $od->od_step == '20') $new_od_step = '11';
        $od->od_step = "80"; //기존 주문은 주문취소 처리

        if ($req->submit_type == 'editPartial') {
            $new_od = $od->replicate(); //  sc_shop_order 테이블 복사
            $new_od->od_id_papa = $req->od_id;
            // $new_od->od_no = $this->getNew_od_no();
            $new_od->od_no = $od->od_no;
            $new_od->od_step = $new_od_step;
            $new_od->save();
            //  sc_shop_order_goods 테이블 복사
            $odg_arr = OrderGoods::where("odg_od_id", $req->od_id)->get();
            foreach ($odg_arr as $odg) {
                $new_odg = $odg->replicate();
                $new_odg->odg_od_id = $new_od->od_id;
                $new_odg->save();

                //  sc_shop_order_model 테이블 복사
                $odm_arr = OrderModel::where([["odm_od_id", $req->od_id], ['odm_odg_id', $odg->odg_id]])->get();
                foreach ($odm_arr as $odm) {
                    $new_odm = $odm->replicate();
                    $new_odm->odm_od_id = $new_od->od_id;
                    $new_odm->odm_odg_id = $new_odg->odg_id;
                    if ($new_odm->odm_ea != $req->odm_id[$odm->odm_id]) {
                        $new_odm->odm_edit_gap = $req->odm_id[$odm->odm_id] - $new_odm->odm_ea;
                    }
                    $new_odm->odm_ea = $req->odm_id[$odm->odm_id];
                    $new_odm->save();
                }

                //  sc_shop_order_option 테이블 복사
                $odo_arr = OrderOption::where([["odo_od_id", $req->od_id], ['odo_odg_id', $odg->odg_id]])->get();
                foreach ($odo_arr as $odo) {
                    $new_odo = $odo->replicate();
                    $new_odo->odo_od_id = $new_od->od_id;
                    $new_odo->odo_odg_id = $new_odg->odg_id;
                    if ($new_odo->odo_ea != $req->odo_id[$odo->odo_id]) {
                        $new_odo->odo_edit_gap = $req->odo_id[$odo->odo_id] - $new_odo->odo_ea;
                    }
                    $new_odo->odo_ea = $req->odo_id[$odo->odo_id];
                    $new_odo->save();
                }
            }

            $new_od_info = getGoodsDataCollection($new_od, 'order');
            $new_od->od_gd_price = $new_od_info['price']['total_p'];
            $new_od->od_dlvy_price = $new_od_info['price']['dlvy_p'];
            $new_od->od_all_price = $new_od_info['price']['final_p'];
            $new_od->updated_id = auth()->user()->id;
            $od->od_no = null;
            $od->deleted_at = NOW();
            $new_od->save();
        }

        if($req->submit_type == 'refund') { // 환불 시 환불 정보 등록
            //  iamport API 연결 시작
            //  post /users/getToken - API 접근을 위한 토큰 발급
            $data_getToken = array(
                'imp_key' => config('const.iamport.imp_key'),
                'imp_secret' => config('const.iamport.imp_secret'),
            );

            $url_getToken = "https://api.iamport.kr/users/getToken";

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url_getToken);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data_getToken));
            curl_setopt($ch, CURLOPT_POST, true);

            $response_getToken = curl_exec($ch);
            curl_close($ch);

            $json_getToken = json_decode($response_getToken);
            $bearer_token =$json_getToken->response->access_token;  //API에 접근하기위한 access_token을 가져온다.

            //  get /vbanks/holder - 계좌 실명조회
            $data_vbanks = array(
                'bank_code' => $req -> od_refund_bank,
                'bank_num'  => $req -> od_refund_acc_num,
            );

            $url_vbanks = "https://api.iamport.kr/vbanks/holder" . "?" . http_build_query($data_vbanks); //계좌조회 url
            $ch = curl_init();                                 //curl 초기화
            curl_setopt($ch, CURLOPT_URL, $url_vbanks);               //URL 지정하기
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Authorization:' . $bearer_token,
            ));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);    //요청 결과를 문자열로 반환
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);      //connection timeout 10초
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   //원격 서버의 인증서가 유효한지 검사 안함

            $response_vbanks = curl_exec($ch);
            curl_close($ch);

            $json_vbanks = json_decode($response_vbanks);

            if($json_vbanks->response) {
                if($json_vbanks->response->bank_holder != $req -> od_refund_depositor)
                    return response()->json('different_holder', 400);

                $od -> od_refund_depositor = $req -> od_refund_depositor;
                $od -> od_refund_bank      = $req -> od_refund_bank;
                $od -> od_refund_acc_num   = $req -> od_refund_acc_num;
                $od->save();
                return response()->json('계좌 실명조회 성공했습니다.', 200);
            }else {
                return response()->json('wrong_acc', 400);
            }

        //import API 연결 끝
        }

        $od->save();
        // if($od->od_mb_yn == "N" ) return redirect()->route('mypage.order.index')->with('guest_od_name', $od->od_orderer)->with('guest_od_no', $od->od_no);
        if($od->od_mb_yn == "N" ) return redirect()->route('home');
        return redirect()->route('mypage.order.index');
    }


    // public function ____editPartial(Request $req) {
    //     $od_id = 0;
    //     $diff_price = 0;
    //     switch ($req->id_name) {
    //         case 'odm_id':
    //             $p_odm             = OrderModel::find($req->id_val);
    //             $odm_price         = $p_odm->odm_price;
    //             $p_odm->odm_price  = 0; //  이전 주문정보는 취소라는 표시로 가격 0원표시
    //             $p_odm->save();
    //             $odm               = new OrderModel;
    //             $odm->odm_od_id    = $od_id = $p_odm->odm_od_id;
    //             $odm->odm_odg_id   = $p_odm->odm_odg_id;
    //             $odm->odm_gm_id    = $p_odm->odm_gm_id;
    //             $odm->odm_gm_catno = $p_odm->odm_gm_catno;
    //             $odm->odm_gm_name  = $p_odm->odm_gm_name;
    //             $odm->odm_gm_code  = $p_odm->odm_gm_code;
    //             $odm->odm_ea       = $req->ea;
    //             $odm->odm_price    = $odm_price;
    //             $odm->save();           //  수정된 주문정보 새로 등록
    //
    //
    //         break;
    //
    //         case 'odo_id':
    //             $p_odo             = OrderOption::find($req->id_val);
    //             $odo               = new OrderOption;
    //             $odo->odo_od_id    = $od_id = $p_odo->odo_od_id;
    //             $odo->odo_odg_id   = $p_odo->odo_odg_id;
    //             $odo->odo_op_id    = $p_odo->odo_op_id;
    //             $odo->odo_opc_id   = $p_odo->odo_opc_id;
    //             $odo->odo_opc_name = $p_odo->odo_opc_name;
    //             $odo->odo_ea       = $req->ea;
    //             $odo->odo_price    = $p_odo->odo_price;
    //             $odo->save();           //  수정된 주문정보 새로 등록
    //
    //             $p_odo->odo_price  = 0; //  이전 주문정보는 취소라는 표시로 가격 0원표
    //             $p_odo->save();
    //         break;
    //     }
    //     $p_od                = $this->order->find($od_id);
    //     $new_gd_info         = getGoodsDataCollection($p_od, 'order');
    //     $diff_price          = $p_od->od_all_price - $new_gd_info['price']['final_p'];
    //     $p_od->od_gd_price   = rrp($new_gd_info['price']['total_p'], 0);
    //     $p_od->od_dlvy_price = rrp($new_gd_info['price']['dlvy_p'], 0);
    //     $p_od->od_all_price  = $new_gd_info['price']['final_p'];
    //     $p_od->save();
    //
    //
    //     $httpCode = 400;
    //     $msg = '주문 취소 오류';
    //
    //
    //     if ($p_od->od_step == '20' && $p_od->od_pay_method == 'C' && $diff_price > 0) {
    //         $tid = $p_od->getPg()->pg_tid;
    //
    //         $timestamp = date('YmdHis');
    //         $hashStr = $this->apiKey."PartialRefund"."Card".$timestamp.$req->ip().$this->mid.$tid.$diff_price.$new_gd_info['price']['final_p'];
    //         $hashData = $this->makeHash($hashStr, "sha512");
    //
    //         $inputArray = array(
    //             "type" => "PartialRefund",
    //             "paymethod" => "Card",
    //             "timestamp" => $timestamp,
    //             "clientIp" => $req->ip(),
    //             "mid" => $this->mid,
    //             "tid" => $tid,
    //             "msg" => "배송전 부분 주문 취소",
    //             "price" => $diff_price,
    //             "confirmPrice" => $new_gd_info['price']['final_p'],
    //             "hashData" => $hashData);
    //         if ($this->processHTTP('https://iniapi.inicis.com/api/v1/refund', $inputArray)) {
    //             $resultMap = json_decode($this->body, true);
    //             dd($resultMap);
    //             if($resultMap['resultCode'] == '00'){
    //                 $od->od_step = '80';
    //                 if($od->save()){
    //                     $msg = 'success';
    //                     $httpCode = 200;
    //                 } else { $msg = '주문단계 수정 오류'; }
    //             } else { $msg = $resultMap['resultMsg']; }
    //         } else { $msg = 'API 통신 오류'; }
    //     } else {
    //         $msg = '배송준비전에만 가능합니다.';
    //     }
    //     return response()->json($msg, $httpCode);
    // }



}
