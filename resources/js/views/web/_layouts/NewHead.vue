<template>
<div id="header" :class="{headerFix:headerFix}">
    <div v-if="user && user.is_admin" class="admin">
        <router-link v-if="this.$store.state.common.deviceType === 'mobile'" :to="{name: 'adm_order_index'}" target="_blank">{{ trans().admin.btn_title }}</router-link>
        <router-link v-else :to="{name: 'adm_main'}" target="_blank">{{ trans().admin.btn_title }}</router-link>
        <router-link v-if="this.$route.name === 'goods_show'" target="_blank"
            :to="{name: 'adm_goods_edit', params: { gd_id:this.$route.params.gd_id }}"
        >상품관리</router-link>     
    </div>
    <div id="core" class="layout">
        <b-link class="logo" :to="{name: 'main'}">
            <b-img :src="`/storage/common/logo/logo.png`" />
        </b-link>
        
        <nav>
            <div class="nav_left">
                <b-link id="cate_btn" @click="view_cate = !view_cate">
                    <b-img :src="`/storage/common/icon_category.png`" class="m_show"></b-img><span>카테고리</span>
                    <categorys v-if="view_cate" :class="{view_cate:view_cate}" @close_cate="view_cate=false"></categorys>
                </b-link>
                <b-link to="/shop/listing/today_pick_up/all">당일출고</b-link>
                <b-link :to="{name: 'rental'}" class="m_hide">렌탈</b-link>
                <b-link :to="{name: 'outlet'}" class="m_hide">전문관</b-link>
                <b-link :to="{name: 'cscenter'}">고객센터</b-link>
                <b-link :to="{name: 'bo_intro'}">커뮤니티</b-link>
            </div>
           
            

            <div class="nav_right">
                <b-form @submit.prevent="routerPush">
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
                        <b-img :src="`/storage/common/icon_login.png`"></b-img>  <p>로그아웃</p>
                    </b-link>
                    <b-link :to="{name: 'mypage'}">
                        <b-img :src="`/storage/common/icon_mypage.png`"></b-img> <p>마이페이지</p>
                    </b-link>
                    <b-link :to="{name: 'estimate_create'}">
                        <b-img :src="`/storage/common/icon_mypage.png`"></b-img> <p>견적요청</p>
                    </b-link>
                    <b-link :to="{name: 'my_order'}">
                        <b-img :src="`/storage/common/icon_mypage.png`"></b-img> <p>주문배송</p>
                    </b-link>
                    <b-link :to="{name:'cart_index'}">
                        <b-img :src="`/storage/common/icon_cart.png`"></b-img>   <p>장바구니</p>
                    </b-link>
                </template>
                <template v-else>
                    <b-link @click="isModalViewed=true">
                        <b-img :src="`/storage/common/icon_login.png`"></b-img>  <p>로그인</p>
                    </b-link>
                </template>
                <b-link href="https://pf.kakao.com/_AxmKUj" target='_blank' class="kakao"><b-img :src="`/storage/common/kakao.png`"></b-img></b-link>
            </div>
        </nav>

       
    </div>
    <div class="sm_view">
        <!-- <b-link @click="view_cate=!view_cate"><font-awesome-icon icon="sitemap" /></b-link>
        <b-link @click="view_nav=!view_nav"><b-icon-grid3x3-gap-fill /></b-link> -->
        <b-link @click="$router.go(-1)"><b-icon-arrow-left></b-icon-arrow-left></b-link>
        <b-link :to="{name: 'main'}"><b-icon-house-door-fill></b-icon-house-door-fill></b-link>
        <b-link @click="view_sch=!view_sch"><b-icon-search></b-icon-search></b-link>
        <b-link :to="{name: 'login'}"><b-img :src="`/storage/common/icon_mypage.gif`" width="35"></b-img><!-- <b-icon-person-fill /> --></b-link>
        <b-link :to="{name: 'cart_index'}"><b-icon-basket3-fill></b-icon-basket3-fill></b-link>
        <b-link v-if="list.length" @click="$store.commit('recent_goods/switch', { recent_goods_view:!recent_goods_view })"><b-icon-clock-fill /></b-link>
    </div>
    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500" :min_height="560" :padding="0" >
            <template slot="header"><div class="modal_login">로그인</div></template>
            <login-pop-up @close-modal="isModalViewed = false"></login-pop-up>
        </modal>
    </transition>
