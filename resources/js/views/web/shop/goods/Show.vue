<template>
    <b-container id="goods_show">
        <location :categorys="categorys" 
            :p_ca01="content.goods_category_first.gc_ca01" 
            :p_ca02="content.goods_category_first.gc_ca02" 
            :p_ca03="content.goods_category_first.gc_ca03" 
            :p_ca04="content.goods_category_first.gc_ca04"
            @locationSettting="setLocation"
        ></location>
        <b-row class="atrium" :class="{fixed:isScrollPass, fixed_rise:is_bottom}">
            <b-col class="rack"></b-col>
            <b-col class="conLeft" :style="{top:top_y+'px'}">
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
                        <div>
                            {{content.maker.mk_name}}
                            <span v-if="content.purchase_at" style="color:#E17474;"> (제조사 직배송)</span>
                        </div>
                    </li>
                    <li>
                        <div>배송료</div>
                        <div>
                            <template v-if="content.purchase_at && content.purchase_at.pa_price_add_vat">{{content.purchase_at.pa_price_add_vat | comma}}원</template>
                            <template v-else>{{content.dlvy_fee_add_vat | comma}}원</template>
                        </div>
                    </li>             
                    <li><div>배송정보</div><div>10만원 이상 구매시 기본택배 배송료 무료</div></li>
                    <li><div>납기일</div>  <div>{{content.gd_dlvy_at}}</div></li>
                    <li><div>담당자</div>  <div>{{content.gd_mng_info}}</div></li>
                </ul>

                <ul v-if="content.file_goods_add.length">
                    <li>
                        <div>첨부파일</div>
                        <div>

                            <b-button class="white sm mr-2" v-for="(file, i) in content.file_goods_add" :key="i" @click="fileDown(file.down_path, file.fi_original)">{{file.fi_original}}</b-button>
                            <!-- <b-button v-for="(file, i) in content.file_goods_add" :key="i" @click="fileDown('api/downloadGoods/1760', file.fi_original)">{{file.fi_original}}</b-button> -->
                        </div>
                    </li>
                </ul>
            </b-col>

            <b-col class="conRight">
                <h3>{{content.gd_name}}</h3>
                
                <div class="model">
                    <b-row>
                        <b-col class="m_hide">Cat.No.</b-col>
                        <b-col class="m_hide">모델명</b-col>
                        <b-col>제품명</b-col>
                        <b-col class="m_hide">사양</b-col>
                        <b-col class="m_hide">판매단위</b-col>
                        <b-col class="m_hide">판매가</b-col>
                        <b-col>수량</b-col>
                    </b-row>
                
                    <b-row v-for="(gm, i) in content.goods_model_enable" :key="i" :class="{'selected': gm.ea, 'ea_over': gm.ea>gm.gm_limit_ea, 'bought_gm': gm.bought_gm}">
                        <b-col class="m_hide">
                            <span v-if="gm.bought_gm" class="bought_msg" :class="{'long': gm.bought_gm.cnt > 1}">
                                {{gm.bought_gm.date}} 이거 구매하셨어요.
                                <template v-if="gm.bought_gm.cnt > 1">{{gm.bought_gm.cnt}}회 구입</template>
                            </span>
                            {{gm.gm_catno}}
                        </b-col>
                        <b-col class="m_hide">{{gm.gm_code}}</b-col>
                        <b-col class="gm_name">
                            <b>{{gm.gm_name}}</b>
                            <p class="m_show">Cat.No:{{gm.gm_catno}}</p>
                            <p class="m_show">모델명:{{gm.gm_code}}</p>
                            <p class="m_show">사양:{{gm.gm_spec}}</p>
                        </b-col>
                        <b-col class="m_hide">{{gm.gm_spec}}</b-col>
                        <b-col class="m_hide">{{gm.gm_unit}}</b-col>
                        <b-col class="price_box m_hide" :class="{price_discount:gm.gm_price_dc_add_vat}">
                            <span class="normal">{{gm.gm_price_add_vat | comma | price_zero}}</span>
                            <span class="discount">{{gm.gm_price_dc_add_vat | comma | price_zero}}</span>
                            <i v-for="bd in gm.bundle_dc" :key="bd.bd_id">{{bd.bd_ea}}부터 {{price_dc_chk(bd.bd_price_add_vat) | comma}}원</i>
                        </b-col>
                        <b-col class="col_ea">
                            <p class="m_show">단위:{{gm.gm_unit}}</p>
                            <p class="m_show">가격:{{gm.gm_price_add_vat | comma | price_zero}}</p>
                            <vue-numeric-input align="center" :min="0" width="100%" v-model="gm.ea" ref="num_input"></vue-numeric-input>
                            <div v-if="gm.gm_limit_ea<999999" class="m_hide gm_limit_ea">재고: {{gm.gm_limit_ea}}</div>
                        </b-col>
                    </b-row>
                </div>
                
                <div class="goods_option" v-if="content.goods_option && content.goods_option.length">
                    <ul class="opt">
                        <li v-for="(go, i) in content.goods_option"
                            :key="go.go_id"
                            @click="go.show = !go.show"
                            v-click-outside:option_hide="i"
                        >
                            {{go.go_name}} <b-badge variant="danger" v-if="go.go_required == 'Y'">필수</b-badge>
                            <ul :class="{focus:go.show}">
                                <li v-for="goc in go.goods_option_child" :key="goc.goc_id" @click="goc.show=true, goc.ea++">
                                    <span>{{goc.goc_name}}</span>
                                    <span>{{goc.goc_price_add_vat | comma}} 원</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="selOpt" v-if="selOpt_cnt">
                        <template v-for="go in content.goods_option">
                            <template v-for="goc in go.goods_option_child">
                                <li v-if="goc.show" :key="goc.goc_id">
                                    <span class="cellName">{{goc.goc_name}} <b-badge variant="danger" v-if="go.go_required == 'Y'">필수</b-badge></span>
                                    <span class="cellCalc">
                                        <span class="opt_p">{{goc.goc_price_add_vat | comma}}</span>
                                        <font-awesome-icon icon="times" />
                                        <vue-numeric-input align="center" :min="1" width="85px" v-model="goc.ea" @blur="checkValue(goc)"></vue-numeric-input>
                                        <font-awesome-icon icon="equals" />
                                        <span class="sum_p">{{goc.goc_price_add_vat*goc.ea | comma}} 원</span>
                                        <span @click="goc.show=false, goc.ea=0" class="delOpt">X</span>
                                    </span>
                                </li>
                            </template>
                        </template>
                    </ul>
                </div>

                <div class="" v-if="content.gd_billing">
                    <b-form-radio v-model="has_plan" :value="false">1회구매</b-form-radio>
                    <b-form-radio v-model="has_plan" :value="true">정기배송</b-form-radio>
                    
                    <b-form-group v-if="has_plan" class="plan_list">
                        <b-form-radio-group v-model="od_plan" :options=" [
                            { text: '1주', value: 'w1' },
                            { text: '2주', value: 'w2' },
                            { text: '3주', value: 'w3' },
                            { text: '4주', value: 'w4' },
                            { text: '2개월', value: 'm2' }
                        ]" button-variant="outline-primary" name="od_plan" buttons></b-form-radio-group>
                    </b-form-group>
                </div>

                <div class="pick_info">
                    <div v-if="content.goods_model_enable" class="total">
                        선택한 모델 <b class="cnt">{{pick_cnt}} 개</b> 합계 <b class="price">{{total | comma}} 원</b>
                    </div>
                    <b-button-group>
                        <b-button @click="action('pay')">바로구매</b-button>
                        <b-button @click="action('wish')">관심상품</b-button>
                        <b-button @click="action('putCart')">장바구니</b-button>
                        <b-button @click="action('estimate')">견적요청</b-button>
                    </b-button-group>
                </div>

                <b-row class="goods_relate m_hide" v-if="content.goods_relate.length">
                    <b-col class="head"><b>연관<br>상품</b></b-col>
                    <perfect-scrollbar>
                    <b-col class="gd_list">
                        <template v-for="gr in content.goods_relate">
                            <b-link class="col" v-if="gr.goods" :key="gr.gr_id" :to="{name:'goods_show', params:{gd_id:gr.gr_gd_id}}">
                                <div><img :src="gr.goods.image_src_thumb[0]" /></div>
                                <sub-string v-model="gr.goods.gd_name" :width="165" />
                            </b-link>
                        </template>
                    </b-col>
                    </perfect-scrollbar>
                    <b-col class="tail"><img :src="`${s3url}goods/goods_relate_arrow.png`" /></b-col>
                </b-row>
                
                <scrollactive class="goods_nav">
                    <a class="scrollactive-item" href="#goods_desc">상품 상세</a>
                    <a class="scrollactive-item" href="#return_info">반품/교환 안내</a>
                    <a class="scrollactive-item" href="#review">상품 리뷰 <b>{{bo_cnt.review}}</b></a>
                    <a class="scrollactive-item" href="#gd_inquiry">Q & A <b>{{bo_cnt.inquiry}}</b></a>
                </scrollactive>

                <div class="prev_alarm"> <!-- 카테고리별 사전 안내 -->           
                    <p v-if="content.goods_category_first.gc_ca01==28 && content.goods_category_first.gc_ca02==3481" class="warning">
                        ※제품 특성상 주문 접수 후 교환, 취소, 환불이 불가하오니 신중한 구매 부탁드리겠습니다.
                    </p>

                    <div v-if="content.hazard_matl">
                        <br>
                        <p class="warning">
                            ※ 해당 제품은 개인 및 미성년자의 구매를 금합니다.<br />
                            ※ 연구목적 외(식품 첨가, 의료용 등) 사용 불가합니다.<br />
                            ※ 제품 이미지 참고용이며, 실제와 다를 수 있습니다.<br />
                            <br />
                            ※ 이 안내는 「화학물질관리법」 제29조의 2 및 같은 법 시행규칙 제31조의 2에 따라 유해화학물질 시약을 해당 용도로만 사용하며, 유해화학물질 취급기준을 준수하여야 함을 구매자에게 서면 또는 전자 문서로 알려주는 것을 목적으로 하고 있습니다.
                        </p>
                        <br>
                        <a href="https://kreach.me.go.kr/repwrt/index.do" target="_blank" style="display:block; text-align:center;">
                            <img src="/storage/goods/hazmat_info.jpg" title="유해화학물질 시약 관련 안내" style="max-width:100%;">
                        </a>
                    </div>

                    <p v-if="content.goods_category_first.gc_ca01==38" class="warning">
                        EO 제품군이 전기안전법과 제조사 사정에 의해 단가 변동 사항이 있습니다. <br />
                        해당 제품 주문 전 견적문의를 통해 '단가'와 '납품기한'을 꼭 확인하시기를 부탁드리겠습니다.
                    </p>

                    <p class="warning"
                        v-if="content.goods_category_first.gc_ca01==31 && 
                            content.goods_category_first.gc_ca02==5114 && 
                            (content.goods_category_first.gc_ca03==5122 || content.goods_category_first.gc_ca03==5136 || content.goods_category_first.gc_ca03==5137)"
                    >
                        - 개인 고객 및 미성년자 판매금지입니다.(온라인판매금지)
                    </p>
                </div>
                <div id="goods_desc">
                    <div v-html="content.gd_desc"></div>
                    <div v-if="content.gd_video" v-html="content.gd_video"></div>

                    <!-- 써모 크롤링된 상세 설명 -->
                    <div id="thermo_desc" v-if="thermo_desc" class="row" v-html="thermo_desc"></div>
                </div>

                <p class="go_for_seo" v-if="content.gd_keyword">연관 검색어:{{content.gd_keyword}}</p>

                <div class="desc_pdf">
                    <br /> <hr /> <br />
                    <template v-for="(file, i) in content.file_goods_add" >
                        <object v-if="file.fi_ext == 'pdf'" :key="i" :data="`/storage/${file.down_path}`" type="application/pdf" style="width:100%; height:700px;" />
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
                    <bo-review :bo_cd="'review'" :bo_cnt="bo_cnt" />
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
                    <bo-gd-inquiry :bo_cd="'gd_inquiry'" :bo_cnt="bo_cnt" :bo_subject="content.gd_name+'의 문의'" ref="gd_inquiry" />
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
        'location': () => import('./_comp/Location.vue'),
        // Splide, SplideSlide,
        'vue-numeric-input': VueNumericInput,
        'bo-review': () => import('./_comp/BoReview.vue'),
        'bo-gd-inquiry': BoGdInquiry,
        'sub-string': () => import('@/views/_common/SubString.vue'),
    },
    data() {
        return {
            isScrollPass: false,
            top_y:0,
            fix_y:82,
            location_h: 0,
            footer_h: 560,
            interval: null,
            is_bottom: false,
            categorys: {},
            content:{
                maker:{},   /// 릴레이션 로딩시간으로 인해 초기에 값이 없다는 에러를 대처하기 위해 초기값 세팅
                image_src:{},
                goods_category_first:{},
                file_goods_add:[],
                goods_relate:[],
                gd_keyword:'',
            },
            hadModelEa: false,
            bo_cnt:{
                review:0,
                inquiry:0,
            },
            has_plan: false,
            od_plan: '',
            thermo_desc: '',
        }
    },
    watch: {
        '$route.params.gd_id': function (gd_id) {
            this.show();
        },
        has_plan: function (v) { 
            if (v) this.od_plan = 'w1';
            else this.od_plan = '';
        },
    },
    computed: {
        ...mapState('cart', ['cartList']),
        ...mapState('auth', ['isLoggedin', 'user']),
        total: function() {
            let model =  this.content.goods_model_enable.reduce((acc, el) => {     
                let p = el.gm_price_dc_add_vat ?? el.gm_price_add_vat;
                return acc + parseInt(this.price_dc_chk(bundleCheckAddVat(el.bundle_dc, el.ea, p)) * el.ea);
            }, 0);
            let option =  this.content.goods_option.reduce((acc, el) => {
                return acc + el.goods_option_child.reduce((acc02, el02) => {
                    return acc02 + parseInt(el02.goc_price_add_vat * el02.ea);
                }, 0);
            }, 0);
            return model+option;
        },
        pick_cnt: function() {
            let model =  this.content.goods_model_enable.filter(gm => gm.ea > 0).length
            let option =  this.content.goods_option.reduce((acc, el) => {
                return acc + el.goods_option_child.filter(goc => goc.ea > 0).length
            }, 0);
            return model+option;
        },
        selOpt_cnt: function() {
            return this.content.goods_option.reduce((acc, el) => {
                return acc + el.goods_option_child.filter(goc => goc.ea > 0).length
            }, 0);
        },
        
        // categorys[2].filter(ca => ca.ca_id == v_model.ca03)[0].ca_name
    },
    methods: {
        async show() {
            const res = await ax.get(`/api/shop/goods/${this.$route.params.gd_id}`);
            if (res && res.status === 200) {
                this.content = res.data.goods;
                this.categorys = res.data.categorys;
                
                if (!isEmpty(res.data.gd_desc_thermo))
                    await ax.get(`/api/shop/goods/getThermo_desc?url=${res.data.gd_desc_thermo}`).then(response => {
                        this.thermo_desc = response.data.html;
                    }).catch(error => {
                        console.error('불러오기 실패:', error);
                        this.thermo_desc = '<p>데이터를 가져오지 못했습니다.</p>';
                    });
            }
        },
        async action(type) {            
            let params = this.makeParam();
            let cntModel = params.reduce(function(acc, el) {
                return (el.hasOwnProperty('gm_id')) ? acc+1 : acc;
            }, 0);

            if (!cntModel) {
                Notify.modal("모델을 선택하세요", 'info');
                return false;
            }

            if (['pay', 'estimate'].includes(type)) {
                let required_key = Array();
                this.content.goods_option.forEach(go => {
                    if (go.go_required == 'Y')
                        required_key.push(go.go_id);
                });
                
                params.forEach(item => {
                    if (item.hasOwnProperty('goc_id')) 
                        required_key = required_key.filter((e) => e !== item.go_id);
                });

                if (required_key.length > 0) {
                    Notify.modal("필수 옵션을 선택하셔야 합니다.", 'info');
                    return false;
                }
            }


            switch (type) {
                case "pay":
                    let estimate_price = false;
                    let limit_ea_over = false;
                    this.content.goods_model_enable.forEach(gm => {
                        if (gm.ea > 0 && gm.gm_price_add_vat=='0' ) estimate_price = true;
                        if (gm.gm_limit_ea<999999 && gm.ea>0 && gm.ea > gm.gm_limit_ea ) limit_ea_over = true;
                    });
                    if (estimate_price) {
                        /*  반복문에서  return false 하면 반복문 탈출이 되기에
                            주문 차단을 위해서 여기서 return false 해준다.    */
                        Notify.modal("견적가 상품은 견적요청을 해주세요.", 'danger');
                        return false;
                    }

                    if (limit_ea_over) {
                        /*  반복문에서  return false 하면 반복문 탈출이 되기에
                            주문 차단을 위해서 여기서 return false 해준다.    */
                        Notify.modal("구매하려는 제품 수량이 재고 수량보다 많습니다. 견적요청을 이용해주세요.", 'danger');
                        return false;
                    }


                    let route_obj = {
                        name: 'order_settle', 
                        params: { od_goods: params, od_type: 'buy_inst' }
                    };
                    if ( this.od_plan != '' )
                        route_obj.query = {od_plan:this.od_plan};
                    
                    this.$router.push(route_obj);
                break;

                case "putCart":
                    // this.$store.dispatch('cart/examine', {goods:this.content, params:params});
                    // this.$store.dispatch('cart/examine', {goods:this.content});
                    if (Auth.check()) {
                        const res = await ax.post('/api/shop/cart', params);
                        if (res.status === 200)
                            Notify.toast('success', "장바구니 등록 완료");                        
                    } else
                        Notify.modal("로그인 해주세요.", 'danger');
                    
                break;

                case "wish":                     
                    try {
                        let res = await ax.post(`/api/shop/wish`, this.content.goods_model_enable.filter(gm => gm.ea > 0));
                        if (res && res.status === 200) {
                            Notify.toast('success', '관심 상품 등록 완료')
                        } else {
                            Notify.toast('warning', res);
                        }
                    } catch (e) {
                        Notify.consolePrint(e);
                        Notify.toast('warning', e.responsee);
                    }
                break;

                case "estimate":
                    this.$router.push({name: 'estimate_create', params: { od_goods: params, od_type: 'request_estimate' }});
                break;
            }
        },

        makeParam () {
            let params = [];
            this.content.goods_model_enable.forEach(gm => {
                if (gm.ea > 0) params.push({gd_id:this.content.gd_id, gm_id:gm.gm_id, ea:gm.ea});
            });
            this.content.goods_option.forEach(go => {
                go.goods_option_child.forEach(goc => {
                    if (goc.ea > 0) params.push({gd_id:this.content.gd_id, go_id:go.go_id, goc_id:goc.goc_id, ea:goc.ea});
                });
            });
            return params;
        },
        // paramModel () {
        //     return this.content.goods_model_enable.reduce((acc, el) => {
        //         if (el.ea > 0)
        //             acc.push({gm_id:el.gm_id, ea:el.ea});
        //         return acc;
        //     }, []);
        // },
        // paramOption () {
        //     return this.content.option.reduce((acc, el) => {
        //         return acc.concat(el.option_child.reduce((acc02, el02) => {
        //             if (el02.ea > 0) acc02.push({op_id:el02.goc_op_id, goc_id:el02.goc_id, ea:el02.ea});
        //             return acc02;
        //         }, []));
        //     }, []);
        // },
        option_hide(e, idx) {
            this.$set(this.content.goods_option[idx], 'show', false);
        },
        checkValue(goc) {
            if (Number.isNaN(goc.ea)) {
                this.$set(goc, 'ea', 0);
                this.$set(goc, 'show', false);
            }
        },

        create () {
            // if(!Auth.check()) {
            //     this.$bvModal.show('login-modal');
            //     return false;
            // }
            this.$refs.gd_inquiry.create();
        },

        scrollListener: function (e) {
            this.isScrollPass = window.scrollY >= this.location_h+500;   //  500은 상품 img 높이
            this.is_bottom = (window.innerHeight + window.scrollY) >= (this.scrollHeight-this.footer_h);
            if (window.innerWidth>992 && this.isScrollPass) {
                // if (this.is_bottom) this.top_y = this.fix_y-((window.innerHeight + window.scrollY)-(this.scrollHeight-this.footer_h));
                // else                this.top_y = this.fix_y;
                if (!this.is_bottom) this.top_y = window.scrollY-this.location_h-500;   //  500은 상품 img 높이
            } else                  this.top_y = 0;
        },

        price_dc_chk: function (v) {
            return ( this.isLoggedin && this.user.level == 12 ) ? Math.floor(v*this.user.dc_mul) : v;
        },

        setLocation(v) { this.location_h = v; },
/*
        chk_limit(ea, idx) {
            if(ea > this.content.goods_model_enable[idx].gm_limit_ea) {
                Notify.modal(`재고 수량 ${this.content.goods_model_enable[idx].gm_limit_ea}개 이하로 구매해주세요.`, 'danger');
                // this.content.goods_model_enable[idx].ea = this.content.goods_model_enable[idx].gm_limit_ea;
                // this.$refs.num_input[idx].value=this.content.goods_model_enable[idx].gm_limit_ea;
            }
        },
*/
/*
        openDropDownAndShowNavBar(e) {
            if (e.target.tagName === "A") {
                e.target.classList.add("mouseover");
                this.underbarStyle.left = e.target.offsetLeft + 16 + "px";
                this.underbarStyle.width = e.target.offsetWidth - 30 + "px";
                this.underbarStyle.display = "block";
            }
        },
        closeDropDown() {
            const target = document.querySelectorAll(".mouseover");
            target?.forEach((el) => el.classList.remove("mouseover"));
        },
        hideNavBar() {
            this.underbarStyle.display = "none";
        },
*/        
    },
    async mounted() {
        this.show();
        window.addEventListener('scroll', this.scrollListener);
        this.interval = setInterval(() => {
            this.scrollHeight = document.body.scrollHeight;
        }, 100);
    },

    beforeDestroy() { 
        window.removeEventListener('scroll', this.scrollListener);
        this.$store.dispatch('recent_goods/index');
    },
    destroyed() { clearInterval(this.interval); },
    metaInfo() {
        let keywords = this.content.gd_keyword;
        if (!isEmpty(keywords)) { 
            if (keywords.indexOf(',') !== -1)    // 키워드가 공백으로 구분되어 있으면 콤마로 바꿔 키워드로 인식되게함
                keywords = keywords.replaceAll(" ", ",");

            let arr_keywords = [...new Set(keywords.split(","))]; // 모든키워드를 배열화하여 키워드에 중복을 재거함
            keywords = arr_keywords.join(",")  // 배열화했던 키워드들을 평문화한다. (문자열화)

            return {
                meta: [ { 
                    vmid: 'description',
                    name: 'description',
                    content: keywords+' 으로 표현 할 수 있습니다.', 
                } ],};
        }
    },

}
</script>

