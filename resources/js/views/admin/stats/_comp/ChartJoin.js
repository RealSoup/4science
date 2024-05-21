import { Line, mixins } from 'vue-chartjs'

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted() {
        this.$emit('mountComplete');
        this.renderChart(this.chartData, this.options);
    },

    // mounted () {
    //   console.log('ChartTest mount!!');
    //   console.log('ChartTest', this.chartData);
    //   console.log('ChartTest', this.options);
    //   this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
    //   this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
    //   this.gradient3 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);

    //   this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    //   this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    //   this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    //   this.gradient2.addColorStop(0, "rgba(0, 0, 255, 0.9)");
    //   this.gradient2.addColorStop(0.5, "rgba(0, 0, 255, 0.25)");
    //   this.gradient2.addColorStop(1, "rgba(0, 0, 255, 0)");

    //   this.gradient3.addColorStop(0, "rgba(0, 255, 0, 0.9)");
    //   this.gradient3.addColorStop(0.5, "rgba(0, 255, 0, 0.25)");
    //   this.gradient3.addColorStop(1, "rgba(0, 255, 0, 0)");
    //   this.renderChart({
    //     labels: this.chartData.label,
    //     datasets: [
    //       {
    //         label: '가입자',          
    //         data: this.chartData.sign_up,
    //         borderColor: "#FF0000",
    //         pointBackgroundColor: "#FF000088",
    //         pointBorderColor: "#FF000088",
    //         borderWidth:8,
    //         backgroundColor: this.gradient,
    //       },
    //       {
    //         label: '남',
    //         data: this.chartData.male,
    //         borderColor: "#00FF00",
    //         pointBackgroundColor: "#00FF0088",
    //         pointBorderColor: "#00FF0088",
    //         borderWidth:8,
    //         backgroundColor: this.gradient2,
    //       },
    //       {
    //         label: '여',
    //         data: this.chartData.female,
    //         borderColor: "#0000FF",
    //         pointBackgroundColor: "#0000FF88",
    //         pointBorderColor: "#0000FF88",
    //         borderWidth:8,
    //         backgroundColor: this.gradient3,
    //       }
    //     ]
    //   }, {responsive: true, maintainAspectRatio: false})
    // }
}