<template>
<div class="fence">
    <b-row :class="{chk:selected_coupon_idx==0}" @click="$emit('update:selected_coupon_idx', 0), $emit('close');"><b-col>선택안함</b-col><b-col></b-col></b-row>
    <template v-for="(row, i) in coupon_list">
        <b-row :key="i" :class="{chk:selected_coupon_idx==(i+1)}" @click="$emit('update:selected_coupon_idx', (i+1)), $emit('close');">
            <b-col>{{row.cl_name}}</b-col><b-col>{{row.cl_discount | dcDisplay}}</b-col>
        </b-row>
    </template>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ShopOrder_compCoupon',
    props:['coupon_list', 'selected_coupon_idx'],
}
</script>
<style lang="css" scoped>
.fence { padding:1rem; }
.fence .row { padding:.4rem 2rem .4rem .4rem; cursor:pointer; }
.fence .row.chk::after { content:""; position:relative; top:-3px; right:-22px; width:11px; height:18px; border-bottom:2px solid #09AA5C; border-right:2px solid #09AA5C; transform:rotate(45deg); }
.fence .row.chk .col { color:#09AA5C; font-weight:bold; }
.fence .row .col:nth-child(2) { text-align:right; }

</style>
