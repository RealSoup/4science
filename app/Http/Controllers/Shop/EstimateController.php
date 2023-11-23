<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{FileInfo};
use App\Models\Shop\{EstimateReq, EstimateReply, EstimateModel, EstimateOption, EstimateCustom, Goods, Cart};
use App\Http\Requests\StoreEstimateReq;
use Illuminate\Support\Arr;
use DB;
use App\Mail\EstimateReq AS MailEstimateReq;
use Mail;

class EstimateController extends Controller {

    public function index(EstimateReq $eq, Request $req) {
        if ($req->filled('startDate'))  $eq = $eq->StartDate($req->startDate);
        if ($req->filled('endDate'))  	$eq = $eq->EndDate($req->endDate);

        $eq = EstimateReq::with('estimateReplyCplt')->CreatedId(auth()->user()->id)->latest();

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

    public function store(Request $req) {        
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

            if(strpos( $req->eq_content, "계약 기간" ) === 0){
                $eq_title = "<b>[ 렌탈 ]</b> {$eq_title}";
            }
            
        } else {
            if ($req->filled('made_name'))   $eq_title = "<b>[ 주문제작-{$req->made_name} ]</b> ";
            else if ($req->filled('eq_1depth'))      $eq_title = "<b>[{$req->eq_1depth}]</b> ";

            if (mb_strlen($req->eq_content, "UTF-8")>70) $eq_title .= iconv_substr($req->eq_content, 0, 70, "UTF-8")."...";
            else $eq_title .= $req->eq_content;
        }

        $eq_id = EstimateReq::insertGetId([
            "eq_type"       => 'REQ',
            "eq_title"      => $eq_title,
            "eq_name"       => $req->filled('eq_name')          ? $req->eq_name         : '',
            "eq_email"      => $req->filled('eq_email')         ? $req->eq_email        : '',
            "eq_tel"        => $req->filled('eq_tel')           ? $req->eq_tel          : '',
            "eq_fax"        => $req->filled('eq_fax')           ? $req->eq_fax          : '',
            "eq_hp"         => $req->filled('eq_hp')            ? $req->eq_hp           : '',
            "eq_company"    => $req->filled('eq_company')       ? $req->eq_company      : '',
            "eq_1depth"     => $req->filled('eq_1depth')        ? $req->eq_1depth       : '',
            "eq_content"    => $req->filled('eq_content')       ? $req->eq_content      : '',
            "eq_env"        => saleEnv(),
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
                                'em_papa_id'    => $eq_id,
                                'em_gd_id'      => $item['gd_id'],
                                'em_gm_id'      => $item['gm_id'],
                                'em_title'      => $item['gd_name'],
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
                            if(auth()->check())
                                Cart::Target(auth()->user()->id, $item['gd_id'], $item['gm_id'], 'MODEL')->delete();
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
                            if(auth()->check())
                                Cart::Target(auth()->user()->id, $item['gd_id'], $item['goc_id'], 'OPTION')->delete();
                        }
                    }
                }
            }
        } else if ($req->filled('made_name')) {
            foreach ($req->label as $k => $v) {
                EstimateCustom::insert([
                    'ec_eq_id' => $eq_id,
                    'ec_seq'   => $k,
                    'ec_label' => $v,
                    'ec_val'   => array_key_exists($k, $req->val) ? $req->val[$k] : NULL,
                ]);
            }
        }

        $eq_name = $req->filled('eq_name') ? $req->eq_name : auth()->user()->name;
        $eq_email = $req->filled('eq_email') ? $req->eq_email : auth()->user()->email;
        $subject = "[4science] 견적 접수 안내 메일";
        $params['eq_name'] = $eq_name;
        $params['eq_id'] = $eq_id;
        try {
            Mail::to(trim($eq_email))->queue(new MailEstimateReq(config('mail.mailers.smtp.username'), $subject, $params));
        } catch(\Swift_TransportException $e){
            // if($e->getMessage()) dd($e->getMessage());
        }
        
        if ($eq_id) return response()->json($eq_id, 200);
    }

    public function reEstimate(Request $req) {
        $eq_title = '';
        foreach ($req->collect['lists'] as $v) {
            $eq_title = Arr::first($v, function ($v1, $k1) { return $v1['em_check_opt']; })['gm_name'];
            if ($eq_title != '') break;
        }        
        $em_cnt = 0;
        foreach ($req->collect['lists'] as $v)
            $em_cnt += count(Arr::where($v, function ($v1, $k1) { return $v1['type']=="model" && $v1['em_check_opt']; }));
        $eq_title .= $em_cnt >= 2 ? '외 ['.($em_cnt - 1).']' : '';

        $eq_id = EstimateReq::insertGetId([
            "eq_type"       => 'REREQ',

            "eq_title"      => $eq_title,
            "eq_name"       => $req->estimate_req['eq_name'],
            "eq_email"      => $req->estimate_req['eq_email'],
            "eq_tel"        => $req->estimate_req['eq_tel'],
            "eq_fax"        => $req->estimate_req['eq_fax'],
            "eq_hp"         => $req->estimate_req['eq_hp'],
            "eq_company"    => $req->estimate_req['eq_company'],
            "eq_1depth"     => $req->estimate_req['eq_1depth'],
            "eq_content"    => $req->eq_content,
            'ip'            => $req->ip(),
            'created_id'    => auth()->check() ? auth()->user()->id : 0
        ]);

        $is_model_check = false;
        $em_id = 0;
        foreach ($req->collect['lists'] as $pa) {
            foreach ($pa as $em) {
                if ($em['type'] == 'model') {
                    if ($em['em_check_opt'] && $em['ea']>0) {
                        $em_id = EstimateModel::insertGetId([
                            'em_type'       => 'estimateReq',
                            'em_papa_id'    => $eq_id,
                            'em_gd_id'      => $em['gd_id'],
                            'em_gm_id'      => $em['gm_id'],
                            'em_title'      => $em['gd_name'],
                            'em_name'       => $em['gm_name'],
                            'em_catno'      => $em['gm_catno'],
                            'em_code'       => $em['gm_code'],
                            'em_unit'       => $em['gm_unit'],
                            'em_spec'       => $em['gm_spec'],
                            'em_maker'      => $em['mk_name'],
                            'em_ea'         => $em['ea'],
                            'em_cost_price' => $em['price'],
                            'em_price'      => $em['price'],
                            'em_dlvy_at'    => $em['dlvy_at'],
                        ]);
                        $is_model_check = true;
                    } else $is_model_check = false;
                }
                if ($em['type'] == 'option' && $is_model_check) {
                    EstimateOption::insert([
                        'eo_em_id'  => $em_id,
                        'eo_gd_id'  => $em['gd_id'],
                        'eo_goc_id' => $em['goc_id'],
                        'eo_tit'    => $em['go_name'],
                        'eo_name'   => $em['goc_name'],
                        'eo_ea'     => $em['ea'],
                        'eo_price'  => $em['price'],
                    ]);
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
        $eq = $eq->with('fileInfo')->find($eq_id);
        foreach ($eq->estimateModel as $v) {
            $v->goods;
            $v->estimateOption;
        }
        foreach ($eq->estimateReplyCplt as $v) {
            foreach ($v->estimateModel as $v2) {
                $v2->goods;
                $v2->estimateOption;
            }
        }
        return response()->json($eq, 200);
    }


    public function replyShow(EstimateReply $er, $er_id) {
        $data = $er->with('fileInfo')->with('estimateReq')->with('estimateModel')->find($er_id);
        $data->estimateReq->fileInfo;
        $data->estimateReq->user;
        $data->estimateReq->mng;
            if ($data->estimateReq->mng)
			    $data->estimateReq->mng->userMng;
        $coll = array();
        foreach ($data->estimateModel as $em) {
            $em->estimateOption;
            $coll['goods'][] = [ 'gd_id' => $em->em_gd_id, 'em_id' => $em->em_id ];
            if ($em->estimateOption()->exists())
                foreach ($em->estimateOption as $eo)
                    $coll['goods'][] = [ 'gd_id' => $em->em_gd_id, 'eo_id' => $eo->eo_id ];
        }
        $gd = new Goods;
        $data->goods = $gd;
        $data->collect = $gd->getGoodsDataCollection($coll, 'buy_estimate');

        if ($data->er_no_dlvy_fee == 'Y') { //  배송료 제외
            //  바로 접근해서 수정하면 
            //  Indirect modification of overloaded property 'A' 에러 난다.
            $tmp = $data->collect;
            $tmp['price']['total'] = intval($tmp['price']['total'])-intval($tmp['price']['dlvy_add_vat'])-intval($tmp['price']['air_add_vat']);
            $tmp['price']['dlvy_add_vat'] = 0;
            $tmp['price']['air_add_vat'] = 0;
            foreach ($tmp['lists'] as $k => $pa) {
                foreach ($pa as $k2 => $gm)
                    $tmp['lists'][$k][$k2]['pa_dlvy_p_add_vat'] = 0;                
            }
            $data->collect = $tmp;
        }

        return response()->json($data, 200);
    }

    public function printEstimate(int $er_id) {
        $er = EstimateReply::with('estimateReq')->with('estimateModel')->find($er_id);
        $er->estimateReq->mng;
        foreach ($er->estimateModel as $v) 
            $v->estimateOption;
        return view('admin.estimate.pdf.estimate', ['er' => $er->toArray(), 'type'=>'print']);
	}

    public function getCustomMadeCategory() { return EstimateReq::$option['custom_made_category']; }
}
