<template>
<div id="settle">

    <h2>결제하기</h2>

    <h4>01. 주문 상품 확인</h4>

    <PaList v-model="order.lists" :price="order.price" />
    
    <b-container class="st_bottom">
        <b-row>
            <b-col class="inputs">
                <b-row class="agreement">
                    <b-col>
                        <div class="head">
                            <span>개인정보 수집 및 이용 동의 <span v-b-toggle.privacy>[자세히 보기]</span></span>
                            <b-form-radio v-model="order.privacy" value="Y">동의함</b-form-radio>
                            <b-form-radio v-model="order.privacy" value="N">동의하지 않음</b-form-radio>
                        </div>
                        
                        <b-collapse id="privacy">
                            <b-card>
                                <p>회사는 이용자에 대하여 보다 더 질 높은 서비스 제공등을 위해 아래와 같이 이용자의 개인정보를 제공하고 있습니다.</p>
                                <p>제공대상: 포사이언스</p>
                                <p>
                                    제공정보의 이용 목적: 콘텐츠 제공, 물품배송 또는 청구지 등으로의 발송, 회원제 서비스 이용에 따른 본인확인, 
                                    인식별, 불량회원의 부정이용방지와 비인가 사용방지, 불만처리 등 민원처리, 공지사항 전달, 신규 서비스(제품) 개발 및 특화, 
                                    이벤트 등 광고성 정보전달, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계제공하는 개인정보 항목: 이름, 주민번호, 
                                    로그인ID, 비밀번호, 자택 전화번호, 주소, 휴대전화번호, 이메일주소, 접속 로그, 쿠키, 접속 IP정보, 그외 선택항목제공 정보의 
                                    보유 및 이용기간: 3개월
                                </p>

                                <p>다만, 아래의 경우에는 예외로 합니다.</p>
                                <p>- 이용자들이 사전에 동의한 경우</p>
                                <p>- 법령의 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는경우</p>
                            </b-card>
                        </b-collapse>
                    </b-col>
                    <b-col v-if="isDlvyAir">
                        <div class="head">
                            <span>단순 제품 교환 및 반품 불가 안내 <span v-b-toggle.dlvy_air>[자세히 보기]</span></span>
                            <b-form-radio v-model="order.dlvy_air" value="Y">동의함</b-form-radio>
                            <b-form-radio v-model="order.dlvy_air" value="N">동의하지 않음</b-form-radio>
                        </div>
                        
                        <b-collapse id="dlvy_air">
                            <b-card>해외수입상품은 주문 후에는 단순 제품 교환 및 반품이 안되오니 제품사양 확인 부탁드립니다.</b-card>
                        </b-collapse>
                    </b-col>
                    <b-col v-else>
                        <div class="head">
                            <span>구매자 및 사용자 확인사항 <span v-b-toggle.check_terms>[자세히 보기]</span></span>
                            <b-form-radio v-model="order.check_terms" value="Y">동의함</b-form-radio>
                            <b-form-radio v-model="order.check_terms" value="N">동의하지 않음</b-form-radio>
                        </div>
                        
                        <b-collapse id="check_terms">
                            <b-card>
                                구매자 및 사용자는 ㈜아이넥서스의 이용약관 및 전자상거래 약관을 확인하였으며 이에 동의합니다. 수입제품의 경우 반품이 불가할 수 있으며, 시약의 경우 연구의 목적으로만 사용이 가능함을 확인합니다.
                                이를 어길 경우에 발생하는 모든 책임은 구매자 및 사용자에 있음을 확인합니다.
                            </b-card>
                        </b-collapse>
                    </b-col>
                </b-row>

                <div class="orderer">
                    <h4>02. 주문자 정보</h4>
                    <b-row>
                        <label for="od_orderer">주문자명<i class="require" /></label>
                        <b-col><b-form-input v-model="order.od_orderer" ref="od_orderer" id="od_orderer" /></b-col>
                    </b-row>
                    <b-row>
                        <label for="od_orderer_hp">연락처<i class="require" /></label>
                        <b-col>
                            <b-form-input v-model="order.od_orderer_hp1" ref="od_orderer_hp1" @input.native="focusNext($event, 3, 'od_orderer_hp2')" :formatter="maxlength_3" id="od_orderer_hp" /><b-icon-dash />
                            <b-form-input v-model="order.od_orderer_hp2" ref="od_orderer_hp2" @input.native="focusNext($event, 4, 'od_orderer_hp3')" :formatter="maxlength_4" /><b-icon-dash />
                            <b-form-input v-model="order.od_orderer_hp3" ref="od_orderer_hp3" @input.native="focusNext($event, 4, 'od_orderer_email_id')" :formatter="maxlength_4" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <label for="od_orderer_email">이메일<i class="require" /></label>
                        <b-col>
                            <b-form-input v-model="order.od_orderer_email_id" id="od_orderer_email" ref="od_orderer_email_id" /><b-icon-at />
                            <b-form-input v-model="order.od_orderer_email_domain" />
                            <b-form-select v-model="order.od_orderer_email_domain_slt" @change="email_domain_slt">
                                <b-form-select-option value="">직접입력</b-form-select-option>
                                <b-form-select-option v-for="(dm, i) in config.email_domain" :key="i" :value="i">{{dm}}</b-form-select-option>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row>
                        <label for="od_department">소속</label>
                        <b-col><b-form-input v-model="order.od_department" id="od_department" /></b-col>
                    </b-row>
                </div>

                <div id="address" class="address">
                    <h4>
                        <span>03. 배송지 정보</span>
                        <div>
                            <b-form-radio v-model="order.addr_type" value="D" @change="change_addr_type">기본 배송지</b-form-radio>
                            <b-form-radio v-model="order.addr_type" value="N" @change="change_addr_type">신규 배송지</b-form-radio>
                            <b-button variant="light" @click="config_addr">배송지 관리</b-button>
                        </div>
                    </h4>
                    <b-row>
                        <label for="od_orderer">배송지명</label>
                        <b-col>{{order.od_ua_title}}</b-col>
                    </b-row>
                    <b-row>
                        <label for="od_receiver">수령인<i class="require" /></label>
                        <b-col>
                            <b-form-input v-model="order.od_receiver" ref="od_receiver" id="od_receiver" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <label for="od_receiver_hp">연락처<i class="require" /></label>
                        <b-col>
                            <b-form-input v-model="order.od_receiver_hp1" ref="od_receiver_hp1" @input.native="focusNext($event, 3, 'od_receiver_hp2')" :formatter="maxlength_3" id="od_receiver_hp" /><b-icon-dash />
                            <b-form-input v-model="order.od_receiver_hp2" ref="od_receiver_hp2" @input.native="focusNext($event, 4, 'od_receiver_hp3')" :formatter="maxlength_4" /><b-icon-dash />
                            <b-form-input v-model="order.od_receiver_hp3" ref="od_receiver_hp3" @input.native="focusNext($event, 4, 'btn_postcode')" :formatter="maxlength_4" />
                        </b-col>
                    </b-row>                        
                    <b-row>
                        <label for="od_department">주소<i class="require" /></label>
                        <b-col>
                            <div>
                                <b-form-input v-model="order.od_zip" readonly />
                                <span class="btn" @click="postcode_open = !postcode_open" ref="btn_postcode">
                                    <template v-if="postcode_open"><b-icon-x-square-fill /></template>
                                    <template v-else>우편번호 찾기</template>
                                </span>

                                <template v-if="postcode_open">
                                    <VueDaumPostcode class="sch_zip shadow" @complete="onPostcodeSlt" :animation="true" >
                                        <template #loading>
                                            <b-spinner variant="success" label="Spinning" />
                                        </template>
                                    </VueDaumPostcode>
                                </template>
                            </div>
                            <b-form-input v-model="order.od_addr1" readonly />
                            <b-form-input v-model="order.od_addr2" ref="od_addr2" />
                        </b-col>
                    </b-row>
                    
                    <b-row>
                        <label for="od_memo">배송 요청사항</label>
                        <b-col>
                            <b-form-select v-model="order.od_memo_slt" @change="memo_slt">
                                <b-form-select-option value="">선택</b-form-select-option>
                                <b-form-select-option v-for="(msg, i) in config.dlvy_msg" :key="i" :value="i">{{msg}}</b-form-select-option>
                            </b-form-select>
                            <b-form-input v-model="order.od_memo" id="od_memo" />
                        </b-col>
                    </b-row>
                </div>
                <b-button  variant="primary" size="lg" @click="exePayment">주문하기</b-button>
            </b-col>

            <b-col id="payment" class="payment">
                <b-row class="top">
                    <b-col>최종 결제 금액</b-col>
                    <b-col>
                        <b>{{order.price.total | comma}}</b> 원
                        <span>부가세 포함</span>
                    </b-col>
                </b-row>
                <div class="body">
                    <h5>결제 수단</h5>
                    <div class="method">
                        <div v-for="(v, k) in config.pay_method" :key="k">
                            <b-form-radio v-model="order.od_pay_method" :value="k">{{v}}</b-form-radio>
                            <span v-if="k=='C'">이니시스 온라인 신용카드 결제<b>[자세히]<img :src="s3url+'order/pay_card.png'" /></b></span>
                            <span v-else-if="k=='B'">무통장입금, 온라인계좌이체<b>[자세히]<img :src="s3url+'order/pay_card.png'" /></b></span>
                            <span v-else-if="k=='P'">원격지 연구비 직접결제<b>[자세히]<img :src="s3url+'order/pay_card.png'" /></b></span>
                            <span v-else-if="k=='R'">이니시스 온라인 신용카드 결제<b>[자세히]<img :src="s3url+'order/pay_card.png'" /></b></span>
                            <span v-else-if="k=='E'">결제대금예치<b>[자세히]<img :src="s3url+'order/pay_card.png'" /></b></span>
                        </div> 
                    </div>

                    <transition name="slideUpDown">
                        <div v-if="order.od_pay_method == 'B'" class="pay_info">
                            <h6>무통장 입금</h6>
                            <b-row>
                                <b-col cols="3">결제금액</b-col>
                                <b-col><b class="point">{{order.price.total| comma}}</b> 원</b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">은행선택</b-col>
                                <b-col>
                                    <b-form-radio v-model="order.extra.oex_bank" value="K">
                                        국민은행 010-01-0944-960
                                    </b-form-radio>
                                    <b-form-radio v-model="order.extra.oex_bank" value="W">
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
                                <b-col><b-form-input v-model="order.extra.oex_depositor" ref="oex_depositor" placeholder="입금자" size="sm" /></b-col>
                            </b-row>
                        </div>
                        
                        <div v-if="order.od_pay_method == 'P'" class="pay_info">
                            <h6>PSYS 결제</h6>
                            <b-row>
                                <b-col cols="3">결제금액</b-col>
                                <b-col><b class="point">{{order.price.total| comma}}</b> 원</b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">결제자</b-col>
                                <b-col><b-form-input v-model="order.extra.oex_depositor" ref="oex_depositor" placeholder="결제자" size="sm" /></b-col>
                            </b-row>
                        </div>
                        
                        <div v-if="order.od_pay_method == 'R'" class="pay_info">
                            <h6>원격 결제</h6>
                            <p>(학교, 국가기관, 연구소만 해당/<span>업체 및 개인은 선결제로 선택</span>)</p>
                            <b-row>
                                <b-col cols="3">결제 요청일</b-col>
                                <b-col>
                                    <b-form-radio v-model="order.extra.oex_pay_plan" value="soon" class="m-0">주문시 결제</b-form-radio>
                                    <b-form-radio v-model="order.extra.oex_pay_plan" value="dlvy">납품시 결제</b-form-radio>
                                    <b-form-radio v-model="order.extra.oex_pay_plan" value="etc">기타</b-form-radio>
                                    <transition name="slideUpDown">
                                        <b-form-input v-if="order.extra.oex_pay_plan == 'etc'" v-model="order.extra.oex_pay_plan_etc" placeholder="30자 이내 작성" size="sm" />
                                    </transition>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">담당자</b-col>
                                <b-col>
                                    <b-form-input v-model="order.extra.oex_mng" size="sm" />
                                </b-col>
                            </b-row>
                            <b-row class="pay_r_tel">
                                <b-col cols="3">연락처</b-col>
                                <b-col>
                                    <b-form-input v-model="order.extra.oex_num_tel1" ref="oex_num_tel1" @input.native="focusNext($event, 3, 'oex_num_tel2')" :formatter="maxlength_3" size="sm" /><b-icon-dash />
                                    <b-form-input v-model="order.extra.oex_num_tel2" ref="oex_num_tel2" @input.native="focusNext($event, 4, 'oex_num_tel3')" :formatter="maxlength_4" size="sm" /><b-icon-dash />
                                    <b-form-input v-model="order.extra.oex_num_tel3" ref="oex_num_tel3" :formatter="maxlength_4" size="sm" />
                                </b-col>
                            </b-row>
                        </div>
                    </transition>

                    <PayPlan v-if="order.od_pay_method == 'B' || order.od_pay_method == 'P'" v-model="order.extra" />
                    
                    <transition name="slideUpDown">
                        <div v-if="order.od_pay_method == 'B' || order.od_pay_method == 'E'" class="tax_paper">
                            <h6>지출 증빙</h6>
                            <div>
                                <b-form-radio v-model="order.extra.oex_type" value="IV" @click.native="tax_invoice()">세금계산서</b-form-radio>
                                <b-form-radio v-model="order.extra.oex_type" value="HP" @click.native="tax_invoice()">현금영수증</b-form-radio>
                                <b-form-radio v-model="order.extra.oex_type" value="NO">미발급</b-form-radio>
                            </div>
                        </div>
                    </transition>
                    
                    <div class="order_paper">
                        <h6>첨부 서류</h6>
                        <div>
                            <b-form-checkbox v-model="order.extra.oex_req_est" value='Y' unchecked-value="N">견적서</b-form-checkbox>
                            <b-form-checkbox v-model="order.extra.oex_req_tran" value='Y' unchecked-value="N">거래명세서</b-form-checkbox>
                            <b-form-checkbox v-model="order.extra.oex_req_biz" value='Y' unchecked-value="N">사업자 등록증 사본</b-form-checkbox>
                            <b-form-checkbox v-model="order.extra.oex_req_bank" value='Y' unchecked-value="N">통장 사본</b-form-checkbox>
                        </div>
                        <b-form-textarea v-model="order.extra.oex_memo" size="sm" placeholder="추가 사항 메모" ></b-form-textarea>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>

    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500" :min_height="700" :padding="0">
            <template slot="header">
                <template v-if="['index', 'create', 'edit'].includes(modal_type)">배송지</template>
                <template v-else>지출 증빙</template>
            </template>
            <AddrIndex v-if="modal_type == 'index'" :address="addr" @choose="addr_choose" @create="addr_create" @edit="addr_edit" />
            <AddrCreate v-else-if="modal_type == 'create'" :address="addr" @index="addr_index" />
            <AddrEdit v-else-if="modal_type == 'edit'" :address="addr" :addr="addr[addr_edit_index]" @index="addr_index" />
            <TaxInvoice v-else-if="modal_type == 'tax'" ref="tax_invoice" v-model="order.extra" @close="modal_close" @focusNext="focusNext" @maxlength_3="maxlength_3" @maxlength_4="maxlength_4" />
        </Modal>
    </transition>

    <form v-if="inicis.sale_env == 'P'" id="SendPayForm" class="inicis_form" method="POST">      
        <b-form-input name="buyername" 	    :value="$store.state.auth.user.name" />
        <b-form-input name="buyertel" 	    :value="$store.state.auth.user.hp" />
        <b-form-input name="buyeremail" 	:value="$store.state.auth.user.email" />
        <b-form-input name="version" 	    value="1.0" />
        <b-form-input name="mid" 		    :value="inicis.mid" />
        <b-form-input name="goodname" 	    :value="order.od_name" />
        <b-form-input name="oid" 		    :value="order.od_no" />
        <b-form-input name="price" 		    :value="order.price.total" />
        <b-form-input name="currency" 	    value="WON" />
        <b-form-input name="timestamp" 	    :value="inicis.timestamp" />
        <b-form-input name="signature" 	    :value="inicis.sign" />
        <b-form-input name="returnUrl" 	    :value="inicis.returnUrl" />
        <b-form-input name="closeUrl" 	    :value="inicis.closeUrl" />
        <b-form-input name="mKey" 		    :value="inicis.mKey" />
        <b-form-input name="gopaymethod"    value="Card" />
        <b-form-input name="merchantData"   :value="order.od_id" />       
    </form>
    <form v-else-if="inicis.sale_env == 'M'" id="MobilePayForm" class="inicis_form" action="https://mobile.inicis.com/smart/payment/" method="post" accept-charset="EUC-KR">
        <b-form-input name="P_INI_PAYMENT"   value="CARD" />
        <b-form-input name="P_MID"           :value="inicis.mid" />
        <b-form-input name="P_OID"           :value="order.od_no" />
        <b-form-input name="P_GOODS"         :value="order.od_name" />
        <b-form-input name="P_AMT"           :value="order.price.total" />
        <b-form-input name="P_UNAME"         :value="$store.state.auth.user.name" />
        <b-form-input name="P_NEXT_URL"      :value="inicis.returnUrlMobaile" />
        <b-form-input name="P_CHARSET"       value="utf8" />
        <b-form-input name="P_NOTI"          :value="order.od_id" />
    </form>
