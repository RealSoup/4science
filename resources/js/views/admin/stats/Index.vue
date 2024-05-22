<template>
<div>
<b-card class="shadow p_wrap">
    <b-card-title>
        <div>통계 - 
            <template v-if="$route.params.stats_type == 'join'">가입자</template>
            <template v-else-if="$route.params.stats_type == 'sales'">매출</template>
            <template v-else-if="$route.params.stats_type == 'sales_goods'">상품별 매출</template>
            <template v-else-if="$route.params.stats_type == 'sales_user'">회원별 매출</template>
        </div>

        <div class="input-group">
            <b-form-select v-model="selectedDate.year">
                <b-form-select-option value="">◄ 전체 ►</b-form-select-option>
                <b-form-select-option v-for="(y, i) in year" :key="i" :value="y">{{y}} 년</b-form-select-option>
            </b-form-select>
            <b-form-select v-model="selectedDate.month">
                <b-form-select-option value="">◄ 월 ►</b-form-select-option>
                <b-form-select-option v-for="(m, i) in month" :key="i" :value="m">{{m}} 월</b-form-select-option>
            </b-form-select>
            <div class="input-group-append">
                <b-button @click="index" variant="primary"><b-icon-search /> 검색</b-button>
            </div>
        </div>
    </b-card-title>
    <component ref="state_comp" :is="choiceStats" :selected-date="selectedDate" :graph-label="graphLabel"></component>
</b-card>
</div>
</template>

<script>
const this_year = new Date().getFullYear();
export default {
    name: 'admStatsIndex',
    components: {
        'Join': () =>       import('@/views/admin/stats/_comp/Join'),
        'Sales': () =>      import('@/views/admin/stats/_comp/Sales'),
        'SalesGoods': () => import('@/views/admin/stats/_comp/SalesGoods'),
        'SalesUser': () =>  import('@/views/admin/stats/_comp/SalesUser'),
    },
    data() { return { selectedDate:{ year:this_year, month:'', } } },
    computed : {
        choiceStats(){
        	switch(this.$route.params.stats_type){
                case 'join':        return 'Join';          break;
                case 'sales':       return 'Sales';         break;
                case 'sales_goods': return 'SalesGoods';    break;
                case 'sales_user':  return 'SalesUser';     break;
            }
        },
        year () { return Array.from({length: this_year - 1999}, (value, index) => Number(this_year) - index); },
        month () { return Array.from({length: 12}, (value, index) => 1 + index); },
        graphLabel () {
            if (this.selectedDate.month && !this.selectedDate.year) this.selectedDate.month = '';
            let label = '매출';
            if ( this.selectedDate.month ) {
                label = this.selectedDate.year+'년 '+this.selectedDate.month+'월 매출';
            } else if ( this.selectedDate.year ) {
                label = this.selectedDate.year+'년 매출';
            }
            return label;
        }
    },
    methods : {
        index () { this.$refs.state_comp.index(); }
    },
}
</script>

<style scoped>
.card { margin:1rem; min-width:760px; }
.card .card-body >>> .card-title { font-weight:bold; display:flex; }
.card .card-body >>> .card-title div:first-child { margin-right:3%; line-height:1.5; }
.card .card-body >>> .card-title .input-group { flex:0 0 33%; max-width:33%; }
.card .card-body >>> hr { margin:3% 0; }
.card .card-body >>> table { width:100%; max-width:700px; margin:1% auto 0 auto; }
.card .card-body >>> table tr th { background-color:#333; color:#fff; font-weight:bold; }
.card .card-body >>> table tr th,
.card .card-body >>> table tr td { text-align:center; border:1px solid #DDD; padding:.2% 0; }
.card .card-body >>> table tr td { padding:.2% 1.5%; }
.card .card-body >>> table tr td.has_link { cursor:pointer; }
.card .card-body >>> table tr td.no_link { cursor:not-allowed; }

</style>