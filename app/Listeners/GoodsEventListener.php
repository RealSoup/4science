<?php

namespace App\Listeners;

use App\Events\GoodsView;
use App\Events\GoodsSearch;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Model\Shop\Goods;
use App\Models\{Search};

class GoodsEventListener {
    public function handle() {  }
    public function subscribe($events) {
        $events->listen(
            \App\Events\GoodsView::class,
            __CLASS__.'@goodsView' // 'App\Listeners\GoodsEventListener@viewGoods'
        );

        $events->listen(
            \App\Events\GoodsSearch::class,
            __CLASS__. '@goodsSearch'
        );
    }

    public function goodsView(GoodsView $event) {
        $sessionName = 'cnt_ckeck';
        if(!session()->get($sessionName)) {
            $event->goods->decrement('gd_view_cnt');
            session()->put($sessionName, true);
        }
    }

    public function goodsSearch(GoodsSearch $event) {
        Search::insert( ['sc_keyword'=>$event->sch_text] );
    }
}
