<template>
<div class="p_wrap">
    <h3 class="p_tit">주문 목록</h3>

    <b-container class="frm_sch">
        <SchDate v-model="sch_frm"><b-col slot="prev" class="label top_left">주문일</b-col></SchDate>
        <b-row>
            <b-col class="label">주문유형</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.od_type">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(val, key) in order_config.type" :key="key" :value="key">{{ val }}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">결제수단</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.od_pay_method">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(val, key) in order_config.pay_method" :key="key" :value="key">{{ val }}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">처리상태</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.od_step">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(val, key) in order_config.step" :key="key" :value="key">{{ val.name }}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">주문액</b-col>
            <b-col class="type03 period">
                <b-form-input v-model="sch_frm.startPrice" :formatter="priceComma" />
                <b>~</b>
                <b-form-input v-model="sch_frm.endPrice" :formatter="priceComma" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label bottom_left">담당자</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.od_mng">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="opt in mng_on" :key="opt.id" :value="opt.id">{{ opt.name }}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">담당팀</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.um_group">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(val, key) in mng_info.group" :key="key" :value="key">{{ val }}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">검색</b-col>
            <b-col>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-form-select class="custom-select" v-model="sch_frm.mode">
                            <b-form-select-option value="od_orderer">주문자</b-form-select-option>
                            <b-form-select-option value="orderer_email">주문자이메일</b-form-select-option>
                            <b-form-select-option value="orderer_hp">주문자휴대폰</b-form-select-option>
                            <b-form-select-option value="od_no">주문번호</b-form-select-option>
                            <b-form-select-option value="od_id">글번호</b-form-select-option>
                            <b-form-select-option value="od_receiver">수취인명</b-form-select-option>
                            <b-form-select-option value="od_addr1">배송주소</b-form-select-option>
                            <b-form-select-option value="oex_depositor">입금자</b-form-select-option>
                            <b-form-select-option value="gm_name">제품명</b-form-select-option>
                            <b-form-select-option value="gm_code">모델명</b-form-select-option>
                            <b-form-select-option value="catno">Cat.No</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>
                    <b-form-input v-model="sch_frm.keyword" placeholder="검색어를 입력하세요" @keyup.enter="routerPush"></b-form-input>
                    <b-input-group-append><b-button @click="routerPush"><b-icon-search /></b-button></b-input-group-append>
                </b-input-group>
            </b-col>

            <b-col class="label type_cus">주문기기</b-col>
            <b-col class="type_cus">
                <b-form-select v-model="sch_frm.sale_env">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(val, key) in order_config.sale_env" :key="key" :value="key">{{ val }}</b-form-select-option>
                </b-form-select>
            </b-col>
        </b-row>
    </b-container>

   
    <b-container class="cmain">
        <b-row class="list_top">
            <b-col sm="12" md="6">Total : <b-badge variant="info">{{this.list.total}}</b-badge></b-col>
            <b-col sm="12" md="6" class="text-right">
                <b-badge pill class="yellow">&nbsp;</b-badge> 미수회원
                <b-badge pill class="gray">&nbsp;</b-badge> 취소주문
                
                <b-form-select v-model="sch_frm.list_size">
                    <b-form-select-option value="20">20개</b-form-select-option>
                    <b-form-select-option value="50">50개</b-form-select-option>
                    <b-form-select-option value="100">100개</b-form-select-option>
                </b-form-select>
            </b-col>
        </b-row>
        <List v-if="list.data && list.data.length" :list="list.data" :config="order_config" :mng_off="mng_off" />
        
        <pagination :data="list" @pagination-change-page="pageSet" :limit="5" :showDisabled="true" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
	        <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>   
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    components: {
        'SchDate': () => import('@/views/_common/SchDate.vue'),
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
                sale_env:'',
                gd_enable:'',
                mode:'od_orderer',
                keyword:'',
                page:0,
                list_size:20,
            },
            mng_on:{},
            mng_off:{},
            mng_info: {},
            order_config: {},
            gd_enable: { 0:{value:'Y', name:'활성'}, 1:{value:'N', name:'비활성'} },

        }
    },
    watch: {
		'sch_frm.list_size': {
			handler() {
				this.routerPush();
			}
		}
	},
    methods: {
        
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/order`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.mng_on = res.data.mng_on;
                    this.mng_off = res.data.mng_off;
                    this.mng_info = res.data.mng_info;
                    this.order_config = res.data.order_config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        routerPush(){
            this.$router.push({name: 'adm_order_index', query: this.sch_frm }).catch(()=>{});
        },
        pageSet(p){
            this.sch_frm.page = p;
            this.routerPush();
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
}
</script>

<style lang="css" scoped>
.cmain .list_top select { display: inline-block; max-width: 7rem; }
.p_wrap .frm_sch .row .type_cus { flex:0 0 7%; max-width:7%; }
</style>
