<template lang="html">
    <b-container id="pay">

        <h2>결제하기</h2>

        <!-- <b-card no-body class="shadow mb-2 sticky-top p-2" v-b-tooltip.hover.bottom="{ variant: 'info', title:'주문을 위한 입력 상태를 나태냅니다.' }">
            <b-container fluid>
                <div class="row">
                    <b-col>
                        <b-progress :max="validationCounter.max" height="2rem" variant="info">
                            <b-progress-bar :value="validationCounter.cur">
                                <span>필수 입력 체크: <strong>{{ validationCounter.cur/*.toFixed(2)*/ }} / {{validationCounter.max}}</strong></span>
                            </b-progress-bar>
                        </b-progress>
                    </b-col>
                </div>
            </b-container>
        </b-card> -->



        <h4>주문상품</h4>
        <hr />

        <template v-for="(pa, idx) in lists">
            <b-card header-tag="header" footer-tag="footer" class="shadow mt-3" :key="idx">
                <template #header><b>{{pa.list[0].purchase_at ? pa.list[0].purchase_at.pa_name : '4SCIENCE'}}</b> 직배송 상품</template>
                <b-container fluid>
                    <b-row class="mt-3">
                        <div class="col">
                            <template v-for="(gd, gd_idx) in pa.list">
                                <template v-for="(gm, gm_idx) in gd.goods_model">
                                    <b-row class="mt-3" :key="idx+'_gd'+gd_idx+'_gm'+gm_idx">
                                        <b-col cols="2">
                                            <img :src="gd.image_src_thumb[0]" />
                                        </b-col>
                                        <b-col cols="5">
                                            <b>{{gd.gd_name}}</b>
                                            <P class="bg-light">
                                                {{gm.gm_name}} /
                                                {{gm.gm_catno}} /
                                                {{gm.gm_code}} /
                                                {{gm.gm_spec}} /
                                                {{gm.gm_unit}} /
                                            </P>
                                        </b-col>
                                        <b-col cols="2">
                                            {{gd.maker.mk_name}}
                                        </b-col>
                                        <b-col cols="3" class="text-right">
                                            {{gm.gm_price_add_vat | comma}} X {{gm.ea}} = {{gm.gm_price_add_vat*gm.ea | comma}} 원
                                        </b-col>
                                    </b-row>
                                </template>

                                <template v-if="gd.option_child">
                                    <b-row class="mt-5 bg-warning"><b-col><b>추가 옵션</b></b-col></b-row>
                                    <template v-for="(opc, opc_idx) in gd.option_child">
                                        <b-row class="mt-3" :key="idx+'_gd'+gd_idx+'_opc'+opc_idx">
                                            <b-col cols="6">
                                                {{opc.opc_name}}
                                            </b-col>
                                            <b-col cols="6" class="text-right">
                                                {{opc.opc_price_add_vat}} X {{opc.ea}} = {{opc.opc_price_add_vat*opc.ea | comma}} 원
                                            </b-col>
                                        </b-row>
                                    </template>
                                </template>
                            </template>
                        </div>

                        <b-col cols="2" class="bg-info text-white align-items-center justify-content-center d-flex">
                            <template v-if="pa.price.air_add_vat">항공운임료</template>
                            <template v-else>배송비</template>
                            <br />
                            {{pa.price.air_add_vat ? pa.price.air_add_vat : pa.price.dlvy_add_vat | comma}} 원
                        </b-col>
                    </b-row>
                </b-container>
                <template #footer>
                    <p class="text-right">
                        <b-button variant="primary">
                            <b-badge variant="success">상품</b-badge> {{pa.price.goods_add_vat | comma}}
                            <b-badge variant="dark" class="mx-3">+</b-badge>
                            <b-badge variant="info">배송비</b-badge> {{pa.price.dlvy_add_vat | comma}}
                            <template v-if="pa.price.air_add_vat">
                                <b-badge variant="dark" class="mx-3">+</b-badge>
                                <b-badge variant="info">항공운임료</b-badge> {{pa.price.air_add_vat | comma}}
                            </template>
                            <b-badge variant="dark" class="mx-3">=</b-badge>
                            <b-badge variant="warning">{{pa.price.goods_add_vat + pa.price.dlvy_add_vat + pa.price.air_add_vat | comma}}</b-badge> 원
                        </b-button>
                    </p>
                </template>
            </b-card>
        </template>


        <br><br><br>
        <h4>주문 정보</h4>
        <hr />


        <b-row class="mt-3">
            <b-col>
                <input type="text" v-model="order.od_orderer" ref="od_orderer" id="od_orderer" class="awesome_placeholder" required autocomplete="off" />
                <label for="od_orderer"><span>주문자 이름을 입력하세요</span></label>
            </b-col>
            <b-col>
                <b-form-input v-model="order.od_orderer_hp" ref="od_orderer_hp" id="od_orderer_hp" class="awesome_placeholder" required :formatter="formatHp" autocomplete="off" />
                <label for="od_orderer_hp"><span>주문자 전화번호를 입력하세요</span></label>
            </b-col>
            <b-col>
                <input type="email" v-model="order.od_orderer_email" ref="od_orderer_email" id="od_orderer_email" class="awesome_placeholder" required autocomplete="off" />
                <label for="od_orderer_email"><span>주문자 이메일을 입력하세요</span></label>
            </b-col>
        </b-row>

        <br><br><br>
        <h4>배송 정보</h4>
        <hr />
        <b-row class="mt-3 shipping_info">
            <b-col>
                <input type="text" v-model="order.od_receiver" ref="od_receiver" id="od_receiver" class="awesome_placeholder" required />
                <label for="od_receiver"><span>받는 사람 이름을 입력하세요</span></label>
            </b-col>
            <b-col>
                <b-form-input v-model="order.od_receiver_hp" ref="od_receiver_hp" id="od_receiver_hp" class="awesome_placeholder" required :formatter="formatHp" />
                <label for="od_receiver_hp"><span>받는 사람 전화번호를 입력하세요</span></label>
            </b-col>
        </b-row>
        <b-row class="mt-3 shipping_info">
            <b-col cols="2">
                <b-form-input v-model="order.od_zip" ref="od_zip" placeholder="우편번호" readonly />
            </b-col>
            <b-col cols="2">
                <b-button variant="primary" @click="postcode_open = !postcode_open">
                    <template v-if="postcode_open"><b-icon-x-square-fill /></template>
                    <template v-else>주소검색</template>
                </b-button>
            </b-col>
            <b-col cols="5">
                <b-form-input v-model="order.od_addr1" ref="od_addr1" placeholder="주소" readonly />

            </b-col>
            <b-col>
                <input type="text" id="od_addr2" ref="od_addr2" class="awesome_placeholder" v-model="order.od_addr2" required />
                <label for="od_addr2"><span>상세주소</span></label>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <template v-if="postcode_open">
                    <VueDaumPostcode class="shadow mt-3" @complete="onPostcodeSlt" :animation="true" >
                        <template #loading>
                            <b-spinner variant="success" label="Spinning" />
                        </template>
                    </VueDaumPostcode>
                </template>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-form-textarea
                    v-model="order.od_memo"
                    ref="od_memo"
                    id="od_memo"
                    placeholder="배송시 요청사항을 입력하세요"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-col>
        </b-row>



        <br><br><br>
        <h4>결제</h4>
        <hr />
        <b-row>
            <b-col cols="8" class="payment_method">
                <h5>결제 수단</h5>
                <b-form-group>
                    <b-row>
                        <b-col cols="3">카드</b-col>
                        <b-col>
                            <b-form-radio v-model="order.od_pay_method" value="C">
                                <img src="/img/order/card.png" />
                                <p>이니시스 온라인 신용카드 결제</p>
                            </b-form-radio>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3">계좌이체</b-col>
                        <b-col>
                            <b-form-radio v-model="order.od_pay_method" value="B">
                                <img src="/img/order/deposit.png" />
                                <p>무통장입금, 온라인계좌이체</p>
                            </b-form-radio>

                            <transition name="slideUpDown">
                                <div v-if="order.od_pay_method == 'B'" class="payment_option">
                                    <b-row>
                                        <b-col cols="3">결제금액</b-col>
                                        <b-col>{{order.price.total| comma}} 원</b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="3">은행선택</b-col>
                                        <b-col>
                                            <b-form-radio v-model="order.extra.oex_finance_type" value="K">
                                                국민은행 010-01-0944-960
                                            </b-form-radio>
                                            <b-form-radio v-model="order.extra.oex_finance_type" value="W">
                                                우리은행 849-103249-13-002
                                            </b-form-radio>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="3">예금주</b-col>
                                        <b-col>(주) 아이넥서스</b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="3">입금자</b-col>
                                        <b-col><b-form-input v-model="order.extra.oex_depositor" ref="oex_depositor" placeholder="입금자" /></b-col>
                                    </b-row>
                                    <PayPlan v-model="order.extra" />
                                </div>
                            </transition>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3">PSYS</b-col>
                        <b-col>
                            <b-form-radio v-model="order.od_pay_method" value="P">
                                <img src="/img/order/card.png" />
                                <p>원격지 연구비 직접결제</p>
                            </b-form-radio>
                            <transition name="slideUpDown">
                                <div v-if="order.od_pay_method == 'P'" class="payment_option">
                                    <b-row>
                                        <b-col cols="3">결제금액</b-col>
                                        <b-col>{{order.price.total| comma}} 원</b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col cols="3">결제자</b-col>
                                        <b-col><b-form-input v-model="order.extra.oex_depositor" ref="oex_depositor" placeholder="결제자" /></b-col>
                                    </b-row>
                                    <PayPlan v-model="order.extra" />
                                </div>
                            </transition>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3">전표</b-col>
                        <b-col>
                            <b-form-radio v-model="order.od_pay_method" value="S">
                                <img src="/img/order/pressure.jpg" />
                                <p>카드압인 전표요청</p>
                            </b-form-radio>

                            <transition name="slideUpDown">
                                <div v-if="order.od_pay_method == 'S'" class="payment_option">

                                    <div class="card_name border border-warning rounded-lg location mt-3">
                                        <div class="p-3 bg-warning">
                                            카드사 선택
                                        </div>
                                        <b-form-group class="mt-3 pl-4">
                                            <b-form-radio v-model="order.extra.oex_finance_type" class="custom-control-inline" value="SH">신한</b-form-radio>
                                            <b-form-radio v-model="order.extra.oex_finance_type" class="custom-control-inline" value="BC">BC</b-form-radio>
                                            <b-form-radio v-model="order.extra.oex_finance_type" class="custom-control-inline" value="SS">삼성</b-form-radio>
                                            <b-form-radio v-model="order.extra.oex_finance_type" class="custom-control-inline" value="ETC">
                                                기타
                                                <input type="text" v-model="order.extra.oex_finance_type_etc" @focus="order.extra.oex_finance_type = 'ETC'" />
                                            </b-form-radio>
                                        </b-form-group>
                                    </div>

                                    <PayPlan v-model="order.extra" />
                                </div>
                            </transition>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3">에스크로</b-col>
                        <b-col>
                            <b-form-radio v-model="order.od_pay_method" value="E">
                                <img src="/img/order/card.png" />
                                <p>결제대금예치</p>
                            </b-form-radio>
                        </b-col>
                    </b-row>
                    <!-- <b-form-radio v-model="order.od_pay_method" name="some-radios" value="B">계좌이체</b-form-radio>
                    <b-form-radio v-model="order.od_pay_method" name="some-radios" value="P">PSYS</b-form-radio>
                    <b-form-radio v-model="order.od_pay_method" name="some-radios" value="S">전표</b-form-radio> -->

                </b-form-group>
            </b-col>
            <b-col cols="4" class="payment_info">
                <h5>결제 금액</h5>
                <dl class="row p-4">
                    <dt class="col-5 bg-warning">상품금액</dt>
                    <dd class="col-7 bg-warning">{{order.price.goods_add_vat | comma}} 원</dd>

                    <dt class="col-5 bg-warning">운송비</dt>
                    <dd class="col-7 bg-warning">{{order.price.dlvy_add_vat | comma}} 원</dd>

                    <template v-if="order.price.air_add_vat">
                        <dt class="col-5 bg-warning">항공운임료</dt>
                        <dd class="col-7 bg-warning">{{order.price.air_add_vat | comma}} 원</dd>
                    </template>

                    <dt class="col-5 bg-warning">최종결제금액</dt>
                    <dd class="col-7 bg-warning">{{order.price.total| comma}} 원</dd>
                </dl>
                <transition name="slideUpDown">
                    <div v-if="order.od_pay_method == 'B' || order.od_pay_method == 'E'" class="payment_option">
                        <h5>지출 증빙</h5>

                        <TaxInvoice ref="tax_invoice" v-model="order.extra" />

                    </div>
                </transition>
                <b-button block variant="primary" size="lg" @click="exePayment">결제하기</b-button>
            </b-col>
        </b-row>



        <br><br><br>
        <h4>거래시 필요한 서류 요청</h4>
        <hr />
        <b-row class="mt-3 req_doc">
            <b-col>
                <b-form-group>
                    <template #label>
                        <b-form-checkbox size="lg" v-model="req_doc_opt.allSelected" :indeterminate="req_doc_opt.indeterminate" @change="toggleAll" >
                            모두 {{ req_doc_opt.allSelected ? '해제' : '선택' }}
                        </b-form-checkbox>
                    </template>

                    <div class="custom-control custom-control-inline custom-checkbox">
                        <b-form-checkbox size="lg" v-model="req_doc_opt.opt.est" value='Y' unchecked-value="N">견적서</b-form-checkbox>
                    </div>
                    <div class="custom-control custom-control-inline custom-checkbox">
                        <b-form-checkbox size="lg" v-model="req_doc_opt.opt.tran" value='Y' unchecked-value="N">거래명세서</b-form-checkbox>
                    </div>
                    <div class="custom-control custom-control-inline custom-checkbox">
                        <b-form-checkbox size="lg" v-model="req_doc_opt.opt.biz" value='Y' unchecked-value="N">사업자 등록증 사본</b-form-checkbox>
                    </div>
                    <div class="custom-control custom-control-inline custom-checkbox">
                        <b-form-checkbox size="lg" v-model="req_doc_opt.opt.bank" value='Y' unchecked-value="N">통장 사본</b-form-checkbox>
                    </div>
                </b-form-group>
            </b-col>
        </b-row>




    </b-container>
