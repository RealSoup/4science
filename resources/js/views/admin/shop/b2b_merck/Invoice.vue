<template>
<b-container class="p_wrap">
    <h3>Merck e-Invoice List</h3>
    <b-row class="head">
        <b-col><span>추가정보</span><span>작성일</span></b-col>
    </b-row>
    
    <b-row class="body">
        <b-col v-for="(bms, i) in list.data" :key="bms.bms_id" @click="item_show(i)" col cols="12">
            <span>{{bms.bmi_data['Request']['InvoiceDetailRequest']['InvoiceDetailOrder']['InvoiceDetailOrderInfo']['OrderReference']['@attributes']['orderID']}}</span>
            <!-- <span v-html="bms.bmi_data_other_info" class="viewXml"></span> -->
            <span>{{ bms.created_at | formatDate }}</span>
        </b-col>
    </b-row>
    <pagination :data="list" @pagination-change-page="setPage" size="small" :limit="5" align="center" class="mt-5" />

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <template slot="header">
                거 래 명 세 서
                <span>
                    invoiceDate: <i>{{new Date(show.InvoiceDetailRequestHeader['@attributes'].invoiceDate).format("yyyy-MM-dd")}}</i>
                    InvoiceID: <i>{{show.InvoiceDetailRequestHeader['@attributes'].invoiceID}}</i>
                </span>
            </template>

            <b-container>
                <h5>billTo</h5>
                <b-row>
                    <b-col>
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.Name}} -
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.PostalAddress.Street}}
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.PostalAddress.City}}
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.PostalAddress.PostalCode}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b>orderDate</b>: {{new Date(show.InvoiceDetailOrder.InvoiceDetailOrderInfo.OrderReference['@attributes'].orderDate).format("yyyy-MM-dd")}} &nbsp; &nbsp;
                        <b>orderID</b>: {{show.InvoiceDetailOrder.InvoiceDetailOrderInfo.OrderReference['@attributes'].orderID}}
                    </b-col>
                </b-row>
                <b-row class="lhead list">
                    <b-col>상품 / 스펙</b-col>
                    <b-col>가격 <font-awesome-icon icon="times" /> 수량 <font-awesome-icon icon="equals" /> 합계</b-col>
                    <b-col>총합 / 세금</b-col>
                    <b-col>shipTo</b-col>
                </b-row>
                <b-row class="lbody list" v-for="(item, i) in invoiceItem" :key="i">
                    <b-col>
                        {{item.InvoiceDetailItemReference.ItemID.SupplierPartID}}
                        <br />
                        {{item.InvoiceDetailItemReference.Description}}
                    </b-col>
                    <b-col>
                        {{item.UnitPrice.Money}}
                        <font-awesome-icon icon="times" />
                        {{Number(item['@attributes'].quantity)}}
                        <font-awesome-icon icon="equals" />
                        {{item.GrossAmount.Money}}
                    </b-col>
                    
                    <b-col>
                        SubtotalAmount: {{item.SubtotalAmount.Money}}
                        <br />
                        Tax: {{item.Tax.Money}}
                    </b-col>
                    <b-col>
                        {{item.InvoiceDetailLineShipping.InvoiceDetailShipping.Contact[1].Name}} - 
                        {{item.InvoiceDetailLineShipping.InvoiceDetailShipping.Contact[1].PostalAddress.PostalCode}}
                        {{item.InvoiceDetailLineShipping.InvoiceDetailShipping.Contact[1].PostalAddress.City}}
                        {{item.InvoiceDetailLineShipping.InvoiceDetailShipping.Contact[1].PostalAddress.Street}}
                    </b-col>
                </b-row>
            </b-container>
            <b-container class="est_frm">
                <h5>Summary</h5>
                <b-row>
                    <b-col>SubtotalAmount</b-col>
                    <b-col>{{show.InvoiceDetailSummary.SubtotalAmount.Money}}</b-col>
        
                    <b-col>Tax</b-col>
                    <b-col>{{show.InvoiceDetailSummary.Tax.Money}}</b-col>

                    <b-col>GrossAmount</b-col>
                    <b-col>{{show.InvoiceDetailSummary.GrossAmount.Money}}</b-col>
                </b-row>
            </b-container>
            
        </modal>
    </transition>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admShopB2bMerckInvoice',
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
        invoiceItem: function () {
            let item = this.show.InvoiceDetailOrder.InvoiceDetailItem ?? [];
            if (!item.length) item = [item];
            return item;
        },
    },
    methods: {
        async index() {
            try {
                const res = await ax.get(`/api/admin/shop/b2b_merck/invoiceIndex`, {params:{page:this.page}});
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
            this.show = this.list.data[i].bmi_data.Request.InvoiceDetailRequest;
        },

    },
    async mounted() {
        await this.index();
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

.p_wrap >>> .rs_modal .card-body .rs_modal-card header { position:relative; margin-bottom:1em; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card header span { position:absolute; bottom:.2em; right:0; font-size:.7em; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card header span i { margin-right:1em; font-weight:400; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .lhead { font-weight:bold; background:#666; color:#fff; text-align:center; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .lbody div:nth-of-type(2),
.p_wrap >>> .rs_modal .card-body .rs_modal-card .lbody div:nth-of-type(3),
.p_wrap >>> .rs_modal .card-body .rs_modal-card .summary div { text-align:right; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .list>div:nth-of-type(1) { flex:0 0 35%; max-width:35%; }
.p_wrap >>> .rs_modal .card-body .rs_modal-card .list>div:nth-of-type(4) { flex:0 0 35%; max-width:35%; }
</style>