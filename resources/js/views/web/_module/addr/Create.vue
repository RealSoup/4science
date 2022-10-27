<template>
    <div class="p_warp">
        <h3>배송지 추가</h3>
        <Form v-model="addr" />
        
        <b-row>
            <b-button size="sm" @click="index">뒤로</b-button>
            <b-button variant="primary" size="sm" @click="store">저장</b-button>
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
                    Notify.modal("로그인이 필요한 서비스 입니다.");
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
.p_warp { margin:0 -15px; }
.p_warp h3 { margin-left:15px; }
.row { justify-content:space-between; margin:15px; }
</style>