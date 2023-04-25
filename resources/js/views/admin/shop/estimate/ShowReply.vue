<template>
<div id="adm_estimate_show" class="p_wrap">
    <h3 class="p_tit">견적 응답</h3>
    <div class="act_ctrl">
        <b-row cols="1" cols-md="2">
            <b-col class="def_info">
                <span>견적번호</span> <b>{{frm.er_id}}.</b>
                <span>견적일자</span> <b>{{ frm.created_at }}</b>
            </b-col>
            <b-col class="btn_area">
                <b-button class="white sm" :to="{name: 'adm_estimate_index'}"><b-icon-list /> 목록으로</b-button>
                <b-button class="black sm" @click="passOrder"><b-icon-box-arrow-up-right /> 임의주문</b-button> 
                <b-button class="gray sm" @click="reSend"><font-awesome-icon icon="paper-plane" /> 재발송</b-button>
                <b-button class="d_blue sm" :to="{name: 'adm_estimate_create', query: { eq_id:frm.estimate_req.eq_id, er_id:$route.params.er_id }}">
                    <b-icon-arrow-clockwise/> 재작성
                </b-button>
                <b-button class="blue sm" :to="{name: 'adm_estimate_edit', params: { er_id:$route.params.er_id }}">
                    <b-icon-pencil-square /> 수정
                </b-button>

                <b-dropdown size="sm" text="파일 다운" variant="outline-dark">
                    <b-dropdown-item-button variant="success" @click="estimateExcel">견적서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                    <b-dropdown-item-button variant="warning" @click="estimatePdf">견적서 <b-badge>PDF</b-badge></b-dropdown-item-button>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item-button variant="success" @click="transactionExcel">거래명세서 <b-badge>EXCEL</b-badge></b-dropdown-item-button>
                    <b-dropdown-item-button variant="warning" @click="transactionPdf">거래명세서 <b-badge>PDF</b-badge></b-dropdown-item-button>
                </b-dropdown>
                <b-button @click="print" class="sm">인쇄</b-button>
                <b-button class="red sm" @click="destroy"><b-icon icon="trash-fill" /> 삭제</b-button>
            </b-col>
        </b-row>
    </div>

    <div class="box est_frm">
        <h5>요청자 정보</h5>
        <b-row>
            <b-col>견적요청번호</b-col><b-col>{{ frm.estimate_req.eq_id }}</b-col>
            <b-col>요청일자</b-col><b-col>{{ frm.estimate_req.created_at }}</b-col>
        </b-row>
        <b-row>
            <b-col>요청자</b-col>
            <b-col>
                <b-link v-if="frm.estimate_req.created_id" @click="openWinPop(`/admin/user/${frm.estimate_req.created_id}/edit`, 1700, 900)">
                    {{ frm.estimate_req.eq_name }}
                </b-link>
                <template v-else>{{ frm.estimate_req.eq_name }}</template>
            </b-col>
            <b-col>연락처</b-col><b-col>{{ frm.estimate_req.eq_hp }}<span v-if="frm.estimate_req.eq_tel"> / {{ frm.estimate_req.eq_tel }}</span> </b-col>
        </b-row>
        <b-row>
            <b-col>소속</b-col><b-col>{{ frm.estimate_req.eq_department }}</b-col>
            <b-col>이메일</b-col><b-col>{{ frm.estimate_req.eq_email }}</b-col>
        </b-row>
        <b-row>
            <b-col>문의사항</b-col>
            <b-col><p v-html="nl2br(frm.estimate_req.eq_content)" /></b-col>
        </b-row>
        <b-row>
            <b-col>첨부파일</b-col>
            <b-col>
                <b-button v-for="(file, i) in frm.estimate_req.file_info" class="white sm mr-2" @click="fileDown(file.down_path, file.fi_original)" :key="i">
                    {{file.fi_original}}
                </b-button>
            </b-col>
        </b-row>
    </div>

    <div class="box gd_list" v-if="frm.estimate_model && frm.estimate_model.length">
        <h5>견적상품정보</h5>
        <b-row class="list head">
            <b-col>주문 상품</b-col>
            <b-col>Cat.No/모델명</b-col>
            <b-col>제조사</b-col>
            <b-col>판매단위</b-col>
            <b-col>단가</b-col>
            <b-col>수량</b-col>
            <b-col>합계</b-col>
        </b-row>
        <b-row v-for="em in frm.estimate_model" :key="em.em_id" class="list body">
            <b-col>
                <b-link @click="openWinPop(`/admin/shop/goods/${em.gd_id}/edit`, 1700, 900)"><img :src="em.img_src" /></b-link>
                <div>
                    <b class="gd_name">{{em.em_name}}</b>
                    <p v-html="nl2br(em.em_spec)" />
                    <p v-if="em.dlvy_at">납기 : {{em.dlvy_at}}</p>
                </div>
            </b-col>
            <b-col>
                {{em.em_catno}}<br>
                {{em.em_code}}
            </b-col>
            <b-col>{{em.em_maker}}</b-col>
            <b-col>{{em.em_unit}}</b-col>
            <b-col>{{em.em_price | comma}}</b-col>
            <b-col>{{em.em_ea | comma}}</b-col>
            <b-col class="em_sum">
                {{em.em_price*em.em_ea | comma}}
                <b-form-checkbox button v-model="em.dlvy_all_in" @change="DlvyAllIn(em.em_id)">배송비 포함</b-form-checkbox>
            </b-col>
            
            <b-col cols="12" v-if="em.estimate_option.length" class="opc">
                <b-row v-for="option in em.estimate_option" :key="option.eo_id">
                    <b-col offset="6">{{option.eo_tit}}: {{option.eo_name}}</b-col>
                    <b-col tag="i">수량 : <b>{{option.eo_ea | comma}}</b> 개</b-col>
                </b-row>
            </b-col>
        </b-row>
        <div class="sum_up">
            <div class="top_border" />
            <b-row class="total">
                <b-col>상품금액</b-col>
                <b-col><b>{{(frm.er_gd_price+frm.er_surtax) | comma | won}}</b></b-col>
                <b-col>배송료</b-col>
                <b-col><b>{{frm.er_dlvy_price | comma | won}}</b></b-col>
                <b-col>결제 예정 금액</b-col>
                <b-col><b>{{frm.er_all_price| comma | won}}</b></b-col>
            </b-row>
            <b-row class="total_sub">
                <b-col>
                    <div>
                        <b-col>상품가</b-col><b-col>{{frm.er_gd_price | comma | won}}</b-col>
                    </div>
                    <div>
                        <b-col>부가세</b-col><b-col>{{frm.er_surtax | comma | won}}</b-col>
                    </div>
                </b-col>
                <b-col>
                    <div>
                        <b-col>포사이언스 배송</b-col><b-col>{{dlvy_4s | comma}}</b-col>
                    </div>
                    <div>
                        <b-col>업체 배송</b-col><b-col>{{dlvy_other | comma}}</b-col>
                    </div>
                </b-col>
                <b-col></b-col>
            </b-row>
        </div>
    </div>

    <div class="box est_frm">
        <h5>견적서 정보</h5>
        <b-row>
            <b-col>견적번호</b-col><b-col>{{ frm.er_id }}</b-col>
            <b-col>견적일자</b-col><b-col>{{ frm.created_at }}</b-col>
            <b-col>견적유효기간</b-col><b-col>{{ frm.er_effective_at }}</b-col>
        </b-row>
        <b-row>
            <b-col>담당자</b-col><b-col>{{ frm.user.name }}</b-col>
            <b-col>전화번호</b-col><b-col>{{ frm.user.tel }}</b-col>
            <b-col>이메일</b-col><b-col>{{ frm.user.email }}</b-col>
        </b-row>
        <b-row>
            <b-col>납품기일</b-col><b-col>{{ frm.er_dlvy_at }}</b-col>
        </b-row>
        <b-row>
            <b-col>추가정보</b-col>
            <b-col><p v-html="nl2br(frm.er_content)" /></b-col>
        </b-row>
        <b-row>
            <b-col>첨부파일</b-col>
            <b-col>
                <b-button v-for="(file, i) in frm.file_info" class="white sm mr-2" @click="fileDown(file.down_path, file.fi_original)" :key="i">
                    {{file.fi_original}}
                </b-button>
            </b-col>
        </b-row>
    </div>
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
    computed: {
        dlvy_4s () {
            return this.frm.collect.lists.hasOwnProperty(0) ? this.frm.collect.lists[0][0].pa_dlvy_p_add_vat : 0;
        },
        dlvy_other () {
            return Object.values(this.frm.collect.lists).reduce((acc, el) => {
                return acc + el[0].pa_name != '' ? el[0].pa_dlvy_p_add_vat : 0
            }, 0);
        },
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
            var url = `/api/admin/shop/estimate/showEstimate/${this.$route.params.er_id}?type=print`;
            var name = "견적서 인쇄";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
        async estimateExcel(){
            const res = await ax.post(`/api/admin/shop/estimate/exportEstimateExcel`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.xlsx');
        },
        async estimatePdf(){
            const res = await ax.post(`/api/admin/shop/estimate/exportEstimatePdf`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, 'Estimate_'+dt.format("yyyyMMdd")+'.pdf');
        },
        async transactionExcel(){
            const res = await ax.post(`/api/admin/shop/estimate/exportTransactionExcel`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.xlsx');
        },
        async transactionPdf(){
            const res = await ax.post(`/api/admin/shop/estimate/exportTransactionPdf`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, 'Transaction_'+dt.format("yyyyMMdd")+'.pdf');
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
        },
        DlvyAllIn (em_id) {
            for (var em of this.frm.estimate_model)
                if (em.em_id !== em_id) em.dlvy_all_in = false;
        },

    },
    mounted() {
        this.show();
    },
}
</script>

<style lang="css" scoped>
.p_wrap .act_ctrl .def_info { line-height:1.9; }
.p_wrap .act_ctrl .def_info span { margin-left: 2rem; }
.p_wrap .act_ctrl .def_info b { font-weight:900; margin-left:.5rem; }
.p_wrap .act_ctrl .btn_area { text-align:right; }
.p_wrap .act_ctrl .btn_area>* { margin-left:.5%; margin-right:.5%; }

.p_wrap .box .top_border { border-top:3px solid #4F637B; }
.p_wrap .gd_list .row.head { border-top: 3px solid #4F637B; font-weight:600; }
.p_wrap .gd_list .row.list .col:nth-child(2) { flex: 0 0 12%; max-width: 12%; }
.p_wrap .gd_list .row.list .col:nth-child(3) { flex: 0 0 9%; max-width: 9%; }
.p_wrap .gd_list .row.list .col:nth-child(4) { flex: 0 0 7%; max-width: 7%; }
.p_wrap .gd_list .row.list .col:nth-child(5) { flex: 0 0 8%; max-width: 8%; }
.p_wrap .gd_list .row.list .col:nth-child(6) { flex: 0 0 5%; max-width: 5%; }
.p_wrap .gd_list .row.list .col:nth-child(7) { flex: 0 0 8%; max-width: 8%; }
.p_wrap .gd_list .row.list .col { justify-content: center; padding:0.75rem; display:flex; align-items:center; font-size: .95rem; }
.p_wrap .gd_list .row.list:not(:last-of-type) .col { border-bottom: 1px solid #D7D7D7; }
.p_wrap .gd_list .row.list .col:not(:last-of-type) { border-right: 1px solid #D7D7D7; }

.p_wrap .gd_list .row:not(:first-of-type) .col { color:#949494; }

.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type a { flex: 0 0 145px; max-width: 145px; }
.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type div { text-align:left; padding-left:2rem; flex-basis: 0; flex-grow: 1; max-width: 100%; }
.p_wrap .gd_list .row:not(:first-of-type) .col:first-of-type div .gd_name { display:block; color:#555; }
.p_wrap .gd_list .row .col a { width:120px; height:120px; padding-left:20px; }
.p_wrap .gd_list .row .col a img { width:100%; height:100%; object-fit:contain; border:1px solid #8F8F8F; }

.p_wrap .gd_list .row.body .em_sum { flex-direction: column; }
.p_wrap .gd_list .row.body .em_sum >>> .btn-group-toggle { display:block !important; text-align:center; }
.p_wrap .gd_list .row.body .em_sum >>> .btn-group-toggle .btn { background-color:#fff; color:#6F6F6F; border-color:#aaa; border-radius:2rem; padding:.17rem 0.7rem; font-size:.75rem; }
.p_wrap .gd_list .row.body .em_sum >>> .btn-group-toggle .btn.active { color:#fff; background-color:#4EB8C8; }

.p_wrap .sum_up .total { border-bottom:1px solid #D6D6D6; }
.p_wrap .sum_up .total .col { color:#000; font-weight:bold; }
.p_wrap .sum_up .total .col b { font-size:1.4rem; }
.p_wrap .sum_up .total .col:nth-of-type(odd) { display:flex; align-items:center; flex-basis:12%; max-width:12%; padding:1rem 0 1rem 2rem; }
.p_wrap .sum_up .total .col:nth-of-type(even) { text-align:right; padding:1rem 2rem 1rem; }
.p_wrap .sum_up .total .col:nth-of-type(2):after,
.p_wrap .sum_up .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2; }
.p_wrap .sum_up .total .col:nth-of-type(2),
.p_wrap .sum_up .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }
.p_wrap .sum_up .total .col:nth-of-type(2):after { content:"+"; }
.p_wrap .sum_up .total .col:nth-of-type(4):after { content:"="; }
.p_wrap .sum_up .total .col:nth-of-type(5) { flex-basis:16%; max-width:16%; }
.p_wrap .sum_up .total .col:nth-of-type(6) { flex-basis:24%; max-width:24%; }
.p_wrap .sum_up .total_sub { background:#F2F3F5; border-bottom-width:0; }
.p_wrap .sum_up .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.p_wrap .sum_up .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.p_wrap .sum_up .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }
.p_wrap .sum_up .total_sub .col>div { display:flex; flex-wrap:wrap; }
.p_wrap .sum_up .total_sub .col>div:nth-of-type(1) { padding:1rem 2rem .5rem 2rem; }
.p_wrap .sum_up .total_sub .col>div:nth-of-type(2) { padding:0 2rem 1rem 2rem; }
.p_wrap .sum_up .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.p_wrap .sum_up .total_sub .col>div .col:nth-of-type(2) { text-align:right; }


</style>
