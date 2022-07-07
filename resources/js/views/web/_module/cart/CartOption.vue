<template>
    <b-row tag="li" class="gd_option">
        <b-col>
            <b-form-checkbox v-model="value.ct_check_opt" value="Y" unchecked-value="N" @change="opc_check" class="hide" />
            <div>
                {{strCut(value.opc_name, 10)}}
                <b-badge variant="danger" class="hide" v-if="value.option.op_required == 'Y'">필수</b-badge>
            </div>
        </b-col>
        <b-col class="hide price">
            {{value.opc_price_add_vat | comma}}
        </b-col>        
        <b-col class="hide">
            <div></div>
            <VueNumericInput align="center" :min="1" width="100px" v-model="value.ea" @input="update" />
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

<style lang="css" scoped>
.price { color:#0072BC; }
</style>