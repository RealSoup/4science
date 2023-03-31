<template>
<b-card id="estimate_model" class="adform">
    <b-container>
        <b-row><b-col class="tit">견적 상품</b-col></b-row>

            <!--    이중(중첩)루프 순번을 넣기위한 공
                    {{ frm.estimate_goods.slice(0, gi).reduce((total, ch)=>total+=ch.estimate_model.length, 0) + mi + 1}}   -->
        <b-container v-for="(em, idx) in value" :key="idx" class="gd_list">
            <b-row class="mb-2">
                <b-col>
                    <font-awesome-icon icon="tags" class="mr-2" /> {{idx+1}}.
                    <div class="flag_tag tag_red" v-if="em.bundle_dc && em.bundle_dc.length">묶음 할인</div>
                    <div class="flag_tag tag_green" v-if="em.goods && em.goods.purchase_at">매입처 상품</div>
                    <b-button size="sm" @click="openOption(idx, em.em_gd_id)"><b-icon-search /> 옵션</b-button>
                </b-col>
                <b-col class="text-right">
                    <b-button variant="warning" size="sm" class="em_reset" @click="emReset(idx)">초기화</b-button>
                    <b-button variant="danger" size="sm" @click="emDel(idx)" v-if="(idx!=0)" v-b-tooltip.hover title="삭제"><b-icon-x-lg /></b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="label">제품명</b-col>
                <b-col class="type02">
                    <b-form-input :id="`estimate_model${idx}em_name`" v-model="em.em_name" />
                    <Validation :error="$store.state.error.validations[`estimate_model${idx}em_name`]" />
                </b-col>

                <b-col class="label">CAT.No</b-col>
                <b-col class="type02">
                    <ModelSchInput v-model="em.em_catno" :type="'em_catno'" :id="`em_catno${idx}`" :em="em" />
                </b-col>

                <b-col class="label">모델명</b-col>
                <b-col class="type02">
                    <ModelSchInput v-model="em.em_code" :type="'em_code'" :id="`estimate_model${idx}em_code`" :em="em" />
                    <Validation :error="$store.state.error.validations[`estimate_model${idx}em_code`]" />
                </b-col>

                <b-col class="label">판매단위</b-col>
                <b-col class="type02">
                    <b-form-input v-model="em.em_unit" />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col class="label">제조사</b-col>
                <b-col class="type02">
                    <b-form-input v-model="em.em_maker" />
                </b-col>

                <b-col class="label">수량</b-col>
                <b-col class="type01">
                    <EaInput v-model="em.em_ea" :id="`estimate_model${idx}em_ea`" :em="em" />
                    <Validation :error="$store.state.error.validations[`estimate_model${idx}em_ea`]" />
                </b-col>

                <b-col class="label long">판매단가({{em.em_cost_price | comma}})</b-col>
                <b-col class="type01">
                    <PriceInput v-model="em.em_price" :id="`estimate_model${idx}em_price`" />
                    <Validation :error="$store.state.error.validations[`estimate_model${idx}em_price`]" />
                </b-col>
                <b-col class="label">할인율</b-col>
                <b-col class="type01">
                    <DcLateInput v-model="em.em_dc_rate" :id="`em_dc_rate${idx}`" :em="em" />
                </b-col>
                <b-col class="label">납품기일</b-col>
                <b-col class="type01">
                    <b-form-input :id="`estimate_model${idx}em_dlvy_at`" v-model="em.em_dlvy_at" />
                    <Validation :error="$store.state.error.validations[`estimate_model${idx}em_dlvy_at`]" />
                </b-col>
            </b-row>
            <b-row>
                <b-col class="label">제품정보</b-col>
                <b-col class="type11">
                    <b-form-textarea :id="`estimate_model${idx}em_spec`" v-model="em.em_spec" rows="3"></b-form-textarea>
                    <Validation :error="$store.state.error.validations[`estimate_model${idx}em_spec`]" />
                </b-col>
            </b-row>
            <GoodsOptionAdd ref="goods_option_add" v-model="em.estimate_option" :em_id="em.em_id" :gd_id="em.em_gd_id" />

            <template v-if="em.estimate_option.length">
                <b-row v-for="(eo, oi) in em.estimate_option" :key="`op${idx}_${oi}`" class="op_list mt-3" align-h="end">
                    <b-col cols="2">
                        <b-button variant="danger" size="xm" @click="delOption(idx, oi)">X</b-button>
                        {{eo.eo_tit}}: {{eo.eo_name}}
                    </b-col>
                    <b-col cols="2" class="awesome_p">
                        <EaInput v-model="eo.eo_ea" :id="`eo_ea${idx}_${oi}`" />
                        <label :for="`eo_ea${idx}_${oi}`">수량</label>
                    </b-col>
                    <b-col cols="2">
                        <div class="awesome_p">
                            <PriceInput v-model="eo.eo_price" :id="`eo_price${idx}_${oi}`" />
                            <label :for="`eo_price${idx}_${oi}`">판매단가</label>
                        </div>
                    </b-col>
                </b-row>
            </template>
        </b-container>

        <Validation :error="$store.state.error.validations.estimate_model" />
        <b-row class="m-0">
            <b-col class="text-right">
                <b-button variant="outline-primary" size="sm" @click="emAdd"><b-icon-plus-square-fill /> 추가</b-button>
            </b-col>
        </b-row>
    </b-container>
</b-card>
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
                if (collect[key].dlvy && collect[key].goods < collect[key].free_dlvy_max) {
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
.card.adform .row .label.long { flex:0 0 15.333334%; max-width:15.333334%; }

#estimate_model .gd_list:not(:last-of-type)  { border-bottom:2px solid #f1f1f1; margin-bottom:2rem; padding-bottom:2rem; }

#estimate_model .flag_tag { width:6rem; height:26px; position: relative; color:#fff; text-align:center; display:inline-block; font-weight:bold; margin-right:13px; }
#estimate_model .flag_tag:after { content:""; position:absolute; left:0; bottom:0; width:0; height:0; border-left:13px solid white; border-top:13px solid transparent; border-bottom:13px solid transparent; }
#estimate_model .flag_tag:before { content:""; position:absolute; right:-13px; bottom:0; width:0; height:0; border-left:13px solid red; border-top:13px solid transparent; border-bottom:13px solid transparent; }
#estimate_model .tag_red { background: red; }
#estimate_model .tag_red:before { border-left-color:red; }
#estimate_model .tag_green { width:8rem; background:green; }
#estimate_model .tag_green:before { border-left-color:green; }
</style>
