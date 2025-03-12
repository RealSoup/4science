<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        // \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        //     // ... other providers
        //     'SocialiteProviders\\Google\\GoogleExtendSocialite@handle',
        // ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            \SocialiteProviders\Naver\NaverExtendSocialite::class,	// 네이버
            \SocialiteProviders\Kakao\KakaoExtendSocialite::class,	// 카카오
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    protected $subscribe = [
        \App\Listeners\LoginSubscriber::class,
        \App\Listeners\BoardSubscriber::class,
        \App\Listeners\MileageSubscriber::class,
        \App\Listeners\GoodsEventListener::class,
        \App\Listeners\SearchKeywordListener::class,
    ];
}
