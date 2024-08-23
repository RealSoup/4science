<template>
<div class="fence">
    <b-row :class="{chk:chosen_uc_id==0}" @click="choose_coupon(0)"><b-col>선택안함</b-col><b-col></b-col></b-row>
    <template v-for="(row, i) in user_coupon">
        <b-row :key="i" :class="{chk:chosen_uc_id==row.uc_id, not_available:!available_coupon}" @click="choose_coupon(row.uc_id)">
            <b-col>{{row.cl_name}}</b-col><b-col>{{row.cl_discount | dcDisplay}}</b-col>
        </b-row>
    </template>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ShopOrder_compCoupon',
    props:['user_coupon', 'chosen_uc_id', 'available_coupon'],
    methods: {
        choose_coupon(uc_id) {
            if(this.available_coupon) {
                this.$emit('update:chosen_uc_id', (uc_id));
                this.$emit('close');
            } else Notify.modal("적용 가능한 상품이 없습니다.", 'danger');
        }
    },
}
</script>
<style lang="css" scoped>
.fence { padding:1rem; }
.fence .row { padding:.4rem 2rem .4rem .4rem; cursor:pointer; position:relative; }
.fence .row.chk::after { content:""; position:absolute; top:5px; right:5px; width:11px; height:18px; border-bottom:2px solid #09AA5C; border-right:2px solid #09AA5C; transform:rotate(45deg); }
.fence .row.chk .col { color:#09AA5C; font-weight:bold; }
.fence .row.not_available { background-color:#ffa1a1; }
.fence .row.not_available .col { text-decoration-line: line-through; }
.fence .row .col:nth-child(2) { text-align:right; flex-basis:35%; max-width:35%; }

</style>
