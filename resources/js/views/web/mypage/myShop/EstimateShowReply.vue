<template>
<b-container class="w_fence">
    <h3>견적서 <b>{{reply.er_id}}</b></h3>
    <validation-observer ref="observer" v-slot="{ invalid }" tag="form" class="estimate_show">
        <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">Loading ......</loading-modal>
        <div v-else>
            <b-container class="top">
                <b-row>
                    <b-col><span>견적일자</span> <b>{{reply.created_at | formatDate_YYYY_MM_DD}}</b></b-col>
                    <b-col><span>유효기간</span> <b>{{reply.er_effective_at | formatDate_YYYY_MM_DD}}</b></b-col>
                    <b-col><span>납품기일</span> <b>{{reply.er_dlvy_at}}</b></b-col>
                    <b-col><span>담당자/문의</span> {{reply.user.name}}&nbsp;&nbsp; {{reply.user.tel}}&nbsp;&nbsp; {{reply.user.email}}</b-col>
                </b-row>
            </b-container>

            <h6>상품정보</h6>
            <div class="top_border" />
            <b-container class="pa_list frm_st">
                <b-row class="lhead">
                    <b-col>
                        <b-form-checkbox class="myCheck" v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk" />
                        주문 상품
                    </b-col>        
                    <b-col>제조사</b-col>
                    <b-col>판매가</b-col>
                    <b-col>수량</b-col>
                    <b-col>금액</b-col>
                    <b-col>배송비</b-col>
                </b-row>
                <b-row v-for="(pa, pa_id) in reply.collect.lists" :key="pa_id" class="lbody">
                    <b-col class="m_hide">{{pa[0]['pa_name'] ? '업체' : '포사이언스'}}<br />배송</b-col>
                    <b-col>
                        <b-row v-for="(item, i_item) in pa" :key="`${pa_id}${i_item}`" :class="{option:item.type == 'option'}">
                            <template v-if="item.type == 'model'">
                                <b-col>
                                    <b-form-checkbox class="myCheck" v-model="item.em_check_opt" @change="chkChange" />
                                    <img :src="item.img" />
                                </b-col>
                                <b-col>
                                    <p>{{item.gd_name}}</p>
                                    <p>모델명:{{item.gm_code}} / Cat.No.:{{item.gm_catno}}</p>
                                    <p>제품명:{{item.gm_name}} / 사양:{{item.gm_spec}}</p>
                                    <p>판매단위:{{item.gm_unit}}</p>
                                </b-col>
                                <b-col>{{item.mk_name}}</b-col>
                                <b-col>{{item.price | comma}} 원</b-col>
                                <b-col>{{item.ea}} 개</b-col>
                                <b-col>
                                    <div>
                                        {{item.price*item.ea | comma}} 원
                                        <br />
                                        <span>({{item.price*reply.estimate_req.user.mileage_mul*item.ea | comma}}p 적립)</span>
                                    </div>
                                </b-col>
                            </template>
                            <template v-else-if="item.type == 'option'">
                                <b-col>추가 옵션</b-col>
                                <b-col>{{item.goc_name}}</b-col>
                                <b-col></b-col>
                                <b-col>{{item.price | comma}} 원</b-col>
                                <b-col>{{item.ea}} 개</b-col>
                                <b-col>
                                    <div>
                                        {{item.price*item.ea | comma}} 원
                                        <br />
                                        <span>({{item.price*reply.estimate_req.user.mileage_mul*item.ea | comma}}p 적립)</span>
                                    </div>
                                </b-col>
                            </template>
                        </b-row>
                    </b-col>

                    <b-col>
                        <template v-if="pa[0]['pa_type'] == 'AIR'">항공운임료</template>
                        <template v-else>배송비</template>
                        <br />
                        {{pa[0].pa_dlvy_p_add_vat | comma}} 원
                    </b-col>
                </b-row>

                <b-row class="total">
                    <b-col>상품금액</b-col>         <b-col><b>{{gd_price+surtax | comma}}</b> 원</b-col>
                    <b-col>배송료</b-col>           <b-col><b>{{dlvy_4s+air_price+dlvy_other | comma}}</b> 원</b-col>
                    <b-col>결제 예정 금액</b-col>   <b-col><b>{{all_price | comma}}</b> 원</b-col>
                </b-row>
                <b-row class="total_sub" id="total_sub">
                    <b-col>
                        <div><b-col>상품가</b-col>              <b-col>{{gd_price | comma}} 원</b-col>
                        </div>
                        <div><b-col>부가세</b-col>              <b-col>{{surtax | comma}} 원</b-col>
                        </div>
                    </b-col>
                    <b-col>
                        <div><b-col>포사이언스 배송</b-col>     <b-col>{{dlvy_4s | comma}} 원</b-col>
                        </div>
                        <div><b-col>업체 배송</b-col>           <b-col>{{dlvy_other | comma}} 원</b-col>
                        </div>
                    </b-col>
                    <b-col>
                        <div><b-col>적립예정 마일리지</b-col>   <b-col>{{sum_mileage | comma}} 원</b-col>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
   
            <b-container class="extra">
                <b-row>
                    <b-col>
                        <h6>추가정보</h6>
                        <div>
                            <b-button v-for="fi in reply.file_info" class="white mr-2" @click="fileDown(fi.down_path, fi.fi_original)" :key="fi.fi_id">
                                <b-icon icon="file-earmark-arrow-down-fill" /> {{fi.fi_original}}
                            </b-button>
                        </div>
                        <hr>
                        <div class="desc" v-html="nl2br(reply.er_content)" />
                    </b-col>
                    <b-col >
                        <h6><b>재견적 요청</b></h6>
                        <validation-provider name="견적 요청 내용" rules="required|min:1" v-slot="validationContext">
                            <b-form-group label-for="eq_content" label-class="required">
                                <b-form-textarea id="eq_content" v-model="reply.eq_content" placeholder="재견적 요청 내용..." rows="6" :state="getValidationState(validationContext)"></b-form-textarea>
                                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>
            </b-container>

            <div class="btn_box">
                <b-button class="black lg" @click="print">견적서 출력</b-button>
                <b-button class="gray lg" @click="reEstimate">선택상품 재견적 요청</b-button>
                <b-button class="blue lg" @click="settle">선택상품 주문하기</b-button>
            </div>
        </div>
    </validation-observer>
