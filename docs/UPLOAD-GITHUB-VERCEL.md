# GitHub + Vercel upload (aapka account)

Is machine se login nahi ho saka. Neeche steps aapke `faheem74` account ke liye hain.

## 1) GitHub pe naya private repo banao

1. Browser: https://github.com/new
2. Owner: **faheem74**
3. Repository name: **faheem-bilal-portfolio** (ya jo naam aap chaho)
4. Visibility: **Private** (recommended)
5. **Do not** add README / .gitignore (project pehle se ready hai)
6. Create repository

## 2) Code push karo (PowerShell / Git Bash)

```bash
cd "C:\Users\Faheem\OneDrive\Desktop\porfolio"
git remote remove origin
git remote add origin https://github.com/faheem74/faheem-bilal-portfolio.git
git branch -M main
git push -u origin main
```

GitHub login / Personal Access Token maangega — password chat me mat bhejo.

## 3) Vercel pe deploy

1. https://vercel.com/faheem74 pe login
2. **Add New → Project**
3. Import **faheem-bilal-portfolio**
4. Framework: Next.js (auto)
5. Environment Variables (optional):

```
AI_PROVIDER=gemini
AI_API_KEY=your_key_here
CONTACT_RECEIVER_EMAIL=faheembilal7874@gmail.com
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

6. Deploy

Ya CLI:

```bash
npx vercel login
npx vercel --prod
```

## 4) Local ZIP (already on Desktop)

`C:\Users\Faheem\OneDrive\Desktop\faheem-bilal-portfolio.zip`

Extract → `npm install` → `copy .env.example .env.local` → `npm run dev`
