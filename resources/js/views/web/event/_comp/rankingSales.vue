<template>
<div class="event">
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <b-container v-else class="w_fence">        
            
        <h3>
            <b-img src="/storage/event/2024/0611/banner.jpg" />
        </h3>
        <b-row v-if="list && list.length">
            <b-col v-for="ol in list" :key="ol.odm_gd_id">
                <b-link :to="{name:'goods_show', params:{gd_id:ol.odm_gd_id}}">
                    <!-- <p>{{ol.all_order}}</p> -->
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
.event .w_fence { padding-top:1.5rem; max-width:1440px; position:relative; }

.event .w_fence h3 { margin-bottom:1rem; position:relative; height:220px; }
.event .w_fence h3 img { position:absolute; top:0; left:50%; margin-left:-960px; }


.event .w_fence .row .col { flex:0 0 20%; max-width:20%; padding:10px; }
.event .w_fence .row .col a { border:1px solid #B6B6B6;  display:block; text-align:center; height:360px; padding:26px; background:#fff; overflow:hidden; }
.event .w_fence .row .col a img { width:100%; height:228px; object-fit:contain; margin-bottom:2.8rem; transition:transform .2s; }
.event .w_fence .row .col a p { line-height:1.1; margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.event .w_fence .row .col:hover a img { transform:scale(1.2); }

@media (max-width: 1430px){
    .event .w_fence { overflow:hidden; }
}

@media (max-width: 992px){
    .event .w_fence h3 { height:113.66px; }
    .event .w_fence h3 img { width:992px; height:100%; margin-left:-496px; }
    .event .w_fence .row .col a { height:230px; padding:5px; }
    .event .w_fence .row .col a img { height:174px; margin-bottom:.5rem; }
}
@media (max-width: 576px) {
    .event .w_fence { padding:.5rem 0 0; }
    .event .w_fence h3 { height:57px; margin-bottom:0; }
    .event .w_fence h3 img { width:500px; margin-left:-250px; }
    .event .w_fence .row .col { flex: 0 0 50%; max-width: 50%; }
}
</style>

