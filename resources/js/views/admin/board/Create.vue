<template>
<form id="AdmBoardCreat" ref="form" @submit.prevent="update">
<!--
v-model="something"
:value="something"
@input="value => { something = value }"
-->
    <h3>작성</h3>
    <b-card no-body class="shadow mb-2 sticky-top p-2">
        <b-container fluid>
            <b-row>
                <b-col cols="12" sm="6"></b-col>
                <b-col cols="12" sm="6" class="text-right">
                    <b-button-group size="sm">
                        <b-button size="sm" variant="light" :to="{name: 'adm_board_index'}">목록</b-button>
                        <b-button size="sm" variant="primary" @click="store">작성 완료</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
    
    <b-card class="shadow mt-3">
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
    name: 'AdmBoardCreat',
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
        async store() {
            const res = await ax.post(`/api/admin/board/${this.bo_cd}/store`, this.board);
            if (res && res.status === 200) {
                if (this.board.file_info_bo.length)
                    await this.$refs.fileupload.fileProcessor(res.data);
                this.$router.push({ name: 'adm_board_index' })
            }
        }, 
    },
    async mounted() {
        const res = await ax.get(`/api/admin/board/${this.bo_cd}/create`);
        if (res && res.status === 200) {
            this.board = res.data;
        }
    },

}
</script>

<style>
#AdmBoardCreat .row { margin-bottom:20px; }
</style>