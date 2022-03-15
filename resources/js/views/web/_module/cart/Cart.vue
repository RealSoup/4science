<template lang="html">
    <div id="Cart"
        @mouseenter="mouseHover = true"
        @mouseleave="mouseHover = false"
        :class="[{fixed_header:isScrollPass}, {expandCart:mouseHover}]">

        <perfect-scrollbar suppressScrollX="true">
            <h4 class="circle">
                <b-icon-minecart />
                <span v-if="cartList">{{cntItem}}</span>
            </h4>
            <transition-group name="cart_list" tag="ul">

                <!-- <router-link :to="{ name: 'goods_show', params: {gd_id: gd.gd_id} }" v-for="gd in recentGoods.slice(i * itemsPerRow, (i + 1) * itemsPerRow)" :key="gd.gd_id" class="list_item">
                    <img :src="gd.image_src_thumb[0]" />
                </router-link> -->

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

                    <b-row :key="'gd_'+gd.gd_id" tag="li">
                        <b-col class="hr"><hr /></b-col>
                    </b-row>
                </template>
            </transition-group>

            <transition name="slide">
                <b-button-group class="mt-3 d-flex" v-if="mouseHover">
                    <b-button variant="success" @click="action('settle')">주문</b-button>
                    <b-button variant="info" @click="action('estimate')">견적</b-button>
                </b-button-group>
            </transition>
        </perfect-scrollbar>

    </div>
</template>

<script>
import ax from '@/api/http';
import { mapState } from 'vuex';
import VueNumericInput from 'vue-numeric-input'

export default {
    props: ['scrollbarYTop'],
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
    watch: {
        'scrollbarYTop' (to, from) {
            this.isScrollPass = to > 30;
        },
    },
    computed: {
        ...mapState('cart', ['cartList']),
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
        // scrollListener: function (e) {
        //     this.isScrollPass = window.scrollY > 70
        // },
        gm_chg(a){
            console.log(a);
        }
    },
    mounted() {
        // window.addEventListener('scroll', this.scrollListener);
        this.index();
        // console.log(Auth.check());
        // console.log(this.$store.state.isLoggedin);
    },
    // beforeDestroy: function () {
    //     window.removeEventListener('scroll', this.scrollListener)
    // },

}
</script>


<style lang="css" scoped>

#Cart { position:absolute; top:70px; right:0; z-index:1; max-width:90px; height:100%; transition:max-width 0.5s ease; }
#Cart >>> .ps { height:100%; padding:20px 0 20px 20px; }
#Cart h4 { position:relative; text-align:center; /*background-color:#FFF;*/ font-size:3rem; color:#000; border-radius:50%; transition:all .5s ease; }
#Cart h4 span { position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:.4em; color:#006471; transition:all .5s ease; }

#Cart ul >>> li { transition:all 0.5s ease; margin: 0.5rem 0 0; width:260px; }
#Cart ul >>> li>div { padding:0; }
#Cart ul >>> li>div:nth-of-type(1):not(.hr) { flex: 0 0 70px; max-width:70px; }
#Cart ul >>> li>div:nth-of-type(2) { padding-left:15px; }
#Cart ul >>> li>div .btn_x { position:absolute; top:0; right:-15px; padding: 0.35em 0.4em; cursor:pointer; }
#Cart ul >>> li>div a img { width:100%; height:100%; object-fit:cover; border-radius:50%; transition:border-radius 0.5s ease; }
#Cart ul >>> li>div .custom-checkbox { position:absolute; left:-15px; }

#Cart.fixed_header { position:fixed; top:0; }
#Cart.expandCart { max-width:310px; }
#Cart.expandCart >>> .ps { padding-right:30px; }
#Cart.expandCart h4 { background-color:#000; font-size:4rem; color:#EEE; border-radius:10px; }
#Cart.expandCart h4 span { font-size:2rem; color:#17a2b8; }
#Cart.expandCart ul >>> li div a img { border-radius:10px; }
#Cart .cart_list-enter,
#Cart .cart_list-leave-to { transform: translateX(-300px); }
#Cart .cart_list-leave-active { position: absolute; }

#Cart .slide-enter-active, #Cart .slide-leave-active { transition: opacity .5s; }
#Cart .slide-enter, #Cart .slide-leave-to { opacity: 0; }





#Cart.expandCart {
    background: linear-gradient(124deg, #FFCBCB, #FFDBCB, #FFF2CB, #FFFFD3, #D1FFD8, #CEFCFF, #D6D1FF, #FCD3FF, #FCD3FF);
    /*background-size: 1800% 1800%;*/
    -webkit-animation: rainbow 8s ease infinite; -z-animation: rainbow 8s ease infinite; -o-animation: rainbow 8s ease infinite; animation: rainbow 8s ease infinite;
}
@-webkit-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@-moz-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@-o-keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
@keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }
</style>
