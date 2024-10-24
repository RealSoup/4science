<template>
<b-container class="p_wrap">
    <b-row>
        <b-col col lg="6" cols="12" class="left">
            <h4>주문현황</h4>
            <div class="box">
                <b-row class="top">
                    <b-col>오늘 주문 <span>{{con.today_order}}</span></b-col>
                    <b-col>최근 7일 주문 <span>{{order_7}}</span></b-col>
                </b-row>  
                <b-row class="body">
                    <b-col>
                        <span>{{con.order[10]}}</span>
                        <span>주문접수</span>
                        <span>주문 후 상태</span>
                    </b-col>
                    <b-col>
                        <span>{{parseInt(con.order[11])+parseInt(con.order[12])}}</span>
                        <span>입금확인중</span>
                        <span>주문 후, 입금 전</span>
                    </b-col>
                    <b-col>
                        <span>{{parseInt(con.order[20])+parseInt(con.order[30])}}</span>
                        <span>입금완료</span>
                        <span>주문 후, 입금 후</span>
                    </b-col>
                    <b-col>
                        <span>{{con.order[40]}}</span>
                        <span>배송중</span>
                        <span>상품 발송 후</span>
                    </b-col>
                    <b-col>
                        <span>{{con.order[50]}}</span>
                        <span>배송완료</span>
                        <span>고객 상품 수취</span>
                    </b-col>
                    <b-col>
                        <span>{{con.order[60]}}</span>
                        <span>주문취소</span>
                        <span>주문 최소 상태</span>
                    </b-col>
                </b-row>
            </div>
        </b-col>
        
        <b-col col class="right">
            <h4>견적현황</h4>
            <div class="box">
                <b-row class="top">
                    <b-col>오늘 견적 <span>{{con.today_estimate}}</span></b-col>
                    <b-col>최근 7일 견적 <span>{{con.estimateReq.length}}</span></b-col>
                </b-row>
                <div class="body">
                    <b-row class="head">
                        <b-col>요청일</b-col>
                        <b-col>아이디</b-col>
                        <b-col>이름</b-col>
                        <b-col>견적요쳥 내용</b-col>
                    </b-row>

                    <perfect-scrollbar>
                    <b-row v-for="eq in con.estimateReq" :key="eq.eq_id" class="list">
                        <b-col>{{ eq.created_at | formatDate_MM_DD_HH:mm }}</b-col>
                        <b-col>{{eq.eq_email}}</b-col>
                        <b-col>{{eq.eq_name}}</b-col>
                        <b-col @click="openWinPop(`/admin/shop/estimate/req/${eq.eq_id}`, 1300, 900)" class="eq_tit">
                            <b v-if="eq.eq_title" v-html="eq.eq_title"></b>
                            <SubString v-else-if="eq.eq_type == 'REQ'" v-model="eq.eq_content" :width="900"></SubString>

                            <b-badge v-if="eq.eq_type == 'TEMP'" class="yellow" v-b-tooltip.hover title="임의견적" >임</b-badge>
                            <b-badge v-else-if="eq.eq_type == 'REREQ'" class="plum" v-b-tooltip.hover title="재견적요청" >재</b-badge>
                            <b-badge v-else-if="eq.eq_type == 'CUS'" class="mint" v-b-tooltip.hover title="주문제작">주</b-badge>
                        </b-col>
                    </b-row>
                    </perfect-scrollbar>
                </div>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admMain',

    data() { return { con:{ order:{ 10:0, 11:0, 12:0, 20:0, 30:0, 40:0, 50:0, 60:0, }, estimateReq:[] } }; },
    computed: {
        order_7() { return Object.values(this.con.order).reduce((acc, el) => acc + el , 0); },
        // estimate_7() { return Object.values(this.con.estimateReq).reduce((acc, el) => acc + el , 0); },
    },
    async mounted() {
        try {
            const res = await ax.get(`/api/admin`);
            if (res && res.status === 200) {
                this.con = res.data;
            }
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.response.data.message);
        }
    },
};
</script>

