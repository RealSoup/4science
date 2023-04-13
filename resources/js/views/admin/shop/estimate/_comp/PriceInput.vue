<template>
    <b-form-input v-model="displayValue" :id="id" />
</template>

<script>
import copy from "fast-copy";
export default {
    props:['value', 'id', 'em'],
    computed: {
        displayValue: {
            get: function() {
                return this.priceComma(this.value.toString());
            },
            set: function(v) {
                v = v.replace(/[^0-9]/g, '').toString();
                this.em.em_cost_price = copy(v);
                this.$emit('input', v);
            }
        }
    },
}
</script>

<style scoped>
input { text-align:right; color:red !important; background-color:#FFFAC6 !important; font-weight:bold !important; }
</style>
