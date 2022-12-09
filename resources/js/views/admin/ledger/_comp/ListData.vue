<template>
<div>
<b-row :class="{cxl:lg.lg_pay_type == 'CXL', step_2:(lg.lg_step == 2 || lg.chk_cplt), modified:!lg.lg_id}"
    v-for="(lg, lg_i) in ledger" :key="lg_i"
    :tabindex="lg_i"
    @mousedown.right ="lg.show_menu = true" 
    @contextmenu.prevent
    @blur="lg.show_menu = false"
>

    <b-col class="list_id">
        <transition name="slide-fade">
            <b-button v-if="lg.is_edit" variant="warning" size="sm" v-b-tooltip="'저장'" class="hidden_menu" @click="apply(lg_i)">
                <b-icon-pencil-fill />
            </b-button>
            <div v-if="lg.show_menu" class="hidden_menu">                
                <b-button variant="danger" size="sm" v-b-tooltip="'삭제'" @click="destroy(lg_i)"><b-icon-trash-fill /></b-button>
                <b-button variant="primary" size="sm" v-b-tooltip="'생성'" @click="createModel(lg_i)"><b-icon-plus-lg /></b-button>
            </div>
        </transition>
        <b-form-checkbox v-if="lg.lg_step == 1" v-model="lg.chk_cplt" name="chk_cplt" @change="chkChange">
            {{lg.lg_id}}
        </b-form-checkbox>
        <template v-else>{{lg.lg_id}}</template>
    </b-col>
    <template v-for="(mcc, i) in mng_config.COLUMN">
        <b-col      v-if="mcc.umc_val == 'pay_type'"    :style="pay_type"    :key="i"><InputSelect v-model="lg.lg_pay_type" :option="pay_type_option" @index="lg.is_edit=true" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'order_dt'"    :style="order_dt"    :key="i">
            <b-input-group size="sm">
                <b-form-input v-model="lg.lg_order_dt" @update="lg.is_edit=true" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="frm_formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker size="sm" v-model="lg.lg_order_dt" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col v-else-if="mcc.umc_val == 'mng'"         :style="mng"         :key="i"><InputSelect v-model="lg.lg_mng" :option="mng_option" @index="lg.is_edit=true" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'od_id'"       :style="od_id"       :key="i"><b-button v-if="lg.lg_od_id" :to="{name: 'adm_order_edit', params: { od_id:lg.lg_od_id }}" size="sm">{{lg.lg_od_id}}</b-button></b-col>
        <b-col v-else-if="mcc.umc_val == 'sale_dt'"     :style="sale_dt"     :key="i">
            <b-input-group size="sm">
                <b-form-input v-model="lg.lg_sale_dt" @update="lg.is_edit=true" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="frm_formatDate"></b-form-input>
                <b-input-group-append>
                    <b-form-datepicker size="sm" v-model="lg.lg_sale_dt" button-only right></b-form-datepicker>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col v-else-if="mcc.umc_val == 'distributor'" :style="distributor" :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_distributor" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'depart'"      :style="depart"      :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_depart" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'lab_prof'"    :style="lab_prof"    :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_lab_prof" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'orderer'"     :style="orderer"     :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_orderer" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'od_name'"     :style="od_name"     :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_od_name" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_ea_p'"    :style="sum_ea_p"    :key="i"><InputPrice v-model="lg.lg_sum_ea_p" @update="lg.is_edit=true" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_surtax'"  :style="sum_surtax"  :key="i"><InputPrice v-model="lg.lg_sum_surtax" @update="lg.is_edit=true" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'sum_sum_p'"   :style="sum_sum_p"   :key="i"><InputPrice v-model="lg.lg_sum_sum_p" @update="lg.is_edit=true" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_name'"    :style="tax_name"    :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_tax_name" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_email'"   :style="tax_email"   :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_tax_email" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'tax_hp'"      :style="tax_hp"      :key="i"><b-form-input size="sm" @update="lg.is_edit=true" v-model="lg.lg_tax_hp" :formatter="frm_formatHp" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'note'"        :style="note"        :key="i"><b-form-textarea v-model="lg.lg_note" size="sm" @update="lg.is_edit=true" /></b-col>
        <b-col v-else-if="mcc.umc_val == 'created_at'"  :style="created_at"  :key="i">{{lg.created_at | formatDate}}</b-col>

        <b-col v-else-if="mcc.umc_val == 'model'"       :style="{ width: model_width+'px' }" :key="i" class="model">
            <b-row v-for="(lm, lm_i) in lg.ledger_model" :key="lm_i" :class="{cxl:lm.lm_cxl == 'Y'}" :style="{ width: model_width+'px' }"
                :tabindex="lm_i"
                @mousedown.stop.right ="lm.show_menu = true" 
                @contextmenu.prevent
                @blur="lm.show_menu = false"
            >
                <template v-for="mcm in mng_config.MODEL">
                    <b-col v-if="mcm.umc_val == 'gm_name'" :style="gm_name" :key="mcm.umc_val">
                        <transition name="slide-fade">
                            <b-button v-if="lm.is_edit" variant="warning" size="sm" v-b-tooltip="'저장'" class="hidden_menu" @click="apply(lg_i, lm_i)"><b-icon-pencil-fill /></b-button>
                            <b-button v-if="lm.show_menu" variant="danger" size="sm" v-b-tooltip="'삭제'" class="hidden_menu" @click="destroy(lg_i, lm_i)"><b-icon-trash-fill /></b-button>
                        </transition>
                        <b-form-input @update="lm.is_edit=true" v-model="lm.lm_gm_name" size="sm" />
                    </b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_spec'"        :style="gm_spec"        :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_gm_spec"        size="sm" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'catno'"          :style="catno"          :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_catno"          size="sm" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_code'"        :style="gm_code"        :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_gm_code"        size="sm" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'gm_price'"       :style="gm_price"       :key="mcm.umc_val"><InputPrice   @update="lm.is_edit=true" v-model="lm.lm_gm_price" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea'"             :style="ea"             :key="mcm.umc_val"><InputPrice   @update="lm.is_edit=true" v-model="lm.lm_ea" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'ea_price'"       :style="ea_price"       :key="mcm.umc_val"><InputPrice   @update="lm.is_edit=true" v-model="lm.lm_ea_price" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'surtax'"         :style="surtax"         :key="mcm.umc_val"><InputPrice   @update="lm.is_edit=true" v-model="lm.lm_surtax" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'sum_price'"      :style="sum_price"      :key="mcm.umc_val"><InputPrice   @update="lm.is_edit=true" v-model="lm.lm_sum_price" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'com_order_dt'"   :style="com_order_dt"   :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_com_order_dt"   size="sm" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'buyer'"          :style="buyer"          :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_buyer"          size="sm" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'order_mng'"      :style="order_mng"      :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_order_mng"      size="sm" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'purchase_price'" :style="purchase_price" :key="mcm.umc_val"><InputPrice   @update="lm.is_edit=true" v-model="lm.lm_purchase_price" /></b-col>
                    <b-col v-else-if="mcm.umc_val == 'shipping_dt'"    :style="shipping_dt"    :key="mcm.umc_val"><b-form-input @update="lm.is_edit=true" v-model="lm.lm_shipping_dt"    size="sm" /></b-col>
                </template>
            </b-row>
        </b-col>
    </template>
