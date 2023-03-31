<template>
<b-container class="w_fence">
    <h3>견적서 조회 <b>Q-{{reply.er_id}}</b></h3>
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" class="estimate_show">
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <div v-else>
            <b-container class="top">
                <b-row>
                    <b-col>
                        <span>견적일자</span>
                        <b>{{reply.created_at | formatDate_YYYY_MM_DD}}</b>
                    </b-col>
                    <b-col>
                        <span>유효기간</span>
                        <b>{{reply.er_effective_at | formatDate_YYYY_MM_DD}}</b>
                    </b-col>
                    <b-col>
                        <span>납품기일</span>
                        <b>{{reply.er_dlvy_at | formatDate_YYYY_MM_DD}}</b>
                    </b-col>
                    <b-col>
                        <span>담당자/문의</span>
                        {{reply.user.name}}&nbsp;&nbsp;
                        {{reply.user.tel}}&nbsp;&nbsp;
                        {{reply.user.email}}
                    </b-col>
                </b-row>
            </b-container>

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
                    <b-col>
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
                    <b-col>{{em.em_price | rrp | comma | won}}</b-col>
                    <b-col>{{em.em_ea}}</b-col>
                    <b-col>{{em.em_price*em.em_ea | rrp | comma | won}}</b-col>
                    <template v-if="em.estimate_option.length">
                        <b-col cols="12" v-for="eo in em.estimate_option" :key="eo.eo_id">
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
                    <b-col>상품금액</b-col>
                    <b-col><b>{{(reply.er_gd_price+reply.er_surtax) | comma | won}}</b></b-col>
                    <b-col>배송료</b-col>
                    <b-col><b>{{reply.er_dlvy_price | comma | won}}</b></b-col>
                    <b-col>결제 예정 금액</b-col>
                    <b-col><b>{{reply.er_all_price | comma | won}}</b></b-col>
                </b-row>
                <b-row class="total_sub">
                    <b-col>
                        <div><b-col>상품가</b-col><b-col>{{reply.er_gd_price | comma | won}}</b-col></div>
                        <div><b-col>부가세</b-col><b-col>{{reply.er_surtax | comma | won}}</b-col></div>
                    </b-col>
                    <b-col>
                        <div><b-col>포사이언스 배송</b-col><b-col>{{dlvy_4s | comma}}</b-col></div>
                        <div><b-col>업체 배송</b-col><b-col>{{dlvy_other | comma}}</b-col></div>
                    </b-col>
                    <b-col>
                        <div><b-col>적립예정 마일리지</b-col><b-col>{{sum_mileage | comma}}</b-col></div>
                    </b-col>
                </b-row>
            </b-container>

   
            <b-container>
                <b-row>
                    <b-col cols="2">추가정보 :</b-col>
                    <b-col v-html="reply.er_content"></b-col>
                </b-row>
            </b-container>
            <b-container>
                <b-row>
                    <b-col>
                        <validation-provider
                            name="견적 요청 내용"
                            rules="required|min:1"
                            v-slot="validationContext"
                        >
                            <b-form-group
                                label="재견적 요청 내용"
                                label-for="eq_content"
                                label-class="required">
                                <b-form-textarea id="eq_content" v-model="reply.eq_content" placeholder="재견적 요청 내용..." rows="3" :state="getValidationState(validationContext)"></b-form-textarea>
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                    </b-col>
                </b-row>
            </b-container>
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
            dlvy_price: 0,
            air_price: 0,
            all_price: 0,
        }
    },
    computed: {
        dlvy_4s () {
            return this.reply.order_purchase_at.hasOwnProperty(0) ? this.od.order_purchase_at[0].odpa_dlvy_p_add_vat : 0;
        },
        dlvy_other () {
            return Object.values(this.od.order_purchase_at).reduce((acc, el) => {
                return acc + (el.odpa_pa_name != '' ? el.odpa_dlvy_p_add_vat : 0)
            }, 0);
        },
        sum_mileage () {
            return Math.round(this.od.od_gd_price * Auth.user().my_mileage_rate / 100);
        },
    },
    methods:{
        async show(){
            try {
                const res = await ax.get(`/api/shop/estimate/reply/${this.$route.params.er_id}`);
                if (res && res.status === 200) {
                    this.reply = res.data;
                    this.gd_price = res.data.er_gd_price;
                    this.surtax = res.data.er_surtax;
                    this.dlvy_price = res.data.er_dlvy_price;
                    this.air_price = res.data.er_air_price;
                    this.all_price = res.data.er_all_price;
                    this.isLoadingModalViewed= false;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },

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
            const p = priceCalculator(this.reply.estimate_model);
            this.gd_price = p.gd_price;
            this.surtax = p.surtax;
            this.dlvy_price = p.dlvy_price;
            this.air_price = p.air_price;
            this.all_price = p.all_price;
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        chkChange () {
            let chkCnt = this.ledger.data.filter(el => el.chk_cplt==true).length;
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
    mounted() {
        this.show();
    },

}
</script>

<style lang="css" scoped>
.sum_up { border-top:3px solid #4F637B; }
.sum_up .total { border-bottom:1px solid #D6D6D6; }
.sum_up .total .col { color:#000; font-weight:bold; padding:1rem .5rem; }
.sum_up .total .col b { font-size:1.4rem; }

.sum_up .total .col:nth-of-type(odd) { padding-left:2rem; display:flex; align-items:center; }
.sum_up .total .col:nth-of-type(even) { padding-right:2rem; text-align:right; }

.sum_up .total .col:nth-of-type(1) {  }
.sum_up .total .col:nth-of-type(2) {  border-right:1px solid #D6D6D6; }
.sum_up .total .col:nth-of-type(4):after,
.sum_up .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; top:19px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2; }
.sum_up .total .col:nth-of-type(2):after { content:"+"; }
.sum_up .total .col:nth-of-type(3) {  }
.sum_up .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }
.sum_up .total .col:nth-of-type(4):after { content:"="; }
.sum_up .total .col:nth-of-type(5) { flex-basis:19.5%; max-width:19.5%; }
.sum_up .total .col:nth-of-type(6) { flex-basis:19.5%; max-width:19.5%; }
.sum_up .total_sub { background:#F2F3F5; border-bottom-width:0; }
.sum_up .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.sum_up .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.sum_up .total_sub>.col:nth-of-type(3) { flex-basis:39%; max-width:39%; }
.sum_up .total_sub .col>div { display:flex; flex-wrap:wrap; }
.sum_up .total_sub .col>div:nth-of-type(1) { padding:1.3rem 1rem .5rem 1rem; }
.sum_up .total_sub .col>div:nth-of-type(2) { padding:0 1rem 2.5rem 1rem; }
.sum_up .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.sum_up .total_sub .col>div .col:nth-of-type(2) { text-align:right; }





.estimate_show .goods>.row { border-bottom:1px solid #DDD; margin-bottom:1rem; padding-bottom:1rem;  }
.estimate_show .goods>.row>div img { width:100px; height:100px; object-fit:cover; }
.estimate_show .goods>.row>div:nth-child(2) .btn { text-align:left; }
.estimate_show .goods>.row>div:nth-child(3) { text-align:right; }
.estimate_show .goods>.row>div:nth-child(3) .md_multi { display:inline-block; min-width:120px; }

.estimate_show .price .row div { text-align:right; }
.estimate_show .price .row div b { display:inline-block; min-width:200px; }

.estimate_show .container { margin-bottom:2rem; }



.custom-control.image-checkbox { position: relative; padding-left: 0; }
.custom-control.image-checkbox .custom-control-input:checked ~ .custom-control-label:after,
.custom-control.image-checkbox .custom-control-input:checked ~ .custom-control-label:before { opacity: 1; }
.custom-control-input:checked~.custom-control-label::before { color: #fff; border-color: #007bff; background-color: #007bff; }
.custom-control.image-checkbox label:after,
.custom-control.image-checkbox label:before { transition: opacity .3s ease; opacity: 0; left: 0.25rem; }
.custom-control.image-checkbox label:focus,
.custom-control.image-checkbox label:hover { opacity: .8; }
.custom-control.image-checkbox label img { border-radius: 2.5px; }
.custom-control-label::before { width:1.5rem; height:1.5rem; }
.custom-control-label::after { width:1.5rem; height:1.5rem; }
</style>
