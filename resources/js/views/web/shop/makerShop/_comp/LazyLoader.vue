<template>
<div ref="wrapper" style="min-height:400px;">
    <list v-if="gd_list.length" :gd_list="gd_list"></list>
</div>
</template>

<script>
import ax from '@/api/http';
import List from './List';

export default {
    name: 'lazy-loader',
    props: {
        node: { type: Object, required: true }
    },
    data() {
        return { gd_list: [] }
    },
    mounted() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.loadGoods();
                observer.disconnect();
            }
        }, { rootMargin: '200px' }); // 뷰포트 200px 전에 미리 로드
        observer.observe(this.$refs.wrapper);
    },
    methods: {
        async loadGoods() {
            const { mk_id, ca01, ca02, ca03, ca04 } = this.node;
            let url = `/api/shop/makerShop/${mk_id}/goods/${ca01}`;
            if (ca02) url += `/${ca02}`;
            if (ca03) url += `/${ca03}`;
            if (ca04) url += `/${ca04}`;

            const res = await ax.get(url);
            if (res.status === 200) this.gd_list = res.data;
        }
    },
    components: {
        List
    }
}
</script>