<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Ledger, LedgerModel, User, UserMng};
use DB;

class LedgerController extends Controller {
    protected $ledger;
    protected $ledgerModel;

	public function __construct( Ledger $lg, LedgerModel $lm ) {
        $this->ledger = $lg;
        $this->ledgerModel = $lm;
    }

    public function index(Request $req) {
        $lg = $this->ledger->with('ledgerModel');
        if ($req->filled('startDate'))      $lg = $lg->StartDate($req->startDate);
        if ($req->filled('endDate'))        $lg = $lg->EndDate($req->endDate);

        if ( $req->filled('startGmPrice') ) {   //  단가
            if ( $req->filled('endGmPrice') )
                $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_gm_price', [preg_replace("/[^\d]/", "", $req->startGmPrice), preg_replace("/[^\d]/", "", $req->endGmPrice)])->pluck('lm_lg_id'));
            else
                $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_price', '>=',preg_replace("/[^\d]/", "", $req->startGmPrice))->pluck('lm_lg_id'));

        } else if ( $req->filled('endGmPrice') ) {
            $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_price', '<=',preg_replace("/[^\d]/", "", $req->endGmPrice))->pluck('lm_lg_id'));
        }

        if ( $req->filled('startEaPrice') ) {   //  공급가액
            if ( $req->filled('endEaPrice') )
                $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_ea_price', [preg_replace("/[^\d]/", "", $req->startEaPrice), preg_replace("/[^\d]/", "", $req->endEaPrice)])->pluck('lm_lg_id'));
            else
                $lg = $lg->LgIdArr($this->ledgerModel->where('lm_ea_price', '>=',preg_replace("/[^\d]/", "", $req->startEaPrice))->pluck('lm_lg_id'));

        } else if ( $req->filled('endEaPrice') ) {
            $lg = $lg->LgIdArr($this->ledgerModel->where('lm_ea_price', '<=',preg_replace("/[^\d]/", "", $req->endEaPrice))->pluck('lm_lg_id'));
        }

        if ( $req->filled('startSurtax') ) {    //  세액
            if ( $req->filled('endSurtax') )
                $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_surtax', [preg_replace("/[^\d]/", "", $req->startSurtax), preg_replace("/[^\d]/", "", $req->endSurtax)])->pluck('lm_lg_id'));
            else
                $lg = $lg->LgIdArr($this->ledgerModel->where('lm_surtax', '>=',preg_replace("/[^\d]/", "", $req->startSurtax))->pluck('lm_lg_id'));

        } else if ( $req->filled('endSurtax') ) {
            $lg = $lg->LgIdArr($this->ledgerModel->where('lm_surtax', '<=',preg_replace("/[^\d]/", "", $req->endSurtax))->pluck('lm_lg_id'));
        }

        if ( $req->filled('startSumPrice') ) {  //  합계
            if ( $req->filled('endSumPrice') )
                $lg = $lg->LgIdArr($this->ledgerModel->whereBetween('lm_sum_price', [preg_replace("/[^\d]/", "", $req->startSumPrice), preg_replace("/[^\d]/", "", $req->endSumPrice)])->pluck('lm_lg_id'));
            else
                $lg = $lg->LgIdArr($this->ledgerModel->where('lm_sum_price', '>=',preg_replace("/[^\d]/", "", $req->startSumPrice))->pluck('lm_lg_id'));

        } else if ( $req->filled('endSumPrice') ) {
            $lg = $lg->LgIdArr($this->ledgerModel->where('lm_sum_price', '<=',preg_replace("/[^\d]/", "", $req->endSumPrice))->pluck('lm_lg_id'));
        }
         
        if ($req->filled('writer'))         $lg->where('created_id', $req->writer);
        if ($req->filled('mng'))            $lg = $lg->Mng($req->mng);
        if ($req->filled('pay_type'))       $lg = $lg->PayType($req->pay_type);
        if ($req->filled('od_id'))      $lg->where('lg_od_id', $req->od_id);
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
        
        $data['user_mng_config'] = auth()->user()->UserMngConfig->groupBy('umc_key');;
        
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
        if($req->filled('data_type') && $req->data_type == 'ORD') {
            if (DB::table('ledger')->where('lg_od_id', $req->od_id)->doesntExist()) {
                //  od_has_ledger 로 체크 할 ㅅ후 있지만 여러번 클릭시 중복 등록 방지
                $lg_id = DB::table('ledger')->insertGetId([
                    'lg_mng'         => $req->od_mng_nm,
                    'lg_source_type' => $req->data_type,
                    'lg_od_id'       => $req->od_id,
                    'lg_depart'      => $req->od_department,
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
            
        } 
        // else if($req->filled('data_type') && $req->data_type == 'EST') {
        //     $lg_id = DB::table('ledger')->insertGetId([
        //         'lg_mng'         => $req->user['name'],
        //         'lg_source_type' => $req->data_type,
        //         'lg_od_id'   => $req->er_id,
        //         'lg_depart'      => $req->estimate_req['eq_department'],
        //         'lg_orderer'     => $req->estimate_req['eq_name'],
        //         'created_id'    => auth()->user()->id,
        //         'ip'             => $req->ip(),
        //     ]);

        //     foreach ($req->estimate_model as $em) {
        //         foreach ($em['estimate_option'] as $eo) {
        //             $rst = LedgerModel::create([
        //                 'lm_lg_id'     => $lg_id,
        //                 'lm_gm_name'   => "{$eo['eo_tit']} - {$eo['eo_name']}",
        //                 'lm_gm_price'  => $eo['eo_price'],
        //                 'lm_ea'        => $eo['eo_ea'],
        //                 'lm_ea_price'  => $eo['eo_price']*$eo['eo_ea'],
        //                 'lm_surtax'    => intval(($eo['eo_price']*$eo['eo_ea'])*0.1),
        //                 'lm_sum_price' => intval(($eo['eo_price']*$eo['eo_ea'])*1.1),
        //             ]);
        //         }
        //         $rst = LedgerModel::create([
        //             'lm_lg_id'     => $lg_id,
        //             'lm_gm_name'   => $em['em_name'],
        //             'lm_gm_spec'   => $em['em_spec'],
        //             'lm_catno'     => $em['em_catno'],
        //             'lm_gm_code'   => $em['em_code'],
        //             'lm_gm_price'  => $em['em_price'],
        //             'lm_ea'        => $em['em_ea'],
        //             'lm_ea_price'  => $em['em_price']*$em['em_ea'],
        //             'lm_surtax'    => intval(($em['em_price']*$em['em_ea'])*0.1),
        //             'lm_sum_price' => intval(($em['em_price']*$em['em_ea'])*1.1),
        //         ]);
        //     }
        // } 
        else {
            if ($req->filled('lm_lg_id')) {
                $ledgerModel = $this->ledgerModel_paramImplant($this->ledgerModel, $req);
                $ledgerModel->created_id = auth()->user()->id;
                $rst = $ledgerModel->save();
            } else {
                $ledger = $this->ledger_paramImplant($this->ledger, $req);
                $ledger->created_id = auth()->user()->id;
                $rst = $ledger->save();
            }

            
        }
        
       
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
            if ($req->filled('lm_lg_id'))   $rst = $this->ledgerModel_paramImplant($this->ledgerModel->find($req->lm_id), $req)->save();
            else                            $rst = $this->ledger_paramImplant($this->ledger->find($lg_id), $req)->save();
        }
        
        
        if ($rst)   return response()->json(["msg"=>"Success"], 200);
        else        return response()->json(["msg"=>"Fail"], 500);
    }

    public function ledger_paramImplant($ledger, $req){
        $ledger->lg_source_type = $req->data_type ?? 'TMP';
        $ledger->lg_order_dt    = $req->lg_order_dt;
        $ledger->lg_pay_type    = $req->lg_pay_type;
        $ledger->lg_mng         = $req->lg_mng;
        $ledger->lg_od_id       = $req->lg_od_id;
        $ledger->lg_sale_dt     = $req->lg_sale_dt;
        $ledger->lg_distributor = $req->lg_distributor;
        $ledger->lg_depart      = $req->lg_depart;
        $ledger->lg_lab_prof    = $req->lg_lab_prof;
        $ledger->lg_orderer     = $req->lg_orderer;
        $ledger->lg_od_name     = $req->lg_od_name;
        $ledger->lg_sum_ea_p    = str_replace(',', '', $req->lg_sum_ea_p);
        $ledger->lg_sum_surtax  = str_replace(',', '', $req->lg_sum_surtax);
        $ledger->lg_sum_sum_p   = str_replace(',', '', $req->lg_sum_sum_p);
        $ledger->lg_tax_name    = $req->lg_tax_name;
        $ledger->lg_tax_email   = $req->lg_tax_email;
        $ledger->lg_tax_hp      = $req->lg_tax_hp;
        $ledger->lg_note        = $req->lg_note;
        $ledger->ip             = $req->ip();
        return $ledger;
    }

    public function ledgerModel_paramImplant($ledgerModel, $req) {
        $ledgerModel->lm_lg_id          = $req->lm_lg_id;
        $ledgerModel->lm_gm_name        = $req->lm_gm_name;
        $ledgerModel->lm_gm_spec        = $req->lm_gm_spec;
        $ledgerModel->lm_catno          = $req->lm_catno;
        $ledgerModel->lm_gm_code        = $req->lm_gm_code;        
        $ledgerModel->lm_gm_price       = str_replace(',', '', $req->lm_gm_price);       
        $ledgerModel->lm_ea             = str_replace(',', '', $req->lm_ea);             
        $ledgerModel->lm_ea_price       = str_replace(',', '', $req->lm_ea_price);       
        $ledgerModel->lm_surtax         = str_replace(',', '', $req->lm_surtax);         
        $ledgerModel->lm_sum_price      = str_replace(',', '', $req->lm_sum_price);      
        $ledgerModel->lm_com_order_dt   = $req->lm_com_order_dt;   
        $ledgerModel->lm_buyer          = $req->lm_buyer;          
        $ledgerModel->lm_order_mng      = $req->lm_order_mng;      
        $ledgerModel->lm_purchase_price = str_replace(',', '', $req->lm_purchase_price); 
        $ledgerModel->lm_shipping_dt    = $req->lm_shipping_dt;
        $ledgerModel->lm_cxl            = $req->filled('lm_cxl') ? $req->lm_cxl : 'N';
        $ledgerModel->ip                = $req->ip();
        return $ledgerModel;
    }

    public function destroy(Request $req, $lg_id) {
        if($req->filled('lm_id'))   $rst = $this->ledgerModel->destroy($req->lm_id);
        else {
            DB::table('ledger_model')->where('lm_lg_id', $lg_id)->delete();
            $lg = $this->ledger->find($lg_id);
            DB::table('shop_order')->where('od_id', $lg->lg_od_id)->update(['od_has_ledger' => 'N']);
            $rst = $lg->delete();            
        }
        if ($rst) return response()->json(["message"=>'success'], 200);
        else      return response()->json(["msg"=>"Fail"], 500);
    }

    public function updateSearch(Request $req) {
        if($req->filled('chosen_data')) {
            DB::table('user_mng_config')
                ->where([['umc_user_id', '=', auth()->user()->id], ['umc_key', '=', 'SEARCH']])
                ->delete();
            $data_insert = Array();
            foreach ($req->chosen_data as $k => $v) {
                array_push($data_insert, [
                    'umc_user_id' => auth()->user()->id, 
                    'umc_seq' => $k,
                    'umc_key' => 'SEARCH',
                    'umc_val' => $v['umc_val']
                ]);
            }
            DB::table('user_mng_config')->insert($data_insert);            
        }
    }

    public function updateColumn(Request $req) {
        if($req->filled('chosen_data_clmn')) {
            DB::table('user_mng_config')
                ->where([['umc_user_id', '=', auth()->user()->id], ['umc_key', '=', 'COLUMN']])
                ->delete();
            $data_insert = Array();
            foreach ($req->chosen_data_clmn as $k => $v) {
                array_push($data_insert, [
                    'umc_user_id' => auth()->user()->id, 
                    'umc_seq' => $k,
                    'umc_key' => 'COLUMN',
                    'umc_val' => $v['umc_val']
                ]);
            }
            DB::table('user_mng_config')->insert($data_insert);            
        }

        if($req->filled('chosen_data_model')) {
            DB::table('user_mng_config')
                ->where([['umc_user_id', '=', auth()->user()->id], ['umc_key', '=', 'MODEL']])
                ->delete();
            $data_insert = Array();
            foreach ($req->chosen_data_model as $k => $v) {
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
    
}
