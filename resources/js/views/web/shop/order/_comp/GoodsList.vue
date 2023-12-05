<template>
<div>
<b-container v-for="(pa, pa_id) in value" :key="pa_id">
    <h4>
        <b-icon-house></b-icon-house>
        {{pa[0]['pa_name'] ? '업체' : '포사이언스'}} 배송
    </h4>
    <!-- <b-row class="lhead m_hide">
        <b-col></b-col>
        <b-col>주문 상품</b-col>
        <b-col>금액</b-col>
    </b-row> -->

    <b-row v-for="(item, i_item) in pa" :key="`${pa_id}${i_item}`" :class="{option:item.type == 'option'}" class="gm_box">
        <template v-if="item.type == 'model'">
            <b-col class="gd_img"><img :src="item.img" /></b-col>
            <b-col class="gd_txt">
                <div class="explain">
                    <p class="gd_name">{{item.gd_name}}</p>
                    <p><b class="m_hide">제품명:</b> {{item.gm_name}} / <b class="m_hide">Cat.No.:</b> {{item.gm_catno}}</p>
                    <p><b class="m_hide">모델명:</b> {{item.gm_code}} / <b class="m_hide">판매단위:</b> {{item.gm_unit}}</p>
                    <p><b class="m_hide">사양:</b> <span v-html="nl2br(item.gm_spec)" /></p>
                    <p v-if="item.dlvy_at"><b class="m_hide">납기:</b> {{item.dlvy_at}}</p>
                </div>

                <div class="col_price">
                    <div class="price_box" :class="{price_discount:item.price_dc_add_vat}">
                        <span class="normal">{{item.price_add_vat | comma}}</span>
                        <span class="discount">{{(item.price_dc_add_vat) | comma}}</span>
                    </div>
                    <font-awesome-icon icon="times" />
                    <div>{{item.ea}}</div>
                    <font-awesome-icon icon="equals" />
                    <div class="price_box" :class="{price_discount:item.price_dc_add_vat}">
                        <span class="normal">{{item.price_add_vat*item.ea | comma | won}}</span>
                        <span class="discount">{{(item.price_dc_add_vat*item.ea) | comma | won}}</span>
                    </div>
                </div>
                <small v-if="!user.is_dealer" class="m_hide">({{item.price*user.mileage_mul*item.ea | comma}}p 적립)</small>
            </b-col>
        </template>
        <template v-else-if="item.type == 'option'">
            <b-col class="gd_img">추가 옵션</b-col>
            <b-col class="gd_txt">
                <div class="explain">
                    <p class="gd_name"><b>{{item.go_name}}:</b> {{item.goc_name}}</p>
                </div>

                <div class="col_price">
                    <div class="price_box" :class="{price_discount:item.price_dc_add_vat}">
                        <span class="normal">{{item.price_add_vat | comma}}</span>
                        <span class="discount">{{(item.price_dc_add_vat) | comma}}</span>
                    </div>
                    <font-awesome-icon icon="times" />
                    <div>{{item.ea}}</div>
                    <font-awesome-icon icon="equals" />
                    <div class="price_box" :class="{price_discount:item.price_dc_add_vat}">
                        <span class="normal">{{item.price_add_vat*item.ea | comma | won}}</span>
                        <span class="discount">{{(item.price_dc_add_vat*item.ea) | comma | won}}</span>
                    </div>
                </div>
                <small v-if="!user.is_dealer" class="m_hide">({{item.price*user.mileage_mul*item.ea | comma}}p 적립)</small>
            </b-col>
        </template>
    </b-row>
    <b-row class="dlvy_box">
        <b-col class="text_box">
            <template v-if="pa[0]['pa_type'] == 'AIR'">항공운임료</template>
            <template v-else>배송비</template>
        </b-col>
        <b-col class="price_box">{{pa[0].pa_dlvy_p_add_vat | comma | won}}</b-col>
    </b-row>
</b-container>

<b-container class="total">
    <b-row>
        <b-col>상품금액</b-col>
        <b-col><b>{{price.goods_add_vat | comma}}</b> 원</b-col>
    </b-row>
    <b-row>
        <b-col>배송료</b-col>      
        <b-col><b>{{price.air_add_vat+price.dlvy_add_vat | comma}}</b> 원</b-col>
    </b-row>
    <b-row>
        <b-col>결제예정금액</b-col> 
        <b-col><b>{{price.total | comma}}</b> 원</b-col>
    </b-row>
</b-container>    
<!--
    <b-row v-for="(pa, pa_id) in value" :key="pa_id" class="lbody">
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
-->
</div>
</template>

<script>
export default {
    name: 'webShopOrder_compGoodsList',
    props: ['value', 'price', 'user'],
    data() {
        return {
            
        };
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
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>
.container { padding:1em 0; }
.container:not(:first-child) { border-top:1px solid #AAA; }
.container h4 { font-weight:bolder; font-size:1em; padding:1em 0; }
.container .gm_box { margin-bottom:1em; }
.container .gm_box .gd_img { flex-basis:17%; max-width:17%; display:flex; align-items:center; justify-content:center; }
.container .gm_box .gd_img img { width:100%; max-width:120px; height:auto; object-fit:contain; }

.container .gm_box .gd_txt .explain p { margin:0; color:#999; }
.container .gm_box .gd_txt .explain .gd_name { color:#000; font-weight:700; }
.container .gm_box .gd_txt .col_price { display:flex; align-items:center; justify-content:flex-end; }
.container .gm_box .gd_txt .col_price svg { margin:0 .2em; }
.container .gm_box .gd_txt small { display:block; text-align:right; font-size:.7em; color:#666; }

.container .dlvy_box { padding: 12px 16px; background: #f5f5f5; border-radius: 8px; }
.container .dlvy_box .col { color:#9e9e9e; font-size:.9em; }
.container .dlvy_box .price_box { text-align:right; }

.container.total { padding-bottom:0; }
.container.total .row { align-items:baseline; }
.container.total .row .col { font-size:.85em; color:#777; }
.container.total .row .col:nth-child(even) { text-align:right; }
.container.total .row .col:nth-child(even) b { font-size:1.35em; color:#000; }
</style>