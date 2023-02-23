<template>
    <b-form-input v-model="value.odm_ea" @update="valUpdate" @focus="thisFocus" @blur="thisBlur" size="sm" />
</template>

<script>
import ax from '@/api/http';

export default {
    props:['value'],
    data() {
        return {
            bd:{},
            defVal:this.value.odm_ea,
        };
    },
    methods: {
        async valUpdate(v){
            if (this.defVal < v) {
                Notify.modal('수량 증가 불가', 'warning');
                // this.gm.ea = this.defVal;
                this.$set(this.value, 'odm_ea', this.defVal);
                return false;
            }

            if ( isEmpty(this.bd) ) {
                const res = await ax.get(`/api/admin/shop/bundleDc/findGmId/${this.value.odm_gm_id}`);
                if (res && res.status === 200)
                    this.bd = res.data;
            }
            this.value.odm_price_add_vat = bundleCheck(this.bd, v, this.value.odm_price);
        },
        thisFocus () {
            this.$set(this.value, 'show_right', true);
        },
        thisBlur () {
            this.$set(this.value, 'show_right', false);
        },
    },
}
</script>
<style scoped>
input { text-align:right; }
</style>