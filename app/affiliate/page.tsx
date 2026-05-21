import type { Metadata } from 'next'
import Link from 'next/link'
import { DollarSign, Users, Zap, ArrowRight, Check } from 'lucide-react'
import { SITE } from '@/lib/site'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Affiliate Program — FreelanceKit',
  description:
    'Earn 30% commission on every FreelanceKit sale you refer. No minimum payout, monthly payments, lifetime cookie. Join the affiliate program.',
  alternates: { canonical: `${SITE.url}/affiliate` },
}

const STATS = [
  { value: '30%', label: 'Commission on every sale' },
  { value: '$14.70', label: 'Avg commission per sale (at $49 bundle)' },
  { value: '90 days', label: 'Cookie duration' },
  { value: 'Monthly', label: 'Payout schedule' },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    heading: 'Apply via email',
    body: 'Email hello@freelancekit.co with the subject "Affiliate Program" and tell us briefly about your audience (blog, newsletter, social, etc). We approve within 48 hours.',
  },
  {
    step: '2',
    heading: 'Get your affiliate link',
    body: 'We\'ll send you a unique tracking link for the products you want to promote. Links work for the full FreelanceKit shop — any product sold earns you 30%.',
  },
  {
    step: '3',
    heading: 'Promote to your audience',
    body: 'Share your link in blog posts, newsletters, YouTube descriptions, social posts, or wherever your audience is. We provide ready-to-use copy and assets.',
  },
  {
    step: '4',
    heading: 'Earn every month',
    body: 'Commissions are tracked in real time. We pay out monthly via PayPal or bank transfer, with no minimum threshold.',
  },
]

const GOOD_FIT = [
  'Freelance bloggers and content creators',
  'YouTube channels for designers, developers, or writers',
  'Newsletters targeting freelancers or independent professionals',
  'Notion template communities and educators',
  'Freelance coaches and consultants with an audience',
  'Tools and productivity-focused social media accounts',
]

export default function AffiliatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <DollarSign className="w-3.5 h-3.5" /> 30% Commission
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          Earn with the FreelanceKit Affiliate Program
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl mx-auto">
          Recommend FreelanceKit to your audience and earn 30% of every sale — from the $17 AI Prompt Pack to the $49 Complete Bundle.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-sand-50 border border-sand-200 rounded-2xl p-6 text-center">
            <div className="font-display text-2xl font-extrabold text-brand-600 mb-1">{value}</div>
            <div className="text-xs text-sand-500">{label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-14">
        <h2 className="font-display font-bold text-2xl text-ink mb-8">How it works</h2>
        <div className="space-y-6">
          {HOW_IT_WORKS.map(({ step, heading, body }) => (
            <div key={step} className="flex gap-5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                {step}
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-ink mb-1">{heading}</h3>
                <p className="text-sand-600 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who's a good fit */}
      <div className="bg-sand-50 border border-sand-200 rounded-2xl p-8 mb-14">
        <div className="flex items-center gap-3 mb-5">
          <Users className="w-5 h-5 text-brand-600" />
          <h2 className="font-display font-bold text-xl text-ink">Who it's a great fit for</h2>
        </div>
        <ul className="space-y-3">
          {GOOD_FIT.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-sand-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Example earnings */}
      <div className="bg-white border border-sand-200 rounded-2xl p-8 mb-14">
        <h2 className="font-display font-bold text-xl text-ink mb-6">Example earnings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-100">
                <th className="text-left py-2 pr-4 text-sand-500 font-semibold">Monthly referrals</th>
                <th className="text-right py-2 pr-4 text-sand-500 font-semibold">Avg order value</th>
                <th className="text-right py-2 text-sand-500 font-semibold">Monthly commission</th>
              </tr>
            </thead>
            <tbody>
              {[
                { refs: 5, aov: 29, commission: 43.5 },
                { refs: 20, aov: 35, commission: 210 },
                { refs: 50, aov: 42, commission: 630 },
                { refs: 100, aov: 44, commission: 1320 },
                { refs: 500, aov: 46, commission: 6900 },
              ].map(({ refs, aov, commission }) => (
                <tr key={refs} className="border-b border-sand-50">
                  <td className="py-3 pr-4 text-ink font-medium">{refs} sales</td>
                  <td className="py-3 pr-4 text-sand-600 text-right">${aov}/sale</td>
                  <td className="py-3 text-brand-600 font-bold text-right">${commission.toLocaleString()}/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-sand-400 mt-4">
          Average order value varies by product mix. Complete Bundle ($49) earns $14.70. AI Prompt Pack ($17) earns $5.10.
        </p>
      </div>

      {/* Apply CTA */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-10 text-white text-center mb-12">
        <Zap className="w-8 h-8 text-brand-200 mx-auto mb-4" />
        <h2 className="font-display text-3xl font-bold mb-3">Ready to apply?</h2>
        <p className="text-brand-200 mb-8 max-w-md mx-auto">
          Email us with a brief description of your audience and we'll get you set up within 48 hours.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=Affiliate Program Application&body=Hi, I'd like to apply to the FreelanceKit affiliate program. Here's a bit about my audience:%0A%0A[Your description here]`}
          className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-8 py-4 rounded-xl font-semibold transition-colors"
        >
          Apply by email <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-brand-300 text-sm mt-4">{SITE.email} · We respond within 48 hours</p>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Affiliate FAQ</h2>
        <div className="space-y-5">
          {[
            {
              q: 'Is there a minimum payout threshold?',
              a: 'No. We pay out whatever you\'ve earned each month, no minimum.',
            },
            {
              q: 'How long does the cookie last?',
              a: '90 days. If someone clicks your link and purchases within 90 days, you earn the commission.',
            },
            {
              q: 'Can I promote individual products or only the bundle?',
              a: 'You can promote any product or all of them. Your link covers the full shop. The Complete Bundle earns the highest commission per sale.',
            },
            {
              q: 'Do you provide marketing copy and assets?',
              a: 'Yes — when you\'re approved, we send you a kit with suggested email copy, social media captions, and key selling points for each product.',
            },
            {
              q: 'What payment methods do you use?',
              a: 'PayPal or bank transfer, your choice. We send payments in the first week of the following month.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-sand-100 pb-5">
              <h3 className="font-display font-bold text-ink mb-1">{q}</h3>
              <p className="text-sand-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
