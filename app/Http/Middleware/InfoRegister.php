<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Cache;
use App\Models\Info;

class InfoRegister {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $info = Info::all();
        foreach ($info as $v) {
            if(!Cache::has($v->key)) {
                Cache::forever($v->key, json_decode($v->var));
            }
        }
        return $next($request);
    }
}
