# FreelanceKit

**The Complete Business OS for Freelancers** — a digital product storefront selling Notion templates and AI prompt packs. Deployable on Vercel/Netlify free tier. No subscriptions, no SaaS. Payments via Gumroad.

---

## Project Overview

- **Business model:** Digital product storefront (one-time purchases via Gumroad)
- **Products:** Notion templates + AI prompt packs for freelancers
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Payments:** Gumroad (handles checkout, delivery, VAT — no code required)
- **Email:** Resend (free tier: 3,000 emails/month)
- **Analytics:** Plausible (privacy-first, no cookies)
- **Deploy:** Vercel free Hobby tier (or Netlify)

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment file
cp .env.example .env.local

# 3. Fill in your values (see Environment Variables below)

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your live site URL, e.g. `https://freelancekit.co` |
| `RESEND_API_KEY` | For email | From [resend.com](https://resend.com) → API Keys |
| `NEWSLETTER_FROM_EMAIL` | For email | Verified "from" address in Resend |
| `RESEND_AUDIENCE_ID` | For email | Audience ID from Resend dashboard |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | For analytics | Your domain as registered in Plausible |

Email works in graceful-degradation mode: if no `RESEND_API_KEY` is set, subscriptions are logged to the console instead of failing.

---

## Deploying to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: Next.js (auto-detected)
4. Add environment variables from `.env.example` in the Vercel dashboard
5. Click Deploy

Done. Your site is live on a Vercel subdomain. To use a custom domain: Vercel → Settings → Domains → Add.

## Deploying to Netlify

```bash
# Install the Netlify Next.js plugin
npm install -D @netlify/plugin-nextjs
```

Then push to GitHub and connect in the Netlify dashboard. The `netlify.toml` in this repo handles the rest.

---

## Setting Up Gumroad (to actually sell products)

This is the most important step. Without real Gumroad products, no purchases can be completed.

1. **Create a Gumroad account** at [gumroad.com](https://gumroad.com)
2. **Create each product** (Dashboard → Products → New Product → Digital):
   - Freelancer OS: price $29
   - Client Onboarding Bundle: price $19
   - AI Prompt Pack: price $17
   - Complete Bundle: price $49
3. **Upload your product files** (Notion template share links saved as PDF, prompt pack as PDF, etc.)
4. **Get the product URL** for each product (e.g., `yourname.gumroad.com/l/freelancer-os`)
5. **Update `lib/products.ts`**: Replace the `gumroadUrl` and `gumroadId` fields with your real values. Search for `// TODO: Replace with your actual Gumroad product URL` to find every location.

The Gumroad overlay checkout is already wired up. Once real IDs are in place, the "Get Instant Access" button opens an in-page Gumroad checkout.

---

## Customizing the Site

### Change brand name / domain
Edit `lib/site.ts` — the `SITE` object controls the name, URL, social links, email, and navigation.

### Add or modify products
Edit `lib/products.ts` — each product is a typed `Product` object. Add entries, change prices, update descriptions.

### Add blog posts
Edit `lib/blog.ts` — each post is a typed `BlogPost` object with an HTML `content` field. Add new entries to the `POSTS` array.

### Change colors / fonts
Edit `tailwind.config.ts` — the `brand` color scale is the primary color (currently purple). Change the hex values to match your brand. Fonts are set via Google Fonts in `app/globals.css`.

### Change the analytics provider
The Plausible script in `app/layout.tsx` can be swapped for Google Analytics:
```html
<!-- Google Analytics (replace GA_MEASUREMENT_ID) -->
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
<Script id="ga" strategy="afterInteractive">
  {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'GA_MEASUREMENT_ID');`}
</Script>
```

---

## File Structure

```
freelancekit/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (nav, footer, analytics, Gumroad script)
│   ├── page.tsx                # Landing page
│   ├── shop/
│   │   ├── page.tsx            # Product index
│   │   └── [slug]/page.tsx     # Individual product page
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/page.tsx     # Blog post
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/subscribe/route.ts  # Email capture API
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── GumroadButton.tsx       # Gumroad overlay checkout trigger
│   └── EmailCapture.tsx
├── lib/
│   ├── products.ts             # Product catalog (edit this to change products)
│   ├── blog.ts                 # Blog posts (edit this to add posts)
│   ├── site.ts                 # Site config (name, URL, links)
│   └── types.ts                # TypeScript interfaces
├── public/
│   ├── robots.txt
│   └── sitemap.xml             # Update URLs when you change your domain
├── DECISION.md                 # Business model reasoning
├── MONETIZATION.md             # Revenue playbook (read this)
├── ROADMAP.md                  # Growth plan
└── .env.example                # Required environment variables
```

---

## First Steps to Start Making Money

In order:
1. **Install deps and verify it builds locally:** `npm install && npm run build`
2. **Create your Gumroad products** and update `lib/products.ts` with real URLs
3. **Actually create the digital products** (the Notion templates and prompt files to upload to Gumroad)
4. **Deploy to Vercel** — push to GitHub, import at vercel.com, add env vars
5. **Set your custom domain** in Vercel (purchase at Namecheap/Cloudflare for $10–$12/yr)
6. **Submit to ProductHunt** — the single highest-ROI launch action
7. **Post in r/freelance and r/Notion** — share the blog post, not the product directly
8. **Set up your email list** — create a Resend account, add audience ID to `.env.local`

See `MONETIZATION.md` for the complete Week 1 and Month 1 marketing playbook.

---

## License

The code in this repository is MIT licensed. The product content (template descriptions, blog posts, copy) is proprietary — do not republish without permission.
