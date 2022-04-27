<template lang="html">
    <b-container id="goods_show">
        <Location :categorys="categorys" 
            :p_ca01="content.goods_category_first.gc_ca01" 
            :p_ca02="content.goods_category_first.gc_ca02" 
            :p_ca03="content.goods_category_first.gc_ca03" 
            :p_ca04="content.goods_category_first.gc_ca04"  />
        <b-row class="justify-content-end mt-3">
            <b-col lg="5">
                <b-carousel indicators class="slide_goods">
                    <template v-for="(row, idx) in content.image_src">
                        <b-carousel-slide :key="idx">
                            <template #img>
                                <img :src="row" />
                            </template>
                        </b-carousel-slide>
                    </template>
                </b-carousel>
            </b-col>

            <b-col lg="7">
                <div class="gd_info">
                    <h3>{{content.gd_name}}</h3>
                    <p>{{content.gd_id}}</p>
                    <hr />
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
                        <li><hr /></li>
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

                    <ul v-if="content.file_goods_add">
                        <li><hr /></li>
                        <li>
                            <div>첨부파일</div>
                            <div>
                                <b-button v-for="(file, i) in content.file_goods_add" :key="i" @click="fileDown(file.path, file.fi_original)">{{file.fi_original}}</b-button>
                            </div>
                        </li>
                    </ul>
                </div>

                <hr />

                <div class="mt-5" v-if="content.option && content.option.length">
                    <h5>추가 옵션</h5>
                    <ul class="mt-5 optoins">
                        <li
                            class="optionLi"
                            v-for="(op, i) in content.option"
                            :key="op.op_id"
                            @click="op.show = !op.show"
                            v-click-outside:option_hide="i"
                        >
                            {{op.op_name}} <b-badge variant="danger" v-if="op.op_required == 'Y'">*필수</b-badge>
                            <ul :class="{focus:op.show}">
                                <li v-for="opc in op.option_child" :key="opc.opc_id" @click="opc.show=true, opc.ea++">
                                    <span>{{opc.opc_name}}</span>
                                    <span>{{opc.opc_price_add_vat | comma}} 원</span>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="mt-5 selectedOptoins">
                        <template v-for="op in content.option">
                            <template v-for="opc in op.option_child">
                                <li v-if="opc.show">
                                    <span class="cellName">
                                        <b-button pill variant="danger" size="sm" class="mr-1" @click="opc.show=false, opc.ea=0">X</b-button>
                                        {{opc.opc_name}}
                                    </span>
                                    <span class="cellCalc">
                                        <span>{{opc.opc_price_add_vat | comma}} <font-awesome-icon icon="times" /></span>
                                        <vue-numeric-input align="center" :min="1" width="100px" v-model="opc.ea" @blur="checkValue(opc)"></vue-numeric-input>
                                        <span><font-awesome-icon icon="equals" />{{opc.opc_price_add_vat*opc.ea | comma}} 원</span>
                                    </span>
                                </li>
                            </template>
                        </template>
                    </ul>
                </div>
            </b-col>


        </b-row>

        <b-row class="mt-5 goods_model">
            <b-col>
                <table class="table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Cat.No.</th>
                            <th scope="col">모델명</th>
                            <th scope="col">제품명</th>
                            <th scope="col">사양</th>
                            <th scope="col">판매단위</th>
                            <th scope="col">판매가</th>
                            <th scope="col">Ctrl</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="gm in content.goods_model" :key="gm.gm_id" :class="{'bg-info text-light': gm.ea}">
                            <td class="align-middle text-center">{{gm.gm_catno}}</td>
                            <td class="align-middle">{{gm.gm_code}}</td>
                            <td class="align-middle">{{gm.gm_name}}</td>
                            <td class="align-middle">{{gm.gm_spec}}</td>
                            <td class="align-middle text-center">{{gm.gm_unit}}</td>
                            <td class="align-middle text-right">{{gm.gm_price_add_vat | comma}}</td>
                            <td class="text-center" scope="row">
                                <div class="cube_box">
                                    <div class="cube" :class="{show_right: gm.ea}">
                                        <div class="piece front">
                                            <b-button variant="primary" size="sm">구매</b-button>
                                        </div>
                                        <div class="piece right">
                                            <vue-numeric-input align="center" :min="0" width="100%" v-model="gm.ea"></vue-numeric-input>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <b-row v-if="content.goods_model" class="total">
            <b-col cols="12" class="text-right">
                <b class="mr-3">합계</b> {{total | comma}} 원
            </b-col>
        </b-row>

        <transition name="fade">
            <b-row class="action_btn pt-3 sticky-top">
                <b-col cols="12" class="text-right">
                    <b-button-group>
                        <b-button variant="success" @click="action('pay')">구매하기</b-button>
                        <b-button variant="info" @click="action('wish')">찜</b-button>
                        <b-button variant="warning" @click="action('putCart')">장바구니</b-button>
                        <b-button variant="danger" @click="action('estimate')">견적요청</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </transition>



        <b-row class="mt-5 goods_desc"><b-col v-html="content.gd_desc"></b-col></b-row>
        
        <b-row class="mt-5">
            <b-col class="text-center">
                <br />
                <hr />
                <br />
                <object 
                    v-for="(file, i) in content.file_goods_add"
                    :key="i" 
                    v-if="file.type == 'pdf'" 
                    :data="file.path" type="application/pdf" style="width:1100px; height:700px;" >
                </object>
            </b-col>
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


