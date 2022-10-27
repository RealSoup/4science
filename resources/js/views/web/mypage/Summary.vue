<template lang="html">
    <div>
        <div class="pTitle">
            <span><i>M</i></span>
            <span><i>Y</i></span>
            <div class="break d-md-block d-none"></div>
            <span><i>P</i></span>
            <span><i>A</i></span>
            <span><i>G</i></span>
            <span><i>E</i></span>
            <div class="break"></div>
            <span><i></i></span>
        </div>
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <template v-else>
            <h5>최근 주문 내역</h5>
            <OrderList v-model="order" :order_config="order_config" />

            <h5>최근 견적 내역</h5>
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
        let data_od = await ax.get(`/api/shop/order`, { params: {limit:5}});
        this.order = data_od.data.order;
        this.order_config = data_od.data.order_config;
        let data_eq = await ax.get(`/api/shop/estimate`, { params: {limit:5}});
        this.estimateReq = data_eq.data;
        this.isLoadingModalViewed= false;
    },
}
</script>

<style lang="css" scoped>
h5 { margin-top:2rem; font-weight: bold; }
</style>
