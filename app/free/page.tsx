import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Free Notion Freelance Template — FreelanceKit',
  description:
    'Download a free Notion template for freelancers: invoice tracker, client list, and weekly review. No credit card. No signup wall. Just a useful template.',
  alternates: { canonical: `${SITE.url}/free` },
}

const FREE_INCLUDES = [
  'Client list with status (Prospect → Active → Complete)',
  'Invoice tracker with outstanding / paid view',
  'Weekly review template (15-min Friday ritual)',
  'Daily task view filtered by project',
  'Rate calculator reference table',
]

export default function FreePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          Actually free — no credit card
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 leading-tight">
          A Free Notion Starter Template for Freelancers
        </h1>
        <p className="text-sand-500 text-xl max-w-xl mx-auto">
          Get the essential pieces of a freelance business system — client list, invoice tracker, and weekly review — without paying for the full Freelancer OS.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* Left: What's included */}
        <div>
          <h2 className="font-display font-bold text-2xl text-ink mb-6">What's in the free template</h2>
          <ul className="space-y-4 mb-10">
            {FREE_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sand-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-6 mb-8">
            <h3 className="font-display font-bold text-ink mb-2">How it works</h3>
            <ol className="space-y-3 text-sand-600 text-sm">
              <li className="flex gap-2"><span className="font-bold text-brand-600">1.</span> Enter your email below</li>
              <li className="flex gap-2"><span className="font-bold text-brand-600">2.</span> We send you the Notion template link instantly</li>
              <li className="flex gap-2"><span className="font-bold text-brand-600">3.</span> Click "Duplicate" in Notion to add it to your workspace</li>
              <li className="flex gap-2"><span className="font-bold text-brand-600">4.</span> Set it up in under 15 minutes</li>
            </ol>
          </div>

          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
            <h3 className="font-display font-bold text-ink mb-1">Want the full system?</h3>
            <p className="text-sand-600 text-sm mb-4">
              The free template is a simplified version of the Freelancer OS — which adds a full CRM, project hub with profitability tracking, linked databases, and a shareable client portal.
            </p>
            <Link
              href="/shop/freelancer-os"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              See Freelancer OS ($29 one-time) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Email capture */}
        <div className="bg-white border border-sand-200 rounded-2xl p-8 shadow-sm lg:sticky lg:top-8">
          <h3 className="font-display font-bold text-xl text-ink mb-2">Get the free template</h3>
          <p className="text-sand-500 text-sm mb-6">
            Enter your email and we'll send the Notion link immediately. We'll also send weekly freelance tips — unsubscribe any time.
          </p>
          <EmailCapture source="free-template" buttonText="Send me the template" />
          <p className="text-xs text-sand-400 mt-4 text-center">
            No spam. No credit card. Unsubscribe in one click.
          </p>

          <div className="mt-8 pt-6 border-t border-sand-100">
            <p className="text-xs font-semibold text-sand-500 uppercase tracking-wider mb-4">What happens after you subscribe</p>
            <ul className="space-y-2.5 text-sm text-sand-600">
              <li className="flex gap-2"><span className="text-brand-500">→</span> Instant: Template link in your inbox</li>
              <li className="flex gap-2"><span className="text-brand-500">→</span> Day 3: Rate calculator guide</li>
              <li className="flex gap-2"><span className="text-brand-500">→</span> Day 7: How to get better clients</li>
              <li className="flex gap-2"><span className="text-brand-500">→</span> Weekly: Freelance business tips</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 pt-12 border-t border-sand-100">
        <h2 className="font-display font-bold text-2xl text-ink text-center mb-8">
          What freelancers say about the system
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              quote: "I set up the client tracker in 20 minutes. Within a week I had followed up with three leads I'd completely forgotten about — one became a $4,200 project.",
              name: 'Alex M.',
              role: 'Freelance brand designer',
            },
            {
              quote: "The invoice tracker showed me I had $2,800 outstanding that I'd somehow lost track of. I sent reminders that afternoon and collected most of it by Friday.",
              name: 'Tara R.',
              role: 'Freelance copywriter',
            },
            {
              quote: "I used to start each week with no idea what was most important. The weekly review ritual changed that completely. 15 minutes every Friday, and Monday feels totally different.",
              name: 'James K.',
              role: 'Freelance developer',
            },
          ].map(({ quote, name, role }) => (
            <blockquote key={name} className="bg-sand-50 rounded-2xl p-6">
              <p className="text-sand-700 text-sm leading-relaxed mb-4">"{quote}"</p>
              <footer className="text-xs text-sand-500">
                <strong className="text-ink">{name}</strong> — {role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  )
}
