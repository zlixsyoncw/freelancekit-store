import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'
import { SITE } from '@/lib/site'
import EmailCapture from '@/components/EmailCapture'

type NicheConfig = {
  title: string
  noun: string
  headline: string
  subheadline: string
  pains: string[]
  benefits: { heading: string; body: string }[]
  tools: string[]
  testimonial: { quote: string; name: string; role: string }
  primaryProduct: { name: string; href: string; price: string; description: string }
  keywords: string[]
}

const NICHES: Record<string, NicheConfig> = {
  designers: {
    title: 'Freelance Designers',
    noun: 'designer',
    headline: 'Run a Profitable Design Practice — Without the Admin Chaos',
    subheadline:
      'Notion templates built specifically for graphic designers, UI/UX designers, and brand identity freelancers who want to spend more time designing and less time managing.',
    pains: [
      'Scope creep eating your margins on every project',
      'Revision rounds ballooning past what the contract covers',
      'Chasing invoices instead of chasing great briefs',
      'Losing track of which files went to which client',
    ],
    benefits: [
      {
        heading: 'Track revisions per project',
        body: 'Log every revision request against the contracted number. Know exactly when a client is asking for out-of-scope work — and have the data to back up a scope change conversation.',
      },
      {
        heading: 'Know your real hourly rate per project',
        body: 'Link your time log to each project. The profitability dashboard shows you which clients and project types actually make you money — so you can price better next time.',
      },
      {
        heading: 'Shareable client portal, no login required',
        body: 'Share a Notion page with each client showing exactly where their project stands. Eliminates the "any updates?" emails that break your focus every afternoon.',
      },
    ],
    tools: ['Client CRM with pipeline', 'Project hub with revision tracking', 'Invoice tracker with profitability', 'Shareable client portal'],
    testimonial: {
      quote:
        "I used to run everything through a mess of Google Docs and sticky notes. Now I open Notion in the morning and I know exactly what's due, what's unpaid, and which project is at risk. It changed how I pitch clients too — I actually know my numbers.",
      name: 'Jordan K.',
      role: 'Brand identity designer, 6 years freelance',
    },
    primaryProduct: {
      name: 'Freelancer OS',
      href: '/shop/freelancer-os',
      price: '$29',
      description: 'The complete Notion workspace: CRM, projects with revision tracking, invoice tracker, and client portal. Built for designers.',
    },
    keywords: ['notion template freelance designer', 'notion crm designer', 'freelance graphic design business system'],
  },

  developers: {
    title: 'Freelance Developers',
    noun: 'developer',
    headline: 'Stop Leaving Money on the Table Between Contracts',
    subheadline:
      'Notion templates for freelance web developers, mobile developers, and software engineers who want to maximize revenue, minimize client friction, and build a sustainable practice.',
    pains: [
      'Underpricing projects because you never tracked how long they actually took',
      'Scope creep from clients who add "one small feature" every week',
      'Dead periods between contracts eating into annual income',
      'No system for tracking leads, follow-ups, or contract renewals',
    ],
    benefits: [
      {
        heading: 'Price projects from real data',
        body: "Time-log every project and see your true hourly rate. Within 3 months you'll have benchmarks that make it impossible to undercharge for similar work.",
      },
      {
        heading: 'Manage retainer clients without spreadsheets',
        body: 'Track monthly hours, deliverables, and renewal dates for every retainer. Know at a glance which clients need attention and which contracts are up for renewal.',
      },
      {
        heading: "CRM that follows up so you don't forget",
        body: "Set a follow-up date for every lead. The CRM surfaces who to contact today, so warm prospects don't go cold while you're deep in a sprint.",
      },
    ],
    tools: ['Lead CRM with follow-up reminders', 'Retainer tracker', 'Time log with rate analysis', 'Project scope documents'],
    testimonial: {
      quote:
        "I went from $95/hr to $160/hr over two years. The biggest unlock was tracking my time per project and seeing how much I was actually making — it was embarrassing at first, but it fixed my pricing permanently.",
      name: 'Marcus T.',
      role: 'Freelance full-stack developer, React + Node',
    },
    primaryProduct: {
      name: 'Freelancer OS',
      href: '/shop/freelancer-os',
      price: '$29',
      description: 'CRM, project hub, time tracker, invoice tracker, and client portal — all linked in Notion. Built for solo developers.',
    },
    keywords: ['notion template freelance developer', 'freelance developer business system', 'notion crm developer'],
  },

  copywriters: {
    title: 'Freelance Copywriters',
    noun: 'copywriter',
    headline: 'More Writing. Less Admin. Fewer "Can You Just..." Emails.',
    subheadline:
      'Notion templates for freelance copywriters, content strategists, and email marketers who want clear project boundaries, consistent invoicing, and a client experience that gets referrals.',
    pains: [
      '"Can you just add one more thing?" on every single deliverable',
      'No consistent process for onboarding new clients — starting from scratch each time',
      'Unclear scope leading to 6 rounds of edits on what was quoted as 2',
      'Getting paid late because your invoicing process is ad hoc',
    ],
    benefits: [
      {
        heading: 'Standardized onboarding that sets expectations',
        body: 'Use the same intake process and kickoff template for every client. Clear scope, agreed deliverable count, and revision limits — documented before work begins. The clients who argue about extras? They stop being clients.',
      },
      {
        heading: 'Project hub with deliverable tracking',
        body: "Track every piece of copy, draft round, and approval status. Know at a glance what's waiting on a client versus what you need to deliver this week.",
      },
      {
        heading: 'Invoice tracker with outstanding balance view',
        body: 'See all unpaid invoices in one view. Send payment reminders from templates. Know your revenue for the month in under 10 seconds.',
      },
    ],
    tools: ['Client intake templates', 'Project hub with draft tracking', 'Invoice tracker', 'Client portal for deliverable handoff'],
    testimonial: {
      quote:
        "The client onboarding bundle alone was worth 10x the price. I send the same proposal, contract, and kickoff packet every time — and clients come in with the right expectations. Revision arguments dropped to almost zero.",
      name: 'Priya M.',
      role: 'Email copywriter for e-commerce brands',
    },
    primaryProduct: {
      name: 'Client Onboarding Bundle',
      href: '/shop/client-onboarding-bundle',
      price: '$19',
      description: 'Proposal template, contract template, welcome packet, and kickoff doc — everything you need to onboard a client professionally.',
    },
    keywords: ['notion template freelance copywriter', 'copywriter client management', 'freelance copywriting system'],
  },

  consultants: {
    title: 'Independent Consultants',
    noun: 'consultant',
    headline: 'Run a Consulting Practice That Scales Past Your Hours',
    subheadline:
      'Notion templates for independent consultants, fractional executives, and strategy advisors who want to productize their expertise, track deliverables, and stop billing purely by the hour.',
    pains: [
      'Billing hourly caps your income — you hit a ceiling and can\'t grow past it',
      'No system for tracking which advisory relationships are most valuable',
      'Client check-ins requiring you to manually write status updates',
      'Unclear deliverables leading to "engagement drift" — scope that grows without additional fees',
    ],
    benefits: [
      {
        heading: 'Track retainer deliverables, not just hours',
        body: 'Define what each retainer includes — calls, deliverables, reviews — and track them. When a client wants more than the retainer covers, you have the documentation to have that conversation.',
      },
      {
        heading: 'Dashboard for all active engagements',
        body: 'One view of every active engagement: status, next milestone, contract renewal date, and whether invoices are current. Run a tighter practice without adding admin hours.',
      },
      {
        heading: 'Client portal for async updates',
        body: 'Share a portal with each client that shows current priorities and recent progress. Reduces check-in calls and signals that you operate at a premium level.',
      },
    ],
    tools: ['Engagement tracker', 'Retainer deliverable log', 'Client portal', 'CRM with renewal tracking'],
    testimonial: {
      quote:
        "Moving from hourly billing to retainers changed my business. The system helped me document what each retainer included so clearly that scope conversations became easy. I doubled my monthly revenue within six months.",
      name: 'David R.',
      role: 'Fractional CMO, B2B SaaS companies',
    },
    primaryProduct: {
      name: 'Complete Bundle',
      href: '/shop/complete-bundle',
      price: '$49',
      description: 'Freelancer OS + Client Onboarding Bundle + AI Prompt Pack. Everything a consultant needs to run a professional, profitable practice.',
    },
    keywords: ['notion template independent consultant', 'consulting practice management notion', 'fractional executive notion system'],
  },

  photographers: {
    title: 'Freelance Photographers',
    noun: 'photographer',
    headline: 'Spend More Time Behind the Camera, Less Time Behind the Desk',
    subheadline:
      'Notion templates for freelance photographers — wedding, commercial, portrait, and event — who want professional client management, clear deliverable timelines, and invoices that actually get paid.',
    pains: [
      'Chasing clients for the second payment before the shoot',
      'Unclear deliverable timelines leading to "when are my photos ready?" emails',
      'No standard contract leading to disputes about what\'s included',
      'Losing track of which gallery has been delivered and which is waiting on final payment',
    ],
    benefits: [
      {
        heading: 'Booking pipeline with deposit tracking',
        body: 'See every inquiry, booked shoot, and delivery in one pipeline. Track deposit received, shoot date, editing status, and final payment — for every client, updated in real time.',
      },
      {
        heading: 'Delivery tracker with gallery status',
        body: 'Know at a glance which shoots are editing-in-progress, which galleries have been delivered, and which are awaiting client approval before final payment release.',
      },
      {
        heading: 'Clear contract and onboarding flow',
        body: 'Use the same booking confirmation, contract, and shot-list document every time. Clients know exactly what they\'re getting and when. Misunderstandings drop. Referrals go up.',
      },
    ],
    tools: ['Booking CRM with pipeline', 'Shoot and delivery tracker', 'Invoice tracker with payment status', 'Client gallery handoff portal'],
    testimonial: {
      quote:
        "Wedding season used to be chaos — I'd have 30 couples at various stages and no idea who was waiting on what. Now I open my dashboard and the whole season is visible. And I haven't had a payment dispute since I started using the contract template.",
      name: 'Alicia P.',
      role: 'Wedding and portrait photographer',
    },
    primaryProduct: {
      name: 'Freelancer OS',
      href: '/shop/freelancer-os',
      price: '$29',
      description: 'Complete Notion workspace with booking CRM, shoot tracker, delivery pipeline, and invoice tracker — all linked.',
    },
    keywords: ['notion template freelance photographer', 'photography business management notion', 'photographer client system'],
  },
}

