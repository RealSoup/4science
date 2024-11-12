<template>   
    <b-col class="extra">
        <h4>02. 추가정보</h4>
        <b-container class="frm_vali_st">
            <b-row>
                <b-col class="label_st">직업</b-col><b-col><b-form-select v-model="value.job" :options="job"></b-form-select></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">부서/학과/연구실명</b-col><b-col><b-form-input v-model="value.part"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">직급/학년</b-col><b-col><b-form-input v-model="value.grade"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">지도교수님</b-col><b-col><b-form-input v-model="value.tutor"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">추천인 Email</b-col><b-col><b-form-input v-model="value.offer"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col class="label_st">추천인 연구실</b-col><b-col><b-form-input v-model="value.offer_lab"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col class="slt_item">
                    <b-form-group label="관심분야">
                        <b-form-checkbox-group v-model="value.interest" :options="interest" name="interest"></b-form-checkbox-group>
                        <span>기타</span> <b-form-input v-model="value.interest_etc"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="slt_item" id="join_route">
                    <div class="mb-1">가입경로 <b class="need"></b></div>
                    <b-form-radio-group v-model="value.join_route" :options="cp_join_route"></b-form-radio-group>
                </b-col>
            </b-row>   
        </b-container>
    </b-col>
</template>

<script>
import ax from '@/api/http';
export default {
    props: ['value'],
    data() {
        return {
            info:[],
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
    computed: {
        cp_join_route: function () {
            let dummy = [];
            for (let i in this.info.join_route)
                dummy.push({ value: this.info.join_route[i], text: this.info.join_route[i] });            
            return dummy;
        },
    },
    async mounted() {
        try {
            const res = await ax.get(`/auth/user/createInfo`);            
            if (res && res.status === 200)
                this.info = res.data;            
        } catch (e) {
            Notify.consolePrint(e);
            Notify.toast('warning', e.responsee);
        }
    },
}

</script>

<style lang="css" scoped>
.form_box .extra .slt_item input { width:100%; max-width:400px; display:inline-block; }
</style>