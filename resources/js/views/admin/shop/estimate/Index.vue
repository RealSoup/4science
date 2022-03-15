<template>
    <div class="adm_estimate">
        <b-card class="shadow">
            <b-container fluid>

                <SchDate v-model="sch_frm">
                    <b-col slot="prev">
                        <select class="form-control" v-model="sch_frm.date_type">
                            <option value="reque">견적 요청일</option>
                            <option value="reply">견적 응답일</option>
                        </select>
                    </b-col>
                </SchDate>

                <b-row class="mb-1">
                    <b-col>
                        <select class="form-control" v-model="sch_frm.eq_type">
                            <option value="">요청 / 임의</option>
                            <option value="REQ">요청견적</option>
                            <option value="TEMP">임의견적</option>
                        </select>
                    </b-col>
                    <b-col>
                        <select class="form-control" v-model="sch_frm.eq_step">
                            <option value="">처리단계</option>
                            <option value="DONOT">미처리</option>
                            <option value="DOING">처리중</option>
                            <option value="DONE">처리완료</option>
                            <option value="CANCEL">취소</option>
                        </select>
                    </b-col>
                    <b-col lg="3" md="4" sm="6">
                        <b-input-group prepend="견적금액">
                            <b-form-input v-model="sch_frm.startPrice" :formatter="priceComma" placeholder="0"></b-form-input>
                            <b-form-input v-model="sch_frm.endPrice" :formatter="priceComma" placeholder="0"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <select class="form-control" v-model="sch_frm.mng_group">
                            <option value="">팀검색</option>
                            <option v-for="(v, key) in mng_info.group" :value="key">{{v}}</option>
                        </select>
                    </b-col>
                    <b-col>
                        <select class="form-control" v-model="sch_frm.eq_mng">
                            <option value="">담당자</option>
                            <option v-for="m in mng" :value="m.id">{{m.name}}</option>
                        </select>
                    </b-col>
                </b-row>

                <b-row class="justify-content-end mt-3">
                    <b-col md="12" lg="8">
                        <b-input-group>
                            <b-input-group-prepend>
                                <select class="custom-select" v-model="sch_frm.keyword_type">
                                    <option value="eq_name">요청자명</option>
                                    <option value="eq_department">소속</option>
                                    <option value="eq_tel">전화번호</option>
                                    <option value="eq_hp">휴대폰</option>
                                    <option value="eq_email">이메일</option>
                                    <option value="eq_id">요청번호</option>
                                    <option value="er_id">견적번호</option>
                                    <option value="em_name">제품명</option>
                                    <option value="em_code">모델명</option>
                                    <option value="cat_no">Cat.No</option>
                                </select>
                            </b-input-group-prepend>

                            <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword" @keyup.enter="index"></b-form-input>

                            <b-input-group-append>
                                <b-button variant="outline-primary" @click="index">Search</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="shadow em_list">
            <b-container fluid>
                <b-row>
                    <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
                    <b-col sm="12" md="6" class="text-right">
                        <router-link :to="{name: 'adm_estimate_create'}">
                            <b-button variant="primary" size="sm">임의견적</b-button>
                        </router-link>
                    </b-col>
                </b-row>
                <hr>
                <template>
                    <b-row
                        class="list_item"
                        v-for="(row, idx) in list.data"
                        :key="row.eq_id"
                    >
                        <b-col cols="2">
                            <div class="d-inline-block">
                                <b-badge pill variant="dark">{{row.eq_id}}</b-badge>
                                <b-badge variant="secondary">
                                    <template v-if="row.eq_name">{{row.eq_name}}</template>
                                    <template v-else>(비회원)</template>
                                </b-badge>
                                <b-badge variant="light">{{ row.created_at | formatDate }}</b-badge>
                                <b-badge variant="warning" v-if="row.eq_type == 'TEMP'">임의</b-badge>
                                <b-badge variant="warning" v-else-if="row.eq_type == 'REREQ'">재견적요청</b-badge>
                            </div>
                        </b-col>

                        <b-col cols="8">
                            <router-link :to="{name: 'adm_estimate_show_req', params: { eq_id:row.eq_id }}" class="btn btn-light btn-sm d-block text-left" v-html="row.eq_title">
                            </router-link>
                        </b-col>
                        <b-col cols="2">
                            <b-badge class="float-left" variant="warning" v-if="row.eq_step === 'DONOT'">미처리</b-badge>
                            <b-badge class="float-left" variant="primary" v-else-if="row.eq_step === 'DOING'">처리중</b-badge>
                            <b-badge class="float-left" variant="success" v-else-if="row.eq_step === 'DONE'">완료</b-badge>
                            <b-badge class="float-left" variant="danger" v-else-if="row.eq_step === 'CANCEL'">취소</b-badge>


                            <b-badge v-if="row.eq_mng_nm">{{row.eq_mng_nm}}</b-badge>
                            <b-button size="sm" variant="light"
                                v-if="row.estimate_reply.length < 1"
                                :to="{name: 'adm_estimate_create', query: { eq_id:row.eq_id }}"
                            >
                                <b-icon-pencil-square /> 견적서 작성
                            </b-button>
                            <ul v-else class="ctrl_box">
                                <li v-for="(er, i) in row.estimate_reply">
                                    <b-button size="sm" variant="success" :to="{name: 'adm_estimate_show_reply', params: { er_id:er.er_id }}" v-if="i===0"><b-icon-clipboard-data /> 견적서</b-button>
                                    <b-button size="sm" variant="warning" :to="{name: 'adm_estimate_show_reply', params: { er_id:er.er_id }}" v-else><b-icon-back /> 재견적서</b-button>
                                    <b-badge pill variant="dark">{{er.er_id}}</b-badge>
                                </li>
                            </ul>
                        </b-col>
                    </b-row>
                </template>
            </b-container>

            <pagination :data="list" @pagination-change-page="setPage" align="center" class="mt-5"></pagination>
        </b-card>
    </div>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
