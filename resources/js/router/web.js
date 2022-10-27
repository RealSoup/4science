import store from '@/store/index';
const isLoggedin = () => (to, from, next) => {
    if (store.state.auth.isLoggedin) {
        return next();
    }
    next({name:'login', query:{redirect:to.path}});
    Notify.modal("로그인이 필요한 서비스입니다.");
};

const isNotLoggedin = () => (to, from, next) => {
    if (!store.state.auth.isLoggedin) {
        return next();
    }
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
        beforeEnter: isNotLoggedin(),
        // beforeEnter: function(to, from, next) {
            // 인증 값 검증 로직 추가
        // }

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
        beforeEnter: function(to, from, next) {
            if (to.path === '/mypage' || to.path === '/mypage/')    return next('/mypage/summary');
            else                                                    return next();
        }
    },

//      커뮤니티
    {   path: '/board',
        name: 'bo_intro',
        component:() => import('@/views/web/board/Intro'),
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
            }, {
                path: ':bo_cd/edit/:bo_id',
                name: 'bo_edit',
                component:() => import('@/views/web/board/Edit'),
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
    },{
        path: '/shop/goods/:gd_id',
        name: 'goods_show',
        component:() => import('@/views/web/shop/goods/Show'),
    },

//      주문
    {   path: '/shop/order/settle',
        name: 'order_settle',
        component:() => import('@/views/web/shop/order/Settle'),
    },{
        path: '/shop/order/done/:od_id',
        name: 'order_done',
        component:() => import('@/views/web/shop/order/Done'),
    },

//      견적요청
    {   path: '/shop/estimate/create',
        name: 'estimate_create',
        component:() => import('@/views/web/shop/estimate/Create'),
    },

//      전문관
    {   path: '/shop/outlet',
        name: 'outlet',
        component:() => import('@/views/web/shop/outlet/Cover'),
    }, {
        path: '/shop/outlet/:code',
        name: 'outlet_index',
        component:() => import('@/views/web/shop/outlet/Index'),
    },

//      당일출고
    {   path: '/shop/listing/:code',
        name: 'listing',
        component:() => import('@/views/web/shop/listing/Index'),
    },

//      고객센터
    {   path: '/cscenter',
        name: 'cscenter',
        component:() => import('@/views/web/cscenter/Index'),
    },

//      영문교정
    {   path: '/engReform/create',
        name: 'engReform_create',
        component:() => import('@/views/web/engReform/Create'),
    },
];
