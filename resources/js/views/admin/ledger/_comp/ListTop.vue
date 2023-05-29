<template>
<b-row>
    <b-col class="list_id"></b-col>
    <template v-for="(mcc, i) in mng_config.COLUMN">
        <b-col      v-if="mcc.umc_val == 'order_dt'"    :style="{ flexBasis: column_list.COLUMN.order_dt.w + 'px',    maxWidth: column_list.COLUMN.order_dt + 'px' }"    :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'pay_type'"    :style="{ flexBasis: column_list.COLUMN.pay_type.w + 'px',    maxWidth: column_list.COLUMN.pay_type + 'px' }"    :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'mng'"         :style="{ flexBasis: column_list.COLUMN.mng.w + 'px',         maxWidth: column_list.COLUMN.mng + 'px' }"         :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'od_id'"       :style="{ flexBasis: column_list.COLUMN.od_id.w + 'px',       maxWidth: column_list.COLUMN.od_id + 'px' }"       :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'sale_dt'"     :style="{ flexBasis: column_list.COLUMN.sale_dt.w + 'px',     maxWidth: column_list.COLUMN.sale_dt + 'px' }"     :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'distributor'" :style="{ flexBasis: column_list.COLUMN.distributor.w + 'px', maxWidth: column_list.COLUMN.distributor + 'px' }" :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'company'"      :style="{ flexBasis: column_list.COLUMN.company.w + 'px',      maxWidth: column_list.COLUMN.company + 'px' }"      :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'lab_prof'"    :style="{ flexBasis: column_list.COLUMN.lab_prof.w + 'px',    maxWidth: column_list.COLUMN.lab_prof + 'px' }"    :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'orderer'"     :style="{ flexBasis: column_list.COLUMN.orderer.w + 'px',     maxWidth: column_list.COLUMN.orderer + 'px' }"     :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'od_name'"     :style="{ flexBasis: column_list.COLUMN.od_name.w + 'px',     maxWidth: column_list.COLUMN.od_name + 'px' }"     :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_ea_p'"    :style="{ flexBasis: column_list.COLUMN.sum_ea_p.w + 'px',    maxWidth: column_list.COLUMN.sum_ea_p + 'px' }"    :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_surtax'"  :style="{ flexBasis: column_list.COLUMN.sum_surtax.w + 'px',  maxWidth: column_list.COLUMN.sum_surtax + 'px' }"  :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_sum_p'"   :style="{ flexBasis: column_list.COLUMN.sum_sum_p.w + 'px',   maxWidth: column_list.COLUMN.sum_sum_p + 'px' }"   :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_name'"    :style="{ flexBasis: column_list.COLUMN.tax_name.w + 'px',    maxWidth: column_list.COLUMN.tax_name + 'px' }"    :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_email'"   :style="{ flexBasis: column_list.COLUMN.tax_email.w + 'px',   maxWidth: column_list.COLUMN.tax_email + 'px' }"   :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_hp'"      :style="{ flexBasis: column_list.COLUMN.tax_hp.w + 'px',      maxWidth: column_list.COLUMN.tax_hp + 'px' }"      :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'note'"        :style="{ flexBasis: column_list.COLUMN.note.w + 'px',        maxWidth: column_list.COLUMN.note + 'px' }"        :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'created_at'"  :style="{ flexBasis: column_list.COLUMN.created_at.w + 'px',  maxWidth: column_list.COLUMN.created_at + 'px' }"  :key="i"></b-col>
        <b-col v-else-if="mcc.umc_val == 'model'"       :style="{ width: model_width+'px' }" class="model" :key="i">
            <b-row :style="{ width: model_width+'px' }">
                <template v-for="(mcm, mi) in mng_config.MODEL">
                    <b-col      v-if="mcm.umc_val == 'gm_name'"        :style="{ flexBasis: column_list.MODEL.gm_name.w + 'px',        maxWidth: column_list.MODEL.gm_name.w + 'px' }"        :key="mi" class='gm_name' ></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_spec'"        :style="{ flexBasis: column_list.MODEL.gm_spec.w + 'px',        maxWidth: column_list.MODEL.gm_spec.w + 'px' }"        :key="mi" class='gm_spec' ></b-col>
                    <b-col v-else-if="mcm.umc_val == 'catno'"          :style="{ flexBasis: column_list.MODEL.catno.w + 'px',          maxWidth: column_list.MODEL.catno.w + 'px' }"          :key="mi" class='catno'   ></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_code'"        :style="{ flexBasis: column_list.MODEL.gm_code.w + 'px',        maxWidth: column_list.MODEL.gm_code.w + 'px' }"        :key="mi" class='gm_code' ></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_price'"       :style="{ flexBasis: column_list.MODEL.gm_price.w + 'px',       maxWidth: column_list.MODEL.gm_price.w + 'px' }"       :key="mi" class='gm_price'></b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea'"             :style="{ flexBasis: column_list.MODEL.ea.w + 'px',             maxWidth: column_list.MODEL.ea.w + 'px' }"             :key="mi" class='ea'      ></b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea_price'"       :style="{ flexBasis: column_list.MODEL.ea_price.w + 'px',       maxWidth: column_list.MODEL.ea_price.w + 'px' }"       :key="mi" class='ea_price'><b-badge variant="info">{{total_ea_price | comma}}</b-badge></b-col>
                    <b-col v-else-if="mcm.umc_val == 'surtax'"         :style="{ flexBasis: column_list.MODEL.surtax.w + 'px',         maxWidth: column_list.MODEL.surtax.w + 'px' }"         :key="mi"></b-col>
                    <b-col v-else-if="mcm.umc_val == 'sum_price'"      :style="{ flexBasis: column_list.MODEL.sum_price.w + 'px',      maxWidth: column_list.MODEL.sum_price.w + 'px' }"      :key="mi"><b-badge variant="info">{{total_sum_price | comma}}</b-badge></b-col>
                    <b-col v-else-if="mcm.umc_val == 'com_order_dt'"   :style="{ flexBasis: column_list.MODEL.com_order_dt.w + 'px',   maxWidth: column_list.MODEL.com_order_dt.w + 'px' }"   :key="mi"></b-col>
                    <b-col v-else-if="mcm.umc_val == 'buyer'"          :style="{ flexBasis: column_list.MODEL.buyer.w + 'px',          maxWidth: column_list.MODEL.buyer.w + 'px' }"          :key="mi"></b-col>
                    <b-col v-else-if="mcm.umc_val == 'order_mng'"      :style="{ flexBasis: column_list.MODEL.order_mng.w + 'px',      maxWidth: column_list.MODEL.order_mng.w + 'px' }"      :key="mi"></b-col>
                    <b-col v-else-if="mcm.umc_val == 'purchase_price'" :style="{ flexBasis: column_list.MODEL.purchase_price.w + 'px', maxWidth: column_list.MODEL.purchase_price.w + 'px' }" :key="mi"></b-col>
                    <b-col v-else-if="mcm.umc_val == 'shipping_dt'"    :style="{ flexBasis: column_list.MODEL.shipping_dt.w + 'px',    maxWidth: column_list.MODEL.shipping_dt.w + 'px' }"    :key="mi"></b-col>
                </template>
            </b-row>
        </b-col>
    </template>            
</b-row>
</template>

<script>
export default {
    name: 'AdmLedgerListTop',
    props: [ 'mng_config', 'column_list', 'model_width', 'total_ea_price', 'total_sum_price'],
    data() { return { }; },
    mounted() { },
    methods: { },
};
</script>

<style lang="scss" scoped>
 .row .col .badge { position:absolute; right:5px; }
</style>