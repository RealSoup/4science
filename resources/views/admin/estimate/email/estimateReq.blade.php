<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title> eMail - 견적요청 접수 </title>
    </head>
    <body style="padding:0;margin:0;text-align:center;">
        <table cellpadding="0" cellspacing="0" border="0" width="700" style="border:1px solid #d5d5d5;">
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-collapse:collapse;padding:0;border-bottom:2px solid #0095eb;">
                        <tr>
                            <td colspan="4" height="19"></td>
                        </tr>
                        <tr>
                            <td width="30"></td>
                            <td width="162"><a href="{{ env('APP_URL') }}" target="_blank" title="4science 바로가기"><img src="{{ env('APP_URL') }}storage/common/logo/email_logo.png" alt="4science.net" align="absmiddle" border="0" /></a></td>
                            <td width="478" align="right" valign="bottom" style="font-family:'dotum';font-size:12px;color:#888888">본 메일은 {{date('Y-m-d')}}기준으로 작성되었습니다.</td>
                            <td width="30"></td>
                        </tr>
                        <tr>
                            <td colspan="4" height="8"></td>
                        </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" border="0" width="700" style="border-collapse:collapse;padding:0;">
                        <tr>
                            <td width="700" colspan="3"><img src="{{ env('APP_URL') }}storage/estimate/email_req_top.png" alt="견적 요청이 접수 되었습니다! - 4science를 이용해 주셔서 감사합니다. 고객님께서 요청하신 견적 의뢰가 접수 되었습니다." align="absmiddle" border="0" /></td>
                        </tr>
                        <tr>
                            <td width="700" colspan="3" height="30"></td>
                        </tr>
                        <tr>
                            <td width="30"></td>
                            <td width="640">
                                <table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;border-top:1px solid #ececec;border-left:2px solid #3a3a3a;border-right:2px solid #3a3a3a;border-bottom:1px solid #ececec;">
                                    <tr>
                                        <td width="640" height="30"></td>
                                    </tr>
                                    <tr>
                                        <td width="640" style="font-family:'dotum';font-size:12px;color:#3a3a3a;line-height:20px;text-align:center;">안녕하세요.<br />{{$eq_name}} 고객님, 4science.net 입니다.<br />고객님께서 견적 요청하신 내역입니다.</td>
                                    </tr>
                                    <tr>
                                        <td width="640" height="19"></td>
                                    </tr>
                                    <tr>
                                        <td width="640">
                                            <table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;">
                                                <tr>
                                                    <th width="100" height="40"></th>
                                                    <th width="125" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">견적요청일자</th>
                                                    <td width="20" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;"></td>
                                                    <td width="291" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{date('Y-m-d')}}</td>
                                                    <td width="100" height="40"></td>
                                                </tr>
                                                <tr>
                                                    <th width="100" height="40"></th>
                                                    <th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">요청번호</th>
                                                    <td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
                                                    <td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$eq_id}}</td>
                                                    <td width="100" height="40"></td>
                                                </tr>
                                                <tr>
                                                    <th width="100" height="40"></th>
                                                    <th width="125" height="40" style="border-bottom:1px solid #3a3a3a;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">진행현황</th>
                                                    <td width="20" height="40" style="border-bottom:1px solid #3a3a3a;"></td>
                                                    <td width="291" height="40" style="border-bottom:1px solid #3a3a3a;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">미처리</td>
                                                    <td width="100" height="40"></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="640" height="20"></td>
                                    </tr>
                                    <tr>
                                        <td width="640" align="center">
                                            <table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;">
                                                <tr>
                                                    <th width="100"></th>
                                                    <td width="218" align="left"><a href="{{ env('APP_URL') }}" target="_blank" title="4science 바로가기"><img src="{{ env('APP_URL') }}storage/common/eng_btn01.png" alt="4science 바로가기" align="absmiddle" border="0" /></a></td>
                                                    <td width="218" align="right"><a href="{{ env('APP_URL') }}mypage/estimate" target="_blank" title="견적요청 조회"><img src="{{ env('APP_URL') }}storage/estimate/email_btn01.png" alt="견적요청 조회" align="absmiddle" border="0" /></a></td>
                                                    <td width="100"></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="640" height="30"></td>
                                    </tr>
                                </table>
                            </td>
                            <td width="30"></td>
                        </tr>
                        <tr>
                            <td width="700" colspan="3" height="30"></td>
                        </tr>
                        <tr>
                            <td width="700" colspan="3"><img src="{{ env('APP_URL') }}storage/common/email_bottom.png" alt="본 메일은 발신전용이므로 회신하실 경우 답변되지 않습니다. / 주소:경기도 성남시 분당구 삼평동 621번지 판교이노밸리 C동 402호 iNexus, Inc., 4science 사업부 / 대표전화:1644-4214 / 팩스:031-8018-7272 / 이메일:sales@4science.net / 사업자등록번호:204-81-47440 / 통신판매업신고번호:제2011-경기성남-1046호 (주)아이넥서스 대표이사 정미영 / Copyright 2013 by iNexus, Inc., All rights reserved." align="absmiddle" border="0" /></td>z
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>