<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> eMail - 거래명세서 </title>
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
        <td style="border-top:2px solid #0E9C16; padding-bottom:6px;"><img src="{{ asset('storage/common/email_top_statement.jpg') }}" /></td>
    </tr>

    <tr>
        <td style="border-top:2px solid #0E9C16; padding:30px">
           
            <b>안녕하세요!</b>
            <br /><br /><br />
            4science를 이용해 주셔서 감사합니다.<br /><br />
            {{$name}}고객님이 주문하신 물품의 대한 거래 명세서 입니다.<br /><br /><br />
            감사합니다.<br /><br /><br /><br />


        </td>
    </tr>

    <tr><td><img src="{{ asset('storage/common/email_bottom.png') }}" /></td></tr>
</table>
</center>






                            
</body>
</html>
