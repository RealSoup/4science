<template>
<div>
    <div class="card">
        <div class="card-header">
            <h5>행동 통계 대시보드</h5>
            <div class="d-flex gap-2 mt-2 flex-wrap">
                <input type="date" v-model="selectedDate.start_date" class="form-control" style="min-width:130px;flex:1;" />
                <span class="align-self-center">~</span>
                <input type="date" v-model="selectedDate.end_date" class="form-control" style="min-width:130px;flex:1;" />
                <button class="btn btn-primary w-100 d-md-none" @click="reload">조회</button>
                <button class="btn btn-primary d-none d-md-block" @click="reload">조회</button>
            </div>
        </div>
        <div class="card-body">
            <div class="d-none d-md-block">
                <ul class="nav nav-tabs mb-3">
                    <li class="nav-item" v-for="tab in tabs" :key="tab.key">
                        <a class="nav-link" :class="{active: currentTab === tab.key}" href="#" @click.prevent="currentTab = tab.key">
                            {{ tab.label }}
                        </a>
                    </li>
                </ul>
            </div>

            <div class="d-md-none mb-3">
                <div class="row g-1">
                    <div class="col-6" v-for="tab in tabs" :key="tab.key">
                        <button
                            class="btn w-100"
                            :class="currentTab === tab.key ? 'btn-primary' : 'btn-outline-secondary'"
                            style="font-size:13px;"
                            @click="currentTab = tab.key"
                        >
                            {{ tab.label }}
                        </button>
                    </div>
                </div>
            </div>

            <behavior-goods    v-if="currentTab === 'goods'"    :selected-date="selectedDate" ref="goods"></behavior-goods>
            <behavior-keywords v-if="currentTab === 'keywords'" :selected-date="selectedDate" ref="keywords"></behavior-keywords>
            <behavior-hourly   v-if="currentTab === 'hourly'"   :selected-date="selectedDate" ref="hourly"></behavior-hourly>
            <behavior-category v-if="currentTab === 'category'" :selected-date="selectedDate" ref="category"></behavior-category>
        </div>
    </div>
</div>
</template>

<script>
import BehaviorGoods    from '@/views/admin/stats/behavior/Goods';
import BehaviorKeywords from '@/views/admin/stats/behavior/Keywords';
import BehaviorHourly   from '@/views/admin/stats/behavior/Hourly';
import BehaviorCategory from '@/views/admin/stats/behavior/Category';

export default {
    name: 'BehaviorStatsIndex',
    components: {
        BehaviorGoods,
        BehaviorKeywords,
        BehaviorHourly,
        BehaviorCategory,
    },
    data() {
        return {
            currentTab: 'goods',
            tabs: [
                { key: 'goods',    label: '상품별 통계' },
                { key: 'keywords', label: '검색 키워드' },
                { key: 'hourly',   label: '시간대별 추이' },
                { key: 'category', label: '카테고리별 인기도' },
            ],
            selectedDate: {
                start_date: new Date(new Date().setDate(1)).toISOString().slice(0, 10), // 이번달 1일
                end_date:   new Date().toISOString().slice(0, 10), // 오늘
            },
        };
    },
    methods: {
        reload() {
            const ref = this.$refs[this.currentTab];
            if (ref) ref.index();
        },
    },
};
</script>

<style scoped>
::v-deep .badge { color: #FFF; }
</style>