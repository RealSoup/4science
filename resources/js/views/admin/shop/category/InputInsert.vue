<template>
<div>
    <b-input-group size="sm">
        <b-form-input :ref="`ca_name_id${ca_papa}`" :id="`ca_name_id${ca_papa}`" placeholder="카테고리명"></b-form-input>
        <b-form-input :ref="`ca_tel_id${ca_papa}`" :id="`ca_tel_id${ca_papa}`" placeholder="담당자 번호"></b-form-input>
        <b-input-group-append>
            <b-button variant="info" @click="addCate" v-b-tooltip.hover title="저장">
                <b-icon icon="plus-circle-fill"></b-icon>
            </b-button>
        </b-input-group-append>
    </b-input-group>
    <div v-if="validationErrors.ca_name !== undefined" class="alert alert-danger"> {{ validationErrors.ca_name }} </div>
</div>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
export default {
    name: "InputTag", // recursive 하기위해서 필요함. 없으면 error
    props:['cate', 'ca_papa', 'depth'],
    computed: {
        ...mapState('error', {
            validationErrors: state => state.validations,
        }),
    },
    methods: {
        async addCate(){
            try {
                let input_ca_name = document.querySelector(`#ca_name_id${this.ca_papa}`).value;
                let input_ca_tel = document.querySelector(`#ca_tel_id${this.ca_papa}`).value;
                let newCate = {
                    ca_name: input_ca_name,
                    ca_tel: input_ca_tel,
                    ca_papa: this.ca_papa,
                    ca_seq: this.cate.length+1,
                    ca_depth: this.depth,
                };
                const res = await ax.post(`/api/admin/shop/category`, newCate);
                if (res && res.status === 200) {
                    this.cate.push(Object.assign(newCate, {ca_id:res.data.ca_id}));
                    this.$emit('recount');
                    Notify.toast('success', '추가 완료');
                    this.$refs[`ca_name_id${this.ca_papa}`].$el.value = '';
                    this.$refs[`ca_tel_id${this.ca_papa}`].$el.value = '';
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },


    },
}
</script>