export function generateStaticParams() {
  return Object.keys(NICHES).map((niche) => ({ niche }))
}

export async function generateMetadata({ params }: { params: { niche: string } }): Promise<Metadata> {
  const config = NICHES[params.niche]
  if (!config) return {}
  return {
    title: `FreelanceKit for ${config.title}`,
    description: config.subheadline,
    alternates: { canonical: `${SITE.url}/for/${params.niche}` },
  }
}

export default function NichePage({ params }: { params: { niche: string } }) {
  const config = NICHES[params.niche]
  if (!config) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="text-sm text-sand-400 mb-8">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-ink">For {config.title}</span>
      </div>

      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          Built for {config.title}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-5 leading-tight">
          {config.headline}
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl leading-relaxed">{config.subheadline}</p>
      </div>

      {/* Pain points */}
      <div className="bg-sand-50 border border-sand-200 rounded-2xl p-8 mb-12">
        <h2 className="font-display font-bold text-xl text-ink mb-5">Sound familiar?</h2>
        <ul className="space-y-3">
          {config.pains.map((pain) => (
            <li key={pain} className="flex items-start gap-3 text-sand-600">
              <span className="text-sand-400 mt-0.5 flex-shrink-0">—</span>
              <span>{pain}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-14">
        <h2 className="font-display font-bold text-2xl text-ink mb-8">What changes with FreelanceKit</h2>
        <div className="space-y-6">
          {config.benefits.map((b) => (
            <div key={b.heading} className="flex gap-5">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-ink mb-1">{b.heading}</h3>
                <p className="text-sand-600 leading-relaxed">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="bg-white border border-sand-200 rounded-2xl p-8 mb-12">
        <h2 className="font-display font-bold text-xl text-ink mb-5">What's inside</h2>
        <ul className="space-y-2.5">
          {config.tools.map((tool) => (
            <li key={tool} className="flex items-center gap-2.5 text-sand-700">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{tool}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonial */}
      <blockquote className="border-l-4 border-brand-300 pl-6 mb-14">
        <p className="text-ink text-lg leading-relaxed mb-4">"{config.testimonial.quote}"</p>
        <footer className="text-sand-500 text-sm">
          <strong className="text-ink">{config.testimonial.name}</strong> — {config.testimonial.role}
        </footer>
      </blockquote>

      {/* Primary product CTA */}
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white mb-12">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="flex-1 min-w-0">
            <div className="text-brand-200 text-xs font-bold uppercase tracking-widest mb-2">Recommended for {config.title}</div>
            <h3 className="font-display text-2xl font-bold mb-2">{config.primaryProduct.name}</h3>
            <p className="text-brand-100 leading-relaxed mb-5">{config.primaryProduct.description}</p>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-brand-200 text-sm ml-1">4.9 / 5 from 200+ freelancers</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl font-extrabold font-display">{config.primaryProduct.price}</div>
            <Link
              href={config.primaryProduct.href}
              className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Get it now <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-brand-300 text-xs text-center">One-time purchase · 30-day guarantee</p>
          </div>
        </div>
      </div>

      {/* Email capture */}
      <div className="bg-sand-50 border border-sand-200 rounded-2xl p-8">
        <h3 className="font-display font-bold text-xl text-ink mb-2">
          Get free freelance tips for {config.title.toLowerCase()}
        </h3>
        <p className="text-sand-500 mb-5">
          Weekly insights on pricing, clients, and business systems. No fluff. Unsubscribe any time.
        </p>
        <EmailCapture source={`niche-${params.niche}`} buttonText="Subscribe free" />
      </div>

      {/* Browse more niches */}
      <div className="mt-12 pt-8 border-t border-sand-100">
        <p className="text-sm text-sand-400 mb-4">Also built for:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(NICHES)
            .filter(([key]) => key !== params.niche)
            .map(([key, cfg]) => (
              <Link
                key={key}
                href={`/for/${key}`}
                className="text-sm text-brand-600 hover:text-brand-700 font-medium border border-brand-200 hover:border-brand-300 rounded-full px-3 py-1 transition-colors"
              >
                {cfg.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
