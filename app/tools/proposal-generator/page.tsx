'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { FileText, Plus, Trash2, Copy, Check, ArrowRight } from 'lucide-react'
import EmailCapture from '@/components/EmailCapture'

type Deliverable = { id: string; text: string }

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

const PROJECT_TYPES = [
  'Website Design & Development',
  'Brand Identity Design',
  'UI/UX Design',
  'Copywriting & Content',
  'Social Media Management',
  'SEO Consulting',
  'Marketing Strategy',
  'Video Production',
  'Photography',
  'Software Development',
  'Bookkeeping',
  'Other',
]

const PAYMENT_TERMS = [
  '50% upfront, 50% on completion',
  '33% upfront, 33% at midpoint, 33% on completion',
  '100% upfront',
  'Net 14 on completion',
  'Net 30 on completion',
  'Monthly retainer',
]

export default function ProposalGeneratorPage() {
  const [freelancerName, setFreelancerName] = useState('')
  const [freelancerBusiness, setFreelancerBusiness] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0])
  const [projectSummary, setProjectSummary] = useState('')
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: generateId(), text: '' },
    { id: generateId(), text: '' },
    { id: generateId(), text: '' },
  ])
  const [timeline, setTimeline] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [paymentTerms, setPaymentTerms] = useState(PAYMENT_TERMS[0])
  const [includedRevisions, setIncludedRevisions] = useState('2')
  const [validUntil, setValidUntil] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    return d.toISOString().slice(0, 10)
  })
  const [copied, setCopied] = useState(false)

  const addDeliverable = useCallback(() => {
    setDeliverables((prev) => [...prev, { id: generateId(), text: '' }])
  }, [])

  const removeDeliverable = useCallback((id: string) => {
    setDeliverables((prev) => prev.filter((d) => d.id !== id))
  }, [])

  const updateDeliverable = useCallback((id: string, text: string) => {
    setDeliverables((prev) => prev.map((d) => (d.id === id ? { ...d, text } : d)))
  }, [])

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
  const priceNum = parseFloat(price.replace(/[^0-9.]/g, '')) || 0
  const formattedPrice = priceNum > 0 ? `${currencySymbol}${priceNum.toLocaleString()}` : '[price]'

  const validDeliverables = deliverables.filter((d) => d.text.trim())

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const validUntilFormatted = validUntil
    ? new Date(validUntil + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[date]'

  const generateProposal = () => {
    const fn = freelancerName.trim() || '[Your Name]'
    const fb = freelancerBusiness.trim()
    const cn = clientName.trim() || '[Client Name]'
    const cc = clientCompany.trim()
    const delList = validDeliverables.length > 0
      ? validDeliverables.map((d) => `  • ${d.text.trim()}`).join('\n')
      : '  • [Deliverable 1]\n  • [Deliverable 2]'
    const tl = timeline.trim() || '[timeline]'
    const ps = projectSummary.trim()

    return `PROPOSAL: ${projectType.toUpperCase()}
Prepared by: ${fn}${fb ? ` / ${fb}` : ''}
Prepared for: ${cn}${cc ? ` / ${cc}` : ''}
Date: ${today}
Valid until: ${validUntilFormatted}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERVIEW
${ps || `This proposal outlines the scope, timeline, and investment for ${projectType.toLowerCase()} services for ${cc || cn}.`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S INCLUDED
${delList}

Revisions: ${includedRevisions} rounds of revisions included. Additional revisions billed at my standard hourly rate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TIMELINE
Project duration: ${tl}
This timeline assumes ${cn} provides feedback within 48 hours of each review milestone. Delays in feedback may extend the timeline proportionally.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INVESTMENT
Total project fee: ${formattedPrice}
Payment terms: ${paymentTerms}

${paymentTerms.includes('50%') ? `Deposit: ${currencySymbol}${(priceNum * 0.5).toLocaleString()} — due before work begins\nFinal payment: ${currencySymbol}${(priceNum * 0.5).toLocaleString()} — due on project completion` : paymentTerms.includes('33%') ? `Deposit: ${currencySymbol}${(priceNum * 0.33).toLocaleString()} — due before work begins\nMidpoint payment: ${currencySymbol}${(priceNum * 0.33).toLocaleString()} — due at project midpoint\nFinal payment: ${currencySymbol}${Math.ceil(priceNum * 0.34).toLocaleString()} — due on project completion` : ''}

All prices are in ${currency}. Invoices are due within 14 days of issue. Late payments are subject to a 1.5% monthly fee.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCOPE & TERMS
This proposal covers the work listed above. Work requested outside this scope will be quoted separately before proceeding.

This proposal expires on ${validUntilFormatted}. To accept, reply to this email and I'll send a contract and invoice for the deposit.

Questions? I'm happy to jump on a call to walk through any of this.

— ${fn}${fb ? `\n${fb}` : ''}`
  }

  const proposal = generateProposal()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(proposal).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [proposal])

  const inputCls =
    'w-full px-3 py-2 border border-sand-200 rounded-lg text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent placeholder-sand-400'
  const labelCls = 'block text-xs font-semibold text-ink mb-1.5'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/tools" className="text-sm text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1 mb-4">
          ← All Free Tools
        </Link>
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ml-4">
          Free Tool
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink mb-3">
          Freelance Proposal Generator
        </h1>
        <p className="text-sand-500 text-lg max-w-2xl">
          Fill in your project details and get a professional, copy-paste proposal in minutes.
          No account required.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
        {/* Form */}
        <div className="space-y-6">
          {/* Parties */}
          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-bold text-ink text-base">Your Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Your Name</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Jane Smith"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Business Name (optional)</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Jane Smith Design"
                  value={freelancerBusiness}
                  onChange={(e) => setFreelancerBusiness(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-bold text-ink text-base">Client Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Client Name</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Sarah Johnson"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Client Company (optional)</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Acme Corp"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-bold text-ink text-base">Project Details</h2>
            <div>
              <label className={labelCls}>Project Type</label>
              <select
                className={inputCls}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Project Overview</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                placeholder="Briefly describe the project, the client's goal, and your approach. This becomes the proposal's overview section."
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Deliverables</label>
              <div className="space-y-2">
                {deliverables.map((d, i) => (
                  <div key={d.id} className="flex gap-2">
                    <input
                      type="text"
                      className={`${inputCls} flex-1`}
                      placeholder={`Deliverable ${i + 1} (e.g. 5-page website with CMS)`}
                      value={d.text}
                      onChange={(e) => updateDeliverable(d.id, e.target.value)}
                    />
                    {deliverables.length > 1 && (
                      <button
                        onClick={() => removeDeliverable(d.id)}
                        className="text-sand-400 hover:text-red-500 transition-colors flex-shrink-0 mt-0.5"
                        aria-label="Remove deliverable"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addDeliverable}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add deliverable
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Timeline</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="4 weeks / 6–8 weeks"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Revision Rounds Included</label>
                <select
                  className={inputCls}
                  value={includedRevisions}
                  onChange={(e) => setIncludedRevisions(e.target.value)}
                >
                  {['1', '2', '3', 'Unlimited'].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-bold text-ink text-base">Pricing & Terms</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Total Project Fee</label>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-2 border border-sand-200 rounded-lg text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CAD</option>
                    <option>AUD</option>
                  </select>
                  <input
                    type="text"
                    className={`${inputCls} flex-1`}
                    placeholder="3500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Proposal Valid Until</label>
                <input
                  type="date"
                  className={inputCls}
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Payment Terms</label>
              <select
                className={inputCls}
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              >
                {PAYMENT_TERMS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-white border border-sand-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-sand-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <FileText className="w-4 h-4 text-brand-600" />
                Your Proposal
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                  copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy proposal
                  </>
                )}
              </button>
            </div>
            <pre className="p-5 text-xs text-sand-700 leading-relaxed overflow-auto max-h-[600px] whitespace-pre-wrap font-mono">
              {proposal}
            </pre>
          </div>

          {/* Upsell */}
          <div className="mt-6 bg-brand-50 border border-brand-200 rounded-2xl p-6">
            <p className="text-sm font-bold text-ink mb-1">Want the full proposal system?</p>
            <p className="text-sm text-sand-600 mb-4">
              The Client Onboarding Bundle includes a polished Notion proposal template with
              three-tier pricing table, timeline view, and built-in social proof slots — plus
              a contract template, welcome packet, and kickoff agenda.
            </p>
            <Link
              href="/shop/client-onboarding-bundle"
              className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Get the bundle — $19
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="mt-14 border-t border-sand-200 pt-10">
        <p className="text-sm font-semibold text-sand-500 uppercase tracking-wide mb-4">Related reading</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/blog/how-to-write-a-freelance-proposal"
            className="p-4 bg-sand-50 border border-sand-200 rounded-xl hover:border-brand-300 transition-colors group"
          >
            <p className="font-semibold text-ink group-hover:text-brand-600 transition-colors text-sm mb-1">
              How to Write a Freelance Proposal That Wins Clients
            </p>
            <p className="text-xs text-sand-500">Full guide →</p>
          </Link>
          <Link
            href="/blog/freelance-client-discovery-questionnaire-template"
            className="p-4 bg-sand-50 border border-sand-200 rounded-xl hover:border-brand-300 transition-colors group"
          >
            <p className="font-semibold text-ink group-hover:text-brand-600 transition-colors text-sm mb-1">
              25 Discovery Questions to Ask Before Every Proposal
            </p>
            <p className="text-xs text-sand-500">Full guide →</p>
          </Link>
        </div>
      </div>

      {/* Email Capture */}
      <div className="mt-10 bg-sand-50 border border-sand-200 rounded-2xl p-8">
        <p className="font-display font-bold text-ink text-lg mb-1">Get the freelancer's business playbook, free.</p>
        <p className="text-sm text-sand-600 mb-4">Weekly tactics on pricing, client management, and building a sustainable practice. No spam.</p>
        <EmailCapture source="proposal-generator" buttonText="Subscribe free" />
      </div>
    </div>
  )
}
