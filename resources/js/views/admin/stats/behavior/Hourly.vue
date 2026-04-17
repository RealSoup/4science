<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-bar :chart-data="graphData" :options="options" style="height:350px"/>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
import ChartBar from '@/views/admin/stats/_comp/ChartJS';
export default {
    name: 'BehaviorHourly',
    components: {
        ChartBar,
        'LoadingModal': () => import('@/views/_common/LoadingModal'),
    },
    props: ['selectedDate'],
    data() {
        return {
            graphData: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
            },
            isLoadingModalViewed: true,
        };
    },
    methods: {
        async index() {
            this.isLoadingModalViewed = true;
            const res = await ax.get('/api/admin/stats/behavior/hourly', { params: this.selectedDate });
            if (res && res.status === 200) {
                const data = res.data;
                const labels = Array.from({ length: 24 }, (_, i) => `${i}시`);
                const fill = (key) => labels.map((_, h) => {
                    const row = data.find(d => d.hour === h);
                    return row ? row[key] : 0;
                });
                this.graphData = {
                    labels,
                    datasets: [
                        { label: '조회',    data: fill('view_cnt'),     backgroundColor: '#36a2eb55', borderColor: '#36a2eb', borderWidth: 2 },
                        { label: '장바구니', data: fill('cart_cnt'),     backgroundColor: '#ff638455', borderColor: '#ff6384', borderWidth: 2 },
                        { label: '견적',    data: fill('estimate_cnt'), backgroundColor: '#ffcd5655', borderColor: '#ffcd56', borderWidth: 2 },
                        { label: '구매',    data: fill('purchase_cnt'), backgroundColor: '#4bc07555', borderColor: '#4bc075', borderWidth: 2 },
                        { label: '검색',    data: fill('search_cnt'),   backgroundColor: '#9966ff55', borderColor: '#9966ff', borderWidth: 2 },
                    ],
                };
                this.isLoadingModalViewed = false;
            }
        },
    },
    mounted() { this.index(); },
};
</script>