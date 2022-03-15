<template>

<header id="header" class="bg-info">
    <div class="container">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand :to="{name: 'main'}" style="font-size:3rem; font-weight:bold; margin-right:2rem; font-style:italic;">

                <div id="cube_logo">
                    <div class="cube-wrap">
                        <div class="box">
                            <div class="single-box side-back"></div>
                            <div class="single-box side-top"></div>
                            <div class="single-box side-bottom"></div>
                            <div class="single-box side-left"></div>
                            <div class="single-box side-right"></div>
                            <div class="single-box side-front"></div>
                        </div>
                    </div>
                </div>

                <kinesis-container class="logo">
                    <kinesis-element class="circle circle-green" transformOrigin="center center" :strength="30"></kinesis-element>
                    <kinesis-element class="circle circle-orange" transformOrigin="center center" :strength="-20"></kinesis-element>
                    <kinesis-element class="circle circle-red" transformOrigin="center center" :strength="20"></kinesis-element>
                    <h1>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-5" type="translate">ㅍ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="15" type="rotate">ㄴ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-5" type="translate">ㅅ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="15" type="rotate">ㄴ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="5" type="translate">ㅇ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-3.5" type="scaleX">ㄴ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-25" type="rotate">ㅇ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-5" type="rotate">ㄱ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="25" type="rotate">ㄴ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-5" type="rotate">ㅅ</kinesis-element>
                        <kinesis-element tag="span" transformOrigin="center center" :strength="-3.5" type="scaleY">ㄴ</kinesis-element>
                    </h1>
                </kinesis-container>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" class="" is-nav>
                <b-navbar-nav class="mr-auto">
                    <!-- <li class="nav-item" @mouseenter="cateMouseSwitch" @mouseleave="cateMouseSwitch"> -->
                    <li class="nav-item"
                        @mouseenter="sub_show = true"
                        @mouseleave="sub_show = false">
                    <!-- <li class="nav-item" @click="sub_show = !sub_show"> -->
                        <a class="nav-link" href="#">카테고리</a>
                        <categorys :sub_show="sub_show" />
                    </li>
                    <b-nav-item :to="{name: 'estimate_create'}" active-class="active" exact>견적요청</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="">
                    <b-nav-item-dropdown>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>게시판</em>
                        </template>
                        <b-dropdown-item :to="{name: 'bo_index', params: { bo_cd:'notice' }}">공지사항</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'bo_index', params: { bo_cd:'normal' }}">일반게시판</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'bo_index', params: { bo_cd:'photo' }}">포토 게시판</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                    <b-nav-item :to="{name: 'adm_main'}" active-class="active" exact>관리자</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="isLoggedin">{{user.name}}</b-nav-item>
                    <b-nav-item-dropdown right v-if="isLoggedin">

                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-navbar-nav v-else>
                        <b-button variant="info" @click="loginView">Login</b-button>
                        <b-modal id="login-modal" centered hide-footer title="Login">
                            <LoginPopUp ref="login" />
                        </b-modal>
                    </b-navbar-nav>

                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

    <Cart v-if="cartComponentConnector" /> <!-- 장바구니 -->

</header>
</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import LoginPopUp from '../auth/Login.vue';
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: 'Header',
    data() {
        return {
            sub_show:false,
        }
    },
    components: {
        KinesisContainer,
        KinesisElement, // https://github.com/Aminerman/vue-kinesis
        LoginPopUp,
        // 'Categorys': () => import('../_module/category/Index.vue'),
        // <categorys :cateOpen="cateOpen"></categorys>
        'Categorys': () => import('../_module/category/Cate.vue'),
        'Cart': () => import('../_module/cart/Cart.vue'),
    },
    computed: {
        cartComponentConnector(){
            return this.$route.name !== 'order_show';
        },
        ...mapGetters({
            isLoggedin: 'auth/isLoggedin',
            user: 'auth/user',
        })
    },
    methods:{
        loginView(){
            this.$bvModal.show('login-modal')
        },
        logout() {
            this.$store.dispatch('auth/logout');
        },
    },
}
</script>

