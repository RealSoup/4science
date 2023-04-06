<template>
<b-container class="order list01">
    <b-row class="header">
        <b-col class="date">일자</b-col>
        <b-col class="num">주문번호</b-col>
        <b-col class="product">주문상품</b-col>
        <b-col class="price">금액</b-col>
        <b-col class="step">진행현황</b-col>
    </b-row>
    <b-row v-for="od in value" :key="od.od_id" class="data">
        <b-col class="date">{{od.created_at | formatDate_YY_MM_DD}}</b-col>
        <b-col class="num">
            <div>{{od.od_no}}</div>
            <b-button pill variant="outline-dark" :to="{ name: 'my_order_show', params: {od_id: od.od_id} }">상세보기</b-button>
        </b-col>
        <b-col class="product">
            <template v-for="(odm, i) in od.order_model">
                <b-link v-if="i < 5" :to="{name:'goods_show', params:{gd_id:odm.odm_gd_id}}" :key="i">
                    <img :src="odm.img_thumb_src" />
                    <div>{{odm.odm_gm_name}}</div>
                </b-link>
                <span v-if="i == 5" :key="i" class="over_flow"><b>외 {{od.order_model.length-5}}</b></span>
            </template>
        </b-col>
        <b-col class="price">{{od.od_all_price | comma}} 원</b-col>
        <b-col class="step"><OrderStep v-model="od.od_step" :order_config="order_config" /></b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    props: ['value', 'order_config'],
    components: {
        'OrderStep': () => import('../_comp/OrderStep.vue'),
    },
}
</script>

<style lang="css" scoped>
.list01 .data .col:nth-child(4) { text-align:right; }
</style>