<template>

<header id="header" :class="{fixed:headerFix}">
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

            <nav class="nav_menu">
                <b-link to="/shop/listing/today_pick_up/all">당일출고</b-link>
                <b-link :to="{name: 'estimate_create'}">견적요청</b-link>
                <b-link :to="{name: 'engReform_create'}">영문교정</b-link>
                <b-link :to="{name: 'outlet'}">전문관</b-link>
                <b-link :to="{name: 'cscenter'}">고객센터</b-link>
                <b-link :to="{name: 'bo_intro'}">커뮤니티</b-link>
            </nav>
            
            <div class="head_sch_box">
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
        <Categorys v-if="true" />
        <Cart v-if="isLoggedin && $route.name !== 'order_settle'" /> <!-- 장바구니 -->
    </div>
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500" :min_height="560" :padding="0" >
            <template slot="header"><div class="modal_login">로그인</div></template>
            <LoginPopUp @close-modal="isModalViewed = false" />
        </Modal>
    </transition>
</header>
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


#header.fixed #afterimage { height:100px; }
#header.fixed #real { position:fixed; z-index:17; top:0; width:100%; background:inherit; }
#header.fixed #real nav .navbar-brand img { width:180px; }
#header.fixed #real nav .menu_user,
#header.fixed #real nav .nav_menu { display:none; }
#header.fixed #real nav .head_sch_box .head_sch form { min-width:74rem; }

@media (max-width: 992px){
    #header #real .layout { height:60px; padding-bottom: 0px; }
    #header #real .layout .logo { flex:0 0 46px; max-width:46px; margin-right:13px; }
    #header #real .layout .nav_menu a { padding:3px 0; font-size:.95rem; }
    #header #real .head_sch_box { position: absolute; bottom: -46px; z-index: 17;left:50%; transform:translateX(-50%); }
    #header #real .head_sch_box .head_sch { min-width:0; }
    #header #real .head_sch_box .head_sch select { display:none; }
    #header #real .head_sch_box .head_sch input { border-radius:18px; width:78%; }
    #header #real .head_sch_box .head_sch button { padding: 0 10px; }
}

</style>
