<template>

<validation-observer ref="observer" v-slot="{ invalid }" tag="form" class="tax_iv">
    <div v-if="value.oex_type_fir == 'TX'" class="wrap01">
        <h6>세금계산서 발급 정보 등록</h6>
        <b-form-radio v-model="value.oex_type" value="IV">사업자 정보 입력</b-form-radio>
        
        <transition name="slideUpDown">
            <div v-if="value.oex_type == 'IV'" class="iv_wrap">
                <b-row>
                    <b-col>등록증 유무</b-col>
                    <b-col class="chk_file pl-3" style="font-size:.85em;"><b-form-checkbox v-model="value.oex_hasBizLicense">사업자등록증 사본 첨부</b-form-checkbox></b-col>
                </b-row>

                <transition name="slideUpDown">
                    <b-row v-if="value.oex_hasBizLicense">
                        <b-col>파일 첨부</b-col>
                        <validation-provider name="파일 첨부" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-file id="biz_file" v-model="value.oex_file" ref="oex_file" size="sm" plain :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    </b-row>
                </transition>

                <transition name="slideUpDown">
                    <b-row v-if="!value.oex_hasBizLicense">
                        <b-col>법인명</b-col>
                        <validation-provider name="법인명" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_biz_name" ref="oex_biz_name" id="oex_biz_name" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
            
                        <b-col>등록번호</b-col>
                        <validation-provider name="등록번호" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_biz_num" ref="oex_biz_num" id="oex_biz_num" size="sm" :formatter="frm_formatBiz" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                
                        <b-col>업태</b-col>
                        <validation-provider name="업태" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_biz_type" ref="oex_biz_type" id="oex_biz_type" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>

                        <b-col>종목</b-col>
                        <validation-provider name="종목" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_biz_item" ref="oex_biz_item" id="oex_biz_item" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
            
                        <b-col>대표자명</b-col>
                        <validation-provider name="대표자명" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_ceo" ref="oex_ceo" id="oex_ceo" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    
                        <b-col>사업장소재지</b-col>
                        <validation-provider name="사업장소재지" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_addr" ref="oex_addr" id="oex_addr" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
            
                        <b-col>요구사항</b-col>
                        <validation-provider name="요구사항" rules="" v-slot="validationContext" tag="div" class="col">
                            <b-form-textarea v-model="value.oex_requirement" ref="oex_requirement" id="oex_requirement" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    </b-row>
                </transition>
                
                <transition name="slideUpDown">
                    <b-row v-if="value.oex_type !== 'IVNO'">
                        <b-col>담당자</b-col>
                        <validation-provider name="담당자" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_mng" ref="oex_mng" id="oex_mng" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    
                        <b-col>이메일</b-col>
                        <validation-provider name="이메일" rules="required|email" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_email" ref="oex_email" id="oex_email" size="sm" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>
                    
                        <b-col>연락처</b-col>
                        <validation-provider name="연락처" rules="required" v-slot="validationContext" tag="div" class="col">
                            <b-form-input v-model="value.oex_num_tel" ref="oex_num_tel" id="oex_num_tel" size="sm" :formatter="format_hp" :state="getValidationState(validationContext)" />
                            <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </validation-provider>          
                    </b-row>
                </transition>
            </div>
        </transition>

        <b-form-radio v-model="value.oex_type" value="IVNO">입력 안함</b-form-radio>
        <br /><br />
    </div>
    
    <div v-else-if="value.oex_type_fir == 'CA'" class="wrap02">
        <h6>소득공제용(일반개인용)</h6>

        <b-row>
            <b-col><b-form-radio v-model="value.oex_type" value="HP">핸드폰번호</b-form-radio></b-col>
            <transition name="slideUpDown">
                <b-col v-if="value.oex_type === 'HP'"><b-form-input v-model="value.oex_num_hp" ref="oex_num_hp" size="sm" :formatter="format_hp" /></b-col>
            </transition>
        </b-row>
        <b-row>
            <b-col><b-form-radio v-model="value.oex_type" value="IN">주민등록번호</b-form-radio></b-col>
            <transition name="slideUpDown">
                <b-col v-if="value.oex_type === 'IN'"><b-form-input v-model="value.oex_num_in" ref="oex_num_in" size="sm" :formatter="format_idnum" /></b-col>
            </transition>
        </b-row>
        <b-row>
            <b-col><b-form-radio v-model="value.oex_type" value="CN">카드번호</b-form-radio></b-col>
            <transition name="slideUpDown">
                <b-col v-if="value.oex_type === 'CN'"><b-form-input v-model="value.oex_num_cn" ref="oex_num_cn" size="sm" :formatter="format_cardnum" /></b-col>
            </transition>
        </b-row>
    

        <h6>지출증빙용(사업자용)</h6>
        <b-form-radio v-model="value.oex_type" value="BN">사업자등록번호</b-form-radio>
        <transition name="slideUpDown">
            <b-row v-if="value.oex_type === 'BN'">
                <b-col cols="12" class="mb-1"><b-form-input v-model="value.oex_num_bn" ref="oex_num_bn" size="sm" placeholder="사업자 등록 번호" /></b-col>        
                <b-col cols="12"><b-form-input v-model="value.oex_biz_name" ref="oex_biz_name" size="sm" placeholder="업체명 입력" /></b-col>
            </b-row>
        </transition>
    </div>
    <b-button size="lg" @click="close">확 인</b-button>
</validation-observer>
</template>

