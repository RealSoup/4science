<template>
<b-container fluid="sm" class="frm_st w_fence">
    <h3>비밀번호 재설정</h3>
    <b-row>
        <b-col>
            <!-- vid <= 이건 오타가 아니라 비밀번호 확인시 유효성 검증을 위한 키워드이다 (  Validation ID) -->
            <validation-provider vid="password" name="비밀번호" rules="required|min:6|pwCheck" v-slot="validationContext">
                <b-form-input type="password" id="password" placeholder="6자 영문, 숫자" v-model="frm.password" :state="getValidationState(validationContext)" />
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <validation-provider name="비밀번호 확인" rules="required|confirmed:password" v-slot="validationContext">
                <b-form-input type="password" id="password_confirmation" placeholder="비밀번호 확인" v-model="frm.password_confirmation" :state="getValidationState(validationContext)" @keyup.enter="update" />
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
        </b-col>
    </b-row>
    <b-row>
        <b-col class="btn_box">
            <b-button class="blue login" @click="update">비밀번호 재설정</b-button>
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
            frm:{
                email: this.$route.query.email,
                token: this.$route.params.token,
            },
        }
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async update() {
            const res = await ax.post(`password/reset`, this.frm);
            if (res && res.status === 200) {                        
                Notify.confirm('비밀번호가 재설정 되었습니다.<br>로그인 해주세요', 'success');
                this.$router.push({name: 'login'});
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