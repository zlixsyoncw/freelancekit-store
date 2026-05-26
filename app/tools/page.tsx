import type { Metadata } from 'next'
import Link from 'next/link'
import { DollarSign, Calculator, Mail, FileText, Receipt, Briefcase, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Free Freelance Tools — Rate Calculator, Invoice Template, Email Scripts & More',
  description: 'Free tools for freelancers: hourly rate calculator, invoice template generator, project price estimator, email scripts, and contract clauses library. No signup required.',
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: 'Free Freelance Tools — FreelanceKit',
    description: 'Free tools to help freelancers price their work, estimate projects, write emails, and build better contracts.',
    url: `${SITE.url}/tools`,
  },
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
  {
    href: '/tools/project-estimator',
    icon: Calculator,
    name: 'Project Price Estimator',
    description: 'Select your project scope and hourly rate. Get a quote range, deposit amount, and 3-part payment schedule in seconds.',
    badge: 'Free',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    href: '/tools/email-scripts',
    icon: Mail,
    name: 'Freelance Email Scripts',
    description: '25 copy-paste email templates for proposals, late payments, scope creep, client wrap-ups, and more. Click to copy.',
    badge: 'Free',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    href: '/tools/contract-clauses',
    icon: FileText,
    name: 'Contract Clauses Library',
    description: '20+ contract clauses covering payment, scope, IP, termination, and legal protection. Copy any clause into your contracts.',
    badge: 'Free',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '/tools/invoice-template',
    icon: Receipt,
    name: 'Invoice Template Generator',
    description: 'Fill in your details and line items. Get a formatted plain-text invoice you can copy directly into any email. Free, no account.',
    badge: 'Free',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    href: '/tools/proposal-generator',
    icon: Briefcase,
    name: 'Proposal Generator',
    description: 'Fill in your project details and get a professional, copy-paste proposal in minutes. Covers scope, deliverables, timeline, pricing, and payment terms.',
    badge: 'Free',
    color: 'bg-orange-50 text-orange-600',
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      </div>
    </div>
  )
}
