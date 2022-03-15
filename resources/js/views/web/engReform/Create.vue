<template lang="html">
    <div class="engReform">
        <b-card class="shadow mt-3">
            <template #header><b>요청자 정보</b></template>
            <b-container>
                <b-row >
                    <b-col class="awesome_p">
                        <b-form-input id="er_name" v-model="frm.er_name" required />
                        <label for="er_name"><span>이름</span></label>
                        <Validation :error="this.$store.state.error.validations.er_name" />
                    </b-col>
                    <b-col class="awesome_p">
                        <b-form-input type="email" id="er_email" v-model="frm.er_email" required />
                        <label for="er_email"><span>이메일</span></label>
                        <Validation :error="this.$store.state.error.validations.er_email" />
                    </b-col>
                    <b-col class="awesome_p">
                        <b-form-input id="er_depart" v-model="frm.er_depart" required />
                        <label for="er_depart"><span>소속 <small><i>직장/학교/부서/학과/연구실명</i></small></span></label>
                        <Validation :error="this.$store.state.error.validations.er_depart" />
                    </b-col>

                    <b-col class="awesome_p">
                        <b-form-input id="er_hp" v-model="frm.er_hp" required :formatter="formatHp" />
                        <label for="er_hp"><span>휴대폰</span></label>
                        <Validation :error="this.$store.state.error.validations.er_hp" />
                    </b-col>
                    <b-col class="awesome_p">
                        <b-form-input id="er_tel" v-model="frm.er_tel" :formatter="formatTel" />
                        <label for="er_tel"><span>전화</span></label>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="shadow mt-3">
            <template #header><b>요청 정보</b></template>
            <b-container>
                <b-row>
                    <label class="col col-lg-3">
                        <b class="d-block">서비스선택</b>
                        <b-form-radio-group v-model="frm.er_type" button-variant="outline-info" size="sm" buttons id="er_type">
                            <b-form-radio value="1">일반 교정</b-form-radio>
                            <b-form-radio value="2">프리미엄 교정</b-form-radio>
                            <b-form-radio value="3">프리미엄플러스  교정</b-form-radio>
                        </b-form-radio-group>
                        <Validation :error="this.$store.state.error.validations.er_type" />
                    </label>
                    <label class="col col-lg-3" v-b-tooltip.hover title="교정 완료본을 받으실 날짜를 지정하여 주세요. 교정 가능한 날짜 및 시간은 견적서로 보내드립니다.">
                        <b>납기일</b>
                        <b-form-datepicker id="er_dlvy_at" v-model="frm.er_dlvy_at" placeholder="Choose a start date" class="mb-2"></b-form-datepicker>
                        <Validation :error="this.$store.state.error.validations.er_dlvy_at" />
                    </label>
                    <div class="col" v-b-tooltip.hover title="저널지침에 따른 포맷팅 여부를 선택해주세요.">
                        <b>포맷팅</b>
                        <b-input-group id="er_format">
                            <b-input-group-prepend is-text>
                                <label><input type="radio" name="er_format" v-model="frm.er_format" value="NFM" /> No-formatting</label>
                            </b-input-group-prepend>
                            <b-input-group-prepend is-text>
                                <label><input type="radio" name="er_format" v-model="frm.er_format" value="FM" /> Formatting</label>
                            </b-input-group-prepend>
                            <b-form-input v-model="frm.er_format_url" placeholder="저널URL"></b-form-input>
                        </b-input-group>
                        <Validation :error="this.$store.state.error.validations.er_format" />
                    </div>
                </b-row>
                <b-row>
                    <b-col tag="label" v-b-tooltip.hover title="문서의 용도에 따라 교정 어투나 스타일 등은 달라지게 됩니다.">
                        <b>문서용도</b>
                        <b-form-select v-model="frm.er_use" id="er_use" :options="use_opt"></b-form-select>
                        <Validation :error="this.$store.state.error.validations.er_use" />
                    </b-col>
                    <b-col tag="label" v-b-tooltip.hover title="주제분야를 보시려면 관련된 학문분야를 먼저 선택하여 주십시오.">
                        <b>학문분야</b>
                        <b-form-select v-model="frm.er_branch" id="er_branch" :options="branch_opt"></b-form-select>
                        <Validation :error="this.$store.state.error.validations.er_branch" />
                    </b-col>
                    <b-col tag="label" v-b-tooltip.hover title="어떤 학문 분야/전문지식을 가진 에디터를 선호하십니까?">
                        <b>에디터</b>
                        <b-form-select v-model="frm.er_editor" id="er_editor" :options="editor_opt[this.frm.er_branch-1]"></b-form-select>
                        <Validation :error="this.$store.state.error.validations.er_editor" />
                    </b-col>
                    <b-col tag="label" v-b-tooltip.hover title="고객님의 연구분야가 매우 특수하여 해당 전문 경험이 있는 교정자에게 맡기고 싶은 경우에만 기재하여 주십시오.">
                        <b>하위 학문 분야</b>
                        <b-form-input v-model="frm.er_branch_sub" placeholder="하위 학문 분야 기재"></b-form-input>
                    </b-col>
                    <b-col tag="label">
                        <b>문체스타일</b>
                        <select class="custom-select" v-model="frm.er_eng_style" id="er_eng_style">
                            <option value="AM">American English</option>
                            <option value="BR">British English</option>
                        </select>
                        <Validation :error="this.$store.state.error.validations.er_eng_style" />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b>작업문서 업로드</b> <small>최대 업로드 가능 용량 : 200MB</small>
                        <file-upload ref="fileupload1" v-model="frm.file_info_work" :fi_type="'engReform'" :fi_path="'work'" />
                    </b-col>
                    <b-col>
                        <b>참고문서 업로드</b> <small>최대 업로드 가능 용량 : 200MB</small>
                        <file-upload ref="fileupload2" v-model="frm.file_info_ref" :fi_type="'engReform'" :fi_path = "'ref'" />
                    </b-col>
                    <transition name="fade">
                        <LoadingModal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="''">
                            첨부파일 전송중 ......
                        </LoadingModal>
                    </transition>
                </b-row>
                <b-row><b-col tag="label"><b>요구사항</b><b-form-textarea v-model="frm.er_demand" rows="5" /></b-col></b-row>
                <b-row><b-col><b-button size="lg" block variant="primary" @click="store">제출</b-button></b-col></b-row>
            </b-container>
        </b-card>


        <div class="default_layout">
            <div class="g_btn3">
                <input type="button" value="영문 교정 신청하기" title="영문 교정 신청하기" class="prdView_btn05 eng_toggle"><!--처리할곳-->
            </div>
            <div class="section">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                    <tr> <th>서비스내용</th> <td colspan="5" align="left">영어논문교정, 기업용브로셔, 홍보문서, E-mail, 계약서 등 각종 영어문서</td> </tr>
                    <tr> <th>파일서식</th> <td colspan="5" align="left">MS word 파일, LaTex파일, TeX파일, PDF파일, 텍스트 파일, MS Excel파일, PPT파일<br>(PDF, LaTex 와 TeX (.tex) 형식의 파일에는 15%의 추가요금이 적용됩니다)<br>PDF 파일은 복잡한 교정과정을 수작업으로 진행으로 프리미엄 교정이 불가합니다.</td> </tr>
                    <tr> <th rowspan="2">일반 교정<p>(부가세포함)</p></th> <td class="bg1">소요 기간</td> <td class="bg2">1~2일</td> <td class="bg2">3~4일</td> <td class="bg2">5~6일</td> <td class="bg2">7~8일</td> </tr>
                    <tr> <td class="bg1">페이지 단가</td> <td class="bold">18,700원</td> <td class="bold">16,500원</td> <td class="bold">14,300원</td> <td class="bold">13,200원</td> </tr>
                    <tr> <th rowspan="2">프리미엄 교정<p>(부가세포함)</p></th> <td class="bg1" rowspan="2">페이지 단가</td> <td class="bg2">프리미엄</td> <td class="bold">29,700원</td> <td colspan="2">소요기간 3~4일</td> </tr>
                    <tr> <td class="bg2">프리미엄 플러스</td> <td class="bold">33,000원</td> <td colspan="2">논문+저널답변서 무료 재교정</td> </tr>
                    </tbody>
                </table>
                <p><strong>* 1page = 영문 200단어를 기준</strong>합니다.<br>* 페이지 수에 따라 납품기일이 다소 변경될 수 있습니다.</p>
            </div>
            <div class="line"></div>
            <div class="section">
                <span class="sub_title"><img src="/templates/sites/basic/_images/topSearchArea_btn_right.png" alt=""> 서비스 내용</span>
                <table cellpadding="0" cellspacing="0" border="0" class="mgt10">
                    <colgroup> <col width="50%"> <col width="50%"> </colgroup>
                    <tbody>
                    <tr> <th class="h40">일반 교정</th> <th class="h40">프리미엄 교정</th> </tr>
                    <tr> <td>경제적인 가격으로 영어문서 집필과정에서 필요한 모든 교정 커버</td> <td>논문 문장 및 문단 구조와 흐름, 논리 체계</td> </tr>
                    <tr> <td>문법, 맞춤법, 오타</td> <td>문법, 맞춤법 및 오타 점검</td> </tr>
                    <tr> <td>단어수 무료 축소 10%</td> <td>단어수 무료 축소 20%</td> </tr>
                    <tr> <td>레퍼런스 일관성 점검</td> <td>레퍼런스 일관성 및 정확성 체크</td> </tr>
                    <tr> <td>저널 가이드라인 포맷팅</td> <td>저널 가이드라인 포맷팅</td> </tr>
                    <tr> <td>재교정시 50% 할인 적용<br><span>(논문을 광범위하게 수정을 하지 않은 경우. 예를 들어, 수정 사항이 50% 이하인 전체교정의 경우)</span></td> <td>논문 수정까지 고려하신다면 무료 재교정<br><span>(수정된 문서의 글자 수가 원본보다 20% 이상 증가하지 않은 경우 재교정 무료)</span></td> </tr>
                    </tbody>
                </table>
            </div>
            <div class="section">
                <img src="/templates/sites/basic/_images/engReform_normal.png" alt="일반 교정 / 영어 논문의 자연스러운 문장, 표현이나 문법, 구두점의 오류 등 영어 문서 집필 과정에서 필요한 모든 교정을 커버하며 비영어권 고객과 영어권 고객 모두에게 유용합니다. 문서 크기에 따라 다양한 납품기일 선택이 가능합니다. 저널 무료 포맷팅은 교정 서비스에 포함되는 부분에 한하여 1회 무료입니다. 합리적인 가격으로 영어 문서 집필 과정에서 필요한 모든 교정을 커버하고자 하는 분들을 위한 서비스입니다.">
                <ul>
                    <li>515개 분야 석박사 원어민 에디터의 논문 1차 교정 후 숙련된 리뷰어의 2차 교정까지 포함되어 있습니다.</li>
                    <li>요청시 에디티지 인증서 및 무료 저널 양식 맞춤 서비스를 제공합니다.</li>
                    <li>빠른 납기일을 제공하고 있습니다.</li>
                    <li>재교정 작업에 대해 할인을 받으실 수 있습니다. (문서 전체 재교정 의뢰시)</li>
                </ul>
            </div>
            <div class="section">
                <img src="/templates/sites/basic/_images/engReform_pm.png" alt="프리미엄 교정 / 학술논문 영문교정 후 저널 답변서 교정, 무료 재교정 서비스 및 논문 구성, 의미, 논리성 등까지 포함해 인상적인 원고로 교정해 드립니다. 저널 투고 논문 교정을 위해 최선을 다하고 싶은 분에게 최적의 서비스입니다. 저널 무료 포맷팅은 교정 서비스에 포함되는 부분에 한하여 1회 무료입니다.">
                <ul>
                    <li>515개 분야 석박사 원어민 에디터의 논문 1차 교정 후 숙련된 리뷰어의 2차 교정까지 포함되어 있습니다.</li>
                    <li>에디터 중에서도 경험이 풍부한 에디터분들로 프리미엄 교정팀이 구성되어 있습니다.</li>
                    <li>원고에 대한 심도 깊은 검토로 영어 언어적 측면 뿐 아니라 구성, 의미, 논리성, 스타일 등을 포함해 인상적인 원고로 교정해 드립니다.</li>
                    <li>무료 재교정 범위에 들어가는 경우 처음 이용 시부터 1년 이내에 한해서 횟수 제한없이 무료로 다중교정을 제공합니다.</li>
                    <li>저널 제출을 위한 커버 레터 무료 작성, 영어 등급을 전문가가 평가하는 Document scorecard, 논문 퇴고에 유용한 전문가의 코멘트, 영문 교정 증명서 등이 무료로 제공됩니다.</li>
                </ul>
            </div>
            <div class="section">
                <img src="/templates/sites/basic/_images/engReform_pmplus.png" alt="프리미엄 플러스 교정 / 학술논문 영문교정 후 저널 답변서 교정, 무료 재교정 서비스 및 논문 구성, 의미, 논리성 등까지 포함해 인상적인 원고로 교정해 드립니다. 저널 투고 논문 교정을 위해 최선을 다하고 싶은 분에게 최적의 서비스입니다. 저널 무료 포맷팅은 교정 서비스에 포함되는 부분에 한하여 1회 무료입니다.">
                <ul>
                    <li>작성한 영문내용이 저자의 의도대로 제대로 전달되는지 점검하기 위해 논문을 포함한 저널 답변서까지 프리미엄 수준으로 교정해드립니다.</li>
                    <li>저널 리뷰어 코멘트 하나하나 면밀히 검토 후 철저하고 정확하게 답변서가 기술되었는지 점검해드립니다.</li>
                    <li>저널 답변서 내용을 어떻게 보강할지, 만약 새로운 데이터가 필요할 경우 학문분야 전문 에디터가 제안해드립니다.</li>
                </ul>
            </div>
            <div class="section">
                <span class="sub_title"><img src="/templates/sites/basic/_images/topSearchArea_btn_right.png" alt=""> 일반 교정 VS 프리미엄 교정</span>
                <table cellpadding="0" cellspacing="0" border="0" class="mgt10">
                    <colgroup> <col width="50%"> <col width="25%"> <col width="25%"> </colgroup>
                    <tbody>
                    <tr> <th class="h40">교정사항</th> <th class="h40">일반 교정</th> <th class="h40">프리미엄 교정</th> </tr>
                    <tr> <td>잘못된 표기 (철자, 띄어쓰기, 대소문자 구분 등)</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>구두점 (콜론, 세미콜론, 대시 등)</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>용어, 이탤릭체 등의 통일성</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>문법(주어-동사 관계, 단수 복수 구분, 시제, 전치사, 관사 등)</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>레이아웃, 폰트, 숫자 형식 등</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>어휘선택</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>언어 관련 조언</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>의미가 불분명한 텍스트에 개선안 제시</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>논리체계 및 연관성</td> <td>X</td> <td>O</td> </tr>
                    <tr> <td>체계성 및 문체: 흐름, presentation, 어조 등</td> <td>X</td> <td>O</td> </tr>
                    <tr> <td>커버레터</td> <td>X</td> <td>O</td> </tr>
                    <tr> <td>문장구조</td> <td>X</td> <td>O</td> </tr>
                    <tr> <td>무료 저널 양식 맞춤</td> <td>O</td> <td>O</td> </tr>
                    <tr> <td>과학 기술 용어 체크</td> <td>O</td> <td>O</td> </tr>
                    </tbody>
                </table>
            </div>
            <div class="g_btn">
                <input type="button" value="영문 교정 신청하기" title="영문 교정 신청하기" class="prdView_btn04 eng_toggle" />
            </div>
        </div>


        
    </div>
