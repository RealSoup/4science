<template>
    <b-form-input v-model="displayValue" :id="id" />
</template>

<script>
export default {
    props:['value', 'id'],
    computed: {
        displayValue: {
            get: function() {
                return this.priceComma(this.value.toString());
            },
            set: function(v) {
                this.$emit('input', v.replace(/[^0-9]/g, '').toString());
            }
        }
    },
}
</script>

<style scoped>
input { text-align:right; color:red !important; background-color:#FFFAC6 !important; font-weight:bold !important; }
</style>
