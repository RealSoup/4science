<template>
<div class="p_wrap">
    <h3>결제 예정분</h3>
    <AcctList v-model="lga"
        @index="index"
        :mode="'soon'" 
        :config="config" 
        :lga_step="'S'" 
        :sch="frm"
        :mng="mng" 
    />
    <pagination :data="lga" @pagination-change-page="index" align="center" class="mt-5"></pagination>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admLedgerPayOd',
    components: {
        'AcctList' : () => import('./_comp/AcctList'),
    },
    data() {
        return {
            frm:{
                mode:['S'],
            },
            lga:{data:[]},
            config:[],
            mng:[],
        };
    },
    
    mounted() {        
        this.index(); 
    },

    methods: {
        async index(page=null) {
            if(page)
                this.frm.page = page;
            let res = await ax.get(`/api/admin/ledgerAcct`, { params: this.frm});
            if (res && res.status === 200) {
                this.lga = res.data.lga;
                this.config = res.data.config;
                this.mng = res.data.mng;
            }
        },
        
        
    },
};
</script>

<style lang="css" scoped>
h3 { max-width:1500px; margin:auto; }
</style>