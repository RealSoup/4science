<template>
<b-container fluid="sm" class="frm_st w_fence">
    <h3>비밀번호 재설정</h3>
    <b-row>
        <b-col>
            <b-form-input type="email" id="email" placeholder="이메일" v-model="email" />
        </b-col>
    </b-row>
    <b-row>
        <b-col class="btn_box">
            <b-button class="blue login" @click="send">이메일 발송</b-button>
        </b-col>
    </b-row>
</b-container>
</template>
<script> 
import ax from '@/api/http';
export default { 
    name: "AuthPasswordReset",
    data() {
        return {
            email: '',
        }
    },
    methods:{
        async send() {
            const res = await ax.post(`password/email`, {email:this.email});
            if (res && res.status === 200) {                        
                Notify.confirm('이메일을 확인해 주세요', 'info');
            }
        },
    },
} 
</script>
<style scoped>
.frm_st { max-width:540px; margin-top:.6rem; }
.frm_st .row .col input { height: calc(1.5em + 1.4rem + 2px); }
.frm_st .row .btn_box { margin-top: 2rem; }
.frm_st .row .btn_box button.login { padding:.65rem; width:100%; }
</style>