import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Zap, Users, BookOpen, Clock, DollarSign, Gift, Calculator } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import EmailCapture from '@/components/EmailCapture'
import { getFeaturedProducts } from '@/lib/products'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
}

const FEATURES = [
  {
    icon: Clock,
    title: 'Buy once, use forever',
    description:
      'No subscriptions. No monthly fees. Pay once and own your tools. All future updates included for free.',
  },
  {
    icon: Zap,
    title: 'Ready in 15 minutes',
    description:
      'Every template comes with a setup guide. Duplicate to Notion, fill in your details, and you\'re running.',
  },
  {
    icon: Users,
    title: 'Built by working freelancers',
    description:
      'Developed through 200+ interviews with six-figure independent contractors. These are systems that actually get used.',
  },
  {
    icon: BookOpen,
    title: 'Notion + AI prompts',
    description:
      'The workspace templates and the prompt packs work together. One system, every workflow, from client pitch to final invoice.',
  },
  {
    icon: Shield,
    title: '30-day money-back guarantee',
    description:
      'Not useful in your first 30 days? Email us for a full refund. No forms, no questions, no friction.',
  },
  {
    icon: Star,
    title: '400+ happy customers',
    description:
      'Freelancers across design, development, copywriting, and consulting rely on FreelanceKit daily.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Maya Chen',
    role: 'Freelance Brand Designer',
    rating: 5,
    text: 'I closed two leads I had forgotten about within a week of setting up the CRM. The Freelancer OS paid for itself before I finished the setup video.',
  },
  {
    name: 'Tom Reyes',
    role: 'UX Consultant',
    rating: 5,
    text: 'My clients keep complimenting how organized and professional the process feels. The welcome packet template gets a comment every single time.',
  },
  {
    name: 'Alex Petrov',
    role: 'Freelance Developer',
    rating: 5,
    text: 'The "scope creep response" prompts in the AI pack alone saved a client relationship and got me paid for the extra work. 10x ROI.',
  },
  {
    name: 'Dana Kowalski',
    role: 'Marketing Consultant',
    rating: 4,
    text: 'I use the LinkedIn post prompts every single week. My engagement tripled and I landed two inbound leads in the first month.',
  },
]

const FAQ = [
  {
    q: 'Do I need a paid Notion plan?',
    a: 'No. The templates work on Notion\'s free personal plan, which is plenty for solo freelancers.',
  },
  {
    q: 'Can I use the AI prompt pack with free ChatGPT or Claude?',
    a: 'Yes. All 200 prompts work with the free tier of ChatGPT, Claude, and Gemini. Notes are included for which prompts work best on which model.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No. Every product is a one-time purchase. You own it. All future updates are free.',
  },
  {
    q: 'What\'s your refund policy?',
    a: '30-day money-back guarantee, no questions asked. Email us at hello@freelancekit.co and we\'ll process it immediately.',
  },
  {
    q: 'Do you have an affiliate program?',
    a: 'Yes — we pay 30% commission on every sale you refer. Email us to get your affiliate link.',
  },
  {
    q: 'I\'m new to freelancing. Is this too advanced for me?',
    a: 'The Freelancer OS is actually ideal for people just starting out — it gives you professional infrastructure from day one so you don\'t have to rebuild your systems later. The onboarding bundle is especially useful early on.',
  },
]

export default function HomePage() {
  const featured = getFeaturedProducts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    sameAs: [`https://twitter.com/freelancekit`],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '17',
      highPrice: '49',
      offerCount: '4',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand-50 to-white pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-brand-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
            400+ freelancers running their business with FreelanceKit
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-ink leading-[1.05] tracking-tight mb-6">
            The Complete Business OS
            <br />
            <span className="text-brand-600">for Freelancers.</span>
          </h1>

          <p className="text-sand-600 text-xl sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Notion templates and AI prompt packs that help you land better clients,
            deliver great work, and get paid — without the overhead of expensive software.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95 shadow-lg shadow-brand-200"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop/complete-bundle"
              className="flex items-center gap-2 text-brand-700 hover:text-brand-800 font-semibold text-lg underline underline-offset-4 transition-colors"
            >
              Get the full bundle ($49) →
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex items-center justify-center gap-6 text-sm text-sand-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              30-day guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Instant access
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              4.9 avg rating
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">
              Everything you need to run a professional freelance business.
            </h2>
            <p className="text-sand-500 text-lg max-w-xl mx-auto">
              One-time purchase. Instant access. No subscriptions, ever.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-4 transition-colors"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">
              Why 400+ freelancers chose FreelanceKit
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-ink mb-1">{feature.title}</h3>
                    <p className="text-sand-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Free tools callout ───────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-sand-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-ink mb-2">Try before you buy</h2>
            <p className="text-sand-500">Free tools that give you a taste of the system — no signup required.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <Link
              href="/tools/rate-calculator"
              className="group flex flex-col gap-4 bg-brand-50 border border-brand-200 rounded-2xl p-6 hover:border-brand-400 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-ink text-sm">Rate Calculator</h3>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Free</span>
                </div>
                <p className="text-sand-500 text-xs leading-relaxed mb-3">Turn your income goal into a minimum, recommended, and premium hourly rate.</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  Calculate <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
            <Link
              href="/tools/project-estimator"
              className="group flex flex-col gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-ink text-sm">Project Estimator</h3>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Free</span>
                </div>
                <p className="text-sand-500 text-xs leading-relaxed mb-3">Get a quote range, deposit amount, and payment schedule for any project in seconds.</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:gap-2 transition-all">
                  Estimate <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
            <Link
              href="/free"
              className="group flex flex-col gap-4 bg-sand-50 border border-sand-200 rounded-2xl p-6 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-ink text-sm">Free Notion Template</h3>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Free</span>
                </div>
                <p className="text-sand-500 text-xs leading-relaxed mb-3">Client list, invoice tracker, and weekly review template — set up in Notion in 15 minutes.</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  Get template <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">
              Real results from real freelancers.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="bg-sand-50 rounded-2xl p-8 border border-sand-200"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sand-700 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-ink text-sm">{t.name}</div>
                    <div className="text-sand-500 text-xs">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bundle CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-ink text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            Best value
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
            Get everything for $49.
          </h2>
          <p className="text-sand-400 text-xl mb-3">
            The Complete Bundle includes every FreelanceKit product — plus all future releases.
          </p>
          <p className="text-sand-500 text-sm mb-10">
            Freelancer OS + Client Onboarding Bundle + AI Prompt Pack. Normally $65, bundled at $49.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop/complete-bundle"
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-brand-900/30"
            >
              Get the Complete Bundle →
            </Link>
            <Link
              href="/shop"
              className="text-sand-400 hover:text-white text-sm transition-colors underline underline-offset-2"
            >
              Or browse individual products
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-sand-200 pb-6">
                <h3 className="font-display font-bold text-ink mb-2">{item.q}</h3>
                <p className="text-sand-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email capture ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-brand-50 border-y border-brand-100">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-ink mb-2">
            Weekly freelance insights. Free.
          </h2>
          <p className="text-sand-500 mb-6 text-sm">
            Pricing tactics, client scripts, system setups. No fluff. Unsubscribe any time.
          </p>
          <EmailCapture
            variant="light"
            placeholder="your@email.com"
            buttonText="Join 1,200+ freelancers"
            source="homepage-bottom"
          />
          <p className="text-sand-400 text-xs mt-3">
            No spam. Unsubscribe any time. We protect your data.
          </p>
        </div>
      </section>
    </>
  )
}
