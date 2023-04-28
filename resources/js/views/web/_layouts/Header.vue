<template>

<div id="header" :class="{headerFix:headerFix}">
    <div id="afterimage"></div>
    <div id="real">
        <div class="layout">
            <b-link :to="{name: 'main'}" class="logo"></b-link>

            <div v-if="isLoggedin" class="top_menu">
                <b-link :to="{name: 'mypage'}">마이페이지</b-link>
                <b-link @click="logout">로그아웃</b-link>
            </div>
            <div v-else class="top_menu">
                <b-link @click="isModalViewed=true">로그인</b-link>
                <b-link :to="{name: 'auth_intro'}">회원가입</b-link>
            </div>

            <nav class="nav_menu" :class="{view_nav:view_nav}">
                <b-link to="/shop/listing/today_pick_up/all">당일출고</b-link>
                <b-link :to="{name: 'estimate_create'}">견적요청</b-link>
                <b-link :to="{name: 'engReform_create'}">영문교정</b-link>
                <b-link :to="{name: 'outlet'}">전문관</b-link>
                <b-link :to="{name: 'cscenter'}">고객센터</b-link>
                <b-link :to="{name: 'bo_intro'}">커뮤니티</b-link>
            </nav>
            
            <div class="head_sch_box" :class="{view_sch:view_sch}">
                <b-form class="head_sch" @submit.prevent="routerPush">
                    <select class="custom-select" v-model="frm.mode">
                        <option value="">전체</option>
                        <option value="gd_name">상품명</option>
                        <option value="gm_name">제품명</option>
                        <option value="gm_code">모델명</option>
                        <option value="cat_no">Cat.No</option>
                        <option value="maker">제조사</option>
                    </select>
                    <b-form-input v-model="frm.keyword" placeholder="검색어를 입력하세요" />
                    <b-button type="submit"><font-awesome-icon icon="search" /></b-button>
                </b-form>
            </div>

            <div v-if="user && user.is_admin" class="admin">
                <router-link :to="{name: 'adm_main'}" target="_blank">관리자</router-link>
                <router-link v-if="this.$route.name === 'goods_show'" target="_blank"
                    :to="{name: 'adm_goods_edit', params: { gd_id:this.$route.params.gd_id }}"
                >상품관리</router-link>
            </div>
        </div>
        <Categorys v-if="true" :class="{view_cate:view_cate}" @close_cate="view_cate = false" />
        <Cart v-if="isLoggedin && ['order_settle', 'cart_index'].indexOf($route.name) === -1" /> <!-- 장바구니 -->
    </div>
    <div class="sm_view">
        <b-link @click="view_cate=!view_cate"><font-awesome-icon icon="sitemap" /></b-link>
        <b-link @click="view_nav=!view_nav"><b-icon-grid3x3-gap-fill /></b-link>
        <b-link :to="{name: 'main'}"><b-icon-house-door-fill /></b-link>
        <b-link @click="view_sch=!view_sch"><b-icon-search /></b-link>
        <b-link :to="{name: 'login'}"><b-icon-person-fill /></b-link>
    </div>
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500" :min_height="560" :padding="0" >
            <template slot="header"><div class="modal_login">로그인</div></template>
            <LoginPopUp @close-modal="isModalViewed = false" />
        </Modal>
    </transition>
</div>
</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import LoginPopUp from '../auth/Login.vue';
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    name: 'Header',
    components: {
        KinesisContainer,
        KinesisElement, // https://github.com/Aminerman/vue-kinesis
        LoginPopUp,
        'Modal'     : () => import('@/views/_common/Modal'),
        // 'Categorys': () => import('../_module/category/Index.vue'),
        // <categorys :cateOpen="cateOpen"></categorys>
        'Categorys': () => import('../_module/category/Cate.vue'),
        'Cart': () => import('../_module/cart/Cart.vue'),
    },
    data() {
        return {
            headerFix: false,
            isModalViewed: false,
            view_sch:false,
            view_nav:false,
            view_cate:false,
        }
    },
    watch: {
        '$route.query' (to, from) {
            // if (to.ca01) { this.sch_frm.ca01 = to.ca01; this.sch_frm.ca02 = ''; this.sch_frm.ca03 = ''; this.sch_frm.ca04 = ''; }
            // if (to.ca02) { this.sch_frm.ca02 = to.ca02; this.sch_frm.ca03 = ''; this.sch_frm.ca04 = ''; }
            // if (to.ca03) { this.sch_frm.ca03 = to.ca03; this.sch_frm.ca04 = ''; }
            // if (to.ca04) this.sch_frm.ca04 = to.ca04;
            // if (to.keyword) this.sch_frm.keyword = to.keyword;
            // if (to.mode) this.sch_frm.mode = to.mode;
            // if (to.sort) this.sch_frm.sort = to.sort;
            // this.index();
            if ( this.$route.name == 'goods_index' ) {
                this.$store.commit('goods/setFrm', {
                    ca01:this.$route.query.ca01 ?? 0,
                    ca02:this.$route.query.ca02 ?? 0,
                    ca03:this.$route.query.ca03 ?? 0,
                    ca04:this.$route.query.ca04 ?? 0,
                    mk_id:this.$route.query.mk_id ?? 0,
                    mode:this.$route.query.mode ?? "",
                    keyword:this.$route.query.keyword ?? "",
                    sort:this.$route.query.sort ?? "",
                    page:this.$route.query.page ?? 0,
                });
                this.$store.dispatch('goods/index');
            }
        }
    },
    computed: {
        ...mapGetters({
            isLoggedin: 'auth/isLoggedin',
            user: 'auth/user',
        }),
        ...mapState('goods', ['frm']),
    },
    methods:{
        logout() {
            this.$store.dispatch('auth/logout');
        },
        routerPush(){
            if(this.frm.keyword == '') {
                Notify.modal('검색어를 입력하세요.', 'warning');
                return false;
            }
            this.$store.dispatch('goods/routerPush', 'new');
        },
        onScroll(e) {
            // console.log(window.top.scrollY);
            this.headerFix = window.top.scrollY > 10;
        }

    },
    mounted() {
        window.addEventListener("scroll", this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll)
    },
}
</script>

