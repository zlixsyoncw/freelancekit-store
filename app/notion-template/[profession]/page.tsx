import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, Star, Clock } from 'lucide-react'
import { SITE } from '@/lib/site'
import { POSTS, formatDate } from '@/lib/blog'
import EmailCapture from '@/components/EmailCapture'

const NOTION_FEATURED_POSTS = [
  'notion-for-freelancers-complete-guide',
  'notion-crm-for-freelancers',
  'best-notion-templates-for-freelancers',
  'freelance-client-onboarding',
]

type ProfessionConfig = {
  title: string
  noun: string
  headline: string
  subheadline: string
  notionUses: string[]
  features: { heading: string; body: string }[]
  testimonial: { quote: string; name: string; role: string }
  metaTitle: string
  metaDescription: string
}

const PROFESSIONS: Record<string, ProfessionConfig> = {
  'freelance-designers': {
    title: 'Freelance Designers',
    noun: 'designer',
    headline: 'The Notion Template Freelance Designers Actually Use',
    subheadline: 'Stop running your design practice from a pile of Google Docs and sticky notes. One Notion workspace tracks every client, project, revision, and invoice — all connected.',
    notionUses: [
      'CRM: Track every lead, proposal, and active client in one database',
      'Project hub: Manage deliverables, revision rounds, and client files per project',
      'Invoice tracker: See outstanding, paid, and overdue invoices with one-click revenue totals',
      'Client portal: Share a public Notion page so clients see exactly where their project stands',
      'Time log: Track hours per project to know your real effective hourly rate',
    ],
    features: [
      {
        heading: 'Never lose a lead again',
        body: 'The CRM auto-surfaces who to follow up with today. Every prospect has a last-contact date and a next-action field — so warm leads don\'t go cold while you\'re in the middle of a project.',
      },
      {
        heading: 'Revision tracking that protects you',
        body: 'Log revision rounds against each project. When a client asks for revision four on a two-round contract, you have the documented count ready for a scope change conversation.',
      },
      {
        heading: 'Revenue dashboard in seconds',
        body: 'The invoice tracker uses a Notion formula to show you Revenue This Month, Total Outstanding, and Year-to-Date — updated every time you mark an invoice paid.',
      },
    ],
    testimonial: {
      quote: "I was managing client work across 6 different apps. Now it's all in one Notion workspace. My clients think I have a full studio behind me.",
      name: 'Jordan K.',
      role: 'Brand identity designer, 6 years freelance',
    },
    metaTitle: 'Notion Template for Freelance Designers — FreelanceKit',
    metaDescription: 'The complete Notion workspace for freelance graphic designers, UI/UX designers, and brand designers. CRM, project hub with revision tracking, invoice tracker, and client portal.',
  },

  'freelance-developers': {
    title: 'Freelance Developers',
    noun: 'developer',
    headline: 'Notion Template for Freelance Developers Who Hate Admin Work',
    subheadline: 'One Notion workspace to manage every client, project, retainer, and invoice — so you spend more time writing code and less time tracking things in your head.',
    notionUses: [
      'CRM: Track every lead, follow-up, and active client with pipeline views',
      'Retainer tracker: Monitor monthly hours, deliverables, and contract renewal dates',
      'Project hub: Manage scope, milestones, and client communication per project',
      'Invoice tracker: Log invoices, track payment status, and see monthly revenue',
      'Time log: Track hours per project to calculate your true effective hourly rate',
    ],
    features: [
      {
        heading: 'Know your real hourly rate per client',
        body: 'Time-log every project, then see your actual earnings per hour. After 60 days you\'ll have benchmarks that make pricing similar projects trivially accurate.',
      },
      {
        heading: 'Manage retainer clients without spreadsheets',
        body: 'Track monthly deliverables, hours burned, and renewal dates for every retainer in one view. Know which clients need attention before they email you asking for an update.',
      },
      {
        heading: 'CRM that keeps leads warm',
        body: 'Every prospect has a follow-up date. The Today view surfaces exactly who to contact — so warm leads don\'t go cold during a busy sprint.',
      },
    ],
    testimonial: {
      quote: "I went from $95/hr to $160/hr over two years. Tracking my time per project showed me how much I was actually making — and it fixed my pricing permanently.",
      name: 'Marcus T.',
      role: 'Freelance full-stack developer, React + Node',
    },
    metaTitle: 'Notion Template for Freelance Developers — FreelanceKit',
    metaDescription: 'The Notion workspace built for freelance web developers and software engineers. CRM, retainer tracker, time log, project hub, and invoice tracker — all linked.',
  },

  'freelance-copywriters': {
    title: 'Freelance Copywriters',
    noun: 'copywriter',
    headline: 'Notion Template for Copywriters Who Want to Stop Chasing Invoices',
    subheadline: 'A complete Notion system for freelance copywriters: client intake, brief management, draft tracking, revision logging, and invoicing — all connected in one workspace.',
    notionUses: [
      'CRM: Track proposals, active clients, and follow-ups in one pipeline view',
      'Project hub: Manage briefs, drafts, revision rounds, and approval status',
      'Invoice tracker: Log invoices, track payment status, and see monthly revenue',
      'Client portal: Share a Notion page with each client showing project status',
      'Template library: Store reusable briefs, email scripts, and welcome packets',
    ],
    features: [
      {
        heading: 'Brief, draft, and approval in one record',
        body: 'Every project stores its brief, links to drafts, and tracks approval status. No more hunting through email threads to find what version the client saw.',
      },
      {
        heading: 'Revision round tracking',
        body: 'Log revision rounds against your contract. When a client asks for round five on a two-round project, you have the count documented and can have the scope conversation from a position of fact.',
      },
      {
        heading: 'Invoice that goes out the day you deliver',
        body: 'Send the invoice the moment you deliver — not at the end of the month. The invoice tracker shows every outstanding balance and follow-up date so nothing falls through the cracks.',
      },
    ],
    testimonial: {
      quote: "My clients love how organized the whole experience feels. They send me a brief, get back a polished first draft, and see the invoice the same day I deliver. It feels like an agency.",
      name: 'Priya M.',
      role: 'Email copywriter for e-commerce brands',
    },
    metaTitle: 'Notion Template for Freelance Copywriters — FreelanceKit',
    metaDescription: 'Notion workspace for freelance copywriters: CRM, brief management, revision tracking, invoice tracker, and client portal. One-time $29.',
  },

  'freelance-photographers': {
    title: 'Freelance Photographers',
    noun: 'photographer',
    headline: 'Notion Template for Photographers Who Are Done With Spreadsheet Chaos',
    subheadline: 'A complete Notion workspace for freelance photographers: booking pipeline, shoot tracker, delivery log, and invoice tracker — all connected so you always know the status of every booking.',
    notionUses: [
      'Booking CRM: Track every inquiry, deposit, shoot date, and gallery delivery',
      'Shoot tracker: Manage pre-shoot prep, editing status, and delivery per booking',
      'Invoice tracker: Track deposit received, final payment due, and outstanding balances',
      'Client portal: Share a Notion page with each client showing shoot status and gallery link',
      'Contract tracker: Log which contracts have been signed before work begins',
    ],
    features: [
      {
        heading: 'Booking pipeline from inquiry to delivery',
        body: 'Every booking moves through a pipeline: Inquiry → Deposit Received → Shoot Confirmed → Editing → Delivered → Payment Complete. You see the full picture at a glance.',
      },
      {
        heading: 'Never miss a deposit before the shoot',
        body: 'The deposit status field on every booking makes it impossible to show up for a shoot that hasn\'t been secured financially. One view shows you every booking missing a deposit.',
      },
      {
        heading: 'Gallery delivery tracker',
        body: 'Track editing progress and delivery status per shoot. Know exactly which galleries are done, which are in editing, and which are waiting on client payment before release.',
      },
    ],
    testimonial: {
      quote: "Wedding season used to be chaos — 30 couples at various stages and no idea who was waiting on what. Now I open my dashboard and the whole season is visible. Zero payment disputes since I started using the contract template.",
      name: 'Alicia P.',
      role: 'Wedding and portrait photographer',
    },
    metaTitle: 'Notion Template for Freelance Photographers — FreelanceKit',
    metaDescription: 'Complete Notion workspace for freelance photographers. Booking CRM, shoot tracker, delivery pipeline, and invoice tracker. One-time purchase.',
  },

  'virtual-assistants': {
    title: 'Virtual Assistants',
    noun: 'VA',
    headline: 'Notion Template for VAs Managing 5+ Clients Without Losing Track',
    subheadline: 'A complete Notion system for virtual assistants: per-client task boards, time log with invoice totals, CRM, and client status portals — so you always know what needs to happen today.',
    notionUses: [
      'Multi-client task boards: Each client has their own board; you see all tasks in one daily view',
      'Time log: Track hours per client with monthly auto-totals for accurate invoicing',
      'Invoice tracker: Log monthly invoices per client and track payment status',
      'Client CRM: Track onboarding status, scope, and key contacts for every client',
      'Client portals: Share a Notion page with each client showing task status this week',
    ],
    features: [
      {
        heading: 'All clients, one daily view',
        body: 'Each client gets their own task board, but a unified "Today" view across all boards shows you everything due today regardless of which client it\'s for. Zero context-switching to see your full day.',
      },
      {
        heading: 'Time log that builds the invoice for you',
        body: 'Log time against each client as you work. A formula totals the hours monthly per client — so invoicing is pulling a number, not reconstructing from memory.',
      },
      {
        heading: 'Client portal in one click',
        body: 'Share a Notion page with each client showing exactly what you\'ve completed this week. Eliminates the "what have you been working on?" emails that interrupt your flow.',
      },
    ],
    testimonial: {
      quote: "Invoicing used to take me two hours at the end of each month — now it takes 20 minutes. I just pull the time totals per client and send. Everything else is already in Notion.",
      name: 'Sienna J.',
      role: 'VA and OBM, 9 clients',
    },
    metaTitle: 'Notion Template for Virtual Assistants — FreelanceKit',
    metaDescription: 'Notion workspace for VAs and OBMs. Multi-client task boards, time log with invoice totals, CRM, and client portals. Works on Notion\'s free plan.',
  },

  'freelance-consultants': {
    title: 'Independent Consultants',
    noun: 'consultant',
    headline: 'Notion Template for Consultants Running Multiple Engagements',
    subheadline: 'A complete Notion workspace for independent consultants: engagement tracker, retainer scope management, client portal, and invoice tracker — so you run a tighter practice with less admin.',
    notionUses: [
      'Engagement tracker: See every active engagement status, next milestone, and renewal date',
      'Retainer scope log: Track what each retainer includes and delivery against scope',
      'Client portal: Share async status updates so clients don\'t need check-in calls',
      'Invoice tracker: Track consulting invoices with outstanding and paid views',
      'Lead CRM: Manage proposals, referrals, and pipeline for new engagements',
    ],
    features: [
      {
        heading: 'All engagements visible at once',
        body: 'One dashboard shows every active engagement: status, next deliverable, contract renewal date, and whether the latest invoice is paid. Nothing falls off your radar.',
      },
      {
        heading: 'Retainer scope that prevents scope creep',
        body: 'Define exactly what each retainer includes — calls, reports, deliverables — and track completion. When clients ask for more, you have a documented record of what\'s already included.',
      },
      {
        heading: 'Async client portal that reduces check-in calls',
        body: 'Share a Notion page with each client showing current priorities and recent progress. Many clients prefer it to weekly calls — and it signals that you operate at a premium level.',
      },
    ],
    testimonial: {
      quote: "Moving to retainers doubled my monthly revenue. The system helped me define what each retainer included so clearly that scope conversations became easy instead of awkward.",
      name: 'David R.',
      role: 'Fractional CMO, B2B SaaS companies',
    },
    metaTitle: 'Notion Template for Independent Consultants — FreelanceKit',
    metaDescription: 'Notion workspace for independent consultants and fractional executives. Engagement tracker, retainer scope log, client portal, and invoice tracker.',
  },

  'freelance-coaches': {
    title: 'Freelance Coaches',
    noun: 'coach',
    headline: 'Notion Template for Coaches Who Want to Spend More Time Coaching',
    subheadline: 'A complete Notion workspace for life coaches, business coaches, and career coaches: client relationship database, session notes, payment tracker, and intake templates — all connected.',
    notionUses: [
      'Client database: Track every client\'s goals, program, session count, and payment status',
      'Session notes: Log notes and action items per session, linked to each client record',
      'Payment tracker: Track program payments, outstanding balances, and renewal dates',
      'Intake templates: Standardize your onboarding with a consistent questionnaire',
      'CRM: Manage discovery calls, proposals, and new client pipeline',
    ],
    features: [
      {
        heading: 'Full client history in one place',
        body: 'Every client record includes their goals, session notes, action items, and payment history. You walk into every session with complete context — even if it\'s been three weeks since you last spoke.',
      },
      {
        heading: 'Consistent onboarding process',
        body: 'Every new client goes through the same intake questionnaire and welcome sequence. They come in prepared. You come in knowing their goals, constraints, and what success looks like for them.',
      },
      {
        heading: 'Payment tracking without the awkwardness',
        body: 'See all program payment schedules, outstanding balances, and upcoming renewals in one view. Know who\'s due for a payment discussion before it becomes an uncomfortable surprise.',
      },
    ],
    testimonial: {
      quote: "My clients comment on how organized and professional the experience feels. What they don't know is that it's just Notion — one workspace I check every morning.",
      name: 'Rachel B.',
      role: 'Business coach for early-stage founders',
    },
    metaTitle: 'Notion Template for Freelance Coaches — FreelanceKit',
    metaDescription: 'Notion workspace for life coaches, business coaches, and career coaches. Client database, session notes, payment tracker, and intake templates. One-time purchase.',
  },

  'social-media-managers': {
    title: 'Social Media Managers',
    noun: 'social media manager',
    headline: 'Notion Template for Social Media Managers Who Run Multiple Accounts',
    subheadline: 'A complete Notion workspace for freelance social media managers: multi-client content calendar, retainer scope tracker, client approval workflow, and invoice tracker — all connected.',
    notionUses: [
      'Content calendar: Track every post by platform, client, status, and scheduled date',
      'Retainer scope log: Define deliverables per retainer and track against them',
      'Approval workflow: Track which content is pending client approval',
      'Invoice tracker: Monthly invoices per client with payment status',
      'Client CRM: Manage onboarding, brand guidelines, and contacts for each client',
    ],
    features: [
      {
        heading: 'Content status across all accounts',
        body: 'One view shows every post across every client account: draft, pending approval, scheduled, or published. You see at a glance what needs your attention today, across all five (or fifteen) accounts.',
      },
      {
        heading: 'Retainer scope documentation',
        body: 'Log exactly what each retainer includes — posts per platform, stories, reels, monthly reports. When clients ask for more, you have a clear record of what they\'re already getting for the retainer fee.',
      },
      {
        heading: 'Client approval tracking',
        body: 'Track whether content is waiting on client approval, approved, or ready to schedule — per post, per client. No more digging through DMs and emails to find out what\'s been signed off.',
      },
    ],
    testimonial: {
      quote: "Managing 5 clients' social media felt chaotic before this. Now I have a weekly view of what needs to go live across all accounts. Content approval is one shared Notion page per client.",
      name: 'Jade T.',
      role: 'Freelance social media manager, 5 brand clients',
    },
    metaTitle: 'Notion Template for Social Media Managers — FreelanceKit',
    metaDescription: 'Notion workspace for freelance social media managers. Multi-client content calendar, retainer scope tracker, approval workflow, and invoice tracker.',
  },

  'freelance-writers': {
    title: 'Freelance Writers',
    noun: 'writer',
    headline: 'Notion Template for Freelance Writers Who Want to Protect Their Time',
    subheadline: 'A complete Notion system for freelance writers and ghostwriters: project hub with revision tracking, brief library, invoice tracker, and client CRM — all connected.',
    notionUses: [
      'Project hub: Track briefs, drafts, revision rounds, and approval status per piece',
      'Client CRM: Manage proposals, active clients, and follow-ups in one view',
      'Invoice tracker: Send invoices, track payment status, see monthly revenue',
      'Brief library: Store reusable brief templates for different content types',
      'Client portal: Share a Notion page showing which pieces are in progress',
    ],
    features: [
      {
        heading: 'Brief, draft, and revision in one record',
        body: 'Each piece stores the creative brief, links to Google Doc drafts, and tracks which revision round it\'s on. You always know what version is where, without searching through email.',
      },
      {
        heading: 'Revision count that protects you',
        body: 'Every project logs its contracted revision rounds. When a client asks for revision five on a two-round agreement, you have documented proof — and a quote ready for the additional rounds.',
      },
      {
        heading: 'Invoice the day you deliver',
        body: 'Add an invoice to the tracker the moment you send a draft. The tracker surfaces outstanding invoices with follow-up dates — so every payment is actively monitored, not passively hoped for.',
      },
    ],
    testimonial: {
      quote: "I've had exactly one scope argument in two years of using this system. Before it, revision disputes were a constant source of stress. The brief is signed, the revision count is documented, and everyone knows the rules.",
      name: 'Megan H.',
      role: 'Freelance B2B content writer and ghostwriter',
    },
    metaTitle: 'Notion Template for Freelance Writers — FreelanceKit',
    metaDescription: 'Notion workspace for freelance writers and ghostwriters. Project hub with revision tracking, invoice tracker, brief library, and client CRM.',
  },

  'freelance-marketers': {
    title: 'Freelance Marketers',
    noun: 'marketer',
    headline: 'Notion Template for Freelance Marketers Managing Multiple Retainers',
    subheadline: 'A complete Notion workspace for freelance digital marketers: multi-client retainer tracker, campaign status dashboard, invoice tracker, and monthly report template — all connected.',
    notionUses: [
      'Retainer tracker: Define deliverables per client and track delivery against scope',
      'Campaign status: See what\'s running, pending, or overdue across all accounts',
      'Invoice tracker: Monthly invoices per client with outstanding and paid views',
      'Monthly report: Template ready to fill in for faster reporting',
      'Client CRM: Track proposals, onboarding, and active client info',
    ],
    features: [
      {
        heading: 'Retainer scope that survives the month',
        body: 'Log what each retainer includes — posts, reports, ad reviews, strategy calls — and track completion. When a client asks for more, you have a documented record of what\'s already included in their fee.',
      },
      {
        heading: 'Campaign status across all clients',
        body: 'One dashboard shows every campaign across every client: what\'s live, what\'s pending approval, what needs attention this week. Replaces the Slack thread chaos.',
      },
      {
        heading: 'Monthly reporting in 30 minutes',
        body: 'A consistent report template means you\'re not building from scratch each month. Clients get a professional report. You save two hours. Everyone wins.',
      },
    ],
    testimonial: {
      quote: "Managing 6 retainer clients used to mean dropped balls. Now I have a single view of every client's deliverables for the month. I haven't missed a deadline in four months.",
      name: 'Keisha W.',
      role: 'Freelance digital marketing consultant, e-commerce brands',
    },
    metaTitle: 'Notion Template for Freelance Marketers — FreelanceKit',
    metaDescription: 'Notion workspace for freelance digital marketers. Multi-client retainer tracker, campaign dashboard, invoice tracker, and monthly report template.',
  },

  'freelance-video-editors': {
    title: 'Freelance Video Editors',
    noun: 'video editor',
    headline: 'Notion Template for Freelance Video Editors Who Want Clear Deliverables',
    subheadline: 'A complete Notion workspace for freelance video editors: project tracker with revision log, asset library, invoice tracker, and client portal — so every project has clear status and scope.',
    notionUses: [
      'Project tracker: Manage every video from rough cut to final export and delivery',
      'Revision log: Track revision rounds per project against your contract',
      'Asset tracker: Link source files, exports, and delivery links per project',
      'Invoice tracker: Send invoices and track payment status per project',
      'Client portal: Share a Notion page showing where each video is in production',
    ],
    features: [
      {
        heading: 'Every video\'s status in one place',
        body: 'A project view shows every video: who it\'s for, what stage it\'s in (rough cut / client review / revision / final), and when it\'s due. No more status questions answered by digging through email.',
      },
      {
        heading: 'Revision tracking that closes scope arguments',
        body: 'Log revision rounds against your contract. When a client asks for the fourth round on a two-revision agreement, you have the number documented — and a path to a scope change conversation.',
      },
      {
        heading: 'Asset links that never get lost',
        body: 'Store source file links, export links, and delivery links directly on each project record. Everyone knows where the files are — you, your client, and any collaborators.',
      },
    ],
    testimonial: {
      quote: "I used to lose track of which version I sent to which client. Now every project has a record with links to every cut and every round of feedback. It feels like a real studio.",
      name: 'Zara F.',
      role: 'Freelance video editor, YouTube and corporate brands',
    },
    metaTitle: 'Notion Template for Freelance Video Editors — FreelanceKit',
    metaDescription: 'Notion workspace for freelance video editors. Project tracker with revision log, asset library, invoice tracker, and client portal. One-time purchase.',
  },

  'freelance-project-managers': {
    title: 'Freelance Project Managers',
    noun: 'project manager',
    headline: 'Notion Template for Freelance PMs Who Run Multiple Client Engagements',
    subheadline: 'A complete Notion workspace for freelance project managers: multi-client project board, milestone tracker, stakeholder CRM, and invoice tracker — all connected.',
    notionUses: [
      'Project board: Manage milestones, tasks, risks, and status per engagement',
      'Stakeholder CRM: Track key contacts, roles, and communication history per client',
      'Risk log: Document risks, mitigations, and status for each project',
      'Invoice tracker: Log consultant fees and track payment status',
      'Status reports: Template for consistent weekly or monthly client updates',
    ],
    features: [
      {
        heading: 'All projects in one dashboard',
        body: 'One view shows every active engagement: status, next milestone, key risks, and whether stakeholders have approved the latest update. Nothing falls through the cracks.',
      },
      {
        heading: 'Milestone tracking with accountability',
        body: 'Every milestone has an owner, due date, and status. A filtered view shows everything that\'s at risk or behind schedule — before clients ask about it.',
      },
      {
        heading: 'Consistent status reporting in 20 minutes',
        body: 'A reusable status report template means you spend 20 minutes writing, not an hour formatting. Clients get professional updates on a consistent schedule.',
      },
    ],
    testimonial: {
      quote: "Running three concurrent engagements used to mean I was always one forgotten meeting away from a disaster. Now everything is in one workspace and I actually sleep well.",
      name: 'Thomas M.',
      role: 'Freelance project manager, software and operations',
    },
    metaTitle: 'Notion Template for Freelance Project Managers — FreelanceKit',
    metaDescription: 'Notion workspace for freelance project managers. Multi-client project board, milestone tracker, stakeholder CRM, and invoice tracker.',
  },
}

