# Deployment Guide

## Recommended free-tier path

1. **Frontend + API:** Vercel (Next.js eligible hobby plan)
2. **Database (optional):** MongoDB Atlas free cluster (M0) — subject to current Atlas limits
3. **AI (optional):** Google Gemini or Groq free quota — verify eligibility and commercial terms
4. **Email (optional):** Resend free tier or SMTP provider — domain verification may be required

Free tiers can change. Re-check provider docs before relying on them for production traffic.

## Local run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Vercel deploy

1. Push the repository to GitHub
2. Import the project in Vercel
3. Set environment variables from `.env.example`
4. Deploy
5. Later connect `faheembilal.com` (or another purchased domain) in Vercel Domains

### Domain notes

- A provider subdomain (e.g. `*.vercel.app`) is free with hosting
- A custom `.com` domain requires registration fees and DNS configuration
- Do not purchase domains automatically from this repo
- Application code uses `NEXT_PUBLIC_SITE_URL` so swapping domains does not require a redesign

## Environment checklist

| Variable | Required to launch | Notes |
|----------|--------------------|-------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical SEO URL |
| `MONGODB_URI` | No | Falls back to memory store |
| `AI_PROVIDER` + `AI_API_KEY` | No | FAQ fallback works without keys |
| SMTP_* | No | Messages still store; email marked undelivered |

## Cold starts / limits

Serverless hosts may cold-start API routes. In-memory contact storage does not survive across instances — configure MongoDB for durable messages.

## Troubleshooting

- **Build fails:** run `npm run build` locally and fix TypeScript/ESLint errors
- **Images broken:** confirm files exist under `public/images`
- **Contact “stored but email failed”:** expected when SMTP is unset
- **Chat uses FAQ:** expected when AI keys are unset
- **CORS issues:** set `NEXT_PUBLIC_SITE_URL` to the exact production origin