</template>

<script>
import ax from '@/api/http';
import { use_opt, branch_opt, editor_opt } from './option.js'
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        FileUpload,
        'Validation': () =>     import('@/views/_common/Validation.vue'),
        'LoadingModal': () =>   import('@/views/_common/LoadingModal.vue'),
    },
    watch: {
        'frm.er_branch': function(){
            this.frm.er_editor = '';
        },
    },
    data() {
        return {
            frm:{
                er_type:'1',
                er_format: 'NFM',
                er_use:'',
                er_branch:'',
                er_editor:'',
                er_eng_style: 'AM',
                file_info_work:[],
                file_info_ref:[],
            },
            isLoadingModalViewed:false,
            use_opt:    use_opt,
            branch_opt: branch_opt,
            editor_opt: editor_opt,
        }
    },

    methods: {
        async store() {
     
                this.isLoadingModalViewed=true;
                const res = await ax.post(`/api/engReform/`, this.frm);
                if (res && res.status === 200) {                        
                    await this.$refs.fileupload1.fileProcessor(res.data.er_id);
                    await this.$refs.fileupload2.fileProcessor(res.data.er_id);
                    this.isLoadingModalViewed=false;
                    this.$router.push({ name: 'my_eng_reform_index' })
                }
  
        },
    },
}
</script>