<style>
.logo { display: flex; flex-direction: column; justify-content:center; align-items:center; height:5vh; position:relative; }
.logo .circle { border-radius: 100%; position: absolute; }
.logo .circle.circle-green {background-color:#ffb8b8; width:0.5vw; height:0.5vw; right:20%; top:90%}
.logo .circle.circle-orange { border:15px solid #d6ceff; width:0.8vw; height:0.8vw; left:20%; top:60%}
.logo .circle.circle-red {background-color:#faeaea; width:1vw; height:1vw; left:-4.8vw; top:25%}
.logo h1 {position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;color:#351b1b;font-size:32px}
.logo h1 span:first-of-type{ margin-top:0}
.logo h1 span:nth-of-type(2){ margin-top:17px; margin-left:-27px; }
.logo h1 span:nth-of-type(3){ margin-top:6px; margin-left:-6px; }
.logo h1 span:nth-of-type(4){ margin-top:10px; margin-left:-10px; }
.logo h1 span:nth-of-type(5){ margin-left:-8px; }
.logo h1 span:nth-of-type(6){ margin-left:-12px; transform: rotateY( 73deg ); }
.logo h1 span:nth-of-type(7){ margin-top:0; margin-left:-17px; }
.logo h1 span:nth-of-type(8){ margin-top:6px; margin-left:-23px;}
.logo h1 span:nth-of-type(9){ margin-top:13px; margin-left:-28px;}
.logo h1 span:nth-of-type(10){}
.logo h1 span:nth-of-type(11){margin-top:6px; margin-left:-32px; transform:scaleX(2) rotateX(80deg); }

#cube_logo { position:absolute; top:66px; left:-13%; transform: rotate( -6deg ); z-index:1; }
#cube_logo .cube-wrap { width:130px; height:80px; -webkit-perspective: 2000px; -webkit-perspective-origin: 50% -500px; }
#cube_logo .cube-wrap .box { -webkit-transform-style: preserve-3d; -webkit-animation: rotate 10s infinite linear; }
#cube_logo .cube-wrap .box .single-box {
    background-color:#fff; background-size: cover; border:1px solid #666;
    display: block; position: absolute; width:120px; height:72px;
    -webkit-transform: rotateY(45deg) translateZ(-200px) rotateX(15deg); -webkit-transform-origin: 50% 50% 0; }
#cube_logo .cube-wrap .box .side-front { -webkit-transform: translateZ(60px); background-image:url(/img/common/logo01.png); }
#cube_logo .cube-wrap .box .side-back { -webkit-transform: rotateY(180deg) translateZ(60px); background-image:url(/img/common/logo01.png); }
#cube_logo .cube-wrap .box .side-top { -webkit-transform: rotateX(90deg) translateZ(60px); height:120px; }
#cube_logo .cube-wrap .box .side-bottom { -webkit-transform: rotateX(-90deg) translateZ(36px); }
#cube_logo .cube-wrap .box .side-left { -webkit-transform: rotateY(-90deg) translateZ(60px); background-image:url(/img/common/logo02.png); }
#cube_logo .cube-wrap .box .side-right { -webkit-transform: rotateY(90deg) translateZ(60px); background-image:url(/img/common/logo02.png); }
@-webkit-keyframes rotate { 0% { -webkit-transform: rotateY(0deg); } 100% { -webkit-transform: rotateY(-360deg); } }
/*
#cube_logo { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); }
#cube_logo .cube-wrap { width: 400px; height: 400px; -webkit-perspective: 2000px; -webkit-perspective-origin: 50% -500px; }
#cube_logo .cube-wrap .box { -webkit-transform-style: preserve-3d; -webkit-animation: rotate 10s infinite linear; }
#cube_logo .cube-wrap .box .single-box {
    background-image: url(https://i.postimg.cc/4Nwn4CfF/1.jpg); background-size: cover; background-color: #60c2ef; border: 3px solid #fff;
    display: block; position: absolute; width: 360px; height: 360px;
    -webkit-transform: rotateY(45deg) translateZ(-200px) rotateX(15deg); -webkit-transform-origin: 50% 50% 0; }
#cube_logo .cube-wrap .box .side-front { -webkit-transform: translateZ(180px); }
#cube_logo .cube-wrap .box .side-back { -webkit-transform: rotateY(180deg) translateZ(180px); }
#cube_logo .cube-wrap .box .side-top { background-image: url(https://i.postimg.cc/4Nwn4CfF/1.jpg); -webkit-transform: rotateX(90deg) translateZ(180px); }
#cube_logo .cube-wrap .box .side-bottom { -webkit-transform: rotateX(-90deg) translateZ(180px); }
#cube_logo .cube-wrap .box .side-left { -webkit-transform: rotateY(-90deg) translateZ(180px); }
#cube_logo .cube-wrap .box .side-right { -webkit-transform: rotateY(90deg) translateZ(180px); }
@-webkit-keyframes rotate { 0% { -webkit-transform: rotateY(0); } 100% { -webkit-transform: rotateY(360deg); } }
*/















/*
<div class="wrapper">
      <div class="cube-wrap">
        <div class="box">
          <div class="single-box side-back"></div>
          <div class="single-box side-top"></div>
          <div class="single-box side-bottom"></div>
          <div class="single-box side-left"></div>
          <div class="single-box side-right"></div>
          <div class="single-box side-front"></div>
        </div>
      </div>
    </div>


body{
    background: #F7C339;
}
.wrapper{
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
}
.cube-wrap {
width: 400px;
height: 400px;
-webkit-perspective: 2000px;
-webkit-perspective-origin: 50% -500px;
}
.single-box {
background-image: url(https://i.postimg.cc/4Nwn4CfF/1.jpg);
background-size: cover;
display: block;
position: absolute;
width: 360px;
height: 360px;
background-color: #60c2ef;
-webkit-transform: rotateY(45deg) translateZ(-200px) rotateX(15deg);
-webkit-transform-origin: 50% 50% 0;
border: 3px solid #fff;
}
.box {
-webkit-transform-style: preserve-3d;
-webkit-animation: rotate 10s infinite linear;
}
.side-front {
-webkit-transform: translateZ(180px);
}
.side-back {
-webkit-transform: rotateY(180deg) translateZ(180px);
}
.side-top {
background-image: url(https://i.postimg.cc/4Nwn4CfF/1.jpg);
-webkit-transform: rotateX(90deg) translateZ(180px);
}
.side-bottom {
-webkit-transform: rotateX(-90deg) translateZ(180px);
}
.side-left {
-webkit-transform: rotateY(-90deg) translateZ(180px);
}
.side-right {
-webkit-transform: rotateY(90deg) translateZ(180px);
}

@-webkit-keyframes rotate {
0% { -webkit-transform: rotateY(0); }
100% { -webkit-transform: rotateY(360deg); }
} */

</style>
