<template>
<b-container class="p_wrap">
    <h3>Merck ASN List</h3>
    <b-row class="head">
        <b-col><span>추가정보</span><span>작성일</span></b-col>
    </b-row>
    
    <b-row class="body">
        <b-col v-for="(bma, i) in list.data" :key="bma.bma_id" @click="item_show(i)" col cols="12">
            <span>{{bma.bma_data['Request']['ShipNoticeRequest']['ShipNoticeHeader']['Contact'][1].Name}}</span>
            <span>{{ bma.created_at | formatDate }}</span>
        </b-col>
    </b-row>
    <pagination :data="list" @pagination-change-page="setPage" size="small" :limit="5" align="center" class="mt-5" />

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <template slot="header">발송 알림</template>

            <b-container class="est_frm">
                <h5>
                    {{ show.ShipNoticeHeader.Contact[1].Name }}
                    <br />
                    {{ show.ShipNoticeHeader.Contact[1].PostalAddress.PostalCode }}
                    {{ show.ShipNoticeHeader.Contact[1].PostalAddress.City }}
                    {{ show.ShipNoticeHeader.Contact[1].PostalAddress.Street }}

                </h5>
                <b-row>
                    <b-col>shipmentID</b-col>
                    <b-col>{{show.ShipNoticeHeader['@attributes'].shipmentID}}</b-col>
                    <b-col>deliveryDate</b-col>
                    <b-col>{{new Date(show.ShipNoticeHeader['@attributes'].deliveryDate).format("yyyy-MM-dd")}}</b-col>
                    <b-col>noticeDate</b-col>
                    <b-col>{{new Date(show.ShipNoticeHeader['@attributes'].noticeDate).format("yyyy-MM-dd")}}</b-col>
                    <b-col>shipmentDate</b-col>
                    <b-col>{{new Date(show.ShipNoticeHeader['@attributes'].shipmentDate).format("yyyy-MM-dd")}}</b-col>
                </b-row>
            </b-container>
            <b-container>
                <b-row class="lhead list">
                    <b-col>주문번호 / 주문일</b-col>
                    <b-col>수량</b-col>
                    <b-col>상품코드 / 스펙</b-col>
                </b-row>
                <b-row class="lbody list" v-for="(item, i) in asnItem" :key="i">
                    <b-col>
                        {{item.OrderReference['@attributes'].orderID}}
                        <br />
                        {{new Date(item.OrderReference['@attributes'].orderDate).format("yyyy-MM-dd")}}
                    </b-col>

                    <b-col>{{Number(item.ShipNoticeItem['@attributes'].quantity)}}</b-col>

                    <b-col>
                        {{item.ShipNoticeItem.ItemID.SupplierPartID}}
                        <br />
                        {{item.ShipNoticeItem.ShipNoticeItemDetail.Description}}
                    </b-col>
                </b-row>
            </b-container>            
        </modal>
    </transition>

</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admShopB2bMerckAsn',
    components: { 'modal'     : () =>     import('@/views/_common/Modal'), },
    data() { 
        return { 
            isModalViewed: false,
            list: {
                data:[],
            }, 
            page: 1,
            show:{},
        }; 
    },
    computed: {
        asnItem: function () {
            let item = this.show.ShipNoticePortion ?? [];
            if (!item.length) item = [item];
            return item;
        },
    },
    methods: {
        async index() {
            try {
                const res = await ax.get(`/api/admin/shop/b2b_merck/asnIndex`, {params:{page:this.page}});
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
        item_show(i) {
            this.isModalViewed = true;
            this.show = this.list.data[i].bma_data.Request.ShipNoticeRequest;
        },

    },
    mounted() {
        this.index();
    },
};
</script>

<style lang="css" scoped>
.p_wrap { margin-bottom:2rem; max-width:900px; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.body { border-bottom:1px solid #333; }
.body>div { cursor:pointer; }
.body>div:nth-child(even) { background-color:#e9e9e9; }
.body>div:hover { background: #d8f2fd94; }
.row>div { padding:7px; font-size:.9rem; }
.row>div>span:nth-of-type(2) { float:right; }
.est_frm .row .col:nth-child(odd) { flex: 0 0 10%; max-width:10%; }

.p_wrap >>> .rs_modal .card-body .rs_modal-card header { position:relative; margin-bottom:1em; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .lhead { font-weight:bold; background:#666; color:#fff; margin-top:1em; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .list>div:nth-of-type(2) { text-align:center; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .list>div:nth-of-type(3) { text-align:right; }
</style>