<template>
<form id="frm_comment" ref="form" @submit.prevent="onSubmit">

    <div class="input-group">
        <label class="input-group-text cm_file">
            <b-icon icon="camera"></b-icon>
            <input type="file" id="file" ref="file" class="d-none" @change="prevViewFiles" />
        </label>
        <textarea class="form-control" id="bo_content" name="bo_content" ref="bo_content" v-model="bo_content"></textarea>
        <b-button variant="outline-secondary" size="sm" type="submit">등록</b-button>
        <b-button
            v-if="sltIndex !== -1"
            @click="refresh"
            variant="outline-danger" size="sm" class="p-1">
            취소
        </b-button>
    </div>
    <Validation :error="this.$store.state.error.validations.bo_content" />

    <p v-if="fileName" class="fileName">
        <span class="piece">
            <span v-text="fileName"></span>
            <span @click="fileDel"><b-icon icon="x-square-fill"></b-icon></span>
        </span>
    </p>
    <p v-if="fi_id" class="fileName">
        <b-form-checkbox
            v-model="del_file"
            :value="fi_id">
            파일 삭제
        </b-form-checkbox>
    </p>
</form>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'CommentFormGroup',
    props:['sltIndex', 'bo_cd', 'bo_id', 'prevBo_content', 'comment_mode', 'fi_id'],
    components: {
        'Validation': () => import('@/views/_common/Validation.vue'),
    },
    data() {
        return {
            act_type: 'create',
            bo_content: '',
            fileName: '',
            del_file: '',
        };
    },
    watch: {
        comment_mode: function(newVal, oldVal) { // watch it
            this.setBoContent();
        },
    },

    methods: {
        async onSubmit () {
            let res = {};
            try{
                if (this.comment_mode == 'create' || this.comment_mode == 'reCreate')
                    res = await ax.post(`/api/board/${this.bo_cd}/store`, this.getFromData('store'));
                else if (this.comment_mode == 'reEdit')
                    res = await ax.post(`/api/board/${this.bo_cd}/update/${this.bo_id}`, this.getFromData('update'));

                if ( res && res.status === 200)
                    this.refresh("comment_"+res.data.bo_id);
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }

        },
        getFromData(mode) {
            let frm = new FormData();
            let file = document.getElementById("file");

            if (mode == 'update') {
                frm.append("_method", 'PATCH');
                if (!!this.fi_id)
                    frm.append("prev_fi_id", this.fi_id);
                if (this.del_file)
                    frm.append("del_file", this.del_file);
            }
            frm.append("wri_type", 'comment');
            frm.append("bo_papa_id", this.bo_id);
            if (file.files.length)
                frm.append("file", file.files[0]);
            frm.append("bo_subject", 'comment');
            frm.append("bo_content", this.bo_content);

            frm.append('fi_group', 'board');
            frm.append('fi_kind', this.bo_cd);
            frm.append('is_thumb', true);
            return frm;
        },
        refresh(targetId) {
            this.$emit('callHideCommentForm');
            this.$emit('callIndex', targetId);
            this.bo_content = '';
            this.fileDel();
        },
        setBoContent() {
            if (this.comment_mode == 'reCreate')       this.bo_content = '';
            else if (this.comment_mode == 'reEdit')    this.bo_content = this.prevBo_content;
        },
        prevViewFiles(event) {
            this.fileName = event.target.files[0].name;
        },
        fileDel() {
            this.fileName = '';
            this.$refs.file.value = '';
        },
        textAreaFocus() {
            this.$refs.bo_content.focus();
        },
    },
    mounted() {
        this.setBoContent();
    },
}
</script>

<style lang="css" scoped>

#bo_show #comment #frm_comment .cm_file { font-size:1.5rem; background-color:#D8BCF5; padding:2rem 3rem; cursor:pointer;  }
#bo_show #comment #frm_comment button { padding:2rem 3rem; }
#bo_show #comment #frm_comment .fileName { margin-top:1rem; }
#bo_show #comment #frm_comment .fileName .piece { border:1px solid #ddd; border-radius:0.3rem; padding:0.1rem 0.3rem; }
#bo_show #comment #frm_comment .fileName .piece span { margin-left:0.5rem; cursor:pointer; }

</style>
