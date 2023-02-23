<template>
<div id="admLedger" class="p_wrap">
    <h3 class="p_tit">영업 장부</h3>
    <b-card class="shadow" :style="{ width: 'calc( '+row_width+'px + 2.5rem )', marginRight:'15px' }">
        <b-row class="list_top">
            <b-col>Total : <b-badge variant="info">{{ledger.total}}</b-badge></b-col>
        </b-row>
        
        <ListTop class="top" :class="{fixed_header:isScrollPass}" :style="{ width: row_width+'px', top: headTop+'px' }" 
            :mng_config = mng_config
            :column_list = column_list
            :model_width = model_width
            :total_ea_price = total_ea_price
            :total_sum_price = total_sum_price
        />
        <ListSearch class="search" :style="{ width: row_width+'px' }"
            @index="index"
            v-model="schFrm"
            :mng_config = mng_config
            :column_list = column_list
            :model_width = model_width
            :mng_list = mng_list
            :config = config
        />
        <ListHead class="head" :class="{fixed_header:isScrollPass}" :style="{ width: row_width+'px', top: headTop+'px' }"
            @create="create"
            @modal_view="modal_view"
            @toggle_all_chk="toggle_all_chk"
            :mng_config = mng_config
            :column_list = column_list
            :model_width = model_width
            :indeterminate = indeterminate
            :all_chk_cplt = all_chk_cplt
        />
        
        <ListData class="content" :style="{ width: row_width+'px' }"
            @index="index"
            @createModel="createModel"
            @chkChange="chkChange"
            :ledger = ledger.data
            :mng_config = mng_config
            :column_list = column_list
            :model_width = model_width
            :config = config
            :mng_list = mng_list
        />
    </b-card>
    <pagination :data="ledger" @pagination-change-page="index" align="center" class="my-5"></pagination>

    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false">
            <template slot="header">항목 나열 사용자 정의</template>
            <CustomSetColumn 
                @updateColumnComplete="updateColumnComplete" 
                :mng_config="mng_config" 
                :column_list="column_list" />
        </Modal>
    </transition>

    <transition name="slideLeftRight">
        <b-button v-if="ledger.data.filter(el => el.chk_cplt==true).length" class="to_accounting" @click="to_accounting">회계전송</b-button>
    </transition>
</div>
</template>

<script>
import ax from '@/api/http';

let init_dt = new Date();
let endDate = init_dt.format("yyyy-MM-dd");
// init_dt.setMonth(0); 
init_dt.setDate(1);
let startDate = init_dt.format("yyyy-MM-dd");

// endDate = '';
// startDate = '';

