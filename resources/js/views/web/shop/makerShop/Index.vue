<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <b-container v-else class="w_fence">
        <b-row class="mk_info">
            <b-col><b-img v-if="data['mk'].file_info[0]" :src="data['mk'].file_info[0].path" /></b-col>
            <b-col>{{data['mk'].mk_desc}}</b-col>
        </b-row>
      
        <recursive-list v-if="data" :node="data.gd" />

        <b-alert v-else variant="danger" show>No Item</b-alert>
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';
import RecursiveList from './_comp/RecursiveList';

export default {
    name: "webShopMakerShopIndex",
    components: { 
        'loading-modal': () => import('@/views/_common/LoadingModal'),
        'recursive-list': RecursiveList
    },
    data() {
        return {
            data:{gd:{}},
            isLoadingModalViewed:true,
        }
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/shop/makerShop/${this.$route.params.mk_id}`);
                if (res && res.status === 200) {
                    this.data=res.data;
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
.w_fence { max-width:1440px; position:relative; }
.w_fence .mk_info { border:2px solid #DDD; border-radius:5px; padding:10px; margin:10px; }
.w_fence .mk_info img { width:100%; max-width:432px; height:auto; max-height:200px; object-fit:cover; }
.w_fence .mk_info .col:first-child { flex:0 0 30%; max-width:30%; padding:10px; }
.w_fence .mk_info .col:last-child { padding:10px; }

</style>

