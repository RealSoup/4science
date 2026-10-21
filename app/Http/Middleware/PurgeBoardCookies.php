<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

// [추가] 예전 방식으로 쌓인 게시글 조회 쿠키(board_{게시판}_{글번호})를 지우는 전역 미들웨어
//        브라우저가 보낸 요청에 해당 쿠키가 있으면, 응답에 '만료된 쿠키'를 실어 보내 브라우저가 지우게 함
class PurgeBoardCookies {
    const PATTERN = '/^board_[A-Za-z0-9_]+_\d+$/';

    public function handle(Request $request, Closure $next) {
        $response = $next($request);

        foreach ($request->cookies->keys() as $name) {
            if (preg_match(self::PATTERN, $name)) {
                $response->headers->setCookie(cookie()->forget($name));
            }
        }

        return $response;
    }
}
