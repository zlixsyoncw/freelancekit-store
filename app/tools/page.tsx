import type { Metadata } from 'next'
import Link from 'next/link'
import { DollarSign, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Free Freelance Tools',
  description: 'Free tools for freelancers: rate calculator, invoice estimator, and more. No signup required.',
  alternates: { canonical: `${SITE.url}/tools` },
}

const TOOLS = [
  {
    href: '/tools/rate-calculator',
    icon: DollarSign,
    name: 'Freelance Rate Calculator',
    description: 'Enter your income goal and working hours. Get your minimum, recommended, and premium hourly rates instantly.',
    badge: 'Free',
    color: 'bg-brand-50 text-brand-600',
  },
]

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-3">
          Free Freelance Tools
        </h1>
        <p className="text-sand-500 text-xl">
          No signup. No paywall. Tools that help you run a smarter freelance business.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-sand-200 rounded-2xl p-7 hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${tool.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-display font-bold text-ink text-xl">{tool.name}</h2>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{tool.badge}</span>
              </div>
              <p className="text-sand-500 text-sm leading-relaxed mb-5">{tool.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 transition-all">
                Open tool <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          )
        })}

        {/* Coming soon placeholder */}
        <div className="bg-sand-50 border border-sand-200 border-dashed rounded-2xl p-7 flex flex-col items-start justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-sand-200 mb-5" />
            <h2 className="font-display font-bold text-sand-400 text-xl mb-2">Project Price Estimator</h2>
            <p className="text-sand-400 text-sm">Coming soon — estimate fixed-price project quotes from scope descriptions.</p>
          </div>
          <span className="mt-5 text-xs font-semibold bg-sand-200 text-sand-500 px-2.5 py-1 rounded-full">Coming soon</span>
        </div>
      </div>
    </div>
  )
}
