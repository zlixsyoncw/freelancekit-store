'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Copy, Check, Search, FileText, ArrowRight } from 'lucide-react'

type Clause = {
  id: string
  title: string
  category: string
  body: string
  tip?: string
}

const CLAUSES: Clause[] = [
  // Payment Terms
  {
    id: 'payment-deposit',
    title: 'Deposit / Upfront Payment',
    category: 'Payment',
    body: `A non-refundable deposit of [50%] of the total project fee ([AMOUNT]) is due before work begins. The remaining balance is due upon delivery of final files. No work will commence until the deposit is received and cleared.`,
    tip: '50% upfront is the freelance standard. Use 100% upfront for small projects or first-time clients.',
  },
  {
    id: 'payment-schedule',
    title: 'Milestone-Based Payment Schedule',
    category: 'Payment',
    body: `Payment will be made in three installments: [33%] upon contract signing, [33%] upon delivery of [MILESTONE], and [34%] upon final delivery and approval. Each payment is due within [5] business days of the milestone. Work on subsequent milestones will not commence until prior payment is received.`,
    tip: 'Three-part schedules reduce your risk on longer projects.',
  },
  {
    id: 'payment-net',
    title: 'Net-[X] Payment Terms',
    category: 'Payment',
    body: `Invoices are due within [14] days of the invoice date. Invoices unpaid after [14] days are subject to a late fee of [1.5%] per month on the outstanding balance. [CLIENT] agrees to pay all reasonable collection costs, including attorney fees, if payment requires legal action.`,
    tip: 'Net-14 is freelancer-friendly. Net-30 is the enterprise standard. Always include a late fee clause.',
  },
  {
    id: 'payment-expenses',
    title: 'Expenses and Reimbursements',
    category: 'Payment',
    body: `Any expenses required to complete the project — including stock photography, licensed fonts, third-party software, travel, or other out-of-pocket costs — will be invoiced separately at cost with a [10%] handling fee. Expenses exceeding $[100] will require prior written approval from [CLIENT].`,
  },
  // Scope and Revisions
  {
    id: 'scope-definition',
    title: 'Scope of Work',
    category: 'Scope & Revisions',
    body: `The scope of this agreement is limited to the deliverables described in the attached project brief or proposal (incorporated herein by reference). Work outside this scope will require a written change order agreed to by both parties before work begins. The existence of oral discussions about additional work does not constitute a scope change.`,
    tip: 'Always attach a brief or proposal as an exhibit to make the scope enforceable.',
  },
  {
    id: 'scope-revisions',
    title: 'Revision Rounds',
    category: 'Scope & Revisions',
    body: `This project includes [TWO] rounds of revisions. A revision round is defined as a consolidated set of changes submitted in a single communication. Additional revision rounds are available at [FREELANCER]'s standard hourly rate of $[RATE]/hour, invoiced monthly. Revision requests must be submitted within [14] days of deliverable delivery or the work is considered approved.`,
    tip: 'The "consolidated set of changes" language prevents clients from submitting changes piecemeal to reset the revision clock.',
  },
  {
    id: 'scope-change-order',
    title: 'Change Order Process',
    category: 'Scope & Revisions',
    body: `If [CLIENT] requests work outside the agreed scope, [FREELANCER] will provide a written estimate within [3] business days. Work on the change will not begin until [CLIENT] provides written approval and, if required, an additional deposit. This project's timeline will be adjusted to accommodate any approved change orders.`,
  },
  // Intellectual Property
  {
    id: 'ip-transfer',
    title: 'IP Transfer Upon Final Payment',
    category: 'Intellectual Property',
    body: `[FREELANCER] retains ownership of all work product and intellectual property until final payment is received in full. Upon receipt of full payment, [FREELANCER] transfers to [CLIENT] all rights, title, and interest in the final deliverables. [FREELANCER] retains the right to display the work in their portfolio unless otherwise agreed in writing.`,
    tip: 'Never transfer IP before you\'re paid. This clause makes your leverage explicit.',
  },
  {
    id: 'ip-license-only',
    title: 'License (Not Transfer) of IP',
    category: 'Intellectual Property',
    body: `[FREELANCER] grants [CLIENT] a perpetual, worldwide, non-exclusive license to use the final deliverables for the purposes described in this agreement. [FREELANCER] retains all underlying intellectual property rights. This license is granted in full upon receipt of final payment.`,
    tip: 'Use this when you want to keep underlying IP rights — common for code frameworks, design systems, or stock assets.',
  },
  {
    id: 'ip-third-party',
    title: 'Third-Party Materials',
    category: 'Intellectual Property',
    body: `If the deliverables include third-party materials (such as licensed stock photography, fonts, or code libraries), [CLIENT] is responsible for ensuring ongoing compliance with those licenses. [FREELANCER] will identify all third-party materials used and provide licensing information upon delivery.`,
  },
  // Project Management
  {
    id: 'pm-timeline',
    title: 'Project Timeline and Delays',
    category: 'Project Management',
    body: `The estimated project timeline is [X] weeks from the date of contract signing, contingent on [CLIENT] providing timely feedback and materials. If [CLIENT] delays providing required materials or approvals by more than [5] business days, [FREELANCER] may adjust the timeline accordingly or invoice for idle time at [50%] of the daily rate.`,
    tip: 'Client delays are the #1 cause of blown timelines. Make the consequences explicit.',
  },
  {
    id: 'pm-feedback',
    title: 'Client Feedback Obligations',
    category: 'Project Management',
    body: `[CLIENT] agrees to provide consolidated, actionable feedback within [5] business days of each deliverable submission. If feedback is not received within [5] business days, [FREELANCER] may move forward with the project or invoice for any time spent waiting, at their discretion.`,
  },
  {
    id: 'pm-communication',
    title: 'Communication and Point of Contact',
    category: 'Project Management',
    body: `All project communication will be conducted through [EMAIL/PROJECT MANAGEMENT TOOL]. [CLIENT] designates [NAME/TITLE] as the primary point of contact with authority to approve deliverables and authorize scope changes. Feedback from other stakeholders will be consolidated by [CLIENT] before submission.`,
    tip: 'Multiple approval layers are a scope creep machine. Name one decision-maker.',
  },
  // Termination
  {
    id: 'term-kill-fee',
    title: 'Kill Fee / Early Termination',
    category: 'Termination',
    body: `Either party may terminate this agreement with [14] days written notice. If [CLIENT] terminates the project after work has commenced, [CLIENT] owes payment for all work completed to date, plus a kill fee equal to [25%] of the remaining unbilled project fee. If [FREELANCER] terminates, [FREELANCER] will complete or hand off all work completed to date.`,
    tip: 'Kill fees protect you when clients cancel mid-project. 25% is standard.',
  },
  {
    id: 'term-abandonment',
    title: 'Project Abandonment',
    category: 'Termination',
    body: `If [CLIENT] is unresponsive for [30] consecutive days without prior written notice of a pause, the project will be considered abandoned. [FREELANCER] will invoice for all work completed to date, plus any applicable kill fee. Reactivating an abandoned project may incur a reactivation fee equal to [10%] of the original project fee.`,
  },
  // Legal Protections
  {
    id: 'legal-warranty',
    title: 'Warranty and Representations',
    category: 'Legal',
    body: `[CLIENT] represents that all materials, content, and information provided do not infringe any third-party intellectual property rights, and that [CLIENT] has authority to enter into this agreement. [FREELANCER] represents that the deliverables are original work and do not knowingly infringe any third-party rights.`,
  },
  {
    id: 'legal-liability',
    title: 'Limitation of Liability',
    category: 'Legal',
    body: `[FREELANCER]'s total liability to [CLIENT] for any claims arising out of or related to this agreement shall not exceed the total fees paid by [CLIENT] in the [6] months preceding the claim. [FREELANCER] is not liable for any indirect, incidental, consequential, or punitive damages.`,
    tip: 'Cap your liability to what you\'ve actually been paid. Essential protection.',
  },
  {
    id: 'legal-indemnity',
    title: 'Indemnification',
    category: 'Legal',
    body: `[CLIENT] agrees to indemnify, defend, and hold harmless [FREELANCER] from any claims, damages, or expenses (including attorney fees) arising from [CLIENT]'s use of the deliverables, any content or materials provided by [CLIENT], or any breach of [CLIENT]'s representations under this agreement.`,
  },
  {
    id: 'legal-governing',
    title: 'Governing Law and Dispute Resolution',
    category: 'Legal',
    body: `This agreement is governed by the laws of [STATE/PROVINCE/COUNTRY]. The parties agree to attempt to resolve any dispute through good-faith negotiation before pursuing legal action. If legal action is required, the prevailing party is entitled to attorney fees and court costs.`,
  },
  {
    id: 'legal-entire',
    title: 'Entire Agreement',
    category: 'Legal',
    body: `This agreement, including any attached exhibits, constitutes the entire agreement between the parties regarding the project and supersedes all prior oral or written communications. Any modifications must be in writing and signed by both parties.`,
  },
  // Confidentiality
  {
    id: 'conf-nda',
    title: 'Confidentiality / NDA',
    category: 'Confidentiality',
    body: `Both parties agree to keep confidential any proprietary or non-public information disclosed during the course of this agreement ("Confidential Information"). Confidential Information does not include information already public, independently developed, or legally received from third parties. This obligation survives termination of this agreement for [2] years.`,
  },
  {
    id: 'conf-portfolio',
    title: 'Portfolio Rights',
    category: 'Confidentiality',
    body: `[FREELANCER] reserves the right to display completed deliverables in their portfolio and marketing materials, unless [CLIENT] provides written notice of confidentiality requirements within [14] days of project completion. Confidential projects may be shown with client details obscured.`,
  },
]

