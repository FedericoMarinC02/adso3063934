# 🚀 Guía de Configuración - LaraAPI

## 📋 Cambios Realizados

### 1. **Token de 30 Caracteres** ✅
- **Archivo**: `app/Http/Controllers/API/AuthController.php`
- **Cambio**: De `Str::random(60)` a `Str::random(30)`
- El token ahora tiene exactamente 30 caracteres

### 2. **Campo Role para Administrador** ✅
- **Migration**: `database/migrations/0001_01_01_000000_create_users_table.php`
  - Agregado campo enum `role` con valores: 'admin' o 'user' (default: 'user')
- **Model**: `app/Models/User.php`
  - Agregado 'role' al fillable

### 3. **Respuestas Mejoradas para ApiDog** ✅
- **Archivo**: `app/Http/Middleware/CheckApiToken.php`
- Si no hay token: Retorna mensaje claro indicando que se requiere token
- Si el token es inválido: Retorna mensaje claro de token inválido/expirado

### 4. **Logout Mejorado** ✅
- **Archivo**: `app/Http/Controllers/API/AuthController.php`
- Destruye el token correctamente
- Retorna respuesta clara sobre la sesión cerrada

### 5. **Usuarios de Prueba** ✅
- **Archivo**: `database/seeders/DatabaseSeeder.php`
- Crea 2 usuarios:
  - **Admin**: email: `admin@example.com`, password: `password123`, role: `administrador`
  - **Customer**: email: `customer@example.com`, password: `password123`, role: `customer`

---

## ⚙️ Pasos para Ejecutar

### 1. Migrar la Base de Datos
```bash
php artisan migrate:fresh --seed
```
Este comando:
- Elimina todas las tablas y las recrea
- Ejecuta todos los seeders (crea los usuarios de prueba)

### 2. Iniciar el Servidor
```bash
php artisan serve
```
El servidor estará disponible en: `http://127.0.0.1:8000`

---

## 🔐 Flujo de Autenticación

### Login
```
POST http://127.0.0.1:8000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Respuesta:
{
  "token": "abc123def456...",  // 30 caracteres
  "token_type": "Bearer"
}
```

### Usar Token en Requests
Opción 1 - Header Authorization:
```
Authorization: Bearer <token>
```

Opción 2 - Parámetro token:
```
POST /api/pets/list?token=<token>
```

### Logout
```
POST http://127.0.0.1:8000/api/logout
Authorization: Bearer <token>

Respuesta:
{
  "status": "success",
  "message": "Sesión cerrada exitosamente",
  "details": "El token ha sido destruido..."
}
```

---

## 📱 Importar en ApiDog

1. Abre **ApiDog**
2. Haz clic en **Import** o **New Collection**
3. Selecciona **Import from File**
4. Elige el archivo: `apidog-collection.json` (en la raíz del proyecto)
5. ¡La colección se importará automáticamente!

### Usando Variables en ApiDog
- Después de hacer **Login**, copia el token
- En ApiDog, ve a **Variables** (parte superior)
- Pega el token en la variable `{{token}}`
- ¡Todos los requests protegidos usarán automáticamente ese token!

---

## 🧪 Escenarios de Prueba en ApiDog

### ✅ Escenario Correcto
1. **Login Admin** → Obtienes token (30 caracteres)
2. **List Pets** → Funciona (requiere token)
3. **Create Pet** → Funciona (requiere token)
4. **Update Pet** → Funciona (requiere token)
5. **Delete Pet** → Funciona (requiere token)
6. **Logout** → Token se destruye
7. **List Pets nuevamente** → ❌ Error 401 - Token requerido/inválido

### ❌ Sin Token
- Cualquier petición a `/api/pets/*` → Error 401
- Mensaje: "Token requerido - proporcione un token válido"

### ❌ Token Inválido
- Petición con token incorrecto → Error 401
- Mensaje: "Token inválido o expirado"

---

## 📝 Rutas Disponibles

| Método | Endpoint | Protección | Descripción |
|--------|----------|-----------|-------------|
| POST | `/api/login` | ❌ No | Inicia sesión |
| POST | `/api/logout` | ✅ Sí | Cierra sesión |
| GET | `/api/pets/list` | ✅ Sí | Lista mascotas |
| GET | `/api/pets/show/{id}` | ✅ Sí | Obtiene una mascota |
| POST | `/api/pets/store` | ✅ Sí | Crea mascota |
| PUT | `/api/pets/edit/{id}` | ✅ Sí | Actualiza mascota |
| DELETE | `/api/pets/delete{id}` | ✅ Sí | Elimina mascota |

---

## 🛠️ Archivos Modificados

```
21-larapi/
├── app/
│   ├── Http/
│   │   ├── Controllers/API/
│   │   │   └── AuthController.php ✏️ Token 30 caracteres + Logout mejorado
│   │   └── Middleware/
│   │       └── CheckApiToken.php ✏️ Respuestas mejoradas
│   └── Models/
│       └── User.php ✏️ Agregado 'role' al fillable
├── database/
│   ├── migrations/
│   │   └── 0001_01_01_000000_create_users_table.php ✏️ Agregado enum role
│   └── seeders/
│       └── DatabaseSeeder.php ✏️ Usuarios admin y user
└── apidog-collection.json 📄 NUEVO - Importar en ApiDog
```

---

## 💡 Notas Importantes

- **Token**: El token ahora tiene 30 caracteres como se solicitó
- **Role**: Aunque existe el campo role, los endpoints **NO están protegidos por rol** (todos los usuarios pueden acceder si tienen un token válido)
- **Logout Efectivo**: El logout destruye el token, bloqueando acceso futuro hasta login nuevamente
- **ApiDog Compatible**: Todos los endpoints están diseñados para funcionar perfectamente en ApiDog
- **Usuarios Seedeados**: Usa los usuarios creados en el seeder para pruebas

---

¡Sistema listo para usar! 🎉
