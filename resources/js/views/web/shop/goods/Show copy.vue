<template>
    <b-container id="goods_show">
        <!-- <Location :categorys="categorys" 
            :p_ca01="content.goods_category_first.gc_ca01" 
            :p_ca02="content.goods_category_first.gc_ca02" 
            :p_ca03="content.goods_category_first.gc_ca03" 
            :p_ca04="content.goods_category_first.gc_ca04"  /> -->
        <b-row class="atrium" :class="{fixed:isScrollPass}">
            <b-col class="rack"></b-col>
            <b-col class="conLeft">
                <b-carousel
                    :interval="4000"
                    indicators
                    controls
                    style="border:1px solid #D8D8D8;"
                >
                    <b-carousel-slide v-for="(row, idx) in content.image_src" :key="idx" :img-src="row" />
                </b-carousel>

                <ul>
                    <li>
                        <div>제조사</div>
                        <div>{{content.maker.mk_name}}</div>
                    </li>
                    <li>
                        <div>배송료</div>
                        <div>{{content.dlvy_fee | comma}}원</div>
                    </li>
                    <li>
                        <div>배송정보</div>
                        <div>10만원 이상 구매시 기본택배 배송료 무료</div>
                    </li>
                    <li>
                        <div>납기일</div>
                        <div>{{content.gd_dlvy_at}}</div>
                    </li>
                    <li>
                        <div>담당자</div>
                        <div>{{mngTel}}</div>
                    </li>
                </ul>

                <ul v-if="content.purchase_at">
                    <li>
                        <div>직배송업체명</div>
                        <div>{{content.purchase_at.pa_name}}</div>
                    </li>
                    <li>
                        <div>배송타입</div>
                        <div>{{content.purchase_at.pa_type}}</div>
                    </li>
                    <li>
                        <div>배송료</div>
                        <div>{{content.purchase_at.pa_price_add_vat | comma}}원</div>
                    </li>
                </ul>

                <ul v-if="content.file_goods_add.length">
                    <li>
                        <div>첨부파일</div>
                        <div>
                            <b-button v-for="(file, i) in content.file_goods_add" :key="i" @click="fileDown(`api/downloadGoods/${file.fi_id}`, file.fi_original)">{{file.fi_original}}</b-button>
                            <!-- <b-button v-for="(file, i) in content.file_goods_add" :key="i" @click="fileDown('api/downloadGoods/1760', file.fi_original)">{{file.fi_original}}</b-button> -->
                            
                        </div>
                    </li>
                </ul>
            </b-col>

            <b-col class="conRight">
                <h3>{{content.gd_name}}</h3>
                
                <div class="model">
                    <b-row>
                        <b-col>Cat.No.</b-col>
                        <b-col>모델명</b-col>
                        <b-col>제품명</b-col>
                        <b-col>사양</b-col>
                        <b-col>판매단위</b-col>
                        <b-col>판매가</b-col>
                        <b-col>수량</b-col>
                    </b-row>
                
                    <b-row v-for="gm in content.goods_model" :key="gm.gm_id" :class="{'selected': gm.ea}">
                        <b-col>{{gm.gm_catno}}</b-col>
                        <b-col>{{gm.gm_code}}</b-col>
                        <b-col>{{gm.gm_name}}</b-col>
                        <b-col>{{gm.gm_spec}}</b-col>
                        <b-col>{{gm.gm_unit}}</b-col>
                        <b-col>{{gm.gm_price_add_vat | comma}}</b-col>
                        <b-col><vue-numeric-input align="center" :min="0" width="100%" v-model="gm.ea"></vue-numeric-input></b-col>
                    </b-row>
                </div>
                
                <div class="goods_option" v-if="content.option && content.option.length">
                    <ul class="opt">
                        <li v-for="(op, i) in content.option"
                            :key="op.op_id"
                            @click="op.show = !op.show"
                            v-click-outside:option_hide="i"
                        >
                            {{op.op_name}} <b-badge variant="danger" v-if="op.op_required == 'Y'">필수</b-badge>
                            <ul :class="{focus:op.show}">
                                <li v-for="opc in op.option_child" :key="opc.opc_id" @click="opc.show=true, opc.ea++">
                                    <span>{{opc.opc_name}}</span>
                                    <span>{{opc.opc_price_add_vat | comma}} 원</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="selOpt" v-if="selOpt_cnt">
                        <template v-for="op in content.option">
                            <template v-for="opc in op.option_child">
                                <li v-if="opc.show" :key="opc.opc_id">
                                    <span class="cellName">{{opc.opc_name}} <b-badge variant="danger" v-if="op.op_required == 'Y'">필수</b-badge></span>
                                    <span class="cellCalc">
                                        <span class="opt_p">{{opc.opc_price_add_vat | comma}}</span>
                                        <font-awesome-icon icon="times" />
                                        <vue-numeric-input align="center" :min="1" width="85px" v-model="opc.ea" @blur="checkValue(opc)"></vue-numeric-input>
                                        <font-awesome-icon icon="equals" />
                                        <span class="sum_p">{{opc.opc_price_add_vat*opc.ea | comma}} 원</span>
                                        <span @click="opc.show=false, opc.ea=0" class="delOpt">X</span>
                                    </span>
                                </li>
                            </template>
                        </template>
                    </ul>
                </div>

                <div class="pick_info">
                    <div v-if="content.goods_model" class="total">
                        상품 갯수 <b class="cnt">{{pick_cnt}} 개</b> 합계 <b class="price">{{total | comma}} 원</b>
                    </div>
                    <b-button-group>
                        <b-button @click="action('pay')">바로구매</b-button>
                        <b-button @click="action('wish')">관심상품</b-button>
                        <b-button @click="action('putCart')">장바구니</b-button>
                        <b-button @click="action('estimate')">견적요청</b-button>
                    </b-button-group>
                </div>
                
                <scrollactive class="goods_nav">
                    <a class="scrollactive-item" href="#goods_desc">상품 상세</a>
                    <a class="scrollactive-item" href="#return_info">반품/교환 안내</a>
                    <a class="scrollactive-item" href="#review">상품 리뷰 <b>{{bo_cnt.review}}</b></a>
                    <a class="scrollactive-item" href="#gd_inquiry">Q & A <b>{{bo_cnt.inquiry}}</b></a>
                </scrollactive>

                <b-row id="goods_desc">
                    <b-col v-html="content.gd_desc"></b-col>
                </b-row>

                <div class="desc_pdf">
                    <br /> <hr /> <br />
                    <template v-for="(file, i) in content.file_goods_add" >
                        <object v-if="file.type == 'pdf'" :key="i" :data="file.path" type="application/pdf" style="width:1100px; height:700px;" />
                    </template>
                </div>

                <!-- 반품/교환 안내 -->
                <div class="goods_desc_piece" id="return_info">
                    <h4 class="tit">반품/교환 안내</h4>
                    <em>포사이언스에서는 다음과 같은 기간 및 내용으로 상품 및 용역에 대하여 교환, 반품, 환불을 보장하고 있으며, 상품의 반환에 의한 추가비용을 고객에게 부담시키지 않습니다.<br>(단, 고객 변심 또는 주문 번복으로 인한 경우의 반환비용은 고객님이 부담하셔야 합니다.)</em><br><br>

                    1. 단순변심일경우 : 물품수령 후 7일이내 반품가능(반품배송비 구매자가 부담) <br>
                    2. 표시, 광고 내용과 상이하거나 물품 하자인 경우 : 물품수령 후 3개월이내, 또는 그 사실을 안날 또는 알수 있었던 날로부터 30일이내 반품가능 (반품배송비 판매자가 부담)<br><br>

                    <em>단, 아래의 내용인 경우에는 교환/반품/환불이 불가능하오니 참조하시기 바랍니다.</em><br><br>

                    1. 반품요청기간이 지난 경우<br>
                    2. 고객님의 책임있는 사유로 상품등이 멸실 또는 훼손된 경우(단 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)<br>
                    3. 주문 당시 해외 발주 상품의 경우<br>
                    4. 고객의 요청으로 주문제작이 이루어진 경우<br>
                    5. 포장을 개봉하였거나 포장이 훼손되어 상품의 가치가 현저하게 감소한 경우<br>
                    6. 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우<br>
                    7. 재판매가 곤란한 정도로 상품등의 가치가 현저히 감소한 경우<br>
                    8. 복제가 가능한 상품 등의 포장을 훼손한 경우<br><br>

                    주문 취소 및 반품으로 환불을 요청하실 경우에는 E-mail(sales@4science.net) 상담서비스나 고객만족센터(1644-4214)를 통해 요청하시면 친절하게 처리해 드리겠습니다.<br>
                    주문 취소 후 반품 가능 여부를 확인한 다음 3일 이내에 결제 금액을 환불해 드리겠습니다.
                </div>

                <!-- 상품평 -->
                <div class="goods_desc_piece" id="review">
                    <div class="tit">
                        <h4>상품 리뷰 <i>{{bo_cnt.review}}</i></h4>
                        <p>본 상품을 주문하신 고객님께서 작성하신 리뷰입니다.</p>
                    </div>
                    <BoReview :bo_cd="'review'" :bo_cnt="bo_cnt" />
                </div>

                <!-- 상품문의 -->
                <div class="goods_desc_piece" id="gd_inquiry">
                    <div class="tit">
                        <h4>Q & A <i>{{bo_cnt.inquiry}}</i></h4>
                        <p>
                            본 상품에 대해 궁금한 점이 있으신가요?
                            <b-button @click="create" variant="light">문의하기</b-button>
                        </p>
                    </div>
                    <bo-gd-inquiry :bo_cd="'gd_inquiry'" :bo_cnt="bo_cnt" ref="gd_inquiry" />
                </div>
            </b-col><!-- conRight -->
        </b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
