<template>
<div>
    <pop-up></pop-up>
    
    <div id="banner_box" class="layout">
        <b-link to="/board/notice/show/55" class="banner01">
            <img src="/storage/main/new/rec01.jpg" />
        </b-link>
        <b-link to="/board/notice/show/55" class="banner02">
            <img src="/storage/main/new/rec02.jpg" />
        </b-link>

        <b-carousel controls indicators :interval='0'>
            
            <b-link
                v-for="(item, i) in list.banner_goods"
                :key="i"
                :to="{ name: 'goods_show', params: {gd_id: item.sw_key} }"
                class="banner_goods"
            >   
                <b-carousel-slide :img-src="item.goods.image_src[0]">
                    <p>{{item.sw_group}}</p>
                    <p>{{item.sw_memo}}</p>
                </b-carousel-slide>
            </b-link>


            <b-link to="/board/notice/show/55">
                <b-carousel-slide img-src="/storage/main/new/slide.jpg"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/rental">
                <b-carousel-slide img-src="/storage/main/new/slide.jpg"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/goods?mode=maker&keyword=radwag">
                <b-carousel-slide :img-src="`/storage/main/new/slide.jpg`"></b-carousel-slide>
            </b-link>
        </b-carousel>

        
        <b-link to="/board/notice/show/55" class="banner03">
            <img src="/storage/main/new/rec03.jpg" />
        </b-link>
        <b-link to="/board/notice/show/55" class="banner04">
            <img src="/storage/main/new/rec04.jpg" />
        </b-link>
        
        <b-link to="/board/notice/show/55" class="banner05">
            <img src="/storage/main/new/rec05.jpg" />
        </b-link>
        <b-link to="/board/notice/show/55" class="banner06">
            <img src="/storage/main/new/rec06.jpg" />
        </b-link>
    </div>        
    
    <b-container id="best">
        <b-row class="tit layout">
            <b-col>베스트 제품만 모아놨어요.</b-col>
        </b-row>
        <div class="inner">
            <b-row class="layout">
                <b-link
                    v-for="(item, i) in bestRemodel"
                    :key="i"
                    :to="{ name: 'goods_show', params: {gd_id: item.gd_id} }"
                    class="col"
                >
                    <img :src="item.image" />
                    <div class="box-footer">
                        <sub-string v-model="item.ca01_name" :width="184" class="box_ca"></sub-string>
                        <sub-string v-model="item.gd_name" :width="184" :line02="true" class="box_tit"></sub-string>
                    </div>
                </b-link>
            </b-row>
        </div>
    </b-container>

    <b-container id="recommend_goods" class="layout">
        <b-row class="tit">
            <b-col>어떤 제품이 필요하세요?</b-col>
        </b-row>
        <b-row class="cont">
            <b-link v-for="(gd, i) in list.recommend_goods" :key="i" :to="{ name: 'goods_show', params: {gd_id: gd.gd_id} }" class="col">
                <img :src="gd.image_src_thumb[0]" />
                <span>{{gd.gd_name}}</span>
            </b-link>
        </b-row>
    </b-container>

    <b-container id="middle_banner" class="layout">
        <b-link :to="{ name: 'goods_show', params: {gd_id: 23266} }" class="col">
            <img src="/storage/main/new/middle_banner.jpg" />
        </b-link>
    </b-container>

    <b-container id="newest" class="layout">
        <b-row class="tit">
            <b-col>새로 들어온 신상!</b-col>
        </b-row>
        <b-row class="cont">
            <b-link v-for="(item, i) in list.newest" :key="i" :to="{ name: 'goods_show', params: {gd_id: item.gd_id} }" class="col">
                <img :src="item.image_src[0]" />
                <div>
                    <b-badge variant="danger">NEW</b-badge>
                    <p>{{item.maker.mk_name}}</p>
                    <p>{{item.gd_name}}</p>
                </div>
            </b-link>
        </b-row>
    </b-container>

    <b-container id="maker_shop" class="layout">
        <b-row class="tit">
            <b-col>포사이언스와 함께 하는 브랜드</b-col>
        </b-row>
        <b-row class="cont">
            <b-carousel controls indicators :interval='0'>
                <b-carousel-slide v-for="(chunk, i) in list.maker_shop" :key="i">
                    <template #img>
                        <div class="item_box">
                            <b-link v-for="(item, j) in chunk" :key="`${i}_${j}`" :to="{ name: 'makerShop_index', params: {mk_id: item.mk_id} }">
                                <img :src="item.file_info[0].path" />
                                <span>{{item.mk_name}}</span>
                            </b-link>
                        </div>
                    </template>
                </b-carousel-slide>
            </b-carousel>            
        </b-row>
    </b-container>
