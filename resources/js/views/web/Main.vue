<template>
<div>
    <pop-up></pop-up>
    
    <b-carousel controls indicators :interval='0' class="slide_banner">
        <template>
            <!-- <b-carousel-slide v-if="deviceType=='pc'" :img-src="`/storage/event/2025/0407/slide_bg.jpg`" class="evt01">
                <router-link to="/shop/goods?ca01=27&ca02=1232&ca03=1233" id="app01" class="split_link">
                    <b-img src="/storage/event/2025/0407/slide01.png" class="product pd01" />
                    <span class="tooltiptext">멤브레인필터 바로가기</span>
                </router-link>
                <router-link to="/shop/goods?ca01=27&ca02=1232&ca03=1242" id="app02" class="split_link">
                    <b-img src="/storage/event/2025/0407/slide02.png" class="product pd02" />
                    <span class="tooltiptext">실린지필터 바로가기</span>
                </router-link>
            </b-carousel-slide>
            <b-link v-else to="/shop/goods?ca01=27&ca02=1232&ca03=1233">
                <b-carousel-slide :img-src="`/storage/event/2025/0407/${slide_file_nm}.jpg`"></b-carousel-slide>
            </b-link> -->

            <b-link to="/shop/goods/808324">
                <b-carousel-slide :img-src="`/storage/event/2025/0721/${slide_file_nm}.jpg`"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/goods?ca01=36">
                <b-carousel-slide :img-src="`/storage/event/2025/0320/${slide_file_nm}.jpg`"></b-carousel-slide>
            </b-link>
            <b-link to="/board/notice/show/55" v-if="deviceType=='pc'">
                <b-carousel-slide img-src="/storage/event/2025/0224/slide.jpg"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/rental" v-if="deviceType=='pc'">
                <b-carousel-slide img-src="/storage/event/2023/1208/slide.jpg"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/goods?mode=maker&keyword=radwag">
                <b-carousel-slide :img-src="`/storage/event/2023/0918/${slide_file_nm}.jpg`"></b-carousel-slide>
            </b-link>
        </template>
    </b-carousel>    
    
    <b-row id="best" class="layout">
        <b-col>
            <b-img src="/storage/main/best.gif"></b-img>
        </b-col>
        <b-col>
            <div class="box-row">
                <b-link
                    v-for="(item, i) in bestRemodel"
                    :key="i"
                    :to="{ name: 'goods_show', params: {gd_id: item.gd_id} }"
                >
                    <img :src="item.image" />
                    <div class="box-footer">
                        <sub-string v-model="item.ca01_name" :width="184" class="box_ca"></sub-string>
                        <sub-string v-model="item.gd_name" :width="184" :line02="true" class="box_tit"></sub-string>
                    </div>
                </b-link>
            </div>
        </b-col>
    </b-row>

    <div class="recommend">
        <div class="back"></div>
        <b-container class="layout">
            <b-row>
                <b-col class="tit">포사의 추천 ></b-col>
            </b-row>
            <b-row>
                <b-col col cols="12" md="12" lg="6"><b-link :to="{name:'goods_show', params:{gd_id:1227}}"><b-img :src="`${s3url}main/rec01.png`" /></b-link></b-col>
                <b-col col cols="6" md="6" lg="3"><b-link :to="{name:'goods_show', params:{gd_id:46852}}"><b-img :src="`${s3url}main/rec02.png`" /></b-link></b-col>
                <b-col col cols="6" md="6" lg="3"><b-link :to="{name:'goods_index', query: {ca01:'28', ca02:'3481', ca03:'3483'}}"><b-img :src="`${s3url}main/rec03.png`" /></b-link></b-col>
            </b-row>
            <b-row>
                <b-col col cols="6" md="6" lg="3"><b-link :to="{name:'goods_show', params:{gd_id:7919}}"><b-img :src="`${s3url}main/rec04.png`" /></b-link></b-col>
                <b-col col cols="6" md="6" lg="3"><b-link :to="{name:'goods_index', query: {ca01:'30', ca02:'5042'}}"><b-img :src="`${s3url}main/rec06.png`" /></b-link></b-col>
                <b-col col cols="12" md="12" lg="6"><b-link :to="{name:'goods_index', query: {keyword:'goodsgood'}}"><b-img :src="`${s3url}main/rec05.png`" /></b-link></b-col>
            </b-row>
        </b-container>
    </div>

    <div class="byCate layout">
        <b-row class="titByCate">
            <b-col tag="h5">카테고리별 추천</b-col>
        </b-row>

        <aside :style="{ position: cateSideMenuPosition, top: cateSideMenuTop, bottom: cateSideMenuBottom }">
            <ul>
                <li v-for="(ca, i) in filteredCategories" :key="ca.ca_id"
                    @mouseenter="ca.hover = !ca.hover"
                    @mouseleave="ca.hover = !ca.hover"
                    @click="scrollToCate(i)"
                    :class="{ 'active': ca.showing }"
                >
                    <img :src="(ca.hover||ca.showing ) ? `${s3url}main/cate/${ca.ca_id}_.png` : `${s3url}main/cate/${ca.ca_id}.png`" />
                    <span v-if="ca.hover">{{ca.ca_name}}</span>
                </li>
            </ul>
        </aside>

        <b-container class="con">
            <b-row v-for="ca in filteredCategories" :key="ca.ca_id">
                <b-col class="tit">                    
                    <b-link :to="{name: 'goods_index', query: { ca01:ca.ca_id } }">
                        <b-img :src="`${s3url}main/cate/bg${ca.ca_id}.gif`"></b-img>
                        <h6>{{ca.ca_name}}</h6>
                        <span>전체보기 <b-icon-chevron-right /></span>
                    </b-link>
                </b-col>
                <b-col class="list">
                    <b-link class="col" 
                        v-for="(gd, i) in best_cate[ca.ca_id]" :key="i"
                        :to="{name:'goods_show', params:{gd_id:gd.sw_key}}"
                    >
                        <b-img fluid :src="gd.image_src_thumb[0]"></b-img>
                        <p>{{gd.gd_name}}</p>
                    </b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex'

