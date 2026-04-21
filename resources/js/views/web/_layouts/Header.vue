<template>
<header :class="{headerFix:headerFix}">
    <div id="afterimage"></div>
    
    <div id="fixWrap">
        <div id="core" class="layout">
            <div v-if="user && user.is_admin" class="admin">
                <router-link v-if="this.$store.state.common.deviceType === 'mobile'" :to="{name: 'adm_order_index'}" target="_blank">{{ trans().admin.btn_title }}</router-link>
                <router-link v-else :to="{name: 'adm_main'}" target="_blank">{{ trans().admin.btn_title }}</router-link>
                <router-link v-if="this.$route.name === 'goods_show'" target="_blank"
                    :to="{name: 'adm_goods_edit', params: { gd_id:this.$route.params.gd_id }}"
                >상품관리</router-link>     
            </div>
            
            <b-link class="logo" :to="{name: 'main'}">
                <b-img :src="`/storage/common/logo/logo.png`" />
            </b-link>
            
            <nav>
                <div class="nav_left">
                    <b-link id="cate_btn" @click="view_cate = !view_cate">
                        <b-img :src="`/storage/common/icon_category.png`" class="m_show"></b-img>
                        <span>카테고리</span>
                        <categorys v-if="view_cate" :class="{view_cate:view_cate}" @close_cate="view_cate=false"></categorys>
                    </b-link>
                    <b-link to="/shop/listing/today_pick_up/all">당일출고</b-link>
                    <b-link :to="{name: 'rental'}" class="m_hide">렌탈</b-link>
                    <b-link :to="{name: 'outlet'}" class="m_hide">전문관</b-link>
                    <b-link :to="{name: 'estimate_create'}" class="m_show">견적요청</b-link>
                    <b-link :to="{name: 'cscenter'}">고객센터</b-link>
                    <b-link :to="{name: 'bo_intro'}">커뮤니티</b-link>
                </div>
            
                

                <div class="nav_right">
                    <b-form @submit.prevent="routerPush" :class="{view_sch:view_sch}">
                        <select class="custom-select" v-model="frm.mode">
                            <option value="">전체</option>
                            <option value="gd_name">상품명</option>
                            <option value="gm_name">제품명</option>
                            <option value="gm_code">모델명</option>
                            <option value="cat_no">Cat.No</option>
                            <option value="maker">제조사</option>
                        </select>
                        <b-form-input v-model="frm.keyword" placeholder="검색어를 입력하세요"></b-form-input>
                        <button type="submit"><font-awesome-icon icon="search"></font-awesome-icon></button>
                    </b-form>

                    <template v-if="isLoggedin">
                        <b-link @click="logout">
                            <b-img :src="`/storage/common/icon/logout.png`"></b-img>  <p>로그아웃</p>
                        </b-link>
                        <b-link :to="{name: 'mypage'}">
                            <b-img :src="`/storage/common/icon/mypage.png?v=2`"></b-img> <p>마이페이지</p>
                        </b-link>
                    </template>
                    <template v-else>
                        <b-link @click="isModalViewed=true">
                            <b-img :src="`/storage/common/icon_login.png`"></b-img>  <p>로그인</p>
                        </b-link>
                    </template>

                    <b-link :to="{name: 'my_order'}">
                        <b-img :src="`/storage/common/icon/order.png`"></b-img> <p>주문배송</p>
                    </b-link>
                    <b-link :to="{name: 'estimate_create'}">
                        <b-img :src="`/storage/common/icon/estimate.png`"></b-img> <p>견적요청</p>
                    </b-link>
                    <b-link :to="{name:'cart_index'}" class="cart">
                        <b-img :src="`/storage/common/icon/cart.png`"></b-img> <p>장바구니</p>
                        <b>{{ this.cartList?.length || 0 }}</b>
                    </b-link>

                    <b-link href="https://pf.kakao.com/_AxmKUj" target='_blank' class="kakao"><b-img :src="`/storage/common/kakao.png`"></b-img></b-link>
                </div>
            </nav>
        </div>
    </div>

    <div class="bottom_menu">
        <!-- <b-link @click="view_cate=!view_cate"><font-awesome-icon icon="sitemap" /></b-link>
        <b-link @click="view_nav=!view_nav"><b-icon-grid3x3-gap-fill /></b-link> -->
        <b-link @click="$router.go(-1)">
            <i></i><p>뒤로</p>
        </b-link>
        <b-link :to="{name: 'main'}">
            <i></i><p>홈</p>
        </b-link>
        <b-link @click="view_sch=!view_sch">
            <i></i><p>검색</p>
        </b-link>
        <b-link :to="{name: 'login'}">
            <i></i>
            <p>마이</p>
        </b-link>
        <b-link :to="{name: 'cart_index'}">
            <i></i><p>장바구니</p>
        </b-link>
        <b-link v-if="list.length" @click="$store.commit('recent_goods/switch', { recent_goods_view:!recent_goods_view })">
            <i></i><p>최근</p>
        </b-link>
    </div>
    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500" :min_height="560" :padding="0" >
            <template slot="header"><div class="modal_login">로그인</div></template>
            <login-pop-up @close-modal="isModalViewed = false"></login-pop-up>
        </modal>
    </transition>
