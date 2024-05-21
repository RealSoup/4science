<template>
<div>


<chart-order ref="chartorder" :chart-data="graphData" :options="options" @mountComplete="subMountComplete" />

<table>
    <tr><th>순위</th><th>이름</th><th>금액</th></tr>
    <tr v-for="(row, i) in tableData" :key="i">                
        <td>{{i+1}}</td>
        <td>{{row.name}}</td>
        <td>{{row.price | comma}}</td>
    </tr>
</table>


</div>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartOrder from './ChartOrder'

const year = new Date().getFullYear();
export default {
    name: 'admStatsUserOrder',
    components: { ChartOrder },
    props: [ 'selectedDate', 'graphLabel' ],

    data() {
        return {
            tableData :[],
            graphData :   { labels: [], datasets: [ { label: '', data: [], }] },
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
            frm:{
                year:year,
                month:'',
            }
        };
    },
    computed : {
        year () {
            return Array.from({length: year - 1999}, (value, index) => Number(year) - index);
        },
        month () { 
            return Array.from({length: 12}, (value, index) => 1 + index);
        }
    },
    methods: {
        subMountComplete(){
            this.index();
        },
        async index() {
            let res = await ax.get(`/api/admin/stats/userOrder`, { params: this.selectedDate});
            if (res && res.status === 200) {
                this.tableData = res.data;
                this.graphData = {
                    labels: res.data.map(i => i['name']),
                    datasets: [ {
                        label: this.graphLabel,
                        data: res.data.map(i => i['price']),
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

<style lang="css" scoped>
.card { margin:1rem; min-width:760px; }
.card .card-body .card-title { font-weight:bold; display:flex; }
.card .card-body .card-title div:first-child { margin-right:3%; line-height:1.5; }
.card .card-body .card-title .input-group { flex:0 0 33%; max-width:33%; }
.card .card-body hr { margin:3% 0; }
.card .card-body table { width:100%; max-width:700px; margin:1% auto 0 auto; }
.card .card-body table tr th { background-color:#333; color:#fff; font-weight:bold; }
.card .card-body table tr th,
.card .card-body table tr td { text-align:center; border:1px solid #DDD; padding:.2% 0; }
.card .card-body table tr td { padding:.2% 1.5%; }
.card .card-body table tr td:nth-of-type(1) { min-width:30px; padding:.2% 0; }
.card .card-body table tr td:nth-of-type(2) { text-align:left; }
.card .card-body table tr td:nth-of-type(3) { text-align:right; }
</style>