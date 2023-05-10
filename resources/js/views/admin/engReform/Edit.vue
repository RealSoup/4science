<template>
<div>
    <b-card no-body class="shadow mb-2 sticky-top p-2">
        <b-container fluid>
            <b-row>
                <b-col cols="12" sm="6"></b-col>
                <b-col cols="12" sm="6" class="text-right">
                    <b-button variant="primary" @click="update"><font-awesome-icon icon="save" /> 저장</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <b-card id="adm_eng_reform_edit" class="shadow" title="영문교정 요청 내역">
        <b-container>
            <b-row>
                <b-col>
                    <div>
                        <span v-b-tooltip.hover title="이름"><font-awesome-icon icon="user" />{{ frm.er_name }}</span>
                        <span v-b-tooltip.hover title="일반전화"><font-awesome-icon icon="phone" />{{ frm.er_tel }}</span>
                        <span v-b-tooltip.hover title="HP"><font-awesome-icon icon="mobile-alt" />{{ frm.er_hp }}</span>
                        <span v-b-tooltip.hover title="이메일"><font-awesome-icon icon="at" />{{ frm.er_email }}</span>
                        <span v-b-tooltip.hover title="소속"><font-awesome-icon icon="users" />{{ frm.er_depart }}</span>
                        <span v-b-tooltip.hover title="신청일"><b-icon-calendar2-date />{{ frm.created_at | formatDate }}</span>
                        <span v-b-tooltip.hover title="납기일"><b-icon-stopwatch-fill />{{ frm.er_dlvy_at | formatDate }}</span>
                    </div>
                    <div>
                        <span><b>포맷팅:</b>
                            <template v-if="frm.er_format == 'NFM'">No-formatting</template>
                            <template v-else>formatting</template>
                        </span>
                        <span v-if="frm.er_format == 'FM'"><b>저널명:</b> {{ frm.er_journal_url }}</span>
                        <span><b>학문분야:</b> {{ frm.er_branch }}</span>
                        <span><b>하위학문분야:</b> {{ frm.er_branch_sub }}</span>
                        <span><b>에디터:</b> {{ frm.er_editor }}</span>
                        <span><b>문체스타일:</b> {{ frm.er_eng_style }}</span>
                    </div>
                    <div>
                        <span><b>요청사항:</b> {{ frm.er_demand }}</span>
                    </div>
                    
                </b-col>
            </b-row>
            
            <b-row>
                <b-col cols="2" col>
                    <b>작업 문서 파일:</b>
                </b-col>                
                <b-col>
                    <div v-for="f in frm.file_info" :key="f.fi_id">
                        <b-button v-if="f.fi_kind == 'work'" size="sm" variant="outline-info" block @click="fileDown(f.down_path, f.fi_original)">{{f.fi_original}}</b-button>
                    </div>
                </b-col>

                <b-col cols="2" col>
                    <b>참고 문서 파일:</b>
                </b-col>                
                <b-col>
                    <div v-for="f in frm.file_info" :key="f.fi_id">
                        <b-button v-if="f.fi_kind == 'ref'" size="sm" variant="outline-info" block @click="fileDown(f.down_path, f.fi_original)">{{f.fi_original}}</b-button>
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="2" col>
                    <b>교정자료 업로드:</b>
                </b-col>                
                <b-col>
                    <file-upload ref="fileupload" v-model="frm.file_info_cplt" :fi_group="'engReform'" :fi_kind="'cplt'" :height="150" />
                    <transition name="fade">
                        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false">
                            첨부파일 전송중 ......
                        </LoadingModal>
                    </transition>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12" col>
                    <div>
                        <span class="proc_con">
                            <b-alert show>
                                <b>처리상태:</b>
                                <b-form-radio-group v-model="frm.er_step" :options="er_step" name="er_step"></b-form-radio-group>
                            </b-alert>
                        </span>
                        <span v-if="frm.updated_id > 0"><b>처리일:</b> {{ frm.updated_at }}</span>
                        <span v-if="frm.updated_id > 0"><b>관리자:</b> {{ frm.mng.name }}</span>
                    </div>                    
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</div>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'AdmEngReformEdit',
    components:{
        FileUpload,
    },
    data() {
        return {
            isLoadingModalViewed:false,
            frm:{
                file_info_cplt: [],
            },
            er_step: [
                { text: '처리중',   value: 'ING' },
                { text: '처리완료', value: 'CPLT' },
                { text: '미처리',   value: 'NOT' },
                { text: '취소',     value: 'CXL' }
            ]
        };
    },

    methods: {
        async edit() {
            try {
                const res = await ax.get(`/api/admin/engReform/${this.$route.params.er_id}/edit`);
                if (res && res.status === 200) {
                    this.frm = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async update(){
            const res = await ax.post(`/api/admin/engReform/${this.$route.params.er_id}`, {er_step: this.frm.er_step, _method : 'PATCH'});
            if (res && res.status === 200) {                        
                await this.$refs.fileupload.fileProcessor(this.$route.params.er_id);
                this.isLoadingModalViewed=false;
                this.$router.push({ name: 'adm_eng_reform_index' })
            }
        },
    },

    mounted() {
        this.edit();
    },
};
</script>

<style lang="css" scoped>
#adm_eng_reform_edit .row { margin-bottom:2rem; }
#adm_eng_reform_edit .row .col { box-shadow:3px 2px 2px 0px; border:1px solid #EDEDED; padding:1rem; }
#adm_eng_reform_edit .row .col div { margin:1rem; }
#adm_eng_reform_edit .row .col div span { margin-right:1rem; }
#adm_eng_reform_edit .row .col div span svg,
#adm_eng_reform_edit .row .col div span b { margin-right:0.5rem; }
#adm_eng_reform_edit .row .col div span.proc_con { display:inline-block; }
#adm_eng_reform_edit .row .col div span.proc_con div { display:inline-block; margin:0; }
</style>