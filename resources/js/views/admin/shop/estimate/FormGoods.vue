<template>
<div class="box">
    <h5>견적상품 등록</h5>
    <b-container v-for="(em, idx) in value" :key="idx">
        <!--    이중(중첩)루프 순번을 넣기위한 공
                    {{ frm.estimate_goods.slice(0, gi).reduce((total, ch)=>total+=ch.estimate_model.length, 0) + mi + 1}}   -->
        <b-row class="label_form">
            <b-button-group class="model_ctrl_btn">
                <b-button class="orange rubber" @click="emReset(idx)"><b-icon-app /> <b>초기화</b></b-button>
                <b-button class="plum rubber" @click="emDel(idx)"><b-icon-x-lg /> <b>삭제</b></b-button>
            </b-button-group>

            <b-col>
                <label><b-badge class="no d_gray">{{idx+1}}</b-badge> 제품명</label>
                <div><b-form-input :id="`estimate_model${idx}em_name`" v-model="em.em_name" size="sm"></b-form-input></div>
                <validation :error="$store.state.error.validations[`estimate_model${idx}em_name`]"></validation>
            </b-col>
            <b-col>
                <div>
                    <b-button class="d_gray rubber" @click="openOption(idx, em.em_gd_id)">옵션</b-button>
                    <b-button class="gray rubber" target="_blank" v-if="em.em_gd_id" :to="{name: 'goods_show', params: { gd_id:em.em_gd_id }}">상품보기</b-button>
                    <b-badge class="bundle plum" v-if="em.bundle_dc && em.bundle_dc.length">묶음할인</b-badge>
                    <b-badge class="manufacturer orange" v-if="em.goods && em.goods.purchase_at">매입처 배송</b-badge>
                </div>
            </b-col>
  
            <b-col>
                <label>CAT.No</label>
                <model-sch-input v-model="em.em_catno" :type="'em_catno'" :id="`em_catno${idx}`" :em="em"></model-sch-input>
            </b-col>

            <b-col>
                <label>모델명</label>
                <model-sch-input v-model="em.em_code" :type="'em_code'" :id="`estimate_model${idx}em_code`" :em="em"></model-sch-input>
                <validation :error="$store.state.error.validations[`estimate_model${idx}em_code`]"></validation>
            </b-col>

            <b-col>
                <label>판매단위</label>
                <div><b-form-input v-model="em.em_unit" size="sm"></b-form-input></div>
            </b-col>

            <b-col>
                <label>제조사</label>
                <div><b-form-input v-model="em.em_maker" size="sm"></b-form-input></div>
            </b-col>
            
            <b-col>
                <label>수량</label>
                <div><ea-input v-model="em.em_ea" :id="`estimate_model${idx}em_ea`" :em="em"></ea-input></div>
                <validation :error="$store.state.error.validations[`estimate_model${idx}em_ea`]"></validation>
            </b-col>

            <b-col>
                <label>판매단가({{em.em_cost_price | comma}})</label>
                <div><price-input v-model="em.em_price" :id="`estimate_model${idx}em_price`" :em="em"></price-input></div>
                <validation :error="$store.state.error.validations[`estimate_model${idx}em_price`]"></validation>
            </b-col>

            <b-col>
                <label>납품기일</label>
                <div><b-form-input :id="`estimate_model${idx}em_dlvy_at`" v-model="em.em_dlvy_at" size="sm"></b-form-input></div>
                <validation :error="$store.state.error.validations[`estimate_model${idx}em_dlvy_at`]"></validation>
            </b-col>

            <b-col>
                <label>할인율</label>
                <div><dc-late-input v-model="em.em_dc_rate" :id="`em_dc_rate${idx}`" :em="em" class="text-right"></dc-late-input></div>
            </b-col>
            
            <b-col class="w_100">
                <label>제품정보</label>
                <div><b-form-textarea :id="`estimate_model${idx}em_spec`" v-model="em.em_spec" rows="8" size="sm"></b-form-textarea></div>
                <validation :error="$store.state.error.validations[`estimate_model${idx}em_spec`]"></validation>
            </b-col>
        </b-row>
        
        <goods-option-add ref="goods_option_add" v-model="em.estimate_option" :em_id="em.em_id??0" :gd_id="em.em_gd_id"></goods-option-add>
        
        <b-row v-if="em.estimate_option.length" class="option label_form">
            <b-col class="w_100">
                <label>옵션</label>
                <div>
                    <p v-for="(eo, oi) in em.estimate_option" :key="`op${idx}_${oi}`">
                        <b><b-button class="plum xm" @click="delOption(idx, oi)">X</b-button></b>
                        <span>{{eo.eo_tit}}: {{eo.eo_name}}</span>
                        <label :for="`eo_ea${idx}_${oi}`">수량</label>
                        <ea-input v-model="eo.eo_ea" :id="`eo_ea${idx}_${oi}`"></ea-input>

                        <label :for="`eo_price${idx}_${oi}`">판매단가</label>
                        <price-input v-model="eo.eo_price" :id="`eo_price${idx}_${oi}`"></price-input>
                    </p>
                </div>
            </b-col>
        </b-row>
    </b-container>
    <validation :error="$store.state.error.validations.estimate_model"></validation>
        
    <b-row><b-col class="mt-4 text-right"><b-button class="mint rubber" @click="emAdd">제품 추가</b-button></b-col></b-row>
</div>

</template>

<script>
import ax from '@/api/http';
import GoodsOptionAdd from "@/views/admin/shop/estimate/_comp/GoodsOptionAdd.vue";
import PriceInput from "@/views/admin/shop/estimate/_comp/PriceInput.vue";
import EaInput from "@/views/admin/shop/estimate/_comp/EaInput.vue";
import copy from "fast-copy";

