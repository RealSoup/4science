<template>
<div class="box">
    <h5>견적상품 등록</h5>
    <b-container v-for="(em, idx) in value" :key="idx" class="est_frm">
        <!--    이중(중첩)루프 순번을 넣기위한 공
                    {{ frm.estimate_goods.slice(0, gi).reduce((total, ch)=>total+=ch.estimate_model.length, 0) + mi + 1}}   -->
        <b-row>
            <b-col class="em_name_l">
                <b-badge class="no d_gray">{{idx+1}}</b-badge>
                <b-badge class="bundle plum" v-if="em.bundle_dc && em.bundle_dc.length">묶<b>음할인</b></b-badge>
                <b-badge class="manufacturer orange" v-if="em.goods && em.goods.purchase_at">매<b>입처 배송</b></b-badge>
                제품명
            </b-col>
            <b-col class="em_name_i">
                <b-form-input :id="`estimate_model${idx}em_name`" v-model="em.em_name" />
                <b-button class="d_gray sm" @click="openOption(idx, em.em_gd_id)">옵션</b-button>
                <Validation :error="$store.state.error.validations[`estimate_model${idx}em_name`]" />
                
                <b-button-group>
                    <b-button class="orange sm" @click="emReset(idx)"><b-icon-app /> <b>초기화</b></b-button>
                    <b-button class="plum sm" @click="emDel(idx)" v-if="(idx!=0)"><b-icon-x-lg /> <b>삭제</b></b-button>
                </b-button-group>
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>CAT.No</b-col>
            <b-col>
                <ModelSchInput v-model="em.em_catno" :type="'em_catno'" :id="`em_catno${idx}`" :em="em" />
            </b-col>

            <b-col>모델명</b-col>
            <b-col>
                <ModelSchInput v-model="em.em_code" :type="'em_code'" :id="`estimate_model${idx}em_code`" :em="em" />
                <Validation :error="$store.state.error.validations[`estimate_model${idx}em_code`]" />
            </b-col>
        </b-row>
        
        <b-row>
            <b-col>판매단위</b-col>
            <b-col>
                <b-form-input v-model="em.em_unit" />
            </b-col>
            <b-col>제조사</b-col>
            <b-col>
                <b-form-input v-model="em.em_maker" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>수량</b-col>
            <b-col>
                <EaInput v-model="em.em_ea" :id="`estimate_model${idx}em_ea`" :em="em" />
                <Validation :error="$store.state.error.validations[`estimate_model${idx}em_ea`]" />
            </b-col>

            <b-col>판매단가({{em.em_cost_price | comma}})</b-col>
            <b-col>
                <PriceInput v-model="em.em_price" :id="`estimate_model${idx}em_price`" :em="em" />
                <Validation :error="$store.state.error.validations[`estimate_model${idx}em_price`]" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>납품기일</b-col>
            <b-col>
                <b-form-input :id="`estimate_model${idx}em_dlvy_at`" v-model="em.em_dlvy_at" />
                <Validation :error="$store.state.error.validations[`estimate_model${idx}em_dlvy_at`]" />
            </b-col>
            <b-col>할인율</b-col>
            <b-col>
                <DcLateInput v-model="em.em_dc_rate" :id="`em_dc_rate${idx}`" :em="em" class="text-right" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>제품정보</b-col>
            <b-col>
                <b-form-textarea :id="`estimate_model${idx}em_spec`" v-model="em.em_spec" rows="8"></b-form-textarea>
                <Validation :error="$store.state.error.validations[`estimate_model${idx}em_spec`]" />
            </b-col>
        </b-row>

        <GoodsOptionAdd ref="goods_option_add" v-model="em.estimate_option" :em_id="em.em_id" :gd_id="em.em_gd_id" />
        
        <b-row v-if="em.estimate_option.length" class="option">
            <b-col>옵션</b-col>
            <b-col>
                <p v-for="(eo, oi) in em.estimate_option" :key="`op${idx}_${oi}`">
                    <b><b-button class="plum xm ml-2" @click="delOption(idx, oi)">X</b-button></b>
                    <span>{{eo.eo_tit}}: {{eo.eo_name}}</span>
                    <label :for="`eo_ea${idx}_${oi}`">수량</label>
                    <EaInput v-model="eo.eo_ea" :id="`eo_ea${idx}_${oi}`" />

                    <label :for="`eo_price${idx}_${oi}`">판매단가</label>
                    <PriceInput v-model="eo.eo_price" :id="`eo_price${idx}_${oi}`" />
                </p>
            </b-col>
        </b-row>
    </b-container>
    <Validation :error="$store.state.error.validations.estimate_model" />
        
    <b-row><b-col class="mt-4 text-right"><b-button class="mint" @click="emAdd">제품 추가</b-button></b-col></b-row>
</div>

</template>

