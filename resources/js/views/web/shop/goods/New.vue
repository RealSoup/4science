<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </loading-modal>
    <template v-else>
        <location v-if="$route.name == 'goods_index' && !$route.query.keyword" 
            :categorys="categorys"
            :p_ca01="$route.query.ca01" 
            :p_ca02="$route.query.ca02" 
            :p_ca03="$route.query.ca03" 
            :p_ca04="$route.query.ca04"
        />
       
        <b-container v-if="sch_cate_info" class="layout sch_detail">
            <b-row>
                <b-col>
                    <h5>카테고리</h5>
                    <p @click="frm.ca01=0, frm.ca02=0, frm.ca03=0, frm.mk_id=0, frm.keyword_extra='', routerPush()">전체보기 <span>{{sch_cate_info.all}}</span></p>
                    <p v-for="ca in sch_cate_info.ca01" :key="ca.key" :class="{chk:frm.ca01 == ca.key}" @click="frm.ca01=ca.key, frm.ca02=0, frm.ca03=0, frm.mk_id=0, frm.keyword_extra='', routerPush()">
                        {{ca.name}} <span>{{ca.cnt}}</span>
                    </p>
                </b-col>
                
                <b-col>
                    <h5>중분류</h5>
                    <p v-for="ca in sch_cate_info.ca02" :key="ca.key" :class="{chk:frm.ca02 == ca.key}" @click="frm.ca02=ca.key, frm.ca03=0, frm.mk_id=0, frm.keyword_extra='', routerPush()">
                        {{ca.name}} <span>{{ca.cnt}}</span>
                    </p>
                </b-col>
                
                <b-col>
                    <h5>소분류</h5>
                    <p v-for="ca in sch_cate_info.ca03" :key="ca.key" :class="{chk:frm.ca03 == ca.key}" @click="frm.ca03=ca.key, frm.mk_id=0, frm.keyword_extra='', routerPush()">
                        {{ca.name}} <span>{{ca.cnt}}</span>
                    </p>
                </b-col>
                
                <b-col>
                    <h5>제조사</h5>
                    <p v-for="mk in sch_cate_info.maker" :key="mk.key" :class="{chk:frm.mk_id == mk.key}" @click="frm.mk_id=mk.key, frm.keyword_extra='', routerPush()">
                        {{mk.name}} <span>{{mk.cnt}}</span>
                    </p>
                </b-col>
            </b-row>
            <div class="extra_sch">
                <b>결과 내 검색</b>
                <b-input-group>
                    <b-form-input v-model="frm.keyword_extra" placeholder="검색어를 입력하세요" @keyup.enter="routerPush()" />
                    <b-input-group-append>
                        <b-button variant="info" @click="routerPush()"><font-awesome-icon icon="search" /></b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>
        </b-container>

      

        <b-container class="category_picks">
            <b-row>                   
                <b-link :to="{name: 'goods_index', query: { ca01:$route.query.ca01 } }" class="col tit" >
                    <b-img :src="`/storage/main/cate/bg${$route.query.ca01}.gif`"></b-img>
                    <h6>{{thisCaName}}</h6>
                </b-link>
                <b-link class="col con" 
                    v-for="(gd, i) in category_picks.slice(0, 6)" :key="i"
                    :to="{name:'goods_show', params:{gd_id:gd.sw_key}}"
                >
                    <b-img fluid :src="gd.image_src_thumb[0]"></b-img>
                    <p>{{gd.gd_name}}</p>
                </b-link>
            </b-row>
        </b-container>



        <div class="layout">
            <b-container>
                <b-row class="list">
                    <b-col class="sort m_hide">
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
                            <b-col class="m_hide">가격</b-col>
                            <b-col class="m_hide">제조사</b-col>
                        </b-row>
                        <template v-if="list.data && list.data.length">
                            <b-row v-for="row in list.data" :key="row.gd_id" class="lbody">
                                <b-link :to="{name: 'goods_show', params:{gd_id:row.gd_id} }" class="col link">
                                    <img :src="row.image_src_thumb[0]" />
                                    <p>
                                        <b>{{row.gd_name}}</b>
                                        <span class="info"> {{row.goods_model_prime.gm_code}} / {{row.goods_model_prime.gm_spec}} / {{row.goods_model_prime.gm_unit}}</span>
                                        <i>
                                            가격 : 
                                            <span class="price_box" :class="{price_discount:row.goods_model_prime.gm_price_dc_add_vat}">
                                                <span class="normal">{{row.goods_model_prime.gm_price_add_vat | comma | price_zero}}</span>
                                                <span class="discount">{{row.goods_model_prime.gm_price_dc_add_vat | comma | price_zero}}</span>
                                            </span>
                                        </i>
                                    </p>
                                </b-link>
                                <b-col class="price_box m_hide" :class="{'price_discount align-items-end pr-3':row.goods_model_prime.gm_price_dc_add_vat}">
                                    <span class="normal">{{row.goods_model_prime.gm_price_add_vat | comma | price_zero | won}}</span>
                                    <span class="discount">
                                        {{row.gd_dc}}<template v-if="row.gd_dc<100">%</template><template v-else>원</template>
                                        <b-icon-arrow-down />
                                        {{row.goods_model_prime.gm_price_dc_add_vat | comma | price_zero | won}}
                                    </span>
                                </b-col>
                                <b-col class="m_hide">{{row.mk_name}}</b-col>
                            </b-row>

                            <pagination :data="list" @pagination-change-page="setPage" :limit="5" :showDisabled="true" align="center" class="mt-5">
                                <span slot="prev-nav"><b-icon-chevron-left /></span>
                                <span slot="next-nav"><b-icon-chevron-right /></span>
                            </pagination>
                        </template>
                        <no-item v-else />
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
        'location': () => import('./_comp/Location.vue'),
        'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'),
        'no-item': () => import('@/views/web/_module/NoItem'),
    },
    data() {
        return {  }
    },
    computed: {
        ...mapState('goods', ['frm', 'list', 'isLoadingModalViewed', 'sch_cate_info', 'pick', 'categorys', 'category_picks']),

        categoryMap() {
            return Object.fromEntries(
                Object.values(this.categorys || {})
                    .flat()
                    .map(v => [v.ca_id, v.ca_name])
            );
        },

        thisCaName() {
            return this.categoryMap[Number(this.$route.query.ca01)] || '';
        }
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


    },
    // mounted() { this.$store.dispatch('goods/index'); },
}
</script>

