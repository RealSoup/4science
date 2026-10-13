<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>[4science] 소멸 예정 마일리지 안내</title>
</head>
<body>
    <table border="0" cellspacing="0" cellpadding="0" style="width:600px; border:1px solid #d8d8d8;">
        <tr>
            <td style="padding:20px;">
                <table width="100%">
                    <tr>
                        <td style="padding:20px 0; border-bottom:2px solid #587ef6; font-size:18px; font-weight:bold;" align="left">
                            [4science] 소멸 예정 마일리지 안내
                        </td>
                    </tr>
                    <tr><td height="30">&nbsp;</td></tr>
                    <tr>
                        <td style="padding:0 10px; font-size:15px; line-height:1.8; color:#333;">
                            <b>{{ $name }}</b> 고객님, 일부 마일리지가 <b style="color:#DD0000;">({{ $month }}중)</b> 소멸 예정 입니다.<br>
                            마이페이지에서 확인해주시기 바랍니다.
                        </td>
                    </tr>
                    <tr><td height="20">&nbsp;</td></tr>
                    <tr>
                        <td style="background:#eee; padding:12px 20px; font-size:14px;">
                            소멸 예정 마일리지 : <b style="color:#DD0000;">{{ number_format($amount) }} P</b>
                        </td>
                    </tr>
                    <tr><td height="30">&nbsp;</td></tr>
                    <tr>
                        <td align="center">
                            <a href="{{ $link }}" target="_blank"
                               style="display:inline-block; padding:12px 40px; background:#1A90D6; color:#fff; text-decoration:none; border-radius:4px; font-size:15px;">
                                마이페이지 마일리지 확인하기
                            </a>
                        </td>
                    </tr>
                    <tr><td height="30">&nbsp;</td></tr>
                    <tr>
                        <td style="font-size:12px; color:#999; border-top:1px solid #ddd; padding-top:12px;">
                            ※ 마일리지는 적립일로부터 1년이 지나면 자동 소멸됩니다.<br>
                            ※ 본 메일은 발신 전용입니다.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>