<template>
<b-container class="w_fence" id="cscenter">
    <h3>고객센터</h3>
     
    <b-tabs vertical>
        <b-tab title="1:1 문의" active>
            <div class="con_piece">
                <BoardCreate :cs_bo_cd="'inquiry'" />
            </div>
        </b-tab>
        <b-tab title="A/S 신청">
            <div class="con_piece">
                <BoardCreate :cs_bo_cd="'as'" />
            </div>
        </b-tab>
        <b-tab title="취소/교환">
            <div class="con_piece">
                <BoardCreate :cs_bo_cd="'cancel'" />
            </div>
        </b-tab>
        <b-tab title="FAQ">
            <Faq />
        </b-tab>
    </b-tabs>

    <b-tabs vertical>
        <b-tab title="견적문의 안내" active>
            <EstimateGuide />
        </b-tab>
        <b-tab title="주문 안내">
            <OrderGuide />
        </b-tab>
        <b-tab title="결제 안내">
            <PayGuide />
        </b-tab>
        <b-tab title="회원혜택 안내">
            <b-card-text>
                <img :src="`${s3url}cscenter/member_info.png`">
            </b-card-text>
        </b-tab>
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
    data() { return { }; },
    mounted() { },
    methods: { },
};
</script>

<style lang="css" scoped>
#cscenter >>> .tabs { border:5px solid #E2E2E2; } 
#cscenter >>> .tabs .col-auto { width:370px; }
#cscenter >>> .tabs .col-auto .nav-tabs .nav-link { background:#4F708F; color:#FFF; font-weight:bold; text-align:center; border-bottom:1px solid #FFF; margin:0; padding:47px 0; }
#cscenter >>> .tabs .col-auto .nav-tabs .nav-link.active { background:#FFF; color:#4F708F; }


.accordion > .card > .card-header { padding: 0.25rem; }
.con_piece { margin:50px 30px; }
.con_piece h3 { color:#FE9800; font-weight:bold; font-size:1rem; }
.con_piece h3 span { background-color:#FE9800; color:#fff; display:inline-block; padding:10px 18px; border-radius:25px; }
.con_piece ol { margin:10px 0 0 80px; list-style:decimal; margin-bottom:40px; }
.con_piece ol li .point { color:#FE9800; }

dl.payment dt { font-size:1rem; background-color:#F6F6F6; padding:1rem; }
dl.payment dd { padding:15px; }
dl.payment dd ul { list-style:decimal; }
dl.payment dd ul { margin-left:15px; }
dl.payment dd b { font-weight:900; }
dl.payment dd .point { color:#0D4D9C; font-weight:900; }
dl.payment dd .point span { background-color:#0D4D9C; color:#fff; font-weight:bold; display:inline-block; padding:1px 12px; border-radius:11px; }
dl.payment dd .point b { color:#000; }
dl.payment dd p { margin:0.5rem 0 0.2rem 0; }
dl.payment dd a { font-weight:900; color:#0D4D9C; }
dl.payment dd .view_img { font-size: 0.7rem; padding: 0.12rem 0.2rem 0 0.2rem; line-height: 0.9rem; }
</style>