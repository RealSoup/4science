import AdmRouterView from '@/views/admin/AdmRouterView';
import AdmMain from '@/views/admin/Main';

import AdmSiteInfo from '@/views/admin/site/Info';
import AdmSiteMainCateGoods from '@/views/admin/site/MainCateGoods';
import AdmSiteMainBest from '@/views/admin/site/MainBest';
import AdmSiteBannerGoods from '@/views/admin/site/BannerGoods';
import AdmSiteSynonym from '@/views/admin/site/SynonymManager';

import AdmUserIndex from '@/views/admin/user/Index';
import AdmUserEdit from '@/views/admin/user/Edit';
import AdmUserEmailIndex from '@/views/admin/user/EmailIndex';
import AdmUserEmailCreat from '@/views/admin/user/EmailCreat';
import AdmUserEmailEdit from '@/views/admin/user/EmailEdit';
import AdmUserEmailSend from '@/views/admin/user/EmailSend';

import AdmGoodsIndex from '@/views/admin/shop/goods/Index';
import AdmGoodsEdit from '@/views/admin/shop/goods/Edit';
import AdmGoodsCreate from '@/views/admin/shop/goods/Create';
import AdmCategoryIndex from '@/views/admin/shop/category/Index';
import AdmMakerIndex from '@/views/admin/shop/maker/Index';
import AdmMakerEdit from '@/views/admin/shop/maker/Edit';
import AdmPurchaseAtIndex from '@/views/admin/shop/purchaseAt/Index';

import AdmOrderIndex from '@/views/admin/shop/order/Index';
import AdmOrderEdit from '@/views/admin/shop/order/Edit';

import AdmEstimateIndex from '@/views/admin/shop/estimate/Index';
import AdmEstimateCreate from '@/views/admin/shop/estimate/Create';
import AdmEstimateEdit from '@/views/admin/shop/estimate/Edit';
import AdmEstimateShowReq from '@/views/admin/shop/estimate/ShowReq';
import AdmEstimateShowReply from '@/views/admin/shop/estimate/ShowReply';
import AdmEngReformIndex from '@/views/admin/engReform/Index';
import AdmEngReformEdit from '@/views/admin/engReform/Edit';

import AdmBoardIndex from '@/views/admin/board/Index';
import AdmBoardShow from '@/views/admin/board/Show';
import AdmBoardCreate from '@/views/admin/board/Create';
import AdmBoardEdit from '@/views/admin/board/Edit';
import AdmBoardAnswer from '@/views/admin/board/Answer';

import AdmStatsBehaviorIndex from '@/views/admin/stats/behavior/Index';
import AdmStatsIndex from '@/views/admin/stats/Index';

import AdmLedgerIndex from '@/views/admin/ledger/Index';
import AdmLedgerAcctWait from '@/views/admin/ledger/AcctWait';
import AdmLedgerAcctSoon from '@/views/admin/ledger/AcctSoon';
import AdmLedgerAcctPayOd from '@/views/admin/ledger/AcctPayOd';
import AdmLedgerAcctPayTx from '@/views/admin/ledger/AcctPayTx';

import AdmB2bMerckOrder from '@/views/admin/shop/b2b_merck/Order';
import AdmB2bMerckOrderResult from '@/views/admin/shop/b2b_merck/OrderResult';
import AdmB2bMerckStockResult from '@/views/admin/shop/b2b_merck/StockResult';
import AdmB2bMerckInvoice from '@/views/admin/shop/b2b_merck/Invoice';
import AdmB2bMerckAsn from '@/views/admin/shop/b2b_merck/Asn';

