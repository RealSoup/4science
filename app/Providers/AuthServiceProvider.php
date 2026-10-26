<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Auth\LegacyEloquentUserProvider;
use Illuminate\Auth\Notifications\ResetPassword;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot() {
        $this->registerPolicies();

        // 예전 방식(sha512) 비밀번호도 받아주는 회원 공급자 (config/auth.php 의 providers.users.driver)
        Auth::provider('legacy-eloquent', function ($app, array $config) {
            return new LegacyEloquentUserProvider($app['hash'], $config['model']);
        });

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return config('app.url')."auth/password/reset/{$token}?email={$user->email}";
        });
    }
}
