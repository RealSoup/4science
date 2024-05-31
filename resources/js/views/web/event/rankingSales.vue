<template>
<div class="event">
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <b-container v-else class="w_fence">        
            
        <b-row v-if="list && list.length">
            <b-col v-for="ol in list" :key="ol.odm_gd_id">
                <b-link :to="{name:'goods_show', params:{gd_id:ol.odm_gd_id}}">
                    <p>{{ol.all_order}}</p>
                    <b-img :src="ol.img_thumb_src" />
                    <p>{{ol.odm_gd_name}}</p>
                </b-link>
            </b-col>
        </b-row>
        <b-alert v-else variant="danger" show>No Item</b-alert>
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
            list:{},
            isLoadingModalViewed:true,
        }
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/event/rankingSales`);
                if (res && res.status === 200) {
                    this.list=res.data;
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
.event { min-height:200px; }
.event .w_fence { max-width:1440px; position:relative; }
.event .w_fence .row .col { flex:0 0 20%; max-width:20%; padding:10px; }
.event .w_fence .row .col a { border:1px solid #B6B6B6;  display:block; text-align:center; height:360px; padding:26px; background:#fff; overflow:hidden; }
.event .w_fence .row .col a img { width:100%; height:228px; object-fit:contain; margin-bottom:2.8rem; transition:transform .2s; }
.event .w_fence .row .col a p { line-height:1.1; margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.event .w_fence .row .col:hover a img { transform:scale(1.2); }
</style>