export default [
    {   path: '/admin',
        component: AdmRouterView,
        children: [
            {   path: '',
                name: 'adm_main',
                component: AdmMain,
            },

            //  Site관리
            {   path: 'site/info',
                name: 'adm_site_info',
                component: AdmSiteInfo,
            }, {
                path: 'site/mainCateGoods',
                name: 'adm_site_main_cate_goods',
                component: AdmSiteMainCateGoods,
            }, {
                path: 'site/mainBest',
                name: 'adm_site_main_best',
                component: AdmSiteMainBest,
            }, {
                path: 'site/bannerGoods',
                name: 'adm_site_banner_goods',
                component: AdmSiteBannerGoods,
            }, {
                path: 'site/synonym',
                name: 'adm_site_synonym',
                component: AdmSiteSynonym,
            },

            //  유저
            {   path: 'user',
                name: 'adm_user',
                component: AdmUserIndex,
            }, {
                path: 'user/:id/edit',
                name: 'adm_user_edit',
                component: AdmUserEdit,
            }, {
                path: 'user/email',
                name: 'adm_user_email',
                component: AdmUserEmailIndex,
            }, {
                path: 'user/email/creat',
                name: 'adm_user_email_creat',
                component: AdmUserEmailCreat,
            }, {
                path: 'user/email/:id/edit',
                name: 'adm_user_email_edit',
                component: AdmUserEmailEdit,
            },  {
                path: 'user/email/:id/send',
                name: 'adm_user_email_send',
                component: AdmUserEmailSend,
            }, 
            
            
            //   상품
            {   path: 'shop/goods',
                name: 'adm_goods_index',
                component: AdmGoodsIndex,
            }, {
                path: 'shop/goods/:gd_id/edit',
                name: 'adm_goods_edit',
                component: AdmGoodsEdit,
            }, {
                path: 'shop/goods/create/:gd_type?',
                name: 'adm_goods_create',
                component: AdmGoodsCreate,
            }, {
                path: 'shop/category',
                name: 'adm_category',
                component: AdmCategoryIndex,
            }, {
                path: 'shop/maker',
                name: 'adm_maker',
                component: AdmMakerIndex,
            }, {
                path: 'shop/maker/:mk_id/edit',
                name: 'adm_maker_edit',
                component: AdmMakerEdit,
            }, {
                path: 'shop/purchaseAt',
                name: 'adm_purchaseAt',
                component: AdmPurchaseAtIndex,
            },

            //   주문
            {   path: 'shop/order',
                name: 'adm_order_index',
                component: AdmOrderIndex,
            }, {
                path: 'shop/order/:od_id',
                name: 'adm_order_edit',
                component: AdmOrderEdit,
            },
           
            //   견적
            {   path: 'shop/estimate',
                name: 'adm_estimate_index',
                component: AdmEstimateIndex,
            }, {
                path: 'shop/estimate/create',
                name: 'adm_estimate_create',
                component: AdmEstimateCreate,
            }, {
                path: 'shop/estimate/:er_id/edit',
                name: 'adm_estimate_edit',
                component: AdmEstimateEdit,
            }, {
                path: 'shop/estimate/req/:eq_id',
                name: 'adm_estimate_show_req',
                component: AdmEstimateShowReq,
            }, {
                path: 'shop/estimate/reply/:er_id',
                name: 'adm_estimate_show_reply',
                component: AdmEstimateShowReply,
            }, {
                path: 'eng_reform',
                name: 'adm_eng_reform_index',
                component: AdmEngReformIndex,
            }, {
                path: 'eng_reform/:er_id/edit',
                name: 'adm_eng_reform_edit',
                component: AdmEngReformEdit,
            },

            //  게시판
            {   path: 'board/:bo_cd',
                name: 'adm_board_index',
                component: AdmBoardIndex,
            }, {   
                path: 'board/:bo_cd/show/:bo_id',
                name: 'adm_board_show',
                component: AdmBoardShow,
            }, {   
                path: 'board/:bo_cd/create',
                name: 'adm_board_create',
                component: AdmBoardCreate,
            }, {   
                path: 'board/:bo_cd/edit/:bo_id',
                name: 'adm_board_edit',
                component: AdmBoardEdit,
            }, {   
                path: 'board/:bo_cd/answer/:bo_id',
                name: 'adm_board_answer',
                component: AdmBoardAnswer,
            },
            

            //  통계
            {   path: 'stats/behavior',
                name: 'adm_stats_behavio',
                component: AdmStatsBehaviorIndex,
            }, {   
                path: 'stats/:stats_type',
                name: 'adm_stats',
                component: AdmStatsIndex,
            },

            //  영업장부
            {   path: 'ledger',
                name: 'adm_ledger',
                component: AdmLedgerIndex,
            }, {    
                path: 'ledger_acct_wait',
                name: 'adm_ledger_acct_wait',
                component: AdmLedgerAcctWait,
            }, {    
                path: 'ledger_acct_soon',
                name: 'adm_ledger_acct_soon',
                component: AdmLedgerAcctSoon,
            }, {    
                path: 'ledger_acct_pay_od',
                name: 'adm_ledger_acct_pay_od',
                component: AdmLedgerAcctPayOd,
            }, {    
                path: 'ledger_acct_pay_tx',
                name: 'adm_ledger_acct_pay_tx',
                component: AdmLedgerAcctPayTx,
            },
            
             //  Merck 발주
            {   path: 'shop/b2b_merck/order',
                name: 'adm_b2b_merck_order',
                component: AdmB2bMerckOrder,
            }, { 
                path: 'shop/b2b_merck/order_result',
                name: 'adm_b2b_merck_order_result',
                component: AdmB2bMerckOrderResult,
            }, { 
                path: 'shop/b2b_merck/stock_result',
                name: 'adm_b2b_merck_stock_result',
                component: AdmB2bMerckStockResult,
            },  { 
                path: 'shop/b2b_merck/invoiceIndex',
                name: 'adm_b2b_merck_invoice',
                component: AdmB2bMerckInvoice,
            },  { 
                path: 'shop/b2b_merck/asnIndex',
                name: 'adm_b2b_merck_asn',
                component: AdmB2bMerckAsn,
            },
        ],
    },
]