<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>{{ $subject }} 메일</title>
</head>
<body style="padding: 0; margin: 0;">
    <div style="width: 600px; border: 1px solid #d8d8d8; border-radius: 4px; padding: 0 50px; font-family: '맑은 고딕', 'Malgun Gothic', sans-serif;">
        <h1 style="margin: 40px 0 20px; font-weight: normal; font-size: 20px;">
            {{ $subject }}
        </h1>
        <hr style="width: 100%; height: 0; border-top: 2px solid #587ef6; margin: 20px 0;">
        <div style="margin: 20px 0 40px; font-size: 14px; line-height: 1.8;">
            <div style="background: #eee; padding: 20px; margin: 20px 0; border-radius: 4px;">

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
            </div>
        </div>
    </div>
</body>
</html>
