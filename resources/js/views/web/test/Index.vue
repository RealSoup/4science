<template>
<div>
    
    <person-verification></person-verification>
       
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        'person-verification': () => import('@/views/web/_module/person_verification/Index'),
    },
    data() {
        return { pick_hover:0, }
    },
    computed: {
        ...mapState('goods', ['frm', 'list', 'isLoadingModalViewed', 'sch_cate_info', 'pick', 'categorys']),
    },
    methods: {
        numCalc(i) {
            return this.list.total - (this.list.current_page - 1) * this.list.per_page - i ;
        },

        setPage(page) {
            this.frm.page = page;
            this.routerPush();
        },
        sort(type='') {
            this.frm.sort = type;
            this.routerPush();
        },
        routerPush(){
            this.$store.dispatch('goods/routerPush');
        },

        actHover:function(i){ this.pick_hover = i; },

    },
    // mounted() { this.$store.dispatch('goods/index'); },
}
</script>

<style lang="css" scoped>

</style>