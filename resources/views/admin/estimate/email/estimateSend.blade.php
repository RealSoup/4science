<!DOCTYPE html>
<html lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> eMail - 견적 완료 </title>
</head>
<body style="padding:0;margin:0;">
<center>
<table cellpadding="0" cellspacing="0" border="0" width="960" style="border:1px solid #d5d5d5; font-family:'dotum'; font-size:12px">
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
        <td style="border-top:2px solid #0095eb; padding-bottom:6px;"><img src="{{ asset('storage/common/email_top_960.jpg') }}" /></td>
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
            
            <a href="https://pf.kakao.com/_AxmKUj" target='_blank'>
                <img src="{{ asset('storage/event/2023/1205/estimate_960.jpg') }}" />
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

            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:12px; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="padding:4px 7px; background-color:#3A3A3A; color:#fff; border-right:1px solid #fff;">No.</th>
                        <th style="padding:4px 7px; background-color:#3A3A3A; color:#fff; border-right:1px solid #fff;" width="33%">DESCRIPTION</th>
                        <th style="padding:4px 7px; background-color:#3A3A3A; color:#fff; border-right:1px solid #fff;">UNIT</th>
                        <th style="padding:4px 7px; background-color:#3A3A3A; color:#fff; border-right:1px solid #fff;">U&#47;PRICE </th>
                        <th style="padding:4px 7px; background-color:#3A3A3A; color:#fff; border-right:1px solid #fff;">Q&#039;TY </th>
                        <th style="padding:4px 7px; background-color:#3A3A3A; color:#fff;">AMOUNT</th>
                    </tr>
                </thead>

                <tbody>
@php
$no=1;
@endphp
                
            @foreach ($estimate_model as $em) 
                    <tr>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; text-align:center;">
                            {{ $no }}
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA;">
                            {{ $em['em_name'] }}
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA;">
                            {{ $em['em_unit'] }}
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; text-align:right;">
                            <span @if($er_show_dc == 'Y' && $em['em_dc_rate']) style="text-decoration: line-through;" @endif>
                                @if ($er_show_dc == 'Y' && $em['em_dc_rate'])
                                    {{ number_format($em['em_cost_price']) }}
                                @else
                                    {{ number_format($em['em_price']) }}
                                @endif
                            </span>
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; text-align:center;">
                            {{ $em['em_ea'] }}
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; border-right:1px solid #DADADA; text-align:right;">
                            {{ number_format($em['em_price'] * $em['em_ea']) }}
                        </td> 
                    </tr>

                    <tr>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; text-align:center;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA;">
                            {{ $em['em_catno'].' / '.$em['em_code'] }}
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; text-align:right;">
                            @if ($er_show_dc == 'Y' && $em['em_dc_rate'])
                                {{ number_format($em['em_price']) }}
                            @endif
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; text-align:center;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: 1px dashed #DADADA; border-right:1px solid #DADADA; text-align:right;"></td>
                    </tr>

                    <tr>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $em['estimate_option'] ? '1px dashed #DADADA' : '2px solid #DADADA' }}; text-align:center;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $em['estimate_option'] ? '1px dashed #DADADA' : '2px solid #DADADA' }};">
                            <span style="width:213px; display:inline-block;">@nl2br($em['em_spec'])</span>
                        </td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $em['estimate_option'] ? '1px dashed #DADADA' : '2px solid #DADADA' }};"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $em['estimate_option'] ? '1px dashed #DADADA' : '2px solid #DADADA' }}; text-align:right;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $em['estimate_option'] ? '1px dashed #DADADA' : '2px solid #DADADA' }}; text-align:center;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $em['estimate_option'] ? '1px dashed #DADADA' : '2px solid #DADADA' }}; border-right:1px solid #DADADA; text-align:right;"></td>
                    </tr>


                @if ($em['estimate_option'])
                    @foreach ($em['estimate_option'] as $eo)
                    <tr>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $loop->last ? '2px solid #DADADA' : '1px dashed #DADADA' }}; text-align:center;"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $loop->last ? '2px solid #DADADA' : '1px dashed #DADADA' }};">{{$eo['eo_tit']}}: {{$eo['eo_name']}}</td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $loop->last ? '2px solid #DADADA' : '1px dashed #DADADA' }};"></td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $loop->last ? '2px solid #DADADA' : '1px dashed #DADADA' }}; text-align:right;">{{ number_format($eo['eo_price'])}}</td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $loop->last ? '2px solid #DADADA' : '1px dashed #DADADA' }}; text-align:center;">{{$eo['eo_ea']}}</td>
                        <td style="word-break: keep-all; word-wrap: break-word; padding:4px 7px; border-left:1px solid #DADADA; border-bottom: {{ $loop->last ? '2px solid #DADADA' : '1px dashed #DADADA' }}; border-right:1px solid #DADADA; text-align:right;">{{ number_format($eo['eo_price']*$eo['eo_ea']) }}</td>
                    </tr>
                    @endforeach
                @endif
@php
$no++;
@endphp
            @endforeach
                    <tr>
                        <th style='border:1px solid #DADADA; padding:4px 7px;'>추가정보</th>
                        <td colspan='5' style='border:1px solid #DADADA; padding:4px 7px; text-align:justify; word-break:keep-all; word-wrap:break-word;'>{{$er_content}}</td>
                    </tr>

                    <tr><td colspan="6" style="padding:4px 7px; border:2px solid #DADADA; border-left-width:1px; border-right-width:1px; text-align:right;"></td></tr>

                    <tr>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-left:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">SUPPLY PRICE</td>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-right:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">{{number_format($er_gd_price)}}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-left:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">V.A.T</td>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-right:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">{{ number_format($er_surtax) }}</td>
                    </tr>
                    @if ($er_no_dlvy_fee !== 'Y')
                    @if ($er_dlvy_price > 0)
                    <tr>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-left:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">배송료</td>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-right:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">{{ number_format($er_dlvy_price) }}</td>
                    </tr>
                    @endif
                    @if ($er_air_price)
                    <tr>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-left:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">항공운임료</td>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-right:1px solid #DADADA; border-bottom:1px dashed #DADADA; text-align:right;">{{ number_format($er_air_price) }}</td>
                    </tr>
                    @endif
                    @endif
                    <tr>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-left:1px solid #DADADA; border-bottom:2px solid #DADADA; text-align:right; font-weight:bold;">TOTAL AMOUNT</td>
                        <td colspan="3" style="padding:4px 7px; word-break:keep-all; word-wrap:break-word; border-right:1px solid #DADADA; border-bottom:2px solid #DADADA; text-align:right;">{{ number_format($er_all_price) }}</td>
                    </tr>
                </tbody>
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
            <!-- <a href="https://4science.net/shop/goods?ca01=36" target='_blank'>
                <img src="{{ asset('storage/event/2025/0320/estimate.jpg') }}" />
            </a> -->
           
        </td>
    </tr>
    <tr> 
        <td><img src="{{ asset('storage/common/email_bottom_960.jpg') }}" /></td>
    </tr>
</table>

</center>
</body>
</html>
