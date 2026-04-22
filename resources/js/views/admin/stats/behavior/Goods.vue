<template>
<div>
    <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
    <div v-else>

        <!-- 데스크탑: 기존 테이블 -->
        <div class="d-none d-md-block">
            <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>상품명</th>
                        <th style="cursor:pointer" @click="sortBy('view_cnt')">조회(체류/재방문) {{ sortIcon('view_cnt') }}</th>
                        <th style="cursor:pointer" @click="sortBy('cart_cnt')">장바구니 {{ sortIcon('cart_cnt') }}</th>
                        <th style="cursor:pointer" @click="sortBy('estimate_cnt')">견적 {{ sortIcon('estimate_cnt') }}</th>
                        <th style="cursor:pointer" @click="sortBy('purchase_cnt')">구매 {{ sortIcon('purchase_cnt') }}</th>
                        <th style="cursor:pointer" @click="sortBy('total_cnt')">합계 {{ sortIcon('total_cnt') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in sortedData" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td>{{ row.ubl_keyword }}</td>
                        <td>{{ row.view_cnt }}({{ row.dwell_cnt }}/{{ row.revisit_cnt }})</td>
                        <td>{{ row.cart_cnt }}</td>
                        <td>{{ row.estimate_cnt }}</td>
                        <td>{{ row.purchase_cnt }}</td>
                        <td><strong>{{ row.total_cnt }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 모바일: 카드형 -->
        <div class="d-md-none">
            <!-- 정렬 -->
            <div class="d-flex gap-2 mb-3 flex-wrap">
                <button
                    v-for="col in sortCols" :key="col.key"
                    class="btn btn-sm"
                    :class="sortKey === col.key ? 'btn-primary' : 'btn-outline-secondary'"
                    @click="sortBy(col.key)"
                >
                    {{ col.label }} {{ sortIcon(col.key) }}
                </button>
            </div>

            <div v-for="(row, i) in sortedData" :key="i" class="card mb-2">
                <div class="card-body py-2 px-3">
                    <div class="d-flex align-items-start gap-2 mb-2">
                        <span class="badge bg-secondary rounded-circle" style="min-width:24px;height:24px;line-height:16px;flex-shrink:0;">{{ i + 1 }}</span>
                        <span class="fw-500" style="font-size:13px;line-height:1.4;">{{ row.ubl_keyword }}</span>
                    </div>
                    <div class="row g-1 text-center" style="font-size:12px;">
                        <div class="col-6">
                            <div class="bg-light rounded p-1">
                                <div class="text-muted">조회</div>
                                <div class="fw-bold">{{ row.view_cnt }} <small class="text-muted">({{ row.dwell_cnt }}/{{ row.revisit_cnt }})</small></div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="bg-light rounded p-1">
                                <div class="text-muted">장바구니</div>
                                <div class="fw-bold">{{ row.cart_cnt }}</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="bg-light rounded p-1">
                                <div class="text-muted">견적</div>
                                <div class="fw-bold">{{ row.estimate_cnt }}</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="bg-light rounded p-1">
                                <div class="text-muted">구매</div>
                                <div class="fw-bold">{{ row.purchase_cnt }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2">
                        <span class="badge bg-primary">합계 {{ row.total_cnt }}</span>
                    </div>
                </div>
            </div>
        </div>

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
            sortKey: 'total_cnt',
            sortDir: 'desc',
            // [추가] 모바일 정렬 버튼용
            sortCols: [
                { key: 'total_cnt',    label: '합계' },
                { key: 'view_cnt',     label: '조회' },
                { key: 'cart_cnt',     label: '장바구니' },
                { key: 'estimate_cnt', label: '견적' },
                { key: 'purchase_cnt', label: '구매' },
            ],
        };
    },
    computed: {
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
                params: { ...this.selectedDate, sort_key: this.sortKey, sort_dir: this.sortDir }
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
            this.index();
        },
        sortIcon(key) {
            if (this.sortKey !== key) return '↕';
            return this.sortDir === 'desc' ? '↓' : '↑';
        },
    },
    mounted() { this.index(); },
};
</script>