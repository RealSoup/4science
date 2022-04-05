<template>
<div id="admLedger">
    <b-card class="shadow search">
        <b-container fluid>
            <b-row class="mb-3 sch_date">
                <b-col >주문일</b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="frm.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="frm.startDate" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="frm.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="frm.endDate" button-only right></b-form-datepicker>
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
                        <b-form-input v-model="frm.startGmPrice" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="frm.endGmPrice" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="공급가액">
                        <b-form-input v-model="frm.startEaPrice" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="frm.endEaPrice" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="세액">
                        <b-form-input v-model="frm.startSurtax" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="frm.endSurtax" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col lg="3" sm="6">
                    <b-input-group prepend="합계">
                        <b-form-input v-model="frm.startSumPrice" :formatter="priceComma"></b-form-input>
                        <b-form-input v-model="frm.endSumPrice" :formatter="priceComma"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-row class="justify-content-end mt-3">
                <b-col lg="3" md="4" sm="6">
                    <b-form-select v-model="frm.mng">
                        <b-form-select-option value="">◄ 담당자 ►</b-form-select-option>
                        <b-form-select-option v-for="v in mng" :key="v.id" :value="v.name">{{ v.name }}</b-form-select-option>
                    </b-form-select>
                </b-col>
                <b-col lg="3" md="4" sm="6">
                    <b-form-select v-model="frm.pay_type">
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
                            <select class="custom-select" v-model="frm.mode">
                                <option value="orderer">고객명</option>
                                <option value="source_no">번호</option>
                                <option value="distributor">매출처</option>
                                <option value="gm_name">품목명</option>
                                <option value="catno">CAT.No</option>
                                <option value="gm_code">모델명</option>
                            </select>
                        </b-input-group-prepend>

                        <b-form-input v-model="frm.keyword" @keyup.enter="index" placeholder="Please enter a keyword"></b-form-input>

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
                <b-col cols="12">Total : <b-badge variant="info">{{ledger.total}}</b-badge></b-col>
            </b-row>
            <b-row class="head">
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
                <b-col>메일</b-col>
                <b-col>HP</b-col> 
                <b-col>비고</b-col>
            </b-row>
            <b-row class="create">
                <b-col class="ctrl">
                    <b-button variant="primary" @click="store">등록 <font-awesome-icon icon="save" /></b-button>
                </b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="frm.lg_order_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="frm.lg_order_dt" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col>
                    <b-form-select v-model="frm.lg_pay_type">
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
                <b-col> <b-form-input v-model="frm.lg_mng" /> </b-col>
                <b-col> <b-form-input v-model="frm.lg_source_no" /> </b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="frm.lg_sale_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="frm.lg_sale_dt" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col>
                    <b-form-input v-model="frm.lg_distributor" />
                </b-col>                
                <b-col><b-form-input v-model="frm.lg_depart" /></b-col>
                <b-col><b-form-input v-model="frm.lg_lab_prof" /></b-col>
                <b-col><b-form-input v-model="frm.lg_orderer" /></b-col>
                <b-col><b-form-input v-model="frm.lg_gm_name" /></b-col>                
                <b-col><b-form-input v-model="frm.lg_gm_spec" /></b-col>
                <b-col><b-form-input v-model="frm.lg_catno" /></b-col>
                <b-col><b-form-input v-model="frm.lg_gm_code" /></b-col>
                <b-col><b-form-input v-model="frm.lg_gm_price" :formatter="priceComma" /></b-col>
                <b-col><b-form-input v-model="frm.lg_ea" :formatter="priceComma" /></b-col>
                <b-col><b-form-input v-model="frm.lg_ea_price" :formatter="priceComma" /></b-col>
                <b-col><b-form-input v-model="frm.lg_surtax" :formatter="priceComma" /></b-col>
                <b-col><b-form-input v-model="frm.lg_sum_price" :formatter="priceComma" /></b-col>
                <b-col>
                    <b-input-group>
                        <b-form-input v-model="frm.lg_com_order_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="frm.lg_com_order_dt" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col><b-form-input v-model="frm.lg_buyer" /></b-col>
                <b-col><b-form-input v-model="frm.lg_order_mng" /></b-col>
                <b-col><b-form-input v-model="frm.lg_purchase_price" :formatter="priceComma" /></b-col>
                <b-col>                    
                    <b-input-group>
                        <b-form-input v-model="frm.lg_shipping_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                        <b-input-group-append>
                            <b-form-datepicker v-model="frm.lg_shipping_dt" button-only right></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col><b-form-input v-model="frm.lg_email" /></b-col>
                <b-col><b-form-input v-model="frm.lg_hp" :formatter="formatHp" /></b-col>
                <b-col><b-form-input v-model="frm.lg_note" /></b-col>
            </b-row>

            <b-row v-for="(lg, i) in ledger.data" :key="lg.lg_id" class="list">
                <transition name="translate-fade">
                    <b-row v-if="!lg.edit" :key="lg.lg_id+'1'">
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
                            <b-button v-else-if="lg.lg_source_type == 'EST'" :to="{name: 'adm_estimate_show_req', params: { eq_id:lg.lg_source_no }}" variant="outline-danger" block>
                                {{lg.lg_source_no}}
                            </b-button>
                        </b-col>
                        <b-col>{{lg.lg_sale_dt}}</b-col>
                        <b-col>{{lg.lg_distributor}}</b-col>
                        <b-col>{{lg.lg_depart}}</b-col>
                        <b-col>{{lg.lg_lab_prof}}</b-col>
                        <b-col>{{lg.lg_orderer}}</b-col>
                        <b-col>{{lg.lg_gm_name}}</b-col>
                        <b-col>{{lg.lg_gm_spec}}</b-col>
                        <b-col>{{lg.lg_catno}}</b-col>
                        <b-col>{{lg.lg_gm_code}}</b-col>
                        <b-col>{{lg.lg_gm_price | comma}}</b-col>
                        <b-col>{{lg.lg_ea | comma}}</b-col>
                        <b-col>{{lg.lg_ea_price | comma}}</b-col>
                        <b-col>{{lg.lg_surtax | comma}}</b-col>
                        <b-col>{{lg.lg_sum_price | comma}}</b-col>
                        <b-col>{{lg.lg_com_order_dt}}</b-col>
                        <b-col>{{lg.lg_buyer}}</b-col>
                        <b-col>{{lg.lg_order_mng}}</b-col>
                        <b-col>{{lg.lg_purchase_price | comma}}</b-col>
                        <b-col>{{lg.lg_shipping_dt}}</b-col>
                        <b-col>{{lg.lg_email}}</b-col>
                        <b-col>{{lg.lg_hp}}</b-col>
                        <b-col>{{lg.lg_note}}</b-col>
                    </b-row>

                    <b-row v-else :key="lg.lg_id+'2'">
                        <b-col>
                            <b-button size="sm" variant="primary" @click="update(i)"><font-awesome-icon icon="save" /></b-button>
                            <b-button size="sm" variant="warning" @click="lg.edit=!lg.edit"><b-icon-box-arrow-left /></b-button>
                        </b-col>
                        <b-col>
                            <b-input-group>
                                <b-form-input v-model="lg.lg_order_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker v-model="lg.lg_order_dt" button-only right></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group>
                                <b-form-select v-model="lg.lg_pay_type">
                                    <b-form-select-option value="CARD">온라인 카드</b-form-select-option>
                                    <b-form-select-option value="PSYS">PSYS</b-form-select-option>
                                    <b-form-select-option value="BILL">계산서</b-form-select-option>
                                    <b-form-select-option value="STAT">전표</b-form-select-option>
                                    <b-form-select-option value="CASH">현금영수증</b-form-select-option>
                                    <b-form-select-option value="MEMB">회원</b-form-select-option>
                                    <b-form-select-option value="REV">역발행</b-form-select-option>
                                    <b-form-select-option value="NOT">미발급</b-form-select-option>
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col><b-form-input v-model="lg.lg_mng" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_source_no" /></b-col>
                        <b-col>
                            <b-input-group>
                                <b-form-input v-model="lg.lg_sale_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker v-model="lg.lg_sale_dt" button-only right></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col><b-form-input v-model="lg.lg_distributor" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_depart" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_lab_prof" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_orderer" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_gm_name" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_gm_spec" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_catno" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_gm_code" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_gm_price" :formatter="priceComma" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_ea" :formatter="priceComma" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_ea_price" :formatter="priceComma" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_surtax" :formatter="priceComma" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_sum_price" :formatter="priceComma" /></b-col>
                        <b-col>
                            <b-input-group>
                                <b-form-input v-model="lg.lg_com_order_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker v-model="lg.lg_com_order_dt" button-only right></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col><b-form-input v-model="lg.lg_buyer" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_order_mng" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_purchase_price" :formatter="priceComma" /></b-col>
                        <b-col>
                            <b-input-group>
                                <b-form-input v-model="lg.lg_shipping_dt" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker v-model="lg.lg_shipping_dt" button-only right></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col><b-form-input v-model="lg.lg_email" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_hp" :formatter="formatHp" /></b-col>
                        <b-col><b-form-input v-model="lg.lg_note" /></b-col>
                    </b-row>
                </transition>
            </b-row>


            <b-row>
                <b-col cols="12">
                    <b-alert show variant="info">
                        <b>스크롤은 상단에 있습니다.</b>
                        <!-- <b-button variant="info" class="ml-5"> 위로가기 <b-icon-arrow-up-square-fill /></b-button> -->
                    </b-alert> 
                </b-col>
            </b-row>
        </perfect-scrollbar>
        <pagination :data="ledger" @pagination-change-page="index" align="center" class="mt-5"></pagination>
    </b-card>
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
    },
    data() {
        return {
            ledger: {
                data:[]
            },
            frm: {
                startDate: startDate,
                endDate: endDate,

                startGmPrice:'',
                endGmPrice:'',
                startEaPrice:'',
                endEaPrice:'',
                startSurtax:'',
                endSurtax:'',
                startSumPrice:'',
                endSumPrice:'',

                pay_type:'',
                mng:'',
                mode:'orderer',
                keyword:'',
                page:0
            },
            total: {},
            mng: {},
        };
    },

    methods: {
        async index(page=null) {
            if(page)
                this.frm.page = page;
            let res = await ax.get(`/api/admin/ledger`, {params: this.frm});
            if (res && res.status === 200) {
                this.ledger = res.data.lg;
                this.total = res.data.total;
                this.mng = res.data.mng;
            }
        },

        async store() {
            let res = await ax.post(`/api/admin/ledger/`, this.frm);
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
                case 'all':     edt = '';   break;
            }
            if (type != 'all')
                sdt = dt.format("yyyy-MM-dd");

            this.frm.startDate = sdt;
            this.frm.endDate = edt;
        },
    },
    mounted() {
        
        this.index(); 
    },
};
</script>

