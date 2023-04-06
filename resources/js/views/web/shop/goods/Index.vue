<template lang="html">
<div class="p_wrap">
    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </LoadingModal>
    <template v-else>
        <Location v-if="$route.name == 'goods_index' && !$route.query.keyword" 
                :categorys="categorys"
                :p_ca01="$route.query.ca01" 
                :p_ca02="$route.query.ca02" 
                :p_ca03="$route.query.ca03" 
                :p_ca04="$route.query.ca04"
            />
        <div class="layout" v-if="sch_cate_info">
            <b-container class="sch_detail">
                <b-row>
                    <b-col>
                        <h5>카테고리</h5>
                        <p @click="frm.ca01=0, frm.ca02=0, frm.ca03=0, frm.mk_id=0, routerPush()">전체보기 <span>{{sch_cate_info.all}}</span></p>
                        <p v-for="(ca, i) in sch_cate_info.ca01" :key="ca.key" :class="{chk:frm.ca01 == ca.key}" @click="frm.ca01=ca.key, frm.ca02=0, frm.ca03=0, frm.mk_id=0, routerPush()">
                            {{ca.name}} <span>{{ca.cnt}}</span>
                        </p>
                    </b-col>
                    
                    <b-col>
                        <h5>중분류</h5>
                        <p v-for="(ca, i) in sch_cate_info.ca02" :key="ca.key" :class="{chk:frm.ca02 == ca.key}" @click="frm.ca02=ca.key, frm.ca03=0, frm.mk_id=0, routerPush()">
                            {{ca.name}} <span>{{ca.cnt}}</span>
                        </p>
                    </b-col>
                    
                    <b-col>
                        <h5>소분류</h5>
                        <p v-for="(ca, i) in sch_cate_info.ca03" :key="ca.key" :class="{chk:frm.ca03 == ca.key}" @click="frm.ca03=ca.key, frm.mk_id=0, routerPush()">
                            {{ca.name}} <span>{{ca.cnt}}</span>
                        </p>
                    </b-col>
                    
                    <b-col>
                        <h5>제조사</h5>
                        <p v-for="(mk, i) in sch_cate_info.maker" :key="mk.key" :class="{chk:frm.mk_id == mk.key}" @click="frm.mk_id=mk.key, routerPush()">
                            {{mk.name}} <span>{{mk.cnt}}</span>
                        </p>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <div class="pick">
            <b-row class="layout">
                <b-col class="fir">
                    <b-img :src="`${s3url}goods/4spick.png`" />
                </b-col>
                
                <b-col>
                    <b-row v-for="(row, i) in pick" :key="i" :class="{active:i == pick_hover}" @mouseover="actHover(i)" tag="ul">
                        <b-link v-for="gd in row" :key="gd.gd_id"
                            :to="{name: 'goods_show', params:{gd_id:gd.gd_id} }"
                            router-tag="li"
                        >   
                            <div>
                                <img :src="gd.image_src_thumb[0]" />
                            </div>
                            <p class="tit">{{gd.gd_name}}</p>
                            <p class="pri">{{gd.gm_price_add_vat | comma | price_zero | won}}</p>
                        </b-link>
                    </b-row>
                </b-col>
            </b-row>
        </div>

        <div class="layout">
            <b-container>
                <b-row class="list">
                    <b-col class="sort">
                        <ul>
                            <li :class="{active : frm.sort == 'hot'}" @click="sort('hot')">인기상품순</li>
                            <li :class="{active : frm.sort == 'new'}" @click="sort('new')">신상품순</li>
                            <li :class="{active : frm.sort == 'lowPri'}" @click="sort('lowPri')">낮은가격순</li>
                            <li :class="{active : frm.sort == 'highPri'}" @click="sort('highPri')">높은가격순</li>
                        </ul>
                    </b-col>
                    
                    <b-col>
                        <b-row class="lhead">
                            <b-col>상품</b-col>
                            <b-col>가격</b-col>
                            <b-col>제조사</b-col>
                        </b-row>
                        <template v-if="list.data && list.data.length">
                            <b-row v-for="(row, idx) in list.data" :key="row.gd_id" class="lbody">
                                <b-link :to="{name: 'goods_show', params:{gd_id:row.gd_id} }" router-tag="div" class="col link">
                                    <img :src="row.image_src_thumb[0]" />
                                    <p>
                                        <b>{{row.gd_name}}</b>
                                        <span> {{row.gm_code}} / {{row.gm_spec}} / {{row.gm_unit}}</span>
                                    </p>
                                </b-link>
                                <b-col class="price">
                                    {{row.gm_price_add_vat | comma | price_zero | won}} 
                                </b-col>
                                <b-col>{{row.mk_name}}</b-col>
                            </b-row>
                        </template>
                        <NoItem v-else />
                        <pagination :data="list" @pagination-change-page="setPage" size="small" :limit="5" align="center" class="mt-5" />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </template>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        'Location': () => import('./_comp/Location.vue'),
        'Search': () => import('./_comp/Search.vue'),
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
        'NoItem': () => import('@/views/web/_module/NoItem'),
    },
    data() {
        return {
            pick_hover:0,
        }
    },
    watch: {
        // frm: {
        //     handler(val, oldVal) {
        //         this.routerPush();
        //     },
        //     deep: true
        // },
    },
    computed: {
        // new_frm(){
        //     let nfrm = {};
        //     for (let i in this.sch_frm) {
        //         if ( !isEmpty(this.sch_frm[i]) )
        //             nfrm[i] = this.sch_frm[i];
        //     }
        //     return nfrm;
        // },
        ...mapState('goods', ['frm', 'list', 'isLoadingModalViewed', 'sch_cate_info', 'pick', 'categorys']),
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },

        setPage(page) {
            this.frm.page = page;
            this.routerPush();
        },
        sort(type='') {
            this.frm.sort = type;
            this.routerPush();
        },
        routerPush(){
            this.$store.dispatch('goods/routerPush');
        },

        actHover:function(i){ this.pick_hover = i; },

    },
    // mounted() { this.$store.dispatch('goods/index'); },
}
</script>

