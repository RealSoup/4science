<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <!-- <meta name="viewport" content="width=1500, initial-scale=1"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <!-- no cache 설정 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <!-- <meta http-equiv="Cache-control" content="public" /> -->
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', '4SCIENCE') }}</title>
    

    <!-- <script src="{{ ver_asset('js/app.js') }}"></script> -->
    <script src="{{ mix('js/app.js') }}" async defer></script>
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet" /> -->
    
    <!-- Uncaught SyntaxError: Unexpected token '<' (at undefined:1:1)
    npm run production 을 하여 웹 배포시 
    홈페이지 메인 파일인 index 파일이 브라우저의 캐시 상태이기에 배포 바로 이전 버전의 파일이다
    여기에 새로운 js 파일을 임베드 하여 생기는 캐이 오류를 해결하기 위한 태그
    -->
    
    <!-- 구글링 결과로 정확한 이유는 모른다. -->
    <base href="/">
    
    <!-- Google Tag Manager -->
    <!-- <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NJK884V');</script> -->
    <!-- End Google Tag Manager -->
</head>
<body>
    <div id="app"></div>
    
    <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
    <script>
        /* 네이버 분석 관련 스크립트 */
        if(!wcs_add) var wcs_add = {};
        wcs_add["wa"] = "s_256b3162e372";
        if (!_nasa) var _nasa={};
        if (window.wcs) {
            wcs.inflow();
            wcs_do(_nasa);
        }
    </script>
</body>
</html>
