<template>
<div class="p_warp">
    <h3>매출 대기</h3>
    <b-container fluid>
        <b-row class="ctrl">
            <b-col>
                <b-button-group>
                    <b-button @click="update('W')" variant="danger">매출대기</b-button>
                    <b-button @click="update('S')" variant="success">결제 예정분</b-button>
                    <b-button @click="update('P')" variant="info">매출</b-button>
                </b-button-group>                
            </b-col>
        </b-row>
        <b-row class="head">
            <b-col>
                <b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk">
                    All
                </b-form-checkbox>
            </b-col>
            <b-col>결제방식</b-col>
            <b-col>주문번호</b-col>
            <b-col>담당자</b-col>
            <b-col>매출처</b-col>
            <b-col>소속</b-col>
            <b-col>고객명</b-col>
            <b-col>품목명</b-col>
            <b-col>공급가액</b-col>
            <b-col>세액</b-col>
            <b-col>합계</b-col>
        </b-row>
        <b-row v-for="(lga, i) in lga_data.data" :key="lga.lga_id" class="body">
            <b-col>
                <b-form-checkbox v-model="lga.lga_check" name="lga_check" @change="chkChange">
                    <!-- {{lga.lga_id}} -->
                    <!-- rownum -->
                    {{lga_data.total-(lga_data.per_page*(lga_data.current_page-1))-i}}
                </b-form-checkbox>
            </b-col>
            <b-col>{{config.pay_type[lga.lga_pay_type]}}</b-col>
            <b-col>{{lga.lga_od_id}}</b-col>
            <b-col>{{lga.lga_mng}}</b-col>
            <b-col>{{lga.lga_distributor}}</b-col>
            <b-col>{{lga.lga_depart}}</b-col>
            <b-col>{{lga.lga_orderer}}</b-col>
            <b-col>{{lga.lga_od_name}}</b-col>
            <b-col>{{lga.lga_ea_p | comma}}</b-col>
            <b-col>{{lga.lga_surtax | comma}}</b-col>
            <b-col>{{lga.lga_sum_p | comma}}</b-col>
        </b-row>
        <pagination :data="lga_data" @pagination-change-page="index" align="center" class="mt-5"></pagination>
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'admLedgerAcctWait',

    data() {
        return {
            frm:{
                mode:['W'],
            },
            lga_data:{},
            config:{},
            indeterminate:false,
            all_chk:false,
        };
    },

    methods: {
        async index(page=null) {
            if(page)
                this.frm.page = page;
            let res = await ax.get(`/api/admin/ledgerAcct`, { params: this.frm});
            if (res && res.status === 200) {
                this.lga_data = res.data.lga;
                this.config = res.data.config;
            }
        },

        async update (step) {
            let tmp = {
                _method : 'PATCH',
                step : step,
                lga_ids : this.lga_data.data.filter(el => el.lga_check==true).map(el => el.lga_id),
            }
            let res = await ax.post(`/api/admin/ledgerAcct/0`, tmp);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
        },

        chkChange () {
            let chkCnt = this.lga_data.data.filter(el => el.lga_check==true).length;
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.all_chk = false;
            } else if (chkCnt === this.lga_data.data.length) {
                this.indeterminate = false;
                this.all_chk = true;
            } else {
                this.indeterminate = true;
                this.all_chk = false;
            }
        },
        toggle_all_chk(checked) {
            this.lga_data.data.forEach(el => { el.lga_check = checked ? true : false; });
            this.indeterminate = false;
        },
    },
    mounted() { this.index(); }
};
</script>

<style lang="css" scoped>
h3 { max-width:1500px; margin:auto; }
.container-fluid { margin-bottom:2rem; }
.container-fluid .row.ctrl { margin-bottom:.2rem; }
.container-fluid .row.head { background:#666; padding:5px 0; }
.container-fluid .row.head .col { font-weight:bold; font-size:.9rem; color:#fff; text-align:center; border-left:1px solid #ccc;}
.container-fluid .row.body { border-bottom:1px solid #ccc; }

.container-fluid .row:not(.ctrl) .col { text-align:center; }
.container-fluid .row:not(.ctrl) .col:nth-child(1) { flex-basis:90px; max-width:90px; }
.container-fluid .row .col:nth-child(2) { flex-basis:130px; max-width:130px; }
.container-fluid .row .col:nth-child(3) { flex-basis:90px; max-width:90px; }
.container-fluid .row .col:nth-child(6) { flex-basis:90px; max-width:90px; }
.container-fluid .row .col:nth-child(8) { flex-basis:120px; max-width:120px; }
.container-fluid .row .col:nth-child(9) { flex-basis:100px; max-width:100px; }
.container-fluid .row .col:nth-child(10) { flex-basis:120px; max-width:120px; }

.container-fluid .row.body .col:nth-child(8) { text-align:right; }
.container-fluid .row.body .col:nth-child(9) { text-align:right; }
.container-fluid .row.body .col:nth-child(10) { text-align:right; }
</style>