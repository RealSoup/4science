<template>
<b-container class="p_wrap">
    <h3 class="p_tit">미처리 주문</h3>
    <b-row>
        <b-col>글번호</b-col>
        <b-col>주문명</b-col>
        <b-col>주문자</b-col>
        <b-col>주문일</b-col>
    </b-row>
    <b-row v-for="od in list" :key="od.od_id">
        <b-col>{{od.od_id}}</b-col>
        <b-col>
            <b-link :to="{name: 'adm_order_edit', params: { od_id:od.od_id }}">{{od.od_name}}</b-link>
        </b-col>
        <b-col>{{od.od_orderer}}</b-col>
        <b-col>{{od.created_at | formatDate}}</b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    name: 'AdmHeaderReqOrder',
    props:['list'],
    methods: {
            },
}
</script>
<style lang="css" scoped>
.p_warp {  border-right:1px solid #DDD; }
.row:first-of-type .col { background-color:#CCC; border-top:3px solid #666; font-weight:600; }
.row .col:nth-of-type(1) { flex-basis:14%; max-width:14%; }
.row .col:nth-of-type(2) { text-align: left; }
.row .col:nth-of-type(3) { flex-basis:14%; max-width:14%; }
.row .col:nth-of-type(4) { flex-basis:14%; max-width:14%; }
.row .col { border-left:1px solid #DDD; border-bottom:1px solid #DDD; text-align: center; padding:.4rem; }
</style>