<template>
<b-container fluid="sm" class="frm_st w_fence">
    <h3>비밀번호 재설정</h3>
    <template v-if="!is_send">
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
    </template>
    <template v-else>
        <b-row class="after_send fir">
            <b-col>
                <b>{{email}}</b>으로 비밀번호 재설정 이메일을 발송하였습니다.
            </b-col>
        </b-row>
        <b-row class="after_send sec">
            <b-col>
                <p>이메일을 받지 못하셨나요?</p>
                스팸함을 확인해보시거나, 입력하신 이메일이 가입시 입력한 이메일과 일치하는지 확인해주세요. <br />
                이메일을 잊으신 경우, 먼저 이메일 찾기를 진행해주세요.
                <b-button :to="{name: 'login'}"  class="sm blue" >이메일 찾기 ></b-button>
            </b-col>
        </b-row>
    </template>
</b-container>
</template>
<script> 
import ax from '@/api/http';
export default { 
    name: "AuthPasswordForgot",
    data() {
        return {
            email: '',
            is_send: false,
        }
    },
    methods:{
        async send() {
            const res = await ax.post(`password/email`, {email:this.email});
            if (res && res.status === 200) {                     
                this.is_send = true;   
                // Notify.modal('비밀번호 재설정 메일이 발송 되었습니다. 입력하신 이메일을 확인 바랍니다.', 'info');
            }
        },
    },
} 
</script>
<style scoped>
.frm_st { max-width:540px; margin-top:.6rem; }
.frm_st h3 { text-align:center; font-size:3rem; }
.frm_st .row .col input { height: calc(1.5em + 1.4rem + 2px); }
.frm_st .row .btn_box { margin-top: 2rem; }
.frm_st .row .btn_box button.login { padding:.65rem; width:100%; }

.frm_st .after_send.fir { font-weight:600; }
.frm_st .after_send.fir b { color:#0094ea; display:inline-block; margin:0 8px; font-weight:900; }
.frm_st .after_send.sec p { font-weight:600; text-align:center; margin:0;}
</style>