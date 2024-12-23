<?php

namespace App\Http\Controllers\Admin\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\{StoreEstimateReq, StoreEstimateReply};
use App\Models\Shop\{EstimateReq, EstimateReply, EstimateModel, EstimateOption, Goods, GoodsModel, Category};
use App\Models\{User, UserMng, FileInfo};
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Arr;
use App\Exports\EstimateEstimateExport;
use App\Exports\EstimateTransactionExport;
use Maatwebsite\Excel\Facades\Excel;
use DB;
use PDF;
use Exception;
use Cache;

use Mail;
use App\Mail\EstimateSend;

class EstimateController extends Controller {
    protected $estimateReq;
    protected $estimateReply;
    protected $estimateModel;
    protected $estimateOption;
    protected $user;
    protected $userMng;
    public function __construct(EstimateReq $eq, EstimateReply $er, EstimateModel $em, EstimateOption $eo, User $user, UserMng $um, PDF $pdf) {
        $this->estimateReq = $eq;
        $this->estimateReply = $er;
        $this->user = $user;
        $this->userMng = $um;
        $this->estimateModel = $em;
        $this->estimateOption = $eo;
        $option = ['defaultPaperSize'=>'a4', 'isRemoteEnabled' => true, 'isHtml5ParserEnabled' => true,];
        if (config('app.env') == "production") { $option['isRemoteEnabled'] = true; }
        $this->pdf = PDF::setOptions($option);
    }
    public function index(Request $req) {
        $eq = $this->estimateReq;
        $er = $this->estimateReply;
        $em = $this->estimateModel;
		$eq = $eq->select("shop_estimate_req.*",
							DB::raw("(SELECT name FROM la_users
							WHERE la_users.id = la_shop_estimate_req.eq_mng) as eq_mng_nm"),)
                ->with('user')
                ->latest('eq_id');
        if ($req->date_type == 'reque') {
                $eq->when($req->startDate, fn ($q, $v) => $q->StartDate($v.' 00:00:00'));
                $eq->when($req->endDate, fn ($q, $v) => $q->EndDate($v.' 23:59:59'));
        } else {
            $eq->whereIn('eq_id', function($q) use($req) {
                $q->select('er_eq_id')
                ->from('shop_estimate_reply')
                ->when($req->startDate, function ($q, $v) { return $q->where('created_at', '>=', $v.' 00:00:00'); })
                ->when($req->endDate, function ($q, $v) {   return $q->where('created_at', '<=', $v.' 23:59:59'); });
            });               
        }                         
        if ($req->filled('startPrice') || $req->filled('endPrice')) {
            $eq->whereIn('eq_id', function($query) use($req) {
                $query->select('er_eq_id')
                ->from('shop_estimate_reply')
                ->when($req->startPrice, function ($q, $v) { return $q->where('er_all_price', '>=', preg_replace('/\D/', '', $v)); })
                ->when($req->endPrice, function ($q, $v) { return $q->where('er_all_price', '<=', preg_replace('/\D/', '', $v)); });
            });
        }

        $eq->when($req->eq_type, function ($q, $v) {
            if($v == 'REQ') return $q->whereIn('eq_type', ['REQ', 'REREQ', 'CUS']);
            else            return $q->where('eq_type', $v);
        });
        $eq->when($req->eq_step, fn ($q, $v) => $q->EqStep($v));
        $eq->when($req->eq_mng,  fn ($q, $v) => $q->EqMng($v));
        $eq->when($req->eq_env,  fn ($q, $v) => $q->where('eq_env', $v));
        $eq->when($req->writer,  fn ($q, $v) => $q->CreatedId($v));

        $mng = $this->userMng;
        $eq->when($req->mng_group, function ($q, $v) use($mng) { return $q->CreatedId('role_id', $mng->group($v)->pluck('um_user_id')); });

        if ($req->filled('keyword')){
            switch ($req->keyword_type) {
				case 'eq_name':			$eq = $eq->EqName($req->keyword); break;
				case 'eq_company':	    $eq = $eq->EqCompany($req->keyword); break;
                case 'eq_tel':			$eq = $eq->EqTel($req->keyword); break;
                case 'eq_hp':			$eq = $eq->EqHp($req->keyword); break;
                case 'eq_email':		$eq = $eq->EqEmail($req->keyword); break;
                case 'eq_id':			$eq = $eq->EqId([$req->keyword]); break;
                case 'er_id':			$eq = $eq->EqId($er->ErId($req->keyword)->pluck('er_eq_id')); break;
                case 'em_name':
                    $em = $em   ->TypeReply()
                                ->where('em_name', 'like', '%'.$req->keyword.'%')
                                ->pluck('em_papa_id');
                    $eq->EqId( $er->ErIdArr($em)->pluck('er_eq_id') );
                break;

                case 'em_code':
                    $em = $em   ->TypeReply()
                                ->where('em_code', 'like', $req->keyword.'%')
                                ->pluck('em_papa_id');
                    $eq->EqId( $er->ErIdArr($em)->pluck('er_eq_id') );
                break;

                case 'cat_no':
                    $eq->EqId(
                        $er->ErIdArr(
                            $em->TypeReply()->where('em_catno', 'like', $req->keyword.'%')->pluck('em_papa_id')
                        )->pluck('er_eq_id')
                    );
                break;
            }
        }

        if ($req->filled('limit'))
            $data['list'] = $eq->limit($req->limit)->get();
        else {
            $list_size = $req->filled('list_size') ? $req->list_size : 20;
            $data['list'] = $eq->paginate($list_size);
            $data['list']->appends($req->all())->links();
        }

        foreach ($data['list'] as $eq)
            $eq->estimateReply;

            
		$data['mng_on'] = json_decode(Redis::get('UserMngOn'));
		$data['mng_off'] = json_decode(Redis::get('UserMngOff'));
        $data['mng_info'] = $this->userMng->getMngInfo();
		return response()->json($data);
    }

    public function show(Request $req, int $id) {
        if ($req->filled('type') && $req->type=='reply') {
            $data = $this->estimateReply->with('fileInfo')->with('estimateReq')->with('estimateModel')->find($id);
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
                // dd($tmp['price']);
                $data->collect = $tmp;
            }
        } else {
            $data = $this->estimateReq->with('fileInfo')->with('estimateReply')->with('estimateModel')->with('estimateCustom')->find($id);
            foreach ($data->estimateModel as $em) {
                $em->estimateOption;
                if($em->em_name==''){
                    $gm=GoodsModel::find($em->em_gm_id);
                    // $data->estimateModel[$k]->name=$gm->gm_name;
                    $em->em_name  = $gm->gm_name;
                    $em->em_code  = $gm->gm_code;
                    $em->em_catno = $gm->gm_catno;
                    $em->em_maker = Goods::gdMaker($em->em_gd_id);
                    $em->em_unit  = $gm->gm_unit;
                    $em->em_spec  = $gm->gm_spec;
                }
            }
            if (intval($data->eq_1depth)>0)
                $data['made_cate'] = EstimateReq::$option['custom_made_category'];
        }        
        // foreach ($data['con']->estimateModel as $em) $em->img_src = $this->goods->find($em->em_gd_id)->gdImgSrc(true);
        return response()->json($data);
    }

