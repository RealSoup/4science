<template>
<b-container class="w_fence">
    <h3>견적서 <b>{{reply.er_id}}</b></h3>
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" class="estimate_show">
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <div v-else>
            <b-container class="top">
                <b-row>
                    <b-col><span>견적일자</span> <b>{{reply.created_at | formatDate_YYYY_MM_DD}}</b></b-col>
                    <b-col><span>유효기간</span> <b>{{reply.er_effective_at | formatDate_YYYY_MM_DD}}</b></b-col>
                    <b-col><span>납품기일</span> <b>{{reply.er_dlvy_at | formatDate_YYYY_MM_DD}}</b></b-col>
                    <b-col><span>담당자/문의</span> {{reply.user.name}}&nbsp;&nbsp; {{reply.user.tel}}&nbsp;&nbsp; {{reply.user.email}}</b-col>
                </b-row>
            </b-container>

            <h6>상품정보</h6>
            <b-container class="goods">
                <b-row>
                    <b-col><b-form-checkbox class="myCheck" v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk" /></b-col>
                    <b-col></b-col>
                    <b-col>상품명 / 모델명</b-col>
                    <b-col>판매가격</b-col>
                    <b-col>수량</b-col>
                    <b-col>합계</b-col>
                </b-row>

                <b-row v-for="em in reply.estimate_model" :key="em.em_id">
                    <b-col class="align">
                        <b-form-checkbox class="myCheck" v-model="em.em_check_opt" value="Y" unchecked-value="N" @change="chkChange" />
                    </b-col>
                    <b-col>
                        <b-link v-if="!!em.em_gd_id" :to="{name: 'goods_show', params:{gd_id:em.em_gd_id} }">
                            <img :src="em.goods.image_src_thumb[0]" class="img-fluid" />
                        </b-link>
                        <img v-else :src="em.goods.image_src_thumb[0]" class="img-fluid" />
                    </b-col>
                    <b-col>
                        <b-link v-if="!!em.em_gd_id" :to="{name: 'goods_show', params:{gd_id:em.em_gd_id} }">
                            <b>{{em.em_name}}</b>
                            <p>
                                모델명: {{em.em_code}} / Cat.No.: {{em.em_catno}}<br />
                                사양: {{em.em_spec}}<br />
                                판매단위: {{em.em_unit}}
                            </p>
                        </b-link>
                        <div v-else>
                            {{em.em_name}}
                            <p>
                                모델명: {{em.em_code}} / Cat.No.: {{em.em_catno}}<br />
                                사양: {{em.em_spec}}<br />
                                판매단위: {{em.em_unit}}
                            </p>
                        </div>
                    </b-col>
                    <b-col class="align">{{em.em_price | rrp | comma | won}}</b-col>
                    <b-col class="align">{{em.em_ea}}</b-col>
                    <b-col class="align">{{em.em_price*em.em_ea | rrp | comma | won}}</b-col>
                    <template v-if="em.estimate_option.length">
                        <b-col class="option" v-for="eo in em.estimate_option" :key="eo.eo_id">
                            <b-col></b-col>
                            <b-col>추가 옵션</b-col>
                            <b-col>{{eo.eo_tit}}:{{eo.eo_name}}</b-col>
                            <b-col>{{eo.eo_price | rrp | comma | won}}</b-col>
                            <b-col>{{eo.eo_ea}}</b-col>
                            <b-col>{{eo.eo_price*eo.eo_ea | rrp | comma | won}}</b-col>
                        </b-col>
                    </template>
                </b-row>
            </b-container>

            <b-container class="sum_up">
                <b-row class="total">
                    <b-col>견적가</b-col>
                    <b-col><b>{{(gd_price+surtax) | comma | won}}</b></b-col>
                    <b-col>배송료</b-col>
                    <b-col><b>{{(dlvy_4s+dlvy_other+air_price) | comma | won}}</b></b-col>
                    <b-col>결제 예정 금액</b-col>
                    <b-col><b>{{all_price | comma | won}}</b></b-col>
                </b-row>
                <b-row class="total_sub">
                    <b-col>
                        <div><b-col>상품가</b-col><b-col>{{gd_price | comma | won}}</b-col></div>
                        <div><b-col>부가세</b-col><b-col>{{surtax | comma | won}}</b-col></div>
                    </b-col>
                    <b-col>
                        <div><b-col>포사이언스 배송</b-col><b-col>{{dlvy_4s | comma}}</b-col></div>
                        <div><b-col>업체 배송</b-col><b-col>{{(dlvy_other+air_price) | comma}}</b-col></div>
                    </b-col>
                    <b-col>
                        <div><b-col>적립예정 마일리지</b-col><b-col>{{sum_mileage | comma}}</b-col></div>
                    </b-col>
                </b-row>
            </b-container>
   
            <b-container class="extra">
                <b-row>
                    <b-col>
                        <h6>추가정보</h6>
                        <div>
                            <b-button v-for="fi in reply.file_info" class="white mr-2" @click="fileDown(fi.down_path, fi.fi_original)" :key="fi.fi_id">
                                <b-icon icon="file-earmark-arrow-down-fill" /> {{fi.fi_original}}
                            </b-button>
                        </div>
                        <hr>
                        <div class="desc" v-html="nl2br(reply.er_content)" />
                    </b-col>
                    <b-col >
                        <h6><b>재견적 요청</b></h6>
                        <validation-provider name="견적 요청 내용" rules="required|min:1" v-slot="validationContext">
                            <b-form-group label-for="eq_content" label-class="required">
                                <b-form-textarea id="eq_content" v-model="reply.eq_content" placeholder="재견적 요청 내용..." rows="6" :state="getValidationState(validationContext)"></b-form-textarea>
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>
            </b-container>

            <div class="btn_box">
                <b-button class="black lg" @click="print">견적서 출력</b-button>
                <b-button class="gray lg" @click="reEstimate">선택상품 재견적 요청</b-button>
                <b-button class="blue lg" @click="settle">선택상품 주문하기</b-button>
            </div>
        </div>
    </ValidationObserver>
