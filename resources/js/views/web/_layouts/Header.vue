<template>

<header id="header" :class="{fixed:headerFix}">
    <div id="afterimage"></div>
    <div id="real">
        <div class="layout">
            <b-navbar toggleable="lg">
                <b-navbar-brand :to="{name: 'main'}"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/logo.png" /></b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                
                <b-navbar-nav class="menu_user" v-if="isLoggedin">
                    <b-nav-item :to="{name: 'mypage'}">마이페이지</b-nav-item>
                    <b-nav-item @click="logout">로그아웃</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="menu_user" v-else>
                    <b-nav-item @click="loginView">
                        로그인
                        <b-modal id="login-modal" centered hide-footer title="Login">
                            <LoginPopUp ref="login" />
                        </b-modal>
                    </b-nav-item>
                    <b-nav-item :to="{name: 'auth_intro'}">회원가입</b-nav-item>
                </b-navbar-nav>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="mr-auto nav_menu">
                        <b-nav-item to="/shop/listing/day">당일출고</b-nav-item>
                        <b-nav-item :to="{name: 'estimate_create'}">견적요청</b-nav-item>
                        <b-nav-item :to="{name: 'engReform_create'}">영문교정</b-nav-item>
                        <b-nav-item :to="{name: 'outlet'}">전문관</b-nav-item>
                        <b-nav-item :to="{name: 'cscenter'}">고객센터</b-nav-item>
                        <b-nav-item :to="{name: 'bo_intro'}">커뮤니티</b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto head_sch_box">
                        <b-nav-form class="head_sch" @submit.prevent="routerPush">
                            <select class="custom-select" v-model="frm.mode">
                                <option value="">전체</option>
                                <option value="gd_name">상품명</option>
                                <option value="gm_name">제품명</option>
                                <option value="gm_code">모델명</option>
                                <option value="cat_no">Cat.No</option>
                            </select>
                            <b-form-input v-model="frm.keyword" placeholder="검색어를 입력하세요" />
                            <b-button type="submit"><font-awesome-icon icon="search" /></b-button>
                        </b-nav-form>
                    </b-navbar-nav>
                </b-collapse>

                <div v-if="user && user.is_admin" class="admin">
                    <router-link :to="{name: 'adm_main'}">관리자</router-link>
                    <router-link
                        v-if="this.$route.name === 'goods_show'"
                        :to="{name: 'adm_goods_edit', params: { gd_id:this.$route.params.gd_id }}"
                    >
                        상품관리
                    </router-link>
                </div>
            </b-navbar>
        </div>
    </div>

    <Categorys v-if="true" />

    <Cart v-if="isLoggedin && $route.name !== 'order_settle'" /> <!-- 장바구니 -->

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
        // 'Categorys': () => import('../_module/category/Index.vue'),
        // <categorys :cateOpen="cateOpen"></categorys>
        'Categorys': () => import('../_module/category/Cate.vue'),
        'Cart': () => import('../_module/cart/Cart.vue'),
    },
    data() {
        return {
            headerFix: false,
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
        loginView(){
            this.$bvModal.show('login-modal')
        },
        logout() {
            this.$store.dispatch('auth/logout');
        },
        routerPush(){
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
#header #real nav { align-items:flex-end; padding:16.5px 0; }
#header #real nav .navbar-brand { padding:0; margin-bottom:-5px; }
#header #real nav .navbar-brand img { width:100%; transition:all .3s; }

#header #real nav .menu_user { position:absolute; top:13px; right:0; }
#header #real nav .menu_user li a { font-weight:bold; font-size:13px; padding:3px 14px; position:relative; }
#header #real nav .menu_user li:not(:last-child) a:after { content:"|"; position:absolute; right:-1px; }

#header #real nav .navbar-collapse { align-items:flex-end; }
#header #real nav .navbar-collapse ul li a { padding:0 .5rem; color: rgba(0, 0, 0, 1); font-size:14px; }
#header #real nav .navbar-collapse ul li a:hover { color:#1A91D5; text-decoration: underline; }
#header #real nav .navbar-collapse ul li a.router-link-exact-active { font-weight:bold; background:#0A7C8B; color:#FFF; border-radius:10px; }

#header #real nav .head_sch_box { margin-bottom:3px; }
#header #real nav .head_sch_box .head_sch { background-color:#1A90D6; color:#FFF; padding:3px; border-radius:26px; }
#header #real nav .head_sch_box .head_sch form { min-width:36rem; transition:all .3s; }
#header #real nav .head_sch_box .head_sch form select { border-radius:17px 0 0 17px; height:36px; padding:.3rem 1.6rem 0.3rem 0.4rem; font-size:.9rem; border-width:0; background:#fff url(/img/common/arrow_dn.gif)  no-repeat right 8px center; }
#header #real nav .head_sch_box .head_sch form input { border:none; border-radius:0 18px 18px 0; padding: 0.4rem 1rem; font-size:1.2rem; height:36px; margin-left:.17rem; flex-grow:1; }
#header #real nav .head_sch_box .head_sch form input:focus { outline:0; }
#header #real nav .head_sch_box .head_sch form button { padding:.2rem 1rem 0 .75rem; border-radius:0 18px 18px 0; background-color:#1A90D6; border-width:0; }
#header #real nav .head_sch_box .head_sch form button svg { font-size:1.4rem; }

#header #real nav .admin { position:absolute; top:0; left:50%; transform:translateX(-50%); }
#header #real nav .admin a { display:inline-block; background-color:#ff4d00; padding:3px 10px; border-radius:0 0 10px 10px; color:#fff; font-weight:bold; text-align:center; }


#header.fixed #afterimage { height:100px; }
#header.fixed #real { position:fixed; z-index:17; top:0; width:100%; background:inherit; }
#header.fixed #real nav .navbar-brand img { width:180px; }
#header.fixed #real nav .menu_user,
#header.fixed #real nav .nav_menu { display:none; }
#header.fixed #real nav .head_sch_box .head_sch form { min-width:74rem; }
</style>
