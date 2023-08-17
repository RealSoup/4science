<template>
<div class="p_wrap layout">
    <h3>대량 메일</h3>
    <div class="act_ctrl">
        <b-row>
            <b-col><b-button class="white sm" :to="{name: 'adm_user_email'}">목록</b-button></b-col>
            <b-col class="text-right"><b-button class="blue sm" @click="store">저장</b-button></b-col>
        </b-row>
    </div>
    
    <email-form v-model="frm" />

</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmUserEmailCreat',
    components: { 'email-form': () => import('./EmailForm'), },
    data() { return { frm: {} }; },
    methods: {
        async store() {
            const res = await ax.post(`/api/admin/user/email`, this.frm);
            if (res && res.status === 200) {
                Notify.toast('success', '작성 완료');
                this.$router.push({ name: 'adm_user_email_send', params: { id:res.data } });
            }
        },
    },
}
</script>

<style lang="css" scoped>
.p_wrap .frm01 .row .col select {max-width:10rem;}
</style>
