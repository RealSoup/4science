<template>
    <b-container>
        <b-row>
            <b-col>
                <b-row>
                    <b-col>
                        <validation-provider name="이름" rules="required|min:2|korAlphaNum" v-slot="validationContext" >
                            <b-form-group label="이름" label-for="name" label-class="required" description="본인의 성함">
                                <b-form-input id="name" placeholder="이름을 입력하세요" v-model="value.name" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <Validation :error="$store.state.error.validations.name" />
                    </b-col>
                    <b-col>
                        <b-form-radio-group id="sex" v-model="value.sex" :options="sex" />
                        <Validation :error="$store.state.error.validations.sex" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <validation-provider v-if="this.$route.name == 'auth_create'" name="이메일" rules="required|email" v-slot="validationContext">
                            <b-form-group label="이메일 주소" label-for="email" label-class="required" description="로그인시 아이디 대신 사용됩니다.">
                                <b-form-input type="email" id="email" placeholder="Enter email" v-model="value.email" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <validation-provider v-else-if="this.$route.name == 'my_user_edit'" name="이메일" rules="required|email" v-slot="validationContext">
                            <b-form-group label="이메일 주소" label-for="email" label-class="required" description="로그인시 아이디 대신 사용됩니다.">
                                <b-form-input type="email" id="email" placeholder="Enter email" v-model="value.email" :state="getValidationState(validationContext)" readonly />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <Validation :error="$store.state.error.validations.email" />
                    </b-col>
                    <b-col>
                        <b-form-checkbox id="receive_mail" v-model="value.receive_mail" value='Y' unchecked-value="N">메일 수신 동의</b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <validation-provider vid="password" name="패스워드" rules="required|min:6|pwCheck" v-slot="validationContext">
                            <b-form-group label="비밀번호" label-for="password" label-class="required" description="6자 이상 입력하세요.">
                                <b-form-input type="password" id="password" placeholder="비밀번호를 입력하세요" v-model="value.password" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <Validation :error="$store.state.error.validations.password" />
                    </b-col>

                    <b-col>
                        <validation-provider name="패스워드 확인" rules="required|confirmed:password" v-slot="validationContext">
                            <b-form-group label="비밀번호 확인" label-for="password_confirmation" label-class="required" description="동일한 비밀번호를 입력하세요">
                                <b-form-input type="password" id="password_confirmation" placeholder="비밀번호를 입력하세요" v-model="value.password_confirmation" :state="getValidationState(validationContext)" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <Validation :error="$store.state.error.validations.password_confirmation" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <validation-provider name="생년월일" rules="required" v-slot="validationContext">
                            <b-form-group label="생년월일" label-for="birth" label-class="required" description="본인의 생년월일 달력에서 선택하세요" >
                                <b-input-group>
                                    <b-form-input id="birth" v-model="value.birth" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" :state="getValidationState(validationContext)" />
                                    <b-input-group-append>
                                        <b-form-datepicker v-model="value.birth" button-only right :value="'2019-01-01'"></b-form-datepicker>
                                    </b-input-group-append>
                                </b-input-group>
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <Validation :error="$store.state.error.validations.birth" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <validation-provider name="휴대폰 번호" rules="required" v-slot="validationContext">
                            <b-form-group label="휴대폰 번호" label-for="hp" label-class="required" description="본인의 휴대폰 번호 입력"></b-form-group>
                                <b-form-input id="hp" placeholder="휴대폰 번호를 입력하세요" v-model="value.hp" :state="getValidationState(validationContext)" :formatter="formatHp" />
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                        <Validation :error="$store.state.error.validations.hp" />
                    </b-col>
                    <b-col>
                        <b-form-checkbox id="receive_sms" v-model="value.receive_sms" value='Y' unchecked-value="N">문자 수신 동의</b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col><b-form-input size="sm" v-model="value.tel" placeholder="일반전화" :formatter="formatTel" /></b-col>
                    <b-col><b-form-input size="sm" v-model="value.fax" placeholder="팩스" :formatter="formatTel" /></b-col>
                </b-row>
                <b-row class="mt-5">
                    <b-col><b-form-select size="sm" v-model="value.job" :options="job" placeholder="직업" /></b-col>
                    <b-col><b-form-input size="sm" v-model="value.office" placeholder="직장명/학교명" /></b-col>
                    <b-col><b-form-input size="sm" v-model="value.department" placeholder="부서/학과/연구실명" /></b-col>
                </b-row>
                <b-row>
                    <b-col><b-form-input size="sm" v-model="value.grade" placeholder="직급/학년" /></b-col>
                    <b-col><b-form-input size="sm" v-model="value.tutor" placeholder="지도교수님" /></b-col>
                    <b-col><b-form-input size="sm" v-model="value.offer" placeholder="추천인 Email" /></b-col>
                    <b-col><b-form-input size="sm" v-model="value.offer_lab" placeholder="추천인 연구실" /></b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="관심분야:">
                            <b-form-checkbox-group v-model="value.interest" :options="interest" name="interest" />
                        </b-form-group>
                        기타 <b-form-input v-model="value.interest_etc" size="sm" placeholder="기타 관심분야" class="d-inline interest_etc" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="가입경로:"><b-form-radio-group v-model="value.join_route" :options="join_route" /></b-form-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

export default {
    components: {
        'Validation': () => import('@/views/_common/Validation.vue'),
    },
    props: ['value'],
    data() {
        return {
            job:[
                { value:"",              text:"▣ 직업 선택 ▣" },
                { value:"교수",           text:"교수" },
                { value:"연구원",         text:"연구원" },
                { value:"학부과정",       text:"학부과정" },
                { value:"석사과정",       text:"석사과정" },
                { value:"박사과정",       text:"박사과정" },
                { value:"초중등교사",     text:"초중등교사" },
                { value:"영업/마케팅",    text:"영업/마케팅" },
                { value:"연구관리/기획",  text:"연구관리/기획" },
                { value:"사업기획",       text:"사업기획" },
                { value:"구매관리",       text:"구매관리" },
                { value:"일반관리",       text:"일반관리" },
                { value:"생산관리",       text:"생산관리" },
                { value:"기타",           text:"기타" },
            ],
            sex:[
                { value:"male",     text:"남성" },
                { value:"female",   text:"여성" },
            ],
            interest:[
                { value:"생명",              text:"생명" },
                { value:"광학",              text:"광학" },
                { value:"진공",              text:"진공" },
                { value:"전자기기",          text:"전자기기" },
                { value:"컴퓨터소프트웨어",   text:"컴퓨터소프트웨어" },
                { value:"재료",              text:"재료" },
                { value:"클린룸용품",        text:"클린룸용품" },
                { value:"초자류",             text:"초자류" },
                { value:"이화학기기",         text:"이화학기기" },
                { value:"교육용기자재",       text:"교육용기자재" },
                { value:"공구류",             text:"공구류" },
                { value:"화학/화공",         text:"화학/화공" },
                { value:"환경",              text:"환경" },
                { value:"시약",              text:"시약" },
            ],
            join_route:[
                { value:"네이버 검색",          text:"네이버 검색" },
                { value:"구글 검색",            text:"구글 검색" },
                { value:"옥외광고",             text:"옥외광고" },
                { value:"주위의 소개",          text:"주위의 소개" },
                { value:"학회 및 전시회 부스",   text:"학회 및 전시회 부스" },
                { value:"잡지 소식지",          text:"잡지 소식지" },
                { value:"기타",                 text:"기타" },
            ],
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
    },
    mounted() {
        // console.log(this.$route.name);
    },
}

</script>