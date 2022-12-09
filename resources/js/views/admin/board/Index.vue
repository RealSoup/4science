<template>
    <b-container class="p_wrap">
        <h2>{{config.name}} 게시글 목록</h2>
        <b-card class="shadow">
            <b-container fluid class="list">            
                <b-row>
                    <b-col sm="12" md="6">total : {{this.list.total}}</b-col>
                    <b-col sm="12" md="6" class="text-right">
                        <b-button variant="primary" :to="{name: 'adm_board_create'}"><b-icon-plus-lg /> 글쓰기</b-button>
                    </b-col>
                </b-row>
                <hr>
                <b-row class="list_item" :class="{ 'answer': bo.bo_seq_cd == 'A' }" v-for="(bo, i) in list.data" :key="i" >
                    <b-col col lg="1">
                        <template v-if="isEmpty(bo.bo_seq_cd)">{{bo.bo_id}}</template>
                        <b-badge v-else>답변</b-badge>
                    </b-col>
                    <b-col col lg="7">
                        <b-button :to="{name: `adm_board_edit`, params: { bo_cd:bo_cd, bo_id:bo.bo_id }}" variant="outline-secondary" block>{{bo.bo_subject}}</b-button>
                    </b-col>
                    <b-col col lg="2">
                        {{bo.bo_writer}}
                    </b-col>
                    <b-col col lg="2">
                        <b-button v-if="config.is_qna && isEmpty(bo.bo_seq_cd) && !bo.answer" variant="warning" :to="{name: `adm_board_answer`, params: { bo_cd:bo_cd, bo_id:bo.bo_id }}">
                            <b-icon-headset /> 답변
                        </b-button>
                        
                        {{bo.created_at | formatDate}}
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            frm:{
                page:0,
            },
            list: {},
            config: {},
        }
    },

    methods: {
        async index(page=1){
            this.frm.page = page;
            try {
                const res = await ax.get(`/api/admin/board/${this.bo_cd}`, { params: this.frm});
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.config = res.data.config;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    beforeRouteUpdate (to, from, next) {
        // console.log(to, from);
        this.bo_cd = to.params.bo_cd;
        this.index();
        next();
    },
    mounted() {
        this.index();
    },
 
 
}
</script>

<style scoped>
h2 { margin:24px; }
.list_item  { margin-bottom:20px; }
.list_item .col { display:flex; align-items:center; }
.list_item .col:nth-of-type(1),
.list_item .col:nth-of-type(3) { justify-content: center; }
.list_item .col:nth-of-type(2) a { text-align:left; }
.list_item.answer .col:nth-of-type(2) { padding-left:64px; position:relative; }
.list_item.answer .col:nth-of-type(2)::before { content:"↪"; position:absolute; left: 25px; font-size: 30px; color: #ff5757; }
.list_item .col:nth-of-type(4) { justify-content:space-around; }
.list_item .col:nth-of-type(4) button { float:left; }
</style>