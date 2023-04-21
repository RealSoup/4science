<template lang="html">
    <div>
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <template v-else>
            <h5>최근 주문 내역 <small>최근 주문 5개를 보여줍니다.</small></h5>
            <OrderList v-model="order" :order_config="order_config" />

            <h5>최근 견적 내역 <small>최근 견적 5개를 보여줍니다.</small></h5>
            <EstimateList v-model="estimateReq" />
        </template>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: "Mypage",
    components: {
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'OrderList': () => import('./myShop/OrderList.vue'),
        'EstimateList': () => import('./myShop/EstimateList.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            order:[],
            order_config:{},
            estimateReq:[],
        }
    },
    async mounted() {
        let data_od = await ax.get(`/api/shop/order`, { params: {limit:5, type:'with_gm', od_type:'no_buy_temp', }});
        this.order = data_od.data.order;
        this.order_config = data_od.data.order_config;
        let data_eq = await ax.get(`/api/shop/estimate`, { params: {limit:5, type:'with_em'}});
        this.estimateReq = data_eq.data;
        this.isLoadingModalViewed= false;
    },
}
</script>

<style lang="css" scoped>

</style>
