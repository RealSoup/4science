<template>
<b-container class="w_fence">
    <h3>주문 정보</h3>
    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">
        Loading ......
    </LoadingModal>
    <div v-else>
        <h5>
            <b>{{od.created_at}}</b> &nbsp; 주문번호 {{od.od_no}} &nbsp;
            <OrderStep v-model="od.od_step" :order_config="od.order_config" />
        </h5>

        <b-container class="goods">
            <b-row v-for="(pa, pa_i) in od.order_purchase_at" :key="`pa_${pa_i}`">
                <b-col class="pa_tit">
                    <b v-if="pa.odpa_pa_id">업체<br />직배송</b>
                    <b v-else>포사이언스<br />배송</b>
                </b-col>
                
                <b-col class="gd_con">
                    <b-row>
                        <b-col></b-col>
                        <b-col>주문 상품</b-col>
                        <b-col>제조사</b-col>
                        <b-col>판매가</b-col>
                        <b-col>수량</b-col>
                        <b-col>금액</b-col>
                        <b-col>진행현황</b-col>
                    </b-row>
                    <b-row v-for="(odm, odm_i) in pa.order_model" :key="`gd_${odm_i}`" :class="{model: odm.odm_type=='MODEL', option: odm.odm_type=='OPTION'}">
                        <b-col class="align">
                            <div v-if="odm.odm_type=='MODEL'">
                                <b-link v-if="odm.odm_gd_id" :to="{name: 'goods_show', params:{gd_id:odm.odm_gd_id} }">
                                    <img :src="odm.img_thumb_src" />
                                </b-link>
                                <img :src="odm.img_thumb_src" v-else />
                            </div>
                            <b v-else>추가 옵션</b>
                        </b-col>
                        <b-col class="desc" :class="{option:odm.odm_type=='OPTION'}">
                            <template v-if="odm.odm_type=='MODEL'">
                                <b>{{odm.odm_gd_name}}</b>
                                <p>
                                    제품명: {{odm.odm_gm_name}} / 판매단위: {{odm.odm_gm_unit}} <br />
                                    모델명: {{odm.odm_gm_code}} / Cat.No.: {{odm.odm_gm_catno}}<br />
                                    사양: {{odm.odm_gm_spec}}
                                </p>
                            </template>
                            <template v-else>{{odm.odm_gm_name}}: {{odm.odm_gm_spec}}</template>
                        </b-col>
                        <b-col class="align">{{odm.odm_mk_name}}</b-col>
                        <b-col class="align end">{{odm.odm_price_add_vat | comma | won}}</b-col>
                        <b-col class="align">{{odm.odm_ea | comma}}</b-col>
                        <b-col class="align">
                            <b class="sum">
                                {{odm.odm_price_add_vat*odm.odm_ea | comma | won}}
                            </b>
                        </b-col>
                        <b-col class="align">
                            <template v-if="odm.odm_type=='MODEL'">                                    
                                <b-badge v-if="odm.order_dlvy_info.oddi_receive_date" variant="light">수취완료</b-badge>
                                <b-badge v-else-if="odm.order_dlvy_info.oddi_arrival_date" variant="success">배송완료</b-badge>
                                <b-button v-else-if="odm.order_dlvy_info.oddi_dlvy_num" size="sm" variant="info"
                                    :href="getHref(odm.order_dlvy_info.oddi_dlvy_com, odm.order_dlvy_info.oddi_dlvy_num)"
                                >배송조회</b-button>
                                <b-badge v-else variant="primary">준비중</b-badge>
                                <br />
                                <template v-if="!odm.order_dlvy_info.oddi_receive_date"> <!-- 수취확인날짜가 없다면 -->
                                    <!-- 송장번호 입력날짜가 없지 않거나, 배송완료 날짜가 없지 않다면 -->
                                    <b-button v-if="!!odm.order_dlvy_info.oddi_dlvy_created_at || !!odm.order_dlvy_info.oddi_arrival_date" class="teal xm"  @click="receiptConfirm(odm)">
                                        수취확인
                                    </b-button>
                                </template>
                            </template>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col class="dlvy_fare">
                    <div>
                        <p v-if="pa.odpa_pa_type == 'AIR'">항공 운임료</p>
                        <p v-else>배송비</p>
                        {{pa.odpa_dlvy_p_add_vat | comma | won}}
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="sum_up">
            <b-row class="total">
                <b-col>상품금액</b-col>
                <b-col><b>{{(od.od_gd_price+od.od_surtax) | comma | won}}</b></b-col>
                <b-col>배송료</b-col>
                <b-col><b>{{od.od_dlvy_price | comma | won}}</b></b-col>
                <b-col>결제 예정 금액</b-col>
                <b-col><b>{{od.od_all_price | comma | won}}</b></b-col>
            </b-row>
            <b-row class="total_sub">
                <b-col>
                    <div><b-col>상품가</b-col><b-col>{{od.od_gd_price | comma | won}}</b-col></div>
                    <div><b-col>부가세</b-col><b-col>{{od.od_surtax | comma | won}}</b-col></div>
                </b-col>
                <b-col>
                    <div><b-col>포사이언스 배송</b-col><b-col>{{dlvy_4s | comma}}</b-col></div>
                    <div><b-col>업체 배송</b-col><b-col>{{dlvy_other | comma}}</b-col></div>
                </b-col>
                <b-col><div><b-col>적립예정 마일리지</b-col><b-col>{{sum_mileage | comma}}</b-col></div></b-col>
            </b-row>
        </b-container>

        <b-container class="extra_info frm_st">
            <b-row>
                <b-col>
                    <b-row><b-col class="label_st">주문자명</b-col><b-col>{{od.od_name}}</b-col></b-row>
                    <b-row><b-col class="label_st">연락처</b-col><b-col>{{od.od_orderer_hp}}</b-col></b-row>
                    <b-row><b-col class="label_st">이메일</b-col><b-col>{{od.od_orderer_email}}</b-col></b-row>
                    <b-row><b-col class="label_st">소속</b-col><b-col>{{od.od_department}}</b-col></b-row>
                </b-col>
                <b-col>
                    <b-row><b-col class="label_st">수령인</b-col><b-col>{{od.od_receiver}}</b-col></b-row>
                    <b-row><b-col class="label_st">연락처</b-col><b-col>{{od.od_receiver_hp}}</b-col></b-row>
                    <b-row><b-col class="label_st">주소</b-col><b-col>{{od.od_addr1}} {{od.od_addr2}}</b-col></b-row>
                    <b-row><b-col class="label_st">배송시<br/>요구사항</b-col><b-col>{{od.od_memo}}</b-col></b-row>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col class="label_st">결제금액</b-col>
                        <b-col>{{od.od_all_price | comma | won}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">결제수단</b-col>
                        <b-col>
                            <span v-if="od.od_pay_method=='B'">계좌이체</span>
                            <span v-else-if="od.od_pay_method=='E'">에스크로</span>
                            <span v-else-if="od.od_pay_method=='C'">
                                카드결제
                                <template v-if="od.order_pg && od.order_pg.pg_pay_type != 'PSYS'">
                                    <b-button class="sm" @click="openWinPop(`https://iniweb.inicis.com/receipt/iniReceipt.jsp?noTid=${od.order_pg.pg_tid}`, 450, 550)">매출전표</b-button>
                                </template>
                            </span>
                            <span v-else-if="od.od_pay_method=='P'">PSYS</span>
                            <span v-else-if="od.od_pay_method=='R'">원격결제</span>
                        </b-col>    
                    </b-row>
                    <b-row>
                        <b-col class="label_st">입금자명</b-col>
                        <b-col>{{od.order_extra_info.oex_depositor}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">결제예정일</b-col>
                        <b-col>{{payPlanDisplay}}</b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">입금계좌</b-col>
                        <b-col>
                            <span v-if="od.order_extra_info.oex_bank=='K'">국민은행 - {{siteInfo.bank.num02}}</span>
                            <span v-else-if="od.order_extra_info.oex_bank=='W'">우리은행 - {{siteInfo.bank.num01}}</span>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">요청서류</b-col>
                        <b-col>{{reqDocumentDisplay}}</b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        
        <div class="btn_box" v-if="od.od_step < 60 && isEmpty(od.od_mng)">
            <b-button class="black lg" @click="print">견적서 출력</b-button>
            <b-button class="gray lg" @click="downEstimateExcel">견적서 EXCEL 다운</b-button>
            <b-button class="blue lg" @click="downTransactionExcel">거래명세서 EXCEL 다운</b-button>
        </div>
    </div>
    
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500">
            <ReceiptConfirm :item="receiptItem" @hide_modal = "hide_modal" />
        </Modal>
    </transition>
</b-container>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'
var dt = new Date();
export default {
    name: "MyOrder",
    components: {
        'LoadingModal'  : () =>   import('@/views/_common/LoadingModal.vue'),
        'OrderStep'     : () => import('../_comp/OrderStep.vue'),
        'Modal'         : () => import('@/views/_common/Modal.vue'),
        'ReceiptConfirm': () => import('./_comp/ReceiptConfirm'),
    },
    data() {
        return {
            isModalViewed: false,
            isLoadingModalViewed: true,
            od:{
                order_extra_info:{},
            },
            receiptItem: {},
        }
    },
    computed: {
        ...mapGetters({
            isLoggedin: 'auth/isLoggedin',
            user: 'auth/user',
            siteInfo: 'common/siteInfo',
        }),
        payPlanDisplay() {
            var plan = this.od.order_extra_info.oex_pay_plan;
            var returnMsg = '';
            if (plan == 'soon')         returnMsg = '선 결제';
            else if (plan == 'week1')   returnMsg = '1주이내 결제';
            else if (plan == 'week2')   returnMsg = '2주이내 결제';
            else if (plan == 'month1')  returnMsg = '한달이내 결제';
            else if (plan == 'month2')  returnMsg = '2개월이내 결제';
            else if (plan == 'dlvy')    returnMsg = '납품시 결제';
            else                        returnMsg = plan;
            return returnMsg;
        },
        reqDocumentDisplay() {
            let req = new Array();
            if (this.od.order_extra_info.oex_req_est =='Y') req.push('견적서');
            if (this.od.order_extra_info.oex_req_tran=='Y') req.push('거래명세서');
            if (this.od.order_extra_info.oex_req_biz =='Y') req.push('사업자등록증사본');
            if (this.od.order_extra_info.oex_req_bank=='Y') req.push('통장사본');
            return req.join(', ');
        },
        dlvy_4s () {
            return this.od.order_purchase_at.hasOwnProperty(0) ? this.od.order_purchase_at[0].odpa_dlvy_p_add_vat : 0;
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
        receiptConfirm(odm) {
            this.isModalViewed = true;
            this.receiptItem = Object.assign( {}, odm );
        },
        hide_modal() {
            this.isModalViewed = false;
        },
        getHref (com, num) {
            return this.od.order_config.delivery_com[com].replace('[송장번호]', num);
        },
        
        print () {
            var url = `/api/shop/order/printEstimate/${this.$route.params.od_id}`;
            var name = "견적서 인쇄";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
        async downEstimateExcel(){
            const res = await ax.get(`/api/shop/order/downEstimateExcel/${this.$route.params.od_id}`, { responseType: 'blob' });
            this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.xlsx');
        },
        async downTransactionExcel(){
            const res = await ax.get(`/api/shop/order/downTransactionExcel/${this.$route.params.od_id}`, { responseType: 'blob' });
            this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.xlsx');
        },
        orderDocumentDown(res, fileNm){
            let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileUrl;
            fileLink.setAttribute('download', fileNm);
            document.body.appendChild(fileLink);
            fileLink.click();
        },
    },
    async mounted() {
        const res = await ax.get(`/api/shop/order/${this.$route.params.od_id}`);
        if (res && res.status === 200) {
            this.od = res.data;
            this.isLoadingModalViewed= false;
        }
    },

}
</script>

<style lang="css" scoped>
.w_fence { max-width:100%; padding-left:0; padding-right:0; }
.goods { border-top:3px solid #4F637B; }
.goods .pa_tit { flex:0 0 8%; max-width:8%; border-right:1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; align-items:center; display:flex; text-align:center; justify-content:center; }
.goods .gd_con .row.option { background-color:#F4F1EC; }
.goods .gd_con .row .col { border-bottom:1px solid #D7D7D7; padding:.68rem; font-size:.85rem; }
.goods .gd_con .row .col.align { display:flex; align-items:center; justify-content:center; }
.goods .gd_con .row:not(:first-child) .end { justify-content:flex-end; }
.goods .gd_con .row:not(:first-child) .col { color:#AEAEAE; }
.goods .gd_con .row:not(:first-child) .col .btn { color:#AEAEAE; font-size:.9rem; }
.goods .gd_con .row .col b { color:#000; font-size:.95rem; }
.goods .gd_con .row:first-child .col { font-weight:600; line-height:1.7; padding:.86rem 0; font-size:.9rem; text-align:center; }
.goods .gd_con .row .col:nth-child(1) { flex:0 0 7%; max-width:7%; }
.goods .gd_con .row .col:nth-child(2) { border-right:1px solid #D7D7D7; }
.goods .gd_con .row .col:nth-child(3) { flex:0 0 9%; max-width:9%; border-right:1px solid #D7D7D7; }
.goods .gd_con .row .col:nth-child(4) { flex:0 0 11%; max-width:11%; border-right:1px solid #D7D7D7; }
.goods .gd_con .row .col:nth-child(5) { flex:0 0 6%; max-width:6%; border-right:1px solid #D7D7D7; }
.goods .gd_con .row .col:nth-child(6) { flex:0 0 12%; max-width:12%; border-right:1px solid #D7D7D7; }
.goods .gd_con .row .col:nth-child(7) { flex:0 0 9%; max-width:9%; flex-wrap:wrap; }
.goods .gd_con .row .col img { width:100%; }
.goods .gd_con .row .col >>> .myCheck .custom-control-label::before, 
.goods .gd_con .row .col >>> .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px; }
.goods .gd_con .row .col .sum { text-align:right; width:100%; line-height:2; }
.goods .gd_con .row .col.desc.option { display:flex; align-items:center; }
.goods .gd_con .row .col .sum >>> .btn-group-toggle { display:block !important; text-align:center; }
.goods .gd_con .row .col .sum >>> .btn-group-toggle .btn { background-color:#fff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem; }
.goods .gd_con .row .col .sum >>> .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8; }
.goods .dlvy_fare { flex:0 0 9%; max-width:9%; align-items: center; display: flex; text-align: center; justify-content: center; border-left: 1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; color:#AEAEAE; }

.sum_up { border-top:3px solid #4F637B; }
.sum_up .total { border-bottom:1px solid #D6D6D6; }
.sum_up .total .col { color:#000; font-weight:bold; padding:1rem .5rem; }
.sum_up .total .col b { font-size:1.4rem; }

.sum_up .total .col:nth-of-type(odd) { padding-left:2rem; display:flex; align-items:center; }
.sum_up .total .col:nth-of-type(even) { padding-right:2rem; text-align:right; }

.sum_up .total .col:nth-of-type(1) {  }
.sum_up .total .col:nth-of-type(2) {  border-right:1px solid #D6D6D6; }
.sum_up .total .col:nth-of-type(2):after,
.sum_up .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; top:19px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2; }
.sum_up .total .col:nth-of-type(2):after { content:"+"; }
.sum_up .total .col:nth-of-type(3) {  }
.sum_up .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }
.sum_up .total .col:nth-of-type(4):after { content:"="; }
.sum_up .total .col:nth-of-type(5) { flex-basis:19.5%; max-width:19.5%; }
.sum_up .total .col:nth-of-type(6) { flex-basis:21.05%; max-width:21.05%; }
.sum_up .total_sub { background:#F2F3F5; border-bottom-width:0; }
.sum_up .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.sum_up .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.sum_up .total_sub>.col:nth-of-type(3) { flex-basis:40.5%; max-width:40.5%; }
.sum_up .total_sub .col>div { display:flex; flex-wrap:wrap; }
.sum_up .total_sub .col>div:nth-of-type(1) { padding:1.3rem 1rem .5rem 1rem; }
.sum_up .total_sub .col>div:nth-of-type(2) { padding:0 1rem 2.5rem 1rem; }
.sum_up .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.sum_up .total_sub .col>div .col:nth-of-type(2) { text-align:right; }

.extra_info { margin-top:3rem; font-size:.95rem;  }
.extra_info>.row>.col { border:1px solid #D7D7D7; padding:2%; }
.extra_info>.row>.col .label_st { flex-basis:100px; max-width:100px; padding-top:0; }
.extra_info>.row>.col:nth-of-type(1) { flex-basis:24%; max-width:24%; }
.extra_info>.row>.col:not(:nth-of-type(1)) { margin-left:-1px; }
.extra_info>.row>.col .row { margin-left: 0; margin-right: 0; }
</style>