    public function create(Request $req) {
        $data = [];
        if ($req->filled('eq_id')) {
            $data['estimate_req'] = $this->estimateReq->find($req->eq_id);
            
            if ($req->filled('er_id')) {
                $data['estimate_reply'] = $this->estimateReply->with('fileInfo')->find($req->er_id);
                $data['estimate_model'] = $data['estimate_reply']->estimateModel;
            } else {
                if ($data['estimate_req']->estimateModel()->exists())
                    $data['estimate_model'] = $data['estimate_req']->estimateModel;
            }
            if (array_key_exists('estimate_model', $data)) {
                foreach ($data['estimate_model'] as $em) {
                    $em->goods->purchaseAt;
                    $em->bundleDc;
                    $em->estimateOption;

                    if($em->em_name==''){
                        $gm=GoodsModel::find($em->em_gm_id);
                        // $data->estimateModel[$k]->name=$gm->gm_name;
                        $em->em_name  = $gm->gm_name;
                        $em->em_code  = $gm->gm_code;
                        $em->em_catno = $gm->gm_catno;
                        $em->em_maker = Goods::gdMaker($em->em_gd_id);
                        $em->em_unit  = $gm->gm_unit;
                        $em->em_spec  = $gm->gm_spec;
                        $em->em_price = $gm->gm_price;
                        $em->em_cost_price = $gm->gm_price;
                    }
                }
            }
        } 
        
        if (!array_key_exists('estimate_req', $data))         $data['estimate_req'] = new class{};
        if (!array_key_exists('estimate_model', $data))       $data['estimate_model'] = [$this->emptyEm()];
        if (!$req->filled('eq_id') || !$req->filled('er_id')) $data['estimate_reply']['file_info'] = [];
        
        // $data['empty_goods'] = new Goods;
        $data['empty_em'] = $this->emptyEm();
        $data['estimate_reply']['er_effective_at'] = date("Y-m-d", strtotime("+2 week"));
        // $data['file_info'] = [];
        return response()->json($data);
    }

