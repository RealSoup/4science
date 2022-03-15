<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Maker, QuoteReq, QuoteReply};
use Illuminate\Support\Facades\DB;

class QuoteController extends Controller {


	public function index(Request $req) {
		$params = $input = $req->input();

        $params['makers'] = Maker::orderBy('mk_name')->get(); //  상품등록시 제조사 연결
// DB::enableQueryLog();
		// $params['list'] = QuoteReq::select('qq_id', 'qq_name', 'qq_content', 'qr_step', 'shop_quote_req.created_at', 'shop_quote_reply.created_id AS mng_id')
		// 							->leftJoin('shop_quote_reply', 'shop_quote_reply.qr_qq_id', '=', 'shop_quote_req.qq_id')
		// 							->latest('shop_quote_req.created_at')->paginate()->onEachSide(1);
		$params['list'] = QuoteReq::latest()->paginate()->onEachSide(1);
        $params['list']->appends($input)->links();
// dd(DB::getQueryLog());
		return view("admin.shop.quote.index", $params);
    }

	public function show($id, $type='req'){
		$params['type'] = $type;
		if ($type === 'req') 		$params['cont'] = QuoteReq::findOrFail($id);
		else if ($type === 'reply')	$params['cont'] = QuoteReply::findOrFail($id);
		return view("admin.shop.quote.show", $params);
	}


	public function create($qq_id=NULL) {

        $params['act_nm'] = 'create';
		$params['qq_id'] = $qq_id;
		if ($qq_id) {
			$params['cont'] = QuoteReq::find($qq_id);
			$params['cont']->quoteModel;
			if($params['cont']->quoteModel()->exists()){      //  뷰에서 기본 빈값인풋을 출력하기위한 빈값
	            foreach ($params['cont']->quoteModel as $key => $value) {
					if ($value->qm_catno01) $value->qm_catno = $value->qm_catno01;
					if ($value->qm_catno02) $value->qm_catno .= '-'.$value->qm_catno02;
					if ($value->qm_catno03) $value->qm_catno .= '-'.$value->qm_catno03;
	            }
	        } else {dd($params);
				$params['cont']->quoteModel[0] = new class{};
	            $params['cont']->quoteModel[0]->qq_sms_yn           = NULL;
	            // $params['goods']->option[0]->op_order       = NULL;
	            // $params['goods']->option[0]->op_name        = NULL;
	            // $params['goods']->option[0]->op_required    = 'N';
	            // $params['goods']->option[0]->optionChild[0] = new class{};
	            // $params['goods']->option[0]->optionChild[0]->opc_id     = NULL;
	            // $params['goods']->option[0]->optionChild[0]->opc_order  = NULL;
	            // $params['goods']->option[0]->optionChild[0]->opc_name   = NULL;
	            // $params['goods']->option[0]->optionChild[0]->opc_price  = NULL;
			}
		} else {
			//  뷰에서 기본 빈값인풋을 출력하기위한 빈값
			$params['cont'] = new class{};
			$params['cont']->qq_sms_yn = NULL;
			$params['cont']->quoteModel = collect([new class{}]);
	        $params['cont']->quoteModel[0]->qm_gd_id = 0;
		}


		//견적유효기간(현재시간 +2주)
        $plus_day = cache("config.quote")->expiration_term;
        $params['cont']->qr_effective_date = date("Y-m-d", strtotime("+ ".$plus_day."day", time()));




		// dump($params['cont']);
		// dd($params['cont']);
        return view("admin.shop.quote.form", $params);
    }


    public function store(Request $req) {

		if (!isset($req->qq_id))	//	임의 견적이라면 요청자정보 넣고 qq_id 생성 및 req Array에 추가
			$qq_id = DB::table('shop_quote_req')->insertGetId($this->quoteReq_paramImplant($req));

		$qr_id = DB::table('shop_quote_reply')->insertGetId([
			'qr_qq_id' 			=> $req->filled('qq_id')				? $req->qq_id				: NULL,
			'qr_step' 			=> $req->act_type == 'compl'			? 1							: 0,
			'qr_content' 		=> $req->filled('qr_content')			? $req->qr_content			: NULL,
			'qr_dlvy_date' 		=> $req->filled('qr_dlvy_date')			? $req->qr_dlvy_date		: NULL,
			'qr_effective_date' => $req->filled('qr_effective_date')	? $req->qr_effective_date	: NULL,
			'qr_order_yn' 		=> 'N',
			'created_id' 		=> auth()->user()->id,
			'ip' 				=> $req->ip() ]);
		$req->request->add(['qm_parent_id' =>$qr_id]);
		DB::table('shop_quote_model')->insert($this->quoteModel_paramImplant($req));

		$q_opt_array = Array();
		foreach ($req->qo_name as $key => $qo_name) {
			$q_opt_array[] = [
				'qo_parent_id' 	=> $qr_id,
				'qo_type' 		=> config('const.tbl_alias.quote_reply'),
				'qo_gd_id' 		=> $req->filled('qo_gd_id') 	? $req->qo_gd_id[$key] 		: NULL,
				'qo_opc_id' 	=> $req->filled('qo_opc_id') 	? $req->qo_opc_id[$key] 	: NULL,
				'qo_name' 		=> $req->filled('qo_name') 		? $req->qo_name[$key] 		: NULL,
				'qo_ea' 		=> $req->filled('qo_ea') 		? $req->qo_ea[$key] 		: NULL,
				'qo_price' 		=> $req->filled('qo_price') 	? $req->qo_price[$key] 		: NULL
			];
		}
		DB::table('shop_quote_option')->insert($q_opt_array);
	   	return redirect()->route('admin.shop.quote.index');
    }

