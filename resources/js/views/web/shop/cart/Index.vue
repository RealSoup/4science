<template>
<b-container class="w_fence">
    <h3>장바구니</h3>
    <b-row class="cart_info">
        <b-col>견적가 상품이 있을 경우 주문이 이루어지지 않고 '견적요청서 작성'으로 이동합니다. 견적요청서를 작성해 주세요.</b-col>
        <b-col>구매가 상품으로 구성되었을 경우에만 주문서 작성 후 결제를 하실 수 있습니다.</b-col>
        <b-col><b>최소구매 단위는 3만원 이상</b>으로 3만원 미만의 총 구매금액은 구매가 이루어지지 않습니다.</b-col>
    </b-row>
    <b-row class="head cart_data">
        <b-col><b-form-checkbox v-model="all_chk" :indeterminate="indeterminate" @change="toggle_all_chk" /></b-col>
        <b-col></b-col>
        <b-col>주문 상품</b-col>
        <b-col>제조사</b-col>
        <b-col>판매가</b-col>
        <b-col>수량</b-col>
        <b-col>금액</b-col>
        <b-col></b-col>
    </b-row>
    <div v-if="cartList.length" class="container body">
        <b-row v-for="(ct, i) in cartList" :key="ct.ct_id" class="cart_data" :class="{model:ct.type=='model', option:ct.type=='option', no_ea:ct.ea>ct.gm_limit_ea }">
            <template v-if="ct.type=='model'">
                <b-col class="check"><b-form-checkbox v-model="ct.ct_check_opt" value='Y' unchecked-value="N" @change="chkChange" /></b-col>
                <b-col class="img"><img :src="ct.img" class="img-fluid" /></b-col>
                <b-col>
                    <b-link :to="{name: 'goods_show', params:{gd_id:ct.gd_id} }">
                        <div class="tit">{{ct.gd_name}}</div>
                        <ul>
                            <li>모델명:{{ct.gm_code}} / Cat.No.:{{ct.gm_catno}}</li>
                            <li>제품명:{{ct.gm_name}} / 사양:{{ct.gm_spec}}</li>
                            <li>판매단위:{{ct.gm_unit}}</li>
                        </ul>
                    </b-link>
                </b-col>            
                <b-col class="maker">{{ct.mk_name}}</b-col>
                <b-col class="price">
                    <span class="price_box" :class="{price_discount:ct.price_dc_add_vat}">
                        <span class="normal">{{ct.price_add_vat | comma | price_zero | won}}</span>
                        <span class="discount">{{ct.price_dc_add_vat | comma | price_zero | won}}</span>
                    </span>
                </b-col>
                <b-col>
                    <div class="box"><input-no v-model="cartList[i]" /></div>
                </b-col>
                <b-col class="price sum">
                    <span class="price_box" :class="{price_discount:ct.price_dc_add_vat}">
                        <span class="normal">{{ct.price_add_vat*ct.ea | comma | price_zero | won}}</span>
                        <span class="discount">{{ct.price_dc_add_vat*ct.ea | comma | price_zero | won}}</span>
                    </span>
                </b-col>
                <b-col class="ctrl"><b-button pill variant="outline-dark" size="sm" @click="outCart(i)">삭제</b-button></b-col>
            </template>

            <template v-else-if="ct.type=='option'">
                <b-col class="check"><b-form-checkbox v-model="ct.ct_check_opt" value='Y' unchecked-value="N" @change="chkChange" /></b-col>
                <b-col class="img">추가옵션</b-col>
                <b-col>{{ct.go_name}}:{{ct.goc_name}} <b-badge v-if="ct.go_required=='Y'" variant="danger">필수</b-badge></b-col>
                <b-col></b-col>
                <b-col class="price">{{ct.price_add_vat | comma | price_zero | won}}</b-col>
                <b-col>
                    <div class="box"><input-no v-model="cartList[i]" /></div>
                </b-col>
                <b-col class="price sum">{{ct.price_add_vat*ct.ea | comma | price_zero | won}}</b-col>
                <b-col class="ctrl"><b-button pill variant="outline-dark" @click="outCart(i)">삭제</b-button></b-col>
            </template>
        </b-row>

        <b-row class="delete">
            <b-col>선택한 상품을 <b-button class="white" @click="outCart('chk')">삭제</b-button></b-col>
        </b-row>
        <b-row class="total">
            <b-col>상품금액</b-col>
            <b-col><b>{{sum_goods+surtax | comma}}</b> 원</b-col>
            <b-col>배송료</b-col>
            <b-col>다음 페이지에서 확인</b-col>
            <b-col>결제 예정 금액</b-col>
            <b-col><b>{{sum_goods+surtax | comma}}</b> 원</b-col>
        </b-row>
        <b-row class="total_sub">
            <b-col>
                <div>
                    <b-col>상품가</b-col>
                    <b-col>{{sum_goods | comma}} 원</b-col>
                </div>
                <div>
                    <b-col>부가세</b-col>
                    <b-col>{{surtax | comma}} 원</b-col>
                </div>
            </b-col>
            <b-col></b-col>
            <b-col>
                <div v-if="!this.$store.state.auth.user.is_dealer">
                    <b-col>적립예정 마일리지</b-col>
                    <b-col>{{sum_mileage | comma}} 원</b-col>
                </div>
                <div><b-col>&nbsp;</b-col><b-col></b-col></div>
            </b-col>
        </b-row>
        <b-row class="dlvy_info"><b-col>
            총 구매금액이 {{goodsDefault.free_dlvy_max | comma | won}} 미만일 경우 배송료 {{goodsDefault.dlvy_fee_add_vat | comma | won}}이 부과됩니다.
        </b-col></b-row>
        <b-row class="btn_box"><b-col>
            <b-button @click="action('estimate')" class="gray xl">견적 요청하기</b-button>
            <b-button @click="action('settle')" class="blue xl" v-if="!hide_order_btn">주문하기</b-button>
        </b-col></b-row>
    </div>
    <b-row v-else><b-col><b-alert variant="danger" show>No Item</b-alert></b-col></b-row>
    