// import { Splide, SplideSlide } from '@splidejs/vue-splide';
// import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import VueNumericInput from 'vue-numeric-input'
// https://github.com/JayeshLab/vue-numeric-input
import { mapState } from 'vuex';
import BoGdInquiry from './_comp/BoGdInquiry.vue'


export default {
    directives:{
        "click-outside" : {
            bind: function (el, binding, vnode) {
                el.clickOutsideEvent = function (event) { 
                    if (!(el == event.target || el.contains(event.target)))
                        vnode.context[binding.arg](event, binding.value);
                };
                document.body.addEventListener('click', el.clickOutsideEvent)
            },
            unbind: function (el) {
                document.body.removeEventListener('click', el.clickOutsideEvent)
            },
        }
    },
    components: {
        // 'Location': () => import('./_comp/Location.vue'),
        // Splide, SplideSlide,
        VueNumericInput,
        'BoReview': () => import('./_comp/BoReview.vue'),
        BoGdInquiry,
    },
    data() {
        return {
            isScrollPass: false,
            headTop:0,
            footer_h: 560,
            interval: null,
            // categorys: {},
            content:{
                maker:{},   /// 릴레이션 로딩시간으로 인해 초기에 값이 없다는 에러를 대처하기 위해 초기값 세팅
                image_src:{},
                goods_category_first:{},
                file_goods_add:[]
            },
            hadModelEa: false,
            bo_cnt:{
                review:0,
                inquiry:0,
            }
            
/*            slide_options: {
                // rewind      : true,
                type:         'loop',
                focus:        'center',
                perPage:      1,
                gap:          '1rem',
                autoplay:     true,
                pauseOnHover: false,
                // height:       '280px',
                // fixedWidth: '232px',
                padding: { left : '4rem', right: '4rem', }

            },*/
        }
    },
    watch: {
        '$route.params.gd_id': function (gd_id) {
            this.show();
        },
        // 'content.goods_model': {
        //     handler(val, oldVal) {
        //         this.hadModelEa = !isEmpty(this.paramModel());
        //     },
        //     deep: true
        // },
    },
    computed: {
        ...mapState('cart', ['cartList']),
        mngTel: function () {
            let mng_tel='';
            if (this.content.gd_mng_info) {
                mng_tel = this.content.gd_mng_info;
            } else if (this.content.ca04 && this.categorys[3].filter(ca => ca.ca_id == this.content.ca04)[0].ca_tel) {
                mng_tel = this.categorys[3].filter(ca => ca.ca_id == this.content.ca04)[0].ca_tel;
            } else if (this.content.ca03 && this.categorys[2].filter(ca => ca.ca_id == this.content.ca03)[0].ca_tel) {
                mng_tel = this.categorys[2].filter(ca => ca.ca_id == this.content.ca03)[0].ca_tel;
            } else if (this.content.ca02 && this.categorys[1].filter(ca => ca.ca_id == this.content.ca02)[0].ca_tel) {
                mng_tel = this.categorys[1].filter(ca => ca.ca_id == this.content.ca02)[0].ca_tel;
            }
            return mng_tel;
        },
        total: function() {
            let model =  this.content.goods_model.reduce((acc, el) => {
                return acc + parseInt(el.gm_price_add_vat * el.ea);
            }, 0);
            let option =  this.content.option.reduce((acc, el) => {
                return acc + el.option_child.reduce((acc02, el02) => {
                    return acc02 + parseInt(el02.opc_price_add_vat * el02.ea);
                }, 0);
            }, 0);
            return model+option;
        },
        pick_cnt: function() {
            let model =  this.content.goods_model.filter(gm => gm.ea > 0).length
            let option =  this.content.option.reduce((acc, el) => {
                return acc + el.option_child.filter(opc => opc.ea > 0).length
            }, 0);
            return model+option;
        },
        selOpt_cnt: function() {
            return this.content.option.reduce((acc, el) => {
                return acc + el.option_child.filter(opc => opc.ea > 0).length
            }, 0);
        },

        // categorys[2].filter(ca => ca.ca_id == v_model.ca03)[0].ca_name
    },
    methods: {
        async show() {
            const res = await ax.get(`/api/shop/goods/${this.$route.params.gd_id}`);
            if (res && res.status === 200) {
                this.content = res.data.goods;
                // this.categorys = res.data.categorys;
            }
        },
        action(type) {            
            let params = this.makeParam();
            let cntModel = params.reduce(function(acc, el) {
                return (el.hasOwnProperty('gm_id')) ? acc+1 : acc;
            }, 0);

            if (!cntModel) {
                Notify.modal("모델을 선택하세요");
                return false;
            }
            switch (type) {
                case "pay":
                    let required_key = Array();
                    let required_key_cnt = 0;
                    this.content.option.forEach(op => {
                        if (op.op_required == 'Y')
                            required_key.push(op.op_id);
                    });
                    
                    required_key.forEach(k => {
                        params.forEach(item => {
                            if (item.hasOwnProperty('opc_id') && item.op_id == k) {
                                required_key_cnt++;
                                return false;
                            }
                        });
                    });

                    if (required_key_cnt !== required_key.length) {
                        Notify.modal("필수 옵션을 선택하셔야 합니다.");
                        return false;
                    }
                    this.$router.push({name: 'order_settle', params: { od_goods: params, od_type: 'buy_inst' }});
                break;

                case "putCart":
                    this.$store.dispatch('cart/examine', {goods:this.content, params:params});
                break;

                case "wish":
                    this.$store.dispatch('cart/examine', this.content);
                break;

                case "estimate":
                    this.$router.push({name: 'estimate_create', params: { od_goods: params, od_type: 'request_estimate' }});
                break;
            }
        },

        makeParam () {
            let params = [];
            this.content.goods_model.forEach(gm => {
                if (gm.ea > 0) params.push({gd_id:this.content.gd_id, gm_id:gm.gm_id, ea:gm.ea});
            });
            this.content.option.forEach(op => {
                op.option_child.forEach(opc => {
                    if (opc.ea > 0) params.push({gd_id:this.content.gd_id, op_id:op.op_id, opc_id:opc.opc_id, ea:opc.ea});
                });
            });
            return params;
        },
        // paramModel () {
        //     return this.content.goods_model.reduce((acc, el) => {
        //         if (el.ea > 0)
        //             acc.push({gm_id:el.gm_id, ea:el.ea});
        //         return acc;
        //     }, []);
        // },
        // paramOption () {
        //     return this.content.option.reduce((acc, el) => {
        //         return acc.concat(el.option_child.reduce((acc02, el02) => {
        //             if (el02.ea > 0) acc02.push({op_id:el02.opc_op_id, opc_id:el02.opc_id, ea:el02.ea});
        //             return acc02;
        //         }, []));
        //     }, []);
        // },
        option_hide(e, idx) {
            this.$set(this.content.option[idx], 'show', false);
        },
        checkValue(opc) {
            if (Number.isNaN(opc.ea)) {
                this.$set(opc, 'ea', 0);
                this.$set(opc, 'show', false);
            }
        },

        create () {
            this.$refs.gd_inquiry.create();
        },

        scrollListener: function (e) {
            const head_top=139;
            this.isScrollPass = window.scrollY >= head_top;
            let is_bottom = (window.innerHeight + window.scrollY) >= (this.scrollHeight-this.footer_h);
            if (this.isScrollPass) {
                if (!is_bottom)
                    this.headTop = window.scrollY-head_top;
            } else
                this.headTop = 0; 


        },
        
    },
    mounted() {
        this.show();
        window.addEventListener('scroll', this.scrollListener);
        this.interval = setInterval(() => {
            this.scrollHeight = document.body.scrollHeight;
        }, 100);
    },

    beforeDestroy() { window.removeEventListener('scroll', this.scrollListener); },
    destroyed() { clearInterval(this.interval); },

}
</script>

