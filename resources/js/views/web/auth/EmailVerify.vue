<template>
<b-card header="이메일 주소 인증 확인">
    가입시 입력한 이메일로 가서 링크를 클릭하세요. <br />
    이메일을 받지 못한 경우 재전송 버튼을 누르세요.
    <b-button size="sm" @click="resend">재전송</b-button>
</b-card>
</template>
<script> 
import ax from '@/api/http';
export default { 
    name: "AuthEmailVerify",
    methods:{
        async resend() {
            const res = await ax.post(`email/resend`);
            if (res && res.status === 202) Notify.modal('이메일이 재전송 되었습니다.', 'success');
        },
    },
} 
</script>
<style scoped>
.card { margin:1rem auto; max-width:640px; }
.card .card-body a { color:#007bff; }
</style>