</div>
</template>


<script>
import ax from '@/api/http';
import { VueDaumPostcode } from "vue-daum-postcode";
import router from '@/router';
// import { validationChecker } from './_comp/FormValidation.js'
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
        'Modal'         : () => import('@/views/_common/Modal.vue'),
        'PayPlan'       : () => import('./_comp/PayPlan'),
        'TaxInvoice'    : () => import('./_comp/TaxInvoice'),
        'PaList'        : () => import('@/views/web/_module/PaList'),
        'AddrIndex'     : () => import('@/views/web/_module/addr/Index'),
        'AddrCreate'    : () => import('@/views/web/_module/addr/Create'),
        'AddrEdit'      : () => import('@/views/web/_module/addr/Edit'),
    },
    watch: {
        'order.od_pay_method': {
            handler(n, o) {
                this.order.extra.oex_type = 'NO';
            },
            deep: true
        },
    },
    data() {
        return {
            isModalViewed: false,
            modal_type: 'index',
            postcode_open: false,
            order:{
                od_id:0,
                goods: this.$route.params.od_goods,
                lists:{},
                price:{},
                od_no: "",
                od_name: "",
                od_type: this.$route.params.od_type,
                od_pay_method:'',
                od_orderer : '',
                od_orderer_hp : "",
                od_orderer_hp1 : '',
                od_orderer_hp2 : '',
                od_orderer_hp3 : '',
                od_orderer_email : "",
                od_orderer_email_id: '',
                od_orderer_email_domain:'',
                od_orderer_email_domain_slt : '',
                od_department: '',
                od_ua_title: '',
                od_zip : "",
                od_addr1 : "",
                od_addr2 : "",
                od_receiver : "",
                od_receiver_hp : "",
                od_receiver_hp1 : '',
                od_receiver_hp2 : '',
                od_receiver_hp3 : '',
                od_memo : "",
                od_memo_slt : '',
                addr_type:'D',
                extra: {
                    oex_hasBizLicense: true,
                    oex_file:null,
                    oex_depositor: '',
                    oex_email:'',
                    oex_mng:'',
                    oex_num_tel: '',

                    oex_pay_plan: 'soon',
                    oex_pay_plan_etc: '',
                    oex_bank: 'K',
                    oex_type: 'NO',
                    
                    oex_req_est: 'N',
                    oex_req_tran: 'N',
                    oex_req_biz: 'N',
                    oex_req_bank: 'N',

                    oex_num:'',

                },
                tCode:'',
                privacy: 'Y',
                check_terms: 'Y',
                dlvy_air: 'N',
            },
            addr: [],
            addr_edit_index: 0,
            config: {},
            inicis: {},
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
        isDlvyAir () { return Object.values(this.order.lists).find(e => e[0].pa_type === 'AIR') !== undefined; },
    },
    methods:{
        onPostcodeSlt(result) {
            this.$set(this.order, 'od_zip', result.zonecode);
            let addr = result.roadAddress;
            addr += result.buildingName ? "("+ result.buildingName +")" : '';
            this.$set(this.order, 'od_addr1', addr);
            this.$refs.od_addr2.focus();
            document.getElementById('address').scrollIntoView();
            this.postcode_open = false;
        },
        async exePayment () {
            this.order.od_orderer_hp = `${this.order.od_orderer_hp1}-${this.order.od_orderer_hp2}-${this.order.od_orderer_hp3}`;
            this.order.od_receiver_hp = `${this.order.od_receiver_hp1}-${this.order.od_receiver_hp2}-${this.order.od_receiver_hp3}`;
            this.order.od_orderer_email = `${this.order.od_orderer_email_id}@${this.order.od_orderer_email_domain}`;
            if (this.validationChecker(this.order)) {
                
                switch (this.order.extra.oex_type) {
                    case 'HP': this.order.extra.oex_num = `${this.order.extra.oex_num_hp1}-${this.order.extra.oex_num_hp2}-${this.order.extra.oex_num_hp3}`; break;
                    case 'IN': this.order.extra.oex_num = `${this.order.extra.oex_num_in1}-${this.order.extra.oex_num_in2}`; break;
                    case 'CN': this.order.extra.oex_num = `${this.order.extra.oex_num_cn1}-${this.order.extra.oex_num_cn2}-${this.order.extra.oex_num_cn3}-${this.order.extra.oex_num_cn4}`; break;
                    case 'BN': this.order.extra.oex_num = `${this.order.extra.oex_num_bn1}-${this.order.extra.oex_num_bn2}-${this.order.extra.oex_num_bn3}`; break;
                }
                
                if (this.order.od_pay_method == 'R') {
                    this.order.extra.oex_num_tel = `${this.order.extra.oex_num_tel1}-${this.order.extra.oex_num_tel2}-${this.order.extra.oex_num_tel3}`;
                    if (this.order.extra.oex_pay_plan == "etc")
                        this.order.extra.oex_pay_plan = this.order.extra.oex_pay_plan_etc;
                }

               
                let pay = await ax.post(`/api/shop/order/pay`, this.order);
                if (pay && pay.status === 200) {
                    if (this.order.extra.oex_hasBizLicense && !isEmpty(this.order.extra.oex_file)) {
                        let frm = new FormData();
                        frm.append('fi_group', 'order');
                        frm.append('fi_key', pay.data.od_id);
                        frm.append('fi_room', new Date().getFullYear());
                        frm.append("file[]", this.order.extra.oex_file);
                        await ax.post('/api/upload', frm);
                    }

                    if (this.order.od_pay_method == 'C') {
                        this.order.od_id = pay.data.od_id;
                        if(this.inicis.sale_env == 'P1') 
                            INIStdPay.pay('SendPayForm');
                        else if(this.inicis.sale_env == 'P') {
                            var form = document.createElement('form'); // 폼객체 생성
                            var objs01 = document.createElement('input'); 
                            var objs02 = document.createElement('input'); 
                            var objs03 = document.createElement('input'); 
                            var objs04 = document.createElement('input'); 
                            var objs05 = document.createElement('input'); 
                            var objs06 = document.createElement('input'); 
                            var objs07 = document.createElement('input'); 
                            var objs08 = document.createElement('input'); 
                            var objs09 = document.createElement('input');
                            objs01.setAttribute('name', 'P_INI_PAYMENT'); objs01.setAttribute('value', 'CARD');                           form.appendChild(objs01);
                            objs02.setAttribute('name', 'P_MID');         objs02.setAttribute('value', this.inicis.mid);                  form.appendChild(objs02);
                            objs03.setAttribute('name', 'P_OID');         objs03.setAttribute('value', this.order.od_no);                 form.appendChild(objs03);
                            objs04.setAttribute('name', 'P_GOODS');       objs04.setAttribute('value', this.order.od_name);               form.appendChild(objs04);
                            objs05.setAttribute('name', 'P_AMT');         objs05.setAttribute('value', this.order.price.total);           form.appendChild(objs05);
                            objs06.setAttribute('name', 'P_UNAME');       objs06.setAttribute('value', this.$store.state.auth.user.name); form.appendChild(objs06);
                            objs07.setAttribute('name', 'P_NEXT_URL');    objs07.setAttribute('value', this.inicis.returnUrlMobaile);     form.appendChild(objs07);
                            objs08.setAttribute('name', 'P_CHARSET');     objs08.setAttribute('value', 'utf8');                           form.appendChild(objs08);
                            objs09.setAttribute('name', 'P_NOTI');        objs09.setAttribute('value', this.order.od_id);                 form.appendChild(objs09);                            
                            form.setAttribute('method', 'post'); //get,post 가능
                            form.setAttribute('action', "https://mobile.inicis.com/smart/payment/"); //보내는 url
                            document.body.appendChild(form);
                            form.submit();
                        }
                    } else {
                        await router.push({ name: 'order_done', params: { od_id: pay.data.od_id }});
                    }
                }
            }
        },

        email_domain_slt() {
            this.order.od_orderer_email_domain = this.config.email_domain[this.order.od_orderer_email_domain_slt];
        },
        memo_slt() {
            this.order.od_memo = this.config.dlvy_msg[this.order.od_memo_slt];
        },

        set_orderer () {
            let odhp = Auth.user().hp.split('-');
            let odemail = Auth.user().email.split('@');
            this.order.od_orderer = Auth.user().name;
            this.order.od_orderer_hp1 = odhp[0];
            this.order.od_orderer_hp2 = odhp[1];
            this.order.od_orderer_hp3 = odhp[2];
            this.order.od_orderer_email_id = odemail[0];
            this.order.od_orderer_email_domain = odemail[1];
            this.order.od_department = Auth.user().department;
            return;
        },

        addr_choose (addr) {
            let hp = addr.ua_hp.split('-');
            this.order.od_ua_title      = addr.ua_title;
            this.order.od_zip           = addr.ua_zip;
            this.order.od_addr1         = addr.ua_addr1;
            this.order.od_addr2         = addr.ua_addr2;
            this.order.od_receiver      = addr.ua_name;
            this.order.od_receiver_hp   = addr.ua_hp;
            this.order.od_receiver_hp1  = hp[0];
            this.order.od_receiver_hp2  = hp[1];
            this.order.od_receiver_hp3  = hp[2];
            this.order.od_memo          = addr.ua_memo;

            this.isModalViewed = false;
            return;
        },

        change_addr_type (v) {
            if (v == 'D')   this.addr_choose(this.addr[0]);
            else if (v == 'N') {
                this.order.od_ua_title      = '';
                this.order.od_zip           = '';
                this.order.od_addr1         = '';
                this.order.od_addr2         = '';
                this.order.od_receiver      = '';
                this.order.od_receiver_hp   = '';
                this.order.od_receiver_hp1  = '';
                this.order.od_receiver_hp2  = '';
                this.order.od_receiver_hp3  = '';
                this.order.od_memo          = '';
            }
        }, 

        config_addr () {
            this.isModalViewed = true;
            this.modal_type = 'index';
        },
        
        addr_create () { this.modal_type = 'create'; },
        addr_index () { this.modal_type = 'index'; },
        addr_store () { this.modal_type = 'index'; },
        addr_edit (i) { 
            this.modal_type = 'edit';
            this.addr_edit_index = i; 
        },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        maxlength_3(e){ return String(e).substring(0, 3); },
        maxlength_4(e){ return String(e).substring(0, 4); },

        tax_invoice () {
            this.isModalViewed = true;
            this.modal_type = 'tax';
        },

        modal_close () { this.isModalViewed = false; },

        validationChecker (frm) {
            if (this.order.privacy !== 'Y')     { 
                Notify.toast('danger', "개인정보 수집 및 이용에 동의 해주세요.");
                document.getElementById('total_sub').scrollIntoView();
                return false;
            }
            if (!this.isDlvyAir && this.order.check_terms !== 'Y')    { 
                Notify.toast('danger', "구매자 및 사용자 확인사항에 동의 해주세요.");
                document.getElementById('total_sub').scrollIntoView();
                return false;
            }
            if (this.isDlvyAir && this.order.dlvy_air !== 'Y') { 
                Notify.toast('danger', "단순 제품 교환 및 반품 불가에 동의 해주세요");
                document.getElementById('total_sub').scrollIntoView();
                return false;
            }
            if (this.order.od_pay_method == '') { 
                Notify.toast('danger', "결제 수단을 선택하세요.");
                document.getElementById('payment').scrollIntoView();
                return false;
            }
            switch (frm.od_pay_method) {
                case 'B':
                    if (isEmpty(frm.extra.oex_depositor)) { Notify.toast('danger', "입금자명을 입력해주세요"); this.$refs.oex_depositor.focus(); return false; }
                case 'E':
                    if ( frm.extra.oex_type == 'IV' ) {
                        if ( frm.extra.oex_hasBizLicense ) {
                            if (isEmpty(frm.extra.oex_file)) { Notify.toast('danger', "사업자 등록증 사본을 첨부해주세요"); this.$refs.tax_invoice.$refs.oex_file.$refs.input.focus(); return false; }
                        } else {
                            if (isEmpty(frm.extra.oex_biz_name)) { Notify.toast('danger', "법인명을 입력해주세요"); this.$refs.tax_invoice.$refs.oex_biz_name.focus(); return false; }
                            if (isEmpty(frm.extra.oex_biz_num)) { Notify.toast('danger', "사업자 등록번호를 입력해주세요"); this.$refs.tax_invoice.$refs.oex_biz_num.focus(); return false; }
                            if (isEmpty(frm.extra.oex_biz_type)) { Notify.toast('danger', "업태를 입력해주세요"); this.$refs.tax_invoice.$refs.oex_biz_type.focus(); return false; }
                            if (isEmpty(frm.extra.oex_biz_item)) { Notify.toast('danger', "종목를 입력해주세요"); this.$refs.tax_invoice.$refs.oex_biz_item.focus(); return false; }
                            if (isEmpty(frm.extra.oex_ceo)) { Notify.toast('danger', "대표자명을 입력해주세요"); this.$refs.tax_invoice.$refs.oex_ceo.focus(); return false; }
                            if (isEmpty(frm.extra.oex_addr)) { Notify.toast('danger', "사업장 소재지를 입력해주세요"); this.$refs.tax_invoice.$refs.oex_addr.focus(); return false; }
                        }
                        if (isEmpty(frm.extra.oex_mng)) { Notify.toast('danger', "담장자를 입력해주세요"); this.$refs.tax_invoice.$refs.oex_mng.focus(); return false; }
                        if (isEmpty(frm.extra.oex_email)) { Notify.toast('danger', "이메일을 입력해주세요"); this.$refs.tax_invoice.$refs.oex_email.focus(); return false; }
                        if (isEmpty(frm.extra.oex_num_tel)) { Notify.toast('danger', "핸드폰 번호를 입력해주세요"); this.$refs.tax_invoice.$refs.oex_num_tel.focus(); return false; }
                    }
                break;
            
                default: break;
            }

            if (isEmpty(frm.od_orderer)) { Notify.toast('danger', "주문자 이름을 입력하세요."); this.$refs.od_orderer.focus(); return false; }
            if (isEmpty(frm.od_orderer_hp1)) { Notify.toast('danger', "주문자 전화번호 1를 입력하세요."); this.$refs.od_orderer_hp1.focus(); return false; }
            if (isEmpty(frm.od_orderer_hp2)) { Notify.toast('danger', "주문자 전화번호 2를 입력하세요."); this.$refs.od_orderer_hp2.focus(); return false; }
            if (isEmpty(frm.od_orderer_hp3)) { Notify.toast('danger', "주문자 전화번호 3를 입력하세요."); this.$refs.od_orderer_hp3.focus(); return false; }
            if (isEmpty(frm.od_orderer_email_id)) { Notify.toast('danger', "주문자 이메일 ID을 입력하세요."); this.$refs.od_orderer_email_id.focus(); return false; }
            if (isEmpty(frm.od_orderer_email_domain)) { Notify.toast('danger', "주문자 이메일 도메인을 입력하세요."); this.$refs.od_orderer_email_domain.focus(); return false; }
            if (isEmpty(frm.od_receiver)) { Notify.toast('danger', "수령인을 입력하세요."); this.$refs.od_receiver.focus(); return false; }
            if (isEmpty(frm.od_receiver_hp1)) { Notify.toast('danger', "수령인 연락처 1를 입력하세요."); this.$refs.od_receiver_hp1.focus(); return false; }
            if (isEmpty(frm.od_receiver_hp2)) { Notify.toast('danger', "수령인 연락처 2를 입력하세요."); this.$refs.od_receiver_hp2.focus(); return false; }
            if (isEmpty(frm.od_receiver_hp3)) { Notify.toast('danger', "수령인 연락처 3를 입력하세요."); this.$refs.od_receiver_hp3.focus(); return false; }
            if (isEmpty(frm.od_zip)) { Notify.toast('danger', "배송지 우편번호를 입력하세요."); this.$refs.od_zip.focus(); return false; }
            if (isEmpty(frm.od_addr1)) { Notify.toast('danger', "배송지 주소를 입력하세요."); this.$refs.od_addr1.focus(); return false; }
            if (isEmpty(frm.od_addr2)) { Notify.toast('danger', "배송지 상세주소를 입력하세요."); this.$refs.od_addr2.focus(); return false; }
            return true;

        },

    },
    async created(){
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
        
        try {
            const res = await ax.post('/api/shop/order/settle', {type:this.order.od_type, goods:this.order.goods});
            if (res && res.status === 200) {
                this.order.lists = res.data.lists;
                this.order.price = res.data.price;
                this.order.od_no = res.data.od_no;
                this.order.od_name = res.data.od_name;
                this.config = res.data.config;
                this.addr = res.data.addr;
                this.inicis = res.data.inicis;
                this.set_orderer();
                this.addr_choose(this.addr[0]);
            }
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.responsee);
        }
    },
    mounted() {
        // console.log(this.$session.get('order'));
        // this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
        //     console.log('collapseId:', collapseId)
        //     console.log('isJustShown:', isJustShown)
        // })
        const plugin = document.createElement("script");
        plugin.setAttribute( "src", "https://stgstdpay.inicis.com/stdjs/INIStdPay.js" );    //  테스트1
        // plugin.setAttribute( "src", "https://stdpay.inicis.com/stdjs/INIStdPay.js" );   //  운영
        plugin.async = true;
        document.head.appendChild(plugin);
    },
}
</script>

