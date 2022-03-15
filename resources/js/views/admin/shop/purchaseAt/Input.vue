<template lang="html">
    <b-row>
        <b-col cols="3">
            <b-form-input v-model="value.pa_name" placeholder="매입처명"></b-form-input>
        </b-col>

        <b-col cols="3">
            <b-form-input v-model="value.pa_price" placeholder="운임료"></b-form-input>
        </b-col>
        <b-col cols="3">
            <select class="form-control" v-model="value.pa_type">
                <option value="LAND">LAND</option>
                <option value="AIR">AIR</option>
                <option value="OCEAN">OCEAN</option>
            </select>
        </b-col>
        <b-col cols="3">
            <b-button-group>
                <b-button variant="warning" @click="update">수정</b-button>
                <b-button variant="danger" @click="destroy">삭제</b-button>
            </b-button-group>
        </b-col>
    </b-row>
</template>

<script>
import ax from '@/api/http';
export default {
    props:['value'],
    methods: {
        async update(){
            try {
                var frm = Object.assign(
                    {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                    this.value, // 수정하려는 객체
                    {_method : 'PATCH'} // 삽입하려는 내용
                );
                const res = await ax.post(`/api/admin/shop/purchase_at/${this.value.pa_id}`, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '매입처 수정 완료');
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async destroy(){
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst) {
                try {
                    let frm = new FormData();
                    frm.append("_method", 'DELETE');
                    frm.append("type", 'reply');
                    const res = await ax.post(`/api/admin/shop/purchase_at/${this.value.pa_id}`, frm);
                    if (res && res.status === 200) {
                        Notify.toast('success', '매입처 삭제')
                        this.$emit('destroy');
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('danger', '삭제 실패');
                    Notify.toast('danger', e.response.data.message);
                }
            }
        },
    },

}
</script>