</b-container>    
</template>

<script>
import ax from '@/api/http';
import { Validator } from 'vee-validate';

export default {
    name: "mypageEstimateReplyShow",
    components: {
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
    },
    data() {
        return {
            isLoadingModalViewed: true,
            reply:{},
            gd_price: 0,
            surtax: 0,
            dlvy_4s: 0,
            dlvy_other: 0,
            air_price: 0,
            all_price: 0,
            sum_mileage: 0,
            indeterminate:false,
            all_chk:false,
        }
    },
    computed: {
        
    },
    methods:{
        

        settle() {
            let rst = [];
            for (var v of this.reply.estimate_model) {
                if (v.em_ea > 0 && v.em_check_opt == 'Y')
                    rst.push({gd_id:v.em_gd_id, em_id:v.em_id});

                if (v.hasOwnProperty('estimate_option')) {
                    for (var op of v.estimate_option) {
                        if (op.eo_ea > 0 && op.eo_check_opt == 'Y')
                            rst.push({gd_id:op.eo_gd_id, eo_id:op.eo_id});
                    }
                }
            }
            if (!rst.length) {
                Notify.modal("모델을 선택하세요", 'info');
                return false;
            }
            this.$router.push({name: 'order_settle', params: { od_goods: rst, od_type: 'buy_estimate', od_er_id:this.$route.params.er_id }});
        },

        async reEstimate(){
            const isValid = await this.$refs.observer.validate();
            if (isValid) {
                try {
                    const res = await ax.post(`/api/shop/estimate/reEstimate`, this.reply);
                    if (res && res.status === 200) {
                        console.log(res);
                        Notify.toast('success', '견적 요청 완료')
                        // this.$router.push({name: 'main'});
                    } else {
                        Notify.toast('warning', res);
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.responsee);
                }
            } else {
                document.getElementById('eq_content').focus();
            }
        },

        print () {
            var url = `/api/shop/estimate/printEstimate/${this.$route.params.er_id}`;
            var name = "견적서 인쇄";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },

        
        calculator() {
            let collect = {};
            let sum_mileage = 0;
            let dlvy_other = 0;
            for (var em of this.reply.estimate_model) {
                let pa_id = 0;
                if (em.em_check_opt == 'Y') {
                    if (!!em.goods&&!!em.goods.purchase_at)
                    pa_id = em.goods.gd_pa_id;
                    if (!collect.hasOwnProperty(pa_id)) {
                        if (pa_id>0 && em.goods.purchase_at.pa_type == "AIR")
                            collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(em.goods.purchase_at.pa_price_add_vat)};
                        else
                            collect[pa_id] = { 'goods':0, 'dlvy':Number(em.goods.dlvy_fee_add_vat), 'free_dlvy_max':Number(em.goods.free_dlvy_max), 'air':0};
                    }
                    collect[pa_id].goods += Number(em.em_price) * Number(em.em_ea);
                    sum_mileage += em.gain_mileage;
                }
                for (var eo of em.estimate_option) {
                    if (eo.eo_check_opt == 'Y') {
                        collect[pa_id].goods += Number(eo.eo_price) * Number(eo.eo_ea);
                        sum_mileage += eo.gain_mileage;
                    }
                }
            }

            this.gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            this.air_price = Object.values(collect).reduce((acc, el) => acc + el.air, 0);
            this.surtax = this.gd_price*0.1;
            for (var key in collect) {
                if(key == 0) {
                    if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) this.dlvy_4s = Number(collect[key].dlvy);                    
                } else {
                    if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) dlvy_other += Number(collect[key].dlvy);
                }
            }
            this.dlvy_other = dlvy_other;
            this.sum_mileage = sum_mileage;
            this.all_price = this.gd_price+this.surtax+this.dlvy_4s+this.air_price+dlvy_other;
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        chkChange () {
            let chkCnt = this.reply.estimate_model.filter(el => el.em_check_opt==true).length;
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.allSelected = false;
            } else if (chkCnt === this.ledger.data.length) {
                this.indeterminate = false;
                this.allSelected = true;
            } else {
                this.indeterminate = true;
                this.allSelected = false;
            }

            this.calculator();
        },

        toggle_all_chk(checked) {
            this.ledger.data.forEach(el => {
                el.chk_cplt = checked ? true : false;
            });
            this.indeterminate = false;
        },
    },
    async mounted() {
        const res = await ax.get(`/api/shop/estimate/reply/${this.$route.params.er_id}`);
        if (res && res.status === 200) {
            this.reply = res.data;
            this.isLoadingModalViewed= false;
            this.calculator();
        }   
    },

}
</script>

