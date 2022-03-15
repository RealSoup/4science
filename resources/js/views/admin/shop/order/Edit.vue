<template>
<div>
    <div class="actionArea">
        <b-input-group size="sm">
            <b-input-group-prepend class="bg-light btn_group">
                <b-button :to="{name: 'adm_order_index'}" variant="outline-secondary" class="mr-3">목록</b-button>
                <b-button variant="success" @click="estimateExcel">견적서<b-badge>E</b-badge></b-button>
                <b-button variant="outline-success" @click="estimatePdf">견적서<b-badge>P</b-badge></b-button>
                <b-button variant="warning" @click="transactionExcel">거래명세서<b-badge>E</b-badge></b-button>
                <b-button variant="outline-warning" @click="transactionPdf">거래명세서<b-badge>P</b-badge></b-button>
                <b-button variant="dark" @click="print">인쇄</b-button>
            </b-input-group-prepend>
            <b-input-group-prepend>
                <b-button v-if="od.od_mng < 1" @click="update('od_mng')">담당</b-button>
                <b-button v-else>{{od.od_mng_nm}}</b-button>
            </b-input-group-prepend>
            <b-form-select v-model="od.od_step">
                <b-form-select-option :value="null" disabled>◖주문 처리 단계◗</b-form-select-option>
                <b-form-select-option value="10">주문접수</b-form-select-option>
                <b-form-select-option-group label="---- 주문 수정 옵션 ----">
                    <b-form-select-option value="11">승인대기</b-form-select-option>
                    <b-form-select-option value="12">결제대기</b-form-select-option>
                </b-form-select-option-group>
                <b-form-select-option value="20">결제완료</b-form-select-option>

                <b-form-select-option-group label="---- 배송 옵션 ----">
                    <b-form-select-option value="30">배송준비</b-form-select-option>
                    <b-form-select-option value="31">배송중</b-form-select-option>
                    <b-form-select-option value="32">배송완료</b-form-select-option>
                </b-form-select-option-group>
                <b-form-select-option value="40">구매확정</b-form-select-option>

                <b-form-select-option-group label="---- 주문 실패 옵션 ----">
                    <b-form-select-option value="50">주문취소</b-form-select-option>
                    <b-form-select-option value="51">결제실패</b-form-select-option>
                </b-form-select-option-group>
            </b-form-select>
            <b-input-group-append><b-button @click="update('od_step')">변경</b-button></b-input-group-append>
        </b-input-group>
    </div>
    <div id="print_area">
        <div id="adm_order_edit">
            <b-card no-body class="shadow mt-3 od_header sticky-top">
                <div>
                    <b-badge>{{ od.od_id }}.</b-badge>
                    <span><font-awesome-icon icon="tags" />{{ od.od_no }}</span>
                    <span><font-awesome-icon icon="clock" />{{ od.created_at | formatDate }}</span>
                    <span><font-awesome-icon icon="user" />{{ od.od_orderer }}</span>
                    <span><font-awesome-icon icon="phone" />{{ od.od_orderer_hp }}</span>
                    <span><font-awesome-icon icon="at" />{{ od.od_orderer_email }}</span>
                </div>

            </b-card>



            <b-card header-tag="header" footer-tag="footer" class="shadow mt-3 order_goods_info">
                <template #header><b>주문 상품</b></template>

                <b-alert show v-for="(pa, pa_id, idx) in od.pa_list.lists" :key="'pa_id_'+pa_id" :variant="idx%2===0?'success':'info'">
                    <h5><b>{{pa.list[0].purchase_at ? pa.list[0].purchase_at.pa_name : '4SCIENCE'}}</b> 직배송 상품</h5>

                    <b-container fluid v-for="(gd, gd_idx) in pa.list" :key="'pa_id_'+pa_id+'gd_idx_'+gd_idx">
                        <b-row v-if="gd_idx != 0">
                            <b-col><hr /></b-col>
                        </b-row>
                        <b-row class="gd_info">
                            <b-col cols="3" class="goods">
                                <b-link :to="{name: 'adm_goods_edit', params: { gd_id:gd.gd_id }}"><img :src="gd.image_src_thumb[0]" /></b-link>
                                <div>
                                    <b>{{gd.gd_name}}</b>
                                    {{gd.maker.mk_name}}
                                </div>
                            </b-col>
                            <b-col>
                                <b-container fluid v-for="(gm, gm_idx) in gd.goods_model" :key="'pa_id_'+pa_id+'gd_idx_'+gd_idx+'gm_idx_'+gm_idx">
                                    <b-row class="model mb-2">
                                        <b-col xl="8" lg="6" class="model_info">
                                            {{gm.gm_name}}
                                            <b>{{gm.gm_code}}</b>
                                            [{{gm.gm_catno}}]
                                            <b>{{gm.gm_spec}}</b>
                                            ({{gm.gm_unit}})
                                        </b-col>
                                        <b-col class="model_price text-right">
                                            {{gm.odm_price_add_vat | comma}} 원
                                            <font-awesome-icon icon="times" />
                                            <!-- <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> -->
                                            {{gm.ea | comma}} 개
                                            <font-awesome-icon icon="equals" />
                                            <b class="md_multi">{{gm.odm_price_add_vat*gm.ea | comma}} 원</b>
                                        </b-col>
                                    </b-row>
                                </b-container>

                                <b-container fluid v-for="(opc, opc_idx) in gd.option_child" :key="'pa_id_'+pa_id+'gd_idx_'+gd_idx+'opc_idx_'+opc_idx">
                                    <b-row v-if="opc_idx == 0">
                                        <b-col><hr /></b-col>
                                    </b-row>
                                    <b-row class="option mb-2">
                                        <b-col cols="6" class="option_info">
                                            {{opc.option.op_name}}: {{opc.opc_name}}
                                        </b-col>
                                        <b-col class="option_price text-right">
                                            {{opc.odo_price_add_vat | comma}} 원
                                            <font-awesome-icon icon="times" />
                                            <!-- <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> -->
                                            {{opc.ea | comma}} 개
                                            <font-awesome-icon icon="equals" />
                                            <b class="opc_multi">{{opc.odo_price_add_vat*opc.ea | comma}} 원</b>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-container fluid>
                        <b-row align-h="end">
                            <b-col lg="3" md="6" sm="12" class="text-right gd_total_price">
                                <b-alert show variant="light" class="mt-4">
                                    <div>상품 : <b>{{pa.price.goods_add_vat | comma}} 원</b></div>
                                    <div>배송료 : <b>{{pa.price.dlvy_add_vat | comma}} 원</b></div>
                                    <div v-if="pa.price.air_add_vat">항공운임료 : <b>{{pa.price.air_add_vat | comma}} 원</b></div>
                                </b-alert>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-alert>
                <template #footer>
                    <b-container fluid>
                        <b-row>
                            <b-col cols="6"><h5><b>총 금액</b></h5></b-col>
                            <b-col cols="6" class="text-right final_price">
                                <p>상품 : <b>{{od.od_gd_price | comma}} 원</b></p>
                                <p>배송비 : <b>{{od.od_dlvy_price | comma}} 원</b></p>
                                <p v-if="od.od_air_price">항공운임료 : <b>{{od.od_air_price | comma}} 원</b></p>
                                <p>총금액 : <b>{{od.od_all_price | comma}} 원</b></p>
                            </b-col>
                        </b-row>
                    </b-container>
                </template>
            </b-card>

            <b-card header-tag="header" header-class="py-2" body-class="py-2" class="shadow mt-3 receiver_info">
                <template #header><b>배송 정보 / 결제 정보</b></template>
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <font-awesome-icon icon="user" /> <span class="mr-3">{{ od.od_receiver }}</span>
                            <font-awesome-icon icon="phone" /> <span class="mr-3">{{ od.od_receiver_hp }}</span>
                            <font-awesome-icon icon="map-marked-alt" /> <span class="mr-3">{{ od.od_zip }}<b>,</b> {{ od.od_addr1 }}<b>,</b> {{ od.od_addr2 }}</span>

                            <p>
                                <font-awesome-icon icon="info" /> <span>{{ od.od_memo }}</span>
                            </p>
                        </b-col>
                    </b-row>
                    <hr />
                    <b-row>
                        <b-col>
                            <b-badge>결제수단</b-badge>
                            <span v-if="od.od_pay_method == 'C'">
                                <b-badge variant="light">카드</b-badge>
                            </span>
                            <span v-else-if="od.od_pay_method == 'B'">
                                <b-badge variant="light">계좌이체</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_finance_type == 'K'">국민은행</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_finance_type == 'W'">우리은행</b-badge>
                                <b-badge variant="light">{{od.order_extra_info.oex_depositor}}</b-badge>
                                <b-badge variant="light">{{payPlanDisplay}} 결제</b-badge>
                            </span>
                            <span v-else-if="od.od_pay_method == 'P'">
                                <b-badge variant="light">PSYS</b-badge>
                                <b-badge variant="light">{{od.order_extra_info.oex_depositor}}</b-badge>
                                <b-badge variant="light">{{payPlanDisplay}} 결제</b-badge>
                            </span>
                            <span v-else-if="od.od_pay_method == 'S'">
                                <b-badge variant="light">전표</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_finance_type == 'SH'">신한</b-badge>
                                <b-badge variant="light" v-else-if="od.order_extra_info.oex_finance_type == 'BC'">BC</b-badge>
                                <b-badge variant="light" v-else-if="od.order_extra_info.oex_finance_type == 'SS'">삼성</b-badge>
                                <b-badge variant="light" v-else>{{od.order_extra_info.oex_finance_type}}</b-badge>
                                <b-badge variant="light">{{payPlanDisplay}} 결제</b-badge>
                            </span>
                            <span v-else-if="od.od_pay_method == 'E'">에스크로</span>

                            <b-badge >구매환경</b-badge>
                            <span v-if="od.od_sale_env == 'P'">웹</span>
                            <span v-else-if="od.od_sale_env == 'M'">모바일</span>

                            <b-badge>요청서류</b-badge>
                            <span>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_est == 'Y'">견적서</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_tran == 'Y'">거래명세서</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_biz == 'Y'">사업자 등록증 사본</b-badge>
                                <b-badge variant="light" v-if="od.order_extra_info.oex_req_bank == 'Y'">통장사본</b-badge>
                                <b-badge variant="warning" v-if="od.order_extra_info.oex_req_est == 'N' && od.order_extra_info.oex_req_tran == 'N' && od.order_extra_info.oex_req_biz == 'N' && od.order_extra_info.oex_req_bank == 'N'">없음</b-badge>
                            </span>
                        </b-col>
                    </b-row>
                    <hr />
                    <b-row v-if="od.od_pay_method == 'B' || od.od_pay_method == 'E'">
                        <b-col cols="4">
                            <b-badge>지출증빙</b-badge>
                            <span v-if="od.order_extra_info.oex_type == 'IV'">
                                <b-alert show variant="success">
                                    <h5 class="alert-heading">세금계산서</h5>

                                    <template v-if="od.file_info">
                                        <template v-if="checkImage(od.file_info.ext)">
                                            <b-button @click="isModalViewed = !isModalViewed">사업자 등록증 보기</b-button>
                                            <transition name="fade">
                                                <Modal v-if="isModalViewed" @close-modal="isModalViewed = false">
                                                    <img :src="od.file_info.path" @click="fileDown(od.file_info.fi_original, od.file_info.path)" style="max-width: 100%; height: auto;"/>
                                                </Modal>
                                            </transition>
                                        </template>
                                        <template v-else>
                                            <b-button @click="fileDown(od.file_info.fi_original, od.file_info.path)">사업자 등록증 다운로드</b-button>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <b-badge variant="light">법인명: {{od.order_extra_info.oex_biz_name}}</b-badge><b>,</b>
                                        <b-badge variant="light">등록번호: {{od.order_extra_info.oex_biz_num}}</b-badge><b>,</b>
                                        <b-badge variant="light">업태: {{od.order_extra_info.oex_biz_type}}</b-badge><b>,</b>
                                        <b-badge variant="light">종목: {{od.order_extra_info.oex_biz_item}}</b-badge><b>,</b>
                                        <b-badge variant="light">대표자: {{od.order_extra_info.oex_ceo}}</b-badge><b>,</b>
                                        <b-badge variant="light">소재지: {{od.order_extra_info.oex_addr}}</b-badge><b>,</b>
                                        <b-badge variant="light">요청사항: {{od.order_extra_info.oex_requirement}}</b-badge><b>,</b>
                                    </template>
                                    <b-badge variant="light">담당자: {{od.order_extra_info.oex_mng}}</b-badge><b>,</b>
                                    <b-badge variant="light">담당이메일: {{od.order_extra_info.oex_email}}</b-badge><b>,</b>
                                    <b-badge variant="light">담당HP: {{od.order_extra_info.oex_num}}</b-badge>
                                </b-alert>
                            </span>
                            <span v-else-if="od.order_extra_info.oex_type == 'HP'">
                            </span>
                            <span v-else-if="od.order_extra_info.oex_type == 'CN'">
                            </span>
                            <span v-else-if="od.order_extra_info.oex_type == 'BN'">
                            </span>
                            <span v-else-if="od.order_extra_info.oex_type == 'NO'">
                                <b-badge variant="warning">없음</b-badge>
                            </span>

                        </b-col>
                    </b-row>

                </b-container>
            </b-card>

        </div>

    </div>
