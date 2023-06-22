<template>
<b-container class="w_fence" id="cscenter">
    <h3>고객센터</h3>
     
    <b-tabs class="cscenter_tab row" v-model="board_tab">
        <b-tab title="1:1 문의" active><board-create :cs_bo_cd="'inquiry'" /></b-tab>
        <b-tab title="A/S 신청"><board-create :cs_bo_cd="'as'" /></b-tab>
        <b-tab title="취소/교환"><board-create :cs_bo_cd="'cancel'" /></b-tab>
        <b-tab title="FAQ"><faq /></b-tab>
    </b-tabs>
    
    <div id="info_tab_scroll"><!-- 스크롤 이동을 위한 테그 --></div>

    <b-tabs class="cscenter_tab row info_tab" v-model="info_tab">
        <b-tab>
            <template #title>견적<span class="m_hide">문의</span> 안내</template>
            <estimate-guide />
        </b-tab>
        <b-tab title="주문 안내"><order-guide /></b-tab>
        <b-tab title="결제 안내"><pay-guide /></b-tab>
        <b-tab class="member_info">
            <template #title>회원<span class="m_hide">혜택</span> 안내</template>
            <img :src="`${s3url}cscenter/member_info.png`" class="m_hide" />
            <img :src="`${s3url}cscenter/member_info_m01.jpg`" class="m_show" />
            <img :src="`${s3url}cscenter/member_info_m02.jpg`" class="m_show" />
        </b-tab>
    </b-tabs>
</b-container>
</template>

<script>
export default {
    name: 'CSCenterIndex',
    components: {
        'board-create': () =>    import('@/views/web/board/Create'),
        'estimate-guide': () =>  import('./_comp/EstimateGuide'),
        'order-guide': () =>     import('./_comp/OrderGuide'),
        'pay-guide': () =>       import('./_comp/PayGuide'),
        'faq': () =>            import('./_comp/Faq'),
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
#cscenter >>> .cscenter_tab { border:5px solid #E2E2E2; margin-bottom:5rem; } 
#cscenter >>> .cscenter_tab>div:first-child { width:370px; padding-left:0; padding-right:0; flex:0 0 auto; max-width:100%; }
#cscenter >>> .cscenter_tab>div:first-child .nav-tabs { flex-direction:column; }
#cscenter >>> .cscenter_tab>div:first-child .nav-tabs .nav-link { background:#4F708F; color:#FFF; font-weight:bold; text-align:center; border:1px solid #FFF; padding:47px 0; border-radius:0; }
#cscenter >>> .cscenter_tab>div:first-child .nav-tabs .nav-link.active { background:#FFF; color:#4F708F; }
#cscenter >>> .cscenter_tab>.tab-content { padding:30px 45px 0; flex-basis: 0; flex-grow: 1; max-width: 100%;}

#cscenter #info_tab_scroll { position:relative; top:-100px; }

#cscenter >>> .info_tab>div .nav-tabs .nav-link { background:#01B7CD; }
#cscenter >>> .info_tab>div .nav-tabs .nav-link.active { background:#FFF; color:#01B7CD; }

#cscenter >>> .info_tab h3 { color:#FD9800; font-size:1rem; margin-bottom:0; }
#cscenter >>> .info_tab h3 span { background:#FD9800; border-radius:20px; padding:10px 20px; font-weight:bold; font-size:1rem; display:inline-block; color:#fff; }
#cscenter >>> .info_tab ol { margin:10px 0 25px 80px; }
#cscenter >>> .info_tab ol li { font-size:.8rem; list-style:decimal; }
#cscenter >>> .info_tab ol li .point { color:#FD9800; }
#cscenter >>> .info_tab>.tab-content .tab-pane:nth-of-type(4) { text-align:center; }
#cscenter >>> .info_tab>.tab-content .tab-pane:nth-of-type(4) img { margin-bottom:3rem; }
#cscenter >>> .info_tab>.tab-content .member_info img { width:100%; max-width:800px; }

@media (max-width: 992px){
    #cscenter >>> .cscenter_tab>div:first-child { width:100%; }
    #cscenter >>> .cscenter_tab>div:first-child .nav-tabs { flex-direction:row; }
    #cscenter >>> .cscenter_tab>div:first-child .nav-tabs li { flex-basis:0; flex-grow:1; width:100%; max-width:100%; }
    #cscenter >>> .cscenter_tab>div:first-child .nav-tabs .nav-link { padding:10px 0; }

    #cscenter >>> .cscenter_tab>.tab-content { padding:20px; }

    #cscenter >>> .info_tab ol { margin:10px 0 25px 5px; }
}
</style>