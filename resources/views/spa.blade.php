<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <!-- <meta name="viewport" content="width=1500, initial-scale=1"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <!-- no cache 설정 -->
    <!-- <meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT">
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache"> -->

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <!-- <meta http-equiv="Cache-control" content="public" /> -->
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', '4SCIENCE') }}</title>
    

    <!-- <script src="{{ ver_asset('js/app.js') }}"></script> -->
    <script src="{{ mix('js/app.js') }}"></script>
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet" /> -->
    
    <!-- Uncaught SyntaxError: Unexpected token '<' (at undefined:1:1)
    npm run production 을 하여 웹 배포시 
    홈페이지 메인 파일인 index 파일이 브라우저의 캐시 상태이기에 배포 바로 이전 버전의 파일이다
    여기에 새로운 js 파일을 임베드 하여 생기는 캐이 오류를 해결하기 위한 태그
    -->
    <base href="/">
    <!-- 구글링 결과로 정확한 이유는 모른다. -->
</head>
<body>
    <div id="app"></div>
</body>
</html>
