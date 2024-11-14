<template>
<b-container class="estimate list01">
    <b-row class="header">
        <b-col class="date">일자</b-col>
        <b-col class="product">견적명</b-col>
        <b-col class="step">진행현황</b-col>
        <b-col class="date">견적서</b-col>
    </b-row>
    <b-row v-for="eq in value" :key="eq.eq_id" class="data">
        <b-col class="date">
            <template v-if="deviceType=='pc'">{{eq.created_at | formatDate_YY_MM_DD}}</template>
            <template v-if="deviceType=='mobile'">{{eq.created_at | formatDate_MM_DD}}</template>
        </b-col>
        <b-col class="product">
            <template v-if="eq.estimate_model.length">
                <template v-for="(em, i) in eq.estimate_model">
                    <b-link v-if="i < 5" :to="{name:'goods_show', params:{gd_id:em.em_gd_id}}" :key="i">
                        <img :src="em.img_src" />
                        <div>{{em.em_name}}</div>
                    </b-link>
                    <span v-if="i == 5" :key="i" class="over_flow"><b>외 {{eq.estimate_model.length-5}}</b></span>
                </template>
            </template>
            <div v-else v-html="eq.eq_title" />
        </b-col>

        <b-col class="step"><estimate-step v-model="eq.eq_step" /></b-col>
        <b-col class="date">
            <b-button v-if="eq.eq_step == 'DOING'" :to="{ name: 'my_estimate_show', params: {eq_id: eq.eq_id} }" class="sky">
                {{eq.mng.name}}
                <br />
                {{eq.mng.tel}}
            </b-button>
            <div v-else v-for="(er, i) in eq.estimate_reply_cplt" :key="i" class="mb-1">
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
import { mapState } from 'vuex'; 
export default {
    props: ['value'],
    components: {
        'estimate-step': () => import('../_comp/EstimateStep.vue'),
    },
    computed: {
        ...mapState('common', ['deviceType']), 
    },
}
</script>

<style lang="css" scoped>
.list01 .data .col .btn { padding:.1rem .2rem; font-size:.8rem; }
@media (max-width: 992px) {
    .list01 .row { align-items:flex-start; }
    .list01 .row .date { flex:0 0 15%; max-width:15%; }
    .list01 .data .product { display:none; }
    .list01 .row .step { flex:0 0 20%; max-width:20%; text-align:center !important; }
    .list01 .data .col .btn { min-width:60px; margin-left:5px; }
    
    .list01.estimate .row>div:last-child { flex:0 0 65%; max-width:65%; text-align:right; padding-right:5px !important; }
    .list01.estimate .row>div:last-child > div { display:flex; justify-content:flex-end; } 
}
</style>