<template>
    <b-form-input v-model="input_val" size="sm" @keyup.enter="index" />
</template>

<script>
export default {
    name: 'admLedgerAcctSearchInput',
    props:['value'],
    data() {
        return {
            
        };
    },

    computed: {
        input_val: {
            get: function() { return this.value; },
            set: function(v) { this.$emit('input', v); }
        }
    },

    methods: {
        index(){
            this.$emit('index')
        }
    },
};
</script>

<style lang="css" scoped>
.input-group-sm > .input-group-append > .btn {
    padding: 0.1rem 0.3rem;
    font-size: 0.7rem;
}
</style>