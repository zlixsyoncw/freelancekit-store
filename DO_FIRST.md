# FreelanceKit — Go Live Checklist

Everything you need to do to get from "code on GitHub" to "money in your account."
Each step has a time estimate and exact instructions. Total time: ~2 hours.

---

## Step 1: Deploy to Vercel (10 min)

1. Go to **https://vercel.com/new**
2. Click "Continue with GitHub"
3. Find and select **`freelancekit-store`** (by zlixsyoncw)
4. Click "Import"
5. On the configuration screen:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: leave empty
   - Build Command: leave as default (`npm run build`)
6. **Add Environment Variables** (click "Environment Variables" section):
   - `NEXT_PUBLIC_SITE_URL` → `https://freelancekit.co` (or your actual domain)
   - Leave the others blank for now — the app works without them, just with limited email functionality
7. Click **Deploy**
8. Wait ~2 minutes for the build to complete
9. Vercel gives you a URL like `freelancekit-store.vercel.app` — that's your live site

**Connect a custom domain** (optional but recommended):
1. In Vercel project → Settings → Domains
2. Add your domain (e.g., `freelancekit.co`)
3. Follow the DNS instructions Vercel gives you

---

## Step 2: Create Gumroad Products (30 min)

Gumroad is your payment processor — it handles checkout, delivery, and payouts.

### 2a. Create your Gumroad account
1. Go to **https://gumroad.com** → Sign up
2. Set up your payout info (bank account or PayPal) in Settings → Payouts
3. In Settings → Profile, set your profile URL (e.g., `freelancekit.gumroad.com`)

### 2b. Create each product

Create 4 products with these exact details:

**Product 1: Freelancer OS**
- Name: `Freelancer OS — Complete Notion Business Workspace`
- Price: `$29`
- Description: (paste from your shop page at `/shop/freelancer-os`)
- File to upload: `products/freelancer-os-setup.html` (in your project folder)
- After creating, copy the product URL (looks like `https://yourname.gumroad.com/l/freelancer-os`)

**Product 2: Client Onboarding Bundle**
- Name: `Client Onboarding Bundle — Proposal, Contract, Welcome Packet`
- Price: `$19`
- File to upload: `products/client-onboarding-bundle.html`
- After creating, copy the product URL

**Product 3: AI Prompt Pack**
- Name: `AI Prompt Pack — 200 Tested Prompts for Freelancers`
- Price: `$17`
- File to upload: `products/ai-prompt-pack.html`
- After creating, copy the product URL

**Product 4: Complete Bundle**
- Name: `Complete Bundle — All FreelanceKit Products`
- Price: `$49`
- For bundles in Gumroad: create it as a regular product, list all three products as included, upload all three product HTML files as a ZIP
- After creating, copy the product URL

### 2c. Update your site with the real product URLs

Run this from your project folder:
```
node scripts/setup-gumroad.js
```

It will prompt you for each URL and update `lib/products.ts` automatically.

Then push the update:
```
git add lib/products.ts
git commit -m "Add real Gumroad product URLs"
git push origin master
```

Vercel will automatically redeploy in ~2 minutes.

---

## Step 3: Set Up Email Capture (20 min)

Email is your most valuable long-term asset. Set this up before you get your first visitor.

### 3a. Create a Resend account (free: 3,000 emails/month)
1. Go to **https://resend.com** → Sign up
2. Create an API Key: API Keys → Create API Key → name it "FreelanceKit Production"
3. Copy the key (starts with `re_`)

### 3b. Set up your Audience
1. In Resend: Audiences → Create Audience → name it "FreelanceKit Subscribers"
2. Copy the Audience ID

### 3c. Add environment variables to Vercel
1. In Vercel: Your project → Settings → Environment Variables
2. Add:
   - `RESEND_API_KEY` → your API key
   - `RESEND_AUDIENCE_ID` → your audience ID
   - `NEWSLETTER_FROM_EMAIL` → `hello@freelancekit.co` (or your email)
3. Redeploy: Vercel → Deployments → latest → "Redeploy"

### 3d. Set up the welcome sequence
1. Open `emails/welcome-sequence.html` in your browser for the full sequence
2. In Resend: Broadcasts → Automations → Create automation
3. Trigger: "Contact added to audience"
4. Add each of the 5 emails from the sequence file with the correct delays

**Or use ConvertKit/Beehiiv** (see the platform notes in the email sequence file).

---

## Step 4: Create the Free Notion Template (20 min)

This is what new email subscribers receive instantly. It's your list-building anchor.

### 4a. Build the template in Notion
1. Open Notion → New page → name it "FreelanceKit Free Starter Template"
2. Create 3 databases using the structure from `products/free-starter-template.html`:
   - **Client CRM** database with the fields listed
   - **Invoice Tracker** database with the fields listed
   - **Task Manager** database with the fields listed
3. Add 2-3 example rows to each database so users see how it works
4. Set up the "Today" filtered view in the Task Manager

### 4b. Make it shareable
1. Click "Share" in the top right
2. Toggle "Share to web" → ON
3. Toggle "Allow duplicate as template" → ON
4. Copy the share URL

### 4c. Add the URL to your email sequence
1. Open `emails/welcome-sequence.html`
2. Find: `[PASTE YOUR NOTION TEMPLATE LINK HERE]`
3. Replace it with your actual Notion template URL
4. Update this in your email automation platform

---

## Step 5: Enable Analytics (10 min)

### Option A: Plausible (privacy-friendly, paid after 30-day trial)
1. Sign up at **https://plausible.io**
2. Add your domain
3. In Vercel: add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=freelancekit.co` as an env var

### Option B: Google Analytics (free, more data)
1. Create a GA4 property at analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. In `app/layout.tsx`, replace the Plausible script block with the GA4 gtag snippet

---

## Step 6: Launch (the actual work)

With everything set up, here's how to get your first sales:

### Week 1 (do all of these)
- [ ] Post the r/freelance value post from `LAUNCH.md`
- [ ] Post the r/Notion template post from `LAUNCH.md`
- [ ] Submit to Notion template directories: NotionPages.com, Notionery.co
- [ ] Send the "warm outreach" email from `LAUNCH.md` to everyone in your network
- [ ] Schedule the Twitter thread from `LAUNCH.md`

### Week 2–4
- [ ] Submit to ProductHunt (prepare a few days in advance — see `LAUNCH.md`)
- [ ] Post in relevant Slack/Discord communities for freelancers and Notion users
- [ ] Write a comment in 5 relevant Reddit threads (not promotional — genuinely helpful, link in profile)

### Ongoing
- [ ] Publish 1 blog post per week (you already have 9 — schedule them 1 week apart)
- [ ] Send the weekly newsletter (value-first, product mention ~1 in 5 emails)
- [ ] Reply to every email you receive — early customers are your best advocates

---

## Quick Revenue Math

At 300 monthly visitors with 2% conversion at avg order $35:
→ **6 sales × $35 = $210/month**

At 1,000 visitors at 2% conversion:
→ **20 sales × $38 = $760/month**

At 5,000 visitors (achievable with SEO + Reddit momentum):
→ **100 sales × $40 = $4,000/month**

The free tools (rate calculator) and SEO blog posts drive organic traffic. The email list converts visitors over time. The affiliate program multiplies reach.

---

## If You Get Stuck

- Vercel docs: https://vercel.com/docs
- Gumroad help: https://help.gumroad.com
- Resend docs: https://resend.com/docs
- Email hello@freelancekit.co (that's your own support email — set up a forwarder)
