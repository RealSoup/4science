<template>
<b-container class="p_wrap">
    <h3>Merck Order List</h3>
    
    <b-row class="top">
        <b-col col sm="12" md="6">
            <b-button v-if="clickable" variant="primary" size="sm" @click="order">선택 발주</b-button>
            <b-button v-else size="sm">처리중 •••</b-button>
        </b-col>
        <b-col col sm="12" md="6" class="addModel"><model-sch-input @addModel="addModel" /></b-col>
    </b-row>
    
    <b-row class="address">
        <b-col col sm="12" md="2">
            <b-form-select size="sm" ref="addressID" v-model="address.addressID">
                <b-form-select-option value="">ShipTo Code</b-form-select-option>
                <b-form-select-option value="2035422570">사무실(판교로 253)</b-form-select-option>
                <b-form-select-option value="2036349057">서울</b-form-select-option>
                <b-form-select-option value="2036349058">그 밖의 지역</b-form-select-option>
            </b-form-select>
        </b-col>
        <b-col col sm="12" md="2">
            <b-form-select size="sm" ref="state" v-model="address.state">
                <b-form-select-option value="">State Code</b-form-select-option>
                <b-form-select-option value="SE">서울</b-form-select-option>
                <b-form-select-option value="GG">경기</b-form-select-option>
                <b-form-select-option value="IC">인천</b-form-select-option>
                <b-form-select-option value="BS">부산</b-form-select-option>
                <b-form-select-option value="CB">충북</b-form-select-option>
                <b-form-select-option value="CN">충남</b-form-select-option>
                <b-form-select-option value="DG">대구</b-form-select-option>
                <b-form-select-option value="DJ">대전</b-form-select-option>
                <b-form-select-option value="GW">강원</b-form-select-option>
                <b-form-select-option value="GJ">광주</b-form-select-option>
                <b-form-select-option value="GB">경북</b-form-select-option>
                <b-form-select-option value="GN">경남</b-form-select-option>
                <b-form-select-option value="JJ">제주</b-form-select-option>
                <b-form-select-option value="JB">전북</b-form-select-option>
                <b-form-select-option value="JN">전남</b-form-select-option>
                <b-form-select-option value="SJ">세종</b-form-select-option>
                <b-form-select-option value="US">울산</b-form-select-option>
            </b-form-select>
        </b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="이름" v-model="address.name" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="HP" v-model="address.hp" :formatter="frm_formatHp" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="소속" v-model="address.part" /></b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="업체명" v-model="address.company" /></b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="우편번호" v-model="address.code" /></b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="**시 **구" v-model="address.city" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="도로명 (최대 20자)" v-model="address.street" maxlength="20" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="상세 동호수 (최대 20자)" v-model="address.detail" maxlength="20" /></b-col>
        <b-col col sm="12"><b-form-textarea v-model="address.req_dlvy" placeholder="배송시 요청사항 입력" /></b-col>
    </b-row>

    
    


    <b-row class="list body addModelTemp">
        <b-col>
            <span></span>
            <span><b-form-input size="sm" placeholder="제품명" v-model="extraModel.odm_gm_name" /></span>
        </b-col>
        <b-col>
            <span><b-form-input size="sm" placeholder="모델명" v-model="extraModel.odm_gm_code" /></span>
            <span><b-form-input size="sm" placeholder="판매단위" v-model="extraModel.odm_gm_unit" /></span>
        </b-col>
        <b-col>
            <span><b-form-input size="sm" v-model="extraModel.odm_ea" /></span>
            <span><b-form-input size="sm" v-model="extraModel.odm_price" /></span>
        </b-col>
        <b-col>
            <span></span>
            <span><b-button @click="addModelTemp" class="xm">임의상품추가</b-button></span>
        </b-col>
    </b-row>
    
    <b-row class="list head">
        <b-col><span>주문번호</span><span>제품명</span></b-col>                
        <b-col><span>모델명</span><span>판매단위</span></b-col>
        <b-col><span>수량</span><span>가격</span></b-col>
        <b-col><span>요청사항</span><span>Ctrl</span></b-col>
    </b-row>

    <b-row class="list body" v-for="(row, i) in list.data" :key="row.odm_id">
        <b-col>
            <span>
                <b-form-checkbox v-model="row.b2b_chk" name="b2b_chk" @change="addrAutoInput(i)">
                    <template v-if="row.odm_od_id">{{row.odm_od_id}}({{row.od_no}})</template>
                </b-form-checkbox>
            </span>
            <span>
                <b-button v-if="row.od_id" :to="{name: 'adm_order_edit', params: { od_id:row.od_id }}" class="xm">{{row.odm_gm_name}}</b-button>
                <template v-else>{{row.odm_gm_name}}</template>
            </span>
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
            <span>
                <template v-if="clickable">
                    <b-button class="xm" @click="stockCheck(row.odm_gm_code, row.odm_ea)">재고 체크</b-button>            
                    <b-button v-if="clickable" class="xm red" @click="destroy(i)">삭제</b-button>
                </template>
                <b-button v-else size="sm">처리중 •••</b-button>
            </span>
        </b-col>
    </b-row>

    <pagination :data="list" @pagination-change-page="pageSet" :limit="5" :showDisabled="true" align="center" class="mt-5">
        <span slot="prev-nav"><b-icon-chevron-left /></span>
        <span slot="next-nav"><b-icon-chevron-right /></span>
    </pagination>
