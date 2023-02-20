<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
// use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider {
    public function register() {

    }

    public function boot() {
        if(config('app.env') === 'production') {
            \URL::forceScheme('https');
        }
        // if(head( explode('://', config('app.url'))) == 'https') { URL::forceScheme('https'); }
        //  다형성 타입 사용자 정의
        //  한 모델의 여러 모델이 관계형성을 할때 키값과 타입값이 같이 들어간다
        //  타입값으로 모델의 경로 + 모델명이 들어가는데 이렇게 제정의 한다.
        //  sc_file_info
        Relation::morphMap([
            'board'         => 'App\Models\Board',
            'goods'         => 'App\Models\Shop\Goods',
            'order'         => 'App\Models\Shop\Order',
            'orderExtra'    => 'App\Models\Shop\OrderExtraInfo',
            'estimateReq'   => 'App\Models\Shop\EstimateReq',
            'estimateReply' => 'App\Models\Shop\EstimateReply',
            'engReform'     => 'App\Models\EngReform',
            'boardGood'     => 'App\Models\BoardGood',
            'userBiz'       => 'App\Models\UserBiz',
            'userBiz'       => 'App\Models\UserBiz',
        ]);
    }
}
