<template>
<b-row class="form_box">
    <b-col class="default">
        <h4>01. 기본정보</h4>
        <b-container class="frm_vali_st">
            <b-row>
                <b-col class="label_st">이메일<b class="need" /></b-col>
                <b-col class="email">                        
                    <validation-provider name="이메일" rules="required|email" v-slot="validationContext">
                        <b-form-input type="email" id="email" v-model="value.email" :state="getValidationState(validationContext)" :readonly="$route.name == 'my_user_edit'" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.email" />
                </b-col>
                <b-col class="accept_contact">
                    <b-form-checkbox v-model="value.receive_mail" id="receive_mail" value="Y" unchecked-value="N" size="sm">
                        수신
                        <b v-if="value.receive_mail=='Y'">동의</b>
                        <b v-else>안함</b>
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">비밀번호<b class="need" /></b-col>
                <b-col>
                    <!-- vid <= 이건 오타가 아니라 비밀번호 확인시 유효성 검증을 위한 키워드이다 (  Validation ID) -->
                    <validation-provider vid="password" name="비밀번호" rules="required|min:6|pwCheck" v-slot="validationContext">
                        <b-form-input type="password" id="password" placeholder="6자 영문, 숫자" v-model="value.password" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.password" />
                </b-col>
                <b-col>
                    <validation-provider name="비밀번호 확인" rules="required|confirmed:password" v-slot="validationContext">
                        <b-form-input type="password" id="password_confirmation" placeholder="비밀번호 확인" v-model="value.password_confirmation" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.password_confirmation" />
                </b-col>
            </b-row>
            

            <b-row>
                <b-col class="label_st">이름<b class="need" /></b-col>
                <b-col>
                    <validation-provider name="이름" rules="required|min:2|korAlphaNum" v-slot="validationContext" >
                        <b-form-input id="name" v-model="value.name" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.name" />
                </b-col>
                <!-- <b-col>
                    <b-form-radio-group id="sex" v-model="value.sex" :options="sex" />
                    <Validation :error="$store.state.error.validations.sex" />
                </b-col>-->
            </b-row>
            <b-row>
                <b-col class="label_st">생년월일<b class="need" /></b-col>
                <b-col>
                    <validation-provider name="생년월일" rules="required" v-slot="validationContext">
                        <b-input-group>
                            <b-form-input id="birth" v-model="value.birth" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="format_date" :state="getValidationState(validationContext)" />
                            <b-input-group-append>
                                <b-form-datepicker v-model="value.birth" button-only right :value="'2019-01-01'"></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.birth" />
                </b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">직장/학교<b class="need" /></b-col>
                <b-col>                    
                    <validation-provider name="직장명/학교명" rules="required" v-slot="validationContext">
                        <b-form-input id="office" v-model="value.office" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.office" />
                </b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">휴대폰<b class="need" /></b-col>
                <b-col class="hp">
                    <validation-provider name="휴대폰 1" rules="required|length:3|numeric" v-slot="validationContext">
                        <b-form-input id="hp01" v-model="value.hp01" ref="hp01" @input.native="focusNext($event, 3, 'hp02')" :formatter="maxlength_3" :state="getValidationState(validationContext)"  />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <validation-provider name="휴대폰 2" rules="required|length:4|numeric" v-slot="validationContext">
                        <b-form-input id="hp02" v-model="value.hp02" ref="hp02" @input.native="focusNext($event, 4, 'hp03')" :formatter="maxlength_4" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <validation-provider name="휴대폰 3" rules="required|length:4|numeric" v-slot="validationContext">
                        <b-form-input id="hp03" v-model="value.hp03" ref="hp03" :formatter="maxlength_4" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </validation-provider>
                    <Validation :error="$store.state.error.validations.hp" />
                </b-col>
                <b-col class="accept_contact">
                    <b-form-checkbox v-model="value.receive_sms" id="receive_sms" value="Y" unchecked-value="N" size="sm">
                        수신
                        <b v-if="value.receive_sms=='Y'">동의</b>
                        <b v-else>안함</b>
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">전화</b-col><b-col><b-form-input v-model="value.tel" :formatter="format_tel" /></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">팩스</b-col><b-col><b-form-input v-model="value.fax" :formatter="format_tel" /></b-col>
            </b-row>

            <b-row v-if="this.$route.name == 'auth_create'">
                <b-col>
                    <b-row class="agree all_true">
                        <b-col>
                            <b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk">
                                아래의 내용 모두 동의합니다.
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="agree">
                        <b-col>
                            <b-form-checkbox v-model="value.check.inexus" value='Y' unchecked-value="N" @change="chkChange">(주)아이넥서스 이용약관 (필수)</b-form-checkbox>
                            <b-link @click="isModalViewed = !isModalViewed, modalMode = 'inexus'">자세히 보기</b-link>
                        </b-col>
                    </b-row>
                    <b-row class="agree">
                        <b-col>
                            <b-form-checkbox v-model="value.check.personal" value='Y' unchecked-value="N" @change="chkChange">개인정보 수집 및 이용 (필수)</b-form-checkbox>
                            <b-link @click="isModalViewed = !isModalViewed, modalMode = 'personal'">자세히 보기</b-link>
                        </b-col>
                    </b-row>
                    <b-row class="agree">
                        <b-col>
                            <b-form-checkbox v-model="value.check.marketing" value='Y' unchecked-value="N" @change="chkChange">(주)아이넥서스 마케팅 활용 (선택)</b-form-checkbox>
                            <b-link @click="isModalViewed = !isModalViewed, modalMode = 'marketing'">자세히 보기</b-link>
                        </b-col>
                    </b-row>
                    <b-row class="agree">
                        <b-col>
                            <b-form-checkbox v-model="value.check.receive_mail" value='Y' unchecked-value="N" @change="chkChange">메일 수신 동의 (선택)</b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="agree">
                        <b-col>
                            <b-form-checkbox v-model="value.check.receive_sms" value='Y' unchecked-value="N" @change="chkChange">문자 수신 동의 (선택)</b-form-checkbox>
                        </b-col>
                    </b-row>   
                </b-col>
            </b-row>
        </b-container>
    </b-col>
    <FormUser v-if="user_type_set == 'personal'" v-model="value" />  
    <FormDealer ref="form_dealer" v-else-if="user_type_set == 'dealer'" v-model="value" />        
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="700">
            <Inexus v-if="modalMode == 'inexus'" @close-modal="isModalViewed = false" />
            <Personal v-if="modalMode == 'personal'" @close-modal="isModalViewed = false" />
            <Marketing v-if="modalMode == 'marketing'" @close-modal="isModalViewed = false" />
        </Modal>
    </transition>
