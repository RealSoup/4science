<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Requests\SaveMakerRequest;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Shop\{Order, OrderModel, OrderGoods, OrderOption, OrderExtraInfo, DeliveryCompany, Maker, Category, Goods, OrderAnswer, OrderAddRefundPay};
use App\Models\{User, UserMng, FileNote};
// use App\Traits\{InicisUtil, InicisHttpClient};
use Illuminate\Support\Facades\Storage;
use Mail;
use DateTime;
use Session;
use DB;

use App\Exports\OrderEstimateExport;
use App\Exports\OrderTransactionExport;
use Maatwebsite\Excel\Facades\Excel;
use PDF;
use App\Mail\TransactionSend;

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
		$data['order_config'] = $this->order->getOrderConfig();
		$data['mng'] = $this->user::has('UserMng')->get();
		foreach ($data['mng'] as $u)
			$u->userMng;


		//if ($request->filled('mk_name'))   $makers = $makers->Sch_Mk_name($request->mk_name);
		$orders = $this->order->with('orderGoods')->with('orderExtraInfo')->select("shop_order.*",
										DB::raw("(SELECT name FROM la_users
										WHERE la_users.id = la_shop_order.od_mng) as od_mng_nm"),);
					// ->join('users', 'users.id', '=', 'shop_order.created_id');

		if (isset($data['startDate']))  $orders = $orders->SchStartDate($data['startDate'].' 00:00:00');
        if (isset($data['endDate']))  	$orders = $orders->SchEndDate($data['endDate'].' 23:59:59');
		if (isset($data['od_type']))    $orders = $orders->SchType($data['od_type']);
		if (isset($data['od_pay_method']))    $orders = $orders->SchPayMethod($data['od_pay_method']);
		if (isset($data['od_step']))   $orders = $orders->SchStep($data['od_step']);
        if (isset($data['od_mng']))    $orders = $orders->SchManager($data['od_mng']);
		if (isset($data['startPrice'])) $orders = $orders->SchStartPrice(preg_replace('/\D/', '', $data['startPrice']));
		if (isset($data['endPrice'])) $orders = $orders->SchEndPrice(preg_replace('/\D/', '', $data['endPrice']));
        if (isset($data['um_group'])) $orders = $orders->SchMngGroup(UserMng::Group($data['um_group'])->pluck('um_user_id'));
		if (isset($data['writer'])) $orders = $orders->SchWriter($data['writer']);


        if (isset($data['keyword'])){
            switch ($data['mode']) {
				case 'od_orderer':			$orders = $orders->SchOrderer($data['keyword']); break;
				case 'orderer_email':		$orders = $orders->SchWriterArr($this->user::SchEmail($data['keyword'])->pluck('id')); break;
				case 'orderer_hp':		$orders = $orders->SchOrdererHp($data['keyword']); break;
				case 'od_no':			$orders = $orders->SchOdNo($data['keyword']); break;
				case 'od_id':			$orders = $orders->SchOdId($data['keyword']); break;
				case 'od_receiver':			$orders = $orders->SchReceiver($data['keyword']); break;
				case 'od_addr1':			$orders = $orders->SchAddr1($data['keyword']); break;

				case 'oex_depositor':			$orders = $orders->SchOdIdArr($this->orderExtraInfo::Depositor($data['keyword'])->pluck('oex_od_id')); break;
				case 'gm_name':			$orders = $orders->SchAddr1($data['keyword']); break;
				case 'gm_code':			$orders = $orders->SchAddr1($data['keyword']); break;
				case 'catno':			$orders = $orders->SchAddr1($data['keyword']); break;


				case 'orderer_department':	$orders = $orders->SchOrdererId($this->user::SchDepartment($data['keyword'])->pluck('id')); break;

				// case 'gd_name':
				//
				// 	$orders = $orders->join(
				// 		DB::raw("
				// 			(	SELECT ODM.odm_od_id
				// 				FROM sc_shop_order_model AS ODM
				// 					join sc_shop_goods_model AS GM ON GM.gm_id = ODM.odm_gm_id
				// 				WHERE GM.gm_name LIKE '%".$data['keyword']."%'
				// 				GROUP BY ODM.odm_od_id
				// 			) AS sc_gm_tb"
				// 		), function($join) {
				// 		   $join->on('shop_order.od_id', '=', 'gm_tb.odm_od_id');
				// 		}
				// 	);
				//
				// break;
				// case 'od_no':			$orders = $orders->SchOd_no($data['keyword']); break;
                case 'od_user':     	$orders = $orders->SchOd_orderer($data['keyword']); break;
				case 'od_depositor':    $orders = $orders->SchDepositor($data['keyword']); break;
				case 'department':    	$orders = $orders->SchDepartment($this->user::SchDepartment($data['keyword'])->pluck('id')); break;
				// case 'od_addr':		$orders = $orders->SchOd_addr($data['keyword']); break;
				// case 'od_hp':		$orders = $orders->SchOd_hp($data['keyword']); break;
                default:
                    $orders = $orders->where(function($query) use ($data){
                        $query->SchOd_no($data['keyword'])->orWhere(function (Builder $query) use ($data) {
                            $query->SchOd_orderer($data['keyword']);
                        })->orWhere(function (Builder $query) use ($data) {
                            $query->SchOd_addr($data['keyword']);
                        })->orWhere(function (Builder $query) use ($data) {
                            $query->SchOd_hp($data['keyword']);
                        });
                    });
                break;
            }
        }

		if ($req->filled('limit'))
            $data['list'] = $orders->latest('od_id')->limit($req->limit)->get();
        else {
			$data['list'] = $orders->latest('od_id')->paginate();
			$data['list']->appends($input)->links();
		}

		// foreach ($data['list'] as $od) {
		// 	$od->orderGoods;
		// 	// $od->od_mng = $this->user::find($od->od_mng);
		// }

		// $data['steps'] = Setting::Group("od_step")->orderBy("st_sort")->get();
		// $data['manager'] = User::Manager()->orderBy("name")->get();
		// dump($data);
		return response()->json($data);
    }
	
	public function store (Request $req) {
		// dd(collect($req->estimate_model)->groupBy('em_gd_id'));
		$eq_title = $req->estimate_model[0]['em_name'].'외 ['.(count($req->estimate_model) - 1).']';
		$od_id = $this->order->insertGetId([
			'od_no'            => $req->filled('od_no')            ? $req->od_no            : 0,
			'od_name'          => $eq_title,
			'od_type'          => 'buy_temp',
			'od_step'          => '10',
			'od_gd_price'      => $req->filled('er_gd_price')		? $req->er_gd_price   : 0,
			'od_surtax'        => $req->filled('er_surtax')            ? $req->er_surtax          : 0,
			'od_dlvy_price'    => $req->filled('er_dlvy_price')            ? $req->er_dlvy_price    : 0,
			'od_air_price'     => $req->filled('er_air_price') ? $req->er_air_price     : 0,
			'od_all_price'     => $req->filled('er_all_price') ? $req->er_all_price           : 0,
			'od_orderer'       => $req->filled('estimate_req')       ? $req->estimate_req['eq_name']       : '',
			'od_orderer_hp'    => $req->filled('estimate_req')    ? $req->estimate_req['eq_hp']    : '',
			'od_orderer_email' => $req->filled('estimate_req') ? $req->estimate_req['eq_email'] : '',
			'od_receiver'      => $req->filled('estimate_req')       ? $req->estimate_req['eq_name']       : '',
			'od_receiver_hp'   => $req->filled('estimate_req')    ? $req->estimate_req['eq_hp']    : '',
			'od_zip'           => $req->filled('od_zip')           ? $req->od_zip           : '',
			'od_addr1'         => '',
			'od_addr2'         => '',
			'od_memo'          => '',
			'od_pay_method'    => NULL,
			'od_sale_env'      => NULL,
			'ip'               => NULL,
			'created_id'       => auth()->user()->id
		], 'od_id');

		foreach (collect($req->estimate_model)->groupBy('em_gd_id') as $gd_id => $gd) {
			$odg_id = 0;
			foreach ($gd as $seq => $em) {
				if ($seq == 0) {
					$odg_id = OrderGoods::insertGetId([
						'odg_od_id'     => $od_id,
						'odg_gd_id'     => $gd_id,
						'odg_gd_name'   => $em['em_name'],
					], 'odg_id');
				}
				OrderModel::insert([
					'odm_od_id'     => $od_id,
					'odm_odg_id'    => $odg_id,
					'odm_gm_id'     => $em['em_gm_id'],
					'odm_gm_catno'  => $em['em_catno'],
					'odm_gm_name'   => $em['em_name'],
					'odm_gm_code'   => $em['em_code'],
					'odm_gm_spec'   => $em['em_spec'],
					'odm_gm_unit'   => $em['em_unit'],
					'odm_ea'        => $em['em_ea'],
					'odm_price'     => $em['em_price']
				]);

				foreach ($em['estimate_option'] as $eo) {
					OrderOption::insert([
						'odo_od_id'     => $od_id,
						'odo_odg_id'    => $odg_id,
						'odo_opc_id'    => $eo['eo_opc_id'],
						'odo_opc_name'  => $eo['eo_tit']." ".$eo['eo_name'],
						'odo_ea'        => $eo['eo_ea'],
						'odo_price'     => $eo['eo_price']
					]);
				}
			}
		}
	}

	public function edit($od_id) {
		// $params['dlvy_url'] = "https://b2c.goodsflow.com/zkm/V1/whereis/";
		// $params['site_code'] = config('const.dlvy.siteCode');
		// $params['dlvy_com_code'] = config('const.dlvy.dlvyComCode');
		// $params['refund_bank_code'] = config('const.iamport.bank_code');
		$data = $this->order->select("shop_order.*",
										DB::raw("(SELECT name FROM la_users
										WHERE la_users.id = la_shop_order.od_mng) as od_mng_nm"),)->find($od_id);

		$gd = new Goods;
		$data->pa_list = $gd->getGoodsDataCollection($data, 'order');
		// dd($data->pa_list->toArray());
		// foreach ($data->orderGoods as $odg) {
		// 	$odg->goods;
		// 	foreach ($odg->orderModel as $odm) $odm->goodsModel;
		// 	foreach ($odg->orderOption as $odo) $odo->optionChild;
		// }

		$data->orderExtraInfo;
		// $data->fileInfo;
		if ($data->orderExtraInfo && !$data->orderExtraInfo->oex_biz_name) $data->fileInfo;


		// $params['user'] = User::find($params['od']->created_id);
		// dump($data);
		
		$data['order_config'] = $this->order->getOrderConfig();
		return response()->json($data, 200);
	}

	public function exportEstimateExcel(int $od_id) {
		return Excel::download(new OrderEstimateExport($od_id), 'order.xlsx');
	}

	public function exportEstimatePdf(int $od_id) {
		return PDF::loadView('admin.order.pdf.order_estimate', ['od' => Order::find($od_id)])
				->download('order.pdf'); // ->stream();
	}

	public function exportTransactionExcel(int $od_id) {
		return Excel::download(new OrderTransactionExport($od_id), 'order.xlsx');
	}

	public function exportTransactionPdf(Request $req, int $od_id) {
		if ($req->filled('trans_date')) {
			$subject = '거래명세서 메일입니다.';
			$content = '이용해주셔서 감사합니다.';
			$to_email = $req->trans_email;
			$pdf = PDF::loadView('admin.order.pdf.order_transaction', ['od' => Order::find($od_id)]);
			// $pdf->setOptions(['dpi' => 96 ]);
			$filename = uniqid();
			Storage::put('public/estimatePdf/'.$filename.'.pdf', $pdf->output());
			return Mail::to($to_email)->queue(new TransactionSend(cache('biz')->email, $subject, $content, public_path('storage/estimatePdf/'.$filename.'.pdf')));
		} else {
			return PDF::loadView('admin.order.pdf.order_transaction', ['od' => Order::find($od_id)])
				// ->download('order.pdf');
				->stream();
		}
	}



	public function update(Request $req, $od_id) {
		// dd($req->all());
		$od = $this->order->find($od_id);
		if ($req->filled('type')) {
			if 		($req->type == 'od_mng' && 	$req->filled('od_mng')) 	$od->od_mng = $req->od_mng;
			else if ($req->type == 'od_step' && $req->filled('od_step'))	$od->od_step = $req->od_step;
			else if ($req->type == 'odm_ea') {
				foreach ($req->pa_list['lists'] as $pa) {
					foreach ($pa['list'] as $gd) {
						foreach ($gd['goods_model'] as $gm)
							DB::table('shop_order_model')->where('odm_id', $gm['odm_id'])->update(['odm_ea' => $gm['ea']]);
					}
				}
				$gd = new Goods;
				$updated_item = $gd->getGoodsDataCollection($this->order->find($od_id), 'order');
				$od_rst = DB::table('shop_order')->where('od_id', $od_id)->update([
					'od_gd_price' 	=> $updated_item['price']['goods'],
					'od_surtax' 	=> $updated_item['price']['surtax'],
					'od_dlvy_price' => $updated_item['price']['dlvy_add_vat'],
					'od_air_price' 	=> $updated_item['price']['air_add_vat'],
					'od_all_price' 	=> $updated_item['price']['total'],
				] );
			} else if ($req->type == 'addr') {
				
				$od->od_receiver = $req->od_receiver;
				$od->od_receiver_hp = $req->od_receiver_hp;
				$od->od_zip = $req->od_zip;
				$od->od_addr1 = $req->od_addr1;
				$od->od_addr2 = $req->od_addr2;
			}
			$od_rst = $od->save();
		}
		
	   	
		if ($od_rst)
            return response()->json(["msg"=>"success"], 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
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
}
