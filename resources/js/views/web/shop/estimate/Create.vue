<template>
    <b-container class="w_fence" id="estimate_req">
        <h3>견적요청</h3>
        
        <PaList v-model="frm.lists" />

        <b-row>
            <b-col>
                <h4>01. 회원 정보</h4>
                <b-container class="frm_st">
                    <b-row>
                        <b-col>주문자명<b class="need" /></b-col>
                        <b-col>
                            <b-form-input v-model="frm.eq_name" id="eq_name" />
                            <Validation :error="this.$store.state.error.validations.eq_name" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>연락처<b class="need" /></b-col>
                        <b-col class="hp">
                            <span><b-form-input v-model="frm.eq_hp01" id="eq_hp" /></span>
                            <span><b-form-input v-model="frm.eq_hp02" /></span>
                            <span><b-form-input v-model="frm.eq_hp03" /></span>
                            <Validation :error="this.$store.state.error.validations.eq_hp" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>이메일<b class="need" /></b-col>
                        <b-col class="email">
                            <span><b-form-input v-model="frm.eq_email01" id="eq_email" /></span>
                            <span><b-form-input v-model="frm.eq_email02" /></span>
                            <span>
                                <b-form-select v-model="email_domain_slt_idx" @change="email_domain_slt">
                                    <b-form-select-option value="">직접입력</b-form-select-option>
                                    <b-form-select-option v-for="(dm, i) in email_domain" :key="i" :value="i">{{dm}}</b-form-select-option>
                                </b-form-select>
                            </span>
                            <Validation :error="this.$store.state.error.validations.eq_email" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>소속<small><i>직장/학교/부서/학과/연구실명</i></small></b-col>
                        <b-col>
                            <b-form-input v-model="frm.eq_department" />
                        </b-col>
                    </b-row>                    
                </b-container>
            </b-col>

            <b-col>

                <b-card class="shadow mt-3">
                    <template #header><b>문의사항</b></template>
                    <b-container>
                        <b-row v-if="isEmpty(frm.lists)">
                            <b-col>
                                <b-form-select size="sm" id="eq_1depth" ref="eq_1depth" v-model="frm.eq_1depth" required>
                                    <b-form-select-option value="">분야 선택</b-form-select-option>
                                    <b-form-select-option v-for="ca in cate" :key="ca.ca_id" :value="ca.ca_name">{{ca.ca_name}}</b-form-select-option>
                                </b-form-select>
                                <Validation :error="this.$store.state.error.validations.eq_1depth" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="awesome_p">
                                <textarea id="eq_content" v-model="frm.eq_content" required rows="5"></textarea>
                                <label for="eq_content"><span>견적 요청 내용</span></label>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-card class="shadow mt-3">
                    <template #header><b>첨부파일</b></template>
                    <file-upload ref="fileupload" v-model="files" :fi_group="'estimateReq'" :fi_kind="'add'" />
                </b-card>
            </b-col>
        </b-row>


        <b-button block size="lg" variant="primary" class="mt-4 p-5" @click="store">요청하기</b-button>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        FileUpload,
        'Validation': () => import('@/views/_common/Validation.vue'),
        'PaList': () => import('@/views/web/_module/PaList.vue'),
    },
    data() {
        return {
            frm:{
                lists:[],
                fi_id:[],
                eq_name: "김선우",
                eq_email: "sunwoo@nate.com",
                eq_email02: '',
                eq_tel: "031-133-1232",
                eq_fax: "031-133-1232",
                eq_hp: "010-1333-1232",
                eq_department: "한국과학기술연구원 바이오마이크로시스템 연구단",
                eq_content: "나는 가슴이 두근거려요 \n당신만 아세요 열 일곱 살이예요 \n가만 가만히 오세요 요리조리로 \n노랑새 꿈꾸는 버드나무 아래로 가만히 오세요 \n\n나는 얼굴이 붉어졌어요 \n가르쳐 드릴까요 열일곱살이예요",
                eq_1depth:'',
            },
            cate:{},
            od_goods: this.$route.params.od_goods,
            files:[],
            email_domain: [],
            email_domain_slt_idx:0,
        }
    },
    methods: {
        async create(){
            try {
                console.log(this.od_goods);
                const res = await ax.post(`/api/shop/estimate/create`, {goods:this.od_goods});
                if (res && res.status === 200) {
                    this.frm.lists = res.data.lists;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        async store(){
            try {
                let res = await ax.post(`/api/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.fileupload.fileProcessor(res.data);
                    Notify.toast('success', '견적 요청 완료')
                    this.$router.push({name: 'main'});
                } else {
                    Notify.toast('warning', res);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        pushFi_id(fi_id) {
            this.frm.fi_id.push(fi_id);
        },
        async getCateList(){
            try {
                const res = await ax.get(`/api/category/0`);
                if (res && res.status === 200)
                    this.cate = res.data.categorys;
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        email_domain_slt() {
            console.log(this.email_domain_slt_idx);
            this.frm.eq_email02 = this.email_domain[this.email_domain_slt_idx];
        },
    },
    async mounted() {
        if (this.$route.params.od_goods)
            this.create();
        this.getCateList();
        
        let res = await ax.get(`/api/user/getEmailDomain`);
        if (res && res.status === 200) this.email_domain = res.data;
    },
}
</script>

<style lang="css" scoped>
.frm_st .row { margin-top:.8rem; margin-bottom:.8rem; align-items:baseline; }
.frm_st .row .col {  }
.frm_st .row .col:first-child { flex-basis:140px; max-width:140px; } 
.frm_st .row .col input { background:#F2F3F5; padding:2px 5px; border-width: 0; }
.frm_st .row .col.hp { display:flex; justify-content:space-between; }
.frm_st .row .col.hp span { position:relative; flex:0 0 30%; max-width:30%; }
.frm_st .row .col.hp input:not(:last-child) {  }
.frm_st .row .col.hp span:not(:last-child):after { content:'-'; position:absolute; top:6px; right:-17px; font-weight:bold; font-size:20px; color:#898989; }
.frm_st .row .col.email { display:flex; justify-content:space-between; }
.frm_st .row .col.email span { position:relative; flex:0 0 30%; max-width:30%; }
.frm_st .row .col.email span:first-child:after { content:'@'; position:absolute; top:6px; right:-23px; font-weight:bold; font-size:20px; color:#898989; }
#estimate_req .card .card-body .row div img { width:119px; height:119px; object-fit:cover; }


</style>
