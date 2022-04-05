<template>
    <b-card class="shadow" title="통계 - 가입자">
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
                            <b-button @click="index" variant="primary">
                                <b-icon-search /> 검색
                            </b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <chart-join ref="chartjoin" :chart-data="chartData" :options="options" @mountComplete="subMountComplete" />
    </b-card>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartJoin from './ChartJoin'

const year = new Date().getFullYear();
export default {
    name: 'admStatsJoin',
    components: { ChartJoin },

    data() {
        return {
            gradient: null,
            gradient2: null,
            gradient3: null,
            chartData: {
                labels: [],
                datasets: [ {
                    label: '',          
                    data: [],
                }]
            },
            frm:{
                year:year,
                month:'',
            },
            options:{
                responsive: true, 
                maintainAspectRatio: false
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
            let res = await ax.get(`/api/admin/stats/user`, { params: this.frm});
            if (res && res.status === 200) {
                this.gradient = this.$refs.chartjoin.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
                this.gradient2 = this.$refs.chartjoin.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
                this.gradient3 = this.$refs.chartjoin.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);

                this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
                this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
                this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

                this.gradient2.addColorStop(0, "rgba(0, 0, 255, 0.9)");
                this.gradient2.addColorStop(0.5, "rgba(0, 0, 255, 0.25)");
                this.gradient2.addColorStop(1, "rgba(0, 0, 255, 0)");

                this.gradient3.addColorStop(0, "rgba(0, 255, 0, 0.9)");
                this.gradient3.addColorStop(0.5, "rgba(0, 255, 0, 0.25)");
                this.gradient3.addColorStop(1, "rgba(0, 255, 0, 0)");

                this.chartData = {
                    labels: res.data.label,
                    datasets: [
                        {
                            label: '가입자',          
                            data: res.data.sign_up,
                            borderColor: "#FF0000",
                            pointBackgroundColor: "#FF000088",
                            pointBorderColor: "#FF000088",
                            borderWidth:8,
                            backgroundColor: this.gradient,
                        },
                        {
                            label: '남',
                            data: res.data.male,
                            borderColor: "#00FF00",
                            pointBackgroundColor: "#00FF0088",
                            pointBorderColor: "#00FF0088",
                            borderWidth:8,
                            backgroundColor: this.gradient1,
                        },
                        {
                            label: '여',
                            data: res.data.female,
                            borderColor: "#0000FF",
                            pointBackgroundColor: "#0000FF88",
                            pointBorderColor: "#0000FF88",
                            borderWidth:8,
                            backgroundColor: this.gradient2,
                        }
                    ]
                }
            }
        }
    },

    mounted() {
        // this.index()
    },
};
</script>

<style lang="css" scoped>
.card { margin:1rem; }
.card .card-body .card-title { font-weight:bold; }
</style>