<template>
<div class="w_fence">
    <h3>마일리지 <small>고객님의 마일리지 히스토리입니다.</small></h3>
    <b-container class="list">
        <b-row class="header">
            <b-col>날짜</b-col>
            <b-col>적립/차감내역</b-col>
            <b-col>마일리지</b-col>
            <b-col>상품권 교환</b-col>
            <b-col>가용 마일리지</b-col>
        </b-row>
        <b-row v-for="ml in mileage.data" :key="ml.ml_id" class="data" :class="{expiration:(ml.expiration || ml.ml_type=='SP')}">
            <b-col>{{ml.created_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-col>
                
                <div v-if="ml.ml_tbl == 'voucher'">
                    {{config[ml.refine_content[0]].name}} : {{ml.refine_content[1]}} 장 /
                    수령인: {{ml.refine_content[2]}} ({{ml.refine_content[3]}})
                </div>
                <div v-else-if="ml.ml_tbl == 'shop_order_model' && ml.order_model">
                    {{ml.ml_content}}
                    <b-button class="white xm" :to="{name:'my_order_show', params: { od_id:ml.order_model.odm_od_id }}">
                        주문 제품:{{ml.order_model.odm_gm_name}}
                    </b-button>
                </div>
                <div v-else>
                    <span v-if="ml.expiration">기간만료 마일리지 소멸</span>
                    <span v-else>{{ml.ml_content}}</span>
                </div>
            </b-col>
            <b-col>
                <span v-if="ml.ml_type == 'NO'">-</span>
                <span v-else>{{ml.ml_mileage | comma}} <b>P</b></span>
            </b-col>
            <b-col>
                <template v-if="ml.ml_tbl == 'voucher'">
                    <b-badge v-if="ml.ml_type == 'REQ'" class="white">요청</b-badge>
                    <b-badge v-else-if="ml.ml_type == 'OK'" class="green">승인</b-badge>
                    <b-badge v-else-if="ml.ml_type == 'NO'" class="gray">반려</b-badge>
                </template>
            </b-col>
            <b-col>
                <span v-if="ml.ml_tbl !== 'voucher'">{{ml.ml_enable_m | comma}} <b>P</b></span>
            </b-col>
        </b-row>
        <pagination :data="mileage" align="center" @pagination-change-page="index"></pagination>
    </b-container>

    <b-container class="request">
        <span class="tit">상품권 신청</span>
        <b-row>
            <b-col>
                <div v-for="(v, k) in config" :key="k">
                    <b-form-radio v-model="frm.type" :value="k">
                        <img :src="`${s3url}mypage/mileage/gift${v.point}.png`" />
                        <p>{{v.name}}</p>
                    </b-form-radio>
                </div>
                <validation :error="this.$store.state.error.validations.type" />
            </b-col>
            <b-col>
                <b-row>
                    <b-col>
                        <b-form-input v-model="frm.ea" placeholder="신청수량" id="ea" ref="ea" />
                        <validation :error="this.$store.state.error.validations.ea" />
                    </b-col>
                    <b-col>
                        <b-form-input v-model="frm.name" placeholder="수령인" id="name" ref="name" />
                        <validation :error="this.$store.state.error.validations.name" />                   
                    </b-col>
                    <b-col>
                        <b-form-input v-model="frm.hp" placeholder="휴대폰번호" id="hp" ref="hp" :formatter="frm_formatHp" />
                        <validation :error="this.$store.state.error.validations.hp" />                  
                    </b-col>
                    <b-col>
                        <b-button v-if="clickable" @click="store" variant="info" block>신청하기</b-button>
                        <b-button v-else class="gray" size="sm"><font-awesome-icon icon="save" /> 신청 중~!</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>※휴대폰 번호 오기입으로 인한 상품권 미수령은 당사가 책임지지 않으니 재확인 바랍니다.</b-col>
                </b-row>
            </b-col>

            
        </b-row>
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: 'MyMileageIndex',
    components: { 'validation': () =>     import('@/views/_common/Validation.vue'), },
    computed: { ...mapGetters({ enableMileage: 'auth/enableMileage', }) },
    data() {
        return {
            clickable : true,
            frm:{},
            mileage:{},
            config:{},
        };
    },

    mounted() { this.index(); },

    methods: {
        async index(page=1){
            try {
                const res = await ax.get(`/api/mileage`, { params: {page:page}});
                if (res && res.status === 200) {
                    this.mileage = res.data.list;
                    this.config = res.data.config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async store(){
            if (isEmpty(this.frm.type)) { Notify.toast('danger', "상품권을 선택하세요"); return false; }
            if (isEmpty(this.frm.ea)) { Notify.toast('danger', "신청 수량을 입력하세요"); this.$refs.ea.focus(); return false; }
            if (isEmpty(this.frm.name)) { Notify.toast('danger', "수령인을 입력하세요"); this.$refs.name.focus(); return false; }
            if (isEmpty(this.frm.hp)) { Notify.toast('danger', "휴대폰 번호를 입력하세요"); this.$refs.hp.focus(); return false; }
            if (this.enableMileage < this.config[this.frm.type].point*this.frm.ea) { Notify.modal('마일리지가 모자릅니다.', 'warning'); return false; }
            try {
                this.clickable = false;
                const res = await ax.post(`/api/mileage`, this.frm);
                if (res && res.status === 200) {
                    this.clickable = true;
                    this.$store.state.auth.enable_mileage = res.data;
                    Notify.modal("신청 되었습니다.", 'info');
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
           
        },
        frm_formatHp(v)   { return this.formatHp(v); },
    },
};
</script>

<style lang="scss" scoped>
h3 small { font-size:50%; }
.list .header { background-color:#DDD; border-top:2px solid #333; border-bottom:1px solid #ccc; }
.list .header .col { font-weight:bold; }
.list .data { border-bottom:1px solid #ccc; }
.list .expiration { background-color:#DDD; }
.list .row .col { padding:.6rem 0; }
.list .row .col:nth-child(1) { flex:0 0 13%; max-width:13%; text-align:center; }
.list .row .col:nth-child(3) { flex:0 0 11%; max-width:11%; text-align:right; }
.list .row .col:nth-child(4) { flex:0 0 15%; max-width:15%; text-align:center; }
.list .row .col:nth-child(5) { flex:0 0 11%; max-width:11%; text-align:right; padding-right:1.5rem; }
@media (max-width: 768px) {
    .list .header { display:none; }
    .list .row .col { max-width:none !important; width:auto !important; }
    .list .row .col:nth-child(1) { flex-basis:30%; flex-grow:0;  }
    .list .row .col:nth-child(2) { flex-basis:70%; flex-grow:1; }
    .list .row .col:nth-child(3) { flex-basis:50%; flex-grow:0; }
    .list .row .col:nth-child(4) { flex-basis:50%; flex-grow:0; }
    .list .row .col:nth-child(5) { flex-basis:50%; flex-grow:0; }
}

.request { margin-top:3rem; }
.request .tit { border-radius:20px; background-color:#1A90D6; padding:7px 20px; color:#fff; }
.request>.row { margin-top:1rem; border:1px solid #AAA; align-items:center; justify-content:center; }
.request>.row>.col { padding:1.6rem 1.1rem; }
.request>.row>.col:nth-child(1) { flex:0 0 30%; max-width:30%; border-right:1px solid #AAA; text-align:center; display:flex; justify-content:space-around; }
.request>.row>.col:nth-child(1) div { display:inline-block; }
.request>.row>.col:nth-child(1) div label img { width:115px; }
.request>.row>.col:nth-child(1) div p { margin:0; font-size:.82rem; color:#666; }
.request>.row>.col .row { margin-left:0; margin-right:0; }
.request>.row>.col .row:nth-child(2) .col { margin-top:1.5rem; font-size:.9rem; }
</style>