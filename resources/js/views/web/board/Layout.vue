<template lang="html">
    <b-card title="Card Title" no-body>
        <b-card-header header-tag="nav">
            <b-nav card-header pills>
                <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'open' }}" :active='$route.params.bo_cd =="open"'>열린게시판</b-nav-item>
                <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'notice' }}" :active='$route.params.bo_cd =="notice"'>공지사항</b-nav-item>
                <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'goods' }}" :active='$route.params.bo_cd =="goods"'>상품문의</b-nav-item>
                <b-nav-item :to="{name: 'bo_index', params: { bo_cd:'event' }}" :active='$route.params.bo_cd =="event"'>이벤트</b-nav-item>
            </b-nav>
        </b-card-header>
        <b-card-body><router-view></router-view></b-card-body>
    </b-card>
</template>

<script>
export default {
    name: "Board",
    computed: {
    },
    data() {
        return {
        }
    },
    methods:{
    },
    mounted() {
    },
}
</script>

<style lang="css" scoped>

</style>
