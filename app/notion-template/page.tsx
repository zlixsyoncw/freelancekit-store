import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Star, Zap, Shield } from 'lucide-react'
import { SITE } from '@/lib/site'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Notion Templates for Freelancers — FreelanceKit',
  description:
    'The best Notion templates for freelancers and independent contractors. CRM, project management, invoice tracking, and client portal — all pre-built and ready to duplicate.',
  alternates: { canonical: `${SITE.url}/notion-template` },
  openGraph: {
    type: 'website',
    title: 'Notion Templates for Freelancers — FreelanceKit',
    description:
      'Pre-built Notion workspaces for freelance designers, developers, copywriters, consultants, and more. Duplicate and start running your business in 15 minutes.',
    url: `${SITE.url}/notion-template`,
  },
}

const PROFESSIONS = [
  { slug: 'freelance-designers', label: 'Designers' },
  { slug: 'freelance-developers', label: 'Developers' },
  { slug: 'freelance-copywriters', label: 'Copywriters' },
  { slug: 'freelance-consultants', label: 'Consultants' },
  { slug: 'freelance-photographers', label: 'Photographers' },
  { slug: 'freelance-coaches', label: 'Coaches' },
  { slug: 'freelance-marketers', label: 'Marketers' },
  { slug: 'virtual-assistants', label: 'Virtual Assistants' },
  { slug: 'freelance-writers', label: 'Writers' },
  { slug: 'social-media-managers', label: 'Social Media Managers' },
  { slug: 'freelance-video-editors', label: 'Video Editors' },
  { slug: 'freelance-project-managers', label: 'Project Managers' },
]

const INCLUDED = [
  'Client CRM with pipeline view (Prospect → Proposal → Active → Done)',
  'Project hub with tasks, deliverables, and file links — all linked to clients',
  'Invoice tracker with paid / outstanding / overdue views and revenue totals',
  'Time log linked to projects — see your real effective hourly rate per client',
  'Weekly review template — 15-minute Friday ritual to stay on track',
  'Shareable client portal — no login required for clients',
  'Duplicate-ready templates for proposals, kickoff docs, and project briefs',
]

const FAQ = [
  {
    q: 'Do I need a paid Notion plan?',
    a: "No. The Freelancer OS template works entirely on Notion's free plan. No credit card required. Notion's free tier allows unlimited pages and databases for personal use.",
  },
  {
    q: 'How long does setup take?',
    a: "The template comes with a 20-minute setup video walkthrough. Most freelancers are up and running in under an hour, with all their clients and active projects entered.",
  },
  {
    q: "Is there a free version I can try first?",
    a: "Yes — we offer a free starter template with a client list, invoice tracker, and weekly review. Enter your email at /free to get it instantly.",
  },
  {
    q: 'Can I customize it for my workflow?',
    a: "Absolutely. Notion templates are fully editable — add properties, rename views, duplicate databases, and make it yours. The template is a starting point, not a cage.",
  },
  {
    q: 'What if I work with a team?',
    a: "The template is designed for solo freelancers, but it works for small teams on Notion's Plus plan. You can share your workspace with subcontractors or collaborators.",
  },
]