<style lang="css" scoped>

.w_fence { padding-right:0; padding-left:0; }
.w_fence .container,
.w_fence .container .row, 
.w_fence .container .row .col { margin:0; padding:0; }
h3 { font-size:1.5rem; }
h3 b { color:#0094EA; font-size:1.3rem; }
h6 { font-size:1.15rem; font-weight:600; margin-top:2rem; padding-left:2rem; }
.w_fence .top { border-top:2px solid #4F637B; border-left:1px solid #B7B7B7; }
.w_fence .top .row .col { border-right:1px solid #B7B7B7; border-bottom:1px solid #B7B7B7; padding:1.2rem 0; text-align:center; }
.w_fence .top .row .col:nth-of-type(4) { flex:0 0 40%; max-width:40%;  }
.w_fence .top .row .col span { margin-right:.7rem; font-weight:600; }
.w_fence .top .row .col b { color:#0094EA; }

.w_fence .goods { padding-bottom:.5rem; }
.w_fence .goods .row .col { text-align:center; padding-top:.4rem; padding-bottom:.4rem; }
.w_fence .goods .row .col.align { display:flex; align-items:center; justify-content:center; }
.w_fence .goods .row:first-child { border-top:1px solid #ACACAC; border-bottom:1px solid #ACACAC; background-color:#ECECEC; }
.w_fence .goods .row:first-child .col { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem; }
.w_fence .goods .row:not(:first-child) .col,
.w_fence .goods .row:not(:first-child) .col p { color:#AEAEAE; font-size:.85rem; }
.w_fence .goods .row .col b { color:#000; font-size:.95rem; }
.w_fence .goods .row .col:nth-child(1) { flex:0 0 7%; max-width:7%; }
.w_fence .goods .row .col:nth-child(2) { flex:0 0 9%; max-width:9%; }
.w_fence .goods .row .col:nth-child(3) {  display:flex; align-items:center; text-align:left; padding-left:3%; }
.w_fence .goods .row .col:nth-child(4) { flex:0 0 10%; max-width:10%; }
.w_fence .goods .row .col:nth-child(5) { flex:0 0 10%; max-width:10%; }
.w_fence .goods .row .col:nth-child(6) { flex:0 0 10%; max-width:10%; font-weight:900; color:#000; }
.w_fence .goods .row .col img { width:100%; }
.w_fence .goods .row .col p { margin:0; }
.w_fence .goods .row .col >>> .myCheck .custom-control-label::before, 
.w_fence .goods .row .col >>> .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px; }
.w_fence .goods .row .option { flex:0 0 100%; max-width:100%; display:flex; }

.w_fence .sum_up { border-top:3px solid #4F637B; }
.w_fence .sum_up .total { border-bottom:1px solid #D6D6D6; }
.w_fence .sum_up .total .col { color:#000; font-weight:bold; padding:1rem .5rem; }
.w_fence .sum_up .total .col b { font-size:1.4rem; }

.w_fence .sum_up .total .col:nth-of-type(odd) { padding-left:2rem; display:flex; align-items:center; }
.w_fence .sum_up .total .col:nth-of-type(even) { padding-right:2rem; text-align:right; }

.w_fence .sum_up .total .col:nth-of-type(1) {  }
.w_fence .sum_up .total .col:nth-of-type(2) {  border-right:1px solid #D6D6D6; }
.w_fence .sum_up .total .col:nth-of-type(2):after,
.w_fence .sum_up .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; top:19px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2; }
.w_fence .sum_up .total .col:nth-of-type(2):after { content:"+"; }
.w_fence .sum_up .total .col:nth-of-type(3) {  }
.w_fence .sum_up .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }
.w_fence .sum_up .total .col:nth-of-type(4):after { content:"="; }
.w_fence .sum_up .total .col:nth-of-type(5) { flex-basis:19.5%; max-width:19.5%; }
.w_fence .sum_up .total .col:nth-of-type(6) { flex-basis:19.5%; max-width:19.5%; }
.w_fence .sum_up .total_sub { background:#F2F3F5; border-bottom-width:0; }
.w_fence .sum_up .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.w_fence .sum_up .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.w_fence .sum_up .total_sub>.col:nth-of-type(3) { flex-basis:39%; max-width:39%; }
.w_fence .sum_up .total_sub .col>div { display:flex; flex-wrap:wrap; }
.w_fence .sum_up .total_sub .col>div:nth-of-type(1) { padding:1.3rem 1rem .5rem 1rem; }
.w_fence .sum_up .total_sub .col>div:nth-of-type(2) { padding:0 1rem 1.5rem 1rem; }
.w_fence .sum_up .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.w_fence .sum_up .total_sub .col>div .col:nth-of-type(2) { text-align:right; }

.w_fence .extra { margin-top:2rem; }
.w_fence .extra .row .col:nth-child(1) { margin-right:2rem; }
.w_fence .extra .row .col h6 { border-bottom:2px solid #707070; margin-bottom:.7rem; padding-bottom:.5rem; }
.w_fence .extra .row .col h6 b { color:#0094EA; }
.w_fence .extra .row .col:nth-child(1) .desc { border:1px solid #D6D6D6; padding:1rem;}
.w_fence .extra .row .col .btn { font-size:.85rem; padding:.3rem; }

</style>
