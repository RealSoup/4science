<template>
<div>
<table>
    <tr>
        <th>카테고리<b /></th>
        <td>{{ value[0].ec_val }}</td>
    </tr>
    <tr>
        <th>1. Excitation source<b /></th>
        <td>
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <th rowspan="3">Type</th>
                    <td>Laser</td><td>{{ value[1].ec_val }}</td>
                    <td>Lamp</td><td>{{ value[2].ec_val }}</td>
                </tr>
                <tr>
                    <td>Laser</td><td>{{ value[3].ec_val }}</td>
                    <td>LED</td><td>{{ value[4].ec_val }}</td>
                </tr>
                <tr>
                    <td>Others</td><td colspan="3">{{ value[5].ec_val }}</td>
                </tr>
                <tr>
                    <th>Wavelength</th><td colspan="4">{{ value[6].ec_val }}</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <th> 2. Input power</th><td>{{ value[7].ec_val }} mW/cm^2 @ sample surface</td>
    </tr>
    <tr>
        <th rowspan="2"> 3. Emission range</th><td>{{ value[8].ec_val }} (Wavelength)</td>
    </tr>
    <tr><td>{{ value[9].ec_val }} /cm(Raman shift)</td></tr>
    <tr><th> 4. Sample Chamber</th><td>{{ value[10].ec_val }}</td></tr>
    <tr><th rowspan="2"> 5. System resolution</th><td>{{ value[11].ec_val }} (Wavelength)</td></tr>
    <tr><td>{{ value[12].ec_val }} /cm-1(Raman shift)</td></tr>
    <tr><th> 6. Beam spot size</th><td>{{ value[13].ec_val }}</td></tr>
    <tr><th> 7. Sample size</th><td>{{ value[14].ec_val }}</td></tr>
    <tr>
        <th>8. Sample type<b /></th>
        <td>
            <table cellpadding="0" cellspacing="0" border="0">
                <tr><th>Solid wafer</th><td>{{ value[15].ec_val }}</td></tr>
                <tr><th>Liquid</th><td>{{ value[16].ec_val }}</td></tr>
                <tr><th>Powder</th><td>{{ value[17].ec_val }}</td></tr>
                <tr><th>Others</th><td>{{ value[18].ec_val }}</td></tr>
            </table>
        </td>
    </tr>
    <tr><th> 9. Sample material</th><td>{{ value[19].ec_val }}</td></tr>
    <tr>
        <th> 10. Thickness<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of target material</th><td>{{ value[20].ec_val }}</td>
    </tr>
    <tr><th>11. Application<b /></th><td>{{ value[21].ec_val }}</td></tr>
</table>
</div>
</template>

<script>
export default {
    name: 'admShopEstimateShowReqMadeType01',
    props:['value'],
};
</script>

<style lang="css" scoped>
div { padding:2rem; border:3px solid #bbb; box-shadow:#000 5px 5px 10px; }
div table { width:100%; }
div table tr { border-bottom:1px solid #9DDEFF; }
div table tr th { font-size:.9rem; width:160px; background-color:#30bad9; }
div table tr th,
div table tr td { padding:5px 5px; }
div table tr th b { display:inline-block; background:#FF0000; width:4px; height:4px; border-radius:2px; margin:0 0 9px 5px; }
div table tr td table tr th { background-color:#b4e2ec; }
</style>