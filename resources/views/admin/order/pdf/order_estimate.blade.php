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

.product tr.line_side td { border-left:1px solid #DADADA; }
.product tr.line_side td:last-child { border-right:1px solid #DADADA; }
.product tr.top_thick td { border-top:2px solid #DADADA; }
.product tr.top_dashed td { border-top:1px dashed #DADADA; }
.product tr.bottom_dashed td { border-bottom:1px dashed #DADADA; }
.product tr.bottom_thick td { border-bottom:2px solid #DADADA; }

.product tr.align_price td:nth-child(1) { text-align:center; }
.product tr.align_price td:nth-child(4) { text-align:right; }
.product tr.align_price td:nth-child(5) { text-align:center; }
.product tr.align_price td:nth-child(6) { text-align:right; }

.product tr.line03 td:nth-child(1) { border-left:1px solid #DADADA; text-align:right; }
.product tr.line03 td:nth-child(2) { border-right:1px solid #DADADA; text-align:right; }
.product tr.line04 td { border-bottom:1px dashed #DADADA; }
.product tr.line05 td { border-bottom:1px solid #BCBCBC; }
.product tr.line05 td:nth-child(1) { font-weight:bold; }

.product tr.line_opt td { border-left:1px solid #DADADA; border-bottom:2px dashed #DADADA; }
.product tr.line_opt td:last-child { border-right:1px solid #DADADA; }


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
</style>
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
            <td align="center" valign="middle"><img src="https://fourscience.s3.ap-northeast-2.amazonaws.com/common/addr_estimate200921.gif" width="270px" /></td>
        </tr>
    </table>

    <table class="profile">
        <tr class="line01 line02">
            <th>구매번호</th> <td>{{ $od_no }}</td>
            <th>납품기일</th> <td>납기 2주이내</td>
        </tr>
        <tr class="line01">
            <th>견적일자</th> <td>{{ date('Y-m-d') }}</td>
            <th>결제조건</th> <td>선결제 (대학교 및 국가연구소 제외)</td>
        </tr>
        <tr>
            <th>수신</th> <td>{{ $od_department }} 귀하</td>
            <th>유효기간</th> <td>견적일로부터 2주 까지</td>
        </tr>
        <tr class="line02"><td colspan="4"></td></tr>
        <tr class="line01 line02">
            <th>견적요청인</th> <td>{{ $od_orderer }}</td>
            <th>견적담당자</th> <td>{{ $mng['name'] }}</td>
        </tr>
        <tr class="line01">
            <th>전화번호</th> <td>{{ $od_orderer_tel }}</td>
            <th>전화번호</th> <td>{{ $mng['tel'] }}</td>
        </tr>
        <tr class="line01">
            <th>휴대폰번호</th> <td>{{ $od_orderer_hp }}</td>
            <th>이메일주소</th> <td>{{ $mng['email'] }}</td>
        </tr>
        <tr class="line01">
            <th>이메일주소</th> <td>{{ $od_orderer_email }}</td>
            <th>팩스주소</th> <td>{{ $mng['fax'] }}</td>
        </tr>
        <tr class="line03">
            <th>팩스주소</th> <td colspan="3">{{ $od_orderer_fax }}</td>
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
$goods_p = 0;
@endphp
@foreach ($order_purchase_at as $opa)
    @foreach ($opa['order_model'] as $odm)
        @if ($odm['odm_type'] == 'MODEL')
            @if ( $opa['dlvy_all_in'] && $loop->first)
                @php

                //  부동소수점 오류 해결을 위한 식
                $odm['odm_price'] += bcdiv( $od_dlvy_price/$odm['odm_ea'], 1.1 );
                $od_dlvy_price = 0;

                @endphp
            @endif
        <tr class="line_side top_thick align_price">
            <td>{{ $no }}</td>
            <td>{{ $odm['odm_gm_name'] }}</td>
            <td>{{ $odm['odm_gm_unit'] }}</td>
            <td>{{ number_format($odm['odm_price']) }}</td>
            <td>{{ $odm['odm_ea'] }}</td>
            <td>{{ number_format($odm['odm_price']*$odm['odm_ea']) }}</td>
        </tr>
        <tr class="line_side top_dashed bottom_dashed">
            <td></td>
            <td>{{ $odm['odm_gm_catno'].' / '.$odm['odm_gm_code'] }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
            @if ( $loop->last )
        <tr class="line_side bottom_thick">
            @else
        <tr class="line_side bottom_dashed">
            @endif
            <td></td>
            <td>{{ $odm['odm_gm_spec'] }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        @else        
            @if ( $loop->last )
        <tr class="line_side align_price bottom_thick">
            @else
        <tr class="line_side align_price">
            @endif
            <td></td>
            <td>{{ $odm['odm_gm_name'] }}: {{ $odm['odm_gm_spec'] }}</td>
            <td></td>
            <td>{{ number_format($odm['odm_price']) }}</td>
            <td>{{ $odm['odm_ea'] }}</td>
            <td>{{ number_format($odm['odm_price']*$odm['odm_ea']) }}</td>
        </tr>       
        @endif

        @php

        $no++;
        $goods_p += $odm['odm_price']*$odm['odm_ea'];

        @endphp
    @endforeach
@endforeach
        <tr class="line03 line05"><td colspan="3"></td><td colspan="3"></td></tr>

        <tr class="line03 line04"><td colspan="3">SUPPLY PRICE</td>   <td colspan="3">{{ number_format($goods_p) }}</td></tr>
        <tr class="line03 line04"><td colspan="3">V.A.T</td>          <td colspan="3">{{ surtax($goods_p, 1) }}</td></tr>
            @if ($od_dlvy_price)
            <tr class="line03 line04"><td colspan="3">SHIPPING FEES</td>  <td colspan="3">{{ number_format($od_dlvy_price) }}</td></tr>
            @endif
            @if ($od_air_price)
            <tr class="line03 line04"><td colspan="3">항공 운임료</td>     <td colspan="3">{{ number_format($od_air_price) }}</td></tr>
            @endif
        <tr class="line03 line05"><td colspan="3">TOTAL AMOUNT</td>   <td colspan="3">{{ number_format(rrp($goods_p)+$od_dlvy_price+$od_air_price) }}</td></tr>
    </table>

    <table class="request">
        <tr><td colspan="2">▶ 주문요청 (주문시 사업자등록증을 팩스로 보내주세요.)</td></tr>
        <tr class="line01"><th>발주일</th><td>&nbsp;</td></tr>
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
        <tr><td>Your R&amp;D Consultant <a href="https://www.4science.net/" target="_blank">www.4science.net</a></td></tr>
    </table>
</body>
</html>
