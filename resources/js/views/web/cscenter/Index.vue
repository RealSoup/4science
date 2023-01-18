<template>
<b-container class="w_fence" id="cscenter">
    <h3>고객센터</h3>
     
    <b-tabs class="cscenter_tab" vertical>
        <b-tab title="1:1 문의" active><BoardCreate :cs_bo_cd="'inquiry'" /></b-tab>
        <b-tab title="A/S 신청"><BoardCreate :cs_bo_cd="'as'" /></b-tab>
        <b-tab title="취소/교환"><BoardCreate :cs_bo_cd="'cancel'" /></b-tab>
        <b-tab title="FAQ"><Faq /></b-tab>
    </b-tabs>

    <b-tabs class="cscenter_tab info_tab" vertical>
        <b-tab title="견적문의 안내" active><EstimateGuide /></b-tab>
        <b-tab title="주문 안내"><OrderGuide /></b-tab>
        <b-tab title="결제 안내"><PayGuide /></b-tab>
        <b-tab title="회원혜택 안내"><img :src="`${s3url}cscenter/member_info.png`" style="" /></b-tab>
    </b-tabs>
</b-container>
</template>

<script>
export default {
    name: 'CSCenterIndex',
    components: {
        'BoardCreate': () =>    import('@/views/web/board/Create'),
        'EstimateGuide': () =>  import('./_comp/EstimateGuide'),
        'OrderGuide': () =>     import('./_comp/OrderGuide'),
        'PayGuide': () =>       import('./_comp/PayGuide'),
        'Faq': () =>            import('./_comp/Faq'),
    },
};
</script>

<style lang="css" scoped>
#cscenter >>> .cscenter_tab { border:5px solid #E2E2E2; margin-bottom:5rem; } 
#cscenter >>> .cscenter_tab>.col-auto { width:370px; padding-left:0; padding-right:0; }
#cscenter >>> .cscenter_tab>.col-auto .nav-tabs .nav-link { background:#4F708F; color:#FFF; font-weight:bold; text-align:center; border:1px solid #FFF; padding:47px 0; border-radius:0; }
#cscenter >>> .cscenter_tab>.col-auto .nav-tabs .nav-link.active { background:#FFF; color:#4F708F; }
#cscenter >>> .cscenter_tab>.tab-content { padding:30px 45px 0; }

#cscenter >>> .info_tab>.col-auto .nav-tabs .nav-link { background:#01B7CD; }
#cscenter >>> .info_tab>.col-auto .nav-tabs .nav-link.active { background:#FFF; color:#01B7CD; }

#cscenter >>> .info_tab h3 { color:#FD9800; font-size:1rem; margin-bottom:0; }
#cscenter >>> .info_tab h3 span { background:#FD9800; border-radius:20px; padding:10px 20px; font-weight:bold; font-size:1rem; display:inline-block; color:#fff; }
#cscenter >>> .info_tab ol { margin:10px 0 25px 80px; }
#cscenter >>> .info_tab ol li { font-size:.8rem; list-style:decimal; }
#cscenter >>> .info_tab ol li .point { color:#FD9800; }
#cscenter >>> .info_tab>.tab-content .tab-pane:nth-of-type(4) { text-align:center; }
#cscenter >>> .info_tab>.tab-content .tab-pane:nth-of-type(4) img { margin-bottom:3rem; }
</style>