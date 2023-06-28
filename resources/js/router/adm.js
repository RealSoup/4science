import store from '@/store/index';
const isAdmin = () => (to, from, next) => {
    if (store.state.auth.isLoggedin) {
        if (store.state.auth.user.is_admin) {
            return next();
        }
        Notify.modal("관리자만 접근 할 수 있습니다.");
        next('/');
    } else {
        next({name:'login', query:{redirect:to.path}});
        Notify.modal('로그인이 필요한 서비스입니다.', 'danger');
    }
};

export default [
    {   path: '/admin',
        component:() => import('@/views/admin/Common'),
        beforeEnter: isAdmin(),
        children: [
            {   path: '',
                name: 'adm_main',
                component:() => import('@/views/admin/Main'),
            },

            //  Site관리
            {   path: 'site/info',
                name: 'adm_site_info',
                component:() => import('@/views/admin/site/Info'),
            }, {
                path: 'site/mainCateGoods',
                name: 'adm_site_main_cate_goods',
                component:() => import('@/views/admin/site/MainCateGoods'),
            },

            //  유저
            {   path: 'user',
                name: 'adm_user',
                component:() => import('@/views/admin/user/Index'),
            }, {
                path: 'user/:id/edit',
                name: 'adm_user_edit',
                component:() => import('@/views/admin/user/Edit'),
            }, 
            
            
            //   상품
            {   path: 'shop/goods',
                name: 'adm_goods_index',
                component:() => import('@/views/admin/shop/goods/Index'),
            }, {
                path: 'shop/goods/:gd_id/edit',
                name: 'adm_goods_edit',
                component:() => import('@/views/admin/shop/goods/Edit'),
            }, {
                path: 'shop/goods/create',
                name: 'adm_goods_create',
                component:() => import('@/views/admin/shop/goods/Create'),
            }, {
                path: 'shop/category',
                name: 'adm_category',
                component:() => import('@/views/admin/shop/category/Index'),
            }, {
                path: 'shop/maker',
                name: 'adm_maker',
                component:() => import('@/views/admin/shop/maker/Index'),
            }, {
                path: 'shop/purchaseAt',
                name: 'adm_purchaseAt',
                component:() => import('@/views/admin/shop/purchaseAt/Index'),
            },

            //   주문
            {   path: 'shop/order',
                name: 'adm_order_index',
                component:() => import('@/views/admin/shop/order/Index'),
            }, {
                path: 'shop/order/:od_id',
                name: 'adm_order_edit',
                component:() => import('@/views/admin/shop/order/Edit'),
            },
           
            //   견적
            {   path: 'shop/estimate',
                name: 'adm_estimate_index',
                component:() => import('@/views/admin/shop/estimate/Index'),
            }, {
                path: 'shop/estimate/create',
                name: 'adm_estimate_create',
                component:() => import('@/views/admin/shop/estimate/Create'),
            }, {
                path: 'shop/estimate/:er_id/edit',
                name: 'adm_estimate_edit',
                component:() => import('@/views/admin/shop/estimate/Edit'),
            }, {
                path: 'shop/estimate/req/:eq_id',
                name: 'adm_estimate_show_req',
                component:() => import('@/views/admin/shop/estimate/ShowReq'),
            }, {
                path: 'shop/estimate/reply/:er_id',
                name: 'adm_estimate_show_reply',
                component:() => import('@/views/admin/shop/estimate/ShowReply'),
            }, {
                path: 'eng_reform',
                name: 'adm_eng_reform_index',
                component:() => import('@/views/admin/engReform/Index'),
            }, {
                path: 'eng_reform/:er_id/edit',
                name: 'adm_eng_reform_edit',
                component:() => import('@/views/admin/engReform/Edit'),
            },

            //  게시판
            {   path: 'board/:bo_cd',
                name: 'adm_board_index',
                component:() => import('@/views/admin/board/Index'),
            }, {   
                path: 'board/:bo_cd/show/:bo_id',
                name: 'adm_board_show',
                component:() => import('@/views/admin/board/Show'),
            }, {   
                path: 'board/:bo_cd/create',
                name: 'adm_board_create',
                component:() => import('@/views/admin/board/Create'),
            }, {   
                path: 'board/:bo_cd/edit/:bo_id',
                name: 'adm_board_edit',
                component:() => import('@/views/admin/board/Edit'),
            }, {   
                path: 'board/:bo_cd/answer/:bo_id',
                name: 'adm_board_answer',
                component:() => import('@/views/admin/board/Answer'),
            },
            

            //  통계
            {   path: 'stats/join',
                name: 'adm_stats_join',
                component:() => import('@/views/admin/stats/IndexJoin'),
            }, {
                path: 'stats/order',
                name: 'adm_stats_order',
                component:() => import('@/views/admin/stats/IndexOrder'),
            },

            //  영업장부
            {   path: 'ledger',
                name: 'adm_ledger',
                component:() => import('@/views/admin/ledger/Index'),
            }, {    
                path: 'ledger_acct_wait',
                name: 'adm_ledger_acct_wait',
                component:() => import('@/views/admin/ledger/AcctWait'),
            }, {    
                path: 'ledger_acct_soon',
                name: 'adm_ledger_acct_soon',
                component:() => import('@/views/admin/ledger/AcctSoon'),
            }, {    
                path: 'ledger_acct_pay_od',
                name: 'adm_ledger_acct_pay_od',
                component:() => import('@/views/admin/ledger/AcctPayOd'),
            }, {    
                path: 'ledger_acct_pay_tx',
                name: 'adm_ledger_acct_pay_tx',
                component:() => import('@/views/admin/ledger/AcctPayTx'),
            },
            
             //  Merck 발주
            {   path: 'shop/b2b_merck/order',
                name: 'adm_b2b_merck_order',
                component:() => import('@/views/admin/shop/b2b_merck/Order'),
            }, { 
                path: 'shop/b2b_merck/order_result',
                name: 'adm_b2b_merck_order_result',
                component:() => import('@/views/admin/shop/b2b_merck/OrderResult'),
            }, { 
                path: 'shop/b2b_merck/stock_result',
                name: 'adm_b2b_merck_stock_result',
                component:() => import('@/views/admin/shop/b2b_merck/StockResult'),
            }, 
            
        ],
    },
]