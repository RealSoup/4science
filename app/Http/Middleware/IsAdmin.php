<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin {
    public function handle($request, Closure $next) {
        if (!auth()->check() || !auth()->user()->is_admin) {
            abort(403, '관리자만 접근 가능합니다.');
        }
        return $next($request);
    }
}