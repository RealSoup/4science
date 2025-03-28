<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', 'MainController@index')->name('main');
//
//
//
//
// // Route::group(['middleware' => ['auth'], 'prefix' => 'board/{bo_cd}'], function(){
// Route::group(['prefix' => 'board/{bo_cd}'], function(){
//     // Route::get('', [BoardController::class, 'index'])->name('board.index');
//     Route::get('', 'BoardController@index')->name('board.index')->where('bo_cd', '[a-zA-Z0-9_]+');
//     Route::get('show/{bo_id}', 'BoardController@show')->name('board.show')->where('bo_cd', '[a-zA-Z0-9_]+');
//     Route::get('create/{bo_papa_id?}', 'BoardController@create')->name('board.create')->where('bo_cd', '[a-zA-Z0-9_]+');
//     Route::post('store', 'BoardController@store')->name('board.store')->where('bo_cd', '[a-zA-Z0-9_]+');
//     Route::GET('edit/{bo_id}', 'BoardController@edit')->name('board.edit')->where('bo_cd', '[a-zA-Z0-9_]+');
//     Route::PATCH('update/{bo_id}', 'BoardController@update')->name('board.update')->where('bo_cd', '[a-zA-Z0-9_]+');
//     Route::delete('destroy/{bo_id}', 'BoardController@destroy')->name('board.destroy')->where('bo_cd', '[a-zA-Z0-9_]+');
//
//     Route::GET('goodBad/{bo_id}/{type}', 'BoardController@goodBad')->name('board.goodBad')->where('bo_cd', '[a-zA-Z0-9_]+');
// });
//
//
//


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');



// Route::get('category/all', 'Shop\CategoryController@indexAll')->name('category.indexAll');
// Route::get('/admin/shop/estimate/exportEstimateExcel/{er_id}', 'Admin\Shop\EstimateController@exportEstimateExcel');
// Route::get('/admin/shop/estimate/exportEstimatePdf/{er_id}', 'Admin\Shop\EstimateController@exportEstimatePdf');
// Route::get('/admin/shop/estimate/exportTransactionExcel/{er_id}', 'Admin\Shop\EstimateController@exportEstimateExcel');
// Route::get('/admin/shop/order/exportEstimatePdf/{od_id}', 'Admin\Shop\OrderController@exportEstimatePdf');
// Route::get('/admin/shop/order/exportTransactionExcel/{od_id}', 'Admin\Shop\OrderController@exportTransactionExcel');
// Route::get('/admin/shop/order/exportTransactionPdf/{od_id}', 'Admin\Shop\OrderController@exportTransactionPdf');
// Route::get('/admin/shop/order/exportOrderListExcel', 'Admin\Shop\OrderController@exportOrderListExcel');



// Route::get('e_test', function () {
//             $params['cont'] = \App\Models\Shop\Order::find(214);
//             $params['biz'] = cache("config.company");
//             $params = Illuminate\Support\Arr::collapse([$params, getGoodsInfo($params['cont'], 'order')]);
//             $subject = cache("config.company")->bizName." 온라인 견적서 입니다.";
//             return new App\Mail\Qoute(cache("config.company")->email, $subject, $params);
//         });

// Auth::routes();
Route::get('/excel', 'ExcelController@index');


Route::get('auth_check', function (Request $request) { return auth()->check(); });
Route::get('verify_check', function (Request $request) { return auth()->user()->hasVerifiedEmail(); });
// Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');



// Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::GET('emailCheck/{email}', 'Auth\UserController@emailCheck');
Route::post('register', 'Auth\RegisterController@register');

// Password Reset Routes...
// Route::get('auth/password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
// Route::get('auth/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');

Route::get('password/confirm', 'Auth\ConfirmPasswordController@showConfirmForm')->name('password.confirm');
Route::post('password/confirm', 'Auth\ConfirmPasswordController@confirm');

// Email Verification Routes...
Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
Route::get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');
Route::post('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');


