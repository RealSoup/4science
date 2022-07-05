<template>
<div>
    <b-row class="head">
        <b-col><span>요청번호/요청내용</span><span>요청자[요청일]</span></b-col>
        <b-col><span>진행현황</span></b-col>                
        <b-col><span>담당자</span><span>응답일/Ctrl/응답번호</span></b-col>
    </b-row>
    <b-row class="body" v-for="row in list" :key="row.eq_id">
        <b-link class="col"
            :to="{name: 'adm_estimate_show_req', params: { eq_id:row.eq_id }}"
            router-tag="div"
        >
            <span>
                {{row.eq_id}}.
                <b class="main" v-html="row.eq_title" />
                <b-badge variant="warning" v-b-tooltip.hover title="임의견적" v-if="row.eq_type == 'TEMP'">임</b-badge>
                <b-badge variant="warning" v-b-tooltip.hover title="재견적요청" v-else-if="row.eq_type == 'REREQ'">재</b-badge>
            </span>
            <span>{{row.eq_name}} [ {{ row.created_at | formatDate }} ]</span>
        </b-link>

        <b-col>
            <b-badge variant="warning" v-if="row.eq_step === 'DONOT'"       >미처리</b-badge>
            <b-badge variant="primary" v-else-if="row.eq_step === 'DOING'"  >처리중</b-badge>
            <b-badge variant="success" v-else-if="row.eq_step === 'DONE'"   >완료</b-badge>
            <b-badge variant="danger" v-else-if="row.eq_step === 'CANCEL'"  >취소</b-badge>
        </b-col>

        <b-col>
            <span v-if="row.eq_mng_nm">{{row.eq_mng_nm}}</span>

            <span>
                <b-button size="sm" variant="light"
                    v-if="row.estimate_reply.length < 1"
                    :to="{name: 'adm_estimate_create', query: { eq_id:row.eq_id }}"
                >
                    <b-icon-pencil-square /> 견적서 작성
                </b-button>
                <ul v-else class="ctrl_box">
                    <li v-for="(er, i) in row.estimate_reply" :key="i">
                        [ {{ er.created_at | formatDate }} ]
                        <b-button size="sm" class="main" variant="success" :to="{name: 'adm_estimate_show_reply', params: { er_id:er.er_id }}" v-if="i===0"><b-icon-clipboard-data /> 견적서</b-button>
                        <b-button size="sm" class="main" variant="warning" :to="{name: 'adm_estimate_show_reply', params: { er_id:er.er_id }}" v-else><b-icon-back /> 재견적서</b-button>
                        .{{er.er_id}}
                    </li>
                </ul>
            </span>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    name: 'AdmEstimateIndexList',
    props:['list'],
};
</script>

<style lang="css" scoped>
.row div { font-size:.9rem; }
.row>div>span:nth-of-type(2) { float:right; }
.row div span .main { margin:0 10px; }
.row div span ul li { margin-bottom:0.3rem; text-align:right; }
.row div span ul li .btn { padding:0.2rem 0.4rem; font-size: 0.7rem; }

.head { border-bottom:2px solid #000; }
.head>div { font-weight:bold; background:#666; color:#fff; }
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.body:hover { background: #d8f2fd94; }
.row>div{ padding-top:15px; padding-bottom:15px; }
.body>div:nth-of-type(1) { cursor:pointer; }
.body>div:nth-of-type(2) { background-color:#7fffd454; }

.row .col:nth-of-type(2) { flex:0 0 15%; max-width:15%; }
.row .col:nth-of-type(3) { flex:0 0 23%; max-width:23%; }
</style>