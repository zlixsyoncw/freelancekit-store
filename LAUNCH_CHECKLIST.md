# FreelanceKit Launch Checklist

Everything you need to do before the site goes live. Listed in order. Each step is ~5–90 minutes.

---

## 1. Create Gumroad Products (45–90 min)

Sign up at [gumroad.com](https://gumroad.com) and create four digital products:

| Product | Price | File to upload |
|---|---|---|
| Freelancer OS | $29 | `products/freelancer-os-setup.html` (convert to PDF first) |
| Client Onboarding Bundle | $19 | `products/client-onboarding-bundle.html` (convert to PDF) |
| AI Prompt Pack | $17 | `products/ai-prompt-pack.html` (convert to PDF) |
| Complete Bundle | $49 | `products/complete-bundle.html` (convert to PDF, or link to the 3 above) |

**After creating each product**, copy its Gumroad URL (e.g. `yourname.gumroad.com/l/freelancer-os`) and update `lib/products.ts`:

```ts
// lib/products.ts — replace all 4 of these pairs
gumroadUrl: 'https://YOUR_ACCOUNT.gumroad.com/l/freelancer-os',
gumroadId: 'freelancer-os',  // the part after /l/
```

Also update `lib/site.ts` line 9:
```ts
gumroadProfile: 'https://YOUR_ACCOUNT.gumroad.com',
```

---

## 2. Set Up Resend Email (10 min)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use `onboarding@resend.dev` for initial testing)
3. Go to **Audiences** → Create an audience → copy the Audience ID
4. Go to **API Keys** → Create → copy the key

Set these in your environment (Vercel dashboard under Settings → Environment Variables):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your API key from Resend |
| `RESEND_AUDIENCE_ID` | Your audience ID from Resend |
| `NEWSLETTER_FROM_EMAIL` | `hello@freelancekit.co` (after verifying domain) |

---

## 3. Deploy to Vercel (15 min)

1. Push this repo to GitHub (all commits from the `master` branch)
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Set all environment variables (see list below)
5. Click Deploy

**Required environment variables:**

| Variable | Value | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://freelancekit.co` | Your domain |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `freelancekit.co` | Same as domain |
| `RESEND_API_KEY` | `re_...` | Resend dashboard |
| `RESEND_AUDIENCE_ID` | `abc123...` | Resend audiences |
| `NEWSLETTER_FROM_EMAIL` | `hello@freelancekit.co` | Verified Resend domain |

**For the GitHub Actions auto-deploy workflow** (`.github/workflows/deploy.yml`), add these as GitHub repository secrets (Settings → Secrets → Actions):

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel → Settings → General (Team ID) |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → General |

> **Note:** The Vercel CLI is not required for deployment — the GitHub Action handles it. But if you want to run `vercel env pull` locally, install it with `npm i -g vercel`.

---

## 4. Connect a Custom Domain (5 min)

1. Buy `freelancekit.co` at [Cloudflare](https://cloudflare.com) or [Namecheap](https://namecheap.com) (~$10–12/yr)
2. In Vercel: Project → Settings → Domains → Add → `freelancekit.co`
3. Follow Vercel's DNS instructions (usually add a CNAME or A record)
4. Update `NEXT_PUBLIC_SITE_URL` env var to your real domain

---

## 5. Set Up Plausible Analytics (5 min)

1. Sign up at [plausible.io](https://plausible.io) (free trial, then $9/mo)
2. Add your domain → note the domain string
3. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to match exactly what Plausible shows
4. The script is already in `app/layout.tsx` — no code changes needed

---

## 6. First-Week Marketing

In order of highest ROI:

1. **ProductHunt launch** — submit at [producthunt.com/posts/new](https://producthunt.com/posts/new). Go live on a Tuesday–Thursday morning (US Pacific time). Ask 10–15 friends to upvote on day 1.

2. **Reddit** — share a blog post (not the product directly) in:
   - [r/freelance](https://reddit.com/r/freelance)
   - [r/Notion](https://reddit.com/r/Notion)
   - [r/digitalnomad](https://reddit.com/r/digitalnomad)
   
   Good posts to share: `freelance-rates-how-to-charge-what-youre-worth`, `notion-for-freelancers-complete-guide`

3. **Twitter/X** — thread about "I built this because..." story. Tag @NotionHQ.

4. **LinkedIn** — post about the problem you solved and link to the site.

5. **Email your network** — 10–20 people who are freelancers. Personal note. Ask if they know anyone who'd find it useful.

---

## Code TODOs Still Remaining

These need real values before the site can accept payments:

- `lib/products.ts` lines 30, 31, 96, 97, 156, 157, 214, 215 — Gumroad URLs + IDs (4 products)
- `lib/site.ts` line 9 — `gumroadProfile` URL
- `lib/site.ts` line 7 — confirm `twitter: '@freelancekit'` is your real Twitter handle
- `app/api/subscribe/route.ts` line 30 — `RESEND_AUDIENCE_ID` env var (set in Vercel, not in code)

---

## Pre-Launch Verification

Run this locally before deploying:

```bash
npm run build   # must pass with 0 errors
npm run dev     # then visit:
```

Check these URLs work:
- `/` — homepage
- `/shop` — product listing
- `/shop/freelancer-os` — individual product + Gumroad button
- `/blog` — blog index
- `/tools` — free tools index
- `/tools/rate-calculator` — interactive tool
- `/sitemap.xml` — should list all blog posts + niche pages (dynamic)
- `/robots.txt` — should return allowed/disallowed rules
- `/wall-of-love` — testimonials page
