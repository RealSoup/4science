<?php
namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use DB;

class LoginSubscriber {
    public function subscribe($events) {
        $events->listen( \App\Events\LoginAfter::Class, [LoginSubscriber::class, 'login_after'] );
    }

    public function login_after($e) {
        auth()->user()->last_login = \Carbon\Carbon::now();
        auth()->user()->login_cnt = auth()->user()->login_cnt ? auth()->user()->login_cnt+1 : 1;
        auth()->user()->save();
    }

}
