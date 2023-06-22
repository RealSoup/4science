<template>
<b-container class="frm_st" :class="{'cscenter':($route.name === 'cscenter')}">
    <b-row v-if="config.bo_cd=='as'">
        <b-col class="label_st">주문방법</b-col>
        <b-col>
            <b-form-radio v-model="value.bo_od_type" button value="ON">온라인 주문</b-form-radio>
            <b-form-radio v-model="value.bo_od_type" button value="OFF">오프라인 주문</b-form-radio>
        </b-col>
    </b-row>
    <b-row v-if="config.bo_cd=='cancel'" class="bo_type">
        <b-col class="label_st">분류</b-col>
        <b-col>
            <b-form-radio v-model="value.bo_type" button value="C">배송전 주문취소</b-form-radio>
            <b-form-radio v-model="value.bo_type" button value="R">반품</b-form-radio>
            <b-form-radio v-model="value.bo_type" button value="S">교환</b-form-radio>
        </b-col>
    </b-row>
    <b-row v-if="config.bo_cd=='as'">
        <b-col class="label_st">주문/발주번호</b-col>
        <b-col><b-form-input v-model="value.bo_od_no" /></b-col>
    </b-row>
    <b-row>
        <b-col class="label_st">제목<b class="need" /></b-col>
        <b-col>
            <b-form-input v-model="value.bo_subject" ref="bo_subject" id="bo_subject" />
            <validation :error="this.$store.state.error.validations.bo_subject" />
        </b-col>
    </b-row>
    <b-row>
        <b-col class="label_st">내용<b class="need" /></b-col>
        <b-col>
            <b-form-textarea v-model="value.bo_content" ref="bo_content" rows="9" id="bo_content" />
            <validation :error="this.$store.state.error.validations.bo_content" />
        </b-col>
    </b-row>
    <b-row v-if="config.is_addFile">
        <b-col class="label_st">첨부파일</b-col>
        <b-col>
            <file-upload v-if="config.is_addFile" ref="fileupload" 
                v-model="value.file_info_bo" 
                :fi_group = "'board'" 
                :fi_kind="config.bo_cd" 
                :height="80" 
            />
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'FormGroup',
    components: {
        'file-upload': FileUpload,
        'validation': () =>     import('@/views/_common/Validation.vue'),
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
<style lang="css" scoped>
.cscenter { padding-left:0; padding-right:0; }
.cscenter .row { margin-bottom:.8rem; }

@media (max-width: 992px){
    .frm_st .row .col.label_st { flex-basis:100%; max-width:100%; }
    .cscenter .bo_type .col .btn-group-toggle { width:32%; }
    .cscenter .bo_type .col .btn-group-toggle >>> .btn { min-width:100%; }
}
</style>