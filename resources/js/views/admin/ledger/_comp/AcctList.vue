<template>

<b-container fluid>
    <b-row class="top_info" :style="{ top: topInfoTop+'px' }">
        <b-col class="seq"></b-col>
        <b-col v-if="mode!=='pay_tx'" class="ctrl"></b-col>
        <b-col v-if="mode!=='pay_od'" class="pay_t"></b-col>
        <b-col class="mng"></b-col>
        <b-col class="odno"></b-col>
        <b-col class="pdt"></b-col>
        <b-col class="dist"></b-col>
        <b-col class="depart"></b-col>
        <b-col class="oder"></b-col>
        <b-col class="odnm"></b-col>
        <b-col class="eap price"><b-badge variant="info">{{total_ea_p | comma}}</b-badge></b-col>
        <b-col class="txp price"><b-badge variant="info">{{total_surtax | comma}}</b-badge></b-col>
        <b-col class="sump price"><b-badge variant="info">{{total_sum_p | comma}}</b-badge></b-col>
        <b-col></b-col>
    </b-row>
    <b-row class="search">
        <b-col class="seq"></b-col>
        <b-col v-if="mode!=='pay_tx'" class="ctrl"></b-col>
        <b-col v-if="mode!=='pay_od'" class="pay_t"><InputSelect v-model="sch.pay_type" :option="config.pay_type" @index="index" /></b-col>
        <b-col class="mng"><InputSelect v-model="sch.mng" :option="mng_option" @index="index" /></b-col>
        <b-col class="odno"><InputText v-model="sch.od_id" @index="index" /></b-col>
        <b-col class="pdt"><InputText v-model="sch.lga_date" @index="index" /></b-col>
        <b-col class="dist"><InputText v-model="sch.distributor" @index="index" /></b-col>
        <b-col class="depart"><InputText v-model="sch.depart" @index="index" /></b-col>
        <b-col class="oder"><InputText v-model="sch.orderer" @index="index" /></b-col>
        <b-col class="odnm"><InputText v-model="sch.od_name" @index="index" /></b-col>
        <b-col class="eap"><InputPrice v-model="sch.ea_p" @index="index" /></b-col>
        <b-col class="txp"><InputPrice v-model="sch.surtax" @index="index" /></b-col>
        <b-col class="sump"><InputPrice v-model="sch.sum_p" @index="index" /></b-col>
        <b-col v-if="mode=='soon'"><InputText v-model="sch.ref_soon" @index="index" /></b-col>
        <b-col v-if="mode=='soon'"><InputText v-model="sch.memo_soon" @index="index" /></b-col>
        <b-col v-if="mode=='pay_od'"><InputText v-model="sch.ref_pay_od" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="nopay"><InputSelect v-model="sch.no_pay" :option="config.no_pay" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="cadt"><InputText v-model="sch.card_pay_date" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="atdt"><InputText v-model="sch.after_pay_date" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="mail"><InputText v-model="sch.email" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="tel"><InputText v-model="sch.tel" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="tcom"><InputText v-model="sch.tax_com" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="tmng"><InputText v-model="sch.tax_mng" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="ccod"><InputText v-model="sch.client_code" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="kind"><InputSelect v-model="sch.kind" :option="config.kind" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="cacom"><InputSelect v-model="sch.card_com" :option="config.card_com" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="apno"><InputText v-model="sch.appd_no" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'" class="payer"><InputText v-model="sch.payer" @index="index" /></b-col>
        <b-col v-if="mode=='pay_tx'"><InputText v-model="sch.memo_pay_tx" @index="index" /></b-col>
    </b-row>
    <b-row class="head" :style="{ top: headTop+'px' }">
        <b-col class="seq">
            번호
            <b-button variant="primary" size="sm" v-b-tooltip="'추가'" @click="create"><b-icon-plus /></b-button>
        </b-col>
        <b-col v-if="mode!=='pay_tx'" class="ctrl">처리</b-col>
        <b-col v-if="mode!=='pay_od'" class="pay_t">결제방식</b-col>
        <b-col class="mng">담당자</b-col>
        <b-col class="odno">주문번호</b-col>
        <b-col class="pdt">매출일</b-col>
        <b-col class="dist">매출처</b-col>
        <b-col class="depart">소속</b-col>
        <b-col class="oder">고객명</b-col>
        <b-col class="odnm">품목명</b-col>
        <b-col class="eap">공급가액</b-col>
        <b-col class="txp">세액</b-col>
        <b-col class="sump">합계</b-col>
        <b-col v-if="mode=='soon'">참조(예정)</b-col>
        <b-col v-if="mode=='soon'">메모(예정)</b-col>
        
        <b-col v-if="mode=='pay_od'">참조(내역)</b-col>

        <b-col v-if="mode=='pay_tx'" class="nopay">미결</b-col>
        <b-col v-if="mode=='pay_tx'" class="cadt">카드결제일</b-col>
        <b-col v-if="mode=='pay_tx'" class="atdt">후불결제일</b-col>
        <b-col v-if="mode=='pay_tx'" class="mail">메일</b-col>
        <b-col v-if="mode=='pay_tx'" class="tel">연락처</b-col>
        <b-col v-if="mode=='pay_tx'" class="tcom">발행처</b-col>
        <b-col v-if="mode=='pay_tx'" class="tmng">계산서담당자</b-col>
        <b-col v-if="mode=='pay_tx'" class="ccod">거래처CODE</b-col>
        <b-col v-if="mode=='pay_tx'" class="kind">종류</b-col>
        <b-col v-if="mode=='pay_tx'" class="cacom">카드사</b-col>
        <b-col v-if="mode=='pay_tx'" class="apno">승인번호</b-col>
        <b-col v-if="mode=='pay_tx'" class="payer">결제자</b-col>
        <b-col v-if="mode=='pay_tx'">메모(장)</b-col>
    </b-row>
    <draggable :list="value.data" handle=".lga_move" @change="sortUpdate" class="draggable">
        <b-row v-for="(lga, i) in value.data" :key="i" class="body" :class="{modified:!lga.lga_id}"
            :tabindex="i"
            @mousedown.right ="lga.show_menu = true" 
            @contextmenu.prevent
            @blur="lga.show_menu = false"
        >
            <b-col class="seq">
                <transition name="slide-fade">
                    <b-button v-if="lga.is_edit" variant="warning" size="sm" v-b-tooltip="'저장'" class="hidden_menu" @click="apply(i)">
                        <b-icon-pencil-fill />
                    </b-button>
                    <div v-if="lga.show_menu" class="hidden_menu">
                        <b-button variant="light" size="sm" v-b-tooltip="'순서 변경'" class="lga_move"><b-icon-arrow-down-up /></b-button>
                        <b-button variant="info" size="sm" v-b-tooltip="'복사'" @click="copy(i)"><b-icon-union /></b-button>
                        <b-button variant="danger" size="sm" v-b-tooltip="'삭제'" @click="destroy(lga.lga_id, i)"><b-icon-eraser-fill /></b-button>
                    </div>
                </transition>
                
                <!-- rownum -->
                {{value.total-(value.per_page*(value.current_page-1))-i}}
