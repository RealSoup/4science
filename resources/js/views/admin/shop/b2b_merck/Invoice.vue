<template>
<b-container class="p_wrap">
    <h3>Merck e-Invoice List</h3>
    <b-row class="head">
        <b-col><span>추가정보</span><span>작성일</span></b-col>
    </b-row>
    
    <b-row class="body" v-for="(bms, i) in list.data" :key="bms.bms_id">
        <b-col @click="item_show(i)">
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
                <span><b>Date</b>: {{show.InvoiceDetailRequestHeader['@attributes'].invoiceDate}}</span>
                <span><b>InvoiceID</b>: {{show.InvoiceDetailRequestHeader['@attributes'].invoiceID}}</span>
            </template>
            <b-container>
                <h5>billTo</h5>
                <b-row>
                    <b-col>{{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.Name}}</b-col>
                    <b-col col cols="12">
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.PostalAddress.Street}}
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.PostalAddress.City}}
                        {{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.PostalAddress.PostalCode}}
                    </b-col>
                </b-row>
                <b-row>
                    
                </b-row>
                <b-row>
                    <b-col>{{show.InvoiceDetailRequestHeader.InvoicePartner[2]}}</b-col>
                    <b-col></b-col>
                </b-row>
            </b-container>
            <b-container class="est_frm">
                <h5>billTo</h5>
                <b-row>
                    <b-col>이름</b-col>
                    <b-col>{{show.InvoiceDetailRequestHeader.InvoicePartner[2].Contact.Name}}</b-col>
                </b-row>
                <b-row>
                    <b-col>{{show.InvoiceDetailRequestHeader.InvoicePartner[2]}}</b-col>
                    <b-col>{{show.InvoiceDetailRequestHeader['@attributes'].invoiceID}}</b-col>
                </b-row>
            </b-container>
        </modal>
    </transition>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admShopB2bMerckStockResult',
    components: {
        'loading-modal': () =>  import('@/views/_common/LoadingModal.vue'),
        'modal'     : () =>     import('@/views/_common/Modal'),
    },
    data() { return { 
        isModalViewed: false,
        list: {
            data:[],
        }, 
        page: 1,
        show:{},
    }; },
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
            this.show = this.list.data[0].bmi_data.Request.InvoiceDetailRequest;
        },

    },
    async mounted() {
        await this.index();
        await this.item_show(0);
    },
};
</script>

<style lang="css" scoped>
.p_wrap { margin-bottom:2rem; max-width:900px; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.body:hover { background: #d8f2fd94; }
.body>div { cursor:pointer;  }
.body>div:nth-child(even) { background-color:#7fffd454; }
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.row>div { padding-top:15px; padding-bottom:15px; font-size:.9rem; }
.row>div>span:nth-of-type(2) { float:right; }
/*
.row>div:nth-of-type(1) { flex:0 0 20%; max-width:20%; }
.row>div:nth-of-type(2) { flex:0 0 11%; max-width:11%; }
.row>div:nth-of-type(3) { flex:0 0 15%; max-width:15%; }
.row>div:nth-of-type(5) { flex:0 0 10%; max-width:10%; }
*/

.viewXml { max-width:800px; display:inline-block; }
.viewXml >>> div { margin:3px 10px; padding:3px 10px; border-radius:5px; }
.viewXml >>> span { word-break:break-all; color:#666; }
.viewXml >>> span.attributes { width:150px; font-weight:bold; display:inline-block; color:#000; }
.viewXml >>> div.depth01 { background-color:#f8f8f8; }
.viewXml >>> div.depth01 span.attributes { width:205px; }
.viewXml >>> div.depth01 div.depth02 { background-color:#eee; }
.viewXml >>> div.depth01 div.depth02 span.attributes { width:200px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 { background-color:#e8e8e8; }
.viewXml >>> div.depth01 div.depth02 div.depth03 span.attributes { width:200px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 span.attributes.indent { display:inline-block; width:25px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 span.data.indent { display:inline-block; max-width:550px; }
.viewXml >>> div.depth01 div.depth02 div.depth03 div.depth04 { background-color:#ddd; }

</style>