<style lang="css" scoped>
.p_wrap h4 { font-size:1.6rem; font-weight:bold; margin-bottom:1rem; }
.p_wrap .row .col .box { border-width:5px; border-style:solid; border-radius:1rem; padding:.75rem 1.5rem; background-color:#EFF0F2; }
.p_wrap .row .left { padding-right:1%; }
.p_wrap .row .left .box { border-color:#458CCA; }
.p_wrap .row .right .box { border-color:#51B948; }
.p_wrap .row .col .box .row { margin:0; }

.p_wrap .row .col .box .top .col { text-align:center; padding:.65rem 0 .45rem 0; font-size:1.25rem; font-weight:600; display:flex; justify-content:center; align-items:center; }
.p_wrap .row .col .box .top .col span { font-size:2.53rem; margin-left:2rem; }
.p_wrap .row .col .box .top .col:first-child { border-right:1px solid #C2C2C2; }
.p_wrap .row .left .box .top .col span { color:#458CCC; }
.p_wrap .row .right .box .top .col span { color:#51B948; }

.p_wrap .row .col .box .body { margin-top:.5rem; }
.p_wrap .row .left .box .body { margin-bottom:1.25rem; }
.p_wrap .row .left .box .body { padding-top:1.7rem; border-top:1px solid #C2C2C2; }
.p_wrap .row .left .box .body .col { padding:0; }
.p_wrap .row .left .box .body .col:not(:first-child) { padding-left:5px; }
.p_wrap .row .left .box .body .col:not(:last-child) { padding-right:5px; }
.p_wrap .row .left .box .body .col span { text-align:center; display:block; }
.p_wrap .row .left .box .body .col span:nth-child(1) { padding:4.2rem 0; background-color:#fff; font-size:1.9rem; border-radius:1rem; font-weight:600; }
.p_wrap .row .left .box .body .col span:nth-child(2) { margin-top:1rem; font-weight:800; }
.p_wrap .row .left .box .body .col span:nth-child(3) { font-size:.9rem; margin-top:.15rem; }

.p_wrap .row .right { padding-left:1%; }
.p_wrap .row .right .box { padding-bottom:0; }
.p_wrap .row .right .box .body { margin-left:-1.5rem; margin-right:-1.5rem; padding-bottom:1.5rem; background:#fff; border-radius:1rem; }
.p_wrap .row .right .box .body .head { background-color:#A0A0A0; color:#FFF;  }
.p_wrap .row .right .box .body .row .col { padding:0; }
.p_wrap .row .right .box .body .ps { height:239px; background-color:#fff; }
.p_wrap .row .right .box .body .row .col { padding:.56rem .53rem .50rem .53rem; text-align:center; }
.p_wrap .row .right .box .body .row .col:not(:last-child) { border-right:1px solid #C2C2C2; }
.p_wrap .row .right .box .body .row .col:nth-child(1) { flex:0 0 14%; max-width:14%; }
.p_wrap .row .right .box .body .row .col:nth-child(2) { flex:0 0 24%; max-width:24%; }
.p_wrap .row .right .box .body .row .col:nth-child(3) { flex:0 0 12.1%; max-width:12.1%; }
.p_wrap .row .right .box .body .list .col:nth-child(4) { text-align:left; text-overflow:ellipsis; white-space:nowrap; word-wrap:normal; overflow:hidden; vertical-align:bottom; }
.p_wrap .row .right .box .body .list .col { padding:.99rem .53rem .8rem .53rem; font-size:.9rem; }

.p_wrap .row .right .box .body .ps >>> .ps__rail-y { background-color:#eee; opacity:.9; z-index:1; cursor:pointer; }
.p_wrap .row .right .box .body .ps >>> .ps__rail-y > .ps__thumb-y { background-color:#438DCC; width:11px; }

@media (max-width: 992px){
    .p_wrap { margin-left:auto; margin-right:auto; }
    .p_wrap .row .left { margin-bottom:9%; }

}
</style>