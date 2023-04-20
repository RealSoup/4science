<template>

<ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" class="tax_iv">
    <div v-if="value.oex_type_fir == 'TX'">
        <h6>세금계산서 발급 정보 등록</h6>
        <b-form-radio v-model="value.oex_type" value="IV">사업자 정보 입력</b-form-radio>
        
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type == 'IV'">
                <b-form-checkbox v-model="value.oex_hasBizLicense">사업자등록증 사본 첨부</b-form-checkbox>

                <transition name="slideUpDown">
                    <b-container v-if="value.oex_hasBizLicense">
                        <b-row>
                            <label for="biz_file">파일 첨부</label>
                            <ValidationProvider name="파일 첨부" rules="required" v-slot="validationContext">
                                <b-form-file id="biz_file" v-model="value.oex_file" ref="oex_file" size="sm" plain :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                    </b-container>
                </transition>

                <transition name="slideUpDown">
                    <b-container v-if="!value.oex_hasBizLicense">
                        <b-row>
                            <label for="oex_biz_name">법인명</label>
                            <ValidationProvider name="법인명" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_biz_name" ref="oex_biz_name" id="oex_biz_name" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_biz_num">등록번호</label>
                            <ValidationProvider name="등록번호" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_biz_num" ref="oex_biz_num" id="oex_biz_num" size="sm" :formatter="frm_formatBiz" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_biz_type">업태/종목</label>
                            <ValidationProvider name="업태" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_biz_type" ref="oex_biz_type" id="oex_biz_type" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                            <b>/</b>
                            <ValidationProvider name="종목" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_biz_item" ref="oex_biz_item" id="oex_biz_item" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_ceo">대표자명</label>
                            <ValidationProvider name="대표자명" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_ceo" ref="oex_ceo" id="oex_ceo" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_addr">사업장소재지</label>
                            <ValidationProvider name="사업장소재지" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_addr" ref="oex_addr" id="oex_addr" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_requirement">요구사항</label>
                            <ValidationProvider name="요구사항" rules="" v-slot="validationContext">
                                <b-form-textarea v-model="value.oex_requirement" ref="oex_requirement" id="oex_requirement" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                    </b-container>
                </transition>
                
                <transition name="slideUpDown">
                    <b-container v-if="value.oex_type !== 'IVNO'">
                        <b-row>
                            <label for="oex_mng">담당자</label>
                            <ValidationProvider name="담당자" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_mng" ref="oex_mng" id="oex_mng" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_email">이메일</label>
                            <ValidationProvider name="이메일" rules="required|email" v-slot="validationContext">
                                <b-form-input v-model="value.oex_email" ref="oex_email" id="oex_email" size="sm" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>
                        <b-row>
                            <label for="oex_num_tel">연락처</label>
                            <ValidationProvider name="연락처" rules="required" v-slot="validationContext">
                                <b-form-input v-model="value.oex_num_tel" ref="oex_num_tel" id="oex_num_tel" size="sm" :formatter="frm_formatHp" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </b-row>            
                    </b-container>
                </transition>
            </b-container>
        </transition>

        <b-form-radio v-model="value.oex_type" value="IVNO">입력 안함</b-form-radio>
        <br /><br />
    </div>
    
    <div v-else-if="value.oex_type_fir == 'CA'">
        <h6>소득공제용(일반개인용)</h6>

        <b-form-radio v-model="value.oex_type" value="HP">핸드폰번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'HP'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_hp1" ref="oex_num_hp1" size="sm" @input.native="focusNext($event, 3, 'oex_num_hp2')" :formatter="maxlength_3" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_hp2" ref="oex_num_hp2" size="sm" @input.native="focusNext($event, 4, 'oex_num_hp3')" :formatter="maxlength_4" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_hp3" ref="oex_num_hp3" size="sm" :formatter="maxlength_4" />
                </b-row>         
            </b-container>
        </transition>

        <b-form-radio v-model="value.oex_type" value="IN">주민등록번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'IN'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_in1" ref="oex_num_in1" size="sm" @input.native="focusNext($event, 6, 'oex_num_in2')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_in2" ref="oex_num_in2" size="sm" :formatter="maxlength_7" />
                </b-row>         
            </b-container>
        </transition>

        <b-form-radio v-model="value.oex_type" value="CN">카드번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'CN'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_cn1" ref="oex_num_cn1" size="sm" @input.native="focusNext($event, 4, 'oex_num_cn2')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_cn2" ref="oex_num_cn2" size="sm" @input.native="focusNext($event, 4, 'oex_num_cn3')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_cn3" ref="oex_num_cn3" size="sm" @input.native="focusNext($event, 4, 'oex_num_cn4')" :formatter="maxlength_6" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_cn4" ref="oex_num_cn4" size="sm" :formatter="maxlength_4" />
                </b-row>         
            </b-container>
        </transition>
    

        <h6>지출증빙용(사업자용)</h6>

        <b-form-radio v-model="value.oex_type" value="BN">사업자등록번호</b-form-radio>
        <transition name="slideUpDown">
            <b-container v-if="value.oex_type === 'BN'">
                <b-row>
                    <b-form-input type="number" v-model="value.oex_num_bn1" ref="oex_num_bn1" size="sm" @input.native="focusNext($event, 3, 'oex_num_bn2')" :formatter="maxlength_3" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_bn2" ref="oex_num_bn2" size="sm" @input.native="focusNext($event, 2, 'oex_num_bn3')" :formatter="maxlength_2" /><b-icon-dash />
                    <b-form-input type="number" v-model="value.oex_num_bn3" ref="oex_num_bn3" size="sm" @input.native="focusNext($event, 5, 'oex_biz_name')" :formatter="maxlength_5" />
                </b-row>        
                <b-row>
                    <b-form-input v-model="value.oex_biz_name" ref="oex_biz_name" id="oex_biz_name" size="sm" placeholder="업체명 입력" />
                </b-row>   
            </b-container>
        </transition>
    </div>
    <b-button size="lg" @click="close">확 인</b-button>
