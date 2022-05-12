<template lang="html">
    <b-container>
        <b-row v-for="(ml, i) in list.data" :key="i">
            <b-col col sm="12" md="6" lg="1">{{ml.ml_id}}</b-col>
            <b-col col sm="12" md="6" lg="7">
                
                <div v-if="ml.ml_type == 'voucher'">
                    <b-icon-gift-fill /> {{ml.refine_content[0]}} : {{ml.refine_content[1]}} 장 <br />
                    <font-awesome-icon icon="user" /> {{ml.refine_content[2]}} <br />
                    <font-awesome-icon icon="mobile-alt" /> {{ml.refine_content[3]}}
                </div>
                <div v-else>{{ml.ml_content}}</div>
                

            </b-col>
            <b-col col sm="12" md="6" lg="2">
                <b-form-select v-if="ml.ml_type == 'voucher'" v-model="ml.ml_key" @change="setVoucher($event, ml.ml_id)" >
                    <b-form-select-option value="0">요청</b-form-select-option>
                    <b-form-select-option value="1">승인</b-form-select-option>
                    <b-form-select-option value="2">반려</b-form-select-option>
                </b-form-select>
                <template v-else>{{ml.ml_mileage | comma}}</template>
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
                id:this.$route.params.id,
                page:0,
            },
            list: {},
            
        };
    },
    computed: {
        showAlert() {
            return this.selection !== this.previousSelection;
        }
    },

    methods: {
        async index() {
            const res = await ax.get(`api/mileage`, { params: this.frm});
            if (res && res.status === 200) {
                this.list = res.data;
            }
        },
        setPage(page) {
            this.frm.page = page;
            this.index();
        },
        
        async setVoucher(v, id) {
            var rst = await Notify.confirm('변경', 'warning');
            if (rst) {
                const res = await ax.post(`/api/mileage/${id}`, {_method : 'PATCH', ml_key: v});
                if (res && res.status === 200)
                    Notify.toast('success', '변경 완료')
            }
        }
    },
    
    mounted() {
        this.index();
    },
}
</script>
<style lang="css" scoped>
.col { padding:10px 5px; }
.col:nth-of-type(2) { text-align:left; }
.col:nth-of-type(3) { text-align:right; }
.col svg { margin-right:0.5rem; }
</style>