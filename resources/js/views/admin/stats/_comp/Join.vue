<template>
    <chart-join ref="chartjoin" :chart-data="chartData" :options="options" @mountComplete="subMountComplete"></chart-join>
</template>

<script>
import ax from '@/api/http';
// https://github.com/apertureless/vue-chartjs
import ChartJoin from './ChartJoin'

export default {
    name: 'admStatsIndexJoin',
    components: { ChartJoin },
    
    props: [ 'selectedDate' ],

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
            options:{
                responsive: true, 
                maintainAspectRatio: false
            }
        };
    },
    
    methods: {
        subMountComplete(){
            this.index();
        },
        async index() {
            let res = await ax.get(`/api/admin/stats/user`, { params: this.selectedDate});
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
};
</script>

<style lang="css" scoped>
.card { margin:1rem; }
.card .card-body .card-title { font-weight:bold; }
</style>