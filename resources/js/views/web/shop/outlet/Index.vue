<template>
<div class="outlet">
    <div class="top_back"></div>
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <b-container v-else class="w_fence">
        <ul class="top">
            <li><b-link :to="{name:'outlet'}">포사전문관</b-link></li>
            <li>
                <template v-if="$route.params.type == 'pipette'">피펫</template>
                <template v-else-if="$route.params.type == 'measure'">환경측정기</template>
                <template v-else-if="$route.params.type == 'tweezer'">트위져</template>
                <template v-else-if="$route.params.type == 'hotplate'">핫플레이트</template>
                <template v-else-if="$route.params.type == 'meter'">광파워미터</template>
            </li>
            <li>{{menu[$route.params.type][$route.params.group]}}</li>
        </ul>
        <template v-if="list.data && list.data.length">
            <hotplate v-if="$route.params.type == 'hotplate' && ['01', '02', '03', '04'].indexOf($route.params.group) !== -1" 
                v-model="list.data"
            />
            <template v-else>
                <b-row v-if="list.data && list.data.length">
                    <b-col v-for="ol in list.data" :key="ol.gd_id">
                        <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                            <b-img :src="ol.image_src_thumb[0]" />
                            <p>{{ol.gd_name}}</p>
                        </b-link>
                    </b-col>
                </b-row>
            </template>
        </template>
        <b-alert v-else variant="danger" show>No Item</b-alert>
        <pagination :data="list" @pagination-change-page="index" align="center" class="mt-5" />
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';
import { menu } from './_comp/ListMenu.js'

export default {
    components: { 
        'loading-modal': () => import('@/views/_common/LoadingModal'),
        'hotplate':     () => import('./_comp/Hotplate'), 
    },
    data() {
        return {
            menu:menu,
            list:{},
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
                const res = await ax.get(`/api/shop/outlet/${this.$route.params.type}/${this.$route.params.group}`, { params: this.frm});
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
.outlet .top_back { background:#0094EA; height:350px; position:absolute; width:100%; }
.outlet .w_fence { max-width:1440px; position:relative; }
.outlet .w_fence .top { display:flex; align-items:center; margin-bottom:3rem;  }
.outlet .w_fence .top li { color:#fff; position:relative; margin:0 1rem; font-size:1.3rem; }
.outlet .w_fence .top li:first-child { font-size:1.85rem; font-weight:900; margin-right:1.5rem; }
.outlet .w_fence .top li:not(:first-child):before { content:'>'; position:absolute; left:-1.5rem; }
.outlet .w_fence .top li a { color:#fff; }
.outlet .w_fence .row .col { flex:0 0 20%; max-width:20%; padding:10px; }
.outlet .w_fence .row .col a { border:1px solid #B6B6B6;  display:block; text-align:center; height:360px; padding:26px; background:#fff; overflow:hidden; }
.outlet .w_fence .row .col a img { width:228px; height:228px; object-fit:contain; margin-bottom:2.8rem; transition:transform .2s; }
.outlet .w_fence .row .col a p { line-height:1.1; margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.outlet .w_fence .row .col:hover a img { transform:scale(1.2); }
</style>

