# Inversiones PyP

Landing mobile-first de captación de solicitudes de financiación. Ver
[`PROJECT_PLAN.md`](./PROJECT_PLAN.md) para arquitectura, reglas de negocio,
esquema de datos y decisiones de seguridad en detalle.

## Stack

React + TypeScript + Vite · Supabase (Postgres + RLS) · Vercel (hosting +
Serverless Functions) · React Router · Zod.

## Requisitos

- Node.js 20+
- Una cuenta/proyecto de Supabase
- Cuenta de Vercel (para deploy)

## Puesta en marcha local

```bash
npm install
cp .env.example .env
# completar .env con las credenciales del proyecto de Supabase
npm run dev
```

La app corre en `http://localhost:5173`.

> El endpoint `POST /api/prequalify` (Vercel Serverless Function) no lo sirve
> `vite dev`. Para probarlo localmente end-to-end usar `vercel dev` (requiere
> el [CLI de Vercel](https://vercel.com/docs/cli)) en vez de `npm run dev`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor de desarrollo de Vite |
| `npm run build` | typecheck (`tsc -b`, incluye `src/` y `api/`) + build de producción |
| `npm run preview` | sirve el build de producción localmente |
| `npm run lint` | Oxlint |

## Base de datos

El esquema y las políticas de RLS están versionados en
[`supabase/migrations/`](./supabase/migrations). Ver
[`supabase/README.md`](./supabase/README.md) para cómo aplicarlos.

## Variables de entorno

Ver [`.env.example`](./.env.example). Las variables sin prefijo `VITE_`
(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`) son secretas y
solo se usan dentro de `api/`; nunca deben cargarse con prefijo `VITE_` ni
usarse en código de `src/`.

## Estructura del proyecto

```
src/config/     configuración centralizada (marca, reglas de negocio, WhatsApp,
                localidades, opciones de formulario, analítica, legal, seguridad)
src/schemas/    esquemas Zod compartidos entre cliente y servidor
src/types/      tipos de base de datos y de dominio
src/features/   lógica de negocio (motor de clasificación automática)
src/pages/      páginas de React Router
src/components/ componentes de UI
api/            Vercel Serverless Functions (código de servidor, fuera del bundle del cliente)
supabase/       migraciones SQL
```

Detalle completo de cada carpeta en [`PROJECT_PLAN.md`](./PROJECT_PLAN.md).
