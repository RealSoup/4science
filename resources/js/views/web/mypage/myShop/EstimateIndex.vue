<template>
<b-container class="w_fence">
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <template v-else>
        <h3>견적서 조회</h3>
        
        <sch-date v-model="frm" class="sch">
            <b-col slot="prev" cols="0" lg="3"></b-col>
            <b-col slot="after" col cols="1">
                <b-button class="gray sm" @click="index">검색</b-button>
            </b-col>
        </sch-date>

        <estimate-list v-model="estimateReq.data" />

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
        'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'),
        'sch-date': () => import('@/views/_common/SchDate.vue'),
        'estimate-list': () => import('./EstimateList.vue'),
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
