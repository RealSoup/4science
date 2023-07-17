<template>
<div>
    <b-input-group size="sm">
        <b-form-input v-model="ca.ca_name" placeholder="카테고리 명"></b-form-input>
        <b-form-input v-model="ca.ca_tel" placeholder="담당자 번호"></b-form-input>
        <b-input-group-append>
            <b-button variant="warning" @click="update" v-b-tooltip.hover title="수정">
                <b-icon icon="tools"></b-icon>
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
    props:['ca'],
    computed: {
        ...mapState('error', {
            validationErrors: state => state.validations,
        }),
    },
    methods: {
        async update(){
            try {
                const res = await ax.post(`/api/admin/shop/category/${this.ca.ca_id}`, {_method : 'PATCH', ca_name:this.ca.ca_name, ca_tel:this.ca.ca_tel});
                if (res && res.status === 200) {
                    this.ca.update=false;
                    Notify.toast('success', '변경 완료');
                }
            } catch (e) {
                this.errorConsolePrint(e);
            }
        },
    },
}
</script>