<style lang="css" scoped>
#settle { margin-top:2rem; }
#settle h2 { font-weight:bold; font-size:1.8rem; padding-left:1.8rem; }
#settle h4 { margin:2.3rem 0 0; font-weight:600; font-size:1.3rem; border-bottom:2px solid #000; padding:.7em 1.8rem; }

#settle .st_bottom { padding:0; }
#settle .st_bottom .row { margin:0; }
#settle .st_bottom .row .col { padding:0; }

#settle .st_bottom .row .col.inputs { padding-right:.875rem; }
#settle .st_bottom .inputs .agreement { align-items:flex-start; }
#settle .st_bottom .inputs .agreement .col { padding:1.5rem; background:#4F708F; border-radius:.5rem; }
#settle .st_bottom .inputs .agreement .col:nth-of-type(1) { margin-right: 0.25rem; }
#settle .st_bottom .inputs .agreement .col:nth-of-type(2) { margin-left: 0.25rem; }
#settle .st_bottom .inputs .agreement .col .head { color:#FFF; font-size:.8rem; display:flex; justify-content:space-between; align-items:center; }
#settle .st_bottom .inputs .agreement .col .custom-radio { display:flex; align-items:center; }
#settle .st_bottom .inputs .agreement .col .custom-radio>>>label::before, 
#settle .st_bottom .inputs .agreement .col .custom-radio>>>label::after { top:.15rem; left:-1.4rem; }
#settle .st_bottom .inputs .agreement .col .collapse .card { text-align:justify; color:#000; margin-top:1rem; font-size:.8rem; }

