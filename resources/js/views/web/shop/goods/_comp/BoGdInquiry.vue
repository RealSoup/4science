<template>
<b-container class="bo_index">
    <b-row v-for="(bo, i) in list.data" :key="bo.bo_id" class="bo_body">
        <b-col>{{list.total-(list.per_page*(list.current_page-1))-i}}</b-col>
        <b-col><b-button v-b-toggle="`collapse_${bo.bo_id}`" block variant="light">{{bo.bo_subject}}</b-button></b-col>
        <b-col>
            <b-badge v-if="bo.answer" class="answer_mark">답변완료</b-badge>
            <b-badge v-else>답변대기</b-badge>
        </b-col>
        <b-col>{{bo.bo_writer}}</b-col>
        <b-col>{{bo.created_at | formatDate}}</b-col>
        <b-col class="answer">
            <b-collapse :id="`collapse_${bo.bo_id}`">
                <b-card>
                    <div class="ask">
                        <p><b>Q</b>. {{bo.bo_subject}}</p>
                        <p>{{bo.bo_content}}</p>
                    </div>
                    <div class="ans" v-if="bo.answer">
                        <p><b class="aa">A</b>. 담당자 <b>{{ bo.answer.bo_writer }}</b> 의 답변입니다.</p>
                        <div class="card-text" v-html="getContent(bo.answer.bo_content)"></div>
                        <p>{{ bo.answer.created_at | formatDate }}</p>
                    </div>                    
                </b-card>
            </b-collapse>
        </b-col>
    </b-row>
    <pagination :data="list" align="center" @pagination-change-page="index"></pagination>
    
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="700">
            <BoCreate v-model="bo" @store="store" />
        </Modal>
    </transition>
</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'ShopGoodsInquiry',
    components: {
        'Modal': () => import('@/views/_common/Modal.vue'),
        'BoCreate': () => import('./BoCreate.vue'),
    },
    props:['bo_cd', 'bo_cnt'],
    data() {
        return {
            isModalViewed: false,
            frm:{
                page:0,
                bo_gd_id:this.$route.params.gd_id,
                limit:5,
            },
            list: {},
            config: {},
            bo: {
                bo_gd_id:this.$route.params.gd_id,
            },
        };
    },

    methods: {
        async index(page=1){
            this.frm.page = page;
            const res = await ax.get(`/api/board/${this.bo_cd}`, { params: this.frm});
            if (res && res.status === 200) {
                this.list = res.data.list;
                this.config = res.data.config;
                this.bo_cnt.inquiry = res.data.list.total;
            }
        },
        create() {
            this.isModalViewed = true;
        },

        async store() {
            const res = await ax.post(`/api/board/${this.bo_cd}/store`, this.bo);
            if (res && res.status === 200) {
                this.isModalViewed = false;
                this.index();
                // this.bo.bo_subject = '';
                // this.bo.bo_content = '';
            }
        },

        getContent(content) { return content.split('\n').join('<br>'); },


    },

    mounted() {
        this.index();
    },
};
</script>

<style lang="scss" scoped>
.bo_index { max-width:1000px; }
.bo_index .row { align-items:baseline; border-bottom: 1px solid #959595; }
.bo_index .bo_body .col { padding:3px; text-align:center; }
.bo_index .bo_body .col .answer_mark { background:#F7941C; }
.bo_index .bo_body .col:nth-of-type(1) { flex-basis:7%; max-width:7%; }
.bo_index .bo_body .col:nth-of-type(2) button { text-align:left; background:none; border-color:#fff; padding:10px 0; }
.bo_index .bo_body .col:nth-of-type(3),
.bo_index .bo_body .col:nth-of-type(4),
.bo_index .bo_body .col:nth-of-type(5) { flex-basis:7%; max-width:7%; }
.bo_index .bo_body .answer { flex-basis:100%; max-width:100%; display:flex; justify-content:flex-end; text-align:left; }
.bo_index .bo_body .answer .collapse { flex-basis:93%; max-width:93%; margin-bottom:20px; }
.bo_index .bo_body .answer .collapse .card { border-width:0; background:#ECEAEB; border-radius:10px; margin-top:1rem; }
.bo_index .bo_body .answer .collapse .card .card-body { padding:1.25rem 2rem }
.bo_index .bo_body .answer .collapse .card .card-body div { font-size:.87rem; }
.bo_index .bo_body .answer .collapse .card .card-body .ans { margin-top:3rem; }
.bo_index .bo_body .answer .collapse .card .card-body .ans p { margin:1.5rem 0 0; }
.bo_index .bo_body .answer .collapse .card .card-body .ans p .aa { color:#FA931D; }
.bo_index .bo_body .answer .collapse .card .card-body .ans p b { font-size: 1.2rem; }
.bo_index .bo_body .answer .collapse .card .card-body .ans .card-text { margin-top:1.3rem; }
</style>