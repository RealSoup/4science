<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-bar :chart-data="graphData" :options="options" style="height:300px"/>
        <table class="table table-sm table-hover mt-3">
            <thead>
                <tr><th>순위</th><th>카테고리</th><th>조회</th><th>장바구니</th><th>견적</th><th>구매</th><th>합계</th></tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in tableData" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ row.ca01_name }}</td>
                    <td>{{ row.view_cnt }}</td>
                    <td>{{ row.cart_cnt }}</td>
                    <td>{{ row.estimate_cnt }}</td>
                    <td>{{ row.purchase_cnt }}</td>
                    <td><strong>{{ row.total_cnt }}</strong></td>
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
    name: 'BehaviorCategory',
    components: {
        ChartBar,
        'LoadingModal': () => import('@/views/_common/LoadingModal'),
    },
    props: ['selectedDate'],
    data() {
        return {
            tableData: [],
            graphData: { labels: [], datasets: [{ label: '합계', data: [] }] },
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
            const res = await ax.get('/api/admin/stats/behavior/category', { params: this.selectedDate });
            if (res && res.status === 200) {
                this.tableData = res.data;
                this.graphData = {
                    labels: res.data.map(i => i.ca01_name),
                    datasets: [{
                        label: '합계',
                        data: res.data.map(i => i.total_cnt),
                        backgroundColor: '#4bc07555',
                        borderColor: '#4bc075',
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