# 🪟 Guía de Ejecución en Windows - LaraAPI

## Requisitos Previos
- PHP 8.1+
- Composer
- SQLite o MySQL
- Un cliente REST (Postman, Apidog, etc.)

---

## 📦 Instalación Inicial (si es la primera vez)

### 1. Navegar a la carpeta del proyecto
```powershell
cd "C:\Users\Federico\OneDrive\Desktop\adso3063934\21-larapi"
```

### 2. Instalar dependencias
```powershell
composer install
```

### 3. Crear archivo .env
```powershell
copy .env.example .env
```

### 4. Generar clave de aplicación
```powershell
php artisan key:generate
```

### 5. Configurar base de datos (si usas SQLite)
En el archivo `.env`, asegúrate de tener:
```
DB_CONNECTION=sqlite
# Comentar las líneas de MySQL si las hay
```

---

## 🚀 Ejecutar el Proyecto

### Opción 1: Migrar y Seedear (PRIMERO)
```powershell
php artisan migrate:fresh --seed
```

**Esto hará:**
- Elimina y recrea todas las tablas
- Crea los usuarios de prueba:
  - Admin: `admin@example.com` / `password123` (role: administrador)
  - Customer: `customer@example.com` / `password123` (role: customer)

### Opción 2: Iniciar el servidor
Abre una nueva ventana de PowerShell y ejecuta:
```powershell
cd "C:\Users\Federico\OneDrive\Desktop\adso3063934\21-larapi"
php artisan serve
```

Verás algo como:
```
   INFO  Server running on [http://127.0.0.1:8000].

   Press Ctrl+C to stop the server
```

---

## 🧪 Pruebas con Postman/ApiDog

### Importar Colección
1. Abre **ApiDog** o **Postman**
2. Click en **Import**
3. Selecciona archivo: `apidog-collection.json` (en la carpeta del proyecto)
4. ¡La colección se importará automáticamente!

### Primer Test: Login
1. En ApiDog, ve a **Auth → Login Admin**
2. Click en **Send**
3. Deberías ver la respuesta con el token (30 caracteres)
4. Copia el token

### Usar el Token
1. Ve a **Variables** (en la parte superior de ApiDog)
2. En el campo `token`, pega el token que copiaste
3. Ahora ejecuta cualquier otro endpoint (List Pets, Create Pet, etc.)
4. ¡Funcionarán automáticamente!

---

## 🔍 Pruebas Rápidas con cURL (en PowerShell)

### 1. LOGIN
```powershell
$response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"admin@example.com","password":"password123"}'

$response.Content | ConvertFrom-Json
```

### 2. COPIAR TOKEN
```powershell
$token = ($response.Content | ConvertFrom-Json).token
Write-Host "Token: $token"
```

### 3. USAR TOKEN EN PETICIÓN
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/pets/list" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"} | Select-Object -ExpandProperty Content
```

### 4. LOGOUT
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/logout" `
  -Method POST `
  -Headers @{"Authorization"="Bearer $token";"Content-Type"="application/json"} | Select-Object -ExpandProperty Content
```

### 5. INTENTAR USAR TOKEN DESTRUIDO
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/pets/list" `
  -Method GET `
  -Headers @{"Authorization"="Bearer $token"}
```
Deberías ver: "Token inválido o expirado"

---

## 📋 Flujo Completo de Prueba

```
1. Abre PowerShell
   ↓
2. php artisan migrate:fresh --seed
   ↓
3. php artisan serve
   ↓
4. Abre ApiDog
   ↓
5. Importa apidog-collection.json
   ↓
6. Ejecuta "Login Admin"
   ↓
7. Copia el token a {{token}} en Variables
   ↓
8. Prueba todos los endpoints
   ↓
9. Ejecuta "Logout"
   ↓
10. Intenta nuevamente un endpoint → Error 401
```

---

## 🐛 Solución de Problemas

### Error: "No such file or directory"
- Verifica que estés en la carpeta correcta:
  ```powershell
  Get-Location
  ```
- Deberías estar en: `C:\Users\Federico\OneDrive\Desktop\adso3063934\21-larapi`

### Error: "Class not found"
- Ejecuta: `composer install`
- Luego: `php artisan clear-cache`

### Error: "SQLSTATE[HY000]"
- Verifica que `.env` tenga configuración de base de datos correcta
- Para SQLite:
  ```
  DB_CONNECTION=sqlite
  DB_DATABASE=database.sqlite
  ```

### Port 8000 already in use
- Especifica otro puerto:
  ```powershell
  php artisan serve --port=8001
  ```
- Luego accede a: `http://127.0.0.1:8001`

### Token vacío en respuesta
- Verifica que la migración se haya ejecutado correctamente
- Ejecuta: `php artisan migrate:fresh --seed`

---

## 📱 Ejemplo de Respuesta

### Login Exitoso
```json
{
  "status": "success",
  "message": "Sesión iniciada correctamente",
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Sin Token
```json
{
  "status": "error",
  "message": "Token requerido - proporcione un token válido",
  "details": "Envíe el token en el header Authorization: Bearer <token>..."
}
```

### Token Inválido
```json
{
  "status": "error",
  "message": "Token inválido o expirado",
  "details": "El token proporcionado no existe o ha sido invalidado..."
}
```

### Logout Exitoso
```json
{
  "status": "success",
  "message": "Sesión cerrada exitosamente",
  "details": "El token ha sido destruido..."
}
```

---

## ✅ Checklist de Verificación

- [ ] Ejecutaste `php artisan migrate:fresh --seed`
- [ ] El servidor está corriendo: `php artisan serve`
- [ ] Importaste `apidog-collection.json` en ApiDog
- [ ] Login funciona y devuelve token de 30 caracteres
- [ ] Copiaste el token a `{{token}}` en Variables
- [ ] Pets List funciona con token válido
- [ ] Logout funciona y destruye el token
- [ ] Pets List falla después de logout (Error 401)
- [ ] El rol del usuario aparece en la respuesta de login

---

¡Si todo está verde, el sistema está listo para usar! 🎉

Para dudas o problemas, revisa los archivos:
- `SETUP_GUIDE.md` - Guía general
- `SYSTEM_SUMMARY.md` - Resumen del sistema
