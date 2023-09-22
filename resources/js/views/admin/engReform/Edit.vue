<template>
<div class="p_wrap">
    <h3>영문교정 응답</h3>
    <div class="box est_frm">
        <h5>요청 정보</h5>
        <b-row>
            <b-col>요청자</b-col><b-col class="sty01">{{ frm.er_name }}</b-col>
            <b-col>연락처</b-col><b-col>{{ frm.er_hp }}</b-col>
            <b-col>이메일</b-col><b-col>{{ frm.er_email }}</b-col>
        </b-row>
        <b-row>
            <b-col>소속</b-col><b-col class="sty01">{{ frm.er_company }}</b-col>
            <b-col>등록일</b-col><b-col>{{ frm.created_at | formatDate_YY_MM_DD_HH:mm }}</b-col>
            <b-col>납기일</b-col><b-col>{{ frm.er_dlvy_at | formatDate }}</b-col>
        </b-row>
        <b-row>
            <b-col>학문분야</b-col><b-col class="sty01">{{ frm.er_branch }}</b-col>
            <b-col>상세학문분야</b-col><b-col>{{ frm.er_branch_sub }}</b-col>
            <b-col v-if="frm.er_editor">에디터</b-col><b-col v-if="frm.er_editor">{{ frm.er_editor }}</b-col>
        </b-row>
        <b-row>
            <b-col>문체스타일</b-col><b-col class="sty01">{{ frm.er_eng_style }}</b-col>
            <b-col>문서 용도</b-col><b-col>{{ frm.er_use }}</b-col>
        </b-row>
        <b-row>
            <b-col>포멧팅</b-col>
            <b-col class="sty01">
                <template v-if="frm.er_format == 'NFM'">No-formatting</template>
                <template v-else>formatting</template>
            </b-col>
            <b-col>저널명</b-col> <b-col>{{ frm.er_journal_url }}</b-col>
        </b-row>
        <b-row>
            <b-col>요청사항</b-col><b-col><p v-html="nl2br(frm.er_demand)" /></b-col>
        </b-row>
    </div>

    <div class="box box_f">
        <b-row>
            <b-col>작업문서 파일 <span class="cnt" v-if="frm.file_info">({{frm.file_info.filter(f => f.fi_kind == 'work').length}})</span></b-col>
            <b-col class="add_file">
                <div v-for="f in frm.file_info" :key="f.fi_id">
                    <b-button v-if="f.fi_kind == 'work'" size="sm" variant="outline-info" block @click="fileDown(f.down_path, f.fi_original)">{{f.fi_original}}</b-button>
                </div>
            </b-col>
            <b-col>참고문서 파일 <span class="cnt" v-if="frm.file_info">({{frm.file_info.filter(f => f.fi_kind == 'ref').length}})</span></b-col>
            <b-col class="add_file">
                <div v-for="f in frm.file_info" :key="f.fi_id">
                    <b-button v-if="f.fi_kind == 'ref'" size="sm" variant="outline-info" block @click="fileDown(f.down_path, f.fi_original)">{{f.fi_original}}</b-button>
                </div>
            </b-col>
        </b-row>
    </div>

    <div class="box box_f">
        <b-row>
            <b-col>교정자료 업로드</b-col>
            <b-col>
                <file-upload ref="fileupload" v-model="frm.file_info_cplt" :fi_group="'engReform'" :fi_kind="'cplt'" :height="70" />
                <transition name="fade">
                    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false">첨부파일 전송중 ......</loading-modal>
                </transition>
            </b-col>
        </b-row>
    </div>
    
    <b-row class="bottom">
        <b-col>
            <span v-if="frm.updated_id > 0"><b>처리일:</b> {{ frm.updated_at }} <b>관리자:</b> {{ frm.mng.name }}</span>

            <b-input-group>
                <b-form-select v-model="frm.er_step">
                    <b-form-select-option value="">◖처리 상태◗</b-form-select-option>
                    <b-form-select-option v-for="(v, k) in er_step" :key="k" :value="v.value">{{v.name}}</b-form-select-option>
                </b-form-select>
                <b-input-group-append><b-button @click="update('od_step')" class="d_gray">변경</b-button></b-input-group-append>
            </b-input-group>

            <b-button class="d_blue" @click="update"><font-awesome-icon icon="save" /> 저장</b-button>
        </b-col>
    </b-row>
</div>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    name: 'AdmEngReformEdit',
    components:{
        'file-upload': FileUpload,
        'loading-modal': () => import('@/views/_common/LoadingModal.vue'),
    },
    data() {
        return {
            isLoadingModalViewed:false,
            frm:{
                file_info_cplt: [],
                er_step:'',
            },
            option:{},
            er_step: { 
                0: { value:'ING',  name:'처리중' },
                1: { value:'CPLT', name:'처리완료' },
                2: { value:'NOT',  name:'미처리' },
                3: { value:'CXL',  name:'취소' }
            },
        };
    },

    methods: {
        async edit() {
            try {
                const res = await ax.get(`/api/admin/engReform/${this.$route.params.er_id}/edit`);
                if (res && res.status === 200) {
                    this.frm = res.data.con;
                    this.option = res.data.option;
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

    mounted() { this.edit(); },
};
</script>

<style lang="css" scoped>
.p_wrap { max-width:1640px; margin-left:auto; margin-right:auto; }
.est_frm .row .col.sty02,
.est_frm .row .col:nth-child(odd) { flex:0 0 10%; max-width:10%; }
.est_frm .row .col.sty01 { flex:0 0 24%; max-width:24%; }
.est_frm .row .col.sty03 { flex:0 0 14%; max-width:14%; }
.est_frm .row .col.sty04 { flex:0 0 13%; max-width:13%; }

.box_f .row .col:nth-child(odd) { flex:0 0 14%; max-width:14%; }
.box_f .row .add_file div .btn { max-width:400px; margin-bottom:.7rem; }
.box_f .row .col .cnt { color:#16A2B9; font-size:.9rem; }
.box_f .row .col >>> .row .imgList .col-lg-2 { flex: 0 0 8.333333%; max-width: 8.333333%; }
.bottom .col { display:flex; justify-content:flex-end; align-items:center; }
.bottom .col .input-group { max-width:200px; }
.bottom .col span>b,
.bottom .col>.input-group, 
.bottom .col>.btn { margin-left:1rem; }
</style>