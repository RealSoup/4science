<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-order ref="chartorder" :chart-data="graphData" :options="options"></chart-order>
        <table>
            <tr><th>순위</th><th>이름</th><th>금액</th></tr>
            <tr v-for="(row, i) in tableData" :key="i">                
                <td>{{i+1}}</td>
                <td>{{row.label}}</td>
                <td>{{row.price | comma}}</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartOrder from './ChartOrder'


export default {
    name: 'admStatsIndexSales',
    components: { 
        ChartOrder,
        'LoadingModal': () =>  import('@/views/_common/LoadingModal'),
    },
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
            isLoadingModalViewed: true,
        };
    },
    methods: {
        async index() {
            this.isLoadingModalViewed = true;
            let res = await ax.get(`/api/admin/stats/order`, { params: this.selectedDate});
            if (res && res.status === 200) {
                this.isLoadingModalViewed = false;
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
    
    mounted(){
        this.index();
    }
};
</script>