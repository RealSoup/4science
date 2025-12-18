<template>
<div id="settle">
    <h2 class="layout">결제하기</h2>

    <div class="layout">

        <b-row class="settle_split">
            <b-col class="left">
                <div class="area_piece goods_list">
                    <h4>주문상품 {{goods_cnt}}개</h4>
                    <goods-list v-model="order.lists" :price="order.price" :user="user" :has_coupon="user_coupon.length>0"></goods-list>
                </div>

                <b-row v-if="user_coupon.length" class="area_piece user_coupon">
                    <b-col>쿠폰 할인</b-col>
                    <b-col @click="isCouponViewed=!isCouponViewed">
                        <template v-if="order.chosen_uc_id == 0">선택 안 함</template>
                        <template v-else>{{user_coupon.find((uc) => uc.uc_id == order.chosen_uc_id).cl_name}}</template>
                    </b-col>
                </b-row>
                
                <b-row class="area_piece agreement">
                    <b-col id="agrrement_01">
                        <div class="head">
                            <span>개인정보 수집 및 이용 동의 <span class="d-block" v-b-toggle.privacy>[자세히 보기]</span></span>
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
                    <b-col id="agrrement_02" v-if="isDlvyAir">
                        <div class="head">
                            <span>단순 제품 교환 및 반품 불가 안내 <span class="d-block" v-b-toggle.dlvy_air>[자세히 보기]</span></span>
                            <b-form-radio v-model="order.dlvy_air" value="Y">동의함</b-form-radio>
                            <b-form-radio v-model="order.dlvy_air" value="N">동의하지 않음</b-form-radio>
                        </div>
                        
                        <b-collapse id="dlvy_air">
                            <b-card>해외수입상품은 주문 후에는 단순 제품 교환 및 반품이 안되오니 제품사양 확인 부탁드립니다.</b-card>
                        </b-collapse>
                    </b-col>
                    <b-col id="agrrement_03" v-else>
                        <div class="head">
                            <span>구매자 및 사용자 확인사항 <span class="d-block" v-b-toggle.check_terms>[자세히 보기]</span></span>
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
                
                <div class="suggest">
                    <b-row class="area_piece" v-if="rec_goods_list_order.length">
                        <b-col><b>주문하셨던 제품 중 더 필요하신건 없으신가요?</b></b-col>
                        <b-col v-for="(gd, i) in rec_goods_list_order" :key="i">
                            <b-link :to="{name: 'goods_show', params:{gd_id:gd.gd_id} }">   
                                <div>
                                    <img :src="gd.image_src_thumb[0]" />
                                </div>
                                <p class="tit">{{gd.gd_name}}</p>
                            </b-link>
                        </b-col>
                    </b-row>

                    <b-row class="area_piece" v-if="rec_goods_list_estimate.length">
                        <b-col><b>혹시 이 제품 필요하지 않으신가요?</b></b-col>
                        <b-col v-for="(gd, i) in rec_goods_list_estimate" :key="i">
                            <b-link :to="{name: 'goods_show', params:{gd_id:gd.gd_id} }">   
                                <div>
                                    <img :src="gd.image_src_thumb[0]" />
                                </div>
                                <p class="tit">{{gd.gd_name}}</p>
                            </b-link>
                        </b-col>
                    </b-row>
                    
                    <b-row class="area_piece" v-if="!(rec_goods_list_order?.length) || !(rec_goods_list_estimate?.length)">
                        <b-col><b>이런 제품은 어떠세요?</b></b-col>
                        <b-col v-for="(gd, i) in rec_goods_list_top04" :key="i">
                            <b-link :to="{name: 'goods_show', params:{gd_id:gd.gd_id} }">   
                                <div>
                                    <img :src="gd.image_src_thumb[0]" />
                                </div>
                                <p class="tit">{{gd.gd_name}}</p>
                            </b-link>
                        </b-col>
                    </b-row>
                </div>
            </b-col>



            <b-col class="right">
                <div class="address area_piece" id="address_box">                    
                    <template v-if="this.addr.length">
                        <div class="addr_tit">
                            <b-icon-pin-map></b-icon-pin-map> {{order.od_ua_title}}
                            <b-button class="white sm" @click="config_addr" :class="{invalid_addr:addr_chk}">배송지 관리</b-button>
                        </div>
                        <div class="user">
                            <span v-if="!isEmpty(order.od_receiver)">{{order.od_receiver}}</span>
                            <i v-else class="empty">수령인 없음</i>
                            
                            <span v-if="!isEmpty(order.od_receiver_hp)">{{order.od_receiver_hp}}</span>
                            <i v-else class="empty">수령인 연락처 없음</i>
                        </div>
                        <div class="addr">
                            <i v-if="isEmpty(order.od_zip)" class="empty">우편번호 없음</i>
                            
                            <span v-if="!isEmpty(order.od_addr1)">{{order.od_addr1}}</span>
                            <i v-else class="empty">주소 없음</i>
                            
                            <span v-if="!isEmpty(order.od_addr2)">{{order.od_addr2}}</span>
                            <i v-else class="empty">상세주소 없음</i>
                        </div>
                        <b-form-select v-model="order.od_memo_slt" @change="memo_slt" size="sm">
                            <b-form-select-option value="">배송시 요청 사항</b-form-select-option>
                            <b-form-select-option v-for="(msg, i) in config.dlvy_msg" :key="i" :value="i">{{msg}}</b-form-select-option>
                        </b-form-select>
                        <b-form-input v-if="order.od_memo_slt == ''" v-model="order.od_memo" id="od_memo" size="sm"></b-form-input>
                    </template>
                    <b-button v-else class="white wd_100p add_addr" size="sm" ref="add_addr" @click="config_addr">배송지 입력 <small>등록된 배송지 없음</small></b-button>
                </div>
                
                <div class="pay_method area_piece">
                    <template v-if="order.od_pay_method !== 'BL'">
                        <h4>결제 수단</h4>
                        <div class="method">
                            <template v-for="(v, k) in config.pay_method">
                                <div v-if="!['CP', 'CK', 'BL'].includes(k)" :key="k">
                                    <b-form-radio v-model="order.od_pay_method" :value="k">
                                        <i v-html="$options.filters.pay_method_new_line(v)"></i>
                                    </b-form-radio>
                                    <span v-if="k=='C'">토스페이먼츠 온라인 신용카드 결제 <b>[자세히]<img :src="s3url+'order/pay_card.png'" /></b></span>
                                    <span v-else-if="k=='B'">무통장입금, 온라인계좌이체 <b>[자세히]<img :src="s3url+'order/pay_cache.png'" /></b></span>
                                    <span v-else-if="k=='L'">대학교, 국가연구소, 관공서를 위한 후불 입금(계좌이체) 방식입니다. <b>[자세히]<img :src="s3url+'order/pay_later.png'" /></b></span>
                                    <span v-else-if="k=='P'">PSYS 결체장이 열리며, 바로 결제가능합니다. 결제완료 시 주문이 완료됩니다.</span>
                                    <span v-else-if="k=='S'">주문완료 후 PSYS 사이트로 직접 방문하여 결제하는 기존의 결제방식입니다. <b>[자세히]<img :src="s3url+'order/pay_psys.png'" /></b></span>
                                    <span v-else-if="k=='R'">원격지 카드 결제 <b>[자세히]<img :src="s3url+'order/pay_remote.png'" /></b></span>
                                    <span v-else-if="k=='E'">결제대금예치 <b>[자세히]<img :src="s3url+'order/pay_escrow.png'" /></b></span>
                                    <div v-if="k=='C'" id="payment-method" :class="{toss_widget_show:order.od_pay_method == 'C'}"></div>
                                </div>
                            </template>
                        </div>                 
                    </template>

                    <transition name="slideUpDown">    
                        <div v-if="order.od_pay_method == 'B'" class="pay_info">
                            <h6>무통장 입금</h6>
                            <b-row>
                                <b-col cols="3">결제금액</b-col><b-col><b class="point">{{order.price.total| comma}}</b> 원</b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">은행선택</b-col>
                                <b-col>
                                    <b-form-radio v-model="order.extra.oex_bank" value="K">국민은행 010-01-0944-960</b-form-radio>
                                    <b-form-radio v-model="order.extra.oex_bank" value="W">우리은행 849-103249-13-002</b-form-radio>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">예금주</b-col><b-col>(주) 아이넥서스</b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">입금자</b-col><b-col><b-form-input v-model="order.extra.oex_depositor" ref="oex_depositor" placeholder="입금자" size="sm"></b-form-input></b-col>
                            </b-row>
                        </div>
                        
                        <div v-if="['P', 'S'].includes(order.od_pay_method)" class="pay_info">
                            <h6>PSYS 결제</h6>
                            <img :src="s3url+'order/pay_psys.png'" v-if="order.od_pay_method == 'S'" />
                            <b-row>
                                <b-col cols="3">결제금액</b-col><b-col><b class="point">{{order.price.total| comma}}</b> 원</b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">결제자</b-col><b-col><b-form-input v-model="order.extra.oex_depositor" ref="oex_depositor" placeholder="결제자" size="sm"></b-form-input></b-col>
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
                                        <b-form-input v-if="order.extra.oex_pay_plan == 'etc'" v-model="order.extra.oex_pay_plan_etc" placeholder="30자 이내 작성" size="sm"></b-form-input>
                                    </transition>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="3">담당자</b-col><b-col><b-form-input v-model="order.extra.oex_mng" size="sm" /></b-col>
                            </b-row>
                            <b-row class="pay_r_tel">
                                <b-col cols="3">연락처</b-col><b-col><b-form-input v-model="order.extra.oex_num_tel" :formatter="format_hp" size="sm" /></b-col>
                            </b-row>
                            <b-row class="pay_r_tel">
                                <b-col cols="3">이메일</b-col><b-col><b-form-input v-model="order.extra.oex_email" ref="oex_email" id="oex_email" size="sm" /></b-col>
                            </b-row>                    
                        </div>

                        <div v-if="order.od_pay_method == 'BL'" class="pay_info">
                            <h6>정기 결제</h6>
                            <template v-for="bk in toss.billing_keys">
                                <b-form-radio v-model="order.ub_id" :value="bk.ub_id" :key="bk.ub_id">{{bk.ub_card_com}} : {{bk.ub_card_num.substr(bk.ub_card_num.length-4, 4)}}</b-form-radio>
                            </template>
                            <b-form-radio v-model="order.ub_id" :value="0">정기 결제 카드 추가</b-form-radio> 
                        </div>
                    </transition>

                    <pay-plan v-if="order.od_pay_method == 'L' || order.od_pay_method == 'S'" v-model="order.extra"></pay-plan>
                    
                    <transition name="slideUpDown">
                        <div v-if="order.od_pay_method == 'B' || order.od_pay_method == 'L'" class="tax_paper" id="oex_type_fir">
                            <h6>지출 증빙 서류</h6>
                            <div>
                                <b-form-radio v-model="order.extra.oex_type_fir" value="TX" @click.native="tax_invoice()">세금계산서</b-form-radio>
                                <b-form-radio v-model="order.extra.oex_type_fir" value="CA" @click.native="tax_invoice()">현금영수증</b-form-radio>
                                <b-form-radio v-model="order.extra.oex_type_fir" value="NO">
                                    <template v-if="order.od_pay_method == 'B'">미발급</template>
                                    <template v-else-if="order.od_pay_method == 'L'">나중선택</template>
                                </b-form-radio>
                            </div>
                            
                            <transition name="slideUpDown">
                                <div v-if="order.extra.oex_type_fir=='NO'" class="oex_type_fir_no_info">
                                    <template v-if="order.od_pay_method=='B'">
                                        세금계산서나 현금영수증의 발급 신청을 하지 않은 경우 국세청 지정 코드(010-000-1234)로 자진발급 처리됩니다.
                                    </template>
                                    <template v-else-if="order.od_pay_method=='L'">
                                        결제방식이 결정되는 시점에 영업 담당자나 고객센터(1644-4214)를 통해 연락주시면 결제를 도와드리겠습니다.
                                    </template>
                                </div>
                            </transition>
                        </div>
                    </transition>
                    
                    <div class="order_paper">
                        <h6>요청 서류</h6>
                        <div>
                            <b-form-checkbox v-model="order.extra.oex_req_est" value='Y' unchecked-value="N">견적서</b-form-checkbox>
                            <b-form-checkbox v-model="order.extra.oex_req_tran" value='Y' unchecked-value="N">거래명세서</b-form-checkbox>
                            <b-form-checkbox v-model="order.extra.oex_req_biz" value='Y' unchecked-value="N">사업자 등록증 사본</b-form-checkbox>
                            <b-form-checkbox v-model="order.extra.oex_req_bank" value='Y' unchecked-value="N">통장 사본</b-form-checkbox>
                        </div>
                        <b-form-textarea v-model="order.extra.oex_memo" size="sm" placeholder="추가 사항 메모" ></b-form-textarea>
                    </div>
                </div>
                <transition name="slideUpDown">
                    <b-row class="pay_exe area_piece" v-if="chk_hazard_matl && !is_adult">
                        <b-col>
                            <person-verification @are_you_adult="are_you_adult"></person-verification>
                        </b-col>
                    </b-row>

                    <b-row class="pay_exe area_piece" v-else-if="!chk_hazard_matl || (chk_hazard_matl && is_adult)">
                        <b-col>최종 결제 금액</b-col>
                        <b-col class="pay_price"><b>{{order.price.total | comma}}</b> 원<span>부가세 포함</span></b-col>

                        <b-col cols="12" v-if="clickable" class="pay_go" @click="exePayment">
                            <template v-if="order.od_pay_method == 'BL'">정기 배송 신청하기</template>
                            <template v-else>주문하기</template>
                        </b-col>
                        <b-col cols="12" v-else class="pay_go gray"><b-spinner /> 주문 중...</b-col>
                    </b-row>
                </transition>
            </b-col>
        </b-row>
    </div>


    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500" :min_height="750" :padding="'0'">
            <template slot="header">
                <template v-if="['index', 'create', 'edit'].includes(modal_type)">배송지</template>
                <template v-else>지출 증빙</template>
            </template>
            <addr-index v-if="modal_type == 'index'" :address="addr" @choose="addr_choose" @create="addr_create" @edit="addr_edit"></addr-index>
            <addr-create v-else-if="modal_type == 'create'" :address="addr" @index="addr_index"></addr-create>
            <addr-edit v-else-if="modal_type == 'edit'" :address="addr" :addr="addr[addr_edit_index]" @index="addr_index"></addr-edit>
            <tax-invoice v-else-if="modal_type == 'tax'" ref="tax_invoice" v-model="order.extra" @close="modal_close"></tax-invoice>
            <coupon v-else-if="modal_type == 'coupon'" v-model="order.extra" @close="modal_close"></coupon>
        </modal>

        <modal v-if="isCouponViewed" @close-modal="isCouponViewed = false" :max_width="500" :min_height="150" :padding="'0'">
            <template slot="header">쿠폰 선택</template>
            <coupon :user_coupon="user_coupon" :chosen_uc_id.sync="order.chosen_uc_id" :available_coupon="available_coupon" @close="isCouponViewed = false"></coupon>
        </modal>
    </transition>
