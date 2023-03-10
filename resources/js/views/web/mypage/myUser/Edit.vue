<template>
<b-container class="w_fence">
    <h3>회원정보 수정</h3>

    <FormComp v-model="frm" />

    <b-row>
        <b-col class="btn_box">
            <b-button class="blue xl" @click="update">적용</b-button>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
import { mapGetters } from 'vuex'

export default {
    name: 'MyUserEdit',
    components: {
        'FormComp': () => import('@/views/web/auth/_comp/FormComp'),
    },
    data() {
        return {
            frm:Object.assign( 
                {}, 
                {
                    ub_file:[],
                    check:{
                        inexus:'Y',
                        personal:'Y',
                        marketing:'N',
                        receive_mail:'N',
                        receive_sms:'N',
                    },
                },
                this.$store.state.auth.user 
            ),
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
                    this.frm = Object.assign(
                        {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                        this.frm, // 수정하려는 객체
                        {
                            _method : 'PATCH',
                            hp: `${this.frm.hp01}-${this.frm.hp02}-${this.frm.hp03}`,
                        } // 삽입하려는 내용
                    );
                    const res = await ax.post(`/api/user`, this.frm);
                    if (res && res.status === 200)
                         Notify.toast('success', "회원정보 수정 완료");
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.response.data.message);
                }
            // }
        },
        
    },
    mounted() {
        // this.frm = this.user;
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
