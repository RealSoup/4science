<template>
<div class="p_wrap">
    <b-container class="cmain">
        <b-row>
            <b-col><b-button class="sm mint" @click="show_add=!show_add">지급&차감</b-button></b-col>
            <b-col class="text-right">가용 마일리지: <b>{{enableMileage | comma}}</b></b-col>
        </b-row>
        <div class="mileage_add" v-if="show_add">
            <b-input-group size="sm">
                <b-input-group-prepend>
                    <b-form-select class="custom-select" v-model="act.type" size="sm">
                        <b-form-select-option value="plus">지급</b-form-select-option>
                        <b-form-select-option value="minus">차감</b-form-select-option>
                    </b-form-select>
                </b-input-group-prepend>
                <b-form-input v-model="act.msg" ref="msg" placeholder="메시지" />
                <b-input-group-append>
                    <b-form-input v-model="act.mileage" ref="mileage" placeholder="마일리지" class="mileage" size="sm" @keyup.enter="action" :formatter="frm_priceComma" />
                    <b-button class="d_blue sm" @click="action">실행</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
        <b-row class="head list">
            <b-col>번호</b-col>
            <b-col>내용</b-col>
            <b-col>마일리지</b-col>
            <b-col>날짜</b-col>
        </b-row>
        <b-row class="body list" v-for="(ml, i) in list.data" :key="i" :class="{'bg-danger':(ml.expiration || ml.ml_type=='SP')}">
            <b-col>{{numCalc(i)}}</b-col>
            <b-col>
                <div v-if="ml.ml_tbl == 'voucher' && !isEmpty(ml.refine_content)">
                    <b-icon-gift-fill /> {{config.voucher[ml.refine_content[0]].name}} : {{ml.refine_content[1]}} 장 <br />
                    <font-awesome-icon icon="user" /> {{ml.refine_content[2]}} <br />
                    <font-awesome-icon icon="mobile-alt" /> {{ml.refine_content[3]}}
                </div>
                <div v-else>
                    {{ml.ml_content}}
                    <b-button class="white xm"
                        v-if="ml.ml_tbl == 'shop_order_model' && ml.order_model" 
                        :to="{name: 'adm_order_edit', params: { od_id:ml.order_model.odm_od_id }}"
                    >
                        글번호:{{ml.order_model.odm_od_id}}, 제품명:{{ml.order_model.odm_gm_name}}
                    </b-button>
                    
                    <b-badge v-if="ml.ml_tbl == 'admin'" class="ml-3">관리자 지급</b-badge>               
                    <b-badge v-else-if="ml.ml_type=='SP'" variant="warning" class="ml-3">상품권 구매</b-badge>
                    <b-badge v-if="ml.expiration" variant="warning" class="ml-3">만료</b-badge>
                </div>
            </b-col>
            <b-col>
                <b-form-select v-if="ml.ml_tbl == 'voucher'" v-model="ml.ml_type" @change="setVoucher($event, ml.ml_id)" >
                    <b-form-select-option v-for="(o, k) in config.v_option" :value="k" :key="k">{{o}}</b-form-select-option>
                </b-form-select>
                <template v-else>{{ml.ml_enable_m | comma}}</template>
            </b-col>
            <b-col>{{ml.created_at | formatDate}}</b-col>
        </b-row>
        <pagination :data="list" @pagination-change-page="setPage" :limit="5" :showDisabled="true" align="center" class="mt-5">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
            <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmUserEditMileage',
    components: { },

    data() {
        return {
            show_add:false,
            frm:{
                page:0,
            },
            list: {},
            enableMileage: 0,
            config: null,
            act:{
                type:'plus',
                mileage:'',
                msg:'',
            },
        };
    },
    computed: {
        showAlert() {
            return this.selection !== this.previousSelection;
        }
    },

    methods: {
        async index() {
            const res = await ax.get(`api/admin/mileage/${this.$route.params.id}`, { params: this.frm});
            if (res && res.status === 200) {
                this.list = res.data.list;
                this.config = res.data.config;
            }
        },
        setPage(page) {
            this.frm.page = page;
            this.index();
        },
        
        async setVoucher(v, id) {
            var rst = await Notify.confirm('변경', 'warning');
            if (rst) {
                const res = await ax.post(`/api/admin/mileage/${id}`, {_method : 'PATCH', ml_type: v});
                if (res && res.status === 200)
                    Notify.toast('success', '변경 완료')
            }
        },

        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },

        async action () {
            if (isEmpty(this.act.mileage)) { Notify.toast('danger', "마일리지를 입력하세요"); this.$refs.mileage.focus(); return false; }
            if (isEmpty(this.act.msg)) { Notify.toast('danger', "메시지를 입력하세요"); this.$refs.msg.focus(); return false; }
            var rst = await Notify.confirm('지급&차감', 'warning');
            if (rst) {
                const res = await ax.post(`/api/admin/mileage/${this.$route.params.id}`, this.act);
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.enableMileage = res.data.mileage;
                    this.act.type = 'plus';
                    this.act.mileage = '';
                    this.act.msg = '';
                    Notify.toast('success', '변경 완료')
                }
            }
        },
        frm_priceComma(v)   { return this.priceComma(v); },
    },
    
    async mounted() {
        this.index();
        const ml = await ax.get(`/api/admin/mileage/enable/${this.$route.params.id}`);
        this.enableMileage = ml.data;
    },
}
</script>
<style lang="css" scoped>
.col { padding:10px 5px; }
.mileage_add .mileage { max-width:95px; text-align:right; }
.list .col:nth-of-type(1) { flex:0 0 12%; max-width:12%; }
.list .col:nth-of-type(2) { text-align:left; }
.list .col:nth-of-type(3) { flex:0 0 13%; max-width:13%; text-align:right; }
.list .col:nth-of-type(4) { flex:0 0 16%; max-width:16%; }
.list .col svg { margin-right:0.5rem; }
</style>