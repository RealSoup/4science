<template >
    <b-container class="w_fence">
        <p>THANK YOU!</p>
        <p>주문이 완료되었습니다.</p>
        <p>주문내역은 마이페이지 > <b>주문 / 배송조회</b> 에서 확인하실 수 있습니다.</p>
        <ul>
            <li class="dd_style"><span>주문번호</span><span>{{order.od_no}}</span></li>
            <li class="dd_style"><span>결제방법</span><span>{{pay_method}}</span></li>
            <li class="dd_style"><span>결제 예정일</span><span>{{pay_plan}}</span></li>
            <li>
                <b>{{after_10day}}</b>까지 주문 금액이 입금확인이 되지 않으면,
                <br/> <b>자동주문취소</b> 됨을 알려드립니다.
            </li>
        </ul>
        <b-row>
            <b-col><b-button class="gray xl" @click="$router.push({ name: 'my_order'})">주문/배송조회 가기</b-button></b-col>
            <b-col><b-button class="blue xl" @click="$router.push({ name: 'main'})">쇼핑 계속하기</b-button></b-col>
        </b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    props:['value'],
    data() {
        return {
            od_id:this.$route.params.od_id,
            order:{
                order_extra_info:{},
            },

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
        pay_method () {
            switch (this.order.od_pay_method) {
                case 'C': return '카드 결제';                       break;
                case 'B': return '현금결제 (무통장입금)';           break;
                case 'P': return 'PSYS (원격지 연구비 직접결제)';   break;
                case 'R': return '원격결제';                        break;
                case 'E': return '에스크로 (결제대금예치)';         break;
            }
        },
    },
    methods: {
        async show(){
            try {
                const res = await ax.get(`/api/shop/order/done/${this.od_id}`);
                if (res && res.status === 200) {
                    this.order = res.data;
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.responsee);
            }
        },
    },
    mounted() {
        this.show();
    },
}
</script>

<style lang="css" scoped>
.container { text-align:center; }
.container p:nth-child(1) { font-size:3.2rem; color:#1A90D6; font-weight:100; margin-bottom:0; }
.container p:nth-child(2) { font-size:1.9rem; font-weight:bold; }
.container p:nth-child(3) { font-size:1.3rem; font-weight:bold; }
.container p:nth-child(3) b { color:#1A90D6; }
.container ul { border:1px solid #CCCCCC; width:620px; margin:3rem auto; border-radius:16px; padding:1.8rem; }
.container ul .dd_style { display:flex; flex-wrap:wrap; align-items:center; }
.container ul .dd_style span { flex-basis:0; flex-grow:1; max-width:100%; font-weight:600; font-size:1.1rem; }
.container ul .dd_style span:nth-child(1) { text-align:right; padding-right:10px; flex:0 0 39%; max-width:39%; }
.container ul .dd_style span:nth-child(2) { text-align:left; color:#1A90D6; }
.container ul li { line-height:2.3; }
.container ul li:nth-child(1) span:nth-child(2) { font-weight:800; font-size:1.4rem; }
.container ul li:last-child { line-height: 1.5; font-size: .9rem; }
.container ul li:last-child b { font-weight:800; }
.container .row { width:620px; margin:auto; }
.container .row .col:nth-child(1) { padding-left:0; }
.container .row .col:nth-child(2) { padding-right:0; }
.container .row .col .btn { width:100%; }
</style>
