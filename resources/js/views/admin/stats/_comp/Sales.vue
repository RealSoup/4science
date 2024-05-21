<template>
    <chart-order ref="chartorder" :chart-data="chartData" :options="options" @mountComplete="subMountComplete"></chart-order>
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
            chartData: {
                labels: [],
                datasets: [ {
                    label: '',          
                    data: [],
                }]
            },
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
                this.chartData = {
                    labels: res.data.label,
                    datasets: [ {
                        label: this.graphLabel,
                        data: res.data.price,
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