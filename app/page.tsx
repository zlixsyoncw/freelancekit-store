import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Zap, Users, BookOpen, Clock, DollarSign, Gift, Calculator, Mail, Receipt } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import EmailCapture from '@/components/EmailCapture'
import { getFeaturedProducts } from '@/lib/products'
import { getRecentPosts, formatDate } from '@/lib/blog'
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
    a: 'The Freelancer OS is actually ideal for people just starting out — it gives you professional infrastructure from day one so you don\'t have to rebuild your systems later.',
  },
]

const SECTION_LABEL_CLASSES = 'flex items-center gap-3 mb-7 reveal'
const KICKER_LINE = 'h-px w-6 bg-brand-400 shrink-0'
const KICKER_TEXT = 'text-xs font-semibold text-brand-600 uppercase tracking-[0.15em] font-body'

export default function HomePage() {
  const featured = getFeaturedProducts()
  const recentPosts = getRecentPosts(3)

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
      <section className="relative overflow-hidden bg-sand-50 pt-24 pb-36 sm:pt-32 sm:pb-48">
        {/* Floating background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="orb-float absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-brand-100/35 blur-3xl"
          />
          <div
            className="orb-float-slow absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-amber-100/25 blur-3xl"
          />
          <div
            className="orb-float absolute top-0 left-1/2 w-[300px] h-[300px] rounded-full bg-brand-50/50 blur-2xl"
            style={{ animationDelay: '5s' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Social proof kicker */}
          <div className="animate-fade-in flex items-center justify-center gap-3 mb-10">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sand-600 text-sm font-body">
              Trusted by 400+ freelancers worldwide
            </span>
          </div>

          {/* Headline — line-by-line reveal */}
          <h1
            className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.06] tracking-tight text-ink mb-8"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            <span className="hero-line">
              <span className="hero-line-inner block">
                The Complete Business OS
              </span>
            </span>
            <span className="hero-line">
              <span
                className="hero-line-inner block"
                style={{ animationDelay: '150ms' }}
              >
                for{' '}
                <span className="italic text-brand-600">Freelancers.</span>
              </span>
            </span>
          </h1>

          {/* Subhead */}
          <div className="hero-line mb-10">
            <p
              className="hero-line-inner block text-sand-600 text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed font-body"
              style={{ animationDelay: '320ms' }}
            >
              Notion templates and AI prompt packs that help you land better clients,
              deliver great work, and get paid — without the overhead.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-up animate-delay-400">
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-ink hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl shadow-ink/15"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop/complete-bundle"
              className="group flex items-center gap-2 text-ink hover:text-brand-700 font-semibold text-base transition-colors"
            >
              Get the full bundle
              <span className="text-brand-600 ml-1">$49</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-7 text-sm text-sand-500 animate-fade-in animate-delay-500 font-body">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              30-day guarantee
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Instant download
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              4.9 avg rating
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured Products — dark section for contrast ─────────────────── */}
      <section className="py-28 bg-ink overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section label */}
          <div className={SECTION_LABEL_CLASSES}>
            <div className={KICKER_LINE} />
            <span className={KICKER_TEXT} style={{ color: '#c084fc' }}>Our Products</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 reveal reveal-delay-1">
            <h2
              className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] max-w-xl"
              style={{ fontVariationSettings: "'opsz' 72" }}
            >
              Everything you need to run a{' '}
              <span className="italic text-brand-300">professional</span>{' '}
              freelance business.
            </h2>
            <p className="text-sand-400 text-base max-w-xs font-body leading-relaxed shrink-0">
              One-time purchase.<br />Instant access.<br />No subscriptions, ever.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, index) => (
              <div
                key={product.id}
                className={`reveal reveal-delay-${Math.min(index + 1, 6)}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-10 reveal">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sand-400 hover:text-white text-sm font-medium transition-colors font-body"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why FreelanceKit ─────────────────────────────────────────────── */}
      <section className="py-28 bg-sand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={SECTION_LABEL_CLASSES}>
            <div className={KICKER_LINE} />
            <span className={KICKER_TEXT}>Why FreelanceKit</span>
          </div>

          <h2
            className="font-display font-medium text-4xl sm:text-5xl text-ink mb-20 reveal reveal-delay-1 max-w-2xl"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            Why 400+ freelancers chose FreelanceKit
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`reveal reveal-delay-${Math.min(index + 1, 6)}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-sand-200 flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-brand-600" />
                    </div>
                    <span
                      className="font-display text-[0.68rem] font-semibold text-sand-300 uppercase tracking-[0.2em]"
                      style={{ fontVariationSettings: "'opsz' 9" }}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3
                    className="font-display font-semibold text-ink text-lg mb-2"
                    style={{ fontVariationSettings: "'opsz' 36" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sand-600 text-sm leading-relaxed font-body">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Free tools ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-sand-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className={SECTION_LABEL_CLASSES}>
            <div className={KICKER_LINE} />
            <span className={KICKER_TEXT}>Free Tools</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 reveal reveal-delay-1">
            <div>
              <h2
                className="font-display font-medium text-3xl sm:text-4xl text-ink"
                style={{ fontVariationSettings: "'opsz' 72" }}
              >
                Try before you buy.
              </h2>
            </div>
            <p className="text-sand-500 text-sm font-body max-w-xs">
              Free tools that give you a taste of the system — no signup required.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                href: '/tools/rate-calculator',
                icon: DollarSign,
                title: 'Rate Calculator',
                desc: 'Turn your income goal into a minimum, recommended, and premium hourly rate.',
                bg: 'bg-brand-50 border-brand-200 hover:border-brand-400',
                iconBg: 'bg-brand-600',
                textColor: 'text-brand-600',
              },
              {
                href: '/tools/project-estimator',
                icon: Calculator,
                title: 'Project Estimator',
                desc: 'Get a quote range, deposit amount, and payment schedule for any project in seconds.',
                bg: 'bg-amber-50 border-amber-200 hover:border-amber-400',
                iconBg: 'bg-amber-500',
                textColor: 'text-amber-600',
              },
              {
                href: '/free',
                icon: Gift,
                title: 'Free Notion Template',
                desc: 'Client list, invoice tracker, and weekly review template — set up in Notion in 15 minutes.',
                bg: 'bg-sand-50 border-sand-200 hover:border-brand-300',
                iconBg: 'bg-amber-400',
                textColor: 'text-brand-600',
              },
              {
                href: '/tools/email-scripts',
                icon: Mail,
                title: 'Email Scripts',
                desc: '25 copy-paste email templates for proposals, late payments, scope creep, and more.',
                bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
                iconBg: 'bg-emerald-600',
                textColor: 'text-emerald-600',
              },
              {
                href: '/tools/invoice-template',
                icon: Receipt,
                title: 'Invoice Template',
                desc: 'Fill in your details and get a formatted invoice you can copy into any email.',
                bg: 'bg-violet-50 border-violet-200 hover:border-violet-400',
                iconBg: 'bg-violet-600',
                textColor: 'text-violet-600',
              },
              {
                href: '/tools/contract-clauses',
                icon: BookOpen,
                title: 'Contract Clauses',
                desc: '20+ copy-paste clauses for payment, scope, IP, and legal protection.',
                bg: 'bg-blue-50 border-blue-200 hover:border-blue-400',
                iconBg: 'bg-blue-600',
                textColor: 'text-blue-600',
              },
            ].map((tool, index) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group reveal reveal-delay-${Math.min(index + 1, 6)} flex flex-col gap-4 border rounded-2xl p-6 hover:shadow-md transition-all ${tool.bg}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.iconBg}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-body">
                      Free
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-semibold text-ink text-sm mb-1"
                      style={{ fontVariationSettings: "'opsz' 36" }}
                    >
                      {tool.title}
                    </h3>
                    <p className="text-sand-500 text-xs leading-relaxed mb-3 font-body">{tool.desc}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all font-body ${tool.textColor}`}>
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-8 reveal">
            <Link href="/tools" className="text-sm text-brand-600 hover:text-brand-700 font-medium font-body transition-colors">
              See all free tools →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-sand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={SECTION_LABEL_CLASSES}>
            <div className={KICKER_LINE} />
            <span className={KICKER_TEXT}>Testimonials</span>
          </div>

          <h2
            className="font-display font-medium text-4xl sm:text-5xl text-ink mb-16 reveal reveal-delay-1"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            Real results from real freelancers.
          </h2>

          <div className="grid sm:grid-cols-2 gap-12">
            {TESTIMONIALS.map((t, index) => (
              <blockquote
                key={t.name}
                className={`reveal reveal-delay-${Math.min(index + 1, 4)} border-l-2 border-brand-200 pl-8`}
              >
                <div
                  className="font-display italic text-[5rem] text-brand-100 leading-none -mb-3 select-none"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <p
                  className="font-display italic text-xl sm:text-2xl text-ink leading-snug mb-6"
                  style={{ fontVariationSettings: "'opsz' 36" }}
                >
                  {t.text}
                </p>
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <footer className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm font-body">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-ink text-sm font-body">{t.name}</div>
                    <div className="text-sand-400 text-xs font-body">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-14 reveal">
            <Link
              href="/wall-of-love"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors font-body"
            >
              Read all testimonials <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bundle CTA ────────────────────────────────────────────────────── */}
      <section className="py-32 bg-ink relative overflow-hidden">
        {/* Large decorative background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display text-white/[0.025] font-bold leading-none text-[18rem]"
            style={{ fontVariationSettings: "'opsz' 144" }}
            aria-hidden="true"
          >
            $49
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="reveal inline-flex items-center gap-1.5 bg-amber-400/15 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 border border-amber-400/20 font-body">
            <Zap className="w-3.5 h-3.5" />
            Best value
          </div>

          <h2
            className="reveal reveal-delay-1 font-display font-medium text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[1.05]"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            Get{' '}
            <span className="italic text-amber-300">everything</span>
            <br />
            for $49.
          </h2>

          <p className="reveal reveal-delay-2 text-sand-400 text-lg mb-3 max-w-lg mx-auto font-body">
            The Complete Bundle includes every FreelanceKit product — plus all future releases.
          </p>
          <p className="reveal reveal-delay-3 text-sand-600 text-sm mb-14 font-body">
            Freelancer OS + Client Onboarding Bundle + AI Prompt Pack. Normally $65, bundled at $49.
          </p>

          <div className="reveal reveal-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop/complete-bundle"
              className="flex items-center gap-2 bg-white hover:bg-sand-100 text-ink px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-2xl shadow-black/30"
            >
              Get the Complete Bundle →
            </Link>
            <Link
              href="/shop"
              className="text-sand-500 hover:text-sand-300 text-sm transition-colors underline underline-offset-2 font-body"
            >
              Or browse individual products
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className={SECTION_LABEL_CLASSES}>
            <div className={KICKER_LINE} />
            <span className={KICKER_TEXT}>FAQ</span>
          </div>

          <h2
            className="font-display font-medium text-4xl sm:text-5xl text-ink mb-14 reveal reveal-delay-1"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            Frequently asked questions
          </h2>

          <div className="space-y-0 divide-y divide-sand-100">
            {FAQ.map((item, index) => (
              <div
                key={item.q}
                className={`reveal reveal-delay-${Math.min(index + 1, 6)} py-6`}
              >
                <h3
                  className="font-display font-semibold text-ink mb-2 text-lg"
                  style={{ fontVariationSettings: "'opsz' 36" }}
                >
                  {item.q}
                </h3>
                <p className="text-sand-600 text-sm leading-relaxed font-body">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email capture ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-50 border-y border-brand-100">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center reveal">
          <h2
            className="font-display font-medium text-3xl text-ink mb-2"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            Weekly freelance insights.{' '}
            <span className="italic text-brand-600">Free.</span>
          </h2>
          <p className="text-sand-500 mb-6 text-sm font-body">
            Pricing tactics, client scripts, system setups. No fluff. Unsubscribe any time.
          </p>
          <EmailCapture
            variant="light"
            placeholder="your@email.com"
            buttonText="Join 1,200+ freelancers"
            source="homepage-bottom"
          />
          <p className="text-sand-400 text-xs mt-3 font-body">
            No spam. Unsubscribe any time. We protect your data.
          </p>
        </div>
      </section>

      {/* ── Recent Blog Posts ─────────────────────────────────────────────── */}
      <section className="py-24 bg-sand-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-start justify-between mb-14">
            <div className="reveal">
              <div className={SECTION_LABEL_CLASSES}>
                <div className={KICKER_LINE} />
                <span className={KICKER_TEXT}>From the Blog</span>
              </div>
              <h2
                className="font-display font-medium text-3xl sm:text-4xl text-ink"
                style={{ fontVariationSettings: "'opsz' 72" }}
              >
                Practical freelance guides.
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors mt-8 font-body"
            >
              All articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {recentPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`reveal reveal-delay-${Math.min(index + 1, 3)} group border border-sand-200 rounded-2xl p-6 bg-white hover:border-brand-200 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300`}
              >
                <span
                  className="text-xs font-semibold bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full mb-4 inline-block font-body"
                >
                  {post.category}
                </span>
                <h3
                  className="font-display font-semibold text-ink text-base leading-snug mb-2 group-hover:text-brand-700 transition-colors"
                  style={{ fontVariationSettings: "'opsz' 36" }}
                >
                  {post.title}
                </h3>
                <p className="text-sand-500 text-xs leading-relaxed mb-4 line-clamp-2 font-body">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-sand-400 font-body">
                  <Clock className="w-3 h-3" />
                  {post.readingMinutes} min
                  <span>·</span>
                  {formatDate(post.publishedAt)}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center sm:hidden reveal">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors font-body"
            >
              All articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
