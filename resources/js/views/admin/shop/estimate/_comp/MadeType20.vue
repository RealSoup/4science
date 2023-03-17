<template>
<b-container>
    <b-row>
        <b-col class="label" lg="2"> 물질명 </b-col>
        <b-col>{{ value[0].ec_val }}</b-col>

        <b-col class="label" lg="2"> 형태 </b-col>
        <b-col>{{ value[1].ec_val }}</b-col>
    </b-row>

    <b-row>
        <b-col class="label" lg="2">사양</b-col>
        <b-col>
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <th>{{value[2].ec_val}}</th>
                    <th>직경</th><td>{{value[3].ec_val}}</td>
                    <th>길이</th><td>{{value[4].ec_val}}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>{{value[5].ec_val}}</th>
                    <th>직경</th><td>{{value[6].ec_val}}</td>
                    <th>길이</th><td>{{value[7].ec_val}}</td>
                    <th>길이</th><td>{{value[8].ec_val}}</td>
                </tr>
                <tr>
                    <th>{{value[9].ec_val}}</th>
                    <th>직경</th><td>{{value[10].ec_val}}</td>
                    <th>길이</th><td>{{value[11].ec_val}}</td>
                    <th>길이</th><td>{{value[12].ec_val}}</td>
                </tr>
                <tr>
                    <th>{{value[13].ec_val}}</th>
                    <th>직경</th><td>{{value[14].ec_val}}</td>
                    <th>길이</th><td>{{value[15].ec_val}}</td>
                    <th>길이</th><td>{{value[16].ec_val}}</td>
                </tr>
                <tr>
                    <th>{{value[17].ec_val}}</th>
                    <th>직경</th><td>{{value[18].ec_val}}</td>
                    <th>길이</th><td>{{value[19].ec_val}}</td>
                    <th>길이</th><td>{{value[20].ec_val}}</td>
                </tr>
            </table>
        </b-col>                                
    </b-row>                        

    <b-row >
        <b-col class="label" lg="2">순도</b-col>
        <b-col>{{value[4].ec_val}}</b-col>

        <b-col class="label" lg="2">수량</b-col>
        <b-col>{{value[4].ec_val}}</b-col>
    </b-row>
</b-container>
</template>
<script>
export default { 
    name: 'admShopEstimateShowReqMadeType17',
    props:['value'], 
};
</script>
<style scoped>
.col { padding:10px 15px; border-bottom:1px solid #EEE; }
.label { background-color:#EEE; padding:10px 15px; }
.col table { width:100%; }
.col table th { background-color:#F4F4F4; width:18%; }
.col table th,
.col table td { padding:5px; font-size:.9rem; }
</style>