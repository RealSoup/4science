<template>

<header id="header" class="bg-danger">
    <div class="container">
        <b-navbar toggleable="lg" type="dark" variant="danger">
            <b-navbar-brand :to="{name: 'main'}">4Science</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mr-auto">
                    <b-nav-item :to="{name: 'adm_config'}" active-class="active" exact>Site설정</b-nav-item>
                    <b-nav-item :to="{name: 'adm_category'}" active-class="active" exact>카테고리</b-nav-item>

                    <b-nav-item-dropdown text="상품관리">
                        <b-dropdown-item :to="{name: 'adm_goods_index'}">상품목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_maker'}">제조사</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_purchaseAt'}">직배송/항공운임</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="견적관리">
                        <b-dropdown-item :to="{name: 'adm_estimate_index'}">견적목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_estimate_create'}">임의견적</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_eng_reform_index'}">영문교정</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="주문관리">
                        <b-dropdown-item :to="{name: 'adm_order_index'}">주문목록</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'adm_merck_index'}">Merck 발주</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="통계">
                        <b-dropdown-item :to="{name: 'adm_stats_join'}">가입자</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-group header="주문 통계">
                            <b-dropdown-item :to="{name: 'adm_stats_order'}">매출</b-dropdown-item>
                        </b-dropdown-group>
                    </b-nav-item-dropdown>
                    <b-nav-item :to="{name: 'adm_ledger'}" active-class="active" exact>영업장부</b-nav-item>
                </b-navbar-nav>


                <b-navbar-nav class="">
                    <b-nav-item-dropdown>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>게시판</em>
                        </template>
                        <b-dropdown-item :to="{name: 'bo_index', params: { bo_cd:'notice' }}">공지사항</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'bo_index', params: { bo_cd:'normal' }}">일반게시판</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'bo_index', params: { bo_cd:'photo' }}">포토 게시판</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</header>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';


export default {
    name: 'Header',
    data() {
        return {
            // is_auth: this.$store.state.auth.is_auth,
        }
    },

    computed: {

        ...mapState('board', ['dd', 'bo_cd']),
    },
    methods:{

    },

    mounted(){
        // this.loginView()
    }
}
</script>
<style lang="css" scoped>
#header .container nav { z-index:1021; }
</style>
