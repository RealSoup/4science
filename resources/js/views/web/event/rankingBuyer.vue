<template>
<div>

<h3>구매자 랭킹 탑 20위 (5월)</h3>

<table>
    <tr><th>순위</th><th>이름</th><th>금액</th></tr>
    <tr v-for="(row, i) in tableData" :key="i">                
        <td>{{i+1}}</td>
        <b-link v-if="row.id && $store.state.auth.user && $store.state.auth.user.is_admin" class="has_link" :router-tag="'td'" :to="{name: 'adm_user_edit', params: { id:row.id }}">{{row.name}}</b-link>
        <td v-else class="no_link">{{row.name}}</td>
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
    async mounted() {
         
        let res = await ax.get(`/api/event/rankingBuyer`);
        if (res && res.status === 200) {
            this.tableData = res.data;
        }
        
    },
};
</script>

<style lang="css" scoped>
table { width:100%; max-width:700px; margin:1% auto 0 auto; }
table tr th { background-color:#333; color:#fff; font-weight:bold; }
table tr th,
table tr td { text-align:center; border:1px solid #DDD; padding:.2% 0; }
table tr td { padding:.2% 1.5%; }
table tr td.has_link { cursor:pointer; }
table tr td.no_link { cursor:not-allowed; }
table tr td:nth-of-type(1) { min-width:30px; padding:.2% 0; }
table tr td:nth-of-type(2) { text-align:left; }
table tr td:nth-of-type(3) { text-align:right; }
</style>