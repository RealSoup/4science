<template>
<div>
<b-card class="shadow p_wrap">
    <b-card-title>
        <div>통계 - 
            <template v-if="$route.params.stats_type == 'join'">가입자</template>
            <template v-else-if="$route.params.stats_type == 'sales'">매출</template>
            <template v-else-if="$route.params.stats_type == 'sales_goods'">상품별 매출</template>
            <template v-else-if="$route.params.stats_type == 'sales_user'">회원별 매출</template>
            <template v-else-if="$route.params.stats_type == 'attend'">출석 일수 순위</template>
            <template v-else-if="$route.params.stats_type == 'sch_keyword'">검색어 데이터</template>
        </div>

        <div class="input-group" v-if="$route.params.stats_type !== 'attend'">
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
        <b-form-checkbox v-if="$route.params.stats_type === 'sch_keyword'" switch v-model="selectedDate.external_inflow_counting" value="Y" unchecked-value="N">
            {{selectedDate.external_inflow_counting == 'Y' ? "외부 유입" : "내부만"}} 집계
        </b-form-checkbox>
    </b-card-title>
    <p v-if="$route.params.stats_type === 'sch_keyword'" class="sch_keyword_info">
        아래 자료는 <br />
        <template v-if="selectedDate.external_inflow_counting == 'Y'">
            조건 1) 25년 3월 12일 부터 <br />
            조건 2) 외부(구글, 네이버) 키워드 검색도 <b>포함</b>된
        </template>
        <template v-else>
            조건 1) 25년 5월 27일 부터  <br />
            조건 2) 외부(구글, 네이버) 키워드 검색이 <b>제외</b>된
        </template>
        결과 입니다.
    </p>
    <component ref="state_comp" class="state_comp" :is="choiceStats" :selected-date="selectedDate" :graph-label="graphLabel"></component>
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
        'Attend': () =>     import('@/views/admin/stats/_comp/Attend'),
        'SchKeyword': () => import('@/views/admin/stats/_comp/SchKeyword'),
    },
    data() { return { selectedDate:{ year:this_year, month:'', external_inflow_counting:'N' } } },
    computed : {
        choiceStats(){
        	switch(this.$route.params.stats_type){
                case 'join':        return 'Join';          break;
                case 'sales':       return 'Sales';         break;
                case 'sales_goods': return 'SalesGoods';    break;
                case 'sales_user':  return 'SalesUser';     break;
                case 'attend':      return 'Attend';        break;
                case 'sch_keyword': return 'SchKeyword';    break;
            }
        },
        year () { return Array.from({length: this_year - 1999}, (value, index) => Number(this_year) - index); },
        month () { return Array.from({length: 12}, (value, index) => 1 + index); },
        graphLabel () {
            if (this.selectedDate.month && !this.selectedDate.year) this.selectedDate.month = '';
            let label = '';
            switch (this.$route.params.stats_type) {
                case 'sch_keyword': label = '검색어'; break;
                default:            label = '매출'; break;
            }
            
            if ( this.selectedDate.month ) {
                label = this.selectedDate.year+'년 '+this.selectedDate.month+'월 '+label;
            } else if ( this.selectedDate.year ) {
                label = this.selectedDate.year+'년 '+label;
            }
            return label;
        }
    },
    watch: {
        'selectedDate.external_inflow_counting'(newVal, oldVal) {
            this.index();
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
.card .card-body >>> .card-title .input-group { flex:0 0 33%; max-width:33%; margin-right:3%; }
.card .card-body >>> .card-title .custom-switch { display:flex ; align-items:center; }
.card .card-body >>> .sch_keyword_info { }
.card .card-body >>> .sch_keyword_info b { color:#FF0000; }
.card .card-body .state_comp { position: relative; min-height:20rem; }
.card .card-body >>> hr { margin:3% 0; }
.card .card-body >>> table { width:100%; max-width:700px; margin:1% auto 0 auto; }
.card .card-body >>> table tr th { background-color:#333; color:#fff; font-weight:bold; }
.card .card-body >>> table tr th,
.card .card-body >>> table tr td { text-align:center; border:1px solid #DDD; padding:.2% 0; }
.card .card-body >>> table tr td { padding:.2% 1.5%; }
.card .card-body >>> table tr td.has_link { cursor:pointer; }
.card .card-body >>> table tr td.no_link { cursor:not-allowed; }

</style>