<template>
    <vue-numeric-input align="center" :min="1" width="110px" v-model="value.ea" @input="update" />
</template>

<script>
import VueNumericInput from 'vue-numeric-input'
export default {
    name:"ShopCartInputNo",
    props: ['value'],
    components: { 'vue-numeric-input': VueNumericInput },
    methods: {
        update(v) {
            let id_obj = this.value.cm_id ? {cm_id:this.value.cm_id} : {co_id:this.value.co_id};
            this.$store.dispatch('cart/update', Object.assign(id_obj, { ea: v }));
        },
    }
}
</script>

<style lang="css" scoped>
.price { color:#0072BC; }
</style>
