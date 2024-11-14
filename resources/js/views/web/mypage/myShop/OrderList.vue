<template>
<b-container class="order list01">
    <b-row class="header">
        <b-col class="date">일자</b-col>
        <b-col class="num">주문번호</b-col>
        <b-col class="product">주문상품</b-col>
        <b-col class="price">금액</b-col>
        <b-col class="step">진행현황</b-col>
    </b-row>
    <b-row v-for="od in value" :key="od.od_id" class="data" @click="go_order_show(od.od_id)">
        <b-col class="date">
            <template v-if="deviceType=='pc'">{{od.created_at | formatDate_YY_MM_DD}}</template>
            <template v-if="deviceType=='mobile'">{{od.created_at | formatDate_MM_DD}}</template>
        </b-col>
        <b-col class="num">
            <template v-if="deviceType=='pc'">{{od.od_no}}</template>
            <responsive-str v-else-if="deviceType=='mobile'" v-model="od.od_name" />
        </b-col>
        <b-col class="product">
            <template v-for="(odm, i) in od.order_model">
                <b-link v-if="i < 5" @click.stop="go_goods_show(odm.odm_gd_id)" :key="i">
                    <img :src="odm.img_thumb_src" />
                    <div>{{odm.odm_gm_name_eng??odm.odm_gm_name}}</div>
                </b-link>
                <span v-if="i == 5" :key="i" class="over_flow"><b>외 {{od.order_model.length-5}}</b></span>
            </template>
        </b-col>
        <b-col class="price">{{od.od_all_price | comma}} 원</b-col>
        <b-col class="step">
            <div class="m_hide">{{order_config.pay_method[od.od_pay_method]}}</div>
            <order-step v-model="od.od_step" :order_config="order_config" />
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import { mapState } from 'vuex'; 
export default {
    props: ['value', 'order_config'],
    components: {
        'order-step': () => import('../_comp/OrderStep'),
        'responsive-str': () => import('@/views/_common/ResponsiveStr'),
    },
    computed: {
        ...mapState('common', ['deviceType']), 
    },
    methods:{
        go_order_show(od_id) { this.$router.push({ name: 'my_order_show', params: {od_id: od_id} }); },
        go_goods_show(gd_id) { this.$router.push({ name: 'goods_show', params: {gd_id: gd_id} }); },
    },
}
</script>

<style lang="css" scoped>
.list01 .data:hover { background-color:#EEE; cursor:pointer; }
.list01 .data .col:nth-child(4) { text-align:right; }
@media (max-width: 992px) {
    .list01 .row .date { flex:0 0 15%; max-width:15%; }
    .list01 .data .product { display:none; }
    .list01 .row .num { flex:0 0 75%; max-width:75%; padding:0 9px !important; text-align:left; }
    .list01 .row .price { display:none; }
    .list01 .row .step { flex:0 0 10%; max-width:10%; text-align:center !important; }
}
</style>