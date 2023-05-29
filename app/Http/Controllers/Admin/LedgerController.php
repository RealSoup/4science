<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Ledger, LedgerModel, User, UserMng};
use DB;
use Illuminate\Support\Arr;

class LedgerController extends Controller {
    protected $ledger;
    protected $ledgerModel;

	public function __construct( Ledger $lg, LedgerModel $lm ) {
        $this->ledger = $lg;
        $this->ledgerModel = $lm;
    }

    public function index(Request $req) {
        $lg = $this->ledger->with('ledgerModel');
        $lm = $this->ledgerModel;
        $lg->when($req->pay_type,         fn ($q, $v) => $q->where('lg_pay_type', $v));
        $lg->when($req->od_id,            fn ($q, $v) => $q->where('lg_od_id', $v));
        $lg->when($req->order_dt,         fn ($q, $v) => $q->whereDate('lg_order_dt', $v));
        $lg->when($req->sale_dt,          fn ($q, $v) => $q->whereDate('lg_sale_dt', $v));
        $lg->when($req->created_at_st,    fn ($q, $v) => $q->StartDate($v));
        $lg->when($req->created_at_ed,    fn ($q, $v) => $q->EndDate($v));
        $lg->when($req->od_name,          fn ($q, $v) => $q->where('lg_od_name', 'like', "%{$v}%"));
        $lg->when($req->sum_ea_p,         fn ($q, $v) => $q->where('lg_sum_ea_p', $v));
        $lg->when($req->sum_sum_p,        fn ($q, $v) => $q->where('lg_sum_sum_p', $v));
        $lg->when($req->sum_surtax,       fn ($q, $v) => $q->where('lg_sum_surtax', $v));
        $lg->when($req->distributor,      fn ($q, $v) => $q->where('lg_distributor', 'like', "%{$v}%"));
        $lg->when($req->company,           fn ($q, $v) => $q->where('lg_company', 'like', "%{$v}%"));
        $lg->when($req->orderer,          fn ($q, $v) => $q->where('lg_orderer', $v));
        $lg->when($req->lab_prof,         fn ($q, $v) => $q->where('lg_lab_prof', 'like', "%{$v}%"));
        $lg->when($req->tax_name,         fn ($q, $v) => $q->where('lg_tax_name', $v));
        $lg->when($req->tax_email,        fn ($q, $v) => $q->where('lg_tax_email', 'like', "%{$v}%"));
        $lg->when($req->tax_hp,           fn ($q, $v) => $q->where('lg_tax_hp', $v));
        $lg->when($req->note,             fn ($q, $v) => $q->where('lg_note', 'like', "%{$v}%"));
        $lg->when($req->mng,              fn ($q, $v) => $q->where('lg_mng', $v));
        $lg->when($req['gm_name'],        function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_gm_name', 'like', "%{$req->gm_name}%")->pluck('lm_lg_id')); });
        $lg->when($req['gm_price'],       function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_gm_price',          $req->gm_price)->pluck('lm_lg_id')); });
        $lg->when($req['ea'],             function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_ea',                $req->ea)->pluck('lm_lg_id')); });
        $lg->when($req['ea_price'],       function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_ea_price',          $req->ea_price)->pluck('lm_lg_id')); });
        $lg->when($req['surtax'],         function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_surtax',            $req->surtax)->pluck('lm_lg_id')); });
        $lg->when($req['sum_price'],      function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_sum_price',         $req->sum_price)->pluck('lm_lg_id')); });
        $lg->when($req['gm_spec'],        function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_gm_spec', 'like', "%{$req->gm_spec}%")->pluck('lm_lg_id')); });
        $lg->when($req['catno'],          function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_catno',             $req->catno)->pluck('lm_lg_id')); });
        $lg->when($req['com_order_dt'],   function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_com_order_dt',      $req->com_order_dt)->pluck('lm_lg_id')); });
        $lg->when($req['gm_code'],        function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_gm_code',           $req->gm_code)->pluck('lm_lg_id')); });
        $lg->when($req['order_mng'],      function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_order_mng',         $req->order_mng)->pluck('lm_lg_id')); });
        $lg->when($req['buyer'],          function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_buyer',             $req->buyer)->pluck('lm_lg_id')); });
        $lg->when($req['shipping_dt'],    function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_shipping_dt',       $req->shipping_dt)->pluck('lm_lg_id')); });
        $lg->when($req['purchase_price'], function ($q) use ($req, $lm) { return $q->LgIdArr($lm->where('lm_purchase_price',    $req->purchase_price)->pluck('lm_lg_id')); });




        // if ( $req->filled('startGmPrice') ) {   //  단가
        //     if ( $req->filled('endGmPrice') )
        //         $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_gm_price', [preg_replace("/[^\d]/", "", $req->startGmPrice), preg_replace("/[^\d]/", "", $req->endGmPrice)])->pluck('lm_lg_id'));
        //     else
        //         $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_price', '>=',preg_replace("/[^\d]/", "", $req->startGmPrice))->pluck('lm_lg_id'));

        // } else if ( $req->filled('endGmPrice') ) {
        //     $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_price', '<=',preg_replace("/[^\d]/", "", $req->endGmPrice))->pluck('lm_lg_id'));
        // }

        // if ( $req->filled('startEaPrice') ) {   //  공급가액
        //     if ( $req->filled('endEaPrice') )
        //         $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_ea_price', [preg_replace("/[^\d]/", "", $req->startEaPrice), preg_replace("/[^\d]/", "", $req->endEaPrice)])->pluck('lm_lg_id'));
        //     else
        //         $lg = $lg->LgIdArr($this->ledgerModel->where('lm_ea_price', '>=',preg_replace("/[^\d]/", "", $req->startEaPrice))->pluck('lm_lg_id'));

        // } else if ( $req->filled('endEaPrice') ) {
        //     $lg = $lg->LgIdArr($this->ledgerModel->where('lm_ea_price', '<=',preg_replace("/[^\d]/", "", $req->endEaPrice))->pluck('lm_lg_id'));
        // }

        // if ( $req->filled('startSurtax') ) {    //  세액
        //     if ( $req->filled('endSurtax') )
        //         $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_surtax', [preg_replace("/[^\d]/", "", $req->startSurtax), preg_replace("/[^\d]/", "", $req->endSurtax)])->pluck('lm_lg_id'));
        //     else
        //         $lg = $lg->LgIdArr($this->ledgerModel->where('lm_surtax', '>=',preg_replace("/[^\d]/", "", $req->startSurtax))->pluck('lm_lg_id'));

        // } else if ( $req->filled('endSurtax') ) {
        //     $lg = $lg->LgIdArr($this->ledgerModel->where('lm_surtax', '<=',preg_replace("/[^\d]/", "", $req->endSurtax))->pluck('lm_lg_id'));
        // }

        // if ( $req->filled('startSumPrice') ) {  //  합계
        //     if ( $req->filled('endSumPrice') )
        //         $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_sum_price', [preg_replace("/[^\d]/", "", $req->startSumPrice), preg_replace("/[^\d]/", "", $req->endSumPrice)])->pluck('lm_lg_id'));
        //     else
        //         $lg = $lg->LgIdArr($this->ledgerModel->where('lm_sum_price', '>=',preg_replace("/[^\d]/", "", $req->startSumPrice))->pluck('lm_lg_id'));

        // } else if ( $req->filled('endSumPrice') ) {
        //     $lg = $lg->LgIdArr($this->ledgerModel->where('lm_sum_price', '<=',preg_replace("/[^\d]/", "", $req->endSumPrice))->pluck('lm_lg_id'));
        // }
         
        if ($req->filled('writer'))         $lg->where('created_id', $req->writer);
        // if ($req->filled('mng'))            $lg = $lg->Mng($req->mng);
        
        if ($req->filled('orderer'))        $lg->where('lg_orderer', 'like', "%{$req->orderer}%");
        if ($req->filled('distributor'))    $lg->where('lg_distributor', 'like', "%{$req->distributor}%");
        if ($req->filled('gm_name'))        $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_name', 'like', "%{$req->gm_name}%")->pluck('lm_lg_id'));
        if ($req->filled('catno'))          $lg = $lg->LgIdArr($this->ledgerModel->where('lm_catno', 'like', "%{$req->catno}%")->pluck('lm_lg_id'));
        if ($req->filled('gm_code'))        $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_code', 'like', "%{$req->gm_code}%")->pluck('lm_lg_id'));
        // if ($req->filled('keyword')){
        //     switch ($req->mode) {
        //         case 'orderer':     $lg = $lg->where('lg_orderer', $req->keyword); break;
        //         case 'od_id':   $lg = $lg->where('lg_od_id', $req->keyword); break;
        //         case 'distributor': $lg = $lg->where('lg_distributor', 'like', "%{$req->keyword}%"); break;
        //         case 'gm_name':     $lg = $lg->where('lm_gm_name', 'like', "%{$req->keyword}%"); break;
        //         case 'catno':       $lg = $lg->where('lm_catno', $req->keyword); break;
        //         case 'gm_code':     $lg = $lg->where('lm_gm_code', $req->keyword); break;
        //     }
        // }
        // echo_query($lg);
        // dd($data);
        
        // $lg->when(auth()->user()->UserMng->um_group == 'acc', fn ($q, $v) => $q->where('lg_step', 2));
        
        $data['lg'] = $lg->latest()->orderByDesc('lg_id')->paginate(20);
        
        $config = auth()->user()->UserMngConfig;
        if (!count($config->where('umc_key', 'COLUMN'))) {
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'order_dt']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'pay_type']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'mng']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'od_id']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'sale_dt']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'distributor']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'company']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'lab_prof']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'orderer']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'od_name']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'sum_ea_p']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'sum_surtax']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'sum_sum_p']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'tax_name']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'tax_email']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'tax_hp']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'note']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'created_at']);
               $config->push([ 'umc_key' => 'COLUMN', 'umc_val' => 'model']);
               
        }
        
        if (!count($config->where('umc_key', 'MODEL'))) {
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'gm_name']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'gm_spec']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'catno']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'gm_code']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'gm_price']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'ea']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'ea_price']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'surtax']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'sum_price']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'com_order_dt']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'buyer']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'order_mng']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'purchase_price']);
            $config->push([ 'umc_key' => 'MODEL', 'umc_val' => 'shipping_dt']);
        }
        $data['mng_config'] = $config->groupBy('umc_key');
        //  여기서 groupBy는 쿼리 생성 엘로퀀트가 아니라, 콜렉션 메서드이다
        //  데이터를 해당 키워드로 분리해서 배열로 내보낸다
        
        
        $data['mng'] = DB::table('users')->join('user_mng', 'users.id', '=', 'user_mng.um_user_id')->get();

        if( auth()->user()->UserMng->um_position >= 4 )  // 부장이상
            $data['writer'] = $data['mng'];
        elseif( !is_null(auth()->user()->UserMng->um_responsibility) )
            $data['writer'] = $data['mng']->where('um_group', auth()->user()->UserMng->um_responsibility);

        $um = new UserMng;
        $data['mng_info'] = $um->getMngInfo();
        $data['config'] = Ledger::$config;

        return response()->json($data, 200);
    }

    public function store(Request $req) {
        if (DB::table('ledger')->where('lg_od_id', $req->od_id)->doesntExist()) {
            //  od_has_ledger 로 체크 할 수 후 있지만 여러번 클릭시 중복 등록 방지
            $lg_id = DB::table('ledger')->insertGetId([
                'lg_mng'         => $req->od_mng_nm,
                'lg_source_type' => $req->data_type,
                'lg_od_id'       => $req->od_id,
                'lg_company'     => $req->od_company,
                'lg_part'        => $req->od_part,
                'lg_orderer'     => $req->od_orderer,
                'lg_od_name'     => $req->od_name,
                'lg_tax_name'    => $req->order_extra_info ? $req->order_extra_info['oex_mng'] : '',
                'lg_tax_email'   => $req->order_extra_info ? $req->order_extra_info['oex_email'] : '',
                'lg_tax_hp'      => $req->order_extra_info ? $req->order_extra_info['oex_num'] : '',
                'created_id'     => auth()->user()->id,
                'ip'             => $req->ip(),
            ]);
            $sum_ea_p = 0;
            $sum_surtax = 0;
            $sum_sum_p = 0;
            foreach ($req->order_purchase_at as $opa) {
                $lm = array();
                foreach ($opa['order_model'] as $odm) {
                    $lm_gm_name = '';
                    $lm_gm_spec = '';
                    $lm_catno   = '';
                    $lm_gm_code = '';
                    
                    if ($odm['odm_type'] == 'MODEL') {
                        $lm_gm_name = $odm['odm_gm_name'];
                        $lm_gm_spec = $odm['odm_gm_spec'];
                        $lm_catno   = $odm['odm_gm_catno'];
                        $lm_gm_code = $odm['odm_gm_code'];
                    } else if ($odm['odm_type'] == 'OPTION') {
                        $lm_gm_name ="{$odm['odm_gm_name']}: {$odm['odm_gm_spec']}";
                    }
                    
                    $sum_ea_p   += $odm['odm_price']*$odm['odm_ea'];
                    $sum_surtax += bcmul($odm['odm_price']*$odm['odm_ea'], 0.1);
                    $sum_sum_p  += bcmul($odm['odm_price']*$odm['odm_ea'], 1.1);
                    $lm[] = array(
                        'lm_lg_id'     => $lg_id,
                        'lm_gm_name'   => $lm_gm_name,
                        'lm_gm_spec'   => $lm_gm_spec,
                        'lm_catno'     => $lm_catno,
                        'lm_gm_code'   => $lm_gm_code,
                        'lm_gm_price'  => $odm['odm_price'],
                        'lm_ea'        => $odm['odm_ea'],
                        'lm_ea_price'  => $odm['odm_price']*$odm['odm_ea'],
                        'lm_surtax'    => bcmul($odm['odm_price']*$odm['odm_ea'], 0.1),
                        'lm_sum_price' => bcmul($odm['odm_price']*$odm['odm_ea'], 1.1),
                        'created_id'   => auth()->user()->id,
                        'ip'           => $req->ip(),
                    );
                }

                $rst = DB::table('ledger_model')->insert($lm);
            }
            DB::table('ledger')->where('lg_id', $lg_id)->update([
                'lg_sum_ea_p' => $sum_ea_p,
                'lg_sum_surtax' => $sum_surtax,
                'lg_sum_sum_p' => $sum_sum_p,
            ]);
            DB::table('shop_order')->where('od_id', $req->od_id)->update(['od_has_ledger' => 'Y']);
        } else 
            return response()->json(["msg"=>"Existed"], 200);
       
        if ($rst)
            return response()->json(["msg"=>"Success"], 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function update(Request $req, $lg_id) {
        if ( $req->filled('type') && $req->type == 'all_price_update' ) {
            $lg = $this->ledger->find($lg_id);
            $lg->lg_sum_ea_p    = $req->lg_sum_ea_p;
            $lg->lg_sum_surtax  = $req->lg_sum_surtax;
            $lg->lg_sum_sum_p   = $req->lg_sum_sum_p;
            $rst = $lg->save();
        } else if ( $req->filled('type') && $req->type == 'to_accounting' ) {
            $rst = DB::table('ledger')->whereIn('lg_id', $req->lg_ids)->update(['lg_step' => 2]);
        } else {
            if ($req->filled('lm_lg_id')){
                $lm_impl = [ 'lm_lg_id'          => $req->lm_lg_id,
                             'lm_gm_name'        => $req->lm_gm_name,
                             'lm_gm_spec'        => $req->lm_gm_spec,
                             'lm_catno'          => $req->lm_catno,
                             'lm_gm_code'        => $req->lm_gm_code,
                             'lm_gm_price'       => $req->lm_gm_price,
                             'lm_ea'             => $req->lm_ea,
                             'lm_ea_price'       => $req->lm_ea_price,
                             'lm_surtax'         => $req->lm_surtax,
                             'lm_sum_price'      => $req->lm_sum_price,
                             'lm_com_order_dt'   => $req->lm_com_order_dt,
                             'lm_buyer'          => $req->lm_buyer,
                             'lm_order_mng'      => $req->lm_order_mng,
                             'lm_purchase_price' => $req->lm_purchase_price,
                             'lm_shipping_dt'    => $req->lm_shipping_dt,
                             'lm_cxl'            => $req->filled('lm_cxl') ? $req->lm_cxl : 'N',
                             'ip'                => $req->ip(), ];
                $column_keyword = 'created_id';
                if ($req->filled('lm_id')) $column_keyword = 'updated_id';
                $lm_impl = Arr::collapse([$lm_impl, [$column_keyword => auth()->user()->id]]);
                $rst = $this->ledgerModel->updateOrCreate( ['lm_id' => $req->lm_id], $lm_impl );
            } else {
                $lg_impl = [ 'lg_source_type' => $req->data_type ?? 'TMP',
                             'lg_order_dt'    => $req->lg_order_dt,
                             'lg_pay_type'    => $req->lg_pay_type,
                             'lg_mng'         => $req->lg_mng,
                             'lg_od_id'       => $req->lg_od_id,
                             'lg_sale_dt'     => $req->lg_sale_dt,
                             'lg_distributor' => $req->lg_distributor,
                             'lg_company'      => $req->lg_company,
                             'lg_lab_prof'    => $req->lg_lab_prof,
                             'lg_orderer'     => $req->lg_orderer,
                             'lg_od_name'     => $req->lg_od_name,
                             'lg_sum_ea_p'    => $req->lg_sum_ea_p,
                             'lg_sum_surtax'  => $req->lg_sum_surtax,
                             'lg_sum_sum_p'   => $req->lg_sum_sum_p,
                             'lg_tax_name'    => $req->lg_tax_name,
                             'lg_tax_email'   => $req->lg_tax_email,
                             'lg_tax_hp'      => $req->lg_tax_hp,
                             'lg_note'        => $req->lg_note,
                             'ip'             => $req->ip(), ];
                $column_keyword = 'created_id';
                if ($req->filled('lg_id')) $column_keyword = 'updated_id';
                $lg_impl = Arr::collapse([$lg_impl, [$column_keyword => auth()->user()->id]]);
                $rst = $this->ledger->updateOrCreate( ['lg_id' => $req->lg_id], $lg_impl );
            }
        }
        
        
        if ($rst)   return response()->json(["msg"=>"Success"], 200);
        else        return response()->json(["msg"=>"Fail"], 500);
    }

    public function updateColumn(Request $req) {
        
        if($req->filled('COLUMN')) {
            DB::table('user_mng_config')
                ->where([['umc_user_id', '=', auth()->user()->id], ['umc_key', '=', 'COLUMN']])
                ->delete();
            $data_insert = Array();
            foreach ($req->COLUMN as $k => $v) {
                array_push($data_insert, [
                    'umc_user_id' => auth()->user()->id, 
                    'umc_seq' => $k,
                    'umc_key' => 'COLUMN',
                    'umc_val' => $v['umc_val']
                ]);
            }
            DB::table('user_mng_config')->insert($data_insert);            
        }

        if($req->filled('MODEL')) {
            DB::table('user_mng_config')
                ->where([['umc_user_id', '=', auth()->user()->id], ['umc_key', '=', 'MODEL']])
                ->delete();
            $data_insert = Array();
            foreach ($req->MODEL as $k => $v) {
                array_push($data_insert, [
                    'umc_user_id' => auth()->user()->id, 
                    'umc_seq' => $k,
                    'umc_key' => 'MODEL',
                    'umc_val' => $v['umc_val']
                ]);
            }
            DB::table('user_mng_config')->insert($data_insert);            
        }
    }

    public function destroy(Request $req, $lg_id) {
        if($req->filled('lm_id')) {
            $rst = DB::table('ledger_model')->where('lm_id', $req->lm_id)->update(['lm_cxl' => 'Y']);
        } else {
            $rst = DB::table('ledger')->where('lg_id', $lg_id)->update(['lg_pay_type' => 'CXL']);
            // $lg = $this->ledger->find($lg_id);
            // DB::table('shop_order')->where('od_id', $lg->lg_od_id)->update(['od_has_ledger' => 'N']);
            // $rst = $lg->delete();            
        }
        return response()->json(["message"=>'success'], 200);
        // if ($rst) return response()->json(["message"=>'success'], 200);
        // else      return response()->json(["msg"=>"Fail"], 500);
    }
}