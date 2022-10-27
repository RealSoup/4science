<template>
<b-container class="p_warp">
    <h3>Merck Order List</h3>
    
    <b-row class="top">
        <b-col col sm="12" md="6">
            <b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk">All</b-form-checkbox>
            <b-button variant="primary" size="sm" @click="order">선택 발주</b-button>
        </b-col>
        <b-col col sm="12" md="6" class="text-right">
            <b-button :to="{name: 'adm_goods_create'}" variant="info" size="sm"><b-icon-plus-lg /> 추가</b-button>
        </b-col>
    </b-row>
    
    <div>
        <b-form-textarea v-model="req_dlvy" placeholder="배송시 요청사항 입력" />
    </div>

    <b-row class="list head">
        <b-col><span>주문번호</span><span>제품명</span></b-col>                
        <b-col><span>모델명</span><span>판매단위</span></b-col>
        <b-col><span>수량</span><span>가격</span></b-col>
        <b-col><span>요청사항</span><span>Ctrl</span></b-col>
    </b-row>
    
    <b-row class="list body" v-for="row in list" :key="row.odm_id">
        <b-col>
            <span>
                <b-form-checkbox v-model="row.b2b_chk" name="b2b_chk" @change="chkChange">
                    {{row.odm_od_id}}
                </b-form-checkbox>
            </span>
            <span>{{row.odm_gm_name}}</span>
        </b-col>

        <b-col>
            <span>{{row.odm_gm_code}}</span>
            <span>{{row.odm_gm_unit}}</span>
        </b-col>

        <b-col>
            <span><b-form-input v-model="row.odm_ea" size="sm" class="odm_ea" /></span>
            <span>{{ row.odm_price | comma }} 원</span>
        </b-col>
        
        <b-col>
            <span class="req_order_box"><b-form-textarea v-model="row.req_order" placeholder="주문시 요청사항 입력" class="req_order" /></span>
            <span><b-button size="sm" @click="stockCheck(row.odm_gm_code, row.odm_ea)">재고 체크</b-button></span>
        </b-col>
    </b-row>
      
</b-container>
</template>

<script>
import ax from '@/api/http';


export default {
    name: 'admShopB2bMerckOrder',

    data() {
        return {
            list: [],
            indeterminate:false,
            all_chk:false,
            req_dlvy: '',
        };
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/admin/shop/b2b_merck/order`);
                if (res && res.status === 200) {
                    this.list = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        chkChange () {
            let chkCnt = this.list.filter(el => el.b2b_chk==true).length;
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.all_chk = false;
            } else if (chkCnt === this.list.length) {
                this.indeterminate = false;
                this.all_chk = true;
            } else {
                this.indeterminate = true;
                this.all_chk = false;
            }
        },
        toggle_all_chk(chk) {
            this.list.forEach(el => { el.b2b_chk = chk; });
            this.indeterminate = false;
        },

        async order(){
            try {
                let chkList = this.list.filter(el => el.b2b_chk==true);
                if (!chkList.length) {
                    Notify.modal('선택하세요');
                    return false;
                }
                const res = await ax.post(`/api/admin/shop/b2b_merck/orderExe`, {list:chkList, req_dlvy: this.req_dlvy});

                if (res && res.status === 200 && res.data.msg == 'success') this.$router.push({ name: 'adm_b2b_merck_order_result' })
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        async stockCheck(code, ea) {
            try {
                const res = await ax.post(`/api/admin/shop/b2b_merck/stockCheck`, {code:code, ea:ea});
                if (res && res.status === 200) {
                    this.list = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },

    mounted() {
        this.index()
    },
};
</script>

<style lang="css" scoped>
.p_warp { margin-bottom:2rem; }
.top .col { display:flex; align-items:center; }
.list:not(:last-of-type) { border-bottom:1px solid #333; }
.body:hover { background: #d8f2fd94; }
/*.list>div:nth-of-type(2) { flex:0 0 30%; max-width:30%; }*/
.list>div:nth-of-type(3) { flex:0 0 15%; max-width:15%; }
.list>div{ padding-top:15px; padding-bottom:15px; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.body>div:nth-of-type(2) { background-color:#7fffd454; }
.list>div { font-size:.9rem; }
.list>div>span:nth-of-type(2) { float:right; }

.row .custom-control { display: inline; }
.list .custom-control>>>label { font-size:.9rem; }
.row .custom-control>>>label::before, 
.row .custom-control>>>label::after { top:-.15rem; left:-1.8rem; width:1.5rem; height:1.5rem; }

.top .custom-control { margin-right:1rem; }
.top .custom-control>>>label::before,
.top .custom-control>>>label::after { top:0; }

.list .col span .odm_ea { width:30%; display:inline-block; min-width:40px; text-align:center; }
.list .col span.req_order_box { position:relative; width:70%; display:inline-block; min-width:140px; height:1.9rem; }
.list .col span.req_order_box .req_order { height: 1.9rem; padding: 0.1rem 0.8rem; }
.list .col span.req_order_box .req_order:focus { z-index:1; background:#FFF; width:20rem; height:5rem; position:absolute; top:0; left:0; }
</style>