    public function edit($er_id) {
        $data['estimate_reply'] = $this->estimateReply->with('fileInfo')->find($er_id);
        $data['estimate_req'] = $this->estimateReq->find($data['estimate_reply']->er_eq_id);
        $data['estimate_model'] = $data['estimate_reply']->estimateModel;
        foreach ($data['estimate_model'] as $em) {
            $em->goods->purchaseAt;
            $em->bundleDc;
            $em->estimateOption;
        }

        $data['empty_em'] = $this->emptyEm();
        $data['estimate_reply']['er_effective_at'] = date("Y-m-d", strtotime("+2 week"));
        return response()->json($data);
    }
    public function emptyEm() {
        return [
            'em_gd_id'          => '',
            'em_gm_id'          => '',
            'em_name'           => '',
            'em_catno'        => '',
            'em_code'           => '',
            'em_unit'           => '',
            'em_maker'          => '',
            'em_ea'             => '',
            'em_cost_price'     => 0,
            'em_dc_rate'        => '',
            'em_price'          => 0,
            'em_dlvy_at'        => '',
            'em_spec'           => '',
            'goods'             => new Goods,
            'estimate_option'   => [],
        ];
    }

    public function store(StoreEstimateReply $req) {
        self::mailCheck($req);

        $eq_impl = $this->estimateReq_paramImplant($req->estimate_req);
        $eq_impl['ip'] = $req->ip();
        $eq_id = array_key_exists('eq_id', $req->estimate_req) ? $req->estimate_req['eq_id'] : 0;

        $eq_impl['eq_step'] = 'DONE';
        if ( $req->estimate_reply['er_step'] == 0 ) $eq_impl['eq_step'] = 'DOING';
  
        if ($eq_id) {
            $eq_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
            DB::table('shop_estimate_req')->where('eq_id', $eq_id)->update($eq_impl);
        } else {
            $eq_impl['created_id'] = $req->estimate_req['created_id'] ?? 0;
            $eq_impl['eq_title'] = '<b>[ 임의견적 ]</b> ';
            $eq_id = DB::table('shop_estimate_req')->insertGetId($eq_impl, 'eq_id');
        }

        $er_impl = $this->estimateReply_paramImplant($req->estimate_reply);
        $er_impl['ip'] = $req->ip();
        $er_impl['created_id'] = auth()->check() ? auth()->user()->id : 0;
        $er_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
        $er_impl['er_eq_id'] = $eq_id;
        $er_id = DB::table('shop_estimate_reply')->insertGetId($er_impl, 'eq_id');

        if ($req->filled('estimate_model')) {
            foreach ($req->estimate_model as $em) {
                $em_id = DB::table('shop_estimate_model')->insertGetId($this->estimateModel_paramImplant($em, $er_id), 'em_id');
                if (array_key_exists('estimate_option', $em)) {
                    foreach ($em['estimate_option'] as $eo)
                        DB::table('shop_estimate_option')->insert($this->estimateOption_paramImplant($eo, $em_id));
                }
            }
        }

        if ($req->isRewrite) {
            foreach ($req->estimate_reply['file_info'] as $fi)
                if (array_key_exists('fi_id', $fi))
                    DB::table('file_info')->insert(['fi_group'    => $fi['fi_group'],
                                                    'fi_key'      => $er_id,
                                                    'fi_room'     => $fi['fi_room'],
                                                    'fi_kind'     => $fi['fi_kind'],
                                                    'fi_original' => $fi['fi_original'],
                                                    'fi_new'      => $fi['fi_new'],
                                                    'fi_ext'      => $fi['fi_ext'],
                                                    'fi_size'     => $fi['fi_size'],
                                                    'created_id'  => auth()->user()->id,
                                                    'ip'          => $req->ip() ]);
        }

        if ($req->estimate_reply['er_step'] == 1) { //  견적서 메일 발송
            $to_email = $req->estimate_req['eq_email'];
            $to_name = $req->estimate_req['eq_name'];
            $params = $this->mailParam_paramImplant($req->estimate_reply, $req->estimate_model, $eq_id, $er_id, $req->estimate_req);
            $this->estimateMailSend($to_email, $to_name, $params, $er_id);
        }

        if($er_id) return response()->json($er_id, 200);
    }