<style lang="css" scoped>
.engReform .card .row { margin-bottom:1rem; }
.engReform .card .row .col small { color:#aaa; }
.engReform { clear:both;padding:0 0 0 0;/*text-align:center;*/ }
.engReform:after { content:"";display:block;clear:both; }
.engReform div.section { margin:0 0 30px 0; }
.engReform table { width:100%;border-collapse:collapse;border:1px solid #d5d5d5; }
.engReform table tr th { height:30px;background-color:#3a3a3a;color:#fff;border:1px solid #ececec; }
.engReform table tr th.h40 { height:40px; }
.engReform table tr th > p { text-align:center;font-weight:normal;color:#d5d5d5;font-size:11px;padding:0;margin:5px 0 0 0; }
.engReform table tr td { height:30px;border:1px solid #d5d5d5;padding:5px 20px;line-height:20px; }
.engReform table tr td.bg1 { background-color:#ececec; }
.engReform table tr td.bg2 { background-color:#f8f8f8; }
.engReform table tr td.bold { font-weight:bold; }
.engReform table tr td span { font-size:11px; }
.engReform p { padding:10px 0 0 0;text-align:left;line-height:20px; }
.engReform span.sub_title {
	display:block;
	width:100%;
	font-family:'Nanum Gothic Bold','맑은고딕',Helvetica,'Apple SD Gothic Neo';
	color:#1a1a1a;
	font-size:16px;
	text-align:left;
	padding:0 0 6px 0;
	border-bottom:1px solid #888888;
}
.engReform span.sub_title img { margin:-2px 5px 0 0; }
.engReform ul { margin:10px 0 0 0;padding:0;text-align:left; }
.engReform ul li { padding:0 0 0 10px;list-style:none;line-height:20px; }
.engReform ul li:before { content:'- '; }
.engReform .line { width:100%;border-bottom:1px dashed #d5d5d5;margin:0 0 30px 0; }
.engReform_quotationArea { clear:both;padding:0 0 0 0;text-align:center; }
.engReform_quotationArea:after { content:"";display:block;clear:both; }
#engR_q_cont { display:none; }
</style>
