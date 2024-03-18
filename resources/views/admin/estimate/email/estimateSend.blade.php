<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> eMail - 견적 완료 </title>
</head>
<body style="padding:0;margin:0;">
<center>
<table cellpadding="0" cellspacing="0" border="0" width="700" style="border:1px solid #d5d5d5; font-family:'dotum'; font-size:12px">
    <tr>
        <td style="padding:13px 30px 10px 30px;">
            <table width="100%"  style="font-size:12px;">
                <tr>
                    <td align="left" width="50%"><a href="{{$domain}}" target="_blank"><img src="{{ asset('storage/common/logo/email_logo.png') }}" /></a></td>
                    <td align="right" valign="bottom" style="color:#888888;">본 메일은 {{ date('Y-m-d h:i:s') }}에 작성되었습니다.</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="border-top:2px solid #0095eb; padding-bottom:6px;"><img src="{{ asset('storage/common/email_top.png') }}" /></td>
    </tr>
    <tr>
        <td style='border-top:2px solid #0095eb;'>
            <!-- <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td colspan="2"><img src="{{ asset('storage/event/2023/0901/estimate01.jpg') }}" /></td>
                </tr>
                <tr>
                    <td>
                        <a href="https://4science.net/shop/goods/616504" target='_blank'>
                            <img src="{{ asset('storage/event/2023/0901/estimate02.jpg') }}" />
                        </a>
                    </td>
                    <td>
                        <a href="https://4science.net/shop/goods/616504" target='_blank'>
                            <img src="{{ asset('storage/event/2023/0901/estimate03.jpg') }}" />
                        </a>
                    </td>
                </tr>
            </table> -->
            <a href="https://4science.net/shop/goods?mode=maker&keyword=goodsgood" target='_blank'>
                <img src="{{ asset('storage/event/2024/0319/estimate.png') }}" />
            </a>
        </td>
    </tr>

    <tr>
        <td style="padding:50px 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px;">
                <tr><td colspan="4" style="padding-bottom:5px;"><b>견적서 정보</b></td></tr>
                <tr>
                    <th style="border-top:2px solid #50b947; border-bottom:2px solid #50b947; padding:13px 0;">견적요청인</th>
                    <td style="border-top:2px solid #50b947; border-bottom:2px solid #50b947; padding:13px 10px;" colspan="3">{{$eq_name}}</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">견적번호</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$er_id}}</td>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">요청번호</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$eq_id}}</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">견적일자</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$estimated_date}}</td>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">납품기일</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">납기 {{$er_dlvy_at}} 이내</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">유효기간</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$er_effective_at}}</td>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">담당자</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$eq_mng_nm}}</td>
                </tr>
                <tr>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">전화번호</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$er_mng_tel}}</td>
                    <th width="20%" style="padding:13px 0; background-color:#f8f8f8; border-bottom:1px solid #d5d5d5;">이메일</th>
                    <td style="padding:13px 10px; border-bottom:1px solid #d5d5d5;">{{$er_mng_email}}</td>
                </tr>
            </table>
        </td>
    </tr>

    <tr>
        <td style="padding:0 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px;">
                <tr>
                    <th colspan="7" style="padding-bottom:5px;" align="left">상품 정보</th>
                </tr>
                <tr>
                    <th width="26.5%" style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">제품설명</th>
                    <th style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">Cat. No.</th>
                    <th style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">모델명</th>
                    <th style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">판매단위</th>
                    <th style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">단가</th>
                    <th style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">수량</th>
                    <th style="background-color:#f8f8f8; padding:13px 0; border-top:2px solid #0095eb;">공급가액</th>
                </tr>
                @foreach ($estimate_model as $em)
                <tr>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0; word-break:break-word;">
                        <b>{{ $em['em_name'] }}</b>
                        <br /><br />
                        @nl2br($em['em_spec'])
                    </td>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ $em['em_catno'] }}</td>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ $em['em_code'] }}</td>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ $em['em_unit'] }}</td>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ number_format($em['em_price']) }}</td>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ $em['em_ea'] }}</td>
                    <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ number_format($em['em_price'] * $em['em_ea']) }}</td>
                </tr>
                    @foreach ($em['estimate_option'] as $eo)
                    <tr>
                        <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" colspan="4">
                            {{$eo['eo_tit']}}: {{$eo['eo_name']}}
                        </td>
                        <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ number_format($eo['eo_price']) }}</td>
                        <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ $eo['eo_ea'] }}</td>
                        <td style="border-bottom:1px solid #D5D5D5; padding:13px 0;" align="center">{{ number_format($eo['eo_price'] * $eo['eo_ea']) }}</td>
                    </tr>
                    @endforeach
                @endforeach
                <tr>
                    <th style='border-top:2px solid #50b947; border-bottom:1px solid #d5d5d5; padding:17px 0;'>추가정보</th>
                    <td colspan='6' style='border-top:2px solid #50b947; color:#3a3a3a; border-bottom:1px solid #d5d5d5; padding:17px 0; text-align:justify; word-break:break-all; white-space:pre;'>{{$er_content}}</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="padding:0 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px;">
                <tr>
                    <th width="80%" style='background-color:#f8f8f8; font-weight:bold; padding:6px 8px;' align="right">합계 :</th>
                    <td style='background-color:#f8f8f8; color:red; padding:6px 8px;' align="right">{{number_format($er_gd_price)}}원</td>
                </tr>
                <tr>
                    <th style='background-color:#f8f8f8; font-weight:bold; padding:6px 8px;' align="right">부가세  :</th>
                    <td style='background-color:#f8f8f8; color:red; padding:6px 8px;' align="right">{{ number_format($er_surtax) }}원</td>
                </tr>
                @if ($er_no_dlvy_fee !== 'Y')
                <tr>
                    <th style='background-color:#f8f8f8; font-weight:bold; padding:6px 8px;' align="right">배송료  :</th>
                    <td style='background-color:#f8f8f8; color:red; padding:6px 8px;' align="right">{{ number_format($er_dlvy_price) }}원</td>
                </tr>
                @if ($er_air_price)
                <tr>
                    <th style='background-color:#f8f8f8; font-weight:bold; padding:6px 8px;' align="right">항공 운임료 :</th>
                    <td style='background-color:#f8f8f8; color:red; padding:6px 8px;' align="right">{{ number_format($er_air_price) }}원</td>
                </tr>
                @endif
                @endif
                <tr>
                    <th style='background-color:#f8f8f8; border-top:1px dashed #d5d5d5; border-bottom:1px solid #d5d5d5; font-weight:bold; padding:17px 8px;' align="right">최종결제금액 :</th>
                    <td style='background-color:#f8f8f8; border-top:1px dashed #d5d5d5; border-bottom:1px solid #d5d5d5; color:red; font-weight:bold; padding:17px 8px;' align="right">{{ number_format($er_all_price) }}원</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding:20px 0 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px;">
                <tr>
                    <td width="50%" align="right" style="padding:13px 10px;"><a href="{{$domain}}" target="_blank"><img src="{{ asset('storage/common/email_btn01.png') }}" /></a></td>
                    <td style="padding:13px 10px;">
                        @if ($redirect_url)
                        <a href="{{$redirect_url}}" target="_blank"><img src="{{ asset('storage/common/email_btn02.png') }}" /></a>
                        @else
                        비회원 고객님께 발송된 견적서 메일입니다.<br>
                        비회원 고객님은 온라인 주문을 이용하실 수 없습니다.<br>
                        4science 온라인 회원 가입 후 재견적요청/ 온라인 주문을 이용해주시기 바랍니다.<br>
                        감사합니다.
                        @endif
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style='border-top:2px solid #0095eb;'>
            <a href="https://4science.net/shop/goods?ca01=29&ca02=4182" target='_blank'>
                <img src="{{ asset('storage/event/2024/0305/estimate.png') }}" />
            </a>
            <!-- <a href="https://4science.net/board/notice/show/55" target='_blank'>
                <img src="{{ asset('storage/event/2024/0219/estimate.png') }}" />
            </a> -->
            <!-- <a href="https://4science.net/shop/listing/sale" target='_blank'>
                <img src="{{ asset('storage/event/2024/0103/estimate.jpg') }}" />
            </a> -->
            <!-- <a href="https://pf.kakao.com/_AxmKUj" target='_blank'>
                <img src="{{ asset('storage/event/2023/1205/estimate.jpg') }}" />
            </a> -->
        </td>
    </tr>
    <tr>
        <td><img src="{{ asset('storage/common/email_bottom.png') }}" /></td>
    </tr>
</table>

</center>
</body>
</html>
