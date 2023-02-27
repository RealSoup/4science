<template>
    <b-container class="w_fence" id="estimate_req">
        <h3>견적요청</h3>
        <b-row v-if="Object.keys(frm.lists).length">
            <b-col class="goods">
                <h4>01. 견적요청 상품</h4>
                <PaList v-model="frm.lists" />
            </b-col>
        </b-row>

        <b-row>
            <b-col class="user">
                <h4>0{{Object.keys(frm.lists).length ? 2 : 1}}. 회원 정보</h4>
                <b-container class="frm_st">
                    <b-row>
                        <b-col class="label_st">주문자명<b class="need" /></b-col>
                        <b-col>
                            <b-form-input v-model="frm.eq_name" id="eq_name" />
                            <Validation :error="this.$store.state.error.validations.eq_name" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">연락처<b class="need" /></b-col>
                        <b-col class="hp">
                            <span><b-form-input v-model="frm.eq_hp01" ref="eq_hp01" @input.native="focusNext($event, 3, 'eq_hp02')" :formatter="maxlength_3" id="eq_hp" /></span>
                            <span><b-form-input v-model="frm.eq_hp02" ref="eq_hp02" @input.native="focusNext($event, 4, 'eq_hp03')" :formatter="maxlength_4" /></span>
                            <span><b-form-input v-model="frm.eq_hp03" ref="eq_hp03" :formatter="maxlength_4" /></span>
                            <Validation :error="this.$store.state.error.validations.eq_hp" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">이메일<b class="need" /></b-col>
                        <b-col class="email">
                            <span><b-form-input v-model="frm.eq_email01" id="eq_email" /></span>
                            <span><b-form-input v-model="frm.eq_email02" /></span>
                            <span>
                                <b-form-select v-model="email_domain_slt_idx" @change="email_domain_slt">
                                    <b-form-select-option value="0">직접입력</b-form-select-option>
                                    <b-form-select-option v-for="(dm, i) in email_domain" :key="i" :value="i">{{dm}}</b-form-select-option>
                                </b-form-select>
                            </span>
                            <Validation :error="this.$store.state.error.validations.eq_email" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">소속<small><i>직장/학교/연구실</i></small></b-col>
                        <b-col>
                            <b-form-input v-model="frm.eq_department" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">첨부파일</b-col>
                        <b-col>
                            <file-upload ref="fileupload" v-model="files" :fi_group="'estimateReq'" :fi_kind="'add'" :height="100" />
                        </b-col>
                    </b-row>
                    <b-row class="agree">
                        <b-col>
                            [SMS 수신동의] 본 견적요청과 관련된 문자메세지를 수신하시겠습니까? 
                            <b-form-radio v-model="receive_yn" value="Y">수신</b-form-radio>
                            <b-form-radio v-model="receive_yn" value="N">수신 안함</b-form-radio>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>

            <b-col class="inquiry">
                <h4>0{{Object.keys(frm.lists).length ? 3 : 2}}. 문의사항</h4>
                <b-container class="frm_st">
                    <div class="frm_bd">
                        <b-row v-if="isEmpty(frm.lists)" class="cate">
                            <b-col class="label_st">카테고리</b-col>
                            <b-col>
                                <b-form-select size="sm" id="eq_1depth" ref="eq_1depth" v-model="frm.eq_1depth" required>
                                    <b-form-select-option value="">선택</b-form-select-option>
                                    <b-form-select-option v-for="ca in cate" :key="ca.ca_id" :value="ca.ca_name">{{ca.ca_name}}</b-form-select-option>
                                </b-form-select>
                                <Validation :error="this.$store.state.error.validations.eq_1depth" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col><b-form-textarea v-model="frm.eq_content" rows="13" /></b-col>
                        </b-row>
                    </div>
                </b-container>
            </b-col>
        </b-row>
        <b-row><b-col class="btn_box"><b-button class="blue wd_33p" @click="store">견적 요청하기</b-button></b-col></b-row>
        
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        FileUpload,
        'Validation':   () => import('@/views/_common/Validation.vue'),
        'PaList':       () => import('@/views/web/_module/PaList.vue'),
    },
    data() {
        return {
            frm:{
                lists:{},
                price:{},
                fi_id:[],
                eq_name: "",
                eq_email: "",
                eq_email02: '',
                eq_tel: "",
                eq_fax: "",
                eq_hp: "",
                eq_department: "",
                eq_content: "제품명: \n사양: \n수량:",
                eq_1depth:'',
            },
            cate:{},
            od_goods: this.$route.params.od_goods,
            files:[],
            email_domain: [],
            email_domain_slt_idx:0,
            receive_yn:'Y',
        }
    },
    methods: {
        async create(){
            try {
                const res = await ax.post(`/api/shop/estimate/create`, {goods:this.od_goods});
                if (res && res.status === 200) 
                    this.frm.lists = res.data.lists;                
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        async store(){
            this.frm.eq_hp = `${this.frm.eq_hp01}-${this.frm.eq_hp02}-${this.frm.eq_hp03}`;
            this.frm.eq_email = `${this.frm.eq_email01}@${this.frm.eq_email02}`;
            try {
                let res = await ax.post(`/api/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.fileupload.fileProcessor(res.data);
                    Notify.toast('success', '견적 요청 완료')
                    this.$router.push({name: 'my_estimate_show', params: { eq_id: res.data }});
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
        email_domain_slt() { this.frm.eq_email02 = this.email_domain[this.email_domain_slt_idx]; },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        maxlength_3(e){ return String(e).substring(0, 3); },
        maxlength_4(e){ return String(e).substring(0, 4); },
    },
    async mounted() {
        if (this.$route.params.od_goods)
            this.create();
        this.getCateList();
        
        let res = await ax.get(`/api/user/getEmailDomain`);
        if (res && res.status === 200) this.email_domain = res.data;

        let eq_hp = Auth.user().hp.split('-');
        let eq_email = Auth.user().email.split('@');
        this.frm.eq_name = Auth.user().name;
        this.frm.eq_hp01 = eq_hp[0];
        this.frm.eq_hp02 = eq_hp[1];
        this.frm.eq_hp03 = eq_hp[2];
        this.frm.eq_email01 = eq_email[0];
        this.frm.eq_email02 = eq_email[1];
        this.frm.eq_department = Auth.user().department;
    },
}
</script>

<style lang="css" scoped>
.goods { padding:0; }
.goods h4 { margin-bottom:0; }
.user { flex-basis:49.2%; max-width:49.2%; padding-left:0; }
.inquiry { padding-left:35px; padding-right:0; }
.inquiry .container { padding-left:15px; padding-right:15px; }
.inquiry .container .frm_bd { border:2px solid #D7D7D7; padding:8px 25px; }
.inquiry .container .frm_bd .cate { border-bottom: 1px solid #D7D7D7; padding-bottom:8px; }
.inquiry .container .frm_bd .cate .label_st { flex-basis:100px; max-width:100px; }
.inquiry .container .frm_bd .row .col textarea { border-color:#fff; font-size:.9rem; color:#878787; line-height:1.6rem; }
</style>