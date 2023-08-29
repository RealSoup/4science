<template>
<b-container class="p_wrap">
    <h3 class="p_tit">회원 목록</h3>

    <b-container class="frm_sch">
        <sch-date v-model="sch_frm">
            <b-col slot="prev" class="label top_left">가입일</b-col>
        </sch-date>
        <b-row>
            <b-col class="label bottom_left">유형</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.group">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(v, i) in option.group" :value="i" :key="i">{{v}}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">등급</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.level">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(v, i) in option.grade" :value="i" :key="i">{{v}}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">검색</b-col>
            <b-col>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-form-select v-model="sch_frm.keyword_type">
                            <b-form-select-option value="name">회원명</b-form-select-option>
                            <b-form-select-option value="email">이메일</b-form-select-option>
                            <b-form-select-option value="company">직장/학교</b-form-select-option>
                            <b-form-select-option value="part">부서/학과/연구실</b-form-select-option>
                            <b-form-select-option value="tutor">담당교수</b-form-select-option>
                            <b-form-select-option value="tel">TEL</b-form-select-option>
                            <b-form-select-option value="hp">HP</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>

                    <b-form-input v-model="sch_frm.keyword" placeholder="Please enter a keyword" @keyup.enter="routerPush"></b-form-input>

                    <b-input-group-append>
                        <b-button @click="routerPush"><b-icon-search /></b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </b-container>

    <b-container class="cmain">
        <b-row>
            <b-col sm="12" md="6">Total : <b>{{this.list.total | comma}}</b></b-col>
            <b-col sm="12" md="6" class="ctrl">회원정보를 클릭하면 수정이 가능합니다.</b-col>
        </b-row>
                    
        <b-row class="head list">
            <b-col>번호/등급</b-col>
            <b-col>이름</b-col>
            <b-col>E-mail</b-col>
            <b-col>연락처</b-col>
            <b-col>직장/학교</b-col>
            <b-col>가입일</b-col>
        </b-row>

        <b-row class="body list" v-for="us in list.data" :key="us.id">
            <b-col>
                {{us.id}}
                <b-badge v-if="us.level==1" class="normal">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==2" class="bronz">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==3" class="silver">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==4" class="gold">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==11" class="dealer_new">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==12" class="dealer">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==20" class="admin">{{option.grade[us.level]}}</b-badge>
                <b-badge v-if="us.level==29" class="super">{{option.grade[us.level]}}</b-badge>
            </b-col>
            <b-col>
                <b-link :to="{name: 'adm_user_edit', params: { id:us.id }}">{{us.name}}</b-link>
                <b-button :to="{name: 'adm_user_edit', params: { id:us.introducer.id }}" v-if="us.introducer" class="xm sky"> - 소개자 - {{us.introducer.name}}</b-button>
            </b-col>
            <b-col><b-link :to="{name: 'adm_user_edit', params: { id:us.id }}">{{us.email}}</b-link></b-col>                
            <b-col>
                <span><font-awesome-icon icon="mobile-alt" v-if="us.hp" />{{us.hp}}</span>
                <span><font-awesome-icon icon="phone" v-if="us.tel" />{{us.tel}}</span>
            </b-col>
            <b-col>{{ us.company }}</b-col>
            <b-col>{{ us.created_at | formatDate }}</b-col>
        </b-row>
        <pagination :data="list" @pagination-change-page="pageSet" :limit="5" :showDisabled="true" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
	        <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>

</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'AdmUserIndex',

    components: {
        'sch-date': () => import('@/views/_common/SchDate.vue'),
    },

    data() {
        return {
            sch_frm: {
                startDate:      '',
                endDate:        '',
                keyword_type:   'name',
                keyword:        '',
                page:           0
            },
            list: {},
            option: {},
        };
    },
    methods: {
        routerPush(){
            this.$router.push({name: 'adm_user', query: this.sch_frm }).catch(()=>{});
        },
        pageSet(p){
            this.sch_frm.page = p;
            this.routerPush();
        },
        async index() {
            try {
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
    mounted() {
        this.sch_frm = Object.assign( {}, this.sch_frm, this.$route.query );
        this.index();
    },
    beforeRouteUpdate (to, from, next) {
        this.sch_frm = Object.assign( {}, this.sch_frm, to.query );
        this.index();
        next();
    },
};
</script>

<style lang="css" scoped>
.cmain .row .ctrl { text-align:right; color:#0171BB; font-size:.9rem; font-weight:600; }
.cmain .row .col .normal { background-color:#17A2B9; }
.cmain .row .col .bronz { background-color:#F16621; }
.cmain .row .col .silver { background-color:#ACACAC; }
.cmain .row .col .gold { background-color:#FBC660; }
.cmain .row .col .dealer_new { background-color:#9B1AB2; }
.cmain .row .col .dealer { background-color:#24cdda; }
.cmain .row .col .admin { background-color:#0173BA; }
.cmain .row .col .super { background-color:#ED1C22; }

.cmain .list .col:nth-child(1) { flex:0 0 9%; max-width:9%; border-right:1px solid #CCCCCC; }
.cmain .list .col:nth-child(2) { flex:0 0 16%; max-width:16%; border-right:1px solid #CCCCCC; }
.cmain .list .col:nth-child(3) { flex:0 0 16%; max-width:16%; border-right:1px solid #CCCCCC; }
.cmain .list .col:nth-child(4) { border-right:1px solid #CCCCCC; }
.cmain .list .col:nth-child(5) { flex:0 0 19%; max-width:19%; border-right:1px solid #CCCCCC; }
.cmain .list .col:nth-child(6) { flex:0 0 11%; max-width:11%; }

.cmain .body .col:nth-child(1) { display: flex; justify-content: space-evenly; }
.cmain .body .col:nth-child(4) span { min-width:150px; display:inline-block; text-align:left; }
.cmain .body .col:nth-child(4) span:first-child { margin-right:2rem; }
.cmain .body .col:nth-child(4) span svg { margin-right:.6rem; }
</style>