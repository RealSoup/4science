import store from '@/store/index';
const isAdmin = () => (to, from, next) => {
    if (store.state.auth.isLoggedin) {
        if (store.state.auth.user.is_admin) {
            return next();
        }
        Notify.modal("관리자만 접근 할 수 있습니다.");
        next('/');
    }
    // next('/login');
    next({name:'login', query:{redirect:to.path}});
};

export default [
    {
        path: '/admin/',
        name: 'adm_main',
        component:() => import('@/views/admin/Main.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/config',
        name: 'adm_config',
        component:() => import('@/views/admin/config/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/user',
        name: 'adm_user',
        component:() => import('@/views/admin/user/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/user/:id/edit',
        name: 'adm_user_edit',
        component:() => import('@/views/admin/user/Edit.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/category',
        name: 'adm_category',
        component:() => import('@/views/admin/shop/category/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/maker',
        name: 'adm_maker',
        component:() => import('@/views/admin/shop/maker/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/purchaseAt',
        name: 'adm_purchaseAt',
        component:() => import('@/views/admin/shop/purchaseAt/Index.vue'),
        beforeEnter: isAdmin()
    },
    //   상품
    {
        path: '/admin/shop/goods',
        name: 'adm_goods_index',
        component:() => import('@/views/admin/shop/goods/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/goods/:gd_id/edit',
        name: 'adm_goods_edit',
        component:() => import('@/views/admin/shop/goods/Edit.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/goods/create',
        name: 'adm_goods_create',
        component:() => import('@/views/admin/shop/goods/Create.vue'),
        beforeEnter: isAdmin()
    },
    //   주문
    {
        path: '/admin/shop/order',
        name: 'adm_order_index',
        component:() => import('@/views/admin/shop/order/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/order/:od_id',
        name: 'adm_order_edit',
        component:() => import('@/views/admin/shop/order/Edit.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/order',
        name: 'adm_merck_index',
        component:() => import('@/views/admin/shop/order/Index.vue'),
        beforeEnter: isAdmin()
    },
    //   견적
    {
        path: '/admin/shop/estimate',
        name: 'adm_estimate_index',
        component:() => import('@/views/admin/shop/estimate/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/estimate/create',
        name: 'adm_estimate_create',
        component:() => import('@/views/admin/shop/estimate/Create.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/estimate/:er_id/edit',
        name: 'adm_estimate_edit',
        component:() => import('@/views/admin/shop/estimate/Edit.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/estimate/req/:eq_id',
        name: 'adm_estimate_show_req',
        component:() => import('@/views/admin/shop/estimate/ShowReq.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/shop/estimate/reply/:er_id',
        name: 'adm_estimate_show_reply',
        component:() => import('@/views/admin/shop/estimate/ShowReply.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/eng_reform',
        name: 'adm_eng_reform_index',
        component:() => import('@/views/admin/engReform/Index.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/eng_reform/:er_id/edit',
        name: 'adm_eng_reform_edit',
        component:() => import('@/views/admin/engReform/Edit.vue'),
        beforeEnter: isAdmin()
    },

    //  통계
    {
        path: '/admin/stats/join',
        name: 'adm_stats_join',
        component:() => import('@/views/admin/stats/IndexJoin.vue'),
        beforeEnter: isAdmin()
    }, {
        path: '/admin/stats/order',
        name: 'adm_stats_order',
        component:() => import('@/views/admin/stats/IndexOrder.vue'),
        beforeEnter: isAdmin()
    },

    //  영업장부
    {
        path: '/admin/ledger',
        name: 'adm_ledger',
        component:() => import('@/views/admin/ledger/Index.vue'),
        beforeEnter: isAdmin()
    },
    
]
