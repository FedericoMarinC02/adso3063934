<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <style>body{font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}form{width:320px;padding:24px;border:1px solid #ddd;border-radius:6px}.error{color:red;font-size:12px;margin-top:4px}</style>
</head>
<body>
    <form method="POST" action="/login">
        @csrf
        <h2>Iniciar sesión</h2>
        @if ($errors->any())
            <div style="color:red;margin-bottom:12px">
                @foreach ($errors->all() as $error)
                    <p style="margin:0">{{ $error }}</p>
                @endforeach
            </div>
        @endif
        @if(session('status'))
            <div style="color:green">{{ session('status') }}</div>
        @endif
        <div style="margin-top:12px">
            <label>Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required style="width:100%;padding:8px;margin-top:6px;box-sizing:border-box">
            @error('email')<div class="error">{{ $message }}</div>@enderror
        </div>
        <div style="margin-top:12px">
            <label>Password</label>
            <input type="password" name="password" required style="width:100%;padding:8px;margin-top:6px;box-sizing:border-box">
            @error('password')<div class="error">{{ $message }}</div>@enderror
        </div>
        <div style="margin-top:16px">
            <button type="submit" style="padding:10px 14px">Entrar</button>
        </div>
    </form>
</body>
</html>
