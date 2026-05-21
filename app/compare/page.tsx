import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FreelanceKit vs Bonsai, FreshBooks, Wave & HoneyBook',
  description:
    'How does FreelanceKit compare to Bonsai, FreshBooks, HoneyBook, and Wave? See the features, pricing, and trade-offs — and why many freelancers choose Notion over SaaS.',
  alternates: { canonical: `${SITE.url}/compare` },
}

const FEATURES = [
  'One-time purchase (no subscription)',
  'Customizable to your workflow',
  'You own your data — no lock-in',
  'Invoice tracker',
  'Client CRM',
  'Project management',
  'Client portal (shareable)',
  'Contract templates',
  'Proposal templates',
  'AI prompt library',
  'Works offline',
  'No per-user pricing',
]

type ProductCol = {
  name: string
  price: string
  priceNote: string
  color: string
  features: (boolean | string)[]
  verdict: string
}

const PRODUCTS: ProductCol[] = [
  {
    name: 'FreelanceKit',
    price: '$29–$49',
    priceNote: 'one-time, forever',
    color: 'brand',
    features: [true, true, true, true, true, true, true, true, true, true, true, true],
    verdict: 'Best for: freelancers who want full ownership, no monthly fees, and a system built around how they actually work.',
  },
  {
    name: 'Bonsai',
    price: '$25–$79/mo',
    priceNote: 'per month',
    color: 'sand',
    features: [false, false, false, true, true, true, false, true, true, false, false, false],
    verdict: 'Best for: freelancers who want everything automated and are comfortable with a monthly subscription.',
  },
  {
    name: 'FreshBooks',
    price: '$17–$55/mo',
    priceNote: 'per month',
    color: 'sand',
    features: [false, false, false, true, 'Limited', false, false, false, false, false, false, false],
    verdict: 'Best for: freelancers who primarily need accounting, invoicing, and time tracking with a clean interface.',
  },
  {
    name: 'HoneyBook',
    price: '$16–$66/mo',
    priceNote: 'per month',
    color: 'sand',
    features: [false, false, false, true, true, 'Limited', false, true, true, false, false, false],
    verdict: 'Best for: creative freelancers (photographers, designers, event pros) who need lead management and client contracts.',
  },
  {
    name: 'Wave',
    price: 'Free',
    priceNote: 'with paid add-ons',
    color: 'sand',
    features: [true, false, false, true, false, false, false, false, false, false, false, false],
    verdict: 'Best for: freelancers who only need invoicing and basic accounting and want a genuinely free option.',
  },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />
  if (value === false) return <X className="w-5 h-5 text-sand-300 mx-auto" />
  return <span className="text-xs text-sand-500 text-center block">{value}</span>
}

