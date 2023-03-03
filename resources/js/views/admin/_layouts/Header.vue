<template>

<header id="header">
    <div class="layout">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand :to="{name: 'adm_main'}">
                <b-img :src="`${s3url}common/logo/admin_logo.png`" />
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mr-auto">
                    <b-nav-item-dropdown text="Site관리">
                        <b-dropdown-item :to="{name: 'adm_site_info'}">정보설정</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_site_main_cate_goods'}">메인 카테고리별 추천 상품</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-nav-item :to="{name: 'adm_user'}" active-class="active" exact>회원관리</b-nav-item>

                    <b-nav-item-dropdown text="상품관리">
                        <b-dropdown-item :to="{name: 'adm_goods_index'}">상품목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_category'}">카테고리</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_maker'}">제조사</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_purchaseAt'}">직배송/항공운임</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="견적관리">
                        <b-dropdown-item :to="{name: 'adm_estimate_index'}">견적목록</b-dropdown-item>
                        <b-dropdown-item @click="openWinPop(`/admin/shop/estimate/create`, 1700, 900)">임의견적</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_eng_reform_index'}">영문교정</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    <b-nav-item :to="{name: 'adm_order_index'}" active-class="active" exact>주문목록</b-nav-item>

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

                    <b-nav-item-dropdown v-if="user.user_mng.um_group == 'acc'" text="매출장부">
                        <b-dropdown-item :to="{name: 'adm_ledger'}">통합 장부</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_wait'}">매출 대기</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_soon'}">결제 예정분</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_pay_od'}">매출 내역</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_ledger_acct_pay_tx'}">매출장</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item :to="{name: 'adm_ledger'}" v-else active-class="active" exact>영업장부</b-nav-item>

                    <b-nav-item-dropdown text="게시판">
                        <b-dropdown-group header="일반글">
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'notice' }}">공지사항</b-dropdown-item>
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'event' }}">이벤트</b-dropdown-item>
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'review' }}">상품평</b-dropdown-item>
                        </b-dropdown-group>
                        
                        <b-dropdown-group header="질의답변">
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'gd_inquiry' }}">상품문의</b-dropdown-item>
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'inquiry' }}">1:1문의</b-dropdown-item>
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'as' }}">A/S신청</b-dropdown-item>
                            <b-dropdown-item :to="{name: 'adm_board_index', params: { bo_cd:'cancel' }}">취소/교환신청</b-dropdown-item>
                        </b-dropdown-group>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Merck 발주">
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_order'}">주문 목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_order_result'}">발주 내역</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_b2b_merck_stock_result'}">재고 확인 결과</b-dropdown-item>
                    </b-nav-item-dropdown>                   
                </b-navbar-nav>


                <b-navbar-nav class="">
                    <b-button variant="light" size="sm" class="blink"
                        v-if="reqVoucher.length" 
                        @click="isModalViewed = !isModalViewed, modalMode = 'reqVoucher'"
                        v-b-tooltip.leftbottom.hover title="상품권 신청"
                    >
                        <b-icon-gift /> ({{reqVoucher.length}})
                    </b-button>
                    <b-button variant="light" size="sm" class="blink"
                        v-if="reqAsk.as.length+reqAsk.cancel.length+reqAsk.gd_inquiry.length+reqAsk.inquiry.length"
                        @click="isModalViewed = !isModalViewed, modalMode = 'reqAsk'"
                        v-b-tooltip.rightbottom.hover title="답변 요청"
                    >
                        <b-icon-chat-square-text /> ({{reqAsk.as.length+reqAsk.cancel.length+reqAsk.gd_inquiry.length+reqAsk.inquiry.length}})
                    </b-button>                    
        
                    <b-link :to="{name:'main'}" target="_blank" v-b-tooltip.leftbottom.hover title="SHOP으로 이동" class="go_shop">
                        <b-img :src="`${s3url}common/logo/estimate_logo.png`" />
                    </b-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <reqVoucher v-if="modalMode == 'reqVoucher'" @close-modal="isModalViewed = false" :list="reqVoucher" />
            <reqAsk v-if="modalMode == 'reqAsk'" @close-modal="isModalViewed = false" :list="reqAsk" />
        </Modal>
    </transition>
</header>
</template>

<script>
import ax from '@/api/http';
import { mapActions, mapState, mapGetters } from 'vuex';


export default {
    name: 'Header',
    components: {
        'Modal'     : () => import('@/views/_common/Modal'),
        'reqVoucher': () => import('./_comp/ReqVoucher'),
        'reqAsk'    : () => import('./_comp/ReqAsk'),
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },
    data() {
        return {
            modalMode:'',
            isModalViewed: false,
            reqVoucher: [],
            reqAsk: {
                as:[],
                cancel:[],
                gd_inquiry:[],
                inquiry:[],
            },
        }
    },

    async mounted(){
        //  ml_key=0 => 상품권 요청
        let res = await ax.get(`api/admin/mileage/requesterVoucher`, { params: {ml_tbl:'voucher', ml_key:0}});
        if (res && res.status === 200) this.reqVoucher = res.data;
        
        res = await ax.get(`api/admin/board/requestAsk`, { params: {type:'cnt'}});
        if (res && res.status === 200) this.reqAsk = res.data;
    }
}
</script>
<style lang="css" scoped>
#header { background:#4E647B; }
#header .layout nav { z-index:1021; }
#header .layout >>> nav .nav-link { color:#fff; }
#header .layout nav .dropdown-header { background:#888; color:#fff; font-weight:900; }
#header .layout nav .go_shop { margin-left:30px; }

@media (min-width: 992px) {
#header .layout >>> .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 1.4rem;
    padding-left: 1.4rem;
}
}




.blink { margin:0 3px; background:#fff; animation: blink 2.5s linear infinite; }
@keyframes blink { 50% { opacity: 0; } }

</style>
