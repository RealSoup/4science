<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Ledger, User};
use DB;

class LedgerController extends Controller {
    protected $ledger;

	public function __construct( Ledger $lg ) {
        $this->ledger = $lg;
    }

    public function index(Request $req) {
        $lg = new Ledger;
        if ($req->filled('startDate'))      $lg = $lg->StartDate($req->startDate);
        if ($req->filled('endDate'))        $lg = $lg->EndDate($req->endDate);
        if ($req->filled('startGmPrice'))   $lg = $lg->StartGmPrice(str_replace(',', '', $req->startGmPrice));
        if ($req->filled('endGmPrice'))     $lg = $lg->EndGmPrice(str_replace(',', '', $req->endGmPrice));
        if ($req->filled('startEaPrice'))   $lg = $lg->StartEaPrice(str_replace(',', '', $req->startEaPrice));
        if ($req->filled('endEaPrice'))     $lg = $lg->EndEaPrice(str_replace(',', '', $req->endEaPrice));
        if ($req->filled('startSurtax'))    $lg = $lg->StartSurtax(str_replace(',', '', $req->startSurtax));
        if ($req->filled('endSurtax'))      $lg = $lg->EndSurtax(str_replace(',', '', $req->endSurtax));
        if ($req->filled('startSumPrice'))  $lg = $lg->StartSumPrice(str_replace(',', '', $req->startSumPrice));
        if ($req->filled('endSumPrice'))    $lg = $lg->EndSumPrice(str_replace(',', '', $req->endSumPrice));
        if ($req->filled('mng'))            $lg = $lg->Mng($req->mng);
        if ($req->filled('pay_type'))       $lg = $lg->PayType($req->pay_type);
        if ($req->filled('keyword')){
            switch ($req->mode) {
                case 'orderer':     $lg = $lg->where('lg_orderer', $req->keyword); break;
                case 'source_no':   $lg = $lg->where('lg_source_no', $req->keyword); break;
                case 'distributor': $lg = $lg->where('lg_distributor', 'like', "%{$req->keyword}%"); break;
                case 'gm_name':     $lg = $lg->where('lg_gm_name', 'like', "%{$req->keyword}%"); break;
                case 'catno':       $lg = $lg->where('lg_catno', $req->keyword); break;
                case 'gm_code':     $lg = $lg->where('lg_gm_code', $req->keyword); break;
            }
        }
        // echo_query($lg);
        $data['lg'] = $lg->latest()->orderByDesc('lg_id')->paginate(20);
        $data['total']['ea_price'] = $data['lg']->sum('lg_ea_price');
        $data['total']['sum_price'] = $data['lg']->sum('lg_sum_price');
        $data['mng'] = User::has('UserMng')->get();

        return response()->json($data, 200);
    }

