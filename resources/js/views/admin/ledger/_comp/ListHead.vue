<template>
<b-row :tabindex="-1" @mousedown.right ="show_head_menu = true" @contextmenu.prevent @blur="show_head_menu = false">
    <b-col class="list_id">
        <transition name="slide-fade">
            <div v-if="show_head_menu" class="hidden_menu">
                <b-button size="sm" v-b-tooltip.hover="'정보 나열 순서'" @click="modal_view(true)" variant="warning"><b-icon-gear /></b-button>
                <b-button size="sm" v-b-tooltip.hover="'생성'" @click="create" variant="primary"><b-icon-plus-lg /></b-button>
            </div>
        </transition>
        <b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk">All</b-form-checkbox>
    </b-col>
    <template v-for="(mcc, i) in mng_config.COLUMN">
        <b-col      v-if="mcc.umc_val == 'order_dt'"    :style="{ flexBasis: column_list.COLUMN.order_dt.w + 'px',    maxWidth: column_list.COLUMN.order_dt.w + 'px' }"    :key="i">주문일</b-col>
        <b-col v-else-if="mcc.umc_val == 'pay_type'"    :style="{ flexBasis: column_list.COLUMN.pay_type.w + 'px',    maxWidth: column_list.COLUMN.pay_type.w + 'px' }"    :key="i">결제방식</b-col>
        <b-col v-else-if="mcc.umc_val == 'mng'"         :style="{ flexBasis: column_list.COLUMN.mng.w + 'px',         maxWidth: column_list.COLUMN.mng.w + 'px' }"         :key="i">담당자</b-col>
        <b-col v-else-if="mcc.umc_val == 'od_id'"       :style="{ flexBasis: column_list.COLUMN.od_id.w + 'px',       maxWidth: column_list.COLUMN.od_id.w + 'px' }"       :key="i">주문번호</b-col>
        <b-col v-else-if="mcc.umc_val == 'sale_dt'"     :style="{ flexBasis: column_list.COLUMN.sale_dt.w + 'px',     maxWidth: column_list.COLUMN.sale_dt.w + 'px' }"     :key="i">매출일</b-col>
        <b-col v-else-if="mcc.umc_val == 'distributor'" :style="{ flexBasis: column_list.COLUMN.distributor.w + 'px', maxWidth: column_list.COLUMN.distributor.w + 'px' }" :key="i">매출처</b-col>
        <b-col v-else-if="mcc.umc_val == 'company'"      :style="{ flexBasis: column_list.COLUMN.company.w + 'px',      maxWidth: column_list.COLUMN.company.w + 'px' }"      :key="i">소속</b-col>
        <b-col v-else-if="mcc.umc_val == 'lab_prof'"    :style="{ flexBasis: column_list.COLUMN.lab_prof.w + 'px',    maxWidth: column_list.COLUMN.lab_prof.w + 'px' }"    :key="i">연구실/교수님</b-col>
        <b-col v-else-if="mcc.umc_val == 'orderer'"     :style="{ flexBasis: column_list.COLUMN.orderer.w + 'px',     maxWidth: column_list.COLUMN.orderer.w + 'px' }"     :key="i">고객명</b-col>
        <b-col v-else-if="mcc.umc_val == 'od_name'"     :style="{ flexBasis: column_list.COLUMN.od_name.w + 'px',     maxWidth: column_list.COLUMN.od_name.w + 'px' }"     :key="i">주문명</b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_ea_p'"    :style="{ flexBasis: column_list.COLUMN.sum_ea_p.w + 'px',    maxWidth: column_list.COLUMN.sum_ea_p.w + 'px' }"    :key="i">총 공급가액</b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_surtax'"  :style="{ flexBasis: column_list.COLUMN.sum_surtax.w + 'px',  maxWidth: column_list.COLUMN.sum_surtax.w + 'px' }"  :key="i">총 세액</b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_sum_p'"   :style="{ flexBasis: column_list.COLUMN.sum_sum_p.w + 'px',   maxWidth: column_list.COLUMN.sum_sum_p.w + 'px' }"   :key="i">총 합계</b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_name'"    :style="{ flexBasis: column_list.COLUMN.tax_name.w + 'px',    maxWidth: column_list.COLUMN.tax_name.w + 'px' }"    :key="i">tax담당</b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_email'"   :style="{ flexBasis: column_list.COLUMN.tax_email.w + 'px',   maxWidth: column_list.COLUMN.tax_email.w + 'px' }"   :key="i">tax메일</b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_hp'"      :style="{ flexBasis: column_list.COLUMN.tax_hp.w + 'px',      maxWidth: column_list.COLUMN.tax_hp.w + 'px' }"      :key="i">tax번호</b-col>
        <b-col v-else-if="mcc.umc_val == 'note'"        :style="{ flexBasis: column_list.COLUMN.note.w + 'px',        maxWidth: column_list.COLUMN.note.w + 'px' }"        :key="i">비고</b-col>
        <b-col v-else-if="mcc.umc_val == 'created_at'"  :style="{ flexBasis: column_list.COLUMN.created_at.w + 'px',  maxWidth: column_list.COLUMN.created_at.w + 'px' }"  :key="i">작성일</b-col>
        <b-col v-else-if="mcc.umc_val == 'model'"      :style="{ width: model_width+'px' }" class="model" :key="i">
            <b-row :style="{ width: model_width+'px' }">
                <template v-for="(mcm, mi) in mng_config.MODEL">
                    <b-col      v-if="mcm.umc_val == 'gm_name'"        :style="{ flexBasis: column_list.MODEL.gm_name.w + 'px',        maxWidth: column_list.MODEL.gm_name.w + 'px' }"        :key="mi">품목명</b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_spec'"        :style="{ flexBasis: column_list.MODEL.gm_spec.w + 'px',        maxWidth: column_list.MODEL.gm_spec.w + 'px' }"        :key="mi">사양</b-col>
                    <b-col v-else-if="mcm.umc_val == 'catno'"          :style="{ flexBasis: column_list.MODEL.catno.w + 'px',          maxWidth: column_list.MODEL.catno.w + 'px' }"          :key="mi">CAT.No</b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_code'"        :style="{ flexBasis: column_list.MODEL.gm_code.w + 'px',        maxWidth: column_list.MODEL.gm_code.w + 'px' }"        :key="mi">모델명</b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_price'"       :style="{ flexBasis: column_list.MODEL.gm_price.w + 'px',       maxWidth: column_list.MODEL.gm_price.w + 'px' }"       :key="mi">단가</b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea'"             :style="{ flexBasis: column_list.MODEL.ea.w + 'px',             maxWidth: column_list.MODEL.ea.w + 'px' }"             :key="mi">수량</b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea_price'"       :style="{ flexBasis: column_list.MODEL.ea_price.w + 'px',       maxWidth: column_list.MODEL.ea_price.w + 'px' }"       :key="mi">공급가액</b-col>
                    <b-col v-else-if="mcm.umc_val == 'surtax'"         :style="{ flexBasis: column_list.MODEL.surtax.w + 'px',         maxWidth: column_list.MODEL.surtax.w + 'px' }"         :key="mi">세액</b-col>
                    <b-col v-else-if="mcm.umc_val == 'sum_price'"      :style="{ flexBasis: column_list.MODEL.sum_price.w + 'px',      maxWidth: column_list.MODEL.sum_price.w + 'px' }"      :key="mi">함계</b-col>
                    <b-col v-else-if="mcm.umc_val == 'com_order_dt'"   :style="{ flexBasis: column_list.MODEL.com_order_dt.w + 'px',   maxWidth: column_list.MODEL.com_order_dt.w + 'px' }"   :key="mi">업체발주일</b-col>
                    <b-col v-else-if="mcm.umc_val == 'buyer'"          :style="{ flexBasis: column_list.MODEL.buyer.w + 'px',          maxWidth: column_list.MODEL.buyer.w + 'px' }"          :key="mi">매입처</b-col>
                    <b-col v-else-if="mcm.umc_val == 'order_mng'"      :style="{ flexBasis: column_list.MODEL.order_mng.w + 'px',      maxWidth: column_list.MODEL.order_mng.w + 'px' }"      :key="mi">발주담당</b-col>
                    <b-col v-else-if="mcm.umc_val == 'purchase_price'" :style="{ flexBasis: column_list.MODEL.purchase_price.w + 'px', maxWidth: column_list.MODEL.purchase_price.w + 'px' }" :key="mi">매입금액</b-col>
                    <b-col v-else-if="mcm.umc_val == 'shipping_dt'"    :style="{ flexBasis: column_list.MODEL.shipping_dt.w + 'px',    maxWidth: column_list.MODEL.shipping_dt.w + 'px' }"    :key="mi">제품방송일</b-col>
                </template>
            </b-row>
        </b-col>
    </template>
</b-row>
</template>

<script>
export default {
    name: 'AdmLedgerListHead',
    props: ['mng_config', 'column_list', 'model_width', 'total_ea_price', 'total_sum_price', 'all_chk_cplt', 'indeterminate'],
    components: {
        'Modal'           : () => import('@/views/_common/Modal.vue'),
    },
    data() {
        return {
            isScrollPass: false,
            headTop:0,
            show_head_menu: false,
        };
    },
    computed: {
        all_chk: {
            get: function() { return this.all_chk_cplt; },
            set: function(v) { this.$emit('input', v); }
        }
    },
    methods: {
        toggle_all_chk(checked) {
            this.$emit('toggle_all_chk', checked);
        },
        modal_view(checked) {
            this.$emit('modal_view', checked);
        },
        create() {
            this.$emit('create', 'lg');
        },
    },
};
</script>

<style lang="css" scoped>
.row { background:#666; }
.row .col { font-weight:bold; font-size:.9rem; color:#fff; }
</style>