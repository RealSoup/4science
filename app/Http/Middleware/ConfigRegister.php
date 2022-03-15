<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Cache;
use App\Models\Config;

class ConfigRegister {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $config = Config::all();
        foreach ($config as $v) {
            if(!Cache::has($v->key)) {
                Cache::forever($v->key, json_decode($v->var));
            }
        }
        return $next($request);
    }
}
