<template>
    <b-form-input v-model="input_val" size="sm" @keyup.enter="index" />
</template>

<script>
export default {
    name: 'AdmLedgerTagInputText',
    props:['value'],
    computed: {
        input_val: {
            get: function() { return this.value; },
            set: function(v) { this.$emit('input', v); }
        }
    },
    methods: {
        index() { this.$emit('index'); },
    },
};
</script>

<style lang="css" scoped>
input { text-align:right; padding:0 4px; height:1.4rem; font-size:.8rem; }
</style>