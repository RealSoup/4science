<template>
<b-row>
    <b-col class="list_id"></b-col>
    <template v-for="(mcc, i) in mng_config.COLUMN">
        <b-col      v-if="mcc.umc_val == 'pay_type'"    :style="{ flexBasis: column_list.COLUMN.pay_type.w + 'px',    maxWidth: column_list.COLUMN.pay_type.w + 'px' }"    :key="i"><InputSelect  v-model="value.pay_type" :option="pay_type_option" @index="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'order_dt'"    :style="{ flexBasis: column_list.COLUMN.order_dt.w + 'px',    maxWidth: column_list.COLUMN.order_dt.w + 'px' }"    :key="i"><b-form-input v-model="value.order_dt"     @keyup.enter="index" :formatter="frm_formatDate" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'od_id'"       :style="{ flexBasis: column_list.COLUMN.od_id.w + 'px',       maxWidth: column_list.COLUMN.od_id.w + 'px' }"       :key="i"><b-form-input v-model="value.od_id"        @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'created_at'"  :style="{ flexBasis: column_list.COLUMN.created_at.w + 'px',  maxWidth: column_list.COLUMN.created_at.w + 'px' }"  :key="i">
            <b-input-group size="sm">
                <b-form-input v-model="value.created_at_st" @keyup.enter="index" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="frm_formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker size="sm" v-model="value.created_at_st" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
            <b-input-group size="sm">
                <b-form-input v-model="value.created_at_ed" @keyup.enter="index" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="frm_formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker size="sm" v-model="value.created_at_ed" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col v-else-if="mcc.umc_val == 'sale_dt'"     :style="{ flexBasis: column_list.COLUMN.sale_dt.w + 'px',     maxWidth: column_list.COLUMN.sale_dt.w + 'px' }"     :key="i"><b-form-input v-model="value.sale_dt"      @keyup.enter="index" :formatter="frm_formatDate" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'od_name'"     :style="{ flexBasis: column_list.COLUMN.od_name.w + 'px',     maxWidth: column_list.COLUMN.od_name.w + 'px' }"     :key="i"><b-form-input v-model="value.od_name"      @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_ea_p'"    :style="{ flexBasis: column_list.COLUMN.sum_ea_p.w + 'px',    maxWidth: column_list.COLUMN.sum_ea_p.w + 'px' }"    :key="i"><InputPrice v-model="value.sum_ea_p"       @index="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_sum_p'"   :style="{ flexBasis: column_list.COLUMN.sum_sum_p.w + 'px',   maxWidth: column_list.COLUMN.sum_sum_p.w + 'px' }"   :key="i"><InputPrice v-model="value.sum_sum_p"      @index="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_surtax'"  :style="{ flexBasis: column_list.COLUMN.sum_surtax.w + 'px',  maxWidth: column_list.COLUMN.sum_surtax.w + 'px' }"  :key="i"><InputPrice v-model="value.sum_surtax"     @index="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'distributor'" :style="{ flexBasis: column_list.COLUMN.distributor.w + 'px', maxWidth: column_list.COLUMN.distributor.w + 'px' }" :key="i"><b-form-input v-model="value.distributor"  @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'depart'"      :style="{ flexBasis: column_list.COLUMN.depart.w + 'px',      maxWidth: column_list.COLUMN.depart.w + 'px' }"      :key="i"><b-form-input v-model="value.depart"       @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'orderer'"     :style="{ flexBasis: column_list.COLUMN.orderer.w + 'px',     maxWidth: column_list.COLUMN.orderer.w + 'px' }"     :key="i"><b-form-input v-model="value.orderer"      @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'lab_prof'"    :style="{ flexBasis: column_list.COLUMN.lab_prof.w + 'px',    maxWidth: column_list.COLUMN.lab_prof.w + 'px' }"    :key="i"><b-form-input v-model="value.lab_prof"     @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_name'"    :style="{ flexBasis: column_list.COLUMN.tax_name.w + 'px',    maxWidth: column_list.COLUMN.tax_name.w + 'px' }"    :key="i"><b-form-input v-model="value.tax_name"     @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_email'"   :style="{ flexBasis: column_list.COLUMN.tax_email.w + 'px',   maxWidth: column_list.COLUMN.tax_email.w + 'px' }"   :key="i"><b-form-input v-model="value.tax_email"    @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_hp'"      :style="{ flexBasis: column_list.COLUMN.tax_hp.w + 'px',      maxWidth: column_list.COLUMN.tax_hp.w + 'px' }"      :key="i"><b-form-input v-model="value.tax_hp"       @keyup.enter="index" :formatter="frm_formatHp" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'note'"        :style="{ flexBasis: column_list.COLUMN.note.w + 'px',        maxWidth: column_list.COLUMN.note.w + 'px' }"        :key="i"><b-form-input v-model="value.note"         @keyup.enter="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'mng'"         :style="{ flexBasis: column_list.COLUMN.mng.w + 'px',         maxWidth: column_list.COLUMN.mng.w + 'px' }"         :key="i"><InputSelect  v-model="value.mng" :option="mng_option" @index="index" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'model'"       :style="{ width: model_width+'px' }" class="model" :key="i">
            <b-row :style="{ width: model_width+'px' }">
                <template v-for="(mcm, mi) in mng_config.MODEL">
                    <b-col      v-if="mcm.umc_val == 'gm_name'"        :style="{ flexBasis: column_list.MODEL.gm_name.w + 'px',        maxWidth: column_list.MODEL.gm_name.w + 'px' }"        :key="mi"><b-form-input v-model="value.gm_name"        @keyup.enter="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_price'"       :style="{ flexBasis: column_list.MODEL.gm_price.w + 'px',       maxWidth: column_list.MODEL.gm_price.w + 'px' }"       :key="mi"><InputPrice v-model="value.gm_price"         @index="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea'"             :style="{ flexBasis: column_list.MODEL.ea.w + 'px',             maxWidth: column_list.MODEL.ea.w + 'px' }"             :key="mi"><InputPrice v-model="value.ea"               @index="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea_price'"       :style="{ flexBasis: column_list.MODEL.ea_price.w + 'px',       maxWidth: column_list.MODEL.ea_price.w + 'px' }"       :key="mi"><InputPrice v-model="value.ea_price"         @index="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'surtax'"         :style="{ flexBasis: column_list.MODEL.surtax.w + 'px',         maxWidth: column_list.MODEL.surtax.w + 'px' }"         :key="mi"><InputPrice v-model="value.surtax"           @index="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'sum_price'"      :style="{ flexBasis: column_list.MODEL.sum_price.w + 'px',      maxWidth: column_list.MODEL.sum_price.w + 'px' }"      :key="mi"><InputPrice v-model="value.sum_price"        @index="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_spec'"        :style="{ flexBasis: column_list.MODEL.gm_spec.w + 'px',        maxWidth: column_list.MODEL.gm_spec.w + 'px' }"        :key="mi"><b-form-input v-model="value.gm_spec"        @keyup.enter="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'catno'"          :style="{ flexBasis: column_list.MODEL.catno.w + 'px',          maxWidth: column_list.MODEL.catno.w + 'px' }"          :key="mi"><b-form-input v-model="value.catno"          @keyup.enter="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'com_order_dt'"   :style="{ flexBasis: column_list.MODEL.com_order_dt.w + 'px',   maxWidth: column_list.MODEL.com_order_dt.w + 'px' }"   :key="mi"><b-form-input v-model="value.com_order_dt"   @keyup.enter="index" :formatter="frm_formatDate" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_code'"        :style="{ flexBasis: column_list.MODEL.gm_code.w + 'px',        maxWidth: column_list.MODEL.gm_code.w + 'px' }"        :key="mi"><b-form-input v-model="value.gm_code"        @keyup.enter="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'order_mng'"      :style="{ flexBasis: column_list.MODEL.order_mng.w + 'px',      maxWidth: column_list.MODEL.order_mng.w + 'px' }"      :key="mi"><b-form-input v-model="value.order_mng"      @keyup.enter="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'buyer'"          :style="{ flexBasis: column_list.MODEL.buyer.w + 'px',          maxWidth: column_list.MODEL.buyer.w + 'px' }"          :key="mi"><b-form-input v-model="value.buyer"          @keyup.enter="index" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'shipping_dt'"    :style="{ flexBasis: column_list.MODEL.shipping_dt.w + 'px',    maxWidth: column_list.MODEL.shipping_dt.w + 'px' }"    :key="mi"><b-form-input v-model="value.shipping_dt"    @keyup.enter="index" :formatter="frm_formatDate" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'purchase_price'" :style="{ flexBasis: column_list.MODEL.purchase_price.w + 'px', maxWidth: column_list.MODEL.purchase_price.w + 'px' }" :key="mi"><InputPrice v-model="value.purchase_price"   @index="index" /></b-col>
                </template>
            </b-row>
        </b-col>
    </template>
</b-row>
</template>

<script>
export default {
    name: 'AdmLedgerListSearch',
    props: [ 'value', 'mng_config', 'column_list', 'model_width', 'mng_list', 'config'],
    components: { 
        'InputSelect' : () => import('./tag/InputSelect'),
        'InputPrice'  : () => import('./tag/InputPrice'),
    },
    computed: {
        pay_type_option: function () {
            let tmp = {};
            for (let [k, v] of Object.entries(this.config.pay_type))
                this.$set(tmp, k, v);
            return tmp;
        },
        mng_option: function () {
            let tmp = {};
            this.mng_list.forEach(e => { this.$set(tmp, e.name, e.name); });
            return tmp;
        },
    },
    methods: {
        index(){ this.$emit('index') },
        
        frm_formatDate(v) { return this.formatDate(v); }, 
        frm_formatHp(v)   { return this.formatHp(v); },
    },
};
</script>

<style lang="css" scoped>
#admLedger .row { align-items:flex-end; }
.row .col input { padding:0 4px; height:1.4rem; font-size:.8rem; }
.row .col >>> .btn-sm { padding: 0.1rem 0.3rem; font-size: 0.7rem; }
.row .col .input-group:nth-child(2) { margin-top:.3rem; }
</style>