</b-row>
</template>

<script>
export default {
    components: {
        'Validation': () => import('@/views/_common/Validation'),
        'Modal'     : () => import('@/views/_common/Modal'),
        'FormUser'  : () => import('./FormUser'),
        'FormDealer': () => import('./FormDealer'),
        'Inexus'    : () => import('./Inexus'),
        'Personal'  : () => import('./Personal'),
        'Marketing' : () => import('./Marketing'),
    },
    props: ['value'],
    data() {
        return {
            user_type:this.$route.params.code??'',
            sex:[
                { value:"male",     text:"남성" },
                { value:"female",   text:"여성" },
            ],
            indeterminate:false,
            all_chk:false,
            isModalViewed: false,
        }
    },
    computed: {
        user_type_set() {
            if ( isEmpty(this.value.id) )
                return this.user_type;
            else {
                if ( this.value.is_dealer  ) return 'dealer';
                else return 'personal';
            }
        },
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        maxlength_3(e){ return String(e.replace(/[^0-9]/g, '')).substring(0, 3); },
        maxlength_4(e){ return String(e.replace(/[^0-9]/g, '')).substring(0, 4); },
        format_tel(e) { return this.formatTel(e); },
        format_date(e) { return this.formatDate(e); },

        chkChange () {
            let chkCnt = Object.values(this.value.check).filter(el => el=='Y').length;         
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.all_chk = false;
            } else if (chkCnt === Object.keys(this.value.check).length) {
                this.indeterminate = false;
                this.all_chk = true;
            } else {
                this.indeterminate = true;
                this.all_chk = false;
            }
        },
        toggle_all_chk(chk) {
            for(let k in this.value.check) this.value.check[k] = chk ? 'Y' : 'N';
            this.indeterminate = false;
        },
    },
    mounted() {
        // console.log(this.$route.name);
    },
}

