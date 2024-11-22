<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use App\Providers\RouteServiceProvider;
use App\Models\{User, UserBiz, UserSocial};
use App\Events\{Mileage};
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
use Mail;
use App\Mail\DealerJoin;

class RegisterController extends Controller {

    use RegistersUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public $userSocial;

    public function __construct(UserSocial $social) {
        $this->middleware('guest');
        $this->userSocial = $social;
    } 

    public function register(Request $req) {
        $r_m = User::validate_rule_msg($req->filled('level')??false);
        Validator::make($req->all(), $r_m['rule'], $r_m['message'])->validate();
        event(new Registered($user = $this->userStore($req)));
        if ( $user->level < 10 ) {
            $m = new \App\Models\UserMileage;
            event(new Mileage("insert", $user->id, 'users', $user->id, 'SV', '회원가입', 3000));
        }
        $this->guard()->login($user);
        return $req->wantsJson() ? new JsonResponse($user->ub_id, 201) : redirect($this->redirectPath());
    }

    protected function userStore($req) {
        $u = [  'email'          => $req->email,
                'password'       => Hash::make($req->password),
                'name'           => $req->name,
                'sex'            => $req->filled('sex')          ? $req->sex          : 'male',
                'hp'             => $req->filled('hp')           ? $req->hp           : NULL,
                'tel'            => $req->filled('tel')          ? $req->tel          : NULL,
                'fax'            => $req->filled('fax')          ? $req->fax          : NULL,
                'birth'          => $req->filled('birth')        ? $req->birth        : NULL,
                'job'            => $req->filled('job')          ? $req->job          : NULL,
                'part'           => $req->filled('part')         ? $req->part         : NULL,
                'company'        => $req->filled('company')      ? $req->company      : NULL,
                'grade'          => $req->filled('grade')        ? $req->grade        : NULL,
                'tutor'          => $req->filled('tutor')        ? $req->tutor        : NULL,
                'offer'          => $req->filled('offer')        ? $req->offer        : NULL,
                'offer_lab'      => $req->filled('offer_lab')    ? $req->offer_lab    : NULL,
                'interest'       => $req->filled('interest')     ? implode(", ", $req->interest) : NULL,
                'interest_etc'   => $req->filled('interest_etc') ? $req->interest_etc : NULL,
                'join_route'     => $req->filled('join_route')   ? $req->join_route   : NULL,
                'receive_sms'    => $req->filled('receive_sms')  ? $req->receive_sms  : 'Y',
                'receive_mail'   => $req->filled('receive_mail') ? $req->receive_mail : 'Y',
                'level'          => $req->filled('level')        ? $req->level        : 1,
                'email_verified_at' => ($req->filled('provider') && $req->provider !== '')? \Carbon\Carbon::now() : NULL,
                'mng'            => $req->filled('rec_id')       ? $req->rec_id       : 0,
                'rec_id'         => $req->filled('rec_id')       ? $req->rec_id       : 0,
            ];
        $rst = User::create($u);
        if ( $req->filled('level') ) {
            $rst->ub_id = DB::table('user_biz')->insertGetId( [
                'ub_papa_id' => $rst->id,
                'ub_num'   => $req->ub_num,
                'ub_name'  => $req->ub_name,
                'ub_corp_name' => $req->ub_corp_name,
                'ub_tel'   => $req->ub_tel,
                'ub_zip'   => $req->ub_zip,
                'ub_addr1' => $req->ub_addr1,
                'ub_addr2' => $req->ub_addr2,
                'ub_type'  => $req->ub_type,
                'ub_cond'  => $req->ub_cond ] );

            
            try { Mail::to('sales@4science.net')->queue(new DealerJoin(config('mail.mailers.smtp.username'), '딜러 회원 가입'));
            } catch(\Swift_TransportException $e){
                // if($e->getMessage()) dd($e->getMessage());
            }
        }
        if ( $req->filled('provider') && $req->provider !== '' )
            $this->userSocial->store($req, $rst->id);
        // if ( array_key_exists('ub_file', $req->all()) ) {
        //     $rst_upload = app('App\Http\Controllers\CommonController')->upload($req);
        //     $fi_id = $rst_upload->getData()->fi_id;
        //     DB::table('filse_info')->where('fi_id', $fi_id)->update(['fi_key' => 1]);             
        // }
        return $rst;
    }

    public function create (Request $req) {
        return response()->json($req->all(), 200);
    }
}
