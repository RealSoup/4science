<template>
<div id="admLedger">
    <b-card class="shadow search">
        <b-container fluid>
            <b-row class="mb-3 sch_date">
                <b-col >주문일</b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="schFrm.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="schFrm.startDate" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="schFrm.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="schFrm.endDate" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col lg="6" md="4" sm="12">
                    <b-button-group class="width_btn">
                        <b-button @click="setDate('lastYear')">작년</b-button>
                        <b-button variant="primary" @click="setDate('thisYear')">올해</b-button>
                        <b-button variant="info" @click="setDate('thisMonth')">이번 달</b-button>
                        <b-button variant="success" @click="setDate('today')">오늘</b-button>
                        <b-button variant="danger" @click="setDate('week')">1주</b-button>
                        <b-button variant="warning" @click="setDate('month')">1달</b-button>
                        <b-button variant="dark" @click="setDate('all')">전체</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="단가">
                        <b-form-input v-model="schFrm.startGmPrice" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="schFrm.endGmPrice" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="공급가액">
                        <b-form-input v-model="schFrm.startEaPrice" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="schFrm.endEaPrice" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="세액">
                        <b-form-input v-model="schFrm.startSurtax" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="schFrm.endSurtax" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="합계">
                        <b-form-input v-model="schFrm.startSumPrice" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="schFrm.endSumPrice" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-row class="justify-content-end mt-3">
                <b-col lg="3" md="4" sm="6">
                    <b-form-select v-model="schFrm.mng">
                        <b-form-select-option value="">◄ 담당자 ►</b-form-select-option>
                        <b-form-select-option v-for="v in mng" :key="v.id" :value="v.name">{{ v.name }}</b-form-select-option>
                    </b-form-select>
                </b-col>
                <b-col lg="3" md="4" sm="6">
                    <b-form-select v-model="schFrm.pay_type">
                        <b-form-select-option value="">◄ 결제방식 ►</b-form-select-option>
                        <b-form-select-option value="CARD">온라인 카드</b-form-select-option>
                        <b-form-select-option value="PSYS">PSYS</b-form-select-option>
                        <b-form-select-option value="BILL">계산서</b-form-select-option>
                        <b-form-select-option value="STAT">전표</b-form-select-option>
                        <b-form-select-option value="CASH">현금영수증</b-form-select-option>
                        <b-form-select-option value="MEMB">회원</b-form-select-option>
                        <b-form-select-option value="REV">역발행</b-form-select-option>
                        <b-form-select-option value="NOT">미발급</b-form-select-option>
                    </b-form-select>
                </b-col>
                <b-col lg="6" md="12">
                    <b-input-group>
                        <b-input-group-prepend>
                            <select class="custom-select" v-model="schFrm.mode">
                                <option value="orderer">고객명</option>
                                <option value="source_no">번호</option>
                                <option value="distributor">매출처</option>
                                <option value="gm_name">품목명</option>
                                <option value="catno">CAT.No</option>
                                <option value="gm_code">모델명</option>
                            </select>
                        </b-input-group-prepend>

                        <b-form-input v-model="schFrm.keyword" @keyup.enter="index" placeholder="Please enter a keyword"></b-form-input>

                        <b-input-group-append>
                            <b-button variant="primary" @click="index">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </b-container>
    </b-card>

    <b-card class="shadow data">
        <perfect-scrollbar suppressScrollX="true">
            
            <b-row class="list_top">
                <b-col><b-button @click="isModalViewed = !isModalViewed">OPEN</b-button></b-col>
                <b-col cols="12">Total : <b-badge variant="info">{{ledger.total}}</b-badge></b-col>
            </b-row>
            <b-row class="list head">
                <b-col>No</b-col> 
                <b-col>주문일</b-col> 
                <b-col>결제방식</b-col> 
                <b-col>담당자</b-col> 
                <b-col>번호</b-col>
                <b-col>매출일</b-col> 
                <b-col>매출처</b-col> 
                <b-col>소속</b-col> 
                <b-col>연구실/교수명</b-col> 
                <b-col>고객명</b-col>
                <b-col class="model">
                    <b-row>
                        <b-col>품목명</b-col> 
                        <b-col>사양</b-col> 
                        <b-col>CAT.No</b-col> 
                        <b-col>모델명</b-col> 
                        <b-col>단가</b-col>
                        <b-col>수량</b-col> 
                        <b-col>공급가액<br /><b-badge variant="info">{{total.ea_price | comma}}</b-badge></b-col> 
                        <b-col>세액</b-col> 
                        <b-col>합계<br /><b-badge variant="info">{{total.sum_price | comma}}</b-badge></b-col> 
                        <b-col>업체발주일</b-col>
                        <b-col>매입처</b-col> <b-col>발주담당</b-col> <b-col>매입금액</b-col> 
                        <b-col>제품발송일</b-col>
                    </b-row>
                </b-col>
                <b-col>메일</b-col>
                <b-col>HP</b-col> 
                <b-col>비고</b-col>
            </b-row>
            <transition-group name="translate-fade" tag="article">
                <b-row v-for="(lg, i) in ledger.data" :key="lg.lg_id" class="list body">
                    <b-col>
                        <div class="ctrl">
                            <b-button size="sm" variant="warning" @click="lg.edit=!lg.edit"><b-icon-tools /></b-button>
                            <b-button size="sm" variant="danger" @click="destroy(i)"><b-icon-trash-fill /></b-button>
                            <b-icon-caret-right-fill />
                        </div>
                        {{lg.lg_id}}
                    </b-col>
                    <b-col>{{lg.lg_order_dt}}</b-col>
                    <b-col>
                        <b-badge variant="primary" v-if="lg.lg_pay_type == 'CARD'">온라인 카드</b-badge>
                        <b-badge variant="warning" v-else-if="lg.lg_pay_type == 'PSYS'">PSYS</b-badge>
                        <b-badge variant="seccess" v-else-if="lg.lg_pay_type == 'BILL'">계산서</b-badge>
                        <b-badge variant="secondary" v-else-if="lg.lg_pay_type == 'STAT'">전표</b-badge>
                        <b-badge variant="info" v-else-if="lg.lg_pay_type == 'CASH'">현금영수증</b-badge>
                        <b-badge variant="warning" v-else-if="lg.lg_pay_type == 'MEMB'">회원</b-badge>
                        <b-badge variant="danger" v-else-if="lg.lg_pay_type == 'REV'">역발행</b-badge>
                        <b-badge variant="dark" v-else-if="lg.lg_pay_type == 'NOT'">미발급</b-badge>
                    </b-col>
                    <b-col>{{lg.lg_mng}}</b-col>
                    <b-col>
                        <b-button v-if="lg.lg_source_type == 'ORD'" :to="{name: 'adm_order_edit', params: { od_id:lg.lg_source_no }}" variant="outline-primary" block>
                            {{lg.lg_source_no}}
                        </b-button>
                        <b-button v-else-if="lg.lg_source_type == 'EST'" :to="{name: 'adm_estimate_show_reply', params: { er_id:lg.lg_source_no }}" variant="outline-danger" block>
                            {{lg.lg_source_no}}
                        </b-button>
                    </b-col>
                    <b-col>{{lg.lg_sale_dt}}</b-col>
                    <b-col>{{lg.lg_distributor}}</b-col>
                    <b-col>{{lg.lg_depart}}</b-col>
                    <b-col>{{lg.lg_lab_prof}}</b-col>
                    <b-col>{{lg.lg_orderer}}</b-col>
                    <b-col class="model">
                        <b-row v-for="lm in lg.ledger_model" :key="lm.lm_id">
                            <b-col>{{lm.lm_gm_name}}</b-col>
                            <b-col>{{lm.lm_gm_spec}}</b-col>
                            <b-col>{{lm.lm_catno}}</b-col>
                            <b-col>{{lm.lm_gm_code}}</b-col>
                            <b-col>{{lm.lm_gm_price | comma}}</b-col>
                            <b-col>{{lm.lm_ea | comma}}</b-col>
                            <b-col>{{lm.lm_ea_price | comma}}</b-col>
                            <b-col>{{lm.lm_surtax | comma}}</b-col>
                            <b-col>{{lm.lm_sum_price | comma}}</b-col>
                            <b-col>{{lm.lm_com_order_dt}}</b-col>
                            <b-col>{{lm.lm_buyer}}</b-col>
                            <b-col>{{lm.lm_order_mng}}</b-col>
                            <b-col>{{lm.lm_purchase_price | comma}}</b-col>
                            <b-col>{{lm.lm_shipping_dt}}</b-col>
                        </b-row>
                    </b-col>
                    <b-col>{{lg.lg_email}}</b-col>
                    <b-col>{{lg.lg_hp}}</b-col>
                    <b-col>{{lg.lg_note}}</b-col>
                </b-row>
            </transition-group>
        </perfect-scrollbar>
        <pagination :data="ledger" @pagination-change-page="index" align="center" class="mt-5"></pagination>
    </b-card>
    <transition name="fade">
        <Modal v-if="isModalViewed" @close-modal="isModalViewed = false">
            <Form v-model="compVal" />
        </Modal>
    </transition>
