<?php

namespace App\Http\Controllers\Admin\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop\{EstimateReq, EstimateReply, EstimateModel, EstimateOption, Goods, Category};
use App\Models\{User, UserMng, FileInfo};
use App\Http\Requests\{StoreEstimateReq, StoreEstimateReply};
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use DB;
use App\Exports\EstimateEstimateExport;
use App\Exports\EstimateTransactionExport;
use Maatwebsite\Excel\Facades\Excel;
use PDF;

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
        $option = ['defaultPaperSize'=>'a4'];
        if (config('app.env') == "production") { $option['isRemoteEnabled'] = true; }
        $this->pdf = PDF::setOptions($option);
    }
    public function index(Request $req) {

        $data['mng'] = $this->user::whereHas('UserMng', function ($query) {
            $query->where('um_status', 'Y');
        })->get();
        $data['mng_info'] = $this->userMng->getMngInfo();

        $eq = $this->estimateReq;
        $er = $this->estimateReply;
        $em = $this->estimateModel;
		$eq = $eq->select("shop_estimate_req.*",
							DB::raw("(SELECT name FROM la_users
							WHERE la_users.id = la_shop_estimate_req.eq_mng) as eq_mng_nm"),);
        if ($req->filled('startDate')) {
            if ($req->date_type == 'reque')
                $eq = $eq->StartDate($req->startDate.' 00:00:00');
            else
                $eq = $eq->EqId($er->StartDate($req->startDate.' 00:00:00')->pluck('er_eq_id'));
        }
        if ($req->filled('endDate')) {
            if ($req->date_type == 'reque')
                $eq = $eq->EndDate($req->endDate.' 23:59:59');
            else
                $eq = $eq->EqId($er->EndDate($req->endDate.' 00:00:00')->pluck('er_eq_id'));
        }
        if ($req->filled('startPrice')) {
            $er = $er->StartPrice(preg_replace('/\D/', '', $req->startPrice))->pluck('er_eq_id');
            $eq->EqId( $er );
        }
        if ($req->filled('endPrice')) {
            $er = $er->EndPrice(preg_replace('/\D/', '', $req->endPrice))->pluck('er_eq_id');
            $eq->EqId( $er );
        }
        if ($req->filled('eq_type')) $eq = $eq->EqType($req->eq_type);
        if ($req->filled('eq_step')) $eq = $eq->EqStep($req->eq_step);
        if ($req->filled('eq_mng')) $eq = $eq->EqMng($req->eq_mng);
        if ($req->filled('mng_group')) $eq = $eq->CreatedId($this->userMng->group($req->mng_group)->pluck('um_user_id'));
        if ($req->filled('keyword')){
            switch ($req->keyword_type) {
				case 'eq_name':			$eq = $eq->EqName($req->keyword); break;
				case 'eq_department':	$eq = $eq->EqDepartment($req->keyword); break;
                case 'eq_tel':			$eq = $eq->EqTel($req->keyword); break;
                case 'eq_hp':			$eq = $eq->EqHp($req->keyword); break;
                case 'eq_email':		$eq = $eq->EqEmail($req->keyword); break;
                case 'eq_id':			$eq = $eq->EqId($req->keyword); break;
                case 'er_id':			$eq = $eq->EqId($er->ErId($req->keyword)->pluck('er_eq_id')); break;
                case 'em_name':
                    $em = $em   ->TypeReply()
                                ->where('em_name', 'like', $req->keyword.'%')
                                ->pluck('em_parent_id');
                    $eq->EqId( $er->ErId($em)->pluck('er_eq_id') );
                    break;
                case 'em_code':
                    $em = $em   ->TypeReply()
                                ->where('em_code', 'like', $req->keyword.'%')
                                ->pluck('em_parent_id');
                    $eq->EqId( $er->ErId($em)->pluck('er_eq_id') );
                    break;
                case 'cat_no':
                    $keyword = explode('-', $req->keyword);
                    if (count($keyword) == 3) {
                        $eq->EqId(
                            $er->ErId(
                                $em->TypeReply()
                                    ->where('em_catno01', $keyword[0])
                                    ->where('em_catno02', $keyword[1])
                                    ->where('em_catno03', $keyword[2])->pluck('em_parent_id')
                            )->pluck('er_eq_id')
                        );
                    } else if (count($keyword) == 2){
                        $eq->EqId(
                            $er->ErId(
                                $em->TypeReply()
                                    ->where('em_catno01', $keyword[0])
                                    ->where('em_catno02', $keyword[1])->pluck('em_parent_id')
                            )->pluck('er_eq_id')
                        );
                    } else if (count($keyword) == 1){
                        $eq->EqId(
                            $er->ErId(
                                $em->TypeReply()->where(function($query) use ($keyword){
                                    $query->where('em_catno01', $keyword[0])
                                            ->orWhere('em_catno02', $keyword[0])
                                            ->orWhere('em_catno03', $keyword[0]);
                                })->pluck('em_parent_id')
                            )->pluck('er_eq_id')
                        );
                    }
                    break;
            }
        }
        $data['list'] = $eq->latest('eq_id')->paginate();
        $data['list']->appends($req->all())->links();

        foreach ($data['list'] as $eq)
            $eq->estimateReply;

		return response()->json($data);
    }

    public function show(Request $req, int $id) {
        if ($req->filled('type') && $req->type=='reply') {
            $data = $this->estimateReply->find($id);
            $data->user;
            $data->estimateReq;
            $data->collect = $this->estimateReply->estimateModelPurchaseCollection($data->estimateModel);
        } else {
            $data = $this->estimateReq->find($id);
            $data->estimateReply;
            foreach ($data->estimateModel as $em){
                $em->estimateOption;
            }
        }
        $data->fileInfo;
        // foreach ($data['con']->estimateModel as $em) $em->img_src = $this->goods->find($em->em_gd_id)->gdImgSrc(true);
        return response()->json($data);
    }

    public function create(Request $req) {
        if ($req->filled('eq_id')) {
            $data = $this->estimateReq->find($req->eq_id);
            // $data['data']->estimateReply;
            if ($data->estimateModel()->exists()) {
                foreach ($data->estimateModel as $em) {
                    $em->goods->purchaseAt;
                    $em->bundleDc;
                    $em->estimateOption;
                }
            } else {
                $data['estimate_model'] = [$this->emptyEm()];
            }
        } else {
            $data['estimate_model'] = [$this->emptyEm()];
        }
        $data['empty_goods'] = new Goods;
        $data['empty_em'] = $this->emptyEm();
        $data['er_effective_at'] = date("Y-m-d", strtotime("+2 week"));
        $data['file_info'] = [];
        // $data['er_effective_at'] = date("Y-m-d", strtotime("+1 week"));
        // foreach ($data['con']->estimateModel as $em) $em->img_src = $this->goods->find($em->em_gd_id)->gdImgSrc(true);
        return response()->json($data);
    }

    public function edit($er_id) {
        $data = $this->estimateReply->find($er_id);
        $data->estimateReq;
        $data->fileInfo;
        foreach ($data->estimateModel as $em) {
            if ($em->goods)
                $em->goods->purchaseAt;
            $em->bundleDc;
            $em->estimateOption;
        }
        $data['empty_em'] = $this->emptyEm();
        $data['er_effective_at'] = date("Y-m-d", strtotime("+1 week"));
        return response()->json($data);
    }
    public function emptyEm() {
        return [
            'em_gd_id'          => '',
            'em_gm_id'          => '',
            'em_name'           => '',
            'em_catno01'        => '',
            'em_catno02'        => '',
            'em_catno03'        => '',
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
        $eq_impl = $this->estimateReq_paramImplant($req->toArray());
        $eq_impl['ip'] = $req->ip();
        $eq_id = $req->filled('eq_id') ? $req->eq_id : 0;
        if ($eq_id) {
            $eq_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
            DB::table('shop_estimate_req')->where('eq_id', $eq_id)->update($eq_impl);
        } else {
            $eq_impl['created_id'] = auth()->check() ? auth()->user()->id : 0;
            $eq_impl['eq_title'] = '<b>[ 임의견적 ]</b> ';
            $eq_id = DB::table('shop_estimate_req')->insertGetId($eq_impl, 'eq_id');
        }

        $er_impl = $this->estimateReply_paramImplant($req);
        $er_impl['created_id'] = auth()->check() ? auth()->user()->id : 0;
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

        if ($req->er_step == 1) { //  견적서 메일 발송
            $to_email = $req->eq_email;
            $to_name = $req->eq_name;
            $params = [
                'eq_name'         => $req->eq_name,
                'er_id'           => $er_id,
                'eq_id'           => $eq_id,
                'estimated_date'  => \Carbon\Carbon::now(),
                'er_dlvy_at'      => $req->er_dlvy_at,
                'er_effective_at' => $req->er_effective_at,
                'eq_mng_nm'       => auth()->user()->name,
                'er_mng_tel'      => auth()->user()->tel,
                'er_mng_email'    => auth()->user()->email,
                'estimate_model'  => $req->estimate_model,
                'er_content'      => $req->er_content,
                'er_gd_price'     => $req->er_gd_price,
                'er_surtax'       => $req->er_surtax,
                'er_dlvy_price'   => $req->er_dlvy_price,
                'er_air_price'    => $req->er_air_price,
                'er_all_price'    => $req->er_all_price,
                'er_no_dlvy_fee'  => $req->er_no_dlvy_fee,
                'redirect_url'    => 'dddd',
                'domain'          => cache('site')['domain'],
            ];
            // $this->estimateMailSend($to_email, $to_name, $params, $er_id);
        }

        if($er_id) return response()->json($er_id, 200);
    }

    public function update(Request $req, $er_id) {
        if ($req->type == 'eq_step') { //   견적요청 진행현황 수정
            if (DB::table('shop_estimate_req')->where('eq_id', $req->eq_id)->update(['eq_step' => $req->eq_step]))
                return response()->json('success', 200);
        }
        $eq_impl = $this->estimateReq_paramImplant($req->estimate_req);
        $eq_impl['ip'] = $req->ip();
        $eq_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
        DB::table('shop_estimate_req')->where('eq_id', $req->er_eq_id)->update($eq_impl);

        $er_impl = $this->estimateReply_paramImplant($req);
        $er_impl['updated_id'] = auth()->check() ? auth()->user()->id : 0;
        $er_rst = DB::table('shop_estimate_reply')->where('er_id', $er_id)->update($er_impl);

        //  삭제된걸 파악하기 위해 해당 모델 검색
        $provEstimateModel = $this->estimateModel->select("em_id")->Type('estimateReply')->PapaId($er_id)->pluck('em_id');
        foreach ($req->estimate_model as $key => $em) {
            $em_impl = $this->estimateModel_paramImplant($em, $er_id);
            $em_id = $em['em_id'] ?? 0;
            $udt_em = $this->estimateModel->updateOrCreate(['em_id' => $em_id], $em_impl);
            $provEstimateModel->forget($provEstimateModel->search($em_id));

            $provEstimateOption = $this->estimateOption->select("eo_id")->EmId($em_id)->pluck('eo_id');
            foreach ($em['estimate_option'] as $eo) {
                if (isset($eo['eo_ea'])){
                    $eo_id = $eo['eo_id'] ?? 0;
                    $eo_impl = $this->estimateOption_paramImplant($eo, $em_id);
                    $this->estimateOption->updateOrCreate(['eo_id' => $eo_id], $eo_impl);
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
        if ($req->filled('file_info')) {
            foreach ($req->file_info as $info) {
                if(!isset($info['fi_key']) && $finfo = FileInfo::find($info['fi_id'])) {
         		   	$finfo->fi_key = $er_id;
         		   	$finfo->save();
                }
            }
        }

        if ($req->er_step == 1) { //  견적서 메일 발송
            $to_name = $req->estimate_req['eq_name'];
            $to_email = $req->estimate_req['eq_email'];
            $params = [
                'eq_name'         => $req->estimate_req['eq_name'],
                'er_id'           => $er_id,
                'eq_id'           => $req->er_eq_id,
                'estimated_date'  => \Carbon\Carbon::now(),
                'er_dlvy_at'      => $req->er_dlvy_at,
                'er_effective_at' => $req->er_effective_at,
                'eq_mng_nm'       => auth()->user()->name,
                'er_mng_tel'      => auth()->user()->tel,
                'er_mng_email'    => auth()->user()->email,
                'estimate_model'  => $req->estimate_model,
                'er_content'      => $req->er_content,
                'er_gd_price'     => $req->er_gd_price,
                'er_surtax'       => $req->er_surtax,
                'er_dlvy_price'   => $req->er_dlvy_price,
                'er_air_price'    => $req->er_air_price,
                'er_all_price'    => $req->er_all_price,
                'er_no_dlvy_fee'  => $req->er_no_dlvy_fee,
                'redirect_url'    => 'dddd',
                'domain'          => cache('site')['domain'],
            ];
            $this->estimateMailSend($to_email, $to_name, $params, $er_id);
        }

        if($er_rst) return response()->json('success', 200);
        else return response()->json(["msg"=>"Fail"], 500);
    }

    public function reSend(Request $req, $er_id) {
        $to_name = $req->estimate_req['eq_name'];
        $to_email = $req->estimate_req['eq_email'];
        $params = [
            'eq_name'         => $req->estimate_req['eq_name'],
            'er_id'           => $er_id,
            'eq_id'           => $req->er_eq_id,
            'estimated_date'  => \Carbon\Carbon::now(),
            'er_dlvy_at'      => $req->er_dlvy_at,
            'er_effective_at' => $req->er_effective_at,
            'eq_mng_nm'       => auth()->user()->name,
            'er_mng_tel'      => auth()->user()->tel,
            'er_mng_email'    => auth()->user()->email,
            'estimate_model'  => $req->estimate_model,
            'er_content'      => $req->er_content,
            'er_gd_price'     => $req->er_gd_price,
            'er_surtax'       => $req->er_surtax,
            'er_dlvy_price'   => $req->er_dlvy_price,
            'er_air_price'    => $req->er_air_price,
            'er_all_price'    => $req->er_all_price,
            'er_no_dlvy_fee'  => $req->er_no_dlvy_fee,
            'redirect_url'    => 'dddd',
            'domain'          => cache('site')['domain'],
        ];
        $this->estimateMailSend($to_email, $to_name, $params, $er_id);
    }

    public function estimateMailSend($to_email, $to_name, $content, $er_id) {
        $subject = '[4science] '.$to_name.'님, 요청하신 견적서 메일입니다.';
        $pdf = $this->pdf->loadView('admin.estimate.pdf.estimate', ['er' => EstimateReply::find($er_id)]);
        // $pdf->setOptions(['dpi' => 96 ]);
        $filename = uniqid();
        Storage::put('public/estimatePdf/'.$filename.'.pdf', $pdf->output());
        return Mail::to($to_email)->queue(new EstimateSend(cache('biz')['email'], $subject, $content, public_path('storage/estimatePdf/'.$filename.'.pdf')));
    }

    public function estimateReq_paramImplant($req){
        return [    'eq_type'       => array_key_exists('eq_type', $req) && $req['eq_type']             ? $req['eq_type']       : 'TEMP',
                    'eq_name'       => array_key_exists('eq_name', $req) && $req['eq_name']             ? $req['eq_name']       : '',
                    'eq_email'      => array_key_exists('eq_email', $req) && $req['eq_email']           ? $req['eq_email']      : '',
                    'eq_tel'        => array_key_exists('eq_tel', $req) && $req['eq_tel']               ? $req['eq_tel']        : '',
                    'eq_fax'        => array_key_exists('eq_fax', $req) && $req['eq_fax']               ? $req['eq_fax']        : '',
                    'eq_hp'         => array_key_exists('eq_hp', $req) && $req['eq_hp']                 ? $req['eq_hp']         : '',
                    'eq_department' => array_key_exists('eq_department', $req) && $req['eq_department'] ? $req['eq_department'] : '',
                    'eq_content'    => array_key_exists('eq_content', $req) && $req['eq_content']       ? $req['eq_content']    : '',
                    'eq_mng'        => auth()->check() ? auth()->user()->id : 0, ];
    }
    public function estimateReply_paramImplant($req){
        return [    'er_step'            => $req->filled('er_step')            ? $req->er_step            : 0,
                    'er_content'         => $req->filled('er_content')         ? $req->er_content         : '',
                    'er_dlvy_at'         => $req->filled('er_dlvy_at')         ? $req->er_dlvy_at         : '',
                    'er_effective_at'    => $req->filled('er_effective_at')    ? $req->er_effective_at    : '',
                    'er_gd_price'        => $req->filled('er_gd_price')        ? $req->er_gd_price        : 0,
                    'er_surtax'          => $req->filled('er_surtax')          ? $req->er_surtax          : 0,
                    'er_dlvy_price'      => $req->filled('er_dlvy_price')      ? $req->er_dlvy_price      : 0,
                    'er_air_price'       => $req->filled('er_air_price')       ? $req->er_air_price       : 0,
                    'er_all_price'       => $req->filled('er_all_price')       ? $req->er_all_price       : 0,
                    'er_no_dlvy_fee'     => $req->filled('er_no_dlvy_fee')     ? $req->er_no_dlvy_fee     : 'N',
                    'ip'                 => $req->ip(), ];
    }
    public function estimateModel_paramImplant($em, $er_id){
        return [    'em_type'       => 'estimateReply',
                    'em_papa_id'    => $er_id,
                    'em_gd_id'      => array_key_exists('em_gd_id', $em) && $em['em_gd_id']             ? $em['em_gd_id']      : 0,
                    'em_gm_id'      => array_key_exists('em_gm_id', $em) && $em['em_gm_id']             ? $em['em_gm_id']      : 0,
                    'em_name'       => array_key_exists('em_name', $em) && $em['em_name']               ? $em['em_name']       : '',
                    'em_catno01'    => array_key_exists('em_catno01', $em) && $em['em_catno01']         ? $em['em_catno01']    : 0,
                    'em_catno02'    => array_key_exists('em_catno02', $em) && $em['em_catno02']         ? $em['em_catno02']    : 0,
                    'em_catno03'    => array_key_exists('em_catno03', $em) && $em['em_catno03']         ? $em['em_catno03']    : 0,
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
                    'eo_opc_id' => $eo['eo_opc_id'],
                    'eo_tit' => $eo['eo_tit'],
                    'eo_name' => $eo['eo_name'],
                    'eo_ea' => $eo['eo_ea'],
                    'eo_price' => $eo['eo_price'], ];
    }

    public function destroy(Request $req, int $id) {
        $is_success = false;
        switch ($req->type) {
            case 'req':
                if(EstimateReq::destroy($id))
                    $is_success = true;
                EstimateReply::where('er_eq_id', $id)->delete();
            break;
            case 'reply':   if(EstimateReply::destroy($id)) $is_success = true; break;
        }
        if ($is_success) {
            $rst_data = "success";
            $rst_code = 200;
        } else {
            $rst_data = ["msg"=>"Fail"];
            $rst_code = 500;
        }
        return response()->json($rst_data, $rst_code);
    }

    public function exportEstimateExcel(int $er_id) {
		return Excel::download(new EstimateEstimateExport($er_id), 'estimate.xlsx');
	}

	public function exportEstimatePdf(int $er_id) {
		return $this->pdf->loadView('admin.estimate.pdf.estimate', ['er' => EstimateReply::find($er_id)])
				->download('estimate.pdf'); // ->stream();
	}

	public function exportTransactionExcel(int $er_id) {
		return Excel::download(new EstimateTransactionExport($er_id), 'estimate.xlsx');
	}

	public function exportTransactionPdf(int $er_id) {
		return $this->pdf->loadView('admin.estimate.pdf.transaction', ['er' => EstimateReply::find($er_id)])
				// ->download('estimate.pdf');
				->stream();
	}

    public function showEstimate(Request $req, int $er_id) {
        $er = EstimateReply::find($er_id);
        $type = $req->filled('type') ? $req->type : 'view';
        return view('admin.estimate.pdf.estimate', ['er' => $er, 'type'=>$type]);
	}

}