#settle .st_bottom .inputs div h4 { margin-bottom:2.55rem; margin-top:3.5rem; }
#settle .st_bottom .inputs div .row { align-items:baseline; }
#settle .st_bottom .inputs div .row label { flex-basis:15.8%; max-width:15.8%; flex-grow:1; text-indent:56px; font-weight:bold; }
#settle .st_bottom .inputs div .row label i { display:inline-block; background:#FF0000; width:4px; height:4px; border-radius:4px; position:relative; top:-9px; right:-3px; } 
#settle .st_bottom .inputs div .row .col { display:flex; align-items:center; }
#settle .st_bottom .inputs div .row .col input,
#settle .st_bottom .inputs div .row .col select,
#settle .st_bottom .inputs div .row .col .btn { border-color:#CCC; border-radius:0; margin:.57rem 0; height:calc(1.5em + 0.75rem + 0px); color:#898989; }
#settle .st_bottom .inputs div .row .col svg { margin:0 .5rem; }

#settle .st_bottom .inputs .address h4 { display:flex; align-items:center; justify-content:space-between; }
#settle .st_bottom .inputs .address h4 div { display:flex; justify-content:flex-end; align-items:center; }
#settle .st_bottom .inputs .address h4 div>>>label { font-size:1rem; margin-right:1rem; }
#settle .st_bottom .inputs .address h4 div>>>label::before, 
#settle .st_bottom .inputs .address h4 div>>>label::after { top:.15rem; left:-1.2rem; }

