<template>
    <div>
        <div class="top_back"></div>
        <b-container class="w_fence">
            <ul class="top">
                <li><b-link :to="{name:'outlet'}">포사전문관</b-link></li>
                <li>
                    <template v-if="$route.params.code == 'pipette'">피펫</template>
                    <template v-else-if="$route.params.code == 'measure'">환경측정기</template>
                    <template v-else-if="$route.params.code == 'tweezer'">트위져</template>
                    <template v-else-if="$route.params.code == 'hotplate'">핫플레이트</template>
                    <template v-else-if="$route.params.code == 'meter'">광파워미터</template>
                </li>
                <li>{{menu[$route.params.code][$route.params.group]}}</li>
            </ul>

            <b-row>
                <b-col v-for="ol in list" :key="ol.gd_id">
                    <b-link :to="{name:'goods_show', params:{gd_id:ol.gd_id}}">
                        <b-img :src="ol.image_src_thumb[0]" />
                        <p>{{ol.gd_name}}</p>
                    </b-link>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import ax from '@/api/http';
import { menu } from './_comp/ListMenu.js'

export default {
    data() {
        return {
            menu:menu,
            list:{}
        }
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/shop/outlet/${this.$route.params.code}/${this.$route.params.group}/12`);
                if (res && res.status === 200) {
                    this.list=res.data;
                    console.log(this.list);
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
.top_back { background:#0094EA; height:350px; position:absolute; width:100%; }
.w_fence { max-width:1440px; position:relative; }
.w_fence .top { display:flex; align-items:center; margin-bottom:3rem;  }
.w_fence .top li { color:#fff; position:relative; margin:0 1rem; font-size:1.3rem; }
.w_fence .top li:first-child { font-size:1.85rem; font-weight:900; margin-right:1.5rem; }
.w_fence .top li:not(:first-child):before { content:'>'; position:absolute; left:-1.5rem; }
.w_fence .top li a { color:#fff; }
.w_fence .row .col { flex:0 0 20%; max-width:20%; padding:10px; }
.w_fence .row .col a { border:1px solid #B6B6B6;  display:block; text-align:center; height:360px; padding:26px; background:#fff; overflow:hidden; }
.w_fence .row .col a img { width:100%; height:228px; object-fit:cover; margin-bottom:2.8rem; transition:transform .2s; }
.w_fence .row .col a p { line-height:1.1; margin:0; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.w_fence .row .col:hover a img { transform:scale(1.2); }
</style>

