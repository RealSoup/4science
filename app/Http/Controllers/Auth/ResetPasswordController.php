<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;



    protected function rules() {
        return [
            'token' => 'required',
            'email' => 'required|email',
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password' => ['required', 'confirmed', 'min:6', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{6,20}$/'],
        ];
    }
    protected function validationErrorMessages() {
        return [
            'email.required' => '이메일을 입력하세요.',
            'email.email' => '이메일 형식에 맞게 입력하세요.',
            'password.regex' => '숫자, 문자 1개 이상. 6 ~ 20자 조합. 가능한 특수문자 ~!@#$%^&*()+|=',
            'password.required' => '비밀번호를 입력하세요.',
            'password.confirmed' => '비밀번호와 비밀번호 확인이 서로 다릅니다.',
            'password.min' => '6자 이상 입력하세요.',
        ];
    }
}
