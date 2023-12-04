<template>
<b-container class="p_wrap">
    <h3>배송지 선택</h3>
    <b-button class="d_blue" @click="create"><b-icon-plus-lg /> 배송지 추가히기</b-button>
    <b-row v-for="(addr, i) in address" :key="addr.ua_id">
        <b-col @click="select_addr(i)">
            {{addr.ua_title}} <b-badge v-if="addr.ua_def=='Y'" variant="primary">기본배송지</b-badge>
        </b-col>
        <b-col @click="select_addr(i)">{{addr.ua_addr1}}, {{addr.ua_addr2}}</b-col>
        <b-col @click="select_addr(i)">{{addr.ua_hp}}</b-col>
        <b-col @click="select_addr(i)">{{addr.ua_memo}}</b-col>
        <b-button class="sm plum destroy" @click="destroy(i)">삭제</b-button>
        <b-button class="sm green edit" @click="edit(i)">수정</b-button>
    </b-row>
    
</b-container>
</template>


<script>
import ax from '@/api/http';
export default {
    name:"Toast",
    props: ['address'],
    methods: {
        select_addr (i) { this.$emit('choose', this.address[i]); },
        create () { this.$emit('create'); },
        edit (i) { this.$emit('edit', i); },
        async destroy (i) {
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst) {
                try {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    const res = await ax.post(`/api/user/addr/${this.address[i].ua_id}`, frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '배송지 삭제')
                        this.$delete(this.address, i); 
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
    },
    async mounted() {
        // const res = await ax.get('/api/user/addr');
        // if (res && res.status === 200) {
        //     this.address = res.data;
        // }
    },
}
</script>

<style scoped>
.p_wrap h3 { margin:15px; font-size:1em; }
.row { border:1px solid #CCC; cursor:pointer; position:relative; padding:10px 0; }
.row:not(:last-child) { border-bottom-width:0; }
.row:hover { background:#0E4D9C66; }
.row .col { flex-basis:100%; padding:.1rem 1.5rem; }
.row:first-of-type .col:first-of-type { padding-top:.6rem; }
.row:last-of-type .col:last-of-type { padding-bottom:.6rem; }
.row .col:nth-of-type(1) { font-weight:bold; }
.row .col div { float:right; }
.row button { position:absolute; top:20px; padding:0 .2rem; }
.row button.destroy  { right:55px; }
.row button.edit { right:13px; }
.p_wrap>button { width:100%; border-width:0; border-radius:0; }
</style>
