<template>
<div class="box label_form">
    <h5>추가정보 등록</h5>
    <b-row>
        <b-col>
            <label>주문납품기일</label>
            <div><b-form-input id="er_dlvy_at" v-model="value.er_dlvy_at" v-b-tooltip.hover title="입력예: 2주이내, 1개월 이내" size="sm" /></div>
            <validation :error="$store.state.error.validations.er_dlvy_at" />
        </b-col>
        <b-col>
            <label>견적유효기간</label>
            <b-input-group size="sm">
                <b-form-input v-model="value.er_effective_at" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" />
                <b-input-group-append>
                    <b-form-datepicker v-model="value.er_effective_at" size="sm" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>

        <b-col class="w_100">
            <label>첨부파일</label>
            <file-upload ref="fileupload" v-model="value.file_info" :fi_group="'estimateReply'" :fi_kind="'add'" :height="124" style="margin:6px 12px; width:calc(100% - 24px);}" />
            <transition name="fade">
                <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false">첨부파일 전송중 ..... </loading-modal>
            </transition>
        </b-col>

        <b-col class="w_100">
            <label>추가정보</label>
            <div><b-form-textarea v-model="value.er_content" rows="5" size="sm" /></div>
        </b-col>
    </b-row>
</div>
</template>

<script>
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        'file-upload': FileUpload,
        'validation': () => import('@/views/_common/Validation.vue'),
        'loading-modal': () => import('@/views/_common/LoadingModal.vue'),
    },
    props: ['value', 'isLoadingModalViewed'],
}
</script>
<style lang="css" scoped>
</style>