<!-- <br/>
                {{lga.lga_id}} -->
            </b-col>
            <b-col v-if="mode!=='pay_tx'" class="ctrl">
                <b-button v-if="mode=='soon'" size="sm" v-b-tooltip="'결제가 되어 매출이 됩니다.'" @click="go_pay(lga.lga_id)">매출</b-button>
                <b-button v-else size="sm" v-b-tooltip="'매출을 예정분으로 되돌립니다.'" @click="go_soon(lga.lga_id)">
                    <b-icon-backspace />
                </b-button>
            </b-col>
            <b-col v-if="mode!=='pay_od'" class="pay_t"><InputSelect v-model="lga.lga_pay_type" :option="config.pay_type" @index="lga.is_edit=true" /></b-col>
            <b-col class="mng"><b-form-input v-model="lga.lga_mng" size="sm" @update="lga.is_edit=true" /></b-col>
            <b-col class="odno"><b-form-input v-model="lga.lga_od_id" size="sm" @update="lga.is_edit=true" /></b-col>
            <b-col class="pdt">
                <b-input-group size="sm">
                    <b-form-input v-model="lga.lga_date" @update="lga.is_edit=true" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker size="sm" v-model="lga.lga_date" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col class="dist"><b-form-input @update="lga.is_edit=true" v-model="lga.lga_distributor" size="sm" /></b-col>
            <b-col class="depart"><b-form-input @update="lga.is_edit=true" v-model="lga.lga_depart" size="sm" /></b-col>
            <b-col class="oder"><b-form-input @update="lga.is_edit=true" v-model="lga.lga_orderer" size="sm" /></b-col>
            <b-col class="odnm"><b-form-input @update="lga.is_edit=true" v-model="lga.lga_od_name" size="sm" /></b-col>
            <b-col class="eap"><InputPrice v-model="lga.lga_ea_p" @update="lga.is_edit=true" /></b-col>
            <b-col class="txp"><InputPrice v-model="lga.lga_surtax" @update="lga.is_edit=true" /></b-col>
            <b-col class="sump"><InputPrice v-model="lga.lga_sum_p" @update="lga.is_edit=true" /></b-col>
            <b-col v-if="mode=='soon'"><b-form-textarea v-model="lga.lga_ref_soon" size="sm" @update="lga.is_edit=true" /></b-col>
            <b-col v-if="mode=='soon'"><b-form-textarea v-model="lga.lga_memo_soon" size="sm" @update="lga.is_edit=true" /></b-col>
            
            <b-col v-if="mode=='pay_od'"><b-form-textarea v-model="lga.lga_ref_pay_od" size="sm" @update="lga.is_edit=true" /></b-col>

            <b-col class="nopay" v-if="mode=='pay_tx'"><InputSelect v-model="lga.lga_no_pay" :option="config.no_pay" @index="lga.is_edit=true" /></b-col>
            <b-col class="cadt" v-if="mode=='pay_tx'">
                <b-input-group size="sm">
                    <b-form-input v-model="lga.lga_card_pay_date" @update="lga.is_edit=true" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker size="sm" v-model="lga.lga_card_pay_date" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col class="atdt" v-if="mode=='pay_tx'">
                <b-input-group size="sm">
                    <b-form-input v-model="lga.lga_after_pay_date" @update="lga.is_edit=true" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate"></b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker size="sm" v-model="lga.lga_after_pay_date" button-only right></b-form-datepicker>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col v-if="mode=='pay_tx'" class="mail">  <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_email" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="tel">   <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_tel" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="tcom">  <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_tax_com" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="tmng">  <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_tax_mng" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="ccod">  <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_client_code" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="kind">  <InputSelect v-model="lga.lga_kind" :option="config.kind" @index="lga.is_edit=true" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="cacom"> <InputSelect v-model="lga.lga_card_com" :option="config.card_com" @index="lga.is_edit=true" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="apno">  <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_appd_no" /></b-col>
            <b-col v-if="mode=='pay_tx'" class="payer"> <b-form-input size="sm" @update="lga.is_edit=true" v-model="lga.lga_payer" /></b-col>
            <b-col v-if="mode=='pay_tx'"><b-form-textarea v-model="lga.lga_memo_pay_tx" size="sm" @update="lga.is_edit=true" /></b-col>
            
        </b-row>
    </draggable>
    
    <pagination :data="value" @pagination-change-page="index" align="center" class="mt-5"></pagination>