    //  StoreEstimateReply 이 request를 쓰면 eq_step만 보내어 처리 상태를 바꿀때
    //  다른 게 없다고 에러뜨단 무조껀 Request 쓰자
    public function update(Request $req, $er_id) {
        if ($req->type == 'eq_step') { //   견적요청 진행현황 수정
            if (DB::table('shop_estimate_req')->where('eq_id', $req->eq_id)->update(['eq_step' => $req->eq_step, 'eq_mng' => auth()->user()->id]))
                return response()->json('success', 200);
        } else if ($req->type == 'eq_env') { //   견적요청 진행현황 수정
            if (DB::table('shop_estimate_req')->where('eq_id', $req->eq_id)->update(['eq_env' => $req->eq_env]))
                return response()->json('success', 200);
        } else {                
            self::mailCheck($req);
            $eq_impl = $this->estimateReq_paramImplant($req->estimate_req);
            $eq_impl['ip'] = $req->ip();
            $eq_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
            $eq_impl['eq_step'] = 'DONE';
            if ( $req->estimate_reply['er_step'] == 0 ) $eq_impl['eq_step'] = 'DOING';
            DB::table('shop_estimate_req')->where('eq_id', $req->estimate_req['eq_id'])->update($eq_impl);

            $er_impl = $this->estimateReply_paramImplant($req->estimate_reply);
            $er_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
            DB::table('shop_estimate_reply')->where('er_id', $er_id)->update($er_impl);

            //  삭제된걸 파악하기 위해 해당 모델 검색
            $provEstimateModel = $this->estimateModel->select("em_id")->Type('estimateReply')->PapaId($er_id)->pluck('em_id');
            foreach ($req->estimate_model as $key => $em) {
                $em_impl = $this->estimateModel_paramImplant($em, $er_id);
                $udt_em = $this->estimateModel->updateOrCreate(['em_id' => ($em['em_id'] ?? 0)], $em_impl);
                $em_id = $udt_em->em_id;
                if($provEstimateModel->search($em_id) !== false)
                    $provEstimateModel->forget($provEstimateModel->search($em_id));

                $provEstimateOption = $this->estimateOption->select("eo_id")->EmId($em_id)->pluck('eo_id');
                foreach ($em['estimate_option'] as $eo) {
                    if (isset($eo['eo_ea'])){
                        $eo_id = $eo['eo_id'] ?? 0;
                        $eo_impl = $this->estimateOption_paramImplant($eo, $em_id);
                        $this->estimateOption->updateOrCreate(['eo_id' => $eo_id], $eo_impl);
                        if($provEstimateOption->search($eo_id) !== false)
                            $provEstimateOption->forget($provEstimateOption->search($eo_id));
                    }
                }
                foreach ($provEstimateOption as $col) $this->estimateOption->destroy($col);
            }

            foreach ($provEstimateModel as $em_id){
                $thisEo = $this->estimateOption->select("eo_id")->EmId($em_id)->pluck('eo_id');
                foreach ($thisEo as $eo_id)
                    $this->estimateOption->destroy($eo_id);
                $this->estimateModel->destroy($em_id);
            }

            //  파일 첨부시 자동으로 등록된 file_info 테이블에 상품번호 등록
            // if ($req->filled('file_info')) {
            //     foreach ($req->file_info as $info) {
            //         if(!isset($info['fi_key']) && $finfo = FileInfo::find($info['fi_id'])) {
            //             $finfo->fi_key = $er_id;
            //             $finfo->save();
            //         }
            //     }
            // }

            if ($req->estimate_reply['er_step'] == 1) { //  견적서 메일 발송
                $to_name = $req->estimate_req['eq_name'];
                $to_email = $req->estimate_req['eq_email'];
                $params = $this->mailParam_paramImplant($req->estimate_reply, $req->estimate_model, $req->er_eq_id, $er_id, $req->estimate_req);
                $this->estimateMailSend($to_email, $to_name, $params, $er_id);
            }
            return response()->json($er_id, 200);
        }
    }

