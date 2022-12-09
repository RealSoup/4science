<template>
<b-container class="bo_index">
    <b-row v-for="(bo, i) in list.data" :key="bo.bo_id" class="bo_body">
        <b-col>{{list.total-(list.per_page*(list.current_page-1))-i}}</b-col>
        <b-col v-b-toggle="`collapse_${bo.bo_id}`">{{bo.bo_content}}</b-col>
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
                        <p>Q.</p>
                        <div>{{bo.bo_content}}</div>
                    </div>
                    <div class="ans" v-if="bo.answer">
                        <p>A.</p>
                        <div class="card-text" v-html="getContent(bo.answer.bo_content)"></div>
                        <div class="date">{{ bo.answer.created_at | formatDate }}</div>
                    </div>
                </b-card>
            </b-collapse>
        </b-col>
    </b-row>
    <pagination :data="list" align="center" size="small" @pagination-change-page="index"></pagination>
    
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
    props:['bo_cd', 'bo_cnt', 'bo_subject'],
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
                bo_subject:this.bo_subject,
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
        create() { this.isModalViewed = true; },

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

    mounted() { this.index(); },
};
</script>

<style lang="scss" scoped>
.bo_index { max-width:1000px; }
.bo_index .row { align-items:baseline; border-bottom: 1px solid #959595; }
.bo_index .bo_body .col { padding:3px; text-align:center; }
.bo_index .bo_body .col .answer_mark { background:#F7941C; }
.bo_index>.bo_body>.col:nth-of-type(1) { flex-basis:7%; max-width:7%; }
.bo_index>.bo_body>.col:nth-of-type(2) { text-align:left; background:none; border-color:#fff; margin:10px 0; overflow:hidden; text-overflow: ellipsis; display:-webkit-box; -webkit-line-clamp:1; /* 라인수 */ -webkit-box-orient:vertical; word-wrap:break-word; height:1.5em; }
.bo_index>.bo_body>.col:nth-of-type(3),
.bo_index>.bo_body>.col:nth-of-type(4),
.bo_index>.bo_body>.col:nth-of-type(5) { flex-basis:7%; max-width:7%; }
.bo_index .bo_body .answer { flex-basis:100%; max-width:100%; display:flex; justify-content:flex-end; text-align:left; }
.bo_index .bo_body .answer .collapse { flex-basis:93%; max-width:93%; margin-bottom:20px; }
.bo_index .bo_body .answer .collapse .card { border-width:0; background:#ECEAEB; border-radius:10px; margin-top:1rem; }
.bo_index .bo_body .answer .collapse .card .card-body { padding:1.25rem 2rem; }
.bo_index .bo_body .answer .collapse .card .card-body div { font-size:.87rem; }

.bo_index .bo_body .answer .collapse .card .card-body .ans { margin-top:3rem; }
.bo_index .bo_body .answer .collapse .card .card-body .ans p { margin:1.5rem 0 0; color:#FA931D; font-size: 1.2rem; font-weight:bold; }
.bo_index .bo_body .answer .collapse .card .card-body .ans .card-text { margin-top:1.3rem; }
.bo_index .bo_body .answer .collapse .card .card-body .ans .date { margin-top:1.3rem; }
.bo_index .pagination { margin-top:1rem; }
</style>