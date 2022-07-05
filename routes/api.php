<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;









//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  로그인 서비스   ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
Route::middleware(['auth:sanctum'])->group(function () {
    /*  <<<<<<<<<<<<<<<<<<<<<<      WEB        >>>>>>>>>>>>>>>>>>>>>>>*/
    // Route::get('/user', function (Request $request) { return [ 'user' => $request->user(), 'token' => csrf_token() ]; });
    Route::GET('user', 'Auth\UserController@auth');
    Route::PATCH('user', 'Auth\UserController@update');

    Route::GET('mypage/print/{code}', 'MyPageController@print');
    Route::RESOURCE('mypage', MyPageController::class)->only([ 'index', 'edit', 'update', 'destroy' ]);

    Route::RESOURCE('mileage', 'MileageController')->only([ 'index', 'store', 'update' ]);
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

        Route::GET('estimate', 'Shop\EstimateController@index');

        Route::prefix('order')->group(function () {
            Route::GET('/', 'Shop\OrderController@index');
            Route::GET('bought', 'Shop\OrderController@bought');
        });
        Route::RESOURCE('wish', 'Shop\WishController')->only([ 'index', 'store', 'destroy' ]);
    });

    Route::RESOURCE('engReform', EngReformController::class)->only([ 'index', 'store' ]);











    /*  <<<<<<<<<<<<<<<<<<<<<<      관리자        >>>>>>>>>>>>>>>>>>>>>>>*/
    Route::prefix('admin')->group(function () {

        Route::prefix('site')->group(function () {
            Route::GET('info', 'Admin\SiteController@info');
            Route::PATCH('info/update', 'Admin\SiteController@infoUpdate');

            Route::GET('mainCateGoods/{ca_id}', 'Admin\SiteController@mainCateGoods');
            Route::POST('mainCateGoodsUpdate', 'Admin\SiteController@mainCateGoodsUpdate');
        });

        Route::RESOURCE('user', 'Admin\UserController')->only([ 'index', 'edit', 'update', 'destroy' ]);
        Route::prefix('user')->group(function () {
            Route::GET('list', 'Admin\UserController@list')->name('user.list');
        });

        
        Route::GET('mileage/requesterVoucher', 'Admin\MileageController@getRequesterVoucher');
        Route::RESOURCE('mileage', 'Admin\MileageController', [
            'names'     => [
                'index'   => 'admin.mileage.index',
                'update'  => 'admin.mileage.update',
            ]
        ])->only([ 'index', 'update' ]);



        Route::prefix('shop')->group(function () {
            Route::GET('category/index_init', 'Admin\Shop\CategoryController@indexInit')->name('category.index_init');
            Route::GET('category/ca_name/{ca_id}', 'Admin\Shop\CategoryController@getName')->name('category.ca_name');
            Route::POST('category/set_seq', 'Admin\Shop\CategoryController@setSeq')->name('category.setSeq');
            Route::POST('category/set_seq', 'Admin\Shop\CategoryController@setSeq')->name('category.setSeq');
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

            Route::GET('option', 'Admin\Shop\OptionController@index')->name('admin.shop.option.index');
            Route::GET('option_child', 'Admin\Shop\OptionChildController@index')->name('admin.shop.option_child.index');

            Route::resource('maker', 'Admin\Shop\MakerController', [
                'except' => [ 'show', 'create', 'edit' ],
    			'names' => [
    				'index'		=> 'admin.shop.maker.index',
    				'store'		=> 'admin.shop.maker.store',
    				'destroy'	=> 'admin.shop.maker.destroy',
    				'update'	=> 'admin.shop.maker.update',
    			]
    		]);

            Route::resource('hash', 'Admin\Shop\HashController', [
                'except' => [ 'show', 'create', 'edit' ],
    			'names' => [
    				'index'		=> 'admin.shop.hash.index',
    				'store'		=> 'admin.shop.hash.store',
    				'destroy'	=> 'admin.shop.hash.destroy',
    				'update'	=> 'admin.shop.hash.update',
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

            Route::get('order/exportEstimateExcel/{od_id}', 'Admin\Shop\OrderController@exportEstimateExcel')->name('admin.shop.order.exportEstimateExcel');
            Route::get('order/exportEstimatePdf/{od_id}', 'Admin\Shop\OrderController@exportEstimatePdf')->name('admin.shop.order.exportEstimatePdf');
            Route::get('order/exportTransactionExcel/{od_id}', 'Admin\Shop\OrderController@exportTransactionExcel')->name('admin.shop.order.exportTransactionExcel');
            Route::get('order/exportTransactionPdf/{od_id}', 'Admin\Shop\OrderController@exportTransactionPdf')->name('admin.shop.order.exportTransactionPdf');
            Route::resource('order', 'Admin\Shop\OrderController', [
                'except' => [ 'show', 'create', 'store', 'destroy' ],
    			'names' => [
    				'index'		=> 'admin.shop.order.index',
                    'edit'		=> 'admin.shop.order.edit',
    				'update'	=> 'admin.shop.order.update',
    			],
    		]);

            Route::get('estimate/exportEstimateExcel/{er_id}', 'Admin\Shop\EstimateController@exportEstimateExcel')->name('admin.shop.estimate.exportEstimateExcel');
            Route::get('estimate/exportEstimatePdf/{er_id}', 'Admin\Shop\EstimateController@exportEstimatePdf')->name('admin.shop.estimate.exportEstimatePdf');
            Route::get('estimate/exportTransactionExcel/{er_id}', 'Admin\Shop\EstimateController@exportTransactionExcel')->name('admin.shop.estimate.exportTransactionExcel');
            Route::get('estimate/exportTransactionPdf/{er_id}', 'Admin\Shop\EstimateController@exportTransactionPdf')->name('admin.shop.estimate.exportTransactionPdf');
            Route::get('estimate/printEstimatePdf/{er_id}', 'Admin\Shop\EstimateController@printEstimatePdf')->name('admin.shop.estimate.printEstimatePdf');
            Route::POST('estimate/reSend/{er_id}', 'Admin\Shop\EstimateController@reSend')->name('admin.shop.estimate.reSend');
            Route::get('estimate/showEstimate/{er_id}', 'Admin\Shop\EstimateController@showEstimate');
            Route::resource('estimate', 'Admin\Shop\EstimateController');
            // Route::POST('estimate/estimateModelPurchaseCollection', 'Admin\Shop\EstimateController@estimateModelPurchaseCollection')->name('admin.shop.estimate.estimateModelPurchaseCollection');
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
        
        
        
        
        //  통계
        Route::prefix('stats')->group(function () {
            Route::GET('/user', 'Admin\StatsController@user');
            Route::GET('/order', 'Admin\StatsController@order');
        });


    });




    






    /*  <<<<<<<<<<<<<<<<<<<<<<      공통        >>>>>>>>>>>>>>>>>>>>>>>*/
    Route::post('upload', 'CommonController@upload')->name('upload');
    Route::post('uploadSimple', 'CommonController@uploadSimple')->name('uploadSimple');
    
    Route::get('download/{fi_id}', 'CommonController@download')->name('download');
    Route::get('downloadGoods/{fi_id}', 'CommonController@downloadGoods')->name('downloadGoods');
    Route::get('deleteFiles/{fi_id?}', 'CommonController@deleteFiles')->name('deleteFiles');
});


//  로그인 필요 없는 서비스
Route::get('siteInfo', 'CommonController@siteInfo');
Route::get('main', 'MainController@index');
Route::get('category/indexAll', 'Shop\CategoryController@indexAll')->name('category.indexAll');
Route::get('category/{ca_id}', 'Shop\CategoryController@index')->name('category.index');
Route::prefix('shop')->group(function () {
    Route::GET('goods/recentGoods', 'Shop\GoodsController@recentGoods')->name('goods.recentGoods');
    Route::resource('goods', 'Shop\GoodsController', [
        'except' => [ 'create', 'store', 'destroy', 'edit', 'update'],
        'names' => [
            'index'  => 'shop.goods.index',
            'show'   => 'shop.goods.show',
        ]
    ]);


    Route::prefix('order')->group(function () {
        Route::POST('settle',       'Shop\OrderController@settle')->name('order.settle');
        Route::POST('pay',          'Shop\OrderController@pay')->name('order.pay');
        Route::GET( 'done/{od_id}', 'Shop\OrderController@done')->name('order.done');
        Route::GET( '{od_id}',      'Shop\OrderController@show');

    });

    Route::prefix('estimate')->group(function () {
        Route::POST('create',   'Shop\EstimateController@create')->name('shop.estimate.create');
        Route::POST('/',        'Shop\EstimateController@store')->name('shop.estimate.store');
        Route::GET( '{eq_id}',  'Shop\EstimateController@show')->name('shop.estimate.show');
        Route::GET( 'reply/{er_id}',  'Shop\EstimateController@replyShow')->name('shop.estimate.replyShow');
        Route::POST('reEstimate', 'Shop\EstimateController@reEstimate');
        Route::get('printEstimate/{er_id}', 'Shop\EstimateController@printEstimate');

    });

    Route::prefix('outlet')->group(function () {
        Route::GET('{code}/{type}/{group}', 'Shop\OutletController@index')->name('shop.outlet.index');
    });

    Route::get('listing/{type}', 'Shop\ListingController@index');
    Route::get('maker', 'Shop\MakerController@index');
});
Route::prefix('board/{bo_cd}')->group(function () {
    // Route::get('', [BoardController::class, 'index'])->name('board.index');
    Route::get('', 'BoardController@index')->name('board.index')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::get('indexComment/{bo_id}', 'BoardController@indexComment')->name('board.indexComment')->where('bo_cd', '[a-zA-Z0-9_]+');

    Route::get('show/{bo_id}', 'BoardController@show')->name('board.show')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::get('create/{bo_papa_id?}', 'BoardController@create')->name('board.create')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::post('store', 'BoardController@store')->name('board.store')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::GET('edit/{bo_id}', 'BoardController@edit')->name('board.edit')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::PATCH('update/{bo_id}', 'BoardController@update')->name('board.update')->where('bo_cd', '[a-zA-Z0-9_]+');
    Route::delete('destroy/{bo_id}', 'BoardController@destroy')->name('board.destroy')->where('bo_cd', '[a-zA-Z0-9_]+');

    Route::GET('goodBad/{bo_id}/{type}', 'BoardController@goodBad')->name('board.goodBad')->where('bo_cd', '[a-zA-Z0-9_]+');
});