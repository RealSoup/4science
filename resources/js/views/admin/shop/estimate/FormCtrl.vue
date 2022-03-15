<template lang="html">
    <div class="row frm_header">
        <div class="col-4">
            <router-link :to="{name: 'adm_estimate_index'}" class="btn btn-sm btn-light"><b-icon-list /> 목록</router-link>
        </div>
        <b-col cols="1" offset="2" class="awesome_p">
            <input v-model="value.all_dc" id="all_dc" type="number" min="0" max="99" class="text-right" required />
            <label for="all_dc">일괄할인</label>
        </b-col>
        <b-col cols="1" class="p-0 mt-1">
            <b-form-checkbox size="sm" v-model="value.er_no_dlvy_fee" value="Y" unchecked-value="N" v-b-tooltip.hover.v-danger title="※주의 - 상품가격에 반영되지 않음">배송료 제외</b-form-checkbox>
        </b-col>
        <div class="col-3 text-right">
            <b-button size="sm" variant="info" @click="preview"><b-icon-search /> 미리보기</b-button>
                <b-button size="sm" variant="success" @click="save('store')"><font-awesome-icon icon="save" /> 저장</b-button>
            <b-button size="sm" variant="primary" @click="save('send')"><b-icon-mailbox /> 발송</b-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    watch: {
        'value.all_dc': {
            handler(n, o) {
                this.$emit('all_dc_update');
            },
        },
        'value.er_no_dlvy_fee': {
            handler(n, o) {
                this.$emit('calculator');
            },
        },
    },
    methods: {
        save(type) {
            this.$emit('save', type);
        },
        preview () {
            var url = `/api/admin/shop/estimate/showEstimate/${this.$route.params.er_id}/`;
            var name = "견적서 미리보기";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
    },
}
</script>

<style lang="css" scoped>
.frm_header #all_dc { padding:.2rem .7rem .2rem; }
.frm_header #all_dc + label { top:.4rem; }
</style>
