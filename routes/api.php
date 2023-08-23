<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  로그인 서비스   ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
Route::middleware(['auth:sanctum'])->group(function () {
    /*  <<<<<<<<<<<<<<<<<<<<<<      WEB        >>>>>>>>>>>>>>>>>>>>>>>*/
    // Route::get('/user', function (Request $request) { return [ 'user' => $request->user(), 'token' => csrf_token() ]; });
    Route::middleware(['verified'])->group(function () {
        Route::prefix('user')->group(function () {
            Route::GET('/',             'Auth\UserController@auth');
            Route::GET('/{id}/edit',    'Auth\UserController@edit');
            Route::PATCH('/',           'Auth\UserController@update');
            Route::DELETE('/',          'Auth\UserController@destroy');
            Route::GET('getEmailDomain', 'UserAddrController@getEmailDomain');
            Route::RESOURCE('addr',     'UserAddrController');
        });

        Route::GET('mypage/print/{code}', 'MyPageController@print');
        // Route::RESOURCE('mypage', MyPageController::class)->only([ 'index', 'edit', 'update', 'destroy' ]);
        

        Route::RESOURCE('mileage', 'MileageController')->only([ 'index', 'store' ]);
        Route::GET('mileage/enable', 'MileageController@enable');

        Route::prefix('shop')->group(function () {
            Route::patch('cart/update', 'Shop\CartController@update')->name('shop.cart.update');
            Route::RESOURCE('cart', 'Shop\CartController', [
                'except' => [ 'show', 'create', 'edit', 'update'],
                'names' => [
                    'index'  => 'shop.cart.index',
                    'store'  => 'shop.cart.store',
                    'destroy'  => 'shop.cart.destroy',
                ]
            ]);

            Route::prefix('order')->group(function () {
                Route::GET('bought', 'Shop\OrderController@bought');
                Route::GET('cnt_od_step', 'Shop\OrderController@cnt_od_step');
                Route::GET('printEstimate/{od_id}', 'Shop\OrderController@printEstimate');
                Route::GET('downEstimateExcel/{od_id}', 'Shop\OrderController@downEstimateExcel');
                Route::GET('downTransactionExcel/{od_id}', 'Shop\OrderController@downTransactionExcel');
            });

            Route::RESOURCE('order', 'Shop\OrderController')->only([ 'index', 'update' ]);
            Route::RESOURCE('wish', 'Shop\WishController')->only([ 'index', 'store', 'destroy' ]);

            Route::prefix('order')->group(function () {
                Route::POST('settle',       'Shop\OrderController@settle')->name('order.settle');
                Route::POST('pay',          'Shop\OrderController@pay')->name('order.pay');
                Route::GET( 'done/{od_id}', 'Shop\OrderController@done')->name('order.done');
                Route::GET( '{od_id}',      'Shop\OrderController@show');

            });

            Route::prefix('estimate')->group(function () {
                Route::GET('getCustomMadeCategory', 'Shop\EstimateController@getCustomMadeCategory');
                Route::GET('/',         'Shop\EstimateController@index');
                Route::POST('create',   'Shop\EstimateController@create')->name('shop.estimate.create');
                Route::POST('/',        'Shop\EstimateController@store')->name('shop.estimate.store');
                Route::GET( '{eq_id}',  'Shop\EstimateController@show')->name('shop.estimate.show');
                Route::GET( 'reply/{er_id}',  'Shop\EstimateController@replyShow')->name('shop.estimate.replyShow');
                Route::POST('reEstimate', 'Shop\EstimateController@reEstimate');
                Route::GET('printEstimate/{er_id}', 'Shop\EstimateController@printEstimate');

            });
            
            Route::GET('maker', 'Shop\MakerController@index');
        });

        Route::GET('engReform/getOption', 'EngReformController@getOption');
        Route::RESOURCE('engReform', EngReformController::class)->only([ 'index', 'store' ]);

        Route::prefix('board/{bo_cd}')->group(function () {
            Route::GET('indexComment/{bo_id}', 'BoardController@indexComment')->name('board.indexComment')->where('bo_cd', '[a-zA-Z0-9_]+');
            // Route::get('show/{bo_id}', 'BoardController@show')->name('board.show')->where('bo_cd', '[a-zA-Z0-9_]+');
            Route::GET('create/{bo_papa_id?}', 'BoardController@create')->name('board.create')->where('bo_cd', '[a-zA-Z0-9_]+');
            Route::post('store', 'BoardController@store')->name('board.store')->where('bo_cd', '[a-zA-Z0-9_]+');
            Route::GET('edit/{bo_id}', 'BoardController@edit')->name('board.edit')->where('bo_cd', '[a-zA-Z0-9_]+');
            Route::PATCH('update/{bo_id}', 'BoardController@update')->name('board.update')->where('bo_cd', '[a-zA-Z0-9_]+');
            Route::delete('destroy/{bo_id}', 'BoardController@destroy')->name('board.destroy')->where('bo_cd', '[a-zA-Z0-9_]+');
            Route::GET('goodBad/{bo_id}/{type}', 'BoardController@goodBad')->name('board.goodBad')->where('bo_cd', '[a-zA-Z0-9_]+');
        });

        









        /*  <<<<<<<<<<<<<<<<<<<<<<      관리자        >>>>>>>>>>>>>>>>>>>>>>>*/
        Route::prefix('admin')->group(function () {
            Route::Get('/', 'Admin\MainController@index');
            Route::prefix('common')->group(function () {
                Route::GET('/', 'Admin\CommonController@index');
            });
            Route::prefix('site')->group(function () {
                Route::GET('/', 'Admin\SiteController@index');
                Route::PATCH('/', 'Admin\SiteController@update');

                Route::GET( 'mainCateGoods/{ca_id}','Admin\SiteController@mainCateGoods');
                Route::POST('mainCateGoodsUpdate',  'Admin\SiteController@mainCateGoodsUpdate');
                Route::GET( 'mainBest',             'Admin\SiteController@mainBest');
                Route::POST('mainBestUpdate',       'Admin\SiteController@mainBestUpdate');
            });

            Route::RESOURCE('user', 'Admin\UserController')->only([ 'index', 'edit', 'update', 'destroy' ]);
            Route::prefix('user')->group(function () {
                Route::GET('list', 'Admin\UserController@list')->name('user.list');
                Route::GET('indesAddr/{id}', 'Admin\UserController@indesAddr');
                Route::POST('storeAddr', 'Admin\UserController@storeAddr');
                Route::POST('updateAddr', 'Admin\UserController@updateAddr');
                Route::GET('destroyAddr/{id}', 'Admin\UserController@destroyAddr');
                
                Route::GET('email',             'Admin\UserController@email_index');
                Route::GET('email/{id}/edit',   'Admin\UserController@email_edit');
                Route::POST('email',            'Admin\UserController@email_store');
                Route::PATCH('email/{id}',      'Admin\UserController@email_update');
                Route::POST('email/{id}/send',  'Admin\UserController@email_send');
                Route::DELETE('email/{id}',     'Admin\UserController@email_destroy');
                Route::GET('mailInfo',          'Admin\UserController@mailInfo');
                Route::GET('origin/{id}', 'Admin\UserController@origin'); 
            });
            
            Route::prefix('mileage')->group(function () {
                Route::GET('enable/{id}',       'Admin\MileageController@enable');
                Route::GET('{id}',              'Admin\MileageController@index');
                Route::PATCH('{id}',            'Admin\MileageController@update');
                Route::POST('{id}',             'Admin\MileageController@store');
            });

            Route::prefix('shop')->group(function () {
                Route::GET('category/index_init', 'Admin\Shop\CategoryController@indexInit')->name('category.index_init');
                Route::GET('category/ca_name/{ca_id}', 'Admin\Shop\CategoryController@getName')->name('category.ca_name');
                Route::POST('category/set_seq', 'Admin\Shop\CategoryController@setSeq')->name('category.setSeq');
                Route::GET('category/rewrite', 'Admin\Shop\CategoryController@rewrite')->name('category.rewrite');
                Route::resource('category', 'Admin\Shop\CategoryController', [
                    'except'    => [ 'edit', 'create' ],
                    'names'     => [
                        'index'   => 'admin.shop.category.index',
                        'show'    => 'admin.shop.category.show',
                        'store'   => 'admin.shop.category.store',
                        'update'  => 'admin.shop.category.update',
                        'destroy' => 'admin.shop.category.destroy' ]
                ]);

                Route::prefix('goods')->group(function () {
                    Route::GET('getModel', 'Admin\Shop\GoodsController@getModel');
                    Route::POST('fileUpload', 'Admin\Shop\GoodsController@fileUpload');
                    Route::GET('getGoodsList', 'Admin\Shop\GoodsController@getGoodsList');
                });
                Route::resource('goods', 'Admin\Shop\GoodsController');
                
                // Route::get('goods/getGoods', 'Admin\Shop\GoodsController@getGoods')->name('admin.shop.goods.get_goods');

                // Route::get('goods/getGoodsMaker/{gd_id}', 'Admin\Shop\GoodsController@getGoodsMaker')->name('admin.shop.goods.getGoodsMaker');

                Route::GET('goods_option', 'Admin\Shop\GoodsOptionController@index');
                Route::GET('goods_option_child', 'Admin\Shop\GoodsOptionChildController@index');

                Route::resource('maker', 'Admin\Shop\MakerController', [
                    'except' => [ 'show', 'create', 'edit' ],
                    'names' => [
                        'index'		=> 'admin.shop.maker.index',
                        'store'		=> 'admin.shop.maker.store',
                        'destroy'	=> 'admin.shop.maker.destroy',
                        'update'	=> 'admin.shop.maker.update',
                    ]
                ]);

                Route::resource('purchase_at', 'Admin\Shop\PurchaseAtController', [
                    'except' => [ 'show', 'create', 'edit' ],
                    'names' => [
                        'index'		=> 'admin.shop.purchase_at.index',
                        'store'		=> 'admin.shop.purchase_at.store',
                        'destroy'	=> 'admin.shop.purchase_at.destroy',
                        'update'	=> 'admin.shop.purchase_at.update',
                    ]
                ]);

                Route::POST('order/exportEstimateExcel',    'Admin\Shop\OrderController@exportEstimateExcel')->name('admin.shop.order.exportEstimateExcel');
                Route::POST('order/exportEstimatePdf',      'Admin\Shop\OrderController@exportEstimatePdf')->name('admin.shop.order.exportEstimatePdf');
                Route::POST('order/exportTransactionExcel', 'Admin\Shop\OrderController@exportTransactionExcel')->name('admin.shop.order.exportTransactionExcel');
                Route::POST('order/exportTransactionPdf',   'Admin\Shop\OrderController@exportTransactionPdf')->name('admin.shop.order.exportTransactionPdf');
                Route::resource('order', 'Admin\Shop\OrderController', [
                    'except' => [ 'show', 'create', 'destroy' ],
                    'names' => [
                        'index'		=> 'admin.shop.order.index',
                        'store'     => 'admin.shop.order.store',
                        'edit'		=> 'admin.shop.order.edit',
                        'update'	=> 'admin.shop.order.update',
                    ],
                ]);

                Route::get('bundleDc/findGmId/{gm_id}', 'Admin\Shop\BundleDcController@findGmId');
                

                Route::POST('estimate/exportEstimateExcel', 'Admin\Shop\EstimateController@exportEstimateExcel')->name('admin.shop.estimate.exportEstimateExcel');
                Route::POST('estimate/exportEstimatePdf', 'Admin\Shop\EstimateController@exportEstimatePdf')->name('admin.shop.estimate.exportEstimatePdf');
                Route::POST('estimate/exportTransactionExcel', 'Admin\Shop\EstimateController@exportTransactionExcel')->name('admin.shop.estimate.exportTransactionExcel');
                Route::POST('estimate/exportTransactionPdf', 'Admin\Shop\EstimateController@exportTransactionPdf')->name('admin.shop.estimate.exportTransactionPdf');
                // Route::get('estimate/printEstimatePdf/{er_id}', 'Admin\Shop\EstimateController@printEstimatePdf')->name('admin.shop.estimate.printEstimatePdf');
                Route::POST('estimate/reSend/{er_id}', 'Admin\Shop\EstimateController@reSend')->name('admin.shop.estimate.reSend');
                Route::get('estimate/showEstimate/{er_id}', 'Admin\Shop\EstimateController@showEstimate');
                Route::get('estimate/getEmptyEm', 'Admin\Shop\EstimateController@getEmptyEm');
                Route::resource('estimate', 'Admin\Shop\EstimateController');
                // Route::POST('estimate/estimateModelPurchaseCollection', 'Admin\Shop\EstimateController@estimateModelPurchaseCollection')->name('admin.shop.estimate.estimateModelPurchaseCollection');

                //  Merck 발주
                Route::prefix('b2b_merck')->group(function () {
                    Route::GET('/order',        'Admin\Shop\B2bMerckController@order');
                    Route::POST('/orderExe',    'Admin\Shop\B2bMerckController@orderExe');
                    
                    Route::GET('/orderResult',  'Admin\Shop\B2bMerckController@orderRst');
                    Route::POST('/stockCheck',  'Admin\Shop\B2bMerckController@stockCheck');
                    Route::GET('/stockResult',  'Admin\Shop\B2bMerckController@stockRst');
                    Route::GET('/invoiceIndex','Admin\Shop\B2bMerckController@invoiceIndex');
                    Route::GET('/asnIndex',    'Admin\Shop\B2bMerckController@asnIndex');
                });
            });

            //  영문교정
            Route::prefix('engReform')->group(function () {
                Route::GET('/', 'Admin\EngReformController@index');
                Route::GET('{er_id}/edit', 'Admin\EngReformController@edit');
                Route::PATCH('{er_id}', 'Admin\EngReformController@update');
            });

            //  게시판
            Route::prefix('board/{bo_cd}')->group(function () {
                Route::GET('',                      'Admin\BoardController@index')->name(   'admin.board.index')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::GET('show/{bo_id}',          'Admin\BoardController@show')->name(    'admin.board.show')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::GET('create',                'Admin\BoardController@create')->name(  'admin.board.create')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::POST('store',                'Admin\BoardController@store')->name(   'admin.board.store')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::GET('edit/{bo_id}',          'Admin\BoardController@edit')->name(    'admin.board.edit')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::PATCH('update/{bo_id}',      'Admin\BoardController@update')->name(  'admin.board.update')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::POST('answer/{bo_id}',               'Admin\BoardController@answer')->name(  'admin.board.answer')->where('bo_cd', '[a-zA-Z0-9_]+');
                Route::DELETE('destroy/{bo_id}',    'Admin\BoardController@destroy')->name( 'admin.board.destroy')->where('bo_cd', '[a-zA-Z0-9_]+');
                // Route::get('indexComment/{bo_id}', 'BoardController@indexComment')->name('board.indexComment')->where('bo_cd', '[a-zA-Z0-9_]+');
                // Route::GET('goodBad/{bo_id}/{type}', 'BoardController@goodBad')->name('board.goodBad')->where('bo_cd', '[a-zA-Z0-9_]+');
            });

            //  영업장부
            Route::RESOURCE('ledger', 'Admin\LedgerController')->only([ 'index', 'store', 'update', 'destroy' ]);
            Route::POST('ledger/updateSearch', 'Admin\LedgerController@updateSearch');
            Route::POST('ledger/updateColumn', 'Admin\LedgerController@updateColumn');
            Route::RESOURCE('ledgerAcct', 'Admin\LedgerAcctController')->only([ 'index', 'store', 'update', 'destroy' ]);
            
            //  통계
            Route::prefix('stats')->group(function () {
                Route::GET('/user', 'Admin\StatsController@user');
                Route::GET('/order', 'Admin\StatsController@order');
            });

            //  검색엔진 인덱스 만들기 ( elasticsearch )
            Route::prefix('scout')->group(function () {
                Route::GET('/', 'Admin\ScoutController@index');
                Route::GET('/creat', 'Admin\ScoutController@creat');
            });
        });

        
        Route::post('download', 'CommonController@download');
        Route::get('deleteFiles/{fi_id?}', 'CommonController@deleteFiles');
    });

    /*  <<<<<<<<<<<<<<<<<<<<<<      공통        >>>>>>>>>>>>>>>>>>>>>>>*/
    Route::post('upload', 'CommonController@upload');
    Route::post('uploadSimple', 'CommonController@uploadSimple')->name('uploadSimple');
    
    // Route::get('downloadGoods/{fi_id}', 'CommonController@downloadGoods');
});


