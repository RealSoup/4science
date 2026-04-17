<template>
<div>
    <div class="card">
        <div class="card-header">
            <h5>행동 통계 대시보드</h5>
            <div class="d-flex gap-2 mt-2">
                <input type="date" v-model="selectedDate.start_date" class="form-control w-auto">
                <span class="align-self-center">~</span>
                <input type="date" v-model="selectedDate.end_date" class="form-control w-auto">
                <button class="btn btn-primary" @click="reload">조회</button>
            </div>
        </div>
        <div class="card-body">
            <ul class="nav nav-tabs mb-3">
                <li class="nav-item" v-for="tab in tabs" :key="tab.key">
                    <a class="nav-link" :class="{active: currentTab === tab.key}" href="#" @click.prevent="currentTab = tab.key">
                        {{ tab.label }}
                    </a>
                </li>
            </ul>

            <behavior-goods    v-if="currentTab === 'goods'"    :selected-date="selectedDate" ref="goods"/>
            <behavior-keywords v-if="currentTab === 'keywords'" :selected-date="selectedDate" ref="keywords"/>
            <behavior-hourly   v-if="currentTab === 'hourly'"   :selected-date="selectedDate" ref="hourly"/>
            <behavior-category v-if="currentTab === 'category'" :selected-date="selectedDate" ref="category"/>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'BehaviorStatsIndex',
    components: {
        'BehaviorGoods':    () => import('./Goods'),
        'BehaviorKeywords': () => import('./Keywords'),
        'BehaviorHourly':   () => import('./Hourly'),
        'BehaviorCategory': () => import('./Category'),
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