<template lang="html">
    <b-container class="p_wrap">
        <h3 class="p_tit">매입처 / 항공운임 관리</h3>
        <b-card>
            <template v-if="purchase_at && purchase_at.length" v-for="(row, idx) in purchase_at">
                <Input v-model="purchase_at[idx]" @destroy="destroy(idx)" class="mb-2" />
            </template>
            <div v-else class="alert alert-danger text-center">No Item</div>
            <hr>
            <b-row>
                <b-col cols="3"><b-form-input v-model="frm.pa_name" placeholder="매입처명"></b-form-input></b-col>
                <b-col cols="3"><b-form-input v-model="frm.pa_price" placeholder="운임료"></b-form-input></b-col>
                <b-col cols="3">
                    <select class="form-control" v-model="frm.pa_type">
                        <option value="LAND">LAND</option>
                        <option value="AIR">AIR</option>
                        <option value="OCEAN">OCEAN</option>
                    </select>
                </b-col>
                <b-col cols="3">
                    <b-button variant="primary" block @click="store">등록</b-button>
                </b-col>
            </b-row>
        </b-card>
    </b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    components: {
        'Input': () => import('./Input.vue'),
    },
    data() {
        return {
            purchase_at:[],
            frm:{
                pa_type:'LAND',
            }
        }
    },
    methods: {
        async index(){
            try {
                const res = await ax.get(`/api/admin/shop/purchase_at`);

                if (res && res.status === 200) {
                    this.purchase_at = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        async store(){
            try {
                const res = await ax.post(`/api/admin/shop/purchase_at`, this.frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '등록');
                    var ist = Object.assign(
                        {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                        this.frm, // 수정하려는 객체
                        {pa_id : res.data} // 삽입하려는 내용
                    );
                    this.purchase_at.push(ist);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('danger', '등록 실패');
            }
        },
        destroy(i){
            this.$delete(this.purchase_at, i);
        },
    },
    mounted() {
        this.index();
    },
}
</script>
