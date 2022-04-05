<template lang="html">
    <b-container id="goods_index">
        <!-- <Location v-if="$route.name == 'goods_index' && !$route.query.keyword" 
            :categorys="categorys"
            :p_ca01="$route.query.ca01" 
            :p_ca02="$route.query.ca02" 
            :p_ca03="$route.query.ca03" 
            :p_ca04="$route.query.ca04"
        /> -->

        <b-row class="sch_category bg-primary py-3" v-if="this.$store.state.goods.frm.keyword">
            <b-col cols="3" sm="1"><b-button @click="frm.ca01=0, frm.ca02=0, frm.ca03=0, frm.mk_id=0" block>전체보기({{sch_cate_info.all}})</b-button></b-col>
            
            <b-col cols="9" sm="11" v-if="sch_cate_info" >
                <b-button size="sm" :variant="frm.ca01==ca.key ? 'dark' : 'light'"
                    v-for="(ca, i) in sch_cate_info.ca01" 
                    :key="ca.key"
                    @click="frm.ca01=ca.key, frm.ca02=0, frm.ca03=0, frm.mk_id=0"
                >
                    {{ca.name}}({{ca.cnt}})
                </b-button>
            </b-col>
        </b-row>
        <b-row class="sch_category mt-4 bg-info py-3" v-if="this.$store.state.goods.frm.keyword && sch_cate_info.ca02">
            <b-col cols="3" sm="1">중분류</b-col>
            
            <b-col cols="9" sm="11">
                <b-button size="sm" :variant="frm.ca02==ca.key ? 'dark' : 'light'"
                    v-for="(ca, i) in sch_cate_info.ca02" 
                    :key="ca.key"
                    @click="frm.ca02=ca.key, frm.ca03=0, frm.mk_id=0"
                >
                    {{ca.name}}({{ca.cnt}})
                </b-button>
            </b-col>
        </b-row>
        <b-row class="sch_category mt-4 bg-success py-3" v-if="this.$store.state.goods.frm.keyword && sch_cate_info.ca03">
            <b-col cols="3" sm="1">소분류</b-col>
            
            <b-col cols="9" sm="11">
                <b-button size="sm" :variant="frm.ca03==ca.key ? 'dark' : 'light'"
                    v-for="(ca, i) in sch_cate_info.ca03" 
                    :key="ca.key"
                    @click="frm.ca03=ca.key, frm.mk_id=0"
                >
                    {{ca.name}}({{ca.cnt}})
                </b-button>
            </b-col>
        </b-row>
        
        <b-row class="sch_category mt-4 bg-warning py-3" v-if="this.$store.state.goods.frm.keyword && sch_cate_info.maker">
            <b-col cols="3" sm="1">제조사(브랜드)</b-col>
            
            <b-col cols="9" sm="11">
                <b-button size="sm" :variant="frm.mk_id==mk.key ? 'dark' : 'light'"
                    v-for="(mk, i) in sch_cate_info.maker" 
                    :key="mk.key"
                    @click="frm.mk_id=mk.key"
                >
                    {{mk.name}}({{mk.cnt}})
                </b-button>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col md="12" lg="6">
                <b-button-group>
                    <b-button @click="sort()" variant="success">인기상품순</b-button>
                    <b-button @click="sort('new')" variant="info">신상품순</b-button>
                    <b-button @click="sort('lowPri')" variant="warning">낮은가격순</b-button>
                    <b-button @click="sort('highPri')" variant="danger">높은가격순</b-button>
                </b-button-group>
            </b-col>
            <b-col cols="12">
                <b-badge variant="info">TOTAL : {{list.total}}</b-badge>
            </b-col>

            <!-- <b-col md="12" lg="6">
                <Search v-model="sch_frm" @search="routerPush('new')" />
            </b-col> -->
        </b-row>

        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <template v-else>
            <b-row
                class="list_item mt-3"
                v-if="list.data && list.data.length"
                v-for="(row, idx) in list.data"
                :key="row.gd_id"
            >
                <b-col lg="2">
                    <img :src="row.image_src_thumb[0]" />
                </b-col>
                <b-col lg="4">
                    <b-link :to="{name: 'goods_show', params:{gd_id:row.gd_id} }">
                        {{row.gd_name}}
                        <P v-if="row.goods_model" class="bg-light">
                            {{row.goods_model[0].gm_name}} /
                            {{row.goods_model[0].gm_catno}} /
                            {{row.goods_model[0].gm_code}} /
                            {{row.goods_model[0].gm_spec}} /
                            {{row.goods_model[0].gm_unit}} /
                        </P>
                    </b-link>
                </b-col>
                <b-col lg="1">
                    {{row.mk_name}}
                </b-col>
                <b-col lg="1">
                    {{row.gm_price_add_vat | comma}}
                </b-col>
            </b-row>
            <b-alert v-else variant="danger" show>No Item</b-alert>
            <pagination :data="list" @pagination-change-page="setPage" align="center" class="mt-5" />
        </template>
    </b-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        'Location': () => import('./_comp/Location.vue'),
        'Search': () => import('./_comp/Search.vue'),
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),

    },
    data() {
        return {}
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
        ...mapState('goods', ['frm', 'list', 'isLoadingModalViewed', 'sch_cate_info']),
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },

        // routerPush(type=null){
        //     if (type) {
        //         this.sch_frm.ca01 = "";
        //         this.sch_frm.ca02 = "";
        //         this.sch_frm.ca03 = "";
        //         this.sch_frm.ca04 = "";
        //         this.sch_frm.page = 0;
        //     }
        //     this.$router.push({ name: 'goods_index', query: this.new_frm }).catch(()=>{});
        // },
        setPage(page) {
            this.frm.page = page;
            this.routerPush();
        },
        sort(type=null) {
            this.frm.sort = type;
            this.routerPush();
        },
        routerPush(){
            this.$store.dispatch('goods/routerPush');
        }


    },
    // mounted() { this.$store.dispatch('goods/index'); },
}
</script>

<style lang="css" scoped>
#goods_index .list_item img { width:160px; height:160px; object-fit:cover; }
#goods_index .sch_category>div{ padding:0 5px; }
#goods_index .sch_category>div:last-child button { margin-right:1rem; }
</style>
