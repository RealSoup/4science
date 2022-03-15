<template lang="html">
    <input type="text" v-model="displayValue" :id="id" required @change="calculator" />
</template>

<script>
export default {
    props:['value', 'id', 'em'],
    computed: {
        displayValue: {
            get: function() {
                if (this.em && this.em.bundle_dc && this.em.bundle_dc.length)
                    this.em.em_price = bundleCheck(this.em.bundle_dc, this.value, this.em.em_cost_price)
                return this.priceComma(this.value.toString());
            },
            set: function(v) {
                this.$emit('input', v.replace(/[^0-9]/g, '').toString());
            }
        }
    },
    methods:{
        calculator() {
            this.$emit('calculator');
        },
    },
}
</script>

<style scoped>
input { color:red !important; background-color:#FFFAC6 !important; font-weight:bold !important; }
</style>