const CATEGORIES = Array.from(new Set(CLAUSES.map((c) => c.category)))

function ClauseCard({ clause }: { clause: Clause }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(clause.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-sand-200 rounded-2xl p-6 hover:border-brand-200 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mb-2 inline-block">
            {clause.category}
          </span>
          <h3 className="font-display font-bold text-ink text-lg leading-snug">{clause.title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            copied
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-sand-100 text-sand-700 hover:bg-brand-50 hover:text-brand-700'
          }`}
          aria-label={copied ? 'Copied!' : 'Copy clause'}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <pre className="text-sm text-sand-700 leading-relaxed whitespace-pre-wrap font-sans bg-sand-50 rounded-xl p-4 mb-3 border border-sand-100">
        {clause.body}
      </pre>

      {clause.tip && (
        <p className="text-xs text-sand-500 italic">
          <strong className="text-sand-600 not-italic">Tip:</strong> {clause.tip}
        </p>
      )}
    </div>
  )
}

export default function ContractClausesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return CLAUSES.filter((c) => {
      const matchesSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.body.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          Free — no signup required
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 leading-tight">
          Freelance Contract Clauses Library
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl">
          {CLAUSES.length} ready-to-use contract clauses covering payment, scope, IP, termination,
          and legal protection. Copy and paste into your contracts.
        </p>
      </div>

      {/* Usage note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
        <strong>How to use:</strong> These clauses are starting points — customize the bracketed fields ([AMOUNT], [CLIENT], etc.) to match your project. For high-value contracts, have an attorney review the final document.
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
          <input
            type="text"
            placeholder="Search clauses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-sand-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-sand-600 border-sand-200 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({CLAUSES.filter((c) => c.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Clauses */}
      {filtered.length === 0 ? (
        <p className="text-sand-500 py-8 text-center">No clauses match your search.</p>
      ) : (
        <div className="space-y-6 mb-16">
          {filtered.map((clause) => (
            <ClauseCard key={clause.id} clause={clause} />
          ))}
        </div>
      )}

      {/* Info cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-12 border-t border-sand-100 pt-12">
        {[
          {
            icon: FileText,
            title: 'What these cover',
            body: `${CLAUSES.length} clauses across payment, scope, IP, project management, termination, legal protection, and confidentiality.`,
          },
          {
            icon: Copy,
            title: 'How to use them',
            body: 'Click Copy on any clause, paste into your contract, and replace the bracketed fields with your actual project details.',
          },
          {
            icon: ArrowRight,
            title: 'Want a full template?',
            body: 'The Client Onboarding Bundle includes a complete, plain-English contract template pre-assembled with all the key clauses.',
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-sand-50 border border-sand-200 rounded-xl p-5">
            <Icon className="w-5 h-5 text-brand-600 mb-3" />
            <h3 className="font-display font-bold text-ink text-sm mb-1">{title}</h3>
            <p className="text-sand-500 text-xs leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Upsell */}
      <div className="bg-brand-600 rounded-2xl p-8 text-white text-center">
        <h3 className="font-display text-2xl font-bold mb-2">
          Want the full contract — pre-assembled?
        </h3>
        <p className="text-brand-200 mb-6 max-w-lg mx-auto text-sm">
          The Client Onboarding Bundle includes a complete plain-English freelance contract template with all key clauses built in — plus a proposal template, welcome packet, and kickoff doc.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop/client-onboarding-bundle"
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Get Client Onboarding Bundle — $19 <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tools/email-scripts"
            className="inline-flex items-center justify-center gap-2 border border-brand-400 text-white hover:bg-brand-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Also try: Email Scripts (free)
          </Link>
        </div>
      </div>
    </div>
  )
}
