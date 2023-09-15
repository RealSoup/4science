<template>
<div>
    <h2>결제테스트</h2>
    <b> 아래 테스트 창에 직접 입력해 테스트 해 볼 수 있습니다.</b>


    <table border="0">
        <tr>
            <td> Psys_shopid : </td>
            <td><b-input v-model='api_info.api_id' /></td>
            <td>PSYS 가맹점ID  [필수]</td>
        </tr>
        <tr>
            <td> Psys_securekey : </td>
            <td><b-input v-model='api_info.Psys_securekey' /></td>
            <td>PSYS SecureKey [필수]</td>
        </tr>            
        <tr>
            <td> Psys_totalamt : </td>
            <td><b-input v-model='api_info.Psys_totalamt' /></td>
            <td>결제금액 [필수]</td>
        </tr>
        <tr>
            <td> Psys_buyername : </td>
            <td><b-input v-model='api_info.Psys_buyername' /></td>
            <td>구매자명 [필수]</td>
        </tr>
        <tr>
            <td> ReturnURL : </td>
            <td><b-input v-model='api_info.ReturnURL' /></td>
            <td>쇼핑몰에서 리턴받을 주소 [필수]</td>
        </tr>
        <tr>
            <td> Psys_title : </td>
            <td><b-input v-model='api_info.Psys_title' /></td>
            <td>상품명 [필수]</td>
        </tr>

        <tr>
            <td> Psys_goods_no : (추가)</td>
            <td><input type='text' name='Psys_goods_no' value='1234,12'></td>
            <td>상점상품번호</td>
        </tr>            
        <tr>
            <td> Psys_goods_code : </td>
            <td><input type='text' name='Psys_goods_code' value='testcode1,testcode12'></td>
            <td>상점상품코드</td>
        </tr>
        <tr>
            <td> Psys_product_ea :(추가)</td>
            <td><input type='text' name='Psys_product_ea' value='1,2'></td>
            <td>상점상품수량</td>
        </tr>
        <tr>
            <td> Psys_product_amt :(추가)</td>
            <td><input type='text' name='Psys_product_amt' value='50,50'></td>
            <td>상점상품금액</td>
        </tr>

        <tr>
            <td> Psys_handphone : </td>
            <td><b-input v-model='api_info.Psys_handphone' /></td>
            <td>구매자 인증용 핸드폰 번호 [필수]</td>
        </tr>
        <tr>
            <td> Psys_shopingmall_order_no : </td>
            <td><b-input v-model='api_info.Psys_shopingmall_order_no' /></td>
            <td>상품 오더번호 [필수]</td>
        </tr>
        <tr>
            <td> Psys_email : </td>
            <td><input type='text' name='Psys_email' value='이메일주소'></td>
            <td>이메일주소 [선택]</td></tr><tr><td> Psys_recp_nm : </td>
            <td><input type='text' name='Psys_recp_nm' value='수신자'></td>
            <td>수신자 [선택]</td>
        </tr>
        <tr>
            <td> Psys_recp_addr : </td>
            <td><b-input v-model='api_info.Psys_recp_addr' /></td>
            <td>수신 주소 [필수]</td>
        </tr>
        <tr>
            <td> Psys_pmember_id : </td>
            <td><b-input v-model='api_info.Psys_pmember_id' /></td>
            <td>구매자 ID  [필수]</td>
        </tr>
        <tr>
            <td> Psys_card_type : </td>
            <td><input type='text' name='Psys_card_type' value=''></td>
            <td>
                연구비카드 구분 : 미입력시 카드 구분 전체 가능<br>1: 연구비카드(신한,BC,삼성,KB국민,농협), 3: 일반카드, 4: 키인(현장)결제, 5.키인결제(전화승인) ,
                6:장기무이자,7:장기무이자(인증),9: 연구비카드(신한,BC,삼성,KB국민,농협)+일반카드
            </td>
        </tr>
        <tr>
                <td> sell_mm : </td>
            <td><input type='text' name='sell_mm' value=''></td><td>장기무이자 일경우만, 장기무이자 할부 개월수 고정(18,24,36...)</td>
        </tr>
        <tr>
            <td> Psys_etc_data1 : </td>
            <td><input type='text' name='Psys_etc_data1' value='1'></td>
            <td>추가데이타1</td>
        </tr>
        <tr>
            <td> Psys_etc_data2 : </td>
            <td><input type='text' name='Psys_etc_data2' value='2'></td>
            <td>추가데이타2</td>
        </tr>
       

        <!-- 변경 불가능 -->
        <tr>
            <td> edi_date : </td>
            <td><b-input v-model='api_info.edi_date' /></td>
            <td>전문생성시간</td>
        </tr> 

    </table>

    <b-button @click="pay">결제</b-button>


</div>
</template>

<script>
import ax from '@/api/http';

export default {
    name:"TestPsys",
    components: {},
    data() {
        return {
            api_info:{
                Psys_totalamt             :'100',
                Psys_buyername            :'구매자',
                ReturnURL                 :'',
                Psys_title                :'테스트결제',
                Psys_handphone            :'010-000-0000',
                Psys_shopingmall_order_no :'123414',
                Psys_recp_addr            :'수신주소',
                Psys_pmember_id           :'testid',
                Psys_card_type            :1
            },
        }
    },
    methods: {
        async pay(){
            let res = await ax.post(`https://sandbox.psys.co.kr/outvendnew/vendor/input`, this.api_info);
            if (res && res.status === 200)
                console.log(res.data);
        }
    },
    async mounted() {
        let res = await ax.get(`/test/psysIndex`);
        if (res && res.status === 200)
            this.api_info = Object.assign( {}, this.api_info, res.data);
    },
}
</script>

<style lang="css" scoped>
.price { color:#0072BC; }
</style>