export default {
    name: 'admLedger',
    components: {
        'ListTop'         : () => import('./_comp/ListTop.vue'),
        'ListSearch'      : () => import('./_comp/ListSearch.vue'),
        'ListHead'        : () => import('./_comp/ListHead.vue'),
        'ListData'        : () => import('./_comp/ListData.vue'),
        'Modal'           : () => import('@/views/_common/Modal.vue'),
        'CustomSetColumn' : () => import('./_comp/CustomSetColumn.vue'),
    },
    
    data() {
        return {
            isModalViewed: false,
            actTarget: 'set_search',
            actType: 'create',
            editIndex:0,
            isScrollPass: false,
            headTop:0,
            ledger: { data:[] },
            config: {},
            schFrm: {},
            mng_list: {},
            mng_config: {
                COLUMN:[],
                MODEL:[],
            },
            mng_info: {},
            writer: [],
            
            column_list:{
                COLUMN: {  
                    order_dt    : { w:120, name:'주문일'        },
                    pay_type    : { w:120, name:'결제방식'      },
                    mng         : { w:120, name:'담당자'        },
                    od_id       : { w:120, name:'주문번호'      },
                    sale_dt     : { w:120, name:'매출일'        },
                    distributor : { w:120, name:'매출처'        },
                    depart      : { w:120, name:'소속'          },
                    lab_prof    : { w:120, name:'연구실/교수님' },
                    orderer     : { w:120, name:'고객명'        },
                    od_name     : { w:120, name:'주문명'        },
                    sum_ea_p    : { w:120, name:'총 공급가액'   },
                    sum_surtax  : { w:120, name:'총 세액'       },
                    sum_sum_p   : { w:120, name:'총 합계'       },
                    tax_name    : { w:120, name:'tax담당'       },
                    tax_email   : { w:120, name:'tax메일'       },
                    tax_hp      : { w:120, name:'tax번호'       },
                    note        : { w:120, name:'비고'          },
                    created_at  : { w:120, name:'작성일'        },
                    model       : { w:0,   name:'제품정보'      },
                },
                MODEL: {
                    gm_name         : { w:250, name:'품목명'   },
                    gm_spec         : { w:250, name:'사양'     },
                    catno           : { w:115, name:'CAT.No'   },
                    gm_code         : { w:120, name:'모델명'   },
                    gm_price        : { w:90,  name:'단가'     },
                    ea              : { w:45,  name:'수량'     },
                    ea_price        : { w:130, name:'공급가액' },
                    surtax          : { w:90,  name:'세액'     },
                    sum_price       : { w:130, name:'합계'     },
                    com_order_dt    : { w:120, name:'업체발주일'   },
                    buyer           : { w:120, name:'매입처'   },
                    order_mng       : { w:120, name:'발주담당' },
                    purchase_price  : { w:120, name:'매입금액' },
                    shipping_dt     : { w:120, name:'제품발송일'   },            
                }
            },
            indeterminate:false,
            all_chk_cplt:false,
        };
    },
    computed: {
        row_width: function() {
            let sum = 0;
            this.mng_config.COLUMN.forEach(e => {
                if (e.umc_val == 'model')
                    this.mng_config.MODEL.forEach(e => {
                        sum += this.column_list.MODEL[e.umc_val].w;
                    });
                else
                    sum += this.column_list.COLUMN[e.umc_val].w;
            });                
            //  번호 넓이(90)를 추가한다
            return sum+90;
        },
        model_width: function() {
            let sum = 0;
            this.mng_config.MODEL.forEach(e => {
                sum += this.column_list.MODEL[e.umc_val].w;
            });
            return sum;//this.mng_config.MODEL.reduce( (a, e) => a + e.w, 0);
        },

        total_ea_price: function() {
            return this.ledger.data.reduce((acc, lg) => {
                return acc + (lg.lg_pay_type !== 'CXL' && lg.hasOwnProperty('ledger_model') ? lg.ledger_model.reduce((acc02, lm) => {
                    return acc02 + (lm.lm_cxl !== 'Y' ? Number(lm.lm_ea_price) : 0);
                }, 0) : 0);
            }, 0);
        },

        total_sum_price: function() {
            return this.ledger.data.reduce((acc, lg) => {
                return acc + (lg.lg_pay_type !== 'CXL' && lg.hasOwnProperty('ledger_model') ? lg.ledger_model.reduce((acc02, lm) => {
                    return acc02 + (lm.lm_cxl !== 'Y' ? Number(lm.lm_sum_price) : 0);
                }, 0) : 0);
            }, 0);
        },
    },
    methods: {        
        async index(page=null) {
            if(page)
                this.schFrm.page = page;
            let res = await ax.get(`/api/admin/ledger`, {params: this.schFrm});
            if (res && res.status === 200) {
                this.ledger = res.data.lg;
                this.mng_list = res.data.mng;
                this.mng_config = res.data.mng_config;
                this.mng_info = res.data.mng_info;
                this.writer = res.data.writer ? res.data.writer : [];
                this.config = res.data.config;
            }
        },

        create(){ this.ledger.data.unshift({ lg_sum_ea_p:0, lg_sum_surtax:0, lg_sum_sum_p:0 }) },
        createModel(lg_i){ this.ledger.data[lg_i].ledger_model.unshift({ lm_lg_id:this.ledger.data[lg_i].lg_id, lm_gm_price:0, lm_ea:0, lm_ea_price:0, lm_surtax:0, lm_sum_price:0, lm_purchase_price:0 }) },

        updateColumnComplete () {
            this.isModalViewed = false;
            this.index();
        },      

        async all_price_update () { //  금액이나 갯수 수정시 자동으로 ""총"" 합계등이 업데이트
            let sum_ea_p = 0;
            let sum_surtax = 0;
            let sum_sum_p = 0;
            this.ledger.data[this.editIndex].ledger_model.forEach(lm => {
                if (lm.lm_cxl !== "Y") { 
                    sum_ea_p   += Number(lm.lm_ea_price);
                    sum_surtax += Number(lm.lm_surtax);
                    sum_sum_p  += Number(lm.lm_sum_price);
                }
            });
            this.ledger.data[this.editIndex].lg_sum_ea_p   = sum_ea_p;
            this.ledger.data[this.editIndex].lg_sum_surtax = sum_surtax;
            this.ledger.data[this.editIndex].lg_sum_sum_p  = sum_sum_p;
            
            let fm = {
                _method : 'PATCH',
                type: 'all_price_update',
                'lg_sum_ea_p'   : sum_ea_p,
                'lg_sum_surtax' : sum_surtax,
                'lg_sum_sum_p'  : sum_sum_p,
            };
            let res = await ax.post(`/api/admin/ledger/${this.ledger.data[this.editIndex].lg_id}`, fm);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
        }, 

        chkChange () {
            let chkCnt = this.ledger.data.filter(el => el.chk_cplt==true).length;
            if (chkCnt === 0) {
                this.indeterminate = false;
                this.allSelected = false;
            } else if (chkCnt === this.ledger.data.length) {
                this.indeterminate = false;
                this.allSelected = true;
            } else {
                this.indeterminate = true;
                this.allSelected = false;
            }
        },

        toggle_all_chk(checked) {
            this.ledger.data.forEach(el => {
                el.chk_cplt = checked ? true : false;
            });
            this.indeterminate = false;
        },
        modal_view(v){
            this.isModalViewed = v;
        },

        async to_accounting() {

            let tmpFrm = {
                _method : 'PATCH',
                type: 'to_accounting',
                lg_ids: this.ledger.data.filter(el => el.chk_cplt==true).map(el => el.lg_id),
            };
            let res = await ax.post(`/api/admin/ledger/0`, tmpFrm);
            if (res && res.status === 200) {
                let res02 = await ax.post(`/api/admin/ledgerAcct`, {lg: this.ledger.data});
                if (res02 && res02.status === 200) {
                    this.index();
                    Notify.toast('success', '수정 완료');
                }
            }
        },

        scrollListener: function (e) {
            const head_top=290;
            this.isScrollPass = window.scrollY >= head_top;
            if (this.isScrollPass)  this.headTop = window.scrollY-head_top;
            else                    this.headTop = 0; 
        },
    },
    mounted() {
        this.index(); 
        window.addEventListener('scroll', this.scrollListener);
    },
    beforeDestroy: function () { window.removeEventListener('scroll', this.scrollListener); }
};
</script>

