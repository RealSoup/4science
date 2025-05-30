<?php

namespace App\Listeners;

use App\Events\GoodsSearch;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\{SearchKeyword};
use Cookie;
use DB;
use Illuminate\Support\Facades\Redis;
use App\Traits\Curl;

class SearchKeywordListener {
    public function handle() {  }
    public function subscribe($events) {
        $events->listen(
            \App\Events\GoodsSearch::class,
            __CLASS__. '@goodsSearch'
        );
    }

    public function goodsSearch(GoodsSearch $e) {
        if($this->isAllowedCountryIP($e->ip)){
            $prev_keyword = json_decode(Redis::get('SearchKeyword'.$e->ip));
            if ( is_null($prev_keyword) )
                $prev_keyword = array();
            if(!in_array($e->keyword, $prev_keyword)) {
                array_push($prev_keyword, $e->keyword);
                Redis::set('SearchKeyword'.$e->ip, json_encode($prev_keyword), 'EX', 60*60*24); //60*60*24
          
                $engines = collect(['google.com', 'naver.com']);
                $matched = $engines->first(fn($engine) => $e->referer && str_contains($e->referer, $engine));

                SearchKeyword::insert( ['sk_keyword'=>$e->keyword, 'sk_uid'=>$e->uid, 'ip'=>$e->ip, 'is_count'=>$matched?0:1, 'prev_url'=> substr($e->referer ?? '', 0, 300)] );
            }
        }
    }

    function isAllowedCountryIP($ip){
        $response= Curl::get('https://ipinfo.io/'.$ip, "token=f4458f899d1681");
        if($response->code!= 200)    //요청 횟수 초과 및 검증 서버 다운 
            return true;
        $response= json_decode($response->response);
        if(property_exists($response, 'country') && $response->country != 'KR')
            return false;
        return true;
    }
}



