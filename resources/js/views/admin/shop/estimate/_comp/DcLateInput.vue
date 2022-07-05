<template lang="html">
    <b-form-input v-model="displayValue" :id="id" type="number" min="0" max="99" />
</template>

<script>
export default {
    props:['value', 'id', 'em'],
    watch: {
        value: function(newVal, oldVal) { // watch it
            let nv = Math.ceil(Number(this.em.em_cost_price)*((100 - Number(newVal))/100));
            this.$set(this.em, 'em_price', nv);
        },
    },
    computed: {
        displayValue: {
            get: function() {
                return this.value;
            },
            set: function(v) {
                if (Number(v)>99) v=99;
                this.$emit('input', v);
            }
        }
    }
}
</script>

<style scoped>
input { color:red !important; background-color:#FFFAC6 !important; font-weight:bold !important; }
</style>
