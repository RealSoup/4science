<template>
<div class="ledger_module" :class="{fixed_header:isScrollPass}">
    <b-row :style="{ width: row_width+'px', top: headTop+'px' }" class="head">
        <b-col class="list_id">
            <b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk">
                All
            </b-form-checkbox>
        </b-col>
        <template v-for="(mcc, i) in mng_config_column">
            <template v-for="(cl, k) in column_list_clmn">
                <b-col :key="`${i}${k}`" v-if="k == mcc.umc_val && k == 'order_dt'"         :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'pay_type'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'mng'"         :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'od_id'"       :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'sale_dt'"     :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'distributor'" :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'depart'"      :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'lab_prof'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'orderer'"     :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'od_name'"     :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'sum_ea_p'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'sum_surtax'"  :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'sum_sum_p'"   :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'model'" class="model" :style="{ width: model_width+'px' }">
                    <b-row :style="{ width: model_width+'px' }">
                        <template v-for="(mcm, mi) in mng_config_model">
                            <template v-for="(clm, mk) in column_list_model">
                                <b-col :key="`${mi}${mk}`" v-if="mk == mcm.umc_val && mk == 'gm_name'"          :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='gm_name'>{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'gm_spec'"     :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='gm_spec'>{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'catno'"       :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='catno'>{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'gm_code'"     :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='gm_code'>{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'gm_price'"    :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='gm_price'>{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'ea'"          :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='ea'>{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'ea_price'"    :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" class='ea_price'>
                                    {{clm.name}}
                                    <br /><b-badge variant="info">{{total_ea_price | comma}}</b-badge>
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'surtax'"      :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'sum_price'"   :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">
                                    {{clm.name}}
                                    <br /><b-badge variant="info">{{total_sum_price | comma}}</b-badge>
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'com_order_dt'"    :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'buyer'"           :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'order_mng'"       :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'purchase_price'"  :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">{{clm.name}}</b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'shipping_dt'"     :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">{{clm.name}}</b-col>
                            </template>
                        </template>
                    </b-row>
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'tax_name'"   :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'tax_email'"   :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'tax_hp'"      :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'note'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'created_at'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{cl.name}}</b-col>

            </template>
        </template>            
    </b-row>
</div>        
</template>

<script>
export default {
    name: 'AdmLedgerListHead',
    props: ['ledger', 'mng_config_column', 'column_list_clmn', 'mng_config_model', 'column_list_model', 'row_width', 'model_width', 'total_ea_price', 'total_sum_price', 'all_chk_cplt', 'indeterminate'],
    components: {
        'Modal'           : () => import('@/views/_common/Modal.vue'),
    },
    data() {
        return {
            isScrollPass: false,
            headTop:0,
        };
    },
    computed: {
        all_chk: {
            get: function() { return this.all_chk_cplt; },
            set: function(v) { this.$emit('input', v); }
        }
    },
    methods: {
        scrollListener: function (e) {
            const head_top=310;
            this.isScrollPass = window.scrollY >= head_top;
            if (this.isScrollPass)  this.headTop = window.scrollY-head_top;
            else                    this.headTop = 0; 
        },

        toggle_all_chk(checked) {
            this.$emit('toggle_all_chk', checked);
        },
    },

    mounted() {
        window.addEventListener('scroll', this.scrollListener);
    
    },

    beforeDestroy: function () {
       window.removeEventListener('scroll', this.scrollListener);
    }
};
</script>

<style lang="css" scoped>
.ledger_module { position:relative }
.ledger_module .head { background:#666; padding:5px 0; }
.ledger_module .head .col { font-weight:bold; font-size:.9rem; color:#fff; }
.ledger_module .head .col .badge { font-size:1rem; }
.ledger_module.fixed_header .head { z-index:2; }
</style>