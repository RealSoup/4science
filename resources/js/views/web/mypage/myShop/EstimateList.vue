<template lang="html">
    <b-container class="estimate">
        <b-row class="header">
            <b-col>일자</b-col>
            <b-col>요청번호</b-col>
            <b-col>견적명</b-col>
            <b-col>진행현황</b-col>
            <b-col>견적서</b-col>
        </b-row>
        <b-row v-for="eq in value" :key="eq.eq_id" class="data">
            <b-col>{{eq.created_at | formatDate_YYYY_MM_DD}}</b-col>
            <b-col>{{eq.eq_id}}<span class="d-md-none d-inline">.&nbsp;</span></b-col>
            <b-col>
                <b-button variant="outline-secondary" block :to="{ name: 'my_estimate_show', params: {eq_id: eq.eq_id} }" v-html="eq.eq_title">
                </b-button>
            </b-col>
            <b-col><EstimateStep v-model="eq.eq_step" /></b-col>
            <b-col>
                <div v-for="(er, i) in eq.estimate_reply" :key="i" class="mb-1">
                    <b-badge><b-icon-calendar2-date /> {{er.created_at | formatDate_YY_MM_DD }}</b-badge>
                    <b-button variant="success" size="sm" :to="{ name: 'my_estimate_show_reply', params: {er_id: er.er_id} }">
                        <b v-if="i!==0">재</b>견적서
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: ['value'],
    components: {
        'EstimateStep': () => import('../_comp/EstimateStep.vue'),
    },
}
</script>

<style lang="css" scoped>
</style>
