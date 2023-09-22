<template>
<div class="w_fence">
    <h3>영문 교정 <small>고객님께서 영문교정을 의뢰하셨던 내역입니다.</small></h3>
    <b-container class="list">
        <b-row class="head">
            <b-col>번호</b-col>
            <b-col>등록일</b-col>
            <b-col class="text-center">제목</b-col>
            <b-col>납기일</b-col>
            <b-col>진행현황</b-col>
            <b-col>교정본 다운로드</b-col>
        </b-row>
        <b-row v-for="er in list.data" :key="er.er_id" class="body">
            <b-col class="align">{{er.er_id}}</b-col>
            <b-col class="align">{{er.created_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-link :to="{name: 'my_eng_reform_show', params: { er_id:er.er_id }}" class="col text-left">
                {{er.created_at.substr(0, 4)}}년
                {{er.created_at.substr(5, 2)}}월
                {{er.created_at.substr(8, 2)}}일자
                영문교정
                <b>[{{er.er_type | erType}}]</b>
            </b-link>
            <b-col class="align">{{er.er_dlvy_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-col class="align">
                <b-badge v-if="er.er_step == 'ING'" class="mint">처리중</b-badge>
                <b-badge v-else-if="er.er_step == 'CPLT'" class="gray">처리완료</b-badge>
                <b-badge v-else-if="er.er_step == 'NOT'" class="white">미처리</b-badge>
                <b-badge v-else-if="er.er_step == 'CXL'" class="white">취소</b-badge>
            </b-col>
            <b-col class="align">
                <b-dropdown text="교정파일 받기" v-if="er.er_step == 'CPLT'" variant="info" size="sm">
                    <template v-for="fi in er.file_info">
                        <b-dropdown-item :key="fi.fi_id" v-if="fi.fi_kind == 'cplt'" @click="fileDown(fi.down_path, fi.fi_original)">
                            {{fi.fi_original}}
                        </b-dropdown-item>
                    </template>
                </b-dropdown>
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
    computed: { },
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
    filters: {
        erType: function (str) {
            var rst = '';
            switch (str) {
                case '1': rst = '일반 교정'; break;
                case '2': rst = '프리미엄 교정'; break;
                case '3': rst = '프리미엄플러스  교정'; break;
            }
            return rst;
        }
    },

    mounted() {
        this.index();
    },
};
</script>

<style scoped>
h3 { font-size:1.5rem; }
h3 small { font-size:55%; font-weight:600; }
.list .head { border-top:2px solid #363636; border-bottom:1px solid #ACACAC; background-color:#ECECEC; }
.list .head .col { font-weight:900; line-height:1.1; padding:.86rem 0; font-size:.9rem; text-align: center; }

.list .body .col { text-align:center; line-height:3.7; color:#5E5E5E; }
.list .body .align { display:flex; align-items:center; justify-content:center; }
.list .row { border-bottom:1px solid #ACACAC; }
.list .row .col:nth-child(1) { flex:0 0 10%; max-width:10%; padding-left:1%; }
.list .row .col:nth-child(2) { flex:0 0 13%; max-width:13%; }
.list .row .col:nth-child(3) {  }
.list .row .col:nth-child(4) { flex:0 0 10%; max-width:10%; }
.list .row .col:nth-child(5) { flex:0 0 14%; max-width:14%; }
.list .row .col:nth-child(6) { flex:0 0 14%; max-width:14%; }
.list .body .col b { color:#0094E9; }
.list .body .badge { width:64px;  }
.list .body .badge.white { border:1px solid #898989; }
.list .body .col .dropdown { line-height:1.5; }
</style>