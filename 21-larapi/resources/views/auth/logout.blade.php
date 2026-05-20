<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Logout</title>
    <style>body{font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}div{width:640px;padding:24px;border:1px solid #ddd;border-radius:6px}</style>
</head>
<body>
    <div>
        <h2>Sesión iniciada</h2>
        @if(session('api_token'))
            <p>Token (guárdalo): <strong>{{ session('api_token') }}</strong></p>
        @else
            <p>No se encontró token en la sesión. Si iniciaste desde API, usa el endpoint `/api/login`.</p>
        @endif

        <form method="POST" action="/logout" style="margin-top:16px">
            @csrf
            <input type="hidden" name="token" value="{{ session('api_token') }}">
            <button type="submit" style="padding:10px 14px">Cerrar sesión</button>
        </form>
    </div>
</body>
</html>
