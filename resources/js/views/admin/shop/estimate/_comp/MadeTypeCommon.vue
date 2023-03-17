<template>
<b-row>
    <template v-for="v in value">
        <b-col :key="`${v.ec_id}label`">{{v.ec_label}}</b-col>
        <b-col :key="`${v.ec_id}val`">{{v.ec_val}}</b-col>
    </template>
</b-row>
</template>
<script>
export default { 
    name: 'admShopEstimateShowReqMadeTypeCommon', 
    props:['value'],
};
</script>
<style scoped>
.row .col:nth-child(odd) { padding:10px 15px; flex:0 0 15%; max-width:15%; border:1px solid #EEE; background-color:#EEE; }
.row .col:nth-child(even) { padding:10px 15px; flex:0 0 35%; max-width:35%; border:1px solid #EEE; }
</style>