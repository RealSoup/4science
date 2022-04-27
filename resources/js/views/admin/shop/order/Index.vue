<template>
    <div id="adm_order">
        <b-card class="shadow">
            <b-container fluid>
                <SchDate v-model="sch_frm" />

                <b-row class="mb-3">
                    <b-col lg="2" md="4" sm="6">
                        <select class="custom-select" v-model="sch_frm.od_type">
                            <option value="">◄ 주문유형 ►</option>
                            <option v-for="(val, key) in order_config.type" :key="key" :value="key">{{ val }}</option>
                        </select>
                    </b-col>
                    <b-col lg="2" md="4" sm="6">
                        <select class="custom-select" v-model="sch_frm.od_pay_method">
                            <option value="">◄ 결제수단 ►</option>
                            <option v-for="(val, key) in order_config.pay_method" :key="key" :value="key">{{ val }}</option>
                        </select>
                    </b-col>
                    <b-col lg="2" md="4" sm="6">
                        <select class="custom-select" v-model="sch_frm.od_step">
                            <option value="">◄ 처리상태 ►</option>
                            <option v-for="(val, key) in order_config.step" :key="key" :value="key">{{ val }}</option>
                        </select>
                    </b-col>
                    <b-col lg="2" md="4" sm="6">
                        <b-input-group prepend="주문액">
                            <b-form-input v-model="sch_frm.startPrice" :formatter="priceComma"></b-form-input>
                            <b-form-input v-model="sch_frm.endPrice" :formatter="priceComma"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col lg="2" md="4" sm="6">
                        <select class="custom-select" v-model="sch_frm.od_mng">
                            <option value="">◄ 담당자 ►</option>
                            <option v-for="opt in mng" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
                        </select>
                    </b-col>
                    <b-col lg="2" md="4" sm="6">
                        <select class="custom-select" v-model="sch_frm.um_group">
                            <option value="">◄ 담당팀 ►</option>
                            <option v-for="(val, key) in mng_info.group" :key="key" :value="key">{{ val }}</option>
                        </select>
                    </b-col>
                </b-row>

                <b-row class="justify-content-end mt-3">
                    <b-col md="12" lg="8">
                        <b-input-group>
                            <b-input-group-prepend>
                                <select class="custom-select" v-model="sch_frm.mode">
                                    <option value="od_orderer">주문자</option>
                                    <option value="orderer_email">주문자이메일</option>
                                    <option value="orderer_hp">주문자휴대폰</option>
                                    <option value="od_no">주문번호</option>
                                    <option value="od_id">글번호</option>
                                    <option value="od_receiver">수취인명</option>
                                    <option value="od_addr1">배송주소</option>
                                    <option value="oex_depositor">입금자</option>
                                    <option value="gm_name">제품명</option>
                                    <option value="gm_code">모델명</option>
                                    <option value="catno">Cat.No</option>
                                </select>
                            </b-input-group-prepend>

                            <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword" @keyup.enter="index"></b-form-input>

                            <b-input-group-append>
                                <b-button variant="outline-primary" @click="index">Search</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="shadow od_list">
            <b-container fluid>
                <b-row>
                    <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
                    <b-col sm="12" md="6" class="text-right">
                        <!-- <router-link :to="{name: 'adm_goods_create'}">
                            <b-button variant="outline-primary" size="sm">Create</b-button>
                        </router-link> -->
                    </b-col>
                </b-row>
                <hr>
                <template v-if="list.data && list.data.length">
                <b-row class="list_item"
                    v-for="row in list.data"
                    :key="row.mk_id"
                >
                    <b-col lg="1" class="d-none d-lg-block">
                        <b-badge variant="dark">{{row.od_id}}</b-badge>
                        <b-badge variant="secondary">{{row.od_no}}</b-badge>
                    </b-col>

                    <b-col lg="6" md="4">
                        <router-link :to="{name: 'adm_order_edit', params: { od_id:row.od_id }}" class="btn btn-light d-block text-left">
                            {{row.od_name}}
                        </router-link>
                    </b-col>
                    <b-col lg="2" md="3">
                        <b-badge variant="light">{{row.od_orderer}}</b-badge>
                        <b-badge v-if="row.od_type == 'inst'" variant="primary">바로</b-badge>
                        <b-badge v-else-if="row.od_type == 'cart'" variant="info">카트</b-badge>
                        <b-badge v-else-if="row.od_type == 'quote'" variant="success">견적</b-badge>
                        <!-- -------------------------------------------------------------- -->
                        <b-badge variant="warning" class="float-right">
                            <template v-if="row.od_pay_method == 'C'">카드</template>
                            <template v-if="row.od_pay_method == 'B'">계좌이체</template>
                            <template v-if="row.od_pay_method == 'P'">PSYS</template>
                            <template v-if="row.od_pay_method == 'S'">전표</template>
                            <template v-if="row.od_pay_method == 'E'">에스크로</template>
                        </b-badge>
                    </b-col>
                    <b-col lg="2" md="3">

                        <b-badge variant="info">{{ row.od_all_price | comma }} 원</b-badge>
                        <b-badge variant="success" class="float-right">{{ row.created_at | formatDate }}</b-badge>

                    </b-col>
                    <b-col lg="1" md="2">
                        <b-badge variant="primary" v-if="row.od_step==10">접수</b-badge> <b-badge variant="warning" v-else-if="row.od_step==11">승인대기</b-badge> <b-badge variant="warning" v-else-if="row.od_step==12">결제대기</b-badge>
                        <b-badge variant="success" v-else-if="row.od_step==20">결제완료</b-badge>
                        <b-badge variant="info" v-else-if="row.od_step==30">배송준비</b-badge> <b-badge variant="info" v-else-if="row.od_step==31">배송중</b-badge> <b-badge variant="info" v-else-if="row.od_step==32">배송완료</b-badge>
                        <b-badge variant="secondary" v-else-if="row.od_step==40">구매확정</b-badge>
                        <b-badge variant="danger" v-else-if="row.od_step==50">주문취소</b-badge> <b-badge variant="danger" v-else-if="row.od_step==51">결제실패</b-badge>
