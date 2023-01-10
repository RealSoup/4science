<template>
    <b-container class="p_wrap">
        <h3 class="p_tit">답변 요청</h3>
        <b-row v-if="list.inquiry.length > 0">
            <b-col>1:1 문의</b-col>
            <b-col><b-button v-for="bo in list.inquiry" :key="bo.bo_id" @click="routerPush('inquiry', bo.bo_id)">{{bo.bo_subject}}</b-button></b-col>
        </b-row>

        <b-row v-if="list.as.length > 0">
            <b-col>A/S 신청</b-col>
            <b-col><b-button v-for="bo in list.as" :key="bo.bo_id" @click="routerPush('as', bo.bo_id)">{{bo.bo_subject}}</b-button></b-col>
        </b-row>

        <b-row v-if="list.cancel.length > 0">
            <b-col>취소/교환</b-col>
            <b-col><b-button v-for="bo in list.cancel" :key="bo.bo_id" @click="routerPush('cancel', bo.bo_id)">{{bo.bo_subject}}</b-button></b-col>
        </b-row>

        <b-row v-if="list.gd_inquiry.length > 0">
            <b-col>상품 문의</b-col>
            <b-col><b-button v-for="bo in list.gd_inquiry" :key="bo.bo_id" @click="routerPush('gd_inquiry', bo.bo_id)">{{bo.bo_subject}}</b-button></b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'AdmHeaderReqAsk',
    props:['list'],
    methods: {
        routerPush(cd, id){
            this.$emit('close-modal');
            this.$router.push({ name: 'adm_board_answer', params: { bo_cd:cd, bo_id:id } })
        }
    },
}
</script>
<style lang="css" scoped>
.row .col { display:flex; align-items:center; flex-wrap:wrap; }
.row .col:first-child { flex-basis:17%; max-width:17%; }
.row .col .btn { margin:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:16rem; text-align:left; }
</style>