#settle .st_bottom .inputs .orderer .row:nth-of-type(1) .col,
#settle .st_bottom .inputs .orderer .row:nth-of-type(4) .col,
#settle .st_bottom .inputs .address .row:nth-of-type(1) .col,
#settle .st_bottom .inputs .address .row:nth-of-type(2) .col { flex-basis:36%; max-width:36%; }

#settle .st_bottom .inputs .orderer .row:nth-of-type(2) .col input,
#settle .st_bottom .inputs .address .row:nth-of-type(3) .col input { max-width:122px; }
#settle .st_bottom .inputs .orderer .row:nth-of-type(3) .col input { max-width:180px; }
#settle .st_bottom .inputs .orderer .row:nth-of-type(3) .col select { max-width:122px; margin:0 .5rem; }

#settle .st_bottom .inputs .address .row:nth-of-type(4) .col { display:block; flex-basis:46%; max-width:46%; }
#settle .st_bottom .inputs .address .row:nth-of-type(4) .col div input { max-width:180px; display:inline-block; }
#settle .st_bottom .inputs .address .row:nth-of-type(4) .col div .btn { font-size:.9rem; height:36px; position:relative; top:-2px;}
#settle .st_bottom .inputs .address .row:nth-of-type(5) .col { display:block; flex-basis:53%; max-width:53%; }
#settle .st_bottom .inputs .address .row:nth-of-type(5) .col select { max-width:446px; }
#settle .st_bottom .inputs .address .sch_zip { margin-top:1rem; position:absolute; z-index:1; border:2px solid #000; }

