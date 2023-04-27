<template>
<b-container class="w_fence">
    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </LoadingModal>
    <template v-else>
        <h3>견적서 조회</h3>
        <div class="row mb-2">
            <b-col lg="3" md="12" class="align-middle" style="line-height:31px;">총 게시물 : {{estimateReq.total}}</b-col>
            <b-col><SchDate v-model="frm" /></b-col>
            <b-col cols="1"><b-button size="sm" variant="primary" @click="index">검색</b-button></b-col>
        </div>

        <EstimateList v-model="estimateReq.data" />

        <pagination :data="estimateReq" @pagination-change-page="index" :limit="5" :showDisabled="true" align="center" class="mt-5">
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
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'SchDate': () => import('@/views/_common/SchDate.vue'),
        'EstimateList': () => import('./EstimateList.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            estimateReq:{},
            frm:{
                page:1,
                startDate:'',
                endDate:'',
            }
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
                const res = await ax.get(`/api/shop/estimate`, { params: this.frm});
                if (res && res.status === 200) {
                    this.estimateReq = res.data;
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
