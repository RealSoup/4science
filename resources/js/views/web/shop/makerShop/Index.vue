<template>
<div class="outlet">
    <div class="top_back"></div>
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <b-container v-else class="w_fence">
        <b-row class="mk_info">
            <b-col><b-img v-if="data['mk'].file_info[0]" :src="data['mk'].file_info[0].path" /></b-col>
            <b-col>{{data['mk'].mk_desc}}</b-col>
        </b-row>
  
        <b-row class="gd_list" v-if="data['gd'].data && data['gd'].data.length">
            <b-col v-for="ol in data['gd'].data" :key="ol.gd_id">
                <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                    <b-img :src="ol.image_src_thumb[0]" />
                    <p>{{ol.gd_name}}</p>
                </b-link>
            </b-col>
        </b-row>

        <b-alert v-else variant="danger" show>No Item</b-alert>
        <pagination :data="data['gd']" @pagination-change-page="index" align="center" class="mt-5" />
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    components: { 
        'loading-modal': () => import('@/views/_common/LoadingModal'),
    },
    data() {
        return {
            data:{},
            isLoadingModalViewed:true,
            frm:{
                page:0,
            },
        }
    },
    methods: {
        async index(page=1){
            this.frm.page = page;
            try {
                const res = await ax.get(`/api/shop/makerShop/${this.$route.params.mk_id}`, { params: this.frm});
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

<style lang="css">
.outlet .top_back { background:#0094EA; height:350px; position:absolute; width:100%; }
.outlet .w_fence { max-width:1440px; position:relative; }
.outlet .w_fence .mk_info img { width:100%; max-width:432px; height:200px; object-fit:cover; }
.outlet .w_fence .mk_info .col:first-child { flex:0 0 30%; max-width:30%; padding:10px; }

.outlet .w_fence .gd_list .col { flex:0 0 20%; max-width:20%; padding:10px; }
.outlet .w_fence .gd_list .col a { border:1px solid #B6B6B6;  display:block; text-align:center; height:360px; padding:26px; background:#fff; overflow:hidden; }
.outlet .w_fence .gd_list .col a img { width:100%; height:228px; object-fit:contain; margin-bottom:2.8rem; transition:transform .2s; }
.outlet .w_fence .gd_list .col a p { line-height:1.1; margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.outlet .w_fence .gd_list .col:hover a img { transform:scale(1.2); }
</style>

