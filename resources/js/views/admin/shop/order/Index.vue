<template>
<div id="adm_order">
    <b-card>
        <b-container>
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

    <b-card class="od_list">
        <b-container>
            <b-row>
                <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
                <b-col sm="12" md="6" class="text-right">
                    <!-- <router-link :to="{name: 'adm_goods_create'}">
                        <b-button variant="outline-primary" size="sm">Create</b-button>
                    </router-link> -->
                </b-col>
            </b-row>
            <hr>

            <List v-if="list.data && list.data.length" :list="list.data" :config="order_config" />
            
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
        'List': () => import('./_comp/List.vue'),
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
                const res = await ax.get(`/api/admin/shop/order`, { params: this.sch_frm});
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
</style>
