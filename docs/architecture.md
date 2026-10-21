# Architecture

## Overview

Single Next.js 15 App Router application hosting:

- Marketing / portfolio pages (SSR/SSG)
- REST API route handlers under `src/app/api`
- Floating AI chatbot (client UI + server `/api/chat`)

This free-tier-first design avoids a separate NestJS process on day one while keeping a clean module boundary for a future split.

## Layers

```
Browser
  → App Router pages + shared UI
  → /api/* route handlers
       → Zod validation
       → Rate limiting
       → Data (seed modules or MongoDB)
       → Optional SMTP / AI providers
```

## Key modules

| Path | Role |
|------|------|
| `src/config/site.ts` | Personal/professional constants |
| `src/data/*` | Projects, blog, skills, services, chat knowledge |
| `src/lib/db.ts` | Mongo when configured, else memory store |
| `src/lib/email.ts` | Nodemailer SMTP transport |
| `src/lib/ai.ts` | Gemini / Groq abstraction + FAQ fallback |
| `src/components/*` | UI, layout, chat, contact |

## Data honesty

Projects marked `display: true` only when a recoverable source exists. Destinkpit is live; Fast Ride is Figma-only. Missing apps stay in `docs/project-inventory.md` as Information Required.

## Security posture

- Secrets only in server env vars
- Contact honeypot + rate limits
- Chat input size limits + rate limits
- Security headers via `src/middleware.ts`
- No public admin registration in v1
