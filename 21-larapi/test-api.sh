#!/bin/bash
# Script de pruebas para LaraAPI
# Ejecuta estos comandos para probar el sistema

echo "=== PRUEBA 1: LOGIN ADMIN ==="
RESPONSE=$(curl -s -X POST http://127.0.0.1:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}')

echo "$RESPONSE" | jq .

# Extrae el token
TOKEN=$(echo "$RESPONSE" | jq -r '.token')
echo "Token obtenido: $TOKEN"
echo ""

echo "=== PRUEBA 2: LISTAR MASCOTAS (CON TOKEN) ==="
curl -s -X GET http://127.0.0.1:8000/api/pets/list \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

echo "=== PRUEBA 3: CREAR MASCOTA ==="
curl -s -X POST http://127.0.0.1:8000/api/pets/store \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Firulais",
    "kind":"Perro",
    "weight":20.5,
    "age":2,
    "breed":"Labrador",
    "location":"Bogotá",
    "description":"Perro muy amigable"
  }' | jq .
echo ""

echo "=== PRUEBA 4: LOGOUT (DESTRUIR TOKEN) ==="
curl -s -X POST http://127.0.0.1:8000/api/logout \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq .
echo ""

echo "=== PRUEBA 5: INTENTAR USAR TOKEN DESTRUIDO ==="
echo "Esperado: Error 401 - Token inválido"
curl -s -X GET http://127.0.0.1:8000/api/pets/list \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

echo "=== PRUEBA 6: REQUEST SIN TOKEN ==="
echo "Esperado: Error 401 - Token requerido"
curl -s -X GET http://127.0.0.1:8000/api/pets/list | jq .
echo ""

echo "✅ Todas las pruebas completadas"
