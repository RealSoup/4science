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
// Route::get('/admin/shop/estimate/exportTransactionExcel/{er_id}', 'Admin\Shop\EstimateController@exportEstimateExcel');
// Route::get('/admin/shop/order/exportEstimatePdf/{od_id}', 'Admin\Shop\OrderController@exportEstimatePdf');
// Route::get('/admin/shop/order/exportTransactionExcel/{od_id}', 'Admin\Shop\OrderController@exportTransactionExcel');
// Route::get('/admin/shop/order/exportTransactionPdf/{od_id}', 'Admin\Shop\OrderController@exportTransactionPdf');


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
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');

Route::get('password/confirm', 'Auth\ConfirmPasswordController@showConfirmForm')->name('password.confirm');
Route::post('password/confirm', 'Auth\ConfirmPasswordController@confirm');

// Email Verification Routes...
Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
Route::get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');
Route::post('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');

// Route::post('email/resend', function (Request $request) {
//     dd(auth()->user()->sendEmailVerificationNotification());
 
//     return back()->with('message', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::get('/{any}', 'SpaController@index')->where('any', '.*');

// Auth::routes(['verify' => true]);

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