</div>
</template>

<script>
import ax from '@/api/http';

var init_dt = new Date();
const endDate = init_dt.format("yyyy-MM-dd");
init_dt.setMonth(0); init_dt.setDate(1);
const startDate = init_dt.format("yyyy-MM-dd");
export default {
    name: 'admLedger',
    components: {
        'Modal': () => import('@/views/_common/Modal.vue'),
        'Form': () => import('./_comp/Form.vue'),
    },
    data() {
        return {
            isModalViewed: false,
            selected: true,
            ledger: {
                data:[]
            },
            lgFrm: {
                lg_pay_type:'',

            },
            schFrm: {
                // startDate: startDate,
                // endDate: endDate,
                startDate: '',
                endDate: '',

                

                // startGmPrice:'',
                // endGmPrice:'',
                // startEaPrice:'',
                // endEaPrice:'',
                // startSurtax:'',
                // endSurtax:'',
                // startSumPrice:'',
                // endSumPrice:'',

                pay_type:'',
                mng:'',
                mode:'orderer',
                keyword:'',
                page:0
            },
            updatedd:{},
            total: {},
            mng: {},
        };
    },

    computed: {
        compVal: {
            get () {
                if (this.selected) {
                    return this.lgFrm
                } else {
                    return this.updatedd
                }
            },
            set (val) {
                if (this.selected) {
                    this.lgFrm = val
                } else {
                    this.updatedd = val
                }
            }
        }
    },

    methods: {
        async index(page=null) {
            if(page)
                this.schFrm.page = page;
            let res = await ax.get(`/api/admin/ledger`, {params: this.schFrm});
            if (res && res.status === 200) {
                this.ledger = res.data.lg;
                this.total = res.data.total;
                this.mng = res.data.mng;
            }
        },

        async store() {
            let res = await ax.post(`/api/admin/ledger/`, this.lgFrm);
            if (res && res.status === 200) {
                this.index();
            }
        },

        async update(i) {
            let frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.ledger.data[i], // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            let res = await ax.post(`/api/admin/ledger/${frm.lg_id}`, frm);
            if (res && res.status === 200) {
                Notify.toast('success', '수정 완료');
                this.ledger.data[i].edit = false;
            }
        },
        
        async destroy(i) {
            var isok = await Notify.confirm('삭제', 'danger');            
            if (isok) {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                const res = await ax.post(`/api/admin/ledger/${this.ledger.data[i].lg_id}`, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '삭제 완료');
                    this.ledger.data.splice(i, 1);
                }
            }
        },

        setDate(type) {
            var dt = new Date();
            var sdt = '', edt = dt.format("yyyy-MM-dd");
            switch (type) {
                case 'lastYear':    
                    dt.setYear(dt.getFullYear()-1); dt.setMonth(11); dt.setDate(31);
                    edt = dt.format("yyyy-MM-dd"); 
                    dt.setMonth(0); dt.setDate(1); 
                break;
                case 'thisYear':    dt.setMonth(0); dt.setDate(1); break;
                case 'thisMonth':   dt.setMonth(dt.getMonth()); dt.setDate(1);   break;
                case 'today':   ;                                 break;
                case 'week':    dt.setDate(dt.getDate() - 7);       break;
                case 'month':   dt.setMonth(dt.getMonth() - 1);   break;
                case 'all':
                default:      edt = '';   break;
            }
            if (type != 'all')
                sdt = dt.format("yyyy-MM-dd");

            this.schFrm.startDate = sdt;
            this.schFrm.endDate = edt;
            console.log(type);
        },
    },
    mounted() {
        
        this.index(); 
    },
};
</script>

