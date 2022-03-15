<template>
    <b-container class="print">
        <b-row>
            <b-col>
                <div class="pTitle">
                    <span><i>서</i></span>
                    <span><i>류</i></span>
                    <div class="break d-md-block d-none"></div>
                    <span><i>출</i></span>
                    <span><i>력</i></span>
                    <div class="break"></div>
                    <span><i></i></span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col col lg="3" sm="6" cols="12">
                <b-row>
                    <b-col class="cell01">
                        <div class="inner_wrap" @click="print('w')">
                            <b-img src="/img/mypage/print/bankbook.png" />
                            <p>통장사본(우리)출력</p>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="cell02">
                        <div class="inner_wrap" @click="print('k')">
                            <b-img src="/img/mypage/print/bankbook.png" />
                            <p>통장사본(국민)출력</p>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col col lg="3" sm="6" cols="12" class="cell03">
                <div class="inner_wrap" @click="print('b')">
                    <b-img src="/img/mypage/print/businesslicense.png" />
                    <p>사업자 등록증 출력</p>
                </div>
            </b-col>
            <b-col col lg="3" sm="6" cols="12" class="cell04">
                <b-link to="/mypage/estimate" class="inner_wrap">
                    <b-img src="/img/mypage/print/estimate.png" />
                    <p>견적서 출력</p>
                </b-link>
            </b-col>
            <b-col col lg="3" sm="6" cols="12" class="cell05">
                <b-link to="/mypage/order" class="inner_wrap">
                    <b-img src="/img/mypage/print/order.png" />
                    <p>거래명세서 출력</p>
                </b-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'MyPrintIndex',
    methods: {
        print (code) {
            let width = '550', height = '780';
            if (code == 'b') {
                width = '900', height = '1288';
            }
            var url = `/api/mypage/print/${code}`;
            var name = "서류 출력";
            var option = `width = ${width}, height = ${height}, top = 110, left = 110, location = no`
            window.open(url, name, option);
        },
    },
};
</script>

<style lang="scss" scoped>
.print .col.cell01 { margin-bottom:15px; }
.print .col.cell02 { margin-top:15px; }
.print .col .inner_wrap { background:#eee; border-radius:10px; display:flex; justify-content:center; align-items:center; height:100%; min-height:170px; cursor:pointer; flex-wrap:wrap; align-content: center; }
.print .col .inner_wrap p { width:100%; text-align: center; }
@media (max-width: 992px) {
    .print .col.cell02 { margin-bottom:15px; }
    .print .col.cell03 { margin-bottom:15px; }
    .print .col.cell04 { margin-top:15px; }
    .print .col.cell05 { margin-top:15px; }
}
@media (max-width: 576px) {
    .print .col.cell02 { margin-top:0; }
    .print .col.cell04 { margin-top:0; }
}
</style>
