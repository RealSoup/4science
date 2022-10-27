<template lang="html">
    <div class="">
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <template v-else>
            <div class="pTitle">
                <span><i>주</i></span>
                <span><i>문</i></span>
                <span class="d-md-none d-inline-block"><i>/</i></span>
                <div class="break d-md-block d-none"></div>
                <span><i>배</i></span>
                <span><i>송</i></span>
                <span><i>조</i></span>
                <span><i>회</i></span>
                <div class="break"></div>
                <span><i></i></span>
            </div>
            <div class="row mb-2">
                <b-col lg="3" md="12" class="align-middle" style="line-height:31px;">총 게시물 : {{order.total}}</b-col>
                <b-col>
                    <SchDate v-model="frm" />
                </b-col>
                <b-col cols="1">
                    <b-button size="sm" variant="primary" @click="index">검색</b-button>
                </b-col>
            </div>

            <OrderList v-model="order.data" :order_config="order_config" />

            <pagination :data="order" @pagination-change-page="index" size="small" :limit="5" align="center" class="mt-5" />
        </template>
    </div>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: "MyOrder",
    components: {
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'SchDate': () => import('@/views/_common/SchDate.vue'),
        'OrderList': () => import('./OrderList.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            order:{},
            frm:{
                page:1,
                startDate:'',
                endDate:'',
            },
            order_config: {},
        }
    },
    computed: {
        ...mapGetters({
            isLoggedin: 'auth/isLoggedin',
            user: 'auth/user',
        })
    },
    methods:{
        async index(page=1){
            this.frm.page = page;
            try {
                const res = await ax.get(`/api/shop/order`, { params: this.frm});
                if (res && res.status === 200) {           
                    this.order = res.data.order;
                    this.order_config = res.data.order_config;
                    this.isLoadingModalViewed= false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() {
        this.index();
    },

}
</script>

<style lang="css" scoped>
</style>
