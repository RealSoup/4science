<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class TrackingUuid {
    public function handle($request, Closure $next) {
        if (!$request->cookie('tracking_uuid')) {
            $uuid = (string) Str::uuid();
            $response = $next($request);
            return $response->cookie('tracking_uuid', $uuid, 60 * 24 * 365); // 1년
        }

        return $next($request);
    }
}