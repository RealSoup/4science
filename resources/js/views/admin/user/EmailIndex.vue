<template>
<b-container class="p_wrap">
    <h3 class="p_tit">메일 발송 목록</h3>

    <b-container class="cmain">
        <b-row>
            <b-col sm="12" md="6">Total : <b-badge variant="info">{{this.list.total | comma}}</b-badge></b-col>
            <b-col sm="12" md="6" class="text-right">
                <b-button :to="{name: 'adm_user_email_creat'}">메일 작성</b-button>
            </b-col>
        </b-row>
                    
        <b-row class="head list">
            <b-col>번호</b-col>
            <b-col>제목</b-col>
            <b-col>날짜</b-col>
            <b-col>Ctrl</b-col>
        </b-row>

        <b-row class="body list" v-for="mail in list.data" :key="mail.id">
            <b-col>{{ mail.id }}</b-col>
            <b-col><b-link :to="{name: 'adm_user_email_edit', params: { id:mail.id }}">{{ mail.title }}</b-link></b-col>
            <b-col>{{ mail.created_at | formatDate }}</b-col>
            <b-col>
                <b-button class="orange sm" :to="{ name: 'adm_user_email_edit', params: { id:mail.id } }"><b-icon-tools /></b-button>
                <b-button class="plum sm" :to="{ name: 'adm_user_email_send', params: { id:mail.id } }"><b-icon-mailbox2 /></b-button>
            </b-col>
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
    name: 'AdmUserEmailIndex',

    data() {
        return {
            sch_frm: { page: 0 },
            list: {},
        };
    },
    methods: {
        routerPush(){
            this.$router.push({name: 'adm_user_email', query: this.sch_frm }).catch(()=>{});
        },
        pageSet(p){
            this.sch_frm.page = p;
            this.routerPush();
        },
        async index() {
            try {
                const res = await ax.get(`/api/admin/user/email`, { params: this.sch_frm});
                if (res && res.status === 200) {
                    this.list = res.data;
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
.cmain .list .col { line-height:1.5; }
.cmain .list .col:nth-child(1) { flex:0 0 9%; max-width:9%; }
.cmain .list .col:nth-child(2) { text-align:left; }
.cmain .list .col:nth-child(3) { flex:0 0 10%; max-width:10%; }
.cmain .list .col:nth-child(4) { flex:0 0 8%; max-width:8%; }

</style>