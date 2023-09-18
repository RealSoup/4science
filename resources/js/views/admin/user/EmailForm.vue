<template>
<div class="box frm01">
    <h5>메일내용</h5>
    <b-row>
        <b-col>제목</b-col><b-col><b-form-input v-model="value.title" /></b-col>
    </b-row>
    <b-row>
        <b-col>내용</b-col>
        <b-col>
            <textarea v-model="value.body" rows="20" required></textarea>
            <!-- <vue2-tinymce-editor v-model="value.body" ref="tinymce_editor" :options="TinymceOpt" /> -->
        </b-col>
    </b-row>
</div>
</template>

<script>
import ax from '@/api/http';
// import { Vue2TinymceEditor } from "vue2-tinymce-editor";

export default {
    name: 'AdmUserEmailForm',
    // components: {Vue2TinymceEditor, },
    props: ['value'],
    data() { 
        return { 
            // TinymceOpt: {
            //     height: 600,
            //     automatic_uploads: false,
            //     images_upload_handler: this.gd_desc_images_upload,
            // }, 
        }; 
    },
    
}
</script>

<style lang="css" scoped>
.frm01 .row .col textarea { width:100%; }
</style>