<style lang="css" scoped>
#goods_show { margin-top:3rem; }
#goods_show>.row>.col { padding:0; }
#goods_show .atrium { align-items:flex-start; }
.atrium .rack { flex-basis:0px; max-width:0px; }
.atrium .conLeft { flex-basis:500px; max-width:500px; height:auto; max-height:90vh; overflow:auto; }
.atrium.fixed .conLeft { position:fixed; z-index:2; top:82px; }
.atrium.fixed .rack { flex-basis:500px; max-width:500px; }
.conLeft .carousel >>> .carousel-inner .carousel-item img { width:100%; height:498px; object-fit:cover; }
/*.conLeft ul li:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.conLeft ul li div { float:left; font-size:1.5rem; }*/
.conLeft ul { margin:1rem 0 0 1rem; padding:1rem 0 0 1rem; border-top:1px solid #D7D7D7; }
.conLeft ul li { display:flex; line-height:1.5rem; }
.conLeft ul li div { font-size:.9rem; }
.conLeft ul li div:nth-child(1) { flex-basis:30%; min-width:100px; font-weight:bold; }

.conRight { border-top:1px solid #D8D8D8; margin-left:10px; color:#000; }
.conRight h3 { padding:1.1rem .5rem; font-weight:bold; }
.conRight .model .row { margin:0; }
.conRight .model .row:nth-of-type(1) .col { font-weight:bold; padding:.4rem .3rem; font-size:.9rem; }
.conRight .model .row.selected { background:#FFFBCC; }
.conRight .model .row .col { border:1px solid #CCC; padding:.8rem .3rem; text-align:center; }
.conRight .model .row .col:not(:last-child) { border-right-width:0; }
.conRight .model .row:not(:last-child) .col { border-bottom-width:0; }

.conRight .model .row .col:nth-of-type(1) { flex-basis:13%; max-width:13%; }
.conRight .model .row .col:nth-of-type(2) { flex-basis:13%; max-width:13%; }
.conRight .model .row .col:nth-of-type(5) { flex-basis:8%; max-width:8%; }
.conRight .model .row .col:nth-of-type(6) { flex-basis:11%; max-width:11%; }
.conRight .model .row .col:nth-of-type(7) { flex-basis:10%; max-width:10%; }
.conRight .model .row .col:nth-of-type(7) .vue-numeric-input { height:1.3rem; }
.conRight .model .row .col:nth-of-type(7) .vue-numeric-input >>> button { width:1.2rem; }
.conRight .model .row .col:nth-of-type(7) .vue-numeric-input >>> .numeric-input { padding:2px 1rem; }

.conRight .pick_info { text-align:right; }
.conRight .pick_info .total { padding-right:2rem; font-weight:bold; margin-top:1.5rem; }
.conRight .pick_info .total b { font-weight:900; color:#1A90D6; }
.conRight .pick_info .total b.cnt { margin-right:2rem; }
.conRight .pick_info .total b.price { font-size:1.7rem; }
.conRight .pick_info .btn-group { margin-top:1.5rem; }
.conRight .pick_info .btn-group .btn { border-color:#CCC; color:#333; background:#fff; font-weight:bold; padding:.375rem 1.8rem; }
.conRight .pick_info .btn-group .btn:nth-of-type(1) { background:#1A90D6; color:#fff; }

.conRight .goods_option .opt>li { position:relative; margin:1rem 0; padding:.5rem 0; cursor:pointer; border:1px solid #898989; text-indent:1rem; }
.conRight .goods_option .opt>li:after { content:''; position:absolute; right:13px; top:16px; width:0; height:0; border-top:6px solid #3A3B3D; border-left:7px solid transparent; border-right:7px solid transparent; }
.conRight .goods_option .opt>li>span { text-indent:0; }
.conRight .goods_option .opt li ul { position:absolute; z-index:2; width:100%; overflow:hidden; max-height:0; transition:all .3s; background:#fff; }
.conRight .goods_option .opt li ul.focus { max-height:1000px; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); border:1px solid #CDCDCD; }
.conRight .goods_option .opt li ul li { padding:.5rem; }
.conRight .goods_option .opt li ul li:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.conRight .goods_option .opt li ul li:hover { background:#FFFBCC; }
.conRight .goods_option .opt li ul li span:nth-of-type(1) { float:left; }
.conRight .goods_option .opt li ul li span:nth-of-type(2) { float:right; }

.conRight .goods_option .selOpt { padding-bottom:.4rem; border-bottom:1px solid #D8D8D8; }
.conRight .goods_option .selOpt li { padding:.4rem 1rem; background:#EBEBEB; }
.conRight .goods_option .selOpt li:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.conRight .goods_option .selOpt li .cellName { width:50%; float:left; }
.conRight .goods_option .selOpt li .cellCalc { float:right; width:50%; text-align:right; }
.conRight .goods_option .selOpt li .cellCalc svg { margin:0 1rem; }
.conRight .goods_option .selOpt li .cellCalc .vue-numeric-input { height:1.3rem; display:inline-block; }
.conRight .goods_option .selOpt li .cellCalc .vue-numeric-input >>> button { width:1.2rem; }
.conRight .goods_option .selOpt li .cellCalc .vue-numeric-input >>> .numeric-input { padding:2px 1rem; }
.conRight .goods_option .selOpt li .cellCalc .opt_p { min-width:90px; display:inline-block; }
.conRight .goods_option .selOpt li .cellCalc .sum_p { min-width:90px; display:inline-block; }
.conRight .goods_option .selOpt li .cellCalc .delOpt { font-size:.8rem; cursor:pointer; max-width:30px; width:100%; display:inline-block; }


.conRight .goods_nav { position:sticky; top:80px; z-index:1; background:#B2BFC5; display:flex; padding-left:3rem; margin-top:2rem; }
.conRight .goods_nav a { color:#FFF; padding:7px 22px; border-radius:2rem; margin:.7rem; font-weight:bold; }
.conRight .goods_nav a b { color:#4E6F8E; }
.conRight .goods_nav a.is-active { background:#4F708F; }
.conRight .goods_nav a.is-active b { color:#fff; }

.conRight #goods_desc { margin-top:50px; }
.conRight #goods_desc >>> img { max-width:100%; }
.conRight .desc_pdf { margin-top:3rem; }

.conRight .goods_desc_piece { margin-top:3rem; }
.conRight .goods_desc_piece h4 { font-size:1.5rem; font-weight:bold; }
.conRight .goods_desc_piece h4 i { font-size:.9rem; color:#898989; font-style:normal; }
.conRight .goods_desc_piece .tit { border-bottom:2px solid #000; padding-bottom:.9rem; }
.conRight .goods_desc_piece .tit p { font-size:.9rem; color:#898989; margin-bottom:.4rem;}

.conRight  #return_info { font-size:.8rem; font-weight:600; }
.conRight  #return_info .tit { margin-bottom:1.2rem; }
.conRight  #return_info em { color:#ce0000; font-weight:bold; }

.conRight  #gd_inquiry .tit button { margin-left:1rem; border-color:#898989; }
/*
<div class="cube_box">
    <div class="cube">
        <div class="piece front">front</div>
        <div class="piece back">back</div>
        <div class="piece right">right</div>
        <div class="piece left">left</div>
        <div class="piece top">top</div>
        <div class="piece bottom">bottom</div>
    </div>
</div>

.cube_box, .cube_box * { box-sizing: border-box; }
.cube_box { width: 200px; height: 200px; border: 1px solid #CCC; margin: 80px; perspective: 400px; }
.cube_box .cube {
    position: relative; transform-style: preserve-3d;
     width: 200px; height: 200px;
    transform: translateZ(-100px); transition: transform 1s; }

.cube.show-front  { transform: translateZ(-100px) rotateY(   0deg); }
.cube.show-right  { transform: translateZ(-100px) rotateY( -90deg); }
.cube.show-back   { transform: translateZ(-100px) rotateY(-180deg); }
.cube.show-left   { transform: translateZ(-100px) rotateY(  90deg); }
.cube.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
.cube.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }

.cube_box .cube .piece {
    position: absolute; font-weight: bold; color: white; text-align: center;
    width: 200px; height: 200px; line-height: 200px;
    border: 2px solid black; font-size: 40px;  }

.cube_box .cube .front  { background: hsla(  0, 100%, 50%, 0.7); }
.cube_box .cube .right  { background: hsla( 60, 100%, 50%, 0.7); }
.cube_box .cube .back   { background: hsla(120, 100%, 50%, 0.7); }
.cube_box .cube .left   { background: hsla(180, 100%, 50%, 0.7); }
.cube_box .cube .top    { background: hsla(240, 100%, 50%, 0.7); }
.cube_box .cube .bottom { background: hsla(300, 100%, 50%, 0.7); }

.cube_box .cube .front  { transform: rotateY(  0deg) translateZ(100px); }
.cube_box .cube .right  { transform: rotateY( 90deg) translateZ(100px); }
.cube_box .cube .back   { transform: rotateY(180deg) translateZ(100px); }
.cube_box .cube .left   { transform: rotateY(-90deg) translateZ(100px); }
.cube_box .cube .top    { transform: rotateX( 90deg) translateZ(100px); }
.cube_box .cube .bottom { transform: rotateX(-90deg) translateZ(100px); }
*/
</style>

