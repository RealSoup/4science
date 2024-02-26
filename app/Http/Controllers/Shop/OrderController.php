<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{ Goods, GoodsModel, GoodsOption, Cart, OptionChild, Order, OrderPurchaseAt, OrderModel, OrderOption, OrderExtraInfo, OrderDlvyInfo, OrderPg,
    EstimateModel, EstimateOption};
use App\Models\{FileInfo, User};
use App\Http\Requests\SaveOrderRequest;
use App\Events\{Mileage};
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
	protected $order;
    protected $goods;
    protected $orderExtraInfo;
    public function __construct(Order $od, OrderExtraInfo $oex, Goods $gd) {
        $this->order          = $od;
        $this->goods          = $gd;
        $this->orderExtraInfo = $oex;
    }

    public function settle(Request $req){
        $type = $req->filled('type') ? $req->type : 'buy_inst';
        $params = $this->goods->getGoodsDataCollection($req, $type);
        $params['goods_def'] = $this->goods;
        $params['sale_env'] = saleEnv();
        $params['md_cnt'] = 0;
        $params['od_name'] = '';
        foreach ($params['lists'] as $pa_group) {    //  주문 갯수
            $go_required_chk = true;
            foreach ($pa_group as $item){
                // 판매 가능 여부 재확인
                if(isset($item['gd_enable']) && $item['gd_enable'] == 'N')    abort(500, '판매중지 상품이 있습니다. 다시 확인해 주시기 바랍니다.');
                if($req->type === 'buy_inst' || $req->type === 'buy_cart') {
                    if(isset($item['gm_enable']) && $item['gm_enable'] == 'N')    abort(500, '비활성 상품이 있습니다. 다시 확인해 주시기 바랍니다.');
                    //  견적가(0원) 구매 금지
                    if($item['price']<1)   abort(500, '견적가 상품이 있습니다. 견적 요청하여 가격을 견적 받으세요.');

                    //  재고 부족시 구매 금지
                    if(isset($item['gm_limit_ea']) && $item['ea'] > $item['gm_limit_ea'])    abort(500, '재고 부족 상품이 있습니다. 다시 확인해 주시기 바랍니다.');
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

        $params['config'] = Order::$orderConfig;
        $params['config']['email_domain'] = auth()->user()::$option['email_domain'];
        $params['addr'] = auth()->check() ? auth()->user()->userAddr : [];
        
        $params['toss']['customerKey']  = auth()->user()->email.'=='.auth()->user()->id;
        $params['toss']['successUrl']   = config('app.url')."shop/order/payReturn";
        $params['toss']['failUrl']      = config('app.url')."shop/order/payCardFail";
        $params['toss']['clientKey']    = env('TOSS_CLIENTKEY');
        $params['toss']['billing_clientKey'] = env('TOSS_BILLING_CLIENTKEY');
        $params['toss']['billing_keys'] = DB::table('user_billing')->where('created_id', auth()->user()->id)->get();
        
        return response()->json($params);
    }

    public function pay(Request $req) {
        // try {
        //     DB::beginTransaction();
            $od_no = $this->getNew_od_no();
            $this->order->od_no            = $od_no;
            $this->order->od_name          = $req->filled('od_name')          ? $req->od_name          : '';
            $this->order->od_type          = $req->filled('od_type')          ? $req->od_type          : 'buy_inst';
            $this->order->od_er_id         = $req->filled('od_er_id')         ? $req->od_er_id         : NULL;
            $this->order->od_step          = in_array($req->od_pay_method, ['C', 'P', 'BL']) ? '0'           : '10';
            $this->order->od_gd_price      = $req->filled('price')            ? $req->price['goods']           : 0;
            $this->order->od_surtax        = $req->filled('price')            ? $req->price['surtax']          : 0;
            $this->order->od_dlvy_price    = $req->filled('price')            ? $req->price['dlvy_add_vat']    : 0;
            $this->order->od_air_price     = $req->filled('price')            ? $req->price['air_add_vat']     : 0;
            $this->order->od_all_price     = $req->filled('price')            ? $req->price['total']           : 0;
            $this->order->od_orderer       = auth()->check()                  ? auth()->user()->name   : '';
            $this->order->od_orderer_hp    = auth()->check()                  ? auth()->user()->hp     : '';
            $this->order->od_orderer_email = auth()->check()                  ? auth()->user()->email  : '';
            $this->order->od_company       = auth()->check()                  ? auth()->user()->company : '';
            $this->order->od_part          = auth()->check()                  ? auth()->user()->part   : '';
            $this->order->od_receiver      = $req->filled('od_receiver')      ? $req->od_receiver      : '';
            $this->order->od_receiver_hp   = $req->filled('od_receiver_hp')   ? $req->od_receiver_hp   : '';
            $this->order->od_zip           = $req->filled('od_zip')           ? $req->od_zip           : '';
            $this->order->od_addr1         = $req->filled('od_addr1')         ? $req->od_addr1         : '';
            $this->order->od_addr2         = $req->filled('od_addr2')         ? $req->od_addr2         : '';
            $this->order->od_memo          = $req->filled('od_memo')          ? $req->od_memo          : '';
            $this->order->od_pay_method    = $req->filled('od_pay_method')    ? $req->od_pay_method    : 'C';
            $this->order->od_sale_env      = $req->filled('sale_env')         ? $req->sale_env         : 'P';
            $this->order->ip               = $req->ip();
            $this->order->created_id       = auth()->check() ? auth()->user()->id : 0;
            $this->order->save();
            
            $params['od_id'] = $this->order->od_id;

            if ($req->od_pay_method=='BL') {
                $ob_data = [ 'ob_od_id'   => $this->order->od_id, 
                             'ob_od_plan' => $req->od_plan ];
                if ($req->filled('ub_id') && $req->ub_id>0) {
                    $obj = collect();
                    $obj->od = $this->order;
                    $obj->billing = collect();
                    $bl = DB::table('user_billing')->where('ub_id', $req->ub_id)->first();
                    $obj->billing->customerKey = $bl->ub_customer_key;
                    $obj->billing->billingKey = $bl->ub_billing_key;
                    //  빌링키를 활용 결제 승인 받기
                    $rst_toss = json_decode(self::tossCurl('tossBillingPayApprove', $obj));
                    if( $rst_toss->status == "DONE" ) {
                        self::tossPgInsert($rst_toss);
                        DB::table('shop_order')->where('od_id', $this->order->od_id)->update(['od_step'=> '20']);
                    }
                    $ob_data['ob_ub_id'] = $req->ub_id;
                }
                DB::table('shop_order_billing')->insert($ob_data);
            }
            
            foreach ($req->lists as $pa_id => $pa) {
                $insert_tmp = array();
                foreach ($pa as $k => $item) {
                    // $gd_name = DB::table('shop_goods')->where('gd_id', $item['gd_id'])->first()->gd_name;
                    if ( $k == 0 ) {
                        $odpa_id = OrderPurchaseAt::insertGetId([   'odpa_od_id'   => $this->order->od_id,
                                                                    'odpa_pa_id'   => $pa_id,
                                                                    'odpa_pa_type' => $item['pa_type'],
                                                                    'odpa_pa_name' => isset($item['pa_name']) ? $item['pa_name'] : '',
                                                                    'odpa_dlvy_p'  => isset($item['pa_dlvy_p']) ? $item['pa_dlvy_p'] : 0 ], 'odpa_id');
                    }

                    if ($item['type'] == 'model') {
                        $insert_tmp[] = array(
                            'odm_od_id'    => $this->order->od_id,
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
                            'odm_price'    => $item['price_dc'] ?? $item['price'],
                        );
                        Cart::Target(auth()->user()->id, $item['gd_id'], $item['gm_id'], 'MODEL')->delete();
                    } else if ($item['type'] == 'option') {
                        $insert_tmp[] = array(
                            'odm_od_id'    => $this->order->od_id,
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
            $this->orderExtraInfo->oex_od_id = $this->order->od_id;
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
                $this->orderExtraInfo->oex_email = array_key_exists('oex_email', $req->extra)   ? $req->extra['oex_email'] : '';
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

    public function getNew_od_no() {
        $today_cnt = DB::table('shop_order')->whereRaw('created_at > CURDATE()')->count();
        return date("ymd").substr('000'.$today_cnt, -4);
    } 
    
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

        $data['order_config'] = Order::$orderConfig;
        return response()->json($data, 200);
    }

    public function show($od_id) {
        $rst['od'] = $this->order->with('orderPurchaseAt')->with('orderExtraInfo')->with('orderPg')->with('mng')->find($od_id);

        foreach ($rst['od']->orderPurchaseAt as $opa) {
			foreach ($opa->orderModel as $odm)
				$odm->orderDlvyInfo;
		}
        
        $rst['order_config'] = Order::$orderConfig;
        $rst['order_config']['url_receipt'] = env('PSYS_URL03');
        return response()->json($rst, 200);
    }

    public function update(Request $req, $id) {
		if ($req->filled('type')) {
			if ($req->type == 'receipt_confirm')
                $rst = DB::table('shop_order_dlvy_info')
                        ->where('oddi_id', $req->order_dlvy_info['oddi_id'])
                        ->update(['oddi_receive_date'=> \Carbon\Carbon::now()]);
		}
		if ($rst) {
            if ( auth()->user()->level < 5 || auth()->user()->level > 20 ) {
                $m = new \App\Models\UserMileage;
                event(new Mileage(  "insert", 
                                    auth()->user()->id, 
                                    'shop_order_model', 
                                    $req->odm_id, 'SV', 
                                    '수취 확인', 
                                    $m->mileage_calculation($req->odm_price, $req->odm_ea, auth()->user()->level)));
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

    public function payReturn(Request $req, $od_id=0){
        
        if ($req->filled("paymentType")) //  결제 승인 (일반카드, 브랜드페이, 키인)
            $rst_toss = self::tossCurl('tossSuccess', $req);
        else if ($req->filled("authKey") && $od_id>0) {
            //  카드번호 등록하고 본인인증 후 빌링키(카드자동결제키) 받기
            $billing = json_decode(self::tossCurl('tossBillingKeyIssue', $req));
            $ub_id = DB::table('user_billing')->insertGetId([
                'ub_customer_key' => $billing->customerKey,
                'ub_billing_key'  => $billing->billingKey,
                'ub_card_com'     => $billing->cardCompany,
                'ub_card_num'     => $billing->cardNumber,
                'created_id'      => (auth()->check() ? auth()->user()->id : 0),
            ]);
            DB::table('shop_order_billing')->where('ob_od_id', $od_id)->update(['ob_ub_id'=> $ub_id]);
            $obj = collect();
            $obj->od = DB::table('shop_order')->where('od_id', $od_id)->first();
            $obj->billing = $billing;
            //  빌링키를 활용 결제 승인 받기
            $rst_toss = self::tossCurl('tossBillingPayApprove', $obj);
        }

        $rst_toss = json_decode($rst_toss);
        
        if ( $req->filled("paymentType") &&  $req->paymentType == 'BRANDPAY' )  $mod_data['od_pay_method'] = 'CP';
        if ( $req->filled("paymentType") &&  $req->paymentType == 'KEYIN' )     $mod_data['od_pay_method'] = 'CK';

        if (property_exists($rst_toss, 'message')) {  //  결제 실패
            $mod_data = ['od_step'=> '61'];
            DB::table('shop_order')->where('od_id', $req->orderId)->update($mod_data);
            OrderPg::insert([
                'pg_od_id'    => $req->orderId,
                'pg_code'     => $rst_toss->code,
                'pg_msg'      => $rst_toss->message
            ]);

            return redirect("/shop/order/payCardFail?msg=".$rst_toss->message);
        } else {
            self::tossPgInsert($rst_toss);
            
            GoodsModel::minus_limit_ea($rst_toss->orderId); //  재고 상품 구매시 수량 감소

            $mod_data = ['od_step'=> '20'];
            DB::table('shop_order')->where('od_id', $rst_toss->orderId)->update($mod_data);
            return redirect("/shop/order/done/{$rst_toss->orderId}");
        }
    }

    
    public function tossPgInsert($rst_toss) {
        return OrderPg::insert([
            'pg_od_id'    => $rst_toss->orderId,
            'pg_app_no'   => $rst_toss->card->approveNo,
            'pg_tid'      => $rst_toss->receipt->url,
            'pg_pay_type' => $rst_toss->type,
            'pg_price'    => $rst_toss->totalAmount,
            'pg_card_com' => OrderPg::$option['tossCardCom'][$rst_toss->card->issuerCode],
            'pg_buyer_nm' => '',
            'pg_code'     => '',
            'pg_msg'      => ''
        ]);
    }

    public function settlePsys(Request $req, Int $od_id){
        $rst['od'] = DB::table('shop_order')->where('od_id', $od_id)->first();
        
        $rst['Psys_buyername']	          = $rst['od']->od_orderer;
        $rst['Psys_email']	              = $rst['od']->od_orderer_email;
        $rst['Psys_handphone']	          = $rst['od']->od_orderer_hp;
        
        $rst['Psys_recp_nm']	          = $rst['od']->od_orderer;
        $rst['Psys_recp_addr']            = $rst['od']->od_addr1.$rst['od']->od_addr2;
        
        $rst['Psys_pmember_id']           = $rst['od']->created_id;
        $rst['Psys_shopingmall_order_no'] = $rst['od']->od_id;
        $rst['Psys_totalamt']             = $rst['od']->od_all_price;
        
        $headers = array(); 
        array_push($headers, "content-type: application/json; charset=utf-8");
        array_push($headers, "WebKey: ".env('PSYS_APIKEY'));

        $psys_api_url = env('PSYS_URL01');

        $edi_date = date('YmdHis');
        $request_data_array = array(
            'WEB_ID' => env('PSYS_APIID'),
            'AMOUNT' => $rst['od']->od_all_price,
            'EDI_DATE'=> $edi_date,
        );
        $psys_api_json = json_encode($request_data_array, TRUE);

        $ch = curl_init(); // curl 초기화
        curl_setopt($ch,CURLOPT_URL, $psys_api_url);
        curl_setopt($ch,CURLOPT_POST, false);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $psys_api_json);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
        curl_setopt($ch,CURLOPT_TIMEOUT, 20);
        curl_setopt($ch,CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        curl_close($ch);

        $result_array = json_decode($response, true);

        $rst['edi_date'] = $edi_date;
        $rst['api_key'] = env('PSYS_APIKEY');
        $rst['api_id']  = env('PSYS_APIID');
        $rst['api_url'] = env('PSYS_URL02');
        $rst['ReturnURL'] = env('APP_URL').'shop/order/payReturnPsys';
        $rst['Psys_securekey'] = $result_array['encryptData'];
        if($result_array['RESULTCODE'] == "9999") { 
            echo "result_code=E009\r\nresult_msg=웹연동 결제 설정이 되어있지 않습니다.";
            exit;
        }
        return response()->json($rst, 200);
    }
    
    public function payReturnPsys(Request $req){
        if ($req->Psys_resultcode != "0000") {
            $msg = implode(" ", $req->all());
            return redirect("/shop/order/payCardFail?msg=".$msg);
        } else {
            $pgdb_rst = OrderPg::insert([
                'pg_od_id'    => $req->Psys_shopingmall_order_no,
                'pg_app_no'   => $req->Psys_approvalno,
                'pg_tid'      => $req->Psys_tid,
                'pg_pay_type' => "psys_{$req->Psys_card_type}",
                'pg_price'    => $req->Psys_totalamt,
                'pg_card_com' => $req->Psys_card_nm,
                'pg_buyer_nm' => $req->Psys_etc_data1,
                'pg_code'     => $req->Psys_resultcode,
                'pg_msg'      => $req->Psys_resultmsg]);       
            DB::table('shop_order')->where('od_id', $req->Psys_shopingmall_order_no)->update(['od_step'=> '20']);
            
            //  재고 상품 구매시 수량 감소
            GoodsModel::minus_limit_ea($req->Psys_shopingmall_order_no);
            // return redirect("/shop/order/done/{$req->Psys_shopingmall_order_no}");
            // return response()->json($req->Psys_shopingmall_order_no, 200);
            return view('shop.order.payReturnPsys', ['od_id' => $req->Psys_shopingmall_order_no]);
        }        
    }

    public function tossBrandPayAccessToken(Request $req) {
        //  echo는 의미 없음
        //  토스측에서 인증되어 정상적으로 내가 자료 받고 끝
        echo self::tossCurl('tossBrandPayAccessToken', $req);
    }

    public function tossCurl($type, $req) {
        $url = '';
        $encryption = '';
        $data = '';
        if ($type == 'tossSuccess') {
            $url = "https://api.tosspayments.com/v1/payments/confirm";
            $data = "{\"paymentKey\":\"{$req->paymentKey}\",\"orderId\":\"{$req->orderId}\",\"amount\":{$req->amount}}";
            if($req->paymentType == 'NORMAL')        $encryption = base64_encode(env('TOSS_SECRETKEY').':');
            else if($req->paymentType == 'BRANDPAY') $encryption = base64_encode(env('TOSS_BRANDPAY_SECRETKEY').':');
            else if($req->paymentType == 'KEYIN')    $encryption = base64_encode(env('TOSS_KEYIN_SECRETKEY').':');
        } else if ($type == 'tossBrandPayAccessToken') {
            $url = "https://api.tosspayments.com/v1/brandpay/authorizations/access-token";
            $data = "{\"grantType\":\"AuthorizationCode\",\"customerKey\":\"{$req->customerKey}\",\"code\":\"{$req->code}\"}";
            $encryption = base64_encode(env('TOSS_BRANDPAY_SECRETKEY').':');
        } else if ($type == 'tossBillingKeyIssue') {
            $url = "https://api.tosspayments.com/v1/billing/authorizations/issue";
            $data = "{\"authKey\":\"{$req->authKey}\",\"customerKey\":\"{$req->customerKey}\"}";
            $encryption = base64_encode(env('TOSS_BILLING_SECRETKEY').':');
        } else if ($type == 'tossBillingPayApprove') {
            $url = "https://api.tosspayments.com/v1/billing/{$req->billing->billingKey}";
            $data = "{\"customerKey\":\"{$req->billing->customerKey}\",\"amount\":{$req->od->od_all_price},";
            $data .= "\"orderId\":\"{$req->od->od_id}\",\"orderName\":\"{$req->od->od_name}\",";
            $data .= "\"customerEmail\":\"{$req->od->od_orderer_email}\",\"customerName\":\"{$req->od->od_orderer}\",\"taxFreeAmount\":0}";
            $encryption = base64_encode(env('TOSS_BILLING_SECRETKEY').':');
        }
        
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => [ "Authorization: Basic {$encryption}", "Content-Type: application/json" ],
        ]);

        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
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
                sendSms($data->od_orderer_hp, $data->od_orderer, $data->od_no, ['bank'    => $bank, 
                                                                                'account' => $account, 
                                                                                'holder'  => cache('bank')['owner'], 
                                                                                'price'   => number_format($data->od_all_price)]
                );
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


        return response()->json(['order'=>$data, 'config'=>Order::$orderConfig], 200);
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