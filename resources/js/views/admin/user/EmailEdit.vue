<template>
<div class="p_wrap layout">
    <h3>대량 메일</h3>
    <div class="act_ctrl">
        <b-row>
            <b-col><b-button class="white sm" :to="{name: 'adm_user_email'}">목록</b-button></b-col>
            <b-col class="text-right">
                <b-button class="red sm" @click="destroy">삭제</b-button>
                <b-button class="orange sm" @click="update">수정</b-button>
            </b-col>
        </b-row>
    </div>
    
    <email-form v-model="frm" />
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmUserEmailEdit',
    components: { 'email-form': () => import('./EmailForm'), },
    data() { return { frm: {} }; },
    methods: {
        async update() {
            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            const res = await ax.post(`/api/admin/user/email/${this.$route.params.id}`, this.frm);
            if (res && res.status === 200)
                this.$router.push({ name: 'adm_user_email_send', params: { id:this.$route.params.id } });
        },
        async destroy() {
            var rst = await Notify.confirm('완전 삭제', 'danger');
            if (rst) {
                this.frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.frm, // 수정하려는 객체
                    {_method : 'DELETE'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/admin/user/email/${this.$route.params.id}`, this.frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '삭제 완료');
                    this.$router.push({ name: 'adm_user_email' });
                }
            }
        },
    },

    async mounted() {
        const res = await ax.get(`/api/admin/user/email/${this.$route.params.id}/edit`);
        if (res && res.status === 200)
            this.frm = res.data;        
    },
}
</script>

<style lang="css" scoped>
.p_wrap .frm01 .row .col select {max-width:10rem;}
</style>
