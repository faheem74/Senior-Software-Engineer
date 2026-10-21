# API Documentation

Base path: `/api`

All JSON responses use:

```json
{ "success": true, "data": {}, "meta": {} }
```

or

```json
{ "success": false, "error": { "message": "", "code": "", "details": {} } }
```

## GET /api/health

Returns service status and configuration flags (no secrets).

## GET /api/projects

Query: `page`, `limit`, `category`

Returns visible portfolio projects with pagination meta.

## GET /api/projects/:slug

Returns one project or 404.

## GET /api/blog

Query: `page`, `limit`

## GET /api/blog/:slug

Returns one article or 404.

## POST /api/contact

Body:

```json
{
  "name": "string",
  "email": "string",
  "projectType": "string",
  "budget": "string?",
  "timeline": "string?",
  "message": "string",
  "website": "honeypot — leave empty"
}
```

Behavior:

1. Validates with Zod
2. Rate limits (~5 / minute / IP)
3. Ignores honeypot submissions silently
4. Attempts email when SMTP configured
5. Stores message (MongoDB or memory)
6. Returns accurate `emailDelivered` flag

## POST /api/chat

Body:

```json
{ "message": "string" }
```

Behavior:

1. Validates length
2. Rate limits (~20 / minute / IP)
3. Uses AI provider when `AI_PROVIDER` + `AI_API_KEY` set
4. Otherwise returns FAQ / knowledge fallback
5. Never pretends AI is online when it is not

Supported providers: `gemini`, `groq`
