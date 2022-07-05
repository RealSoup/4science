<template>
    <b-col cols="3">
        <div class="label">{{label}}</div>
        <div><b-form-input v-model="input_val" size="sm" @keyup.enter="index" /></div>
    </b-col>
</template>

<script>
export default {
    name: 'AdmLedgerSearchItemInputText',
    props:['value', 'label'],
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
.col-3 { display:flex; flex-wrap:wrap; padding:0; }
.col-3 div { flex-basis:0; flex-grow:1; max-width:100%; padding:8px 5px; }
.col-3 div:nth-child(1) { flex:0 0 24%; max-width:24%; text-align:right; }
</style>