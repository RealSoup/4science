<template>
<div id="order_list">
    <b-row class="head">
        <b-col lg="3" md="3"><span>번호/주문번호</span><span>진행단계</span></b-col>
        <b-col lg="6" md="3"><span>주문상품</span><span>주문유형/결제방식/금액</span></b-col>                
        <b-col lg="3" md="3"><span>주문자/담당자</span><span>주문일</span></b-col>
    </b-row>
    <b-link class="row body" 
        v-for="row in list" :key="row.mk_id"
        :to="{name: 'adm_order_edit', params: { od_id:row.od_id }}"
    >
        <b-col lg="3" md="3" class="d-none d-lg-block">
            <span>
                {{row.od_id}}. [<div class="type_icon"><b-icon-tags-fill />{{row.od_no}}</div>]
            </span>
            <span>
                <b-badge variant="primary" v-if="row.od_step==10">접수</b-badge> 
                <b-badge variant="warning" v-else-if="row.od_step==11">승인대기</b-badge> 
                <b-badge variant="warning" v-else-if="row.od_step==12">결제대기</b-badge>

                <b-badge variant="success" v-else-if="row.od_step==20">결제완료</b-badge>

                <b-badge variant="info" v-else-if="row.od_step==30">배송준비</b-badge> 
                <b-badge variant="info" v-else-if="row.od_step==31">배송중</b-badge> 
                <b-badge variant="info" v-else-if="row.od_step==32">배송완료</b-badge>

                <b-badge variant="secondary" v-else-if="row.od_step==40">구매확정</b-badge>

                <b-badge variant="danger" v-else-if="row.od_step==50">주문취소</b-badge> 
                <b-badge variant="danger" v-else-if="row.od_step==51">결제실패</b-badge>
<!--
10:주문접수, 11:승인대기, 12:결제대기,
20:결제완료,
30:배송준비, 31:배송중, 32:배송완료,
40:구매확정,
50:주문취소, 51:결제실패
-->
            </span>
        </b-col>

        <b-col lg="6" md="4">
            <span>
                [ {{row.od_name}} ]
            </span>
            <span>
                <b-badge v-b-tooltip.hover title="바로구매" v-if="row.od_type == 'buy_inst'" variant="primary"><b-icon-hand-index-thumb /></b-badge>
                <b-badge v-b-tooltip.hover title="카트구매" v-else-if="row.od_type == 'buy_cart'" variant="info"><b-icon-basket3 /></b-badge>
                <b-badge v-b-tooltip.hover title="견적구매" v-else-if="row.od_type == 'buy_estimate'" variant="success"><b-icon-receipt /></b-badge>

                <b-badge v-if="row.od_pay_method == 'C'" variant="secondary">카드</b-badge>
                <b-badge v-else-if="row.od_pay_method == 'B'" variant="light">계좌이체 ({{row.order_extra_info.oex_finance_type}})</b-badge>
                <b-badge v-else-if="row.od_pay_method == 'P'" variant="secondary">PSYS</b-badge>
                <b-badge v-else-if="row.od_pay_method == 'S'" variant="secondary">전표</b-badge>
                <b-badge v-else-if="row.od_pay_method == 'E'" variant="light">에스크로</b-badge>
                {{ row.od_all_price | comma }} 원
            </span>
        </b-col>
        <b-col lg="3" md="3">
            <span>[ {{row.od_orderer}} ] - {{row.od_mng_nm}}</span>
            <span>{{ row.created_at | formatDate }}</span>
        </b-col>
    </b-link>
</div>
</template>

<script>
export default {
    name: 'AdmOrderIndexList',
    props:['list'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>
#order_list .row:first-of-type { border-bottom:2px solid #000; }
#order_list .row:not(:last-of-type) { border-bottom:1px solid #333; }
#order_list .body:hover { background: #d8f2fd94; }
#order_list .row>div{ padding-top:15px; padding-bottom:15px; }
#order_list .body>div:nth-of-type(2) { background-color:#7fffd454; }
#order_list .head>div { font-weight:bold; background:#666; color:#fff; }
#order_list .row>div>span:nth-of-type(2) { float:right; }
#order_list .row>div .type_icon { display:inline-block; margin-left:5px; }
/* 
#order_list .row .col:nth-of-type(1) { flex: 0 0 205px; max-width:205px; }
#order_list .row .col .type_icon { display:inline-block; margin-left:5px; }
#order_list .row .col .type_icon svg { margin-right:5px; }
.row .col:nth-of-type(3) { text-align:center; }
.row .col:nth-of-type(4) { text-align:right; }
 */
</style>