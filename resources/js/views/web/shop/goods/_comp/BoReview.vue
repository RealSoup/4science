<template>
<div class="bo_index">
    <table class="table">
        <colgroup>
            <col width="10%" class="m_hide" />
            <col width="15%" />
            <col width="" />
            <col width="15%" />
            <col width="10%" class="m_hide" />
        </colgroup>
        <tbody>
            <tr v-for="(bo, i) in list.data" :key="i">
                <td class="m_hide">{{list.total-(list.per_page*(list.current_page-1))-i}}</td>
                <td class="satisfaction">
                    <template v-if="bo.bo_good == 100"><b-icon-star-fill /><b-icon-star-fill /><b-icon-star-fill /></template>
                    <template v-else-if="bo.bo_good == 50"><b-icon-star-fill /><b-icon-star-fill /><b-icon-star /></template>
                    <template v-else><b-icon-star-fill /><b-icon-star /><b-icon-star /></template>
                </td>
                
                <td>{{bo.bo_content}}</td>
                <td>{{bo.bo_writer}}</td>
                <td class="m_hide">{{bo.created_at | formatDate}}</td>
            </tr>
        </tbody>
    </table>   
    <pagination :data="list" @pagination-change-page="index" :limit="5" :showDisabled="true" align="center" class="mt-5">
        <span slot="prev-nav"><b-icon-chevron-left /></span>
        <span slot="next-nav"><b-icon-chevron-right /></span>
    </pagination>
</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'ShopGoodsReview',
    props:['bo_cd', 'bo_cnt'],
    data() {
        return {
            frm:{
                page:0,
                limit:5,
                bo_gd_id:this.$route.params.gd_id,
            },
            list: {},
        };
    },

    methods: {
        async index(page=1){
            this.frm.page = page;
            const res = await ax.get(`/api/board/${this.bo_cd}`, { params: this.frm});
            if (res && res.status === 200) {
                this.list = res.data.list;
                this.bo_cnt.review = res.data.list.total;
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
.bo_index table tr td { padding:.7rem 0; text-align:center; border-top-width:0; border-bottom:1px solid #959595; }
.bo_index table tr td.satisfaction { color:red; }
.bo_index table tr td:nth-child(3) { text-align:left; }
@media (max-width: 992px){
    .bo_index>.bo_body>.col:nth-of-type(4) { flex-basis:17%; max-width:17%; }
}
</style>