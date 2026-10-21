# Faheem Bilal — Premium Portfolio

Personal portfolio for **Faheem Bilal**, Senior Software Engineer | Senior Full-Stack Developer | AI & Cloud Architect (8+ years). Built with Next.js App Router — frontend and API routes in one deployable app.

This is **not** a CodesThinker company site. CodesThinker.com was used only as a research source for verified project links.

---

## Prerequisites

- **Node.js** 20.x or newer (LTS recommended)
- **npm** 10+ (comes with Node)
- **Git** (optional, for clone)
- Optional credentials:
  - AI: Gemini or Groq API key (`AI_PROVIDER` + `AI_API_KEY`)
  - Email: SMTP host/user/password for contact delivery

Without optional credentials, the site still runs. The AI assistant uses a verified knowledge fallback; the contact form validates and accepts messages but reports that email delivery is not configured.

---

## Option A — Download ZIP (no Git)

1. Open the GitHub repository (once connected): `https://github.com/<your-username>/faheem-bilal-portfolio`
2. Click **Code → Download ZIP**
3. Extract to a folder, e.g. `Desktop/faheem-bilal-portfolio`
4. Open that folder in Cursor or VS Code
5. In a terminal inside the folder:

```bash
npm install
copy .env.example .env.local
npm run dev
```

On macOS/Linux use `cp .env.example .env.local` instead of `copy`.

6. Open [http://localhost:3000](http://localhost:3000)

---

## Option B — Clone with Git

Once the repository URL exists:

```bash
git clone https://github.com/<your-username>/faheem-bilal-portfolio.git
cd faheem-bilal-portfolio
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Status:** No GitHub remote is connected from this machine yet. Use the local project folder on your Desktop (`porfolio`) until you authorize GitHub and create `faheem-bilal-portfolio` (private by default).

---

## Local commands

| Command | Purpose |
|--------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Development server (Turbopack) at port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Environment setup

1. Copy the template:

```bash
copy .env.example .env.local
```

2. Edit `.env.local` — never commit this file.

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL / SEO (e.g. `http://localhost:3000`) |
| `AI_PROVIDER` | Optional | `gemini` or `groq` |
| `AI_API_KEY` | Optional | Provider API key (server-only) |
| `AI_MODEL` | Optional | Model override |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Optional | Contact email delivery |
| `CONTACT_RECEIVER_EMAIL` | Optional | Defaults to `faheembilal7874@gmail.com` |
| `CONTACT_SENDER_EMAIL` | Optional | From address |
| `MONGODB_URI` | Optional | Persist contact messages; otherwise in-memory |

**Features without secrets**

- Full UI, projects, animations, SEO
- Faheem AI in **knowledge fallback** mode (`POST /api/assistant`)
- Contact validation + rate limit; response states email not delivered if SMTP is unset

---

## Project structure (actual)

```
porfolio/
├── public/
│   ├── images/profile/          # Portrait assets
│   ├── images/projects/         # Project thumbnails
│   ├── images/og/               # Open Graph image
│   └── resume/faheem-bilal.pdf
├── src/
│   ├── app/
│   │   ├── page.tsx             # Home (hero + highlights + featured)
│   │   ├── about/               # About + experience + skills
│   │   ├── projects/            # Portfolio grid + [slug] case studies
│   │   ├── assistant/           # Full-page Faheem AI
│   │   ├── contact/             # Contact form page
│   │   ├── api/
│   │   │   ├── assistant/       # AI chat (Gemini/Groq + fallback)
│   │   │   ├── chat/            # Legacy chat alias
│   │   │   ├── contact/         # Contact form backend
│   │   │   ├── health/          # Health check
│   │   │   ├── projects/        # Projects JSON API
│   │   │   └── blog/            # Blog JSON API
│   │   ├── layout.tsx           # Shell, nav, footer, chat widget
│   │   ├── globals.css          # Design tokens
│   │   ├── sitemap.ts / robots.ts
│   │   └── …redirect pages (experience, skills, designs → about/projects)
│   ├── components/
│   │   ├── chat/ChatWidget.tsx  # Floating Faheem AI
│   │   ├── contact/ContactForm.tsx
│   │   ├── layout/              # Navbar, Footer, ScrollProgress
│   │   ├── motion/FadeIn.tsx    # Scroll reveals
│   │   ├── projects/            # Cards + filters
│   │   └── ui/                  # Section, Button, ProfileAvatar
│   ├── config/site.ts           # Name, contact, nav, education
│   ├── data/                    # Projects, experience, skills, AI knowledge
│   ├── lib/                     # ai.ts, email.ts, db, rate-limit, utils
│   └── middleware.ts            # Security headers / rate helpers
├── docs/                        # Architecture, deployment, inventory
├── .env.example
├── package.json
└── README.md
```

---

## API endpoints (same origin)

| Method | Path | Notes |
|--------|------|-------|
| `POST` | `/api/assistant` | Portfolio AI chat |
| `POST` | `/api/contact` | Contact form |
| `GET` | `/api/health` | Liveness |
| `GET` | `/api/projects` | Project list JSON |
| `GET` | `/api/projects/[slug]` | Single project |

---

## Deploy (Vercel — recommended)

This app is a single Next.js project: UI + API routes deploy together.

1. Authorize Vercel: `npx vercel login` (browser OAuth — do not paste passwords here)
2. From the project root: `npx vercel` (preview) or `npx vercel --prod`
3. In the Vercel dashboard → **Settings → Environment Variables**, add the same keys as `.env.example` (production values)
4. Redeploy after adding secrets

**Current status from this environment:** Vercel CLI is **logged out**. Deployment cannot finish until you run `npx vercel login` and approve the project.

### GitHub

1. Install [GitHub CLI](https://cli.github.com/) or use GitHub Desktop / the website
2. Create a **private** repo named `faheem-bilal-portfolio`
3. From this folder:

```bash
git remote add origin https://github.com/<your-username>/faheem-bilal-portfolio.git
git add .
git commit -m "Add premium Faheem Bilal portfolio"
git branch -M main
git push -u origin main
```

4. Import that repo in Vercel for automatic deploys on push

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npx next dev -p 3001` or stop the other process |
| Missing modules | Delete `node_modules` + `package-lock.json`, run `npm install` |
| AI always in fallback | Set `AI_PROVIDER` + `AI_API_KEY` in `.env.local`, restart `npm run dev` |
| Contact says email not configured | Expected until SMTP vars are set; form still validates |
| Build fails (`.next` errors on Windows) | Delete the `.next` folder, run `npm run build` again |
| Images 404 | Confirm files exist under `public/images/` |
| Secrets in Git | Ensure `.env.local` is ignored (see `.gitignore`) |

---

## Contact

- Email: faheembilal7874@gmail.com  
- Phone / WhatsApp: +92 305 7874388  
- LinkedIn: https://www.linkedin.com/in/faheem-bilal-dev/

---

## License

Private personal portfolio. All rights reserved unless you choose otherwise.