</script>

<style>
.form_box>.col { border:3px solid #EBEBEB; border-radius:10px; padding:2rem; }
.form_box .default { margin-right:18px;}
.form_box .extra { margin-left:18px;}

.form_box .col .frm_vali_st .row { margin-bottom:1.1rem; }
.form_box .col .frm_vali_st .row .col.label_st { flex-basis:100px; max-width:100px; font-weight:bold; padding-top:6px; font-size:.9rem; } 
.form_box .col .frm_vali_st .row .col .need { display:inline-block; background:#FF0000; width:4px; height:4px; border-radius:2px; margin:0 0 9px 5px; }
.form_box .col .frm_vali_st .row .col small { font-size:60%; }
.form_box .col .frm_vali_st .row .col input,
.form_box .col .frm_vali_st .row .col select,
.form_box .col .frm_vali_st .row .col textarea { padding:2px 23px; font-size:.9rem; color:#898989; background-color:#F2F3F5; }
.form_box .col .frm_vali_st .row .col .btn { font-size:.9rem; }
.form_box .col .frm_vali_st .row .col textarea { padding:13px 23px; } 
.form_box .col .frm_vali_st .row .col input:not(.is-valid, .is-invalid),
.form_box .col .frm_vali_st .row .col select:not(.is-valid, .is-invalid),
.form_box .col .frm_vali_st .row .col textarea:not(.is-valid, .is-invalid) {  border-width:0; }
.form_box .col .frm_vali_st .row .col input:focus:not(.is-valid, .is-invalid),
.form_box .col .frm_vali_st .row .col select:focus:not(.is-valid, .is-invalid),
.form_box .col .frm_vali_st .row .col textarea:focus:not(.is-valid, .is-invalid) { background:#fff; border:1px solid #000 !important; box-shadow:unset; border-radius:0; }
.form_box .col .frm_vali_st .row .col .btn_white { background-color:#FFF; border-color:#CCCCCC; color:#000; }
.form_box .col .frm_vali_st .row .col.hp { display:flex; justify-content:space-between; flex-wrap:wrap; }
.form_box .col .frm_vali_st .row .col.hp span { position:relative; flex:0 0 30%; max-width:30%; }
.form_box .col .frm_vali_st .row .col.hp span:nth-child(1):after,
.form_box .col .frm_vali_st .row .col.hp span:nth-child(2):after { content:'-'; position:absolute; top:6px; right:-17px; font-weight:bold; font-size:20px; color:#898989; }
.form_box .col .frm_vali_st .row .col.accept_contact { flex-basis:100px; max-width:100px; letter-spacing:-2px; }
.form_box .col .frm_vali_st .agree { margin-bottom:.6rem; }
.form_box .col .frm_vali_st .agree .col .custom-checkbox { display:inline-block; margin-right:1rem; }
.form_box .col .frm_vali_st .agree .col a,
.form_box .col .frm_vali_st .agree .col >>> label { font-size:.9rem; color:#8A8A8A; }
.form_box .col .frm_vali_st .agree .col a { text-decoration:underline; font-size:.8rem; }
.form_box .col .frm_vali_st .all_true { margin-bottom:1.7rem; }
.form_box .col .frm_vali_st .all_true .col { border:3px solid #B3DFFA; text-align:center; padding:1rem; }
.form_box .col .frm_vali_st .all_true .col >>> label { font-size:1rem; }
.form_box .extra .frm_vali_st .row .col.label_st { flex-basis:150px; max-width:150px; } 
.form_box .extra .slt_item>>>fieldset legend { font-weight:bold; font-size:.9rem; padding:0; }
.form_box .extra .slt_item>>>span { font-size:.9rem; }


</style>