</b-container>    
</template>

<script>
import ax from '@/api/http';
import { Validator } from 'vee-validate';

export default {
    name: "mypageEstimateReplyShow",
    components: { 'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'), },
    data() {
        return {
            isLoadingModalViewed: true,
            reply:{},
            gd_price: 0,
            surtax: 0,
            dlvy_4s: 0,
            dlvy_other: 0,
            air_price: 0,
            all_price: 0,
            sum_mileage: 0,
            indeterminate:false,
            all_chk:true,
        }
    },
    computed: {
        
    },
    methods:{
        settle() {
            let rst = [];
            let is_model_check = false;
            for (var pa_id in this.reply.collect.lists) {
                for (var em of this.reply.collect.lists[pa_id]) {
                    if (em.type=='model') {
                        if (em.ea > 0 && em.em_check_opt) {
                            rst.push({gd_id:em.gd_id, em_id:em.em_id});
                            is_model_check = true;
                        } else is_model_check = false;
                    }
                    if (em.type == 'option' && is_model_check)
                        rst.push({gd_id:em.gd_id, eo_id:em.eo_id});
                }
            }
            if (!rst.length) {
                Notify.modal("모델을 선택하세요", 'info');
                return false;
            }
            this.$router.push({name: 'order_settle', params: { od_goods: rst, od_type: 'buy_estimate', od_er_id:this.$route.params.er_id }});
        },

        async reEstimate(){
            const isValid = await this.$refs.observer.validate();
            if (isValid) {
                try {
                    const res = await ax.post(`/api/shop/estimate/reEstimate`, this.reply);
                    if (res && res.status === 200) {
                        console.log(res);
                        Notify.toast('success', '견적 요청 완료')
                        this.$router.push({name: 'my_estimate'});
                    } else {
                        Notify.toast('warning', res);
                    }
                } catch (e) {
                    Notify.consolePrint(e);
                    Notify.toast('warning', e.responsee);
                }
            } else {
                document.getElementById('eq_content').focus();
            }
        },

        print () {
            var url = `/api/shop/estimate/printEstimate/${this.$route.params.er_id}`;
            var name = "견적서 인쇄";
            var option = "width = 900, height = 900, top = 10, left = 10, location = no"
            window.open(url, name, option);
        },
        
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        calculator() {
            let collect = {};
            let sum_mileage = 0;
            let dlvy_other = 0;
            let is_model_check = false;
            for (var pa_id in this.reply.collect.lists) {
                for (var em of this.reply.collect.lists[pa_id]) {
                    if (em.type=='model') {
                        if( em.em_check_opt ){
                            if (!collect.hasOwnProperty(pa_id)) {
                                if (pa_id>0 && em.pa_type == "AIR")
                                    collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(em.pa_dlvy_p_add_vat)};
                                else
                                    collect[pa_id] = { 'goods':0, 'dlvy':Number(em.pa_dlvy_p_add_vat), 'free_dlvy_max':Number(this.reply.goods.free_dlvy_max), 'air':0};
                            }

                            collect[pa_id].goods += Number(em.price) * Number(em.ea);
                            sum_mileage += em.price*this.reply.estimate_req.user.mileage_mul*em.ea;
                            is_model_check = true;
                        } else is_model_check = false;
                    }
                    if (em.type == 'option' && is_model_check) {
                        collect[pa_id].goods += Number(em.price) * Number(em.ea);
                        sum_mileage += em.price*this.reply.estimate_req.user.mileage_mul*em.ea;
                    }
                }
            }
// console.log(collect);
            this.gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            this.air_price = Object.values(collect).reduce((acc, el) => acc + el.air, 0);
            this.surtax = Number((this.gd_price*0.1).toFixed());
            for (var key in collect) {
                if(key == 0) {
                    if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) this.dlvy_4s = Number(collect[key].dlvy);                    
                } else {
                    if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) dlvy_other += Number(collect[key].dlvy);
                }
            }
            this.dlvy_other = dlvy_other;
            this.sum_mileage = sum_mileage;
            this.all_price = this.gd_price+this.surtax+this.dlvy_4s+this.air_price+dlvy_other;
        },
        chkChange () {
            let chkCnt = Object.values(this.reply.collect.lists).reduce(function(acc, pa) {
                return acc + pa.filter(el => el.em_check_opt==true).length;
            }, 0);

            if (chkCnt === 0) {
                this.indeterminate = false;
                this.all_chk = false;
            } else if (chkCnt === this.reply.estimate_model.length) {
                this.indeterminate = false;
                this.all_chk = true;
            } else {
                this.indeterminate = true;
                this.all_chk = false;
            }

            this.calculator();
        },

        toggle_all_chk(checked) {
            Object.values(this.reply.collect.lists).forEach(el => {
                el.forEach(el02 => {
                    el02.em_check_opt = checked ? true : false;
                });
            });
            this.indeterminate = false;
        },
    },
    async mounted() {
        const res = await ax.get(`/api/shop/estimate/reply/${this.$route.params.er_id}`);
        if (res && res.status === 200) {
            this.reply = res.data;
            this.isLoadingModalViewed= false;
            this.calculator();
        }   
    },

}
</script>

