<template>
    <b-row tag="li">
        <b-col cols="4">
            <b-form-checkbox
                v-model="value.ct_check_opt"
                value="Y"
                unchecked-value="N"
            >
            </b-form-checkbox>
            <router-link :to="{ name: 'goods_show', params: {gd_id: value.gm_gd_id} }">
                <img :src="src" />
            </router-link>
        </b-col>
        <b-col>
            <div>{{strCut(value.gm_name, 15)}}</div>
            <div>{{value.gm_catno}}</div>
            <div>
                <VueNumericInput align="center" :min="1" v-model="value.ea" @input="update" />
            </div>
            <b-badge pill variant="danger" class="btn_x" @click="outCart">X</b-badge>
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
