<template>
    <div class="dealer_form">
        <b-row>
            <b-col>
                <h5>사업자등록 정보</h5>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <validation-provider name="사업자 등록번호" rules="required|min:12|max:12|BizNum" v-slot="validationContext">
                    <b-form-group label="사업자 등록번호" label-for="ub_num" label-class="required" description="숫자만 입력하면 자동으로 형식에 맞춰 입력 됩니다.">
                        <b-form-input id="ub_num" placeholder="사업자 등록번호를 입력하세요" v-model="value.ub_num" :state="getValidationState(validationContext)" required :formatter="formatBiz" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_num" />
            </b-col>
            <b-col>
                <validation-provider name="사업자 등록증" rules="required" v-slot="validationContext">
                    <b-form-group label="사업자 등록증 업로드" label-for="ub_file" label-class="required" description="사업자임을 증명하기위해 등록증 사본을 첨부해주세요.">
                        <b-form-file id="ub_file" v-model="value.ub_file" placeholder="파일을 선택하세요." :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_file" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <validation-provider name="상호" rules="required" v-slot="validationContext">
                    <b-form-group label="상호(법인명)" label-for="ub_corp_name" label-class="required">
                        <b-form-input id="ub_corp_name" placeholder="법인명" v-model="value.ub_corp_name" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_corp_name" />
            </b-col>
            <b-col>
                <validation-provider name="대표자명" rules="required" v-slot="validationContext">
                    <b-form-group label="대표자명" label-for="ub_name" label-class="required">
                        <b-form-input id="ub_name" placeholder="대표자명" v-model="value.ub_name" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_name" />
            </b-col>
            <b-col>
                <validation-provider name="전화번호" rules="required" v-slot="validationContext">
                    <b-form-group label="대표 전화번호" label-for="ub_tel" label-class="required">
                        <b-form-input id="ub_tel" v-model="value.ub_tel" placeholder="대표 전화를 입력하세요" :state="getValidationState(validationContext)" required :formatter="formatBiz" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_tel" />
            </b-col>
        </b-row>
        <b-row>
            <b-col md="4" col>
                <validation-provider name="주소 우편번호" rules="required" v-slot="validationContext">
                    <b-form-group label="사업장 주소" label-for="ub_zip" label-class="required" description="우편번호">
                        <b-input-group>
                            <b-form-input id="ub_zip" v-model="value.ub_zip" ref="ub_zip" placeholder="우편번호" readonly :state="getValidationState(validationContext)" />
                            <b-input-group-append>
                                <b-button variant="primary" @click="postcode_open = !postcode_open">
                                    <template v-if="postcode_open"><b-icon-x-square-fill /></template>
                                    <template v-else>주소검색</template>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_zip" />
                <template v-if="postcode_open">
                    <VueDaumPostcode class="shadow mt-3" @complete="onPostcodeSlt" :animation="true" >
                        <template #loading>
                            <b-spinner variant="success" label="Spinning" />
                        </template>
                    </VueDaumPostcode>
                </template>
            </b-col>
            <b-col>
                <validation-provider name="주소 주소" rules="required" v-slot="validationContext">
                    <b-form-group label=" " label-for="ub_addr1" label-class="required" description="주소">
                        <b-form-input id="ub_addr1" v-model="value.ub_addr1" ref="ub_addr1" placeholder="주소" readonly :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_addr1" />
            </b-col>
            <b-col>
                <validation-provider name="주소 상세주소" rules="required" v-slot="validationContext">
                    <b-form-group label=" " label-for="ub_addr2" label-class="required" description="상세주소">
                        <b-form-input id="ub_addr2" v-model="value.ub_addr2" ref="ub_addr2" placeholder="상세주소" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_addr2" />
            </b-col>
        </b-row>
        <b-row>            
            <b-col md="4" col>
                <validation-provider name="업종" rules="required" v-slot="validationContext">
                    <b-form-group label="업종" label-for="ub_type" label-class="required">
                        <b-form-input id="ub_type" v-model="value.ub_type" placeholder="업종" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_type" />
            </b-col>
            <b-col md="4" col>
                <validation-provider name="업태" rules="required" v-slot="validationContext">
                    <b-form-group label="업태" label-for="ub_cond" label-class="required">
                        <b-form-input id="ub_cond" v-model="value.ub_cond" placeholder="업태" :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <Validation :error="$store.state.error.validations.ub_cond" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode";

export default {
    components: {
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
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        onPostcodeSlt(result) {
            this.$set(this.value, 'ub_zip', result.zonecode);
            this.$set(this.value, 'ub_addr1', result.roadAddress + "("+ result.buildingName +")");
            this.postcode_open = false;
        },
    },
    mounted() {
        // console.log(this.$route.name);
    },
}

</script>
<style scoped>
.dealer_form { margin-top:4rem; }
.dealer_form h5 { font-weight: bold; font-size:2rem; }
.dealer_form .vue-daum-postcode { position:absolute; z-index:1; }
</style>