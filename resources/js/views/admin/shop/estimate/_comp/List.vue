<template>
<div>
    <b-row class="head list m_hide">
        <b-col>No.</b-col>
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
    <b-row class="body list" v-for="row in list" :key="row.eq_id">
        <b-col>{{row.eq_id}}.</b-col>
        <b-col @click="exeWinPop(`/admin/shop/estimate/req/${row.eq_id}`)" class="eq_tit">
            <b v-if="row.eq_title" v-html="row.eq_title"></b>
            <sub-string v-else v-model="row.eq_content" :width="650"></sub-string>

            <span class="badgetag yellow" v-b-tooltip="'임의견적'" v-if="row.eq_type=='TEMP'">임</span>
            <span class="badgetag plum" v-b-tooltip="'재견적요청'" v-else-if="row.eq_type=='REREQ'">재</span>
            <span class="badgetag mint" v-b-tooltip="'주문제작'"  v-else-if="row.eq_type=='CUS'">주</span>
        </b-col>
        <b-col>
            <div class="eq_name">
                <span v-if="row.user && (row.user.level == 11 || row.user.level == 12)" class="badgetag d_blue d-none d-lg-inline-block">딜</span>
                <sub-string v-model="row.eq_name" :width="120"></sub-string>
                <br class="d-none d-lg-block" />
                <b-badge v-if="row.user && row.user.mng" class="orange d-none d-lg-inline-block">{{mng_off[row.user.mng].name}}</b-badge>
            </div>
        </b-col>
        <b-col>
            <i class="d-inline-block d-lg-none">{{ row.created_at | formatDate }}</i>
            <i class="d-none d-lg-inline-block">{{ row.created_at | formatDate_MM_DD_HH:mm }}</i>
        </b-col>
        <b-col>
            <span class="nametag plum" v-if="row.eq_step==='DONOT'" >{{row.eq_step | eqStep}}</span>
            <span class="nametag mint" v-else-if="row.eq_step==='DOING'">{{row.eq_step | eqStep}}</span>
            <span class="nametag gray" v-else-if="row.eq_step==='DONE'">{{row.eq_step | eqStep}}</span>
            <span class="nametag yellow" v-else-if="row.eq_step==='CANCEL'">{{row.eq_step | eqStep}}</span>
        </b-col>
        <b-col><span v-if="row.eq_mng_nm">{{row.eq_mng_nm}}</span></b-col>
        <b-col class="er_box">
            <template v-if="row.estimate_reply.length == 0">
                <span></span>
                <span class="btn nametag white" @click="exeWinPop(`/admin/shop/estimate/create?eq_id=${row.eq_id}`)">견적서 작성</span>
                <span></span>
            </template>
            <template v-else v-for="(er, i) in row.estimate_reply">
                <span :key="`i${er.er_id}`">{{er.er_id}}.</span>
                <template v-if="er.er_step == 0">
                    <span class="btn nametag gray" :class="{not_fir:i!==0}" @click="exeWinPop(`/admin/shop/estimate/${er.er_id}/edit`)" :key="`b${er.er_id}`">임시저장</span>
                </template>
                <template v-else>
                    <span v-if="i===0" class="btn nametag mint" @click="exeWinPop(`/admin/shop/estimate/reply/${er.er_id}`)" :key="`b${er.er_id}`">견적서</span>
                    <span v-else class="btn nametag orange not_fir" @click="exeWinPop(`/admin/shop/estimate/reply/${er.er_id}`)" :key="`b${er.er_id}`">재견적서</span>
                </template>
                <span :key="`d${er.er_id}`">
                    <i class="d-inline-block d-lg-none">{{ er.created_at | formatDate }}</i>
                    <i class="d-none d-lg-inline-block">{{ er.created_at | formatDate_MM_DD_HH:mm }}</i>
                </span>
            </template>
        </b-col>
    </b-row>
    <!-- <WinPopUp ref="winPopup"  @onClose="val=>evtCloseWinPopup(val)"  @onRecvEvtFromWinPop="val=>onRecvWinPop(val)" /> -->
