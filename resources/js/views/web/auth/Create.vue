<template>
    <b-container class="auth_create">
        <b-row><b-col tag="h1">회원가입</b-col></b-row>

        <FormUser v-model="frm" />
        <FormDealer v-if="$route.params.code == 'dealer'" v-model="frm" />

        <b-row>
            <b-col>
                <b-button variant="danger" class="float-left" @click="$router.go(-1)">취소</b-button>
            </b-col>
            <b-col class="text-right">
                <b-button variant="primary" class="float-right" @click="register" >회원가입</b-button>
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
        'FormUser': () => import('./FormUser.vue'),
        'FormDealer': () => import('./FormDealer.vue'),
    },
    data() {
        return {
           frm:{
               sex:'male',
               receive_mail:'Y',
               receive_sms:'Y',

            //    name:'짐짐국',
            //    email:'dvvb3820@nate.com',
            //    password:'tkskdl38',
            //    password_confirmation:'tkskdl38',
            //    hp:'010-1111-2222',
            //    birth:'2031-12-12',
            //    ub_num:'123-12-12312',
            //    ub_corp_name:'(주)짐짐국',
            //    ub_name:'김짐국 ced 대표',
            //    ub_tel:'070-4334-3433',
            //    ub_zip:'12311',
            //    ub_addr1:'짐국 ㄴㅁㅇㄹ ㄴㅇㄹ 2-3 @ㅇㅇ',
            //    ub_addr2:'f 402 @',
            //    ub_type:'짐국',
            //    ub_cond:'짐국',
           }
        }
    },
    methods:{
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async register(){
            try {
                let frmDt = new FormData();
                let ub_file = document.getElementById("ub_file");
                if(!isEmpty(this.frm.name))                  frmDt.append("name",                    this.frm.name);
                if(!isEmpty(this.frm.sex))                   frmDt.append("sex",                     this.frm.sex);
                if(!isEmpty(this.frm.email))                 frmDt.append("email",                   this.frm.email);
                if(!isEmpty(this.frm.receive_mail))          frmDt.append("receive_mail",            this.frm.receive_mail);
                if(!isEmpty(this.frm.password))              frmDt.append("password",                this.frm.password);
                if(!isEmpty(this.frm.password_confirmation)) frmDt.append("password_confirmation",   this.frm.password_confirmation);
                if(!isEmpty(this.frm.birth))                 frmDt.append("birth",                   this.frm.birth);
                if(!isEmpty(this.frm.hp))                    frmDt.append("hp",                      this.frm.hp);
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
                    if(!isEmpty(this.frm.ub_num))        frmDt.append("ub_num",       this.frm.ub_num);
                    if(!isEmpty(this.frm.ub_file))       frmDt.append("ub_file",      ub_file.files[0]);
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
                    await ax.get('auth_check').then((res) => {
                        console.log(res.data);
                        if (res.data === 1) {
                            ax.get('/api/user').then((response) => {
                                store.state.auth.isLoggedin= true;
                                store.state.auth.user= response.data.user;
                                store.state.auth.csrfToken= response.data.token;
                                document.querySelector('meta[name=csrf-token]').setAttribute('content', response.data.token);
                                this.$router.push({name: 'main'});
                            })
                        }
                    }).catch(() => {});
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
.auth_create { max-width: 992px; }
.auth_create .form-group { margin:0; }
.auth_create .row { margin-bottom:1rem; }
.auth_create .col label.required::before { content: "✭"; color:red; }
.auth_create .col .interest_etc { width:auto; }
</style>
