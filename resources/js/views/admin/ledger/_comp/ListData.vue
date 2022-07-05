<template>
<div class="ledger_module">
    <b-row class="content"
        v-for="(lg, lg_i) in ledger" :key="`${lg_i}_${lg.lg_id}`"
        :class="{cxl:lg.lg_pay_type == 'CXL'}"
        :style="{ width: row_width+'px' }"
    >
        <div class="ctrl">
            <b-button-group size="sm">
                <b-button variant="danger" @click="destroy(lg_i)"><b-icon-trash-fill /></b-button>
                <b-button variant="warning" @click="edit('papa', lg_i)"><b-icon-tools /></b-button>
                <b-button variant="primary" @click="create('child', lg_i)"><b-icon-plus-lg /></b-button>
            </b-button-group>
            <b-icon-caret-right-fill />
        </div>
        <b-col class="list_id">
            {{lg.lg_id}}
        </b-col>
        <template v-for="(mcc, i) in mng_config_column">
            <template v-for="(cl, k) in column_list_clmn">
                <b-col :key="`${i}${k}`" v-if="k == mcc.umc_val && k == 'order_dt'"         :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{lg.lg_order_dt}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'pay_type'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    <b-badge variant="primary" v-if="lg.lg_pay_type == 'CARD'">온라인 카드</b-badge>
                    <b-badge variant="warning" v-else-if="lg.lg_pay_type == 'PSYS'">PSYS</b-badge>
                    <b-badge variant="seccess" v-else-if="lg.lg_pay_type == 'BILL'">계산서</b-badge>
                    <b-badge variant="secondary" v-else-if="lg.lg_pay_type == 'STAT'">전표</b-badge>
                    <b-badge variant="info" v-else-if="lg.lg_pay_type == 'CASH'">현금영수증</b-badge>
                    <b-badge variant="warning" v-else-if="lg.lg_pay_type == 'MEMB'">회원</b-badge>
                    <b-badge variant="danger" v-else-if="lg.lg_pay_type == 'REV'">역발행</b-badge>
                    <b-badge variant="dark" v-else-if="lg.lg_pay_type == 'NOT'">미발급</b-badge>
                    <b-badge variant="light" v-else-if="lg.lg_pay_type == 'CXL'">거래 취소</b-badge>
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'mng'"         :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">{{lg.lg_mng}}</b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'source_no'"   :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    <template v-if="lg.lg_source_no">
                        <b-button v-if="lg.lg_source_type == 'ORD'" :to="{name: 'adm_order_edit', params: { od_id:lg.lg_source_no }}" variant="outline-primary" block>
                            {{lg.lg_source_no}}
                        </b-button>
                        <b-button v-else-if="lg.lg_source_type == 'EST'" :to="{name: 'adm_estimate_show_reply', params: { er_id:lg.lg_source_no }}" variant="outline-danger" block>
                            {{lg.lg_source_no}}
                        </b-button>
                    </template>
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'sale_dt'"     :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_sale_dt}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'distributor'" :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_distributor}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'depart'"      :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_depart}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'lab_prof'"    :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_lab_prof}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'orderer'"     :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_orderer}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'model'" class="model" :style="{ width: model_width+'px' }">
                    <b-row 
                        v-for="(lm, lm_i) in lg.ledger_model" 
                        :key="lm_i+'_'+lm.lm_id"
                        :class="{cxl:lm.lm_cxl == 'Y'}"
                        :style="{ width: model_width+'px' }"
                    >   
                        <div class="ctrl">
                            <b-button-group size="sm">
                                <b-button variant="warning" @click="edit('child', lg_i, lm_i)"><b-icon-tools /></b-button>
                                <b-button variant="danger" @click="destroy(lg_i, lm_i)"><b-icon-trash-fill /></b-button>
                            </b-button-group>
                            <b-icon-caret-right-fill />
                        </div>
                        <template v-for="(mcm, mi) in mng_config_model">
                            <template v-for="(clm, mk) in column_list_model">
                                <b-col :key="`${mi}${mk}`" v-if="mk == mcm.umc_val && mk == 'gm_name'"          :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign:'left' }">
                                    {{lm.lm_gm_name}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'gm_spec'"     :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" >
                                    {{lm.lm_gm_spec}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'catno'"       :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" >
                                    {{lm.lm_catno}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'gm_code'"     :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }" >
                                    {{lm.lm_gm_code}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'gm_price'"    :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign: 'right' }" >
                                    {{lm.lm_gm_price | comma}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'ea'"          :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign: 'right' }" >
                                    {{lm.lm_ea | comma}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'ea_price'"    :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign: 'right' }" >
                                    {{lm.lm_ea_price | comma}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'surtax'"      :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign: 'right' }">
                                    {{lm.lm_surtax | comma}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'sum_price'"   :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign: 'right' }">
                                    {{lm.lm_sum_price | comma}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'com_order_dt'"    :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">
                                    {{lm.lm_com_order_dt}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'buyer'"           :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">
                                    {{lm.lm_buyer}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'order_mng'"       :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">
                                    {{lm.lm_order_mng}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'purchase_price'"  :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px', textAlign: 'right' }">
                                    {{lm.lm_purchase_price | comma}}
                                </b-col>
                                <b-col :key="`${mi}${mk}`" v-else-if="mk == mcm.umc_val && mk == 'shipping_dt'"     :style="{ flexBasis: clm.w + 'px', maxWidth: clm.w + 'px' }">
                                    {{lm.lm_shipping_dt}}
                                </b-col>
                            </template>
                        </template>
                    </b-row>
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'email'"       :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_email}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'hp'"          :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_hp}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'note'"        :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{lg.lg_note}}
                </b-col>
                <b-col :key="`${i}${k}`" v-else-if="k == mcc.umc_val && k == 'created_at'"  :style="{ flexBasis: cl.w + 'px', maxWidth: cl.w + 'px' }">
                    {{ lg.created_at | formatDate }}
                </b-col>
            </template>
        </template>
    </b-row>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmLedgerListData',
    props: ['ledger', 'mng_config_column', 'column_list_clmn', 'mng_config_model', 'column_list_model', 'row_width', 'model_width'],
    components: {
        'Modal'           : () => import('@/views/_common/Modal.vue'),
        'CustomSetColumn' : () => import('./CustomSetColumn.vue'),
    },
    data() {
        return {
        };
    },
    
    methods: {
        create(target, lg_i) {
            this.$emit('create', target, lg_i);
        },
        
        edit(target, lg_i, lm_i) {
            this.$emit('edit', target, lg_i, lm_i);
        },

        async destroy(lg_i, lm_i=null) {
            var isok = await Notify.confirm('삭제', 'danger');            
            if (isok) {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                let url = `/api/admin/ledger/${this.ledger[lg_i].lg_id}/`;
                if (lm_i != null && lm_i >= 0)
                    url += `?lm_id=${this.ledger[lg_i].ledger_model[lm_i].lm_id}`
                const res = await ax.post(url, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '삭제 완료');
                    this.$emit('index');
                }
            }
        },
    },

    mounted() {    
    },
};
</script>

<style lang="css" scoped>
.content { padding:5px 0; overflow:hidden; }
.content.cxl,
.content.cxl .model .row,
.content .model .row.cxl { background:#ff000044; }
.content.cxl .col, 
.content.cxl .model .row .col,
.content .model .row.cxl .col { text-decoration:line-through; }

.content:not(:last-of-type) { border-bottom:2px solid #777; } 
.content .model .row { padding:5px 0; background:#f7f7f7; margin:0; overflow:hidden; min-height:35px; display: flex; align-items: center; }
.content .model .row:not(:last-of-type) { border-bottom:1px solid #AAA; }
.content .model .row .col:nth-child(2) { padding-left:32px !important; }
</style>
