<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> eMail - 납품완료 후 미결제 안내 </title>
</head>
<body style="padding:0;margin:0;">
<center>
<table cellpadding="0" cellspacing="0" border="0" width="700" style="border:1px solid #d5d5d5; font-family:'dotum'; font-size:12px">
    <tr>
        <td style="padding:13px 30px 10px 30px;">
            <table width="100%"  style="font-size:12px;">
                <tr>
                    <td align="left" width="50%"><a href="{{cache('site')['domain']}}" target="_blank"><img src="{{ asset('storage/common/logo/email_logo.png') }}" /></a></td>
                    <td align="right" valign="bottom" style="color:#888888;">본 메일은 {{ date('Y-m-d h:i:s') }}에 작성되었습니다.</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="border-top:2px solid #0095eb; padding-bottom:6px;"><img src="{{ asset('storage/common/email_top_pay_req.png') }}" /></td>
    </tr>

    <tr>
        <td style="padding:50px 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px;">
                <tr><td colspan="4" style="padding-bottom:5px;"><b>주문 정보</b></td></tr>
                <tr>
                    <th style="border-top:2px solid #FDECA6; border-bottom:2px solid #FDECA6; padding:13px 0;">주문자</th>
                    <td style="border-top:2px solid #FDECA6; border-bottom:2px solid #FDECA6; padding:13px 10px;" colspan="3">{{$od_orderer}}</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">담당자</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;" colspan="3">{{$mng['name']}}</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">전화번호</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{cache('biz')['tel']}}</td>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">이메일</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$mng['email']}}</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">주문상품</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$od_name}}</td>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">주문금액</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{ number_format($od_all_price) }}원</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">추가정보</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;" colspan="3">{{$email_msg}}</td>
                </tr>
            </table>
        </td>
    </tr>

    @if ( $od_type !== 'buy_temp' )
    <tr>
        <td align="center" style="padding:20px 0 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px;">
                <tr>
                    <td width="50%" align="right" style="padding:13px 10px;"><a href="https://4science.net/mypage/order" target="_blank"><img src="{{ asset('storage/common/pay_req_btn01.png') }}" /></a></td>
                    <td style="padding:13px 10px;">
                        <a href="https://4science.net/mypage/print" target="_blank"><img src="{{ asset('storage/common/pay_req_btn02.png') }}" /></a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    @endif
    <tr><td><img src="{{ asset('storage/common/email_bottom.png') }}" /></td></tr>
</table>
</center>
</body>
</html>