<style lang="css" scoped>
.sch_detail .row .col { border:1px solid #D7D7D7; padding:0 0 .3rem; max-height:250px; overflow-y:auto; }
.sch_detail .row .col:not(:last-child) { border-right-width:0; }
.sch_detail .row .col h5 { font-weight:bold; font-size:1.1rem; padding:1.4rem 2rem .4rem 2rem; }
.sch_detail .row .col p { padding:.3rem 3rem; color:#4C4C4C; cursor:pointer; margin:0; }
.sch_detail .row .col p:hover,
.sch_detail .row .col p.chk { background:#B2E0FA; }
.sch_detail .row .col p span { color:#C2C2C2; font-size:.8rem; margin-left:.5rem; }

.pick { background:#0094EA; margin-top:25px; }
.pick .row .fir { flex:0 0 120px; max-width:120px; margin-right:25px; }
.pick .row .col { padding:20px 0; }
.pick .row .col ul li { flex:0 0 13%; max-width:13%; height:150px; transition: all .2s; padding:0 10px; text-align:center; overflow:hidden; background:#fff; border-style:solid; border-color:#0094EA; border-width:10px 20px; cursor:pointer; }
.pick .row .col ul.active li { flex:0 0 16.666667%; max-width:16.666667%; height:300px; }
.pick .row .col ul li div { height:99%; position: relative; transition: all .2s;}
.pick .row .col ul.active li div { height:75%; }
.pick .row .col ul li div img { width:90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.pick .row .col ul li .tit { margin:auto; font-weight:bold; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; max-width:150px; }
.pick .row .col ul li .pri { font-size:.7rem; margin: 0.3rem 0 0; }

.list { align-items:flex-start; margin-top:25px; }
.list .sort { flex:0 0 9%; max-width:9%; } 
.list .sort ul { border:1px solid #D7D7D7; margin-left:-15px; }
.list .sort ul li { text-align:center; padding:10px 0; font-size:.9rem; cursor:pointer; }
.list .sort ul li:not(:last-child) { border-bottom:1px solid #D7D7D7; }
.list .sort ul li.active { background:#B2E0FA; } 

.list .col .row div:nth-child(2),
.list .col .row div:nth-child(3) { flex:0 0 17%; max-width:17%; display:flex; align-items:center; justify-content:center; }

.list .col .lhead div { background:#DFEAF0; border:1px solid #D6D6D6; text-align:center; padding:.7rem 0; font-weight:bold; letter-spacing:10px; }
.list .col .lhead div:not(:first-child) { border-left-width:0px; }

.list .col .lbody div { border:1px solid #D6D6D6; border-top-width:0px; }
.list .col .lbody div:not(:first-child) { border-left-width:0px; }
.list .col .lbody .link { cursor:pointer; display:flex; align-items:center; }
.list .col .lbody .link img { border:1px solid #ddd; width:150px; height:150px; margin:15px 30px 15px 0; }
.list .col .lbody .link p { display:inline-block; margin-bottom:0; }
.list .col .lbody .link p span { display:block; color:#949494; margin-top:1.4rem; }
.list .col .lbody .price { font-weight:bold; }

</style>