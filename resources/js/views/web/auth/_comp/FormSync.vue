<template>
<b-row class="frm_st">
    <b-col>
        <b-row> <b-col> <h4>기존 계정 로그인</h4> </b-col> </b-row>
        <b-row>
            <b-col>
                <validation-provider name="이메일" rules="required|email" v-slot="validationContext">
                    <b-form-input type="email" id="email" placeholder="이메일" v-model="value.email" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <validation-provider name="패스워드" :rules="{ required:true, min:3 }" v-slot="validationContext">
                    <b-form-input type="password" id="password" placeholder="비밀번호" v-model="value.password" :state="getValidationState(validationContext)" @keyup.enter="login" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
            </b-col>
        </b-row> 
    </b-col>
</b-row>
</template>
<script>
export default {
    name:"Auth_CompFormInterLock",
    components: { 'Validation': () => import('@/views/_common/Validation'), },
    props: ['value'],  
    methods: { getValidationState({ dirty, validated, valid = null }) { return dirty || validated ? valid : null; }, },
}
</script>
<style lang="css" scoped>
.frm_st .row { margin-bottom: 1.3rem; }
.frm_st .row .col input { height: calc(1.5em + 1.5rem + 2px); font-size:1rem; }
</style>