<template lang="html">
    <b-container class="estimate list01">
        <b-row class="header">
            <b-col class="date">일자</b-col>
            <b-col class="num">요청번호</b-col>
            <b-col class="product">견적명</b-col>
            <b-col class="step">진행현황</b-col>
            <b-col class="date">견적서</b-col>
        </b-row>
        <b-row v-for="eq in value" :key="eq.eq_id" class="data">
            <b-col class="date">{{eq.created_at | formatDate_YY_MM_DD}}</b-col>
            <b-col class="num">
                <div>{{eq.eq_id}}</div>
                <b-button pill variant="outline-dark" :to="{ name: 'my_estimate_show', params: {eq_id: eq.eq_id} }">상세보기</b-button>
            </b-col>
            <b-col class="product">
                <template v-if="eq.estimate_model.length">
                    <template v-for="(em, i) in eq.estimate_model">
                        <b-link v-if="i < 5" :to="{name:'goods_show', params:{gd_id:em.em_gd_id}}" :key="i">
                            <img :src="em.img_thumb_src" />
                            <div>{{em.em_name}}</div>
                        </b-link>
                        <span v-if="i == 5" :key="i" class="over_flow"><b>외 {{eq.estimate_model.length-5}}</b></span>
                    </template>
                </template>
                <div v-else v-html="eq.eq_title" />
            </b-col>

            <b-col class="step"><EstimateStep v-model="eq.eq_step" /></b-col>
            <b-col class="date">
                <div v-for="(er, i) in eq.estimate_reply_cplt" :key="i" class="mb-1">
                    <b-badge><b-icon-calendar2-date /> {{er.created_at | formatDate_YY_MM_DD }}</b-badge>
                    <b-button variant="outline-dark" size="sm" :to="{ name: 'my_estimate_show_reply', params: {er_id: er.er_id} }">
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
.list01 .data .col .btn { padding:.1rem .2rem; font-size:.8rem; }
</style>