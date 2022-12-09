<template>
    <div id="adm_estimate_show" class="p_wrap">
        <h3 class="p_tit">견적 응답</h3>
        <b-card no-body class="ctrl">
            <b-container>
                <b-row>
                    <b-col>
                        <b-button-group size="sm">
                            <b-button :to="{name: 'adm_estimate_index'}"><b-icon-list-ul /> 목록</b-button>
                            <b-dropdown size="sm" text="파일 출력" variant="warning">
                                <b-dropdown-item-button variant="success" @click="estimateExcel">견적서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                                <b-dropdown-item-button variant="warning" @click="estimatePdf">견적서 <b-badge>PDF</b-badge></b-dropdown-item-button>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item-button variant="success" @click="transactionExcel">거래명세서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                                <b-dropdown-item-button variant="warning" @click="transactionPdf">거래명세서 <b-badge>PDF</b-badge></b-dropdown-item-button>
                            </b-dropdown>
                            <b-button variant="dark" @click="print">인쇄</b-button>
                        </b-button-group>
                    </b-col>
                    <b-col class="text-right">
                        <b-button-group size="sm">
                            <b-button variant="dark" @click="passOrder"><b-icon-box-arrow-up-right /> 임의주문</b-button> 
                            <!-- <b-button variant="info" @click="onlineBooks"><b-icon-journal-bookmark-fill /> 영업장부</b-button> -->
                            <b-button variant="primary" @click="reSend"><b-icon-mailbox /> 재발송</b-button>
                            <b-button variant="success" :to="{name: 'adm_estimate_create', query: { eq_id:frm.estimate_req.eq_id }}"><b-icon-pencil-square /> 재작성</b-button>
                            <b-button variant="warning" :to="{name: 'adm_estimate_edit', params: { er_id:$route.params.er_id }}"><b-icon-tools /> 수정</b-button>
                            <b-button variant="danger" @click="destroy"><b-icon-trash-fill /> 삭제</b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-alert show variant="primary" class="container user_info mt-4">
            <h4 class="alert-heading">요청자</h4>
            <hr>
            <b-row>
                <b-col>
                    <div>
                        <span v-b-tooltip.hover title="요청번호"><font-awesome-icon icon="tags" />{{ frm.estimate_req.eq_id }}</span>
                        <span v-b-tooltip.hover title="요청일"><b-icon-calendar-date />{{ frm.estimate_req.created_at }}</span>
                        <span v-b-tooltip.hover title="요청단계"><b-icon-bar-chart-steps />
                            <template v-if="frm.estimate_req.eq_step === 'DONOT'">미처리</template>
                            <template v-else-if="frm.estimate_req.eq_step === 'DOING'">처리중</template>
                            <template v-else-if="frm.estimate_req.eq_step === 'DONE'">완료</template>
                            <template v-else-if="frm.estimate_req.eq_step === 'CANCEL'">취소</template>
                        </span>
                    </div>

                    <div>
                        <span v-b-tooltip.hover title="요청자">
                            <font-awesome-icon icon="user" />
                            {{ frm.estimate_req.eq_name }}
                            <b-button v-if="frm.estimate_req.created_id" variant="outline-primary" size="xm" :to="{name: 'adm_user_edit', params: { id:frm.estimate_req.created_id }}">
                                <b-icon-link45deg />
                            </b-button>
                        </span>
                        <span v-b-tooltip.hover title="요청자 소속"><font-awesome-icon icon="users" />{{ frm.estimate_req.eq_department }}</span>
                    </div>
                    <div>
                        <span v-b-tooltip.hover title="전화번호"><font-awesome-icon icon="phone" />{{ frm.estimate_req.eq_tel }}</span>
                        <span v-b-tooltip.hover title="핸드폰"><font-awesome-icon icon="mobile-alt" />{{ frm.estimate_req.eq_hp }}</span>
                        <span v-b-tooltip.hover title="팩스"><font-awesome-icon icon="fax" />{{ frm.estimate_req.eq_fax }}</span>
                        <span v-b-tooltip.hover title="이메일"><font-awesome-icon icon="at" />{{ frm.estimate_req.eq_email }}</span>
                    </div>

                    <div>
                        <span v-b-tooltip.hover title="내용">
                            <font-awesome-icon icon="comment-dots" />
                            <p v-html="nl2br(frm.estimate_req.eq_content)"></p>
                        </span>
                    </div>
                </b-col>
            </b-row>
        </b-alert>

        <b-alert show variant="info" class="container user_info">
            <h4 class="alert-heading">견적 정보</h4>
            <hr>
            <b-row>
                <b-col>
                    <div>
                        <span v-b-tooltip.hover title="견적번호"><font-awesome-icon icon="tags" />{{ frm.er_id }}</span>
                        <span v-b-tooltip.hover title="견적일"><b-icon-calendar-date />{{ frm.created_at }}</span>

                        <span v-b-tooltip.hover title="납품기일"><font-awesome-icon icon="dolly-flatbed" />{{ frm.er_dlvy_at }}</span>
                        <span v-b-tooltip.hover title="견적서 유효기간"><b-icon-stopwatch-fill />{{ frm.er_effective_at }}</span>

                        <span v-if="frm.er_step === 0"><b-icon-bar-chart-steps /> 임시저장</span>
                    </div>

                    <div>
                        <span v-b-tooltip.hover title="담당자"><font-awesome-icon icon="user" />{{ frm.user.name }}</span>
                        <span v-b-tooltip.hover title="전화번호"><font-awesome-icon icon="phone" />{{ frm.user.tel }}</span>
                        <span v-b-tooltip.hover title="이메일"><font-awesome-icon icon="at" />{{ frm.user.email }}</span>
                    </div>
                    <div>
                        <span v-b-tooltip.hover title="내용">
                            <font-awesome-icon icon="comment-dots" />
                            <p v-html="nl2br(frm.er_content)"></p>
                        </span>
                    </div>
                    <div v-if="frm.file_info && frm.file_info.length">
                        <span>
                            <b-icon icon="file-earmark-arrow-down-fill"></b-icon>
                            <template v-for="(file, i) in frm.file_info">
                                <b-button size="sm" variant="outline-info" class="mr-2" @click="fileDown(file.path, file.fi_original)">{{file.fi_original}}</b-button>
                                <b v-if="i != Object.keys(frm.file_info).length - 1"> </b>
                            </template>
                        </span>
                    </div>
                </b-col>
            </b-row>
        </b-alert>


        
        <b-card class="gd_box" v-if="frm.estimate_model && frm.estimate_model.length">
            <div class="tit">견적 상품</div>
            <b-container v-for="(pa, pa_i) in frm.collect.lists" :key="`pa_${pa_i}`">
                <h5>
                    <template v-if="pa.list[0].purchase_at">{{pa.list[0].purchase_at.pa_name}} <b>직배송 상품</b></template>
                    <template v-else>4SCIENCE</template>
                </h5>

                <b-row v-for="(gd, gd_idx) in pa.list" :key="`gd_${gd_idx}`">
                    <b-col>                        
                        <b-row v-for="em in gd.estimate_model" :key="em.em_id" class="gd_list">
                            <b-col>
                                <b-button variant="outline-primary" size="sm" :to="{name: 'adm_goods_edit', params: { gd_id:em.em_gd_id }}">
                                    <b-icon-link45deg />
                                </b-button>
                                <b class="gd_name">{{em.em_name}}</b>
                                <b class="divider">/</b>
                                {{em.em_code}}
                                <b class="divider">/</b>
                                {{em.em_catno}}
                                <b class="divider">/</b>
                                {{em.em_maker}}
                                <b class="divider">/</b>
                                {{em.em_unit}}
                            </b-col>
                            <b-col>{{em.em_spec}}</b-col>
                            <b-col tag="i">
                                {{em.em_price | comma}} 원 <font-awesome-icon icon="times" />
                                {{em.em_ea | comma}} 개 <font-awesome-icon icon="equals" />
                                <b class="multi">{{em.em_price*em.em_ea | comma}} 원</b>
                            </b-col>
                            <b-col cols="12" v-if="em.estimate_option.length" class="opc">
                                <b-row v-for="option in em.estimate_option" :key="option.eo_id">
                                    <b-col offset="6">{{option.eo_tit}}: {{option.eo_name}}</b-col>
                                    <b-col tag="i">
                                        {{option.eo_price | comma}} 원 <font-awesome-icon icon="times" />
                                        {{option.eo_ea | comma}} 개 <font-awesome-icon icon="equals" />
                                        <b class="multi">{{option.eo_price*option.eo_ea | comma}} 원</b>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-alert show variant="dark" class="container price_info">
            <b-row>
                <b-col class="text-right">
                    <div>합계: <span>{{ frm.er_gd_price | comma }}</span></div>
                    <div>부가세: <span>{{ frm.er_surtax | comma }}</span></div>
                    <div>배송료: <span>{{ frm.er_dlvy_price | comma }}</span></div>
                    <div v-if="frm.er_air_price">항공운임료: <span>{{ frm.er_air_price | comma }}</span></div>
                    <div>최종 결제금액: <span>{{ frm.er_all_price | comma }}</span></div>
                </b-col>
            </b-row>
        </b-alert>
    </div>
