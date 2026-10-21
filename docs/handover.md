# Final Handover — Faheem Bilal Portfolio (5-Section)

Date: 2026-10-21

## Public URLs

| Item | Status |
|------|--------|
| Local | http://localhost:3000 |
| Live deploy | **Blocked** — run `npx vercel login` then `npx vercel --prod` |
| GitHub repo | **Blocked** — no remote; install/auth `gh` or add remote manually |
| Backend | Same app (`/api/contact`, `/api/assistant`) |

## Five primary sections

1. **Home** — `/`
2. **About** — `/about` (summary + experience + education + skills)
3. **Projects** — `/projects` (12 curated verified projects)
4. **AI Assistant** — `/assistant` + floating Faheem AI
5. **Contact** — `/contact`

Legacy routes redirect: `/experience`, `/skills` → About anchors; `/designs` → Projects.

## 12 verified projects (displayed)

1. Destinkpit — https://destinkpit.shop/
2. Linkway Rides — https://linkwayrides.com/
3. Al Tamakon — https://tamakon.in/
4. Empower Zone — https://empowerzone.us/
5. Al-Hafiz — https://a-hafiz.com/
6. Akoya — https://akoyaluxureylaundry.com/
7. Novietaa Plus — https://novietaaplus.com/
8. The Givers — https://thegiversconsulting.com/
9. Pure Fitness Africa — Google Play
10. Fast Ride — Figma
11. STMCZ — Figma
12. Yes Time — Figma

Additional researched items (Vista, Turbo, BMX, more Figma) remain in data with `display: false`.

## Photograph

`public/images/profile/faheem.png` — in use (hero, about, AI header).

## Animations

Hero stagger, scroll reveals, project hover zoom/lift, filter layout motion, button micro-interactions, scroll progress, chat open/close, typing indicator, reduced-motion support. See `docs/animation-research.md`.

## Contact & AI

| Feature | Status |
|---------|--------|
| Contact API validation | Implemented & tested |
| Email send | Awaiting `SMTP_*` |
| Faheem AI fallback | Implemented & tested |
| Live LLM | Awaiting `AI_PROVIDER` + `AI_API_KEY` |

## Env vars (names only)

`NEXT_PUBLIC_SITE_URL`, `MONGODB_URI`, `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`, `CONTACT_SENDER_EMAIL`

## Your remaining steps

```bash
npx vercel login
npx vercel --prod
# optional:
# gh auth login
# gh repo create faheem-bilal-portfolio --private --source=. --push
```

Then set env vars in the Vercel dashboard and re-deploy.
