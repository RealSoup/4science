<template>
<div>

    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-order ref="chartorder" :chart-data="graphData" :options="options"></chart-order>
        <table>
            <tr><th>순위</th><th>이름</th><th>금액</th></tr>
            <tr v-for="(row, i) in tableData" :key="i">                
                <td>{{i+1}}</td>
                <b-link v-if="row.id" class="has_link" :router-tag="'td'" :to="{name: 'adm_user_edit', params: { id:row.id }}">{{row.name}}</b-link>
                <td v-else class="no_link">{{row.name}}</td>
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

const year = new Date().getFullYear();
export default {
    name: 'admStatsUserOrder',
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
            let res = await ax.get(`/api/admin/stats/userOrder`, { params: this.selectedDate});
            if (res && res.status === 200) {
                this.isLoadingModalViewed = false;
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