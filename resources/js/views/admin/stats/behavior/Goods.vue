<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>
        <table class="table table-sm table-hover">
            <thead>
                <tr>
                    <th>순위</th><th>상품명</th><th>조회</th><th>장바구니</th><th>견적</th><th>구매</th><th>합계</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in tableData" :key="i">
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
        };
    },
    methods: {
        async index() {
            this.isLoadingModalViewed = true;
            const res = await ax.get('/api/admin/stats/behavior/goods', { params: this.selectedDate });
            if (res && res.status === 200) {
                this.tableData = res.data;
                this.isLoadingModalViewed = false;
            }
        },
    },
    mounted() { this.index(); },
};
</script>