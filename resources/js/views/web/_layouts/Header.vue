<template>
<div id="header" :class="{headerFix:headerFix}">
    <div v-if="user && user.is_admin" class="admin">
        <router-link :to="{name: 'adm_main'}" target="_blank">{{ trans().admin.btn_title }}</router-link>
        <router-link v-if="this.$route.name === 'goods_show'" target="_blank"
            :to="{name: 'adm_goods_edit', params: { gd_id:this.$route.params.gd_id }}"
        >상품관리</router-link>
        <!-- <router-link v-if="user.is_super" :to="{name: 'listing_sale'}">S</router-link> -->

        <select v-if="user.is_super" @change="strongReload($event.target.value)">
            <option value="">외국어</option>
            <option v-if="this.$store.state.common.siteInfo.locale == 'ko'" value="/language/en">English</option>
            <option v-else value="/language/ko">한국어</option>
        </select>
    </div>
    <div id="afterimage"></div>
    <div id="core">
        <div class="the_top layout">
            <b-link class="logo" :to="{name: 'main'}">
                <b-img :src="`/storage/common/logo/logo.png`" />
                <!-- <b-img :src="`/storage/common/logo/logo_231220.gif`" class="season" />
                <b-img :src="`/storage/common/logo/logo.png`" class="default" /> -->
            </b-link>
            
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
   
            <div class="top_menu">
                <template v-if="isLoggedin">
                    <b-link @click="logout">
                        <b-img :src="`/storage/common/icon_login.png`" />
                        <p>로그아웃</p>
                    </b-link>
                    <b-link :to="{name: 'mypage'}">
                        <b-img :src="`/storage/common/icon_mypage.png`" />
                        <p>마이페이지</p>
                    </b-link>
                    <b-link :to="{name:'cart_index'}">
                        <b-img :src="`/storage/common/icon_cart.png`" />
                        <p>장바구니</p>
                    </b-link>
                </template>
                <template v-else>
                    <b-link @click="isModalViewed=true">
                        <b-img :src="`/storage/common/icon_login.png`" />
                        <p>로그인</p>
                    </b-link>
                </template>
            </div>
            
            <b-link href="https://pf.kakao.com/_AxmKUj" target='_blank' class="kakao"><b-img :src="`/storage/common/kakao.png`" /></b-link>
            
        </div>
        <nav class="nav_menu" :class="{view_nav:view_nav}">
            <div class="layout">
                <b-link id="cate_btn" @click="view_cate = !view_cate">
                    <b-img :src="`/storage/common/icon_category.png`" /><span class="m_hide"> 카테고리</span>
                    <categorys v-if="view_cate" :class="{view_cate:view_cate}" @close_cate="view_cate=false"></categorys>
                </b-link>
                <b-link to="/shop/listing/today_pick_up/all">당일출고</b-link>
                <b-link :to="{name: 'estimate_create'}">견적요청</b-link>
                <b-link :to="{name: 'engReform_create'}">영문교정</b-link>
                <b-link :to="{name: 'rental'}" class="m_hide">렌탈</b-link>
                <b-link :to="{name: 'outlet'}" class="m_hide">전문관</b-link>
                <b-link :to="{name: 'cscenter'}">고객센터</b-link>
                <b-link :to="{name: 'bo_intro'}">커뮤니티</b-link>
            </div>
        </nav>
    </div>
    <div class="sm_view">
        <!-- <b-link @click="view_cate=!view_cate"><font-awesome-icon icon="sitemap" /></b-link>
        <b-link @click="view_nav=!view_nav"><b-icon-grid3x3-gap-fill /></b-link> -->
        <b-link @click="$router.go(-1)"><b-icon-arrow-left /></b-link>
        <b-link :to="{name: 'main'}"><b-icon-house-door-fill /></b-link>
        <b-link @click="view_sch=!view_sch"><b-icon-search /></b-link>
        <b-link :to="{name: 'login'}"><b-img :src="`/storage/common/icon_mypage.gif`" width="35" /><!-- <b-icon-person-fill /> --></b-link>
        <b-link :to="{name: 'cart_index'}"><b-icon-basket3-fill /></b-link>
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
import { mapActions, mapState, mapGetters } from 'vuex'



// 네이버 Papago Text Translation API 예제
// var express = require('express');
// var app = express();

//     request.post(options, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//         res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
//         res.end(body);
//         } else {
//         res.status(response.statusCode).end();
//         console.log('error = ' + response.statusCode);
//         }
//     });
// });
// app.listen(3000, function() {
//     console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
// });



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


#header { background-color:#FFF; }
/* #header #core { background:#0098FF url(/storage/common/logo/230725.gif) no-repeat center 16px; } */
#header #core .the_top { position:relative; display:flex; align-items:flex-end; height:6.625em; padding-bottom:.75em; }
#header #core .the_top>* { flex-basis:0; flex-grow:1; max-width:100%; }
/*#header #core .layout .logo { flex:0 0 250px; max-width:250px; height:72px; background:top left/238px 72px no-repeat url('/storage/common/logo/logo.png'); } */
/*#header #core .layout .logo { flex:0 0 292px; max-width:292px; height:100%; position:relative; display:block;}*/
#header #core .the_top .logo { flex:0 0 28.533333%; max-width:28.533333%; }
#header #core .the_top .logo .season { display:block; width:100%; }
#header #core .the_top .logo .season { transform:translateY(32px); max-width:400px; }
#header #core .the_top .logo .default { display:none; }
#header #core .the_top .top_menu { margin-bottom:3px; text-align:right; }
#header #core .the_top .top_menu a { display:inline-block; text-align:center; padding: 0 0.4em; font-size:.8em; font-weight:600; }
#header #core .the_top .top_menu a p { margin:.5em 0 0 0; }

