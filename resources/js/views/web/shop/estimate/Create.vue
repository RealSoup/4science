<template>
    <b-container class="w_fence" id="estimate_req">
        <h3>{{ trans().estimate.title }}</h3>
        <b-row v-if="Object.keys(frm.lists).length">
            <b-col class="goods">
                <h4>01. {{ trans().estimate.sub_tit01 }}</h4>
                <pa-list v-model="frm.lists" :user="$store.state.auth.user" :add_vat="true" />
            </b-col>
        </b-row>

        <b-row>
            <b-col class="user">
                <h4>0{{Object.keys(frm.lists).length ? 2 : 1}}. {{ trans().estimate.sub_tit02 }}</h4>
                <b-container class="frm_st">
                    <b-row>
                        <b-col class="label_st">주문자명<b class="need" /></b-col>
                        <b-col>
                            <b-form-input v-model="frm.eq_name" id="eq_name" />
                            <validation :error="this.$store.state.error.validations.eq_name" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">연락처<b class="need" /></b-col>
                        <b-col class="hp">
                            <b-form-input v-model="frm.eq_hp" ref="eq_hp" :formatter="format_hp" />
                            <validation :error="this.$store.state.error.validations.eq_hp" />
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
                            <validation :error="this.$store.state.error.validations.eq_email" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">소속<small><i>직장/학교</i></small><b class="need" /></b-col>
                        <b-col>
                            <b-form-input v-model="frm.eq_company" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="label_st">첨부파일</b-col>
                        <b-col>
                            <file-upload ref="fileupload" v-model="files" :fi_group="'estimateReq'" :fi_kind="'add'" :height="200" />
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>

            <b-col class="inquiry">
                <h4>0{{Object.keys(frm.lists).length ? 3 : 2}}. {{ trans().estimate.sub_tit03 }}</h4>
                <b-container class="frm_st">
                    <div class="frm_bd">
                        <b-row v-if="isEmpty(frm.lists)" class="cate">
                            <b-col class="label_st">카테고리</b-col>
                            <b-col>
                                <b-form-select size="sm" id="eq_1depth" ref="eq_1depth" v-model="frm.eq_1depth" required>
                                    <b-form-select-option value="">선택</b-form-select-option>
                                    <b-form-select-option v-for="ca in cate" :key="ca.ca_id" :value="ca.ca_name">{{ca.ca_name}}</b-form-select-option>
                                </b-form-select>
                                <validation :error="this.$store.state.error.validations.eq_1depth" />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
<b-form-textarea v-model="frm.eq_content" id="eq_content" rows="12" placeholder="제품명: 
사양: 
수량:" />
                            </b-col>
                        </b-row>
                    </div>
                </b-container>
            </b-col>
        </b-row>
        <b-row><b-col class="btn_box"><b-button class="blue wd_33p" @click="store" id="analytics_estimate">견적 요청하기</b-button></b-col></b-row>
        
    </b-container>
</template>

<script>
import ax from '@/api/http';
import FileUpload from '@/views/_common/FileUpload.vue'

export default {
    components: {
        'file-upload': FileUpload,
        'validation':   () => import('@/views/_common/Validation.vue'),
        'pa-list':       () => import('@/views/web/_module/PaList.vue'),
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
                eq_company: "",
                eq_content: "",
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
            this.frm.eq_email = `${this.frm.eq_email01}@${this.frm.eq_email02}`;
            if( Object.keys(this.frm.lists).length < 1 ) {
                if (isEmpty(this.frm.eq_content)) { Notify.toast('danger', "문의 사항을 입력하세요."); document.getElementById('eq_content').focus(); return false; }
            }
            try {
                let res = await ax.post(`/api/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    await this.$refs.fileupload.fileProcessor(res.data);
                    
                    this.$gtm.trackEvent({
                        event: null, // Event type [default = 'interaction'] (Optional)
                        category: 'Estimate',
                        action: 'click',
                        label: '견적 문의',
                        value: 0,
                        noninteraction: false, // Optional
                    });

                    Notify.toast('success', '견적 요청 완료')
                    this.$store.dispatch('cart/index');
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
        format_hp(e) { return this.formatHp(e); },
    },
    async mounted() {
        if (this.$route.params.od_goods)
            this.create();
        this.getCateList();
        
        let res = await ax.get(`/api/user/getEmailDomain`);
        if (res && res.status === 200) this.email_domain = res.data;

        let eq_email = Auth.user().email.split('@');
        this.frm.eq_name = Auth.user().name;
        this.frm.eq_hp = Auth.user().hp;
        this.frm.eq_email01 = eq_email[0];
        this.frm.eq_email02 = eq_email[1];
        this.frm.eq_company = Auth.user().company;

        this.$gtm.trackView('견적 요청 페이지', 'https://4science.net/shop/estimate/create');
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
@media (max-width: 992px){
    .user { flex-basis:100%; max-width:100%; }
    .inquiry { padding-left:0; }
    .frm_st .row .col.label_st { flex-basis:100%; max-width:100%; }
    .frm_st .row .col.hp span:not(:last-child):after { top:3px; right:-13px; }
    .frm_st .row .col.email span:first-child:after { top:6px; right:-17px; font-weight: bold; font-size: 15px; color: #898989; }
    .frm_st .row { margin-bottom: 0.5rem; }
    .btn_box { margin-top: 1rem; }
    .btn.wd_33p { width: 100%; }
}
</style>