    public function mailCheck(Request $req) {
        if ( trim($req->estimate_req['eq_email']) != '-' ) {
            Validator::make(
                $req->all(), 
                ['estimate_req.eq_email' => ['email'] ], 
                ['estimate_req.eq_email.email' => '이메일을 형식에 맞게 입력하세요.' ]
            )->validate();
        }
    }

    public function reSend(Request $req, $er_id) {
        $to_name = $req->estimate_req['eq_name'];
        $to_email = $req->estimate_req['eq_email'];
        $params = $this->mailParam_paramImplant($req, $req->estimate_model, $req->er_eq_id, $er_id, $req->estimate_req);
        return $this->estimateMailSend($to_email, $to_name, $params, $er_id);
    }

    public function estimateMailSend($to_email, $to_name, $params, $er_id) {
        $subject = '[4science] '.$to_name.'님, 요청하신 견적서 메일입니다.';
        $er = EstimateReply::with('estimateReq')->with('estimateModel')->find($er_id);
        foreach ($er->estimateModel as $v) 
            $v->estimateOption;
        $er->estimateReq->mng;
        $pdf = $this->pdf->loadView('admin.estimate.pdf.estimate', ['er' => $er->toArray()]);
        // $pdf->setOptions(['dpi' => 96 ]);
        $filename = uniqid();
        Storage::put('public/estimatePdf/'.$filename.'.pdf', $pdf->output());

        try {
            // $from_email = config('mail.mailers.smtp.username');
            $from_email = auth()->user()->email;
            if ( trim($to_email) != '-' )
                Mail::to(trim($to_email))->queue(new EstimateSend($from_email, $subject, $params, public_path('storage/estimatePdf/'.$filename.'.pdf')));
            Mail::to(auth()->user()->email)->queue(new EstimateSend($from_email, $subject, $params, public_path('storage/estimatePdf/'.$filename.'.pdf')));
        } catch(\Swift_TransportException $e){
            // if($e->getMessage()) dd($e->getMessage());
        }

        // try {
        //     Mail::to($to_email)->queue(new EstimateSend(config('mail.mailers.smtp.username'), $subject, $params, public_path('storage/estimatePdf/'.$filename.'.pdf')));
        // } catch (Exception $e) {
        //     $content = \View::make('admin.estimate.email.estimateSend', $params)->render();
        //     return mailer(
        //         cache('site')['site'], 
        //         cache('biz')['email'], $to_email, $subject, $content, 1, 
        //         [['path'=>public_path('storage/estimatePdf/'.$filename.'.pdf'), 'name'=>$filename.'.pdf']]
        //     );
        // }
        
    }
    public function mailParam_paramImplant($er, $model, $eq_id, $er_id, $eq){
        $redirect_url = (array_key_exists('created_id', $eq) && $eq['created_id'])? (config('app.url')."mypage/estimate/reply/${er_id}") : '';
        return [    'eq_name'         => $eq['eq_name'],
                    'er_id'           => $er_id,
                    'eq_id'           => $eq_id,
                    'estimated_date'  => \Carbon\Carbon::now(),
                    'eq_mng_nm'       => auth()->user()->name,
                    'er_mng_tel'      => auth()->user()->tel,
                    'er_mng_email'    => auth()->user()->email,
                    'estimate_model'  => $model,
                    'er_effective_at' => isset($er['er_effective_at']) && $er['er_effective_at'] ? $er['er_effective_at'] : '',
                    'er_dlvy_at'      => isset($er['er_dlvy_at']) && $er['er_dlvy_at']           ? $er['er_dlvy_at']      : '',
                    'er_content'      => isset($er['er_content']) && $er['er_content']           ? $er['er_content']      : '',
                    'er_gd_price'     => isset($er['er_gd_price']) && $er['er_gd_price']         ? $er['er_gd_price']     : 0,
                    'er_surtax'       => isset($er['er_surtax']) && $er['er_surtax']             ? $er['er_surtax']       : 0,
                    'er_dlvy_price'   => isset($er['er_dlvy_price']) && $er['er_dlvy_price']     ? $er['er_dlvy_price']   : 0,
                    'er_air_price'    => isset($er['er_air_price']) && $er['er_air_price']       ? $er['er_air_price']    : 0,
                    'er_all_price'    => isset($er['er_all_price']) && $er['er_all_price']       ? $er['er_all_price']    : 0,
                    'er_no_dlvy_fee'  => isset($er['er_no_dlvy_fee']) && $er['er_no_dlvy_fee']   ? $er['er_no_dlvy_fee']  : 'N',
                    'redirect_url'    => $redirect_url,
                    'domain'          => config('app.url'), 
        ];
    }
    public function estimateReq_paramImplant($req){
        return [    'eq_type'       => array_key_exists('eq_type', $req) && $req['eq_type']       ? $req['eq_type']       : 'TEMP',
                    'eq_name'       => array_key_exists('eq_name', $req) && $req['eq_name']       ? $req['eq_name']       : '',
                    'eq_email'      => array_key_exists('eq_email', $req) && $req['eq_email']     ? trim($req['eq_email'])      : '',
                    'eq_tel'        => array_key_exists('eq_tel', $req) && $req['eq_tel']         ? $req['eq_tel']        : '',
                    'eq_fax'        => array_key_exists('eq_fax', $req) && $req['eq_fax']         ? $req['eq_fax']        : '',
                    'eq_hp'         => array_key_exists('eq_hp', $req) && $req['eq_hp']           ? $req['eq_hp']         : '',
                    'eq_company'    => array_key_exists('eq_company', $req) && $req['eq_company'] ? $req['eq_company']    : '',
                    'eq_content'    => array_key_exists('eq_content', $req) && $req['eq_content'] ? $req['eq_content']    : '',
                    'eq_mng'        => auth()->check() ? auth()->user()->id : 0,
                    'eq_env'        => 'P', ];
    }
    public function estimateReply_paramImplant($req){
        return [    'er_step'            => array_key_exists('er_step',         $req) && $req['er_step']         ? $req['er_step']         : 0,
                    'er_content'         => array_key_exists('er_content',      $req) && $req['er_content']      ? $req['er_content']      : '',
                    'er_dlvy_at'         => array_key_exists('er_dlvy_at',      $req) && $req['er_dlvy_at']      ? $req['er_dlvy_at']      : '',
                    'er_effective_at'    => array_key_exists('er_effective_at', $req) && $req['er_effective_at'] ? $req['er_effective_at'] : '',
                    'er_gd_price'        => array_key_exists('er_gd_price',     $req) && $req['er_gd_price']     ? $req['er_gd_price']     : 0,
                    'er_surtax'          => array_key_exists('er_surtax',       $req) && $req['er_surtax']       ? $req['er_surtax']       : 0,
                    'er_dlvy_price'      => array_key_exists('er_dlvy_price',   $req) && $req['er_dlvy_price']   ? $req['er_dlvy_price']   : 0,
                    'er_air_price'       => array_key_exists('er_air_price',    $req) && $req['er_air_price']    ? $req['er_air_price']    : 0,
                    'er_all_price'       => array_key_exists('er_all_price',    $req) && $req['er_all_price']    ? $req['er_all_price']    : 0,
                    'er_no_dlvy_fee'     => array_key_exists('er_no_dlvy_fee',  $req) && $req['er_no_dlvy_fee']  ? $req['er_no_dlvy_fee']  : 'N',];
    }
    public function estimateModel_paramImplant($em, $er_id){
        $em_title = '';
        if(array_key_exists('goods', $em) && array_key_exists('gd_name', $em['goods']))
            $em_title = $em['goods']['gd_name'];
        else
            $em_title = $em['em_name'];
        return [    'em_type'       => 'estimateReply',
                    'em_papa_id'    => $er_id,
                    'em_gd_id'      => array_key_exists('em_gd_id', $em) && $em['em_gd_id']             ? $em['em_gd_id']      : 0,
                    'em_gm_id'      => array_key_exists('em_gm_id', $em) && $em['em_gm_id']             ? $em['em_gm_id']      : 0,
                    'em_name'       => array_key_exists('em_name', $em) && $em['em_name']               ? $em['em_name']       : '',
                    'em_title'      => $em_title,
                    'em_catno'      => array_key_exists('em_catno', $em) && $em['em_catno']             ? $em['em_catno']      : '',
                    'em_code'       => array_key_exists('em_code', $em) && $em['em_code']               ? $em['em_code']       : '',
                    'em_unit'       => array_key_exists('em_unit', $em) && $em['em_unit']               ? $em['em_unit']       : '',
                    'em_maker'      => array_key_exists('em_maker', $em) && $em['em_maker']             ? $em['em_maker']      : '',
                    'em_spec'       => array_key_exists('em_spec', $em) && $em['em_spec']               ? $em['em_spec']       : '',
                    'em_ea'         => array_key_exists('em_ea', $em) && $em['em_ea']                   ? $em['em_ea']         : 0,
                    'em_cost_price' => array_key_exists('em_cost_price', $em) && $em['em_cost_price']   ? str_replace(',', '', $em['em_cost_price']) : 0,
                    'em_dc_rate'    => array_key_exists('em_dc_rate', $em) && $em['em_dc_rate']         ? str_replace(',', '', $em['em_dc_rate'])    : 0,
                    'em_price'      => array_key_exists('em_price', $em) && $em['em_price']             ? str_replace(',', '', $em['em_price'])      : 0,
                    'em_dlvy_at'    => array_key_exists('em_dlvy_at', $em) && $em['em_dlvy_at']         ? $em['em_dlvy_at']    : '', ];
    }
    public function estimateOption_paramImplant($eo, $em_id){
        return [    'eo_em_id' => $em_id,
                    'eo_gd_id' => $eo['eo_gd_id'],
                    'eo_goc_id' => $eo['eo_goc_id'],
                    'eo_tit' => $eo['eo_tit'],
                    'eo_name' => $eo['eo_name'],
                    'eo_ea' => $eo['eo_ea'],
                    'eo_price' => $eo['eo_price'], ];
    }

