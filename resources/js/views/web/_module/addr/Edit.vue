<template>
    <div class="p_wrap">
        <h3>배송지 수정</h3>
        <Form v-model="addr" />
        
        <b-row>
            <b-button size="sm" @click="index">뒤로</b-button>
            <b-button variant="primary" size="sm" @click="update">변경</b-button>
        </b-row>
    </div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ModuleAddrEdit',
    components: { 'Form' : () => import('./Form'), },
    props: ['address', 'addr'],
    methods: {
        async update() {
            if (Auth.check()) {
                this.addr.ua_hp = `${this.addr.ua_hp1}-${this.addr.ua_hp2}-${this.addr.ua_hp3}`;
                if (this.addr.ua_def == 'Y')
                    this.address.forEach(a => { if(a.ua_id!=this.addr.ua_id) a.ua_def = 'N' });
                let frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.addr, // 수정하려는 객체
                    {_method : 'PATCH'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/user/addr/${frm.ua_id}`, frm);
                if (res && res.status === 200)
                    this.$emit('index');
            } else
                Notify.modal("로그인이 필요한 서비스 입니다.");
        },
        index () { this.$emit('index'); },
    },
};
</script>

<style scoped>
.p_wrap { margin:0 -15px; }
.p_wrap h3 { margin-left:15px; }
.row { justify-content:space-between; margin:15px; }
</style>