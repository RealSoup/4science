<template>
<b-card header="이메일 주소 인증 확인">
        계속하기 전에 이메일에서 확인 링크를 확인하십시오.
        <br />
        이메일을 받지 못한 경우 다른 이메일을 요청하려면 
        <b-button size="sm" variant="light" @click="resend">여기를 클릭하십시오.</b-button>
</b-card>
</template>
<script> 
import ax from '@/api/http';
export default { 
    name: "AuthEmailVerify",
    methods:{
        resend() {
            ax.post(`email/resend`);
        },
    },
} 
</script>
<style scoped>
.card { margin:1rem auto; max-width:640px; }
.card .card-body a { color:#007bff; }
</style>