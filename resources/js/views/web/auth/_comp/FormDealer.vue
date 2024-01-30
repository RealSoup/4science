<template>
<b-col class="extra">
    <h4>02. 사업자등록정보</h4>
    <b-container class="frm_vali_st">
        <b-row>
            <b-col class="label_st">사업자 등록번호<b class="need" /></b-col>
            <b-col class="ub_num">
                <validation-provider name="사업자 번호1" rules="required|length:3|numeric" v-slot="validationContext">
                    <b-form-input id="ub_num01" v-model="value.ub_num01" ref="ub_num01" @input.native="focusNext($event, 3, 'ub_num02')" :formatter="maxlength_3" :state="getValidationState(validationContext)"  />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <validation-provider name="사업자 번호2" rules="required|length:2|numeric" v-slot="validationContext">
                    <b-form-input id="ub_num02" v-model="value.ub_num02" ref="ub_num02" @input.native="focusNext($event, 2, 'ub_num03')" :formatter="maxlength_2" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <validation-provider name="사업자 번호3" rules="required|length:5|numeric" v-slot="validationContext">
                    <b-form-input id="ub_num03" v-model="value.ub_num03" ref="ub_num03" :formatter="maxlength_5" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_num" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label_st">상호명/대표자명<b class="need" /></b-col>
            <b-col class="col_l">
                <validation-provider name="상호" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_corp_name" v-model="value.ub_corp_name" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_corp_name" />
            </b-col>
            <b-col class="col_r">
                <validation-provider name="대표자명" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_name" v-model="value.ub_name" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_name" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label_st">대표 전화번호<b class="need" /></b-col>
            <b-col>
                <validation-provider name="대표 전화번호" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_tel" v-model="value.ub_tel" :state="getValidationState(validationContext)" required :formatter="format_tel" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_tel" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label_st">업종/업태<b class="need" /></b-col>
            <b-col class="col_l">
                <validation-provider name="업종" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_type" v-model="value.ub_type" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_type" />
            </b-col>
            <b-col class="col_r">
                <validation-provider name="업태" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_cond" v-model="value.ub_cond" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_cond" />
            </b-col>
        </b-row>
        <b-row class="zip_row">
            <b-col class="label_st">사업장주소<b class="need" /></b-col>
            <b-col>
                <validation-provider name="우편번호" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_zip" v-model="value.ub_zip" ref="ub_zip" readonly :state="getValidationState(validationContext)" />
                    <b-button class="btn_white" @click="postcode_open = !postcode_open">
                        <template v-if="postcode_open"><b-icon-x-square-fill /></template>
                        <template v-else>우편번호 찾기</template>
                    </b-button>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_zip" />
                <VueDaumPostcode v-if="postcode_open" class="shadow mt-3" @complete="onPostcodeSlt" :animation="true" />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label_st"></b-col>
            <b-col class="col_l">
                <validation-provider name="주소" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_addr1" v-model="value.ub_addr1" ref="ub_addr1" readonly :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_addr1" />
            </b-col>
            <b-col class="col_r">
                <validation-provider name="상세주소" rules="required" v-slot="validationContext">
                    <b-form-input id="ub_addr2" v-model="value.ub_addr2" ref="ub_addr2" placeholder="상세주소" :state="getValidationState(validationContext)" />
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_addr2" />
            </b-col>
        </b-row>
        <b-row v-if="value.file_info.length">
            <b-col class="label_st">등록증 다운</b-col>
            <b-col>
                <b-button v-for="(file, i) in value.file_info" class="white sm mr-2" @click="fileDown(file.down_path, file.fi_original)" :key="i">
                    {{file.fi_original}}
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label_st">등록증 사본 업로드<b class="need" /></b-col>
            <b-col>
                <file-upload ref="fileupload" v-model="value.file_info" :fi_group="'userBiz'" :fi_kind="'license'" :height="100" />
                <Validation :error="$store.state.error.validations.ub_file" />
            </b-col>
        </b-row>
    </b-container>
</b-col>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode";
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        FileUpload,
        VueDaumPostcode,
        'Validation': () => import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
    data() {
        return {
            postcode_open: false,
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) { return dirty || validated ? valid : null; },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        maxlength_2(e){ return String(e.replace(/[^0-9]/g, '')).substring(0, 2); },
        maxlength_3(e){ return String(e.replace(/[^0-9]/g, '')).substring(0, 3); },
        maxlength_5(e){ return String(e.replace(/[^0-9]/g, '')).substring(0, 5); },
        format_tel(e) { return this.formatTel(e); },

        onPostcodeSlt(result) {
            this.$set(this.value, 'ub_zip', result.zonecode);
            let bd_name = result.buildingName ? `${(result.buildingName)}` : '';
            this.$set(this.value, 'ub_addr1', `${result.roadAddress} ${bd_name}`);
            this.$refs.ub_addr2.focus();
            this.postcode_open = false;
        },
    },
}
</script>

<style scoped>
.form_box .col .frm_vali_st .row .col input, 
.form_box .col .frm_vali_st .row .col select, 
.form_box .col .frm_vali_st .row .col textarea { padding: 2px 14px; }
.extra .frm_vali_st .row .col.label_st { flex-basis:160px; max-width:160px; } 
.extra .frm_vali_st .row .col.ub_num { display:flex; flex-wrap:wrap; justify-content:space-between; }
.extra .frm_vali_st .row .col.ub_num span:nth-of-type(1) { position:relative; flex:0 0 25%; max-width:25%; }
.extra .frm_vali_st .row .col.ub_num span:nth-of-type(2) { position:relative; flex:0 0 20%; max-width:20%; }
.extra .frm_vali_st .row .col.ub_num span:nth-of-type(3) { position:relative; flex:0 0 43%; max-width:43%; }
.extra .frm_vali_st .row .col.ub_num span:nth-of-type(1):after,
.extra .frm_vali_st .row .col.ub_num span:nth-of-type(2):after { content:'-'; position:absolute; top:6px; right:-17px; font-weight:bold; font-size:20px; color:#898989; }
.extra .frm_vali_st .zip_row  { margin-bottom:.4rem; }
.extra .frm_vali_st .zip_row .col input { display:inline-block; max-width:150px; margin-right:7px; }
.extra .frm_vali_st .row .col_l { padding-right:4px; }
.extra .frm_vali_st .row .col_r { padding-left:4px; }
.vue-daum-postcode { position:absolute; z-index:2; }
</style>