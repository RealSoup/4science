<template>
<div>
    <b-row class="head">
        <b-col><span>요청번호/요청내용</span><span>요청자[요청일]</span></b-col>
        <b-col><span>진행현황</span></b-col>                
        <b-col><span>담당자</span><span>응답일/Ctrl/응답번호</span></b-col>
    </b-row>
    <b-row class="body" v-for="row in list" :key="row.eq_id">
        <b-link class="col" @click="openWinPop(`/admin/shop/estimate/req/${row.eq_id}`, 1700, 900)">
            <span>
                {{row.eq_id}}.
                <b v-if="row.eq_title" v-html="row.eq_title" />
                <template v-if="row.eq_type == 'REQ'">
                    <b-badge v-if="row.eq_1depth" variant="info">{{row.eq_1depth}}</b-badge>
                    <SubString v-if="!row.eq_title" v-model="row.eq_content" :width="900" />
                </template>
                <template v-else-if="row.eq_type == 'CUS'">
                    <b-badge variant="primary" v-b-tooltip.hover title="주문제작">주</b-badge>
                    
                </template>
               
                <b-badge variant="warning" v-b-tooltip.hover title="임의견적" v-if="row.eq_type == 'TEMP'">임</b-badge>
                <b-badge variant="danger" v-b-tooltip.hover title="재견적요청" v-else-if="row.eq_type == 'REREQ'">재</b-badge>
                
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
                    @click="openWinPop(`/admin/shop/estimate/create?eq_id=${row.eq_id}`, 1700, 900)"
                    target="_blank"
                >
                    <b-icon-pencil-square /> 견적서 작성
                </b-button>
                <ul v-else class="ctrl_box">
                    <li v-for="(er, i) in row.estimate_reply" :key="i">
                        [ {{ er.created_at | formatDate }} ]
                        <b-button size="sm" class="main" variant="success" @click="openWinPop(`/admin/shop/estimate/reply/${er.er_id}`, 1700, 900)" v-if="i===0" target="_blank"><b-icon-clipboard-data /> 견적서</b-button>
                        <b-button size="sm" class="main" variant="warning" @click="openWinPop(`/admin/shop/estimate/reply/${er.er_id}`, 1700, 900)" v-else target="_blank"><b-icon-back /> 재견적서</b-button>
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
    components: { 'SubString': () => import('@/views/_common/SubString.vue'), },
    props:['list'],
};
</script>

<style lang="css" scoped>
.row .col { font-size:.9rem; }
.row .col>span:nth-of-type(2) { float:right; }
.row .col span .main { margin:0 10px; }
.row .col span ul li { margin-bottom:0.3rem; text-align:right; }
.row .col span ul li .btn { padding:0.2rem 0.4rem; font-size: 0.7rem; }

.head { border-bottom:2px solid #000; }
.head .col { font-weight:bold; background:#666; color:#fff; }
.row:not(:last-of-type) { border-bottom:1px solid #333; }
.body:hover { background: #d8f2fd94; }
.row .col { padding-top:15px; padding-bottom:15px; }
.row .col .badge { vertical-align: text-bottom; }
.body .col:nth-child(1) { cursor:pointer; }
.body .col:nth-child(2) { background-color:#7fffd454; }

.row .col:nth-child(2) { flex:0 0 15%; max-width:15%; }
.row .col:nth-child(3) { flex:0 0 23%; max-width:23%; }
</style>