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
        if ($req->filled('source_no'))      $lg->where('lg_source_no', $req->source_no);
        if ($req->filled('orderer'))        $lg->where('lg_orderer', 'like', "%{$req->orderer}%");
        if ($req->filled('distributor'))    $lg->where('lg_distributor', 'like', "%{$req->distributor}%");
        if ($req->filled('gm_name'))        $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_name', 'like', "%{$req->gm_name}%")->pluck('lm_lg_id'));
        if ($req->filled('catno'))          $lg = $lg->LgIdArr($this->ledgerModel->where('lm_catno', 'like', "%{$req->catno}%")->pluck('lm_lg_id'));
        if ($req->filled('gm_code'))        $lg = $lg->LgIdArr($this->ledgerModel->where('lm_gm_code', 'like', "%{$req->gm_code}%")->pluck('lm_lg_id'));
        // if ($req->filled('keyword')){
        //     switch ($req->mode) {
        //         case 'orderer':     $lg = $lg->where('lg_orderer', $req->keyword); break;
        //         case 'source_no':   $lg = $lg->where('lg_source_no', $req->keyword); break;
        //         case 'distributor': $lg = $lg->where('lg_distributor', 'like', "%{$req->keyword}%"); break;
        //         case 'gm_name':     $lg = $lg->where('lm_gm_name', 'like', "%{$req->keyword}%"); break;
        //         case 'catno':       $lg = $lg->where('lm_catno', $req->keyword); break;
        //         case 'gm_code':     $lg = $lg->where('lm_gm_code', $req->keyword); break;
        //     }
        // }
        // echo_query($lg);
        // dd($data);
        $data['lg'] = $lg->latest()->orderByDesc('lg_id')->paginate(20);
        $data['total']['ea_price'] = $data['lg']->reduce(function ($carry01, $lg) {
            return $carry01 + ($lg->lg_pay_type !== 'CXL' ? $lg->ledgerModel->reduce(function ($carry02, $lm) {
                return $carry02 + ($lm->lm_cxl !== 'Y' ? $lm->lm_ea_price : 0);
            }, 0) : 0);
        }, 0);
        $data['total']['sum_price'] = $data['lg']->reduce(function ($carry01, $lg) {
            return $carry01 + ($lg->lg_pay_type !== 'CXL' ? $lg->ledgerModel->reduce(function ($carry02, $lm) {
                return $carry02 + ($lm->lm_cxl !== 'Y' ? $lm->lm_sum_price : 0);
            }, 0) : 0);
        }, 0);
        $data['user_mng_config'] = auth()->user()->UserMngConfig->groupBy('umc_key');;
        
        $data['mng'] = DB::table('users')->join('user_mng', 'users.id', '=', 'user_mng.um_user_id')->get();

        if( auth()->user()->UserMng->um_position >= 4 )  // 부장이상
            $data['writer'] = $data['mng'];
        elseif( !is_null(auth()->user()->UserMng->um_responsibility) )
            $data['writer'] = $data['mng']->where('um_group', auth()->user()->UserMng->um_responsibility);

        $um = new UserMng;
        $data['mng_info'] = $um->getMngInfo();

        return response()->json($data, 200);
    }

    public function store(Request $req) {
        
        if($req->filled('data_type') && $req->data_type == 'ORD') {
            // $lg_pay_type = $req->od_pay_method == 'C' ? 'CARD' : NULL;

            $lg_id = DB::table('ledger')->insertGetId([
                'lg_mng'         => $req->od_mng_nm,
                'lg_source_type' => $req->data_type,
                'lg_source_no'   => $req->od_id,
                'lg_depart'      => $req->od_department,
                'lg_orderer'     => $req->od_orderer,
                'created_id'     => auth()->user()->id,
                'ip'             => $req->ip(),
            ]);

            foreach ($req->order_goods as $gd) {
                $lm = array();
                foreach ($gd['order_option'] as $opc) {
                    $lm[] = array(
                        'lm_lg_id'     => $lg_id,
                        'lm_gm_name'   => $opc['odo_opc_name'],
                        'lm_gm_price'  => $opc['odo_price'],
                        'lm_ea'        => $opc['odo_ea'],
                        'lm_ea_price'  => $opc['odo_price']*$opc['odo_ea'],
                        'lm_surtax'    => intval(($opc['odo_price']*$opc['odo_ea'])*0.1),
                        'lm_sum_price' => intval(($opc['odo_price']*$opc['odo_ea'])*1.1),
                        'created_id'   => auth()->user()->id,
                        'ip'           => $req->ip(),
                    );
                    // $rst = LedgerModel::create([
                    //     'lm_lg_id'     => $lg_id,
                    //     'lm_gm_name'   => $opc['odo_opc_name'],
                    //     'lm_gm_price'  => $opc['odo_price'],
                    //     'lm_ea'        => $opc['odo_ea'],
                    //     'lm_ea_price'  => $opc['odo_price']*$opc['odo_ea'],
                    //     'lm_surtax'    => intval(($opc['odo_price']*$opc['odo_ea'])*0.1),
                    //     'lm_sum_price' => intval(($opc['odo_price']*$opc['odo_ea'])*1.1),
                    //     'created_id'   => auth()->user()->id,
                    //     'ip'           => $req->ip(),
                    // ]);      
                }
                DB::table('ledger_model')->insert($lm);
                
                $lm = array();
                foreach ($gd['order_model'] as $gm) {
                    $lm[] = array(
                        'lm_lg_id'     => $lg_id,
                        'lm_gm_name'   => $gm['odm_gm_name'],
                        'lm_gm_spec'   => $gm['odm_gm_spec'],
                        'lm_catno'     => $gm['odm_gm_catno'],
                        'lm_gm_code'   => $gm['odm_gm_code'],
                        'lm_gm_price'  => $gm['odm_price'],
                        'lm_ea'        => $gm['odm_ea'],
                        'lm_ea_price'  => $gm['odm_price']*$gm['odm_ea'],
                        'lm_surtax'    => intval(($gm['odm_price']*$gm['odm_ea'])*0.1),
                        'lm_sum_price' => intval(($gm['odm_price']*$gm['odm_ea'])*1.1),
                        'created_id'   => auth()->user()->id,
                        'ip'           => $req->ip(),
                    );
                    // $rst = LedgerModel::create([
                    //     'lm_lg_id'     => $lg_id,
                    //     'lm_gm_name'   => $gm['odm_gm_name'],
                    //     'lm_gm_spec'   => $gm['odm_gm_spec'],
                    //     'lm_catno'     => $gm['odm_gm_catno'],
                    //     'lm_gm_code'   => $gm['odm_gm_code'],
                    //     'lm_gm_price'  => $gm['odm_price'],
                    //     'lm_ea'        => $gm['odm_ea'],
                    //     'lm_ea_price'  => $gm['odm_price']*$gm['odm_ea'],
                    //     'lm_surtax'    => intval(($gm['odm_price']*$gm['odm_ea'])*0.1),
                    //     'lm_sum_price' => intval(($gm['odm_price']*$gm['odm_ea'])*1.1),
                    //     'created_id'   => auth()->user()->id,
                    //     'ip'           => $req->ip(),
                    // ]);
                }
                DB::table('ledger_model')->insert($lm);
            }
            
        } else if($req->filled('data_type') && $req->data_type == 'EST') {
            $lg_id = DB::table('ledger')->insertGetId([
                'lg_mng'         => $req->user['name'],
                'lg_source_type' => $req->data_type,
                'lg_source_no'   => $req->er_id,
                'lg_depart'      => $req->estimate_req['eq_department'],
                'lg_orderer'     => $req->estimate_req['eq_name'],
                'created_id'    => auth()->user()->id,
                'ip'             => $req->ip(),
            ]);

            foreach ($req->estimate_model as $em) {
                foreach ($em['estimate_option'] as $eo) {
                    $rst = LedgerModel::create([
                        'lm_lg_id'     => $lg_id,
                        'lm_gm_name'   => "{$eo['eo_tit']} - {$eo['eo_name']}",
                        'lm_gm_price'  => $eo['eo_price'],
                        'lm_ea'        => $eo['eo_ea'],
                        'lm_ea_price'  => $eo['eo_price']*$eo['eo_ea'],
                        'lm_surtax'    => intval(($eo['eo_price']*$eo['eo_ea'])*0.1),
                        'lm_sum_price' => intval(($eo['eo_price']*$eo['eo_ea'])*1.1),
                    ]);
                }
                $rst = LedgerModel::create([
                    'lm_lg_id'     => $lg_id,
                    'lm_gm_name'   => $em['em_name'],
                    'lm_gm_spec'   => $em['em_spec'],
                    'lm_catno'     => $em['em_catno'],
                    'lm_gm_code'   => $em['em_code'],
                    'lm_gm_price'  => $em['em_price'],
                    'lm_ea'        => $em['em_ea'],
                    'lm_ea_price'  => $em['em_price']*$em['em_ea'],
                    'lm_surtax'    => intval(($em['em_price']*$em['em_ea'])*0.1),
                    'lm_sum_price' => intval(($em['em_price']*$em['em_ea'])*1.1),
                ]);
            }
        } else {
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
        if ($req->filled('lm_lg_id'))   $rst = $this->ledgerModel_paramImplant($this->ledgerModel->find($req->lm_id), $req)->save();
        else                            $rst = $this->ledger_paramImplant($this->ledger->find($lg_id), $req)->save();
        
        if ($rst)   return response()->json(["msg"=>"Success"], 200);
        else        return response()->json(["msg"=>"Fail"], 500);
    }

    public function ledger_paramImplant($ledger, $req){
        $ledger->lg_order_dt    = $req->lg_order_dt;
        $ledger->lg_pay_type    = $req->lg_pay_type;
        $ledger->lg_mng         = $req->lg_mng;
        $ledger->lg_source_no   = $req->lg_source_no;
        $ledger->lg_sale_dt     = $req->lg_sale_dt;
        $ledger->lg_distributor = $req->lg_distributor;
        $ledger->lg_depart      = $req->lg_depart;
        $ledger->lg_lab_prof    = $req->lg_lab_prof;
        $ledger->lg_orderer     = $req->lg_orderer;
        $ledger->lg_email       = $req->lg_email;
        $ledger->lg_hp          = $req->lg_hp;
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
            $rst = $this->ledger->destroy($lg_id);
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
