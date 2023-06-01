<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>{{ $subject }} 메일</title>
</head>
<body>
    <table border="0" cellspacing="0" cellpadding="0" style="width:600px; border:1px solid #d8d8d8; ">
        <tr>
            <td style="padding:20px;">
                <table width="100%">
                    <tr>
                        <td style="padding:20px 0; border-bottom:2px solid #587ef6;" align="left">                
                            {{ $subject }}
                        </td>
                    </tr>
                    <tr>
                        <td height="30">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="background: #eee; padding:10px 40px;">
                            <h3>구매정보</h3>
                            <p>주문번호 : {{$od_no??''}}</p>
                            <p>주문자 : {{$od_orderer}}</p>
                            <p>연락처 : {{$od_orderer_hp}}</p>
                            <br /><br />

                            <h3>결제 정보</h3>
                            <p>{{$bank}} {{$account}}</p>
                            <p>합계: {{$price}}</p>

                            <h3>배송정보</h3>
                            <p>{{$addr}}</p>
                            <br /><br />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