    public function destroy(Request $req, int $id) {
        $is_success = false;
        switch ($req->type) {
            case 'req':
                if(DB::table('shop_estimate_req')->where('eq_id', $id)->update(['updated_id'=>auth()->user()->id, 'deleted_at' => DB::raw('NOW()')]))
                    $is_success = true;
                DB::table('shop_estimate_reply')->where('er_eq_id', $id)->update(['updated_id'=>auth()->user()->id, 'deleted_at' => DB::raw('NOW()')]);
            break;
            case 'reply':   
                if(DB::table('shop_estimate_reply')->where('er_id', $id)->update(['updated_id'=>auth()->user()->id, 'deleted_at' => DB::raw('NOW()')])) 
                    $is_success = true; 
            break;
        }
        if ($is_success) {
            $rst_data = "success";
            $rst_code = 200;
        } else {
            $rst_data = ["message"=>"Fail"];
            $rst_code = 500;
        }
        return response()->json($rst_data, $rst_code);
    }

    public function exportEstimateExcel(Request $req) { return Excel::download(new EstimateEstimateExport($req->all()), 'estimate.xlsx'); }
	public function exportEstimatePdf(Request $req) { return $this->pdf->loadView('admin.estimate.pdf.estimate', ['er' => $req->all()])->download('estimate.pdf'); }
	public function exportTransactionExcel(Request $req) { return Excel::download(new EstimateTransactionExport($req->all()), 'estimate.xlsx'); }
    public function exportTransactionPdf(Request $req) { return $this->pdf->loadView('admin.estimate.pdf.transaction', ['er' => $req->all()]) ->stream(); }

