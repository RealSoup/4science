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
    name: 'admShopEstimateShowReqMadeType24', 
    props:['value'],
};
</script>
<style scoped>
.row .col:nth-child(6n+1) { padding:10px 15px; flex:0 0 15%; max-width:15%; border:1px solid #EEE; background-color:#EEE; }
.row .col:nth-child(6n+2) { padding:10px 15px; flex:0 0 15%; max-width:15%; border:1px solid #EEE; }
.row .col:nth-child(6n+3) { padding:10px 15px; flex:0 0 15%; max-width:15%; border:1px solid #EEE; }
.row .col:nth-child(6n+4) { padding:10px 15px; flex:0 0 30%; max-width:30%; border:1px solid #EEE; }
.row .col:nth-child(6n+5) { padding:10px 15px; flex:0 0 10%; max-width:10%; border:1px solid #EEE; }
.row .col:nth-child(6n+6) { padding:10px 15px; flex:0 0 15%; max-width:15%; border:1px solid #EEE; }
</style>