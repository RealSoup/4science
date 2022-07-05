<template>
<b-container class="bo_index">
    <b-row>
        <b-col><h4>{{config.name}}</h4></b-col>
    </b-row>
    <b-row>
        <b-col class="bo_list">
            <b-row class="bo_head">
                <b-col>번호</b-col>
                <b-col>제목</b-col>
                <b-col>답변상태</b-col>
                <b-col>작성자</b-col>
                <b-col>작성일</b-col>
            </b-row>
            <b-row v-for="bo in list.data" :key="bo.bo_id" class="bo_body">
                <b-col>{{bo.bo_id}}</b-col>
                <b-col><b-button v-b-toggle="`collapse_${bo.bo_id}`" block variant="outline-secondary">{{bo.bo_subject}}</b-button></b-col>
                <b-col>
                    <b-badge v-if="bo.answer" variant="success">답변완료</b-badge>
                    <b-badge v-else>답변대기</b-badge>
                </b-col>
                <b-col>{{bo.bo_writer}}</b-col>
                <b-col>{{bo.created_at | formatDate}}</b-col>
                <b-col class="answer">
                    <b-collapse :id="`collapse_${bo.bo_id}`">
                        <b-card>
                            <div>
                                <p><b>Q</b>. {{bo.bo_subject}}</p>
                                <p>{{bo.bo_content}}</p>
                            </div>
                            <hr />
                            <div v-if="bo.answer">
                                <p>
                                    <b>A</b>.
                                    <span v-b-tooltip.hover title="작성번호"><font-awesome-icon icon="tags" />{{ bo.answer.bo_id }}</span>
                                    <span v-b-tooltip.hover title="작성자"><font-awesome-icon icon="user" />{{ bo.answer.bo_writer }}</span>
                                    <span v-b-tooltip.hover title="작성일"><b-icon-calendar-date />{{ bo.answer.created_at | formatDate }}</span>
                                </p>
                                <div class="card-text" v-html="getContent(bo.answer.bo_content)"></div>
                            </div>
                            
                        </b-card>
                    </b-collapse>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    
    <b-row>
        <b-col class="text-right">
            <b-button @click="create">문의하기</b-button>
            <transition name="modal">
                <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="700">
                    <BoCreate v-model="bo" @store="store" />
                </Modal>
            </transition>
        </b-col>
    </b-row>
    <pagination :data="list" align="center" @pagination-change-page="index"></pagination>
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
    props:['bo_cd'],
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
.bo_index .bo_list .row { margin-bottom:10px; align-items:baseline; }
.bo_index .bo_list .bo_head .col { padding:10px; background:#555; color:#fff; font-weight:900; text-align:center; }
.bo_index .bo_list .bo_body .col { padding:3px; text-align:center; }
.bo_index .bo_list .bo_head .col:nth-of-type(1),
.bo_index .bo_list .bo_body .col:nth-of-type(1) { flex:0 0 10%; max-width:10%; }
.bo_index .bo_list .bo_body .col:nth-of-type(2) button { text-align:left; }
.bo_index .bo_list .bo_head .col:nth-of-type(3),
.bo_index .bo_list .bo_body .col:nth-of-type(3),
.bo_index .bo_list .bo_head .col:nth-of-type(4),
.bo_index .bo_list .bo_body .col:nth-of-type(4),
.bo_index .bo_list .bo_head .col:nth-of-type(5),
.bo_index .bo_list .bo_body .col:nth-of-type(5) { flex:0 0 7%; max-width:7%; }
.bo_index .bo_list .bo_body .answer { flex:0 0 100%; max-width:100%; display:flex; justify-content:flex-end; text-align:left; }
.bo_index .bo_list .bo_body .answer .collapse { flex:0 0 90%; max-width:90%; margin-bottom:20px; }
.bo_index .bo_list .bo_body .answer .collapse .card-body { background:#d8f1f5; }
.bo_index .bo_list .bo_body .answer .collapse .card-body div { margin-bottom:20px; }
.bo_index .bo_list .bo_body .answer .collapse .card-body div span { margin-right:1rem; }
.bo_index .bo_list .bo_body .answer .collapse .card-body div span>svg { margin-right:0.5rem; }
</style>