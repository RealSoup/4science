<template>
<b-card header="이메일 주소 인증 확인">
    가입시 입력한 이메일로 가서 링크를 클릭하세요. <br />
    이메일을 받지 못한 경우 재전송 버튼을 누르세요.

    <div>
        발송된 인증 링크는 <i>한 시간 후</i> <b>만료</b> 됩니다. <br />
        만료되었다면 재전송 하시기 바랍니다.
    </div>
    <b-button size="sm" @click="resend">재전송</b-button>
</b-card>
</template>
<script> 
import ax from '@/api/http';
export default { 
    name: "AuthEmailVerify",
    data() { return { interval:null, }; },
    methods:{
        async resend() {
            const res = await ax.post(`email/resend`);
            if (res && res.status === 202) Notify.modal('이메일이 재전송 되었습니다.', 'success');
        },
    },
    mounted() {
        if (this.$store.state.auth.isLoggedin) {
            this.$router.push({ name: 'main'});
        } else {
            this.interval = setInterval(() => {
                if (this.$store.state.auth.isLoggedin) {
                    clearInterval(this.interval);
                    this.$router.push({ name: 'main'});
                } else
                    this.$store.dispatch('auth/getAuth');
            }, 3000);
        }
    },
    
} 
</script>
<style scoped>
.card { margin:1rem auto; max-width:640px; }
.card .card-body div { margin-top:1em; }
.card .card-body div i { font-weight:bold; color:#007bff; font-size:1.3em; }
.card .card-body div b { font-weight:bolder; color:red; font-size:1.8em; display: inline-block; margin-left:.5em; }
.card .card-body a { color:#007bff; }
</style>