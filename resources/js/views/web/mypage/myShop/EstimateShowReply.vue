<template>
<b-container class="w_fence">
    <h3>견적서 조회</h3>
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" class="estimate_show">
        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
            Loading ......
        </LoadingModal>
        <div v-else>
            <b-card class="shadow sticky-top my-4" body-class="p-2">
                <b-row class="sticky-top">
                    <b-col><b-button variant="light">목록</b-button></b-col>
                    <b-col class="text-right">
                        <b-button-group>
                            <b-button variant="dark" @click="print">견적서 출력</b-button>
                            <b-button variant="warning" @click="reEstimate">선택상품 재견적 요청</b-button>
                            <b-button variant="success" @click="settle">선택상품 주문하기</b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
            </b-card>

            <b-container class="detail">
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col cols="2">견적번호 :</b-col>
                            <b-col>{{reply.er_id}}</b-col>
                            <b-col cols="2">견적일자 :</b-col>
                            <b-col>{{reply.created_at | formatDate_YYYY_MM_DD}}</b-col>
                            <b-col cols="2">납품기일 :</b-col>
                            <b-col>{{reply.er_dlvy_at}}</b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="2">유효기간 :</b-col>
                            <b-col>{{reply.er_effective_at}}</b-col>
                            <b-col cols="2">담당자 / 문의 :</b-col>
                            <b-col>
                                {{reply.user.name}}<br />
                                {{reply.user.tel}}<br />
                                {{reply.user.email}}
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="goods">
                <b-row v-for="(em, i) in reply.estimate_model" :key="em.em_id">
                    <b-col cols="2">
                        <div class="custom-control custom-checkbox image-checkbox">
                            <input type="checkbox" class="custom-control-input" :id="'ck'+em.em_id" v-model="em.em_check_opt" true-value="Y" false-value="N" @change="calculator" />
                            <label class="custom-control-label" :for="'ck'+em.em_id">
                                <img :src="em.goods.image_src_thumb[0]" class="img-fluid" />
                            </label>
                        </div>
                    </b-col>
                    <b-col>
                        <b-link v-if="!!em.em_gd_id" variant="outline-secondary" block :to="{name: 'goods_show', params:{gd_id:em.em_gd_id} }">
                            {{em.em_name}}
                            <P class="bg-light">
                                {{em.em_catno}} /
                                {{em.em_code}} /
                                {{em.em_spec}} /
                                {{em.em_unit}} /
                            </P>
                        </b-link>
                        <div v-else>
                            {{em.em_name}}
                            <P class="bg-light"> {{em.em_catno}} / {{em.em_code}} / {{em.em_spec}} / {{em.em_unit}} / </P>
                        </div>
                    </b-col>
                    <b-col>
                        {{em.em_price | rrp}} 원
                        <font-awesome-icon icon="times" />
                        {{ em.em_ea }} 개
                        <font-awesome-icon icon="equals" />
                        <b class="md_multi">{{em.em_price*em.em_ea | rrp}} 원</b>
                    </b-col>
                    <b-col v-if="em.estimate_option.length" cols="12" class="row m-3 p-0">
                        <b-col offset="5" cols="1" class="text-right">
                            <b-badge variant="warning" class="float-left clear-both">옵션</b-badge>
                        </b-col>
                        <b-col>
                            <b-row v-for="(option, i) in em.estimate_option" :key="option.eo_id" class="text-right">
                                <b-col>
                                    <label>
                                        <input type="checkbox" v-model="option.eo_check_opt" true-value="Y" false-value="N" @change="calculator" />
                                        <span>{{option.eo_tit}}: <b>{{option.eo_name}}</b></span>
                                        <i>수량: <b>{{option.eo_ea}}</b> 개</i>
                                    </label>
                                </b-col>
                                <b-col>
                                    {{option.eo_price | rrp}} 원
                                    <font-awesome-icon icon="times" />
                                    {{ option.eo_ea }} 개
                                    <font-awesome-icon icon="equals" />
                                    <b class="md_multi">{{option.eo_price*option.eo_ea | rrp}} 원</b>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="price">
                <b-row>
                    <b-col cols="12">총합 : <b>{{gd_price | comma}} 원</b></b-col>
                    <b-col cols="12">부가세 : <b>{{surtax | comma}} 원</b></b-col>
                    <b-col cols="12">배송료 : <b>{{dlvy_price | comma}} 원</b></b-col>
                    <b-col cols="12" v-if="air_price">항공운임료: <b>{{air_price | comma}} 원</b></b-col>
                    <b-col cols="12">최종 결제 금액 : <b>{{all_price | comma}} 원</b></b-col>
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
    name: "MyOrder",
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
            this.$router.push({name: 'order_settle', params: { od_goods: rst, od_type: 'buy_estimate' }});
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
    },
    mounted() {
        this.show();
    },

}
</script>

<style lang="css" scoped>

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
