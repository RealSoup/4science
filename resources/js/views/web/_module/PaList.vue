<template>
<b-container class="pa_list frm_st">
    <b-row class="lhead">
        <b-col>주문 상품</b-col>        
        <b-col>제조사</b-col>
        <b-col>판매가</b-col>
        <b-col>수량</b-col>
        <b-col>금액</b-col>
        <b-col>배송비</b-col>
    </b-row>
    <b-row v-for="(pa, pa_id) in value" :key="pa_id" class="lbody">
        <b-col class="m_hide">{{pa[0]['pa_name'] ? '업체' : '포사이언스'}}<br />배송</b-col>
        <b-col>
            <b-row v-for="(item, i_item) in pa" :key="`${pa_id}${i_item}`" :class="{option:item.type == 'option'}">
                <template v-if="item.type == 'model'">
                    <b-col><img :src="item.img" /></b-col>
                    <b-col>
                        <p>{{item.gd_name}}</p>
                        <p>모델명:{{item.gm_code}} / Cat.No.:{{item.gm_catno}}</p>
                        <p>제품명:{{item.gm_name}} / 사양:{{item.gm_spec}}</p>
                        <p>판매단위:{{item.gm_unit}}</p>
                    </b-col>
                    <b-col>{{item.mk_name}}</b-col>
                    <b-col>{{item.price_add_vat | comma}} 원</b-col>
                    <b-col>{{item.ea}} 개</b-col>
                    <b-col>
                        <div>
                            {{item.price_add_vat*item.ea | comma}} 원
                            <br />
                            <span>({{item.gain_mileage*item.ea | comma}}p 적립)</span>
                        </div>
                    </b-col>
                </template>
                <template v-else-if="item.type == 'option'">
                    <b-col>추가 옵션</b-col>
                    <b-col>{{item.goc_name}}</b-col>
                    <b-col></b-col>
                    <b-col>{{item.price_add_vat | comma}} 원</b-col>
                    <b-col>{{item.ea}} 개</b-col>
                    <b-col>
                        <div>
                            {{item.price_add_vat*item.ea | comma}} 원
                            <br />
                            <span>({{item.gain_mileage*item.ea | comma}}p 적립)</span>
                        </div>
                    </b-col>
                </template>
            </b-row>
        </b-col>

        <b-col>
            <template v-if="pa[0]['pa_type'] == 'AIR'">항공운임료</template>
            <template v-else>배송비</template>
            <br />
            {{pa[0].pa_dlvy_p_add_vat | comma}} 원
        </b-col>
    </b-row>

    <b-row v-if="price" class="total">
        <b-col>상품금액</b-col>
        <b-col><b>{{price.goods_add_vat | comma}}</b> 원</b-col>
        <b-col>배송료</b-col>
        <b-col><b>{{price.air_add_vat+price.dlvy_add_vat | comma}}</b> 원</b-col>
        <b-col>결제 예정 금액</b-col>
        <b-col><b>{{price.total | comma}}</b> 원</b-col>
    </b-row>
    <b-row v-if="price" class="total_sub" id="total_sub">
        <b-col>
            <div>
                <b-col>상품가</b-col>
                <b-col>{{price.goods | comma}} 원</b-col>
            </div>
            <div>
                <b-col>부가세</b-col>
                <b-col>{{price.surtax | comma}} 원</b-col>
            </div>
        </b-col>
        <b-col>
            <div>
                <b-col>포사이언스 배송</b-col>
                <b-col>{{dlvy_4s | comma}} 원</b-col>
            </div>
            <div>
                <b-col>업체 배송</b-col>
                <b-col>{{dlvy_other | comma}} 원</b-col>
            </div>
        </b-col>
        <b-col>
            <div>
                <b-col>적립예정 마일리지</b-col>
                <b-col>{{sum_mileage | comma}} 원</b-col>
            </div>
        </b-col>
    </b-row>
</b-container>    
</template>

<script>
export default { 
    name: 'PaList', 
    props: ['value', 'price'],
    
    computed: {
        dlvy_4s () {
            return this.value.hasOwnProperty(0) ? this.value[0][0].pa_dlvy_p_add_vat : 0;
        },
        dlvy_other () {
            return Object.values(this.value).reduce((acc, el) => {
                return acc + el[0].pa_name != '' ? el[0].pa_dlvy_p_add_vat : 0
            }, 0);
        },
        sum_mileage () {
            return Object.values(this.value).reduce((acc, el) => {
                return acc + el.reduce((acc02, el02) => {
                    return acc02 + el02.gain_mileage;
                }, 0)
            }, 0);
        },
    }, 
};
</script>

