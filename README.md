# MarvelleDev

Portfolio for **Marvel Adeniyi**, full-stack software developer.
Next.js 15 (App Router) · React 19 · TypeScript · plain CSS variables (two themes) · zod · nodemailer.

## Run locally
```bash
npm install
cp .env.example .env.local     # fill in what you need (see below)
npm run dev                    # http://localhost:3000
npm run typecheck && npm run build && npm start
```

## Where things live
| Need to change… | Edit |
|---|---|
| Name, email, phone, socials, degree wording | `src/lib/site.ts` (`site`) |
| Projects, screenshots, stack, services, process | `src/lib/site.ts` |
| Colours, both themes | `src/app/globals.css` (`:root` light, `[data-theme="dark"]` dark) |
| Contact page FAQs (and their structured data) | `src/lib/knowledge.ts` |
| Project screenshots | `public/images/projects/<slug>-desktop.png` and `-mobile.png` |
| Supporting photography | `public/images/scenes/` |

## Project screenshots
Every screenshot in `public/images/projects/` was captured from the live deployment at
1440 × 900 (desktop) and 390 × 844 (mobile). If a site changes, re-capture and overwrite the
file — the filename is what `src/lib/site.ts` points at. E&E Studios runs a full-screen intro
that headless browsers render as a black frame; dismiss it ("Skip intro") before capturing.

## Marvel Assistant (Dify)
The existing Dify agent is embedded with Dify's official script, loaded once from the document
head in `src/app/layout.tsx`:

```html
<script>window.difyChatbotConfig={token:'X1atAuomTQvJOyJt',baseUrl:'https://udify.app'}</script>
<script src="https://udify.app/embed.min.js" id="X1atAuomTQvJOyJt" defer></script>
```

The assistant's knowledge and prompt stay in Dify. The portfolio only supplies the embed.
Bubble and window are restyled in `globals.css` (`#dify-chatbot-bubble-button`,
`#dify-chatbot-bubble-window`). Note that Dify sends `X-Frame-Options: DENY` on the agent
page, so the agent cannot be iframed directly — use the official embed, not an `<iframe>`.

## Email
Every form on the site posts to `/api/contact`. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS` (Gmail: use an App Password). `MAIL_TO` defaults to `adeniyimarv@gmail.com`.

Until SMTP is configured the endpoint returns **503 with an honest message** — the form never
shows a fake success. Submissions include the enquiry type, service interest, budget, timeline,
message, sender details and the Lagos submission time. Rate limiting, a honeypot, a
minimum-time check and a 10-minute duplicate guard are all server-side.

## Deploy (Vercel)
Push to GitHub → import in Vercel → add the environment variables from `.env.example` → deploy.
Set `NEXT_PUBLIC_SITE_URL` to the production domain (defaults to `https://marvelledev.vercel.app`).

## Routes
`/` · `/projects` · `/projects/[slug]` · `/about` · `/services` · `/contact`
Retired routes redirect: `/why-a-website → /services`, `/referral → /contact`, `/cv → /about`.
