<template>
<div class="box est_frm">
    <h5>추가정보 등록</h5>
    <b-row>
        <b-col>주문납품기일</b-col>
        <b-col>
            <b-form-input id="er_dlvy_at" v-model="value.er_dlvy_at" v-b-tooltip.hover title="입력예: 2주이내, 1개월 이내" />
            <Validation :error="$store.state.error.validations.er_dlvy_at" />
        </b-col>
        <b-col>견적유효기간</b-col>
        <b-col>
            <b-input-group size="sm">
                <b-form-input v-model="value.er_effective_at" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" />
                <b-input-group-append>
                    <b-form-datepicker v-model="value.er_effective_at" size="sm" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
    </b-row>
    <b-row>
        <b-col>첨부파일</b-col>
        <b-col>
            <file-upload ref="fileupload" v-model="value.file_info" :fi_group="'estimateReply'" :fi_kind="'add'" :height="124" />
            <transition name="fade">
                <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false">첨부파일 전송중 ..... </LoadingModal>
            </transition>
        </b-col>

        <b-col>추가정보</b-col>
        <b-col><b-form-textarea v-model="value.er_content" rows="5" /></b-col>
    </b-row>
</div>
</template>

<script>
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        FileUpload,
        'Validation': () => import('@/views/_common/Validation.vue'),
        'LoadingModal': () => import('@/views/_common/LoadingModal.vue'),
    },
    props: ['value', 'isLoadingModalViewed'],
}
</script>
<style lang="css" scoped>
.row:first-of-type .col:last-of-type .input-group { width:60%; }   
.row:last-of-type .col:first-of-type  { width:60%; }
.est_frm .row .col:nth-child(even) { padding-right: 1.5%; }
.est_frm .row .col>>>.container .row { border-width:0 !important; }
</style>