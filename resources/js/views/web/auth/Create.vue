<template>
    <b-container class="auth_create w_fence">
        <h3>회원가입 정보 입력</h3>
        <FormComp ref="form_comp" v-model="frm" />
        <b-row><b-col class="btn_box"><b-button class="blue xl" @click="register">회원 가입하기</b-button></b-col></b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import store from '@/store/index';

export default {
    name: "AuthCreate",
    components: {
        'FormComp': () => import('./_comp/FormComp'),
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
name: 'qwe',
email: 'kjk@4science.net',
password: 'qwe123',
password_confirmation: 'qwe123',
birth: '1911-11-11',
hp01: '010',
hp02: '1111',
hp03: '1111',
ub_num01: '111',
ub_num02: '11',
ub_num03: '11111',
ub_corp_name: 'w',
ub_name: 'are',
ub_tel: '123-1231-2312',
ub_zip: '16886',
ub_addr1: '경기 용인시 처인구 모현읍 능곡로56번길 34 ',
ub_addr2: 'ㅁㅇㄴㄹ',
ub_type: 'asdf',
ub_cond: 'sfd',
            },
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

                let reg = await ax.post(`/register`, frmDt);
                if (reg && reg.status === 201) {
                    if ( this.frm.level == 10 ) {
                        console.log(this.frm.level);
                        await this.$refs.form_comp.$refs.form_dealer.$refs.fileupload.fileProcessor(reg.data);
                    }
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
    },
}
</script>

<style lang="css">
.auth_create { max-width:1436px; }
</style>