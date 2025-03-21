<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', '4SCIENCE') }}</title>    
    <meta http-equiv="Cache-control" content="public" />
    <style>
        body { text-align:center; }
    </style>
</head>
<body onload="window.print()">
@if ($code === 'w')
    <img src="{{ asset('storage/mypage/print/bankbook_w.jpg') }}" width="652px" />
@elseif ($code === 'k')
    <img src="{{ asset('storage/mypage/print/bankbook_k.png') }}" width="530px" />
@else
    <img src="{{ asset('storage/mypage/print/license200921.jpg') }}" width="100%" />
@endif    
    
</body>
</html>
