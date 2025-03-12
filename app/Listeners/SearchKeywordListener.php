<?php

namespace App\Listeners;

use App\Events\GoodsSearch;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\{SearchKeyword};
use Cookie;
use DB;

class SearchKeywordListener {
    public function handle() {  }
    public function subscribe($events) {
        $events->listen(
            \App\Events\GoodsSearch::class,
            __CLASS__. '@goodsSearch'
        );
    }

    public function goodsSearch(GoodsSearch $event) {
        SearchKeyword::insert( ['sk_keyword'=>$event->keyword, 'sk_uid'=>$event->uid] );
    }
}