</b-container>
</template>

<script>
import ax from '@/api/http';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'ShopCartIndex', 
    components: { 
        'input-no': () =>   import('./InputNo'),
    },
    data() {
        return { 
            page:1, 
            indeterminate:false,
            all_chk:true,
            hide_order_btn: false,
        }
    },
    computed: {
        ...mapState('cart', ['cartList']),
        // sum_goods_add_vat () {
        //     let p = Object.values(this.cartList).reduce((acc, el) => 
        //         acc + ((el.ct_check_opt=='Y')?((el.price_dc_add_vat ?? el.price_add_vat)*el.ea):0)
        //     , 0);
        //     if (Auth.user() && Auth.user().level == 12)
        //         p = p*Auth.user().dc_mul;
        //     return p;
        // },
        sum_goods () {
            let p =  Object.values(this.cartList).reduce((acc, el) => { 
                return acc + (el.ct_check_opt=='Y'?(el.price_dc ?? el.price)*el.ea:0); 
            }, 0);
            if (Auth.user() && Auth.user().level == 12)
                p = p*Auth.user().dc_mul;
            return p;
        },

        surtax () { return Math.floor(this.sum_goods*0.1); },

        sum_mileage () {
            return Object.values(this.cartList).reduce((acc, el) => { 
                return acc + ((el.ct_check_opt=='Y')?((el.price_dc ?? el.price)*el.ea*Auth.user().mileage_mul):0); 
            }, 0);
        },
        goodsDefault() {
            return this.$store.state.goods.default;
        },
    },
    methods:{
        async outCart(i) {
            let id_arr = [];
            if (i=='chk') {
                let chkCnt = Object.values(this.cartList).filter(el => el.ct_check_opt=='Y').length;
                if (chkCnt) {
                    for (const v of this.cartList) 
                        if ( v.ct_check_opt == 'Y' ) 
                            id_arr.push(v.ct_id);                        
                } else {
                    Notify.modal("상품을 선택하세요", 'warning');
                    return false;
                }
                
            } else 
                id_arr.push(this.cartList[i].ct_id);
            
            if (await Notify.confirm('삭제', 'danger'))
                this.$store.dispatch('cart/destroy', id_arr);
        },
        chkChange () {
            let chkCnt = Object.values(this.cartList).filter(el => el.ct_check_opt=='Y').length;         
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.all_chk = false;
            } else if (chkCnt === Object.keys(this.cartList).length) {
                this.indeterminate = false;
                this.all_chk = true;
            } else {
                this.indeterminate = true;
                this.all_chk = false;
            }
        },
        toggle_all_chk(chk) {
            for(let k in this.cartList) this.cartList[k].ct_check_opt = chk ? 'Y' : 'N';
            this.indeterminate = false;
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
                    let estimate_price_list = this.cartList.filter(ct => ct.ea > 0 && ct.ct_check_opt == 'Y' && ct.price == 0);
                    if (estimate_price_list.length) {
                        Notify.modal("견적가 상품은 견적요청을 해주세요.", 'danger');
                        return false;
                    }
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
    },
    mounted() {
        this.$store.dispatch('cart/index');
    },
}
</script>