</div>
      
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
import PopUp from './_module/PopUp';
import SubString from '@/views/_common/SubString';

export default {
    name:"SiteMain",
    components: {
        'pop-up': PopUp,
        SubString,
    },
    data() {
        return {
            list:{
                best_main:[],
                banner_goods:[],
                recommend_goods:[],
                newest:[],
                maker_shop:[],
            },
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
        ...mapState('common', ['deviceType']),
        slide_file_nm() { return this.deviceType === "pc" ? "slide" : "sign"; }
    },
    async mounted() {
        let rst = await ax.get(`/api/main`);
        this.list.best_main =       rst.data.best_main;
        this.list.banner_goods =    rst.data.banner_goods;
        this.list.recommend_goods = rst.data.recommend_goods;
        this.list.newest =          rst.data.newest;
        this.list.maker_shop =      rst.data.maker_shop;
        if ( this.$route.query.rst=='social_login' ) {  //  소셜 로그인 후 개인정보가 없으면
            if (isEmpty(this.$store.state.auth.user.email) || isEmpty(this.$store.state.auth.user.name) || isEmpty(this.$store.state.auth.user.birth) || isEmpty(this.$store.state.auth.user.hp)) {
                this.$router.push({ name: 'my_user_edit'});
                Notify.modal('필수 개인정보를 입력하세요.', 'warning');
            }
        }
    },
}
</script>

<style lang="css" scoped>
#banner_box { display:grid; gap:30px; margin-top:20px; }
#banner_box .banner01 { grid-area: v1; }
#banner_box .banner02 { grid-area: v2; }
#banner_box .slide { grid-area: v3; }
#banner_box .banner03 { grid-area: v4; }
#banner_box .banner04 { grid-area: v5; }
#banner_box .banner05 { grid-area: v6; }
#banner_box .banner06 { grid-area: v7; }
#banner_box { grid-template-areas:
    "v1 v3 v3 v4"
    "v2 v3 v3 v5"
    "v2 v6 v7 v7";
}
@media (max-width: 767px) {
  #banner_box { gap:10px;
    grid-template-columns: 1fr 1fr; 
    grid-template-areas:
      "v3 v3"
      "v3 v3"
      "v1 v4"
      "v2 v5"
      "v2 v6"
      "v7 v7";
  }
  #banner_box>a { width:100%; }
  #banner_box>a img { width:100%; }
}
#banner_box .slide::v-deep .carousel-inner { height:100%; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item { height:100%; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item img { object-fit:contain; height:100%; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption { width:100%; height:100%; right:auto; bottom:0; left:auto; padding:0; z-index:1; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption p { position:absolute; text-align:center; width:100%; background-color:#55888888; padding:8px 5px; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption p:first-of-type { top:50%; transform:translateY(-50%); }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption p:last-of-type { bottom:0; }

#banner_box .slide { overflow:hidden; max-width:640px;  }
#banner_box .slide::v-deep .carousel-indicators li { background-color:#898989; }
#banner_box .slide::v-deep .carousel-control-prev:hover,
#banner_box .slide::v-deep .carousel-control-next:hover { background-color:#55888888; }

