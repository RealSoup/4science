<template>
<div class="p_wrap">
    <h3>회원 정보 수정</h3>
    <b-container class="act_ctrl">
        <b-row>
            <b-col>
                <div class="type_icon"><b-icon-tags-fill />{{ frm.id }}</div>
                <div class="type_icon"><b-icon-calendar2-date-fill />{{ frm.created_at }}</div>
                <div class="type_icon">
                    <template v-if="isEmpty(frm.email_verified_at)">
                        <b-badge class="xm plum">미인증</b-badge>
                        <b-button @click="exeVerify" class="xm teal">본인인증 처리하기</b-button>
                    </template>
                    <b-badge v-else class="xm green">인증완료</b-badge>
                </div>
                <div class="type_icon">
                    <b-button :to="{name: 'adm_user_edit', params: { id:frm.introducer.id }}" v-if="frm.introducer" class="xm sky">소개자 - {{frm.introducer.name}}</b-button>
                </div>
                
            </b-col>
            <b-col class="text-right">
                <b-button-group size="sm">
                    <b-button variant="light" :to="{name: 'adm_user'}"><b-icon-list-ol />목록</b-button>
                    <b-button variant="primary" @click="update"><b-icon-pencil-square />수정 완료</b-button>
                    <b-button variant="info" @click="isModalViewed = !isModalViewed, modalMode = 'mileage'">마일리지</b-button>
                    <b-button variant="dark" @click="isModalViewed = !isModalViewed, modalMode = 'addr'">배송지</b-button>
                </b-button-group>
            </b-col>
        </b-row>
    </b-container>

    <b-container class="box">
        <h5>
            회원정보 <b-button @click="login" class="sky xm ml-3" v-if="user.is_super"><b-icon-power /></b-button> 
        </h5>
        <b-row class="label_form quarter">
            <b-col>
                <label>회원유형</label>
                <div>
                    <b-form-select v-model="frm.group" id="group" size="sm">
                        <b-form-select-option v-for="(v, i) in frm.option.group" :value="i" :key="i">{{v}}</b-form-select-option>
                    </b-form-select>
                </div>
            </b-col>
            <b-col>
                <label>회원등급</label>
                <div>
                    <b-form-select v-model="frm.level" id="level" size="sm">
                        <b-form-select-option value="0"></b-form-select-option>
                        <b-form-select-option v-for="(level, k) in frm.option.level" :key="k" :value="k">{{level}}</b-form-select-option>
                    </b-form-select>
                </div>
            </b-col>
            <b-col>
                <label>담당자</label>
                <div>
                    <b-form-select v-model="frm.mng" id="mng" size="sm">
                        <b-form-select-option value="0"></b-form-select-option>
                        <b-form-select-option v-for="(v, k) in frm.mng_list" :key="k" :value="v.id">{{v.name}}</b-form-select-option>
                    </b-form-select>
                </div>
            </b-col>
            <b-col>
                <label>수신동의</label>
                <div class="checkbox01">
                    <b-form-checkbox v-model="frm.receive_mail" id="receive_mail" value="Y" unchecked-value="N" size="sm" class="mr-3">
                        이메일
                        <b v-if="frm.receive_mail=='Y'">동의</b>
                        <b v-else>거절</b>
                    </b-form-checkbox>
                    <b-form-checkbox v-model="frm.receive_sms" id="receive_sms" value="Y" unchecked-value="N" size="sm">
                        문자
                        <b v-if="frm.receive_sms=='Y'">동의</b>
                        <b v-else>거절</b>
                    </b-form-checkbox>
                </div>
            </b-col>
      
            <b-col>
                <label>이름</label>
                <div><b-form-input v-model="frm.name" size="sm" /></div>
            </b-col>
            <b-col>
                <label>이메일</label>
                <div><b-form-input v-model="frm.email" size="sm" /></div>
            </b-col>
            <b-col>
                <label>생년월일</label>
                <b-input-group size="sm">
                    <b-form-input v-model="frm.birth" id="birth" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="frm_formatDate" required></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker v-model="frm.birth" size="sm" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col></b-col>
            <b-col>
                <label>휴대폰</label>
                <div><b-form-input v-model="frm.hp" :formatter="frm_formatHp" size="sm" /></div>
            </b-col>

            <b-col>
                <label>일반전화</label>
                <div><b-form-input v-model="frm.tel" size="sm" /></div>
            </b-col>
            <b-col>
                <label>팩스</label>
                <div><b-form-input v-model="frm.fax" size="sm" /></div>
            </b-col>
            <b-col></b-col>
        
            <template v-if="user.is_super">
                <b-col>
                    <label>비밀번호</label>
                    <div>
                        <!-- vid <= 이건 오타가 아니라 비밀번호 확인시 유효성 검증을 위한 키워드이다 (  Validation ID) -->
                        <validation-provider vid="password" name="비밀번호" rules="required|min:6|pwCheck" v-slot="validationContext">
                            <b-form-input type="password" id="password" placeholder="6자 영문, 숫자" v-model="frm.password" :state="getValidationState(validationContext)" size="sm" autocomplete="new-password" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    </div>
                </b-col>

                <b-col>
                    <label>비밀번호 확인</label>
                    <div>
                        <validation-provider name="비밀번호 확인" rules="required|confirmed:password" v-slot="validationContext">
                            <b-form-input type="password" id="password_confirmation" placeholder="비밀번호 확인" v-model="frm.password_confirmation" :state="getValidationState(validationContext)" size="sm" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    </div>
                </b-col>
            </template>

            <b-col class="w_50">
                <label>비번 재설정 링크</label>
                <div>
                    비밀번호 재설정시 메일 안오는 회원 링크 복사해 직접 메일보내자<b class="point"><br />* 유저 재설정시 로그아웃 필수</b>
                    <b-button @click="copy_link" class="xm teal ml-3">링크 복사</b-button>
                </div>
            </b-col>


        </b-row>

        <b-row><b-col><hr /></b-col></b-row>

        <b-row class="label_form quarter">
            <b-col>
                <label>직업</label>
                <div>
                    <b-form-select v-model="frm.job" size="sm">
                        <b-form-select-option v-for="(v, k) in frm.option.job" :key="k" :value="v">{{v}}</b-form-select-option>
                    </b-form-select>
                </div>
            </b-col>
            <b-col>
                <label>직장/학교명</label>
                    <div><b-form-input v-model="frm.company" size="sm" /></div>
                </b-col>
            <b-col>
                <label>부서/학과/연구실명</label>
                    <div><b-form-input v-model="frm.part" size="sm" /></div>
                </b-col>
            <b-col>
                <label>직급/학년</label>
                    <div><b-form-input v-model="frm.grade" size="sm" /></div>
                </b-col>
            <b-col>
                <label>지도/담당교수</label>
                <div><b-form-input v-model="frm.tutor" size="sm" /></div>
            </b-col>
            <b-col>
                <label>추천인 Email</label>
                <div><b-form-input v-model="frm.offer" size="sm" /></div>
            </b-col>
            <b-col>
                <label>추천인연구실</label>
                <div><b-form-input v-model="frm.offer_lab" size="sm" /></div>
            </b-col>
            <b-col>
                <label>가입경로</label>
                <div><b-form-input v-model="frm.join_route" size="sm" /></div>
            </b-col>
            <b-col>
                <label>관심분야</label>
                <div>
                    {{frm.interest}}
                    <template v-if="frm.interest_etc">, {{frm.interest_etc}}</template>
                </div>
            </b-col>
        </b-row>
    </b-container>
    
    <b-container class="box frm01 n3" v-if="[11, 12].indexOf(Number(frm.level)) !== -1">
        <h5>딜러 정보</h5>
        <b-row>
            <b-col>상호명</b-col><b-col><b-form-input v-model="frm.user_biz.ub_corp_name" /></b-col>
            <b-col>대표자명</b-col><b-col><b-form-input v-model="frm.user_biz.ub_name" /></b-col>
            <b-col>사업자번호</b-col><b-col><b-form-input v-model="frm.user_biz.ub_num" :formatter="frm_formatBiz" /></b-col>
        </b-row>
        <b-row>
            <b-col>업종</b-col><b-col><b-form-input v-model="frm.user_biz.ub_type" /></b-col>
            <b-col>업태</b-col><b-col><b-form-input v-model="frm.user_biz.ub_cond" /></b-col>
            <b-col>대표전화</b-col><b-col><b-form-input v-model="frm.user_biz.ub_tel" :formatter="frm_formatTel" /></b-col>
        </b-row>
        <b-row>
            <b-col>파일다운</b-col>
            <b-col>
                <b-button v-for="(file, i) in frm.user_biz.file_info" class="white sm mr-2" @click="fileDown(file.down_path, file.fi_original)" :key="i">
                    {{file.fi_original}}
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>파일수정</b-col>
            <b-col>
                <file-upload ref="fileupload" v-model="frm.user_biz.file_info" :fi_group="'userBiz'" :fi_kind="'license'" :height="100" />
                <transition name="fade">
                    <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false">첨부파일 전송중 ..... </loading-modal>
                </transition>
            </b-col>
        </b-row>
    </b-container>

    <b-container v-if="frm.is_admin" class="box adform">
        <h5>관리자 정보</h5>
        <b-row>
            <b-col>
                <b-form-checkbox switch size="lg" v-model="frm.user_mng.um_status" value="Y" unchecked-value="N">
                    <b v-if="frm.user_mng.um_status=='N'">비</b>활성
                </b-form-checkbox>
            </b-col>

            <b-col class="label">직위</b-col>
            <b-col class="type02">
                <b-form-select v-model="frm.user_mng.um_position" id="um_position">
                    <b-form-select-option v-for="(p, k) in frm.mng_info.position" :key="k" :value="k">{{p}}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">소속팀</b-col>
            <b-col class="type02">
                <b-form-select v-model="frm.user_mng.um_group" id="um_group">
                    <b-form-select-option v-for="(g, k) in frm.mng_info.group" :key="k" :value="k">{{g}}</b-form-select-option>
                </b-form-select>
            </b-col>

            <b-col class="label">직책</b-col>
            <b-col class="type02">
                <b-form-select v-model="frm.user_mng.um_responsibility" id="um_responsibility">
                    <b-form-select-option :value="null">◖없음◗</b-form-select-option>
                    <b-form-select-option v-for="(p, k) in frm.mng_info.responsibility" :key="k" :value="k">{{p}}</b-form-select-option>
                </b-form-select>
            </b-col>
        </b-row>
    </b-container>
    
    <b-container class="box">
        <h5>최근 주문 내역</h5>
        <order :list="order" :config="order_config" :mng_off="mng_off" class="cmain"></order>
    </b-container>

    <b-container class="box">
        <h5>최근 견적 내역</h5>
        <estimate :list="estimate" :mng_off="mng_off" @exe-win-pop="exeWinPop" class="cmain"></estimate>
    </b-container>
    

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="900">
            <template v-if="modalMode=='mileage'">
                <template slot="header">마일리지 목록</template>
                <mileage></mileage>
            </template>
            <template v-else-if="modalMode=='addr'">
                <template slot="header">배송지 관리</template>
                <addr></addr>
            </template>            
        </modal>
    </transition>
