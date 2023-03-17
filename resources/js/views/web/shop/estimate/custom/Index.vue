<template>
<b-container class="w_fence">
    <h3>주문제작 <small>다양한 제품을 고객님의 니즈에 맞게 제작해 드립니다.</small></h3>
    <b-row>
        <b-link v-for="(piece, k) in category" class="col" :key="k"
            :to="{name: 'estimate_custom_create', params:{id:k }}"
        >
            <img :src="`${s3url}estimate/custom${k}.png`" />
        </b-link>
    </b-row>
</b-container>
</template>

<script>
import ax from '@/api/http';
export default {
    name: 'ShopEstimateCustomIndex',

    data() {
        return {
            category:[]
        };
    },
    async mounted() {
        const res = await ax.get(`/api/shop/estimate/getCustomMadeCategory`);
        if (res && res.status === 200) {
            this.category=res.data;
        }
    },
};
</script>

<style lang="css" scoped>
.w_fence h3 small { font-size:.9rem; }
.w_fence .row a { flex: 0 0 18.4%; max-width:18.4%; border:1px solid #D7D7D7; padding:0; margin-bottom:30px; }
.w_fence .row a:not(:nth-child(5n+0)) { margin-right:30px; }
.w_fence .row a img { width:100%; }
 
</style>