export default {
    directives:{
        "click-outside" : {
            bind: function (el, binding, vnode) {
                el.clickOutsideEvent = function (event) { // here I check that click was outside the el and his children
                    // if (!(el == event.target || el.contains(event.target))) { // and if it did, call method provided in attribute value
                    //     vnode.context[binding.expression](event);
                    // }
                    if (!(el == event.target || el.contains(event.target)))
                        vnode.context[binding.arg](event, binding.value);
//                     if(event.target.classList.contains('optionLi')) {
//                         if (!(el == event.target || el.contains(event.target))) { // 또다른 옵션이라면 다른 열려있는 옵션 닫기
//
//
//                             for (var i in vnode.context.$data.content.option) {
// console.log(binding.value);
//                                 if (binding.value != i) {
//                                     if (vnode.context.$data.content.option[i].hasOwnProperty('show'))
//                                         vnode.context.$data.content.option[i].show = false;
//                                 }
//                             }
//                         }
//                     } else {
//                         vnode.context[binding.arg](event, i);
//                     }

                };
                document.body.addEventListener('click', el.clickOutsideEvent)
            },
            unbind: function (el) {
                document.body.removeEventListener('click', el.clickOutsideEvent)
            },
        }
    },
    components: {
        'Location': () => import('./_comp/Location.vue'),
        // Splide, SplideSlide,
        VueNumericInput,
    },
    data() {
        return {
            categorys: {},
            content:{
                maker:{},   /// 릴레이션 로딩시간으로 인해 초기에 값이 없다는 에러를 대처하기 위해 초기값 세팅
                image_src:{},
                goods_category_first:{},
            },
            hadModelEa: false,
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


        // categorys[2].filter(ca => ca.ca_id == v_model.ca03)[0].ca_name
    },
    methods: {
        async show(){
            try {
                const res = await ax.get(`/api/shop/goods/${this.$route.params.gd_id}`);
                if (res && res.status === 200) {
                    this.content = res.data.goods;
                    this.categorys = res.data.categorys;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        action(type) {
            // let model =  this.content.goods_model.reduce((acc, el) => {
            //     if (el.ea > 0) acc.push({gm_id:el.gm_id, ea:el.ea});
            //     return acc;
            // }, []);
            // let option =  this.content.option.reduce((acc, el) => {
            //     return acc.concat(el.option_child.reduce((acc02, el02) => {
            //         if (el02.ea > 0) acc02.push({opc_id:el02.opc_id, ea:el02.ea});
            //         return acc02;
            //     }, []));
            // }, []);



    //         let model = this.content.goods_model.reduce(function (acc, el) {
    //             if (el.ea > 0) {
    //                 if (!acc[el.gm_gd_id])
    //                     acc[el.gm_gd_id] = {};
    //                 if (!acc[el.gm_gd_id][el.gm_id])
    //                     acc[el.gm_gd_id][el.gm_id] = [];
    //                 acc[el.gm_gd_id][el.gm_id].push(el.ea);
    //             }
    //             return acc;
    //         }, {});
    //
    //         let option =  this.content.option.reduce((acc, el) => {
    //             return Object.assign(
    //                 acc,
    //                 el.option_child.reduce((acc02, el02) => {
    //                     if (el02.ea > 0) {
    //                         if (!acc[el02.opc_op_id])
    //                             acc[el02.opc_op_id] = {};
    //                         if (!acc[el02.opc_op_id][el02.opc_id])
    //                             acc[el02.opc_op_id][el02.opc_id] = [];
    //                         acc[el02.opc_op_id][el02.opc_id].push(el02.ea);
    //                     }
    //                     return acc02;
    //                 }, {})
    //             );
    //         }, {});


            let params = this.makeParam();
            // if (isEmpty(params.model)) {
            //     Notify.modal("모델을 선택하세요");
            //     return false;
            // }
            switch (type) {
                case "pay":
                    if (isEmpty(params.model)) {
                        Notify.modal("모델을 선택하세요");
                        return false;
                    }
                    
                    let required_key = Array();
                    let required_key_cnt = 0;
                    for (let k in this.content.option) {
                        if (this.content.option[k].op_required == 'Y')
                            required_key.push(this.content.option[k].op_id);
                    }
                    for (let k in required_key) {                        
                        for (let k2 in params.option) {
                            if (params.option[k2].op_id == required_key[k]) {
                                required_key_cnt++;
                                break;
                            }
                        }
                    }
                    if (required_key_cnt !== required_key.length) {
                        Notify.modal("필수 옵션을 선택하셔야 합니다.");
                        return false;
                    }
                    this.$router.push({name: 'order_settle', params: { od_goods: [params], od_type: 'buy_inst' }});
                break;

                case "putCart":
                    this.$store.dispatch('cart/examine', {goods:this.content, params:params});
                break;

                case "wish":
                    this.$store.dispatch('cart/examine', this.content);
                break;

                case "estimate":
                    if (isEmpty(params.model)) {
                        Notify.modal("모델을 선택하세요");
                        return false;
                    }
                    this.$router.push({name: 'estimate_create', params: { od_goods: [params], od_type: 'request_estimate' }});
                break;
            }
        },
        // async putCart(){
        //     try {
        //         let addGm = this.content.goods_model.filter(gm => gm.ea>0);
        //         if (addGm.length) {
        //             let notInCart_gd = true;
        //             for (var i in this.cartList) {
        //                 if (this.cartList[i].gd_id == this.content.gd_id) {
        //                     notInCart_gd = false;
        //                     for (var j in addGm) {
        //                         let notInCart_gm = true;
        //                         for (var k in this.cartList[i].goods_model) {
        //                             if (addGm[j].gm_id == this.cartList[i].goods_model[k].gm_id) { // 해달 모델이 있으면 갯수 증가
        //                                 notInCart_gm = false;
        //                                 this.cartList[i].goods_model[k].ea += addGm[j].ea;
        //                                 break;
        //                             }
        //                         }
        //                         if (notInCart_gm) { //  해당 모델이 없으면 모델 추가
        //                             this.cartList[i].goods_model.splice(0, 0, addGm[j]);
        //                         }
        //                     }
        //                     break;
        //                 }
        //             }
        //
        //             if (notInCart_gd) {  //  해당 상품이 없으면 상품 추가
        //                 let tmp = copy(this.content);
        //                 tmp.goods_model = tmp.goods_model.filter(x => { return x.ea>0; }); //  선택된 모델면 추린다
        //                 this.$store.dispatch('cart/addCart', tmp);
        //             }
        //         }
        //     } catch (e) {
        //         Notify.consolePrint(e);
        //         Notify.toast('warning', e.responsee);
        //     }
        // },


        makeParam () {
            return {    gd_id:  this.content.gd_id,
                        model:  this.paramModel(),
                        option: this.paramOption() };
        },
        paramModel () {
            return this.content.goods_model.reduce((acc, el) => {
                if (el.ea > 0)
                    acc.push({gm_id:el.gm_id, ea:el.ea});
                return acc;
            }, []);
        },
        paramOption () {
            return this.content.option.reduce((acc, el) => {
                return acc.concat(el.option_child.reduce((acc02, el02) => {
                    if (el02.ea > 0) acc02.push({op_id:el02.opc_op_id, opc_id:el02.opc_id, ea:el02.ea});
                    return acc02;
                }, []));
            }, []);
        },
        option_hide(e, idx) {
            this.$set(this.content.option[idx], 'show', false);
        },
        checkValue(opc) {
            if (Number.isNaN(opc.ea)) {
                this.$set(opc, 'ea', 0);
                this.$set(opc, 'show', false);
            }
        },
    },
    async mounted() {
        await this.show();
    },
}
</script>

<style lang="css" scoped>
#goods_show .slide_goods >>> .carousel-inner .carousel-item img { width:100%; height:600px; object-fit:cover; }

#goods_show .splide { margin: auto;  }
#goods_show .splide .splide__track ul li img { width:333px; height:301px; object-fit:cover; }

#goods_show .gd_info ul li:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
#goods_show .gd_info ul li div { float:left; font-size:1.5rem; }
#goods_show .gd_info ul li div:nth-child(1) { width:30%; min-width:100px; font-weight:bold; }

#goods_show .optoins li { position:relative; margin:1rem; background-color:#666; color:#fff; border-radius:1rem; padding:1rem; cursor:pointer; }
#goods_show .optoins li ul { position:absolute; z-index:2; width:90%; overflow:hidden; background-color:#fff; border-radius:10px; max-height:0; border:0px solid #000; transition:all .3s ease-in; }
#goods_show .optoins li ul.focus { max-height:1000px; box-shadow:0 1px 15px 1px rgba(39,39,39,.5); border-width:3px; }
#goods_show .optoins li ul li:after { content:"&nbsp;"; display:block; clear:both; visibility:hidden; line-height:0; height:0; }
#goods_show .optoins li ul li span:nth-of-type(1) { float:left; }
#goods_show .optoins li ul li span:nth-of-type(2) { float:right; }

#goods_show .selectedOptoins li { margin:1rem; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; }
#goods_show .selectedOptoins li .cellName { flex: 4 1 auto; }
#goods_show .selectedOptoins li .cellCalc { flex: 1 1 auto; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; }
#goods_show .selectedOptoins li .cellCalc span svg { margin:0 1rem; }

#goods_show .goods_model table thead tr th { text-align:center; }
#goods_show .goods_model .cube_box, #goods_show .goods_model .cube_box * { box-sizing: border-box; }
#goods_show .goods_model .cube_box { width:100px; height:30px; perspective:400px; margin:auto; }
#goods_show .goods_model .cube_box .cube { position: relative; transform-style: preserve-3d;
    width:100px; height:30px;
    transform: translateZ(-50px); transition: transform .2s; }
#goods_show .goods_model .cube_box .cube .piece { position:absolute; width:100px; height:30px; text-align: center; }
#goods_show .goods_model .cube_box .cube .piece.front  { transform: rotateY(  0deg) translateZ(50px); }
#goods_show .goods_model .cube_box .cube .piece.right  { transform: rotateY( 90deg) translateZ(50px); }
#goods_show .goods_model .cube.show_front  { transform: translateZ(-50px) rotateY(   0deg); }
#goods_show .goods_model .cube.show_right, #goods_show .goods_model .cube_box .cube:hover  { transform: translateZ(-50px) rotateY( -90deg); }

#goods_show .goods_desc img { width:100%; }


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