<style lang="css" scoped>
.pa_list { margin-bottom:2.5rem; padding:0; }
.pa_list .row { margin:0; border-bottom:1px solid #D6D6D6; }
.pa_list .row .col { padding:0; font-size:.93rem; color:#666; }
.pa_list .row.lbody .col:not(:nth-of-type(2)) { display:flex; align-items:center; justify-content:center; text-align:center; }

.pa_list .row .col .row:last-child { border-bottom-width:0; }
.pa_list .row.lbody>.col:first-child { border-right:1px solid #D6D6D6; }
.pa_list .row.lbody>.col:last-child { border-left:1px solid #D6D6D6; }

.pa_list .lhead .col { font-weight:bold; text-align:center; padding:.74rem 0; color:#000; }
.pa_list .lhead .col:nth-of-type(2) { flex-basis:11.2%; max-width:11.2%; }
.pa_list .lhead .col:nth-of-type(3) { flex-basis:8.8%; max-width:8.8%; }
.pa_list .lhead .col:nth-of-type(4) { flex-basis:7.2%; max-width:7.2%; }
.pa_list .lhead .col:nth-of-type(5) { flex-basis:9.6%; max-width:9.6%; }
.pa_list .lhead .col:nth-of-type(6) { flex-basis:10%; max-width:10%; }

.pa_list .lbody>.col:nth-of-type(1),
.pa_list .lbody>.col:nth-of-type(3) { flex-basis:10%; max-width:10%; font-weight:600; color:#000; }
.pa_list .lbody .col .row .col:nth-of-type(1) { flex-basis:14%; max-width:14%; }
.pa_list .lbody .col .row .col:nth-of-type(3) { flex-basis:14%; max-width:14%; }
.pa_list .lbody .col .row .col:nth-of-type(4) { flex-basis:11%; max-width:11%; justify-content:flex-end; padding-right:.5rem; }
.pa_list .lbody .col .row .col:nth-of-type(5) { flex-basis:9%; max-width:9%; justify-content:flex-end; padding-right:.5rem; }
.pa_list .lbody .col .row .col:nth-of-type(6) { flex-basis:12%; max-width:12%; font-weight:600; color:#000; justify-content:flex-end; padding-right:.5rem; }
.pa_list .lbody .col .row .col:nth-of-type(6) span { font-size:.7rem; color:#666;  }

.pa_list .row .col .row.option { background:#F4F1EC; }
.pa_list .row .col .row .col { padding:.8rem 0; }
.pa_list .row .col .row .col img { width:119px; height:119px; object-fit:cover; }
.pa_list .row .col .row .col p { margin-bottom:.2rem; }
.pa_list .row .col .row .col:nth-of-type(2) { padding-left:1rem; }
.pa_list .row .col .row .col:nth-of-type(2) p:nth-of-type(1){ font-weight:bold; margin-bottom:.8rem; color:#000; }

.pa_list .total { margin-top:1.6rem; border-top:2px solid #363636; border-bottom:1px solid #D6D6D6; }
.pa_list .total .col { color:#000; font-weight:bold; padding:1rem 3rem; }
.pa_list .total .col b { font-size:1.4rem; }
.pa_list .total .col:nth-of-type(1) { display:flex; align-items:center; }
.pa_list .total .col:nth-of-type(2) { text-align:right; border-right:1px solid #D6D6D6; }
.pa_list .total .col:nth-of-type(2):after { background:#707070; width:25px; height:25px; border-radius:13px; content:"+"; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1; }
.pa_list .total .col:nth-of-type(3) { display:flex; align-items:center; }
.pa_list .total .col:nth-of-type(4) { text-align:right; border-right:1px solid #D6D6D6; }
.pa_list .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; content:"="; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1; }
.pa_list .total .col:nth-of-type(5) { display:flex; align-items:center; flex-basis:20%; max-width:20%; }
.pa_list .total .col:nth-of-type(6) { text-align:right; flex-basis:20%; max-width:20%; }

.pa_list .total_sub { background:#F2F3F5; border-bottom-width:0; }
.pa_list .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.pa_list .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.pa_list .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }
.pa_list .total_sub .col>div { display:flex; flex-wrap:wrap; }
.pa_list .total_sub .col>div:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem; }
.pa_list .total_sub .col>div:nth-of-type(2) { padding:0 3rem 2.5rem 3rem; }
.pa_list .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.pa_list .total_sub .col>div .col:nth-of-type(2) { text-align:right; }

</style>