<style lang="css" scoped>
#admLedger .card { margin:1rem; }
#admLedger .search .width_btn { display:flex; }
#admLedger .search .width_btn .btn { flex:1; }


#admLedger .data .row { width:3240px; align-items:center; }
#admLedger .data .row .col { padding-left:5px; padding-right:5px; }
#admLedger .data .list_top div .badge { font-size:1rem; }
#admLedger .data .head .col { font-weight:bold; font-size:.9rem; text-align:center; } 
#admLedger .data .head .col .badge { font-size:1rem; }

#admLedger .data .row .col { flex: 0 0 120px; max-width:120px; text-align:center; line-height:1.1rem; }
#admLedger .data .row .col.model { display: flex; flex-wrap: wrap; flex-basis:auto; flex-shrink:1; max-width:none; width:1680px; padding:0; }
#admLedger .data .row.body { padding:15px 0; }
#admLedger .data .row.body:not(:last-of-type) { border-bottom:2px solid #777; } 
#admLedger .data .row.body .model .row { padding:10px 0; background:#f7f7f7; margin:0; align-items:center; }
#admLedger .data .row.body .model .row:not(:last-of-type) { border-bottom:1px solid #AAA; } 



#admLedger .data .list .col:nth-child(15),
#admLedger .data .list .col:nth-child(16),
#admLedger .data .list .col:nth-child(17),
#admLedger .data .list .col:nth-child(18),
#admLedger .data .list .col:nth-child(19),
#admLedger .data .list .col:nth-child(23),
#admLedger .data .create .col:nth-child(15) input,
#admLedger .data .create .col:nth-child(16) input,
#admLedger .data .create .col:nth-child(17) input,
#admLedger .data .create .col:nth-child(18) input,
#admLedger .data .create .col:nth-child(19) input,
#admLedger .data .create .col:nth-child(23) input { text-align:right; }

