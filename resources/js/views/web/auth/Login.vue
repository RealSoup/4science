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
    <b-row class="link btn_box01" :class="{adm_true:is_mng_email}">
        <b-button class="blue" @click="login">로그인</b-button>
        <b-button v-if="is_mng_email" class="plum" @click="login('adm')">GO 관리자</b-button>
    </b-row>
    <b-row class="link link_auth">
        <!--b-link class="col" @click="login"><span>아이디 찾기</span></!--b-link-->
        <b-link class="col" @click="find_pw"><span>비밀번호 재설정</span></b-link>
        <b-link class="col" @click="join"><span>회원가입</span></b-link>
    </b-row>
    <b-row class="link sns">
        <b-link class="col" href="/social/naver"><img :src="s3url+'auth/naver_login.png'" /></b-link>
        <b-link class="col" href="/social/kakao"><img :src="s3url+'auth/kakao_login.png'" /></b-link>
    </b-row>
    <b-row class="find_email">
        <b-col>
            <b-link @click="view_finder = !view_finder">이메일 찾기</b-link>

            <b-row v-if="view_finder">
                <b-col>
                    <p>기존 아이디로 찾기</p>
                    <span>
                        <b-form-input v-model="frm.id" @keyup.enter="find_email" />
                        <b @click="find_email"><font-awesome-icon icon="search" /></b>
                    </span>
                </b-col>
                
                <b-col>
                    <p>이름과 휴대폰번호로 찾기</p>
                    <div>
                        <span><b-form-input v-model="frm.name" /></span>
                        <span>
                            <b-form-input v-model="frm.hp" @keyup.enter="find_email" :formatter="frm_formatHp" />
                            <b @click="find_email"><font-awesome-icon icon="search" /></b>
                        </span>
                    </div>
                </b-col>
            </b-row>
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
                go_adm: false,
            },
            view_finder: false,
            mng_list: [],
            is_mng_email: false,
        }
    },
    watch: {
        'frm.email': {
            handler(n, o) {
                if(this.mng_list.length)
                    this.email_check();
            },
            deep: true,
            // immediate: true,
        },
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async login(mode=null) {
            if(this.$store.state.auth.unAuth_user)
                await ax.post('/logout');
            if (mode=='adm')
                this.frm.go_adm=true;
            await this.$store.dispatch('auth/login', this.frm);
            this.$emit('close-modal');
            this.$store.dispatch('cart/index');
            if (this.$route.name === 'login') {
                let destination_name = this.$route.params.route_name ?? 'main';
                this.$router.push({name: destination_name, params: this.$route.params.params, query: this.$route.params.query});
            }
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
                if (res && res.status === 200) Notify.modal(res.data, 'info', '가입되어있는 이메일 주소 입니다.');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        frm_formatHp(v) { return this.formatHp(v); },
        email_check() {
            if (this.mng_list.indexOf(this.frm.email.trim()) !== -1)
                this.is_mng_email = true;
            else 
                this.is_mng_email = false;
        },
    },
    async mounted() {
        let rst = await ax.get(`/api/auth/user/mngList`);
        this.mng_list = rst.data;
        if( this.frm.email.trim() !== '' )
            this.email_check();
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
.w_fence { padding-top: calc(1vw + 1.8rem); }
.frm_st { max-width:450px; margin-top:.75rem; }
.frm_st h3 { text-align:center; font-size:3rem; }
.frm_st .row { margin: 0 0 1.3rem 0; }
.frm_st .row .col input { height: calc(1.5em + 1.5rem + 2px); font-size:1rem; }

.frm_st .btn_box01 { margin:0; }
.frm_st .btn_box01 button { padding:.75rem; width:100%; }
.frm_st .btn_box01.adm_true button { flex: 0 0 48%; max-width:48%; margin:1%; }
.frm_st .link.link_auth { border-bottom:2px solid #C2C2C2; padding:1.31rem 0; margin:0 0 2rem 0;}
.frm_st .link.link_auth a { color:#898989; font-size:.95rem; display:inline-block; padding:0; cursor:pointer; }
.frm_st .link.link_auth a span { display:inline-block; width:100%; line-height:1; text-align:center; }
.frm_st .link.link_auth a:not(:last-child) span { border-right:1px solid #D7D7D7; }
.frm_st .link.sns .col { flex:0 0 48%; max-width:48%; margin:1%; }
.frm_st .link.sns .col img { width:100%; }
 
.frm_st .find_email>.col { border:3px solid #4EB8C8; border-radius:.4rem; margin-bottom:1.5rem; }
.frm_st .find_email .col a { background-color:#4EB8C8; color:#fff; font-weight:600; text-align:center; display:block; padding:.6rem 0; }
.frm_st .find_email>.col>.row { margin-bottom:0 !important; }
.frm_st .find_email .col .row .col { padding-bottom:.2rem; }
.frm_st .find_email .col .row .col:first-of-type { border-right:2px solid #4EB8C8; flex:0 0 40%; max-width:40%; }
.frm_st .find_email .col .row .col p { text-align:center; font-size:.9rem; margin-bottom: 0.5rem; }

.frm_st .find_email .col .row .col span { display:block; position:relative; margin:0 .5rem; height:30px; }
.frm_st .find_email .col .row .col:last-child div { display:flex;  }
.frm_st .find_email .col .row .col:last-child div span { flex-basis:0; flex-grow:1; max-width:100%; }
.frm_st .find_email .col .row .col:last-child div span:first-of-type { flex:0 0 29%; max-width:29%; }
.frm_st .find_email .col .row .col:last-child div span:first-of-type:after { content:'/'; position:absolute; right:-.75rem; bottom:0; font-size:1.5rem; line-height:1.24; }
.frm_st .find_email .col .row .col:last-child div span:first-of-type input { width:100%; }

.frm_st .find_email .col .row .col span input { width:calc(100% - 30px); border:1px solid #BBB; padding:2px 6px; background:#fff; border-radius:.3rem; height:30px; }
.frm_st .find_email .col .row .col span b { display: block; width:30px; height:30px; font-size: 1.3rem; position: absolute; bottom:0; right:0;}
.frm_st .find_email .col .row .col span b svg { color:#BBB; cursor: pointer; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); }
</style>