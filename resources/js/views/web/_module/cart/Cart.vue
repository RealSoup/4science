<template>
<div id="Cart"
    @mouseenter="mouseHover = true"
    @mouseleave="mouseHover = false"
    :class="[{fixed_header:isScrollPass}, {hideCart:(!mouseHover || cntItem == 0)}]"
>
    <b-link :to="{name:'cart_index'}"><b-img :src="s3url+'common/basket.png'" /></b-link>
    
    <div class="list_box" v-if="cntItem">
        <ul>
        <template v-for="(item, i) in cartList">
            <CartModel v-if="item.type=='model'" v-model="cartList[i]" @outCart="outCart(i)" :key="i" />
            <CartOption v-else-if="item.type=='option'" v-model="cartList[i]" @outCart="outCart(i)" :key="i" />
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
            return this.cartList.length;  //  초기 디비 로딩 시간동안 없는걸로 나와서 오류 발생 방지 분기문
        },
    },
    methods: {
        index() {
            this.$store.dispatch('cart/index');
        },
        outCart(i){
            this.$store.dispatch('cart/destroy', [{type:this.cartList[i].type, id:this.cartList[i].cm_id??this.cartList[i].co_id}]);
        },
        action(type) {
            let params = this.makeParam();
            let cntModel = params.reduce(function(acc, el) {
                return (el.hasOwnProperty('gm_id')) ? acc+1 : acc;
            }, 0);

            if (!cntModel) {
                Notify.modal("모델을 선택하세요", 'info');
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
            this.cartList.forEach(ct => {
                if (ct.ea > 0 && ct.ct_check_opt == 'Y') {
                    if (ct.type == 'model')         params.push({gd_id:ct.gd_id, gm_id:ct.gm_id, ea:ct.ea});
                    else if (ct.type == 'option')   params.push({gd_id:ct.gd_id, goc_id:ct.goc_id, ea:ct.ea});
                }               
            });
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
    position:absolute; top:19px; right:0; z-index:17; background:#FFF;
    border-color:#113F8C; border-style:solid; border-top-width:3px; border-left-width:3px; border-bottom-width:3px; border-right-width:0;
    border-bottom-left-radius:10px; box-shadow:-2px 2px 2px 0px rgb(0 0 0 / 15%);
    height:100%; max-height:680px; transition:all 0.3s;
}
#Cart>a { display:inline-block; position:absolute; top:-3px; background:inherit; margin-left:-60px; border-radius:50% 0 0 50%; border-top:3px solid #113F8C; border-bottom:3px solid #113F8C; }
#Cart>a:before { content:""; background:inherit; position:absolute; left:-20px; top:-3px; border:3px solid #113F8C; border-right-width:0; border-radius:50% 0 0 50%; width:60px; height:62px; }
#Cart>a img { margin:8px 5px; position:relative; width:67%; }

#Cart .list_box { overflow:hidden; height:100%; max-height:520px; }
#Cart .list_box ul { overflow-y:auto; width:254px; height:100%; transition:all 0.2s;}
#Cart .list_box ul >>> li { margin:0; padding:10px 15px; }
#Cart .list_box ul >>> li.hr { border-top:2px solid #eee; margin:15px; padding:0; }
#Cart .list_box ul >>> li>div { padding:0; justify-content:space-between; display:flex; }

#Cart .list_box ul >>> li>div:nth-of-type(2) { flex-direction:column; align-items:flex-end; }
#Cart .list_box ul >>> li.gd_model>div:nth-of-type(2) { margin-left:10px; }
#Cart .list_box ul >>> li>div .btn_x { position:absolute; bottom:0; left:0; padding: 0.35em 0.4em; cursor:pointer; z-index:1; }
#Cart .list_box ul >>> li>div a img { transition:all 0.2s; width:80px; height:80px; object-fit:cover; }
#Cart .list_box ul >>> li .hide { transition:all 0.2s; overflow:hidden; }

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
#Cart.hideCart { height:auto; border-bottom-left-radius:0; box-shadow:none; }
#Cart.hideCart ul { width:64px; }
#Cart.hideCart ul>>>li { padding:3px 7px; }
#Cart.hideCart ul>>>li:not(:first-child) {display:none; }
#Cart.hideCart ul>>>li .hide { max-width:0; height:0; margin:0 !important; padding:0 !important; }
#Cart.hideCart ul>>>li>div a img { border-radius:50%; width:50px; height:50px; }

@media (max-width: 992px){
    #Cart { top: 100px; }
    #Cart .list_box { width:0; }
}
    
</style>