#settle .st_bottom .inputs>button { background:#1A90D6; width:100%; font-size:1.6rem; font-weight:bold; padding:.8em 0; border-radius:.9rem; margin-top:2rem; }

#settle .st_bottom .row .col.payment { flex-basis:31%; max-width:31%; padding-left:.875rem; }
#settle .st_bottom .payment .top { background:#1A90D6; border-radius:2rem 2rem 0 0; padding:1.4rem 1.3rem; align-items:center; }
#settle .st_bottom .payment .top .col { font-weight:bold; color:#fff; }
#settle .st_bottom .payment .top .col b { font-size:2.1rem; }
#settle .st_bottom .payment .top .col span { font-size:.7rem; display:block; }
#settle .st_bottom .payment .top .col:nth-of-type(2) { text-align:right; }

#settle .st_bottom .payment .body { padding:1rem; border:2px solid #D7D7D7; border-radius:3px; }
#settle .st_bottom .payment .body h5 { font-size:1.1rem; font-weight:bold; margin-bottom:.6rem; padding-left:.5rem; }
#settle .st_bottom .payment .body>div { border-top:1px solid #d7d7d7; padding:.94rem 0; }
#settle .st_bottom .payment .body div>>>h6 { background:#626262; display:inline-block; padding:.5rem 1rem; border-radius:1.5rem; color:#FFF; font-size:.85rem; margin-bottom: 1rem; }
#settle .st_bottom .payment .body .method>div { margin:1rem 0; }
#settle .st_bottom .payment .body .method div .custom-radio { display:inline-block; width:28%; }
#settle .st_bottom .payment .body .method div .custom-radio>>>label { font-weight:bold; color:#616161; font-size:.95rem; cursor:pointer; }
#settle .st_bottom .payment .body .method div span { color:#ACACAC; font-size:.8rem; }
#settle .st_bottom .payment .body .method div span b { cursor:pointer; position:relative; }
#settle .st_bottom .payment .body .method div span img { display:none; position:absolute; top:0; right:0; z-index:2; border:2px solid #616161; border-radius:.5rem; }
#settle .st_bottom .payment .body .method div span b:hover img { display:block; }


