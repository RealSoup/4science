<template>
<b-container class="w_fence">
    <h3>회원정보 수정</h3>

    <form-comp ref="form_comp" v-model="frm"></form-comp>

    <b-row><b-col class="btn_box"><b-button class="blue xl" @click="update">적용</b-button></b-col></b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: 'MyUserEdit',
    components: {
        'form-comp': () => import('@/views/web/auth/_comp/FormComp'),
    },
    data() {
        return {
            frm:{},
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },
    methods: {
        async update(){
            // const isValid = await this.$refs.observer.validate();
            // if (isValid) {
                try {
                    this.frm._method = 'PATCH';
                    
                    if ( this.frm.level == 11 ) {
                        this.frm.ub_num = `${this.frm.ub_num01}-${this.frm.ub_num02}-${this.frm.ub_num03}`;
                        this.frm.file_info.length = this.frm.file_info.length;
                    }
                    const res = await ax.post(`/api/user`, this.frm);
                    if (res && res.status === 201) {
                        if ( this.frm.level == 11 )
                            await this.$refs.form_comp.$refs.form_dealer.$refs.fileupload.fileProcessor(res.data);
                        Notify.toast('success', "회원정보 수정 완료");
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            // }
        },
        
    },
    async mounted() {
        try {
            const res = await ax.get(`/api/user/${Auth.user().id}/edit`);
            if (res && res.status === 200) {
                this.frm = Object.assign( 
                    {}, 
                    {
                        check:{
                            inexus:'Y',
                            personal:'Y',
                            marketing:'N',
                            receive_mail:'N',
                            receive_sms:'N',
                        },
                    },
                    this.$store.state.auth.user,
                    res.data,
                );
            }
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.responsee);
        }
    },
};
</script>

<style lang="scss" scoped>
.print .col.cell01 { margin-bottom:15px; }
.print .col.cell02 { margin-top:15px; }
.print .col .inner_wrap { background:#eee; border-radius:10px; display:flex; justify-content:center; align-items:center; height:100%; min-height:170px; cursor:pointer; flex-wrap:wrap; align-content: center; }
.print .col .inner_wrap p { width:100%; text-align: center; }
@media (max-width: 992px) {
    .print .col.cell02 { margin-bottom:15px; }
    .print .col.cell03 { margin-bottom:15px; }
    .print .col.cell04 { margin-top:15px; }
    .print .col.cell05 { margin-top:15px; }
}
@media (max-width: 576px) {
    .print .col.cell02 { margin-top:0; }
    .print .col.cell04 { margin-top:0; }
}
</style>
