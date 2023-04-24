<template>
<div>
<b-row><b-col tag="h4">상품권 신청</b-col></b-row>
<b-row>
    <b-col>
        <b-card class="shadow">
            <b-button v-for="(ml, i) in list" :key="i" @click="routerPush(ml.ml_uid)">{{ml.user.name}}</b-button>
        </b-card>
    </b-col>
</b-row>
</div>
</template>

<script>
export default {
    name: 'AdmHeaderReqVoucher',
    props:['list'],
    methods: {
        routerPush(id){
            this.$emit('close-modal');
            this.$router.push({ name: 'adm_user_edit', params: { id:id } })
        }
    },
}
</script>
<style lang="css" scoped>
h4 { font-weight:900; margin-bottom:.5rem; }
button { margin:10px; }
</style>