<style lang="css" scoped>
.vue-numeric-input >>> .numeric-input { line-height:16px; }

#goods_show>.row>.col { padding:0; }
#goods_show .atrium { position:relative; align-items:flex-start; }
.atrium .rack { flex-basis:0px; max-width:0px; }
.atrium .conLeft { flex:33.333333%; max-width:33.333333%; overflow:auto; }
.atrium.fixed .conLeft { position:absolute; z-index:2; }
.atrium.fixed .rack { flex:33.333333%; max-width:33.333333%; }
.conLeft .carousel >>> .carousel-inner .carousel-item img { width:100%; height:498px; object-fit:contain; }
.conLeft .carousel >>> .carousel-control-prev:hover,
.conLeft .carousel >>> .carousel-control-next:hover { background-color:#CCC; }
.conLeft .carousel >>> .carousel-indicators li { background-color:#aaa; }
/*.conLeft ul li:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
.conLeft ul li div { float:left; font-size:1.5rem; }*/
.conLeft ul { margin:1rem 0 0 1rem; padding:1rem 0 0 1rem; border-top:1px solid #D7D7D7; }
.conLeft ul li { display:flex; line-height:1.5rem; }
.conLeft ul li div { font-size:.9rem; flex-basis: 0; flex-grow:1; max-width:100%; }
.conLeft ul li div:nth-child(1) { flex-basis:30%; max-width:30%; font-weight:bold; }  

.conRight { border-top:1px solid #D8D8D8; margin-left:10px; color:#000; flex:0 0 calc(66.666667% - 10px); max-width:calc(66.666667% - 10px); }
.conRight h3 { padding:1.1rem .5rem; font-weight:bold; }
.conRight .model { overflow:hidden; }
.conRight .model .row { margin:0; }
.conRight .model .row:nth-of-type(1) .col { font-weight:bold; padding:.4rem .3rem; font-size:.9rem; }
.conRight .model .row.selected { background:#FFFBCC; }
.conRight .model .row.ea_over { background:#FFCCCC; }
.conRight .model .bought_gm { background:#D0EFDF; }
.conRight .model .bought_gm .col:nth-of-type(1) { position:relative; }
.conRight .model .bought_gm .col .bought_msg { 
    opacity:0;
    animation-fill-mode:backwards; 
    animation: fadeout 6s; -moz-animation: fadeout 6s; /* Firefox */ -webkit-animation: fadeout 6s; /* Safari and Chrome */ -o-animation: fadeout 6s; /* Opera */
    z-index:1; box-shadow:2px 3px 6px #999; position:absolute; 
    width:260px; left:78px; top:-27px; background:#00A650; color:white; border-radius:5px; padding:3px; }
@keyframes fadeout { 0% {opacity: 1;} 75% {opacity: 1;} 100% {opacity: 0;} }
@-moz-keyframes fadeout { 0% {opacity: 1;} 75% {opacity: 1;} 100% {opacity: 0;} }/* Firefox */ 
@-webkit-keyframes fadeout { 0% {opacity: 1;} 75% {opacity: 1;} 100% {opacity: 0;} }/* Safari and Chrome */ 
@-o-keyframes fadeout { 0% {opacity: 1;} 75% {opacity: 1;} 100% {opacity: 0;} }/* Opera */ 
.conRight .model .bought_gm:hover .col .bought_msg { opacity:1; }
.conRight .model .bought_gm .col .bought_msg:hover { opacity:0; }
.conRight .model .bought_gm .col .bought_msg:after { border-top:15px solid #00A650; border-left:0px solid transparent; border-right:15px solid transparent; border-bottom:0px solid transparent; content:""; position:absolute; bottom:-15px; left:20px; }
.conRight .model .bought_gm .col .bought_msg.long { width:330px; }
/* 테이블같은 볼더 */
.conRight .model .row .col { border:1px solid #CCC; padding:.8rem .3rem; text-align:center; word-break:break-all; }
.conRight .model .row .col:not(:last-child) { border-right-width:0; }
.conRight .model .row:not(:last-child) .col { border-bottom-width:0; }

.conRight .model .row .col:nth-of-type(1) { flex-basis:13%; max-width:13%; }
.conRight .model .row .col:nth-of-type(2) { flex-basis:13%; max-width:13%; }

.conRight .model .row .col:nth-of-type(5) { flex-basis:8%; max-width:8%; }
.conRight .model .row .col:nth-of-type(6) { flex-basis:12%; max-width:12%; }
.conRight .model .row .col:nth-of-type(7) { flex-basis:8%; max-width:8%; }
.conRight .model .row .col:nth-of-type(7) .vue-numeric-input { height:1.3rem; }
.conRight .model .row .col:nth-of-type(7) .vue-numeric-input >>> button { width:1.2rem; }
.conRight .model .row .col:nth-of-type(7) .vue-numeric-input >>> .numeric-input { padding:2px 1rem; }
.conRight .model .row .col.price_box i { font-size:.7rem; display:block; }
.conRight .model .row .col_ea { display:flex; flex-direction:column; }
.conRight .model .row .col_ea .gm_limit_ea { position:absolute; background:#FFF; right:0px; min-width:75px; transform:translateX(105%); z-index:1; transition:all 0.5s ease; border:1px solid #999; border-radius:4px; background-color:#ff9300; }
.conRight .model .row .col_ea:hover .gm_limit_ea { transform:translateX(-120%); }

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

.conRight .goods_relate { width:990px; padding:12px 0; margin:3rem 0 0; background:url('/storage/goods/relate_bg.png') no-repeat center center /contain; }
.conRight .goods_relate .head { max-width:137px; position:relative; }
.conRight .goods_relate .head b { color:#FFF; font-weight:600; font-size:1.5rem; line-height: 1.2; position:absolute; top:50%; left:65%; transform:translate(-50%, -50%); width:50px; }
.conRight .goods_relate .col { padding-left:0px; padding-right:0px; }
.conRight .goods_relate .gd_list { display:flex; }
.conRight .goods_relate .gd_list .col { flex:0 0 21.101992%; max-width:21.101992%; height:215px; margin-left:5px; margin-right:5px; background-color:#fff; text-align:center; }
.conRight .goods_relate .gd_list .col div { width:160px; height:160px; margin:6px auto; }
.conRight .goods_relate .gd_list .col div img { width:160px; height:160px; object-fit:contain; }
.conRight .goods_relate .gd_list .col span { margin-top:.5rem; font-size:.75rem; }
.conRight .goods_relate .ps { width:814px; }
.conRight .goods_relate .tail { flex:0 0 4.7%; max-width:4.7%; }
.conRight .goods_relate .tail img { position:absolute; top:48%; left:50%; transform:translate(-50%, -50%); }

/*.conRight .goods_relate .ps >>> .ps__rail-y { background-color:#eee; opacity:.9; z-index:1; cursor:pointer; }
.conRight .goods_relate .ps >>> .ps__rail-y > .ps__thumb-y { background-color:#438DCC; width:11px; }*/

.conRight .goods_nav { position:sticky; top:80px; z-index:1; background:#B2BFC5; display:flex; padding-left:3rem; margin-top:2rem; }
.conRight .goods_nav a { color:#FFF; padding:7px 22px; border-radius:2rem; margin:.7rem; font-weight:bold; }
.conRight .goods_nav a b { color:#4E6F8E; }
.conRight .goods_nav a.is-active { background:#4F708F; }
.conRight .goods_nav a.is-active b { color:#fff; }

.conRight .prev_alarm { color:red; font-size:20px; font-weight:bold; margin-top:1rem; }
.conRight #goods_desc { margin-top:50px; }
.conRight #goods_desc >>> img { max-width:100%; }
/* trc 옵션 설명 스타일 */
.conRight #goods_desc #style01 h1 { font-weight:bold; font-size:40px; line-height:40px; margin:20px 0 10px 0; }
.conRight #goods_desc #style01 span { display:inline-block; line-height:24px; color:#666; padding:5px 15px; }
.conRight #goods_desc #style01 { padding-left:0px; }
.conRight #goods_desc #style01 .desc_title { border-left:1px solid #999; margin-bottom:2px; font-weight:bold; width:10%; background-color:#F8F8F8; }
.conRight #goods_desc::v-deep .external_description_link { display:none; }
.conRight .desc_pdf { margin-top:3rem; }
.conRight .go_for_seo { color:#ffffff00; margin-top:16px; }

.conRight .goods_desc_piece { margin-top:3rem; }
.conRight .goods_desc_piece h4 { font-size:1.5rem; font-weight:bold; }
.conRight .goods_desc_piece h4 i { font-size:.9rem; color:#898989; font-style:normal; }
.conRight .goods_desc_piece .tit { border-bottom:2px solid #000; padding-bottom:.9rem; }
.conRight .goods_desc_piece .tit p { font-size:.9rem; color:#898989; margin-bottom:.4rem;}

.conRight  #return_info { font-size:.8rem; font-weight:600; }
.conRight  #return_info .tit { margin-bottom:1.2rem; }
.conRight  #return_info em { color:#ce0000; font-weight:bold; }

.conRight  #gd_inquiry .tit button { margin-left:1rem; border-color:#898989; }

@media (max-width: 992px){
    .p_wrap { padding: 0 .3rem; margin-top:15px; }
    #goods_show { padding:20px; margin-top:0; } 
    .atrium .conLeft { position:static !important; flex: 0 0 100% !important; max-width:100% !important; }
    .conLeft .carousel >>> .carousel-inner .carousel-item img { height:260px; }
    .conLeft ul { margin:0; padding:0; border-top-width:0; }

    .conRight { flex: 0 0 100%; max-width:100%; margin:0; }
    .conRight h3 { font-size: calc(.6vw + 1rem); }

    .conRight .model .row .col { text-align:left; }
    .conRight .model .row .col:nth-of-type(7) { flex-basis:35%; max-width:35%; }
    .conRight .model .row .col b { font-size: calc(1.3vw + .7rem); }
    .conRight .model .row .col p { margin:0; font-size:calc(.9vw + .6rem); text-align:left; }
    .conRight .model .row .col:nth-of-type(7) .vue-numeric-input { width:80% !important; max-width:90px; margin:auto; }
    
    .conRight .pick_info .total { padding-right:0; }
    .conRight .pick_info .total b.cnt { margin-right: 1rem; }
    .conRight .pick_info .total b.price { font-size: 1.3rem; }
    .conRight .pick_info .btn-group { width:100%; }
    .conRight .pick_info .btn-group .btn { padding-left:0; padding-right:0; }

    .conRight .goods_nav { top:50px; padding:0; }
    .conRight .goods_nav a { border-radius:.2rem; margin:.2rem; padding:7px 0; flex-basis:0; flex-grow:1; max-width:100%; text-align:center; }
}
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




/**
 * Do not edit directly
 * Generated on Wed, 05 Feb 2025 19:22:04 GMT V01
 */

:root {
  --spacing-09: 48px;
  --spacing-08: 40px;
  --spacing-07: 32px;
  --spacing-06: 24px;
  --spacing-05: 16px;
  --spacing-04: 12px;
  --spacing-03: 8px;
  --spacing-02: 4px;
  --spacing-01: 2px;
  --spacing-00: 0px;
  --spacing-13: 160px;
  --spacing-12: 96px;
  --spacing-11: 80px;
  --spacing-10: 64px;
  --yellow-05: #fff5c5;
  --yellow-100: #2d1700;
  --yellow-90: #462300;
  --yellow-80: #5c2e00;
  --yellow-70: #763c01;
  --yellow-60: #8d4700;
  --yellow-50: #b05900;
  --yellow-40: #de7a00;
  --yellow-30: #f79905;
  --yellow-25: #feb323;
  --yellow-20: #ffd043;
  --yellow-15: #ffe15d;
  --yellow-10: #ffec94;
  --yellow-0: #fff9e1;
  --white-0: #ffffff;
  --turquoise-05: #c8fffb;
  --turquoise-100: #001d1a;
  --turquoise-90: #002824;
  --turquoise-80: #003633;
  --turquoise-70: #004742;
  --turquoise-60: #015d58;
  --turquoise-50: #007972;
  --turquoise-40: #009990;
  --turquoise-30: #00bdb3;
  --turquoise-25: #00dace;
  --turquoise-20: #38f0e6;
  --turquoise-15: #7efff8;
  --turquoise-10: #a4fffa;
  --turquoise-0: #e8fffd;
  --teal-05: #cef6ff;
  --teal-100: #001a20;
  --teal-90: #00232b;
  --teal-80: #002d38;
  --teal-70: #003b49;
  --teal-60: #004e61;
  --teal-50: #00677f;
  --teal-40: #05819d;
  --teal-30: #25a1be;
  --teal-25: #42bdd9;
  --teal-20: #68d1e9;
  --teal-15: #8de4f8;
  --teal-10: #aff0ff;
  --teal-0: #eafbff;
  --steel-blue-05: #e1e9ff;
  --steel-blue-100: #13161f;
  --steel-blue-90: #1e2432;
  --steel-blue-80: #293044;
  --steel-blue-70: #343b57;
  --steel-blue-60: #3e486b;
  --steel-blue-50: #4e5987;
  --steel-blue-40: #606ea6;
  --steel-blue-30: #7688c7;
  --steel-blue-25: #869bdb;
  --steel-blue-20: #9db0ea;
  --steel-blue-15: #b3c0ef;
  --steel-blue-10: #cad5f4;
  --steel-blue-0: #f5f7ff;
  --sapphire-05: #dfeeff;
  --sapphire-100: #00143a;
  --sapphire-90: #001d54;
  --sapphire-80: #002874;
  --sapphire-70: #00399c;
  --sapphire-60: #0049c8;
  --sapphire-50: #025df2;
  --sapphire-40: #2678ff;
  --sapphire-30: #498dff;
  --sapphire-25: #679fff;
  --sapphire-20: #86b2ff;
  --sapphire-15: #abccff;
  --sapphire-10: #c7e0ff;
  --sapphire-0: #f3f7fe;
  --red-05: #fde4e4;
  --red-100: #310000;
  --red-90: #560000;
  --red-80: #790000;
  --red-70: #a00000;
  --red-60: #c40003;
  --red-50: #e71316;
  --red-40: #fd292c;
  --red-30: #fe494b;
  --red-25: #ff6d6d;
  --red-20: #fb9090;
  --red-15: #fdabab;
  --red-10: #fcc9c9;
  --red-0: #fff4f4;
  --purple-05: #eedfff;
  --purple-100: #160031;
  --purple-90: #230048;
  --purple-80: #300066;
  --purple-70: #3e0181;
  --purple-60: #4c00a4;
  --purple-50: #6100ce;
  --purple-40: #802eff;
  --purple-30: #9061fc;
  --purple-25: #ab87ff;
  --purple-20: #c3a7fe;
  --purple-15: #d5bafe;
  --purple-10: #e1ceff;
  --purple-0: #f6f0fd;
  --pink-05: #ffe1f3;
  --pink-100: #2a0712;
  --pink-90: #410520;
  --pink-80: #640d36;
  --pink-70: #860842;
  --pink-60: #b60150;
  --pink-50: #dc0265;
  --pink-40: #ff1d7b;
  --pink-30: #ff5091;
  --pink-25: #ff70aa;
  --pink-20: #ff92c2;
  --pink-15: #ffb1d3;
  --pink-10: #ffcde3;
  --pink-0: #fff0f9;
  --orange-05: #ffddc2;
  --orange-100: #2b0f00;
  --orange-90: #491901;
  --orange-80: #6c2501;
  --orange-70: #8c3001;
  --orange-60: #ad3b00;
  --orange-50: #d14700;
  --orange-40: #f35200;
  --orange-30: #f56a00;
  --orange-25: #ff8b34;
  --orange-20: #ff9f58;
  --orange-15: #ffb782;
  --orange-10: #ffcda8;
  --orange-0: #ffebd6;
  --olive-05: #fcffb8;
  --olive-100: #0f1f00;
  --olive-90: #152c00;
  --olive-80: #203900;
  --olive-70: #2d4b00;
  --olive-60: #3d5c01;
  --olive-50: #4f6c00;
  --olive-40: #698300;
  --olive-30: #8d9f00;
  --olive-25: #b5bd00;
  --olive-20: #d3dc00;
  --olive-15: #eaf059;
  --olive-10: #f8fc8a;
  --olive-0: #fdffdd;
  --indigo-05: #e8e7ff;
  --indigo-100: #0b0834;
  --indigo-90: #161249;
  --indigo-80: #201c5c;
  --indigo-70: #2c287a;
  --indigo-60: #3a339f;
  --indigo-50: #4a42cd;
  --indigo-40: #6058df;
  --indigo-30: #7d76ee;
  --indigo-25: #9993fc;
  --indigo-20: #b0abfd;
  --indigo-15: #c1bdfc;
  --indigo-10: #d5d2ff;
  --indigo-0: #f4f4ff;
  --green-05: #d9fbe2;
  --green-100: #001d06;
  --green-90: #002808;
  --green-80: #00330a;
  --green-70: #00420e;
  --green-60: #005512;
  --green-50: #006816;
  --green-40: #01891e;
  --green-30: #00a824;
  --green-25: #00d82d;
  --green-20: #22f24e;
  --green-15: #7ff87d;
  --green-10: #befbbb;
  --green-0: #effff3;
  --gray-05: #e5e5e5;
  --gray-100: #1b1b1d;
  --gray-90: #2b2b30;
  --gray-80: #38383e;
  --gray-70: #43434a;
  --gray-60: #54545c;
  --gray-50: #61616b;
  --gray-40: #70707a;
  --gray-30: #81828c;
  --gray-25: #92929e;
  --gray-20: #a5a5ae;
  --gray-15: #b8b7bc;
  --gray-10: #cccccc;
  --gray-0: #f7f7f7;
  --dark-mode-05: #e2e2ed;
  --dark-mode-100: #17171e;
  --dark-mode-90: #25252f;
  --dark-mode-80: #2d2d3a;
  --dark-mode-70: #363646;
  --dark-mode-60: #404051;
  --dark-mode-50: #4e4e62;
  --dark-mode-40: #5d5d73;
  --dark-mode-30: #6e6e87;
  --dark-mode-25: #8b8ba6;
  --dark-mode-20: #9e9ebb;
  --dark-mode-15: #b8b8d3;
  --dark-mode-10: #cfcfe2;
  --dark-mode-0: #f4f4f8;
  --blue-05: #d4edff;
  --blue-100: #001222;
  --blue-90: #001e36;
  --blue-80: #00294a;
  --blue-70: #013560;
  --blue-60: #00467f;
  --blue-50: #005daa;
  --blue-40: #0071d0;
  --blue-30: #0092f3;
  --blue-25: #3eafff;
  --blue-20: #6bc1ff;
  --blue-15: #90d1ff;
  --blue-10: #b6e1fe;
  --blue-0: #f1f9ff;
  --black-100: #000000;
  --text-success: var(--green-40);
  --text-subtle: var(--gray-40);
  --text-secondary: var(--gray-60);
  --text-primary: var(--gray-100);
  --text-on-color: var(--white-0);
  --text-link-hover: var(--blue-50);
  --text-link: var(--blue-40);
  --text-disabled: var(--gray-25);
  --status-warning: var(--orange-30);
  --status-success: var(--green-30);
  --status-info: var(--blue-30);
  --status-error: var(--red-50);
  --layer-selected-disabled: var(--sapphire-10);
  --layer-selected: var(--blue-40);
  --layer-secondary: var(--gray-0);
  --layer-primary: var(--white-0);
  --layer-hover-02: var(--sapphire-05);
  --layer-hover-01: var(--sapphire-0);
  --layer-heavy-01: var(--gray-10);
  --layer-disabled-02: var(--gray-05);
  --layer-disabled-01: var(--gray-0);
  --layer-accent-subtle: var(--red-05);
  --layer-accent-heavy: var(--red-60);
  --layer-accent: var(--red-50);
  --icon-subtle: var(--gray-40);
  --icon-secondary: var(--gray-60);
  --icon-primary: var(--gray-100);
  --icon-on-color: var(--white-0);
  --icon-link-hover: var(--blue-50);
  --icon-link: var(--blue-40);
  --icon-disabled-02: var(--gray-25);
  --icon-disabled-01: var(--gray-20);
  --focus-default-inset: var(--white-0);
  --focus-default: var(--purple-40);
  --button-secondary-label: var(--white-0);
  --button-secondary-bg-hover: var(--gray-100);
  --button-secondary-bg: var(--gray-60);
  --button-primary-label: var(--white-0);
  --button-primary-bg-hover: var(--red-60);
  --button-primary-bg: var(--red-50);
  --button-outline-label: var(--blue-40);
  --button-outline-border-hover: var(--blue-50);
  --button-outline-border: var(--gray-25);
  --button-outline-bg-hover: var(--white-0);
  --button-outline-bg: var(--white-0);
  --button-info-label: var(--gray-60);
  --button-info-border-hover: var(--gray-60);
  --button-info-border: var(--gray-25);
  --button-info-bg-hover: var(--white-0);
  --button-info-bg: var(--white-0);
  --button-disabled-label: var(--gray-25);
  --button-disabled-bg: var(--gray-05);
  --button-attention-label: var(--white-0);
  --button-attention-bg-hover: var(--red-60);
  --button-attention-bg: var(--red-50);
  --brand-primary-subtle: var(--red-05);
  --brand-primary-heavy: var(--red-60);
  --brand-primary: var(--red-50);
  --border-subtle-02: var(--gray-10);
  --border-subtle-01: var(--gray-05);
  --border-selected: var(--blue-40);
  --border-heavy-01: var(--gray-25);
  --border-active: var(--blue-30);
  --background-secondary: var(--gray-0);
  --background-primary: var(--white-0);
}

.conRight #thermo_desc >>> .pdp-specifications {
    margin-bottom: 24px
}

.conRight #thermo_desc >>> .pdp-specifications-card {
    width: 100%
}

.conRight #thermo_desc::v-deep .pdp-specifications__title {
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between
}

@media(max-width: 576px) {
    .conRight #thermo_desc >>> .pdp-specifications__title {
        align-items:flex-start;
        flex-direction: column
    }
}

.conRight #thermo_desc >>> .pdp-specifications__text {
    font-size: 20px;
    font-weight: 700;
    padding: 10px 24px 10px 32px
}

.conRight #thermo_desc >>> .pdp-specifications__icon {
    height: 12px;
    margin-right: 5px
}

.conRight #thermo_desc >>> .pdp-specifications__link {
    font-size: 14px;
    font-weight: 700;
    padding: 10px 24px 10px 32px
}

@media(max-width: 576px) {
    .conRight #thermo_desc >>> .pdp-specifications__link {
        padding:0 24px 10px 32px
    }
}

.conRight #thermo_desc >>> .pdp-specifications__link:hover {
    cursor: pointer
}

.conRight #thermo_desc >>> .pdp-specifications__link a {
    color: #0071d0
}

.conRight #thermo_desc >>> .pdp-specifications__view-more {
    color: #0071d0;
    padding: 10px 0;
    text-align: center
}

.conRight #thermo_desc >>> .pdp-specifications__view-more:hover {
    cursor: pointer
}

.conRight #thermo_desc >>> .pdp-specifications .pdp-specification-row {
    border-bottom: 1px solid #e5e5e5;
    display: grid;
    grid-template-columns: 50% 50%
}

.conRight #thermo_desc >>> .pdp-specifications .pdp-specification-row__name {
    font-weight: 700;
    padding: 10px 32px
}

.conRight #thermo_desc >>> .pdp-specifications .pdp-specification-row__value {
    border-left: 1px solid #e5e5e5;
    font-weight: 400;
    overflow-wrap: anywhere;
    padding: 10px 32px
}

.conRight #thermo_desc >>> .pdp-card {
    background: #0000;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 #0000001a;
    cursor: default;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    outline: 1px solid #cccccc;
    padding: 16px;
    transition: .3s ease-in-out;
    width: 100%
}

.conRight #thermo_desc >>> .pdp-card.nopadding {
    padding: 0
}

.conRight #thermo_desc >>> .pdp-chemicals {
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    margin-top: 20px
}

@media(max-width: 990px) {
    .conRight #thermo_desc >>> .pdp-chemicals {
        flex-direction:column
    }
}

.conRight #thermo_desc >>> .pdp-nav {
    height: 50px;
    position: sticky;
    z-index: 4
}

@media screen and (max-width: 991px) {
    .conRight #thermo_desc >>> .pdp-nav {
        margin-left:-24px
    }
}

.conRight #thermo_desc >>> .pdp-nav core-navigationbar {
    width: 100%
}

