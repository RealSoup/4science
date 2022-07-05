<template>
<form id="AdmBoardEdit" ref="form" @submit.prevent="update">
<!--
v-model="something"
:value="something"
@input="value => { something = value }"
-->
    <h3>수정</h3>
    <b-card no-body class="shadow mb-2 sticky-top p-2">
        <b-container fluid>
            <b-row>
                <b-col cols="12" sm="6"></b-col>
                <b-col cols="12" sm="6" class="text-right">
                    <b-button-group size="sm">
                        <b-button size="sm" variant="light" :to="{name: 'adm_board_index'}">목록</b-button>
                        <b-button size="sm" variant="primary" @click="store">답변 완료</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
    
    <b-card class="shadow mt-3">
        <b-container>
            <b-row>
                <b-col>
                    <span v-b-tooltip.hover title="작성번호"><font-awesome-icon icon="tags" />{{ board.bo_id }}</span>
                    <span v-b-tooltip.hover title="작성자"><font-awesome-icon icon="user" />{{ board.bo_writer }}</span>
                    <span v-b-tooltip.hover title="작성일"><b-icon-calendar-date />{{ board.created_at | formatDate }}</span>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <span v-b-tooltip.hover title="제목"><b-icon-chat-right-quote />{{ board.bo_subject }}</span>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <span v-b-tooltip.hover title="내용"><b-icon-chat-right-text />{{ board.bo_content }}</span>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <b-card class="shadow mt-3">
        <b-container>
            <b-row>
                <b-col class="awesome_p">
                    <b-form-input v-model="answer_subject" id="bo_subject" size="lg" required />
                    <label for="bo_subject">제목</label>
                    <Validation :error="$store.state.error.validations.bo_subject" />
                </b-col>
            </b-row>
            <b-row>
                <b-col class="awesome_p">
                    <textarea id="'bo_content" v-model="frm.bo_content" rows="8" required></textarea>
                    <label for="bo_content">내용</label>
                    <Validation :error="$store.state.error.validations.bo_content" />
                </b-col>
            </b-row>        
        </b-container>
    </b-card>
</form>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'AdmBoardEdit',
    components: {
        FileUpload,
    },
    
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            bo_id:this.$route.params.bo_id,
            board:{
                config: {},
            },
            frm:{}
        };
    },
    
    computed: {
        answer_subject: {
            get () {
                return `◖답변◗ ${this.board.bo_subject}`;
            },
            set (v) {
                this.frm.bo_subject = v;            
            }
        },
    },

    methods: {
        async store() {
            const res = await ax.post(`/api/admin/board/${this.bo_cd}/answer/${this.bo_id}`, this.frm);
            if (res && res.status === 200) 
                this.$router.push({ name: 'adm_board_index' })            
        },
    },
    async mounted() {
        const res = await ax.get(`/api/admin/board/${this.bo_cd}/edit/${this.bo_id}`);
        if (res && res.status === 200) {
            this.board = res.data;
            this.frm.bo_subject = `◖답변◗ ${this.board.bo_subject}`;
            if (this.bo_cd == 'gd_inquiry') {
                this.frm.bo_gd_id = this.board.bo_gd_id;
                
            }
        }
    },

}
</script>

<style>
#AdmBoardEdit .row { margin-bottom:20px; }
#AdmBoardEdit .row .col span { margin-right:1rem; }
#AdmBoardEdit .row .col span>svg { margin-right:0.5rem; }
</style>