<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Validator;
use App\Models\{User, UserBiz, FileInfo};
use App\Traits\FileControl;

class UserController extends Controller {
    use FileControl;    //  trait

    public function emailCheck($email) {
        return response()->json(DB::table('users')->where('email', $email)->count(), 200);
    }

    public function auth(Request $req) {
        $u = $req->user();
        if ( $u->level > 10 )
            $u->userMng;
        $interest = explode(', ', $u->interest);
        if (count($interest) > 0 && $interest[0] != '') $u->interest = $interest;
        else                                            $u->interest = Array();
        if ($u->job == null)                            $u->job = '';
        return response()->json([ 'user' => $u, 'token' => csrf_token() ], 200);
    }

    public function edit() { 
        $rst = auth()->user()->userBiz;
        if($rst) $rst->fileInfo;
        return $rst; 
    }

    public function update(Request $req) {
        $r_m = User::validate_rule_msg($req->filled('level')??false);
        unset($r_m['rule']['email']);
        Validator::make($req->all(), $r_m['rule'], $r_m['message'])->validate();
        $user = auth()->user();        
        $user->name         = $req->name;
        $user->sex          = $req->sex;
        $user->email        = $req->email;
        $user->receive_mail = $req->receive_mail;
        $user->birth        = $req->birth;
        $user->hp           = $req->hp;
        $user->receive_sms  = $req->receive_sms;
        $user->tel          = $req->tel;
        $user->fax          = $req->fax;
        $user->job          = $req->job;
        $user->office       = $req->office;
        $user->department   = $req->department;
        $user->grade        = $req->grade;
        $user->tutor        = $req->tutor;
        $user->offer        = $req->offer;
        $user->offer_lab    = $req->offer_lab;
        $user->interest     = $req->filled('interest') ? implode(", ", $req -> interest) : '';
        $user->interest_etc = $req->interest_etc;
        $user->join_route   = $req->join_route;
        if ( $req->filled('password') ) $user->password = bcrypt($req->password);
        $user->save();
        
        $id = $user->id;
        if ( $req->filled('level') && $req->level > 10) {
            $ub = UserBiz::updateOrCreate(
                [   'ub_papa_id' => $user->id],
                [   'ub_num'   => $req->ub_num,
                    'ub_name'  => $req->ub_name,
                    'ub_corp_name' => $req->ub_corp_name,
                    'ub_tel'   => $req->ub_tel,
                    'ub_zip'   => $req->ub_zip,
                    'ub_addr1' => $req->ub_addr1,
                    'ub_addr2' => $req->ub_addr2,
                    'ub_type'  => $req->ub_type,
                    'ub_cond'  => $req->ub_cond ]
            );
            $id = $ub->ub_id;
        }
        return response()->json($id, 201);
    }

