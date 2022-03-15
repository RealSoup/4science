<template>

<header id="header">
    <div class="layout">
        <b-navbar toggleable="lg">
            <b-navbar-brand :to="{name: 'main'}"><img src="/img/common/logo.png" /></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mr-auto">
                    <b-nav-item to="/shop/listing/day">당일출고</b-nav-item>
                    <b-nav-item :to="{name: 'estimate_create'}">견적요청</b-nav-item>
                    <b-nav-item :to="{name: 'engReform_create'}">영문교정</b-nav-item>
                    <b-nav-item :to="{name: 'outlet'}">전문관</b-nav-item>
                    <b-nav-item :to="{name: 'cscenter'}">고객센터</b-nav-item>
                    <b-nav-item :to="{name: 'bo_intro'}">커뮤니티</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav v-if="isLoggedin">
                    <b-nav-item :to="{name: 'mypage'}">마이페이지</b-nav-item>
                    <b-nav-item @click="logout">로그아웃</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-else>
                    <b-nav-item @click="loginView">
                        로그인
                        <b-modal id="login-modal" centered hide-footer title="Login">
                            <LoginPopUp ref="login" />
                        </b-modal>
                    </b-nav-item>
                    <b-nav-item :to="{name: 'auth_intro'}">회원가입</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form class="head_sch" @submit.prevent="routerPush">
                        <select class="custom-select" v-model="frm.mode">
                            <option value="">통합검색</option>
                            <option value="gd_name">상품명</option>
                            <option value="gm_name">제품명</option>
                            <option value="gm_code">모델명</option>
                            <option value="cat_no">Cat.No</option>
                        </select>
                        <b-form-input v-model="frm.keyword" placeholder="Please enter a keyword"></b-form-input>
                        <b-button variant="outline-primary" type="submit"><font-awesome-icon icon="search" /></b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>

            <div v-if="user && user.is_admin" class="admin">
                <router-link :to="{name: 'adm_main'}">관리자</router-link>
                <router-link
                    v-if="this.$route.name === 'goods_show'"
                    :to="{name: 'adm_goods_edit', params: { gd_id:this.$route.params.gd_id }}">
                    상품관리
                </router-link>
            </div>
        </b-navbar>
    </div>

    <Categorys v-if="true" />

    <Cart v-if="cartComponentConnector && true" :scrollbarYTop="scrollbarYTop" /> <!-- 장바구니 -->

</header>
</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import LoginPopUp from '../auth/Login.vue';
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    name: 'Header',
    props: ['scrollbarYTop'],
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
    },
    computed: {
        cartComponentConnector(){
            return this.$route.name !== 'order_settle';
        },
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
        }
    },
    mounted() {
        
    },

}
</script>

<style lang="css" scoped>
#header { background-color:#F5F5F5; }
#header nav { align-items:flex-end; }
#header nav .admin { position:absolute; top:0; left:50%; transform:translateX(-50%); }
#header nav .admin a { display:inline-block; background-color:#ff4d00; padding:3px 10px; border-radius:0 0 10px 10px; color:#fff; font-weight:bold; text-align:center; }
#header nav .head_sch { background-color:#1A90D6; color:#FFF; padding:3px; border-radius:26px; }
#header nav .head_sch select:after { content:""; position:absolute; width:0; height:0; border-left:50px solid transparent; border-right:50px solid transparent; border-top:100px solid red;} 
#header nav .head_sch input { border:none; border-radius:22px; padding: 0.4rem 1rem; font-size: 1.2rem; }
#header nav .head_sch input:focus { outline:0; }
#header nav .head_sch svg { margin:0 16px; font-size:1.9rem; }
#header nav ul.navbar-nav li a.router-link-exact-active { font-weight:bold; background:#0A7C8B; color:#FFF; border-radius:10px; }
</style>
