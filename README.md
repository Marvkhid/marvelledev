# MarvelleDev website

Next.js 15 (App Router) · React 19 · TypeScript · plain CSS variables (two themes) · zod · nodemailer. No paid services.

## Run locally
```bash
npm install
cp .env.example .env.local     # fill in what you need (see below)
npm run dev                     # http://localhost:3000
npm run typecheck && npm run build && npm start
```

## What is where
| Need to change… | Edit |
|---|---|
| Contact details, socials, projects, services, benefits, industries, workspace photos | `src/lib/site.ts` |
| What Marv AI knows, FAQs, suggested questions | `src/lib/knowledge.ts` (the only source of facts) |
| Marv AI rules / tone | `src/lib/prompts.ts` |
| Colours, both themes | `src/app/globals.css` (`:root` = Cloud Blue, `[data-theme="dark"]` = Midnight Black) |
| Degree wording used everywhere | `education` in `src/lib/site.ts` |

## Marv AI (free tier only)
1. Create a key at https://aistudio.google.com/apikey. **Do not enable billing.**
2. Put it in `.env.local` as `GEMINI_API_KEY`. The key stays on the server (`/api/chat`).
3. Default model `gemini-3.5-flash-lite` (listed as free of charge on Google's pricing page when this was built). Only models allowlisted in `src/lib/gemini.ts` can be used; visitors cannot choose a model.
4. If the key is missing, a request fails, a quota error occurs, or `CHAT_DAILY_AI_LIMIT` is reached, Marv AI answers from the local knowledge base (`src/lib/fallback.ts`). After a quota/provider error the AI is not called again for a cooldown period so free quota isn’t wasted.
5. Note: Google’s free tier may use prompts to improve its products. Visitors are not asked for sensitive data and chat history stays in the browser session.
6. Limits are subject to change. Check https://ai.google.dev/gemini-api/docs/rate-limits. In-memory rate limiting is per server instance (serverless instances don’t share memory); it reduces abuse but isn’t a global guarantee.

## Email (contact + referral forms)
Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Gmail: use an App Password), optionally `MAIL_TO`/`MAIL_FROM`. Until configured, the forms return an honest “not connected yet” error and never show fake success.

## CV
Put your PDF at `public/cv/Marvellous-Adeniyi-CV.pdf`. The “Download My CV” buttons use `/api/cv`.

## Project screenshots
Take real screenshots of the three live sites, save to `public/images/projects/<slug>.jpg` (`ng-law-digest`, `ee-studios`, `kova-shop`), then set `shot: '/images/projects/<slug>.jpg'` for each in `src/lib/site.ts`.

## Deploy (Vercel free tier)
Push to GitHub → import in Vercel → add the environment variables from `.env.example` → deploy. Set `NEXT_PUBLIC_SITE_URL` to your domain.

## Not built yet (honest list)
- Authenticated admin: CV upload/replace UI, knowledge-base editor, referral dashboard.
- Persistent storage for referrals (currently emailed). Add Postgres + Prisma (e.g. Neon free tier) when ready.
- Real project screenshots, verified social URLs (LinkedIn URL in `site.ts` needs confirming).
- Referral bonus terms (shown as “published once configured”).
