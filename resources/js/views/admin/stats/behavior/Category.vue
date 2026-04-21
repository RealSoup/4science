<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <chart-bar :chart-data="graphData" :options="chartOptions" :style="chartStyle"/>

        <!-- 데스크탑 테이블 -->
        <table class="table table-sm table-hover mt-3 d-none d-md-table">
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

        <!-- 모바일 카드 -->
        <div class="d-md-none mt-3">
            <div v-for="(row, i) in tableData" :key="i" class="card mb-2">
                <div class="card-body py-2 px-3">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="badge bg-secondary">{{ i + 1 }}</span>
                        <strong style="font-size:13px;">{{ row.ca01_name }}</strong>
                        <span class="ms-auto badge bg-primary">합계 {{ row.total_cnt }}</span>
                    </div>
                    <div class="row g-1 text-center" style="font-size:12px;">
                        <div class="col-3"><div class="bg-light rounded p-1"><div class="text-muted">조회</div><div class="fw-bold">{{ row.view_cnt }}</div></div></div>
                        <div class="col-3"><div class="bg-light rounded p-1"><div class="text-muted">장바구니</div><div class="fw-bold">{{ row.cart_cnt }}</div></div></div>
                        <div class="col-3"><div class="bg-light rounded p-1"><div class="text-muted">견적</div><div class="fw-bold">{{ row.estimate_cnt }}</div></div></div>
                        <div class="col-3"><div class="bg-light rounded p-1"><div class="text-muted">구매</div><div class="fw-bold">{{ row.purchase_cnt }}</div></div></div>
                    </div>
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
    computed: {
        // [추가] 모바일에서 그래프 높이 줄이기
        chartStyle() {
            return window.innerWidth < 768 ? 'height:200px' : 'height:300px';
        },
        chartOptions() {
            const isMobile = window.innerWidth < 768;
            return {
                ...this.options,
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true } }],
                    xAxes: [{
                        ticks: {
                            maxRotation: isMobile ? 90 : 45,
                            fontSize: isMobile ? 9 : 12,
                        }
                    }],
                },
            };
        },
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