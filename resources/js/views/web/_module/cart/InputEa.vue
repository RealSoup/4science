<template>
    <vue-numeric-input align="center" :min="1" width="100%" v-model="value.ea" @input="update" />
</template>

<script>
import VueNumericInput from 'vue-numeric-input'
export default {
    name:"ShopCartInputNo",
    props: ['value'],
    components: { 'vue-numeric-input': VueNumericInput },
    methods: {
        update(v) {
            this.$store.dispatch('cart/update', Object.assign({ct_id:this.value.ct_id}, { ea: v }));
        },
    }
}
</script>

<style lang="css" scoped>
.price { color:#0072BC; }
</style>