.conRight #thermo_desc >>> .pdp-nav core-navigationbar .pdp-smart-search-widget-title {
    font-weight: unset;
    text-transform: none
}

.conRight #thermo_desc >>> .pdp-product-overview {
    margin-bottom: 40px!important;
    margin-top: 20px!important
}

.conRight #thermo_desc >>> .pdp-product-overview .pdp-product-description p {
    margin: 12px 0
}

.conRight #thermo_desc >>> .pdp-product-description {
    margin-top: 12px
}

.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-inner {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 22px;
    text-align: left
}

.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-inner a {
    color: #0071d0
}

.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-disclaimer,.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-warnings {
    background-color: #f7f7f7;
    margin-top: 12px;
    padding: 24px
}

.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-regulatory-stmt,.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-regulatory-stmt-catalog {
    background-color: #f7f7f7;
    margin-top: 16px;
    padding: 24px
}

.conRight #thermo_desc >>> .pdp-product-description .pdp-product-description-techdetails-refs {
    margin-bottom: 16px;
    margin-left: 16px;
    margin-top: 16px
}

.conRight #thermo_desc >>> .pdp-contents-and-storage {
    margin-bottom: 24px;
    width: 100%
}

.conRight #thermo_desc >>> .pdp-contents-and-storage core-card::part(core-card) {
    outline: 1px solid #cccccc!important
}

.conRight #thermo_desc >>> .pdp-contents-and-storage__wrapper {
    border:1px solid #ccc;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    cursor: default;
    border-radius: 4px;
    transition: 300ms ease-in-out;
    outline-offset: -1px;

}
.conRight #thermo_desc >>> .pdp-contents-and-storage__title {
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between
}

.conRight #thermo_desc >>> .pdp-contents-and-storage__text {
    font-size: 20px;
    font-weight: 700;
    padding: 12px 24px 10px 32px
}

.conRight #thermo_desc >>> .pdp-contents-and-storage__desc {
    font-weight: 400;
    padding: 16px 32px
}

@media(max-width: 992px) {
    .conRight #thermo_desc >>> .pdp-contents-and-storage {
        margin-bottom:16px
    }
}

    
</style>