#header #core .the_top .head_sch_box { flex:0 0 42.8%; max-width:42.8%; margin-bottom:8px; }
#header #core .the_top .head_sch_box .head_sch { display:flex; flex-flow:row wrap; align-items:center; background-color:#1A90D6; color:#FFF; padding:3px; border-radius:26px; transition:all .3s; }
#header #core .the_top .head_sch_box .head_sch select { width:auto; min-width:6em; border-radius:17px 0 0 17px; height:36px; padding:.3em 1.6em 0.3em 1em; font-size:.9em; border-width:0; background:#fff url(/storage/common/arrow_dn.gif)  no-repeat right 8px center; }
#header #core .the_top .head_sch_box .head_sch input { width:auto; border:none; border-radius:0 18px 18px 0; padding: 0.4em 1em; font-size:1.2em; height:36px; margin-left:.17em; flex-grow:1; }
#header #core .the_top .head_sch_box .head_sch input:focus { outline:0; }
#header #core .the_top .head_sch_box .head_sch button { width:auto; padding:.2em 1em 0 .75em; border-radius:0 18px 18px 0; background-color:#1A90D6; border-width:0; }
#header #core .the_top .head_sch_box .head_sch button svg { font-size:1.4em; }

#header #core .the_top .kakao { position:absolute; bottom:1.2em; right:-77px; width:56px; }
#header #core .the_top .kakao img { width: 100%; }

#header #core .nav_menu { background:#626C75; position:relative; }
#header #core .nav_menu .layout { display:flex; }
#header #core .nav_menu .layout a { flex-basis:0; flex-grow:1; max-width:100%; font-weight:600; line-height:3.125em; color:#FFF; text-align:center; }
#header #core .nav_menu .layout a:not(#cate_btn):hover { color:#F8931D; font-weight:900; }
#header #core .nav_menu .layout #cate_btn { background-color:#1A90D6; flex:0 0 11.25em; max-width:11.25em; text-align:left; }
#header #core .nav_menu .layout #cate_btn>img { margin-left:.4em; }

#header .admin { position:absolute; top:0; left:50%; transform:translateX(-50%); z-index: 1; }
#header .admin a { display:inline-block; background-color:#ff4d00; padding:3px 10px; border-radius:0 0 10px 10px; color:#fff; font-weight:bold; text-align:center; }


#header.headerFix #afterimage { height:156px; }
#header.headerFix #core { position:fixed; z-index:17; top:0; width:100%; background:inherit; }


#header .sm_view { display:none; }

@media (max-width: 992px){
    #header { font-size:12px; }
    #header.headerFix #afterimage { height:100px; }
    #header #core { background:none; }    
    #header #core .the_top { height:5em; justify-content:center; }
    #header #core .the_top .logo { flex:0 0 132px; max-width:132px; margin-top:1em; }
    #header #core .the_top .logo img { width:100%; }
    #header #core .the_top .logo .season { display:none; }
    #header #core .the_top .logo .default { display:block; width:100%; }
    #header #core .the_top .top_menu { display:none; }
    
    #header #core .nav_menu .layout #cate_btn { flex:0 0 3.25em; max-width:3.25em; text-align: center; }
    #header #core .nav_menu .layout #cate_btn>img  { margin-left:0; }

    #header .sm_view { position:fixed; bottom:0; display:flex; z-index:100; background:#DDD; width:100%; border-radius:2em 2em 0 0;}
    #header .sm_view a { flex-basis:0; flex-grow:1; max-width:100%; font-size:2em; text-align:center; }    
    
    #header #core .the_top .nav_menu { position:fixed; bottom:48px; border-radius:1em 1em 0 0; background:#DDD; z-index:1; width:100%; display:flex; max-height:0; transition:max-height .2s; overflow:hidden;  }
    #header #core .the_top .nav_menu a { text-align:center; flex-basis:0; flex-grow:1; padding:8px 10px; font-size:.95em; }
    #header #core .the_top .nav_menu.view_nav { max-height:60px; }

    #header #core .the_top .head_sch_box { width:85%; max-width:85%; position:absolute; top:0; z-index:17; left:50%; transform:translateX(-50%); max-height:0; transition:max-height .2s; overflow:hidden; }
    #header #core .the_top .head_sch_box.view_sch { max-height:50px; }
    #header #core .the_top .head_sch_box .head_sch { min-width:0; }
    #header #core .the_top .head_sch_box .head_sch select { display:none; }
    #header #core .the_top .head_sch_box .head_sch input { border-radius:18px; width:78%; }
    #header #core .the_top .head_sch_box .head_sch button { padding: 0 10px; }
    
    #header #core>>>#categorys .depth01>li>ul {  overflow:hidden; padding:0; border-width:0; max-width:0; max-height:0; transition:all .2s; }
    #header #core>>>#categorys.view_cate .depth01>li>ul { padding:.5em; border-width:2px; max-width:240px; max-height:640px; }
}

</style>
