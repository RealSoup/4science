<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Cache;
use Illuminate\Support\Arr;
use App\Models\{User, Info, ShowWindow};
use App\Models\Shop\{Goods, GoodsCategory, Category};
use Illuminate\Support\Facades\Redis;

class CacheMaker {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        Cache::rememberForever("site", fn() => json_decode(Info::Key('site')->first()->val, true) );
        Cache::rememberForever("bank", fn() => json_decode(Info::Key('bank')->first()->val, true) );
        Cache::rememberForever("biz", fn() => json_decode(Info::Key('biz')->first()->val, true) );
        
        /*  
        수정시 바로 캐시화 할 수 없다
        로드벨런스로 서버 2개가 돌아간다.
        관리자 데이터 수정시 업데이트 하면
        해당 서버만 업데이트 되므로
        아래와 같은 방법을 쓴다.

        수정시 업데이트키에 유니크 값을 저장하고
        해당값과 다르면 업데이트하고
        업데이트 키를 저장하고 키값 같에 하여
        최신값임을 나타낸다.
        */

        $key_nm = 'update_key_user_mng';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            $u = User::select('id', 'name', 'um_status')
            ->join('user_mng', 'users.id', '=', 'user_mng.um_user_id')
            ->get()->keyBy('id');
            Redis::set('UserMngOn',  json_encode($u->where('um_status', 'Y')));
            Redis::set('UserMngOff',  json_encode($u));
        }
        
        $key_nm = 'update_key_cate';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key);
            $ca = new Category;
            $data = $ca->getCateTree();
            Redis::set('categoryAll',  json_encode($data));
        }
      
        $key_nm = 'update_key_best_main';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key); 
            $data = ShowWindow::select('sw_key')
                // ->with('goods')
                ->with(['goods' => fn ($q) => $q->select('gd_id', 'gd_name')])
                ->Type('best')
                ->orderBy('sw_seq')
                ->orderBy('sw_id')
                ->limit(6)
                ->get()->toJson();
            Redis::set('best_main', $data);
        }

        $key_nm = 'update_key_best_cate';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key); 
            $data = [];
            foreach (json_decode(Redis::get('categoryAll')) as $ca) {
                $data[$ca->ca_id] = Goods::join( 'show_window', 'shop_goods.gd_id', '=', 'show_window.sw_key' )
                    ->where([['sw_type', 'ca_best'], ['sw_group', $ca->ca_id]])
                    ->orderBy("sw_seq")
                    ->get();
            }
            Redis::set('best_cate', json_encode($data));
        }

        //  검색엔진 인덱스 작업을 관리한 메모리캐쉬 키생성
        if( !Redis::get('is_working_index') )
            Redis::set('is_working_index', 'no');
        
        return $next($request);
    }
}