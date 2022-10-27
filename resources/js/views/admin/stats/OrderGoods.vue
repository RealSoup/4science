<template>
    <b-card class="shadow" title="통계 - 매출">
        <b-container>
            <b-row>
                <b-col cols="4">
                    <div class="input-group">
                        <b-form-select v-model="frm.year">
                            <b-form-select-option value="">◄ 전체 ►</b-form-select-option>
                            <b-form-select-option v-for="(y, i) in year" :key="i" :value="y">{{y}} 년</b-form-select-option>
                        </b-form-select>
                        <b-form-select v-model="frm.month">
                            <b-form-select-option value="">◄ 월 ►</b-form-select-option>
                            <b-form-select-option v-for="(m, i) in month" :key="i" :value="m">{{m}} 월</b-form-select-option>
                        </b-form-select>
                        <div class="input-group-append">
                            <b-button @click="index" variant="primary"><b-icon-search /> 검색</b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <chart-order ref="chartorder" :chart-data="chartData" :options="options" @mountComplete="subMountComplete" />
    </b-card>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartOrder from './ChartOrder'

const year = new Date().getFullYear();
export default {
    name: 'admStatsOrderGoods',
    components: { ChartOrder },

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
            if (this.frm.month && !this.frm.year) this.frm.month = '';
            let label = '매출';
            if ( this.frm.month ) {
                label = this.frm.year+'년 '+this.frm.month+'월 매출';
            } else if ( this.frm.year ) {
                label = this.frm.year+'년 매출';
            }
            let res = await ax.get(`/api/admin/stats/order`, { params: this.frm});
            if (res && res.status === 200) {
                this.chartData = {
                    labels: res.data.label,
                    datasets: [ {
                        label: label,
                        data: res.data.price,
                        backgroundColor: "#f87979",
                    } ]
                }
            }
        }
    },
};
</script>

<style lang="css" scoped>
.card { margin:1rem; }
.card .card-body .card-title { font-weight:bold; }
</style>