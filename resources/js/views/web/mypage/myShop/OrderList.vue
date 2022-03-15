<template lang="html">
    <b-container class="order">
        <b-row class="header">
            <b-col>일자</b-col>
            <b-col>주문번호</b-col>
            <b-col>주문명</b-col>
            <b-col>금액</b-col>
            <b-col>진행현황</b-col>
        </b-row>
        <b-row v-for="od in value" :key="od.od_id" class="data">
            <b-col>{{od.created_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-col>{{od.od_id}}<span class="d-md-none d-inline">.&nbsp;</span></b-col>
            <b-col>
                <b-button variant="outline-secondary" block :to="{ name: 'my_order_show', params: {od_id: od.od_id} }">
                    {{od.od_name}}
                </b-button>
            </b-col>
            <b-col>{{od.od_all_price | comma}} 원</b-col>
            <b-col><OrderStep v-model="od.od_step" /></b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: ['value'],
    components: {
        'OrderStep': () => import('../_comp/OrderStep.vue'),
    },
}
</script>

<style lang="css" scoped>
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
</style>
