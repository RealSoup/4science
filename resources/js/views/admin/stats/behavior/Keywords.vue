<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-bar :chart-data="graphData" :options="options" style="height:300px"/>
        <table class="table table-sm table-hover mt-3">
            <thead><tr><th>순위</th><th>검색어</th><th>검색 횟수</th></tr></thead>
            <tbody>
                <tr v-for="(row, i) in tableData" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ row.target }}</td>
                    <td>{{ row.cnt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import ax from '@/api/http';
import ChartBar from '@/views/admin/stats/_comp/ChartJS';
export default {
    name: 'BehaviorKeywords',
    components: {
        ChartBar,
        'LoadingModal': () => import('@/views/_common/LoadingModal'),
    },
    props: ['selectedDate'],
    data() {
        return {
            tableData: [],
            graphData: { labels: [], datasets: [{ label: '검색 횟수', data: [] }] },
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
            const res = await ax.get('/api/admin/stats/behavior/keywords', { params: this.selectedDate });
            if (res && res.status === 200) {
                this.tableData = res.data;
                this.graphData = {
                    labels: res.data.map(i => i.target),
                    datasets: [{
                        label: '검색 횟수',
                        data: res.data.map(i => i.cnt),
                        backgroundColor: '#36a2eb77',
                        borderColor: '#36a2eb',
                        borderWidth: 2,
                    }],
                };
                this.isLoadingModalViewed = false;
            }
        },
    },
    mounted() { this.index(); },
};
</script>