</div>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload';
import Addr from '@/views/admin/user/_comp/Addr';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    name: 'AdmUserEdit',
    components: {
        'file-upload'   : FileUpload,
        'addr'          : Addr,
        'modal': () => import('@/views/_common/Modal'),
        'mileage': () => import('./_comp/Mileage'),
        'order': () => import('@/views/admin/shop/order/_comp/List'),
        'estimate': () => import('@/views/admin/shop/estimate/_comp/List'),
        'loading-modal': () => import('@/views/_common/LoadingModal.vue'),
    },

    data() {
        return {
            isLoadingModalViewed: false,
            id:this.$route.params.id,
            isModalViewed: false,
            modalMode:'',
            frm: {
                option: [],
                user_mng: {},
            },
            order: [],
            order_config: {},
            mng_off:[],
            
            estimate: [],
        };
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },

    methods: {
        async edit() {
            const user = await ax.get(`/api/admin/user/${this.id}/edit`);
            if (user)
                if(user.status === 200)
                    this.frm = user.data;
                else if (user.status === 204) {
                    Notify.modal("정보가 없습니다.", 'danger');
                    // this.$router.go(-1);
                    return false;
                }

            const od = await ax.get(`/api/admin/shop/order`, { params: {writer:this.id, limit:10}});
            if (od && od.status === 200) {
                this.order = od.data.list;
                this.order_config = od.data.order_config;
                this.mng_off = od.data.mng_off;
            }
            
            const eq = await ax.get(`/api/admin/shop/estimate`, { params: {writer:this.id, limit:10}});
            if (eq && eq.status === 200) 
                this.estimate = eq.data.list;
        },

        async update() {
            if (!isEmpty(this.frm.password_confirmation) && this.frm.password !== this.frm.password_confirmation) { 
                Notify.toast('danger', "비밀번호 확인이 다릅니다."); 
                return false; 
            }

            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            const res = await ax.post(`/api/admin/user/${this.id}`, this.frm);
            if (res && res.status === 200) {
                if ( [11, 12].indexOf(this.frm.level) !== -1 ) {
                    this.isLoadingModalViewed=true;
                    await this.$refs.fileupload.fileProcessor(res.data.ub_id);
                    this.isLoadingModalViewed=false;
                }
                Notify.toast('success', '수정 완료');
                this.edit();
            }

        },

        exeWinPop(url){
            this.openWinPop( url, 1700, 900 );
        }, 

        frm_formatHp(v)   { return this.formatHp(v); },
        frm_formatBiz(v) { return this.formatBiz(v); },
        frm_formatDate(v) { return this.formatDate(v); },
        frm_formatTel(v) { return this.formatTel(v); },

        
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        async login() {
            let r = await ax.get(`/api/admin/user/origin/${this.id}`);
            if (r && r.status === 200)
                this.$router.push({ name: 'mypage', query: {msg:'force'} });
        },

        async exeVerify () {
            var rst = await Notify.confirm('강제로 본인인증처리를', 'danger');
            if (rst) {
                const res = await ax.post(`/api/admin/user/exeEmailVerify/${this.id}`, this.frm);
                if (res && res.status === 200) {
                    this.frm.email_verified_at = new Date().format("yyyy-MM-dd");
                    Notify.toast('success', '인증 완료');
                }
            }
        },

        async copy_link () {
            const res = await ax.get(`/api/admin/user/passwordResetLink/${this.id}`);
            if (res && res.status === 200) {
                this.copyToClipboard(res.data);
            }
        }
    },

    async mounted() { this.edit(); },

    beforeRouteUpdate (to, from, next) {
        // console.log(to, from);
        this.id = to.params.id;
        this.edit();
        next();
    },
}
</script>

<style lang="css" scoped>
.p_wrap { max-width:1500px; margin-left:auto; margin-right:auto; }
.act_ctrl .row { align-items:center; }
.act_ctrl .row .col .type_icon { display:inline-block; margin-right:25px; }
.act_ctrl .row .col .type_icon svg { margin-right:10px; }

.container .row .checkbox01 >>> .custom-checkbox label { font-size:12px !important; }
.container .row .checkbox01 >>> .custom-checkbox label b { font-weight:900; }
.container .row .checkbox01,
.container .row .checkbox01 >>> .custom-checkbox { display:flex; align-items:center; }
.container .row .checkbox01 >>> .custom-checkbox .custom-control-label::before,
.container .row .checkbox01 >>> .custom-checkbox .custom-control-label::after { position:absolute; top:50%; transform:translateY(-50%); }
@media (max-width: 991px){
    .act_ctrl .row .col { flex: 0 0 100%; max-width: 100%; }
}
</style>