export default {
    name:"SiteMain",
    components: {
        'pop-up': () => import('./_module/PopUp'),
        'sub-string': () => import('@/views/_common/SubString.vue'),
    },
    data() {
        return {
            list:{
                best_main:{},
            },
            best_cate: {},
            cateSideMenuPosition: 'absolute',
            cateSideMenuTop: 'auto',
            cateSideMenuBottom: 'auto',
            scrollVal: [1690, 2232, 2776, 3317, 3859, 4401, 4943, 5485, 6027, 6569, 7111, 7653, 8195, 8737, 9279, 9821, 10363, 10905, 11447, 11983],
            scrollEnd: 11549,
            currentScroll:0,

            date01: new Date('2023-05-02 00:00'),
            date02: new Date('2023-05-16 23:59'),
            date_now: new Date(),
        }
    },
    computed: {
        bestRemodel: function () {
            let dummy = [];
            const list = this.list.best_main;

            if (Array.isArray(list)) {
                for (const item of list) {
                    if (!item || !item.goods) continue;
                    dummy.push({
                        gd_name: item.goods.gd_name, 
                        ca01_name: item.goods.goods_category_first.gc_ca01_name,
                        gd_id: item.goods.gd_id,
                        image: item.goods.image_src_thumb?.[0] || ''
                    });
                }
            }            
            return dummy;
        },
        ...mapState('category', ['category']),
        ...mapState('common', ['deviceType']),
        filteredCategories () { return this.category.filter(ca => ![38].includes(ca.ca_id)); },
        slide_check01() { return this.date01 < this.date_now && this.date_now < this.date02; },
        slide_check02() { return this.date02 < this.date_now; },
        slide_file_nm() { return this.deviceType === "pc" ? "slide" : "sign"; }
    },
    methods: {
        scrollToCate(i){    
            window.scrollTo({
                top: this.scrollVal[i],
                left: 0,
                behavior: 'smooth'
            })
        },
        scrollch(k) {
            if (k=='e') {
                window.scroll(0, this.currentScroll);
            } else if (k=='+') {
                window.scroll(0, this.currentScroll++);
            } else {
                window.scroll(0, this.currentScroll--);
            }

        },
        scrollListener: function (e) {
            this.currentScroll = window.scrollY;
            if (window.scrollY > this.scrollEnd) {
                this.cateSideMenuPosition = 'absolute';
                this.cateSideMenuTop = 'auto';
                this.cateSideMenuBottom = 0;
            } else if (window.scrollY > this.scrollVal[0]) {
                this.cateSideMenuPosition = 'fixed';
                this.cateSideMenuTop = '153px';
                this.cateSideMenuBottom = 'auto';
            } else if (window.scrollY < this.scrollVal[0]) {
                this.cateSideMenuPosition = 'absolute';
                this.cateSideMenuTop = 'auto';
                this.cateSideMenuBottom = 'auto';
            }

            for (let i in this.scrollVal) {
                if (i < this.scrollVal.length-1 && this.scrollVal[i] < window.scrollY && window.scrollY < this.scrollVal[Number(i)+1])
                    this.category[i].showing = true;
                else
                    this.category[i].showing = false; 
            }
            
        }
    },
    async mounted() {
        window.addEventListener('scroll', this.scrollListener)  

        let rst = await ax.get(`/api/main`);
        this.best_cate = rst.data.best_cate;
        this.list.best_main = rst.data.best_main;
        if ( this.$route.query.rst=='social_login' ) {  //  소셜 로그인 후 개인정보가 없으면
            if (isEmpty(this.$store.state.auth.user.email) || isEmpty(this.$store.state.auth.user.name) || isEmpty(this.$store.state.auth.user.birth) || isEmpty(this.$store.state.auth.user.hp)) {
                this.$router.push({ name: 'my_user_edit'});
                Notify.modal('필수 개인정보를 입력하세요.', 'warning');
            }
        }
    },
    beforeDestroy: function () {
       window.removeEventListener('scroll', this.scrollListener)
    }
}
</script>