interface Props {
  params: { profession: string }
}

export function generateStaticParams() {
  return Object.keys(PROFESSIONS).map((profession) => ({ profession }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const config = PROFESSIONS[params.profession]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `${SITE.url}/notion-template/${params.profession}` },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `${SITE.url}/notion-template/${params.profession}`,
    },
  }
}

export default function NotionTemplatePage({ params }: Props) {
  const config = PROFESSIONS[params.profession]
  if (!config) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Notion Template for ${config.title}`,
    description: config.metaDescription,
    url: `${SITE.url}/notion-template/${params.profession}`,
    brand: { '@type': 'Brand', name: 'FreelanceKit' },
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/shop/freelancer-os`,
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
          <Link href="/shop/freelancer-os" className="hover:text-brand-600">Freelancer OS</Link>
          <span className="mx-2">›</span>
          <span className="text-ink">{config.title}</span>
        </div>

        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            Notion template for {config.title.toLowerCase()}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-5 leading-tight">
            {config.headline}
          </h1>
          <p className="text-sand-500 text-xl max-w-2xl leading-relaxed">{config.subheadline}</p>
        </div>

        {/* What you track in Notion */}
        <div className="bg-white border border-sand-200 rounded-2xl p-8 mb-12">
          <h2 className="font-display font-bold text-xl text-ink mb-6">
            What you track in this Notion workspace
          </h2>
          <ul className="space-y-3">
            {config.notionUses.map((use) => (
              <li key={use} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sand-700">{use}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="mb-14">
          <h2 className="font-display font-bold text-2xl text-ink mb-8">How it changes your practice</h2>
          <div className="space-y-6">
            {config.features.map((f) => (
              <div key={f.heading} className="flex gap-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink mb-1">{f.heading}</h3>
                  <p className="text-sand-600 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <blockquote className="border-l-4 border-brand-300 pl-6 mb-14">
          <p className="text-ink text-lg leading-relaxed mb-4">"{config.testimonial.quote}"</p>
          <footer className="text-sand-500 text-sm">
            <strong className="text-ink">{config.testimonial.name}</strong> — {config.testimonial.role}
          </footer>
        </blockquote>

        {/* CTA */}
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white mb-12">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex-1 min-w-0">
              <div className="text-brand-200 text-xs font-bold uppercase tracking-widest mb-2">
                The template for {config.title.toLowerCase()}
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Freelancer OS</h3>
              <p className="text-brand-100 leading-relaxed mb-5">
                One Notion workspace: CRM, project hub, invoice tracker, and client portal — all linked. Works on Notion's free plan.
              </p>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-brand-200 text-sm ml-1">4.9 / 5 from 200+ freelancers</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl font-extrabold font-display">$29</div>
              <Link
                href="/shop/freelancer-os"
                className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Get Freelancer OS <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-brand-300 text-xs text-center">One-time · 30-day guarantee</p>
            </div>
          </div>
        </div>

        {/* Email capture */}
        <div className="bg-sand-50 border border-sand-200 rounded-2xl p-8 mb-12">
          <h3 className="font-display font-bold text-xl text-ink mb-2">
            Free freelance tips for {config.title.toLowerCase()}
          </h3>
          <p className="text-sand-500 mb-5">
            Weekly insights on pricing, systems, and client management. No fluff. Unsubscribe any time.
          </p>
          <EmailCapture source={`notion-template-${params.profession}`} buttonText="Subscribe free" />
        </div>

        {/* Related blog posts */}
        {(() => {
          const posts = NOTION_FEATURED_POSTS.map((slug) => POSTS.find((p) => p.slug === slug)).filter(Boolean)
          return posts.length > 0 ? (
            <div className="mt-10 pt-10 border-t border-sand-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-ink">Notion guides for freelancers</h3>
                <Link href="/blog" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                  All articles →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {posts.map((post) => post && (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group p-4 rounded-xl border border-sand-200 hover:border-brand-200 bg-white hover:shadow-sm transition-all"
                  >
                    <span className="inline-block text-xs font-semibold bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full mb-2">{post.category}</span>
                    <h4 className="font-display font-bold text-ink text-sm leading-snug mb-2 group-hover:text-brand-600 transition-colors">{post.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-sand-400">
                      <Clock className="w-3 h-3" />
                      {post.readingMinutes} min read
                      <span>·</span>
                      {formatDate(post.publishedAt)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        })()}

        {/* Related */}
        <div className="pt-8 border-t border-sand-100 mt-10">
          <p className="text-sm text-sand-400 mb-4">Also available for:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PROFESSIONS)
              .filter(([key]) => key !== params.profession)
              .slice(0, 8)
              .map(([key, cfg]) => (
                <Link
                  key={key}
                  href={`/notion-template/${key}`}
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
