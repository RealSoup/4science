<template lang="html">
    <div id="Cart"
        @mouseenter="mouseHover = true"
        @mouseleave="mouseHover = false"
        :class="[{fixed_header:isScrollPass}, {hideCart:!mouseHover}]"
    >
        <b-link><b-img src="/img/common/basket.png" /></b-link>
        
        <div class="list_box">
            <ul>
            <template v-for="(gd, i) in cartList">
                <CartModel
                    v-for="(gm, j) in gd.goods_model"
                    :key="gm.gm_id"
                    :src="gd.image_src_thumb[0]"
                    v-model="cartList[i].goods_model[j]"
                    @outCart="outCart('model', i, j)"
                />

                <CartOption
                    v-for="(opc, k) in gd.option_child"
                    :key="opc.opc_id"
                    v-model="cartList[i].option_child[k]"
                    @outCart="outCart('option', i, k)"
                />

                <b-row v-if="i != Object.keys(cartList).length-1" :key="'gd_'+gd.gd_id" tag="li" class="hr"></b-row>
            </template>
            </ul>
        </div>
        

        <div class="footer" v-if="mouseHover">
            <div>총 <b v-if="cartList">{{cntItem}}</b>개의 상품</div>
            <div><span>결제 예정 금액</span> <b>{{totalPrice | comma}}</b></div>
            
            <b-button-group>
                <b-button @click="action('settle')">바로 구매</b-button>
                <b-button @click="action('estimate')">견적 요청</b-button>
            </b-button-group>
        </div>
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import VueNumericInput from 'vue-numeric-input'

export default {
    components: {
        VueNumericInput,
        'CartModel': () => import('./CartModel.vue'),
        'CartOption': () => import('./CartOption.vue'),
    },
    data () {
        return {
            ck_key: 'CartGoods',
            isScrollPass:false,
            mouseHover:false,
        }
    },
    computed: {
        ...mapState('cart', ['cartList']),
        ...mapGetters('cart', ['totalPrice']),
        cntItem() {
            if(this.cartList.length) {  //  초기 디비 로딩 시간동안 없는걸로 나와서 오류 발생 방지 분기문
                return this.cartList.reduce(function (acc, el) {
                    return acc + el.goods_model.length;
                }, 0);
            }
        },
    },
    methods: {
        index() {
            this.$store.dispatch('cart/index');
        },
        outCart(type, p_idx, c_idx){
            this.$store.dispatch('cart/destroy', { type:type, p_idx:p_idx, c_idx:c_idx });
        },
        action(type) {
            let params = this.makeParam();
            let cntModel = params.reduce((acc, el) => {
                return acc + el.model.length;
            }, 0);
            if (!cntModel) {
                Notify.modal("모델을 선택하세요");
                return false;
            }



            switch (type) {
                case "settle":
                    this.$router.push({name: 'order_settle', params: { od_goods: params, od_type: 'buy_cart' }});
                break;

                case "estimate":
                    this.$router.push({name: 'estimate_create', params: {od_goods: params}});
                break;
            }
        },

        makeParam () {
            let params = [];
            for (var gd of this.cartList) {
                let temp_gm = [];
                let temp_opc = [];
                temp_gm = gd.goods_model.reduce((acc, el) => {
                    if (el.ea > 0 && el.ct_check_opt == 'Y')
                        acc.push({gm_id:el.gm_id, ea:el.ea});
                    return acc;
                }, []);

                if (gd.hasOwnProperty('option_child')) {
                    temp_opc =  gd.option_child.reduce((acc, el) => {
                        if (el.ea > 0 && el.ct_check_opt == 'Y')
                            acc.push({opc_id:el.opc_id, ea:el.ea});
                        return acc;
                    }, []);
                }
                if (temp_gm.length)
                    params.push( {gd_id:gd.gd_id, model:temp_gm, option:temp_opc });
            }
            return params;
        },


        // randomIndex() {
        //     return Math.floor(Math.random() * this.items.length)
        // },
        // add() {
        //     // this.pets.unshift(petname)
        //     // this.items.splice(/*this.randomIndex()*/0, 0, this.nextNum++)
        //     // this.realsoup.splice(/*this.randomIndex()*/0, 0, this.ad)
        //     this.realsoup = Object.assign(
        //         {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
        //         this.ad, // 삽입하려는 내용
        //         this.realsoup, // 수정하려는 객체
        //     )
        // },
        // remove() {
        //     this.items.splice(this.randomIndex(), 1)
        // },
        scrollListener: function (e) {
            this.isScrollPass = window.scrollY > 174
        },
        gm_chg(a){
            console.log(a);
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollListener)
        this.index();
        // console.log(Auth.check());
        // console.log(this.$store.state.isLoggedin);
    },
    beforeDestroy: function () {
       window.removeEventListener('scroll', this.scrollListener)
    }
}
</script>