export default function ComparePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          FreelanceKit vs the Alternatives
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl mx-auto">
          Freelance SaaS tools charge $200–$800/year and own your data. FreelanceKit is a one-time purchase that lives in Notion — the tool you already use.
        </p>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto mb-16">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-4 pr-6 text-sm font-semibold text-sand-500 w-48">Feature</th>
              {PRODUCTS.map((p) => (
                <th key={p.name} className={`py-4 px-4 text-center ${p.color === 'brand' ? 'bg-brand-50 rounded-t-xl' : ''}`}>
                  <div className={`font-display font-bold text-lg ${p.color === 'brand' ? 'text-brand-700' : 'text-ink'}`}>{p.name}</div>
                  <div className={`text-sm font-bold mt-0.5 ${p.color === 'brand' ? 'text-brand-600' : 'text-sand-600'}`}>{p.price}</div>
                  <div className="text-xs text-sand-400">{p.priceNote}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feature, fi) => (
              <tr key={feature} className={fi % 2 === 0 ? 'bg-sand-50/40' : ''}>
                <td className="py-3.5 pr-6 text-sm text-sand-700">{feature}</td>
                {PRODUCTS.map((p) => (
                  <td key={p.name} className={`py-3.5 px-4 ${p.color === 'brand' ? 'bg-brand-50/60' : ''}`}>
                    <FeatureCell value={p.features[fi]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-6 pr-6" />
              {PRODUCTS.map((p) => (
                <td key={p.name} className={`pt-6 px-4 align-top ${p.color === 'brand' ? 'bg-brand-50 rounded-b-xl' : ''}`}>
                  {p.color === 'brand' ? (
                    <Link
                      href="/shop"
                      className="block w-full text-center bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Get FreelanceKit
                    </Link>
                  ) : null}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Verdict cards */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-2xl text-ink mb-8 text-center">Who each tool is actually best for</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <div key={p.name} className={`rounded-2xl p-6 border ${p.color === 'brand' ? 'border-brand-300 bg-brand-50' : 'border-sand-200 bg-white'}`}>
              <div className={`font-display font-bold text-lg mb-1 ${p.color === 'brand' ? 'text-brand-700' : 'text-ink'}`}>{p.name}</div>
              <div className={`text-sm font-semibold mb-3 ${p.color === 'brand' ? 'text-brand-500' : 'text-sand-500'}`}>{p.price} {p.priceNote}</div>
              <p className="text-sand-600 text-sm leading-relaxed">{p.verdict}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Notion section */}
      <div className="bg-ink text-white rounded-2xl p-10 mb-16">
        <h2 className="font-display text-3xl font-bold mb-6">Why Notion beats SaaS for most freelancers</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {[
            {
              heading: 'You already use it',
              body: 'Most freelancers already have a Notion workspace. Adding a structured CRM and project hub to something you\'re already in every day beats switching to a new app entirely.',
            },
            {
              heading: 'It bends to your workflow',
              body: 'SaaS tools are opinionated about how you work. Notion lets you configure it exactly how you think — your pipeline stages, your project status names, your data views.',
            },
            {
              heading: 'No subscription math',
              body: 'At $25–$79/month, Bonsai costs $300–$948/year, every year. FreelanceKit is $29–$49 once. The ROI calculation is straightforward.',
            },
            {
              heading: 'Your data is yours',
              body: 'SaaS tools can change pricing, sunset features, or shut down. Your Notion workspace exports cleanly and belongs to you. No vendor lock-in.',
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="font-display font-bold text-white mb-2">{heading}</h3>
              <p className="text-sand-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The trade-off section — honest */}
      <div className="border border-sand-200 rounded-2xl p-8 mb-16 bg-sand-50">
        <h2 className="font-display font-bold text-2xl text-ink mb-4">The trade-offs (being honest)</h2>
        <p className="text-sand-600 mb-5">
          FreelanceKit is not the right choice for every freelancer. Here's when a SaaS tool might genuinely serve you better:
        </p>
        <ul className="space-y-3">
          {[
            'You need automated payment processing and accounting built into the same tool (Wave or FreshBooks)',
            'You\'re a photographer or event professional who needs a polished client-facing booking form (HoneyBook is excellent for this)',
            'You want automatic late-payment reminders and payment status webhooks without any setup (Bonsai automates this)',
            'You\'re managing a team of 5+ and need time-tracking that rolls up for payroll purposes',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <X className="w-4 h-4 text-sand-400 flex-shrink-0 mt-0.5" />
              <span className="text-sand-700 text-sm">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sand-500 text-sm mt-5">
          For most solo freelancers doing under $250K/year, FreelanceKit covers everything you need at a fraction of the cost. The moment you have a team or need full accounting, you'll want purpose-built software.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="font-display text-2xl font-bold text-ink mb-3">Start with the free tools</h3>
        <p className="text-sand-500 mb-8 max-w-md mx-auto">
          Try the free Rate Calculator to see how it works, then decide if the full system is right for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools/rate-calculator"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-600 text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Try the free rate calculator
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            See all products — from $17
          </Link>
        </div>
      </div>
    </div>
  )
}
