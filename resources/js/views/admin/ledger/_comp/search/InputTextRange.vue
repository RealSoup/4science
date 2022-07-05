<template>
    <b-col cols="3">
        <div class="label">{{label}}</div>
        <div v-if="label == '단가'">
            <b-form-input v-model="value.startGmPrice" :formatter="priceComma" size="sm" />
            <b>~</b>
            <b-form-input v-model="value.endGmPrice" :formatter="priceComma" size="sm" />
        </div>
        <div v-else-if="label == '공급가액'">
            <b-form-input v-model="value.startEaPrice" :formatter="priceComma" size="sm" />
            <b>~</b>
            <b-form-input v-model="value.endEaPrice" :formatter="priceComma" size="sm" />
        </div>
        <div v-else-if="label == '세액'">
            <b-form-input v-model="value.startSurtax" :formatter="priceComma" size="sm" />
            <b>~</b>
            <b-form-input v-model="value.endSurtax" :formatter="priceComma" size="sm" />
        </div>
        <div v-else-if="label == '합계'">
            <b-form-input v-model="value.startSumPrice" :formatter="priceComma" size="sm" />
            <b>~</b>
            <b-form-input v-model="value.endSumPrice" :formatter="priceComma" size="sm" />
        </div>
    </b-col>
</template>

<script>
export default {
    name: 'AdmLedgerSearchItemInputTextRange',
    props:['value', 'label'],
    computed: {
        
    },
};
</script>

<style lang="css" scoped>
.col-3 { display:flex; flex-wrap:wrap; padding:0; }
.col-3 div { flex-basis:0; flex-grow:1; max-width:100%; padding:8px 5px; }
.col-3 div:nth-child(1) { flex:0 0 24%; max-width:24%; text-align:right; }

.col-3 div:nth-child(2) { display:flex; align-items:center; justify-content:space-between; }
.col-3 div:nth-child(2) b { font-size:20px; }
.col-3 div:nth-child(2) input { width: calc(50% - 10px); }
</style>