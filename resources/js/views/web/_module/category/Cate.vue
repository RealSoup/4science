<template>
<div id="categorys">
    <ul class="depth01 layout">
        <li
            @click="all_show = true"
            @mouseleave="all_show = false"
        >
            <span class="ca01">
                <img v-if="all_show" :src="s3url+'common/cate/all_.png'" />
                <img v-else :src="s3url+'common/cate/all.png'" />
            </span>
            <ul :class="{all_show:all_show}">
                <li v-for="ca in category_all" :key="`all${ca.ca_id}`" @mouseenter="ca.sub_show = true" @mouseleave="ca.sub_show = false">
                    <b-link 
                        @click="$emit('close_cate')"
                        :to="{name: 'goods_index', query: {ca01:ca.ca_id}}"
                    >{{ca.ca_name}}</b-link>
                    <CateSub :sub_show='ca.sub_show && ca.sub.length' :depth='1' :cate="ca.sub" :paramLink="'/'+ca.ca_id" />
                </li>
            </ul>
            
        </li>


        <li
            v-for="ca in category"
            :key="ca.ca_id"
            :class="{ 'active': check_query(ca.ca_id) }"
            @click="ca.sub_show = true"
            @mouseleave="ca.sub_show = false"
        >
            <span class="ca01" @mouseenter="ca.show_txt=true" @mouseleave="ca.show_txt=false">
                <transition name="slideUpDown">
                    <div v-if="!ca.show_txt" class="icon_cell">
                        <img v-if="check_query(ca.ca_id) || ca.sub_show" :src="s3url+'common/cate/'+ca.ca_id+'_.png'" />
                        <img v-else :src="s3url+'common/cate/'+ca.ca_id+'.png'" />
                    </div>
                </transition>
                <transition name="slideUpDown">
                    <div v-if="ca.show_txt" class="icon_cell">
                             <i v-if="ca.ca_id==21">레이저<br>광학기기</i>
                        <i v-else-if="ca.ca_id==23"><p>데이터<br>처리장치</p>소프트웨어</i>
                        <i v-else-if="ca.ca_id==22">현미경<br>영상기기</i>
                        <i v-else-if="ca.ca_id==25">분석기기</i>
                        <i v-else-if="ca.ca_id==24">계측기<br>전원공급기</i>
                        <i v-else-if="ca.ca_id==26">이화학기기</i>
                        <i v-else-if="ca.ca_id==27">초자</i>
                        <i v-else-if="ca.ca_id==40">Merck<p>SIGMA-<br>ALDRICH</p></i>
                        <i v-else-if="ca.ca_id==45">Good<br>Fellow</i>
                        <i v-else-if="ca.ca_id==28">시약</i>
                        <i v-else-if="ca.ca_id==29">재료<br>웨이퍼</i>
                        <i v-else-if="ca.ca_id==30">클린룸용품</i>
                        <i v-else-if="ca.ca_id==31"><p>진공/펌프<br>가스</p>반응용기</i>
                        <i v-else-if="ca.ca_id==32">기계<br>로봇</i>
                        <i v-else-if="ca.ca_id==33">공구</i>
                        <i v-else-if="ca.ca_id==41">안전용품</i>
                        <i v-else-if="ca.ca_id==34"><p>교육용<br>기자재</p>실험용가구</i>
                        <i v-else-if="ca.ca_id==35">과학나라</i>
                        <i v-else-if="ca.ca_id==38">Edmund</i>
                        <i v-else-if="ca.ca_id==44">리퍼상품<br>할인판매</i>
                        <i v-else>{{ca.ca_name}}</i>
                    </div>
                </transition>
            </span>
            <CateSub
                :sub_show   = 'ca.sub_show && ca.sub.length'
                :depth      = '1'
                :cate       = "ca.sub"
                :paramLink  = "'/'+ca.ca_id"
                :papaName   = "ca.ca_name"
            />
        </li>
        <li @mouseenter="cus_hover=true" @mouseleave="cus_hover=false">
            <span class="ca01">
                <transition name="slideUpDown">
                    <div v-if="!cus_hover" class="icon_cell">
                        <b-link :to="{name: 'estimate_custom_index' }" style="padding:0;">
                            <img :src="s3url+'common/cate/custom.png'" />
                            <!-- <span>주문제작</span> -->
                        </b-link>
                    </div>
                </transition>
                <transition name="slideUpDown">
                    <div v-if="cus_hover" class="icon_cell">
                        <b-link :to="{name: 'estimate_custom_index' }" style="padding:0;">
                            <i>주문제작</i>
                        </b-link>
                    </div>
                </transition>
            </span>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ModuleCategory',
    components: { 
        'CateSub': () => import('./CateSub'), 
        'CateSubAll': () => import('./CateSubAll'), 
    },
    data() {
        return {
            cus_hover: false,
            all_show:false,
        }
    },

    computed: { ...mapState('category', ['category', 'category_all']), },
    methods: {
        check_query: function (ca01) { return this.$route.query.ca01 == ca01 ? true : false; },
    },
} 
</script>

