<template>
    <b-container id="mypage">
        <h2>마이페이지</h2>
        <b-row class="top">
            <b-col class="name">
                <b>{{user.name}}</b> 님
                <p>{{user.email}}</p>
            </b-col>
            <b-col class="rank">
                <p>나의 등급</p>
                <b>
                    <template v-if="user.level == 1">       일반</template>
                    <template v-else-if="user.level == 2">  브론즈</template>
                    <template v-else-if="user.level == 3">  실버</template>
                    <template v-else-if="user.level == 4">  골드</template>
                    <template v-else-if="user.level == 5">  다이아</template>
                    <template v-else-if="user.level == 11"> 딜러</template>
                    <template v-else-if="user.level == 13"> 실버딜러</template>
                    <template v-else-if="user.level == 14"> 골드딜러</template>
                    <template v-else-if="user.level > 14">  킹왕짱</template>
                </b>
                <b-link to="/cscenter?view_type=membership">혜택 보러가기 ></b-link>
            </b-col>
            <b-col>
                <p>나의 마일리지</p>
                <b>{{enableMileage}} <small>P</small></b> 
                <b-link to="/mypage/mileage">어떻게 사용하시나요? ></b-link>
            </b-col>
            <b-col>
                <p>내가 찜한 상품</p>
                <b-link :to="{name:'my_wish'}"><b>{{cnt_wish}} <small>개</small></b></b-link>
            </b-col>
            <b-col class="od_step">
                <p>나의 주문 건</p>
                <ul>
                    <li><b-link :to="{name:'my_order'}" v-if="od_step1019">{{od_step1019}}</b-link><img :src="`${s3url}mypage/step01.png`" />주문접수</li>
                    <li><b-link :to="{name:'my_order'}" v-if="cnt_od_step[20]">{{cnt_od_step[20]}}</b-link><img :src="`${s3url}mypage/step02.png`" />결제완료</li>
                    <li><b-link :to="{name:'my_order'}" v-if="cnt_od_step[30]">{{cnt_od_step[30]}}</b-link><img :src="`${s3url}mypage/step03.png`" />상품준비중</li>
                    <li><b-link :to="{name:'my_order'}" v-if="cnt_od_step[40]">{{cnt_od_step[40]}}</b-link><img :src="`${s3url}mypage/step04.png`" />배송중</li>
                    <li><b-link :to="{name:'my_order'}" v-if="cnt_od_step[50]">{{cnt_od_step[50]}}</b-link><img :src="`${s3url}mypage/step05.png`" />배송완료</li>
                </ul>
            </b-col>
        </b-row>
        <b-row class="middle">
            <b-col class="left">
                <b-button v-b-toggle.mymenu id="menu_btn" size="sm">Menu</b-button>

                <b-sidebar id="mymenu" title="My Page" :backdrop-variant="'info'" backdrop shadow>
                    <ul class="nav">
                        <li>
                            <h5 v-b-toggle.shop_list>나의 구매내역</h5>
                            <b-collapse visible id="shop_list">
                                <b-link :to="{name:'my_order'}">주문/배송 조회</b-link>
                                <b-link :to="{name:'my_estimate'}">견적서 조회</b-link>
                                <b-link :to="{name:'my_bought'}">구매상품 목록</b-link>                                
                            </b-collapse>
                        </li>
                        <li>
                            <h5 v-b-toggle.bo_list>나의 게시물</h5>
                            <b-collapse visible id="bo_list">
                                <b-link :to="{name:'my_bo_index', params: { bo_cd:'inquiry' }}">1:1 문의</b-link>
                                <b-link :to="{name:'my_bo_index', params: { bo_cd:'as' }}">A/S 신청</b-link>
                                <b-link :to="{name:'my_bo_index', params: { bo_cd:'cancel' }}">취소/교환</b-link>
                                <b-link :to="{name:'my_bo_index', params: { bo_cd:'goods' }}">상품문의</b-link>
                                <b-link :to="{name:'my_eng_reform_index'}">영문교정</b-link>
                            </b-collapse>
                        </li>
                        <li>
                            <h5><b-link to="/mypage/print">서류 출력</b-link></h5>
                        </li>
                        <li>
                            <h5 v-b-toggle.info_list>나의 정보관리</h5>
                            <b-collapse visible id="info_list">
                                <b-link to="/mypage/user/edit">회원정보 수정</b-link>
                                <b-link to="/mypage/user/destroy">회원 탈퇴</b-link>
                            </b-collapse>
                        </li>
                    </ul>
                </b-sidebar>
            </b-col>

            <b-col class="mypage"><router-view></router-view></b-col>
        </b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: "Mypage",
    computed: {
        ...mapGetters({
            user: 'auth/user',
            enableMileage: 'auth/enableMileage',
        }),
        od_step1019: function () {
            return Number(this.cnt_od_step[10] ?? 0) + Number(this.cnt_od_step[11] ?? 0) + Number(this.cnt_od_step[12] ?? 0); 
        },
    },
    data() {
        return {
            cnt_wish:0,
            cnt_od_step:[],
        }
    },
    methods:{
        async getEnableMileage(){
            try {
                const res = await ax.get(`/api/mileage/enable`);
                if (res && res.status === 200) {
                    this.$store.commit("auth/setEnableMileage", res.data);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    async mounted() {
        // this.getEnableMileage();
        const res = await ax.get(`/api/mileage/enable`);
        if (res && res.status === 200) this.$store.commit("auth/setEnableMileage", res.data);
    
        const cnt_wish = await ax.get(`/api/shop/wish`, { params: {type:'cnt'}});
        if (cnt_wish && cnt_wish.status === 200) this.cnt_wish = cnt_wish.data;
        
        const cnt_od_step = await ax.get(`/api/shop/order/cnt_od_step`);
        if (cnt_od_step && cnt_od_step.status === 200) this.cnt_od_step = cnt_od_step.data;
        
    },
}
</script>

<style lang="css" scoped>
.container h2 { margin:2rem 1rem; font-weight:bold; }
#mypage .top { border:1px solid #9EA7B0; }
#mypage .top .col { height:142px; background:#B9C9D8; padding:1.5rem 0 0 2rem; color:#FFF; position:relative; }
#mypage .top .col p { font-size:.98rem; margin-bottom:1.3rem; font-weight:bold; }
#mypage .top .col b { font-size:1.6rem; color:#186CB4; font-weight:bold; line-height:1; }
#mypage .top .col b small { font-size:1.1rem; }
#mypage .top .col a { color:#FFF; display:block; margin-top:.25rem; font-size:.9rem; }

#mypage .top .col:nth-child(2):after,
#mypage .top .col:nth-child(3):after,
#mypage .top .col:nth-child(4):after { background:url(https://fourscience.s3.ap-northeast-2.amazonaws.com/mypage/divider.png) no-repeat 0px 0px; content:""; display:inline-block; height:163px; width:8px; position:absolute; top:3px; right:-4px; }

#mypage .top .name { flex-basis:200px; max-width:200px; background:#1A90D6; color:#FFF; text-align:center; padding:2.3rem 0 0; }
#mypage .top .name b { font-size:1.7rem; letter-spacing:.4rem; color:#FFF; display:inline-block; margin-bottom:1.1rem; font-weight:bold; }

#mypage .top .od_step { flex-basis:650px; max-width:650px; align-items:center; padding-right:2rem; }
#mypage .top .od_step p { margin-bottom:.1rem; }
#mypage .top .od_step ul { display:flex; }
#mypage .top .od_step ul li { text-align:center; font-size:.79rem; flex-grow:1; }
#mypage .top .od_step ul li { color:#fff; position:relative; }
#mypage .top .od_step ul li:not(:last-child) { margin-right:2rem; }
#mypage .top .od_step ul li:not(:last-child):after { content:'>'; color:#fff; position:absolute; right:-23px; top:10px; font-size:1.6rem; }
#mypage .top .od_step ul li a { position:absolute; top:-14px; right:0; background:#F5951A; color:#fff; border-radius:50%; width:27px; height:27px; font-size: 1.2rem; display:flex; justify-content:center; align-items:center; }
#mypage .top .od_step ul li img { display:block; margin:0 auto -.05rem auto; }

#mypage .middle .left { flex-basis:200px; max-width:200px; padding:0; }
#mypage .middle .left #menu_btn { margin:1rem; }
#mypage .middle .left .nav li { width:100%; border:1px solid #ddd; border-top-width:0; padding:1.1rem 0; }
#mypage .middle .left .nav li h5 { padding:.8rem 0 0 1rem; font-size:1.1rem; font-weight:bold; cursor:pointer; }
#mypage .middle .left .nav li div a { display:block; padding:.5rem 1rem; }
#mypage .middle .left .nav li div a:hover { background-color:#00ADBB; color:#fff; font-weight:bold; }
#mypage .middle .left .b-sidebar-outer { z-index:16; }



@media (max-width: 992px) {
    /*.left .b-sidebar-outer >>> .b-sidebar { display: none; }*/
}

@media (min-width: 992px) {
    #menu_btn { display:none; }
    .b-sidebar-outer { position:relative; height:100%; }
    .b-sidebar-outer >>> .b-sidebar-backdrop { display:none; }
    .b-sidebar-outer >>> .b-sidebar { position:relative; box-shadow: none !important; display:flex !important; background:none !important; height:100%; }
    .b-sidebar-outer >>> .b-sidebar .b-sidebar-header { display:none; }
}
</style>

<style lang="css">
#mypage .middle .mypage { padding:0 0 0 3rem ; }
#mypage .middle .mypage h5 { font-size:1.5rem; margin-top: 2.6rem; margin-bottom:1.2rem; font-weight:bold; }
#mypage .middle .mypage h5 small { font-size:.8rem; color:#777; margin-left:.3rem; }

#mypage .middle .list01 .data .col { padding:.7rem 0; }
#mypage .middle .list01 .data .product a { flex:0 0 100px; max-width:100px; margin:0 .6rem; }
#mypage .middle .list01 .data .product a div { font-size:.7rem; margin-top:.4rem; }
#mypage .middle .list01 .data .product .over_flow { display:flex; align-items:flex-end; }

.list01 .header { background-color:#ECECEC; border-top:2px solid #363636; border-bottom:1px solid #ACACAC; }
.list01 .header .col { font-weight:bold; font-size:.9rem; padding:.68rem 0; }
.list01 .data:not(:last-child) { border-bottom:1px solid #ddd; }


.list01 .row { align-items:center; }
.list01 .row .col { text-align:center; }
.list01 .row .chk { flex:0 0 7%; max-width:7%; }
.list01 .row .date { flex:0 0 10%; max-width:10%; }
.list01 .row .num { flex:0 0 12%; max-width:12%; }
.list01 .row .num .btn { padding:.13rem .6rem; font-size:.8rem; font-weight:bold; margin:.3rem auto; }
.list01 .row .price { flex:0 0 12%; max-width:12%; }
.list01 .row .step { flex:0 0 10%; max-width:10%;  }

.list01 .data .product { text-align:left; display:flex; }
.list01 .data .product a { display:inline-block; width:100px; min-height:140px; }
.list01 .data .product a img { border:1px solid #B1B1B1; width:100px; height:100px; object-fit:cover; transition: all .1s; }
.list01 .data .product a img:hover { border:4px solid black; border-radius:5px; } 
.list01 .data .product a div { white-space:normal; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }



@media (max-width: 768px) {
    .mypage .order .header { display:none; }
    .mypage .order .row .col { max-width:none !important; width:auto !important; }
    .mypage .order .row .col:nth-child(1) { flex-basis:100%; text-align:left; }
    .mypage .order .row .col:nth-child(2) { flex-basis:auto; }
    .mypage .order .row .col:nth-child(3) { flex-basis:60%; flex-grow:1; }
    .mypage .order .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; text-align:left; }
    .mypage .order .row .col:nth-child(5) { flex-basis:50%; flex-grow:0; text-align:right; }
}


@media (max-width: 768px) {
    .mypage .estimate .header { display:none; }
    .mypage .estimate .row .col { max-width:none !important; width:auto !important; }
    .mypage .estimate .row .col:nth-child(1) { flex-basis:100%; text-align:left; }
    .mypage .estimate .row .col:nth-child(2) { flex-basis:auto; }
    .mypage .estimate .row .col:nth-child(3) { flex-basis:60%; flex-grow:1; }
    .mypage .estimate .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; text-align:left; }
    .mypage .estimate .row .col:nth-child(5) { flex-basis:50%; flex-grow:0; text-align:right; }
}










/*
.order .header { background-color:#DDD; }
.order .header .col { font-weight:bold; }
.order .data { border-top:1px solid #ddd; }
.order .row .col { padding:.6rem 0; }
.order .row .col:nth-child(1) { flex:0 0 10%; max-width:10%; text-align:center; }
.order .row .col:nth-child(2) { flex:0 0 10%; max-width:10%; text-align:center; }
.order .row .col:nth-child(3) .btn { text-align:left; }
.order .row .col:nth-child(4) { flex:0 0 15%; max-width:15%; text-align:right; }
.order .row .col:nth-child(5) { flex:0 0 8%; max-width:8%; text-align:center; }
@media (max-width: 768px) {
    .order .header { display:none; }
    .order .row .col { max-width:none !important; width:auto !important; }
    .order .row .col:nth-child(1) { flex-basis:100%; text-align:left; }
    .order .row .col:nth-child(2) { flex-basis:auto; }
    .order .row .col:nth-child(3) { flex-basis:60%; flex-grow:1; }
    .order .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; text-align:left; }
    .order .row .col:nth-child(5) { flex-basis:50%; flex-grow:0; text-align:right; }
}
*/
</style>