</template>

<script>
import ax from '@/api/http';
import { VueDaumPostcode } from "vue-daum-postcode";
import router from '@/router';
import { validationChecker } from './_comp/FormValidation.js'
// https://github.com/wan2land/vue-daum-postcode/tree/0.x-vue2

////////////////////////////////////////////////////
// import "vue2-animate/src/sass/vue2-animate.scss";
// <transition   name="flip" enter-active-class="flipInX" leave-active-class="flipOutX">
//     <p v-if="order.od_pay_method == 'B'">hello</p>
// </transition>
export default {
    // props:['gd_id', 'model', 'option'],
    components: {
        VueDaumPostcode,
        'PayPlan': () => import('./_comp/PayPlan.vue'),
        'TaxInvoice': () => import('./_comp/TaxInvoice.vue'),
    },
    watch: {
        'req_doc_opt.opt': {
            handler(val, oldVal) {
                if(val.est == 'N' && val.tran == 'N' && val.biz == 'N' && val.bank == 'N') {
                    this.req_doc_opt.indeterminate = false
                    this.req_doc_opt.allSelected = false
                } else if (val.est == 'Y' && val.tran == 'Y' && val.biz == 'Y' && val.bank == 'Y') {
                    this.req_doc_opt.indeterminate = false
                    this.req_doc_opt.allSelected = true
                } else {
                    this.req_doc_opt.indeterminate = true
                    this.req_doc_opt.allSelected = false
                }

                this.$set(this.order.extra, 'od_req_est', val.est);
                this.$set(this.order.extra, 'od_req_tran', val.tran);
                this.$set(this.order.extra, 'od_req_biz', val.biz);
                this.$set(this.order.extra, 'od_req_bank', val.bank);
            },
            deep: true
        },
        'order.od_pay_method': {
            handler(n, o) {
                switch (n) {
                    case 'B': this.order.extra.oex_finance_type = 'K'; break;
                    case 'S': this.order.extra.oex_finance_type = 'SH'; break;
                    default: this.order.extra.oex_finance_type = '';
                }

                if (n=='C' || n=='P' || n=='S') {
                    this.order.extra.oex_type = 'NO';
                }
            },
            deep: true
        },
    },
    data() {
        return {
            postcode_open: false,
            lists:{},
            order:{
                goods: this.$route.params.od_goods,
                price:{},
                od_no: "",
                od_name: "",
                od_type: this.$route.params.od_type,
                od_pay_method:'B',
                od_orderer : "김진국",
                od_orderer_hp : "010-2636-3140",
                od_orderer_email : "kjk@4science.net1",
                od_zip : "16884",
                od_addr1 : "경기 용인시 처인구 모현읍 능곡로 16-7(n-클래식)",
                od_addr2 : "F동 302호",
                od_receiver : "김진국",
                od_receiver_hp : "010-2636-3140",
                od_memo : "주문주문하지마~!",
                od_req_est: 'N',
                od_req_tran: 'N',
                od_req_biz: 'N',
                od_req_bank: 'N',

                extra: {
                    oex_hasBizLicense: true,
                    oex_file:null,
                    oex_depositor: '야야야',
                    oex_email:'kjadf@4scadsf.net',
                    oex_mng:'박혁거세',
                    oex_num_tel: '564-6544-6544',

                    oex_pay_plan: 'soon',
                    oex_finance_type: 'K',
                    oex_finance_type_etc: '',
                    oex_type: 'NO',
                },
                tCode:'',
            },
            req_doc_opt: {
                opt: {
                    est: 'N', tran: 'N', biz: 'N', bank: 'N',
                },
                allSelected: false,
                indeterminate: false
            },
        }
    },
    computed: {
        validationCounter () {
            let cnt = 0;
            let max = 8;
            if (isEmpty(this.order.od_orderer)) cnt++;
            if (isEmpty(this.order.od_orderer_hp)) cnt++;
            if (isEmpty(this.order.od_orderer_email)) cnt++;
            if (isEmpty(this.order.od_zip)) cnt++;
            if (isEmpty(this.order.od_addr1)) cnt++;
            if (isEmpty(this.order.od_addr2)) cnt++;
            if (isEmpty(this.order.od_receiver)) cnt++;
            if (isEmpty(this.order.od_receiver_hp)) cnt++;
            return {max:max, cur:max-cnt};
        },
    },
    methods:{
        async settle(){
            try {
                const res = await ax.post('/api/shop/order/settle', {type:this.order.od_type, goods:this.order.goods});
                if (res && res.status === 200) {
                    this.lists = res.data.lists;
                    this.order.price = res.data.price;
                    this.order.od_no = res.data.od_no;
                    this.order.od_name = res.data.od_name;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        funNumCheck(val) {
            return numCheck(val);
        },
        funIsEmpty(val) {
            return isEmpty(val);
        },
        onPostcodeSlt(result) {
            this.$set(this.order, 'od_zip', result.zonecode);
            this.$set(this.order, 'od_addr1', result.roadAddress + "("+ result.buildingName +")");
            this.postcode_open = false;
        },
        async exePayment () {
            if (validationChecker(this.order)) {
                try {
                    let pay = await ax.post(`/api/shop/order/pay`, this.order);
                    if (pay && pay.status === 200) {
                        if (this.order.extra.oex_hasBizLicense && !isEmpty(this.order.extra.oex_file)) {
                            let frm = new FormData();
                            frm.append('fi_group', 'order');
                            frm.append('fi_key', pay.data.od_id);
                            frm.append('fi_room', new Date().getFullYear());
                            frm.append("file[]", this.order.extra.oex_file);
                            let up = await ax.post('/api/upload', frm);
                        }
                        await router.push({ name: 'order_done', params: { od_id: pay.data.od_id }})
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.responsee);
                }
            }
        },

        toggleAll(checked) {
            if (checked) {
                this.$set(this.req_doc_opt.opt, 'est', 'Y');
                this.$set(this.req_doc_opt.opt, 'tran', 'Y');
                this.$set(this.req_doc_opt.opt, 'biz', 'Y');
                this.$set(this.req_doc_opt.opt, 'bank', 'Y');
            } else {
                this.$set(this.req_doc_opt.opt, 'est', 'N');
                this.$set(this.req_doc_opt.opt, 'tran', 'N');
                this.$set(this.req_doc_opt.opt, 'biz', 'N');
                this.$set(this.req_doc_opt.opt, 'bank', 'N');
            }
        },
    },
    created(){
        var tCode = new Date().format("yyMMddHHmm");
        if (this.$route.params.od_goods) {
            this.order.goods = this.$route.params.od_goods;
            this.order.od_type = this.$route.params.od_type;
            this.order.tCode = tCode;

            sessionStorage.setItem('goods', JSON.stringify(this.order.goods));
            sessionStorage.setItem('od_type', this.order.od_type);
            sessionStorage.setItem('od_time', tCode);
        } else if ( sessionStorage.getItem('od_time') ) {
            if (tCode - sessionStorage.getItem('od_time') <= 20) {
                this.order.goods = JSON.parse(sessionStorage.getItem('goods'));
                this.order.od_type = sessionStorage.getItem('od_type');
                this.order.tCode = tCode;
            } else {
                //  주문 정보를 가져온후 일정 시간이 경과하면
                Notify.toast('danger', "오랜시간 주문이 이루어 지지 않았습니다.");
                this.$router.go(-1);
                return false;
            }
        } else {
            Notify.toast('danger', "잘못된 접근 경로입니다.");
            this.$router.go(-1);
            return false;
        }
        this.settle();
    },
    mounted() {
        // console.log(this.$session.get('order'));
        // this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
        //     console.log('collapseId:', collapseId)
        //     console.log('isJustShown:', isJustShown)
        // })
    },
}
</script>

<style lang="css" scoped>
#pay .card .card-body .row div img { width:119px; height:119px; object-fit:cover; }
#pay .shipping_info .awesome_placeholder { font-size:1rem; }
#pay .shipping_info .awesome_placeholder+label>span { font-size:1rem; top:-30px; }
#pay .shipping_info .awesome_placeholder:focus,
#pay .shipping_info .awesome_placeholder:valid { padding-top:5px; }
#pay .shipping_info .awesome_placeholder:focus + label > span,
#pay .shipping_info .awesome_placeholder:valid + label > span { top:-50px; font-size:0.8rem; }

#pay .payment_method { /*height:410px;*/ }
#pay .payment_method .row { margin-top:30px; }
#pay .payment_method .custom-control label img { width:60px; height:60px; object-fit:cover; display:inline-block; position:absolute;  top:-20px; }
#pay .payment_method .custom-control label p { background-color:#e8e8e8; padding:0.3rem 0.7rem; border-radius:5px; display:inline-block; margin-left:100px; position: relative; top:-5px; }
#pay .payment_method .custom-control label p:before { content:''; position:absolute; left:-16px; top:8px; width:0; height:0; border:8px solid transparent; border-right-color:#e8e8e8; }
#pay .payment_method .form-group .row .col .payment_option { overflow:hidden; }
#pay .payment_method .form-group .row .col .slideUpDown-enter-to,
#pay .payment_method .form-group .row .col .slideUpDown-leave { max-height:400px; }
#pay .payment_method .form-group .row .col .slideUpDown-enter-active,
#pay .payment_method .form-group .row .col .slideUpDown-leave-active { transition:max-height 0.3s ease-out; }
#pay .payment_method .form-group .row .col .slideUpDown-enter,
#pay .payment_method .form-group .row .col .slideUpDown-leave-to { max-height:0px; }
#pay .payment_method .form-group .row .col .payment_option .card_name .custom-control input[type="text"] { padding:1px 10px; border:1px solid #ddd; }
#pay .payment_method .form-group .row .col .payment_option .card_name .custom-control input[type="text"] { padding:1px 10px; border:1px solid #ddd; }

/*#pay .payment_method .form-group .row .col .payment_option { overflow:hidden; max-height:0; transition: all .5s ease-out; }
#pay .payment_method .form-group .row .col .payment_option.focus { max-height:200px; }*/
#pay .payment_info { /*height:410px;*/ }
#pay .payment_info dl dd { text-align:right; }
#pay .payment_info button { /*height:284px;*/ }






.awesome_placeholder,
.awesome_placeholder + label,
.awesome_placeholder + label span { display: block; margin: 10px; padding: 5px; border:none; font-size: 1rem; }
.awesome_placeholder { font-size:48px; margin:0; width:80%; background: rgba(0, 0, 0, 0); transition: padding-top 0.2s ease, margin-top 0.2s ease; overflow-x: hidden; }
.awesome_placeholder:focus { outline: 0; }
.awesome_placeholder + label { display:block; position:relative; white-space:nowrap; padding:0; margin:0; width:10%; height:0px; border-top:1px solid red; transition:width 0.4s ease; }
.awesome_placeholder:focus + label { width:80%; }
.awesome_placeholder:focus,
.awesome_placeholder:valid { padding-top:35px; }
.awesome_placeholder:focus + label > span,
.awesome_placeholder:valid + label > span { top:-100px; font-size:1rem; color:#333; }
.awesome_placeholder:valid + label { border-color: green; }
.awesome_placeholder:invalid { box-shadow: none; }
.awesome_placeholder + label > span { margin:0; position:absolute; color:#8F8F8F; font-size:1.7rem; font-weight:bold; top:-66px; left:0px; z-index:-1; transition:top 0.2s ease, font-size 0.2s ease, color 0.2s ease; }
.awesome_placeholder:valid + label > span { color:#17a2b8; font-weight:normal; }




#pay >>> .req_doc .col .form-group .custom-control-inline { margin-right:3rem; }
#pay >>> .custom-control-input:checked ~ .custom-control-label::before,
#pay >>> .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before { color: #fff; border-color:#17a2b8; background-color:#17a2b8; }


</style>



<!-- <h1>Nice input box</h1>
<form>
  <input type="text" name="name" class="question" id="nme" required autocomplete="off" />
  <label for="nme"><span>What's your name?</span></label>
  <textarea name="message" rows="2" class="'question'" id="msg" required autocomplete="off"></textarea>
  <label for="msg"><span>What's your message?</span></label>
  <input type="submit" value="Submit!" />
</form>

/*
Basic input element using psuedo classes
*/

html {
  font-family: 'Lora', sans-serif;
  width: 100%;
}

body {
  margin: 5% auto 0 auto;
  width: 90%;
  max-width: 1125px;
}

h1 {
  font-size: 28px;
  margin-bottom: 2.5%;
}

input,
span,
label,
textarea {
  font-family: 'Ubuntu', sans-serif;
  display: block;
  margin: 10px;
  padding: 5px;
  border: none;
  font-size: 22px;
}

textarea:focus,
input:focus {
  outline: 0;
}
/* Question */

input.question,
textarea.question {
  font-size: 48px;
  font-weight: 300;
  border-radius: 2px;
  margin: 0;
  border: none;
  width: 80%;
  background: rgba(0, 0, 0, 0);
  transition: padding-top 0.2s ease, margin-top 0.2s ease;
  overflow-x: hidden; /* Hack to make "rows" attribute apply in Firefox. */
}
/* Underline and Placeholder */

input.question + label,
textarea.question + label {
  display: block;
  position: relative;
  white-space: nowrap;
  padding: 0;
  margin: 0;
  width: 10%;
  border-top: 1px solid red;
  -webkit-transition: width 0.4s ease;
  transition: width 0.4s ease;
  height: 0px;
}

input.question:focus + label,
textarea.question:focus + label {
  width: 80%;
}

input.question:focus,
input.question:valid {
  padding-top: 35px;
}

textarea.question:valid,
textarea.question:focus {
  margin-top: 35px;
}

input.question:focus + label > span,
input.question:valid + label > span {
  top: -100px;
  font-size: 22px;
  color: #333;
}

textarea.question:focus + label > span,
textarea.question:valid + label > span {
  top: -150px;
  font-size: 22px;
  color: #333;
}

input.question:valid + label,
textarea.question:valid + label {
  border-color: green;
}

input.question:invalid,
textarea.question:invalid {
  box-shadow: none;
}

input.question + label > span,
textarea.question + label > span {
  font-weight: 300;
  margin: 0;
  position: absolute;
  color: #8F8F8F;
  font-size: 48px;
  top: -66px;
  left: 0px;
  z-index: -1;
  -webkit-transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
}

input[type="submit"] {
  -webkit-transition: opacity 0.2s ease, background 0.2s ease;
  transition: opacity 0.2s ease, background 0.2s ease;
  display: block;
  opacity: 0;
  margin: 10px 0 0 0;
  padding: 10px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background: #EEE;
}

input[type="submit"]:active {
  background: #999;
}

input.question:valid ~ input[type="submit"], textarea.question:valid ~ input[type="submit"] {
  -webkit-animation: appear 1s forwards;
  animation: appear 1s forwards;
}

input.question:invalid ~ input[type="submit"], textarea.question:invalid ~ input[type="submit"] {
  display: none;
}

@-webkit-keyframes appear {
  100% {
    opacity: 1;
  }
}

@keyframes appear {
  100% {
    opacity: 1;
  }
} -->
