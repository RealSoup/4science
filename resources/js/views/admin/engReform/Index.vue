<template lang="html">
    <div class="adm_eng_reform">
        <b-card class="shadow">
            <b-container>
                <SchDate v-model="sch_frm" />

                <b-row class="justify-content-end mt-3">
                    <b-col md="12" lg="8">
                        <b-input-group>
                            <b-input-group-prepend>
                                <select class="custom-select" v-model="sch_frm.er_step">
                                    <option value="">진행상태</option>
                                    <option value="ING">처리중</option>
                                    <option value="CPLT">완료</option>
                                    <option value="NOT">미처리</option>
                                    <option value="CXL">취소</option>
                                </select>
                                <select class="custom-select" v-model="sch_frm.mode">
                                    <option value="er_name">요청자명</option>
                                    <option value="er_demand">요청사항</option>
                                    <option value="er_email">Email</option>
                                    <option value="er_tel">전화</option>
                                    <option value="er_hp">핸드폰</option>
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

        <b-card class="shadow">
            <b-container class="list">
                <b-row class="header">
                    <b-col>번호</b-col>
                    <b-col>요청자</b-col>
                    <b-col></b-col>
                    <b-col>서비스</b-col>
                    <b-col>소속</b-col>
                    <b-col>연락처</b-col>
                    <b-col>이메일</b-col>
                    <b-col>납기일</b-col>
                    <b-col>진행현황</b-col>
                </b-row>
                <b-row v-for="(er, idx) in list.data" :key="er.er_id" class="data">
                    <b-col>{{er.er_id}}</b-col>
                    <b-col>
                        <b-button :to="{name: 'adm_user_edit', params: { id:er.user.id}}" variant="light" size="sm">
                             {{er.er_name}} <b-icon-link45deg />
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button :to="{name: 'adm_eng_reform_edit', params: { er_id:er.er_id }}" variant="light" block class="text-left">
                            영문교정 (<small>신청일 : {{er.created_at | formatDate_YYYY_MM_DD}}</small>)
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-badge v-if="er.er_type == 1" variant="light">일반</b-badge>
                        <b-badge v-else-if="er.er_type == 2" variant="light">프리미엄</b-badge>
                        <b-badge v-else-if="er.er_type == 3" variant="light">프리미엄 플러스</b-badge>
                    </b-col>
                    <b-col>{{er.er_depart}}</b-col>
                    <b-col><b-badge variant="light">{{er.er_tel}}</b-badge><b-badge variant="light">{{er.er_hp}}</b-badge></b-col>
                    <b-col>{{er.er_email}}</b-col>
                    <b-col>{{er.er_dlvy_at | formatDate_YY_MM_DD}}</b-col>
                    <b-col>
                        <b-badge v-if="er.er_step == 'ING'" variant="light">처리중</b-badge>
                        <b-badge v-else-if="er.er_step == 'CPLT'" variant="light">처리완료</b-badge>
                        <b-badge v-else-if="er.er_step == 'NOT'" variant="light">미처리</b-badge>
                        <b-badge v-else-if="er.er_step == 'CXL'" variant="light">취소</b-badge>
                    </b-col>
                </b-row>
            </b-container>

            <pagination :data="list" @pagination-change-page="setPage" :limit="5" :showDisabled="true" align="center" class="mt-5">
                <span slot="prev-nav"><b-icon-chevron-left /></span>
                <span slot="next-nav"><b-icon-chevron-right /></span>
            </pagination>
        </b-card>
    </div>
</template>

<script>
import ax from '@/api/http';
export default {
    components: {
        'SchDate': () => import('@/views/_common/SchDate.vue'),
    },
    data() {
        return {
            list: {},
            sch_frm: {
                startDate:'',
                endDate:'',
                er_step:'',
                mode:'er_name',
                keyword:'',
                page:0
            },
        }
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                const res = await ax.get(`/api/admin/engReform`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data;
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
}
</script>

<style lang="css" scoped>
.list .row .col { text-align:center; padding:.3rem 0; }
.list .header .col { padding:.6rem 0; font-size:1.1rem; background:#444; color:#fff; }
.list .data .col { font-size:.9rem; }

.list .row .col:nth-child(1) { flex:0 0 5%; max-width:5%; }
.list .row .col:nth-child(2) { flex:0 0 7%; max-width:7%; }
.list .row .col:nth-child(4) { flex:0 0 9%; max-width:9%; }
.list .row .col:nth-child(5) { flex:0 0 9%; max-width:9%; }
.list .row .col:nth-child(6) { flex:0 0 9%; max-width:9%; }
.list .row .col:nth-child(7) { flex:0 0 15%; max-width:15%; }
.list .row .col:nth-child(8) { flex:0 0 6%; max-width:6%; }
.list .row .col:nth-child(9) { flex:0 0 5%; max-width:5%; }
.list .row:nth-child(even) { background:#f5f5f5; }
</style>