</b-container>

</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';

export default {
    name: 'admLedgerAcctList',
    components: {   
        draggable,
        'InputPrice'    : () => import('./tag/InputPrice'),
        'InputText'     : () => import('./tag/InputText'),
        'InputSelect'   : () => import('./tag/InputSelect'),
    },
    props:['value', 'mode', 'config', 'lga_step', 'sch', 'mng'],

    data() {
        return {
            isScrollPass: false,
            headTop:0,
            topInfoTop:0,
        };
    },

    computed: {
        total_ea_p: function() { return this.value.data.reduce((acc, el) => acc + el.lga_ea_p, 0); },
        total_surtax: function() { return this.value.data.reduce((acc, el) => acc + el.lga_surtax, 0); },
        total_sum_p: function() { return this.value.data.reduce((acc, el) => acc + el.lga_sum_p, 0); },
        mng_option: function () {
            let tmp = {};
            this.mng.forEach(e => { this.$set(tmp, e.name, e.name); });
            return tmp;
        },
    },

    methods: {
        index () {
            this.$emit('index');
        },
        create(){
            this.value.data.unshift({
                lga_step: this.lga_step,
                lga_ea_p: 0,
                lga_surtax: 0,
                lga_sum_p: 0,
            })
        },
        async apply(i) {
            let tmp = Object.assign( {}, this.value.data[i], {_method : 'PATCH'} );
            let res = await ax.post(`/api/admin/ledgerAcct/0`, tmp);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
        },

        copy(i) {
            let tmp = Object.assign( {}, this.value.data[i], {_method : 'PATCH'} );
            tmp['lga_id'] = null;
            tmp['lga_step'] = this.lga_step;
            tmp['is_edit'] = true;
            tmp['lga_seq'] += 1;
            this.value.data.splice(i+1, 0, tmp);
        },

        async destroy(lga_id, i){
            if (await Notify.confirm('삭제', 'danger')) {
                let frm = new FormData();
                frm.append("_method", 'DELETE');
                const res = await ax.post(`/api/admin/ledgerAcct/${lga_id}`, frm);
                if (res && res.status === 200) {
                    Notify.toast('success', '제조사 삭제')
                    this.$delete(this.value.data, i);
                }
            }
        },
        
        async sortUpdate () {
            let tmpFrm = {
                _method : 'PATCH',
                lga_ids: this.value.data.map(el => el.lga_id),
            };
            let res = await ax.post(`/api/admin/ledgerAcct/0`, tmpFrm);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
        },

        async go_pay (lga_id) {
            let tmpFrm = {
                _method : 'PATCH',
                step_one : 'P',
            };
            let res = await ax.post(`/api/admin/ledgerAcct/${lga_id}`, tmpFrm);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
        },
        async go_soon (lga_id) {
            let tmpFrm = {
                _method : 'PATCH',
                step_one : 'S',
            };
            let res = await ax.post(`/api/admin/ledgerAcct/${lga_id}`, tmpFrm);
            if (res && res.status === 200) {
                this.index();
                Notify.toast('success', '수정 완료');
            }
        },

        showHiddenMenu(ca, e) {
            this.$set(ca, 'showMenu', true);
            e.target.focus();
        },
        scrollListener: function (e) {
            const head_top=238;
            const top_info_top=110;
            this.isScrollPass = window.scrollY >= head_top;
            if (this.isScrollPass) { 
                this.headTop = window.scrollY-head_top;
                this.topInfoTop = window.scrollY-top_info_top;
            } else {                   
                this.headTop = 0;
                this.topInfoTop = 0; 
            }
        },
    },
    mounted() { window.addEventListener('scroll', this.scrollListener); },
    beforeDestroy: function () { window.removeEventListener('scroll', this.scrollListener); }
};
</script>

