<template>
<b-container class="p_warp">
    <b-row class="justify-content-center">
        <b-col sm="12" md="10" lg="6">
            <h3 class="p_tit">카테고리</h3>
            <b-card >
                <tree-view
                    :cate = "ca.subCate"
                    :parent = "ca"
                    :depth="0"
                    :ca_papa="0"
                    :gene_idx="0"
                    @get-sub='getSub'
                />
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'category',
    components: {
        'TreeView': () => import('./TreeView.vue'),
    },
    data() {
        return {
            ca:{
                "ca_id": 0,
                "ca_papa": 0,
                "ca_name": "카테고리",
                "ca_seq": 0,
                "hasChild": true,
                "sub_show": true,
                "subCate": []
            }
        };
    },
    methods: {
        async index(ca=0){
            let ca_id =  ca ? ca.ca_id : 0;
            const res = await ax.get(`/api/admin/shop/category/${ca_id}`, { params: {'type': 'hasChild'}});
            if (res && res.status === 200) {
                if (ca_id == 0) this.ca.subCate = res.data;
                else            this.$set(ca, 'subCate', res.data);
            }
        },
        getSub(ca){ this.index(ca); },
    },
    mounted() { this.index(); },
}
</script>

<style lang="css" scoped>
.card { padding-bottom:2rem; }
.card >>> ul { padding-inline-start: 40px; }
</style>