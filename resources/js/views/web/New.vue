<template>
<div>
    <pop-up></pop-up>

    <div class="banner_box">
        <b-link to="/board/notice/show/55" class="banner01">
            <img src="/storage/main/bn01.jpg" />
        </b-link>
        <b-link to="/board/notice/show/55" class="banner02">
            <img src="/storage/main/bn02.jpg" />
        </b-link>

        <b-carousel controls indicators :interval='0' class="slide_banner">
            <b-link to="/board/notice/show/55">
                <b-carousel-slide img-src="/storage/main/slide01.jpg"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/rental">
                <b-carousel-slide img-src="/storage/main/slide02.jpg"></b-carousel-slide>
            </b-link>
            <b-link to="/shop/goods?mode=maker&keyword=radwag">
                <b-carousel-slide :img-src="`/storage/main/slide03.jpg`"></b-carousel-slide>
            </b-link>
        </b-carousel>

        
        <b-link to="/board/notice/show/55" class="banner03">
            <img src="/storage/main/bn01.jpg" />
        </b-link>
        <b-link to="/board/notice/show/55" class="banner04">
            <img src="/storage/main/bn01.jpg" />
        </b-link>
        
        <b-link to="/board/notice/show/55" class="banner05">
            <img src="/storage/main/bn01.jpg" />
        </b-link>
        <b-link to="/board/notice/show/55" class="banner06">
            <img src="/storage/main/bn03.jpg" />
        </b-link>
    </div>
        
    
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
                best_main:{},
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
}
</script>

<style lang="css" scoped>
.banner_box { display:grid; gap:30px; margin-top:20px; }
.banner_box .banner01 { grid-area: v1; }
.banner_box .banner02 { grid-area: v2; }
.banner_box .slide_banner { grid-area: v3; }
.banner_box .banner03 { grid-area: v4; }
.banner_box .banner04 { grid-area: v5; }
.banner_box .banner05 { grid-area: v6; }
.banner_box .banner06 { grid-area: v7; }

.banner_box { grid-template-areas:
    "v1 v3 v3 v4"
    "v2 v3 v3 v5"
    "v2 v6 v7 v7";
}

/* --- [1] 모바일 레이아웃 (오른쪽 그림) --- */
@media (max-width: 767px) {
  .banner_box { gap:10px;
    grid-template-columns: 1fr 1fr; 
    grid-template-areas:
      "v3 v3"
      "v3 v3"
      "v1 v4"
      "v2 v5"
      "v2 v6"
      "v7 v7";
  }
  .banner_box>a { width:100%; }
  .banner_box>a img { width:100%; }
}




.slide_banner { overflow:hidden; max-width:640px;  }
.slide_banner::v-deep .carousel-indicators li { background-color:#898989; }
.slide_banner::v-deep .carousel-control-prev:hover,
.slide_banner::v-deep .carousel-control-next:hover { background-color:#55888888; }

.slide_banner::v-deep .evt01 .split_link { position:absolute; display:block; height:100%; bottom:0; } 
.slide_banner::v-deep .evt01 .split_link#app01 { width: 100%; }
.slide_banner::v-deep .evt01 .split_link#app02 { left:66%; bottom:8%; width:301px; height:91px;}
.slide_banner::v-deep .evt01 .carousel-caption { position:static; padding:0; }
.slide_banner::v-deep .evt01 .split_link#app02:hover { background-color:#015B7E55; }
.slide_banner::v-deep .evt01 .split_link .tooltiptext {
  visibility:hidden; padding:0.25em 0.5em; background-color:black; color:#fff; text-align:center; border-radius:0.25em; white-space:nowrap;
  /* Position the tooltip */
  position:absolute; z-index:1; top:50%; transition-property:visibility; transition-delay:0s; }
.slide_banner::v-deep .evt01 a#app01 .tooltiptext { right:25%; }
.slide_banner::v-deep .evt01 a#app02 .tooltiptext { right:25%; }
.slide_banner::v-deep .evt01 .split_link#app02:hover .tooltiptext { visibility: visible; opacity:1; }

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
</style>