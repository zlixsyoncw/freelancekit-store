import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight, Shield, Zap, Star } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing — FreelanceKit',
  description:
    'FreelanceKit products start at $17 — one-time, no subscription. See what\'s included in each product and the Complete Bundle.',
  alternates: { canonical: `${SITE.url}/pricing` },
}

const PRODUCTS = [
  {
    name: 'AI Prompt Pack',
    price: 17,
    description: '200 tested prompts for every part of your freelance workflow.',
    includes: [
      '40 prompts for sales and proposals',
      '35 prompts for client communication',
      '55 prompts for deliverable creation',
      '30 prompts for admin and operations',
      '40 prompts for marketing yourself',
      'Works with ChatGPT, Claude, Gemini (free tiers)',
      'Usage notes for each prompt',
    ],
    href: '/shop/ai-prompt-pack',
    highlighted: false,
  },
  {
    name: 'Client Onboarding Bundle',
    price: 19,
    description: 'Every document you need to onboard clients professionally.',
    includes: [
      'Three-tier proposal template',
      'Plain-English contract with all key clauses',
      'Client welcome packet',
      'Kickoff call agenda + intake form',
      'Post-kickoff summary email template',
      'Customizable for any freelance service type',
      'Works in Notion, Google Docs, or Word',
    ],
    href: '/shop/client-onboarding-bundle',
    highlighted: false,
  },
  {
    name: 'Freelancer OS',
    price: 29,
    description: 'The complete Notion business workspace for solo freelancers.',
    includes: [
      'Client CRM (Prospect → Active → Complete pipeline)',
      'Project hub with profitability calculator',
      'Invoice tracker with outstanding/paid views',
      'Task manager with Today view',
      'Shareable client portal (no Notion account required)',
      'Weekly review template',
      'Setup guide and video walkthrough',
    ],
    href: '/shop/freelancer-os',
    highlighted: false,
  },
  {
    name: 'Complete Bundle',
    price: 49,
    compareAt: 65,
    badge: 'Best value — save $16',
    description: 'Everything above, bundled. The complete FreelanceKit system.',
    includes: [
      'Everything in Freelancer OS',
      'Everything in Client Onboarding Bundle',
      'Everything in AI Prompt Pack',
      'All future product updates, free',
      '30-day money-back guarantee',
    ],
    href: '/shop/complete-bundle',
    highlighted: true,
  },
]

const FAQ = [
  {
    q: 'Is this a subscription?',
    a: 'No. Every product is a one-time purchase. You pay once and own it permanently. All future updates are included at no extra cost.',
  },
  {
    q: 'Do I need a paid Notion plan?',
    a: "No. The Freelancer OS templates work on Notion's free Personal plan, which is sufficient for solo freelancers with unlimited pages.",
  },
  {
    q: 'Can I use the AI prompts with free ChatGPT or Claude?',
    a: 'Yes. Every prompt in the pack works with the free tiers of ChatGPT, Claude, and Gemini. Notes are included for which model performs best on each type of prompt.',
  },
  {
    q: "What's the refund policy?",
    a: '30-day money-back guarantee, no questions asked. Email hello@freelancekit.co and we\'ll process the refund the same day.',
  },
  {
    q: 'Can I buy individual products and upgrade to the bundle later?',
    a: 'Reach out to hello@freelancekit.co if you\'ve already purchased individual products — we\'ll work out a fair upgrade price.',
  },
  {
    q: 'Do you have an affiliate program?',
    a: "Yes — 30% commission on every sale you refer. Email us to get your affiliate link. There's no minimum payout and commissions are paid monthly.",
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          Simple, one-time pricing
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl mx-auto">
          No subscriptions. No monthly fees. Pay once, own forever. Most freelancers recoup the cost within their first paid project.
        </p>
      </div>

      {/* Products */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {PRODUCTS.map((product) => (
          <div
            key={product.name}
            className={`rounded-2xl border p-7 flex flex-col ${
              product.highlighted
                ? 'bg-brand-600 border-brand-500 text-white'
                : 'bg-white border-sand-200'
            }`}
          >
            {product.badge && (
              <div className="text-xs font-bold bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full self-start mb-4">
                {product.badge}
              </div>
            )}
            <h2 className={`font-display font-bold text-lg mb-1 ${product.highlighted ? 'text-white' : 'text-ink'}`}>
              {product.name}
            </h2>
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`font-display text-4xl font-extrabold ${product.highlighted ? 'text-white' : 'text-ink'}`}>
                ${product.price}
              </span>
              {product.compareAt && (
                <span className="text-sm line-through text-brand-300">${product.compareAt}</span>
              )}
            </div>
            <p className={`text-sm mb-6 ${product.highlighted ? 'text-brand-200' : 'text-sand-500'}`}>
              {product.description}
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {product.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${product.highlighted ? 'text-brand-200' : 'text-emerald-500'}`} />
                  <span className={`text-sm ${product.highlighted ? 'text-brand-100' : 'text-sand-600'}`}>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={product.href}
              className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                product.highlighted
                  ? 'bg-white text-brand-700 hover:bg-brand-50'
                  : 'bg-brand-600 hover:bg-brand-700 text-white'
              }`}
            >
              Get {product.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap justify-center gap-8 mb-20 py-8 border-y border-sand-100">
        {[
          { icon: Shield, text: '30-day money-back guarantee' },
          { icon: Zap, text: 'Instant access after purchase' },
          { icon: Star, text: '4.9 avg rating from 400+ customers' },
          { icon: Check, text: 'One-time payment — no subscription ever' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-sand-600">
            <Icon className="w-4 h-4 text-brand-500" />
            {text}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-3xl text-ink text-center mb-10">
          Pricing questions
        </h2>
        <div className="space-y-6">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="border-b border-sand-200 pb-6">
              <h3 className="font-display font-bold text-ink mb-2">{q}</h3>
              <p className="text-sand-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sand-500 text-sm mb-4">Not sure which product is right for you?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 border-2 border-sand-300 text-sand-700 hover:border-brand-400 hover:text-brand-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Compare vs alternatives
            </Link>
            <Link
              href="/free"
              className="inline-flex items-center gap-2 border-2 border-brand-300 text-brand-700 hover:bg-brand-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Try the free template first <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
