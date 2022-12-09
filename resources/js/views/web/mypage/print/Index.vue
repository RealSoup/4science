<template>
    <b-container class="print">
        <h5>서류 출력</h5>
        <b-row>
            <b-col col lg="3" sm="6" cols="12">
                <b-row>
                    <b-col class="cell01">
                        <div class="inner_wrap" @click="print('w')">
                            <b-img src="/img/mypage/print/bankbook.png" />
                            <p>우리은행 통장사본 출력<small>bank book (Woori)</small></p>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="cell02">
                        <div class="inner_wrap" @click="print('k')">
                            <b-img src="/img/mypage/print/bankbook.png" />
                            <p>국민은행 통장사본 출력<small>bankbook (KB)</small></p>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col col lg="3" sm="6" cols="12" class="cell03">
                <div class="inner_wrap" @click="print('b')">
                    <b-img src="/img/mypage/print/businesslicense.png" />
                    <p>사업자 등록증 출력<small>Busineess license</small></p>
                </div>
            </b-col>
            <b-col col lg="3" sm="6" cols="12" class="cell04">
                <b-link to="/mypage/estimate" class="inner_wrap">
                    <b-img src="/img/mypage/print/estimate.png" />
                    <p>견적서 출력<small>estimate</small></p>
                </b-link>
            </b-col>
            <b-col col lg="3" sm="6" cols="12" class="cell05">
                <b-link to="/mypage/order" class="inner_wrap">
                    <b-img src="/img/mypage/print/statement.png" />
                    <p>거래명세서 출력<small>statement</small></p>
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
.print .col.cell01 { margin-bottom:10px; }
.print .col.cell02 { margin-top:10px; }
.print .col .inner_wrap { background:#B7B7B7; border-radius:10px; display:flex; justify-content:center; align-items:center; height:100%; min-height:190px; cursor:pointer; flex-wrap:wrap; align-content: center; }
.print .col .inner_wrap:hover { background:#00ADBB; }
.print .col .inner_wrap p { width:100%; text-align:center; color:#FFF; font-weight:bold; margin-top:.5rem; }
.print .col .inner_wrap p small { display:block; }
.print>.row>.col>.inner_wrap>p { margin-top:1.9rem; }
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
