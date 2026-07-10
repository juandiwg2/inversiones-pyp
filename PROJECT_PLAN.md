# Inversiones PyP — Plan del proyecto

## Objetivo de la primera etapa

Landing mobile-first de captación de solicitudes de financiación, sin panel
administrativo propio. Flujo:

```
Visita → Formulario de precalificación → Validación en servidor →
Guardado en Supabase → Resultado → WhatsApp (solo si corresponde)
```

Las solicitudes se revisan, en esta etapa, directamente desde el dashboard de
Supabase.

## Stack

React + TypeScript + Vite, Supabase (Postgres + RLS), Vercel (hosting +
Serverless Functions), React Router, Zod. Sin librerías adicionales de UI,
formularios ni estado: el formulario se controla con hooks nativos de React
para no sumar dependencias que esta etapa no necesita.

## Arquitectura de carpetas

```
src/
  config/         Fuente única de verdad de todo lo configurable:
                    brand.ts            nombre, tagline, URL del sitio, contacto
                    business-rules.ts   edad mínima, monto min/max, antigüedad
                    locations.ts        localidades admitidas (Zona Oeste GBA)
                    form-options.ts     catálogos de selects del formulario
                    whatsapp.ts         teléfono + mensaje predefinido
                    analytics.ts        IDs de GA4 / GTM / Meta Pixel
                    legal.ts            textos legales (pendientes) y consentimientos
                    security.ts         honeypot y umbrales de rate limiting
  schemas/        Esquemas Zod compartidos entre cliente y servidor
                    prequalification.schema.ts  campos del formulario
                    utm.schema.ts               parámetros UTM
                    submission.schema.ts        payload completo enviado al servidor
  types/
                    database.types.ts   tipos que reflejan el esquema SQL de Supabase
                    domain.types.ts     tipos de dominio derivados de los esquemas Zod
  features/
    prequalification/
                    classification.ts  motor de clasificación automática (compatible /
                                        manual_review / not_compatible), única
                                        implementación de las reglas de negocio
  components/
    layout/         Layout, FooterLegal (footer legal presente en toda la app)
    sections/        (siguiente etapa) Hero, HowItWorks, Requirements, Modalities,
                     TargetAudience, FAQ, PrequalificationForm
  pages/            HomePage, PrivacyPolicyPage, TermsPage, NotFoundPage
  lib/              (siguiente etapa) utilidades de cliente: captura de UTM,
                     carga de scripts de analítica, etc.

api/                Vercel Serverless Functions (fuera de src/: no se bundlean
                    con Vite ni llegan al navegador)
  prequalify.ts     único endpoint de escritura: valida, sanitiza, clasifica,
                    aplica rate limiting/antispam e inserta en Supabase
  _lib/             supabaseAdmin, sanitize, phone, ipHash, publicCode, rateLimit

supabase/
  migrations/       migraciones SQL versionadas (schema + RLS)
  README.md         cómo aplicar la migración y extender a futuro panel admin
```

**Por qué el frontend nunca importa `@supabase/supabase-js`:** en esta etapa
el navegador no necesita hablar con Supabase en absoluto. Todo pasa por
`POST /api/prequalify`, que corre en el servidor con la `service_role key`.
Esto simplifica RLS (se puede negar todo por defecto) y elimina una clase
entera de errores de configuración de policies para el cliente público.

## Reglas de negocio (centralizadas en `src/config/business-rules.ts`)

| Regla | Valor | Resultado |
|---|---|---|
| Edad mínima | 18 años | `not_compatible` si no se cumple |
| Zona admitida | Zona Oeste del GBA (`src/config/locations.ts`) | `not_compatible` si no se cumple |
| Monto solicitado | ARS 100.000 – 500.000 | límite duro del formulario (Zod) |
| Comprobación de ingresos | obligatoria | `not_compatible` si elige "no puedo comprobar" |
| Antigüedad < 3 meses | — | `not_compatible` |
| Antigüedad 3–11 meses | — | `manual_review` |
| Antigüedad ≥ 12 meses | — | `compatible`, si el resto de las reglas se cumple |

La prioridad de evaluación (`src/features/prequalification/classification.ts`)
es: cualquier motivo de `not_compatible` gana sobre todo lo demás; si no hay
ninguno, la antigüedad decide entre `manual_review` y `compatible`.

## Esquema de datos (Supabase)

Una sola tabla, `prequalification_requests`, con las columnas agrupadas por
responsabilidad para poder sumar un panel administrativo después sin rehacer
nada:

- **Identidad**: `id`, `public_code` (código mostrado al usuario), `idempotency_key`.
- **Datos personales**: `full_name`, `birth_date`, `locality`, `phone`, `email`.
- **Situación laboral/financiera**: `employment_type`, `activity_type`,
  `seniority_months`, `monthly_income`, `income_proof_type`,
  `requested_amount`, `preferred_modality`, `funds_purpose`, `observations`.
- **Consentimientos**: `accepted_truthfulness(_at)`, `accepted_consent(_at)`.
- **UTM** (sin datos personales): `utm_source/medium/campaign/term/content`, `landing_path`.
- **Resultado automático** (inmutable, calculado por el servidor):
  `prequalification_result`, `prequalification_reasons`, `whatsapp_enabled`.
- **Estado comercial manual futuro** (independiente del resultado automático):
  `commercial_status` (default `pending`), `internal_notes`.
- **Antiabuso**: `ip_hash` (hash, no la IP en texto plano), `user_agent`.
- **Auditoría**: `created_at`, `updated_at` (mantenido por trigger).

Detalle completo en `supabase/migrations/20260710120000_init_schema.sql`.

## Seguridad

