<template>
    <b-container class="p_wrap">
        <b-row>
            <b-col>
                <h3>가용 마일리지: <b>{{enableMileage | comma}}</b></h3>
            </b-col> 
        </b-row>
        <b-row v-for="(ml, i) in list.data" :key="i" :class="{'bg-danger':(ml.expiration || ml.ml_type=='SP')}">
            <b-col col sm="12" md="6" lg="1">{{ml.ml_id}}</b-col>
            <b-col col sm="12" md="6" lg="7">
                <div v-if="ml.ml_tbl == 'voucher'">
                    <b-icon-gift-fill /> {{config.voucher[ml.refine_content[0]].name}} : {{ml.refine_content[1]}} 장 <br />
                    <font-awesome-icon icon="user" /> {{ml.refine_content[2]}} <br />
                    <font-awesome-icon icon="mobile-alt" /> {{ml.refine_content[3]}}
                </div>
                <div v-else>
                    {{ml.ml_content}}
                    <b-badge v-if="ml.ml_type=='SP'" variant="warning" class="ml-3">상품권 구매</b-badge>
                    <b-badge v-if="ml.expiration" variant="warning" class="ml-3">만료</b-badge>
                </div>
            </b-col>
            <b-col col sm="12" md="6" lg="2">
                <b-form-select v-if="ml.ml_tbl == 'voucher'" v-model="ml.ml_type" @change="setVoucher($event, ml.ml_id)" >
                    <b-form-select-option v-for="(o, k) in config.v_option" :value="k" :key="k">{{o}}</b-form-select-option>
                </b-form-select>
                <template v-else>{{ml.ml_enable_m | comma}}</template>
            </b-col>
            <b-col col sm="12" md="6" lg="2">{{ml.created_at | formatDate}}</b-col>
        </b-row>
        <pagination :data="list" @pagination-change-page="setPage" align="center" class="mt-5"></pagination>
    </b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'AdmUserEditMileage',
    components: { },

    data() {
        return {
            frm:{
                page:0,
            },
            list: {},
            enableMileage: 0,
            config: null,
            
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
        }
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
.col:nth-of-type(2) { text-align:left; }
.col:nth-of-type(3) { text-align:right; }
.col svg { margin-right:0.5rem; }
</style>