    public function destroy(Request $req) {
        DB::table('user_withdraw')->insert([ 'val' => $req->withdraw ]);
        $id = auth()->user()->id;        
        DB::table('user_addr')->where('ua_key', $id)->delete();
        foreach (DB::table('user_biz')->where('ub_papa_id', $id)->get() as $ub)
            foreach (FileInfo::where('fi_key', $ub->ub_id)->where('fi_group', 'userBiz')->get() as $fi)
                $this->deleteFiles($fi->fi_id, null, $fi);
        DB::table('user_biz')->where('ub_papa_id', $id)->delete();
        // DB::table('user_mileage')->where('ml_uid', $id)->delete();
        DB::table('user_mng')->where('um_user_id', $id)->delete();
        DB::table('user_mng_config')->where('umc_user_id', $id)->delete();
        DB::table('user_social')->where('user_id', $id)->delete();
        DB::table('shop_wish')->where('created_id', $id)->delete();
        
        foreach (DB::table('shop_cart')->where('created_id', $id)->get() as $ct) {
            DB::table('shop_cart_model')->where('cm_ct_id', $ct->ct_id)->delete();
            DB::table('shop_cart_option')->where('co_ct_id', $ct->ct_id)->delete();            
        }
        $rst = User::destroy($id);
        if ($rst) return response()->json(["message"=>'success'], 200);
        else      return response()->json(["msg"=>"Fail"], 500);

        // foreach (DB::table('la_shop_order')->where('created_id', $id)->get() as $od) {
        //     DB::table('la_shop_order_extra_info')->where('oex_od_id', $od->od_id)->delete();
        //     $odm = DB::table('la_shop_order_model')->where('odm_od_id', $od->od_id)->get();
        //     DB::table('la_shop_order_dlvy_info')->where('oddi_odm_id', $odm->odm_id)->delete();            
        //     DB::table('la_shop_order_model')->where('odm_od_id', $od->od_id)->delete();
        //     DB::table('la_shop_order_option')->where('odo_od_id', $od->od_id)->delete();
        //     DB::table('la_shop_order_pg')->where('pg_od_id', $od->od_id)->delete();
        //     DB::table('la_shop_order_purchase_at')->where('odpa_od_id', $od->od_id)->delete();
        //     DB::table('la_shop_order_option')->where('odo_od_id', $od->od_id)->delete();
        // }

        // foreach (DB::table('la_shop_estimate_req')->where('created_id', $id)->get() as $eq) {
        //     foreach (DB::table('la_shop_estimate_reply')->where('er_eq_id', $eq->eq_id)->get() as $er) {
        //         foreach ( DB::table('la_shop_estimate_model')->where('em_papa_id', $er->er_id)->where('em_type', 'estimateReply')->get() as $erm)
        //             DB::table('la_shop_estimate_option')->where('eo_em_id', $erm->em_id)->delete();    
        //         DB::table('la_shop_estimate_model')->where('em_papa_id', $er->er_id)->where('em_type', 'estimateReply')->delete();
        //         $fi = DB::table('la_file_info')->where('fi_key', $er->er_id)->where('fi_group', 'estimateReply')->get();
        //         $this->deleteFiles($fi->fi_id, null, $fi);
        //     }
        //     DB::table('la_shop_estimate_reply')->where('er_eq_id', $eq->eq_id)->delete();
            
        //     foreach ( DB::table('la_shop_estimate_model')->where('em_papa_id', $eq->eq_id)->where('em_type', 'estimateReq')->get() as $eqm)
        //         DB::table('la_shop_estimate_option')->where('eo_em_id', $eqm->em_id)->delete();
        //     DB::table('la_shop_estimate_model')->where('em_papa_id', $eq->eq_id)->where('em_type', 'estimateReq')->delete();
        //     DB::table('la_shop_estimate_custom')->where('ec_eq_id', $eq->eq_id)->delete();            
        //     $fi = DB::table('la_file_info')->where('fi_key', $eq->eq_id)->where('fi_group', 'estimateReq')->get();
        //     $this->deleteFiles($fi->fi_id, null, $fi);
        // }
        // DB::table('la_shop_estimate_req')->where('created_id', $id)->delete();

        // foreach (DB::table('la_eng_reform')->where('created_id', $id)->get() as $er) {
        //     $fi = DB::table('la_file_info')->where('fi_key', $er->er_id)->where('fi_group', 'engReform')->get();
        //     $this->deleteFiles($fi->fi_id, null, $fi);
        // }
        
        
        
    }

    public function find_email(Request $req) {
        if ( $req->filled('id') ) {
            // echo_query(User::where('p_id', $req->id));
            $u = User::where('p_id', $req->id)->first();
            if($u) {
                $e_id = strstr($u->email, '@', true);
                $rst = substr($e_id, 0, -3).'***';
                $rst .= strstr($u->email, '@');
                return response()->json($rst, 200);
            } else
                abort(500, '존재하지 않는 아이디입니다.');
        } else 
            abort(500, '아이디를 입력하세요.');
    }
}
