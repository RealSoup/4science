<template>
    <div class="ledger_search"
        @mouseenter="mouseHover = true"
        @mouseleave="mouseHover = false"
        :class="[{active:mouseHover}]"
    >
        <b-card>
            <div class="tit">
                검색 옵션 
                <b-button size="sm" @click="editSearch" class="ml-4" v-b-tooltip.hover="'검색 항목 나열 순서'">
                    <b-icon-gear />
                </b-button>
            </div>
            <b-row class="mb-3">
                <template v-for="(sch, i) in search">
                    <template v-for="(cl, k) in sch_item_list">
                        <template v-if="k == sch.umc_val && k == 'created_at'">
                            <b-col cols="9" :key="`${i}${k}`">
                                <div class="label">{{cl.name}}</div>
                                <div>
                                    <b-input-group size="sm" class="term_sub">
                                        <b-form-input v-model="value.startDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker size="sm" v-model="value.startDate" button-only right></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <b>~</b>
                                    <b-input-group size="sm" class="term_sub">
                                        <b-form-input v-model="value.endDate" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker size="sm" v-model="value.endDate" button-only right></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                </div>
                                <div>
                                    <b-button-group class="width_btn" size="sm">
                                        <b-button variant="light" @click="setDate('lastYear')">작년</b-button>
                                        <b-button variant="light" @click="setDate('thisYear')">올해</b-button>
                                        <b-button variant="light" @click="setDate('thisMonth')">이달</b-button>
                                        <b-button variant="light" @click="setDate('today')">오늘</b-button>
                                        <b-button variant="light" @click="setDate('week')">1주</b-button>
                                        <b-button variant="light" @click="setDate('month')">1달</b-button>
                                        <b-button @click="setDate('all')">전체</b-button>
                                    </b-button-group>
                                </div>
                            </b-col>
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'gm_code'">
                            <InputText :key="`${i}${k}`" v-model="value.gm_code" @index="index" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'gm_name'">
                            <InputText :key="`${i}${k}`" v-model="value.gm_name" @index="index" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'orderer'">
                            <InputText :key="`${i}${k}`" v-model="value.orderer" @index="index" :label="cl.name" />
                        </template>                        
                        <template v-else-if="k == sch.umc_val && k == 'distributor'">
                            <InputText :key="`${i}${k}`" v-model="value.distributor" @index="index" :label="cl.name" />
                        </template>                        
                        <template v-else-if="k == sch.umc_val && k == 'catno'">
                            <InputText :key="`${i}${k}`" v-model="value.catno" @index="index" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'od_id'">
                            <InputText :key="`${i}${k}`" v-model="value.od_id" @index="index" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'gm_price'">
                            <InputTextRange v-if="value" :key="`${i}${k}`" v-model="value" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'ea_price'">
                            <InputTextRange v-if="value" :key="`${i}${k}`" v-model="value" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'surtax'">
                            <InputTextRange v-if="value" :key="`${i}${k}`" v-model="value" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'sum_price'">
                            <InputTextRange v-if="value" :key="`${i}${k}`" v-model="value" :label="cl.name" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'mng'">
                            <InputSelect v-if="value" :key="`${i}${k}`" v-model="value.mng" :label="cl.name" :option="mng_option" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'pay_type'">
                            <InputSelect v-if="value" :key="`${i}${k}`" v-model="value.pay_type" :label="cl.name" :option="pay_type_option" />
                        </template>
                        <template v-else-if="k == sch.umc_val && k == 'writer' && writer.length">
                            <InputSelect v-if="value" :key="`${i}${k}`" v-model="value.writer" :label="cl.name" :option="writer_option" />
                        </template>
                    </template>
                </template>
            </b-row>
            <div class="footer">
                <b-button variant="primary" @click="index" size="sm"><b-icon-search /> 검색</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AdmLedgerSearch',
    props: ['value', 'search', 'mng_list', 'writer', 'sch_item_list', 'config'],

    components: {   'InputText'       : () => import('./search/InputText.vue'),
                    'InputTextRange'  : () => import('./search/InputTextRange.vue'),
                    'InputSelect'     : () => import('./search/InputSelect.vue'), },

    data() {
        return {
            mouseHover: false,
        };
    },

    computed: {
        pay_type_option: function () {
            const tmp = []; // need to convert it before using not with XMLHttpRequest
            for (let [k, v] of Object.entries(this.config.pay_type))
                tmp.push({ val: k, name: v });
            return tmp;
        },
        mng_option: function () {
            return this.mng_list.map(mng => {
                return {    val:mng.name,
                            name:mng.name, }
            });
        },
        writer_option: function () {
            return this.writer.map(mng => {
                return {    val:mng.id,
                            name:mng.name, } || [];
            });
        },
        ...mapGetters({
            user: 'auth/user',
        }),
    },

    methods: {
        index() {
            this.$emit('index');
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

            this.value.startDate = sdt;
            this.value.endDate = edt;
        },

        editSearch () { this.$emit('editSearch'); },
    },
};
</script>

<style lang="css">
.ledger_search { max-width:1600px; width:100%; padding-right:15px; padding-left:15px; margin-right: auto; margin-left: auto; height:74px; z-index:3; position:relative; margin-bottom:1rem; }
.ledger_search .card { position:relative; overflow:hidden; max-height:68px; transition:all .4s; }
.ledger_search .card .row { opacity:0; transition:all .4s; }
.ledger_search.active .card { overflow:visible; max-height:400px; }
.ledger_search.active .card .row { opacity:1; }

.ledger_search .card .row .col { padding:8px 5px; }
.ledger_search .card .row .col-1 { flex:0 0 6%; max-width:6%; text-align:right; }
.ledger_search .card .row .col-1 + .col-2 { flex:0 0 19%; max-width:19%; }
.ledger_search .card .row .label { display:flex; align-items:center; justify-content:flex-end; font-weight:bold; padding-right:15px !important; }

.ledger_search .card .row .col-9 { display:flex; flex-wrap:wrap; padding:0; }
.ledger_search .card .row .col-9 > div { flex-basis:0; flex-grow:1; max-width:100%; padding:8px 5px; }
.ledger_search .card .row .col-9 > div:nth-child(1) { flex:0 0 8%; max-width:8%; text-align:right; }
.ledger_search .card .row .col-9 > div:nth-child(2) { flex:0 0 25.333333%; max-width:25.333333%; display:flex; align-items:center; justify-content:space-between; }
.ledger_search .card .row .col-9 > div:nth-child(2) > b { font-size:20px; }
.ledger_search .card .row .col-9 > div:nth-child(2) > div { width: calc(50% - 10px); }
.ledger_search .card .row .col-9 > div:nth-child(3) .width_btn { display:flex; }
.ledger_search .card .row .col-9 > div:nth-child(3) .width_btn .btn { flex:1; }
.ledger_search .card .footer { text-align:right; }
</style>