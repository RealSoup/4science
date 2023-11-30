import store from '@/store/index';
const isLoggedin = () => (to, from, next) => {
    if (store.state.auth.isLoggedin) 
        return next();

    next({name:'login', params: { route_name:to.name, params:to.params, query:to.query }});
    Notify.modal("로그인이 필요한 서비스입니다.", 'danger');
};
// const hasRequiredInfo = () => (to, from, next) => {
//     if (isEmpty(store.state.auth.user.email) || isEmpty(store.state.auth.user.password) || isEmpty(store.state.auth.user.name) || isEmpty(store.state.auth.user.birth) || isEmpty(store.state.auth.user.hp)) 
//         return next();    
//     next({name:'my_user_edit'});
//     Notify.modal("필수 개인정보를 입력하세요.", 'danger');
// };

const isNotLoggedin = () => (to, from, next) => {
    if (!store.state.auth.isLoggedin)
        return next();
    next('/');
};

export default [
    {   path: '/',
        name: 'main',
        component:() => import('@/views/web/Main'),
    },
//      인증
    {   path: '/login',
        name: 'login',
        component:() => import('@/views/web/auth/Login'),
        beforeEnter: (to, from, next) => {
            if (!store.state.auth.isLoggedin) return next();
            else next('/mypage/summary');
        }
        // beforeEnter: function(to, from, next) {
            // 인증 값 검증 로직 추가
        // }

    }, {   
        path: '/auth/join_sync_choice',
        name: 'auth_join_sync_choice',
        component:() => import('@/views/web/auth/JoinSyncChoice'),
        beforeEnter: isNotLoggedin(),
        // beforeEnter: function(to, from, next) {
            // 인증 값 검증 로직 추가
        // }

    }, {   
        path: '/email_verify',
        name: 'email_verify',
        component:() => import('@/views/web/auth/EmailVerify'),
    }, {
        path: '/auth',
        name: 'auth_intro',
        component:() => import('@/views/web/auth/Intro'),
        beforeEnter: isNotLoggedin()
    }, {
        path: '/auth/create/:code',
        name: 'auth_create',
        component:() => import('@/views/web/auth/Create'),
        beforeEnter: isNotLoggedin()
    }, {
        path: '/auth/password/forgot',
        name: 'auth_password_forgot',
        component:() => import('@/views/web/auth/password/Forgot'),
        beforeEnter: isNotLoggedin()
    }, {
        path: '/auth/password/reset/:token',
        name: 'auth_password_reset',
        component:() => import('@/views/web/auth/password/Reset'),
        beforeEnter: isNotLoggedin()
    },
//      마이페이지
    {   path: '/mypage',
        // name: 'mypage',
        component:() => import('@/views/web/mypage/Layout'),
        children: [
            {   path: "summary",
                name: 'mypage',
                component:() => import('@/views/web/mypage/Summary'),
            }, {
                path: "order",
                name: 'my_order',
                component:() => import('@/views/web/mypage/myShop/OrderIndex'),
            }, {
                path: "order/:od_id",
                name: 'my_order_show',
                component:() => import('@/views/web/mypage/myShop/OrderShow'),
            }, {
                path: "estimate",
                name: 'my_estimate',
                component:() => import('@/views/web/mypage/myShop/EstimateIndex'),
            }, {
                path: "estimate/:eq_id",
                name: 'my_estimate_show',
                component:() => import('@/views/web/mypage/myShop/EstimateShow'),
            }, {
                path: "estimate/reply/:er_id",
                name: 'my_estimate_show_reply',
                component:() => import('@/views/web/mypage/myShop/EstimateShowReply'),
            }, {
                path: "bought",
                name: 'my_bought',
                component:() => import('@/views/web/mypage/myShop/Bought'),
            }, {
                path: "wish",
                name: 'my_wish',
                component:() => import('@/views/web/mypage/myShop/Wish'),
            },

            {
                path: 'board/:bo_cd',
                name: 'my_bo_index',
                component:() => import('@/views/web/mypage/myBoard/Index'),
            }, {
                path: 'board/:bo_cd/show/:bo_id',
                name: 'my_bo_show',
                component:() => import('@/views/web/mypage/myBoard/Show'),
            }, {
                path: 'eng_reform',
                name: 'my_eng_reform_index',
                component:() => import('@/views/web/mypage/myEngReform/Index'),
            }, {
                path: 'eng_reform/:er_id',
                name: 'my_eng_reform_show',
                component:() => import('@/views/web/mypage/myEngReform/Show'),
            },

            {
                path: 'mileage',
                name: 'my_mileage',
                component:() => import('@/views/web/mypage/mileage/Index'),
            },

            {
                path: 'print',
                name: 'my_print',
                component:() => import('@/views/web/mypage/print/Index'),
            },

            {
                path: 'user/edit',
                name: 'my_user_edit',
                component:() => import('@/views/web/mypage/myUser/Edit'),
            },{
                path: 'user/destroy',
                name: 'my_user_destroy',
                component:() => import('@/views/web/mypage/myUser/Destroy'),
            },
        ],
        beforeEnter: isLoggedin(),
        // beforeEnter: function(to, from, next) {
        //     if (to.path === '/mypage' || to.path === '/mypage/')    return next('/mypage/summary');
        //     else                                                    return next();
        // }
    },

//      커뮤니티
    {   path: '/board',
        name: 'bo_intro',
        component:() => import('@/views/web/board/Intro'),
        // beforeEnter: isLoggedin(),
    }, {   
        path: '/board',
        component:() => import('@/views/web/board/Layout'),
        children: [
            {   path: ":bo_cd",
                name: 'bo_index',
                component:() => import('@/views/web/board/Index'),
            }, {   
                path: ':bo_cd/show/:bo_id',
                name: 'bo_show',
                component:() => import('@/views/web/board/Show'),
            }, {
                path: ':bo_cd/create',
                name: 'bo_create',
                component:() => import('@/views/web/board/Create'),
                beforeEnter: isLoggedin(),
            }, {
                path: ':bo_cd/edit/:bo_id',
                name: 'bo_edit',
                component:() => import('@/views/web/board/Edit'),
                beforeEnter: isLoggedin(),
            },
        ],
        // beforeEnter: function(to, from, next) {
        //     if (to.path === '/board' || to.path === '/board/')    return next('/board/summary');
        //     else                                                  return next();
        // }
    },   


//      상품
    {   path: '/shop/goods',
        name: 'goods_index',
        component:() => import('@/views/web/shop/goods/Index'),
        // beforeEnter: isLoggedin(),
    },{
        path: '/shop/goods/:gd_id',
        name: 'goods_show',
        component:() => import('@/views/web/shop/goods/Show'),
        // beforeEnter: isLoggedin(),
    },

//      주문
    {   path: '/shop/order/settle',
        name: 'order_settle',
        component:() => import('@/views/web/shop/order/Settle'),
        beforeEnter: isLoggedin(),
    }, {
        path: '/shop/order/payReturn',
        name: 'order_pay_return',
        component:() => import('@/views/web/shop/order/payReturn'),
        // beforeEnter: isLoggedin(),
    }, {
        path: '/shop/order/done/:od_id',
        name: 'order_done',
        component:() => import('@/views/web/shop/order/Done'),
        // beforeEnter: isLoggedin(),
    }, {
        path: '/shop/order/payCardFail',
        name: 'order_pay_card_fail',
        component:() => import('@/views/web/shop/order/PayCardFail'),
        beforeEnter: isLoggedin(),
    }, {    //      Psys 결제 팝업
        path: '/shop/order/settle_psys/:od_id',
        name: 'order_settle_psys',
        component:() => import('@/views/web/shop/order/SettlePsys'),
        beforeEnter: isLoggedin(),
    },

//      견적요청
    {   path: '/shop/estimate/create',
        name: 'estimate_create',
        component:() => import('@/views/web/shop/estimate/Create'),
        beforeEnter: isLoggedin(),
    }, {   //   주문 제작
        path: '/shop/estimate/custom',
        name: 'estimate_custom_index',
        component:() => import('@/views/web/shop/estimate/custom/Index'),
        beforeEnter: isLoggedin(),
    }, {   //   주문 제작
        path: '/shop/estimate/custom/:id',
        name: 'estimate_custom_create',
        component:() => import('@/views/web/shop/estimate/custom/Create'),
        beforeEnter: isLoggedin(),
    },

//      전문관
    {   path: '/shop/outlet',
        name: 'outlet',
        component:() => import('@/views/web/shop/outlet/Cover'),
    }, {
        path: '/shop/outlet/:type/:group',
        name: 'outlet_index',
        component:() => import('@/views/web/shop/outlet/Index'),
    },

//      당일출고
    {   path: '/shop/listing/:code/:group',
        name: 'listing',
        component:() => import('@/views/web/shop/listing/Index'),
    },
//      Sale
    {   path: '/shop/listing/sale',
        name: 'listing_sale',
        component:() => import('@/views/web/shop/listing/Sale'),
    },    

//      고객센터
    {   path: '/cscenter',
        name: 'cscenter',
        component:() => import('@/views/web/cscenter/Index'),
        beforeEnter: isLoggedin(),
    },

//      영문교정
    {   path: '/engReform/create',
        name: 'engReform_create',
        component:() => import('@/views/web/engReform/Create'),
        beforeEnter: isLoggedin(),
    },

//      렌탈
    {   path: '/shop/rental',
        name: 'rental',
        component:() => import('@/views/web/shop/rental/Index'),
    },

//      장바구니
    {   path: '/shop/cart',
        name: 'cart_index',
        component:() => import('@/views/web/shop/cart/Index'),
        beforeEnter: isLoggedin(),
    },
//      회사소개
    {   path: '/introduce',
        component:() => import('@/views/web/introduce/Layout'),
        children: [
            {   path: "company",
                name: 'introduce_company',
                component:() => import('@/views/web/introduce/Company'),
            }, {   
                path: 'history',
                name: 'introduce_history',
                component:() => import('@/views/web/introduce/History'),
            }, {   
                path: 'map',
                name: 'introduce_map',
                component:() => import('@/views/web/introduce/Map'),
            }, {   
                path: 'rule',
                name: 'introduce_rule',
                component:() => import('@/views/web/introduce/Rule'),
            },
        ],
    },

//      테스트
    {   path: '/test/psys',
        name: 'test_psys',
        component:() => import('@/views/web/test/Psys'),
        // beforeEnter: isLoggedin(),
    },
];