    public function store(Request $req) {
        
        if($req->filled('data_type') && $req->data_type == 'ORD') {
            $lg_pay_type = $req->od_pay_method == 'C' ? 'CARD' : NULL;
            foreach ($req->order_goods as $gd) {
                foreach ($gd['order_option'] as $opc) {
                    $rst = Ledger::create([
                        'lg_order_dt'    => substr($req->created_at, 0, 10),
                        'lg_pay_type'    => $lg_pay_type,
                        'lg_mng'         => $req->od_mng_nm,
                        'lg_source_type' => $req->data_type,
                        'lg_source_no'   => $req->od_id,
                        'lg_depart'      => $req->od_department,
                        'lg_orderer'     => $req->od_orderer,
                        'lg_gm_name'     => $opc['odo_opc_name'],
                        'lg_gm_price'    => $opc['odo_price'],
                        'lg_ea'          => $opc['odo_ea'],
                        'lg_ea_price'    => $opc['odo_price']*$opc['odo_ea'],
                        'lg_surtax'      => intval(($opc['odo_price']*$opc['odo_ea'])*0.1),
                        'lg_sum_price'   => intval(($opc['odo_price']*$opc['odo_ea'])*1.1),
                        'ip'             => $req->ip(),
                    ]);
                }
                foreach ($gd['order_model'] as $gm) {
                    $rst = Ledger::create([
                        'lg_order_dt'    => substr($req->created_at, 0, 10),
                        'lg_pay_type'    => $lg_pay_type,
                        'lg_mng'         => $req->od_mng_nm,
                        'lg_source_type' => $req->data_type,
                        'lg_source_no'   => $req->od_id,
                        'lg_depart'      => $req->od_department,
                        'lg_orderer'     => $req->od_orderer,
                        'lg_gm_name'     => $gm['odm_gm_name'],
                        'lg_gm_spec'     => $gm['odm_gm_spec'],
                        'lg_catno'       => $gm['odm_gm_catno'],
                        'lg_gm_code'     => $gm['odm_gm_code'],
                        'lg_gm_price'    => $gm['odm_price'],
                        'lg_ea'          => $gm['odm_ea'],
                        'lg_ea_price'    => $gm['odm_price']*$gm['odm_ea'],
                        'lg_surtax'      => intval(($gm['odm_price']*$gm['odm_ea'])*0.1),
                        'lg_sum_price'   => intval(($gm['odm_price']*$gm['odm_ea'])*1.1),
                        'ip'             => $req->ip(),
                    ]);
                }
            }
            
        } else if($req->filled('data_type') && $req->data_type == 'EST') {
            foreach ($req->estimate_model as $em) {
                foreach ($em['estimate_option'] as $eo) {
                    $rst = Ledger::create([
                        // 'lg_order_dt'    => substr($req->created_at, 0, 10),
                        'lg_mng'         => $req->user['name'],
                        'lg_source_type' => $req->data_type,
                        'lg_source_no'   => $req->er_id,
                        'lg_depart'      => $req->estimate_req['eq_department'],
                        'lg_orderer'     => $req->estimate_req['eq_name'],
                        'lg_gm_name'     => "{$eo['eo_tit']} - {$eo['eo_name']}",
                        'lg_gm_price'    => $eo['eo_price'],
                        'lg_ea'          => $eo['eo_ea'],
                        'lg_ea_price'    => $eo['eo_price']*$eo['eo_ea'],
                        'lg_surtax'      => intval(($eo['eo_price']*$eo['eo_ea'])*0.1),
                        'lg_sum_price'   => intval(($eo['eo_price']*$eo['eo_ea'])*1.1),
                        'ip'             => $req->ip(),
                    ]);
                }
                $rst = Ledger::create([
                    // 'lg_order_dt'    => substr($req->created_at, 0, 10),
                    'lg_mng'         => $req->user['name'],
                    'lg_source_type' => $req->data_type,
                    'lg_source_no'   => $req->er_id,
                    'lg_depart'      => $req->estimate_req['eq_department'],
                    'lg_orderer'     => $req->estimate_req['eq_name'],
                    'lg_gm_name'     => $em['em_name'],
                    'lg_gm_spec'     => $em['em_spec'],
                    'lg_catno'       => $em['em_catno'],
                    'lg_gm_code'     => $em['em_code'],
                    'lg_gm_price'    => $em['em_price'],
                    'lg_ea'          => $em['em_ea'],
                    'lg_ea_price'    => $em['em_price']*$em['em_ea'],
                    'lg_surtax'      => intval(($em['em_price']*$em['em_ea'])*0.1),
                    'lg_sum_price'   => intval(($em['em_price']*$em['em_ea'])*1.1),
                    'ip'             => $req->ip(),
                ]);
            }
        } else {
            $ledger = $this->ledger_paramImplant($this->ledger, $req);
            $ledger->created_id = auth()->user()->id;
            $rst = $ledger->save();
        }
        
       
        if ($rst)
            return response()->json(["msg"=>"Success"], 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function update(Request $req, $lg_id) {
        if ($this->ledger_paramImplant($this->ledger->find($lg_id), $req)->save())
            return response()->json(["msg"=>"Success"], 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function ledger_paramImplant($ledger, $req){
        $ledger->lg_order_dt       = $req->lg_order_dt;
        $ledger->lg_pay_type       = $req->lg_pay_type;       
        $ledger->lg_mng            = $req->lg_mng;            
        $ledger->lg_source_no      = $req->lg_source_no;      
        $ledger->lg_sale_dt        = $req->lg_sale_dt;        
        $ledger->lg_distributor    = $req->lg_distributor;    
        $ledger->lg_depart         = $req->lg_depart;         
        $ledger->lg_lab_prof       = $req->lg_lab_prof;       
        $ledger->lg_orderer        = $req->lg_orderer;        
        $ledger->lg_gm_name        = $req->lg_gm_name;        
        $ledger->lg_gm_spec        = $req->lg_gm_spec;        
        $ledger->lg_catno          = $req->lg_catno;          
        $ledger->lg_gm_code        = $req->lg_gm_code;        
        $ledger->lg_gm_price       = str_replace(',', '', $req->lg_gm_price);       
        $ledger->lg_ea             = str_replace(',', '', $req->lg_ea);             
        $ledger->lg_ea_price       = str_replace(',', '', $req->lg_ea_price);       
        $ledger->lg_surtax         = str_replace(',', '', $req->lg_surtax);         
        $ledger->lg_sum_price      = str_replace(',', '', $req->lg_sum_price);      
        $ledger->lg_com_order_dt   = $req->lg_com_order_dt;   
        $ledger->lg_buyer          = $req->lg_buyer;          
        $ledger->lg_order_mng      = $req->lg_order_mng;      
        $ledger->lg_purchase_price = str_replace(',', '', $req->lg_purchase_price); 
        $ledger->lg_shipping_dt    = $req->lg_shipping_dt;    
        $ledger->lg_email          = $req->lg_email;          
        $ledger->lg_hp             = $req->lg_hp;             
        $ledger->lg_note           = $req->lg_note;           
        $ledger->ip            = $req->ip();
        return $ledger;
    }

    public function destroy($lg_id) {
        if ($this->ledger->destroy($lg_id))
            return response()->json(["message"=>'success'], 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }
}
