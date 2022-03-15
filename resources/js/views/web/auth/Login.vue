<template>
    <div class="auth">
        <h1>로그인</h1>
        <b-form class="frm">
            <validation-provider
                name="이메일"
                rules="required|email"
                v-slot="validationContext">
                <b-form-group
                    label="이메일 주소"
                    label-for="email"
                >
                    <b-form-input type="email" id="email" placeholder="Enter email" v-model="frm.email" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <validation-provider
                name="패스워드"
                :rules="{ required:true, min:3 }"
                v-slot="validationContext">
                <b-form-group
                    label="비밀번호"
                    label-for="password"
                >
                    <b-form-input type="password" id="password" placeholder="비밀번호를 입력하세요"
                        v-model="frm.password"
                        :state="getValidationState(validationContext)">
                    </b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>


            <div class="text-center">
                <b-button variant="primary" @click="login" >로그인</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import ax from '@/api/http';
import store from '@/store/index';

export default {
    name: "login",
    data() {
        return {
            frm:{
                email: 'kjk@4science.net',
                password: 'tkskdl38',
            },
        }
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async login() {
            await this.$store.dispatch('auth/login', this.frm);
            this.$store.dispatch('cart/index');
            if (this.$route.name === 'login')
                this.$router.push(this.$route.query.redirect || '/');
        },
    },
    // beforeRouteEnter(to, from, next) {
    //     if (store.state.auth.isLoggedin) {
    //         return next('/');
    //     }
    //     next();
    // }
}
</script>
