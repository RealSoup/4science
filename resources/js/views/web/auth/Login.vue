<template>
    <b-container fluid class="w_fence frm_st">
        <h3>로그인</h3>
        <b-row>
            <b-col>
                <validation-provider name="이메일" rules="required|email" v-slot="validationContext">
                    <b-form-input type="email" id="email" placeholder="이메일" v-model="frm.email" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <validation-provider name="패스워드" :rules="{ required:true, min:3 }" v-slot="validationContext">
                    <b-form-input type="password" id="password" placeholder="비밀번호" v-model="frm.password" :state="getValidationState(validationContext)" @keyup.enter="login" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
            </b-col>
        </b-row>
        <b-row class="link btn_box">
            <b-button class="blue login" @click="login">로그인</b-button>
        </b-row>
        <b-row class="link link_auth">
            <!--b-link class="col" @click="login"><span>아이디 찾기</span></!--b-link-->
            <b-link class="col" @click="find_pw"><span>비밀번호 재설정</span></b-link>
            <b-link class="col" @click="join"><span>회원가입</span></b-link>
        </b-row>
        <b-row class="link">
            <b-link class="col"><img :src="s3url+'auth/naver_login.png'" /></b-link>
            <b-link class="col"><img :src="s3url+'auth/kakao_login.png'" /></b-link>
        </b-row>

    </b-container>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            frm:{
                email: '',
                password: '',
            },
        }
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async login() {
            await this.$store.dispatch('auth/login', this.frm);
            this.$emit('close-modal');
            this.$store.dispatch('cart/index');
            if (this.$route.name === 'login')
                this.$router.push(this.$route.query.redirect || '/');
        },
        find_pw() {
            this.$emit('close-modal');
            this.$router.push({name: 'auth_password_forgot'});
        },
        join() {
            this.$emit('close-modal');
             this.$router.push({name: 'auth_intro'});
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

<style scoped>
.frm_st { max-width:540px; margin-top:.75rem; }
.frm_st h3 { text-align:center; font-size:3rem; }
.frm_st .row { margin-bottom: 1.3rem; }
.frm_st .row .col input { height: calc(1.5em + 1.5rem + 2px); font-size:1rem; }

.frm_st .btn_box { margin:0; }
.frm_st .link .login { padding:.75rem; width:100%; }
.frm_st .link.link_auth { border-bottom:2px solid #C2C2C2; padding:1.61rem 0; margin:0;}
.frm_st .link.link_auth a { color:#898989; font-size:.95rem; display:inline-block; padding:0; cursor:pointer; }
.frm_st .link.link_auth a span { display:inline-block; width:100%; line-height:1; text-align:center; }
.frm_st .link.link_auth a:not(:last-child) span { border-right:1px solid #D7D7D7; }
.frm_st .link:last-child .col { text-align:center; margin-top:1.86rem; }
.frm_st .link:last-child .col:first-child { padding-right:5px; }
.frm_st .link:last-child .col:last-child { padding-left:5px; }
.frm_st .link:last-child .col img { width:100%; max-width:205px;}
</style>