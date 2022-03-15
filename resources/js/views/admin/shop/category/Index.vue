<template>
    <b-container id="adm_category">
        <b-row class="justify-content-center">
            <b-col sm="12" md="10" lg="6">
                <b-card header-tag="header" class="shadow">
                    <template #header><b>카테고리 설정</b></template>
                    <tree-view
                        :cate = "ca.subCate"
                        :parent = "ca"
                        :depth="0"
                        :ca_papa="0"
                        :gene_idx="0"
                        @get-sub='getSub'
                    >
                    </tree-view>
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
                "childCount": 4,
                "sub_show": true,
                "subCate": []
            }
        };
    },
    methods: {
        async index(ca=0){
            try {
                let ca_id =  ca ? ca.ca_id : 0;
                const res = await ax.get(`/api/admin/shop/category/${ca_id}`, { params: {'type': 'childCount'}});
                if (res && res.status === 200) {
                    if (ca_id == 0) {
                        this.ca.childCount = res.data.length;
                        this.ca.subCate = res.data;
                    } else
                        this.$set(ca, 'subCate', res.data);
                }
            } catch (e) {
                Notify.consolePrint(e);
            }
        },
        getSub(ca){
            this.index(ca);
        },
    },
    mounted() {
        this.index();
    },

}
</script>

<style media="screen">
#adm_category .card { padding-bottom:2rem; }
#adm_category ul { padding-inline-start: 40px; }
</style>