</ValidationObserver>
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
                    if (isEmpty(this.value.oex_num_hp1)) { Notify.toast('danger', "핸드폰 번호 첫번째를 입력해주세요"); this.$refs.oex_num_hp1.focus(); return false; }
                    if (isEmpty(this.value.oex_num_hp2)) { Notify.toast('danger', "핸드폰 번호 두번째를 입력해주세요"); this.$refs.oex_num_hp2.focus(); return false; }
                    if (isEmpty(this.value.oex_num_hp3)) { Notify.toast('danger', "핸드폰 번호 세번째를 입력해주세요"); this.$refs.oex_num_hp3.focus(); return false; }
                } else if ( this.value.oex_type === 'IN') {
                    if (isEmpty(this.value.oex_num_in1)) { Notify.toast('danger', "주민번호 첫번째를 입력해주세요"); this.$refs.oex_num_in1.focus(); return false; }
                    if (isEmpty(this.value.oex_num_in2)) { Notify.toast('danger', "주민번호 두번째를 입력해주세요"); this.$refs.oex_num_in2.focus(); return false; }
                } else if ( this.value.oex_type === 'CN') {
                    if (isEmpty(this.value.oex_num_cn1)) { Notify.toast('danger', "카드번호 첫번째를 입력해주세요"); this.$refs.oex_num_cn1.focus(); return false; }
                    if (isEmpty(this.value.oex_num_cn2)) { Notify.toast('danger', "카드번호 두번째를 입력해주세요"); this.$refs.oex_num_cn2.focus(); return false; }
                    if (isEmpty(this.value.oex_num_cn3)) { Notify.toast('danger', "카드번호 세번째를 입력해주세요"); this.$refs.oex_num_cn3.focus(); return false; }
                    if (isEmpty(this.value.oex_num_cn4)) { Notify.toast('danger', "카드번호 네번째를 입력해주세요"); this.$refs.oex_num_cn4.focus(); return false; }
                } else if ( this.value.oex_type === 'BN') {
                    if (isEmpty(this.value.oex_num_bn1)) { Notify.toast('danger', "사업자 번호 첫번째를 입력해주세요"); this.$refs.oex_num_bn1.focus(); return false; }
                    if (isEmpty(this.value.oex_num_bn2)) { Notify.toast('danger', "사업자 번호 두번째를 입력해주세요"); this.$refs.oex_num_bn2.focus(); return false; }
                    if (isEmpty(this.value.oex_num_bn3)) { Notify.toast('danger', "사업자 번호 세번째를 입력해주세요"); this.$refs.oex_num_bn3.focus(); return false; }
                    if (isEmpty(this.value.oex_biz_name)) { Notify.toast('danger', "업체면을 입력해주세요"); this.$refs.oex_biz_name.focus(); return false; }
                }
                this.$emit('close'); 
            }
        },
        getValidationState({ dirty, validated, valid = null }) { return dirty || validated ? valid : null; },
        
        maxlength_2(e){ return String(e).substring(0, 2); },
        maxlength_3(e){ return String(e).substring(0, 3); },
        maxlength_4(e){ return String(e).substring(0, 4); },
        maxlength_5(e){ return String(e).substring(0, 5); },
        maxlength_6(e){ return String(e).substring(0, 6); },
        maxlength_7(e){ return String(e).substring(0, 7); },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        frm_formatHp(v)   { return this.formatHp(v); },
        frm_formatBiz(v)   { return this.formatBiz(v); },
    }
}
</script>

<style lang="css" scoped>
.tax_iv h6 { margin:1rem; padding:.5rem; border-bottom:1px solid #DEDEDE; font-weight:bold; font-size:.9rem; }
.tax_iv .custom-control { margin:2rem 0 1rem 4rem; }
.tax_iv .b-form-file { margin-left:3rem; }
.tax_iv .container { padding:0 3rem; }
.tax_iv .container .row { margin:1rem 0; align-items:center; }
.tax_iv .container .row input,
.tax_iv .container .row textarea { flex-basis: 0; flex-grow: 1; max-width: 100%; }
.tax_iv .container .row label { flex:0 0 30%; max-width:30%; font-weight:bold; font-size:.8rem; }
.tax_iv .container .row span { flex-basis: 0; flex-grow: 1; max-width: 100%; }
.tax_iv .container .row b { margin:0 .5rem; }
.tax_iv>button { background-color:#0E4D9C; color:#FFF; letter-spacing:1rem; width:100%; border-width:0; border-radius:0; }

.slideUpDown-enter-to,
.slideUpDown-leave { max-height:400px; }
.slideUpDown-enter-active  { transition:max-height 0.9s; }
.slideUpDown-enter,
.slideUpDown-leave-to { max-height:0; }
</style>