<style lang="css" scoped>

#Cart { 
    position:absolute; top:173px; right:0; z-index:16; background:#FFF;
    border-color:#113F8C; border-style:solid; border-top-width:3px; border-left-width:3px; border-bottom-width:3px; border-right-width:0;
    border-bottom-left-radius:10px; box-shadow:-2px 2px 2px 0px rgb(0 0 0 / 15%);
    height:100%;
    max-height:680px;
    transition:all 0.4s;
}
#Cart>a { display:inline-block; position:absolute; top:-3px; background:inherit; margin-left:-70px; border-radius:50% 0 0 50%; border-top:3px solid #113F8C; border-bottom:3px solid #113F8C; }
#Cart>a:before { content:""; background:inherit; position:absolute; left:-20px; top:-3px; border:3px solid #113F8C; border-right-width:0; border-radius:50% 0 0 50%; width:67px; height:76px; }
#Cart>a img { margin:10px; position:relative; }

#Cart .list_box  { overflow:hidden; height:100%; max-height:520px; }
#Cart .list_box ul { overflow-y:auto; height:100%; }
#Cart .list_box ul >>> li { margin:0; padding:10px 15px; }
#Cart .list_box ul >>> li.hr { border-top:2px solid #eee; margin:15px; padding:0; }
#Cart .list_box ul >>> li>div { padding:0; justify-content:space-between; display:flex; }

#Cart .list_box ul >>> li>div:nth-of-type(2) { flex-direction:column; align-items:flex-end; }
#Cart .list_box ul >>> li.gd_model>div:nth-of-type(2) { margin-left:10px; }
#Cart .list_box ul >>> li>div .btn_x { position:absolute; top:0; right:-15px; padding: 0.35em 0.4em; cursor:pointer; }
#Cart .list_box ul >>> li>div a img { transition:all 0.4s; width:100px; height:100px; object-fit:cover; }
#Cart .list_box ul >>> li .hide { transition:all 0.4s; overflow:hidden; }

#Cart .list_box ul >>> li.gd_option { flex-direction:column; }
#Cart .list_box ul >>> li.gd_option>div { flex-basis: auto; }
#Cart .list_box ul >>> li.gd_option>div:nth-of-type(1) { align-items:center; }
#Cart .list_box ul >>> li.gd_option>div:nth-of-type(1) span { margin-left: 10px; }

#Cart .footer { border-top:1px solid #888888; margin:20px; position:absolute; bottom:0; width:calc(100% - 40px); padding-top:10px; }
#Cart .footer div b { color:#0072BC; }
#Cart .footer div:nth-of-type(1) { line-height:17px; font-weight:bold; }
#Cart .footer div:nth-of-type(2) { font-size:18px; display:flex; justify-content:space-between; align-items:baseline; font-weight:bold; line-height:20px; margin-bottom:20px; }
#Cart .footer div:nth-of-type(2) b { font-size:26px; }
#Cart .footer .btn-group { display:flex; }
#Cart .footer .btn-group button:nth-of-type(1) { margin-right:10px; }
#Cart .footer .btn-group button:nth-of-type(2) { background:#00A1CB; border-color:#0089AD; }

#Cart.fixed_header { position:fixed; top:85px; }
#Cart.hideCart { height:auto; }
#Cart.hideCart ul>>>li .hide { max-width:0; height:0; margin:0 !important; padding:0; }
#Cart.hideCart ul>>>li>div a img { border-radius: 50%; width: 62px; height: 62px; }


</style>