<!--
10:주문접수, 11:승인대기, 12:결제대기,
20:결제완료,
30:배송준비, 31:배송중, 32:배송완료,
40:구매확정,
50:주문취소, 51:결제실패
-->

                        <b-badge variant="warning" class="float-right">{{row.od_mng_nm}}</b-badge>
                    </b-col>
                </b-row>
                </template>
                <b-alert v-else variant="danger" show>No Item</b-alert>
            </b-container>

            <pagination :data="list" @pagination-change-page="setPage" align="center" class="mt-5"></pagination>
        </b-card>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    components: {
        'SchDate': () => import('@/views/admin/_module/SchDate.vue'),
    },
    data() {
        return {
            list: {},
            sch_frm: {
                startDate:'',
                endDate: '',
                startPrice:'',
                endPrice: '',
                od_mng:'',
                od_step:'',
                od_type:'',
                od_pay_method:'',
                um_group:'',
                gd_enable:'',
                mode:'od_orderer',
                keyword:'',
                page:0
            },
            mng:{},
            mng_info: {},
            order_config: {},
            gd_enable: { 0:{value:'Y', name:'활성'}, 1:{value:'N', name:'비활성'} },

        }
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/order/`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.mng = res.data.mng;
                    this.mng_info = res.data.mng_info;
                    this.order_config = res.data.order_config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setPage(page) {
            this.sch_frm.page = page;
            this.index();
        },
        
    },
    mounted() {
        this.index();
    },
}
</script>

<style lang="css" scoped>
#adm_order .od_list .row.list_item > div { padding:10px 4px; }
#adm_order .od_list .row.list_item:nth-child(odd) > div:nth-child(odd),
#adm_order .od_list .row.list_item:nth-child(even) > div:nth-child(even) { /*border:1px solid #EAF2FF;*/ }
#adm_order .od_list .row.list_item:nth-child(odd) > div:nth-child(even),
#adm_order .od_list .row.list_item:nth-child(even) > div:nth-child(odd) { background-color:#EAF2FF; }
#adm_order .od_list .row.list_item div .badge { font-size:1rem; }
#adm_order .od_list .row.list_item > div:nth-of-type(1) .badge { font-size:75%;  }
#adm_order .od_list .row.list_item > div:nth-of-type(1) .badge:hover { font-size:125%; position:absolute; z-index:1; }
</style>
