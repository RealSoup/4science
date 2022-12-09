<template>
<div class="p_wrap">
    <h3>매출장</h3>
    <AcctList v-model="lga" :style="{ width:'2750px', paddingRight:'2rem' }"
        @index="index"
        :mode="'pay_tx'" 
        :config="config" 
        :lga_step="'PTx'"
        :sch="frm"
        :mng="mng" 
    />
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admLedgerPayTx',
    components: {
        'AcctList' : () => import('./_comp/AcctList'),
    },
    data() {
        return {
            frm:{
                mode:['P', 'PTx'],
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

.p_wrap>>>.container-fluid>.row,
.p_wrap>>>.container-fluid .draggable>.row {  }
.p_wrap>>>.container-fluid .draggable { min-height: 24rem; }
</style>