<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Cache;
use DB;
use Illuminate\Support\Arr;
use App\Models\{User, Info, ShowWindow};
use App\Models\Shop\{Goods, GoodsCategory, Category, Maker};
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
            $u = User::select('id', 'name', 'email', 'um_status')
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


/////////////////////////////////////////////////////////
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

        $key_nm = 'update_key_banner_goods';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key); 
            $data = ShowWindow::select('sw_key', 'sw_group', 'sw_memo')
                // ->with('goods')
                ->with(['goods' => fn ($q) => $q->select('gd_id', 'gd_name')])
                ->Type('banner_goods')
                ->orderBy('sw_seq')
                ->orderBy('sw_id')
                ->limit(6)
                ->get()->toJson();
            Redis::set('banner_goods', $data);
        }
        
        $key_nm = 'update_key_maker_shop';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key);
            $data = Maker::with('fileInfo')->whereNotNull('mk_desc')->where('mk_desc', '!=', '')->orderBy('mk_name')->get()->chunk(12)->toJson();
            Redis::set('maker_shop', $data);
        }

        $key_nm = 'update_key_newest';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key);
            $data = Goods::with('maker')->latest()->limit(4)->get();
            Redis::set('newest', $data);
        }

        /*
            새로고침 기준에 매일 새벽 4시임
            소스 위치
            \app\Http\Kernel.php -> protected function schedule
        */
        
        $key_nm = 'update_key_top_selling';
        $db_key = Info::Key($key_nm)->first()->val;
        if( $db_key !== Redis::get($key_nm) ) {
            Redis::set($key_nm, $db_key);
            $ordersPerGoods = DB::table('shop_order')
                ->whereIn('od_type', ['buy_inst', 'buy_cart', 'buy_estimate'])
                ->whereIn('od_step', ['20', '30', '31', '40', '50'])
                ->join('shop_order_model', 'odm_od_id', '=', 'od_id')
                ->where('odm_gm_id', '>', 0)
                ->selectRaw("
                    odm_gd_id,
                    COUNT(od_id) as order_cnt,
                    MAX(created_at) as last_order_at
                ")
                ->groupBy('odm_gd_id');

            // 2) Goods에 조인해서 유효 상품만, 주문건수 순으로 5개
            $top10 = Goods::query()
                ->joinSub($ordersPerGoods, 'r', 'r.odm_gd_id', '=', 'shop_goods.gd_id')
                ->whereNull('shop_goods.deleted_at')
                ->where('shop_goods.gd_enable', 'Y')
                ->orderByDesc('r.order_cnt')
                ->orderByDesc('r.last_order_at')   // 동률이면 더 최근 주문 우선
                ->select('shop_goods.*')
                ->limit(20)
                ->get()
                ->random(10);

            Redis::set('top_selling', $data);
        }





        //  검색엔진 인덱스 작업을 관리한 메모리캐쉬 키생성
        if( !Redis::get('is_working_index') )
            Redis::set('is_working_index', 'no');
        
        return $next($request);
    }
}