</header>
</template>

<script>
import ax from '@/api/http';
import LoginPopUp from '../auth/Login.vue';
import { mapState, mapGetters } from 'vuex'
import Header from '../../admin/_layouts/Header.vue';


export default {
    name: 'Header',
    components: {
        'login-pop-up': LoginPopUp,
        'modal'     :   () => import('@/views/_common/Modal'),
        'categorys':    () => import('../_module/category/Cate.vue'),
        Header,
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
            // if ( this.$route.name == 'goods_index' ) {
            if (['goods_index', 'new_goods_index', 'search_test'].includes(this.$route.name)) {                
                this.$store.commit('goods/setFrm', {
                    ca01:this.$route.query.ca01 ?? 0,
                    ca02:this.$route.query.ca02 ?? 0,
                    ca03:this.$route.query.ca03 ?? 0,
                    ca04:this.$route.query.ca04 ?? 0,
                    mk_id:this.$route.query.mk_id ?? 0,
                    mode:this.$route.query.mode ?? "",
                    keyword:this.$route.query.keyword ?? "",
                    keyword_extra:this.$route.query.keyword_extra ?? "",
                    sort:this.$route.query.sort ?? "hot",
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
        ...mapGetters('cart', ['cartList']),
        ...mapState('goods', ['frm']),
        ...mapState('recent_goods', ['recent_goods_view', 'list']),
    },
    methods:{
        logout() { this.$store.dispatch('auth/logout'); },
        routerPush(){
            if(this.frm.keyword == '') {
                Notify.modal('검색어를 입력하세요.', 'warning');
                return false;
            }

            ax.post('/api/behavior/log', {
                action: 'search',
                target: this.frm.keyword,
            });

            this.$store.dispatch('goods/routerPush', 'new');
        },
        onScroll(e) { this.headerFix = window.top.scrollY > 10; },
    },
    mounted() { 
        window.addEventListener("scroll", this.onScroll);
        this.$store.dispatch('cart/index');
    },
    beforeDestroy() { window.removeEventListener("scroll", this.onScroll) },
}
</script>

<style lang="css" scoped>
header .admin { position:absolute; top:0; left:50%; transform:translateX(-50%); z-index: 1; }
header .admin a { display:inline-block; background-color:#ff4d00; padding:3px 10px; border-radius:0 0 10px 10px; color:#fff; font-weight:bold; text-align:center; }

header #fixWrap { border-bottom:1px solid #CCCCCC; padding-bottom:10px; background-color:#FFF; }
header.headerFix #afterimage { height:126px; }
header.headerFix #fixWrap { position:fixed; z-index:17; top:0; width:100%; }
header #fixWrap #core .logo { display:inline-block; width:220px; padding:7px 0 0 27px; transform:translateY(20px); }
header #fixWrap #core .logo img { width:100%; }
header #fixWrap #core nav { display:flex; align-items:flex-end; }
header #fixWrap #core nav>div { flex-basis:0; flex-grow:1; max-width:100%; width:100%; }
header #fixWrap #core nav div a { color:#727273; }

header #fixWrap #core nav .nav_left { line-height: 15px; }
header #fixWrap #core nav .nav_left a { font-size:14px; font-weight:700; padding:0 17px; }
header #fixWrap #core nav .nav_left a:first-child { 
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23007bff%27%20stroke-width%3D%271.2%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E);
    color: #007bff; background-repeat: no-repeat; background-position: right 12px center; padding-right: 23px; font-size:17px; 
}

header #fixWrap #core nav .nav_right form { position:relative; display:flex; width:55%; border-radius:12px; margin:8px 20px 0;
    border:3px solid transparent; background-image: linear-gradient(white, white), linear-gradient(158deg, #5CB85C, #1A90D6);
    background-origin: border-box; background-clip: padding-box, border-box;
}
header #fixWrap #core nav .nav_right form select { width:80px; border:0; background:transparent; 
    background-repeat:no-repeat; background-position:right 10px center; background-size:12px;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27292.4%27%20height%3D%27292.4%27%3E%3Cpath%20fill%3D%27%23595758%27%20d%3D%27M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%27%2F%3E%3C%2Fsvg%3E");
    font-size:14px; 
}


header #fixWrap #core nav .nav_right form input { border:0; background:transparent; font-size:14px; }
header #fixWrap #core nav .nav_right form button { position:absolute; right:6px; top:50%; transform:translateY(-50%); border:0; background:transparent; }
header #fixWrap #core nav .nav_right { display:flex; justify-content:flex-end; align-items:center; }
header #fixWrap #core nav .nav_right a { flex-basis:0; flex-grow:1; max-width:68px; width:68px; text-align:center; }
header #fixWrap #core nav .nav_right a img { width:35px; height:35px; }
header #fixWrap #core nav .nav_right a p { margin:0; font-size:12px; font-weight:600; letter-spacing:-1px; }
header #fixWrap #core nav .nav_right .cart { position: relative; }
header #fixWrap #core nav .nav_right .cart b { background-color:#02ABEC; color:#fff; border-radius:14px; padding:3px 6px; font-size:12px; position:absolute; top:-5px; right:0; }

header .bottom_menu { display:none; }

@media (max-width: 992px){
    header { border-bottom:0; padding:0; }
    header.headerFix #afterimage { height:100px; }
    header #fixWrap #core { text-align:center; }
    header #fixWrap #core .logo { width:200px; margin-top:1em; padding:0; transform:none; }
    header #fixWrap #core .logo img {  max-width:170px; width:auto; height:auto; }
    header #fixWrap #core nav { align-items:center; margin:12px 0; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }
    header #fixWrap #core nav>div { display:flex; align-items: center; }
    header #fixWrap #core nav .nav_left #cate_btn { display:inline-block; background-image:none; background-color:#666; padding:0; }
    header #fixWrap #core nav .nav_left #cate_btn img { display:inline-block; max-width:34px; }
    header #fixWrap #core nav .nav_left #cate_btn span { display:none; }
    header #fixWrap #core nav .nav_left a { padding:0 7px; }



    header #fixWrap #core nav .nav_right { max-width:0; }
    header #fixWrap #core nav .nav_right form { width:85%; max-width:85%; position:absolute; top:0; z-index:17; left:50%; transform:translateX(-50%); max-height:0; transition:max-height .2s; overflow:hidden; background: #FFF; border-width:0; }
    header #fixWrap #core nav .nav_right form.view_sch { max-height:50px; border-width:1px; } 
    
    
    header #fixWrap #core nav .nav_right a:not(:last-child) { display:none; }


    header .bottom_menu { position:fixed; bottom:0; left:0; display:flex; align-items: center; justify-content: space-around; width: 100%; height: 62px; padding: 0 8px; background-color: #fff; box-shadow: 0 0 12px rgba(22, 29, 36, .5); transition: all .3s; z-index: 100; }
    header .bottom_menu a { width:100%; height:100%; flex-basis:0; flex-grow:1; max-width:100%; text-align:center; font-size:12px; padding:10px 0px; line-height:13px; }
    header .bottom_menu a i { display:inline-block; width:24px; height:24px; background-repeat: no-repeat; background-size: 100% auto; background-position:top center; content: "";}
    header .bottom_menu a:nth-of-type(1) i { background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48bWFzayBpZD0iYiIgc3R5bGU9Im1hc2stdHlwZTpsdW1pbmFuY2UiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjQiIHk9IjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTI4IDRINHYyNGgyNFY0WiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIiBmaWxsPSIjMTYxRDI0Ij48cGF0aCBkPSJNMjYgMTUuMjVINnYxLjVoMjB2LTEuNVoiLz48cGF0aCBkPSJNMTUuMzExIDUuOTM3IDYgMTUuMjVsMS4wNiAxLjA2IDkuMzEzLTkuMzEyLTEuMDYtMS4wNloiLz48cGF0aCBkPSJtMTYuMzggMjUuMDEtOS4zMi05LjMyTDYgMTYuNzVoMi4xMnYyLjEybDcuMiA3LjIgMS4wNi0xLjA2WiIvPjwvZz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDQpIiBkPSJNMCAwaDI0djI0SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+); }
    header .bottom_menu a:nth-of-type(2) i { background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PG1hc2sgaWQ9ImEiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik0yNCAwSDB2MjRoMjRWMFoiIGZpbGw9IiNmZmYiLz48L21hc2s+PGcgbWFzaz0idXJsKCNhKSI+PHBhdGggZD0iTTIwLjAxIDE5LjQyaC03LjI2di00LjQ0aC0xLjV2NC40NEgzLjUxdi03LjI1bDguMTMtOC4xNS4zNi0uMzUgOC41IDguNDhWMTkuNDJIMjJ2LTcuODlMMTIgMS41NWwtMS40MiAxLjQxLTguNTcgOC41OVYyMC45MkgyMC41di0xLjVoLS40OVoiIGZpbGw9IiMxNjFEMjQiLz48L2c+PC9zdmc+); }
    header .bottom_menu a:nth-of-type(3) i { background-image: url(/storage/common/search.svg); }
    header .bottom_menu a:nth-of-type(4) i { background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PG1hc2sgaWQ9ImEiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik0yNC43NyAwaC0yNHYyNGgyNFYwWiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2EpIiBmaWxsPSIjMTYxRDI0Ij48cGF0aCBkPSJNMTIuNzcgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41cy0xLjU3IDMuNS0zLjUgMy41LTMuNS0xLjU3LTMuNS0zLjUgMS41Ny0zLjUgMy41LTMuNVptMC0xLjVjLTIuNzYgMC01IDIuMjQtNSA1czIuMjQgNSA1IDUgNS0yLjI0IDUtNS0yLjI0LTUtNS01Wk0yMC4yNyAxNC4yaC0xNXYxLjVoMTV2LTEuNVpNNS4yNyAyMnYtNi4yOWgtMS41VjIyaDEuNVpNMjEuNzcgMjJ2LTYuMjloLTEuNVYyMmgxLjVaIi8+PC9nPjwvc3ZnPg==); }
    header .bottom_menu a:nth-of-type(5) i { background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBkPSJNMTkuODIgNi4wNmgtM3YtLjEyYzAtMi4xNy0xLjc2LTMuOTQtMy45NC0zLjk0LTIuMTggMC0zLjk0IDEuNzYtMy45NCAzLjk0di4xM0g1LjgyTDMuOSAyMi4wNGwxNi40My0uMDItLjE5LTEuNS0xNC41NS4wMkw3LjE0IDcuNThoMTEuMzVsMS42NSAxMi45NmgxLjUxTDE5LjgxIDYuMDhsLjAxLS4wMlptLTQuNTEgMGgtNC44OHYtLjEyYzAtMS4zNCAxLjA5LTIuNDQgMi40NC0yLjQ0IDEuMzUgMCAyLjQ0IDEuMDkgMi40NCAyLjQ0di4xMloiIGZpbGw9IiMxNjFEMjQiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjkgMikiIGQ9Ik0wIDBoMTcuNzZ2MjAuMDRIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=); }
    header .bottom_menu a:nth-of-type(6) i { background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI5LjUiIHN0cm9rZT0iIzE2MUQyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMTIgN3Y1LjI1bDMuNSAyIiBzdHJva2U9IiMxNjFEMjQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=); }
    header .bottom_menu a p { font-weight:700; }
}
</style>
