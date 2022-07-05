<template>
<b-container class="bo_index">
    <b-row>
        <b-col><h4>{{config.name}}</h4></b-col>
    </b-row>
    <b-row>
        <b-col>
            <table class="table table-striped table-hover">
                <colgroup>
                    <col width="15%" />
                    <col width="" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">만족도</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bo in list.data" :key="bo.bo_id">
                        <td class="satisfaction">
                            <template v-if="bo.bo_good == 100"><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /></template>
                            <template v-else-if="bo.bo_good == 50"><b-icon-star-fill /><b-icon-star-fill /><b-icon-star /></template>
                            <template v-else><b-icon-star-fill /><b-icon-star /><b-icon-star /></template>
                        </td>
                        
                        <td>{{bo.bo_content}}</td>
                        <td>{{bo.bo_writer}}</td>
                        <td>{{bo.created_at | formatDate}}</td>
                    </tr>
                </tbody>
            </table>
        </b-col>
    </b-row>    
    <pagination :data="list" align="center" @pagination-change-page="index"></pagination>
</b-container>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'ShopGoodsReview',
    props:['bo_cd'],
    data() {
        return {
            frm:{
                page:0,
                limit:5,
                bo_gd_id:this.$route.params.gd_id,
            },
            list: {},
            config: {},
        };
    },

    methods: {
        async index(page=1){
            this.frm.page = page;
            const res = await ax.get(`/api/board/${this.bo_cd}`, { params: this.frm});
            if (res && res.status === 200) {
                this.list = res.data.list;
                this.config = res.data.config;
            }
        },
    },

    mounted() {
        this.index();
    },
};
</script>

<style lang="css" scoped>
.bo_index { max-width:1000px; }
.bo_index table tr td.satisfaction { color:gold; }
.bo_index table tr th:nth-child(1),
.bo_index table tr td:nth-child(1),
.bo_index table tr th:nth-child(2),
.bo_index table tr th:nth-child(3),
.bo_index table tr td:nth-child(3),
.bo_index table tr th:nth-child(4),
.bo_index table tr td:nth-child(4) { text-align:center; }
</style>