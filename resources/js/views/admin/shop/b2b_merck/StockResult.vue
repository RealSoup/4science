<template>
<b-container class="p_wrap">
    <h3>Merck Stock List</h3>
    <b-row class="head">
        <b-col><span>모델명</span><span>가격</span></b-col>
        <b-col><span>가능수량</span><span>불가수량</span></b-col>
        <b-col><span>선적일자</span><span>불가능 수량 선적일자</span></b-col>
        <b-col><span>추가정보</span><span>작성일</span></b-col>
    </b-row>
    
    <template v-for="bms in list.data">
        <b-row v-if="bms.bms_data.ProductResponse['@attributes'].status == 'OK'" class="body" :key="bms.bms_id">
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
                <span>
                    <p v-for="(oi, i) in bms.bms_data_other_info" :key="i">
                        <b>{{oi['@attributes'].name}}:</b> {{oi[0]}}
                    </p>
                </span>
                <span>{{ bms.created_at | formatDate }}</span>
            </b-col>
        </b-row>
        <b-row v-else-if="bms.bms_data.ProductResponse['@attributes'].status == 'Error'" :key="bms.bms_id" class="bg-danger">
            <b-col>
                <span>전달값이 잘못 되었습니다.</span>
                <span>{{ bms.created_at | formatDate }}</span>
            </b-col>
        </b-row>
    </template>
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
.row>div:nth-of-type(4) span:nth-of-type(1) p { margin:0; }
.row>div:nth-of-type(4) span:nth-of-type(1) p b { background: #eeee0066; display: inline-block; padding: 2px 8px; } 
.row>div:nth-of-type(5) { flex:0 0 10%; max-width:10%; }
</style>