#settle .st_bottom .payment .body .pay_info .row { margin:1rem 0; }
#settle .st_bottom .payment .body .pay_info .row:first-of-type { align-items: baseline; }
#settle .st_bottom .payment .body .pay_info .row div { font-weight:600; color:#616161; font-size:.85rem; }
#settle .st_bottom .payment .body .pay_info .row .point { color:#1A90DA; font-size:1.3rem; }
#settle .st_bottom .payment .body .pay_info .row .col .custom-radio:first-of-type { margin-bottom:.5rem; }
#settle .st_bottom .payment .body .pay_info p { font-size:.75rem; }
#settle .st_bottom .payment .body .pay_info p span { color:red; }
#settle .st_bottom .payment .body .pay_info .pay_r_tel .col { display:flex; justify-content:space-between; align-items:center; }
#settle .st_bottom .payment .body .pay_info .pay_r_tel .col  svg { margin:0 .5rem; }
#settle .st_bottom .payment .body .pay_info.slideUpDown-enter-to,
#settle .st_bottom .payment .body .pay_info.slideUpDown-leave { max-height:400px; }
#settle .st_bottom .payment .body .pay_info.slideUpDown-enter-active,
#settle .st_bottom .payment .body .pay_info.slideUpDown-leave-active { transition:max-height 0.3s ease-out; }
#settle .st_bottom .payment .body .pay_info.slideUpDown-enter,
#settle .st_bottom .payment .body .pay_info.slideUpDown-leave-to { max-height:0px; }

#settle .st_bottom .payment .body .order_paper>div { display:flex; justify-content:space-between; }
#settle .st_bottom .payment .body .order_paper div .custom-checkbox>>>label { color:#616161; font-size:.8rem; cursor:pointer; }
#settle .st_bottom .payment .body .order_paper div .custom-checkbox>>>label::before, 
#settle .st_bottom .payment .body .order_paper div .custom-checkbox>>>label::after { top:.15rem; left:-1.2rem; }

#settle .st_bottom .payment .body .tax_paper>div { display:flex; justify-content:space-between; }
#settle .st_bottom .payment .body .tax_paper div .custom-radio>>>label { color:#616161; font-size:.8rem; cursor:pointer; vertical-align: baseline; }
#settle .st_bottom .payment .body .tax_paper div .custom-radio>>>label::before, 
#settle .st_bottom .payment .body .tax_paper div .custom-radio>>>label::after { top:.15rem; left:-1.2rem; }

#settle >>> .custom-control-input:checked ~ .custom-control-label::before { color: #fff; border-color:#17a2b8; background-color:#17a2b8; }
#settle .inicis_form { width:0; height:0; visibility:hidden; overflow:hidden; }
</style>