<style lang="css" scoped>
#categorys { background:#626C75; z-index:17; position:relative; }
#categorys .depth01 { display:flex; }
#categorys .depth01 > li { width:4.761904%; cursor:pointer; }
#categorys .depth01 > li .ca01 { display:flex; align-items:center; flex-direction:column; padding:8px 5px; overflow:hidden; height:100%; }
#categorys .depth01 > li:first-of-type .ca01 { padding-left:0; }
#categorys .depth01 > li:first-of-type ul { display:none; }
#categorys .depth01 > li:first-of-type ul.all_show { display:block; }
#categorys .depth01 > li:last-of-type .ca01 { padding-right:0; }
#categorys .depth01 > li .ca01 img { width:46px; }
#categorys .depth01 > li .ca01 span { transition:.3s; font-size:.2rem; letter-spacing:-4px; color:#FFF; white-space: nowrap; }
#categorys .depth01 > li.active .ca01 span,
#categorys .depth01 > li:hover .ca01 span { color:#FFF200; font-weight:bold; font-size:.8rem; letter-spacing:-1px; z-index:2; background:#626C75; padding:0 10px; }
#categorys .depth01 > li .icon_cell { height:100%; display:flex; align-items:center; text-align:center; line-height:20px; }
#categorys .depth01 > li .icon_cell i { color:#EEE; font-size:.8rem; font-style:normal; letter-spacing:-.1px; }
#categorys .depth01 > li .icon_cell i p { margin-bottom:0; line-height:13px; }

#categorys ul>>>ul { position:absolute; width:15rem; padding:0.5rem; background-color:#FFF; border:2px solid #000; z-index:10; }
#categorys>ul>li>ul:before { content:''; position:absolute; top:-32px; left:20px; background:url('https://fourscience.s3.ap-northeast-2.amazonaws.com/common/cate/semo.png') no-repeat center; width:31px; height:34px; }

#categorys ul>>>ul li { position: relative; }

#categorys ul>>>ul li a { display:block; font-size:14px; padding:5px 10px; border-radius:0.4rem; transition: all .2s;}
#categorys ul>>>ul li:not(.depth01_tit):hover>a { padding:10px; background-color:#777; color:#FFF; font-size:1.2rem; font-weight:bold; font-family: "Malgun Gothic", serif; }
#categorys ul>>>ul ul { top:0; left:13.5rem; }


.slideUpDown-enter-to,
.slideUpDown-leave { max-height:auto; }
.slideUpDown-enter-active  { transition:max-height 0.4s; }
.slideUpDown-enter,
.slideUpDown-leave-to { max-height:0; }

/* #categorys { z-index:1050; background-color:#616C74; }
#categorys ul { display:flex; }
#categorys ul li { flex: 1 1 auto; }
#categorys ul li img { display:block; margin:auto; }
#categorys ul li a { display:block; text-align:center; color:#FFF; font-size:.7rem; letter-spacing:-1px; } */
/*#categorys ul { background-color:#FFF; position:absolute; top:0; left:0; width:15rem; height:15rem; }*/

/* Modal */
/*.rs_modal,
.overlay { width: 100%; height: 100%; position: fixed; left: 0; top: 0; }
.rs_modal { z-index:1050; }
.rs_modal .overlay { opacity: 0.5; background-color: black; }
.rs_modal .rs_modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: white; min-height: 500px; z-index: 10; opacity: 1; }*/

@media (max-width: 992px){
    #categorys .depth01 > li:first-of-type { width:0; height:0; }
    #categorys .depth01 > li:first-of-type .ca01 { padding:0; }
    #categorys .depth01 > li:not(:first-of-type) { display:none; }
    #categorys .depth01 > li:first-of-type ul { display:block !important; }
    #categorys .depth01 > li:first-of-type ul:before { content: none; }
}
</style>