<style lang="css" scoped>
.slide_banner { overflow:hidden; max-width: 1920px; margin: auto; }
.slide_banner::v-deep .carousel-indicators li { background-color:#898989; }
.slide_banner::v-deep .carousel-control-prev:hover,
.slide_banner::v-deep .carousel-control-next:hover { background-color:#55888888; }

.slide_banner::v-deep .evt01 .split_link { position:absolute; display:block; width:50%; height:100%; bottom:0; transform:translateX(-50%); } 
.slide_banner::v-deep .evt01 .split_link#app01 { left:25%; }
.slide_banner::v-deep .evt01 .split_link#app02 { left:75%;}
.slide_banner::v-deep .evt01 .carousel-caption { position:static; padding:0; }
.slide_banner::v-deep .evt01 .split_link:hover { background-color:#015B7E55; }
.slide_banner::v-deep .evt01 .split_link .tooltiptext {
  visibility:hidden; padding:0.25em 0.5em; background-color:black; color:#fff; text-align:center; border-radius:0.25em; white-space:nowrap;
  /* Position the tooltip */
  position:absolute; z-index:1; top:50%; transition-property:visibility; transition-delay:0s; }
.slide_banner::v-deep .evt01 a#app01 .tooltiptext { right:25%; }
.slide_banner::v-deep .evt01 a#app02 .tooltiptext { left:25%; }
.slide_banner::v-deep .evt01 .split_link:hover .tooltiptext { visibility: visible; opacity:1; }


/***************************************** */
/*
.slide_banner .split_link .product { position:absolute; }
.product { position:absolute; animation:appearance 0.5s forwards ease-in-out 1.2s, product 3s infinite ease-in-out 2s; }
.slide_banner .split_link .product.pd01 { top:80px; right:420px; animation:product 3s infinite ease-in-out 1s; }
.slide_banner .split_link .product.pd02 { top:70px; left:395px;  animation:product 3s infinite ease-in-out 1.3s; }
.slide_banner .split_link:hover .product.pd01 { animation:ani02 3s infinite ease-in-out .1s; }
.slide_banner .split_link:hover .product.pd02 { animation:ani02 3s infinite ease-in-out .1s; }
*/
@keyframes appearance { 0% { transform: scale(0); }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity:1; } }
@keyframes product { 0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(60px); } }
/* @keyframes product { 0%, 100% { transform: translateY(0) scale(1) rotate(-10deg); }
                    50% { transform: translateY(60px) scale(0.7) rotate(10deg); } } */
@keyframes ani02 { 0% { transform: translateY(0) scale(.95) rotate(-15deg); }
                  50% { transform: translateY(0) scale(1.1) rotate(15deg); }
                 100% { transform: translateY(0) scale(.95) rotate(-15deg); } }                    






#best { margin-top:26px; }
#best>.col { padding:0; }
#best>.col:nth-of-type(1) { flex:0 0 6.933334%; max-width:6.933334%; padding-top:20px; }
#best>.col:nth-of-type(2) { flex:0 0 93.066666%; max-width:93.066666%; }
#best .col .box-row { display:flex; justify-content:center; align-items:center; width:100%; height:320px; }
#best .col .box-row a { position: relative; background-color: #FFFFFF; height:288px; width:220px; margin:10px; }
#best .col .box-row a:last-of-type { margin-right:0; }
#best .col .box-row a img { width: 100%; height: 210px; object-fit:contain; border: 1px solid #B7B7B7; }
#best .col .box-row a .box-footer { position:absolute; bottom:0; height:80px; padding:10px 15px; }
#best .col .box-row a .box-footer .box_ca { color:#1A8FD4; margin-bottom:3px; font-size:.8rem; }
#best .col .box-row a .box-footer .box_tit { font-weight:bold; }

.recommend .back { background:#fbcad0; position:absolute; width:100%; height:18.5rem; }
.recommend .container .row:last-child { margin-top:2rem; }
.recommend .container .row .tit { color:#FFF; font-style:italic; font-size:1.4rem; font-weight:bold; margin-top:1.9Rem; margin-bottom: .6REM; }
.recommend .container .row .col { padding:0 15px; }
.recommend .container .row .col a { display:block; }
.recommend .container .row .col a img { border:1px solid #CCC; border-radius:10px; width:100%; }

.byCate { position:relative; margin-top:5rem; }
.byCate .titByCate { margin-bottom:1.5rem; }
.byCate .titByCate h5 { font-style:italic; font-weight:bold; font-size:2rem; }

.byCate aside { margin-left:-76px; z-index:1; }
.byCate aside ul { border:1px solid #898989; }
.byCate aside ul li { padding:4px 6px; cursor:pointer; position:relative; }
.byCate aside ul li.active,
.byCate aside ul li:hover { background:#448AC8; }
.byCate aside ul li span { padding-left:10px; background:#448AC8; position:absolute; width:216px; color:#fff; z-index:1; top:0; line-height:44px; }

.byCate .con .row { border-top:2px solid #4A505C; margin-bottom:2.5rem; }
.byCate .con .row .col { padding:0; }
.byCate .con .row .tit { flex:0 0 13.4%; max-width:200px; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1; }
.byCate .con .row .tit a { display:block; position:relative; height:100%; padding: 24px 0 0 16px; }
.byCate .con .row .tit a img { position:absolute; z-index:-1; width:200px; height:500px; object-fit:cover; top:0; left:0; }
.byCate .con .row .tit a h6 { font-weight:bold; font-size:1.5rem; }
.byCate .con .row .tit a span { color:#9FA0A2; }
.byCate .con .row .list { display:flex; flex-wrap:wrap; }
.byCate .con .row .list .col { flex:0 0 16.666666%; max-width:16.666666%; padding:16px; text-align:center; border-right:1px solid #B1B1B1; border-bottom:1px solid #B1B1B1; }
.byCate .con .row .list .col img { width:166px; height:166px; object-fit:contain; }
.byCate .con .row .list .col p { margin:9px 0 0 0; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; height:42px; font-size:14px; }


@media (max-width: 992px){
    .slide_banner::v-deep .carousel-inner { left:50%; transform:translateX(-50%); width:900px; }
    #best { flex-direction: column; margin-top: 10px; }
    #best>.col:nth-of-type(1) { padding:0; }
    #best>.col:nth-of-type(2) { flex:0 0 100%; max-width:100%; }
    #best .col .box-row { flex-wrap:wrap; height:auto; }
    #best .col .box-row a { flex:0 0 33.333334%; max-width:33.333334%; height:180px; margin:0; padding:10px; }
    #best .col .box-row a img { height:110px; }
    #best .col .box-row a .box-footer { padding: 0 5px; position: static; height: auto; line-height: 1;}
    #best .col .box-row a .box-footer .box_ca { font-size: calc(.3vw + .5rem); }
    #best .col .box-row a .box-footer .box_tit { font-size: calc(.3vw + .7rem); }

    .recommend .container .row:nth-of-type(2) .col-md-6,
    .recommend .container .row:last-child,
    .recommend .container .row:last-child .col-md-12  { margin-top:.5rem; }

    .byCate .titByCate { margin:0; }
    .byCate .con .row { flex-direction:column; margin-bottom:1rem; }
    .byCate .con .row .tit { max-width: 100%; }
    .byCate .con .row .tit a { padding: 8px 0 0 8px; }
    .byCate .con .row .tit a img { display:none; }
    .byCate .con .row .tit a h6 { display:inline-block; }
    .byCate .con .row .list .col { padding:5px; flex: 0 0 25%; max-width: 25%; }
    .byCate .con .row .list .col img { width:100%; height:80px; }
    .byCate .con .row .list .col p { font-size: calc(.3vw + .7rem); margin:0; height:auto; }
}
@media (max-width: 768px){
    .slide_banner::v-deep .carousel-inner { max-width:450px; width:100%; }
}
</style>

