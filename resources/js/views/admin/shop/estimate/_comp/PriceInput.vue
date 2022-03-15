<template lang="html">
    <input type="text" v-model="displayValue" :id="id" required @change="calculator" />
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
    methods:{        
        calculator() {
            this.$emit('calculator');
        },
    },
}
</script>

<style scoped>
input { text-align:right; color:red !important; background-color:#FFFAC6 !important; font-weight:bold !important; }
</style>