//  로그인 필요 없는 서비스
Route::get('siteInfo', 'CommonController@siteInfo');
Route::get('main', 'MainController@index')->name('web_main');
Route::get('category/indexAll', 'Shop\CategoryController@indexAll')->name('category.indexAll');
Route::get('category/{ca_id}', 'Shop\CategoryController@index')->name('category.index');
Route::prefix('shop')->group(function () {
    Route::GET('goods/recentGoods', 'Shop\GoodsController@recentGoods')->name('goods.recentGoods');
    Route::GET('goods/getDef', 'Shop\GoodsController@getDef');
    Route::resource('goods', 'Shop\GoodsController', [
        'except' => [ 'create', 'store', 'destroy', 'edit', 'update'],
        'names' => [
            'index'  => 'shop.goods.index',
            'show'   => 'shop.goods.show',
        ]
    ]);
});
Route::prefix('board/{bo_cd}')->group(function () {
    Route::get('', 'BoardController@index')->name('board.index')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::get('show/{bo_id}', 'BoardController@show')->name('board.show')->where('bo_cd', '[a-zA-Z0-9_]+');
});

Route::prefix('shop')->group(function () {
    Route::GET('listing/{type}/{group?}', 'Shop\ListingController@index');

    Route::prefix('outlet')->group(function () {
        Route::GET('{code}/{type}', 'Shop\OutletController@index')->name('shop.outlet.index');
    });
});