export default function NotionTemplatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'FreelanceKit Notion Template for Freelancers',
    description:
      'Complete Notion workspace for freelancers: CRM, project management, invoice tracking, and client portal.',
    url: `${SITE.url}/notion-template`,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '147',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand-50 to-white pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
            4.9 / 5 · 147 freelancers running their business on this
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-ink leading-[1.05] tracking-tight mb-6">
            The Notion Template Built for
            <br />
            <span className="text-brand-600">Serious Freelancers.</span>
          </h1>
          <p className="text-sand-600 text-xl sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            One workspace for your clients, projects, invoices, and time — linked together,
            updated in real time, and shareable with clients. Duplicate to your Notion in 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/shop/freelancer-os"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-brand-200"
            >
              Get Freelancer OS — $29 <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/free"
              className="flex items-center gap-2 text-sand-600 hover:text-ink font-medium text-base transition-colors"
            >
              Try the free version first →
            </Link>
          </div>
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
              Works on Notion free plan
            </span>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">
              Everything you need to run your business in Notion.
            </h2>
            <p className="text-sand-500 text-lg">
              Seven pre-built databases. All linked together. Works out of the box.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {INCLUDED.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-sand-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sand-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for your profession */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-ink mb-3">
              Tailored to how you actually work.
            </h2>
            <p className="text-sand-500 text-lg">
              See the template configured for your specific type of freelance work.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {PROFESSIONS.map((p) => (
              <Link
                key={p.slug}
                href={`/notion-template/${p.slug}`}
                className="group flex items-center justify-center py-3 px-4 bg-white border border-sand-200 rounded-xl text-sm font-medium text-sand-700 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm transition-all text-center"
              >
                {p.label}
                <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The problem it solves */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink mb-5 leading-tight">
                Most freelancers run their business in their head. That's expensive.
              </h2>
              <div className="space-y-4 text-sand-600 leading-relaxed">
                <p>
                  Leads go cold because you forgot to follow up. Projects slip because you have no single view of what's due this week. Invoices go unpaid because tracking them takes more time than sending a reminder.
                </p>
                <p>
                  The Freelancer OS fixes the infrastructure problem once. One afternoon of setup. A system you'll use every day from then on.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { before: 'Tracking leads in email and memory', after: 'CRM with pipeline view — never miss a follow-up' },
                { before: 'Projects managed in Slack threads', after: 'Project hub with tasks, files, and client notes linked' },
                { before: 'Invoices in a spreadsheet, maybe', after: 'Invoice tracker with automatic outstanding totals' },
                { before: 'No idea what your actual hourly rate is', after: 'Time log with profitability analysis per client' },
              ].map(({ before, after }) => (
                <div key={before} className="bg-sand-50 rounded-xl p-4">
                  <div className="text-xs text-sand-400 mb-1">Before</div>
                  <div className="text-sand-600 text-sm mb-2 line-through">{before}</div>
                  <div className="text-xs text-brand-600 font-semibold mb-0.5">After</div>
                  <div className="text-ink text-sm font-medium">{after}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            What freelancers say after 30 days.
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                quote: 'I closed two leads I had completely forgotten about within a week of setting up the CRM. The template paid for itself before I finished the setup video.',
                name: 'Maya Chen',
                role: 'Freelance Brand Designer',
              },
              {
                quote: "The invoice tracker showed me I was undercharging one client by 30%. I wouldn't have noticed without seeing the time log next to the invoice amount.",
                name: 'James Okafor',
                role: 'Independent Web Developer',
              },
              {
                quote: 'My clients keep commenting on how professional the whole process feels. The client portal alone changed how they perceive the engagement.',
                name: 'Sarah Lindqvist',
                role: 'B2B Copywriter',
              },
            ].map(({ quote, name, role }) => (
              <blockquote key={name} className="bg-brand-700/50 rounded-2xl p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-brand-100 text-sm leading-relaxed mb-4">"{quote}"</p>
                <footer>
                  <div className="font-semibold text-white text-sm">{name}</div>
                  <div className="text-brand-300 text-xs">{role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-ink text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-sand-200 pb-6">
                <h3 className="font-display font-bold text-ink mb-2">{q}</h3>
                <p className="text-sand-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-ink mb-4">
            Start running your freelance business like one.
          </h2>
          <p className="text-sand-500 text-lg mb-8">
            One-time purchase. Instant access. Works on Notion's free plan. 30-day money-back guarantee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop/freelancer-os"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-brand-200"
            >
              Get Freelancer OS — $29 <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/free"
              className="text-sand-600 hover:text-ink font-medium underline underline-offset-4 transition-colors"
            >
              Try the free starter template
            </Link>
          </div>
          <p className="text-sand-400 text-sm mt-6">
            Already have Notion? You'll be up and running in 15 minutes.
          </p>
        </div>
      </section>

      {/* Email capture strip */}
      <section className="py-16 bg-brand-50 border-y border-brand-100">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="font-display text-2xl font-bold text-ink mb-2">
            Get the free Notion starter template.
          </h3>
          <p className="text-sand-500 mb-6 text-sm">
            Client list, invoice tracker, and weekly review — emailed to you instantly.
          </p>
          <EmailCapture source="notion-template-page" buttonText="Get the free template" />
        </div>
      </section>
    </>
  )
}
