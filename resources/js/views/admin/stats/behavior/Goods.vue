<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <table class="table table-sm table-hover">
            <thead>
                <tr>
                    <th>순위</th>
                    <th>상품명</th>
                    <th style="cursor:pointer" @click="sortBy('view_cnt')">조회 {{ sortIcon('view_cnt') }}</th>
                    <th style="cursor:pointer" @click="sortBy('cart_cnt')">장바구니 {{ sortIcon('cart_cnt') }}</th>
                    <th style="cursor:pointer" @click="sortBy('estimate_cnt')">견적 {{ sortIcon('estimate_cnt') }}</th>
                    <th style="cursor:pointer" @click="sortBy('purchase_cnt')">구매 {{ sortIcon('purchase_cnt') }}</th>
                    <th style="cursor:pointer" @click="sortBy('total_cnt')">합계 {{ sortIcon('total_cnt') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in sortedData" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ row.target }}</td>
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
export default {
    name: 'BehaviorGoods',
    components: {
        'LoadingModal': () => import('@/views/_common/LoadingModal'),
    },
    props: ['selectedDate'],
    data() {
        return {
            tableData: [],
            isLoadingModalViewed: true,
            sortKey: 'total_cnt',   // [추가]
            sortDir: 'desc',        // [추가]
        };
    },
    computed: {
        // [추가]
        sortedData() {
            return [...this.tableData].sort((a, b) => {
                return this.sortDir === 'desc'
                    ? b[this.sortKey] - a[this.sortKey]
                    : a[this.sortKey] - b[this.sortKey];
            });
        },
    },
    methods: {
        async index() {
            this.isLoadingModalViewed = true;
            const res = await ax.get('/api/admin/stats/behavior/goods', {
                params: {
                    ...this.selectedDate,
                    sort_key: this.sortKey,  // [추가]
                    sort_dir: this.sortDir,  // [추가]
                }
            });
            if (res && res.status === 200) {
                this.tableData = res.data;
                this.isLoadingModalViewed = false;
            }
        },
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortDir = this.sortDir === 'desc' ? 'asc' : 'desc';
            } else {
                this.sortKey = key;
                this.sortDir = 'desc';
            }
            this.index(); // [수정] API 재호출
        },
        sortIcon(key) {
            if (this.sortKey !== key) return '↕';
            return this.sortDir === 'desc' ? '↓' : '↑';
        },
    },
    mounted() { this.index(); },
};
</script>