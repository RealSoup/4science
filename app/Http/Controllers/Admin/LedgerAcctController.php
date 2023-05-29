<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Ledger, LedgerAcct};
use DB;
use Illuminate\Support\Arr;

class LedgerAcctController extends Controller {
    protected $lga;

	public function __construct( LedgerAcct $lga ) {
        $this->lga = $lga;
    }

    public function index(Request $req) {
        $lga['config'] = LedgerAcct::$config;
        switch ($req->mode[0]) {
            case 'W': $lga['config']['pay_type'] = $lga['config']['pay_type']['wait']; break;
            case 'S': $lga['config']['pay_type'] = $lga['config']['pay_type']['soon']; break;
            case 'P': $lga['config']['pay_type'] = $lga['config']['pay_type']['pay_tx']; break;
        }
        $lga['mng'] = DB::table('users')->join('user_mng', 'users.id', '=', 'user_mng.um_user_id')->get();
        $lga['lga'] = $this->lga->orderBy('lga_seq')->latest();
        $lga['lga']->when($req->mode            , fn ($q, $v) => $q->whereIn('lga_step', $v));
        $lga['lga']->when($req->pay_type        , fn ($q, $v) => $q->where('lga_pay_type', $v));
        $lga['lga']->when($req->mng             , fn ($q, $v) => $q->where('lga_mng', $v));
        $lga['lga']->when($req->od_id           , fn ($q, $v) => $q->where('lga_od_id', $v));
        $lga['lga']->when($req->lga_date        , fn ($q, $v) => $q->where('lga_date', $v));
        $lga['lga']->when($req->distributor     , fn ($q, $v) => $q->where('lga_distributor', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->company          , fn ($q, $v) => $q->where('lga_company', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->orderer         , fn ($q, $v) => $q->where('lga_orderer', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->od_name         , fn ($q, $v) => $q->where('lga_od_name', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->ea_p            , fn ($q, $v) => $q->where('lga_ea_p', $v));
        $lga['lga']->when($req->surtax          , fn ($q, $v) => $q->where('lga_surtax', $v));
        $lga['lga']->when($req->sum_p           , fn ($q, $v) => $q->where('lga_sum_p', $v));
        $lga['lga']->when($req->ref_soon        , fn ($q, $v) => $q->where('lga_ref_soon', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->memo_soon       , fn ($q, $v) => $q->where('lga_memo_soon', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->ref_pay_od      , fn ($q, $v) => $q->where('lga_ref_pay_od', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->no_pay          , fn ($q, $v) => $q->where('lga_no_pay', $v));
        $lga['lga']->when($req->card_pay_date   , fn ($q, $v) => $q->where('lga_card_pay_date', $v));
        $lga['lga']->when($req->after_pay_date  , fn ($q, $v) => $q->where('lga_after_pay_date', $v));
        $lga['lga']->when($req->email           , fn ($q, $v) => $q->where('lga_email', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->tel             , fn ($q, $v) => $q->where('lga_tel', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->tax_com         , fn ($q, $v) => $q->where('lga_tax_com', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->tax_mng         , fn ($q, $v) => $q->where('lga_tax_mng', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->client_code     , fn ($q, $v) => $q->where('lga_client_code', $v));
        $lga['lga']->when($req->kind            , fn ($q, $v) => $q->where('lga_kind', $v));
        $lga['lga']->when($req->card_com        , fn ($q, $v) => $q->where('lga_card_com', $v));
        $lga['lga']->when($req->appd_no         , fn ($q, $v) => $q->where('lga_appd_no', $v));
        $lga['lga']->when($req->payer           , fn ($q, $v) => $q->where('lga_payer', 'LIKE', "%{$v}%"));
        $lga['lga']->when($req->memo_pay_tx     , fn ($q, $v) => $q->where('lga_memo_pay_tx', 'LIKE', "%{$v}%"));
        
        
        $lga['lga'] = $lga['lga']->paginate(100);
        
        return response()->json($lga, 200);
    }

    public function store(Request $req) {
        $lga_id = 0;
        foreach ($req->lg as $v) {
            if ($v['chk_cplt']) {
                $lga_id = DB::table('ledger_acct')->insertGetId([
                    'lga_od_id'       => $v['lg_od_id'],
                    'lga_pay_type'    => $v['lg_pay_type'],
                    'lga_mng'         => $v['lg_mng'],
                    'lga_distributor' => $v['lg_distributor'],
                    'lga_company'      => $v['lg_company'],
                    'lga_orderer'     => $v['lg_orderer'],
                    'lga_od_name'     => $v['lg_od_name'],
                    'lga_ea_p'        => $v['lg_sum_ea_p'],
                    'lga_surtax'      => $v['lg_sum_surtax'],
                    'lga_sum_p'       => $v['lg_sum_sum_p'],
                    'lga_tax_mng'     => $v['lg_tax_name'],
                    'lga_email'       => $v['lg_tax_email'],
                    'lga_tel'         => $v['lg_tax_hp'],
                    'created_id'      => auth()->user()->id,
                    'ip'              => $req->ip(),
                ]);
            }
        }
        if ($lga_id)    return response()->json(["msg"=>"Success"], 200);
        else            return response()->json(["msg"=>"Fail"], 500);
    }

    public function update(Request $req, $lga_id) {
        if ( $req->filled('step') ) {
            if ($req->step == 'P') {
                DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->where('lga_pay_type', 'RPAY')->update([ 'lga_kind' => 'K' ]);
                DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->where('lga_pay_type', 'CARD')->update([ 'lga_card_com' => 'INI' ]);
                DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->where('lga_pay_type', 'PSYS')->update([ 'lga_card_com' => 'ALL' ]);
                
                DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->where('lga_pay_type', 'NOT')->update([ 'lga_pay_type' => 'CBC' ]);
                DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->where(function ($query) {
                    $query->where('lga_pay_type', 'CARD')->orWhere('lga_pay_type', 'PSYS')->orWhere('lga_pay_type', 'RPAY');
                })->update([ 'lga_pay_type' => 'CARD' ]);
            }

            $rst = DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->where('lga_pay_type', 'TAX')->update([ 'lga_tax_com' => '더존' ]);
            $rst = DB::table('ledger_acct')->whereIn('lga_id', $req->lga_ids)->update([ 'lga_step' => $req->step ]);
        } else if ( $req->filled('step_one') ) {
            $rst = DB::table('ledger_acct')->where('lga_id', $lga_id)->update(['lga_step' => $req->step_one]);
        } else if ( $req->filled('lga_ids') ) {
            foreach ($req->lga_ids as $seq => $v)
                DB::table('ledger_acct')->where('lga_id', $v)->update(['lga_seq' => $seq]);
            $rst = true;
        } else {
            $req_data = [   'lga_step'        => $req->filled('lga_step')        ? $req->lga_step         : 'W',
                            'lga_od_id'       => $req->filled('lga_od_id')       ? $req->lga_od_id        : 0,
                            'lga_pay_type'    => $req->filled('lga_pay_type')    ? $req->lga_pay_type     : 'V',
                            'lga_mng'         => $req->filled('lga_mng')         ? $req->lga_mng          : '',
                            'lga_date'        => $req->filled('lga_date')        ? $req->lga_date         : NULL,
                            'lga_distributor' => $req->filled('lga_distributor') ? $req->lga_distributor  : '',
                            'lga_company'      => $req->filled('lga_company')      ? $req->lga_company       : '',
                            'lga_orderer'     => $req->filled('lga_orderer')     ? $req->lga_orderer      : '',
                            'lga_od_name'     => $req->filled('lga_od_name')     ? $req->lga_od_name      : '',
                            'lga_ea_p'        => $req->filled('lga_ea_p')        ? $req->lga_ea_p         : 0,
                            'lga_surtax'      => $req->filled('lga_surtax')      ? $req->lga_surtax       : 0,
                            'lga_sum_p'       => $req->filled('lga_sum_p')       ? $req->lga_sum_p        : 0,
                            'lga_ref_soon'    => $req->filled('lga_ref_soon')    ? $req->lga_ref_soon     : '',
                            'lga_memo_soon'   => $req->filled('lga_memo_soon')   ? $req->lga_memo_soon    : '',
                            'lga_seq'         => $req->filled('lga_seq')         ? $req->lga_seq          : 0,

                            'lga_ref_pay_od'      => $req->filled('lga_ref_pay_od')       ? $req->lga_ref_pay_od          : '',
                            'lga_no_pay'          => $req->filled('lga_no_pay')           ? $req->lga_no_pay              : '',
                            'lga_card_pay_date'   => $req->filled('lga_card_pay_date')    ? $req->lga_card_pay_date       : '',
                            'lga_after_pay_date'  => $req->filled('lga_after_pay_date')   ? $req->lga_after_pay_date      : '',
                            'lga_email'           => $req->filled('lga_email')            ? $req->lga_email               : '',
                            'lga_tel'             => $req->filled('lga_tel')              ? $req->lga_tel                 : '',
                            'lga_tax_com'         => $req->filled('lga_tax_com')          ? $req->lga_tax_com             : '',
                            'lga_tax_mng'         => $req->filled('lga_tax_mng')          ? $req->lga_tax_mng             : '',
                            'lga_client_code'     => $req->filled('lga_client_code')      ? $req->lga_client_code         : '',
                            'lga_kind'            => $req->filled('lga_kind')             ? $req->lga_kind                : '',
                            'lga_card_com'        => $req->filled('lga_card_com')         ? $req->lga_card_com            : '',
                            'lga_appd_no'         => $req->filled('lga_appd_no')          ? $req->lga_appd_no             : '',
                            'lga_payer'           => $req->filled('lga_payer')            ? $req->lga_payer               : '',
                            'lga_memo_pay_tx'     => $req->filled('lga_memo_pay_tx')      ? $req->lga_memo_pay_tx         : '',
                            'ip'              => $req->ip(), ];
            if ($req->filled('lga_id')) $req_data = Arr::collapse([ $req_data, ['updated_id' => auth()->user()->id] ]);
            else                        $req_data = Arr::collapse([ $req_data, ['created_id' => auth()->user()->id] ]);

            $rst = DB::table('ledger_acct')->updateOrInsert( [ 'lga_id' => $req->filled('lga_id') ? $req->lga_id : 0], $req_data );
        }        
        
        if ($rst)   return response()->json(["msg"=>"Success"], 200);
        else        return response()->json(["msg"=>"Fail"], 500);
    }

    public function destroy(Request $req, $lga_id) {
        // $rst = LedgerAcct::destroy($lga_id);
        DB::table('la_ledger_acct')->where('lga_id', $lga_id)->update(['lga_pay_type' => 'CXL']);
        if ($rst) return response()->json(["message"=>'success'], 200);
        else      return response()->json(["msg"=>"Fail"], 500);
    }

}