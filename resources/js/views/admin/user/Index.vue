<template>
<b-container class="p_wrap">
    <h3 class="p_tit">회원 목록</h3>

    <b-card class="search adform">
        <SchDate v-model="sch_frm">
            <b-col slot="prev" class="label">가입일</b-col>
        </SchDate>
        <b-row>
            <b-col class="label">유형</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.group" size="sm">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(v, i) in option.group" :value="i" :key="i">{{v}}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">등급</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.level" size="sm">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(v, i) in option.grade" :value="i" :key="i">{{v}}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">검색</b-col>
            <b-col class="type06">
                <b-input-group size="sm">
                    <b-input-group-prepend>
                        <b-form-select v-model="sch_frm.keyword_type" size="sm">
                            <b-form-select-option value="name">회원명</b-form-select-option>
                            <b-form-select-option value="email">이메일</b-form-select-option>
                            <b-form-select-option value="office">직장/학교</b-form-select-option>
                            <b-form-select-option value="department">부서/학과/연구실</b-form-select-option>
                            <b-form-select-option value="tutor">담당교수</b-form-select-option>
                            <b-form-select-option value="tel">TEL</b-form-select-option>
                            <b-form-select-option value="hp">HP</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>

                    <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword" @keyup.enter="index"></b-form-input>

                    <b-input-group-append>
                        <b-button @click="index"><b-icon-search /></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-card>

    <b-card class="data">
        <b-container class="list">
            <b-row>
                <b-col sm="12" md="6">Total : <b-badge variant="info">{{this.list.total | comma}}</b-badge></b-col>
            </b-row>
                      
            <b-row class="head cell">
                <b-col>등급</b-col>
                <b-col>이름</b-col>                
                <b-col>E-mail</b-col>
                <b-col>연락처</b-col>
                <b-col>가입일</b-col>
            </b-row>

            <b-link class="row body cell" 
                v-for="(us, i) in list.data" :key="i"
                :to="{name: 'adm_user_edit', params: { id:us.id }}"
            >
                <b-col>
                    {{us.id}}. lv {{us.level}} <b-badge>{{option.grade[us.level]}}</b-badge>
                </b-col>
                <b-col>{{us.name}}</b-col>
                <b-col>{{us.email}}</b-col>                
                <b-col>
                    <span><font-awesome-icon icon="mobile-alt" v-if="us.hp" />{{us.hp}}</span>
                    <span><font-awesome-icon icon="phone" v-if="us.tel" />{{us.tel}}</span>
                    <span><font-awesome-icon icon="fax" v-if="us.eq_fax" />{{us.eq_fax}}</span>
                </b-col>
                <b-col>{{ us.created_at | formatDate }}</b-col>
            </b-link>
            <pagination :data="list" @pagination-change-page="index" size="small" :limit="5" align="center" class="mt-5" />
        </b-container>
    </b-card>

</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'AdmUserIndex',

    components: {
        'SchDate': () => import('@/views/_common/SchDate.vue'),
    },

    data() {
        return {
            sch_frm: {
                startDate:'',
                endDate:'',
                keyword_type:'name',
                keyword:'',
                page:0
            },
            list: {},
            option: {},
        };
    },

    computed: {
        
    },

    mounted() {
        this.index();
    },

    methods: {
        async index(p=0) {
            try {
                this.sch_frm.page = p;
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('검색 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                const res = await ax.get(`/api/admin/user`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data.user;
                    this.option = res.data.option;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
};
</script>

<style lang="css" scoped>
.card.data .list .row { padding:10px 0; align-items:center; }
.card.data .list .body:hover { background:lightcyan; cursor:pointer; } 
.card.data .list .row:not(:last-of-type) { border-bottom:1px solid #ddd; }
.card.data .list .head .col { font-weight:bold; }
.card.data .list .row .col { text-align:center; padding:0 5px; }
.card.data .list .cell .col:nth-child(1) { flex:0 0 11%; max-width:11%; }
.card.data .list .cell .col:nth-child(2) { flex:0 0 9%; max-width:9%; }
.card.data .list .cell .col:nth-child(5) { flex:0 0 9%; max-width:9%; }
.card.data .list .row .col span { margin-right:1rem; }
.card.data .list .row .col span svg { margin-right:0.5rem; }

</style>