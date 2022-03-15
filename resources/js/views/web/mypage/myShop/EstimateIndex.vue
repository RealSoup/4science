<template lang="html">
    <div>
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <template v-else>
            <div class="pTitle">
                <span><i>견</i></span>
                <span><i>적</i></span>
                <span><i>서</i></span>
                <div class="break d-md-block d-none"></div>
                <span><i>조</i></span>
                <span><i>회</i></span>
                <div class="break"></div>
                <span><i></i></span>
            </div>
            <div class="row mb-2">
                <b-col lg="3" md="12" class="align-middle" style="line-height:31px;">총 게시물 : {{estimateReq.total}}</b-col>
                <b-col><SchDate v-model="frm" /></b-col>
                <b-col cols="1"><b-button size="sm" variant="primary" @click="index">검색</b-button></b-col>
            </div>

            <EstimateList v-model="estimateReq.data" />

            <pagination :data="estimateReq" @pagination-change-page="index" />
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
        'SchDate': () => import('../_comp/SchDate.vue'),
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
