<template>
<b-container class="pa_list frm_st">
    <b-row class="lhead m_hide">
        <b-col>{{ trans().module_palist.jumoonsangpum }}</b-col>        
        <b-col>{{ trans().module_palist.jejosa }}</b-col>
        <b-col>{{ trans().module_palist.panmaega }}</b-col>
        <b-col>{{ trans().module_palist.suryang }}</b-col>
        <b-col>{{ trans().module_palist.geumaek }}</b-col>
        <b-col>{{ trans().module_palist.baesongbi }}</b-col>
    </b-row>
    <b-row v-for="(pa, pa_id) in value" :key="pa_id" class="lbody">
        <b-col class="m_hide">{{pa[0]['pa_name'] ? '업체' : '포사이언스'}}<br />배송</b-col>
        <b-col>
            <b-row v-for="(item, i_item) in pa" :key="`${pa_id}${i_item}`" :class="{option:item.type == 'option'}">
                <template v-if="item.type == 'model'">
                    <b-col><img :src="item.img"/></b-col>
                    <b-col class="explain">
                        <p>{{item.gd_name_eng??item.gd_name}}</p>
                        <p><b class="m_hide">제품명:</b> {{item.gm_name_eng??item.gm_name}} / <b class="m_hide">Cat.No.:</b> {{item.gm_catno}}</p>
                        <p><b class="m_hide">모델명:</b> {{item.gm_code}} / <b class="m_hide">판매단위:</b> {{item.gm_unit}}</p>
                        <div>
                            <b class="m_hide">사양:</b>
                            <div class="gm_spec" v-html="nl2br(item.gm_spec)"></div>
                        </div>
                        <p v-if="item.dlvy_at"><b class="m_hide">납기:</b> {{item.dlvy_at}}</p>
                    </b-col>
                    <b-col class="m_hide">{{item.mk_name}}</b-col>
                    <b-col>
                        <span class="price_box" :class="{price_discount:item.price_dc_add_vat}">
                            <span class="normal">
                                <template v-if="add_vat">{{item.price_add_vat | comma | won}}</template>
                                <template v-else>{{item.price | comma | won}}</template>
                            </span>
                            <span class="discount">{{(item.price_dc_add_vat) | comma | won}}</span>
                        </span>
                    </b-col>
                    <b-col>{{item.ea}} 개</b-col>
                    <b-col>
                        <div>
                            <span class="price_box" :class="{price_discount:item.price_dc_add_vat}">
                                <span class="normal">
                                    <template v-if="add_vat">{{item.price_add_vat*item.ea | comma | won}}</template>
                                    <template v-else>{{item.price*item.ea | comma | won}}</template>
                                </span>
                                <span class="discount">{{(item.price_dc_add_vat*item.ea) | comma | won}}</span>
                            </span>
                            
                            <div v-if="!user.is_dealer" class="mileage m_hide">({{item.price*user.mileage_mul*item.ea | comma}}p 적립)</div>
                        </div>
                    </b-col>
                </template>
                <template v-else-if="item.type == 'option'">
                    <b-col>추가 옵션</b-col>
                    <b-col class="justify-content-start"><span><b>{{item.go_name_eng??item.go_name}}:</b> {{item.goc_name_eng??item.goc_name}}</span></b-col>
                    <b-col class="m_hide"></b-col>
                    <b-col>
                        <template v-if="add_vat">{{item.price_add_vat | comma | won}}</template>
                        <template v-else>{{item.price | comma | won}}</template>
                    </b-col>
                    <b-col>{{item.ea}} 개</b-col>
                    <b-col>
                        <div>
                            <template v-if="add_vat">{{item.price_add_vat*item.ea | comma | won}}</template>
                            <template v-else>{{item.price*item.ea | comma | won}}</template>
                            <br v-if="!user.is_dealer">
                            <span v-if="!user.is_dealer">({{item.price*user.mileage_mul*item.ea | comma}}p 적립)</span>
                        </div>
                    </b-col>
                </template>
            </b-row>
        </b-col>

        <b-col class="m_hide">
            <template v-if="er_no_dlvy_fee !== 'Y'">
                <template v-if="pa[0]['pa_type'] == 'AIR'">항공운임료</template>
                <template v-else>배송비</template>
                <br />
                <template v-if="add_vat">{{pa[0].pa_dlvy_p_add_vat | comma | won}}</template>
                <template v-else>{{pa[0].pa_dlvy_p | comma | won}}</template>
            </template>
        </b-col>
    </b-row>

    <b-row v-if="price" class="total">
        <b-col>상품금액</b-col>
        <b-col><b>{{price.goods_add_vat | comma}}</b> 원</b-col>
        <b-col>배송료</b-col>
        <b-col><b>{{price.air_add_vat+price.dlvy_add_vat | comma}}</b> 원</b-col>
        <b-col>
            <template v-if="$route.name =='adm_estimate_show_reply'">견적금액</template>
            <template v-else>결제 예정 금액</template>
        </b-col>
        <b-col><b>{{price.total | comma}}</b> 원</b-col>
    </b-row>
    <b-row v-if="price" class="total_sub" id="total_sub">
        <b-col>
            <div><b-col>상품가</b-col> <b-col>{{price.goods | comma}} 원</b-col></div>
            <div><b-col>부가세</b-col> <b-col>{{price.surtax | comma}} 원</b-col></div>
        </b-col>
        <b-col>
            <div><b-col>포사이언스 배송</b-col><b-col>{{dlvy_4s | comma}} 원</b-col></div>
            <div><b-col>업체 배송</b-col><b-col>{{dlvy_other | comma}} 원</b-col></div>
        </b-col>
        <b-col>
            <div v-if="!user.is_dealer"><b-col>적립예정 마일리지</b-col><b-col>{{sum_mileage | comma}} 원</b-col></div>
        </b-col>
    </b-row>
