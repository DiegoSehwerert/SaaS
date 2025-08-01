# ProConnect - Credenciales de Administrador

## Usuario Administrador por Defecto

Después de ejecutar las migraciones y el seeder, tendrás acceso a:

**📧 Email:** `admin@proconnect.com`  
**🔑 Contraseña:** `admin12345678Aa`  
**🛡️ Rol:** Administrador

## Comandos Útiles

### Ejecutar seeder

```bash
# Desde la raíz del proyecto
pnpm run db:seed

# O desde apps/api
cd apps/api && pnpm run db:seed
```

### Resetear base de datos y ejecutar seeder

```bash
# Desde la raíz del proyecto
pnpm run db:reset

# Esto hará:
# 1. Resetear la base de datos
# 2. Ejecutar migraciones
# 3. Ejecutar seeder (crear admin)
```

## Acceso al Panel de Administración

1. Inicia los servidores: `pnpm run dev`
2. Ve a http://localhost:3000/auth/login
3. Usa las credenciales de admin arriba
4. Serás redirigido automáticamente a `/admin`

## Notas de Seguridad

⚠️ **IMPORTANTE:** Cambia la contraseña del administrador en producción.

El seeder solo crea el usuario admin si no existe uno ya. Si quieres recrearlo:

1. Elimina el usuario admin existente
2. Ejecuta el seeder nuevamente

## Estructura de Roles

- **ADMIN**: Panel de administración completo
- **MANAGER**: Profesionales (entrenadores, psicólogos, etc.)
- **USER**: Clientes que buscan servicios
