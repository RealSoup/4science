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
            // let res = await ax.post(`https://sandbox.psys.co.kr/outvendnew/vendor/input`, this.api_info);
            // if (res && res.status === 200)
            //     console.log(res.data);

            var form = document.createElement('form'); // 폼객체 생성
            var objs01 = document.createElement('input'); 
            var objs02 = document.createElement('input'); 
            var objs03 = document.createElement('input'); 
            var objs04 = document.createElement('input'); 
            var objs05 = document.createElement('input'); 
            var objs06 = document.createElement('input'); 
            var objs07 = document.createElement('input'); 
            var objs08 = document.createElement('input'); 
            var objs09 = document.createElement('input');
            var objs10 = document.createElement('input');
            var objs11 = document.createElement('input'); 
            var objs12 = document.createElement('input'); 
            var objs13 = document.createElement('input');
            var objs14 = document.createElement('input'); 
            objs01.setAttribute('name', 'Psys_email');                objs01.setAttribute('value', 'kjk@4science.net');                     form.appendChild(objs01);
            objs02.setAttribute('name', 'Psys_recp_nm');              objs02.setAttribute('value', '김진국');                                form.appendChild(objs02);
            objs03.setAttribute('name', 'Psys_buyername');            objs03.setAttribute('value', "구매자");                                form.appendChild(objs03);
            objs04.setAttribute('name', 'Psys_card_type');            objs04.setAttribute('value', '');                                     form.appendChild(objs04);
            objs05.setAttribute('name', 'Psys_handphone');            objs05.setAttribute('value', "010-2636-3140");                        form.appendChild(objs05);
            objs06.setAttribute('name', 'Psys_pmember_id');           objs06.setAttribute('value', "testid");                               form.appendChild(objs06);
            objs07.setAttribute('name', 'Psys_recp_addr');            objs07.setAttribute('value', "수신주소");                              form.appendChild(objs07);
            objs08.setAttribute('name', 'Psys_securekey');            objs08.setAttribute('value', this.api_info.Psys_securekey);           form.appendChild(objs08);
            objs09.setAttribute('name', 'Psys_shopingmall_order_no'); objs09.setAttribute('value', "123414");                               form.appendChild(objs09);
            objs10.setAttribute('name', 'Psys_title');                objs10.setAttribute('value', "테스트결제");                            form.appendChild(objs10);
            objs11.setAttribute('name', 'Psys_totalamt');             objs11.setAttribute('value', "100");                                  form.appendChild(objs11);
            objs12.setAttribute('name', 'ReturnURL');                 objs12.setAttribute('value', this.api_info.ReturnURL);                form.appendChild(objs12);
            objs13.setAttribute('name', 'Psys_shopid');               objs13.setAttribute('value', this.api_info.api_id);                   form.appendChild(objs13);
            objs14.setAttribute('name', 'edi_date');                  objs14.setAttribute('value', this.api_info.edi_date);                 form.appendChild(objs14);
            form.setAttribute('method', 'post'); //get,post 가능
            form.setAttribute('action', "https://sandbox.psys.co.kr/outvendnew/vendor/input"); //보내는 url
            // form.setAttribute("accept-charset", "EUC-KR");
            document.body.appendChild(form);
            form.submit();
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
