<template lang="html">
    <div>
        <b-carousel indicators class="slide_banner">
            <template v-for="(row, idx) in bestRemodel">
                <b-carousel-slide :key="idx">
                    <template #img>
                        <router-link :to="{ name: 'goods_show', params: {gd_id: row.gd_id} }">
                            <img :src="row.image" />
                        </router-link>
                    </template>
                </b-carousel-slide>
            </template>
        </b-carousel>

        <router-link :to="{ name: '', params: {} }" class="layout d-block main_banner01">
            <img src="/img/common/banner01.png" width="100%" />
        </router-link>

        <BestList :items="bestRemodel" />
    </div>
</template>


<script>
import ax from '@/api/http';
import { KinesisContainer, KinesisElement } from 'vue-kinesis';
import { vueAccordion } from 'vue-accordion';


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
                best: {sort:'new', limit:7},
            },
            list:{
                best:{},
            },
            best:[
                { title: 'First', text: 'text', url: '#', image: '/images/one.jpg' },
            ],
            styles: {
                li: {
                    backgroundSize:'cover',
                },

            }
        }
    },
    computed: {
        bestRemodel: function () {
            let dummy = [];
            for (let i in this.list.best) {
                dummy.push({
                    title: this.list.best[i].gd_name,
                    text:  this.list.best[i].price,
                    gd_id: this.list.best[i].gd_id,
                    url:   '/shop/goods/'+this.list.best[i].gd_id,
                    image: this.list.best[i].image_src[0] })
            }
            return dummy;
        }
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
    mounted() {
        this.index(this.listType.best);
    },
}
</script>

<style lang="css" scoped>
.intro {
    display: -webkit-box; display: -ms-flexbox; display: flex;
    -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column;
    -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center;
    align-items: center; height:40vh; position: relative; }
.intro {
    background: linear-gradient(124deg, #FFCBCB, #FFDBCB, #FFF2CB, #FFFFD3, #D1FFD8, #CEFCFF, #D6D1FF, #FCD3FF, #FCD3FF);
    background-size: 1800% 1800%;
    -webkit-animation: rainbow 18s ease infinite; -z-animation: rainbow 18s ease infinite; -o-animation: rainbow 18s ease infinite; animation: rainbow 18s ease infinite;
}
@-webkit-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@-moz-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@-o-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }

.intro .item { position:absolute; background-repeat:no-repeat; background-size:contain; }
.intro .item.heart { background-image:url(/img/main/heart.png); width:7vw; height:7vw; right:7vw; }
.intro .item.molecular  { background-image:url(/img/main/molecular.png); width:13vw; height:13vw; right:20%; }
.intro .item.microscope { background-image:url(/img/main/microscope.png); width:8vw; height:8vw; left:30%; top:25%; }
.intro .item.neurons { background-image:url(/img/main/neurons.png); width:10vw; height:10vw; right:20%; top:90%; }
.intro .item.dna { background-image:url(/img/main/dna.png); width:8vw; height:8vw; left:20%; top:60%; }
.intro .item.spoid { background-image:url(/img/main/spoid.png); width:15vw; height:15vw; left:2vw; top:15%; }

.intro h1 {position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;color:#351b1b;font-size:72px}
.intro h1 span:first-of-type{margin-top:0}
.intro h1 span:nth-of-type(2){margin-top:-20px}
.intro h1 span:nth-of-type(3){margin-top:-7px}
.intro h1 span:nth-of-type(4){margin-top:8px}
.intro h1 span:nth-of-type(5){margin-top:-13px}
.intro h1 span:nth-of-type(6){margin-top:-5px}
.intro h1 span:nth-of-type(7){margin-top:0}
.intro h1 span:nth-of-type(8){margin-top:-6px}
.intro .slogan { z-index:2; }

.slide_banner { margin:2rem 0; }
.slide_banner >>> .carousel-inner .carousel-item a img { width:100%; height:600px; object-fit:cover; }

.main_banner01 { margin-bottom:2rem;}

.click_buy { border:1px solid red; height:220px; }
.click_buy .title { font-size:2.5rem; font-weight:bold; font-family: Serif; }
.click_buy .list {  }
.click_buy .list .piece { /*position:absolute; top:0; left:0;*/ width:150px; height:150px; float:left; }
.click_buy .list:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.click_buy .list .piece:nth-of-type(1) { transform : translatex(-500px); }
.click_buy .list .piece:nth-of-type(2) { transform : translatex(-300px); }
.click_buy .list .piece:nth-of-type(3) { transform : translatex(-150px); }
.click_buy .list .piece:nth-of-type(4) { transform : translatex(0px); }
.click_buy .list .piece a img { width:150px; height:150px; object-fit:cover; }


#list_best { max-width:100%; height:550px; }
#list_best ul li img { width:100px; height:100px; object-fit:cover; }


.solar_system {padding: 200px 0;}
.solar_system .orbit-container { position: relative; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; }
.solar_system .orbit-container .sun { width: 80px; height: 80px; }
.solar_system .orbit-container .earthmoon {display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; -ms-flex-align: center; align-items: center; left: calc(50% + 40px); position: absolute;}
.solar_system .orbit-container .earthmoon .earth { width: 30px; height: 30px; margin-left: 30px; }
.solar_system .orbit-container .earthmoon .moon { width: 15px; height: 15px; margin-left: 20px; }
.solar_system .orbit-container .mars { width: 25px; height: 25px; margin-left: 30px; left: calc(50% + 135px); position: absolute; }
</style>
