import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Resources & Tools — FreelanceKit',
  description:
    'The best tools, apps, and resources for freelancers. Curated picks for client management, invoicing, communication, and growing your practice.',
  alternates: { canonical: `${SITE.url}/resources` },
}

type Resource = {
  name: string
  description: string
  href: string
  badge?: string
  badgeColor?: string
  free: boolean
}

type ResourceSection = {
  category: string
  intro: string
  items: Resource[]
}

const RESOURCES: ResourceSection[] = [
  {
    category: 'Project Management & Notes',
    intro: 'The core of your freelance system. Where you track clients, projects, tasks, and deliverables.',
    items: [
      {
        name: 'Notion',
        description:
          'The most flexible workspace for freelancers. Build a full business OS: CRM, project hub, invoice tracker, client portal — all in one place. (Our templates run on Notion.)',
        href: 'https://notion.so',
        badge: 'Recommended',
        badgeColor: 'bg-brand-100 text-brand-700',
        free: true,
      },
      {
        name: 'Linear',
        description:
          'If your freelance work skews toward software/product work, Linear is the best project tracker available. Excellent for managing sprints with developer clients.',
        href: 'https://linear.app',
        free: true,
      },
    ],
  },
  {
    category: 'Proposals & Contracts',
    intro: 'First impressions matter. These tools help you send professional proposals and watertight contracts.',
    items: [
      {
        name: 'Bonsai',
        description:
          'All-in-one platform for freelance proposals, contracts, invoices, and time tracking. Good starter option if you want everything in one SaaS product.',
        href: 'https://hellobonsai.com',
        free: false,
      },
      {
        name: 'AND.CO',
        description:
          'Freshbooks-owned freelance platform. Proposals, contracts, time tracking, invoicing. Strong on the legal contract side.',
        href: 'https://and.co',
        free: false,
      },
      {
        name: 'FreelanceKit Client Onboarding Bundle',
        description:
          'Our own template pack: proposal, contract, welcome packet, and kickoff doc — built in Notion/Google Docs. One-time $19 instead of monthly software fees.',
        href: '/shop/client-onboarding-bundle',
        badge: 'Ours',
        badgeColor: 'bg-amber-100 text-amber-700',
        free: false,
      },
    ],
  },
  {
    category: 'Invoicing & Payments',
    intro: 'Get paid faster, with less friction. These tools handle sending invoices and accepting payments.',
    items: [
      {
        name: 'Wave',
        description:
          'Completely free invoicing, accounting, and receipt scanning for freelancers. Best zero-cost option for getting started with professional invoicing.',
        href: 'https://waveapps.com',
        badge: 'Free forever',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'Invoice Ninja',
        description:
          'Open-source invoicing and time tracking. Self-hostable or hosted free tier. Professional-grade features without the monthly fee.',
        href: 'https://invoiceninja.com',
        badge: 'Open source',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'PayPal',
        description:
          'Still the most universally accepted payment method for freelancers, especially internationally. Simple, fast, and every client knows how to use it.',
        href: 'https://paypal.com',
        free: true,
      },
    ],
  },
  {
    category: 'Communication & Async Video',
    intro: 'Professional client communication without endless back-and-forth calls.',
    items: [
      {
        name: 'Loom',
        description:
          'Record and share screen + camera videos in seconds. Excellent for project walkthroughs, feedback responses, and deliverable handoffs that save everyone a call.',
        href: 'https://loom.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'Superhuman',
        description:
          'If email is your primary client interface, Superhuman makes you dramatically faster. Steep price, but many high-earners consider it non-negotiable.',
        href: 'https://superhuman.com',
        free: false,
      },
    ],
  },
  {
    category: 'Scheduling',
    intro: 'Stop the email back-and-forth to find a meeting time.',
    items: [
      {
        name: 'Cal.com',
        description:
          'Open-source Calendly alternative. Free self-hosted or paid cloud. Share a booking link, clients pick a time, done. Integrates with most calendar systems.',
        href: 'https://cal.com',
        badge: 'Open source',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'Calendly',
        description:
          'The original and most recognized scheduling tool. Free tier covers most freelancer needs. Clients are comfortable with it because they\'ve seen it before.',
        href: 'https://calendly.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
    ],
  },
  {
    category: 'AI Tools for Freelancers',
    intro: 'AI that actually helps with the work, not just hype.',
    items: [
      {
        name: 'Claude',
        description:
          'Anthropic\'s AI — excellent for long-form writing, proposals, client emails, and thinking through complex client situations. Better than ChatGPT for nuanced professional writing.',
        href: 'https://claude.ai',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'ChatGPT',
        description:
          'OpenAI\'s flagship. Strong for research, content outlines, and technical writing. The GPT-4o free tier is surprisingly capable for freelance tasks.',
        href: 'https://chatgpt.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'FreelanceKit AI Prompt Pack',
        description:
          '200 tested prompts for freelancers: proposals, client emails, deliverables, sales, and marketing. Skip the prompt-engineering learning curve.',
        href: '/shop/ai-prompt-pack',
        badge: 'Ours',
        badgeColor: 'bg-amber-100 text-amber-700',
        free: false,
      },
    ],
  },
  {
    category: 'Design & Creative Tools',
    intro: 'Essential creative tools, whether design is your core service or just part of the job.',
    items: [
      {
        name: 'Canva',
        description:
          'Quick mockups, presentation decks, client-facing documents. Not a replacement for Figma in serious design work, but invaluable for business collateral.',
        href: 'https://canva.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'Figma',
        description:
          'The industry standard for UI/UX and product design work. Excellent for wireframes and prototypes even if design isn\'t your primary skill.',
        href: 'https://figma.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
    ],
  },
  {
    category: 'Finance, Taxes & Accounting',
    intro: 'Freelance finances are messier than a regular salary. These tools make tax season survivable and cash flow predictable.',
    items: [
      {
        name: 'Wave',
        description:
          'Free accounting, invoicing, and receipt tracking built for small businesses and freelancers. Handles income/expense categorization and basic reporting — no monthly fee.',
        href: 'https://waveapps.com',
        badge: 'Free forever',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'QuickBooks Self-Employed',
        description:
          'The go-to for freelancers who want automatic mileage tracking, quarterly tax estimates, and Schedule C categorization. Syncs with your bank and exports cleanly for tax filing.',
        href: 'https://quickbooks.intuit.com/self-employed/',
        free: false,
      },
      {
        name: 'FreshBooks',
        description:
          'Invoicing + accounting designed specifically for service businesses. Better client-facing UX than QuickBooks and excellent time-tracking integration.',
        href: 'https://freshbooks.com',
        free: false,
      },
      {
        name: 'FreelanceKit Rate Calculator',
        description:
          'Our free tool — enter your income goal, working hours, and vacation weeks. Get your minimum, recommended, and premium hourly rates instantly. No signup.',
        href: '/tools/rate-calculator',
        badge: 'Free tool',
        badgeColor: 'bg-amber-100 text-amber-700',
        free: true,
      },
    ],
  },
  {
    category: 'Legal & Contracts',
    intro: 'Protect yourself, get paid on time, and avoid scope creep disputes with the right legal tools.',
    items: [
      {
        name: 'DocuSign',
        description:
          'The industry-standard e-signature platform. Clients recognize and trust it, which speeds up contract signing. Free tier limited but paid plans reasonable for active freelancers.',
        href: 'https://docusign.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'HelloSign (Dropbox Sign)',
        description:
          'A more affordable DocuSign alternative. Simple template creation, good audit trail, and cleaner UI. Free tier covers 3 signature requests per month.',
        href: 'https://hellosign.com',
        badge: 'Free tier',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        free: true,
      },
      {
        name: 'FreelanceKit Contract Clauses Library',
        description:
          '20+ ready-to-use contract clauses covering payment terms, scope, IP ownership, termination, kill fees, and liability limits. Copy any clause into your contracts.',
        href: '/tools/contract-clauses',
        badge: 'Free tool',
        badgeColor: 'bg-amber-100 text-amber-700',
        free: true,
      },
      {
        name: 'FreelanceKit Client Onboarding Bundle',
        description:
          'Proposal, contract, welcome packet, and kickoff doc built in Notion — a complete legal and onboarding stack for $19 vs. paying $30+/month for contract SaaS.',
        href: '/shop/client-onboarding-bundle',
        badge: 'Ours',
        badgeColor: 'bg-amber-100 text-amber-700',
        free: false,
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          Freelance Resources
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl">
          Tools and apps we actually recommend for running a professional freelance business. Curated, not comprehensive — only the ones worth your time.
        </p>
        <p className="text-xs text-sand-400 mt-3">
          Some links may be affiliate links. We only recommend tools we genuinely use or endorse.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {RESOURCES.map((section) => (
          <div key={section.category}>
            <h2 className="font-display font-bold text-2xl text-ink mb-2">{section.category}</h2>
            <p className="text-sand-500 mb-6">{section.intro}</p>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white border border-sand-200 rounded-2xl p-6 hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-display font-bold text-ink">{item.name}</h3>
                        {item.badge && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                        {item.free && !item.badge && (
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            Free tier
                          </span>
                        )}
                      </div>
                      <p className="text-sand-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap mt-1"
                      >
                        Visit <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap mt-1"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white text-center">
        <h3 className="font-display text-2xl font-bold mb-2">The system that ties it all together</h3>
        <p className="text-brand-200 mb-6 max-w-md mx-auto">
          The Freelancer OS Notion template connects your CRM, projects, invoicing, and client portal in one workspace — so all these tools have a home base.
        </p>
        <Link
          href="/shop/freelancer-os"
          className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          Get Freelancer OS — $29
        </Link>
      </div>
    </div>
  )
}
