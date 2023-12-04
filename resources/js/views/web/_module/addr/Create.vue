<template>
<div class="p_wrap">
    <h3>배송지 추가</h3>
    <Form v-model="addr"></Form>
    
    <b-row class="bottom">
        <b-button class="white sm" @click="index">뒤로</b-button>
        <b-button class="d_blue sm" @click="store">저장</b-button>
    </b-row>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'ModuleAddrCreate',
    components: { 'Form' : () => import('./Form'), },
    props: ['address'],
    data() {
        return {
            addr: {
                ua_def : 'N',
                ua_zip : '',
                ua_addr1 : '',
            },
        }
    },    
    methods: {
        async store() {
            try {
                if (Auth.check()) {
                    this.addr.ua_hp = `${this.addr.ua_hp1}-${this.addr.ua_hp2}-${this.addr.ua_hp3}`;
                    if (this.addr.ua_def == 'Y')
                        this.address.forEach(a => { a.ua_def = 'N' });
                    this.address.push(this.addr);
                    const res = await ax.post('/api/user/addr', this.addr);
                    if (res && res.status === 200)
                        this.$emit('index');
                } else
                    Notify.modal("로그인이 필요한 서비스 입니다.", 'warning');
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        index () { this.$emit('index'); },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
    },
}
</script>
<style scoped>
.p_wrap h3 { margin:15px; font-size:1em; }
.p_wrap .bottom { display:flex; }
.p_wrap .bottom button { flex-basis: 0; flex-grow: 1; max-width: 100%; border-radius: 0; }
</style>