<template>
<b-container class="w_fence">
    <h3>당일출고</h3>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <template v-else>
        <b-row v-if="cate" class="cate">
            <b-col @click="$router.push(`/shop/listing/today_pick_up/all`)" class="m_hide"><span>카테고리</span></b-col>
            <b-col>
                <span @click="$router.push(`/shop/listing/today_pick_up/all`)" class="m_show">카테고리</span>
                <span v-for="(ca, k) in cate" :key="k" :class="{chk:k == group}" @click="$router.push(`/shop/listing/today_pick_up/${k}`)">
                    {{ca}}
                </span>
                <span class="m_hide" /><span class="m_hide" /><span class="m_hide" />
            </b-col>
        </b-row>

        <b-row v-if="list.data && list.data.length" class="gal_list">
            <b-link v-for="row in list.data" :key="row.gd_id" :to="{name: 'goods_show', params:{gd_id:row.gd_id} }" class="col">
                <img :src="row.image_src_thumb[0]" />
                <div>{{row.gd_name}}</div>
                <p>{{row.gm_price_add_vat | comma | price_zero | won}}</p>
            </b-link>          
        </b-row>
        <b-alert v-else variant="danger" show>No Item</b-alert>

        <pagination :data="list" @pagination-change-page="index" align="center" class="mt-5" />

    </template>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ListingIndex',
    components: {
        'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'),
    },

    data() {
        return {
            isLoadingModalViewed: true,
            code:this.$route.params.code,
            group:this.$route.params.group,
            frm:{},
            list:[],
            cate:{}
        };
    },

    mounted() {
        this.index();
    },
    beforeRouteUpdate (to, from, next) {
        this.code = to.params.code;
        this.group = to.params.group;
        this.index();
        next();
    },
    methods: {
        async index(page=1){
            this.frm.page = page;
            try {
                let url = '';
                let extra_url = this.group == 'all' ? '' : `/${this.group}`;
                if (this.code == 'maker') url = `/api/shop/maker`;
                else url = `/api/shop/listing/${this.code}${extra_url}`;
                const res = await ax.get(url, { params: this.frm});
                if (res && res.status === 200) {
                    this.list = res.data.data;
                    this.cate = res.data.cate;
                    this.isLoadingModalViewed = false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="css" scoped>
.cate { margin-bottom:2rem; }
.cate .col:first-child { background:#4F708F; color:#fff; border-radius:20px 0 0 20px; display:flex; align-items:center; justify-content:center; flex:0 0 240px; max-width:240px;}
.cate .col:last-child { display:flex; flex-wrap:wrap; padding:0; border-top:1px solid #D5D5D5; border-left:1px solid #D5D5D5; }
.cate .col span { font-weight:bold; min-height:44px; display:flex; align-items:center; justify-content:center; flex:0 0 210px; max-width:210px; cursor:pointer; }
.cate .col:last-child span { font-size:.8rem; border-right:1px solid #D5D5D5; border-bottom:1px solid #D5D5D5;  }
.cate .col:last-child span.chk { background:#B2E0FA; }

.gal_list .col { border:1px solid #D7D7D7; flex:0 0 19.2%; max-width:19.2%; padding:1.8rem; margin-bottom:1%; }
.gal_list .col:not(:nth-child(5n)) { margin-right:1%; }
.gal_list .col img { width:100%; height:230px; object-fit:cover; }
.gal_list .col div,
.gal_list .col p { text-align:center; margin-top:1rem; font-size:.9rem; font-weight:bold; }
.gal_list .col p { color:#0094EC; font-size:.8rem; }

@media (max-width: 992px){
    .cate .col span { flex:0 0 33.333333%; max-width:33.333333%; }
    .gal_list .col { flex:0 0 49%; max-width:49%; padding:.4rem; }
    .gal_list .col:not(:nth-child(3n)) { margin-right:1%; }
    .gal_list .col img { height:150px; }

    .gal_list .col div, 
    .gal_list .col p { margin-top:.5rem; font-size:.8rem; }
    .gal_list .col p { font-size:.8rem; margin-bottom:0; }
}
</style>