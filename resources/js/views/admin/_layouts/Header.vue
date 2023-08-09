<template>

<header id="header">
    <div class="layout">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand :to="{name: 'adm_main'}" class="logo_link"><b-img :src="`${s3url}common/logo/admin.png`" /></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mr-auto">
                    <b-nav-item-dropdown text="Site관리">
                        <b-dropdown-item :to="{name: 'adm_site_info'}">정보설정</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_site_main_cate_goods'}">메인 카테고리별 추천 상품</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_site_main_best'}">메인 Best 상품</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="회원관리">
                        <b-dropdown-item @click="strongReload('/admin/user')">회원목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_user_email'}">회원메일발송</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="상품관리">
                        <b-dropdown-item @click="strongReload('/admin/shop/goods')">상품목록</b-dropdown-item>
                        <b-dropdown-item @click="strongReload('/admin/shop/goods', 'gd_type=REN')">렌탈목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_category'}">카테고리</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_maker'}">제조사</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_purchaseAt'}">직배송/항공운임</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="견적관리">
                        <b-dropdown-item @click="strongReload('/admin/shop/estimate')">견적목록</b-dropdown-item>
                        <b-dropdown-item @click="openWinPop(`/admin/shop/estimate/create`, 1700, 900)">임의견적</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_eng_reform_index'}">영문교정</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-nav-item @click="strongReload('/admin/shop/order')" active-class="active" exact>주문목록</b-nav-item>

                    <!-- <b-nav-item-dropdown text="주문관리">
                        <b-dropdown-item :to="{name: 'adm_order_index'}">주문목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_merck_index'}">Merck 발주</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                    <b-nav-item-dropdown text="통계">
                        <b-dropdown-item :to="{name: 'adm_stats_join'}">가입자</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-group header="주문 통계">
                            <b-dropdown-item :to="{name: 'adm_stats_order'}">매출</b-dropdown-item>
                        </b-dropdown-group>
                    </b-nav-item-dropdown>

                    <template v-if="user.id != 286">
                    <b-nav-item-dropdown v-if="user.user_mng.um_group == 'acc'" text="매출장부">
                        <b-dropdown-item :to="{name: 'adm_ledger'}">통합 장부</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_wait'}">매출 대기</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_soon'}">결제 예정분</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_pay_od'}">매출 내역</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_pay_tx'}">매출장</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item :to="{name: 'adm_ledger'}" v-else active-class="active" exact>영업장부</b-nav-item>
                    </template>
                    <b-nav-item-dropdown text="게시판">
                        <b-dropdown-group header="일반글">
                            <b-dropdown-item @click="strongReload('/admin/board/notice')">공지사항</b-dropdown-item>
                            <b-dropdown-item @click="strongReload('/admin/board/event')">이벤트</b-dropdown-item>
                            <b-dropdown-item @click="strongReload('/admin/board/review')">상품평</b-dropdown-item>
                        </b-dropdown-group>
                        
                        <b-dropdown-group header="질의답변">
                            <b-dropdown-item @click="strongReload('/admin/board/gd_inquiry')">상품문의</b-dropdown-item>
                            <b-dropdown-item @click="strongReload('/admin/board/inquiry')">1:1문의</b-dropdown-item>
                            <b-dropdown-item @click="strongReload('/admin/board/as')">A/S신청</b-dropdown-item>
                            <b-dropdown-item @click="strongReload('/admin/board/cancel')">취소/교환신청</b-dropdown-item>
                        </b-dropdown-group>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Merck 발주">
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_order'}">주문 목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_order_result'}">발주 내역</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_stock_result'}">재고 확인 결과</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_asn'}">ASN</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_invoice'}">e-Invoice</b-dropdown-item>
                    </b-nav-item-dropdown>                   
                </b-navbar-nav>


                <b-navbar-nav class="">
                    <b-button class="blink white sm" @click="isModalViewed = !isModalViewed, modalMode = 'reqOrder'"
                        v-if="reqOrder.length"
                    >
                        주문 ({{reqOrder.length}})</b-button>
                    <b-button class="blink gray sm" @click="isModalViewed = !isModalViewed, modalMode = 'reqEstimate'"
                        v-if="reqEstimate.length"
                    >
                        견적 ({{reqEstimate.length}})
                    </b-button>
                    <b-button class="blink teal sm" @click="isModalViewed = !isModalViewed, modalMode = 'reqVoucher'"
                        v-if="reqVoucher.length"
                    >
                        <b-icon-gift /> ({{reqVoucher.length}})
                    </b-button>
                    <b-button class="blink black sm" @click="isModalViewed = !isModalViewed, modalMode = 'reqAsk'"
                        v-if="reqAsk.as.length+reqAsk.cancel.length+reqAsk.gd_inquiry.length+reqAsk.inquiry.length" 
                    >
                        <b-icon-chat-square-text /> ({{reqAsk.as.length+reqAsk.cancel.length+reqAsk.gd_inquiry.length+reqAsk.inquiry.length}})
                    </b-button>                    
        
                    <b-link :to="{name:'main'}" target="_blank" class="go_shop logo_link">
                        <b-img :src="`${s3url}common/logo/admin_4s.png`" />
                    </b-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <req-voucher  v-if="modalMode == 'reqVoucher'" @close-modal="isModalViewed = false" :list="reqVoucher" />
            <req-ask      v-if="modalMode == 'reqAsk'" @close-modal="isModalViewed = false" :list="reqAsk" />
            <req-order    v-if="modalMode == 'reqOrder'" @close-modal="isModalViewed = false" :list="reqOrder" />
            <req-estimate v-if="modalMode == 'reqEstimate'" @close-modal="isModalViewed = false" :list="reqEstimate" />
        </modal>
    </transition>
