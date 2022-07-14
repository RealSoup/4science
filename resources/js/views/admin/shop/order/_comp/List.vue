<template>
<div id="order_list">
    <b-row class="head">
        <b-col lg="3" md="3"><span>번호 / 주문번호</span><span>처리상태</span></b-col>
        <b-col lg="6" md="3"><span>주문상품</span><span>주문유형 / 결제방식 / 금액</span></b-col>                
        <b-col lg="3" md="3"><span>주문자 / 담당자</span><span>주문일</span></b-col>
    </b-row>
    <b-link class="row body" 
        v-for="row in list" :key="row.mk_id"
        :to="{name: 'adm_order_edit', params: { od_id:row.od_id }}"
    >
        <b-col lg="3" md="3" class="d-none d-lg-block">
            <span>
                {{row.od_id}}. <div class="type_icon"><b-icon-tags-fill />{{row.od_no}}</div>
            </span>
            <span>
                <template v-for="(c, k) in config.step">
                    <b-badge variant="primary" v-if="k==row.od_step && k==10" :key="k">{{c}}</b-badge> 
                    <b-badge variant="warning" v-else-if="k==row.od_step && k==11" :key="k">{{c}}</b-badge>
                    <b-badge variant="warning" v-else-if="k==row.od_step && k==12" :key="k">{{c}}</b-badge>
                    <b-badge variant="success" v-else-if="k==row.od_step && k==20" :key="k">{{c}}</b-badge>
                    <b-badge variant="info" v-else-if="k==row.od_step && k==30" :key="k">{{c}}</b-badge>
                    <b-badge variant="info" v-else-if="k==row.od_step && k==31" :key="k">{{c}}</b-badge>
                    <b-badge variant="info" v-else-if="k==row.od_step && k==32" :key="k">{{c}}</b-badge>
                    <b-badge variant="secondary" v-else-if="k==row.od_step && k==40" :key="k">{{c}}</b-badge>
                    <b-badge variant="danger" v-else-if="k==row.od_step && k==50" :key="k">{{c}}</b-badge>
                    <b-badge variant="danger" v-else-if="k==row.od_step && k==51" :key="k">{{c}}</b-badge>
                </template>
            </span>
        </b-col>

        <b-col lg="6" md="4">
            <span>
                [ {{row.od_name}} ]
            </span>
            <span>
                <template v-for="(c, k) in config.type">
                    <b-badge v-b-tooltip.hover title="바로주문" variant="primary" v-if="k==row.od_type && k=='buy_inst'" :key="k">{{c.charAt(0)}}</b-badge>
                    <b-badge v-b-tooltip.hover title="카트주문" variant="info" v-else-if="k==row.od_type && k=='buy_cart'" :key="k">{{c.charAt(0)}}</b-badge>
                    <b-badge v-b-tooltip.hover title="견적주문" variant="success" v-else-if="k==row.od_type && k=='buy_estimate'" :key="k">{{c.charAt(0)}}</b-badge>
                    <b-badge v-b-tooltip.hover title="임시주문" variant="warning" v-else-if="k==row.od_type && k=='buy_temp'" :key="k">{{c.charAt(0)}}</b-badge>
                </template>
                <template v-for="(c, k) in config.pay_method">
                    <b-badge v-if="k==row.od_pay_method && k == 'C'" :key="k" variant="secondary">{{c}}</b-badge>
                    <b-badge v-else-if="k==row.od_pay_method && k == 'B'" :key="k" variant="light">{{c}} ({{row.order_extra_info.oex_finance_type}})</b-badge>
                    <b-badge v-else-if="k==row.od_pay_method && k == 'P'" :key="k" variant="secondary">{{c}}</b-badge>
                    <b-badge v-else-if="k==row.od_pay_method && k == 'E'" :key="k" variant="light">{{c}}</b-badge>
                </template>
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
    props:['list', 'config'],
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
#order_list .body:hover { background: #20613744; }
#order_list .row>div{ padding-top:15px; padding-bottom:15px; }
#order_list .body>div:nth-of-type(2) { background-color:#20613717; }
#order_list .head>div { font-weight:bold; background:#206137f0; color:#fff; }
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