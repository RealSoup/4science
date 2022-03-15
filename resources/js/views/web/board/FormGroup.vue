<template>
<div class="">
    <div class="form-group">
        <label for="bo_subject">제목</label>
        <input type="text" class="form-control" id="bo_subject" ref="bo_subject"
            :value="value.bo_subject"
            @input="updateValue" />
        <Validation :error="this.$store.state.error.validations.bo_subject" />
    </div>
    <div class="form-group">
        <label for="bo_content">내용</label>
        <textarea class="form-control" id="bo_content" ref="bo_content" rows="10"
            :value="value.bo_content"
            @input="updateValue" />
        <Validation :error="this.$store.state.error.validations.bo_content" />
    </div>

    <file-upload v-if="config.is_addFile" ref="fileupload" v-model="value.file_info_bo" :fi_group = "'board'" :fi_kind="this.$route.params.bo_cd" />

</div>
</template>

<script>
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'FormGroup',
    components: {
        FileUpload,
        'Validation': () =>     import('@/views/_common/Validation.vue'),
    },
    props: ['value', 'config'],
    data() {
        return {
            fi_id:[],
        };
    },
        
    methods: {
        updateValue() {
            this.$emit("input", {
                bo_subject: this.$refs.bo_subject.value,
                bo_content: this.$refs.bo_content.value,
                fi_id: this.fi_id,
            });
        },
    },

}
</script>
