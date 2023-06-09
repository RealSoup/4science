<template>
    <div id="gd_desc" tabindex="-1">
        <ckeditor :editor="editor" @input="updateField" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<script>
import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic-realsoup';

import UploadAdapter from './UploadAdapter';
Vue.use( CKEditor );

export default {
    name: 'CkeditorComp',
    props: ['value'],
    watch: {
        value: function() {
            this.editorData = this.value;
        },
    },
    data() {
        return {
            editor: ClassicEditor,
            editorData: this.value,
            editorConfig: {
                extraPlugins: [this.uploader],
                toolbar: {
            		items: [ // 'bulletedList', 'numberedList', 'blockQuote', 'mediaEmbed',
            			'heading', '|',
                        'fontfamily', 'fontsize', 'fontColor', '|',
            			'bold', 'italic', 'alignment', 'link',  '|',
            			'indent', 'outdent', '|',
            			'imageUpload', 'insertTable', 'undo', 'redo', '|',
                        'sourceEditing',
            		]
            	},
            	table: {
            		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
            	},
                image: {
                    styles: [ 'alignLeft', 'alignCenter', 'alignRight' ],
                    resizeUnit: "%",
                    resizeOptions: [
                        { name: 'imageResize:original', label: 'Original', value: null },
                        { name: 'imageResize:50', label: '50%', value: '50' },
                        { name: 'imageResize:75', label: '75%', value: '75' },
                        { name: 'imageResize:100', label: '100%', value: '100' }
                    ],
                    toolbar: [
                        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', '|',
                        'imageResize', '|',
                        'imageTextAlternative'
                    ]
                },
                alignment: {
                    options: [ 'left', 'right', 'center','justify' ]
                },
            },
        };
    },
    methods: {
        updateField: function() {
            this.$emit('input', String(this.editorData));
        },
        uploader: function(editor) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new UploadAdapter( loader );
            };
            
            editor.plugins.get( 'ImageUploadEditing' ).on( 'uploadComplete', ( evt, { data, imageElement } ) => {
                // console.log(data.fi_id);
            } );
        },
    },
    mounted() {
    },
}
</script>
<style media="screen">
.ck-editor .ck-content  ul, ol { padding: 0 1rem; }
.ck-editor .ck-content ul li { list-style-type:disc; }
.ck-editor .ck-content ol li { list-style-type: decimal; }
.ck-editor__editable:not(.ck-editor__nested-editable) { min-height:500px; }
.ck-editor__editable_inline { max-height:500px; }
</style>
