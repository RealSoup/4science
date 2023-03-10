<template>
<b-container class="w_fence" :class="{simple:$route.params.code == 'sync'}">
    <h3>회원가입 정보 입력</h3>
    <FormSync v-if="$route.params.code == 'sync'" v-model="frm" @register="register" />
    <FormComp v-else ref="form_comp" v-model="frm" />
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
        'FormComp': () => import('./_comp/FormComp'),
        'FormSync': () => import('./_comp/FormSync'),
    },
    data() {
        return {
            frm:{
            //    sex:'male',
                ub_file:[],
                check:{
                    inexus:'Y',
                    personal:'Y',
                    marketing:'N',
                    receive_mail:'N',
                    receive_sms:'N',
                },
                email:this.$route.query.email?this.$route.query.email:'',
                name:this.$route.query.name?this.$route.query.name:'',
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

                let frmDt = new FormData();
                // let ub_file = document.getElementById("ub_file");
                if(!isEmpty(this.frm.name))                  frmDt.append("name",                    this.frm.name);
                if(!isEmpty(this.frm.sex))                   frmDt.append("sex",                     this.frm.sex);
                if(!isEmpty(this.frm.email))                 frmDt.append("email",                   this.frm.email);
                if(!isEmpty(this.frm.receive_mail))          frmDt.append("receive_mail",            this.frm.receive_mail);
                if(!isEmpty(this.frm.password))              frmDt.append("password",                this.frm.password);
                if(!isEmpty(this.frm.password_confirmation)) frmDt.append("password_confirmation",   this.frm.password_confirmation);
                if(!isEmpty(this.frm.birth))                 frmDt.append("birth",                   this.frm.birth);
                if(!isEmpty(this.frm.hp01))                  frmDt.append("hp",                      `${this.frm.hp01}-${this.frm.hp02}-${this.frm.hp03}`);
                if(!isEmpty(this.frm.receive_sms))           frmDt.append("receive_sms",             this.frm.receive_sms);
                if(!isEmpty(this.frm.tel))                   frmDt.append("tel",                     this.frm.tel);
                if(!isEmpty(this.frm.fax))                   frmDt.append("fax",                     this.frm.fax);
                if(!isEmpty(this.frm.job))                   frmDt.append("job",                     this.frm.job);
                if(!isEmpty(this.frm.office))                frmDt.append("office",                  this.frm.office);
                if(!isEmpty(this.frm.department))            frmDt.append("department",              this.frm.department);
                if(!isEmpty(this.frm.grade))                 frmDt.append("grade",                   this.frm.grade);
                if(!isEmpty(this.frm.tutor))                 frmDt.append("tutor",                   this.frm.tutor);
                if(!isEmpty(this.frm.offer))                 frmDt.append("offer",                   this.frm.offer);
                if(!isEmpty(this.frm.offer_lab))             frmDt.append("offer_lab",               this.frm.offer_lab);
                if(!isEmpty(this.frm.interest))              frmDt.append("interest",                this.frm.interest);
                if(!isEmpty(this.frm.interest_etc))          frmDt.append("interest_etc",            this.frm.interest_etc);
                if(!isEmpty(this.frm.join_route))            frmDt.append("join_route",              this.frm.join_route);
                if(!isEmpty(this.$route.query.provider))     frmDt.append("provider",                this.$route.query.provider);
                if(!isEmpty(this.$route.query.social_id))    frmDt.append("social_id",               this.$route.query.social_id);
                if(!isEmpty(this.$route.query.social_token)) frmDt.append("social_token",            this.$route.query.social_token);
                if (this.$route.params.code == 'dealer') {
                    if(!isEmpty(this.frm.level))         frmDt.append("level",        this.frm.level);
                    if(!isEmpty(this.frm.ub_num01))      frmDt.append("ub_num",       `${this.frm.ub_num01}-${this.frm.ub_num02}-${this.frm.ub_num03}`);
                    if(!isEmpty(this.frm.ub_file.length))frmDt.append("ub_file",      this.frm.ub_file.length);
                    if(!isEmpty(this.frm.ub_corp_name))  frmDt.append("ub_corp_name", this.frm.ub_corp_name);
                    if(!isEmpty(this.frm.ub_name))       frmDt.append("ub_name",      this.frm.ub_name);
                    if(!isEmpty(this.frm.ub_tel))        frmDt.append("ub_tel",       this.frm.ub_tel);
                    if(!isEmpty(this.frm.ub_zip))        frmDt.append("ub_zip",       this.frm.ub_zip);
                    if(!isEmpty(this.frm.ub_addr1))      frmDt.append("ub_addr1",     this.frm.ub_addr1);
                    if(!isEmpty(this.frm.ub_addr2))      frmDt.append("ub_addr2",     this.frm.ub_addr2);
                    if(!isEmpty(this.frm.ub_type))       frmDt.append("ub_type",      this.frm.ub_type);
                    if(!isEmpty(this.frm.ub_cond))       frmDt.append("ub_cond",      this.frm.ub_cond); 
                }

                let url = "/register";
                if (this.$route.params.code == 'sync')
                     url = "/social/connectExistAccount";
                let reg = await ax.post(`${url}`, frmDt);
                if (reg && reg.status === 201) {
                    if ( this.frm.level == 10 )
                        await this.$refs.form_comp.$refs.form_dealer.$refs.fileupload.fileProcessor(reg.data);
                    if(!isEmpty(this.$route.query.provider)) {
                        Notify.modal('가입 완료', 'success');
                        await this.$store.dispatch('auth/getAuth');
                        this.$router.push({name: 'main'});
                    } else if (this.$route.params.code == 'sync') {
                        console.log(reg);          
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
            this.frm.level = 10;
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