// 소셜 로그인 - 콜백 함수에서 회원 로그인 여부로 분기 (콜백함수 경로 지정은 config/services.php 에서)
Route::get('social/{provider}', ['as' => 'social', 'uses' => 'Auth\SocialController@redirectToProvider']);
Route::get('social/{provider}/callback/', ['as' => 'social.callback', 'uses' => 'Auth\SocialController@handleProviderCallback']);
// 소셜 로그인 후 회원가입
Route::post('social/socialUserJoin', ['as' => 'social.socialUserJoin', 'uses' => 'Auth\SocialController@socialUserJoin']);
// 소셜 로그인 후 기존 계정에 연결
Route::post('social/connectExistAccount', ['as' => 'social.connectExistAccount', 'uses' => 'Auth\SocialController@connectExistAccount']);
Route::post('auth/create/{code}', 'Auth\SocialController@socialUserJoin')->name('auth.create');
Route::post('auth/join_sync_choice', 'Auth\SocialController@socialUserJoin')->name('auth.join_sync_choice');

Route::prefix('shop')->group(function () {
    Route::prefix('order')->group(function () {
        Route::GET( 'payReturn/{od_id?}',        'Shop\OrderController@payReturn');
        Route::POST('payRequestMobile',           'Shop\OrderController@payRequestMobile');
        Route::POST('payReturnMobile',            'Shop\OrderController@payReturnMobile');
        Route::POST('payReturnPsys',              'Shop\OrderController@payReturnPsys');
        Route::GET('tossBrandPayAccessToken',     'Shop\OrderController@tossBrandPayAccessToken');
        Route::GET('tossBillingKeyIssue/{od_id}', 'Shop\OrderController@tossBillingKeyIssue');
        Route::POST('adult_popup',                'KcpController@ReqPopUp')->name('shop.order.adult_popup');   //  kcp 본인확인 리턴
    });

    Route::prefix('estimate')->group(function () {
        Route::POST('create',   'Shop\EstimateController@create');
        Route::POST('/',        'Shop\EstimateController@store');
    });
});

Route::get('/test',              'TestController@index');
Route::get('/test/mail_display', 'TestController@mail_display');
Route::get('/test/merck_upload', 'TestController@merck_upload');
Route::post('/test/download',    'TestController@download');

Route::POST('auth/user/find_email',     'Auth\UserController@find_email');
Route::GET('auth/user/createInfo',      'Auth\UserController@createInfo');
Route::get('/admin/realsoup', 'Admin\RealsoupController@index');
Route::get('/admin/realsoup/test', 'Admin\RealsoupController@test');
Route::get('/admin/realsoup/play', 'Admin\RealsoupController@play');

Route::get('/admin/crontab/receiveConfirm',     'Admin\CronTabController@receiveConfirm');
Route::get('/admin/crontab/adjustMemberLevel',  'Admin\CronTabController@adjustMemberLevel');
Route::get('/admin/crontab/billingByCycle',     'Admin\CronTabController@billingByCycle');


Route::POST('/admin/shop/b2b_merck/OrderConfirmation', 'Admin\Shop\B2bMerckController@OrderConfirmation');
Route::POST('/admin/shop/b2b_merck/Invoice', 'Admin\Shop\B2bMerckController@Invoice');
Route::POST('/admin/shop/b2b_merck/Asn', 'Admin\Shop\B2bMerckController@Asn');
Route::prefix('user')->group(function () {
    Route::GET('getEmailDomain', 'UserAddrController@getEmailDomain');
});


//  검색엔진 실행
Route::GET('/admin/shop/goods/exeIndex', 'Admin\Shop\GoodsController@exeIndex');

// Route::post('email/resend', function (Request $request) {
//     dd(auth()->user()->sendEmailVerificationNotification());
 
//     return back()->with('message', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Localization
Route::get('/language/{locale}', function ($locale) {
    app()->setLocale($locale);
    session()->put('locale', $locale);
    Cache::forget('locale');
    return redirect()->back();
});
Route::get('/localization', function () {
    $strings = Array();
        // $lang = config('app.locale');
    $lang = session()->get('locale', \Lang::getLocale());
    \Lang::setLocale($lang);

    $files   = glob(resource_path('lang/' . $lang . '/*.php'));
    $strings = [];

    foreach ($files as $file) {
        $name           = basename($file, '.php');
        $strings[$name] = require $file;
    }


    header('Content-Type: text/javascript');
    echo('window.i18n = ' . json_encode($strings) . ';');
    exit();
});

Route::get('/{any}', 'SpaController@index')->where('any', '.*');

// Auth::routes(['verify' => true]);
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


