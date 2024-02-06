<template>
<div class="w_fence">
    <img src="/storage/rental/banner.png" id="banner" />
    <div class="rt_step">
        <p>렌탈 신청 과정</p>
        <ul>
            <li>
                <img src="/storage/rental/step01.png" />
                <b>제품 신청</b>
            </li>
            <li>
                <img src="/storage/rental/step02.png" />
                <b>렌탈 견적</b>
            </li>
            <li>
                <img src="/storage/rental/step03.png" />
                <b>렌탈 계약</b>
            </li>
            <li>
                <img src="/storage/rental/step04.png" />
                <b>상품배송 및 렌탈시작</b>
            </li>
            <li>
                <img src="/storage/rental/step05.png" />
                <b>렌탈종료 or 연장</b>
            </li>
        </ul>
    </div>

    <ul class="contact">
        <li>렌탈 상담 |</li>
        <li>sales@4science.net</li>
        <li>1644-4214</li>
    </ul>

    <div class="list">
        <b-container>
            <h3>렌탈 제품</h3>
            <loading-modal v-if="isLoadingModalViewed" :position="'absolute'">Loading ......</loading-modal>
        
            <b-row v-else>
                <b-col v-for="(row, i) in list" :key="row.gd_id">
                    <div class="box" @click="show(i)">
                        <b>{{i+1}}</b>
                        <img :src="row.image_src_thumb[0]" />
                        <!-- <ul class="clear-both">
                            <li>이화학기기</li>
                            <li>진공건조기</li>
                            <li>건조기</li>
                        </ul> -->
                        <sub-string v-model="row.gd_name" :width="300" />
                        <p>{{row.goods_model_prime.gm_code}}</p>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
 

    <transition name="modal">
        <modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="1100">
            <b-container class="show">
                <b-row>
                    <b-col class="box">
                        <img :src="list[pick_tem].image_src_thumb[0]" />
                        <!-- <ul class="clear-both">
                            <li>이화학기기</li>
                            <li>진공건조기</li>
                            <li>건조기</li>
                        </ul> -->
                        <sub-string v-model="list[pick_tem].gd_name" :width="250" />
                        <p>{{list[pick_tem].goods_model_prime.gm_code}}</p>
                    </b-col>

                    <b-col>
                        <h4>모델명 : {{list[pick_tem].goods_model_prime.gm_code}}</h4>
                        <table>                            
                            <colgroup>
                                <col width="13%" />
                                <col width="19%" />
                                <col width="19%" />
                                <col width="" />
                                <col width="" />
                            </colgroup>
                            <tr>
                                <th>구분</th>
                                <th>계약기간</th>
                                <th>배송비</th>
                                <th>보증금</th>
                                <th>월사용료(VAT별도)</th>
                            </tr>

                            <tr v-for="(gm, i) in list[pick_tem].goods_model" :key="i">
                                <template v-if="gm.gm_enable == 'Y'">
                                <th v-if="i==0" :rowspan="list[pick_tem].goods_model.filter(gm => gm.gm_enable == 'Y').length">렌탈(인수)<br /> 소유권<br /> 고객이전</th>
                                <td>{{gm.gm_name}}</td>
                                <td>{{gm.gm_spec}}</td>
                                <td>{{gm.gm_unit}}</td>
                                <td>{{gm.gm_price}}</td>
                                </template>
                            </tr>
                        </table>
                        <hr />

                        <b-container class="frm_st">
                            <b-row>
                                <b-col class="label_st">렌탈 구분</b-col>
                                <b-col><b-radio v-model="frm.rt_group" name="rt_group" value="A">양도</b-radio></b-col>
                            </b-row>
                            
                            <b-row>
                                <b-col class="label_st">계약 기간</b-col>
                                <b-col>
                                    <template v-for="(gm, i) in list[pick_tem].goods_model">
                                        <b-radio :key="i" v-if="gm.gm_enable == 'Y'" v-model="frm.rt_term" name="rt_term" :value="gm.gm_name" @change="chg_rt_term(gm.gm_id)">{{gm.gm_name}}</b-radio>
                                    </template>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="label_st">업체명/담당자명<b class="need" /></b-col>
                                <b-col>
                                    <b-input v-model="frm.eq_name" />
                                </b-col>
                            </b-row>




                            <b-row>
                                <b-col class="label_st">연락처<b class="need" /></b-col>
                                <b-col class="hp">
                                    <span><b-form-input v-model="frm.eq_hp01" ref="eq_hp01" @input.native="focusNext($event, 3, 'eq_hp02')" :formatter="maxlength_3" id="eq_hp" /></span>
                                    <span><b-form-input v-model="frm.eq_hp02" ref="eq_hp02" @input.native="focusNext($event, 4, 'eq_hp03')" :formatter="maxlength_4" /></span>
                                    <span><b-form-input v-model="frm.eq_hp03" ref="eq_hp03" :formatter="maxlength_4" /></span>
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
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="label_st">문의 사항<b class="need" /></b-col>
                                <b-col>
                                    <b-form-textarea v-model="frm.eq_content" id="eq_content" rows="4" placeholder="문의사항" />
                                </b-col>
                            </b-row>
                            
                            <b-row class="btn_box">
                                <b-col><b-button class="blue wd_100p" @click="store">상담 신청</b-button></b-col>
                                <b-col><b-button class="white wd_100p" @click="isModalViewed=false">닫기</b-button></b-col>
                            </b-row>
                            
                        </b-container>
                    </b-col>
                </b-row>

                <br />

                <div>
                    <div class="prev_alarm"> <!-- 카테고리별 사전 안내 -->           
                        <p v-if="list[pick_tem].goods_category_first.gc_ca01==28 && list[pick_tem].goods_category_first.gc_ca02==3481" class="warning">
                            ※제품 특성상 주문 접수 후 교환, 취소, 환불이 불가하오니 신중한 구매 부탁드리겠습니다.
                        </p>

                        <div v-if="list[pick_tem].goods_category_first.gc_ca01==28 || 
                            list[pick_tem].goods_category_first.gc_ca01==40 || 
                            ( list[pick_tem].goods_category_first.gc_ca01==33 && list[pick_tem].goods_category_first.gc_ca02 ==5579) || 
                            ( list[pick_tem].goods_category_first.gc_ca01==33 && list[pick_tem].goods_category_first.gc_ca02 ==5590) || 
                            list[pick_tem].mk_name=='US Research Nanomaterials, Inc.' || 
                            list[pick_tem].mk_name=='Novarials' || 
                            ( list[pick_tem].gd_keyword && list[pick_tem].gd_keyword.indexOf('유해물질안내') !== -1 )"
                        >
                            <br>
                            <p class="warning">
                                ※ 이 안내는 「화학물질관리법」 제29조의2 및 같은 법 시행규칙 제31조의2에 따라 유해화학물질 시약을 해당 용도로만 사용하며, 
                                유해화학물질 취급기준을 준수하여야함을 구매자에게 서면 또는 전자문서로 알려주는 것을 목적으로 하고 있습니다.<br />
                                ※ 해당 제품은 일반인과 미성년자의 구매를 금합니다.<br />
                                ※ 제품 이미지는 실제와 다를 수 있습니다.<br />
                                ※ 이미지는 참고용입니다.
                            </p>
                            <br>
                            <a href="http://ncis.nier.go.kr/" target="_blank" style="display:block; text-align:center;">
                                <img src="/storage/goods/hazmat_info.jpg" title="유해화학물질 시약 관련 안내" width="700">
                            </a>
                        </div>

                        <p v-if="list[pick_tem].goods_category_first.gc_ca01==38" class="warning">
                            EO 제품군이 전기안전법과 제조사 사정에 의해 단가 변동 사항이 있습니다. <br />
                            해당 제품 주문 전 견적문의를 통해 '단가'와 '납품기한'을 꼭 확인하시기를 부탁드리겠습니다.
                        </p>

                        <p class="warning"
                            v-if="list[pick_tem].goods_category_first.gc_ca01==31 && 
                                list[pick_tem].goods_category_first.gc_ca02==5114 && 
                                (list[pick_tem].goods_category_first.gc_ca03==5122 || list[pick_tem].goods_category_first.gc_ca03==5136 || list[pick_tem].goods_category_first.gc_ca03==5137)"
                        >
                            - 개인 고객 및 미성년자 판매금지입니다.(온라인판매금지)
                        </p>
                    </div>
                    <div id="goods_desc">
                        <div v-html="list[pick_tem].gd_desc" />
                        <div v-if="list[pick_tem].gd_video" v-html="list[pick_tem].gd_video" />
                    </div>

                    

                    <div class="desc_pdf">
                        <br /> <hr /> <br />
                        <template v-for="(file, i) in list[pick_tem].file_goods_add" >
                            <object v-if="file.type == 'pdf'" :key="i" :data="file.path" type="application/pdf" style="width:1100px; height:700px;" />
                        </template>
                    </div>
                </div>
            </b-container>
        </modal>
    </transition>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'WebShopRentalIndex',
    components: {
        'loading-modal': () =>  import('@/views/_common/LoadingModal.vue'),
        'sub-string': () =>     import('@/views/_common/SubString.vue'),
        'modal'     : () =>     import('@/views/_common/Modal'),
    },

    data() {
        return {
            isLoadingModalViewed: true,
            isModalViewed: false,
            list:[],
            pick_tem:0,
            frm: {
                lists:{},
                rt_group:'A',
                rt_term:'6개월',
                eq_name: "",
                eq_email: "",
                eq_email02: '',
                eq_tel: "",
                eq_hp: "",
                eq_content: "",
            },
            email_domain: [],
            email_domain_slt_idx:0,
        };
    },
    methods: {
        async index(){
            const res = await ax.get(`/api/shop/rental`, { params: {gd_type:'REN'} });
            if (res && res.status === 200) {
                this.list = res.data;
                this.isLoadingModalViewed = false;
            }
        },
        async show(i) {
            this.pick_tem = i;
            this.isModalViewed = true;
            const res = await ax.post(`/api/shop/estimate/create`, {goods:[{
                gd_id:this.list[this.pick_tem].gd_id, 
                gm_id:this.list[this.pick_tem].goods_model_prime.gm_id, 
                ea   :1
            } ]});
            if (res && res.status === 200)
                this.frm.lists = res.data.lists;
        },
        
        email_domain_slt() { this.frm.eq_email02 = this.email_domain[this.email_domain_slt_idx]; },
        focusNext(e, max, next) { this.$focusNext(e, max, next); },
        maxlength_3(e){ return String(e).substring(0, 3); },
        maxlength_4(e){ return String(e).substring(0, 4); },

        async store(){
            this.frm.eq_hp = `${this.frm.eq_hp01}-${this.frm.eq_hp02}-${this.frm.eq_hp03}`;
            this.frm.eq_email = `${this.frm.eq_email01}@${this.frm.eq_email02}`;
            if (isEmpty(this.frm.eq_content)) { 
                Notify.toast('danger', "문의 사항을 입력하세요."); 
                document.getElementById('eq_content').focus(); 
                return false; 
            }

            this.frm.eq_content = `계약 기간: ${this.frm.rt_term} <br>`+this.frm.eq_content
            try {
                let res = await ax.post(`/api/shop/estimate`, this.frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '상담 요청 완료')
                    this.frm.eq_content = '';
                    this.isModalViewed=false;
                } else {
                    Notify.toast('warning', res);
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
        async chg_rt_term(v){
            const res = await ax.post(`/api/shop/estimate/create`, {goods:[{
                gd_id:this.list[this.pick_tem].gd_id, 
                gm_id:v, 
                ea   :1
            } ]});
            if (res && res.status === 200)
                this.frm.lists = res.data.lists;
        },
    },
    async mounted() { 
        this.index();
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
        this.frm.eq_company = Auth.user().company;
    },
};
</script>

<style lang="css" scoped>
.w_fence { padding-top:0; }
.w_fence #banner { display:block; margin:auto; width:100%; max-width:1920px; }
.w_fence .rt_step { padding-top:45px; }
.w_fence .rt_step p { font-weight:900; font-size:1.5em; text-align:center; }
.w_fence .rt_step ul { max-width:860px; text-align:center; margin:2em auto 0; }
.w_fence .rt_step ul li { display:inline-block; position: relative; }
.w_fence .rt_step ul li:not(:last-child) { margin-right:30px; min-width:140px; }
.w_fence .rt_step ul li:not(:last-child):after { content:""; position:absolute; right:-30px; bottom:60px; width:0; height:0; 
    border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:18px solid #969696;}
.w_fence .rt_step ul li img { display:block; margin:auto; }

.w_fence .contact { background-color:#00A1CB; color:#fff; font-size: 1.4em; font-weight: bold; padding: 1em; text-align: center; margin-top:2em; }
.w_fence .contact li { display: inline-block; margin:0 1em; } 
.w_fence .container { max-width:1200px; margin:auto; }
.w_fence .container h3 { font-weight: 900; text-align: center; padding-top: 2em; }
.w_fence .list { background-color:#F2F3F7; }
.w_fence .list .row { margin:0 -15px; }
.w_fence .list .row .col { flex:0 0 33.333333%; max-width:33.333333%; padding:15px; }
.w_fence .list .row .box { cursor:pointer; position:relative; }
.w_fence .list .row .box:after { content:""; position:absolute; right:40px; bottom:40px; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-top:12px solid #969696;}
.w_fence .list .row .box>b { position:absolute; top:0; left:2%; font-size:2em; color:#999; }
.w_fence .container .row .box { background-color:#FFF; border-radius:1em; padding:30px 40px 36px 40px;  }
.w_fence .container .row .box img { margin:auto; display:block; width:300px; height:300px; object-fit:cover; }
.w_fence .container .row .box ul { margin-top:1.3em; font-size:.9em; font-weight:bold; }
.w_fence .container .row .box ul li { color:#00A0CA; float:left; }
.w_fence .container .row .box ul li:not(:last-child):after { content:">"; position: relative; right:-5px; margin-right:9px; }
.w_fence .container .row .box span { font-weight:bold; font-size:1.15em; margin-top:.6em; display:inline-block; }
.w_fence .container .row .box p { color:#959595; margin:0; }
.w_fence .show .row .box { flex:0 0 32%; max-width:32%; }
.w_fence .show .row .box img { width:250px; height:250px; }
.w_fence .show .row .col table { width:100%; border: 1px solid #EBEBEB; }
.w_fence .show .row .col table tr:not(:last-child) { border-bottom: 1px solid #EBEBEB; }
.w_fence .show .row .col table tr th { background-color:#EBEBEB; }
.w_fence .show .row .col table tr th,
.w_fence .show .row .col table tr td { text-align:center; font-size:.9em; font-weight:bold; padding:.3em; }
.w_fence .show .row .col .btn_box .col:first-child { padding-right:15px; }
.w_fence .show .row .col .btn_box .col:last-child { padding-left:15px; }
.w_fence .show >>> #goods_desc img { max-width:100% !important; }
</style>