<style lang="css" scoped>
.w_fence .container { padding:0; }
.w_fence .cart_info { line-height:1.75; margin-bottom:2.4rem; }
.w_fence .cart_info .col { flex:0 0 100%; max-width:100%; }
.w_fence .head { border-top:2px solid #363636; border-bottom:1px solid #D7D7D7; padding:.7rem 0; }
.w_fence .head .col { font-weight:bold; text-align:center; font-size:.9rem; }
.w_fence .body .cart_data { border-bottom:1px solid #D7D7D7; }
.w_fence .body .row.model { height:150px; }
.w_fence .body .row.option { min-height:50px !important; background-color:#F4F1EC; }
.w_fence .body .row.no_ea { background: #FFCCCC; }
.w_fence .body .row.no_ea::before { color:#FF0000; content:"재고 부족"; position:absolute; z-index:2; font-weight:900; font-size:2.5em; left:50%; transform:rotateZ(-21deg); } 
.w_fence .body .row .col,
.w_fence .body .row .col ul li { color:#949494; }
.w_fence .body .row .col a .tit { font-weight:900; font-size:.9.5rem; }
.w_fence .body .row .col ul li { font-size:.8rem; }
.w_fence .body .row .price { text-align:right; }
.w_fence .body .row .sum { font-weight:bold; font-size:1.1rem; color:#000; }
.w_fence .body .row .check,
.w_fence .body .row .maker,
.w_fence .body .row .ctrl { text-align:center; }
.w_fence .body .row .col .box { margin:0 15px; }
.w_fence .body .row .img { text-align:center; }
.w_fence .body .row .img img { width:120px; height:120px; object-fit:cover; }
.w_fence .row { align-items:center; }
.w_fence .row .col { padding:0; }
.w_fence .row .col .custom-checkbox>>>label::before, 
.w_fence .row .col .custom-checkbox>>>label::after { top:2px; left:-1.2rem; width:1.5rem; height:1.5rem; }
.w_fence .cart_data .col:nth-child(1) { flex:0 0 4%; max-width:4%; }
.w_fence .cart_data .col:nth-child(2) { flex:0 0 11%; max-width:11%; }
.w_fence .cart_data .col:nth-child(3) {  }
.w_fence .cart_data .col:nth-child(4) { flex:0 0 9%; max-width:9%; }
.w_fence .cart_data .col:nth-child(5) { flex:0 0 9%; max-width:9%;}
.w_fence .cart_data .col:nth-child(6) { flex:0 0 9%; max-width:9%; }
.w_fence .cart_data .col:nth-child(7) { flex:0 0 9.5%; max-width:9.5%; }
.w_fence .cart_data .col:nth-child(8) { flex:0 0 6%; max-width:6%; }

.w_fence .delete .col { padding:1.2rem 2rem; }
.w_fence .delete .col button { padding:.3rem 1rem; border-color:#666; margin-left:1rem; }
.w_fence .total { border-top:2px solid #363636; border-bottom:1px solid #D6D6D6; align-items:stretch; }
.w_fence .total .col { color:#000 !important; font-weight:bold; padding:1rem; display:flex; align-items:center; }
.w_fence .total .col b { font-size:1.4rem; }
.w_fence .total .col:nth-child(odd) { padding-left:3rem; }
.w_fence .total .col:nth-child(even) { padding-right:3rem; justify-content:flex-end; }
.w_fence .total .col:nth-of-type(1) { display:flex; align-items:center; }
.w_fence .total .col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.w_fence .total .col:nth-of-type(2):after { background:#707070; width:25px; height:25px; border-radius:13px; content:"+"; position:absolute; top:20px; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2; }
.w_fence .total .col:nth-of-type(3) { display:flex; align-items:center; }
.w_fence .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; color:#FF0000 !important; }
.w_fence .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; content:"="; position:absolute; top:20px; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.2; }
.w_fence .total .col:nth-of-type(5) { display:flex; align-items:center; flex-basis:20%; max-width:20%; }
.w_fence .total .col:nth-of-type(6) { flex-basis:20%; max-width:20%; }
.w_fence .total_sub { background:#F2F3F5; border-bottom-width:0; }
.w_fence .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.w_fence .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.w_fence .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }
.w_fence .total_sub .col>div { display:flex; flex-wrap:wrap; }
.w_fence .total_sub .col>div:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem; }
.w_fence .total_sub .col>div:nth-of-type(2) { padding:0 3rem 2.5rem 3rem; }
.w_fence .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.w_fence .total_sub .col>div .col:nth-of-type(2) { text-align:right; }
.w_fence .dlvy_info .col { color:#898989; text-align:center; padding:.7rem; }

@media (max-width: 992px){
    .w_fence { padding-top:1rem; }
    .w_fence h3 { margin-bottom:0; }
    .w_fence .head { display:none; }
    .w_fence .cart_info { margin: 1rem -10px; }
    .w_fence .cart_data .col:nth-child(1) { flex:0 0 10%; max-width: 10%; }
    .w_fence .cart_data .col:nth-child(2) { flex:0 0 22%; max-width:22%; }
    .w_fence .cart_data .col:nth-child(3) { flex:0 0 68%; max-width:68%; padding-left:10px !important; }
    .w_fence .cart_data .col:nth-child(4) { flex:0 0 30%; max-width:30%; font-size: calc(1vw + .6rem); }
    .w_fence .cart_data .col:nth-child(5) { flex:0 0 30%; max-width:30%; font-size: calc(1vw + .6rem); margin-left:auto; }
    .w_fence .cart_data .col:nth-child(6) { flex:0 0 40%; max-width:100px; }
    .w_fence .cart_data .col:nth-child(7) { flex:0 0 60%; max-width:60%; font-size: calc(1.4vw + .7rem); text-align:right; margin-left:auto; }
    .w_fence .cart_data .col:nth-child(8) { flex:0 0 40%; max-width:60px; }
    .w_fence .cart_data .col:nth-child(8) .btn { padding:0 .2rem;  border-radius:.2rem; }
    
    .w_fence .body .row.model { min-height:150px; height:auto; padding:15px 0; }
    .w_fence .body .row .col { padding:3px 0; }
    .w_fence .body .row .col .box { margin:0 8px; }
    .w_fence .body .row .col .box>>>.vue-numeric-input { width:100% !important; height:1.3rem; }
    .w_fence .body .row .col .box>>>.vue-numeric-input .input-btn { width:1.3rem; }
    .w_fence .body .row .col .box>>>.vue-numeric-input .numeric-input { padding:2px 1rem; }

    .w_fence .delete .col { text-align:right; }
    .w_fence .total .col:nth-of-type(odd) { flex-basis:45%; max-width:45%; }
    .w_fence .total .col:nth-of-type(even) { flex-basis:55%; max-width:55%; }
    .w_fence .total .col:nth-of-type(2):after,
    .w_fence .total .col:nth-of-type(4):after { content:none; }
    .w_fence .total_sub>.col:nth-of-type(1),
    .w_fence .total_sub>.col:nth-of-type(2),
    .w_fence .total_sub>.col:nth-of-type(3) { flex-basis:100%; max-width:100%; }
    .w_fence .total_sub .col>div{ padding:2vw !important; }
    .w_fence .btn_box .col { padding:0 10px !important; }
    .w_fence .btn_box .col button { width:100%; margin-bottom:3px; }
}
</style>
