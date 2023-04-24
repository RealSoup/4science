<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Cache;
use Illuminate\Support\Arr;
use App\Models\{User, Info};
use App\Models\Shop\{Category};

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
        if(!Cache::has('UserMngOn')) {
            $u = User::whereHas('UserMng', function ($q) { $q->where('um_status', 'Y'); })->get()->keyBy('id');            
            Cache::forever('UserMngOn', json_decode($u, true));  //  배열 형태로 들어감
        }
        if(!Cache::has('UserMngOff')) {
            $u = User::whereHas('UserMng')->get()->keyBy('id');      
            Cache::forever('UserMngOff', json_decode($u, true));  //  배열 형태로 들어감
        }

        $ca = new Category;
        $db_key = $ca->find(1)->ca_name;
        $cache_key = Cache::get('cate_cache_modify_key');
        if(!($db_key == $cache_key && Cache::has("categoryAll"))) {
            Cache::forever("cate_cache_modify_key", $db_key); 
            Cache::forever("categoryAll", json_decode(
                \Illuminate\Support\Facades\Storage::disk('local')->get('category.json'), true
            ));  //  배열 형태로 들어감
        }
        return $next($request);
        // \Auth::logout();
        // return response()->json(['message' => 'Sever(Exception):로그인이 필요한 서비스입니다.'], 401);
    }
}
