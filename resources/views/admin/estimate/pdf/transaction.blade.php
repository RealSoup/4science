<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title></title>
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
                <p>{{ date('Y년 m월 d일', strtotime($er['created_at'])) }}</p>
                <p>{{ $er['estimate_req']['eq_department'] }} 귀하</p>
                아래와 같이 계산 합니다.
            </td>
            <td align="center" valign="middle"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/addr_estimate200921.gif" width="270px" height="67px" /></td>
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
            <td>{{ $em['em_name'] }}</td>
            <td>{{ $em['em_catno'] }}</td>
            <td>{{ $em['em_code'] }}</td>
            <td>{{ number_format($em['em_price']) }}</td>
            <td>{{ $em['em_ea'] }}</td>
            <td>{{ number_format($em['em_price']*$em['em_ea']) }}</td>
        </tr>
        @php
        $no++;
        @endphp
@endforeach

        <tr class="line03 line04"><td colspan="4">SUPPLY PRICE</td>   <td colspan="3">{{ number_format($er['er_gd_price']) }}</td></tr>
        <tr class="line03 line04"><td colspan="4">V.A.T</td>          <td colspan="3">{{ number_format($er['er_surtax']) }}</td></tr>
        @if ($er['er_no_dlvy_fee'] !== 'Y')
            @if ($er['er_dlvy_price'] > 0) 
                <tr class="line03 line04"><td colspan="4">배송료</td>   <td colspan="3">{{ number_format($er['er_dlvy_price']) }}</td></tr>
            @endif
            @if ($er['er_air_price'])
                <tr class="line03 line04"><td colspan="4">항공운임료</td>   <td colspan="3">{{ number_format($er['er_air_price']) }}</td></tr>
            @endif
        @endif
        <tr class="line03 line05"><td colspan="4">TOTAL AMOUNT</td>   <td colspan="3">{{ number_format($er['er_all_price']) }}</td></tr>
    </table>

    <table class="bottom">
        <tr>
            <td>
                <p>담당자 : {{$er['user']['name']}} {{$er['user']['user_mng']['pos_name']}}, TEL : {{$er['user']['tel']}}, FAX : {{$er['user']['fax']}}</p>
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