<style lang="css" scoped>
#header { background-color:#F5F5F5; }
#header #real .layout { position:relative; display:flex; align-items:flex-end; height:90px; padding-bottom:5px; }
#header #real .layout>* { flex-basis:0; flex-grow:1; max-width:100%; }
#header #real .layout .top_menu { position:absolute; top:11px; right:0; font-size:.9rem; }
#header #real .layout .top_menu a { position:relative; display:inline-block; padding:3px 15px 3px 8px; }
#header #real .layout .top_menu a:not(:last-child):after { content:"|"; position:absolute; right:-1px; }
#header #real .layout .logo { flex:0 0 250px; max-width:250px; height:72px; background:top left/238px 72px no-repeat url('https://fourscience.s3.ap-northeast-2.amazonaws.com/common/logo/logo.png'); }
#header #real .layout .nav_menu a { display:inline-block; padding:3px 7px; font-weight:600; }
#header #real .layout .nav_menu a:hover { color:#1A90D6; text-decoration:underline; font-weight:900; }
#header #real .head_sch_box { margin-bottom:3px; }
#header #real .head_sch_box .head_sch { align-items:center; display:flex; flex-flow:row wrap; background-color:#1A90D6; color:#FFF; padding:3px; border-radius:26px; }
#header #real .head_sch_box .head_sch { min-width:36rem; transition:all .3s; }
#header #real .head_sch_box .head_sch select { width:auto; border-radius:17px 0 0 17px; height:36px; padding:.3rem 1.6rem 0.3rem 0.4rem; font-size:.9rem; border-width:0; background:#fff url(https://fourscience.s3.ap-northeast-2.amazonaws.com/common/arrow_dn.gif)  no-repeat right 8px center; }
#header #real .head_sch_box .head_sch input { width:auto; border:none; border-radius:0 18px 18px 0; padding: 0.4rem 1rem; font-size:1.2rem; height:36px; margin-left:.17rem; flex-grow:1; }
#header #real .head_sch_box .head_sch input:focus { outline:0; }
#header #real .head_sch_box .head_sch button { width:auto; padding:.2rem 1rem 0 .75rem; border-radius:0 18px 18px 0; background-color:#1A90D6; border-width:0; }
#header #real .head_sch_box .head_sch button svg { font-size:1.4rem; }

#header #real .layout .admin { position:absolute; top:0; left:50%; transform:translateX(-50%); }
#header #real .layout .admin a { display:inline-block; background-color:#ff4d00; padding:3px 10px; border-radius:0 0 10px 10px; color:#fff; font-weight:bold; text-align:center; }


#header.headerFix #afterimage { height:152px; }
#header.headerFix #real { position:fixed; z-index:17; top:0; width:100%; background:inherit; }


#header .sm_view { display:none; }

@media (max-width: 992px){
    #header .sm_view { position:fixed; bottom:0; display:flex; z-index:9999999999999999999; background:#DDD; width:100%; border-radius:2rem 2rem 0 0;}
    #header .sm_view a { flex-basis:0; flex-grow:1; max-width:100%; font-size:2rem; text-align:center; }
    #header #real .layout { height:50px; justify-content:center; }
    #header #real .layout .top_menu { display:none; }
    #header #real .layout .logo { flex:0 0 132px; max-width:132px; height:40px; background-size:contain; }
    #header #real .layout .nav_menu { position:fixed; bottom:48px; border-radius:1rem 1rem 0 0; background:#DDD; z-index:1; width:100%; display:flex; max-height:0; transition:max-height .2s; overflow:hidden;  }
    #header #real .layout .nav_menu a { text-align:center; flex-basis:0; flex-grow:1; padding:8px 10px; font-size:.95rem; }
    #header #real .layout .nav_menu.view_nav { max-height:60px; }


    #header #real .head_sch_box { width:85%; position:absolute; top:0; z-index:17; left:50%; transform:translateX(-50%); max-height:0; transition:max-height .2s; overflow:hidden; }
    #header #real .head_sch_box.view_sch { max-height:50px; }
    #header #real .head_sch_box .head_sch { min-width:0; }
    #header #real .head_sch_box .head_sch select { display:none; }
    #header #real .head_sch_box .head_sch input { border-radius:18px; width:78%; }
    #header #real .head_sch_box .head_sch button { padding: 0 10px; }
    
    #header #real>>>#categorys .depth01>li>ul {  overflow:hidden; padding:0; border-width:0; max-width:0; max-height:0; transition:all .2s; }
    #header #real>>>#categorys.view_cate .depth01>li>ul { padding:.5rem; border-width:2px; max-width:240px; max-height:640px; }
}

</style>
