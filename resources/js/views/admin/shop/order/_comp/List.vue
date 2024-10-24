<template>
<div>
    <b-row class="head list">
        <b-col class="d-none d-lg-block">글번호</b-col>
        <b-col class="d-none d-lg-block">주문번호</b-col>
        <b-col>주문상품</b-col>
        <b-col>주문자</b-col>
        <b-col class="d-none d-lg-block">주문유형</b-col>
        <b-col>주문일</b-col>
        <b-col class="d-none d-lg-block">결제수단</b-col>
        <b-col>결제금액</b-col>
        <b-col><span class="d-none d-lg-inline-block">진행</span>현황</b-col>
        <b-col class="d-none d-lg-block">담당자</b-col>
        <b-col v-if="$route.name === 'adm_order_index' && !isEmpty(sch_frm) && (['od_addr1', 'od_addr1_sk'].includes(sch_frm.mode))" class="d-none d-lg-block">배송주소</b-col>
    </b-row>
    <b-row class="body list" :class="{cancel:row.od_step==60, don_t:(row.user && row.user.group==3)}" v-for="row in list" :key="row.mk_id">
        <b-col class="d-none d-lg-block">{{row.od_id}}.</b-col>
        <b-col class="d-none d-lg-block">{{row.od_no}}</b-col>
        <b-link class="col" :to="{name: 'adm_order_edit', params: { od_id:row.od_id }}">{{row.od_name}}</b-link>
        <b-col>
            <b-badge v-if="$route.name === 'adm_order_index' && row.od_addr1_sk" pill class="plum addr1_sk d-none d-lg-inline-block">서&middot;경</b-badge>
            <span v-if="row.user && (row.user.level == 11 || row.user.level == 12)" class="badgetag d_blue d-none d-lg-inline-block">딜</span>
            <sub-string v-model="row.od_orderer" :width="120" />
            <span v-if="row.user && row.user.mng" class="nametag orange d-none d-lg-inline-block">{{mng_off[row.user.mng].name}}</span>
        </b-col>
        <b-col class="d-none d-lg-block">
            <span v-if="row.od_sale_env=='A'" class="badgetag orange">앱</span>
            {{config.type[row.od_type]}}
            <span v-if="row.eq_mng_id" class="nametag mint">
                <template v-if="mng_off[row.eq_mng_id]">{{mng_off[row.eq_mng_id].name}}</template>
                <template v-else>{{row.eq_mng_id}}</template>
            </span>
        </b-col>
        <b-col>
            <span class="d-inline-block d-lg-none">{{ row.created_at | formatDate }}</span>
            <span class="d-none d-lg-inline-block">{{ row.created_at | formatDate_YY_MM_DD_HH:mm }}</span>
        </b-col>
        <b-col class="d-none d-lg-block">{{config.pay_method[row.od_pay_method]}}</b-col>
        <b-col>{{ row.od_all_price | comma }}</b-col>
        <b-col class="step">
            <span :class="config.step[row.od_step].class" class="nametag d-none d-lg-inline-block">{{config.step[row.od_step].name}}</span>
            <span :class="config.step[row.od_step].class" class="nametag d-lg-none d-inline-block">{{config.step[row.od_step].sm_name}}</span>
        </b-col>
        <b-col class="d-none d-lg-block">
            <span v-if="row.od_mng">
                <template v-if="mng_off[row.od_mng]">{{mng_off[row.od_mng].name}}</template>
                <template v-else>{{row.od_mng}}</template>
            </span>
        </b-col>
        <b-col v-if="$route.name === 'adm_order_index' && !isEmpty(sch_frm) && (['od_addr1', 'od_addr1_sk'].includes(sch_frm.mode))" class="d-none d-lg-block">{{row.od_addr1}}</b-col>

    </b-row>
</div>
</template>

<script>
export default {
    name: 'AdmOrderIndexList',
    props:['list', 'sch_frm', 'config', 'mng_off'],
    components: { 
        'sub-string': () => import('@/views/_common/SubString.vue'),
    },
};
</script>

<style lang="css" scoped>
.row .col { font-weight:600; }
.row .col:nth-child(1) { flex:0 0 6%; max-width:6%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(2) { flex:0 0 9%; max-width:9%; }
.row .col:nth-child(3) { border-right:1px solid #CCCCCC; }
.row .col:nth-child(4) { flex:0 0 11%; max-width:11%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(5) { flex:0 0 11%; max-width:11%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(7) { flex:0 0 8%; max-width:8%; }
.row .col:nth-child(8) { flex:0 0 7%; max-width:7%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(9) { flex:0 0 7%; max-width:7%; }
.row .col:nth-child(10) { flex:0 0 5%; max-width:5%; }
.row .col:nth-child(11) { flex:0 0 10%; max-width:10%; }
.body .col:nth-child(3) { text-align:left; } 
.body .col:nth-child(11) { text-align:left; line-height:1; }
.body:hover { background:#B2E0FA; }
.cancel { background:#D7D7D7; }
.cancel .col { color:#9F9F9F; }
.don_t { background:#FECE02; }
.body .col.step .nametag { width:70px; }
.body .col.step .nametag.d-inline-block { width:auto; }
@media (max-width: 991px){
    .row .col { font-size:.75rem; line-height:1.4; padding:0.4rem;}
    .row .col:nth-child(4) { flex:0 0 14%; max-width:14%; }
    .row .col:nth-child(6) { flex:0 0 14%; max-width:14%; }
    .row .col:nth-child(8) { flex:0 0 19%; max-width:19%; }
    .row .col:nth-child(9) { flex:0 0 9%; max-width:9%; }
    .body .col:nth-child(8) { text-align:right; padding-right:3px; }
    .body .step span { width:30px; font-size:.75rem; margin:auto; padding:0 }
}
</style>