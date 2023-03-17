<template lang="html">
    <div>
        <div class="m_title">추가정보</div>

        <b-row>
            <b-col cols="2">
                <b-row class="mb-5">
                    <b-col class="awesome_p">
                        <input type="text" id="er_dlvy_at" v-model="value.er_dlvy_at" required v-b-tooltip.hover title="입력예: 2주이내, 1개월 이내" />
                        <label for="er_dlvy_at">납품기일</label>
                        <Validation :error="$store.state.error.validations.er_dlvy_at" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="awesome_p force">
                        <b-input-group size="sm">
                            <b-form-input v-model="value.er_effective_at" id="er_effective_at" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker v-model="value.er_effective_at" size="sm" button-only right></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                        <label for="er_effective_at">견적유효기간</label>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="awesome_p">
                <textarea id="'er_content" v-model="value.er_content" rows="5" required></textarea>
                <label for="er_content">추가정보</label>
            </b-col>
            <b-col cols="6">
                <file-upload ref="fileupload" v-model="value.file_info" :fi_group="'estimateReply'" :fi_kind="'add'" :height="100" />
                <transition name="fade">
                    <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false">
                        첨부파일 전송중 ......
                    </LoadingModal>
                </transition>
            </b-col>
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
    data() {
        return {

        }
    },
    methods: {
    },
}
</script>
