<template>

<aside>
    <b-button @click="mobileMenu" id="m_menu"><b-icon-menu-button-wide-fill></b-icon-menu-button-wide-fill></b-button>
    <header><router-link :to="{name: 'adm_main'}"><i><b>A</b><b-img src="/storage/common/logo/admin.png"></b-img></i></router-link></header>

    <section>
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_site')}"><i><b>S</b>Site관리</i></p>
        <b-link :class="{focus:$route.name.startsWith('adm_site_info')}"            :to="{name: 'adm_site_info'}"><i>정보설정</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_site_main_cate_goods')}" :to="{name: 'adm_site_main_cate_goods'}"><i>메인 카테고리별 추천 상품</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_site_main_best')}"       :to="{name: 'adm_site_main_best'}"><i>메인 Best 상품</i></b-link>
    </section>

    <section>
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_user')}"><i><b>회</b>회원관리</i></p>
        <b-link :class="{focus:$route.name=='adm_user'||$route.name=='adm_user_edit'}" @click="strongReload('/admin/user')"><i>회원목록</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_user_email')}" :to="{name: 'adm_user_email'}"><i>회원메일발송</i></b-link>
    </section>

    <section>
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_goods_') || $route.name.startsWith('adm_category') || $route.name.startsWith('adm_maker') || $route.name.startsWith('adm_purchaseAt')}">
            <i>상품관리</i>
        </p>
        <b-link :class="{focus:$route.name.startsWith('adm_goods_index') && isEmpty($route.query.gd_type) }"  @click="strongReload('/admin/shop/goods')"><i>상품목록</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_goods_index') && $route.query.gd_type == 'REN' }"  @click="strongReload('/admin/shop/goods', 'gd_type=REN')"><i>렌탈목록</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_category')}"     :to="{name: 'adm_category'}"><i>카테고리</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_maker')}"        :to="{name: 'adm_maker'}"><i>제조사</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_purchaseAt')}"   :to="{name: 'adm_purchaseAt'}"><i>직배송/항공운임</i></b-link>
    </section>

    <section>
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_estimate') || $route.name.startsWith('adm_eng_reform')}">
            <i>견적관리</i>
        </p>
        <b-link :class="{focus:$route.name.startsWith('adm_estimate')}" @click="strongReload('/admin/shop/estimate')"><i>견적목록</i></b-link>
        <b-link @click="openWinPop(`/admin/shop/estimate/create`, 1300, 900)"><i>임의견적</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_eng_reform')}" :to="{name: 'adm_eng_reform_index'}"><i>영문교정</i></b-link>
    </section>

    <section>
        <p @click="strongReload('/admin/shop/order')" class="solo" :class="{focus:$route.name.startsWith('adm_order_')}">
            <i>주문목록</i>
        </p>
    </section>

    <section>
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_stats')}"><i>통계</i></p>
        <b-link :class="{focus:$route.name.startsWith('adm_stats_join')}" :to="{name: 'adm_stats_join'}"><i>가입자</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_stats_order')}" :to="{name: 'adm_stats_order'}"><i>매출</i></b-link>
    </section>
    <!-- <template v-if="user.id != 286">
        <b-nav-item-dropdown v-if="user.user_mng.um_group == 'acc'" text="매출장부">
            <b-dropdown-item :to="{name: 'adm_ledger'}">통합 장부</b-dropdown-item>
            <b-dropdown-item :to="{name: 'adm_ledger_acct_wait'}">매출 대기</b-dropdown-item>
            <b-dropdown-item :to="{name: 'adm_ledger_acct_soon'}">결제 예정분</b-dropdown-item>
            <b-dropdown-item :to="{name: 'adm_ledger_acct_pay_od'}">매출 내역</b-dropdown-item>
            <b-dropdown-item :to="{name: 'adm_ledger_acct_pay_tx'}">매출장</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item :to="{name: 'adm_ledger'}" v-else active-class="active" exact>영업장부</b-nav-item>
    </template> -->    
    <section>
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_board_')}"><i>게시판</i></p>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'notice'}"     @click="strongReload('/admin/board/notice')"><i>공지사항</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'event'}"      @click="strongReload('/admin/board/event')"><i>이벤트</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'review'}"     @click="strongReload('/admin/board/review')"><i>상품평</i></b-link>
        <b-link><hr /></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'gd_inquiry'}" @click="strongReload('/admin/board/gd_inquiry')"><i>상품문의</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'inquiry'}"    @click="strongReload('/admin/board/inquiry')"><i>1:1문의</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'as'}"         @click="strongReload('/admin/board/as')"><i>A/S신청</i></b-link>
        <b-link :class="{focus:$route.name.startsWith('adm_board') && $route.params.bo_cd == 'cancel'}"     @click="strongReload('/admin/board/cancel')"><i>취소/교환신청</i></b-link>
    </section>

    <section class="menu_last">
        <p @click="toggleClass" :class="{active:$route.name.startsWith('adm_b2b_merck')}"><i>Merck 발주</i></p>
        <b-link :class="{focus:$route.name=='adm_b2b_merck_order'}"        :to="{name: 'adm_b2b_merck_order'}"><i>주문 목록</i></b-link>
        <b-link :class="{focus:$route.name=='adm_b2b_merck_order_result'}" :to="{name: 'adm_b2b_merck_order_result'}"><i>발주 내역</i></b-link>
        <b-link :class="{focus:$route.name=='adm_b2b_merck_stock_result'}" :to="{name: 'adm_b2b_merck_stock_result'}"><i>재고 확인 결과</i></b-link>
        <b-link :class="{focus:$route.name=='adm_b2b_merck_asn'}"          :to="{name: 'adm_b2b_merck_asn'}"><i>ASN</i></b-link>
        <b-link :class="{focus:$route.name=='adm_b2b_merck_invoice'}"      :to="{name: 'adm_b2b_merck_invoice'}"><i>e-Invoice</i></b-link>
    </section>

    
    
    
    <section class="bottom">
        <article class="super">
            <template v-if="user.level == 29">
                <b-button class="plum sm" @click="exeIndex" v-b-tooltip="'검색엔진 검색어 재구성'" v-if="!is_indexing">
                    <b-icon-arrow-clockwise></b-icon-arrow-clockwise>
                </b-button>
                <b-button class="gray sm" v-else>검색엔진 검색어 재구성 중~~~!!!</b-button>
            </template>
        </article>

        <article class="alarm">
            <b-button class="blink white sm" @click="strongReload('/admin/shop/order', `startDate=${to_day}&endDate=${to_day}&od_mng=no`)" v-if="reqOrder"> 
                주문 ({{reqOrder}})
            </b-button>
            <b-button class="blink gray sm" @click="strongReload('/admin/shop/estimate', `date_type=reque&startDate=${to_day}&endDate=${to_day}&eq_step=DONOT`)" v-if="reqEstimate"> 
                견적 ({{reqEstimate}})
            </b-button>
            <b-button class="blink teal sm" @click="isModalViewed = !isModalViewed, modalMode = 'reqVoucher'" v-if="reqVoucher.length"> 
                <b-icon-gift></b-icon-gift> ({{reqVoucher.length}})
            </b-button>
            <b-button class="blink black sm" @click="isModalViewed = !isModalViewed, modalMode = 'reqAsk'" v-if="reqAsk.as.length+reqAsk.cancel.length+reqAsk.gd_inquiry.length+reqAsk.inquiry.length">
                <b-icon-chat-square-text></b-icon-chat-square-text> ({{reqAsk.as.length+reqAsk.cancel.length+reqAsk.gd_inquiry.length+reqAsk.inquiry.length}})
            </b-button>
        </article>        
    </section>

    <footer><b-link :to="{name: 'main'}" target="_blank"><i><b-img src="/storage/common/logo/admin_4s.png"></b-img></i></b-link></footer>

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <req-voucher  v-if="modalMode == 'reqVoucher'" @close-modal="isModalViewed = false" :list="reqVoucher"></req-voucher>
            <req-ask      v-if="modalMode == 'reqAsk'" @close-modal="isModalViewed = false" :list="reqAsk"></req-ask>
            <!-- <req-order    v-if="modalMode == 'reqOrder'" @close-modal="isModalViewed = false" :list="reqOrder" /> -->
            <!-- <req-estimate v-if="modalMode == 'reqEstimate'" @close-modal="isModalViewed = false" :list="reqEstimate" /> -->
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
        // 'req-order'   : () => import('./_comp/ReqOrder'),
        // 'req-estimate'    : () => import('./_comp/ReqEstimate'),
        'req-voucher': () => import('./_comp/ReqVoucher'),
        'req-ask'    : () => import('./_comp/ReqAsk'),
    },
    computed: { 
        ...mapGetters({ user: 'auth/user', siteInfo: 'common/siteInfo', }),
        to_day(){ return new Date().format("yyyy-MM-dd"); },
    },
    data() {
        return {
            modalMode    :'',
            isModalViewed: false,
            reqOrder     : 0,
            reqEstimate  : 0,
            reqAsk       : {
                as:[],
                cancel:[],
                gd_inquiry:[],
                inquiry:[],
            },
            reqVoucher   : [],
            is_indexing : false,
        }
    },

    methods: {
        strongReload(url, param){
            if (this.siteInfo.APP_ENV == 'production' ) {
                url = `${url}?t=${Math.random()}`;
                if(!isEmpty(param)) url = `${url}&${param}`;
                window.location.href = url;
            } else if (this.siteInfo.APP_ENV == 'local' )
                this.$router.push(url);
        },

        toggleClass(e){
            if (e.currentTarget.classList.contains('active')) {
                e.currentTarget.classList.remove('active');
            } else {
                let elements = document.querySelectorAll('.active');
                elements.forEach((el) => {
                    el.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
            }
            
        },

        mobileMenu(){
            document.querySelector('.lefter').classList.toggle('open');
        },

        async exeIndex(){
            this.is_indexing = true;
            let res = await ax.get(`admin/shop/goods/exeIndex`);
            if (res && res.status === 200) {
                this.is_indexing = false;
                
                if (res.data.message == 'complete_working_index'){
                    Notify.modal('검색어 등록이 끝났습니다.', 'success');
                } else if (res.data.message == 'working_index'){
                    Notify.modal('다른 유저가 검색어를 등록중입니다.', 'danger');
                }
            }
        },

        // route_push(type) {
        //     let today = new Date().format("yyyy-MM-dd");
        //     let route_name = '';
        //     let route_query = '';
        //     if ( type == 'order' ) {
        //         route_name = 'adm_order_index';
        //         route_query = { startDate   :today,
        //                         endDate     :today,
        //                         od_step     :'10', };
        //     } else if ( type == 'estimate' ) {
        //         route_name = 'adm_estimate_index';
        //         route_query = { date_type   :'reque',
        //                         startDate   :today,
        //                         endDate     :today,
        //                         eq_step     :'DONOT', };
        //     }
        //     this.$router.push({name: route_name, query: route_query});
        // }
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
aside { background-color:#4E647B; padding-top:10px; display:flex; flex-direction:column; position:sticky; left:0; top:0; align-self:flex-start; z-index:1021; height:100vh; }
aside #m_menu { display:none; position:absolute; right:-50px; }
aside header { margin-bottom:10px; }
aside section { padding:5px 0; }
aside>*>* { text-align:right; }
aside section p { position:relative; margin:0; cursor:pointer; }
aside section p:not(.solo):after { content:""; position:absolute; right:24px; top:18px; width:0; height:0; border-style:solid; border-width:5px 5px 0 5px; border-color:#FFF transparent transparent transparent; transition:all .1s; } 
aside section hr { margin:.3em 0; border-color:#015B7E; }
aside section hr,
aside section a { background-color:#8197AE; font-size:15px; transition:all .1s; overflow:hidden; max-height:0; }
aside section p.active:after { transform:rotate(180deg); }
aside section p.active ~ a { max-height:35px; }
aside section.menu_last { margin-bottom:auto; } 
aside a { display:block; }
aside i { padding:9px 0; color:#fff; text-align:center; display:block; font-style:normal; }
aside i b { display:none; }
aside section.bottom { padding-right:7px; }
aside section.bottom article { text-align:right; margin-bottom:7px; }
aside footer { margin-bottom:20px; }
aside section .focus { background-color:#fff; }
aside section .focus i { color:#4C647C; font-weight:900; }
@media (max-width: 1320px){ }
@media (max-width: 992px){
    aside { position:fixed; /*display:block;*/ width:10.625em;  transition:all .1s; transform:translateX(-170px); }
    aside #m_menu { display:inline-block; }
    aside.open { transform:translateX(0px); }
    /*
    aside section p:not(.solo):after { content:none; }
    aside.open i { text-align:left; white-space:nowrap }
    aside.open i b { display:inline-block; text-align:center; font-size:1.5em; }
    */
}
</style>
