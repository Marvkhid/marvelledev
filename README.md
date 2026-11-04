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
| Chapters in the HUD rail | `data-chapter` on sections (home page) |

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

## Motion & cinema
The site opens with a title sequence (`CinemaIntro`): a countdown leader, the name assembling
letter by letter, the role, the promise, and a player bar with an 8-second progress line and a
**Skip intro** control. It is skipped with the button, Escape, or a click on the frame, plays
once per browser session, is disabled under `prefers-reduced-motion`, and can be replayed from
the footer.

It is drawn in canvas and type rather than shipped as a video file, so there is no autoplay
policy to fight, nothing to buffer, and the titles stay sharp at any screen size.

Around it: a game-style chapter rail (`Hud`) driven by any section carrying `data-chapter`, a
pointer-reactive horizon behind the hero (`WorldCanvas`), a horizontally scrubbed reel
(`ReelStrip`) and scene transitions between routes (`app/template.tsx`). Nothing gates the
content, nothing hijacks scrolling. The HUD only renders when a page has chapters, and hides
below 1180px.

## Email
Every form on the site posts to `/api/contact`, which sends **two** messages:

1. **The enquiry** to `MAIL_TO` (defaults to `adeniyimarv@gmail.com`), with the visitor as
   `Reply-To`, so replying goes straight back to them.
2. **The visitor's copy** to their own address, containing everything they submitted plus the
   reply promise. It is only attempted after the enquiry has been accepted, so a failed copy
   can never make it look as though the enquiry was lost.

Transport is chosen at runtime: SMTP first (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`;
Gmail needs an App Password), then Resend (`RESEND_API_KEY`). Resend without a verified domain
only accepts the account owner's address, so the visitor copy is skipped and the form says so
in plain words rather than pretending.

Until one transport is configured the endpoint returns **503 with an honest message** — the
form never shows a fake success. Submissions include the enquiry type, service interest,
budget, timeline, message, sender details and the Lagos submission time. Rate limiting, a
honeypot, a minimum-time check and a 10-minute duplicate guard are all server-side.

## Deploy (Vercel)
Push to GitHub → import in Vercel → add the environment variables from `.env.example` → deploy.
Set `NEXT_PUBLIC_SITE_URL` to the production domain (defaults to `https://marvelledev.vercel.app`).

## Routes
`/` · `/projects` · `/projects/[slug]` · `/about` · `/services` · `/contact`
Retired routes redirect: `/why-a-website → /services`, `/referral → /contact`, `/cv → /about`.
