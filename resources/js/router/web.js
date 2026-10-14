import store from '@/store/index';

import WebMain from '@/views/web/Main';

//  인증
import WebAuthLogin from '@/views/web/auth/Login';
import WebAuthJoinSyncChoice from '@/views/web/auth/JoinSyncChoice';
import WebAuthEmailVerify from '@/views/web/auth/EmailVerify';
import WebAuthIntro from '@/views/web/auth/Intro';
import WebAuthCreate from '@/views/web/auth/Create';
import WebAuthPasswordForgot from '@/views/web/auth/password/Forgot';
import WebAuthPasswordReset from '@/views/web/auth/password/Reset';

//  마이페이지
import WebMyLayout from '@/views/web/mypage/Layout';
import WebMySummary from '@/views/web/mypage/Summary';
import WebMyOrderIndex from '@/views/web/mypage/myShop/OrderIndex';
import WebMyOrderShow from '@/views/web/mypage/myShop/OrderShow';
import WebMyEstimateIndex from '@/views/web/mypage/myShop/EstimateIndex';
import WebMyEstimateShow from '@/views/web/mypage/myShop/EstimateShow';
import WebMyEstimateShowReply from '@/views/web/mypage/myShop/EstimateShowReply';
import WebMyBought from '@/views/web/mypage/myShop/Bought';
import WebMyWish from '@/views/web/mypage/myShop/Wish';
import WebMyBoardIndex from '@/views/web/mypage/myBoard/Index';
import WebMyBoardShow from '@/views/web/mypage/myBoard/Show';
import WebMyEngReformIndex from '@/views/web/mypage/myEngReform/Index';
import WebMyEngReformShow from '@/views/web/mypage/myEngReform/Show';
import WebMyMileageIndex from '@/views/web/mypage/mileage/Index';
import WebMyPrintIndex from '@/views/web/mypage/print/Index';
import WebMyUserCoupon from '@/views/web/mypage/myUser/Coupon';
import WebMyUserEdit from '@/views/web/mypage/myUser/Edit';
import WebMyUserAddr from '@/views/web/mypage/myUser/Addr';
import WebMyUserDestroy from '@/views/web/mypage/myUser/Destroy';

//  커뮤니티
import WebBoardIntro from '@/views/web/board/Intro';
import WebBoardLayout from '@/views/web/board/Layout';
import WebBoardIndex from '@/views/web/board/Index';
import WebBoardShow from '@/views/web/board/Show';
import WebBoardCreate from '@/views/web/board/Create';
import WebBoardEdit from '@/views/web/board/Edit';

//  상품
import WebGoodsIndex from '@/views/web/shop/goods/Index';
import WebGoodsShow from '@/views/web/shop/goods/Show';

//  주문
import WebOrderSettle from '@/views/web/shop/order/Settle';
import WebOrderPayReturn from '@/views/web/shop/order/payReturn';
import WebOrderDone from '@/views/web/shop/order/Done';
import WebOrderPayCardFail from '@/views/web/shop/order/PayCardFail';
import WebOrderSettlePsys from '@/views/web/shop/order/SettlePsys';
import WebAdultPopup from '@/views/web/_module/person_verification/ReqPopUp';

//  견적요청
import WebEstimateCreate from '@/views/web/shop/estimate/Create';
import WebEstimateCustomIndex from '@/views/web/shop/estimate/custom/Index';
import WebEstimateCustomCreate from '@/views/web/shop/estimate/custom/Create';

//  전문관, 브랜드샵, 당일출고, Sale
import WebOutletCover from '@/views/web/shop/outlet/Cover';
import WebOutletIndex from '@/views/web/shop/outlet/Index';
import WebMakerShopIndex from '@/views/web/shop/makerShop/Index';
import WebListingIndex from '@/views/web/shop/listing/Index';
import WebListingSale from '@/views/web/shop/listing/Sale';

//  고객센터, 영문교정, 렌탈, 장바구니
import WebCscenterIndex from '@/views/web/cscenter/Index';
import WebEngReformCreate from '@/views/web/engReform/Create';
import WebRentalIndex from '@/views/web/shop/rental/Index';
import WebCartIndex from '@/views/web/shop/cart/Index';

//  회사소개
import WebIntroduceLayout from '@/views/web/introduce/Layout';
import WebIntroduceCompany from '@/views/web/introduce/Company';
import WebIntroduceHistory from '@/views/web/introduce/History';
import WebIntroduceMap from '@/views/web/introduce/Map';
import WebIntroduceRule from '@/views/web/introduce/Rule';

//  어플리케이션
import WebApplicationLayout from '@/views/web/application/ApplicationLayout';
import WebApplicationIndex from '@/views/web/application/Index';
import WebApplicationList from '@/views/web/application/List';
import WebApplicationShow from '@/views/web/application/Show';

