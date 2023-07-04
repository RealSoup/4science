<template>
<div id="order_list">
    <b-row class="head">
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
    </b-row>
    <b-row class="body" :class="{cancel:row.od_step==60, don_t:(row.user && row.user.group==3)}" v-for="row in list" :key="row.mk_id">
        <b-col class="d-none d-lg-block">{{row.od_id}}.</b-col>
        <b-col class="d-none d-lg-block">{{row.od_no}}</b-col>
        <b-link class="col" :to="{name: 'adm_order_edit', params: { od_id:row.od_id }}">{{row.od_name}}</b-link>
        <b-col class="orderer">
            <b-badge v-if="row.user && row.user.is_dealer" class="d_blue d-none d-lg-inline-block">딜</b-badge>
            <span>
                <sub-string v-model="row.od_orderer" :width="120" />
                <br class="d-none d-lg-block" />
                <b-badge v-if="row.user && row.user.mng" class="orange d-none d-lg-inline-block">{{mng_off[row.user.mng].name}}</b-badge>
            </span> 
        </b-col>
        <b-col class="type d-none d-lg-block">
            <b-badge v-if="row.od_sale_env=='A'" class="orange">앱</b-badge>
            <span>
                {{config.type[row.od_type]}}
                <br />
                <b-badge v-if="row.eq_mng_id" class="mint">
                    <template v-if="mng_off[row.eq_mng_id]">{{mng_off[row.eq_mng_id].name}}</template>
                    <template v-else>{{row.eq_mng_id}}</template>
                </b-badge>
            </span>
        </b-col>
        <b-col>{{ row.created_at | formatDate }}</b-col>
        <b-col class="d-none d-lg-block">{{config.pay_method[row.od_pay_method]}}</b-col>
        <b-col>{{ row.od_all_price | comma }}</b-col>
        <b-col class="step">
            <span :class="config.step[row.od_step].class" class="d-none d-lg-inline-block">{{config.step[row.od_step].name}}</span>
            <span :class="config.step[row.od_step].class" class="d-lg-none d-inline-block">{{config.step[row.od_step].sm_name}}</span>
        </b-col>
        <b-col class="d-none d-lg-block">
            <span v-if="row.od_mng">
                <template v-if="mng_off[row.od_mng]">{{mng_off[row.od_mng].name}}</template>
                <template v-else>{{row.od_mng}}</template>
            </span>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    name: 'AdmOrderIndexList',
    props:['list', 'config', 'mng_off'],
    components: { 
        'sub-string': () => import('@/views/_common/SubString.vue'),
    },
};
</script>

<style lang="css" scoped>
#order_list .row .col { font-weight:600; }
#order_list .row .col:nth-child(1) { flex:0 0 6%; max-width:6%; }
#order_list .row .col:nth-child(2) { flex:0 0 9%; max-width:9%; }
#order_list .row .col:nth-child(3) {  }
#order_list .row .col:nth-child(4) { flex:0 0 7%; max-width:7%; }
#order_list .row .col:nth-child(5) { flex:0 0 7%; max-width:7%; }
#order_list .row .col:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #CCCCCC; }
#order_list .row .col:nth-child(7) { flex:0 0 8%; max-width:8%; }
#order_list .row .col:nth-child(8) { flex:0 0 7%; max-width:7%; border-right:1px solid #CCCCCC; }
#order_list .row .col:nth-child(9) { flex:0 0 7%; max-width:7%; }
#order_list .row .col:nth-child(10) { flex:0 0 5%; max-width:5%; }
#order_list .body .col:nth-child(3) { text-align:left; }
#order_list .body:hover { background:#B2E0FA; }
#order_list .cancel { background:#D7D7D7; }
#order_list .cancel .col { color:#9F9F9F; }
#order_list .don_t { background:#FECE02; }

#order_list .body .step span { width:90px; display:inline-block; font-size:.9rem; padding:.25rem 0; line-height:1rem; border-radius:.3rem; border-width:1px; border-style:solid; }
#order_list .body .type,
#order_list .body .orderer { line-height:1.5rem; }
#order_list .body .type span .badge,
#order_list .body .orderer span .badge { width:70px; display:inline-block; font-size:.9rem; padding:.25rem 0; line-height:1rem; border-radius:0; }
#order_list .body .col .badge { border-radius:50%; padding:.4rem; }
@media (max-width: 991px){
    #order_list .row .col { font-size:.75rem; line-height:1.4; padding:0.4rem;}
    #order_list .row .col:nth-child(8) { flex:0 0 13%; max-width:13%; }
    #order_list .body .col:nth-child(8) { text-align:right; padding-right:3px; }
    #order_list .body .step span { width:30px; font-size:.75rem; margin:auto; padding:0 }
}
</style>