</div>
</template>
<script>
import ax from '@/api/http';
import router from '@/router';

var dt = new Date();
export default {
    name: 'edit',
    components: {
        'Modal': () => import('@/views/_common/Modal.vue'),
    },
    data() {
        return {
            isModalViewed: false,
            od: {
                order_extra_info:{},
                pa_list: {
                    price: { },
                },
            },
        };
    },
    computed: {
        payPlanDisplay() {
            var plan = this.od.order_extra_info.oex_pay_plan;
            var returnMsg = '';
            if (plan == 'soon')         returnMsg = '선';
            else if (plan == 'week1')   returnMsg = '1주이내';
            else if (plan == 'week2')   returnMsg = '2주이내';
            else if (plan == 'month1')  returnMsg = '한달이내';
            else if (plan == 'month2')  returnMsg = '2개월이내';

            return returnMsg;
        },
    },
    methods: {
        async edit(){
            try {
                const res = await ax.get(`/api/admin/shop/order/${this.$route.params.od_id}/edit`);
                if (res && res.status === 200) {
                    this.od = res.data;
                    this.loaded = true;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(type){
            try {
                this.od = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.od, // 수정하려는 객체
                    {_method : 'PATCH', type: type} // 삽입하려는 내용
                );

                if (type == 'od_mng') {
                    this.od.od_mng = this.auth().id;
                    this.od.od_mng_nm = this.auth().name;
                }
                const res = await ax.post(`/api/admin/shop/order/${this.$route.params.od_id}`, this.od);
                if (res && res.status === 200 && res.data.msg === 'success') {
                    if (type == 'od_mng') {
                        Notify.toast('success', '담당 배정 완료');
                    } else if (type == 'od_step') {
                        Notify.toast('success', '주문 처리 단계 수정');
                    }
                } else
                    Notify.toast('warning', '수정 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response);
            }
        },
        async fileDown(name, src){
            try {
                const res = await ax.get(src, { responseType: 'blob' });
                let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileUrl;

                fileLink.setAttribute('download', name);
                document.body.appendChild(fileLink);

                fileLink.click();
                // console.log(res.data);
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async print () {
            await this.$htmlToPaper('print_area', {styles:[
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/css/fontawesome_svg.css',
                '/css/adm_shop_order_edit.css'
            ]});
        },
        async estimateExcel(){
            try {
                this.mngChk();
                const res = await ax.get(`/api/admin/shop/order/exportEstimateExcel/${this.$route.params.od_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.xlsx');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async estimatePdf(){
            try {
                this.mngChk();
                const res = await ax.get(`/api/admin/shop/order/exportEstimatePdf/${this.$route.params.od_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.pdf');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async transactionExcel(){
            try {
                this.mngChk();
                const res = await ax.get(`/api/admin/shop/order/exportTransactionExcel/${this.$route.params.od_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.xlsx');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async transactionPdf(){
            try {
                this.mngChk();
                const res = await ax.get(`/api/admin/shop/order/exportTransactionPdf/${this.$route.params.od_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.pdf');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        orderDocumentDown(res, fileNm){
            let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileUrl;
            fileLink.setAttribute('download', fileNm);
            document.body.appendChild(fileLink);
            fileLink.click();
        },
        mngChk(){
            if (!this.od.od_mng) {
                Notify.modal('담당자 배정 이후에 사용가능합니다.');
                return false;
            }
        },
    },
    mounted() {
        this.edit();
    },
}
</script>

<style media="screen">
/* @import '/css/adm_shop_order_edit.css';*/

#adm_order_edit .badge { font-size:100%; }
#adm_order_edit .od_header { padding:0.3rem 15px; z-index:999; }
#adm_order_edit .od_header span { margin-right:1rem; }
#adm_order_edit .od_header span.badge { margin-right:2rem; }
#adm_order_edit .od_header span svg { margin-right:0.5rem; }
.actionArea { position:sticky; top:0; z-index:1021; }
.actionArea .input-group { position:absolute; top:2px; right:0; max-width:690px; }
@media (max-width: 992px) {
    .actionArea { position:static; }
    .actionArea .input-group { position:static; max-width:none; }
}

#adm_order_edit .order_goods_info .gd_info .goods a { margin-right:1rem; }
#adm_order_edit .order_goods_info .gd_info .goods a img { /*width:60px; height:60px; object-fit:cover;*/ max-width:100px; }
#adm_order_edit .order_goods_info .gd_info .goods div { display:inline-block; }
#adm_order_edit .order_goods_info .gd_info .model .model_info b { margin:0 0.8rem; }
#adm_order_edit .order_goods_info .gd_info .model .model_price .md_multi { min-width:6rem; display:inline-block; }
#adm_order_edit .order_goods_info .gd_info .option .option_price .opc_multi { min-width:6rem; display:inline-block; }
#adm_order_edit .order_goods_info .final_price p b,
#adm_order_edit .order_goods_info .gd_total_price b { min-width:6rem; display:inline-block; }
#adm_order_edit .receiver_info .col>.badge + span { margin-right:2rem; }
#adm_order_edit .receiver_info .col>.badge + span b { font-size:2rem; }

#adm_order_edit .receiver_info .col .fade-enter-active,
#adm_order_edit .receiver_info .col .fade-leave-active { transition: opacity .001s; }
#adm_order_edit .receiver_info .col .fade-enter,
#adm_order_edit .receiver_info .col .fade-leave-to { opacity: 0; }
#adm_order_edit .receiver_info .rs_modal-card { max-width:800px; text-align:center; overflow-y:scroll; }

</style>
