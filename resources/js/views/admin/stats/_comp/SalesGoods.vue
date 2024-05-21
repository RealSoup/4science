<template>
<div>  

    <h5>매출순</h5>
    <chart-order ref="chartorder" :chart-data="graphData__all_price" :options="options"></chart-order>
    <table>
        <tr><th>순위</th><th>상품명</th><th>Cat.NO</th><th>금액</th><th>판매수량</th><th>판매횟수</th></tr>
        <tr v-for="(row, i) in tableData__all_price" :key="i">                
            <td>{{i+1}}</td>
            <td>{{row.odm_gm_name}}</td>
            <td>{{row.odm_gm_catno}}</td>
            <td>{{row.all_price | comma}}</td>
            <td>{{row.all_ea| comma}}</td>
            <td>{{row.all_order| comma}}</td>
        </tr>
    </table>


    <hr />


    <h5>수량순</h5>
    <chart-order ref="chartorder" :chart-data="graphData__all_ea" :options="options"></chart-order>
    <table>
        <tr><th>순위</th><th>상품명</th><th>Cat.NO</th><th>금액</th><th>판매수량</th><th>판매횟수</th></tr>
        <tr v-for="(row, i) in tableData__all_ea" :key="i">                
            <td>{{i+1}}</td>
            <td>{{row.odm_gm_name}}</td>
            <td>{{row.odm_gm_catno}}</td>
            <td>{{row.all_price | comma}}</td>
            <td>{{row.all_ea| comma}}</td>
            <td>{{row.all_order| comma}}</td>
        </tr>
    </table>


    <hr />


    <h5>판매 횟수 순</h5>
    <chart-order ref="chartorder" :chart-data="graphData__all_order" :options="options" @mountComplete="subMountComplete"></chart-order>
    <table>
        <tr><th>순위</th><th>상품명</th><th>Cat.NO</th><th>금액</th><th>판매수량</th><th>판매횟수</th></tr>
        <tr v-for="(row, i) in tableData__all_order" :key="i">                
            <td>{{i+1}}</td>
            <td>{{row.odm_gm_name}}</td>
            <td>{{row.odm_gm_catno}}</td>
            <td>{{row.all_price | comma}}</td>
            <td>{{row.all_ea| comma}}</td>
            <td>{{row.all_order| comma}}</td>
        </tr>
    </table>
    
</div>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartOrder from './ChartOrder'
import copy from "fast-copy";

const year = new Date().getFullYear();
export default {
    name: 'admStatsIndexSalesGoods',
    components: { ChartOrder },
    props: [ 'selectedDate', 'graphLabel' ],

    data() {
        return {
            tableData__all_price   :[],
            tableData__all_ea      :[],
            tableData__all_order   :[],
            graphData__all_price:   { labels: [], datasets: [ { label: '', data: [], }] },
            graphData__all_ea:      { labels: [], datasets: [ { label: '', data: [], }] },
            graphData__all_order:   { labels: [], datasets: [ { label: '', data: [], }] },
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
            let res = await ax.get(`/api/admin/stats/goods`, { params: this.selectedDate});
            if (res && res.status === 200) {
                this.tableData__all_price = res.data;
                this.graphData__all_price = {
                    labels: this.tableData__all_price.map(i => i['odm_gm_name']),
                    datasets: [ {
                        label: this.graphLabel,
                        data: this.tableData__all_price.map(i => i['all_price']),
                        backgroundColor: "#ff638477",
                        borderColor: "#ff6384",
                        borderWidth: 2,
                    } ]
                };



                this.tableData__all_ea = copy(res.data);
                this.tableData__all_ea.sort((a, b) => {
                    if(Number(a.all_ea) > Number(b.all_ea)) return 1;
                    if(Number(a.all_ea) < Number(b.all_ea)) return -1;
                    if(Number(a.all_ea) === Number(b.all_ea)) return 0;
                });
                this.graphData__all_ea = {
                    labels: this.tableData__all_ea.map(i => i['odm_gm_name']),
                    datasets: [ {
                        label: this.graphLabel,
                        data: this.tableData__all_ea.map(i => i['all_price']),
                        backgroundColor: "#ff638477",
                        borderColor: "#ff6384",
                        borderWidth: 2,
                    } ]
                };

                

                this.tableData__all_order = copy(res.data);
                this.tableData__all_order.sort((a, b) => {
                    if(Number(a.all_order) > Number(b.all_order)) return 1;
                    if(Number(a.all_order) < Number(b.all_order)) return -1;
                    if(Number(a.all_order) === Number(b.all_order)) return 0;
                });
                this.graphData__all_order = {
                    labels: this.tableData__all_order.map(i => i['odm_gm_name']),
                    datasets: [ {
                        label: this.graphLabel,
                        data: this.tableData__all_order.map(i => i['all_price']),
                        backgroundColor: "#ff638477",
                        borderColor: "#ff6384",
                        borderWidth: 2,
                    } ]
                };
            }
        }
    },
};
</script>

<style lang="css" scoped>

.card .card-body table { width:100%; max-width:1300px; margin:1% auto 0 auto; }
.card .card-body table tr th { background-color:#333; color:#fff; font-weight:bold; }
.card .card-body table tr th,
.card .card-body table tr td { text-align:center; border:1px solid #DDD; padding:.2% 0; }
.card .card-body table tr td { padding:.2% 1.5%; }
.card .card-body table tr td:nth-of-type(1) { min-width:30px; padding:.2% 0; }
.card .card-body table tr td:nth-of-type(2) { text-align:left; }
.card .card-body table tr td:nth-of-type(4),
.card .card-body table tr td:nth-of-type(5),
.card .card-body table tr td:nth-of-type(6) { text-align:right; }
</style>