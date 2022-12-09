<template>
    <b-form-input v-model="displayValue" @keyup.enter="index" @update="update" :formatter="frm_priceComma" :style="{ textAlign: 'right' }" />
</template>

<script>
export default {
    name: 'admLedgerAcctInputPrice',
    props:['value'],
    computed: {
        displayValue: {
            get: function() {
                return this.priceComma( this.value ? this.value.toString() : '');
            },
            set: function(v) {
                this.$emit('input', v.replace(/[^0-9]/g, '').toString());
            }
        }
    },
    methods: {
        index(){ this.$emit('index') },
        update(){ this.$emit('update') },
        frm_priceComma(v) { return this.priceComma(v); },
    },
};
</script>

<style lang="css" scoped>
input { text-align:right; padding:0 4px; height:1.4rem; font-size:.8rem; }
</style>