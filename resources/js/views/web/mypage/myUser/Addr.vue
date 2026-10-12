<template>
<div class="w_fence">
    <h3>배송지 관리 <small>자주 쓰는 배송지를 등록하고 관리합니다.</small></h3>

    <div class="addr_box">
        <addr-index v-if="mode == 'index'" title="배송지 목록" :address="addr" @choose="choose" @create="mode = 'create'" @edit="edit"></addr-index>
        <addr-create v-else-if="mode == 'create'" :address="addr" @index="back"></addr-create>
        <addr-edit v-else-if="mode == 'edit'" :address="addr" :addr="addr[edit_index]" @index="back"></addr-edit>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'MyUserAddr',
    components: {
        'addr-index'  : () => import('@/views/web/_module/addr/Index'),
        'addr-create' : () => import('@/views/web/_module/addr/Create'),
        'addr-edit'   : () => import('@/views/web/_module/addr/Edit'),
    },
    data() {
        return {
            mode: 'index',
            addr: [],
            edit_index: 0,
        }
    },
    methods: {
        async load() {
            try {
                const res = await ax.get('/api/user/addr');
                if (res && res.status === 200)
                    this.addr = res.data;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('danger', '배송지를 불러오지 못했습니다.');
            }
        },
        // 마이페이지에서는 '선택'할 일이 없으므로 행을 누르면 수정 화면으로 이동
        choose(a) { this.edit(this.addr.indexOf(a)); },
        edit(i) {
            this.edit_index = i;
            this.mode = 'edit';
        },
        // 추가/수정 후 목록으로 돌아올 때 서버에서 다시 불러옴
        // (새로 추가한 배송지의 ua_id 반영, 수정 취소 시 화면에만 남은 값 되돌리기)
        async back() {
            await this.load();
            this.mode = 'index';
        },
    },
    mounted() { this.load(); },
}
</script>

<style scoped>
.addr_box { max-width:600px; border:1px solid #DDD; }
</style>