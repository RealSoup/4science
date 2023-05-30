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
                <b-col cols="12" sm="6"><b-button size="sm" variant="danger" @click="destroy">삭제</b-button></b-col>
                <b-col cols="12" sm="6" class="text-right">
                    <b-button-group size="sm">
                        <b-button size="sm" variant="light" :to="{name: 'adm_board_index'}">목록</b-button>
                        <b-button size="sm" variant="info" :to="{name: 'bo_show', params:{bo_cd:bo_cd, bo_id:bo_id}}">게시글 보기</b-button>
                        <b-button size="sm" variant="primary" @click="update">수정 완료</b-button>
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
                            <font-awesome-icon icon="user" /> {{ board.bo_writer }}
                        </b-link>
                        <template v-else>
                            <font-awesome-icon icon="user" /> {{ board.bo_writer }}
                        </template>
                    </span>
                    <span v-b-tooltip.hover title="작성일"><b-icon-calendar-date />{{ board.created_at | formatDate }}</span>
                </b-col>
            </b-row>            
        </b-container>
        <bo-form v-model="board" />
    </b-card>
    
    <b-card class="shadow mt-3" v-if="board.config.is_addFile">
        <file-upload ref="fileupload" v-model="board.file_info_bo" :fi_group = "'board'" :fi_kind="this.$route.params.bo_cd" />
    </b-card>
</form>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'AdmBoardEdit',
    components: {
        'bo-form': () => import('./_comp/BoForm'),
        'file-upload': FileUpload,
    },
    
    data() {
        return {
            bo_cd:this.$route.params.bo_cd,
            bo_id:this.$route.params.bo_id,
            board:{
                config: {},
            },
        };
    },
    methods: {
        async update () {
            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.board, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            const res = await ax.post(`/api/admin/board/${this.bo_cd}/update/${this.bo_id}`, this.frm);
            if (res && res.status === 200) {
                if (this.board.file_info_bo.length)
                    await this.$refs.fileupload.fileProcessor(res.data);
                this.$router.push({ name: 'adm_board_index' })
            }
        },

        async destroy(){
            

            var rst = await Notify.confirm('삭제', 'danger');
            if (rst) {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                const res = await ax.post(`/api/admin/board/${this.bo_cd}/destroy/${this.bo_id}`, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '게시글 삭제');
                    this.$router.push({ name: 'adm_board_index' });
                }
            }
        }   
    },
    async mounted() {
        const res = await ax.get(`/api/admin/board/${this.bo_cd}/edit/${this.bo_id}`);
        if (res && res.status === 200) {
            this.board = res.data;
        }
    },

}
</script>

<style>
#AdmBoardEdit .row { margin-bottom:20px; }
#AdmBoardEdit .row .col span { margin-right:1rem; }
#AdmBoardEdit .row .col span>svg { margin-right:0.5rem; }
</style>