<template>
<b-container class="p_wrap">
    <h3>Merck Order List</h3>
    <b-row class="head">
        <b-col>발주코드</b-col>                
        <b-col>제품명(모델명)</b-col>
        <b-col>신청<span>결과</span></b-col>
        <b-col class="price">금액</b-col>
    </b-row>
    
    <b-row class="body" v-for="bm in list.data" :key="bm.bm_id">
        <b-col>{{bm.bm_orderid}}</b-col>
        <b-col><p v-for="(bmm, j) in bm.b2b_merck_model" :key="bmm.bmm_id">{{j+1}}. {{bmm.bmm_gm_name}} ( {{bmm.bmm_gm_code}} )</p></b-col>
        <b-col class="result">
            <div v-for="bmc in bm.b2b_merck_confirmation.bmc_data_item" :key="bmc.no">
                <span>{{bmc.no}}. {{bmc.ea}}</span>
                <ul>
                    <li v-for="(bmcr, l) in bmc.rst" :key="l">
                        <span>{{bmcr.ea}}</span>
                        <span>{{bmcr.price}}</span>
                        <span>{{bmcr.dlvy}}</span>
                        <span>{{bmcr.accept}}</span>
                    </li>
                </ul>
            </div>
        </b-col>
        <b-col class="price">{{ bm.bm_total_amt | comma }} 원</b-col>
    </b-row>
    <pagination :data="list" @pagination-change-page="setPage" size="small" :limit="5" align="center" class="mt-5" />
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admShopB2bMerckStockResult',
    data() { return { list: {}, page: 1,}; },
    methods: {
        async index() {
            try {
                const res = await ax.get(`/api/admin/shop/b2b_merck/orderResult`, {params:{page:this.page}});
                if (res && res.status === 200) {
                    this.list = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setPage(page) {
            this.page = page;
            this.index();
        },

    },
    mounted() {
        this.index();
    },
};
</script>

<style lang="css" scoped>
.p_wrap { margin-bottom:2rem; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.head>div>span { float:right; }
.body:hover { background: #d8f2fd94; }
.body>div:nth-child(even) { background-color:#7fffd454; }
.body .result div { display:flex; justify-content: space-between; }
.body .result div ul { margin-left:1rem; }
.body .result div ul li span { display:inline-block; margin-left:1rem; }
.body .result div ul li span:nth-of-type(2) { min-width:6rem; text-align:right; }
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.row>div { padding-top:15px; padding-bottom:15px; font-size:.9rem; }
.row>div:nth-of-type(1),
.row>div:nth-of-type(4) { flex:0 0 11%; max-width:11%; }
.row>div:nth-of-type(2) { flex:0 0 20%; max-width:20%; }
.row .price { text-align:right; }
</style>