<script>
export default {
    name: 'TaxInvoice',
    props:['value'],

    methods: {
        async close () {
            const isValid = await this.$refs.observer.validate();
            if (isValid) {
                if ( this.value.oex_type === 'IV') {
                    if ( this.value.oex_hasBizLicense ) {
                        if (isEmpty(this.value.oex_file)) { Notify.toast('danger', "사업자 등록증 사본을 첨부해주세요"); this.$refs.oex_file.$refs.input.focus(); return false; }
                    } else {
                        if (isEmpty(this.value.oex_biz_name)) { Notify.toast('danger', "법인명을 입력해주세요");        this.$refs.oex_biz_name.focus(); return false; }
                        if (isEmpty(this.value.oex_biz_num)) { Notify.toast('danger', "사업자 등록번호를 입력해주세요"); this.$refs.oex_biz_num.focus(); return false; }
                        if (isEmpty(this.value.oex_biz_type)) { Notify.toast('danger', "업태를 입력해주세요");          this.$refs.oex_biz_type.focus(); return false; }
                        if (isEmpty(this.value.oex_biz_item)) { Notify.toast('danger', "종목를 입력해주세요");          this.$refs.oex_biz_item.focus(); return false; }
                        if (isEmpty(this.value.oex_ceo)) { Notify.toast('danger', "대표자명을 입력해주세요");           this.$refs.oex_ceo.focus(); return false; }
                        if (isEmpty(this.value.oex_addr)) { Notify.toast('danger', "사업장 소재지를 입력해주세요");     this.$refs.oex_addr.focus(); return false; }
                    }
                    if (isEmpty(this.value.oex_mng)) { Notify.toast('danger', "담당자를 입력해주세요");                 this.$refs.oex_mng.focus(); return false; }
                    if (isEmpty(this.value.oex_email)) { Notify.toast('danger', "이메일을 입력해주세요");               this.$refs.oex_email.focus(); return false; }
                    if (isEmpty(this.value.oex_num_tel)) { Notify.toast('danger', "핸드폰 번호를 입력해주세요");        this.$refs.oex_num_tel.focus(); return false; }
                } else if ( this.value.oex_type === 'HP') {
                    if (isEmpty(this.value.oex_num_hp)) { Notify.toast('danger', "핸드폰 번호를 입력해주세요"); this.$refs.oex_num_hp.focus(); return false; }
                } else if ( this.value.oex_type === 'IN') {
                    if (isEmpty(this.value.oex_num_in)) { Notify.toast('danger', "주민번호를 입력해주세요"); this.$refs.oex_num_in.focus(); return false; }
                } else if ( this.value.oex_type === 'CN') {
                    if (isEmpty(this.value.oex_num_cn)) { Notify.toast('danger', "카드번호를 입력해주세요"); this.$refs.oex_num_cn.focus(); return false; }
                } else if ( this.value.oex_type === 'BN') {
                    if (isEmpty(this.value.oex_num_bn)) { Notify.toast('danger', "사업자 번호를 입력해주세요"); this.$refs.oex_num_bn.focus(); return false; }
                    if (isEmpty(this.value.oex_biz_name)) { Notify.toast('danger', "업체면을 입력해주세요"); this.$refs.oex_biz_name.focus(); return false; }
                }
                this.$emit('close'); 
            }
        },
        getValidationState({ dirty, validated, valid = null }) { return dirty || validated ? valid : null; },
        
    
        format_hp(e) { return this.formatHp(e); },
        format_idnum(e) { return this.formatIdNum(e); },
        format_cardnum(e) { return this.formatCardNum(e); },
        frm_formatBiz(v)   { return this.formatBiz(v); },


    },
}
</script>

<style lang="css" scoped>
.tax_iv h6 { margin-top:1rem; padding-bottom:.5rem; border-bottom:1px solid #DEDEDE; font-weight:bold; font-size:.9rem; }
.tax_iv>div { margin:1rem; }

.tax_iv .wrap01 .iv_wrap { padding:20px 10px; }
.tax_iv .wrap01 .iv_wrap .row .col { padding:5px 0; }
.tax_iv .wrap01 .iv_wrap .row .col:nth-child(odd) { flex:0 0 25%; max-width:25%; font-size:.9em; font-weight:bolder; line-height:30px; }
.tax_iv .wrap01 .iv_wrap .row .col:nth-child(even) { flex:0 0 75%; max-width:75%; }
.tax_iv .wrap01 .iv_wrap .row .col.chk_file { padding-left:1em; font-size:.85em; line-height:30px; }
.tax_iv .wrap01 .iv_wrap .row .col.chk_file .custom-control >>> .custom-control-label::after,
.tax_iv .wrap01 .iv_wrap .row .col.chk_file .custom-control >>> .custom-control-label::before { top:.5em !important; }

.tax_iv .wrap02 .row .col:first-child { flex:0 0 25%; max-width:25%; display:flex; align-items:center; font-size:.9em; min-width:95px; min-height:31px; line-height:22px; letter-spacing:-1px; }
.tax_iv>button { background-color:#0E4D9C; color:#FFF; letter-spacing:1rem; width:100%; border-width:0; border-radius:0; }


.slideUpDown-enter-to,
.slideUpDown-leave { max-height:400px; }
.slideUpDown-enter-active  { transition:max-height 0.9s; }
.slideUpDown-enter,
.slideUpDown-leave-to { max-height:0; }

.custom-control { padding-left:1.3em; min-height:1.3rem; }
.custom-control >>> .custom-control-label::after,
.custom-control >>> .custom-control-label::before { left:-1.3em !important; top:.15em !important; }
@media (max-width: 992px){
    
}
</style>