</div>
</template>

<script>
export default {
    name: 'AdmEstimateIndexList',
    components: { 
        'sub-string': () => import('@/views/_common/SubString.vue'),
        // 'WinPopUp': () => import('@/views/_common/WinPopUp'),
    },
    props:['list', 'mng_off'],
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
    },
    methods: {
        exeWinPop(url) {
            this.$emit('exe-win-pop', url);
        },
        ////////////////////////////////
        // evtCloseWinPopup( ){
        //     console.log( "evtCloseWinPopup () ========  ");
        // },
        
        // openWinPop(url){
        //     this.$refs.winPopup.openWinPop( url, 1700, 900 );
        // }, 
        
        // onRecvWinPop( recvObj ){
        //     console.log( "onRecvWinPop  ---------" );
        //     if(recvObj == 'reread') this.index();
        // },

        // sendToChild(){ this.$refs.winPopup.sendEvtToChild( { msg : 'abcde' } ); },
    },
    
            
};
</script>

<style lang="css" scoped>
.row .col {}
.row .col:nth-child(1) { flex:0 0 8%; max-width:8%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(2) { border-right:1px solid #CCCCCC; }
.row .col:nth-child(3) { flex:0 0 10%; max-width:10%; }
.row .col:nth-child(4) { flex:0 0 7%; max-width:7%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(5) { flex:0 0 6%; max-width:6%; }
.row .col:nth-child(6) { flex:0 0 9%; max-width:9%; border-right:1px solid #CCCCCC; }
.row .col:nth-child(7) { flex:0 0 20%; max-width:20%; }
.row .col:nth-child(5) .badge { width:3.8rem; padding:.4rem 0; }
.row .col i { font-style:normal; }
.body .col:nth-child(2) { text-align:left; cursor:pointer; padding-left:2%; }
.body .col .eq_name { line-height:1rem; }
.body .col .eq_name .badgetag { line-height: 1.5; }
.er_box { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center;}
.er_box span { text-align:center; }
.er_box span:nth-child(3n+1) { flex:0 0 30%; max-width:30%; }
.er_box span:nth-child(3n+2) { flex:0 0 24%; max-width:24%; }
.er_box span:nth-child(3n+3) { flex:0 0 40%; max-width:40%; }
.er_box span.btn { background-color:#fff !important; border-width:3px; padding:.18rem 0; }
.er_box span.mint { color:#00A1CB !important; }
.er_box span.orange { color:#F18D04 !important; }
.er_box span.gray { background-color:#aaa !important; color:#fff; }
.er_box span.not_fir { margin-top:.25rem; }

@media (max-width: 992px) {
    .p_wrap .cmain .body { border-bottom: 3px solid #333; }
    .p_wrap .cmain .body .col { padding: 0.1rem 0; line-height: 24px; }
    .row .col:nth-child(1) { flex:0 0 20%; max-width:20%; }
    .row .col:nth-child(2) { flex:0 0 60%; max-width:60%; }
    .row .col:nth-child(3) { flex:0 0 20%; max-width:20%; }
    .row .col:nth-child(4) { flex:0 0 20%; max-width:20%; border-width:0; }
    .row .col:nth-child(5) { flex:0 0 20%; max-width:20%; }
    .row .col:nth-child(6) { flex:0 0 60%; max-width:60%; text-align:left; padding-left:10px; border-width:0; }
    .row .col:nth-child(7) { flex:0 0 100%; max-width:100%; background: #efefef; }
    .er_box span:nth-child(3n+1) { flex:0 0 48%; max-width:48%; text-align:right; }
    .er_box span:nth-child(3n+2) { flex:0 0 24%; max-width:24%; }
    .er_box span:nth-child(3n+3) { flex:0 0 18%; max-width:18%; }
}
</style>