</template>

<script>
import ax from '@/api/http';

var dt = new Date();
export default {
    data() {
        return {
            frm:{
                collect:{
                    lists:{},
                    price:{}
                },
                estimate_req:{},
                user:{},
                price: {},

            },
        }
    },
    methods: {
        async show() {
            try {
                const res = await ax.get(`/api/admin/shop/estimate/${this.$route.params.er_id}`, { params: {type:'reply'}});
                if (res && res.status === 200) {
                    this.frm = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async destroy(){
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst) {
                try {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    frm.append("type", 'reply');
                    const res = await ax.post(`/api/admin/shop/estimate/${this.$route.params.er_id}`, frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '견적서 삭제')
                        this.$router.push({ name: 'adm_estimate_index' })
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
///////////////////////////////////////////////////////////////////////////////////////////
        print () {
            var url = `/api/admin/shop/estimate/showEstimate/${this.$route.params.er_id}/?type=print`;
            var name = "견적서 인쇄";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
        async estimateExcel(){
            try {
                const res = await ax.get(`/api/admin/shop/estimate/exportEstimateExcel/${this.$route.params.er_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.xlsx');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async estimatePdf(){
            try {
                const res = await ax.get(`/api/admin/shop/estimate/exportEstimatePdf/${this.$route.params.er_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.pdf');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async transactionExcel(){
            try {
                const res = await ax.get(`/api/admin/shop/estimate/exportTransactionExcel/${this.$route.params.er_id}`, { responseType: 'blob' });
                this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.xlsx');
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async transactionPdf(){
            try {
                const res = await ax.get(`/api/admin/shop/estimate/exportTransactionPdf/${this.$route.params.er_id}`, { responseType: 'blob' });
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
        async reSend(){
            try {
                const res = await ax.post(`/api/admin/shop/estimate/reSend/${this.$route.params.er_id}`, this.frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '재발송 완료');
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },

        async onlineBooks() {
            try {
                this.frm.data_type="EST";
                const res = await ax.post(`/api/admin/ledger`, this.frm);
                if (res && res.status === 200) {
                    this.$router.push({ name: 'adm_ledger' })
                } else
                    Notify.toast('warning', '기록 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response);
            }
        },

        async passOrder() {
            try {
                const res = await ax.post(`/api/admin/shop/order`, this.frm);
                if (res && res.status === 200)  this.$router.push({ name: 'adm_order_index' })
                else                            Notify.toast('warning', '기록 실패');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response);
            }
        }

    },
    mounted() {
        this.show();
    },
}
</script>

<style lang="css" scoped>
#adm_estimate_show .user_info { padding-top:1rem; box-shadow:3px 2px 2px 0px; border:1px solid #EDEDED; }
#adm_estimate_show .user_info .col div { margin:1rem; }
#adm_estimate_show .user_info .col div span { margin-right:1rem; }
#adm_estimate_show .user_info .col div span>svg { margin-right:0.5rem; }

#adm_estimate_show .gd_box .gd_list:not(:last-of-type) { border-bottom:1px solid #eee; }
#adm_estimate_show .gd_box .gd_list .col { padding-top:10px; padding-bottom:10px; }
#adm_estimate_show .gd_box .gd_list .col .btn { margin-right:10px; }
#adm_estimate_show .gd_box .gd_list .col .divider { font-size:1.6rem; font-weight:bold; color:#b81717; padding:0 5px; position:relative; top:3px; line-height:14px; }
#adm_estimate_show .gd_box .gd_list i { text-align:right; }
#adm_estimate_show .gd_box .gd_list .col .multi { min-width:6rem; display:inline-block; }
#adm_estimate_show .gd_box .gd_list>.col:nth-child(2),
#adm_estimate_show .gd_box .gd_list .opc .row div { background-color:#7fffd454; } 
#adm_estimate_show .gd_box .gd_list .opc { border-top:1px solid #eee; }

#adm_estimate_show .gd_box .gd_list .col:nth-child(2),
#adm_estimate_show .gd_box .gd_list .col:nth-child(3) { flex:0 0 25%; max-width:25%; }

#adm_estimate_show .price_info .row .col span { display:inline-block; min-width:10rem; font-weight:bold; color:#C10000; font-size:1.3rem; }
</style>
