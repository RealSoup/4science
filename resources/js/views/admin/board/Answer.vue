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
                    <span v-b-tooltip.hover title="작성자">
                        <b-link v-if="board.created_id" :to="{name: 'adm_user_edit', params: { id:board.created_id }}" class="col">
                            <font-awesome-icon icon="user" />{{ board.bo_writer }}
                        </b-link>
                    </span>
                    <span v-b-tooltip.hover title="작성일"><b-icon-calendar-date />{{ board.created_at | formatDate }}</span>
                </b-col>
            </b-row>
            <b-row v-if="board.add_file && board.add_file.length">
                <b-col>
                    <b-icon icon="file-earmark-arrow-down-fill" />
                    <template v-for="file in board.add_file">
                        <span class="piece" @click="fileDown(file.down_path, file.fi_original)" :key="file.fi_id">{{file.fi_original}}</span>
                    </template>
                </b-col>
            
            </b-row>

            

            <b-row>
                <b-col>
                    <span v-b-tooltip="'제목'"><b-icon-chat-right-quote />{{ board.bo_subject }}</span>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-b-tooltip="'내용'"><p v-html="nl2br(board.bo_content)" /></b-col>
            </b-row>
            <b-row>
                <b-col>
                    <template v-if="board.img_file && board.img_file.length">
                        <img v-for="(image, i) in board.img_file" :src="image.path" class='me-auto ms-auto d-block' :key="i" />
                        <hr />
                    </template>
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
                    <validation :error="$store.state.error.validations.bo_subject" />
                </b-col>
            </b-row>
            <b-row>
                <b-col class="awesome_p">
                    <textarea id="'bo_content" v-model="frm.bo_content" rows="8" required></textarea>
                    <label for="bo_content">내용</label>
                    <validation :error="$store.state.error.validations.bo_content" />
                </b-col>
            </b-row>        
        </b-container>
    </b-card>
</form>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'AdmBoardEdit',
    components: {
        'validation': () => import('@/views/_common/Validation.vue'),
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
        async create() {
            const bo = await ax.get(`/api/admin/board/${this.bo_cd}/edit/${this.bo_id}`);
            if (bo && bo.status === 200) {
                this.board = bo.data;
                this.frm.bo_subject = `◖답변◗ ${this.board.bo_subject}`;
                if (this.bo_cd == 'gd_inquiry') {
                    this.frm.bo_gd_id = this.board.bo_gd_id;
                    
                }
            }
        },

        async store() {
            const res = await ax.post(`/api/admin/board/${this.bo_cd}/answer/${this.bo_id}`, this.frm);
            if (res && res.status === 200) 
                this.$router.push({ name: 'adm_board_index' })            
        },
    },
    beforeRouteUpdate (to, from, next) {
        // console.log(to, from);
        this.bo_id = to.params.bo_id;
        this.bo_cd = to.params.bo_cd;
        this.create();
        next();
    },
    async mounted() {
        this.create();
    },

}
</script>

<style>
#AdmBoardEdit .row { margin-bottom:20px; }
#AdmBoardEdit .row .col span { margin-right:1rem; }
#AdmBoardEdit .row .col span>svg { margin-right:0.5rem; }
</style>