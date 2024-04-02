<template>
<div id="adm_estimate_show" class="p_wrap">
    <h3 class="p_tit">견적 응답</h3>
    <div class="act_ctrl">
        <b-row>
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
            <b-col>직장 / 학교</b-col><b-col>{{ frm.estimate_req.eq_company }}</b-col>
            <b-col>이메일</b-col><b-col>{{ frm.estimate_req.eq_email }}</b-col>
        </b-row>
        <b-row>
            <b-col>문의사항</b-col>
            <b-col><p v-html="nl2br(frm.estimate_req.eq_content)"></p></b-col>
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

    <div class="box" v-if="frm.estimate_model && frm.estimate_model.length">
        <h5>견적상품정보</h5>
        <div class="top_border"></div>
        <pa-list v-model="frm.collect.lists" :price="frm.collect.price" :user="frm.estimate_req.user" :add_vat="false" :er_no_dlvy_fee="frm.er_no_dlvy_fee"></pa-list>
    </div>

    <div class="box est_frm">
        <h5>견적서 정보</h5>
        <b-row>
            <b-col>견적번호</b-col><b-col>{{ frm.er_id }}</b-col>
            <b-col>견적일자</b-col><b-col>{{ frm.created_at }}</b-col>
            <b-col>견적유효기간</b-col><b-col>{{ frm.er_effective_at }}</b-col>
        </b-row>
        <b-row>
            <b-col>담당자</b-col><b-col>{{ frm.estimate_req.mng.name }}</b-col>
            <b-col>전화번호</b-col><b-col>{{ frm.estimate_req.mng.tel }}</b-col>
            <b-col>이메일</b-col><b-col>{{ frm.estimate_req.mng.email }}</b-col>
        </b-row>
        <b-row>
            <b-col>납품기일</b-col><b-col>{{ frm.er_dlvy_at }}</b-col>
        </b-row>
        <b-row>
            <b-col>추가정보</b-col>
            <b-col><p v-html="nl2br(frm.er_content)"></p></b-col>
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

export default {
    components: { 'pa-list' : () => import('@/views/web/_module/PaList'), },
    data() {
        return {
            frm:{
                collect:{
                    lists:{},
                    price:{}
                },
                estimate_req:{
                    mng:{},
                },
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
            var url = `/api/admin/shop/estimate/showEstimate/${this.$route.params.er_id}?type=print`;
            var name = "견적서 인쇄";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
        async estimateExcel(){
            const res = await ax.post(`/api/admin/shop/estimate/exportEstimateExcel`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.frm.er_id}_Estimate.xlsx`);
        },
        async estimatePdf(){
            const res = await ax.post(`/api/admin/shop/estimate/exportEstimatePdf`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.frm.er_id}_Estimate.pdf`);
        },
        async transactionExcel(){
            const res = await ax.post(`/api/admin/shop/estimate/exportTransactionExcel`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.frm.er_id}_Statement.xlsx`);
        },
        async transactionPdf(){
            const res = await ax.post(`/api/admin/shop/estimate/exportTransactionPdf`, this.frm, { responseType: 'blob' });
            this.orderDocumentDown(res, `${this.frm.er_id}_Statement.pdf`);
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
            for (var i in this.frm.collect.lists)
                for (var j in this.frm.collect.lists[i]) 
                    if (this.frm.collect.lists[i][j].em_id !== em_id) 
                        this.frm.collect.lists[i][j].dlvy_all_in = false;
            // console.log(this.frm.collect.lists);
            // for (var i in this.frm.collect.lists)
            //     for (var j of this.frm.collect.lists[i]) 
            //         
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
.p_wrap .act_ctrl .btn_area { display:flex; justify-content:flex-end; flex:0 0 640px; max-width:640px; }
.p_wrap .act_ctrl .btn_area>* { margin-left:.5%; margin-right:.5%; }

.p_wrap .box .top_border { border-top:3px solid #4F637B; }
.p_wrap .box .container { max-width:100%; }

@media (max-width: 1200px){
    .p_wrap .act_ctrl .def_info,
    .p_wrap .act_ctrl .btn_area { flex:0 0 100%; max-width:100%; }
}
</style>
