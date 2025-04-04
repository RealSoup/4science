<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Requests\SaveMakerRequest;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Shop\{Order, OrderModel, OrderDlvyInfo, OrderExtraInfo, Category, Goods, GoodsModel, OrderPurchaseAt};
use App\Models\{User, UserMng, FileNote, ShowWindow};
use App\Events\{Mileage};
// use App\Traits\{InicisUtil, InicisHttpClient};
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redis;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ {InvoicesExport, OrderEstimateExport, OrderTransactionExport, OrderShippingListExport, OrderListExport};
use App\Mail\{SendTransaction, PayReq};
use Mail;
use DateTime;
use Session;
use DB;
use Cache;
use PDF;

class OrderController extends Controller {
	// use InicisUtil;    //  trait
    // use InicisHttpClient;    //  trait

	protected $apiKey;
	protected $mid;
	protected $order;
	protected $category;
	protected $user;
	protected $orderExtraInfo;

	public function __construct(Order $od, OrderExtraInfo $oex, Category $cate, User $us) {
        $this->apiKey        = config('const.inicis.apiKey');
        // $this->apiKey        = "ItEQKi3rY7uvDS8l";
        $this->mid           = "ezlabnet01";
        // $this->mid           = "INIpayTest";

		$this->order = $od;
		$this->category = $cate;
		$this->user = $us;
		$this->orderExtraInfo = $oex;

		$option = ['defaultPaperSize'=>'a4', 'isRemoteEnabled' => true, 'isHtml5ParserEnabled' => true,];
        if (config('app.env') == "production") { $option['isRemoteEnabled'] = true; }
        $this->pdf = PDF::setOptions($option);
    }

