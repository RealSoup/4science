<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title></title>
<!-- <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/earlyaccess/nanumgothic.css"> -->
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
table tr th, table tr td { padding:5px; }

.header tr td p { margin:0 0 7px; font-weight:bold; }
.header tr td p:nth-child(2) { font-size:12px; }

.product tr th:first-child { border-left:1px solid #DADADA; }
.product tr th { border-top:2px solid #4B4B4B; border-right:1px solid #DADADA; border-bottom:1px solid #DADADA; background-color:#F8F8F8; font-size:11px; }
.product tr.line01 td { border-left:1px solid #DADADA; border-bottom:1px dashed #DADADA; }
.product tr.line01 td:last-child { border-right:1px solid #DADADA; }
.product tr.line01 td:nth-child(1) { text-align:center; }
.product tr.line01 td:nth-child(3) { text-align:center; }
.product tr.line01 td:nth-child(4) { text-align:center; }
.product tr.line01 td:nth-child(5) { text-align:right; }
.product tr.line01 td:nth-child(6) { text-align:center; }
.product tr.line01 td:nth-child(7) { text-align:right; }

.product tr.line03 td:nth-child(1) { border-left:1px solid #DADADA; text-align:right; }
.product tr.line03 td:nth-child(2) { border-right:1px solid #DADADA; text-align:right; }
.product tr.line04 td { border-bottom:1px dashed #DADADA; color:#999; }
.product tr.line05 td { border-bottom:1px solid #666; font-size:13px; }
.product tr.line05 td:nth-child(1) { font-weight:bold; }

.bottom { margin-top:8px; border:1px solid #DADADA; }
.bottom tr td { text-align:center; padding:7px; background-color:#F8F8F8; }
.bottom tr td p { margin:0 0 5px; }
.bottom tr:nth-child(1) td { border-bottom:1px dashed #DADADA; }
.bottom tr:nth-child(2) td { padding:16px; }
</style>
</head>
<body>
    <table class="header">
        <tr>
            <td colspan="2" valign="bottom" style="font-size:12px; border-bottom:1px solid #50b947;">
                "과학기자재 전문 쇼핑몰" - 4science.NET
            </td>
        </tr>
        <tr>
            <th colspan="2" align="center" valign="middle" height="29" style="font-size:18px; font-weight:700;">거 &nbsp; 래 &nbsp; 명 &nbsp; 세 &nbsp; 서</th>
        </tr>
        <tr>
            <td colspan="2" align="center" valign="middle" height="20" style="font-size:11px; border-top:1px dashed #d5d5d5; border-bottom:solid 1px #d5d5d5; padding:0;">
                (공급받는자 보관용)
            </td>
        </tr>
        <tr>
            <td align="center" width="60%" style="padding:10px 0;">
                <p>{{ isset($trans_date) ? $trans_date : date('Y년 m월 d일') }}</p>
                <p>{{ isset($trans_receive) ? $trans_receive : $od_department }} 귀하</p>
                아래와 같이 계산 합니다.
            </td>
            <td align="center" valign="middle"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/addr_estimate200921.gif" width="270px" /></td>
        </tr>
    </table>

    <table class="product">
        <tr>
            <th>No.</th>
            <th>DESCRIPTION</th>
            <th>Cat. No.</th>
            <th>모델명</th>
            <th>단가</th>
            <th>수량</th>
            <th>공급가액</th>
        </tr>
@php
$no=1;
$goods_p = 0;
@endphp
@foreach ($order_purchase_at as $opa)
    @foreach ($opa['order_model'] as $odm)
        <tr class="line01">
            @if ($odm['odm_type'] == 'MODEL')
                @if ( $odm['dlvy_all_in'] )
                    @php

                    //  부동소수점 오류 해결을 위한 식
                    $odm['odm_price'] += bcdiv( $od_dlvy_price/$odm['odm_ea'], 1.1 );
                    $od_dlvy_price = 0;

                    @endphp
                @endif
                <td>{{ $no }}</td>
                <td>{{ $odm['odm_gm_name'] }}</td>
                <td>{{ $odm['odm_gm_catno'] }}</td>
                <td>{{ $odm['odm_gm_code'] }}</td>
            @else
                <td></td>
                <td>{{ $odm['odm_gm_name'] }}: {{ $odm['odm_gm_spec'] }}</td>
                <td></td>
                <td></td>
            @endif
            <td>{{ number_format($odm['odm_price']) }}</td>
            <td>{{ $odm['odm_ea'] }}</td>
            <td>{{ number_format($odm['odm_price']*$odm['odm_ea']) }}</td>
        </tr>

        @php

        $no++;
        $goods_p += $odm['odm_price']*$odm['odm_ea'];

        @endphp
    @endforeach
@endforeach

        <tr class="line03 line04"><td colspan="4">SUPPLY PRICE</td>   <td colspan="3">{{ number_format($goods_p) }}</td></tr>
        <tr class="line03 line04"><td colspan="4">V.A.T</td>          <td colspan="3">{{ surtax($goods_p, 1) }}</td></tr>
            @if ($od_dlvy_price)
            <tr class="line03 line04"><td colspan="4">SHIPPING FEES</td>  <td colspan="3">{{ number_format($od_dlvy_price) }}</td></tr>
            @endif
            @if ($od_air_price)
            <tr class="line03 line04"><td colspan="4">항공 운임료</td>     <td colspan="3">{{ number_format($od_air_price) }}</td></tr>
            @endif
        <tr class="line03 line05"><td colspan="4">TOTAL AMOUNT</td>   <td colspan="3">{{ number_format(rrp($goods_p)+$od_dlvy_price+$od_air_price) }}</td></tr>
    </table>

    <table class="bottom">
        <tr>
            <td>
                <p>담당자 : {{$mng['name']}} {{$mng['user_mng']['pos_name']}}, TEL : {{$mng['tel']}}, FAX : {{$mng['fax']}}</p>
                계좌번호 : {{cache('bank')['name01']}} {{cache('bank')['num01']}},
                            {{cache('bank')['name02']}} {{cache('bank')['num02']}} {{cache('bank')['owner']}}
            </td>
        </tr>
        <tr>
            <td align="center" valign="middle"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/logo/estimate_logo.png" width="100px" /></td>
        </tr>
    </table>
</body>
</html>
