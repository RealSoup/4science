<template>
<b-container class="frm_st">
    <b-row>
        <b-col class="label_st">제목<b class="need" /></b-col>
        <b-col>
            <b-form-input v-model="value.bo_subject" ref="bo_subject" id="bo_subject" />
            <Validation :error="this.$store.state.error.validations.bo_subject" />
        </b-col>
    </b-row>
    <b-row>
        <b-col class="label_st">내용<b class="need" /></b-col>
        <b-col>
            <b-form-textarea v-model="value.bo_content" ref="bo_content" rows="13" id="bo_content" />
            <Validation :error="this.$store.state.error.validations.bo_content" />
        </b-col>
    </b-row>
    <file-upload v-if="config.is_addFile" ref="fileupload" v-model="value.file_info_bo" :fi_group = "'board'" :fi_kind="this.$route.params.bo_cd" />
</b-container>
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
        
    methods: {
        updateValue() {
            this.$emit("input", {
                bo_subject: this.$refs.bo_subject.value,
                bo_content: this.$refs.bo_content.value,
            });
        },
    },

}
</script>