#banner_box .slide::v-deep .evt01 .split_link { position:absolute; display:block; height:100%; bottom:0; } 
#banner_box .slide::v-deep .evt01 .split_link#app01 { width: 100%; }
#banner_box .slide::v-deep .evt01 .split_link#app02 { left:66%; bottom:8%; width:301px; height:91px;}
#banner_box .slide::v-deep .evt01 .carousel-caption { position:static; padding:0; }
#banner_box .slide::v-deep .evt01 .split_link#app02:hover { background-color:#015B7E55; }
#banner_box .slide::v-deep .evt01 .split_link .tooltiptext {
  visibility:hidden; padding:0.25em 0.5em; background-color:black; color:#fff; text-align:center; border-radius:0.25em; white-space:nowrap;
  /* Position the tooltip */
  position:absolute; z-index:1; top:50%; transition-property:visibility; transition-delay:0s; }
#banner_box .slide::v-deep .evt01 a#app01 .tooltiptext { right:25%; }
#banner_box .slide::v-deep .evt01 a#app02 .tooltiptext { right:25%; }
#banner_box .slide::v-deep .evt01 .split_link#app02:hover .tooltiptext { visibility: visible; opacity:1; }

.container .tit .col { font-size:23px; font-weight:900; }

#best { max-width:100% !important; margin:74px auto 0 auto; }
#best .inner { background-color:#F6F7FB; padding:24px 0 10px 0; margin:12px; }
#best .inner .row a { position: relative; height:324px; width:239px; margin:6px; }
#best .inner .row a img { width:100%; height:239px; object-fit:contain; background-color: #FFFFFF; border:1px solid #D7D7D7; border-radius:20px; }
#best .inner .row a .box-footer { padding:0 8px; }
#best .inner .row a .box-footer .box_ca { color:#1A8FD4; margin:3px 0; font-size:.8rem; }
#best .inner .row a .box-footer .box_tit { font-weight:bold; }
@media (max-width: 767px) {
  #best .inner .row a { flex:0 0 33.333334%; max-width:33.333334%; margin:0; padding:10px; }
}

#recommend_goods  { margin:74px auto 0 auto; }
#recommend_goods .tit .col { margin:25px 0px; }
#recommend_goods .cont a { flex:0 0 10%; max-width:calc(10% - 20px); margin:0 10px; text-align:center; }
#recommend_goods .cont a img { width:100%; height:126px; object-fit:contain; background-color:#F3F3F3; border:1px solid #D7D7D7; border-radius:50%; margin-bottom:18px; }
#recommend_goods .cont a span { font-weight:bold; }

#middle_banner { margin-top:80px; }

#newest  { margin:74px auto 0 auto; }
#newest .tit .col { margin:25px 0px; }
#newest .cont { margin-left:-17px; margin-right:-17px; }
#newest .cont a { position:relative; flex:0 0 25%; max-width:calc(25% - 34px); margin:0 17px; text-align:center; height:480px; }
#newest .cont a img { width:100%; height:100%; object-fit:contain; background-color:#F3F3F3; border:1px solid #D7D7D7; border-radius:35px; }
#newest .cont a div { position:absolute; text-align:left; bottom:25px; left:25px; }
#newest .cont a div p { margin:0; }
#newest .cont a div p:last-of-type { font-weight:900; }

#maker_shop { margin-top:80px; }
#maker_shop .tit .col { margin:25px 0px; }
#maker_shop .cont .slide { overflow:hidden; max-width:100%; width:100%; }
#maker_shop .cont .slide::v-deep .carousel-item .item_box { display:flex; flex-wrap:wrap; }
#maker_shop .cont .slide::v-deep .carousel-item .item_box a { flex:0 0 auto; width:calc(16.666667% - 10px); height:160px; margin:0 5px; text-align:center; overflow:hidden; }
#maker_shop .cont .slide::v-deep .carousel-item .item_box a img { width:100%; height:100px; object-fit:contain; border:1px solid #000; border-radius:20px; margin-bottom:10px; }
#maker_shop .cont .slide::v-deep .carousel-control-prev, 
#maker_shop .cont .slide::v-deep .carousel-control-next { width:3%; }
#maker_shop .cont .slide::v-deep .carousel-indicators li { background-color:#898989; }
#maker_shop .cont .slide::v-deep .carousel-control-prev:hover,
#maker_shop .cont .slide::v-deep .carousel-control-next:hover { background-color:#55888888; }
</style>