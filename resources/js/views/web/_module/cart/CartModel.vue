<template>
    <b-row tag="li" class="gd_model">
        <b-col>
            <b-form-checkbox v-model="value.ct_check_opt" value="Y" unchecked-value="N" class="hide" />
            <router-link :to="{ name: 'goods_show', params: {gd_id: value.gm_gd_id} }">
                <img :src="src" />
            </router-link>
        </b-col>
        <b-col class="hide">
            <div>{{strCut(value.gm_name, 15)}}</div>
            <div>{{value.gm_price_add_vat | comma}}원</div>
            <VueNumericInput align="center" :min="1" width="110px" v-model="value.ea" @input="update" />
            <!-- <b-badge pill variant="danger" class="btn_x" @click="outCart">X</b-badge> -->
        </b-col>
    </b-row>
</template>


<script>
import VueNumericInput from 'vue-numeric-input'
export default {
    name:"CartModel",
    props: ['value', 'src'],
    components: {
        VueNumericInput,
    },
    methods: {
        outCart() {
            this.$emit('outCart');
        },
        update(v) {
            this.$store.dispatch('cart/update', {
                cm_id: this.value.cm_id,
                ea: v
            });
        },
    }
}
</script>
