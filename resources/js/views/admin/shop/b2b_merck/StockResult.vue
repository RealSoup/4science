<template>
<b-container class="p_wrap">
    <h3>Merck Stock List</h3>
    <b-row class="head">
        <b-col><span>모델명</span><span>가격</span></b-col>
        <b-col><span>가능수량</span><span>불가수량</span></b-col>
        <b-col><span>선적일자</span><span>불가능 수량 선적일자</span></b-col>
        <b-col><span>추가정보</span><span>작성일</span></b-col>
    </b-row>
    
    <b-row class="body" v-for="bms in list.data" :key="bms.bms_id">
        <b-col>
            <span>{{bms.bms_data.ProductResponse.SupplierPartNumber}}</span>
            <span>{{ bms.bms_data.ProductResponse.UnitPrice | comma }} 원</span>
        </b-col>
        <b-col>
            <span>{{bms.bms_data.ProductResponse.QuantityAvailable}}</span>
            <span>{{bms.bms_data.ProductResponse.QuantityBackordered}}</span>
        </b-col>
        <b-col>
            <span><template v-if="typeof( bms.bms_data.ProductResponse.ShipDate ) == 'string'">{{bms.bms_data.ProductResponse.ShipDate}}</template></span>
            <span><template v-if="typeof( bms.bms_data.ProductResponse.BackorderShipDate ) == 'string'">{{bms.bms_data.ProductResponse.BackorderShipDate}}</template></span>
        </b-col>
        <b-col>
            <span v-html="bms.bms_data_other_info" class="viewXml"></span>
            <span>{{ bms.created_at | formatDate }}</span>
        </b-col>
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
                const res = await ax.get(`/api/admin/shop/b2b_merck/stockResult`, {params:{page:this.page}});
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
.body:hover { background: #d8f2fd94; }
.body>div:nth-child(even) { background-color:#7fffd454; }
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.row>div { padding:5px 15px !important; font-size:.9rem; }
.row>div>span:nth-of-type(2) { float:right; }
.row>div:nth-of-type(1) { flex:0 0 20%; max-width:20%; }
.row>div:nth-of-type(2) { flex:0 0 11%; max-width:11%; }
.row>div:nth-of-type(3) { flex:0 0 15%; max-width:15%; }
.row>div:nth-of-type(5) { flex:0 0 10%; max-width:10%; }

.viewXml { max-width:700px; display:inline-block; }
.viewXml >>> div { margin:3px 10px; padding:3px 10px; border-radius:5px; }
.viewXml >>> span { word-break:break-all; color:#666; }
.viewXml >>> span.attributes { width:150px; font-weight:bold; display:inline-block; color:#000; }
.viewXml >>> div.depth01 { background-color:#f8f8f8; }
.viewXml >>> div.depth01 span.attributes { width:25px; }
.viewXml >>> div.depth01 div.depth02 { background-color:#eee; }
.viewXml >>> div.depth01 div.depth02 span.attributes { width:85px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 { background-color:#e8e8e8; }
.viewXml >>> div.depth01 div.depth02 div.depth03 span.attributes { width:75px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 span.attributes.indent { display:inline-block; float:left; width:25px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 span.data.indent { display:inline-block; max-width:550px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 div.depth04 { background-color:#ddd; }

</style>