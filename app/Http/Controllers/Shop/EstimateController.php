<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop\{EstimateReq, EstimateReply, EstimateModel, EstimateOption, Goods};
use App\Models\{FileInfo};
use App\Http\Requests\StoreEstimateReq;
use Illuminate\Support\Arr;
use DB;

class EstimateController extends Controller {

    public function index(EstimateReq $eq, Request $req) {
        if ($req->filled('startDate'))  $eq = $eq->StartDate($req->startDate);
        if ($req->filled('endDate'))  	$eq = $eq->EndDate($req->endDate);

        $eq = $eq->with('estimateReply')->CreatedId(auth()->user()->id)->latest();

        $eq->when(request('type', 'with_em'), fn ($q) => $q->with('estimateModel'));
        
        if ($req->filled('limit'))
            $eq = $eq->limit($req->limit)->get();
        else {
            $eq = $eq->paginate();
            $eq->appends($req->all())->links();
		}
        return response()->json($eq, 200);
    }

    public function create(Goods $gd, Request $req) {
        $params = null;
        if ($req->filled('goods'))
            $params = $gd->getGoodsDataCollection($req);
        return response()->json($params);
    }

    public function store(StoreEstimateReq $req) {
        $eq_title = '';
        $item_cnt = 0;
        if ($req->filled('lists') && count($req->lists)) {
            foreach ($req->lists as $pa_group) {    //  주문 갯수
                foreach ($pa_group as $item){
                    if ($eq_title == '')
                        $eq_title = $item['gd_name'];
                    if ( $item['type'] == 'model' )
                        $item_cnt++;
                }
            }
            if ($item_cnt > 1)
                $eq_title .= '외 ['.($item_cnt - 1).']';
        } else {
            if ($req->filled('eq_1depth'))
                $eq_title = "<b>[{$req->eq_1depth}]</b> ";
            if (mb_strlen($req->eq_content, "UTF-8")>70)
                $eq_title .= iconv_substr($req->eq_content, 0, 70, "UTF-8")."...";
            else
                $eq_title .= $req->eq_content;
        }

        $eq_id = EstimateReq::insertGetId([
            "eq_type"       => 'REQ',
            "eq_title"      => $eq_title,
            "eq_name"       => $req->filled('eq_name')          ? $req->eq_name         : '',
            "eq_email"      => $req->filled('eq_email')         ? $req->eq_email        : '',
            "eq_tel"        => $req->filled('eq_tel')           ? $req->eq_tel          : '',
            "eq_fax"        => $req->filled('eq_fax')           ? $req->eq_fax          : '',
            "eq_hp"         => $req->filled('eq_hp')            ? $req->eq_hp           : '',
            "eq_department" => $req->filled('eq_department')    ? $req->eq_department   : '',
            "eq_1depth"     => $req->filled('eq_1depth')        ? $req->eq_1depth       : '',
            "eq_content"    => $req->filled('eq_content')       ? $req->eq_content      : '',
            'ip'            => $req->ip(),
            'created_id'    => auth()->check() ? auth()->user()->id : 0
        ]);

        if ($req->filled('lists')) {
            foreach ($req->lists as $pa_id => $pa) {
                foreach (collect($pa)->groupBy('gd_id') as $goods) {
                    foreach ($goods as $item) {
                        if ($item['type'] == 'model') {
                            $em_id = EstimateModel::insertGetId([
                                'em_type'       => 'estimateReq',
                                'em_model_type' => 'MODEL',
                                'em_papa_id'    => $eq_id,
                                'em_gd_id'      => $item['gd_id'],
                                'em_gm_id'      => $item['gm_id'],
                                'em_name'       => $item['gm_name'],
                                'em_catno'      => $item['gm_catno'],
                                'em_code'       => $item['gm_code'],
                                'em_unit'       => $item['gm_unit'],
                                'em_spec'       => $item['gm_spec'],
                                'em_maker'      => $item['mk_name'],
                                'em_ea'         => $item['ea'],
                                'em_cost_price' => $item['price'],
                                'em_price'      => $item['price'],
                            ]);
                        } else if ($item['type'] == 'option') {
                            EstimateOption::insert([
                                'eo_em_id'  => $em_id,
                                'eo_gd_id'  => $item['gd_id'],
                                'eo_goc_id' => $item['goc_id'],
                                'eo_tit'    => $item['go_name'],
                                'eo_name'   => $item['goc_name'],
                                'eo_ea'     => $item['ea'],
                                'eo_price'  => $item['price'],
                            ]);
                        }
                    }
                }
            }
        }
        if ($eq_id) return response()->json($eq_id, 200);
    }

