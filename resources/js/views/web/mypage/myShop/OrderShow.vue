<template>
<b-container class="w_fence">
    <h3>주문 정보</h3>
    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <div class="top" v-if="od.mng">
            <b>담당자/문의</b>
            {{od.mng.name}}
            {{od.mng.tel}}
            {{od.mng.email}}
        </div>
        <h5>
            <b>{{od.created_at}}</b> &nbsp; 주문번호 {{od.od_no}} &nbsp;
            <order-step v-model="od.od_step" :order_config="order_config" />
        </h5>

        <b-container v-for="(pa, pa_id) in od.order_purchase_at" :key="pa_id" class="goods">
            
            <h4><b-icon-house></b-icon-house> {{pa.odpa_pa_name ? '업체' : '포사이언스'}} 배송</h4>

            <b-row v-for="(item, i_item) in pa.order_model" :key="`${pa_id}${i_item}`" :class="{option:item.odm_type == 'OPTION'}" class="gm_box">
                <template v-if="item.odm_type == 'MODEL'">
                    <b-col class="gd_img">
                        <div v-if="item.odm_type=='MODEL'">
                            <b-link v-if="item.odm_gd_id" :to="{name: 'goods_show', params:{gd_id:item.odm_gd_id} }">
                                <img :src="item.img_thumb_src" />
                            </b-link>
                            <img :src="item.img_thumb_src" v-else />
                        </div>
                        <b v-else>추가 옵션</b>
                    </b-col>
                    <b-col class="gd_txt">
                        <div class="explain">
                            <b-col>
                                <p class="gd_name">{{item.odm_gd_name}}</p>
                                <p><b class="m_hide">제품명:</b> {{item.odm_gm_name}} / <b class="m_hide">Cat.No.:</b> {{item.odm_gm_catno}}</p>
                                <p><b class="m_hide">모델명:</b> {{item.odm_gm_code}} / <b class="m_hide">판매단위:</b> {{item.odm_gm_unit}}</p>
                                <p><b class="m_hide">사양:</b> <span v-html="nl2br(item.odm_gm_spec)" /></p>
                                <p v-if="item.odm_dlvy_at"><b class="m_hide">납기:</b> {{item.odm_dlvy_at}}</p>
                            </b-col>
                            <b-col>
                                <template v-if="item.odm_type=='MODEL'">                                    
                                    <b-badge v-if="item.order_dlvy_info.oddi_receive_date" variant="light">수취완료</b-badge>
                                    <b-badge v-else-if="item.order_dlvy_info.oddi_arrival_date" variant="success">배송완료</b-badge>
                                    <b-badge v-else-if="item.order_dlvy_info.oddi_dlvy_num" variant="info">배송중</b-badge>
                                    <b-badge v-else variant="primary">준비중</b-badge>
                                    <br />
                                    <b-link v-if="item.order_dlvy_info.oddi_dlvy_num" class="dlvy_link"
                                        :href="getHref(item.order_dlvy_info.oddi_dlvy_com, item.order_dlvy_info.oddi_dlvy_num)"
                                    >{{item.order_dlvy_info.oddi_dlvy_com}} {{item.order_dlvy_info.oddi_dlvy_num}}</b-link>
                                    <br />
                                    
                                    <template v-if="!item.order_dlvy_info.oddi_receive_date"> <!-- 수취확인날짜가 없다면 -->
                                        <b-button v-if="od.od_step=='40' || od.od_step=='50'" class="teal xm"  @click="receiptConfirm(item)">수취확인</b-button>
                                    </template>
                                </template>
                            </b-col>
                        </div>

                        <div class="col_price">
                            <div class="price_box">
                                <span class="normal">{{item.odm_price | comma}}</span>
                            </div>
                            <font-awesome-icon icon="times" />
                            <div>{{item.odm_ea}}</div>
                            <font-awesome-icon icon="equals" />
                            <div class="price_box">
                                <span class="normal">{{item.odm_price*item.odm_ea | comma | won}}</span>
                            </div>
                        </div>
                        <div class="price_info">
                            <small v-if="item.odm_price_coupon_dc" class="price_dc">할인 - {{item.odm_price_coupon_dc*item.odm_ea | comma | won}}</small>
                            <small>부가세 별도</small>
                        </div>
                    </b-col>
                </template>
                <template v-else-if="item.odm_type == 'OPTION'">
                    <b-col class="gd_img">추가 옵션</b-col>
                    <b-col class="gd_txt">
                        <div class="explain">
                            <p class="gd_name"><b>{{item.odm_gm_name}}:</b> {{item.odm_gm_spec}}</p>
                        </div>

                        <div class="col_price">
                            <div class="price_box">
                                <span class="normal">{{item.odm_price | comma}}</span>
                            </div>
                            <font-awesome-icon icon="times" />
                            <div>{{item.odm_ea}}</div>
                            <font-awesome-icon icon="equals" />
                            <div class="price_box">
                                <span class="normal">{{item.odm_price*item.odm_ea | comma | won}}</span>
                            </div>
                        </div>

                        <div class="price_info">
                            <small v-if="item.odm_price_coupon_dc" class="price_dc">할인 - {{item.odm_price_coupon_dc*item.odm_ea | comma | won}}</small>
                            <small>부가세 별도</small>
                        </div>
                    </b-col>
                </template>
            </b-row>
            
            <b-row class="dlvy_box">
                <b-col class="text_box">
                    <template v-if="pa.odpa_pa_type == 'AIR'">항공운임료</template>
                    <template v-else>배송비</template>
                </b-col>
                <b-col class="price_box">{{pa.odpa_dlvy_p_add_vat | comma | won}}</b-col>
            </b-row>

        </b-container>
        
        <b-container class="total">
            <b-row>
                <b-col>상품금액</b-col>
                <b-col><b>{{od.od_gd_price+od.od_surtax | comma}}</b> 원</b-col>
            </b-row>
            <b-row>
                <b-col>배송료</b-col>      
                <b-col><b>{{od.od_dlvy_price | comma}}</b> 원</b-col>
            </b-row>
            <b-row>
                <b-col>결제예정금액</b-col> 
                <b-col><b>{{od.od_all_price | comma}}</b> 원</b-col>
            </b-row>
        </b-container>


        <b-container class="extra_info frm_st">
            <b-row>
                <b-col>
                    <b-row><b-col class="label_st">주문자명</b-col><b-col>{{od.od_orderer}}</b-col></b-row>
                    <b-row><b-col class="label_st">연락처</b-col><b-col>{{od.od_orderer_hp}}</b-col></b-row>
                    <b-row><b-col class="label_st">이메일</b-col><b-col>{{od.od_orderer_email}}</b-col></b-row>
                    <b-row><b-col class="label_st">직장/학교</b-col><b-col>{{od.od_company}}</b-col></b-row>
                    <b-row><b-col class="label_st od_part">부서/학과/연구실</b-col><b-col>{{od.od_part}}</b-col></b-row>
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
                            {{order_config.pay_method[od.od_pay_method]}}
                            <b-button v-if="od.order_pg && od.order_pg.pg_id" class="sm" @click="getReceipt">매출전표</b-button>
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
        
        <div class="btn_box" v-if="od.od_step < 60 && !isEmpty(od.od_mng)">
            <b-button class="black lg" @click="print">견적서 출력</b-button>
            <b-button class="gray lg" @click="downEstimateExcel">견적서 <span>EXCEL 다운</span></b-button>
            <b-button class="blue lg" @click="downTransactionExcel">거래명세서 <span>EXCEL 다운</span></b-button>
        </div>
    </div>
    
    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="500">
            <receipt-confirm :item="receiptItem" :coupon="od.order_coupon" @hide_modal="hide_modal" />
        </modal>
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
        'loading-modal'  : () =>   import('@/views/_common/LoadingModal.vue'),
        'order-step'     : () => import('../_comp/OrderStep.vue'),
        'modal'         : () => import('@/views/_common/Modal.vue'),
        'receipt-confirm': () => import('./_comp/ReceiptConfirm'),
    },
    data() {
        return {
            isModalViewed: false,
            isLoadingModalViewed: true,
            od:{
                order_extra_info:{},
            },
            order_config: {
                pay_method:[],
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

        goods_add_vat () {
            return Object.values(this.od.order_purchase_at).reduce((acc, el) => {
                return acc + el.order_model.reduce((acc02, el02) => {
                    return acc02 + ((el02.odm_price+Math.floor(el02.odm_price_coupon_dc*0.1))*el02.odm_ea);
                }, 0)
            }, 0);
        },
        goods_coupon_dc_add_vat () {
            return Object.values(this.od.order_purchase_at).reduce((acc, el) => {
                return acc + el.order_model.reduce((acc02, el02) => {
                    return acc02 + ((el02.odm_price_coupon_dc+Math.floor(el02.odm_price_coupon_dc*0.1))*el02.odm_ea);
                }, 0)
            }, 0);
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
            return this.order_config.delivery_com[com].replace('[송장번호]', num);
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
        getReceipt() {
            let tid = this.od.order_pg.pg_tid;
            let url = `https://iniweb.inicis.com/receipt/iniReceipt.jsp?noTid=${tid}`;
            if(this.od.order_pg.pg_pay_type.startsWith('psys'))
                url = this.order_config.url_receipt+'?tid='+this.base64_encode(tid);
            
            const regExp = /^https?:\/\//;
            if(regExp.test(tid))
                url = tid;
            this.openWinPop(url, 468, 750);
        },

        base64_encode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        },
    },
    async mounted() {
        const res = await ax.get(`/api/shop/order/${this.$route.params.od_id}`);
        if (res && res.status === 200) {
            this.od = res.data.od
            this.order_config = res.data.order_config;
            this.isLoadingModalViewed= false;
        }
    },

}
</script>

<style lang="css" scoped>
.w_fence { max-width:100%; padding:2rem; border:1px solid #CCC; border-radius:.5rem; margin-top: 3rem; }
.top { border-top:2px solid #363636; border-bottom:1px solid #B6B6B6; border-right:1px solid #B6B6B6; border-left:1px solid #B6B6B6; padding:0 2rem; line-height:4; word-spacing:20px; }
.goods { border-top:3px solid #4F637B; padding:1em 0; }
.goods:not(:first-child) { border-top:1px solid #AAA; }
.goods h4 { font-weight:bolder; font-size:1em; padding:1em 0; border-width:0; }
.goods .gm_box { margin-bottom:1em; align-items:flex-start; }
.goods .gm_box .gd_img { flex-basis:17%; max-width:17%; display:flex; align-items:center; justify-content:center; }
.goods .gm_box .gd_img img { width:100%; max-width:120px; height:auto; object-fit:contain; }

.goods .gm_box .gd_txt .explain { display:flex; }
.goods .gm_box .gd_txt .explain .col:last-child { flex:0 0 25%; max-width:25%; text-align:right; }
.goods .gm_box .gd_txt .explain .col p { margin:0; color:#999; }
.goods .gm_box .gd_txt .explain .col .gd_name { color:#000; font-weight:700; }
.goods .gm_box .gd_txt .explain .col .dlvy_link { background-color: #00a1cb; border-radius: .25rem; color: #fff; padding: 3px; display:inline-block; width:140px; text-align:center; word-break:break-word; }
.goods .gm_box .gd_txt .col_price { display:flex; align-items:center; justify-content:flex-end; }
.goods .gm_box .gd_txt .col_price svg { margin:0 .2em; }
.goods .gm_box .gd_txt .price_info { text-align:right; color:#999; }
.goods .gm_box .gd_txt .price_info .price_dc { display:block; color:#cc0000; }

.goods .dlvy_box { padding: 12px 16px; background: #f5f5f5; border-radius: 8px; }
.goods .dlvy_box .col { color:#9e9e9e; font-size:.9em; }
.goods .dlvy_box .price_box { text-align:right; }

.total { padding-bottom:0; }
.total .row { align-items:baseline; }
.total .row .col { font-size:.85em; color:#777; flex:0 0 25%; max-width:25%;}
.total .row .col:first-child { margin-left:auto; }
.total .row .col:nth-child(even) { text-align:right; }
.total .row .col:nth-child(even) b { font-size:1.35em; color:#000; }
.total .row.coupon_dc .col,
.total .row.coupon_dc .col b { color:#cc0000 !important; }

.extra_info { margin-top:3rem; font-size:.95rem;  }
.extra_info>.row>.col { border:1px solid #D7D7D7; padding:2%; }
.extra_info>.row>.col .label_st { flex-basis:88px; max-width:88px; padding-top:0; }
.extra_info>.row>.col .label_st.od_part { flex-basis:130px; max-width:130px; }
.extra_info>.row>.col:nth-of-type(1) { flex-basis:30%; max-width:30%; }
.extra_info>.row>.col:not(:nth-of-type(1)) { margin-left:-1px; }
.extra_info>.row>.col .row { margin-left: 0; margin-right: 0; }
@media (max-width: 992px){
    .w_fence { padding:.5rem; margin-top:1rem; }
    .top { padding:0 .3rem; line-height:1.75; word-spacing:6px; letter-spacing:-1px; }
    .goods .gm_box .gd_txt { padding-left:8px; }
    .goods .gm_box .gd_txt .explain { flex-direction:column; }
    .goods .gm_box .gd_txt .explain .col:last-child { flex:0 0 100%; max-width:100%; }
    .total .row .col { flex:0 0 50%; max-width:50%;}
    .extra_info { margin-top:1rem;  }
    .extra_info>.row>.col { flex:0 0 100% !important; max-width:100% !important; }
    .btn_box .lg { width:100px; }
    .btn_box .lg span { display:block; }
}

</style>
