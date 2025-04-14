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

        $allowedOrigins = ['menlo.co.kr', 'thz.co.kr'];
        $origin = $request->getHost();
        if (in_array($origin, $allowedOrigins)) {
            config([ 'app.url' => $request->getSchemeAndHttpHost().'/' ]);
        }

        return $next($request);
    }
}