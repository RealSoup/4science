<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <!-- <meta name="viewport" content="width=1500, initial-scale=1"> -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', '4SCIENCE') }}</title>
    
    <meta http-equiv="Cache-control" content="public" />

    <script src="{{ ver_asset('js/app.js') }}"></script>
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet" /> -->
</head>
<body>
    <div id="app"></div>
</body>
</html>