    public function reEstimate(Request $req) {
        $eq_title = Arr::first($req->estimate_model, function ($v, $k) { return $v['em_check_opt'] == 'Y'; })['em_name'];
        $em_cnt = count(Arr::where($req->estimate_model, function ($v, $k) { return $v['em_check_opt'] == 'Y'; }));
        $eq_title .= $em_cnt >= 2 ? '외 ['.($em_cnt - 1).']' : '';

        $eq_id = EstimateReq::insertGetId([
            "eq_type"       => 'REREQ',
            "eq_title"      => $eq_title,
            "eq_name"       => $req->estimate_req['eq_name'],
            "eq_email"      => $req->estimate_req['eq_email'],
            "eq_tel"        => $req->estimate_req['eq_tel'],
            "eq_fax"        => $req->estimate_req['eq_fax'],
            "eq_hp"         => $req->estimate_req['eq_hp'],
            "eq_department" => $req->estimate_req['eq_department'],
            "eq_1depth"     => $req->estimate_req['eq_1depth'],
            "eq_content"    => $req->eq_content,
            'ip'            => $req->ip(),
            'created_id'    => auth()->check() ? auth()->user()->id : 0
        ]);


        foreach ($req->estimate_model as $em) {
            if ($em['em_check_opt'] == 'Y') {
                $em_id = EstimateModel::insertGetId([
                    'em_type'       => 'estimateReq',
                    'em_papa_id'    => $eq_id,
                    'em_gd_id'      => $em['em_gd_id'],
                    'em_gm_id'      => $em['em_gm_id'],
                    'em_name'       => $em['em_name'],
                    'em_catno'      => $em['em_catno'],
                    'em_code'       => $em['em_code'],
                    'em_unit'       => $em['em_unit'],
                    'em_spec'       => $em['em_spec'],
                    'em_maker'      => $em['em_maker'],
                    'em_ea'         => $em['em_ea'],
                    'em_cost_price' => $em['em_cost_price'],
                    'em_price'      => $em['em_price'],
                    'em_dlvy_at'    => $em['em_dlvy_at'],
                ]);
                foreach ($em['estimate_option'] as $eo) {
                    if ($eo['eo_check_opt'] == 'Y') {
                        EstimateOption::insert([
                            'eo_em_id'  => $em_id,
                            'eo_gd_id'  => $eo['eo_gd_id'],
                            'eo_opc_id' => $eo['eo_opc_id'],
                            'eo_tit'    => $eo['eo_tit'],
                            'eo_name'   => $eo['eo_name'],
                            'eo_ea'     => $eo['eo_ea'],
                            'eo_price'  => $eo['eo_price'],
                        ]);
                    }
                }
            }
        }
        if ($eq_id) return response()->json("success", 200);
    }

    public function fiKeySet($fi_ids, $eq_id) {
        if ($fi_ids){
			foreach ($fi_ids as $fi_id) {
				$finfo = FileInfo::findOrFail($fi_id['fi_id']);
				$finfo->fi_key	= $eq_id;
				$finfo->save();
			}
		}
    }

    public function show(EstimateReq $eq, $eq_id) {
        $eq = $eq->find($eq_id);
        foreach ($eq->estimateModel as $v) {
            $v->goods;
            $v->estimateOption;
        }
        foreach ($eq->estimateReply as $v) {
            foreach ($v->estimateModel as $v2) {
                $v2->goods;
                $v2->estimateOption;
            }
        }
        return response()->json($eq, 200);
    }


    public function replyShow(EstimateReply $er, $er_id) {
        $er = $er->find($er_id);
        $er->user;
        $er->estimateReq;
        foreach ($er->estimateModel as $v) {
            if ($v->goods)
                $v->goods->purchaseAt;
            $v->estimateOption;
        }
        return response()->json($er, 200);
    }

    public function printEstimate(int $er_id) {
        return view('admin.estimate.pdf.estimate', ['er' => EstimateReply::find($er_id), 'type'=>'print']);
	}

}