</b-container>
</template>

<script>
import ax from '@/api/http';
import copy from "fast-copy";

export default {
    name: 'admShopB2bMerckOrder',
    components: {
        'model-sch-input': () => import('./_comp/ModelSchInput'),
        'modal'     : () => import('@/views/_common/Modal'),
    },
    data() {
        return {
            list: {},
            indeterminate:false,
            all_chk:false,
            address: {
                req_dlvy: '',
                addressID: '',
                state: '',
                company: '',
                part: '',
                name: '',
                hp: '',
                code: '',
                city: '',
                street: '',
                detail: '',
            },
            sch_frm: {},
            isModalViewed: false,
            extraModel: {
                b2b_chk     :true,
                odm_id      :null,
                odm_gm_id   :null,
                odm_gm_name :'',
                odm_gm_code :'',
                odm_gm_spec :null,
                odm_gm_unit :'',
                odm_price   :0,
                odm_ea      :1,
                odm_mk_name :null,
                req_order   :null,
            },
            clickable : true,
        };
    },
    methods: {

        async index(){
            try {
                const res = await ax.get(`/api/admin/shop/b2b_merck/order`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        addrAutoInput (i) {
            if(this.list.data[i].b2b_chk) {
                this.address.part   = this.list.data[i].od_part;
                this.address.name   = this.list.data[i].od_receiver;
                this.address.hp     = this.list.data[i].od_receiver_hp;
                this.address.code   = this.list.data[i].od_zip;
                this.address.city   = this.list.data[i].od_addr1;
                // this.address.street = this.list.data[i].od_addr1;
                this.address.detail = this.list.data[i].od_addr2;
            }
        },

        async order(){
            try {
                let chkList = this.list.data.filter(el => el.b2b_chk==true);
                if (!chkList.length) {
                    Notify.modal('선택하세요', 'warning');
                    return false;
                }
                if (this.address.addressID == '') { Notify.toast('danger', "ShipTo Code를 선택하세요."); this.$refs.addressID.focus(); return false; }
                if (this.address.addressID !== '2035422570') {
                    if (this.address.state == '') {     Notify.toast('danger', "State Code를 선택하세요."); this.$refs.state.focus(); return false; }
                    if (this.address.name == '') {      Notify.toast('danger', "이름을 입력하세요."); this.$refs.name.focus(); return false; }
                    if (this.address.part == '') {      Notify.toast('danger', "소속을 입력하세요."); this.$refs.part.focus(); return false; }
                    if (this.address.company == '') {   Notify.toast('danger', "업체명을 입력하세요."); this.$refs.company.focus(); return false; }
                    if (this.address.code == '') {      Notify.toast('danger', "우편번호를 입력하세요."); this.$refs.code.focus(); return false; }
                    if (this.address.city == '') {      Notify.toast('danger', "**시 **구를 입력하세요."); this.$refs.city.focus(); return false; }
                    if (this.address.street == '') {    Notify.toast('danger', "도로명을 입력하세요."); this.$refs.street.focus(); return false; }
                    if (this.address.detail == '') {    Notify.toast('danger', "상세 주소를 입력하세요."); this.$refs.detail.focus(); return false; }
                }
                this.clickable = false;
                const res = await ax.post(`/api/admin/shop/b2b_merck/orderExe`, {list:chkList, address: this.address});

                if (res && res.status === 200 && res.data.message == 'success') this.$router.push({ name: 'adm_b2b_merck_order_result' })
                this.clickable = true;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        async stockCheck(code, ea) {
            try {
                this.clickable = false;
                const res = await ax.post(`/api/admin/shop/b2b_merck/stockCheck`, {code:code, ea:ea});
                if (res && res.status === 200) this.$router.push({ name: 'adm_b2b_merck_stock_result' })
                this.clickable = true;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        addModel(m) {   //  검색상품 리스트에 추가
            this.list.data.unshift({
                b2b_chk     :true,
                odm_id      :null,
                odm_gm_id   :m.gm_id,
                odm_gm_name :m.gm_name,
                odm_gm_code :m.gm_code,
                odm_gm_spec :m.gm_spec,
                odm_gm_unit :m.gm_unit,
                odm_price   :m.gm_price_add_vat,
                odm_ea      :1,
                odm_mk_name :m.goods.maker.mk_name,
                req_order   :null,});	
        },
        addModelTemp(m) {   //  임의상품 리스트에 추가
            this.list.data.unshift(copy(this.extraModel));	
        },

        routerPush(){
            this.$router.push({name: 'adm_b2b_merck_order', query: this.sch_frm }).catch(()=>{});
        },
        pageSet(p){
            this.sch_frm.page = p;
            this.routerPush();
        },
        frm_formatHp(v)   { return this.formatHp(v); },

        
        async destroy(i) {
            var rst = await Notify.confirm('목록에서 삭제', 'danger');
            if (rst) {
                this.clickable = false;
                if (this.list.data[i].odm_id)
                    await ax.get(`/api/admin/shop/b2b_merck/listPull/${this.list.data[i].odm_id}`);                
                this.$delete(this.list.data, i);
                this.clickable = true;
            }
        }, 

    },

    mounted() {
        this.sch_frm = Object.assign( {}, this.sch_frm, this.$route.query );
        this.index();
    },
    beforeRouteUpdate (to, from, next) {
        this.sch_frm = Object.assign( {}, this.sch_frm, to.query );
        this.index();
        next();
    },
};
</script>

<style lang="css" scoped>
.p_wrap { margin-bottom:2rem; }
.top {  padding:5px 0; }
.top .col { display:flex; align-items:center; }
.top .col.addModel { justify-content:flex-end; } 
.top .col.addModel>div { width:100%; max-width:10rem; } 
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.body:hover { background: #d8f2fd94; }
/*.list>div:nth-of-type(2) { flex:0 0 30%; max-width:30%; }*/
.address>div { padding-top:5px; padding-bottom:5px; font-size:.9rem; }
.list>div:nth-of-type(3) { flex:0 0 15%; max-width:15%; }
.list>div { padding:5px 15px !important; font-size:.9rem; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.body>div:nth-of-type(2) { background-color:#7fffd454; }
.row>div>span:nth-of-type(2) { float:right; }
.addModelTemp>div>span { display:inline-block; width:50%; }
.addModelTemp>div:nth-of-type(1)>span:nth-of-type(1) { width:1%; }
.addModelTemp>div:nth-of-type(1)>span:nth-of-type(2) { width:80%; }
.addModelTemp>div:nth-of-type(3)>span:nth-of-type(1) { width:30%; }
.addModelTemp>div:nth-of-type(3)>span:nth-of-type(2) { width:70%; }
.addModelTemp>div>span:nth-of-type(2),
 .addModelTemp>div>span:nth-of-type(2) input { text-align:right; }

.row .custom-control { display: inline; }
.row .custom-control>>>label { font-size:.9rem; }
.row .custom-control>>>label::before, 
.row .custom-control>>>label::after { top:-.15rem; left:-1.8rem; width:1.5rem; height:1.5rem; }

.top .custom-control { margin-right:1rem; }
.top .custom-control>>>label::before,
.top .custom-control>>>label::after { top:0; }

.row .col span .odm_ea { width:30%; display:inline-block; min-width:40px; text-align:center; }
.row .col span.req_order_box { position:relative; width:70%; display:inline-block; min-width:140px; height:1.9rem; }
.row .col span.req_order_box .req_order { height: 1.9rem; padding: 0.1rem 0.8rem; }
.row .col span.req_order_box .req_order:focus { z-index:1; background:#FFF; width:20rem; height:5rem; position:absolute; top:0; left:0; }
</style>