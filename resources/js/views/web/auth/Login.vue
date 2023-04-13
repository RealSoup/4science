<template>
<b-container fluid id="login_frm" class="frm_st" :class="{w_fence:$route.name == 'login'}">
    <h3 v-if="$route.name == 'login'">로그인</h3>
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
        <b-link class="col" href="/social/naver"><img :src="s3url+'auth/naver_login.png'" /></b-link>
        <b-link class="col" href="/social/kakao"><img :src="s3url+'auth/kakao_login.png'" /></b-link>
    </b-row>
    <b-row class="find_email">
        <b-col>
            <b-link @click="view_finder = !view_finder">예전 아이디로 등록된 이메일 찾기</b-link>
            <validation-provider name="아이디" :rules="{ required:true, min:3 }" v-slot="validationContext" v-if="view_finder">
                <b-form-input placeholder="아이디를 입력하세요." v-model="frm.id" :state="getValidationState(validationContext)"  @keyup.enter="find_email" />
                <b @click="find_email"><font-awesome-icon icon="search" /></b>
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
            </validation-provider>
        </b-col>
    </b-row>

</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: "login",
    data() {
        return {
            frm:{
                email: '',
                password: '',
                id: '',
            },
            view_finder: false,
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
        async find_email() {
            try {
                let res = await ax.post('auth/user/find_email', this.frm);
                if (res && res.status === 200) Notify.modal(res.data, 'success');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
    },
    mounted() {
        
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
.frm_st { max-width:450px; margin-top:.75rem; }
.frm_st h3 { text-align:center; font-size:3rem; }
.frm_st .row { margin: 0 0 1.3rem 0; }
.frm_st .row .col input { height: calc(1.5em + 1.5rem + 2px); font-size:1rem; }

.frm_st .btn_box { margin:0; }
.frm_st .link .login { padding:.75rem; width:100%; }
.frm_st .link.link_auth { border-bottom:2px solid #C2C2C2; padding:1.31rem 0; margin:0 0 2rem 0;}
.frm_st .link.link_auth a { color:#898989; font-size:.95rem; display:inline-block; padding:0; cursor:pointer; }
.frm_st .link.link_auth a span { display:inline-block; width:100%; line-height:1; text-align:center; }
.frm_st .link.link_auth a:not(:last-child) span { border-right:1px solid #D7D7D7; }
.frm_st .link:last-child .col { text-align:center; margin-top:1.86rem; }
.frm_st .link:last-child .col:first-child { padding-right:5px; }
.frm_st .link:last-child .col:last-child { padding-left:5px; }
.frm_st .link:last-child .col img { width:100%; max-width:205px;}
.frm_st .find_email .col { border:1px solid #626262; padding:.6rem 0; margin-bottom:1.5rem; }
.frm_st .find_email .col a { color:#939393; text-align:center; display:block; }
.frm_st .find_email .col span { width:60%; margin: auto; display: block; position: relative; margin-top: 0.8rem; }
.frm_st .find_email .col input { border-bottom: 1px solid #0094EA; background: #fff; border-radius: 0; height: calc(1.1em + 1.1rem + 2px); }
.frm_st .find_email .col b { display: block; width: 38px; height: 38px; font-size: 1.3rem; position: absolute; top: 0; right: 0;}
.frm_st .find_email .col b svg { color:#0094EA; cursor: pointer; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); }
</style>