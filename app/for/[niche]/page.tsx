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

  coaches: {
    title: 'Freelance Coaches',
    noun: 'coach',
    headline: 'Spend More Time Coaching. Zero Time on Admin.',
    subheadline:
      'Notion templates for life coaches, business coaches, and career coaches who want to deliver an exceptional client experience — without spending half the week on scheduling, session notes, and invoicing.',
    pains: [
      'Session notes scattered across apps, email threads, and sticky notes',
      'No standard intake process — every client onboarding feels improvised',
      'Difficult to track which clients have paid and which still owe you',
      'Discovery calls that go nowhere because prospects aren\'t properly pre-qualified',
    ],
    benefits: [
      {
        heading: 'One workspace for every client relationship',
        body: 'Track each client\'s goals, session notes, action items, and next appointment in one linked database. Walk into every session knowing exactly where they left off — without digging through emails.',
      },
      {
        heading: 'Professional intake that sets the tone',
        body: 'Use a consistent welcome packet and intake questionnaire with every client. They come in prepared. You come in knowing their goals, challenges, and constraints before the first call.',
      },
      {
        heading: 'Payment tracking without the awkwardness',
        body: 'See all outstanding balances, program payment schedules, and session counts at a glance. Know who\'s due for renewal before the conversation gets uncomfortable.',
      },
    ],
    tools: ['Client relationship database', 'Session notes & action item tracker', 'Invoice and payment schedule tracker', 'Client intake questionnaire template'],
    testimonial: {
      quote:
        "I was keeping client notes in a mix of Google Docs and my notebook. Now every client has a complete record — goals, sessions, action items, everything. My clients actually comment on how organized the whole experience feels.",
      name: 'Rachel B.',
      role: 'Business coach for early-stage founders',
    },
    primaryProduct: {
      name: 'Complete Bundle',
      href: '/shop/complete-bundle',
      price: '$49',
      description: 'Freelancer OS + Client Onboarding Bundle + AI Prompt Pack. Everything a freelance coach needs to deliver a professional experience from first call to final session.',
    },
    keywords: ['notion template freelance coach', 'coaching client management notion', 'life coach business system'],
  },

  marketers: {
    title: 'Freelance Marketers',
    noun: 'marketer',
    headline: 'Run Campaigns. Track Results. Get Paid for Both.',
    subheadline:
      'Notion templates for freelance digital marketers, SEO specialists, and paid media managers who want to manage multiple retainer clients without the chaos.',
    pains: [
      'Tracking deliverables across 4–6 retainer clients without missing anything',
      'Clients who shift priorities mid-month and expect the same deliverables',
      'Monthly reporting rebuilt from scratch every time — hours of avoidable work',
      'Scope creep disguised as "just a quick question" or "one more channel"',
    ],
    benefits: [
      {
        heading: 'Retainer scope tracker for every client',
        body: 'Define exactly what each retainer includes — posts, reports, ad reviews, strategy calls — and track delivery against it. When a client asks for more, you have a clear record of what they\'re already getting.',
      },
      {
        heading: 'Campaign dashboard across all accounts',
        body: 'See the status of every campaign across all clients: what\'s running, pending approval, and due this week. One view replaces twenty Slack threads.',
      },
      {
        heading: 'Monthly report template, ready to fill',
        body: 'Stop building reports from scratch. A consistent template means clients know what to expect — and you finish reporting in 30 minutes instead of 3 hours.',
      },
    ],
    tools: ['Multi-client retainer tracker', 'Campaign status dashboard', 'Invoice and payment tracker', 'Monthly report template'],
    testimonial: {
      quote:
        "Managing 6 retainer clients used to mean constant context-switching and dropped balls. Now I have a single view of what every client is owed this month. I haven't missed a deliverable in three months.",
      name: 'Keisha W.',
      role: 'Freelance digital marketing consultant, e-commerce brands',
    },
    primaryProduct: {
      name: 'Freelancer OS',
      href: '/shop/freelancer-os',
      price: '$29',
      description: 'CRM, project hub, retainer tracker, invoice tracker, and client portal — all linked in Notion. Built for freelancers managing multiple retainer clients.',
    },
    keywords: ['notion template freelance marketer', 'digital marketing freelance system', 'freelance marketing client management'],
  },

  'virtual-assistants': {
    title: 'Virtual Assistants',
    noun: 'virtual assistant',
    headline: 'Serve More Clients. Track Every Minute. Chase Zero Invoices.',
    subheadline:
      'Notion templates for virtual assistants and online business managers who juggle multiple clients and need a clear system to track tasks, time, and invoices — without spreadsheet chaos.',
    pains: [
      'Losing track of which tasks belong to which client when juggling 4+ clients',
      'Time tracking spread across apps, timers, and mental notes',
      'Inconsistent monthly invoicing — some months you over-deliver, some you under-charge',
      'No easy way to show clients what you\'ve completed without a weekly report from scratch',
    ],
    benefits: [
      {
        heading: 'Per-client task boards, unified daily view',
        body: 'Each client gets their own task board — but you see all pending tasks in one unified view. Know exactly what\'s due today across every client, without switching apps.',
      },
      {
        heading: 'Time log that feeds directly into invoices',
        body: 'Log time against each client as you work. At month-end, your invoice is already calculated — hours × rate, per client. No more guessing or reconstructing from memory.',
      },
      {
        heading: 'Client portal for transparent communication',
        body: 'Share a Notion page with each client showing their task status and what\'s been completed this week. Eliminates the "what are you working on?" check-ins that break your flow.',
      },
    ],
    tools: ['Multi-client task boards', 'Time log with monthly totals', 'Per-client invoice tracker', 'Client status portal'],
    testimonial: {
      quote:
        "Before this system I was running client work out of my inbox and a pile of Google Docs. Now I have one place for everything. Invoicing used to take me two hours at the end of each month — now it takes 20 minutes.",
      name: 'Sienna J.',
      role: 'Virtual assistant and OBM, 9 clients',
    },
    primaryProduct: {
      name: 'Freelancer OS',
      href: '/shop/freelancer-os',
      price: '$29',
      description: 'Notion workspace for VAs: multi-client task tracking, time log with invoice formulas, CRM, and client portals. Works on Notion\'s free plan.',
    },
    keywords: ['notion template virtual assistant', 'VA client management system', 'virtual assistant business notion'],
  },

  writers: {
    title: 'Freelance Writers',
    noun: 'writer',
    headline: 'Get Paid for Every Draft — and Every Revision',
    subheadline:
      'Notion templates for freelance writers, content strategists, and ghostwriters who want clear deliverables, painless invoicing, and a client experience that earns referrals.',
    pains: [
      'Revision requests that go well past what was quoted — with no documentation to push back',
      'Clients who disappear after delivery, then resurface demanding changes weeks later',
      'Managing deadlines, briefs, and drafts across multiple clients in one messy inbox',
      'Invoicing that feels like chasing because there\'s no consistent process',
    ],
    benefits: [
      {
        heading: 'Project hub with revision round tracking',
        body: 'Every project logs its contracted revision count. When a client asks for round four on a two-revision contract, you have the documentation ready — and a quote for additional rounds.',
      },
      {
        heading: 'Brief, draft, and approval in one place',
        body: 'Store the creative brief, link drafts, and track approval status per project. Know at a glance which pieces are awaiting client approval, in revision, or final.',
      },
      {
        heading: 'Invoice tracker with outstanding balance view',
        body: 'See all unpaid invoices in one view. Set follow-up dates. Know your monthly revenue in under 10 seconds — and never let a payment go stale.',
      },
    ],
    tools: ['Project hub with revision tracking', 'Brief and draft library', 'Invoice tracker with follow-up dates', 'Client CRM with pipeline'],
    testimonial: {
      quote:
        "I've been freelancing for five years and revision disputes used to be constant. Now every project starts with a signed brief and a clear revision count. I've had exactly one scope argument since — and I won it.",
      name: 'Megan H.',
      role: 'Freelance B2B content writer and ghostwriter',
    },
    primaryProduct: {
      name: 'Client Onboarding Bundle',
      href: '/shop/client-onboarding-bundle',
      price: '$19',
      description: 'Proposal template with revision scope, contract with approval clause, and welcome packet — everything you need to set clear expectations from day one.',
    },
    keywords: ['notion template freelance writer', 'freelance writing client management', 'content writer business system'],
  },

  'social-media-managers': {
    title: 'Social Media Managers',
    noun: 'social media manager',
    headline: 'Manage More Accounts. Miss Zero Deadlines.',
    subheadline:
      'Notion templates for freelance social media managers who juggle multiple client accounts, approval workflows, and monthly reporting — without losing track of what\'s live and what\'s late.',
    pains: [
      'Content approval requests scattered across DMs, email, and comment threads',
      'Clients who want "just one more post" without adjusting the retainer scope',
      'Monthly reporting rebuilt from scratch every time — a half-day of avoidable work',
      'No clear record of deliverables, so scope debates are impossible to win',
    ],
    benefits: [
      {
        heading: 'Content calendar with approval tracking',
        body: 'Track every post — platform, status, scheduled date, and whether it\'s been client-approved. One view shows you what\'s draft, pending approval, scheduled, and live across every account.',
      },
      {
        heading: 'Per-client retainer scope log',
        body: 'Define what each retainer includes (posts per platform, stories, reports, strategy calls) and track delivery against it. When a client asks for more, you have a record of what they\'re already getting.',
      },
      {
        heading: 'Monthly report template, ready to use',
        body: 'Stop rebuilding your report from zero. A consistent template covers reach, engagement, follower growth, and top content. Fill it in and send — in 30 minutes, not three hours.',
      },
    ],
    tools: ['Multi-client content calendar', 'Retainer scope and deliverable tracker', 'Client CRM with approval workflow', 'Monthly report template'],
    testimonial: {
      quote:
        "Managing 5 clients' social media used to feel chaotic — I was always afraid of dropping the ball. Now I have a weekly view of what needs to go live across all accounts, and content approval is a single shared Notion page. Game-changer.",
      name: 'Jade T.',
      role: 'Freelance social media manager, 5 brand clients',
    },
    primaryProduct: {
      name: 'Freelancer OS',
      href: '/shop/freelancer-os',
      price: '$29',
      description: 'Notion workspace with content calendar, multi-client CRM, retainer scope tracker, and invoice tracking. Built for social media managers who run multiple accounts.',
    },
    keywords: ['notion template social media manager', 'freelance social media management system', 'content calendar notion template'],
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `FreelanceKit for ${config.title}`,
    description: config.subheadline,
    url: `${SITE.url}/for/${params.niche}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: `For ${config.title}`, item: `${SITE.url}/for/${params.niche}` },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
