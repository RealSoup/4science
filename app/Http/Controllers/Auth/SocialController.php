<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Two\InvalidStateException;
use GuzzleHttp\Exception\ClientException;
use Carbon\Carbon;
use App\Models\{UserSocial, User, Config};
use Socialite;
use Auth;
use App\Events\LoginAfter;

class SocialController extends Controller {
    public $req;
    public $user;
    public $userSocial;

    public function __construct(Request $req, User $user, UserSocial $social) {
        $this->req = $req;
        $this->user = $user;
        $this->userSocial = $social;
    }

    // 소셜 연결(provider에 해당 provider로 연결 요청)
    public function redirectToProvider($provider) {
        $config = $this->getConfig($provider);
        // dd($config);
        return Socialite::with($provider)->setConfig($config)->redirect();
    }

    // .env가 아닌 DB에서 소셜 키 정보를 가져온다.
    public function getConfig($provider) {
        // $config = cache('config.sns');
        // $configArr = get_object_vars($config);
        // $configArr = array_where($configArr, function ($value, $key) use($provider) {
        //     return str_contains($key, $provider);
        // });
        $key = $secret = $redirect = '';
        $key = config("services.${provider}")['client_id'];
        $secret = config("services.${provider}")['client_secret'];
        $redirect = config("services.${provider}")['redirect'];
        return new \SocialiteProviders\Manager\Config($key, $secret, $redirect, []);
    }

    // 소셜인증 후 데이터를 받아서 처리하는 콜백 메서드(config/services.php에서 지정)
    public function handleProviderCallback($provider)
    {
        try {
            $config = $this->getConfig($provider);
            $userFromSocial = Socialite::with($provider)->setConfig($config)->user();
            // dd($userFromSocial);
            // $userFromSocial->id=813770733;
            // dd($userFromSocial);
        } catch (InvalidStateException $e) {
            // return alert('잘못된 접근입니다.');
            return response()->json('잘못된 접근입니다.', 500);
        } catch (ClientException $e) {
            // return alert('Bad client credentials');
            return response()->json('Bad client credentials', 500);
        }

        // 소셜 로그인
        if(auth()->guest()) {
            $result = $this->socialLoginCallback($userFromSocial, $provider);
            if($result == 'view') {
                // 소셜 계정을 처음 사용해서 로그인 했을 경우 기존 계정과 연결/ 회원가입 화면으로 연결
                // $params = $this->socialModel->getSocialParams($provider);
                // return viewDefault("$theme.users.$skin.social", $params);
                return redirect()->route('auth.join_sync_choice', [
                    'email'         => $userFromSocial->email,
                    'name'          => $userFromSocial->name,
                    'provider'      => $provider,
                    'social_id'     => $userFromSocial->id,
                    'social_token'  => $userFromSocial->token,
                ]);
            } else if ( $result == 'duplicate' ) {
                return redirect()->route('auth.create', [
                    'code'          => 'sync',
                    'msg_type'      => 'duplicate',
                    'email'         => $userFromSocial->email,
                    'name'          => $userFromSocial->name,
                    'provider'      => $provider,
                    'social_id'     => $userFromSocial->id,
                    'social_token'  => $userFromSocial->token,
                ]);
            } else { // 소셜 계정으로 로그인
                return redirect("/?rst=social_login");
            }
        } else { // 회원 정보 수정에서 소셜 계정 연결
            // $message = $this->userModel->connectSocialAccount($userFromSocial, $provider, $this->request);
            // return view('common.message', [
            //     'message' => $message,
            //     'popup' => 1,
            //     'reload' => 1,
            // ]);
        }
    }

    // 소셜 로그인 -> 기존 계정과 연결
    public function connectExistAccount(Request $req) {
        // 입력한 비밀번호와 인증된 사용자의 비밀번호를 비교한다.
        // if(Auth::validate(['email' => $req->email, 'password' => $req->password ])) {
        $req->validate([ 'email' => 'required', 'password' => 'required', ]);
        $credentials = $req->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = User::where('email', $req->get('email'))->first();
            // 소셜로그인 정보 등록
            $this->userSocial->store($req, $user->id);
            // 회원 정보 업데이트 (회원 등급, 이메일 인증 정보)

            if ( !$user->email_verified_at ) {
                $user->email_verified_at = \Carbon\Carbon::now();
                $user->save();
            }
            auth()->guard()->login($user);
            event(new LoginAfter());
            return response()->json("success", 201);
        } else {
            // return response()->json("비밀번호가 틀립니다.\\n비밀번호는 대소문자를 구분합니다.", 500);
            abort(500, '비밀번호가 틀립니다.');
        }
    }

    public function socialLoginCallback($userFromSocial, $provider) {
        // 연결된 소셜 로그인 정보가 있는지 확인
        $userSocial = UserSocial::where([
            'provider' => $provider,
            'social_id' => $userFromSocial->getId(),
        ])->first();
        
        // dd($userSocial);
        if(is_null($userSocial)) {
            // 소셜에서 받아온 데이터를 세션에 저장한다.
            // session()->put('userFromSocial', $userFromSocial);
            // $userFromSocial->probider = $provider;
            // session(['userFromSocial' => $userFromSocial]);
            $existUser = User::where('email', $userFromSocial->email)->first();
            if($existUser)  //중복 이메일이 존재하면
                return 'duplicate';
            else 
                return 'view';
        } else {
            // 연결된 소셜 정보에 해당하는 유저로 로그인
            if (!$userSocial->social_token)
                $this->prevUserMission($userFromSocial, $userSocial);
            $this->userToSocialLogin($userSocial);
            return 'redirect';
        }
    }

    // 연결된 소셜 정보에 해당하는 유저로 로그인
    public function userToSocialLogin($userSocial) {
        $user = $userSocial->user()->first();
        if(empty($user->leave_date)) {  //탈퇴한 소셜회원 로그인 불가
            auth()->guard()->login($user);
            event(new LoginAfter());
        } else return redirect()->route('home')->with('alert', '탈퇴한 회원입니다.');
    }

    // 연결된 소셜 정보에 해당하는 유저로 로그인
    public function prevUserMission($userFromSocial, $social) {
        // INSERT INTO la_user_social (provider, social_id, ip, created_at, user_id)
        // SELECT IF( b.mbr_reg_type='K', 'kakao', 'naver' ), b.mbr_reg_code, b.cmm_remote_ip, b.cmm_reg_date, a.id
        // FROM la_users a
        // JOIN nc_member b ON a.mbr_no = b.mbr_no
        // WHERE
        // b.mbr_reg_type = 'N' OR b.mbr_reg_type = 'K'
        // ORDER BY b.mbr_no;
        
        $social->social_token = $userFromSocial->token;
        $social->save();

        // $isSame = User::where('email', $userFromSocial->email)->where('email', $userFromSocial->email)->first();
        // dd($isSame);
    }

}
