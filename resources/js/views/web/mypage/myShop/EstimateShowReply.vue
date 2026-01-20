<template>
<b-container class="w_fence">
    <h3>견적서 <b>{{reply.er_id}} / Q-{{reply.estimate_req.eq_id}}</b></h3>
    <validation-observer ref="observer" v-slot="{ invalid }" tag="form" class="estimate_show">
        <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed = false" :position="'absolute'">Loading ......</loading-modal>
        <div v-else class="list_wrap">
            <b-container class="top">
                <b-row>
                    <b-col><span>견적일자</span> <b>{{reply.created_at | formatDate_YYYY_MM_DD}}</b></b-col>
                    <b-col><span>유효기간</span> <b>{{reply.er_effective_at}}</b></b-col>
                    <b-col><span>납품기일</span> <b>{{reply.er_dlvy_at}}</b></b-col>
                    <b-col>
                        <span>담당자<span class="m_hide">/문의</span></span>
                        {{reply.estimate_req.mng.name}}
                        {{reply.estimate_req.mng.tel}}
                        {{reply.estimate_req.mng.email}}
                    </b-col>
                </b-row>
            </b-container>
<!--
            <b-form-checkbox class="myCheck" v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk">
                전체 선택
            </b-form-checkbox>
-->
            <b-container v-for="(pa, pa_id) in reply.collect.lists" :key="pa_id" class="goods">
                <h4><b-icon-house></b-icon-house> {{pa[0]['pa_name'] ? '업체' : '포사이언스'}} 배송</h4>
                <b-row v-for="(item, i_item) in pa" :key="`${pa_id}${i_item}`" :class="{option:item.type == 'option'}" class="gm_box">
                    <template v-if="item.type == 'model'">
                        <b-col class="gd_img">
                            <b-form-checkbox class="myCheck" v-model="item.em_check_opt" @change="chkChange" />
                            <img :src="item.img" />
                        </b-col>
                        <b-col class="gd_txt">
                            <div class="explain">
                                <p>{{item.gd_name}}</p>
                                <p><b class="m_hide">제품명:</b>{{item.gm_name}} / <b class="m_hide">Cat.No.:</b>{{item.gm_catno}}</p>
                                <p><b class="m_hide">모델명:</b>{{item.gm_code}} / <b class="m_hide">판매단위:</b>{{item.gm_unit}}</p>
                                <p><b class="m_hide">제조사:</b>{{item.mk_name}}</p>
                                <p><b class="m_hide">사양:</b> <span v-html="nl2br(item.gm_spec)" /></p>
                            </div>
                            <div class="col_price">
                                <div class="price_box">
                                    <span class="normal">{{item.price | comma}}</span>
                                </div>
                                <font-awesome-icon icon="times" />
                                <div>{{item.ea}}</div>
                                <font-awesome-icon icon="equals" />
                                <div class="price_box">
                                    <span class="normal">{{item.price*item.ea | comma | won}}</span>
                                </div>
                            </div>
                            <div class="price_info">
                                ({{item.price*reply.estimate_req.user.mileage_mul*item.ea | comma}}p 적립)
                            </div>
                        </b-col>
                                            
                    </template>
                    <template v-else-if="item.type == 'option'">
                        <b-col class="gd_img">추가 옵션</b-col>
                        <b-col class="gd_txt">
                            <div class="explain">
                                <b>{{item.goc_name}}:</b> {{item.goc_name}}
                            </div>
                            <div class="col_price">
                                <div class="price_box">
                                    <span class="normal">{{item.price | comma}}</span>
                                </div>
                                <font-awesome-icon icon="times" />
                                <div>{{item.ea}}</div>
                                <font-awesome-icon icon="equals" />
                                <div class="price_box">
                                    <span class="normal">{{item.price*item.ea | comma | won}}</span>
                                </div>
                            </div>
                            <div class="price_info">
                                ({{item.price*reply.estimate_req.user.mileage_mul*item.ea | comma}}p 적립)
                            </div>
                        </b-col>
                    </template>
                </b-row>
                <b-row class="dlvy_box" v-if="reply.er_no_dlvy_fee !== 'Y'">
                    <b-col class="text_box">
                        <template v-if="pa[0]['pa_type'] == 'AIR'">항공운임료</template>
                        <template v-else>배송비</template>
                    </b-col>
                    <b-col class="price_box">{{pa[0].pa_dlvy_p_add_vat | comma | won}}</b-col>
                </b-row>
            </b-container>

            <b-container class="total">
                <b-row>
                    <b-col>상품금액</b-col>
                    <b-col><b>{{gd_price+surtax | comma}}</b> 원</b-col>
                </b-row>
                <b-row>
                    <b-col>배송료</b-col>      
                    <b-col><b>{{dlvy_4s+air_price+dlvy_other | comma}}</b> 원</b-col>
                </b-row>
                <b-row>
                    <b-col>결제예정금액</b-col> 
                    <b-col><b>{{all_price | comma}}</b> 원</b-col>
                </b-row>
            </b-container>




       

   
            <b-container class="extra">
                <b-row>
                    <b-col>
                        <h6>추가정보</h6>
                        <template v-if="reply.file_info.length">
                            <div>
                                <b-button v-for="fi in reply.file_info" class="white mr-2" @click="fileDown(fi.down_path, fi.fi_original)" :key="fi.fi_id">
                                    <b-icon icon="file-earmark-arrow-down-fill" /> {{fi.fi_original}}
                                </b-button>
                            </div>
                            <hr>
                        </template>
                        <div class="desc" v-html="nl2br(reply.er_content)" />
                    </b-col>
                    <b-col>
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
                <b-button class="gray lg" :to="{name:'my_estimate'}">목록</b-button>
                <b-button class="d_gray lg" @click="print">견적서 출력</b-button>
                <b-button class="black lg" @click="reEstimate">선택상품 재견적 요청</b-button>
                <b-button v-if="new Date(`${reply.er_effective_at} 23:59:59`) >= new Date()" class="blue lg" @click="settle">선택상품 주문하기</b-button>
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
            reply:{ estimate_req:{eq_id: 0,}, },
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
            this.$router.push({name: 'order_settle', params: { od_goods: rst, od_type: 'buy_estimate', od_er_id:this.$route.params.er_id, er_no_dlvy_fee: this.reply.er_no_dlvy_fee }});
        },

        async reEstimate(){
            const isValid = await this.$refs.observer.validate();
            if (isValid) {
                try {
                    const res = await ax.post(`/api/shop/estimate/reEstimate`, this.reply);
                    if (res && res.status === 200) {
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
            this.surtax = Math.floor(this.gd_price*0.1);
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
h3 { font-size:1.5rem; }
h3 b { color:#0094EA; font-size:1.3rem; }


.list_wrap .top { border-top:2px solid #4F637B; border-left:1px solid #B7B7B7; }
.list_wrap .top .row .col { border-right:1px solid #B7B7B7; border-bottom:1px solid #B7B7B7; padding:1.2rem 0; text-align:center; }
.list_wrap .top .row .col:nth-of-type(4) { flex:0 0 40%; max-width:40%;  }
.list_wrap .top .row .col span { margin-right:.7rem; font-weight:600; }
.list_wrap .top .row .col b { color:#0094EA; }

.list_wrap .myCheck >>> .custom-control-label::before, 
.list_wrap .myCheck >>> .custom-control-label::after { width:1.8rem; height:1.8rem; top:-2px; }

.list_wrap .goods { padding:1em 0; }
.list_wrap .goods h4 { font-weight:bolder; font-size:1em; padding:1em 0; border-width:0; margin:0; border-bottom:2px solid #000; }
.list_wrap .goods .gm_box { padding:.8rem 0 .5rem 0; }
.list_wrap .goods .gm_box:not(:first-child) { border-top:1px solid #AAA; }
.list_wrap .goods .gm_box .myCheck { position:absolute; top:0; left:0; }
.list_wrap .goods .gm_box .gd_img { flex-basis:17%; max-width:17%; display:flex; align-items:center; justify-content:center; }
.list_wrap .goods .gm_box .gd_img img { width:100%; max-width:120px; height:auto; object-fit:contain; }

.list_wrap .goods .gm_box .gd_txt { padding-left:8px; }
.list_wrap .goods .gm_box .gd_txt .explain p { margin:0; color:#999; }
.list_wrap .goods .gm_box .gd_txt .explain p:first-of-type { color:#000; font-weight:700; margin-bottom:.8rem; }
.list_wrap .goods .gm_box .gd_txt .col_price { display:flex; align-items:center; justify-content:flex-end; }
.list_wrap .goods .gm_box .gd_txt .col_price svg { margin:0 .2em; }
.list_wrap .goods .gm_box .gd_txt .price_info { text-align:right; color:#999; }
.list_wrap .goods .gm_box .gd_txt .price_info .price_dc { display:block; color:#cc0000; }
.list_wrap .goods .dlvy_box { padding: 12px 16px; background: #f5f5f5; border-radius: 8px; }
.list_wrap .goods .dlvy_box .col { color:#9e9e9e; font-size:.9em; }
.list_wrap .goods .dlvy_box .price_box { text-align:right; }

.list_wrap .total { background:#EEE; padding:.5rem; border-radius:8px; }
.list_wrap .total .row { align-items:baseline; }
.list_wrap .total .row .col { font-size:.85em; color:#777; flex:0 0 25%; max-width:25%;}
.list_wrap .total .row .col:first-child { margin-left:auto; }
.list_wrap .total .row .col:nth-child(even) { text-align:right; }
.list_wrap .total .row .col:nth-child(even) b { font-size:1.35em; color:#000; }
.list_wrap .total .row.coupon_dc .col,
.list_wrap .total .row.coupon_dc .col b { color:#cc0000 !important; }

.list_wrap .extra { margin-top:2rem; }
.list_wrap .extra .row .col:nth-child(1) { margin-right:2rem; }
.list_wrap .extra .row .col h6 { border-bottom:2px solid #707070; margin-bottom:.7rem; padding-bottom:.5rem; }
.list_wrap .extra .row .col h6 b { color:#0094EA; }
.list_wrap .extra .row .col:nth-child(1) .desc { border:1px solid #D6D6D6; padding:1rem; min-height:158px; }
.list_wrap .extra .row .col .btn { font-size:.85rem; padding:.3rem; }
@media (max-width: 992px){
    .list_wrap .top .row .col { flex:0 0 100%; max-width:100%; padding:0 .3rem; text-align:left; }
    .list_wrap .top .row .col:nth-of-type(4) { flex:0 0 100%; max-width:100%; line-height:1.75; word-spacing:6px; letter-spacing:-1px; text-indent:-77px; padding-left:80px; }
    .list_wrap .top .row .col:nth-of-type(4) span { letter-spacing:8px; margin-right:-4px; }
        
    .list_wrap .total .row .col { flex:0 0 50%; max-width:50%; }
    .list_wrap .total .row .col:first-child { margin-left:0; }

    .list_wrap .extra .row .col { flex:0 0 100%; max-width:100%; margin:0 0 2rem 0 !important; }
}
</style>
