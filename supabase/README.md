# Supabase

Este proyecto usa el esquema definido en `migrations/20260710120000_init_schema.sql`.

## Aplicar la migración

Con el [CLI de Supabase](https://supabase.com/docs/guides/cli) instalado y el
proyecto vinculado (`supabase link --project-ref <ref>`):

```bash
supabase db push
```

O pegando el contenido del archivo `.sql` directamente en el SQL Editor del
dashboard de Supabase.

## Qué crea

- Tabla `prequalification_requests` con todos los datos de una solicitud:
  datos personales, situación laboral/financiera, consentimientos, UTM,
  resultado automático de precalificación y campos reservados para el futuro
  panel administrativo (`commercial_status`, `internal_notes`).
- Enums `prequalification_result` y `commercial_status`.
- Trigger que mantiene `updated_at` sincronizado.
- Row Level Security **habilitado y forzado, sin políticas**: por diseño,
  ningún rol (`anon`, `authenticated`) puede leer ni escribir directamente.
  Todo el acceso pasa por la función de servidor en `api/prequalify.ts`, que
  usa la `service_role key` (esta sí bypassea RLS).

## Panel administrativo futuro

Cuando se agregue un panel administrativo con autenticación de Supabase, alcanza con:

1. Crear un rol/tabla de administradores (o usar `auth.users` + una tabla `admin_users`).
2. Agregar políticas `select`/`update` sobre `prequalification_requests` restringidas a ese rol.
3. El panel podrá editar `commercial_status` e `internal_notes` sin tocar
   `prequalification_result` (resultado automático, no debe modificarse a mano).

No hace falta rehacer el esquema para esto.
