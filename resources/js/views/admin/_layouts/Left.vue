<template>

<aside>
    <header>
        <b-link :to="{name: 'adm_main'}">
            <i><b-img :src="`${s3url}common/logo/admin.png`" /></i>
        </b-link>
    </header>

    <section :class="{focus:$route.name.startsWith('adm_site_')}">
        <p @click="$event.currentTarget.classList.toggle('active')"><i>Site관리</i></p>
        <b-link :to="{name: 'adm_site_info'}"><i>정보설정</i></b-link>
        <b-link :to="{name: 'adm_site_main_cate_goods'}"><i>메인 카테고리별 추천 상품</i></b-link>
        <b-link :to="{name: 'adm_site_main_best'}"><i>메인 Best 상품</i></b-link>
    </section>

    <section :class="{focus:$route.name.startsWith('adm_user_')}">
        <p @click="$event.currentTarget.classList.toggle('active')"><i>회원관리</i></p>
        <b-link @click="strongReload('/admin/user')"><i>회원목록</i></b-link>
        <b-link :to="{name: 'adm_user_email'}"><i>회원메일발송</i></b-link>
    </section>

    <section :class="{focus:$route.name.startsWith('adm_shop_')}">
        <p @click="$event.currentTarget.classList.toggle('active')"><i>상품관리</i></p>
        <b-link @click="strongReload('/admin/shop/goods')"><i>상품목록</i></b-link>
        <b-link @click="strongReload('/admin/shop/goods', 'gd_type=REN')"><i>렌탈목록</i></b-link>
        <b-link :to="{name: 'adm_category'}"><i>카테고리</i></b-link>
        <b-link :to="{name: 'adm_maker'}"><i>제조사</i></b-link>
        <b-link :to="{name: 'adm_purchaseAt'}"><i>직배송/항공운임</i></b-link>
    </section>

    <section :class="{focus:$route.name.startsWith('adm_estimate_') || $route.name.startsWith('adm_eng_reform')}">
        <p @click="$event.currentTarget.classList.toggle('active')"><i>견적관리</i></p>
        <b-link @click="strongReload('/admin/shop/estimate')"><i>견적목록</i></b-link>
        <b-link @click="openWinPop(`/admin/shop/estimate/create`, 1700, 900)"><i>임의견적</i></b-link>
        <b-link :to="{name: 'adm_eng_reform_index'}"><i>영문교정</i></b-link>
    </section>

    <section :class="{focus:$route.name.startsWith('adm_shop')}">
        <p @click="strongReload('/admin/shop/order')" class="solo"><i>주문목록</i></p>
    </section>

    <section :class="{focus:$route.name.startsWith('adm_stats')}">
        <p @click="$event.currentTarget.classList.toggle('active')"><i>통계</i></p>
        <b-link :to="{name: 'adm_stats_join'}"><i>가입자</i></b-link>
        <b-link :to="{name: 'adm_stats_order'}"><i>매출</i></b-link>
    </section>
<!--
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
-->    
    <section>
        <p @click="$event.currentTarget.classList.toggle('active')"><i>게시판</i></p>
        <b-link @click="strongReload('/admin/board/notice')"><i>공지사항</i></b-link>
        <b-link @click="strongReload('/admin/board/event')"><i>이벤트</i></b-link>
        <b-link @click="strongReload('/admin/board/review')"><i>상품평</i></b-link>
        <hr />
        <b-link @click="strongReload('/admin/board/gd_inquiry')"><i>상품문의</i></b-link>
        <b-link @click="strongReload('/admin/board/inquiry')"><i>1:1문의</i></b-link>
        <b-link @click="strongReload('/admin/board/as')"><i>A/S신청</i></b-link>
        <b-link @click="strongReload('/admin/board/cancel')"><i>취소/교환신청</i></b-link>
    </section>

    <section>
        <p @click="$event.currentTarget.classList.toggle('active')"><i>Merck 발주</i></p>
        <b-link :to="{name: 'adm_b2b_merck_order'}"><i>주문 목록</i></b-link>
        <b-link :to="{name: 'adm_b2b_merck_order_result'}"><i>발주 내역</i></b-link>
        <b-link :to="{name: 'adm_b2b_merck_stock_result'}"><i>재고 확인 결과</i></b-link>
        <b-link :to="{name: 'adm_b2b_merck_asn'}"><i>ASN</i></b-link>
        <b-link :to="{name: 'adm_b2b_merck_invoice'}"><i>e-Invoice</i></b-link>
    </section>

            
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

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <req-voucher  v-if="modalMode == 'reqVoucher'" @close-modal="isModalViewed = false" :list="reqVoucher" />
            <req-ask      v-if="modalMode == 'reqAsk'" @close-modal="isModalViewed = false" :list="reqAsk" />
            <req-order    v-if="modalMode == 'reqOrder'" @close-modal="isModalViewed = false" :list="reqOrder" />
            <req-estimate v-if="modalMode == 'reqEstimate'" @close-modal="isModalViewed = false" :list="reqEstimate" />
        </modal>
    </transition>
</aside>
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
aside { padding-top:20px; }
aside header { margin-bottom:28px; }
aside section { padding-top:7px 0; }
aside>*>* { text-align:right; }
aside section p { position:relative; margin:0; cursor:pointer; }
aside section p:not(.solo):after { content:""; position:absolute; right:24px; top:18px; width:0; height:0; border-style:solid; border-width:5px 5px 0 5px; border-color:#FFF transparent transparent transparent; transition:all .1s; } 
aside section a { background-color:#8197AE; font-size:15px; transition:all .1s; overflow:hidden; max-height:0; }
aside section.focus p { background-color:#fff; }
aside section.focus p i { color:#4C647C; font-weight:900; }
aside section.focus a { max-height:40.5px; }
aside section p.active:after { transform:rotate(180deg); }
aside section p.active ~ a { max-height:40.5px; }
aside a { display:block; }
aside i { padding:9px 0; color:#fff; width:170px; text-align:center; display:inline-block; font-style:normal; }





    



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