<style lang="css">
#admLedger { font-size:.85rem; }
#admLedger .p_tit { max-width:1500px; margin:auto; }

#admLedger .list_top { margin-bottom: 2px; }
#admLedger .list_top div:nth-child(2) { text-align:right; }
#admLedger .top .model .col .badge { font-size:1rem; }
#admLedger .fixed_header { position:relative; }
#admLedger .fixed_header.head { z-index:2; }
#admLedger .fixed_header.top .model .col .badge { position:relative; top:96px; z-index:2; }
#admLedger .row .list_id { flex: 0 0 90px; max-width:90px; min-height:22.39px; }
#admLedger .row .list_id .custom-control .custom-control-label { line-height:1.5rem; cursor:pointer; }
        
/*
#admLedger .data .ledger_module .row .list_id .custom-control-label::before, 
#admLedger .data .ledger_module .row .list_id .custom-control-label::after { width:2rem; height:2rem; }
*/

#admLedger .row { margin:0; align-items:center; position:relative; padding:5px 0; }
#admLedger .row { margin:auto; }
#admLedger .row:not(.list_top) .col { padding-left:5px; padding-right:5px; text-align:center; line-height:1.1rem; }
#admLedger .row .model { flex-grow: 0; flex-wrap: wrap; flex-basis:auto; flex-shrink:1; max-width:none; padding:0; }
#admLedger .ctrl { position:absolute; top:50%; transform:translateY(-50%); left:-104px; width:120px; text-align:right; border-right:2px solid #55aebf; border-radius:0 5px 5px 0; color:#126b7c; transition:all .4s; z-index:1; background:#fff; }
#admLedger .row .model .row { padding:0; }
#admLedger .row .model .row .ctrl { left:-76px; width:95px; }
#admLedger .ctrl:hover { left:0 !important; z-index: 2; }

/*
.slideLeftRight-enter-to,
.slideLeftRight-leave ,
.slideLeftRight-enter-active  { transition:all 0.9s; }
.slideLeftRight-enter,
.slideLeftRight-leave-to { transform:translateX(100%); }
*/
.slideLeftRight-enter-to,
.slideLeftRight-leave { transform: translateX(0%); }
.slideLeftRight-enter-active,
.slideLeftRight-leave-active { transition: all .3s ease; }
.slideLeftRight-enter,
.slideLeftRight-leave-to { transform: translateX(-100%); opacity: 0; }
.row .col .btn-sm { padding: 0.1rem 0.3rem; font-size: 0.7rem; }

.row .col .hidden_menu { position:absolute; left:0; z-index:2; }
.slide-fade-enter-active { transition: all .2s ease; }
.slide-fade-leave-active { transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0); }
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ { transform: translateX(-20px); opacity: 0; }
</style>