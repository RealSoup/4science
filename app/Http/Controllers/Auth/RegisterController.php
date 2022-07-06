<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use App\Providers\RouteServiceProvider;
use App\Models\{User, UserBiz};
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;

class RegisterController extends Controller {

    use RegistersUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct() { $this->middleware('guest'); }

    public function register(Request $request) {
        $this->validator($request)->validate();

        event(new Registered($user = $this->create($request)));

        $this->guard()->login($user);

        if ($response = $this->registered($request, $user)) {
            return $response;
        }

        return $request->wantsJson()
                    ? new JsonResponse([], 201)
                    : redirect($this->redirectPath());
    }

    protected function create($req) {
        $u = [  'email'          => $req->email,
                'password'       => Hash::make($req->password),
                'name'           => $req->name,
                'sex'            => $req->filled('sex')          ? $req->sex          : 'male',
                'hp'             => $req->filled('hp')           ? $req->hp           : NULL,
                'tel'            => $req->filled('tel')          ? $req->tel          : NULL,
                'fax'            => $req->filled('fax')          ? $req->fax          : NULL,
                'birth'          => $req->filled('birth')        ? $req->birth        : NULL,
                'job'            => $req->filled('job')          ? $req->job          : NULL,
                'office'         => $req->filled('office')       ? $req->office       : NULL,
                'department'     => $req->filled('department')   ? $req->department   : NULL,
                'grade'          => $req->filled('grade')        ? $req->grade        : NULL,
                'tutor'          => $req->filled('tutor')        ? $req->tutor        : NULL,
                'offer'          => $req->filled('offer')        ? $req->offer        : NULL,
                'offer_lab'      => $req->filled('offer_lab')    ? $req->offer_lab    : NULL,
                'interest'       => $req->filled('interest')     ? $req->interest     : NULL,
                'interest_etc'   => $req->filled('interest_etc') ? $req->interest_etc : NULL,
                'join_route'     => $req->filled('join_route')   ? $req->join_route   : NULL,
                'receive_sms'    => $req->filled('receive_sms')  ? $req->receive_sms  : 'Y',
                'receive_mail'   => $req->filled('receive_mail') ? $req->receive_mail : 'Y',];
        if ( $req->filled('level') ) $u['level'] = $req->level;
        $rst = User::create($u);
        if ( $req->filled('level') )
            DB::table('users_biz')->insert( [
                'ub_papa_id' => $rst->id,
                'ub_num'   => $req->ub_num,
                'ub_name'  => $req->ub_name,
                'ub_corp_name' => $req->ub_corp_name,
                'ub_tel'   => $req->ub_tel,
                'ub_zip'   => $req->ub_zip,
                'ub_addr1' => $req->ub_addr1,
                'ub_addr2' => $req->ub_addr2,
                'ub_type'  => $req->ub_type,
                'ub_cond'  => $req->ub_cond,
                'updated_id' => auth()->check() ? auth()->user()->id : 0
            ] );

        if ( $req->filled('ub_file') ) {
            $rst_upload = app('App\Http\Controllers\CommonController')->upload($req);
            $fi_id = $rst_upload->getData()->fi_id;
            DB::table('filse_info')->where('fi_id', $fi_id)->update(['fi_key' => 1]);             
        }
        return $rst;
    }

    protected function validator($req) {
        $rule = [
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{6,20}$/'],
            'sex' => ['required'],
            'hp' => ['required', 'regex:/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/'],
            'birth' => ['required', 'regex:/^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/'],
        ];
        $message = [
            'name.required' => '이름을 입력하세요.',
            'name.string' => '이름은 문자만 입력하세요.',
            'email.required' => '이메일을 입력하세요.',
            'email.unique' => '이미 가입된 이메일입니다.',
            'email.email' => '이메일 형식에 맞게 입력하세요.',
            'email.string' => '이메일은 문자열만 입력하세요.',
            'password.regex' => '숫자, 문자 1개 이상. 6 ~ 20자 조합. 가능한 특수문자 ~!@#$%^&*()+|=',
            'password.required' => '비밀번호를 입력하세요.',
            'password.confirmed' => '비밀번호와 비밀번호 확인이 서로 다릅니다.',
            'sex.required' => '성별을 선택하세요.',
            'hp.required' => '휴대전화 번호를 입력하세요.',
            'hp.regex' => '휴대전화 번호 입력형식은 01x-xxx(x)-xxxx 입니다.',
            'birth.required' => '생년월일을 입력하세요',
            'birth.regex' => '생년월일 입력형식은 xxxx-xx-xx 입니다.',
        ];

        if ( $req->filled('level') ) {
            $rule['ub_num'] = ['required', 'regex:/^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})/'];
            $rule['ub_corp_name'] = ['required'];
            $rule['ub_file'] = ['required'];
            $rule['ub_name'] = ['required', 'string'];
            $rule['ub_tel'] = ['required'];
            $rule['ub_zip'] = ['required', 'integer'];
            $rule['ub_addr1'] = ['required', 'string'];
            $rule['ub_addr2'] = ['required', 'string'];
            $rule['ub_type'] = ['required', 'string'];
            $rule['ub_cond'] = ['required', 'string'];

            $message['ub_num.required'] = ['사업자 등록번호를 입력하세요.'];
            $message['ub_num.regex'] = ['사업자 등록번호를 형식에 맞게 입력하세요.'];
            $message['ub_corp_name.required'] = ['법인(상호)명을 입력하세요.'];
            $message['ub_file.required'] = ['사업자 등록증을 첨부해 주세요'];
            $message['ub_name.required'] = ['대표자명을 입력하세요.'];
            $message['ub_name.string'] = ['대표자명은 문자열만 입력 할 수 있습니다.'];
            $message['ub_tel.required'] = ['대표 전화번호를 입력하세요.'];
            $message['ub_zip.required'] = ['우편번호를 검색하세요.'];
            $message['ub_zip.integer'] = ['우편번호는 숫자만 입력하세요.'];
            $message['ub_addr1.required'] = ['주소를 검색해 주세요.'];
            $message['ub_addr1.string'] = ['주소는 문자열만 입력 할 수 있습니다.'];
            $message['ub_addr2.required'] = ['상세주소를 입력하세요.'];
            $message['ub_addr2.string'] = ['상세주소는 문자열만 입력 할 수 있습니다.'];
            $message['ub_type.required'] = ['업종을 입력하세요.'];
            $message['ub_type.string'] = ['업종은 문자열만 입력 할 수 있습니다.'];
            $message['ub_cond.required'] = ['업태를 입력하세요.'];
            $message['ub_cond.string'] = ['업태는 문자열만 입력 할 수 있습니다.'];
        }
        return Validator::make($req->all(), $rule, $message);
    }
}
