<template>
    <b-form-input v-model="displayValue" :id="id" />
</template>

<script>
export default {
    props:['value', 'id', 'em'],
    computed: {
        displayValue: {
            get: function() {
                return this.priceComma(this.value.toString());
            },
            set: function(v) {
                if (this.em && this.em.bundle_dc && this.em.bundle_dc.length)
                    this.em.em_price = bundleCheck(this.em.bundle_dc, v, this.em.em_cost_price)
                this.$emit('input', v.replace(/[^0-9]/g, '').toString());
            }
        }
    },
}
</script>

<style scoped>
input { color:red !important; background-color:#FFFAC6 !important; font-weight:bold !important; text-align:right; }
</style>
