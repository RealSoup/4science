<template>
<b-container class="p_wrap">
    <b-row class="justify-content-center">
        <b-col sm="12" md="10" lg="6">
            <transition name="fade">
                <loading-modal v-if="isLoadingModalViewed" @close-modal="isLoadingModalViewed=false" :position="''">카테고리 갱신 중 ......</loading-modal>
            </transition>
            <h3 class="p_tit">
                카테고리
                <b-button @click="rewrite"><b-icon-recycle /></b-button>
            </h3>
            <b-card>
                <tree-view :cate="ca.subCate" :parent="ca" :depth="1" :ca_papa="0" @get-sub='getSub' />
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
        'tree-view': () => import('./TreeView.vue'),
        'loading-modal': () =>   import('@/views/_common/LoadingModal.vue'),
    },
    data() {
        return {
            isLoadingModalViewed:false,
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
        async rewrite(){
            var rst = await Notify.confirm('카테고리 캐시파일을 업데이트', 'danger');
            if (rst) {
                this.isLoadingModalViewed=true;
                const res = await ax.get(`/api/admin/shop/category/rewrite`);
                if (res && res.status === 200) {
                    this.isLoadingModalViewed=false;
                    Notify.modal("업데이트 완료.", 'success');
                }
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