</b-row>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmLedgerListData',
    props: ['ledger', 'mng_config', 'column_list', 'model_width', 'config', 'mng_list'],
    components: {        
        'InputSelect' : () => import('./tag/InputSelect'),
        'InputPrice'  : () => import('./tag/InputPrice'),
    },
    data() { return { }; },
    computed: {
        order_dt(){       return { flexBasis: this.column_list.COLUMN.order_dt.w+'px',      maxWidth: this.column_list.COLUMN.order_dt.w+'px'                          };},
        pay_type(){       return { flexBasis: this.column_list.COLUMN.pay_type.w+'px',      maxWidth: this.column_list.COLUMN.pay_type.w+'px'                          };},
        mng(){            return { flexBasis: this.column_list.COLUMN.mng.w+'px',           maxWidth: this.column_list.COLUMN.mng.w+'px'                               };},
        od_id(){          return { flexBasis: this.column_list.COLUMN.od_id.w+'px',         maxWidth: this.column_list.COLUMN.od_id.w+'px'                             };},
        sale_dt(){        return { flexBasis: this.column_list.COLUMN.sale_dt.w+'px',       maxWidth: this.column_list.COLUMN.sale_dt.w+'px'                           };},
        distributor(){    return { flexBasis: this.column_list.COLUMN.distributor.w+'px',   maxWidth: this.column_list.COLUMN.distributor.w+'px'                       };},
        depart(){         return { flexBasis: this.column_list.COLUMN.depart.w+'px',        maxWidth: this.column_list.COLUMN.depart.w+'px'                            };},
        lab_prof(){       return { flexBasis: this.column_list.COLUMN.lab_prof.w+'px',      maxWidth: this.column_list.COLUMN.lab_prof.w+'px'                          };},
        orderer(){        return { flexBasis: this.column_list.COLUMN.orderer.w+'px',       maxWidth: this.column_list.COLUMN.orderer.w+'px'                           };},
        od_name(){        return { flexBasis: this.column_list.COLUMN.od_name.w+'px',       maxWidth: this.column_list.COLUMN.od_name.w+'px'                           };},
        sum_ea_p(){       return { flexBasis: this.column_list.COLUMN.sum_ea_p.w+'px',      maxWidth: this.column_list.COLUMN.sum_ea_p.w+'px',      textAlign: 'right' };},
        sum_surtax(){     return { flexBasis: this.column_list.COLUMN.sum_surtax.w+'px',    maxWidth: this.column_list.COLUMN.sum_surtax.w+'px',    textAlign: 'right' };},
        sum_sum_p(){      return { flexBasis: this.column_list.COLUMN.sum_sum_p.w+'px',     maxWidth: this.column_list.COLUMN.sum_sum_p.w+'px',     textAlign: 'right' };},
        tax_name(){       return { flexBasis: this.column_list.COLUMN.tax_name.w+'px',      maxWidth: this.column_list.COLUMN.tax_name.w+'px'                          };},
        tax_email(){      return { flexBasis: this.column_list.COLUMN.tax_email.w+'px',     maxWidth: this.column_list.COLUMN.tax_email.w+'px'                         };},
        tax_hp(){         return { flexBasis: this.column_list.COLUMN.tax_hp.w+'px',        maxWidth: this.column_list.COLUMN.tax_hp.w+'px'                            };},
        note(){           return { flexBasis: this.column_list.COLUMN.note.w+'px',          maxWidth: this.column_list.COLUMN.note.w+'px'                              };},
        created_at(){     return { flexBasis: this.column_list.COLUMN.created_at.w+'px',    maxWidth: this.column_list.COLUMN.created_at.w+'px'                        };},
        gm_name(){        return { flexBasis: this.column_list.MODEL.gm_name.w+'px',        maxWidth: this.column_list.MODEL.gm_name.w+'px',        textAlign:'left'   };},
        gm_spec(){        return { flexBasis: this.column_list.MODEL.gm_spec.w+'px',        maxWidth: this.column_list.MODEL.gm_spec.w+'px'                            };},
        catno(){          return { flexBasis: this.column_list.MODEL.catno.w+'px',          maxWidth: this.column_list.MODEL.catno.w+'px'                              };},
        gm_code(){        return { flexBasis: this.column_list.MODEL.gm_code.w+'px',        maxWidth: this.column_list.MODEL.gm_code.w+'px'                            };},
        gm_price(){       return { flexBasis: this.column_list.MODEL.gm_price.w+'px',       maxWidth: this.column_list.MODEL.gm_price.w+'px',       textAlign: 'right' };},
        ea(){             return { flexBasis: this.column_list.MODEL.ea.w+'px',             maxWidth: this.column_list.MODEL.ea.w+'px',             textAlign: 'right' };},
        ea_price(){       return { flexBasis: this.column_list.MODEL.ea_price.w+'px',       maxWidth: this.column_list.MODEL.ea_price.w+'px',       textAlign: 'right' };},
        surtax(){         return { flexBasis: this.column_list.MODEL.surtax.w+'px',         maxWidth: this.column_list.MODEL.surtax.w+'px',         textAlign: 'right' };},
        sum_price(){      return { flexBasis: this.column_list.MODEL.sum_price.w+'px',      maxWidth: this.column_list.MODEL.sum_price.w+'px',      textAlign: 'right' };},
        com_order_dt(){   return { flexBasis: this.column_list.MODEL.com_order_dt.w+'px',   maxWidth: this.column_list.MODEL.com_order_dt.w+'px'                       };},
        buyer(){          return { flexBasis: this.column_list.MODEL.buyer.w+'px',          maxWidth: this.column_list.MODEL.buyer.w+'px'                              };},
        order_mng(){      return { flexBasis: this.column_list.MODEL.order_mng.w+'px',      maxWidth: this.column_list.MODEL.order_mng.w+'px'                          };},
        purchase_price(){ return { flexBasis: this.column_list.MODEL.purchase_price.w+'px', maxWidth: this.column_list.MODEL.purchase_price.w+'px', textAlign: 'right' };},
        shipping_dt() {   return { flexBasis: this.column_list.MODEL.shipping_dt.w+'px',    maxWidth: this.column_list.MODEL.shipping_dt.w+'px'                        };},
     
        pay_type_option: function () {
            let tmp = {};
            for (let [k, v] of Object.entries(this.config.pay_type))
                this.$set(tmp, k, v);
            return tmp;
        },
        mng_option: function () {
            // return this.mng_list.map(mng => {
            //     return {    val:mng.name,
            //                 name:mng.name, }
            // });
            let tmp = {};
            this.mng_list.forEach(e => {
                this.$set(tmp, e.name, e.name);
            });
            return tmp;
        },
    
    },
    methods: {
        createModel(lg_i) { this.$emit('createModel', lg_i); },

        async apply(lg_id, lm_id=null) {
            let source = this.ledger[lg_id];
            if (lm_id !== null)
                source = this.ledger[lg_id].ledger_model[lm_id];
            
            let tmp = Object.assign( {}, source, {_method : 'PATCH'} );
            let res = await ax.post(`/api/admin/ledger/${this.ledger[lg_id].lg_id}`, tmp);
            if (res && res.status === 200) {
                this.$emit('index');
                Notify.toast('success', '수정 완료');
            }
            if (lm_id !== null) this.$emit('all_price_update');
        },

        async destroy(lg_i, lm_i=null) {
            var isok = await Notify.confirm('삭제', 'danger');            
            if (isok) {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                let url = `/api/admin/ledger/${this.ledger[lg_i].lg_id}`;
                if (lm_i != null && lm_i >= 0)
                    url += `?lm_id=${this.ledger[lg_i].ledger_model[lm_i].lm_id}`
                const res = await ax.post(url, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '삭제 완료');
                    this.$emit('index');
                }
            }
        },
        
        chkChange () { this.$emit('chkChange'); },
        frm_formatHp(v) { return this.formatHp(v); },
        frm_formatDate(v) { return this.formatDate(v); },
    },
};
</script>

<style lang="css" scoped>
.row.step_2,
.row.step_2 .model .row { background:#20613720; }
.row.cxl,
.row.cxl .model .row,
.row .model .row.cxl { background:#ff000044; }
.row.cxl .col, 
.row.cxl .model .row .col,
.row .model .row.cxl .col { text-decoration:line-through; }
.row .col,
.row .col >>> input,
.row .col select { font-size:.8rem;  }
.row .col select,
.row .col >>> input,
.row .col textarea { border-color:#00000010; padding:0 4px; background:none; height:1.4rem; }
.row .col textarea:focus { z-index:1; background:#FFF; width:20rem; height:5rem; position:absolute; top:0; right:0; }
.row .col select:focus,
.row .col input:focus { border-color:#FF4B0088; }
.row.modified { background:#FFC10755; }

.row:not(:last-of-type) { border-bottom:2px solid #777; } 
.row .model .row { background:#f7f7f7; margin:0; overflow:hidden; min-height:35px; display: flex; align-items: center; }
.row .model .row:not(:last-of-type) { border-bottom:1px solid #AAA; }
.row .model .row .col:first-child { padding-left:32px !important; }
</style>