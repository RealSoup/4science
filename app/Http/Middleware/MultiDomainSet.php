<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MultiDomainSet {
    public function handle($request, Closure $next) {
        // if($request->getHost() !== 'menlo.co.kr'){
        //     config([ 'app.url' => 'http://menlo.co.kr/' ]);
        //     config([ 'session.domain' => '.menlo.co.kr' ]);
        // } else if($request->getHost() === 'thz.co.kr'){
        //     config([
        //         'session.domain' => '.thz.co.kr'
        //     ]);
        // }
        // return $next($request);

        $allowedOrigins = ['test.co.kr:3000', 'menlo.co.kr:3000', 'thz.co.kr'];
        $origin = $request->getHost();
        if (in_array($origin, $allowedOrigins)) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $origin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type');
        }

        return $next($request);
    }
}