export default {
    components: {
        'SchDate': () => import('@/views/admin/_module/SchDate.vue'),
    },
    data() {
        return {
            list: {},
            mng: {},
            mng_info: {},
            sch_frm: {
                date_type:'reque',
                startDate:'',
                endDate:'',
                startPrice:'',
                endPrice: '',
                eq_type:'',
                eq_step:'',
                eq_mng:'',
                mng_group:'',
                keyword_type:'eq_name',
                keyword:'',
                page:0
            },
        }
    },
    methods: {
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/estimate/`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.mng = res.data.mng;
                    this.mng_info = res.data.mng_info;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        setPage(page) {
            this.sch_frm.page = page;
            this.index();
        },
    },
    mounted() {
        this.index();
    },


    filters: {
        eqStep: function (str) {
            var rst = '';
            switch (str) {
                case 'DONOT':  rst = '미처리'; break;
                case 'DOING':  rst = '처리중'; break;
                case 'DONE':   rst = '완료'; break;
                case 'CANCEL': rst = '취소'; break;
            }
            return rst;
        }
    }
}
</script>

<style lang="css" scoped>
.adm_estimate .card.em_list .list_item > div { padding-top:15px; padding-bottom:15px; }
.adm_estimate .card.em_list .list_item:nth-child(odd) > div:nth-child(odd),
.adm_estimate .card.em_list .list_item:nth-child(even) > div:nth-child(even) { /*border:1px solid #E3EADE;*/ }
.adm_estimate .card.em_list .list_item:nth-child(odd) > div:nth-child(even),
.adm_estimate .card.em_list .list_item:nth-child(even) > div:nth-child(odd) { background-color:#FFEAEA; }

.adm_estimate .card.em_list .list_item div:nth-child(3) { text-align:right; }
.adm_estimate .card.em_list .list_item div:nth-child(3) .ctrl_box { float:right; margin-left:0.3rem; }
.adm_estimate .card.em_list .list_item div:nth-child(3) .ctrl_box li { margin-bottom:0.3rem; }
.adm_estimate .card.em_list .list_item div:nth-child(3) .ctrl_box li .btn { padding:0.2rem 0.4rem; font-size: 0.8rem; }

</style>