</header>
</template>

<script>
import ax from '@/api/http';
import { mapActions, mapState, mapGetters } from 'vuex';


export default {
    name: 'Header',
    components: {
        'modal'     : () => import('@/views/_common/Modal'),
        'req-order'   : () => import('./_comp/ReqOrder'),
        'req-estimate'    : () => import('./_comp/ReqEstimate'),
        'req-voucher': () => import('./_comp/ReqVoucher'),
        'req-ask'    : () => import('./_comp/ReqAsk'),
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },
    data() {
        return {
            modalMode    :'',
            isModalViewed: false,
            reqOrder     : [],
            reqEstimate  : [],
            reqAsk       : {
                as:[],
                cancel:[],
                gd_inquiry:[],
                inquiry:[],
            },
            reqVoucher   : [],
        }
    },

    methods: {
        strongReload(url, param){
            url = `${url}?t=${Math.random()}`;
            if(!isEmpty(param)) url = `${url}&${param}`;
            window.location.href = url;
        },
    },


    async mounted(){
        let res = await ax.get(`api/admin/common`);
        if (res && res.status === 200) {
            this.reqOrder    = res.data.reqOrder;
            this.reqEstimate = res.data.reqEstimate;
            this.reqAsk      = res.data.reqAsk;
            this.reqVoucher  = res.data.reqVoucher;
        }
    }
}
</script>
<style lang="css" scoped>
#header { background:#4E647B; }
#header .layout nav { z-index:1021; padding:.5rem 0rem; }
#header .layout >>> nav .nav-link { color:#fff; padding:.5rem 15px; font-size:1.1rem; }
#header .layout nav .dropdown-header { background:#888; color:#fff; font-weight:900; }
#header .layout nav .go_shop { margin-left:15px; color:#fff; font-size:1.25rem; }
#header .layout nav .logo_link img { width:100px; }

.blink { margin:0 3px; animation: blink 2.5s linear infinite; }
@keyframes blink { 50% { opacity:.4; } }


@media (max-width: 1320px){
    #header .layout >>> nav .nav-link { color:#fff; padding:.5rem .8vw; font-size: calc(.25vw + .7rem); }

}
@media (max-width: 992px){
    #header .layout >>> nav .nav-link { font-size:.85rem;}
}
</style>