<style lang="css" scoped>
h3 { max-width:1500px; margin:auto; }
.container-fluid { margin-bottom:2rem; }
.container-fluid .row.top_info { position:relative; z-index:3; font-size:1.2rem; }
.container-fluid .row.head { background:#666; padding:5px 0; position:relative; z-index:3; }
.container-fluid .row.head .col { font-weight:bold; font-size:.9rem; color:#fff; text-align:center; border-left:1px solid #ccc;}

.container-fluid .row.body { border-bottom:1px solid #ccc; }

.container-fluid .body:hover { background:#00000015; }
.container-fluid .row .col { text-align:center; position:relative; padding:.2rem .3rem; }

.container-fluid .row .seq { flex-basis:90px; max-width:90px; }
.container-fluid .row .ctrl { flex-basis:70px; max-width:70px; }
.container-fluid .row .pay_t { flex-basis:90px; max-width:90px; }
.container-fluid .row .mng { flex-basis:70px; max-width:70px; }
.container-fluid .row .odno { flex-basis:80px; max-width:80px; }
.container-fluid .row .pdt { flex-basis:120px; max-width:120px; }
.container-fluid .row .dist { flex-basis:200px; max-width:200px; } /*매출처 */
.container-fluid .row .depart { flex-basis:200px; max-width:200px; }
.container-fluid .row .oder { flex-basis:80px; max-width:80px; }
.container-fluid .row .odnm { flex-basis:160px; max-width:160px; } /*품목명 */
.container-fluid .row .eap { flex-basis:120px; max-width:120px; }
.container-fluid .row .txp { flex-basis:100px; max-width:100px; }
.container-fluid .row .sump { flex-basis:120px; max-width:120px; }
.container-fluid .row.top_info .eap { text-align:right; }
.container-fluid .row.top_info .txp { text-align:right; }
.container-fluid .row.top_info .sump { text-align:right; }
.container-fluid .row.top_info .price span {  }

.container-fluid .row .nopay { flex-basis:50px; max-width:50px; }
.container-fluid .row .cadt { flex-basis:120px; max-width:120px; }
.container-fluid .row .atdt { flex-basis:120px; max-width:120px; }
.container-fluid .row .mail { flex-basis:150px; max-width:150px; }
.container-fluid .row .tel { flex-basis:120px; max-width:120px; }
.container-fluid .row .tcom { flex-basis:90px; max-width:90px; }
.container-fluid .row .tmng { flex-basis:90px; max-width:90px; }
.container-fluid .row .ccod { flex-basis:60px; max-width:60px; }
.container-fluid .row .kind { flex-basis:60px; max-width:60px; }
.container-fluid .row .cacom { flex-basis:70px; max-width:70px; }
.container-fluid .row .apno { flex-basis:70px; max-width:70px; }
.container-fluid .row .payer { flex-basis:70px; max-width:70px; }

.container-fluid .body .col,
.container-fluid .body .col >>> input,
.container-fluid .body .col select { font-size:.8rem;  }
.container-fluid .body .col select,
.container-fluid .body .col >>> input,
.container-fluid .body .col textarea { border-color:#00000010; padding:0 4px; background:none; height:1.4rem; }
.container-fluid .body .col textarea:focus { z-index:1; background:#FFF; width:20rem; height:5rem; position:absolute; top:0; right:0; }
.container-fluid .body .col select:focus,
.container-fluid .body .col input:focus { border-color:#FF4B0088; }
.container-fluid .body.modified { background:#FFC10755; }

.container-fluid .row .col >>> .btn-sm { padding: 0.1rem 0.3rem; font-size: 0.7rem; }

.container-fluid .body .col .hidden_menu { position:absolute; left:0; z-index:2; }

.slide-fade-enter-active { transition: all .2s ease; }
.slide-fade-leave-active { transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0); }
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ { transform: translateX(-20px); opacity: 0; }

</style>