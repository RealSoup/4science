<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use App\Events\LoginAfter;

class LoginController extends Controller {
    use AuthenticatesUsers;
    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct() {
        $this->middleware('guest')->except('logout');
    }
    /*
    이전 회원정보를 이전했는데
    CI 비번 암호화 방법과
    라라벨 암호화 방법이 달라서
    로그인이 안된다
    아래 수정으로 2가지 암호화 하여 비번 비교하여 로그인 시킨다.
    해당 파일에서 로그인 방법 수정
    vendor\laravel\framework\src\Illuminate\Auth\SessionGuard.php
    function hasValidCredentials () {}

    */


    public function login(Request $request) {
        $this->validateLogin($request);
        if (method_exists($this, 'hasTooManyLoginAttempts') && $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {            
            $ci_pw = base64_encode(hash("sha512", $request['password'], true));
            $ci_pw_check = $ci_pw == auth()->user()->password;
            if ($ci_pw_check)
                DB::table('users')->where('id', auth()->user()->id)->update(['password'=> Hash::make($request->password)]);

            event(new LoginAfter());
            // if ($request->hasSession()) $request->session()->put('auth.password_confirmed_at', time());
            return $this->sendLoginResponse($request);
        }
        $this->incrementLoginAttempts($request);
        return $this->sendFailedLoginResponse($request);
    } 
    
    // \vendor\laravel\ui\auth-backend\AuthenticatesUsers.php
    // protected function attemptLogin(Request $request)
    // {
    //     return $this->guard()->attempt(
    //         $this->credentials($request), $request->filled('remember')
    //     );
    // }


    
    // public function attempt(array $credentials = [], $remember = false)
    // {
    //     $this->fireAttemptEvent($credentials, $remember);

    //     $this->lastAttempted = $user = $this->provider->retrieveByCredentials($credentials);

    //     // If an implementation of UserInterface was returned, we'll ask the provider
    //     // to validate the user against the given credentials, and if they are in
    //     // fact valid we'll log the users into the application and return true.
    //     if ($this->hasValidCredentials($user, $credentials)) {
    //         $this->login($user, $remember);

    //         return true;
    //     }

    //     // If the authentication attempt fails we will fire an event so that the user
    //     // may be notified of any suspicious attempts to access their account from
    //     // an unrecognized user. A developer may listen to this event as needed.
    //     $this->fireFailedEvent($user, $credentials);

    //     return false;
    // }

    // public function login(AuthenticatableContract $user, $remember = false)
    // {
    //     $this->updateSession($user->getAuthIdentifier());

    //     // If the user should be permanently "remembered" by the application we will
    //     // queue a permanent cookie that contains the encrypted copy of the user
    //     // identifier. We will then decrypt this later to retrieve the users.
    //     if ($remember) {
    //         $this->ensureRememberTokenIsSet($user);

    //         $this->queueRecallerCookie($user);
    //     }

    //     // If we have an event dispatcher instance set we will fire an event so that
    //     // any listeners will hook into the authentication events and run actions
    //     // based on the login and logout events fired from the guard instances.
    //     $this->fireLoginEvent($user, $remember);

    //     $this->setUser($user);
    // }
}
