<template>
<b-container class="w_fence" :class="{simple:$route.params.code == 'sync'}">
    <h3>회원가입 정보 입력</h3>
    <form-sync v-if="$route.params.code == 'sync'" v-model="frm" @register="register" />
    <form-comp v-else ref="form_comp" v-model="frm" />
    <b-row>
        <b-col class="btn_box">
            <b-button class="blue xl" @click="register">
                회원 <span v-if="$route.params.code == 'sync'">연동</span><span v-else>가입</span>하기
            </b-button>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import store from '@/store/index';

export default {
    name: "AuthCreate",
    components: {
        'form-comp': () => import('./_comp/FormComp'),
        'form-sync': () => import('./_comp/FormSync'),
    },
    data() {
        return {
            frm:{
                check:{
                    inexus:'Y',
                    personal:'Y',
                    marketing:'N',
                    receive_mail:'N',
                    receive_sms:'N',
                },
                email       :this.$route.query.email?this.$route.query.email:'',
                name        :this.$route.query.name?this.$route.query.name:'',
                provider    :this.$route.query.provider?this.$route.query.provider:'',
                social_id   :this.$route.query.social_id?this.$route.query.social_id:'',
                social_token:this.$route.query.social_token?this.$route.query.social_token:'',
                receive_sms : 'Y',
                receive_mail: 'Y',
                file_info   :[],
                code_01     :this.$route.query.f_code?this.$route.query.f_code:'',
            },
            active_mode: 'inter_lock',
        }
    },
    
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async register(){
            try {
                if (this.frm.check.inexus !== 'Y')     { 
                    Notify.toast('danger', "(주)아이넥서스 이용약관에 동의 해주세요.");
                    document.getElementById('hp01').scrollIntoView();
                    return false;
                }
                if (this.frm.check.personal !== 'Y')    { 
                    Notify.toast('danger', "개인정보 수집 및 이용에 동의 해주세요.");
                    document.getElementById('hp01').scrollIntoView();
                    return false;
                }

                let url = "/register";
                if (this.$route.params.code == 'sync')
                     url = "/social/connectExistAccount";
                
                this.frm.hp = `${this.frm.hp01}-${this.frm.hp02}-${this.frm.hp03}`;
                if ( this.frm.level == 11 ) {
                    this.frm.ub_num = `${this.frm.ub_num01}-${this.frm.ub_num02}-${this.frm.ub_num03}`;
                    this.frm.file_info.length = this.frm.file_info.length;
                }
                let reg = await ax.post(`${url}`, this.frm);
                if (reg && reg.status === 201) {
                    if ( this.frm.level == 11 )
                        await this.$refs.form_comp.$refs.form_dealer.$refs.fileupload.fileProcessor(reg.data);
                    if(!isEmpty(this.$route.query.provider)) {
                        Notify.modal('가입 완료', 'success');
                        await this.$store.dispatch('auth/getAuth');
                        this.$router.push({name: 'main'});
                    } else if (this.$route.params.code == 'sync') {    
                        Notify.modal('연동 되었습니다.', 'success');
                        await this.$store.dispatch('auth/getAuth');
                        this.$store.dispatch('cart/index');
                        this.$router.push({name: 'main'});
                    } else                                        
                        this.$router.push({name: 'email_verify'});

                    
                    // await ax.get('auth_check').then((res) => {
                    //     if (res.data === 1) {
                    //         ax.get('/api/user').then((response) => {
                    //             store.state.auth.isLoggedin= true;
                    //             store.state.auth.user= response.data.user;
                    //             store.state.auth.csrfToken= response.data.token;
                    //             document.querySelector('meta[name=csrf-token]').setAttribute('content', response.data.token);
                    //             this.$router.push({name: 'main'});
                    //         })
                    //     }
                    // }).catch(() => {});
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    beforeRouteEnter(to, from, next) {
        if (store.state.auth.isLoggedin) {
            return next('/');
        }
        next();
    },
    mounted() {
        if (this.$route.params.code == 'dealer')
            this.frm.level = 11;
        if (this.$route.query.msg_type == 'duplicate')
            Notify.modal('이미 가입된 이메일입니다. 로그인하여 연동하세요.', 'warning');
    },
}
</script>

<style lang="css">
.w_fence { max-width:1436px; }
.w_fence.simple { max-width:500px; }
.form_box.active { border:3px solid red; }
</style>