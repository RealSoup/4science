<template >
<b-container class="w_fence">
    <loading-modal :position="'absolute'">주문 처리 중!</loading-modal>
    <!-- <p>THANK YOU!</p>
    <p>주문이 완료되었습니다.</p>
    <p>주문내역은 마이페이지 > <b>주문 / 배송조회</b> 에서 확인하실 수 있습니다.</p>
    <ul>
        <li class="dd_style"><span>주문번호</span><span>{{order.od_no}}</span></li>
        <li class="dd_style"><span>결제방법</span><span>{{config.pay_method[order.od_pay_method]}}</span></li>
        <li class="dd_style"><span>결제 예정일</span><span>{{pay_plan}}</span></li>
        <li class="dd_style"><span>결제 금액</span><span>{{order.od_all_price | comma | won}}</span></li>
        <li v-if="['B'].includes(order.od_pay_method)">
            <b>{{after_10day}}</b>까지 주문 금액이 입금확인이 되지 않으면,
            <br/><b>자동주문취소</b> 됨을 알려드립니다.
            <br/><b class="point">단 대학교, 국가연구기관은 예외</b>
        </li>
    </ul>
    <b-row>
        <b-col><b-button class="gray xl" @click="$router.push({ name: 'my_order'})">주문/배송조회 가기</b-button></b-col>
        <b-col><b-button class="blue xl" @click="$router.push({ name: 'main'})">쇼핑 계속하기</b-button></b-col>
    </b-row> -->
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    props:['value'],
    components: {
        'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'),
    },
    data() {
        return {
            od_id:this.$route.params.od_id,
            od_all_price:0,
        }
    },
    computed: {
        after_10day () { return date_calc('d', 10).format("yyyy년 MM월 dd일"); },
        pay_plan () {
            switch (this.order.order_extra_info.oex_pay_plan) {
                case 'soon': return '선결제';        break;
                case 'week1': return '1주이내';      break;
                case 'week2': return '2주이내';      break;
                case 'month1': return '30일이내';    break;
                case 'month2': return '60일이내';    break;
            }
        },
    },
    
    methods:{
        // naver_js: function () {
        //     let el = document.createElement('script'), self = this;
        //     el.setAttribute('type', 'text/javascript');
        //     el.setAttribute('src', '"//wcs.naver.net/wcslog.js');
        //     document.getElementsByTagName('head')[0].appendChild(el);
        //     // onload에 init 메소드 지정
        //     el.onload = function(){
        //         var _nasa={};
        //         if (window.wcs) _nasa["cnv"] = wcs.cnv("1", this.order.od_all_price);
        //     };
        // }
    },
    async mounted() {
        const res = await ax.get(`/api/shop/order/done/${this.od_id}`);
        if (res && res.status === 200) {
            this.od_all_price = res.data.od_all_price;
            // this.config = res.data.config;

                    /* 네이버 분석 관련 스크립트 */
            if (!wcs_add) var wcs_add={};
            wcs_add["wa"] = "s_256b3162e372";
            var _nasa={};
            if (window.wcs) {
                _nasa["cnv"] = wcs.cnv("1", this.od_all_price);
                wcs_do(_nasa);
            }

            await this.$router.push({ name: 'my_order_show', params: { od_id:this.od_id }});
        }
    },

    beforeRouteEnter (to, from, next) {
        if (from.name == 'order_settle' || to.query.func_name === "payReturn")
            next();
        else {
            Notify.modal("구매 완료한 상품입니다.", 'warning');
            // next(from.path);
            history.forward();
        }
    },
}
</script>

<style lang="css" scoped>
/*
.container { text-align:center; }
.container p:nth-child(1) { font-size:3.2em; color:#1A90D6; font-weight:100; margin-bottom:0; }
.container p:nth-child(2) { font-size:1.9em; font-weight:bold; }
.container p:nth-child(3) { font-size:1.3em; font-weight:bold; }
.container p:nth-child(3) b { color:#1A90D6; }
.container ul { border:1px solid #CCCCCC; width:620px; margin:3em auto; border-radius:16px; padding:1.8em; }
.container ul .dd_style { display:flex; flex-wrap:wrap; align-items:center; }
.container ul .dd_style span { flex-basis:0; flex-grow:1; max-width:100%; font-weight:600; font-size:1.1em; }
.container ul .dd_style span:nth-child(1) { text-align:right; padding-right:10px; flex:0 0 39%; max-width:39%; }
.container ul .dd_style span:nth-child(2) { text-align:left; color:#1A90D6; }
.container ul li { line-height:2.3; }
.container ul li:nth-child(1) span:nth-child(2),
.container ul li:nth-child(4) span:nth-child(2) { font-weight:800; font-size:1.4em; }
.container ul li:last-child { line-height: 1.5; font-size: .9em; }
.container ul li:last-child b { font-weight:800; }
.container ul li b.point { color:#1A90D6; }
.container .row { width:620px; margin:auto; }
.container .row .col:nth-child(1) { padding-left:0; }
.container .row .col:nth-child(2) { padding-right:0; }
.container .row .col .btn { width:100%; }
.container .row .col:first-child { padding-right:15px; }
.container .row .col:last-child { padding-left:15px; }
@media (max-width: 992px){
    .w_fence { font-size:13px; padding-left:5px; padding-right:5px; }
    .container ul,
    .container .row { width:100%;}
    .container .row .col:nth-child(1) { padding-right:5px; }
    .container .row .col:nth-child(2) { padding-left:5px; }
}
*/
.container { min-height: 300px; }
</style>
