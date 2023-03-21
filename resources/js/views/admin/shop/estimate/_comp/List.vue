<template>
<div>
    <b-row class="head">
        <b-col>요청번호</b-col>
        <b-col>요청내용</b-col>
        <b-col>요청자</b-col>
        <b-col>요청일</b-col>
        <b-col>진행현황</b-col>
        <b-col>담당자</b-col>
        <b-col class="er_box">
            <span>견적서번호</span>
            <span>견적서</span>
            <span>작성일</span>
        </b-col>
        
    </b-row>
    <b-row class="body" v-for="row in list" :key="row.eq_id">
        <b-col>{{row.eq_id}}.</b-col>
        <b-col @click="openWinPop(`/admin/shop/estimate/req/${row.eq_id}`, 1700, 900)">
            <b v-if="row.eq_title" v-html="row.eq_title" />
            <SubString v-else-if="row.eq_type == 'REQ'" v-model="row.eq_content" :width="900" />

            <b-badge v-if="row.eq_type == 'TEMP'" class="yellow" v-b-tooltip.hover title="임의견적" >임</b-badge>
            <b-badge v-else-if="row.eq_type == 'REREQ'" class="plum" v-b-tooltip.hover title="재견적요청" >재</b-badge>
            <b-badge v-else-if="row.eq_type == 'CUS'" class="mint" v-b-tooltip.hover title="주문제작">주</b-badge>
        </b-col>
        <b-col>{{row.eq_name}}</b-col>
        <b-col>{{ row.created_at | formatDate }}</b-col>
        <b-col>
            <b-badge class="plum" v-if="row.eq_step === 'DONOT'" >미처리</b-badge>
            <b-badge class="mint" v-else-if="row.eq_step === 'DOING'">처리중</b-badge>
            <b-badge class="gray" v-else-if="row.eq_step === 'DONE'">완료</b-badge>
            <b-badge class="yellow" v-else-if="row.eq_step === 'CANCEL'">취소</b-badge>
        </b-col>
        <b-col>
            <span v-if="row.eq_mng_nm">{{row.eq_mng_nm}}</span>
            <b-button class="white" v-else @click="openWinPop(`/admin/shop/estimate/create?eq_id=${row.eq_id}`, 1700, 900)">견적서 작성</b-button>
        </b-col>
        <b-col class="er_box">
            <template v-for="(er, i) in row.estimate_reply">
                <span :key="`i${er.er_id}`">{{er.er_id}}.</span>
                <span v-if="i===0" class="btn mint" @click="openWinPop(`/admin/shop/estimate/reply/${er.er_id}`, 1700, 900)" :key="`b${er.er_id}`">견적서</span>
                <span v-else class="btn orange" @click="openWinPop(`/admin/shop/estimate/reply/${er.er_id}`, 1700, 900)" :key="`b${er.er_id}`">재견적서</span>
                <span :key="`d${er.er_id}`">{{ er.created_at | formatDate }}</span>
            </template>
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
.row .col {}
.row .col:nth-child(1) { flex:0 0 9%; max-width:9%; }
.row .col:nth-child(2) {  }
.row .col:nth-child(3) { flex:0 0 6%; max-width:6%; }
.row .col:nth-child(4) { flex:0 0 7%; max-width:7%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(5) { flex:0 0 6%; max-width:6%; }
.row .col:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(7) { flex:0 0 20%; max-width:20%; }
.row .col:nth-child(5) .badge { width:3.8rem; padding:.4rem 0; }
.body .col:nth-child(2) { text-align:left; cursor:pointer; }
.er_box { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center;}
.er_box span { text-align:center; }
.er_box span:nth-child(3n+1) { flex:0 0 30%; max-width:30%; }
.er_box span:nth-child(3n+2) { flex:0 0 24%; max-width:24%; }
.er_box span:nth-child(3n+3) { flex:0 0 40%; max-width:40%; }
.er_box span.btn { background-color:#fff; border-width:3px; padding:.18rem 0; }
.er_box span.mint { color:#00A1CB; }
.er_box span.orange { color:#F18D04; margin-top:.25rem; }
 
</style>