<template>
<div>

    <chart-order ref="chartorder" :chart-data="graphData" :options="options" @mountComplete="subMountComplete"></chart-order>
    <table>
        <tr><th>순위</th><th>이름</th><th>금액</th></tr>
        <tr v-for="(row, i) in tableData" :key="i">                
            <td>{{i+1}}</td>
            <td>{{row.label}}</td>
            <td>{{row.price | comma}}</td>
        </tr>
    </table>

</div>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartOrder from './ChartOrder'


export default {
    name: 'admStatsIndexSales',
    components: { ChartOrder },
    props: [ 'selectedDate', 'graphLabel' ],

    data() {
        return {
            tableData__all_order   :[],
            graphData: { labels: [], datasets: [ { label: '', data: [], }] },
            options:{
                responsive: true, 
                maintainAspectRatio: false, 
                tooltips: {
                    titleFontSize:16,
                    bodyFontSize:22,
                    footerFontSize:33,
                    callbacks: { 
                        label: function(tooltipItem, data) { //그래프 콤마
                            return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"; 
                        } 
                    },
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true, //0부터 시작
                            callback: function(label, index, labels) {
                                return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //천단위 콤마
                            },
                        },
                    }],
                }
            },
        };
    },
    methods: {
        subMountComplete(){
            this.index();
        },
        async index() {
            let res = await ax.get(`/api/admin/stats/order`, { params: this.selectedDate});
            if (res && res.status === 200) {
                this.tableData = res.data;
                this.graphData = {
                    labels: this.tableData.map(i => i['label']),
                    datasets: [ {
                        label: this.graphLabel,
                        data: this.tableData.map(i => i['price']),
                        backgroundColor: "#ff638477",
                        borderColor: "#ff6384",
                        borderWidth: 2,
                    } ]
                }
            }
        }
    },
};
</script>