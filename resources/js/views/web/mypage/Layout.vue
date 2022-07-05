<template lang="html">
    <b-container>
        <b-row>
            <b-col lg="2" md="12" class="left">
                <b-button v-b-toggle.mymenu id="menu_btn" size="sm">Menu</b-button>

                <b-sidebar id="mymenu" title="My Page" :backdrop-variant="'info'" backdrop shadow>
                    <div class="myinfo">
                        <div class="name"><b>{{user.name}}</b> 님</div>
                        <div class="rank">
                            <template v-if="user.level == 1"><img src="/img/mypage/mb_mark_normal.png" /><b style="color:#6AA3B6;">일반</b></template>
                            <template v-else-if="user.level == 2"><img src="/img/mypage/mb_mark_bronze.png" /><b style="color:#E76344;">브론즈</b></template>
                            <template v-else-if="user.level == 3"><img src="/img/mypage/mb_mark_silver.png" /><b style="color:#D9D9D7;">실버</b></template>
                            <template v-else-if="user.level == 4"><img src="/img/mypage/mb_mark_gold.png" /><b style="color:#F4C34A;">골드</b></template>
                            <template v-else-if="user.level == 5"><img src="/img/mypage/mb_mark_diamond.png" /><b style="color:#D6D5D6;">다이아</b></template>
                            <template v-else-if="user.level == 11"><img src="/img/mypage/mb_mark_normal_d.png" /><b style="color:#6AA3B6;">딜러</b></template>
                            <template v-else-if="user.level == 13"><img src="/img/mypage/mb_mark_silver_d.png" /><b style="color:#D9D9D7;">실버딜러</b></template>
                            <template v-else-if="user.level == 14"><img src="/img/mypage/mb_mark_gold_d.png" /><b style="color:#F4C34A;">골드딜러</b></template>
                            <template v-else-if="user.level > 14"><b style="color:#00BF86;">킹왕짱</b></template>
                            등급
                        </div>
                        <div class="mileage">
                            마일리지 <b>{{enable_mileage}}</b>P
                        </div>
                    </div>

                    <ul class="nav">
                        <li>
                            <h5 v-b-toggle.shop_list>나의 쇼핑내역</h5>
                            <b-collapse visible id="shop_list">
                                <b-link :to="{name:'my_order'}">주문/배송 조회</b-link>
                                <b-link :to="{name:'my_estimate'}">견적서 조회</b-link>
                                <b-link :to="{name:'my_bought'}">구매상품 목록</b-link>
                                <b-link :to="{name:'my_wish'}">관심상품</b-link>
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
                            <b-link to="/mypage/mileage" router-tag="h5">마일리지</b-link>
                        </li>
                        <li>
                            <b-link to="/mypage/print" router-tag="h5">서류 출력</b-link>
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

            <b-col class="mypage">
                <router-view></router-view>
            </b-col>
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
        })
    },
    data() {
        return {
            enable_mileage:0,
        }
    },
    methods:{
        async enableMileage(){
            try {
                const res = await ax.get(`/api/mileage/enable`);
                if (res && res.status === 200) {
                    this.enable_mileage   =res.data
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() {
        this.enableMileage();
    },
}
</script>

<style lang="css" scoped>
.left { position: relative; }
.left #menu_btn { margin:1rem; }
.left .myinfo { background: #ECECEC; padding: 1rem; margin-bottom:1rem; text-align: center; border-radius: 20px; }
.left .myinfo .name b { font-size:2rem; }
.left .myinfo img { width:20px; margin-right:4px }
.left .myinfo .mileage { border-top: 1px solid #fff; padding-top: 1rem; }

.left .nav { border: 0 solid #ddd; border-width: 0 0 1px 1px; }
.left .nav li { width:100%; border: 0 solid #ddd; border-width: 1px 1px 0 0; padding:.5rem 0; }
.left .nav li h5 { padding:.5rem 0 0 1rem; font-size:1.1rem; font-weight:bold; cursor:pointer; }
.left .nav li div a { display:block; padding:.5rem 1rem; }
.left .nav li div a:hover { background-color:#17A2B8; color:#fff; font-weight:bold; }

.left .b-sidebar-outer { z-index:10; }
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
@import './_comp/PTitle.css';

.mypage .order .header { background-color:#DDD; }
.mypage .order .header .col { font-weight:bold; }
.mypage .order .data { border-top:1px solid #ddd; }
.mypage .order .row .col { padding:.6rem 0; }
.mypage .order .row .col:nth-child(1) { flex:0 0 10%; max-width:10%; text-align:center; }
.mypage .order .row .col:nth-child(2) { flex:0 0 10%; max-width:10%; text-align:center; }
.mypage .order .row .col:nth-child(3) .btn { text-align:left; }
.mypage .order .row .col:nth-child(4) { flex:0 0 15%; max-width:15%; text-align:right; }
.mypage .order .row .col:nth-child(5) { flex:0 0 8%; max-width:8%; text-align:center; }
@media (max-width: 768px) {
    .mypage .order .header { display:none; }
    .mypage .order .row .col { max-width:none !important; width:auto !important; }
    .mypage .order .row .col:nth-child(1) { flex-basis:100%; text-align:left; }
    .mypage .order .row .col:nth-child(2) { flex-basis:auto; }
    .mypage .order .row .col:nth-child(3) { flex-basis:60%; flex-grow:1; }
    .mypage .order .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; text-align:left; }
    .mypage .order .row .col:nth-child(5) { flex-basis:50%; flex-grow:0; text-align:right; }
}

.mypage .estimate .header { background-color:#DDD; }
.mypage .estimate .header .col { font-weight:bold; }
.mypage .estimate .data { border-top:1px solid #ddd; margin-bottom:1rem; }
.mypage .estimate .row .col { padding:.6rem 0; }
.mypage .estimate .row .col:nth-child(1) { flex:0 0 10%; max-width:10%; text-align:center; }
.mypage .estimate .row .col:nth-child(2) { flex:0 0 10%; max-width:10%; text-align:center; }
.mypage .estimate .row .col:nth-child(3) .btn { text-align:left; }
.mypage .estimate .row .col:nth-child(4) { flex:0 0 8%; max-width:8%; text-align:center; }
.mypage .estimate .row .col:nth-child(5) { flex:0 0 18%; max-width:18%; text-align:center; }
@media (max-width: 768px) {
    .mypage .estimate .header { display:none; }
    .mypage .estimate .row .col { max-width:none !important; width:auto !important; }
    .mypage .estimate .row .col:nth-child(1) { flex-basis:100%; text-align:left; }
    .mypage .estimate .row .col:nth-child(2) { flex-basis:auto; }
    .mypage .estimate .row .col:nth-child(3) { flex-basis:60%; flex-grow:1; }
    .mypage .estimate .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; text-align:left; }
    .mypage .estimate .row .col:nth-child(5) { flex-basis:50%; flex-grow:0; text-align:right; }
}
</style>