	public function index(Request $req) {
		$data = $input = $req->all();
		$data['categorys'] = collect();
        $data['categorys'][0] = $this->category->getCate(0);
        if ($req->filled('ca01') && $req->ca01>0 )    $data['categorys'][1] = $this->category->getCate($req->ca01);
        if ($req->filled('ca02') && $req->ca02>0 )    $data['categorys'][2] = $this->category->getCate($req->ca02);
        if ($req->filled('ca03') && $req->ca03>0 )    $data['categorys'][3] = $this->category->getCate($req->ca03);
        if ($req->filled('ca04') && $req->ca04>0 )    $data['categorys'][4] = $this->category->getCate($req->ca04);

		$um = new UserMng;
		$data['mng_info'] = $um->getMngInfo();
		$data['order_config'] = Order::$orderConfig;
		$data['mng_on'] = json_decode(Redis::get('UserMngOn'));
		$data['mng_off'] = json_decode(Redis::get('UserMngOff'));
		
		$orders = $this->order->with('OrderPurchaseAt')->with('orderExtraInfo')->with('user')
		->select("shop_order.*",
			DB::raw("
			(SELECT eq_mng FROM la_shop_estimate_req WHERE eq_id = (
				SELECT er_eq_id FROM la_shop_estimate_reply WHERE er_id = la_shop_order.od_er_id
			)) as eq_mng_id"), )
		->when($req->startDate,     fn ($q, $v) => $q->StartDate($v))
        ->when($req->endDate,		fn ($q, $v) => $q->EndDate($v))
		->when($req->od_type,		fn ($q, $v) => $q->where('od_type', $v))
		->when($req->od_pay_method,	fn ($q, $v) => $q->where('od_pay_method', $v))
		->when($req->od_step,		fn ($q, $v) => $q->where('od_step', $v))
        ->when($req->od_mng,		function ($q, $v) {
			if ($v == 'no') return $q->whereNull('od_mng');
			else return $q->where('od_mng', $v);
		});

		if (isset($data['startPrice'])) { 	$orders = $orders->where('od_all_price', '>=', preg_replace('/\D/', '', $data['startPrice'])); }
		if (isset($data['endPrice'])) { 	$orders = $orders->where('od_all_price', '<=', preg_replace('/\D/', '', $data['endPrice'])); }
        if (isset($data['um_group'])) {
			$group = UserMng::Group($data['um_group'])->pluck('um_user_id');
			$orders = $orders->whereIn('od_mng', (count($group) ? $group : ['']));
		}
		if (isset($data['sale_env']))	$orders = $orders->where('od_sale_env', $data['sale_env']);
		//	회원정보에서 해당회원의 최근 주문 내역을 가져오는데 활용
		if (isset($data['writer']))		$orders = $orders->SchWriter($data['writer']);
        if (isset($data['keyword'])){
			$txt = $data['keyword'];
            switch ($data['mode']) {
				case 'od_orderer':		$orders = $orders->where('od_orderer', 'like', "%$txt%"); break;
				case 'orderer_email':	$orders = $orders->where('od_orderer_email', 'like', "%$txt%"); break;
				case 'orderer_hp':		$orders = $orders->where('od_orderer_hp', 'like', "%$txt%"); break;
				case 'od_company':		$orders = $orders->where('od_company', 'like', "%$txt%"); break;
				case 'od_no':			$orders = $orders->where('od_no', $txt); break;
				case 'od_id':			$orders = $orders->where('od_id', $txt); break;
				case 'od_receiver':		$orders = $orders->where('od_receiver', 'like' , "%$txt%"); break;
				case 'od_addr1':		$orders = $orders->where('od_addr1', 'like' , "%$txt%"); break;
				case 'oex_depositor':
					$ids = $this->orderExtraInfo::where('oex_depositor', 'like' , "%$txt%")->pluck('oex_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'gm_name':
					$ids = OrderModel::where('odm_gm_name', 'like', "%{$txt}%")->pluck('odm_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'gm_code':
					$ids = OrderModel::where('odm_gm_code', 'like', "%{$txt}%")->pluck('odm_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'catno':
					$ids = OrderModel::where('odm_gm_catno', 'like', "{$txt}%")->pluck('odm_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'u_id':			$orders = $orders->where('created_id', $txt); break;
				
            }
        }
		
		if ( array_key_exists('mode', $data) && $data['mode'] == 'od_addr1_sk' ) {
			$orders->when($req->keyword, function ($q, $v) { return $q->where(function($q) { $q->Where('od_addr1', 'like' , "서울%")->orWhere('od_addr1', 'like' , "경기%"); })
				->where(function($q) use($v) { $q->Where('od_addr1', 'like' , "%{$v}%")->orWhere('od_addr2', 'like' , "%{$v}%"); }); });
			$orders->when(!$req->keyword, function ($q) { return $q->where(function($q) { $q->Where('od_addr1', 'like' , "서울%")->orWhere('od_addr1', 'like' , "경기%"); }); });
			// $orders = $orders->where(function($q) { $q->Where('od_addr1', 'like' , "서울%")->orWhere('od_addr1', 'like' , "경기%"); });
		}

		if ($req->filled('limit'))
            $data['list'] = $orders->latest('od_id')->limit($req->limit)->get();
        else {
			$list_size = $req->filled('list_size') ? $req->list_size : 20;
			$data['list'] = $orders->latest('od_id')->paginate($list_size);
			$data['list']->appends($input)->links();
		}

		foreach ($data['list'] as $od) {
			if($od->od_name == ''){
				$tmp = $od->orderModel;
				$od->od_name = $tmp[0]->odm_gd_name;
				if ( count($tmp) > 1 ) $od->od_name .= "외 [".(count($tmp)-1)."]";
			}

			// if ($od->user->code_01)
            //     $od->user->introducer = true;
            // else $od->user->introducer = false;

			//	서울, 경기 배송지 체크
			if (strStartWithInArray(["서울", "경기"], mb_substr($od->od_addr1, 0, 2)))	$od->od_addr1_sk = true;
			else																		$od->od_addr1_sk = false;
		}

		// $data['steps'] = Setting::Group("od_step")->orderBy("st_sort")->get();
		// $data['manager'] = User::Manager()->orderBy("name")->get();
		// dump($data);
		return response()->json($data);
    }
	
	public function store (Request $req) {
		$eq_title = $req->estimate_model[0]['em_name'];
		if (count($req->estimate_model) > 1)
            $eq_title .= '외 ['.(count($req->estimate_model) - 1).']';
		$od_id = $this->order->insertGetId([
			'od_no'            => app('App\Http\Controllers\Shop\OrderController')->getNew_od_no(),
			'od_name'          => $eq_title,
			'od_type'          => 'buy_temp',
			'od_er_id'      	=> $req->filled('er_id')		? $req->er_id   : 0,
			'od_step'          => '10',
			'od_gd_price'      => $req->filled('er_gd_price')	? $req->er_gd_price   : 0,
			'od_surtax'        => $req->filled('er_surtax')		? $req->er_surtax     : 0,
			'od_dlvy_price'    => $req->filled('er_dlvy_price')	? $req->er_dlvy_price    : 0,
			'od_air_price'     => $req->filled('er_air_price') 	? $req->er_air_price     : 0,
			'od_all_price'     => $req->filled('er_all_price') 	? $req->er_all_price           : 0,
			'od_orderer'       => $req->filled('estimate_req')	? $req->estimate_req['eq_name']       : '',
			'od_orderer_hp'    => $req->filled('estimate_req')	? $req->estimate_req['eq_hp']    : '',
			'od_orderer_email' => $req->filled('estimate_req') 	? $req->estimate_req['eq_email'] : '',
			'od_company'       => $req->filled('estimate_req')	? $req->estimate_req['eq_company'] : '',
			'od_receiver'      => $req->filled('estimate_req')	? $req->estimate_req['eq_name'] : '',
			'od_receiver_hp'   => $req->filled('estimate_req')	? $req->estimate_req['eq_hp'] : '',
			'od_zip'           => $req->filled('od_zip')	? $req->od_zip           : '',
			'od_addr1'         => '',
			'od_addr2'         => '',
			'od_memo'          => '',
			'od_pay_method'    => NULL,
			'od_sale_env'      => 'P',
			'od_mng'           => auth()->user()->id,
			'ip'               => NULL,
			'created_id'       => $req->filled('estimate_req')	? $req->estimate_req['created_id'] : 0,
		], 'od_id');
		foreach ($req->collect['lists'] as $pa_id => $pa) {
			$insert_tmp = array();
			foreach ($pa as $k => $item) {
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
						'odm_price'    => $item['price'],
					);
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
				}
			}                    
			DB::table('shop_order_model')->insert($insert_tmp);
		}
		// foreach (collect($req->estimate_model)->groupBy('em_gd_id') as $gd_id => $gd) {
		// 	$odg_id = 0;
		// 	foreach ($gd as $seq => $em) {
		// 		if ($seq == 0) {
		// 			$odpa_id = OrderPurchaseAt::insertGetId([   'odpa_od_id'   => $od_id,
		// 														'odpa_pa_id'   => $pa_id,
		// 														'odpa_pa_type' => $item['pa_type'],
		// 														'odpa_pa_name' => isset($item['pa_name']) ? $item['pa_name'] : '',
		// 														'odpa_dlvy_p'  => isset($item['pa_dlvy_p']) ? $item['pa_dlvy_p'] : 0 ], 'odpa_id');
		// 		}
				
		// 		OrderModel::insert([
		// 			'odm_od_id'     => $od_id,
		// 			'odm_odg_id'    => $odg_id,
		// 			'odm_gm_id'     => $em['em_gm_id'],
		// 			'odm_gm_catno'  => $em['em_catno'],
		// 			'odm_gm_name'   => $em['em_name'],
		// 			'odm_gm_code'   => $em['em_code'],
		// 			'odm_gm_spec'   => $em['em_spec'],
		// 			'odm_gm_unit'   => $em['em_unit'],
		// 			'odm_ea'        => $em['em_ea'],
		// 			'odm_price'     => $em['em_price']
		// 		]);

		// 		foreach ($em['estimate_option'] as $eo) {
		// 			OrderOption::insert([
		// 				'odo_od_id'     => $od_id,
		// 				'odo_odg_id'    => $odg_id,
		// 				'odo_opc_id'    => $eo['eo_opc_id'],
		// 				'odo_opc_name'  => $eo['eo_tit']." ".$eo['eo_name'],
		// 				'odo_ea'        => $eo['eo_ea'],
		// 				'odo_price'     => $eo['eo_price']
		// 			]);
		// 		}
		// 	}
		// }
	}

	public function edit($od_id) {
		// $params['dlvy_url'] = "https://b2c.goodsflow.com/zkm/V1/whereis/";
		// $params['site_code'] = config('const.dlvy.siteCode');
		// $params['dlvy_com_code'] = config('const.dlvy.dlvyComCode');
		// $params['refund_bank_code'] = config('const.iamport.bank_code');
		$data = $this->order->with('OrderPurchaseAt')->with('OrderExtraInfo')->with('orderPg')->with('mng')->with('user')->find($od_id);
		if ($data->mng)
			$data->mng->userMng;
		if ($data->user) {
			$data->user->userAddr;

			///////////////////////
			// if ($data->user->code_01)
            //     $data->user->introducer = User::find($data->user->code_01);
            // else $data->user->introducer = NULL;
			//////////////////////////////////
		}
		$arr_sw = ShowWindow::select('sw_group', 'sw_key')->Type('today_pick_up')->pluck('sw_key')->toArray();
		// dd($arr_sw);
		foreach ($data->orderPurchaseAt as $opa) {
			foreach ($opa->orderModel as $odm) {
				if(in_array($odm->odm_gd_id, $arr_sw))
					$odm->today_pick_up = true;
				$odm->orderDlvyInfo;
			}
		}

		if ($data->orderExtraInfo && !$data->orderExtraInfo->oex_biz_name) $data->fileInfo;	
		
		$rst['od'] = $data;
		$rst['order_config'] = Order::$orderConfig;
		$rst['mng_on'] = json_decode(Redis::get('UserMngOn'));
        $rst['order_config']['url_receipt'] = env('PSYS_URL03');
		return response()->json($rst, 200);
	}

	public function exportEstimateExcel(Request $req) {
		return Excel::download(new OrderEstimateExport($req->all()), 'order.xlsx');
	}

	public function exportEstimatePdf(Request $req) {
		return $this->pdf->loadView('admin.order.pdf.order_estimate', $req->all())
				->download('order.pdf'); // ->stream();
	}

	public function exportTransactionExcel(Request $req) {
		return Excel::download(new OrderTransactionExport($req->all()), 'order.xlsx');
	}

	public function exportTransactionPdf(Request $req) {
		if ($req->filled('trans_date')) {
			$subject = '거래명세서 메일입니다.';
			$params['name'] = $req->filled('od_orderer') ? $req->od_orderer : auth()->user()->name;
			$params['file_nm'] = $req->od_no;
			$to_email = [$req->trans_email, $req->trans_mng_email];
			$pdf = $this->pdf->loadView('admin.order.pdf.order_transaction', $req->all());
			// $pdf->setOptions(['dpi' => 96 ]);
			$filename = uniqid();
			Storage::put('public/estimatePdf/'.$filename.'.pdf', $pdf->output());
			return Mail::to($to_email)->queue(new SendTransaction(config('mail.mailers.smtp.username'), $subject, $params, public_path('storage/estimatePdf/'.$filename.'.pdf')));
		} else if ($req->filled('email_msg')) {
			$subject = '[4science] 납품완료 후 미결제 안내 드립니다. (거래명세서 첨부)';
			$to_email = [$req->od_orderer_email, $req->mng['email'], auth()->user()->email];
        	$req->merge(array('main_tel' => "ADM"));
			$req->merge(array('file_nm' => $req->od_no));
			$pdf = $this->pdf->loadView('admin.order.pdf.order_transaction', $req->all());
			// $pdf->setOptions(['dpi' => 96 ]);
			$filename = uniqid();
			Storage::put('public/estimatePdf/'.$filename.'.pdf', $pdf->output());
			return Mail::to($to_email)->queue(new PayReq(config('mail.mailers.smtp.username'), $subject, $req->all(), public_path('storage/estimatePdf/'.$filename.'.pdf')));
		} else {
			return $this->pdf->loadView('admin.order.pdf.order_transaction', $req->all())
				// ->download('order.pdf');
				->stream();
		}
	}

	public function exportShippingListExcel(Request $req) {
		return Excel::download(new OrderShippingListExport($req->all()), 'order.xlsx');
	}

	public function exportOrderListExcel(Request $req) {
		return Excel::download(new OrderListExport($req), 'order'.date("Ymd").'.xlsx');
	}

	



	public function update(Request $req, $od_id) {
		$od = $this->order->find($od_id);
		if ($req->filled('type')) {
			if 		($req->type == 'od_mng' && $req->filled('od_mng')) 	$od->od_mng = $req->od_mng;
			else if ($req->type == 'od_step' && $req->filled('od_step')) {
				if($req->od_type != 'buy_temp') {
					if(intval($req->od_step) >= 20 && intval($req->od_step) <= 50) {
						foreach ($req->order_purchase_at as $opa) {
							foreach ($opa['order_model'] as $odm) {
								/*	송장번호 없이 배송 완료 처리시 아래 필요함 */
								if ($odm['odm_type'] == 'MODEL')
									OrderDlvyInfo::firstOrCreate(['oddi_odm_id' => $odm['odm_id']]);
							}
						}
							
						if( intval($req->od_step) == 50 && array_key_exists('id', $req->user) && intval($req->user['level']) == 1 )
							DB::table('users')->where('id', $req->user['id'])->update([ 'level' => 2 ] );	//	신입 회원 등급 상승	
						
					} else if (intval($req->od_step) == 60) { //	주문 취소시	쿠폰 부활
						$odc = DB::table('shop_order_coupon')->where('odc_od_id', $od_id)->first();
						if ($odc)
							DB::table('user_coupon')->where('uc_id', $odc->odc_uc_id)->update(['uc_is_use' => 'N']);
					}
				}

				if (intval($req->od_step) == 50) //	배송완료 시간 등록
					$od->od_dlvy_date = \Carbon\Carbon::now();
				
				if (intval($od->od_step) < 20)	//  재고 상품 구매시 수량 감소
					GoodsModel::minus_limit_ea($od_id);
						
				$od->od_step = $req->od_step;

			} else if ($req->type == 'odm_ea') {
				foreach ($req->order_purchase_at as $opa) {
					foreach ($opa['order_model'] as $odm) {
						$odModel = OrderModel::find($odm['odm_id']);
						$gapEa = $odModel->odm_ea - $odm['odm_ea'];
						if ($gapEa) {
							$odModel->odm_ea = $odm['odm_ea'];
							$odModel->save();
							if (DB::table('user_mileage')->where([['ml_tbl', 'shop_order_model'], ['ml_key', $odm['odm_id']]])->exists()) {
								$m = new \App\Models\UserMileage;
								$gapMileage = $m->mileage_calculation($odm['odm_price'], $gapEa, auth()->user()->level);
								event(new Mileage("insert", $req->created_id, 'shop_order_model', $odm['odm_id'], 'SV', '수량 변경', -$gapMileage));
							}
						}
					}
				}

				$gd = new Goods;
				$updated_item = $gd->getGoodsDataCollection($this->order->find($od_id), 'order');
				if ( gettype($updated_item) == 'string' && strpos($updated_item, 'goods null') === 0 )
					return response()->json(["message"=>$updated_item], 200);
				
				$od_rst = DB::table('shop_order')->where('od_id', $od_id)->update([
					'od_gd_price' 	=> $updated_item['price']['goods'],
					'od_surtax' 	=> $updated_item['price']['surtax'],
					'od_dlvy_price' => $updated_item['price']['dlvy_add_vat'],
					'od_air_price' 	=> $updated_item['price']['air_add_vat'],
					'od_all_price' 	=> $updated_item['price']['total'],
				] );
				
				foreach ($updated_item['lists'] as $k => $v) {
					DB::table('shop_order_purchase_at')
						->where('odpa_od_id', $od_id)
						->where('odpa_pa_id', $k)
						->update(['odpa_dlvy_p' => $v[0]['pa_dlvy_p']]);
				}

			} else if ($req->type == 'addr') {
				$od->od_receiver = $req->od_receiver;
				$od->od_receiver_hp = $req->od_receiver_hp;
				$od->od_zip = $req->od_zip;
				$od->od_addr1 = $req->od_addr1;
				$od->od_addr2 = $req->od_addr2;
			} else if ($req->type == 'dlvy') {
				foreach ($req->order_purchase_at as $opa) {
					foreach ($opa['order_model'] as $odm) {
						if ($odm['odm_type'] == 'MODEL' && $odm['dlvy_chk'] == 'Y') {
							foreach ($odm['order_dlvy_info'] as $dlvy_info) {
								if (array_key_exists('oddi_dlvy_created_at', $dlvy_info) && $dlvy_info['oddi_dlvy_created_at'] == 'delete')
									DB::table('shop_order_dlvy_info')->where('oddi_id', $dlvy_info['oddi_id'])->delete();
								else
									OrderDlvyInfo::updateOrCreate(
										['oddi_id' 					=> $dlvy_info['oddi_id']], 
										['oddi_odm_id' 		   		=> $dlvy_info['oddi_odm_id'],
											'oddi_dlvy_com' 	   	=> $dlvy_info['oddi_dlvy_com'],
											'oddi_dlvy_num'		   	=> $dlvy_info['oddi_dlvy_num'],
											'oddi_dlvy_created_at' 	=> \Carbon\Carbon::now()]
									);
							}
						}
					}
				}
			} else if ($req->type == 'dlvy_all') {
				foreach ($req->order_purchase_at as $opa) {
					foreach ($opa['order_model'] as $odm) {
						if ($odm['odm_type'] == 'MODEL' && $odm['dlvy_chk'] == 'Y') {
							DB::table('shop_order_dlvy_info')->where('oddi_odm_id', $odm['odm_id'])->delete();
							OrderDlvyInfo::insert([ 'oddi_odm_id' 		   => $odm['order_dlvy_info'][0]['oddi_odm_id'],
													'oddi_dlvy_com' 	   => $odm['order_dlvy_info'][0]['oddi_dlvy_com'],
													'oddi_dlvy_num'		   => $odm['order_dlvy_info'][0]['oddi_dlvy_num'],
													'oddi_dlvy_created_at' => \Carbon\Carbon::now()]
							);
						}
					}
				}
			} else if ($req->type == 'arrival') {
				foreach ($req->order_purchase_at as $opa) {
					foreach ($opa['order_model'] as $odm) {
						if ($odm['odm_type'] == 'MODEL' && $odm['dlvy_chk'] == 'Y') {
							if ( count($odm['order_dlvy_info']) == 1 ) {
								OrderDlvyInfo::updateOrCreate(
									['oddi_odm_id' => $odm['odm_id']], 
									['oddi_arrival_date'=> \Carbon\Carbon::now()]
								);
							} else {
								foreach ($odm['order_dlvy_info'] as $dlvy_info) {
									OrderDlvyInfo::updateOrCreate(
										['oddi_id' => $dlvy_info['oddi_id']], 
										['oddi_arrival_date'=> \Carbon\Carbon::now()]
									);
								}
							}
							
						}
					}
				}
			} else if ($req->type == 'dlvy_del') {
				foreach ($req->order_purchase_at as $opa)
					foreach ($opa['order_model'] as $odm)
						if ($odm['odm_type'] == 'MODEL' && $odm['dlvy_chk'] == 'Y')
							DB::table('shop_order_dlvy_info')->where('oddi_odm_id', $odm['odm_id'])->delete();
			} else if ($req->type == 'pay') {
				$od->od_pay_method = $req->od_pay_method;
			} else if ($req->type == 'od_sale_env') {
				$od->od_sale_env = $req->od_sale_env;
			} else if ($req->type == 'adm_memo') {
				if ( array_key_exists('oex_id', $req->order_extra_info) )
					$oex = $this->orderExtraInfo->find($req->order_extra_info['oex_id']);
				else {
					$oex = $this->orderExtraInfo;
					$oex->oex_od_id = $od_id;
				}
				$oex->oex_adm_memo = $req->order_extra_info['oex_adm_memo'];
				$oex->save();
			}
			$od->updated_id = auth()->user()->id;
			$od_rst = $od->save();
		}
		
	   	
		if ($od_rst)
            return response()->json(["message"=>"success"], 200);
        else
            return response()->json(["message"=>"Fail"], 500);
		/*
		$od = Order::find($od_id);
		$msg_type = 'success_msg';
		$oda_content = '';
		$msg = '수정요청이 정상 반영 됐습니다.';
		$oda_pg_msg = '';
		if ($req->submit_type == 'od_step') {
			if($od->od_id_papa && !$od->orderAnswer)
				abort('500', '수정요청을 응답하셔야 합니다.');
			DB::table('shop_order')->where('od_id', $od_id)->update(['od_step' => $req->od_step, 'od_mng' => auth()->user()->id, 'updated_id' => auth()->user()->id]);
			$msg = '주문 수정 완료';
		} else if ($req->submit_type == 'od_answer') {
			$oda_content = $req->oda_content;
			$od_papa = Order::find($od->od_id_papa);
			$diff_price = $od->od_all_price - $od_papa->od_all_price;
			switch ($od->od_step) {
				case '10':
					if ($req->oda_type == 'Y') {

					} else if ($req->oda_type == 'N') {
						$msg = "요청이 거절되어 주문이 취소 되었습니다.";
						$od->od_step = "82";
					}
				break;

				case '11':
					if ($req->oda_type == 'Y') {
						if ($diff_price > 0) {
							$this->addPay();	//	오버된 금액 추가 결제
							$od->od_step = "12";
							$msg .= " <br /><b>".number_format($diff_price)."</b>원을 추가 결제 해야 합니다.";
						} else if ($diff_price < 0) {
							if ($od->od_pay_method == "C") {
								if ($od->od_step < '30') {
									$oda_pg_msg = $this->cardRefund("PartialRefund", "배송전 부분 주문 취소", $od_papa->pg->pg_tid, $od->od_all_price, abs($diff_price));
									$resultMap = json_decode($oda_pg_msg, true);
						            if($resultMap['resultCode'] != '00')	abort('500', '카드 취소 오류');
									$od->od_step = "20";
									$msg .= "<br /><b>".number_format($diff_price)."</b>원이 카드 취소 됐습니다.";
								} else {
									$msg_type = 'fail_msg';
									$msg = "배송준비 이전에만 주문 수정이 가능합니다.";
								}
							} else {
								$od->od_step = "12";
								$msg .= "<br /><b>".number_format($diff_price)."</b>원을 환불(계좌이체) 해야 합니다.";
							}
						}
					} else if ($req->oda_type == 'N') {
						$msg = "요청이 거절되어 주문이 취소 되었습니다.";
						if ($od->od_pay_method == "C") {
							$oda_pg_msg = $this->cardRefund("Refund", "수정요청 거절 주문 취소", $od_papa->pg->pg_tid);
							$msg .= "<br /><b>".number_format($od_papa->od_all_price)."</b>원이 카드 취소 됐습니다.";
						} else {
							$msg .= "<br /><b>".number_format($od_papa->od_all_price)."</b>원을 환불(계좌이체) 해야 합니다.";
						}
						$od->od_step = "82";
					}
				break;

				default:  break;
			}
			$od->od_mng = $od->updated_id = auth()->user()->id;	//수정 시 관리자 기록
			$od->save();
			$ist_data = [ 	'oda_od_id'    => $od_id,
							'oda_type'     => $req->oda_type,
							'oda_price'    => $diff_price,
							'oda_pay_type' => $od->od_pay_method,
							'oda_content'  => $oda_content,
							'created_id'   => auth()->user()->id];
			if ($oda_pg_msg) $ist_data['oda_pg_msg'] = $oda_pg_msg;

			$oda_id = OrderAnswer::insertGetId($ist_data);
		} else if($req->submit_type == 'od_ea') {
			$od = Order::find($od_id);
			$odg_arr = OrderGoods::where("odg_od_id", $od_id)->get();
			// dd($odg_arr);
			foreach ($odg_arr as $odg) {
				$odm_arr = OrderModel::where([["odm_od_id", $od_id], ['odm_odg_id', $odg->odg_id]])->get();
				foreach ($odm_arr as $odm) {
					if ($odm->odm_ea != $req->odm_id[$odm->odm_id]) {
						$odm->odm_edit_gap = $req->odm_id[$odm->odm_id] - $odm->odm_ea;
					}
					$odm->odm_ea = $req->odm_id[$odm->odm_id];
					$odm->save();
				}
			}
			$od_info = getGoodsDataCollection($od, 'order');
			$od->od_gd_price = $od_info['price']['total_p'];
			$od->od_dlvy_price = $od_info['price']['dlvy_p'];
			$od->od_all_price = $od_info['price']['final_p'];
			$od->od_mng = $od->updated_id = auth()->user()->id;	//수정 시 관리자 기록
			$od->save();
		}
		return redirect()->route('admin.shop.order.show', $od_id)->with([$msg_type => $msg]);


		*/
    }

	public function cardRefund($type, $msg, $tid, $od_all_price=0, $diff_price=0) {
        $timestamp = date('YmdHis');
        $hashStr = $this->apiKey.$type."Card".$timestamp.\Request::ip().$this->mid.$tid;
		if ($type == 'PartialRefund') $hashStr .= $diff_price.$od_all_price;
        $hashData = $this->makeHash($hashStr, "sha512");
        $inputArray = array( 	"type" => $type,
					            "paymethod" => "Card",
					            "timestamp" => $timestamp,
					            "clientIp" => \Request::ip(),
					            "mid" => $this->mid,
					            "tid" => $tid,
					            "msg" => $msg,
					            "hashData" => $hashData);
		if ($type == 'PartialRefund') {
			$inputArray["price"] = $diff_price;
			$inputArray["confirmPrice"] = $od_all_price;
		}
        if ($this->processHTTP('https://iniapi.inicis.com/api/v1/refund', $inputArray)) { return $this->body;
        } else { abort('500', 'API 통신 오류'); }
	}
	public function addPay() {

	}

	public function delivery(Request $req, $dv) {
		$odm['dv_cp_list'] = DeliveryCompany::select("*")->get();
		$odm['req'] 	   = $req;
		if($req->update == "update") {
			if($dv == "4sc") {		//	$dv가 4sc면 우리가 발송 -> 택배회사이름, 송장번호, 조회버튼 표시
				$delivery_cd 	 = $req->delivery_cd;
				$delivery_number = $req->delivery_number;
			}
			if($dv == "maker") {	//	$dv가 maker면 직발송 -> 완료 표시
				$delivery_cd 	 = 0;
				$delivery_number = null;
			}
			OrderModel::updateOrCreate( [
				'odm_id' => $req->odm_id
			], [
				'odm_delivery_date' => $req->delivery_date,
				'odm_delivery_cd' 	=> $delivery_cd,
				'odm_delivery_num' 	=> $delivery_number,
				'odm_delivery_yn' 	=> 'Y' ]);
			return redirect()->route('admin.shop.order.show', $req->odm_od_id);
		}
		return view('admin.shop.order.delivery', $odm);
	}

	public function destroy($id) {
        DB::table('shop_order')->where('od_id', $id)->update(['updated_id'=>auth()->user()->id, 'deleted_at' => \Carbon\Carbon::now()]);
    }
}
