<template>
    <div>
        <div class="pTitle">
            <span><i>영</i></span>
            <span><i>문</i></span>
            <div class="break d-md-block d-none"></div>
            <span><i>교</i></span>
            <span><i>정</i></span>
            <div class="break"></div>
            <span><i></i></span>
        </div>
        <b-container class="list">
            <b-row class="header">
                <b-col>번호</b-col>
                <b-col></b-col>
                <b-col>납기일</b-col>
                <b-col>진행현황</b-col>
                <b-col>교정본 받기</b-col>
            </b-row>
            <b-row v-for="er in list.data" :key="er.er_id" class="data">
                <b-col>{{er.er_id}}</b-col>
                <b-col>영문교정 (<small>신청일 : {{er.created_at | formatDate_YYYY_MM_DD}}</small>)</b-col>
                <b-col>{{er.er_dlvy_at | formatDate_YYYY_MM_DD}}</b-col>
                <b-col>
                    <b-badge v-if="er.er_step == 'ING'">처리중</b-badge>
                    <b-badge v-else-if="er.er_step == 'CPLT'" variant="success">처리완료</b-badge>
                    <b-badge v-else-if="er.er_step == 'NOT'" variant="warning">미처리</b-badge>
                    <b-badge v-else-if="er.er_step == 'CXL'" variant="danger">취소</b-badge>
                </b-col>
                <b-col>
                    <b-button v-if="er.er_step == 'CPLT'" variant="info" size="sm">다운</b-button>
                </b-col>
            </b-row>
            <pagination :data="list" align="center" @pagination-change-page="index"></pagination>
        </b-container>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'MyEngReformIndex',
    components: { },
    data() {
        return {
            list:{},
        };
    },

    methods: {
        async index(page=1){
            try {
                const res = await ax.get(`/api/engReform`, { params: {page:page}});
                if (res && res.status === 200) {
                    this.list = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },

    mounted() {
        this.index();
    },
};
</script>

<style scoped>
.list .row .col { text-align:center; padding:.3rem 0; }
.list .header .col { font-weight:bold; font-size:1.2rem; background:#444; color:#fff; }
.list .data .col { font-size:1.1rem; }

.list .row .col:nth-child(1) { flex:0 0 10%; max-width:10%; }
.list .row .col:nth-child(4) { flex:0 0 15%; max-width:15%; }
.list .row .col:nth-child(5) { flex:0 0 15%; max-width:15%; }
.list .row:nth-child(even) { background:#f5f5f5; }
</style>