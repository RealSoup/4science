<template>
<b-container class="p_wrap">
    <h3>Merck Order List</h3>
    
    <b-row class="top">
        <b-col col sm="12" md="6"><b-button variant="primary" size="sm" @click="order">선택 발주</b-button></b-col>
        <b-col col sm="12" md="6" class="addModel"><ModelSchInput @addModel="addModel" /></b-col>
    </b-row>
    
    <b-row class="extra">
        <b-col col sm="12" md="2">
            <b-form-select size="sm" ref="addressID" v-model="extra.addressID">
                <b-form-select-option value="">ShipTo Code</b-form-select-option>
                <b-form-select-option value="2035422570">사무실(판교로 253)</b-form-select-option>
                <b-form-select-option value="2036349057">서울</b-form-select-option>
                <b-form-select-option value="2036349058">그 밖의 지역</b-form-select-option>
            </b-form-select>
        </b-col>
        <b-col col sm="12" md="2">
            <b-form-select size="sm" ref="state" v-model="extra.state">
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
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="이름" v-model="extra.name" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="HP" v-model="extra.hp" :formatter="frm_formatHp" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="소속" v-model="extra.part" /></b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="업체명" v-model="extra.company" /></b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="우편번호" v-model="extra.code" /></b-col>
        <b-col col sm="12" md="2"><b-form-input size="sm" placeholder="**시 **구" v-model="extra.city" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="도로명" v-model="extra.street" /></b-col>
        <b-col col sm="12" md="3"><b-form-input size="sm" placeholder="상세 동호수" v-model="extra.detail" /></b-col>
        <b-col col sm="12"><b-form-textarea v-model="extra.req_dlvy" placeholder="배송시 요청사항 입력" /></b-col>
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
                <b-form-checkbox v-model="row.b2b_chk" name="b2b_chk" @change="chkChange(i)">
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

    <pagination :data="list" @pagination-change-page="pageSet" :limit="5" :showDisabled="true" align="center" class="mt-5">
        <span slot="prev-nav"><b-icon-chevron-left /></span>
        <span slot="next-nav"><b-icon-chevron-right /></span>
    </pagination>
</b-container>
</template>

<script>
import ax from '@/api/http';


export default {
    name: 'admShopB2bMerckOrder',
    components: {
        'ModelSchInput': () => import('./_comp/ModelSchInput'),
    },
    data() {
        return {
            list: {},
            indeterminate:false,
            all_chk:false,
            extra: {
                req_dlvy: '',
                addressID: '',
                state: '',
                part: '',
                name: '',
                hp: '',
                code: '',
                city: '',
                street: '',
                detail: '',
            },
            sch_frm: {}
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

        chkChange (i) {
            if(this.list.data[i].b2b_chk) {
                this.extra.part   = this.list.data[i].order.od_department;
                this.extra.name   = this.list.data[i].order.od_receiver;
                this.extra.hp     = this.list.data[i].order.od_receiver_hp;
                this.extra.code   = this.list.data[i].order.od_zip;
                this.extra.city   = this.list.data[i].order.od_addr1;
                // this.extra.street = this.list.data[i].order.od_addr1;
                this.extra.detail = this.list.data[i].order.od_addr2;
            }
        },

        async order(){
            try {
                let chkList = this.list.data.filter(el => el.b2b_chk==true);
                if (!chkList.length) {
                    Notify.modal('선택하세요', 'warning');
                    return false;
                }
                if (this.extra.addressID == '') { Notify.toast('danger', "ShipTo Code를 선택하세요."); this.$refs.addressID.focus(); return false; }
                if (this.extra.state == '') {     Notify.toast('danger', "State Code를 선택하세요."); this.$refs.state.focus(); return false; }
                if (this.extra.name == '') {      Notify.toast('danger', "이름을 입력하세요."); this.$refs.name.focus(); return false; }
                if (this.extra.part == '') {      Notify.toast('danger', "소속을 입력하세요."); this.$refs.part.focus(); return false; }
                if (this.extra.company == '') {   Notify.toast('danger', "업체명을 입력하세요."); this.$refs.company.focus(); return false; }
                if (this.extra.code == '') {      Notify.toast('danger', "우편번호를 입력하세요."); this.$refs.code.focus(); return false; }
                if (this.extra.city == '') {      Notify.toast('danger', "**시 **구를 입력하세요."); this.$refs.city.focus(); return false; }
                if (this.extra.street == '') {    Notify.toast('danger', "도로명을 입력하세요."); this.$refs.street.focus(); return false; }
                if (this.extra.detail == '') {    Notify.toast('danger', "상세 주소를 입력하세요."); this.$refs.detail.focus(); return false; }
                const res = await ax.post(`/api/admin/shop/b2b_merck/orderExe`, {list:chkList, extra: this.extra});

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
                    this.list.data = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

        addModel(m) {
            this.list.data.unshift({
                "b2b_chk"       : true,
                "odm_id"        : 0,
                "odm_gm_id"     : m.gm_id,
                "odm_gm_name"   : m.gm_name,
                "odm_gm_code"   : m.gm_code,
                "odm_gm_unit"   : m.gm_unit,
                "odm_price"     : m.gm_price,
                "odm_gm_spec"   : m.gm_spec,
                "odm_ea"        : 1,
                "odm_mk_name"   : m.mk_name,
                "req_order"     : null,
            });	
        },

        routerPush(){
            this.$router.push({name: 'adm_b2b_merck_order', query: this.sch_frm }).catch(()=>{});
        },
        pageSet(p){
            this.sch_frm.page = p;
            this.routerPush();
        },
        frm_formatHp(v)   { return this.formatHp(v); },
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
.top .col { display:flex; align-items:center; }
.top .col.addModel { justify-content:flex-end; } 
.top .col.addModel>div { width:100%; max-width:10rem; } 
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.body:hover { background: #d8f2fd94; }
/*.list>div:nth-of-type(2) { flex:0 0 30%; max-width:30%; }*/
.extra>div { padding-top:5px; padding-bottom:5px; font-size:.9rem; }
.list>div:nth-of-type(3) { flex:0 0 15%; max-width:15%; }
.list>div { padding-top:15px; padding-bottom:15px; font-size:.9rem; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.body>div:nth-of-type(2) { background-color:#7fffd454; }
.row>div>span:nth-of-type(2) { float:right; }

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