</b-container>    
</template>

<script>
export default { 
    name: 'PaList', 
    props: ['value', 'price', 'user', 'add_vat', 'er_no_dlvy_fee'],
    data() {
        return {
            
        }
    },
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
                    return acc02 + (el02.price*el02.ea*this.user.mileage_mul);
                }, 0)
            }, 0);
        },
    }, 
    methods:{
        
        
    },
};
</script>

<style lang="css" scoped>
.pa_list { margin-bottom:2.5rem; padding:0; }
.pa_list .row { margin:0; border-bottom:1px solid #D6D6D6; }
.pa_list .row .col { padding:0; font-size:.93rem; color:#666; }
.pa_list .row.lbody .col:not(:nth-of-type(2)),
.pa_list .row.lbody .col .row .col:not(.explain) { display:flex; align-items:center; justify-content:center; text-align:center; }
.pa_list .row.lbody .col .row .explain .gm_spec { display:inline-block; }
 
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
.pa_list .lbody .col .row .col:nth-of-type(4) { flex-basis:11%; max-width:11%; }
.pa_list .lbody .col .row .col:nth-of-type(5) { flex-basis:9%;  max-width: 9%; }
.pa_list .lbody .col .row .col:nth-of-type(6) { flex-basis:12%; max-width:12%; font-weight:600; color:#000; }
.pa_list .lbody .col .row .col:nth-of-type(6) .mileage { font-size:.7rem; color:#666;  }
.pa_list .lbody .col .row .col div span { word-break:break-word; word-wrap:break-word; }
.pa_list .row .col .row.option { background:#F4F1EC; }
.pa_list .row .col .row .col { padding:.8rem 0; }
.pa_list .row .col .row .col img { width:100%; max-width:120px; height:auto; object-fit:contain; }
.pa_list .row .col .row .col p { margin-bottom:.2rem; }
.pa_list .row .col .row .col:nth-of-type(2) { padding-left:1rem; }
.pa_list .row .col .row .col:nth-of-type(2) p:nth-of-type(1){ font-weight:bold; margin-bottom:.8rem; color:#000; }

.pa_list .total { margin-top:1.6rem; border-top:2px solid #363636; border-bottom:1px solid #D6D6D6; }
.pa_list .total .col { color:#000; font-weight:bold; padding:1rem 3rem; }
.pa_list .total .col b { font-size:1.4rem; }
.pa_list .total .col:nth-of-type(odd) { display:flex; align-items:center; flex-basis:12%; max-width:12%; padding:1vw 0 1vw 2vw; font-size:1.2rem; }
.pa_list .total .col:nth-of-type(even) { text-align:right; padding: 1vw 2vw 1vw 0; }
.pa_list .total .col:nth-of-type(2):after,
.pa_list .total .col:nth-of-type(4):after { background:#707070; width:25px; height:25px; border-radius:13px; position:absolute; right:-14px; color:#fff; text-align:center; font-size:1.4rem; line-height:1.32rem; top:50%; transform:translateY(-50%); }
.pa_list .total .col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.pa_list .total .col:nth-of-type(2):after { content:"+"; }

.pa_list .total .col:nth-of-type(4) { border-right:1px solid #D6D6D6; }
.pa_list .total .col:nth-of-type(4):after { content:"="; }
.pa_list .total .col:nth-of-type(5) { flex-basis:20%; max-width:20%; }
.pa_list .total .col:nth-of-type(6) { flex-basis:20%; max-width:20%; }

.pa_list .total_sub { background:#F2F3F5; border-bottom-width:0; }
.pa_list .total_sub>.col:nth-of-type(1) { border-right:1px solid #D6D6D6; }
.pa_list .total_sub>.col:nth-of-type(2) { border-right:1px solid #D6D6D6; }
.pa_list .total_sub>.col:nth-of-type(3) { flex-basis:40%; max-width:40%; }
.pa_list .total_sub .col>div { display:flex; flex-wrap:wrap; }
.pa_list .total_sub .col>div:nth-of-type(1) { padding:1.3rem 3rem .5rem 3rem; }
.pa_list .total_sub .col>div:nth-of-type(2) { padding:0 3rem 2.5rem 3rem; }
.pa_list .total_sub .col>div .col { color:#A8A9AB; font-weight:bold; font-size:.84rem; }
.pa_list .total_sub .col>div .col:nth-of-type(2) { text-align:right; }

@media (max-width: 992px){
    
    .pa_list .lbody .col .row .col:nth-of-type(1) { flex-basis:25%; max-width:25%; }
    .pa_list .lbody .col .row .col:nth-of-type(2) { flex-basis:75%; max-width:75%; }
    .pa_list .lbody .col .row .col:nth-of-type(4) { flex-basis:35%; max-width:35%; }
    .pa_list .lbody .col .row .col:nth-of-type(5) { flex-basis:25%; max-width:25%; }
    .pa_list .lbody .col .row .col:nth-of-type(6) { flex-basis:40%; max-width:40%; }
    .pa_list .row .col .row .col { padding:0; }
    .pa_list .row .col .row .col:nth-of-type(2) p:nth-of-type(1) { margin-bottom:.2rem; }
    .pa_list .row .col .row .col p { margin-bottom:0; line-height:1.3; }

    .pa_list .total .col:nth-of-type(odd) { flex-basis:45%; max-width:45%; }
    .pa_list .total .col:nth-of-type(even) { flex-basis:55%; max-width:55%; }
    .pa_list .total .col:nth-of-type(2):after,
    .pa_list .total .col:nth-of-type(4):after { content:none; }
    .pa_list .total_sub>.col:nth-of-type(1),
    .pa_list .total_sub>.col:nth-of-type(2),
    .pa_list .total_sub>.col:nth-of-type(3) { flex-basis:100%; max-width:100%; }
    .pa_list .total_sub .col>div{ padding:2vw !important; }
}
</style>