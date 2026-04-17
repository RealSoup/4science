import { Bar, mixins } from 'vue-chartjs'

export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted() {
        this.$emit('mountComplete');
        this.renderChart(this.chartData, this.options);
    },
}