</div>
</template>

<script>
import LoginPopUp from '../auth/Login.vue';
import { mapState, mapGetters } from 'vuex'


export default {
    name: 'Header',
    components: {
        'login-pop-up': LoginPopUp,
        'modal'     :   () => import('@/views/_common/Modal'),
        'categorys':    () => import('../_module/category/Cate.vue'),
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
            if ( this.$route.name == 'goods_index' ) {
                this.$store.commit('goods/setFrm', {
                    ca01:this.$route.query.ca01 ?? 0,
                    ca02:this.$route.query.ca02 ?? 0,
                    ca03:this.$route.query.ca03 ?? 0,
                    ca04:this.$route.query.ca04 ?? 0,
                    mk_id:this.$route.query.mk_id ?? 0,
                    mode:this.$route.query.mode ?? "",
                    keyword:this.$route.query.keyword ?? "",
                    keyword_extra:this.$route.query.keyword_extra ?? "",
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
        ...mapState('recent_goods', ['recent_goods_view', 'list']),
    },
    methods:{
        logout() { this.$store.dispatch('auth/logout'); },
        routerPush(){
            if(this.frm.keyword == '') {
                Notify.modal('검색어를 입력하세요.', 'warning');
                return false;
            }
            this.$store.dispatch('goods/routerPush', 'new');
        },
        onScroll(e) { this.headerFix = window.top.scrollY > 10; },
        
        strongReload(url){ if(url!='') window.location.href = url; },
    },
    mounted() { window.addEventListener("scroll", this.onScroll); },
    beforeDestroy() { window.removeEventListener("scroll", this.onScroll) },
}
</script>

<style lang="css" scoped>
#header { border-bottom:1px solid #CCCCCC; padding-bottom:10px; }

#header #core .logo { display:inline-block; width:220px; padding:27px 0 0 27px; }
#header #core .logo img { width:100%; }
#header #core nav { display:flex; align-items:flex-end; }
#header #core nav>div { flex-basis:0; flex-grow:1; max-width:100%; width:100%; }
#header #core nav div a { color:#727273; }

#header #core nav .nav_left a { padding:0 10px; font-size:13px; }
#header #core nav .nav_left a:first-child { background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%23595758%27%20stroke-width%3D%271.2%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat; background-position: right 12px center; padding-right: 23px; }


#header #core nav .nav_right form { position:relative; display:flex; width:44%; border:1px solid #595758; border-radius:10px; }
#header #core nav .nav_right form select { width:80px; border:0; background:transparent; 
    background-repeat:no-repeat; background-position:right 10px center; background-size:12px;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27292.4%27%20height%3D%27292.4%27%3E%3Cpath%20fill%3D%27%23595758%27%20d%3D%27M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%27%2F%3E%3C%2Fsvg%3E");
}
#header #core nav .nav_right form input { border:0; background:transparent; }
#header #core nav .nav_right form button { position:absolute; right:6px; top:50%; transform:translateY(-50%); border:0; background:transparent; }
#header #core nav .nav_right { display:flex; justify-content:flex-end; align-items:center; }
#header #core nav .nav_right a { flex-basis:0; flex-grow:1; max-width:68px; width:68px; text-align:center; }
#header #core nav .nav_right a img { max-width:44px; }
#header #core nav .nav_right a p { margin:0; font-size:12px;  }

#header .sm_view { display:none; }

@media (max-width: 992px){
    #header .sm_view { position:fixed; bottom:0; display:flex; z-index:100; background:#DDD; width:100%; border-radius:2em 2em 0 0;}
    #header .sm_view a { flex-basis:0; flex-grow:1; max-width:100%; font-size:2em; text-align:center; }
}
</style>
