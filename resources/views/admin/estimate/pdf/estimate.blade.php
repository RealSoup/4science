<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>"과학기자재 전문 쇼핑몰" - 4science.NET</title>
<style>
@font-face {
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 100;
    src: url("{{ public_path('fonts/NanumGothicLight.ttf') }}") format('truetype');
}
@font-face {
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 400;
    src: url("{{ public_path('fonts/NanumGothic.ttf') }}") format('truetype');
}
@font-face {
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 700;
    src: url("{{ public_path('fonts/NanumGothicBold.ttf') }}") format('truetype');
}
@font-face {
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 800;
    src: url("{{ public_path('fonts/NanumGothicExtraBold.ttf') }}") format('truetype');
}

* { font-family: 'dotum', '돋움', 'NanumGothic', '나눔고딕', 'DejaVu Sans'; font-size:10px; }


table { padding:0; border-spacing:0px; border:0; border-collapse:collapse; width:100%; }
.profile tr th,
.profile tr td { padding:4px 7px; }
.profile tr th { background-color:#F8F8F8; }
.profile tr.line01 th,
.profile tr.line01 td { border-bottom:solid 1px #f4f4f4; }
.profile tr.line02 th,
.profile tr.line02 td { border-top:solid 1px #d5d5d5; }
.profile tr.line03 th,
.profile tr.line03 td { border-bottom:solid 1px #424242; }

.product { margin-top:7px; }
.product tr th,
.product tr td { padding:4px 7px; }
.product tr th { background-color:#3A3A3A; color:#fff; border-right:1px solid #fff; }
.product tr th:last-child { border-width:0px; }
.product tr.line01 td { border-left:1px solid #DADADA; border-bottom:1px dashed #DADADA; }
.product tr.line01 td:last-child { border-right:1px solid #DADADA; }
.product tr.line02 td { border-left:1px solid #DADADA; border-bottom:2px solid #DADADA; }
.product tr.line02 td:last-child { border-right:1px solid #DADADA; }
.product tr.line01 td:nth-child(1) { text-align:center; }
.product tr.line01 td:nth-child(4) { text-align:right; }
.product tr.line01 td:nth-child(5) { text-align:center; }
.product tr.line01 td:nth-child(6) { text-align:right; }

.product tr.line03 td:nth-child(1) { border-left:1px solid #DADADA; text-align:right; }
.product tr.line03 td:nth-child(2) { border-right:1px solid #DADADA; text-align:right; }
.product tr.line04 td { border-bottom:1px dashed #DADADA; }
.product tr.line05 td { border-bottom:1px solid #BCBCBC; }
.product tr.line05 td:nth-child(1) { font-weight:bold; }

.request { margin-top:8px; }
.request tr td { padding:2px; }
.request tr:nth-child(1) td { font-weight:bold; border-bottom:1px solid #3A3A3A; }
.request tr th { background-color:#F8F8F8; }
.request tr.line01 th { border-right:1px solid #E0E0E0; border-bottom:1px solid #E0E0E0; }
.request tr.line01 td { border-bottom:1px solid #E0E0E0; }

.bottom { margin-top:8px; }
.bottom tr td { text-align:center; padding:2px; }
.bottom tr:nth-child(1) td { background-color:#F8F8F8; border-top:1px solid #4E4E4E; }
.bottom tr:nth-child(2) td { background-color:#888888; color:#fff; }
.bottom tr:nth-child(2) td a { color:#fff; text-decoration:none; }


@media print and (color) {
   * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
   }
}

</style>

@if ( isset($type))
<style>* { font-size:12px; }</style>
    @if ( $type == 'print')
        <script>window.print();</script>
    @endif
@endif

</head>
<body>
    <table>
        <tr>
            <td colspan="2" valign="bottom" style="font-size:12px; border-bottom:1px solid #50b947;">
                "과학기자재 전문 쇼핑몰" - 4science.NET
            </td>
        </tr>
        <tr>
            <th colspan="2" align="center" valign="middle" height="29" style="font-size:18px; font-weight:700;">견 &nbsp; 적 &nbsp; 서</th>
        </tr>
        <tr><td colspan="8" height="0" style="border-bottom:solid 1px #d5d5d5;"></td></tr>
        <tr>
            <td align="center" valign="middle" width="60%"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/logo/estimate_logo.png" width="120px" /></td>
            <td align="center" valign="middle"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/addr_estimate200921.gif" width="270px" height="67px" /></td>
        </tr>
    </table>

    <table class="profile">
        <tr class="line01 line02">
            <th>견적번호</th> <td width="33%">{{ $er['er_id'] }}</td>
            <th>납품기일</th> <td>납기 {{ $er['er_dlvy_at'] }} 이내</td>
        </tr>
        <tr class="line01">
            <th>견적일자</th> <td>{{ date('Y-m-d', strtotime($er['created_at'])) }}</td>
            <th>결제조건</th> <td>선결제 (대학교 및 국가연구소 제외)</td>
        </tr>
        <tr>
            <th>수신</th> <td>{{ $er['estimate_req']['eq_company'] }} 귀하</td>
            <th>유효기간</th> <td>{{ $er['er_effective_at'] }} 까지</td>
        </tr>
        <tr class="line02"><td colspan="4"></td></tr>
        <tr class="line01 line02">
            <th>견적요청인</th> <td>{{ $er['estimate_req']['eq_name'] }}</td>
            <th>견적담당자</th> <td>{{ $er['user']['name'] }}</td>
        </tr>
        <tr class="line01">
            <th>전화번호</th> <td>{{ $er['estimate_req']['eq_tel'] }}</td>
            <th>전화번호</th> <td>{{ $er['user']['tel'] }}</td>
        </tr>
        <tr class="line01">
            <th>휴대폰번호</th> <td>{{ $er['estimate_req']['eq_hp'] }}</td>
            <th>이메일주소</th> <td>{{ $er['user']['email'] }}</td>
        </tr>
        <tr class="line01">
            <th>이메일주소</th> <td>{{ $er['estimate_req']['eq_email'] }}</td>
            <th>팩스주소</th> <td>{{ $er['user']['fax'] }}</td>
        </tr>
        <tr class="line03">
            <th>팩스주소</th> <td colspan="3">{{ $er['estimate_req']['eq_fax'] }}</td>
        </tr>
    </table>

    <table class="product">
        <tr>
            <th>No.</th>
            <th>DESCRIPTION</th>
            <th></th>
            <th>U/PRICE</th>
            <th>Q'TY</th>
            <th>AMOUNT</th>
        </tr>
@php
$no=1;
@endphp
@foreach ($er['estimate_model'] as $em)
    @if ( $em['dlvy_all_in'] )
        @php
        //  부동소수점 오류 해결을 위한 식
        //  부가세를 상품갯수만큼 나눠 1.1을 곱한다.( 부가세를 빼는 식 )
        $em['em_price'] += bcdiv($er['er_dlvy_price']/$em['em_ea'], 1.1);
        $er['er_gd_price'] += bcdiv($er['er_dlvy_price'], 1.1);
        $er['er_surtax'] += $er['er_dlvy_price']-bcdiv($er['er_dlvy_price'], 1.1);
        $er['er_dlvy_price']  = 0;

        @endphp
    @endif
        <tr class="line01">
            <td>{{ $no }}</td>
            <td width="33%">{{ $em['em_name'] }}</td>
            <td>{{ $em['em_unit'] }}</td>
            <td>{{ number_format($em['em_price']) }}</td>
            <td>{{ $em['em_ea'] }}</td>
            <td>{{ number_format($em['em_price']*$em['em_ea']) }}</td>
        </tr>
        <tr class="line01">
            <td></td>
            <td>{{ $em['em_catno'].' / '.$em['em_code'] }}</td>
            <td>
                @if ($em['em_dlvy_at'])
                    납기 : {{$em['em_dlvy_at']}}
                @endif
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr class="line02">
            <td></td>
            <td>@nl2br($em['em_spec'])</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        @php
        $no++;
        @endphp
@endforeach
        <tr class="line03 line05"><td colspan="3"></td><td colspan="3"></td></tr>

        <tr class="line03 line04"><td colspan="3">SUPPLY PRICE</td>   <td colspan="3">{{ number_format($er['er_gd_price']) }}</td></tr>
        <tr class="line03 line04"><td colspan="3">V.A.T</td>          <td colspan="3">{{ number_format($er['er_surtax']) }}</td></tr>
        @if ($er['er_no_dlvy_fee'] !== 'Y')
            @if ($er['er_dlvy_price'] > 0) 
                <tr class="line03 line04"><td colspan="3">배송료</td>          <td colspan="3">{{ number_format($er['er_dlvy_price']) }}</td></tr>
            @endif
            @if ($er['er_air_price'])
                <tr class="line03 line04"><td colspan="3">항공운임료</td>          <td colspan="3">{{ number_format($er['er_air_price']) }}</td></tr>
            @endif
        @endif
        <tr class="line03 line05"><td colspan="3">TOTAL AMOUNT</td>   <td colspan="3">{{ number_format($er['er_all_price']) }}</td></tr>
    </table>

    <table class="request">
        <tr><td colspan="2">▶ 주문요청 (주문시 사업자등록증을 팩스로 보내주세요.)</td></tr>
        <tr class="line01"><th width="40%">발주일</th><td>&nbsp;</td></tr>
        <tr class="line01"><th>수령인성명</th><td>&nbsp;</td></tr>
        <tr class="line01"><th>전화번호</th><td>&nbsp;</td></tr>
        <tr class="line01"><th>핸드폰번호</th><td>&nbsp;</td></tr>
        <tr class="line01"><th rowspan="3">배송지주소</th><td>&nbsp;</td></tr>
        <tr class="line01"><td>&nbsp;</td></tr>
        <tr class="line01"><td>&nbsp;</td></tr>
        <tr class="line01"><th>결제방식</th><td>&nbsp;</td></tr>
    </table>

    <table class="bottom">
        <tr><td>{{ cache('bank')['name01'].'은행 '.cache('bank')['num01'].' '.cache('bank')['owner'] }}</td></tr>
        <tr><td>Your R&D Consultant <a href="https://www.4science.net/" target="_blank">www.4science.net</a></td></tr>
    </table>
</body>
</html>