- RLS habilitado y **forzado**, sin ninguna policy para `anon`/`authenticated`
  → acceso denegado por defecto desde cualquier cliente público.
- La `service_role key` vive solo en la variable de entorno de servidor
  `SUPABASE_SERVICE_ROLE_KEY` (sin prefijo `VITE_`), por lo que Vite nunca
  puede incluirla en el bundle del navegador.
- Toda escritura pasa por `api/prequalify.ts`, que:
  - vuelve a validar el payload completo con Zod (nunca confía en la
    validación del cliente),
  - sanitiza todo texto libre (`sanitizeText`) antes de guardarlo,
  - normaliza el teléfono a formato internacional,
  - protege contra doble envío vía `idempotency_key` (uuid generado en el
    cliente antes de enviar),
  - aplica rate limiting simple por teléfono e IP (hasheada) usando la propia
    tabla, sin infraestructura adicional,
  - incluye un campo honeypot (`SECURITY_CONFIG.honeypotFieldName`) para
    descartar envíos de bots sin revelar la detección,
  - nunca loguea datos personales (solo códigos de error).
- El mensaje de WhatsApp solo lleva el código público de la solicitud; nunca
  nombre, localidad, monto, ingresos ni ningún otro dato personal.
- No se envían datos personales a GA4/GTM/Meta Pixel: solo eventos anónimos
  (a implementar en la próxima etapa).

### Rate limiting: alcance y riesgo aceptado

El control de abuso (`api/_lib/rateLimit.ts`) **persiste en Postgres, no en
memoria del proceso**: en cada envío corre dos `COUNT(*)` reales contra
`prequalification_requests` (uno por teléfono normalizado, otro por
`ip_hash`), acotados a los últimos `windowMinutes` (`SECURITY_CONFIG.rateLimit`
en `src/config/security.ts`). No usa `Map`, variable global ni ningún estado
en memoria de la función serverless, así que el conteo es correcto sin
importar qué instancia de Vercel atienda cada request, incluso tras un cold
start. Los índices compuestos `(phone, created_at)` e `(ip_hash, created_at)`
que necesitan estas consultas ya están creados en la migración inicial
(`prequalification_requests_phone_created_at_idx`,
`prequalification_requests_ip_hash_created_at_idx`); no hizo falta agregar
ninguno nuevo.

Límites vigentes (no modificar sin decisión explícita): **2 solicitudes por
teléfono** y **5 por IP** cada **10 minutos**.

Es un patrón *check-then-act*, no atómico: el `SELECT COUNT` y el `INSERT`
final no corren en la misma transacción, por lo que bajo concurrencia extrema
(varias requests verdaderamente simultáneas del mismo teléfono/IP) es posible
que más de una pase el chequeo antes de que cualquiera haya insertado
todavía, permitiendo colarse por encima del límite nominal. **Se acepta este
riesgo para la primera etapa**: el volumen esperado es tráfico humano de una
landing, no un ataque coordinado con requests paralelas exactas, y no
justifica sumar infraestructura adicional todavía.

Mejora futura si el volumen o el riesgo lo justifican: mover el chequeo y el
insert a una función RPC transaccional de Postgres (atómica dentro de la
misma transacción), o reemplazar este mecanismo por un rate limiter externo
atómico (ej. Upstash Redis con `INCR`/TTL). Ninguna de las dos se implementa
en esta etapa.

## Variables de entorno

Ver `.env.example`. Resumen:

**Servidor** (nunca con prefijo `VITE_`): `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`.

**Cliente** (prefijo `VITE_`, públicas por diseño): `VITE_SITE_URL`,
`VITE_WHATSAPP_PHONE`, `VITE_GA4_MEASUREMENT_ID`, `VITE_GTM_CONTAINER_ID`,
`VITE_META_PIXEL_ID`.

## Estado actual (bootstrap)

Hecho en esta etapa:

- Proyecto React + TypeScript + Vite inicializado, modo `strict` habilitado
  en los tres tsconfig (app/node/api).
- Arquitectura de carpetas creada.
- Configuración centralizada completa (marca, reglas de negocio, localidades,
  opciones de formulario, WhatsApp, analítica, legal, seguridad).
- Tipos de base de datos y de dominio.
- Esquemas Zod compartidos (formulario, UTM, payload de envío).
- Motor de clasificación automática, puro y testeable.
- Migración SQL inicial con RLS.
- Endpoint serverless `api/prequalify.ts` funcional end-to-end (validación,
  sanitización, normalización, rate limiting, honeypot, idempotencia,
  clasificación e inserción).
- Esqueleto de router con páginas placeholder (Home, Privacidad, Términos, 404)
  y footer legal, sin estilos definitivos.

Pendiente para la siguiente etapa (fuera del alcance de este bootstrap):

- Implementación visual completa de la landing (Hero, Cómo funciona,
  Requisitos, Modalidades, A quién está dirigido, FAQ) y del formulario de
  precalificación conectado a `POST /api/prequalify`.
- Sistema de diseño / estilos mobile-first definitivos.
- Redacción real de Política de Privacidad y Términos y Condiciones
  (`src/config/legal.ts` tiene placeholders explícitos).
- Carga de GA4, GTM y Meta Pixel (los IDs ya están centralizados en
  `src/config/analytics.ts`, falta la integración de scripts/eventos).
- `robots.txt`, `sitemap.xml`, Open Graph, favicon de marca definitivo.
- Captura y persistencia de parámetros UTM desde la URL (`src/lib/utm.ts`).
- Alta en Supabase/Vercel real y configuración de variables de entorno en
  el dashboard de Vercel.
- Revisar el normalizador de teléfono (`api/_lib/phone.ts`) con casos reales
  de números de Zona Oeste antes de production (es una heurística simple,
  no un parser completo tipo libphonenumber).
