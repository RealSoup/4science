<?php

namespace App\Listeners;

use App\Events\GoodsSearch;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\{SearchKeyword};
use Cookie;
use DB;
use Illuminate\Support\Facades\Redis;

class SearchKeywordListener {
    public function handle() {  }
    public function subscribe($events) {
        $events->listen(
            \App\Events\GoodsSearch::class,
            __CLASS__. '@goodsSearch'
        );
    }

    public function goodsSearch(GoodsSearch $e) {
        $prev_keyword = json_decode(Redis::get('SearchKeyword'.$e->ip));
        if ( is_null($prev_keyword) )
            $prev_keyword = array();
        if(!in_array($e->keyword, $prev_keyword)) {
            array_push($prev_keyword, $e->keyword);
            Redis::set('SearchKeyword'.$e->ip, json_encode($prev_keyword), 'EX', 60*60*24); //60*60*24
            SearchKeyword::insert( ['sk_keyword'=>$e->keyword, 'sk_uid'=>$e->uid] );
        }
    }
}
