<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Cache;
use Illuminate\Support\Arr;
use App\Models\{User, Info};

class CacheMaker {
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
            if(!Cache::has($v->key))
                Cache::forever($v->key, json_decode($v->var, true));    //  배열 형태로 들어감
        }
        if(!Cache::has('UserMng')) {
            $u = User::whereHas('UserMng', function ($q) { $q->where('um_status', 'Y'); })->get()->keyBy('id');            
            Cache::forever('UserMng', json_decode($u, true));  //  배열 형태로 들어감
        }
        
        return $next($request);
        // \Auth::logout();
        // return response()->json(['message' => 'Sever(Exception):로그인이 필요한 서비스입니다.'], 401);
    }
}
