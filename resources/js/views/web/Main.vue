<template lang="html">
    <div>
        <b-carousel indicators class="slide_banner">
            <b-link href="/">
                <b-carousel-slide img-src="/img/main/banner01.png"></b-carousel-slide>
            </b-link>
            
            <b-link href="/">
                <b-carousel-slide img-src="/img/main/banner02.png"></b-carousel-slide>
            </b-link>           
        </b-carousel>

        <BestList :items="bestRemodel" />

        <div class="recommend">
            <div class="back"></div>
            <div class="layout">
                <b-row>
                    <b-col class="tit">포사의 추천 ></b-col>
                </b-row>
                <b-row>
                    <b-col><b-link :to="{name:'goods_show', params:{gd_id:1}}"><b-img src="/img/main/rec01.jpg" /></b-link></b-col>
                    <b-col><b-link :to="{name:'goods_show', params:{gd_id:1}}"><b-img src="/img/main/rec02.jpg" /></b-link></b-col>
                    <b-col><b-link :to="{name:'goods_show', params:{gd_id:1}}"><b-img src="/img/main/rec03.jpg" /></b-link></b-col>
                </b-row>
                <b-row>
                    <b-col><b-link :to="{name:'goods_show', params:{gd_id:1}}"><b-img src="/img/main/rec04.jpg" /></b-link></b-col>
                    <b-col><b-link :to="{name:'goods_show', params:{gd_id:1}}"><b-img src="/img/main/rec06.jpg" /></b-link></b-col>
                    <b-col><b-link :to="{name:'goods_show', params:{gd_id:1}}"><b-img src="/img/main/rec05.jpg" /></b-link></b-col>
                </b-row>
            </div>
        </div>

        <div class="byCate layout">
            <b-row class="titByCate">
                <b-col tag="h5">카테고리별 추천</b-col>
            </b-row>
            <ul>
                <li v-for="(ca, i) in category" :key="ca.ca_id"><img :src="`/img/main/icon_ca${ca.ca_id}_sm.jpg`" /></li>
            </ul>
            <b-container class="con">
                <b-row v-for="(ca, i) in category" :key="ca.ca_id">
                    <b-col class="tit">                    
                        <b-link :to="{name:'goods_show', params:{gd_id:1}}">
                            <b-img :src="`/img/main/icon_ca24_sm.jpg`" />
                            <h6>{{ca.ca_name}}</h6>
                            <span>전체보기 <b-icon-chevron-right /></span>
                        </b-link>
                    </b-col>
                    <b-col class="list">
                        <b-col v-for="gd in bestByCategory[ca.ca_id]" :key="gd.gd_id">
                            <b-img fluid :src="gd.goods.image_src_thumb[0]" />
                            <p>{{gd.goods.gd_name}}</p>
                        </b-col>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>


<script>
import ax from '@/api/http';
import { KinesisContainer, KinesisElement } from 'vue-kinesis';
import { vueAccordion } from 'vue-accordion';
import { mapState } from 'vuex'

export default {
    components: {
        KinesisContainer,
        KinesisElement, // https://github.com/Aminerman/vue-kinesis
        vueAccordion, // https://github.com/zeratulmdq/vue-accordion
        'BestList': () => import('./_module/main/BestList.vue'),
    },
    data() {
        return {
            listType:{
                best: {sort:'new', limit:6},
            },
            list:{
                best:{},
            },
            bestByCategory:{},
            // best:[
            //     { title: 'First', text: 'text', url: '#', image: '/images/one.jpg' },
            // ],
            // styles: {
            //     li: {
            //         backgroundSize:'cover',
            //     },

            // }
        }
    },
    computed: {
        bestRemodel: function () {
            let dummy = [];
            for (let i in this.list.best) {
                dummy.push({
                    gd_name: this.list.best[i].gd_name,
                    ca01_name:  this.list.best[i].gc_ca01_name,
                    gd_id: this.list.best[i].gd_id,
                    image: this.list.best[i].image_src[0] })
            }
            return dummy;
        },
        ...mapState('category', ['category']),
    },
    methods: {
        async index(frm){
            try {
                const res = await ax.get(`/api/shop/goods`, { params: frm});
                if (res && res.status === 200) this.list.best = res.data.list;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    async mounted() {
        this.index(this.listType.best);

        let rst = await ax.get(`/api/main`);
        this.bestByCategory = rst.data;
        


    },
}
</script>

<style lang="css" scoped>
.recommend { margin-top:3rem; }
.recommend .back { background:#51B948; position:absolute; width:100%; height:18.5rem; }
.recommend .layout .row:last-child { margin-top:2rem; }
.recommend .layout .row .tit { color:#FFF; font-style:italic; font-size:1.4rem; font-weight:bold; margin-top:1.9Rem; margin-bottom: .6REM; }
.recommend .layout .row .col a { display:block; }
.recommend .layout .row .col a img { border:1px solid #CCC; border-radius: 10px; }

.byCate { position:relative; margin-top:5rem; }
.byCate .titByCate { margin-bottom:1.5rem; }
.byCate .titByCate h5 { font-style:italic; font-weight:bold; font-size:2rem; }

.byCate ul { position:absolute; left:-60px; border:1px solid #898989; }
.byCate ul li { padding:.4rem; opacity:.5; }
.byCate ul li:hover { background:#448AC8; opacity:1; }

.byCate .con .row { border-top:2px solid #4A505C; margin-bottom:2.5rem; }
.byCate .con .row .col { padding:0; }
.byCate .con .row .tit { flex:0 0 13.4%; max-width:200px; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1; }
.byCate .con .row .tit a { display:block; position:relative; }
.byCate .con .row .tit a img { position: absolute; z-index: -1; width: 200px; height: 500px; object-fit: cover; }
.byCate .con .row .tit a h6 { font-weight:bold; font-size:1.5rem; margin:1.5rem 0 0 1rem; }
.byCate .con .row .tit a span { color:#9FA0A2; margin:1.5rem 0 0 1rem; }
.byCate .con .row .list { display:flex; flex-wrap:wrap; }
.byCate .con .row .list .col { flex:0 0 16.666666%; max-width:16.666666%; padding:25px; text-align:center; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1; }
.byCate .con .row .list .col img { width:166px; height:166px; object-fit:cover; }
.byCate .con .row .list .col p { margin:1rem 0 0; width:164px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; height:3rem; }

</style>