//  이벤트
import WebEventLayout from '@/views/web/event/Layout';
import WebEventRankingSales from '@/views/web/event/_comp/rankingSales';
import WebEventRankingBuyer from '@/views/web/event/_comp/rankingBuyer';
import WebEventAttend from '@/views/web/event/_comp/Attend';
import WebEventCoupon from '@/views/web/event/_comp/Coupon';

//  테스트

const isLoggedin = () => (to, from, next) => {
    if (store.state.auth.isLoggedin) 
        return next();
    else if ( store.state.auth.unAuth_user ) {
        return next('/email_verify');
    }
    next({name:'login', params: { route_name:to.name, params:to.params, query:to.query }});
    Notify.modal("로그인이 필요한 서비스입니다.", 'danger');
};

const isNotLoggedin = () => (to, from, next) => {
    if (!store.state.auth.isLoggedin)
        return next();
    next('/');
};

export default [
    {   path: '/',
        name: 'main',
        component: WebMain,
    },
//      인증
    {   path: '/login',
        name: 'login',
        component: WebAuthLogin,
        beforeEnter: (to, from, next) => {
            if (!store.state.auth.isLoggedin) return next();
            else next('/mypage/summary');
        }
    }, {   
        path: '/auth/join_sync_choice',
        name: 'auth_join_sync_choice',
        component: WebAuthJoinSyncChoice,
        beforeEnter: isNotLoggedin(),
    }, {   
        path: '/email_verify',
        name: 'email_verify',
        component: WebAuthEmailVerify,
        beforeEnter: (to, from, next) => {
            if (isEmpty(store.state.auth.isLoggedin)) return next();
            else next('/');
        }
    }, {
        path: '/auth',
        name: 'auth_intro',
        component: WebAuthIntro,
        beforeEnter: isNotLoggedin()
    }, {
        path: '/auth/create/:code',
        name: 'auth_create',
        component: WebAuthCreate,
        beforeEnter: isNotLoggedin()
    }, {
        path: '/auth/password/forgot',
        name: 'auth_password_forgot',
        component: WebAuthPasswordForgot,
        beforeEnter: isNotLoggedin()
    }, {
        path: '/auth/password/reset/:token',
        name: 'auth_password_reset',
        component: WebAuthPasswordReset,
        beforeEnter: isNotLoggedin()
    },
//      마이페이지
    {   path: '/mypage',
        component: WebMyLayout,
        children: [
            {   path: "summary",
                name: 'mypage',
                component: WebMySummary,
            }, {
                path: "order",
                name: 'my_order',
                component: WebMyOrderIndex,
            }, {
                path: "order/:od_id",
                name: 'my_order_show',
                component: WebMyOrderShow,
            }, {
                path: "estimate",
                name: 'my_estimate',
                component: WebMyEstimateIndex,
            }, {
                path: "estimate/:eq_id",
                name: 'my_estimate_show',
                component: WebMyEstimateShow,
            }, {
                path: "estimate/reply/:er_id",
                name: 'my_estimate_show_reply',
                component: WebMyEstimateShowReply,
            }, {
                path: "bought",
                name: 'my_bought',
                component: WebMyBought,
            }, {
                path: "wish",
                name: 'my_wish',
                component: WebMyWish,
            },

            {
                path: 'board/:bo_cd',
                name: 'my_bo_index',
                component: WebMyBoardIndex,
            }, {
                path: 'board/:bo_cd/show/:bo_id',
                name: 'my_bo_show',
                component: WebMyBoardShow,
            }, {
                path: 'eng_reform',
                name: 'my_eng_reform_index',
                component: WebMyEngReformIndex,
            }, {
                path: 'eng_reform/:er_id',
                name: 'my_eng_reform_show',
                component: WebMyEngReformShow,
            },

            {
                path: 'mileage',
                name: 'my_mileage',
                component: WebMyMileageIndex,
            },

            {
                path: 'print',
                name: 'my_print',
                component: WebMyPrintIndex,
            },            

            {
                path: 'user/coupon',
                name: 'my_user_coupon',
                component: WebMyUserCoupon,
            }, {
                path: 'user/edit',
                name: 'my_user_edit',
                component: WebMyUserEdit,
            }, {
                path: 'user/addr',
                name: 'my_user_addr',
                component: WebMyUserAddr,
            }, {
                path: 'user/destroy',
                name: 'my_user_destroy',
                component: WebMyUserDestroy,
            },
        ],
        beforeEnter: isLoggedin(),
    },

//      커뮤니티
    {   path: '/board',
        name: 'bo_intro',
        component: WebBoardIntro,
    }, {   
        path: '/board',
        component: WebBoardLayout,
        children: [
            {   path: ":bo_cd",
                name: 'bo_index',
                component: WebBoardIndex,
            }, {   
                path: ':bo_cd/show/:bo_id',
                name: 'bo_show',
                component: WebBoardShow,
            }, {
                path: ':bo_cd/create',
                name: 'bo_create',
                component: WebBoardCreate,
                beforeEnter: isLoggedin(),
            }, {
                path: ':bo_cd/edit/:bo_id',
                name: 'bo_edit',
                component: WebBoardEdit,
                beforeEnter: isLoggedin(),
            },
        ],
    },   

//      상품
    {   path: '/shop/goods',
        name: 'goods_index',
        component: WebGoodsIndex,
    },{
        path: '/shop/goods/:gd_id',
        name: 'goods_show',
        component: WebGoodsShow,
    },

//      주문
    {   path: '/shop/order/settle',
        name: 'order_settle',
        component: WebOrderSettle,
        beforeEnter: isLoggedin(),
    }, {
        path: '/shop/order/payReturn',
        name: 'order_pay_return',
        component: WebOrderPayReturn,
    }, {
        path: '/shop/order/done/:od_id',
        name: 'order_done',
        component: WebOrderDone,
    }, {
        path: '/shop/order/payCardFail',
        name: 'order_pay_card_fail',
        component: WebOrderPayCardFail,
        beforeEnter: isLoggedin(),
    }, {    //      Psys 결제 팝업
        path: '/shop/order/settle_psys/:od_id',
        name: 'order_settle_psys',
        component: WebOrderSettlePsys,
        beforeEnter: isLoggedin(),
    }, {    //      성인 인증 팝업
        path: '/shop/order/adult_popup',
        name: 'shop_order_adult_popup',
        component: WebAdultPopup,
        beforeEnter: isLoggedin(),
    },

//      견적요청
    {   path: '/shop/estimate/create',
        name: 'estimate_create',
        component: WebEstimateCreate,
        beforeEnter: isLoggedin(),
    }, {   //   주문 제작
        path: '/shop/estimate/custom',
        name: 'estimate_custom_index',
        component: WebEstimateCustomIndex,
        beforeEnter: isLoggedin(),
    }, {   //   주문 제작
        path: '/shop/estimate/custom/:id',
        name: 'estimate_custom_create',
        component: WebEstimateCustomCreate,
        beforeEnter: isLoggedin(),
    },

//      전문관
    {   path: '/shop/outlet',
        name: 'outlet',
        component: WebOutletCover,
    }, {
        path: '/shop/outlet/:type/:group',
        name: 'outlet_index',
        component: WebOutletIndex,
    },

//      브랜드샾
    {
        path: '/shop/makerShop/:mk_id',
        name: 'makerShop_index',
        component: WebMakerShopIndex,
    }, 

//      당일출고
    {   path: '/shop/listing/:code/:group',
        name: 'listing',
        component: WebListingIndex,
    },
//      Sale
    {   path: '/shop/listing/sale',
        name: 'listing_sale',
        component: WebListingSale,
    },    

//      고객센터
    {   path: '/cscenter',
        name: 'cscenter',
        component: WebCscenterIndex,
        beforeEnter: isLoggedin(),
    },

//      영문교정
    {   path: '/engReform/create',
        name: 'engReform_create',
        component: WebEngReformCreate,
        beforeEnter: isLoggedin(),
    },

//      렌탈
    {   path: '/shop/rental',
        name: 'rental',
        component: WebRentalIndex,
    },

//      장바구니
    {   path: '/shop/cart',
        name: 'cart_index',
        component: WebCartIndex,
        beforeEnter: isLoggedin(),
    },
//      회사소개
    {   path: '/introduce',
        component: WebIntroduceLayout,
        children: [
            {   path: "company",
                name: 'introduce_company',
                component: WebIntroduceCompany,
            }, {   
                path: 'history',
                name: 'introduce_history',
                component: WebIntroduceHistory,
            }, {   
                path: 'map',
                name: 'introduce_map',
                component: WebIntroduceMap,
            }, {   
                path: 'rule',
                name: 'introduce_rule',
                component: WebIntroduceRule,
            },
        ],
    },
//      어플리케이션
    {
        path: '/application',
        component: WebApplicationLayout,
        children: [
            {   path: '',
                name: 'application',
                component: WebApplicationIndex,
            }, {
                path: ':part',
                name: 'application_part',
                component: WebApplicationList,
            }, {
                path: ':part/:bundle',
                name: 'application_part_bundle',
                component: WebApplicationShow,
            },
        ]
    },
    
//      이벤트 페이지
    {   path: '/mypage',
        component: WebEventLayout,
        children: [
            {   path: '/event/rankingSales',
                name: 'event_rankingSales',
                component: WebEventRankingSales,
            }, {   
                path: '/event/rankingBuyer',
                name: 'event_rankingBuyer',
                component: WebEventRankingBuyer,
            }, {   
                path: '/event/attend',
                name: 'event_attend',
                component: WebEventAttend,
            }, {   
                path: '/event/coupon',
                name: 'event_coupon',
                component: WebEventCoupon,
            },
        ],
    },
];