<style lang="css" scoped>
#admLedger .search { margin:1rem; }
#admLedger .width_btn { display:flex; }
#admLedger .width_btn .btn { flex:1; }

#admLedger .data { margin:1rem; }
#admLedger .data .row { width:3000px; margin:0 0 1rem; }

#admLedger .data .row .ctrl { position:sticky; left:-15px; z-index:4; }
#admLedger .data .row .ctrl .btn { font-size:.9rem; padding:.3rem .3rem; }

#admLedger .data .row .col { padding-left:5px; padding-right:5px; }
#admLedger .data .list_top div .badge { font-size:1rem; }
#admLedger .data .head .col { font-weight:bold; font-size:.9rem; text-align:center; } 
#admLedger .data .head .col .badge { font-size:1rem; }

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




#admLedger .data .create .col { padding-left:5px; padding-right:5px; }
#admLedger .data .create .col input { padding:.4rem .2rem .3rem; }
#admLedger .data .create .col input,
#admLedger .data .create .col select { text-align:center; }
#admLedger .data .create .col >>> .btn { font-size:.8rem !important; padding-left:.3rem !important; padding-right:.3rem !important; }
#admLedger .data .create .col >>> .btn { font-size:.8rem !important; padding-left:.3rem !important; padding-right:.3rem !important; }
#admLedger .data .create .col >>> select { padding-left:.2rem !important; padding-right:.2rem !important; background:none; appearance:none; }

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
#admLedger .data >>> .ps .ps__rail-x { height:25px; position:fixed;}
#admLedger .data >>> .ps .ps__rail-x:hover { background-color:#eee; opacity:.9; }
#admLedger .data >>> .ps .ps__rail-x .ps__thumb-x { height:18px; background-color:pink; }
#admLedger .data >>> .ps .ps__rail-x:hover > .ps__thumb-x, 
#admLedger .data >>> .ps .ps__rail-x:focus > .ps__thumb-x, 
#admLedger .data >>> .ps .ps__rail-x.ps--clicking .ps__thumb-x { background-color:hotpink; height:22px; }

#admLedger .data .translate-fade-enter-active, 
#admLedger .data .translate-fade-leave-active { transition:all .8s; }
#admLedger .data .translate-fade-enter, 
#admLedger .data .translate-fade-leave-active { opacity:0; position:absolute; }
#admLedger .data .translate-fade-enter { transform:translateX(1000px); }
#admLedger .data .translate-fade-leave-active { transform:translateX(-1000px); }


</style>