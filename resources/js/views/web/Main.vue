<template>
<div>
    <pop-up></pop-up>
    
    <div id="banner_box" class="layout">
        <b-link to="/shop/goods/1227" class="area_tl">
            <img src="/storage/main/new/bn01.jpg" />
        </b-link>

        <b-carousel controls indicators :interval='0' class="area_tc">
            <b-link to="/board/notice/show/55">
                <b-carousel-slide img-src="/storage/main/new/bn02.jpg"></b-carousel-slide>
            </b-link>
            
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
        </b-carousel>

        <b-link to="/shop/goods/817906" class="area_tr">
            <img src="/storage/main/new/bn03.jpg" />
        </b-link>
        <div class="area_bl">
            <img src="/storage/main/new/bn0401.jpg" class="bg" />
            <div class="scene">
                <div class="carousel">
                    <b-link to="/shop/goods/7919">
                        <img src="/storage/main/new/bn0402.png" alt="피펫1">
                    </b-link>
                    <b-link to="/shop/goods/18182">
                        <img src="/storage/main/new/bn0403.png" alt="피펫2">
                    </b-link>
                </div>
            </div>
        </div>

        <div class="area_bc">
            <b-link to="/shop/goods?ca01=28&ca02=3481&ca03=3483" class="area_bc01">
                <img src="/storage/main/new/bn05.jpg" />
            </b-link>
            <b-link to="/shop/goods?ca01=26&ca02=1008" class="area_bc02">
                <img src="/storage/main/new/bn06.jpg" />
            </b-link>
        </div>
        <b-link to="/shop/goods?ca01=26&ca02=1067" class="area_br">
            <img src="/storage/main/new/bn07.jpg" />
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
        <b-link to="/board/notice/show/55" class="col">
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

        
        
        /////////////////////    회전 베너  시작     //////////////////////////
        const items = document.querySelectorAll('#banner_box .area_bl .scene .carousel a');
        const total = items.length;
        const isMobile = window.innerWidth <= 767;
        const radius = isMobile ? 35 : 55;
        const yRadius = isMobile ? 30 : 60;
        let angle = 0;
        let paused = false;  // ✅ animate와 같은 스코프에 있어야 함

        const scene = document.querySelector('#banner_box .area_bl .scene');

        scene.addEventListener('mouseenter', () => {
            paused = true;
            const spreadAngle = 360 / total;
            items.forEach((item, i) => {
                const targetTheta = i * spreadAngle + 90;
                const targetRad = targetTheta * Math.PI / 180;
                const x = Math.sin(targetRad) * radius;
                const y = Math.cos(targetRad) * 60;
                const scale = 0.6 + (Math.cos(targetRad) + 1) / 2 * 0.4;

                item.style.transition = 'transform 0.5s ease';
                item.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
                item.style.zIndex = Math.round(scale * 10);
            });
        });

        scene.addEventListener('mouseleave', () => {
            paused = false;
            items.forEach(item => item.style.transition = '');
        });

        function animate() {
            if (!paused) {
                angle += 0.7;

                items.forEach((item, i) => {
                    const theta = (i / total) * 360 + angle;
                    const rad = theta * Math.PI / 180;
                    const x = Math.sin(rad) * radius;
                    const y = Math.cos(rad) * yRadius;
                    const scale = 0.6 + (Math.cos(rad) + 1) / 2 * 0.4;

                    item.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale})`;
                    item.style.zIndex = Math.round(scale * 10);
                });
            }

            requestAnimationFrame(animate);
        }

        animate();
        /////////////////////    회전 베너  끝   //////////////////////////

    },
}
</script>

<style lang="css" scoped>
#banner_box { display:grid; gap:30px; margin-top:20px; }
#banner_box .area_tl { grid-area: area_tl; }
#banner_box .area_tc { grid-area: area_tc; }
#banner_box .area_tr { grid-area: area_tr; }
#banner_box .area_bl { grid-area: area_bl; position:relative; width: 100%; }
#banner_box .area_bl .bg { position: absolute; width: 100%; }
#banner_box .area_bl .scene { width:270px; height:340px; perspective:600px; position:relative; }
#banner_box .area_bl .scene .carousel { width:100%; height:100%; position:relative; transform-style:preserve-3d; }
#banner_box .area_bl .scene .carousel a { position:absolute; width:164px; height:240px; top:50%; left:50%; margin-top:-120px; margin-left:-82px; display:flex; align-items:center; justify-content:center; }
#banner_box .area_bl .scene .carousel a img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5)); }
#banner_box .area_bc { grid-area:area_bc; display:flex; gap:30px; }
#banner_box .area_bc .area_bc01 { flex: 270; }
#banner_box .area_bc .area_bc02 { flex: 600; }
#banner_box .area_bc .area_bc01 img,
#banner_box .area_bc .area_bc02 img { width:100%; height:100%; object-fit:cover; display:block; }
#banner_box .area_br { grid-area:area_br; }
#banner_box { 
    grid-template-columns: 270px 270px 600px 270px;
    grid-template-areas: "area_tl area_tc area_tc area_tr"
                         "area_bl area_tc area_tc area_tr"
                         "area_bl area_bc area_bc area_br";
}
@media (max-width: 767px) {
     #banner_box {
        width: 100%;
        gap: 10px;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
        "area_tc area_tc"
        "area_tl area_tr"
        "area_bl area_tr"
        "area_bl area_br"
        "area_bc area_bc";  /* 하단을 하나로 묶기 */
    }
  
    #banner_box .area_bc { gap:10px; }
    #banner_box .area_bc .area_bc01,
    #banner_box .area_bc .area_bc02 { min-width:0; }
    #banner_box .area_bc .area_bc02 img { width: 100%; height: 100%; object-fit: cover; }
    #banner_box > a { width: 100%; }
    #banner_box > a img { width: 100%; height: 100%; object-fit: cover; }

    
    #banner_box .area_bl .scene { width:100%; height:100%; perspective:600px; position:relative; }
    #banner_box .area_bl .scene .carousel a { width: 100px; height: 150px; margin-top:-75px; margin-left:-50px; top:30%; }
}


#banner_box .slide { overflow:hidden; max-width:900px; max-height:460px; }
#banner_box .slide::v-deep .carousel-inner { height:100%; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item { height:100%; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item img { object-fit:contain; height:100%; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption { width:100%; height:100%; right:auto; bottom:0; left:auto; padding:0; z-index:1; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption p { position:absolute; text-align:center; width:100%; background-color:#55888888; padding:8px 5px; }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption p:first-of-type { top:50%; transform:translateY(-50%); }
#banner_box .slide::v-deep .carousel-inner .banner_goods .carousel-item .carousel-caption p:last-of-type { bottom:0; }

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
#best .inner .row a { position: relative; margin:6px; }
#best .inner .row a img { width:100%; height:239px; object-fit:contain; background-color: #FFFFFF; border:1px solid #D7D7D7; border-radius:20px; }
#best .inner .row a .box-footer { padding:0 8px; }
#best .inner .row a .box-footer .box_ca { color:#1A8FD4; margin:3px 0; font-size:.8rem; }
#best .inner .row a .box-footer .box_tit { font-weight:bold; }
@media (max-width: 767px) {
    #best { margin-top:30px; }
    #best .inner .row a { flex:0 0 33.333334%; max-width:33.333334%; margin:0; padding:10px; }
    #best .inner .row a img { height: auto; aspect-ratio: 1 / 1; }
}

#recommend_goods  { margin:74px auto 0 auto; }
#recommend_goods .tit .col { margin:25px 0px; }
#recommend_goods .cont a { flex:0 0 10%; max-width:calc(10% - 20px); margin:0 10px; text-align:center; }
#recommend_goods .cont a img { width:100%; height:126px; object-fit:contain; background-color:#F3F3F3; border:1px solid #D7D7D7; border-radius:50%; margin-bottom:18px; }
#recommend_goods .cont a span { font-weight:bold; }
@media (max-width: 767px) {
    #recommend_goods  { margin:0; }
    #recommend_goods .cont { flex-wrap: wrap; }
    #recommend_goods .cont a:nth-child(n+10) { display: none; }
    #recommend_goods .cont a { flex:0 0 33.333%; max-width:calc(33.333% - 6px); margin:0 3px 10PX; }
    #recommend_goods .cont a img { height: auto; aspect-ratio: 1 / 1; }
}

#middle_banner { margin-top:80px; }
#middle_banner .col { overflow: hidden; }
#middle_banner .col img { width: 100%; }

@media (max-width: 767px) {
    #middle_banner { margin-top:30px; }
    #middle_banner .col { overflow: hidden; width: 100%; }
    #middle_banner .col img { width:130%; height: auto; position: relative; left: 50%; transform: translateX(-50%); }
}

#newest  { margin:74px auto 0 auto; }
#newest .tit .col { margin:25px 0px; }
#newest .cont { margin-left:-17px; margin-right:-17px; }
#newest .cont a { position:relative; flex:0 0 25%; max-width:calc(25% - 34px); margin:0 17px; text-align:center; }
#newest .cont a img { width:100%; height: auto; aspect-ratio: 1 / 1; object-fit:contain; background-color:#F3F3F3; border:1px solid #D7D7D7; border-radius:13px; }
#newest .cont a div { text-align:left; margin-top:10px; }
#newest .cont a div p { margin:0; }
#newest .cont a div p:last-of-type { font-weight:900; }
@media (max-width: 767px) {
    #newest  { margin:0; }
    #newest .cont { margin:0; }
    #newest .cont a { flex:0 0 50%; max-width:calc(50% - 6px); margin:0 3px 10PX; }
    #newest .cont a div p:last-of-type { font-size: 13px; }
}

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
@media (max-width: 767px) {
    #maker_shop { margin-top:0; }
    #maker_shop .cont .slide::v-deep .carousel-item .item_box a { width:calc(25% - 10px); height:auto; }
    #maker_shop .cont .slide::v-deep .carousel-item .item_box a img { height: auto; aspect-ratio: 1 / 1;}
}
</style>