</div>
</template>


<script>
import ax from '@/api/http';

import router from '@/router';
import { mapState } from 'vuex';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { loadTossPayments } from '@tosspayments/payment-sdk';

let paymentWidget = null;
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
        // 'vue-daum-postcode' : VueDaumPostcode,
        'modal'          : () => import('@/views/_common/Modal.vue'),
        'pay-plan'       : () => import('@/views/web/shop/order/_comp/PayPlan'),
        'tax-invoice'    : () => import('@/views/web/shop/order/_comp/TaxInvoice'),
        'pa-list'        : () => import('@/views/web/_module/PaList'),
        'addr-index'     : () => import('@/views/web/_module/addr/Index'),
        'addr-create'    : () => import('@/views/web/_module/addr/Create'),
        'addr-edit'      : () => import('@/views/web/_module/addr/Edit'),
        'pop-up'         : () => import('@/views/web/_module/PopUp'),
        'goods-list'     : () => import('@/views/web/shop/order/_comp/GoodsList'),
        'coupon'         : () => import('@/views/web/shop/order/_comp/Coupon'),
        'person-verification': () => import('@/views/web/_module/person_verification/Index'),
    },
    watch: {
        'order.od_pay_method': {
            handler(n, o) {
                if ( this.user.is_dealer ) this.calculator();
                
                if (n == 'R') {
                    var tel = this.user.hp.split('-');
                    this.order.extra.oex_mng     = this.user.name;
                    this.order.extra.oex_num_tel =this.user.hp;
                    this.order.extra.oex_email   = this.user.email;
                } else {
                    this.order.extra.oex_mng = '';
                    this.order.extra.oex_num_tel = '';
                    this.order.extra.oex_email = '';
                }
                this.order.extra.oex_type = 'NO';
                this.order.extra.oex_type_fir = '';
            },
            deep: true,
        },
        'order.extra.oex_type_fir': {
            handler(n, o) {
                if (n == 'TX')      this.order.extra.oex_type = 'IV';
                else if (n == 'CA') this.order.extra.oex_type = 'HP';
                else if (n == 'NO') this.order.extra.oex_type = 'NO';
            },
        },

        'order.chosen_uc_id': { handler() { this.settle(); }, },        
    },
    
    data() {
        return {
            isModalViewed: false,
            isCouponViewed: false,
            user_coupon:[],
            modal_type: 'index',
            // postcode_open: false,
            order:{
                od_id:0,
                goods: this.$route.params.od_goods,
                lists:{},
                price:{},
                od_name: "",
                od_er_id: 0,

                od_type: '',
                od_pay_method:'C',
                od_company: '',
                od_ua_title: '',
                od_zip : "",
                od_addr1 : "",
                od_addr2 : "",
                od_receiver : "",
                od_receiver_hp : "",
                od_memo : "",
                od_memo_slt : '',
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
                    oex_type_fir: '',
                    oex_type: '',
                    
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
                sale_env: '',
                ub_id: 0,   // user_billing ID
                chosen_uc_id: 0,  // 쿠폰 아이디
            },
            addr: [],
            addr_edit_index: 0,
            config: {},
            goods_def: {},
            clickable : true,
            toss : [],
            is_adult: false,
            rec_goods_list_order: [],
            rec_goods_list_estimate: [],
            rec_goods_list_top04: [],
        }
    },
    computed: {
        ...mapState('auth', ['isLoggedin', 'user']),
        isDlvyAir () { return Object.values(this.order.lists).find(e => e[0].pa_type === 'AIR') !== undefined; },
        goods_cnt () { return this.order.goods.filter(gm => (gm.gm_id > 0 || gm.em_id > 0)).length; },
        addr_chk () { return isEmpty(this.order.od_receiver) || isEmpty(this.order.od_receiver_hp) || isEmpty(this.order.od_zip) || isEmpty(this.order.od_addr1) || isEmpty(this.order.od_addr2) },
        available_coupon() {
            return Object.values(this.order.lists).reduce((acc, pa) => {
                return acc || pa.reduce((acc02, gm) => {
                    return acc02 || (Number(gm.gd_id) > 0 && gm.gm_catno.substr(0, 3) !== '40-');
                }, false);
            }, false);
        },
        chk_hazard_matl () { 
            return Object.values(this.order.lists).find(e => e[0].hazard_matl === true) !== undefined; 
            // return this.user.is_super && (Object.values(this.order.lists).find(e => e[0].hazard_matl === true) !== undefined);
        },
    },
    methods:{
        async settle() {
            try {
                // uc_id user coupon id
                const res = await ax.post('/api/shop/order/settle', {type:this.order.od_type, goods:this.order.goods, chosen_uc_id:this.order.chosen_uc_id});
                if (res && res.status === 200) {
                    this.order.lists = res.data.lists;
                    this.order.price = res.data.price;
                    this.order.od_name = res.data.od_name;
                    this.config = res.data.config;
                    this.addr = res.data.addr;
                    this.user_coupon = res.data.coupon;
                    this.order.sale_env = res.data.sale_env;
                    this.goods_def = res.data.goods_def;
                    this.rec_goods_list_order = res.data.rec_goods_list_order;
                    this.rec_goods_list_estimate = res.data.rec_goods_list_estimate;
                    if (res.data.rec_goods_list_top04) {
                        this.rec_goods_list_top04 = res.data.rec_goods_list_top04;
                        console.log(123);
                        
                    }
                    
                    if(this.addr.length)
                        this.addr_choose(this.addr[0]);
                    
                    if(this.user.is_dealer)
                        this.calculator();  //  딜러가 계산
                    
                    //  toss
                    this.toss = res.data.toss;
                    if ( this.$route.query.od_pay_method != "BL") {
                        paymentWidget = await loadPaymentWidget(this.toss.clientKey, this.toss.customerKey);
                        paymentWidget.renderPaymentMethods("#payment-method", this.order.price.total);
                        // paymentWidget.renderAgreement('#agreement');
                    }                
                }
                /*  견적가 에러는 
                    \resources\js\api\http.js
                    이쪽에서 발사한다.
                */
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        
        calculator() {
            let collect = {};
            this.order.price.dlvy = 0;
            this.order.price.air = 0;
            for (let [pa_id, pa] of Object.entries(this.order.lists)) {
                for (let [i, gm] of Object.entries(pa)) {
                    if (!collect.hasOwnProperty(pa_id)) {
                        if (pa_id>0 && gm.pa_type == "AIR")
                            collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(gm.pa_dlvy_p)};
                        else
                            collect[pa_id] = { 'goods':0, 'dlvy':Number(gm.pa_dlvy_p), 'free_dlvy_max':Number(this.goods_def.free_dlvy_max), 'air':0};
                    }
                    collect[pa_id].goods += Number(gm.price * gm.ea);
                }
                
                if ( this.order.od_pay_method == 'B' ) {    //  할인금액 빼준다
                    let add_mul = Math.floor((1-this.user.dc_mul)*100)/100;
                    collect[pa_id].goods -= Math.floor(collect[pa_id].goods*add_mul);
                }
                
                if ( pa[0]['pa_type'] != 'AIR' ) {
                    //  항공 운임료는 항상 부과되어 변동없이 간다.
                    //  업체 배송은 금액에 따라 부과되어 다시 계산한다.
                    if ( Math.floor(collect[pa_id].goods*1.1) < Number(this.goods_def.free_dlvy_max) ){
                        this.order.lists[pa_id][0]['pa_dlvy_p'] = this.goods_def.dlvy_fee;
                    }else 
                        this.order.lists[pa_id][0]['pa_dlvy_p'] = 0;
                    this.order.lists[pa_id][0]['pa_dlvy_p_add_vat'] = Math.floor(this.order.lists[pa_id][0]['pa_dlvy_p']*1.1);                    
                }

                if ( pa[0]['pa_type'] == 'AIR' )
                    this.order.price.air += this.order.lists[pa_id][0]['pa_dlvy_p'];
                else
                    this.order.price.dlvy += this.order.lists[pa_id][0]['pa_dlvy_p'];
            }
            this.order.price.air_add_vat = Math.floor(this.order.price.air*1.1);
            this.order.price.dlvy_add_vat = Math.floor(this.order.price.dlvy*1.1);
            this.order.price.goods = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            this.order.price.goods_add_vat = Math.floor(this.order.price.goods*1.1);
            this.order.price.surtax = Math.floor(this.order.price.goods*0.1);
            this.order.price.total = this.order.price.air_add_vat+this.order.price.dlvy_add_vat+this.order.price.goods+this.order.price.surtax;
        },

        // onPostcodeSlt(result) {
        //     this.$set(this.order, 'od_zip', result.zonecode);
        //     let addr = result.roadAddress;
        //     addr += result.buildingName ? "("+ result.buildingName +")" : '';
        //     this.$set(this.order, 'od_addr1', addr);
        //     this.$refs.od_addr2.focus();
        //     document.getElementById('address').scrollIntoView();
        //     this.postcode_open = false;
        // },
        async exePayment () {
            if (this.validationChecker(this.order)) {
                
                switch (this.order.extra.oex_type) {
                    case 'HP': this.order.extra.oex_num = this.order.extra.oex_num_hp; break;
                    case 'IN': this.order.extra.oex_num = this.order.extra.oex_num_in; break;
                    case 'CN': this.order.extra.oex_num = this.order.extra.oex_num_cn; break;
                    case 'BN': this.order.extra.oex_num = this.order.extra.oex_num_bn; break;
                }
                
                if (this.order.od_pay_method == 'R') {
                    if (this.order.extra.oex_pay_plan == "etc")
                        this.order.extra.oex_pay_plan = this.order.extra.oex_pay_plan_etc;
                }

                this.clickable = false; 
                //  카드사는 주문아이디를 요청하고 결제 완료후 해당 아이디로 주문정보 매칭한다.
                //  미리 주문 아이디가 선점 되어야 아이디가 겹지치 않고 돌아간다.
                let pay = await ax.post(`/api/shop/order/pay`, this.order);
                if (pay && pay.status === 200) {
                    //  구글 통계 수집 소스
                    this.$gtm.trackEvent({
                        event: null, // Event type [default = 'interaction'] (Optional)
                        category: 'Order',
                        action: 'click',
                        label: '상품 주문',
                        value: `price=${this.order.price.total}&name=${this.user.name}&email=${this.user.email}&phone=${this.user.hp}`,
                        noninteraction: false, // Optional
                    });
                    
                    if (this.order.extra.oex_hasBizLicense && !isEmpty(this.order.extra.oex_file)) {
                        let frm = new FormData();
                        frm.append('fi_group', 'order');
                        frm.append('fi_key', pay.data.od_id);
                        frm.append('fi_kind', 'biz');
                        frm.append('fi_room', new Date().getFullYear());
                        frm.append("file[]", this.order.extra.oex_file);
                        await ax.post('/api/upload', frm);
                    }

                    if (this.order.od_pay_method == 'C') {
                        paymentWidget.requestPayment({
                            orderId: pay.data.od_id,
                            orderName: this.order.od_name,
                            successUrl: this.toss.successUrl,
                            failUrl: this.toss.failUrl,
                            customerEmail: this.user.email, // 고객 이메일 (선택)
                            customerName: this.user.name, // 고객 이름 (선택)
                        }).then((v) => console.log(v));
                    } else if (this.order.od_pay_method == 'P') {
                        this.openWinPop(`/shop/order/settle_psys/${pay.data.od_id}`, 800, 720);
                    } else if (this.order.od_pay_method == 'BL' && this.order.ub_id == 0) {
                        loadTossPayments(this.toss['billing_clientKey']).then(tossPayments => {
                            // ------ 카드 등록창 호출 ------
                            tossPayments.requestBillingAuth('카드', { // 결제수단 파라미터 (자동결제는 카드만 지원합니다.)
                                customerKey: this.toss.customerKey, // 고객 ID로 상점에서 만들어야 합니다. 빌링키와 매핑됩니다. 자세한 파라미터 설명은 결제 정보 파라미터 설명을 참고하세요.
                                successUrl: `${this.toss.successUrl}/${pay.data.od_id}`, // 카드 등록에 성공하면 이동하는 페이지(직접 만들어주세요)
                                failUrl: this.toss.failUrl,       // 카드 등록에 실패하면 이동하는 페이지(직접 만들어주세요)
                            })
                            // ------ 결제창을 띄울 수 없는 에러 처리 ------
                            // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
                            // 결제창에서 발생할 수 있는 에러를 확인하세요. 
                            // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
                            .catch(function (error) {
                                if (error.code === 'USER_CANCEL') {
                                // 결제 고객이 결제창을 닫았을 때 에러 처리
                                }
                            })
                        });

                    } else {
                        await router.push({ name: 'order_done', params: { od_id: pay.data.od_id }});
                    }
                }
                this.clickable = true; 
            }
        },

        memo_slt() { this.order.od_memo = this.config.dlvy_msg[this.order.od_memo_slt]; },

        addr_choose (addr) {
            let hp = addr.ua_hp.split('-');
            this.order.od_ua_title      = addr.ua_title;
            this.order.od_zip           = addr.ua_zip;
            this.order.od_addr1         = addr.ua_addr1;
            this.order.od_addr2         = addr.ua_addr2;
            this.order.od_receiver      = addr.ua_name;
            this.order.od_receiver_hp   = addr.ua_hp;
            this.order.od_memo          = addr.ua_memo;

            this.isModalViewed = false;
            return;
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
        format_hp(e) { return this.formatHp(e); },

        tax_invoice () {
            this.isModalViewed = true;
            this.modal_type = 'tax';
        },

        modal_close () { this.isModalViewed = false; this.isCouponViewed = false; },

        validationChecker (frm) {
            if (this.addr.length==0) { Notify.toast('danger', "배송지를 등록하고 선택하세요"); this.$refs.add_addr.focus(); return false; }

            if (this.order.privacy !== 'Y')     { 
                Notify.toast('danger', "개인정보 수집 및 이용에 동의 해주세요.");
                document.getElementById('agrrement_01').scrollIntoView();
                window.scrollBy(0, -160);
                return false;
            }
            if (!this.isDlvyAir && this.order.check_terms !== 'Y')    { 
                Notify.toast('danger', "구매자 및 사용자 확인사항에 동의 해주세요.");
                document.getElementById('agrrement_03').scrollIntoView();
                window.scrollBy(0, -160);
                return false;
            }
            if (this.isDlvyAir && this.order.dlvy_air !== 'Y') { 
                Notify.toast('danger', "단순 제품 교환 및 반품 불가에 동의 해주세요");
                document.getElementById('agrrement_02').scrollIntoView();
                window.scrollBy(0, -160);
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
                            if (isEmpty(frm.extra.oex_file)) { Notify.toast('danger', "사업자 등록증 사본을 첨부해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_file.$refs.input.focus(); return false; }
                        } else {
                            if (isEmpty(frm.extra.oex_biz_name)) { Notify.toast('danger', "법인명을 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_biz_name.focus(); return false; }
                            if (isEmpty(frm.extra.oex_biz_num)) { Notify.toast('danger', "사업자 등록번호를 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_biz_num.focus(); return false; }
                            if (isEmpty(frm.extra.oex_biz_type)) { Notify.toast('danger', "업태를 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_biz_type.focus(); return false; }
                            if (isEmpty(frm.extra.oex_biz_item)) { Notify.toast('danger', "종목를 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_biz_item.focus(); return false; }
                            if (isEmpty(frm.extra.oex_ceo)) { Notify.toast('danger', "대표자명을 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_ceo.focus(); return false; }
                            if (isEmpty(frm.extra.oex_addr)) { Notify.toast('danger', "사업장 소재지를 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_addr.focus(); return false; }
                        }
                        if (isEmpty(frm.extra.oex_mng)) { Notify.toast('danger', "담당자를 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_mng.focus(); return false; }
                        if (isEmpty(frm.extra.oex_email)) { Notify.toast('danger', "이메일을 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_email.focus(); return false; }
                        if (isEmpty(frm.extra.oex_num_tel)) { Notify.toast('danger', "핸드폰 번호를 입력해주세요"); this.tax_invoice(); this.$refs.tax_invoice.$refs.oex_num_tel.focus(); return false; }
                    }
                break;
            
                default: break;
            }

            if (isEmpty(frm.od_receiver))   { this.go_scroll_address(); Notify.toast('danger', "수령인 없음. 배송지 관리에서 수정하세요.");         return false; }
            if (isEmpty(frm.od_receiver_hp)){ this.go_scroll_address(); Notify.toast('danger', "수령인 연락처 없음. 배송지 관리에서 수정하세요.");  return false; }
            if (isEmpty(frm.od_zip))        { this.go_scroll_address(); Notify.toast('danger', "우편번호 없음. 배송지 관리에서 수정하세요.");       return false; }
            if (isEmpty(frm.od_addr1))      { this.go_scroll_address(); Notify.toast('danger', "주소 없음. 배송지 관리에서 수정하세요.");           return false; }
            if (isEmpty(frm.od_addr2))      { this.go_scroll_address(); Notify.toast('danger', "상세주소 없음. 배송지 관리에서 수정하세요.");       return false; }

            //  예전 이상한 주소 체크
            //  정상적인 주소로 시작 안하는 주소 거른다 (서울, 제주, 전라, 충남 등등의 도로 시작하는지 체크
            //  some 함수는 배열의 루프 돌면서 하나라도 참이면 참
            let do_chk = this.config.do_list.some( (do_nm) => this.order.od_addr1.trim().startsWith(do_nm) );
            if (!do_chk) { 
                Notify.modal("정확한 도로명 주소로 수정해주세요.", 'danger');
                this.go_scroll_address();
                return false; 
            }

            
            if ((this.order.od_pay_method == 'B' || this.order.od_pay_method == 'L') && this.order.extra.oex_type_fir == '') { 
                Notify.toast('danger', "지출 증빙 서류를 선택하세요.");
                document.getElementById('oex_type_fir').scrollIntoView();
                window.scrollBy(0, -160);
                return false;
            }
            
            return true;
        },

        go_scroll_address () { 
            document.getElementById('address_box').scrollIntoView(); 
            window.scrollBy(0, -160); 
        },

        are_you_adult (v) {            
            if (v == 'adult_true') {
                this.is_adult = true;
                this.$store.state.auth.user.adult_verified_at = new Date().format("yyyy-MM-dd");
            } else if (v == 'adult_false') {
                this.is_adult = false;
                Notify.modal("성인만 구매 가능합니다.", 'danger');
            }
        }
        
    },
    async created(){
        var tCode = new Date().format("yyMMddHHmm");
        if (this.$route.params.od_goods) {
            this.order.goods = this.$route.params.od_goods;
            this.order.od_type = this.$route.params.od_type;
            this.order.tCode = tCode;

            sessionStorage.setItem('goods', JSON.stringify(this.order.goods));
            sessionStorage.setItem('od_type', this.order.od_type);
            if (this.order.od_type == 'buy_estimate') {
                sessionStorage.setItem('od_er_id', this.$route.params.od_er_id);
                this.order.od_er_id = this.$route.params.od_er_id;
            }
            sessionStorage.setItem('od_time', tCode);
        } else if ( sessionStorage.getItem('od_time') ) {
            if (tCode - sessionStorage.getItem('od_time') <= 20) {
                this.order.goods = JSON.parse(sessionStorage.getItem('goods'));
                this.order.od_type = sessionStorage.getItem('od_type');
                if (this.order.od_type == 'buy_estimate')
                    this.order.od_er_id = sessionStorage.getItem('od_er_id');                
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
        if ( this.user.level == 12 )
            this.order.od_pay_method = 'B';
        if ( this.$route.query.od_plan ) {
            this.order.od_pay_method = 'BL';
            this.order.od_plan = this.$route.query.od_plan;
        }  
        
        //  선인인증한지 1년 이내면 인증필요없음
        let now = new Date();	// 현재 날짜 및 시간
        let oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));	// 일년 전
        this.is_adult = this.user.adult_verified_at >= oneYearAgo.toISOString().split('T')[0];

        this.$gtm.trackView('상품 주문 페이지', 'https://4science.net/shop/order/settle');
    },
    beforeRouteEnter (to, from, next) {        
        if (['goods_show', 'my_estimate_show_reply', 'cart_index', 'login', null].includes(from.name))
            next();    
        else {
            Notify.modal("잘못된 접근 방법입니다.", 'danger');
            history.forward();
        }
    },
}
</script>

<style lang="css" scoped>
#settle { padding-top:2em; background-color:#F5F5F5; }
#settle h2 { font-weight:bold; font-size:1.8rem; padding-left:1.8rem; margin-bottom:1em;}
#settle h4 { font-weight:600; font-size:1.3rem; border-bottom:2px solid #000; padding-bottom:.7em; }

.settle_split { padding-bottom:2em; align-items:flex-start; }
.settle_split .area_piece { background-color:#FFF; padding:1.5em; border-radius:10px; }
.settle_split .left { flex-basis:60%;max-width:60%; margin-right:.875em; }
    
.settle_split .left .goods_list { padding:1.5em 1.5em .7em; }
.settle_split .left .user_coupon { padding:1em 1.5em; margin-top:1.5rem; }
.settle_split .left .user_coupon .col:nth-of-type(2) { cursor:pointer; text-align:right; padding-right:2rem; background: #fff url(/storage/common/arrow_dn.gif) no-repeat right 8px center; }

.settle_split .left .agreement { align-items:flex-start; margin-top:1.5em; }
.settle_split .left .agreement .col { padding:1.5em; background:#4F708F; border-radius:.5rem; }
.settle_split .left .agreement .col:nth-of-type(1) { margin-right: 0.25rem; }
.settle_split .left .agreement .col:nth-of-type(2) { margin-left: 0.25rem; }
.settle_split .left .agreement .col .head { color:#FFF; font-size:.8rem; display:flex; justify-content:space-between; align-items:center; }
.settle_split .left .agreement .col .custom-radio { display:flex; align-items:center; }
.settle_split .left .agreement .col .custom-radio>>>label::before, 
.settle_split .left .agreement .col .custom-radio>>>label::after { top:.15rem; left:-1.4rem; }
.settle_split .left .agreement .col .collapse .card { text-align:justify; color:#000; margin-top:1rem; font-size:.8rem; }
.settle_split .left .suggest .area_piece { align-items: flex-start; margin-top: 1.5em; }
.settle_split .left .suggest .area_piece .col:first-child { flex:0 0 100%; max-width:100%; margin-bottom:10px; }
.settle_split .left .suggest .area_piece .col:first-child b { border-radius:0 0 10px 10px; padding:5px 18px; color:#FFF; font-size:18px; display:inline-block;}

.settle_split .left .suggest .area_piece:nth-of-type(1) .col:first-child { border-top:3px solid #51B948; }
.settle_split .left .suggest .area_piece:nth-of-type(1) .col:first-child b { background:#51B948; }
.settle_split .left .suggest .area_piece:nth-of-type(2) .col:first-child { border-top:3px solid #1A90D6; }
.settle_split .left .suggest .area_piece:nth-of-type(2) .col:first-child b { background:#1A90D6; }

.settle_split .left .suggest .area_piece .col:not(:first-child) { border:1px solid #CCC; flex:0 0 23.2%; max-width:23.2%;  }
.settle_split .left .suggest .area_piece .col:not(:first-child):not(:nth-child(2)) { margin-left:2.4%; }
.settle_split .left .suggest .area_piece .col a { display:block; }
.settle_split .left .suggest .area_piece .col a div { overflow: hidden; display: block; }
.settle_split .left .suggest .area_piece .col a div img { width:100%; height:auto; object-fit:contain; transition: transform 0.3s ease; }
.settle_split .left .suggest .area_piece .col a div img:hover { transform:scale(1.2); }
.settle_split .left .suggest .area_piece .col a p { text-align:center; margin:15px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; height:42px; font-size:14px; }




.settle_split .right { padding-left:.875em; }
.settle_split .right .address { border:1px solid #000; margin-bottom:1.5em; line-height:2; }
.settle_split .right .address .addr_tit { color:#ff4d00; font-weight:900; font-size:1.4em; }
.settle_split .right .address .addr_tit svg { margin-right: 0.5em; }
.settle_split .right .address .addr_tit button { float:right; }
.settle_split .right .address .addr_tit button.invalid_addr { border-color:rgb(255, 72, 0); box-shadow:0 0 0px 1px rgb(255, 72, 0, .2); animation: blink_effect 1s infinite alternate; }
.settle_split .right .address .user { font-weight:900; }
.settle_split .right .address .addr { margin-bottom:.7em; }
.settle_split .right .address .add_addr small { color:#ACACAC; font-size:80%; }
.settle_split .right .address div .empty { color:red; font-weight:100; text-decoration:underline; }
.settle_split .right .address select { width:50%; min-width:240px; }
.settle_split .right .address select + input { margin-top:.5em; }
@keyframes blink_effect {
  0% { box-shadow:0 0 0px 1px rgba(255, 72, 0, .2); }
  100% { box-shadow:0 0 16px 10px rgb(255, 72, 0); }
}

.settle_split .right .pay_method h5 { font-size:1.1rem; font-weight:bold; margin-bottom:.6rem; padding-left:.5rem; }
.settle_split .right .pay_method>div:not(:last-child) { border-bottom:1px solid #d7d7d7; }
.settle_split .right .pay_method>div {  padding:.94rem 0; }
.settle_split .right .pay_method div>>>h6 { background:#626262; display:inline-block; padding:.5rem 1rem; border-radius:1.5rem; color:#FFF; font-size:.85rem; margin-bottom: 1rem; }
.settle_split .right .pay_method .method>div { margin:1rem 0; display:flex; flex-wrap: wrap; }
.settle_split .right .pay_method .method div .custom-radio { display:inline-block; padding-left:1.3em; flex:0 0 32%; max-width:32%; }
.settle_split .right .pay_method .method div .custom-radio>>>label { cursor:pointer; }
.settle_split .right .pay_method .method div .custom-radio>>>label::before,
.settle_split .right .pay_method .method div .custom-radio>>>label::after { left:-1.2rem; top:.15em; }
.settle_split .right .pay_method .method div .custom-radio>>>label i { font-style:normal; font-weight:bold; color:#616161; font-size:.95rem; }
.settle_split .right .pay_method .method div span { color:#ACACAC; font-size:.8rem; flex-basis:0; flex-grow:1; max-width:100%; }
.settle_split .right .pay_method .method div span b { cursor:pointer; position:relative; }
.settle_split .right .pay_method .method div span img { display:none; position:absolute; top:0; right:0; z-index:2; border:2px solid #616161; border-radius:.5rem; }
.settle_split .right .pay_method .method div span b:hover img { display:block; }
.settle_split .right .pay_method .method div #payment-method { flex:0 0 100%; max-width:100%; border-radius:1em; box-shadow:none; max-height:0; padding:0; border-width:0; margin:0; transition:all .2s; overflow:hidden; }
.settle_split .right .pay_method .method div #payment-method.toss_widget_show { max-height:800px; border:3px solid #000000; padding:0px 13px 13px 13px; margin:12px 0 0 5px; box-shadow:-2px -2px 8px 1px rgba(39,39,39,.5); }
.settle_split .right .pay_method .pay_info .row { margin:1rem 0; }
.settle_split .right .pay_method .pay_info .row:first-of-type { align-items: baseline; }
.settle_split .right .pay_method .pay_info .row div { font-weight:600; color:#616161; font-size:.85rem; }
.settle_split .right .pay_method .pay_info .row .point { color:#1A90DA; font-size:1.3rem; }
.settle_split .right .pay_method .pay_info .row .col .custom-radio:first-of-type { margin-bottom:.5rem; }
.settle_split .right .pay_method .pay_info p { font-size:.75rem; }
.settle_split .right .pay_method .pay_info p span { color:red; }
.settle_split .right .pay_method .pay_info .pay_r_tel .col { display:flex; justify-content:space-between; align-items:center; }
.settle_split .right .pay_method .pay_info .pay_r_tel .col  svg { margin:0 .5rem; }
.settle_split .right .pay_method .pay_info.slideUpDown-enter-to,
.settle_split .right .pay_method .pay_info.slideUpDown-leave { max-height:400px; }
.settle_split .right .pay_method .pay_info.slideUpDown-enter-active,
.settle_split .right .pay_method .pay_info.slideUpDown-leave-active { transition:max-height 0.3s ease-out; }
.settle_split .right .pay_method .pay_info.slideUpDown-enter,
.settle_split .right .pay_method .pay_info.slideUpDown-leave-to { max-height:0px; }
.settle_split .right .pay_method .order_paper>div { display:flex; justify-content:space-between; }
.settle_split .right .pay_method .order_paper div .custom-checkbox>>>label { color:#616161; font-size:.8rem; cursor:pointer; }
.settle_split .right .pay_method .order_paper div .custom-checkbox>>>label::before, 
.settle_split .right .pay_method .order_paper div .custom-checkbox>>>label::after { top:2px; left:-1.2rem; }
.settle_split .right .pay_method .tax_paper>div { display:flex; justify-content:space-between; }
.settle_split .right .pay_method .tax_paper div .custom-radio>>>label { color:#616161; font-size:.8rem; cursor:pointer; vertical-align: baseline; }
.settle_split .right .pay_method .tax_paper div .custom-radio>>>label::before, 
.settle_split .right .pay_method .tax_paper div .custom-radio>>>label::after { top:2px; left:-1.2rem; }
.settle_split .right .pay_method .tax_paper .oex_type_fir_no_info { color:#616161; font-size:14px; line-height:1.3; text-align:justify; padding:13px;
    border:3px solid #000; border-radius:1em; transition:all .2s; box-shadow:-2px -2px 8px 1px rgba(39, 39, 39, .5); margin-top:15px; }
.settle_split .right .pay_exe { margin-top:1.5em; border-radius:.9rem; border:1px solid #000; position:sticky; top:180px; }
.settle_split .right .pay_exe .pay_price { font-weight:bold; text-align:right; flex-basis:60%; max-width:60%; }
.settle_split .right .pay_exe .pay_price b { font-size:2.1rem; }
.settle_split .right .pay_exe .pay_price span { font-size:.7rem; display:block; }
.settle_split .right .pay_exe .pay_go { background:#1A90D6; color:#FFF; font-size:1.6rem; font-weight:bold; padding:.8em 0; margin-top:2rem; text-align:center; cursor:pointer; }
.settle_split .right .pay_exe .pay_go.spinner-border { width:2em; height:2em; }
.settle_split .right .top { background:#1A90D6; border-radius:2rem 2rem 0 0; padding:1.4rem 1.3rem; align-items:center; }


#settle >>> .custom-control-input:checked ~ .custom-control-label::before { color: #fff; border-color:#17a2b8; background-color:#17a2b8; }
@media (max-width: 992px){
    #settle { padding-top:1em; }
    .settle_split .left { flex-basis:auto; max-width:none; margin:0 .2em; }
    .settle_split .left .agreement .col { flex-basis:100%; max-width:100%; margin:.4em 0 !important; padding: 1em 0.5em; }
    .settle_split .area_piece { margin:0 .2em; padding:1.5em .5em !important; }
    .settle_split .right { padding-left:0; }
    .settle_split .right .address { margin-top: 1.5em; }
    .settle_split .right .pay_method .method div #payment-method.toss_widget_show { padding:0; }
    .settle_split .right .pay_exe .pay_go { margin-top: 0.7em; border-radius: 10px; }
}
</style>