<template>
    <b-form-select v-model="input_val" @change="index">
        <b-form-select-option value=""></b-form-select-option>
        <b-form-select-option v-for="(v, k) in option" :key="k" :value="k">{{ v }}</b-form-select-option>
    </b-form-select>
</template>

<script>
export default {
    name: 'AdmLedgerSearchItemInputSelect',
    props:['value', 'option'],
    computed: {
        input_val: {
            get: function() {
                return this.value;
            },
            set: function(v) {
                this.$emit('input', v);
            }
        }
    },
    methods: { index(){ this.$emit('index') }, },
};
</script>

<style lang="css" scoped>
select { padding:0 4px; height:1.4rem; font-size:.8rem; }
</style>