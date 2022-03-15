<template>
    <b-row tag="li">
        <b-col cols="4">
            <b-form-checkbox
                v-model="value.ct_check_opt"
                value="Y"
                unchecked-value="N"
                @change="opc_check"
            ></b-form-checkbox>
            <div>{{strCut(value.opc_name, 10)}}</div>
            <b-badge variant="danger" v-if="value.option.op_required == 'Y'">필수</b-badge>
        </b-col>
        <b-col cols="4">{{value.opc_price | comma}}원</b-col>
        <b-col>
            <div><VueNumericInput align="center" :min="1" v-model="value.ea" @input="update" /></div>
            <b-badge pill variant="danger" class="btn_x" @click="outCart">X</b-badge>
        </b-col>
    </b-row>
</template>


<script>
import VueNumericInput from 'vue-numeric-input'
export default {
    name:"CartModel",
    props: ['value'],
    components: {
        VueNumericInput,
    },
    methods: {
        opc_check() {
            if (this.value.option.op_required == 'Y') {
                Notify.toast('danger', "필수옵션은 해제 할 수 없습니다.");
                this.$set(this.value, 'ct_check_opt', 'Y');
            }
        },
        outCart() {
            this.$emit('outCart');
        },
        update(v) {
            this.$store.dispatch('cart/update', {
                co_id: this.value.co_id,
                ea: v
            });
        },
    }
}
</script>