<style lang="css" scoped>
.sch_detail { margin-top:1em; margin-bottom:1em; }
.sch_detail .row .col { border:1px solid #D7D7D7; padding:0 0 .3rem; max-height:250px; overflow-y:auto; }
.sch_detail .row .col:not(:last-child) { border-right-width:0; }
.sch_detail .row .col h5 { font-weight:bold; font-size:1.1rem; padding:1.4rem 2rem .4rem 2rem; }
.sch_detail .row .col p { padding:.3rem 3rem; color:#4C4C4C; cursor:pointer; margin:0; }
.sch_detail .row .col p:hover,
.sch_detail .row .col p.chk { background:#B2E0FA; }
.sch_detail .row .col p span { color:#C2C2C2; font-size:.8rem; margin-left:.5rem; }
.sch_detail .extra_sch { display:flex; align-items:center; justify-content:flex-end; padding-top:1em; }
.sch_detail .extra_sch b { margin-right: 1em; }
.sch_detail .extra_sch .input-group { max-width:30em; }

.category_picks { margin-top:20px; overflow:hidden; border-top:1px solid #1A90D6; border-left:1px solid #1A90D6; border-radius:30px 0 0 30px; }
.category_picks .tit { background-color:#1A90D6; }
.category_picks .tit img { height:270px; }
.category_picks .tit h6 { position:absolute; top:40px; right:12px; color:#FFF; font-size:21px; font-weight:bold; }
.category_picks .con { padding:24px; border-bottom:1px solid #1A90D6; border-right:1px solid #1A90D6; }
.category_picks .con img { width:100%; height:166px; object-fit:contain; margin-bottom:12px; } 
.category_picks .con p { font-size:14px; margin:0; }

.list { align-items:flex-start; margin-top:25px; }
.list .sort { flex:0 0 9%; max-width:9%; margin-right:15px; } 
.list .sort ul { border:1px solid #D7D7D7; }
.list .sort ul li { text-align:center; padding:10px 0; font-size:.9rem; cursor:pointer; }
.list .sort ul li:not(:last-child) { border-bottom:1px solid #D7D7D7; }
.list .sort ul li.active { background:#B2E0FA; } 

.list .col .row div:nth-child(2),
.list .col .row div:nth-child(3) { flex:0 0 17%; max-width:17%; display:flex; align-items:center; justify-content:center; }
.list .col .row div.price { align-items:flex-end; flex-direction:column; padding:0 15px; }

.list .col .lhead div { background:#DFEAF0; border:1px solid #D6D6D6; text-align:center; padding:.7rem 0; font-weight:bold; letter-spacing:10px; }
.list .col .lhead div:not(:first-child) { border-left-width:0px; }

.list .col .lbody>* { border:1px solid #D6D6D6; border-top-width:0px; }
.list .col .lbody>*:not(:first-child) { border-left-width:0px; }
.list .col .lbody .link { cursor:pointer; display:flex; align-items:center; padding:0 15px;}
.list .col .lbody .link img { border:1px solid #ddd; width:150px; height:150px; margin:15px 30px 15px 0; }
.list .col .lbody .link p { display:inline-block; margin-bottom:0; }
.list .col .lbody .link p .info { display:block; color:#949494; margin-top:1.1vw; }
.list .col .lbody .link p i { display:none; }




@media (max-width: 992px){
    .p_wrap { padding: 0 .3rem; margin-top:15px; }
    .sch_detail .row .col  { flex:0 0 50%; max-width:50%; }
    .sch_detail .row .col h5 { font-size:14px; padding:.4em; }
    .sch_detail .row .col p { font-size:12px; padding:.3em; }
    .list .col .lbody>* { padding: 0 3px; }
    .list .col .lbody .link img { border-width:0; width: 80px; height: 80px; margin: 10px 10px 10px 0; }
    .list .col .lbody .link p { font-size: calc(1.2vw + .5rem); }
    .list .col .lbody .link p span { margin-top:.4rem; }
    .list .col .lbody .link p i { display:inline; font-size: calc(1.3vw + .5rem); font-weight: 600; }
    .list .col .lbody .link p i .see_dealer .dealer { display:inline; padding-left:12px; margin-left:12px; }
    .list .col .lbody .link p i .see_dealer .dealer:before { left:-6px; width:14px; height:14px; line-height:14px; font-style:normal; font-size:.68rem; }
    .p_wrap >>> .page-link { min-width: 30px; padding:0; }
}
</style>