<script>
import ax from '@/api/http';
import GoodsOptionAdd from "./_comp/GoodsOptionAdd.vue";
import moment from 'moment';

export default {
    components: {
        GoodsOptionAdd,
        'PriceInput': () =>     import('./_comp/PriceInput.vue'),
        'DcLateInput': () =>    import('./_comp/DcLateInput.vue'),
        'ModelSchInput': () =>  import('./_comp/ModelSchInput.vue'),
        'EaInput': () =>        import('./_comp/EaInput.vue'),
        'Validation': () => import('@/views/_common/Validation.vue'),
        'FormGoodsChecker': () =>      import('./FormGoodsChecker.vue'),
    },
    props: ['value', 'frm'],
    methods: {
        emAdd(){
            //  vue는 얉은 복사(복사를 해도 계속 참조)이어서 이렇게 해야 깊은 복사(새로운 메모리 참조)가 된다.
            //  이렇게 안하면 복사된것들이 모두 같은 값이 들어가 버린다.
            var nEm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm.empty_em // 삽입하려는 내용
            );
            this.value.push(nEm);
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
                this.$set(em, 'em_dc_rate', this.frm.all_dc);
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
                if (em.goods&&em.goods.purchase_at)
                    pa_id = em.goods.gd_pa_id;
                if (!collect.hasOwnProperty(pa_id)) {
                    if (pa_id>0 && em.goods.purchase_at.pa_type == "AIR")
                        collect[pa_id] = { 'goods':0, 'dlvy':0, 'air':Number(em.goods.purchase_at.pa_price_add_vat)};
                    else
                        collect[pa_id] = { 'goods':0, 'dlvy':Number(em.goods.dlvy_fee_add_vat), 'free_dlvy_max':Number(em.goods.free_dlvy_max), 'air':0};
                }
                collect[pa_id].goods += Number(em.em_price) * Number(em.em_ea);
                for (var eo of em.estimate_option)
                    collect[pa_id].goods += Number(eo.eo_price) * Number(eo.eo_ea);
            }
        
            this.frm.estimate_reply.er_gd_price = Object.values(collect).reduce((acc, el) => acc + el.goods, 0);
            this.frm.estimate_reply.er_air_price = Object.values(collect).reduce((acc, el) => acc + el.air, 0);
            this.frm.estimate_reply.er_surtax = this.frm.estimate_reply.er_gd_price*0.1;
            for (var key in collect) {
                if (collect[key].dlvy && (collect[key].goods*1.1) < collect[key].free_dlvy_max) {
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

<style lang="css" >
.est_frm:not(:first-of-type) { margin-top:4%; }
.est_frm .row .col.em_name_l { position:relative; }
.est_frm .row .col.em_name_l .badge { position:absolute; left:0; padding:.4em .8rem .7rem .8rem; border-radius:0 0 20px 20px; z-index:1; font-size:1.25rem; font-weight:900; }
.est_frm .row .col.em_name_l .badge:nth-of-type(1) { top:0; }
.est_frm .row .col.em_name_l .badge:nth-of-type(2) { top:40px; font-size:90%; padding-top:.7rem; }
.est_frm .row .col.em_name_l .badge:nth-of-type(3) { top:77px; font-size:90%; padding-top:.7rem;}
.est_frm .row .col.em_name_i input { width:34%; margin-right:.7rem; display:inline-block; }
.est_frm .row .col.em_name_l .badge { vertical-align:top; }
.est_frm .row .col.em_name_l .badge b { display:inline-block; height:0; overflow:hidden; vertical-align:inherit; max-width:0; transition:all .4s; }
.est_frm .row .col.em_name_l .badge:hover b { max-width:300px; height:14px; } 
.est_frm .row .col.em_name_i .btn-group { position:absolute; top:-34px; right:0; }
.est_frm .row .col.em_name_i .btn-group .btn b { display:inline-block; height:0; overflow:hidden; vertical-align:inherit; max-width:0; transition:all .4s; }
.est_frm .row .col.em_name_i .btn-group .btn:hover b { max-width:300px; height:17px; } 

.est_frm .row.option .col p { display:flex; margin:0; line-height:1.9; }
.est_frm .row.option .col p b { flex-basis:0; flex-grow:1; max-width:100%; text-align:right; padding-right:1%; }
.est_frm .row.option .col p span { flex:0 0 19.5%; max-width:19.5%; text-align:center; }
.est_frm .row.option .col p label { flex:0 0 11.5%; max-width:11.5%; text-align:right; padding-right:2%; font-weight:600; }
.est_frm .row.option .col p label:last-of-type { flex:0 0 12%; max-width:12%; }
.est_frm .row.option .col p input { flex:0 0 6%; max-width:6%; text-align:right; }
.est_frm .row.option .col p input:last-of-type { flex:0 0 12%; max-width:12%; }
</style>