export default {
    components: {
        "goods-option-add": GoodsOptionAdd,
        'price-input':      PriceInput,
        'dc-late-input': () =>   import('@/views/admin/shop/estimate/_comp/DcLateInput.vue'),
        'model-sch-input': () => import('@/views/admin/shop/estimate/_comp/ModelSchInput.vue'),
        'ea-input':         EaInput,
        'validation': () =>      import('@/views/_common/Validation.vue'),
    },
    props: ['value', 'frm'],
    methods: {
        emAdd(){
            //  vue는 얉은 복사(복사를 해도 계속 참조)이어서 이렇게 해야 깊은 복사(새로운 메모리 참조)가 된다.
            //  이렇게 안하면 복사된것들이 모두 같은 값이 들어가 버린다.       
            this.value.push(copy(this.frm.empty_em));
        },
        async emDel(i){
            var rst = await Notify.confirm('삭제', 'danger');
            if (rst)
                this.value.splice(i, 1);
        },
        openOption(i, id){
            this.$refs.goods_option_add[i].getOption(id);
        },
        delOption(mi, oi) {
            this.value[mi].estimate_option.splice(oi, 1);
        },
        setDcLate() {
            for (var em of this.value) {
                this.$set(em, 'em_dc_rate', this.frm.estimate_reply.all_dc);
            }
        },
        async emReset(i) {
            let def = await ax.get(`/api/admin/shop/estimate/getEmptyEm`);
            this.$set(this.value, i, def.data);
        },

        calculator() {
            let collect = {};
            let pa_id = 0;
            let dlvy = 0;
            for (var em of this.value) {
                pa_id = 0;
                if (em.goods&&em.goods.purchase_at)
                    pa_id = em.goods.gd_pa_id;
                if (!collect.hasOwnProperty(pa_id)) {
                    if (pa_id>0) {
                        if (em.goods.purchase_at.pa_type == "AIR")
                            collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(em.goods.purchase_at.pa_price_add_vat)};
                        else
                            collect[pa_id] = { 'goods':0, 'dlvy':Number(em.goods.purchase_at.pa_price_add_vat), 'air':0};
                    } else
                        collect[pa_id] = { 'goods':0, 'dlvy':Number(em.goods.dlvy_fee_add_vat), 'free_dlvy_max':Number(em.goods.free_dlvy_max), 'air':0};
                }
                collect[pa_id].goods += Number(em.em_price) * Number(em.em_ea);
                for (var eo of em.estimate_option)
                    collect[pa_id].goods += Number(eo.eo_price) * Number(eo.eo_ea);
            }
            this.frm.estimate_reply.er_gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            this.frm.estimate_reply.er_air_price = Object.values(collect).reduce((acc, el) => acc + el.air, 0);
            this.frm.estimate_reply.er_surtax = Math.floor(this.frm.estimate_reply.er_gd_price*0.1);
            for (var key in collect) {
                if (collect[key].dlvy > 0) {
                    if (key>0)  //  직배송 제품이면
                        dlvy += Number(collect[key].dlvy);
                    else if (collect[key].goods < collect[key].free_dlvy_max)  //  포사 제품이면
                        dlvy += Number(collect[key].dlvy);
                }
            }
            this.frm.estimate_reply.er_dlvy_price = dlvy;
            if (this.frm.estimate_reply.er_no_dlvy_fee == 'Y') {
                this.frm.estimate_reply.er_dlvy_price  = 0;
                this.frm.estimate_reply.er_air_price   = 0;
            }
            this.frm.estimate_reply.er_all_price = this.frm.estimate_reply.er_gd_price+this.frm.estimate_reply.er_surtax+this.frm.estimate_reply.er_dlvy_price+this.frm.estimate_reply.er_air_price;
        },
    },
}
</script>

<style lang="css" scoped>
.box .container { margin-bottom:3%; }

.label_form>.col label .badge { position:absolute; top:0; left:0; padding:.3em .8rem .5rem .7rem; border-radius:0 0 20px 20px; z-index:1; }
.label_form>.model_ctrl_btn { position:absolute; top:-34px; right:0; }
.label_form>.model_ctrl_btn .btn b { display:inline-block; height:0; overflow:hidden; vertical-align:inherit; max-width:0; transition:all .4s; }
.label_form>.model_ctrl_btn .btn:hover b { max-width:300px; height:17px; } 

.option .col p { display:flex; margin:0; flex-wrap: wrap; }
.option .col p>*{ display:flex; align-items:center; }
.option .col p b { flex:0 0 24px; max-width:24px; margin-right:.6%; }
.option .col p span { flex-basis: 0; flex-grow: 1; max-width: 100%; }
.option .col p label { flex:0 0 6%; max-width:6%; font-weight:600; padding-right:1%; justify-content:end; }
.option .col p input { flex:0 0 6%; max-width:6%; text-align:right; }
.option .col p label:last-of-type { flex:0 0 12%; max-width:12%; }
.option .col p input:last-of-type { flex:0 0 12%; max-width:12%; }


@media (max-width: 992px){
    .label_form:not(:first-of-type) { margin-top:10%; }
    .label_form>.model_ctrl_btn { top:-27px; }
    .label_form>.col label .badge { position:static; padding:.2rem .3rem; border-radius:10px; }

    .option .col p span { flex:0 0 90%; max-width:90%; }
    .option .col p label,
    .option .col p label:last-of-type { flex:0 0 20%; max-width:20%; }
    .option .col p input { flex:0 0 14%; max-width:14%; }
    .option .col p input:last-of-type { flex:0 0 29%; max-width:29%; }
}
</style>