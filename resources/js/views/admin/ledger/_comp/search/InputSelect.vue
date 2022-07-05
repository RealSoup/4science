<template>
    <b-col cols="3">
        <div class="label">{{label}}</div>
        <div>
            <b-form-select v-model="input_val" size="sm">
                <b-form-select-option value=""></b-form-select-option>
                <b-form-select-option v-for="v in option" :key="v.val" :value="v.val">{{ v.name }}</b-form-select-option>
            </b-form-select>
        </div>
    </b-col>
</template>

<script>
export default {
    name: 'AdmLedgerSearchItemInputSelect',
    props:['value', 'label', 'option'],
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
};
</script>

<style lang="css" scoped>
.col-3 { display:flex; flex-wrap:wrap; padding:0; }
.col-3 div { flex-basis:0; flex-grow:1; max-width:100%; padding:8px 5px; }
.col-3 div:nth-child(1) { flex:0 0 24%; max-width:24%; text-align:right; }
</style>