    public function showEstimate(Request $req, int $er_id) {
        $er = EstimateReply::with('estimateReq')->with('estimateModel')->find($er_id);
        $er->estimateReq->mng;
        foreach ($er->estimateModel as $v) 
            $v->estimateOption;
        
        $type = $req->filled('type') ? $req->type : 'view';
        return view('admin.estimate.pdf.estimate', ['er' => $er->toArray(), 'type'=>$type]);
	}

    public function getEmptyEm () {
        return response()->json($this->emptyEm());
    }

    public function storeFromOrder (Request $req) {
        $eq_id = DB::table('shop_estimate_req')->insertGetId([
            'eq_title'      => '<b>[ 임의견적 ]</b> ',
            'eq_step'       => 'DOING',
            'eq_type'       => 'TEMP',
            'eq_name'       => $req->filled('od_orderer')       ? $req->od_orderer             : '',
            'eq_email'      => $req->filled('od_orderer_email') ? trim($req->od_orderer_email) : '',
            'eq_hp'         => $req->filled('od_orderer_hp')    ? $req->od_orderer_hp          : '',
            'eq_company'    => $req->filled('od_company')       ? $req->od_company             : '',
            'eq_content'   => '',    //  내용
            'created_id'    => $req->filled('created_id')       ? $req->created_id             : 0,
            'eq_mng'        => auth()->check() ? auth()->user()->id : 0,
            'eq_env'        => 'P',
            'ip'            => $req->ip(),
        ], 'eq_id');
   
        $er_id = DB::table('shop_estimate_reply')->insertGetId([    
            'er_step'         => 0, //  진행현황( 임시저장 : 0, 작성 완료 : 1 )
            'er_dlvy_at'      => '-',   //  납품기일
            'er_effective_at' => '-',   //  견적유효일
            'er_content'      => '',    //  내용
            'er_gd_price'     => $req->filled('od_gd_price')   ? $req->od_gd_price   : 0,
            'er_surtax'       => $req->filled('od_surtax')     ? $req->od_surtax     : 0,
            'er_dlvy_price'   => $req->filled('od_dlvy_price') ? $req->od_dlvy_price : 0,
            'er_air_price'    => $req->filled('od_air_price')  ? $req->od_air_price  : 0,
            'er_all_price'    => $req->filled('od_all_price')  ? $req->od_all_price  : 0,
            'er_eq_id'        => $eq_id,
            'ip'              => $req->ip(),
            'created_id'      => auth()->check() ? auth()->user()->id : 0,
            'updated_id'      => auth()->check() ? auth()->user()->id : 0,
        ], 'eq_id');

        if ($req->filled('order_purchase_at')) {
            $chk_for_opt = [];
            foreach ($req->order_purchase_at as $pa) {
                foreach ($pa['order_model'] as $md) {
                    if ($md['odm_type'] == 'MODEL') {
                        $em_id = DB::table('shop_estimate_model')->insertGetId([
                            'em_type'       => 'estimateReply',
                            'em_papa_id'    => $er_id,
                            'em_gd_id'      => $md['odm_gd_id'],
                            'em_gm_id'      => $md['odm_gm_id'],
                            'em_name'       => $md['odm_gm_name'],
                            'em_title'      => $md['odm_gd_name'],
                            'em_catno'      => $md['odm_gm_catno'],
                            'em_code'       => $md['odm_gm_code'],
                            'em_unit'       => $md['odm_gm_unit'],
                            'em_maker'      => $md['odm_mk_name'],
                            'em_spec'       => $md['odm_gm_spec'],
                            'em_ea'         => $md['odm_ea'],
                            'em_cost_price' => $md['odm_price'],
                            'em_price'      => $md['odm_price'] 
                        ], 'em_id');
                        $chk_for_opt[$md['odm_gd_id']] = $em_id;
                    }

                    if( $md['odm_type'] == 'OPTION' && array_key_exists($md['odm_gd_id'], $chk_for_opt) && $chk_for_opt[$md['odm_gd_id']]) {
                        DB::table('shop_estimate_option')->insert([
                            'eo_em_id'  => $chk_for_opt[$md['odm_gd_id']],
                            'eo_gd_id'  => $md['odm_gd_id'],
                            'eo_goc_id' => $md['odm_gm_id'],
                            'eo_tit'    => $md['odm_gm_name'],
                            'eo_name'   => $md['odm_gm_spec'],
                            'eo_ea'     => $md['odm_ea'],
                            'eo_price'  => $md['odm_price'], 
                        ]);
                    }
                }
            }
        }

        return response()->json($er_id, 200);
    }
}
