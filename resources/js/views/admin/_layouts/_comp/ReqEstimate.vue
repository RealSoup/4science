<template>
<b-container class="p_wrap">
    <h3 class="p_tit">미처리 견적</h3>
    <b-row>
        <b-col>글번호</b-col>
        <b-col>견적명</b-col>
        <b-col>요청자</b-col>
        <b-col>요청일</b-col>
    </b-row>
    <b-row v-for="eq in list" :key="eq.eq_id">
        <b-col>{{eq.eq_id}}</b-col>
        <b-col>
            <b-link :to="{name: 'adm_estimate_show_req', params: { eq_id:eq.eq_id }}">
                <b v-if="eq.eq_title" v-html="eq.eq_title"></b>
                <SubString v-else v-model="eq.eq_content" :width="650"></SubString>
            </b-link>
        </b-col>
        <b-col>{{eq.eq_name}}</b-col>
        <b-col>{{eq.created_at | formatDate}}</b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    name: 'AdmHeaderReqOrder',
    components: { 
        'SubString': () => import('@/views/_common/SubString.vue'),
    },
    props:['list'],
    methods: {
            },
}
</script>
<style lang="css" scoped>
.p_warp {  border-right:1px solid #DDD; }
.row:first-of-type .col { background-color:#CCC; border-top:3px solid #666; font-weight:600; }
.row .col:nth-of-type(1) { flex-basis:11%; max-width:11%; }
.row .col:nth-of-type(2) { text-align: left; }
.row .col:nth-of-type(3) { flex-basis:11%; max-width:11%; }
.row .col:nth-of-type(4) { flex-basis:11%; max-width:11%; }
.row .col { border-left:1px solid #DDD; border-bottom:1px solid #DDD; text-align: center; padding:.4rem; }
</style>