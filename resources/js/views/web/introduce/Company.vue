<template>
<ol>
    <li class="ci">
        <h5>1. CI</h5>
        <div><img :src="`${s3url}introduce/about_iNexus.png`" /></div>
    </li>
    <li>
        <h5>2. 설립취지</h5>
        (주)아이넥서스는 전문적인 분야의 정보를 소비자에게 편리한 형태로 가공하여 필요한 사람에게 적기에 제공할 수 있는 네트워크를 구축하여 부가가치를 창출하는 
        세계적 버티컬(vertical) 인터넷 기업을 목표로 연구장비 및 재료의 구입과정이 복잡하고 시간이 많이 소요된다는 점을 인식하고, 온라인상에서 과학자들이 실험기자재를 
        신속하고 편리하게 구입하여 연구생산성 향상을 이룰 수 있도록 돕기 위하여 설립되었습니다.
        <br>
        경영진이 수년동안 광학, 진공 및 반도체 분야의 연구개발 경험과 국내외 교수 및 연구원 등의 전문가 네크웍을 구성하여, 연구자들의 
        문제해결을 돕고 우수한 기자재를 발굴하여 합리적인 가격과 적절한 시기에 공급하고자 합니다.
    </li>
    <li class="ideology">
        <h5>3. 설립취지</h5>
        <i>(주)아이넥서스는 신뢰도 높은 서비스 지향형 기업입니다.</i>
        제품의 재고, 포장 및 배송은 고객들의 요구를 충족시키는데 있어 빼놓을 수 없는 요소이며 당사가 이루어 온 품질 공정은 최상의 서비스 품질로 고객과 함께하겠다고 약속합니다. 현지 본사 쪽에서는 
        대부분의 제품을 재고로 보유하고 있으며, 4science에서는 친절하고 전문 지식이 풍부한 직원들이 최상의 서비스로 고객에게 응대하고 있습니다.
        <img :src="`${s3url}introduce/ideology.png`" />
    </li>
</ol>
</template>

<script>
export default {
    name: 'IntroduceCompany',
    components: {
        // 'board-create': () =>    import('@/views/web/board/Create'),
    },
    data() { 
        return { 
            board_tab:0, 
            info_tab:0, 
        }
    },
    mounted() {
        if (this.$route.query.view_type == 'membership')
            this.$nextTick(function () {
                this.info_tab=3;
                document.getElementById('info_tab_scroll').scrollIntoView();
                // this.$route.params?.target && this.$refs.target?.scrollIntoView();
                // https://velog.io/@tjdud0123/vue-router-target-scroll
            });
        else if (this.$route.query.view_type == 'as')
            this.$nextTick(function () { this.board_tab=1; });
        else if (this.$route.query.view_type == 'faq')
            this.$nextTick(function () { this.board_tab=3; });
            
    },
};
</script>

<style lang="css" scoped>
ol li h5 { font-weight:900; font-size:1.4rem; margin-bottom:1.2rem; }
ol .ci div { background-image: url(/storage/introduce/ci_bg.png); background-repeat: repeat; border: 2px solid #ececec; padding: 20px 0; }
ol li { line-height:30px; }
ol li:not(:last-child) { margin-bottom: 4rem; }
ol li i { display:block; color:#1A90D6; font-weight:bold; }
ol li img { width:100%; }
@media (max-width: 992px){

.w_fence .body {padding: 5px;}

}
</style>