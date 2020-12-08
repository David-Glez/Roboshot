<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>RoboShot</title>
    <!--<link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">-->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('images/beer.svg')}}">
</head>

<body>
    <div id="App"></div>
    
</body>

<script src="{{ asset('js/app.js')}}"></script>

</html>