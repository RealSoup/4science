<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Session\TokenMismatchException;
use Closure;

class VerifyCsrfToken extends Middleware {
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'shop/order/payReturn',
        'shop/order/payReturnMobile',
        'social/*/callback',
        'admin/shop/b2b_merck/*',
    ];
    
    public function handle($request, Closure $next) {
        /*
        \vendor\laravel\framework\src\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken.php     70번줄
        회원가입 후 로그인된 상태에서 이메일 인증해야 하는데
        다양한 이유로 로그아웃 상태에서 이메일 인증시 에러가 난다
        그래서 로그인 체크를 위한 OverRide(재정의)
        */
        if ($request->is('email/verify/*') && !auth()->check()) {
            // return response('', 403)
    		// 	->header('X-Inertia-Location', "1");
            // abort(404);
            abort(403, '가입시 등록한 이메일로 로그인 후 이메일에서 인증버튼은 다시 눌러주세요.');
        }
            // return response()->json("success", 201);
        /*  아래는 이전 소스, 위는 나의 추가 소스 */
        if (
            $this->isReading($request) ||
            $this->runningUnitTests() ||
            $this->inExceptArray($request) ||
            $this->tokensMatch($request)
        ) {
            return tap($next($request), function ($response) use ($request) {
                if ($this->shouldAddXsrfTokenCookie()) {
                    $this->addCookieToResponse($request, $response);
                }
            });
        }

        throw new TokenMismatchException('CSRF token mismatch.');
    }
}
