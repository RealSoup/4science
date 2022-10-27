<template>
<div class="p_warp">
    <h3>매출장</h3>
    <perfect-scrollbar suppressScrollX="true">
        <AcctList v-model="lga"
            @index="index"
            :mode="'pay_tx'" 
            :config="config" 
            :lga_step="'PTx'"
            :sch="frm"
            :mng="mng" 
        />
    </perfect-scrollbar>
</div>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'admLedgerPayTx',
    components: {
        'AcctList' : () => import('./_comp/acct/AcctList'),
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

.ps>>>.container-fluid>.row,
.ps>>>.container-fluid .draggable>.row { width:2750px; }
.ps>>>.container-fluid .draggable { min-height: 24rem; }
.ps>>>.ps__rail-x { height:25px; position:fixed; z-index:1; opacity:.65; }
.ps>>>.ps__rail-x:hover { background-color:#eee; opacity:.9; }
.ps>>>.ps__rail-x .ps__thumb-x { height:18px; background-color:pink; position:fixed;  }
.ps>>>.ps__rail-x:hover > .ps__thumb-x, 
.ps>>>.ps__rail-x:focus > .ps__thumb-x, 
.ps>>>.ps__rail-x.ps--clicking .ps__thumb-x { background-color:hotpink; height:22px; }
</style>