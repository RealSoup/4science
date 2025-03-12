<?php

namespace App\Listeners;

use App\Events\GoodsView;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Cookie;
use DB;

class GoodsEventListener {
    public function handle() {  }
    public function subscribe($events) {
        $events->listen(
            \App\Events\GoodsView::class,
            __CLASS__.'@goodsView' // 'App\Listeners\GoodsEventListener@viewGoods'
        );
    }

    public function goodsView(GoodsView $event) {
        //  상품 조회수 증가
        $sessionName = "cnt_check{$event->gd_id}";
        if(!session()->get($sessionName)) {
            //  세션에 값을 넣고 true이면 조회수를 늘리지 않는다
            //  세션이 사라져아 증가
            //  새로고침으로 계속 증가함을 막기 위해
            // $event->goods->where('gd_id', $event->gd_id)->decrement('gd_view_cnt');
            DB::table('shop_goods')->where('gd_id', $event->gd_id)->decrement('gd_view_cnt');;
            session()->put($sessionName, true);
        }

        //  최근 본 상품 등록
        $rst = [];
        $ck_key = 'RecentGoods';
        $cookieRecentGoods = Cookie::get($ck_key);
        if ($cookieRecentGoods) {
            $array_cookieRecentGoods = explode(',', $cookieRecentGoods);
            array_unshift($array_cookieRecentGoods, intval($event->gd_id));
            $array_cookieRecentGoods = array_unique($array_cookieRecentGoods);     //  같은값 제거
            foreach ($array_cookieRecentGoods as $k => $v) {
                $v = intval($v);
                if ( $v>0 && $k<15 ) array_push($rst, $v);   //  값이 있따면 빼고 리턴
            }
            $rst = implode(",", $rst);
        } else
            $rst = $event->gd_id;
        Cookie::queue($ck_key, $rst);
    }
}