<style lang="css" scoped>

.w_fence { padding-right:0; padding-left:0; }
.w_fence .container,
.w_fence .container .row, 
.w_fence .container .row .col { margin:0; padding:0; }
h3 { font-size:1.5rem; }
h3 b { color:#0094EA; font-size:1.3rem; }
h6 { font-size:1.15rem; font-weight:600; margin-top:2rem; padding-left:2rem; }
.w_fence .top { border-top:2px solid #4F637B; border-left:1px solid #B7B7B7; }
.w_fence .top .row .col { border-right:1px solid #B7B7B7; border-bottom:1px solid #B7B7B7; padding:1.2rem 0; text-align:center; }
.w_fence .top .row .col:nth-of-type(4) { flex:0 0 40%; max-width:40%;  }
.w_fence .top .row .col span { margin-right:.7rem; font-weight:600; }
.w_fence .top .row .col b { color:#0094EA; }

.w_fence .top_border { border-top:3px solid #4F637B; }


/************************************** */
.pa_list { margin-bottom:2.5rem; padding:0; }
.pa_list .row { margin:0; border-bottom:1px solid #D6D6D6; }
.pa_list .row .col { padding:0; font-size:.93rem; color:#666; }
.pa_list .row.lbody .col:not(:nth-of-type(2)) { display:flex; align-items:center; justify-content:center; text-align:center; }

.pa_list .row .col .row:last-child { border-bottom-width:0; }
.pa_list .row.lbody>.col:first-child { border-right:1px solid #D6D6D6; }
.pa_list .row.lbody>.col:last-child { border-left:1px solid #D6D6D6; }

.pa_list .lhead .col { font-weight:bold; text-align:center; padding:.74rem 0 !important; color:#000; }
.pa_list .lhead .col:nth-of-type(2) { flex-basis:11.2%; max-width:11.2%; }
.pa_list .lhead .col:nth-of-type(3) { flex-basis:8.8%; max-width:8.8%; }
.pa_list .lhead .col:nth-of-type(4) { flex-basis:7.2%; max-width:7.2%; }
.pa_list .lhead .col:nth-of-type(5) { flex-basis:9.6%; max-width:9.6%; }
.pa_list .lhead .col:nth-of-type(6) { flex-basis:10%; max-width:10%; }

.pa_list .lbody>.col:nth-of-type(1),
.pa_list .lbody>.col:nth-of-type(3) { flex-basis:10%; max-width:10%; font-weight:600; color:#000; }
.pa_list .lbody .col .row .col:nth-of-type(1) { flex-basis:18%; max-width:18%; }
.pa_list .lbody .col .row .col:nth-of-type(3) { flex-basis:14%; max-width:14%; }
.pa_list .lbody .col .row .col:nth-of-type(4) { flex-basis:11%; max-width:11%; justify-content:flex-end; padding-right:.5rem; }
.pa_list .lbody .col .row .col:nth-of-type(5) { flex-basis:9%; max-width:9%; justify-content:flex-end; padding-right:.5rem; }
.pa_list .lbody .col .row .col:nth-of-type(6) { flex-basis:12%; max-width:12%; font-weight:600; color:#000; justify-content:flex-end; padding-right:.5rem; }
.pa_list .lbody .col .row .col:nth-of-type(6) span { font-size:.7rem; color:#666;  }

.pa_list .row .col .row.option { background:#F4F1EC; }
.pa_list .row .col .row .col { padding:.8rem 0; }
.pa_list .row .col .row .col img { width:119px; height:119px; object-fit:contain; }
.pa_list .row .col .row .col p { margin-bottom:.2rem; }
.pa_list .row .col .row .col:nth-of-type(2) { padding-left:1rem; }
.pa_list .row .col .row .col:nth-of-type(2) p:nth-of-type(1){ font-weight:bold; margin-bottom:.8rem; color:#000; }
.pa_list .row .col >>> .myCheck { display:inline-block; padding-left:1.3em; margin:0 .5rem; }
.pa_list .row .col >>> .myCheck .custom-control-label::before, 
.pa_list .row .col >>> .myCheck .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px; }

.pa_list .total { margin-top:1.6rem; border-top:2px solid #363636; border-bottom:1px solid #D6D6D6; }
.pa_list .total .col { color:#000; font-weight:bold; }
.pa_list .total .col:nth-of-type(odd) { display: flex; align-items: center; flex-basis: 12%; max-width: 12%; padding: 1vw 0 1vw 2vw; font-size: .9vw; }
.pa_list .total .col:nth-of-type(even) { text-align: right; padding: 1vw 2vw 1vw 0; }
.pa_list .total .col:nth-of-type(2):after,
.pa_list .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.32rem; top:50%; transform:translateY(-50%); }
.pa_list .total .col b { font-size:1.4rem; }
.pa_list .total .col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.pa_list .total .col:nth-of-type(2):after { content:"+"; }
.pa_list .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }
.pa_list .total .col:nth-of-type(4):after { content:"="; }
.pa_list .total .col:nth-of-type(5) { flex-basis:20%; max-width:20%; }
.pa_list .total .col:nth-of-type(6) { flex-basis:20%; max-width:20%; }

.pa_list .total_sub { background:#F2F3F5; border-bottom-width:0; }
.pa_list .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.pa_list .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.pa_list .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }
.pa_list .total_sub .col>div { display:flex; flex-wrap:wrap; }
.pa_list .total_sub .col>div:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem; }
.pa_list .total_sub .col>div:nth-of-type(2) { padding:0 3rem 2.5rem 3rem; }
.pa_list .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.pa_list .total_sub .col>div .col:nth-of-type(2) { text-align:right; }
/************************************** */





.w_fence .extra { margin-top:2rem; }
.w_fence .extra .row .col:nth-child(1) { margin-right:2rem; }
.w_fence .extra .row .col h6 { border-bottom:2px solid #707070; margin-bottom:.7rem; padding-bottom:.5rem; }
.w_fence .extra .row .col h6 b { color:#0094EA; }
.w_fence .extra .row .col:nth-child(1) .desc { border:1px solid #D6D6D6; padding:1rem; min-height:calc(3vw + 5rem); }
.w_fence .extra .row .col .btn { font-size:.85rem; padding:.3rem; }

</style>
