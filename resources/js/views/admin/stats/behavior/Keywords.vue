<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-bar :chart-data="graphData" :options="chartOptions" :style="chartStyle"/>

        <!-- 데스크탑 테이블 -->
        <table class="table table-sm table-hover mt-3 d-none d-md-table">
            <thead><tr><th>순위</th><th>검색어</th><th>검색 횟수</th></tr></thead>
            <tbody>
                <tr v-for="(row, i) in tableData" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ row.target }}</td>
                    <td>{{ row.cnt }}</td>
                </tr>
            </tbody>
        </table>

        <!-- 모바일 카드 -->
        <div class="d-md-none mt-3">
            <div v-for="(row, i) in tableData" :key="i" class="card mb-2">
                <div class="card-body py-2 px-3 d-flex align-items-center gap-2">
                    <span class="badge bg-secondary" style="min-width:24px;">{{ i + 1 }}</span>
                    <span style="font-size:13px;flex:1;">{{ row.target }}</span>
                    <span class="badge bg-primary">{{ row.cnt }}회</span>
                </div>
            </div>
        </div>
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
    computed: {
        chartStyle() {
            return window.innerWidth < 768 ? 'height:200px' : 'height:300px';
        },
        chartOptions() {
            const isMobile = window.innerWidth < 768;
            return {
                ...this.options,
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true, fontSize: isMobile ? 9 : 12 } }],
                    xAxes: [{
                        ticks: {
                            fontSize: isMobile ? 9 : 12,
                            maxRotation: 90,
                            // [추가] 모바일에서 키워드 8자 초과 시 자르기
                            callback: (val) => isMobile && val.length > 8 ? val.slice(0, 8) + '…' : val,
                        }
                    }],
                },
            };
        },
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