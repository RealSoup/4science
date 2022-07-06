<template>
<div id="admLedger" class="p_warp">
    <h3 class="p_tit">영업 장부</h3>
    <Search v-model="schFrm"
        @index="index"
        :search="user_mng_config.SEARCH"
        :mng_list="mng_list"
        :writer="writer"
    />

    <b-card class="shadow data">
        <b-row class="list_top">
            <b-col>
                Total : <b-badge variant="info">{{ledger.total}}</b-badge>
                <b-button size="sm" @click="editColumn" class="ml-4"><b-icon-gear /></b-button>
            </b-col>
            <b-col><b-button @click="create('papa')" variant="info" size="sm"><b-icon-plus-lg /> 추가</b-button></b-col>
        </b-row>
        
        <perfect-scrollbar suppressScrollX="true">
            <ListHead
                @index="index"
                :mng_config_column = user_mng_config.COLUMN
                :column_list_clmn = column_list_clmn
                :mng_config_model = user_mng_config.MODEL
                :column_list_model = column_list_model
                :total = total
                :row_width = row_width
                :model_width = model_width
            />
            
            <ListData
                @index="index"
                @create="create"
                @edit="edit"
                :ledger = ledger.data
                :mng_config_column = user_mng_config.COLUMN
                :column_list_clmn = column_list_clmn
                :mng_config_model = user_mng_config.MODEL
                :column_list_model = column_list_model
                :row_width = row_width
                :model_width = model_width
            />
        </perfect-scrollbar>
        <pagination :data="ledger" @pagination-change-page="index" align="center" class="mt-5"></pagination>
    </b-card>
    <transition name="modal">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false">
            <FormLedger v-if="actTarget == 'papa'" v-model="frm_ledger" @register="register" />
            <FormLedgerModel v-else-if="actTarget == 'child'" v-model="frm_ledger_model" @register="register" />
            <CustomSetColumn v-else-if="actTarget == 'editColumn'" 
                @updateColumnComplete="updateColumnComplete" 
                :db_config_clmn="user_mng_config.COLUMN" 
                :db_config_model="user_mng_config.MODEL" 
                :column_list_clmn="column_list_clmn" 
                :column_list_model="column_list_model" />
        </Modal>
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

endDate = '';
startDate = '';

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
    },
    
    data() {
        return {
            isModalViewed: false,
            actTarget: 'set_search',
            actType: 'create',
            isScrollPass: false,
            ledger: { data:[] },
            frm_ledger: {},
            frm_ledger_model: {},
            schFrm: {
                startDate: startDate,
                endDate: endDate,
            },
            total: {},
            mng_list: {},
            user_mng_config: {
                COLUMN:[],
                SEARCH:[],
                MODEL:[],
            },
            mng_info: {},
            writer: [],
            column_list_clmn: {  
                order_dt    : { w:120, umc_val:'order_dt',      name:'주문일'   },
                pay_type    : { w:120, umc_val:'pay_type',      name:'결제방식' },
                mng         : { w:120, umc_val:'mng',           name:'담당자'   },
                source_no   : { w:120, umc_val:'source_no',     name:'번호'     },
                sale_dt     : { w:120, umc_val:'sale_dt',       name:'매출일'   },
                distributor : { w:120, umc_val:'distributor',   name:'매출처'   },
                depart      : { w:120, umc_val:'depart',        name:'소속'     },
                lab_prof    : { w:120, umc_val:'lab_prof',      name:'연구실/교수님'   },
                orderer     : { w:120, umc_val:'orderer',       name:'고객명'   },
                email       : { w:120, umc_val:'email',         name:'메일'     },
                hp          : { w:120, umc_val:'hp',            name:'HP'       },
                note        : { w:120, umc_val:'note',          name:'비고'     },
                created_at  : { w:120, umc_val:'created_at',    name:'작성일'     },
                model       : { w:0, umc_val:'model',           name:'제품정보'   },
            },
            column_list_model: {
                gm_name         : { w:250, umc_val:'gm_name',           name:'품목명'   },
                gm_spec         : { w:250, umc_val:'gm_spec',           name:'사양'     },
                catno           : { w:115, umc_val:'catno',             name:'CAT.No'   },
                gm_code         : { w:120, umc_val:'gm_code',           name:'모델명'   },
                gm_price        : { w:90, umc_val:'gm_price',           name:'단가'     },
                ea              : { w:45, umc_val:'ea',                 name:'수량'     },
                ea_price        : { w:130, umc_val:'ea_price',          name:'공급가액' },
                surtax          : { w:90, umc_val:'surtax',             name:'세액'     },
                sum_price       : { w:130, umc_val:'sum_price',         name:'합계'     },
                com_order_dt    : { w:120, umc_val:'com_order_dt',      name:'업체발주일'   },
                buyer           : { w:120, umc_val:'buyer',             name:'매입처'   },
                order_mng       : { w:120, umc_val:'order_mng',         name:'발주담당' },
                purchase_price  : { w:120, umc_val:'purchase_price',    name:'매입금액' },
                shipping_dt     : { w:120, umc_val:'shipping_dt',       name:'제품발송일'   },
            },
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
    },
    methods: {        
        async index(page=null) {
            if(page)
                this.schFrm.page = page;
            let res = await ax.get(`/api/admin/ledger`, {params: this.schFrm});
            if (res && res.status === 200) {
                this.ledger = res.data.lg;
                this.total = res.data.total;
                this.mng_list = res.data.mng;
                this.user_mng_config = res.data.user_mng_config;
                this.mng_info = res.data.mng_info;
                this.writer = res.data.writer ? res.data.writer : [];
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

        editColumn () {
            this.isModalViewed = true;
            this.actTarget = 'editColumn';
        },

        updateColumnComplete () {
            this.index();
            this.isModalViewed = false;
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
            if (target == 'papa') { 
                this.frm_ledger = this.ledger.data[lg_i];
            } else if (target == 'child') { 
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
        },

        register() {
            if (this.actTarget == 'papa') {
                let tmp = Object.assign( {}, this.frm_ledger );
                if (this.actType == 'create')       this.store(tmp);
                else if (this.actType == 'edit')    this.update(tmp);
                this.frm_ledger = { 
                    lg_pay_type: 'CARD', 
                    lg_source_type: 'ORD', 
                    lg_source_no: 0, 
                    ledger_model: []
                };
            } else if (this.actTarget == 'child') {
                let tmp = Object.assign( {}, this.frm_ledger_model );
                if (this.actType == 'create')       this.store(tmp);
                else if (this.actType == 'edit')    this.update(tmp);
                this.frm_ledger_model = {};
            }
            this.isModalViewed = false;
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
</style>