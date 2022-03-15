<template>
    <footer id="footer" class="bg-info">
        <div class="container">
            <RecentGoods @scrollToTop="scrollToTop" :scrollbarYTop="scrollbarYTop" /> <!-- 최근 본 상품 -->

            <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2019</div>
                <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name:"Footer",
    props: ['scrollbarYTop'],
    components: {
        'RecentGoods': () => import('../_module/RecentGoods.vue'),
    },
    methods:{
        scrollToTop(){
            this.$emit('scrollToTop');
        },
    },
}
</script>

<style>

</style>
