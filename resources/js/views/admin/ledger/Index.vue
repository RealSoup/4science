<template>
<div id="admLedger" class="p_warp">
    <h3 class="p_tit">영업 장부</h3>

    <Search v-model="schFrm"
        @index="index"
        @editSearch = "editSearch"
        :search="user_mng_config.SEARCH"
        :sch_item_list="sch_item_list"
        :mng_list="mng_list"
        :writer="writer"
        :config = config
    />

    <b-card class="shadow data">
        <b-row class="list_top">
            <b-col>
                Total : <b-badge variant="info">{{ledger.total}}</b-badge>
                <b-button size="sm" @click="editColumn" class="ml-4" v-b-tooltip.hover="'정보 나열 순서'"><b-icon-gear /></b-button>
            </b-col>
            <b-col><b-button @click="create('papa')" variant="info" size="sm"><b-icon-plus-lg /> 추가</b-button></b-col>
        </b-row>
        
        <perfect-scrollbar suppressScrollX="true">
            <ListHead
                @index="index"
                @toggle_all_chk="toggle_all_chk"
                :ledger = ledger.data
                :mng_config_column = user_mng_config.COLUMN
                :column_list_clmn = column_list_clmn
                :mng_config_model = user_mng_config.MODEL
                :column_list_model = column_list_model
                :row_width = row_width
                :model_width = model_width
                :total_ea_price = total_ea_price
                :total_sum_price = total_sum_price
                :indeterminate = indeterminate
                :all_chk_cplt = all_chk_cplt
            />
            
            <ListData
                @index="index"
                @create="create"
                @edit="edit"
                @chkChange="chkChange"
                :ledger = ledger.data
                :mng_config_column = user_mng_config.COLUMN
                :column_list_clmn = column_list_clmn
                :mng_config_model = user_mng_config.MODEL
                :column_list_model = column_list_model
                :row_width = row_width
                :model_width = model_width
                :indeterminate = indeterminate
                :all_chk_cplt = all_chk_cplt
                :config = config
            />
        </perfect-scrollbar>
        <pagination :data="ledger" @pagination-change-page="index" align="center" class="mt-5"></pagination>
    </b-card>
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false">
            <FormLedger v-if="actTarget == 'papa'" v-model="frm_ledger" :pay_type_option="config.pay_type" @register="register" />
            <FormLedgerModel v-else-if="actTarget == 'child'" v-model="frm_ledger_model" :lg="frm_ledger" @register="register" />
            <CustomSetSearch v-else-if="actTarget == 'editSearch'" 
                @updateSearchComplete="updateSearchComplete"
                :db_data_config_sch="user_mng_config.SEARCH"
                :sch_item_list="sch_item_list"
            />
            <CustomSetColumn v-else-if="actTarget == 'editColumn'" 
                @updateColumnComplete="updateColumnComplete" 
                :db_config_clmn="user_mng_config.COLUMN" 
                :db_config_model="user_mng_config.MODEL" 
                :column_list_clmn="column_list_clmn" 
                :column_list_model="column_list_model" />
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
        'Search'          : () => import('./_comp/Search.vue'),
        'Modal'           : () => import('@/views/_common/Modal.vue'),
        'FormLedger'      : () => import('./_comp/FormLedger.vue'),
        'FormLedgerModel' : () => import('./_comp/FormLedgerModel.vue'),
        'ListHead'        : () => import('./_comp/ListHead.vue'),
        'ListData'        : () => import('./_comp/ListData.vue'),
        'CustomSetColumn' : () => import('./_comp/CustomSetColumn.vue'),
        'CustomSetSearch' : () => import('./_comp/CustomSetSearch.vue'),
    },
    
    data() {
        return {
            isModalViewed: false,
            actTarget: 'set_search',
            actType: 'create',
            editIndex:0,
            isScrollPass: false,
            ledger: { data:[] },
            config: {},
            frm_ledger: {},
            frm_ledger_model: {},
            schFrm: {
                startDate: startDate,
                endDate: endDate,
            },
            mng_list: {},
            user_mng_config: {
                COLUMN:[],
                SEARCH:[],
                MODEL:[],
            },
            mng_info: {},
            writer: [],
            sch_item_list: {  
                created_at  : {name:'작성일',   umc_val:'created_at'},
                gm_price    : {name:'단가',     umc_val:'gm_price'},
                ea_price    : {name:'공급가액', umc_val:'ea_price'},
                surtax      : {name:'세액',     umc_val:'surtax'},
                sum_price   : {name:'합계',     umc_val:'sum_price'},
                mng         : {name:'담당자',   umc_val:'mng'},
                pay_type    : {name:'결제방식', umc_val:'pay_type'},
                orderer     : {name:'고객명',   umc_val:'orderer'},
                od_id       : {name:'번호',     umc_val:'od_id'},
                distributor : {name:'매출처',   umc_val:'distributor'},
                gm_name     : {name:'품목명',   umc_val:'gm_name'},
                catno       : {name:'CAT.No  ', umc_val:'catno'},
                gm_code     : {name:'모델명',   umc_val:'gm_code'},
                writer      : {name:'작성자',   umc_val:'writer'} 
            },
            column_list_clmn: {  
                order_dt    : { w:120, umc_val:'order_dt',     name:'주문일'        },
                pay_type    : { w:120, umc_val:'pay_type',     name:'결제방식'      },
                mng         : { w:120, umc_val:'mng',          name:'담당자'        },
                od_id       : { w:120, umc_val:'od_id',        name:'주문번호'      },
                sale_dt     : { w:120, umc_val:'sale_dt',      name:'매출일'        },
                distributor : { w:120, umc_val:'distributor',  name:'매출처'        },
                depart      : { w:120, umc_val:'depart',       name:'소속'          },
                lab_prof    : { w:120, umc_val:'lab_prof',     name:'연구실/교수님' },
                orderer     : { w:120, umc_val:'orderer',      name:'고객명'        },
                od_name     : { w:120, umc_val:'od_name',      name:'주문명'        },
                sum_ea_p    : { w:120, umc_val:'sum_ea_p',     name:'총 공급가액'   },
                sum_surtax  : { w:120, umc_val:'sum_surtax',   name:'총 세액'       },
                sum_sum_p   : { w:120, umc_val:'sum_sum_p',    name:'총 합계'       },
                tax_name    : { w:120, umc_val:'tax_name',     name:'tax담당'       },
                tax_email   : { w:120, umc_val:'tax_email',    name:'tax메일'       },
                tax_hp      : { w:120, umc_val:'tax_hp',       name:'tax번호'       },
                note        : { w:120, umc_val:'note',         name:'비고'          },
                created_at  : { w:120, umc_val:'created_at',   name:'작성일'        },
                model       : { w:0,   umc_val:'model',        name:'제품정보'      },
            },
            column_list_model: {
                gm_name         : { w:250, umc_val:'gm_name',           name:'품목명'   },
                gm_spec         : { w:250, umc_val:'gm_spec',           name:'사양'     },
                catno           : { w:115, umc_val:'catno',             name:'CAT.No'   },
                gm_code         : { w:120, umc_val:'gm_code',           name:'모델명'   },
                gm_price        : { w:90,  umc_val:'gm_price',          name:'단가'     },
                ea              : { w:45,  umc_val:'ea',                name:'수량'     },
                ea_price        : { w:130, umc_val:'ea_price',          name:'공급가액' },
                surtax          : { w:90,  umc_val:'surtax',            name:'세액'     },
                sum_price       : { w:130, umc_val:'sum_price',         name:'합계'     },
                com_order_dt    : { w:120, umc_val:'com_order_dt',      name:'업체발주일'   },
                buyer           : { w:120, umc_val:'buyer',             name:'매입처'   },
                order_mng       : { w:120, umc_val:'order_mng',         name:'발주담당' },
                purchase_price  : { w:120, umc_val:'purchase_price',    name:'매입금액' },
                shipping_dt     : { w:120, umc_val:'shipping_dt',       name:'제품발송일'   },
            },
            indeterminate:false,
            all_chk_cplt:false,
        };
    },
    computed: {
        row_width: function() {
            let sum = 0;
            this.user_mng_config.COLUMN.forEach(e => {
                if (e.umc_val == 'model')
                    this.user_mng_config.MODEL.forEach(e => {
                        sum += this.column_list_model[e.umc_val].w;
                    });
                else
                    sum += this.column_list_clmn[e.umc_val].w;
            });                
            //  번호 넓이(90)를 추가한다
            return sum+90;
        },
        model_width: function() {
            let sum = 0;
            this.user_mng_config.MODEL.forEach(e => {
                sum += this.column_list_model[e.umc_val].w;
            });
            return sum;//this.user_mng_config.MODEL.reduce( (a, e) => a + e.w, 0);
        },

        total_ea_price: function() {
            return this.ledger.data.reduce((acc, lg) => {
                return acc + (lg.lg_pay_type !== 'CXL' ? lg.ledger_model.reduce((acc02, lm) => {
                    return acc02 + (lm.lm_cxl !== 'Y' ? Number(lm.lm_ea_price) : 0);
                }, 0) : 0);
            }, 0);
        },

        total_sum_price: function() {
            return this.ledger.data.reduce((acc, lg) => {
                return acc + (lg.lg_pay_type !== 'CXL' ? lg.ledger_model.reduce((acc02, lm) => {
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
                this.user_mng_config = res.data.user_mng_config;
                this.mng_info = res.data.mng_info;
                this.writer = res.data.writer ? res.data.writer : [];
                this.config = res.data.config;
            }
        },

        create(target, lg_i) {
            this.isModalViewed = true;
            this.actTarget = target;
            this.actType = 'create';
            if (target == 'child') {
                this.frm_ledger_model = {};
                this.frm_ledger_model.lm_lg_id = this.ledger.data[lg_i].lg_id;
            }
        },

        editSearch () {
            this.isModalViewed = true;
            this.actTarget = 'editSearch';
        },

        editColumn () {
            this.isModalViewed = true;
            this.actTarget = 'editColumn';
        },

        updateColumnComplete () {
            this.isModalViewed = false;
            this.index();
        },
        
        updateSearchComplete() {
            this.isModalViewed = false;
            this.index();
        },
        
        async store(frm) {
            let res = await ax.post(`/api/admin/ledger`, frm);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '등록 완료');
            }
        },

        edit(target, lg_i, lm_i=null) {
            this.isModalViewed = true;
            this.actTarget = target;
            this.editIndex = lg_i;
            this.frm_ledger = this.ledger.data[lg_i];
            if (target == 'child') {
                this.frm_ledger_model = this.ledger.data[lg_i].ledger_model[lm_i]; 
                this.frm_ledger_model.lm_lg_id = this.ledger.data[lg_i].lg_id;
            }
            this.actType = 'edit';
        },

        async update(frm) {
            frm = Object.assign( {}, frm, {_method : 'PATCH'} );
            let lg_id = frm.lg_id ? frm.lg_id : frm.lm_lg_id;
            let res = await ax.post(`/api/admin/ledger/${lg_id}`, frm);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
            if (this.actTarget == 'child')
                this.all_price_update();
        },

        register() {
            let tmp = {}
            if (this.actTarget == 'papa')       tmp = Object.assign( {}, this.frm_ledger );
            else if (this.actTarget == 'child') tmp = Object.assign( {}, this.frm_ledger_model );
            if (this.actType == 'create')       this.store(tmp);
            else if (this.actType == 'edit')    this.update(tmp);
            
            this.frm_ledger = { 
                lg_pay_type: 'CARD', 
                lg_source_type: 'ORD', 
                lg_od_id: 0, 
                ledger_model: []
            };
            this.frm_ledger_model = {};
            this.isModalViewed = false;
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
    },
    mounted() {        
        this.index(); 
    }
};
</script>

<style lang="css">
#admLedger { font-size:.85rem; }
#admLedger .p_tit { max-width:1500px; margin:auto; }

#admLedger .data .list_top { margin-bottom: 2px; }
#admLedger .data .list_top div:nth-child(2) { text-align:right; }
#admLedger .data .ledger_module .row .list_id { flex: 0 0 90px; max-width:90px; }
#admLedger .data .ledger_module .row .list_id .custom-control { padding-left:0; margin-left:1.5rem; }
#admLedger .data .ledger_module .row .list_id .custom-control .custom-control-label { line-height:1.5rem; cursor:pointer; }
        
/*
#admLedger .data .ledger_module .row .list_id .custom-control-label::before, 
#admLedger .data .ledger_module .row .list_id .custom-control-label::after { width:2rem; height:2rem; }
*/

#admLedger .data .ledger_module .row { margin:0; align-items:center; position:relative; }
#admLedger .data .ledger_module>.row { margin:auto; }
#admLedger .data .ledger_module .row .col { padding-left:5px; padding-right:5px; text-align:center; line-height:1.1rem; }
#admLedger .data .ledger_module .row .model { flex-grow: 0; flex-wrap: wrap; flex-basis:auto; flex-shrink:1; max-width:none; min-height:28px; padding:0; }
#admLedger .data .ledger_module .ctrl { position:absolute; top:50%; transform:translateY(-50%); left:-104px; width:120px; text-align:right; border-right:2px solid #55aebf; border-radius:0 5px 5px 0; color:#126b7c; transition:all .4s; z-index:1; background:#fff; }
#admLedger .data .ledger_module .row .model .row .ctrl { left:-76px; width:95px; }
#admLedger .data .ledger_module .ctrl:hover { left:0 !important; z-index: 2; }


/*#admLedger .data >>> .ps .ps__rail-x { top:0; bottom:auto; height:25px; }*/
#admLedger .data .ps .ps__rail-x { height:25px; position:fixed; z-index: 1; }
#admLedger .data .ps .ps__rail-x:hover { background-color:#eee; opacity:.9; }
#admLedger .data .ps .ps__rail-x .ps__thumb-x { height:18px; background-color:pink; position:fixed;  }
#admLedger .data .ps .ps__rail-x:hover > .ps__thumb-x, 
#admLedger .data .ps .ps__rail-x:focus > .ps__thumb-x, 
#admLedger .data .ps .ps__rail-x.ps--clicking .ps__thumb-x { background-color:hotpink; height:22px; }

#admLedger .to_accounting { position:fixed; left:0; top:47%; border-radius:0 10px 10px 0; z-index:1; writing-mode:vertical-lr; width:40px; padding:2px 8px; }
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

</style>