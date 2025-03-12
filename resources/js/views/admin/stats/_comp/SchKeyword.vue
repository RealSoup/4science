<template>
<div>

    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-order ref="chartorder" :chart-data="graphData" :options="options"></chart-order>
        <table>
            <tr><th>순위</th><th>검색어</th><th>검색 횟수</th></tr>
            <tr v-for="(row, i) in tableData" :key="i">                
                <td>{{i+1}}</td>
                <td>{{row.sk_keyword}}</td>
                <td>{{row.cnt}}</td>
            </tr>
        </table>
    </div>

</div>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartOrder from './ChartOrder'

const year = new Date().getFullYear();
export default {
    name: 'admStatsSchKeyword',
    components: { 
        ChartOrder,
        'LoadingModal': () =>  import('@/views/_common/LoadingModal'),
    },
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
                            return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
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
            },
            isLoadingModalViewed: true,
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
        async index() {
            this.isLoadingModalViewed = true;
            let res = await ax.get(`/api/admin/stats/schKeyword`, { params: this.selectedDate});
            if (res && res.status === 200) {
                this.isLoadingModalViewed = false;
                this.tableData = res.data;
                this.graphData = {
                    labels: res.data.map(i => i['sk_keyword']),
                    datasets: [ {
                        label: this.graphLabel,
                        data: res.data.map(i => i['cnt']),
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

<style lang="css" scoped>
.card .card-body table tr td:nth-of-type(1) { min-width:30px; padding:.2% 0; }
.card .card-body table tr td:nth-of-type(2) { text-align:left; }
.card .card-body table tr td:nth-of-type(3) { text-align:right; }
</style>