	public function quoteReq_paramImplant($req){
        return [
			'qq_1depth' 	=> $req->filled('qq_1depth') 		? $req->qq_1depth 		: NULL,
			'qq_name' 		=> $req->filled('qq_name') 			? $req->qq_name 		: NULL,
			'qq_department' => $req->filled('qq_department') 	? $req->qq_department 	: NULL,
			'qq_email' 		=> $req->filled('qq_email') 		? $req->qq_email 		: NULL,
			'qq_tel' 		=> $req->filled('qq_tel') 			? $req->qq_tel 			: NULL,
			'qq_fax' 		=> $req->filled('qq_fax') 			? $req->qq_fax 			: NULL,
			'qq_hp' 		=> $req->filled('qq_hp') 			? $req->qq_hp 			: NULL,
			'qq_content' 	=> $req->filled('qq_content') 		? $req->qq_content 		: NULL,
			'qq_sms_yn' 	=> $req->filled('qq_sms_yn') 		? $req->qq_sms_yn 		: 'Y',
			'created_id' 	=> auth()->user()->id,
			'ip' 			=> $req->ip()
        ];
    }
	public function quoteModel_paramImplant($req){
		$return_array = array();
		foreach ($req->qm_name as $key => $qm_name) {
			$qm_catno01 = $qm_catno02 = $qm_catno03 = 0;
			if ($req->filled('qm_catno')) {
				$qm_catno = explode('-', $req->qm_catno[$key]);
				$qm_catno01 = $qm_catno[0]; $qm_catno02 = $qm_catno[1]; $qm_catno03 = $qm_catno[2];
			}
			$return_array[] = [
				'qm_parent_id' 	=> $req->filled('qm_parent_id') 	? $req->qm_parent_id 		: 0,
				'qm_type' 		=> config('const.tbl_alias.quote_reply'),
				'qm_gd_id' 		=> $req->filled('qm_gd_id') 		? $req->qm_gd_id[$key] 		: NULL,
				'qm_gm_id' 		=> $req->filled('qm_gm_id') 		? $req->qm_gm_id[$key] 		: NULL,
				'qm_name' 		=> $req->filled('qm_name') 			? $req->qm_name[$key] 		: NULL,
				'qm_catno01' 	=> $qm_catno01,
				'qm_catno02' 	=> $qm_catno02,
				'qm_catno03' 	=> $qm_catno03,
				'qm_code' 		=> $req->filled('qm_code') 			? $req->qm_code[$key] 		: NULL,
				'qm_unit' 		=> $req->filled('qm_unit') 			? $req->qm_unit[$key] 		: NULL,
				'qm_maker' 		=> $req->filled('qm_maker') 		? $req->qm_maker[$key] 		: NULL,
				'qm_spec' 		=> $req->filled('qm_spec') 			? $req->qm_spec[$key] 		: NULL,
				'qm_ea' 		=> $req->filled('qm_ea') 			? $req->qm_ea[$key] 		: NULL,
				'qm_cost_price' => $req->filled('qm_cost_price') 	? preg_replace("/[^0-9]/", "", $req->qm_cost_price[$key]) : NULL,
				'qm_dc_rate' 	=> $req->filled('qm_dc_rate') 		? $req->qm_dc_rate[$key] 	: NULL,
				'qm_price' 		=> $req->filled('qm_price') 		? preg_replace("/[^0-9]/", "", $req->qm_price[$key]) 		: NULL,
				'qm_dlvr_date' 	=> $req->filled('qm_dlvr_date') 	? $req->qm_dlvr_date[$key] 	: NULL,
				'qm_content' 	=> $req->filled('qm_content') 		? $req->qm_content[$key] 	: NULL,
			];
		}
		// dd($return_array);
        return $return_array;
    }
    //
	// public function update(SaveMakerRequest $request, $mk_id) {
	// 	$maker = Maker::updateOrCreate(
	// 		['mk_id' => $mk_id],
	// 		[ 	'mk_name' => $request->mk_name,
	// 			'created_id'    => auth()->user()->id,
	//             'ip'            => $request->ip()  ]
	// 	);
	// 	if ($maker->mk_id) Session::flash('message', '제조사 수정 성공');
    //     else Session::flash('message', '제조사 수정 실패');
	//    	return redirect()->route('admin.shop.maker.index');
    // }
    //
    // public function destroy($mk_id) {
	// 	if(Maker::destroy($mk_id)) Session::flash('message', '제조사 삭제 성공');
	// 	else Session::flash('message', '제조사 삭제 실패');
    //     return redirect()->route('admin.shop.maker.index');
    // }
}
