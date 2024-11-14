<template>
<b-container class="w_fence">
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">Loading ......</loading-modal>
    <template v-else>
        <h3>주문 배송조회</h3>
        <sch-date v-model="sch_frm" class="sch">
            <b-col slot="prev" cols="0" lg="3"></b-col>
            <b-col slot="after" col cols="1">
                <b-button class="gray" @click="index">검색</b-button>
            </b-col>
        </sch-date>
        
        <order-list v-model="order.data" :order_config="order_config" />

        <pagination :data="order" @pagination-change-page="index" :limit="5" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
            <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </template>
</b-container>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: "MyOrder",
    components: {
        'loading-modal': () => import('@/views/_common/LoadingModal.vue'),
        'sch-date':      () => import('@/views/_common/SchDate.vue'),
        'order-list':    () => import('./OrderList.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            order:{},
            sch_frm:{
                page:1,
                startDate:'',
                endDate:'',
                od_type:'no_buy_temp'
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
            this.sch_frm.page = page;
            try {
                const res = await ax.get(`/api/shop/order`, { params: this.sch_frm});
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
        this.sch_frm = Object.assign( {}, this.sch_frm, this.$route.query );
        this.index(); 
    },
    beforeRouteUpdate (to, from, next) {
        this.sch_frm = Object.assign( {}, this.sch_frm, to.query );
        this.index();
        next();
    },
}
</script>

<style scoped>
.sch { margin-bottom:2rem;  }
@media (max-width: 992px){
    .w_fence { padding:0; }
    .pagination >>> .page-link { min-width:30px !important; padding:.5rem .3rem !important; }
}
</style>