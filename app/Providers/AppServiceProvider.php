<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Database\Eloquent\Relations\Relation;
// use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider {
    public function register() {
        $this->app->singleton(\Elastic\Elasticsearch\Client::class, function () {
            return \Elastic\Elasticsearch\ClientBuilder::create()
                ->setHosts([env('ELASTICSEARCH_HOST', 'http://localhost:9200')])
                ->setBasicAuthentication(
                    env('ELASTICSEARCH_USER', 'elastic'),
                    env('ELASTICSEARCH_PASSWORD', '')
                )
                ->setSSLVerification(false)
                ->build();
        });

        // Scout 엔진에 클라이언트 연결
        $this->app->bind(\Elastic\Client\ClientBuilderInterface::class, function () {
            return new class($this->app->make(\Elastic\Elasticsearch\Client::class)) 
                implements \Elastic\Client\ClientBuilderInterface {
                private $client;
                public function __construct($client) { $this->client = $client; }
                public function default(): \Elastic\Elasticsearch\Client { return $this->client; }
            };
        });

        $this->app->bind(\Elastic\Client\ClientBuilderInterface::class, function () {
            return new class($this->app->make(\Elastic\Elasticsearch\Client::class)) 
                implements \Elastic\Client\ClientBuilderInterface {
                private $client;
                public function __construct($client) { $this->client = $client; }
                public function default(): \Elastic\Elasticsearch\Client { return $this->client; }
                public function connection(string $name): \Elastic\Elasticsearch\Client { return $this->client; }
            };
        });
    }

    

    public function boot() {
        if (env('APP_ENV') == 'production') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
        // if(config('app.env') === 'production') {
        //     \URL::forceScheme('https');
        // }
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
            'maker'         => 'App\Models\Shop\Maker',
        ]);

        Blade::directive('nl2br', function ($string) {
            return "<?php echo nl2br(htmlentities($string)); ?>";
        });
    }
}