#admLedger .data .list .row .col .ctrl { position:absolute; left:-76px; width:90px; text-align:right; border-right:2px solid #55aebf; border-radius:0 5px 5px 0; color:#126b7c; transition:all .4s;}
#admLedger .data .list .row .col .ctrl:hover { left:0; }

#admLedger .data >>> .ps { padding-top:2rem; }
/*#admLedger .data >>> .ps .ps__rail-x { top:0; bottom:auto; height:25px; }*/
#admLedger .data >>> .ps .ps__rail-x { height:25px; position:fixed; z-index: 1; width: 1920px !important; left: 0 !important; }
#admLedger .data >>> .ps .ps__rail-x:hover { background-color:#eee; opacity:.9; }
#admLedger .data >>> .ps .ps__rail-x .ps__thumb-x { height:18px; background-color:pink; position:fixed; width:1189px !important; }
#admLedger .data >>> .ps .ps__rail-x:hover > .ps__thumb-x, 
#admLedger .data >>> .ps .ps__rail-x:focus > .ps__thumb-x, 
#admLedger .data >>> .ps .ps__rail-x.ps--clicking .ps__thumb-x { background-color:hotpink; height:22px; }

#admLedger .data .translate-fade-enter-active, 
#admLedger .data .translate-fade-leave-active { transition:all .8s; }
#admLedger .data .translate-fade-enter, 
#admLedger .data .translate-fade-leave-active { opacity:0; position:absolute; }
#admLedger .data .translate-fade-enter { transform:translateX(1000px); }
#admLedger .data .translate-fade-leave-active { transform:translateX(-1000px); }



#admLedger .fade-enter-active,
#admLedger .fade-leave-active { transition: opacity .001s; }
#admLedger .fade-enter,
#admLedger .fade-leave-to { opacity: 0; }
#admLedger .rs_modal-card { max-width:800px; text-align:center; overflow-y:scroll; }
</style>

#admLedger .data .row .col { flex: 0 0 120px; max-width:120px; text-align:center; line-height:1.1rem; }
#admLedger .data .row .col:nth-child(1),
#admLedger .data .row .col:nth-child(3),
#admLedger .data .row .col:nth-child(5),
#admLedger .data .row .col:nth-child(10),   /* 고객명 */
#admLedger .data .row .col:nth-child(18),
#admLedger .data .row .col:nth-child(22) { flex: 0 0 90px; max-width:90px; }
#admLedger .data .row .col:nth-child(4) { flex: 0 0 75px; max-width:75px; }
#admLedger .data .row .col:nth-child(7) { flex: 0 0 210px; max-width:210px; }
#admLedger .data .row .col:nth-child(8) { flex: 0 0 150px; max-width:150px; }
#admLedger .data .row .col:nth-child(13) { flex: 0 0 150px; max-width:150px; }   /* CAT.No */
#admLedger .data .row .col:nth-child(16) { flex: 0 0 45px; max-width:45px; }   /* 수량 */
#admLedger .data .row .col:nth-child(25) { flex: 0 0 75px; max-width:75px; }
#admLedger .data .row .col:nth-child(26) { flex: 0 0 75px; max-width:75px; }