<template>
<div class="fence" @click.self="go_notice">

<h3 class="m_show">구매자 랭킹 <b>Top 20</b></h3>

<table class="tbl_list">
    <tr><th>순위</th><th>이름</th><th>금액</th></tr>
    <tr v-for="(row, i) in tableData" :key="i">                
        <td>{{i+1}}</td>
        <td :class="{has_link:$store.state.auth.user && $store.state.auth.user.is_admin && row.id}" 
            @click="router_push (row.id, ($store.state.auth.user && $store.state.auth.user.is_admin && row.id))">
            {{row.name}}
        </td>
        <td>{{row.price | comma}}</td>
    </tr>
</table>

</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'eventRankingBuyer',

    data() {
        return {
            tableData :[],            
        };
    },
    methods: {
        router_push (id, is_possible) {
            if (is_possible)
                this.$router.push({ name: 'adm_user_edit', params: { id:id } });
        },
        go_notice () {
            this.$router.push({ name: 'my_bo_show', params: { bo_cd:'event', bo_id:57 } });
        },
    },
    
    async mounted() {
         
        let res = await ax.get(`/api/event/rankingBuyer`);
        if (res && res.status === 200) {
            this.tableData = res.data;
        }
        
    },
};
</script>

<style lang="css" scoped>
.fence { background:url('/storage/event/2024/0701/bg01.jpg') no-repeat center center; max-width:1200px; min-height:1200px; margin:3em auto; padding-top:288px; cursor:pointer; }
table { width:100%; max-width:700px; margin:1% auto 0 auto; cursor:default; }
table tr th { background-color:#333; color:#fff; font-weight:bold; }
table tr th,
table tr td { text-align:center; border:1px solid #DDD; padding:.2% 0; }
table tr td { padding:.2% 1.5%; }
table tr td.has_link { cursor:pointer; }
table tr td.no_link { cursor:not-allowed; }
table tr td:nth-of-type(1) { min-width:30px; padding:.2% 0; }
table tr td:nth-of-type(2) { text-align:left; }
table tr td:nth-of-type(3) { text-align:right; }

@media (max-width: 992px){
    .fence { background:none; min-height:auto; margin:auto; padding:10px 0; }
    .fence h3 { text-align:center; }
}
</style>