'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { FileText, Plus, Trash2, Copy, Check, ArrowRight, AlertCircle } from 'lucide-react'
import EmailCapture from '@/components/EmailCapture'

type LineItem = {
  id: string
  description: string
  quantity: string
  rate: string
}

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

export default function InvoiceTemplatePage() {
  const [freelancerName, setFreelancerName] = useState('')
  const [freelancerEmail, setFreelancerEmail] = useState('')
  const [freelancerAddress, setFreelancerAddress] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    return d.toISOString().slice(0, 10)
  })
  const [currency, setCurrency] = useState('USD')
  const [paymentInstructions, setPaymentInstructions] = useState('')
  const [notes, setNotes] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: generateId(), description: '', quantity: '1', rate: '' },
  ])
  const [copied, setCopied] = useState(false)

  const addLineItem = useCallback(() => {
    setLineItems((prev) => [...prev, { id: generateId(), description: '', quantity: '1', rate: '' }])
  }, [])

  const removeLineItem = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateLineItem = useCallback((id: string, field: keyof Omit<LineItem, 'id'>, value: string) => {
    setLineItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }, [])

  const subtotal = lineItems.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0
    const rate = parseFloat(item.rate) || 0
    return sum + qty * rate
  }, 0)

  const formatCurrency = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
    return `${symbol}${amount.toFixed(2)}`
  }

  const formatDate = (iso: string) => {
    if (!iso) return ''
    const [year, month, day] = iso.split('-')
    return `${month}/${day}/${year}`
  }

  const generateInvoiceText = () => {
    const sep = '─'.repeat(60)
    const col = (label: string, value: string, width = 30) =>
      `${label.padEnd(width)}${value}`

    const itemLines = lineItems
      .filter((item) => item.description)
      .map((item) => {
        const qty = parseFloat(item.quantity) || 0
        const rate = parseFloat(item.rate) || 0
        const total = qty * rate
        const desc = item.description.padEnd(32)
        const qtyStr = `${qty}x`.padStart(6)
        const rateStr = formatCurrency(rate).padStart(10)
        const totalStr = formatCurrency(total).padStart(10)
        return `${desc}${qtyStr}${rateStr}${totalStr}`
      })
      .join('\n')

    return `INVOICE
${sep}

FROM:
${freelancerName || '[Your Name]'}
${freelancerEmail || '[your@email.com]'}
${freelancerAddress ? freelancerAddress + '\n' : ''}
TO:
${clientName || '[Client Name]'}
${clientEmail || '[client@email.com]'}

${col('Invoice Number:', invoiceNumber)}
${col('Invoice Date:', formatDate(invoiceDate))}
${col('Due Date:', formatDate(dueDate))}

${sep}

SERVICES

${'Description'.padEnd(32)}${'Qty'.padStart(6)}${'Rate'.padStart(10)}${'Total'.padStart(10)}
${sep}
${itemLines || '[No line items added]'}
${sep}
${'TOTAL'.padEnd(58)}${formatCurrency(subtotal).padStart(10)}

${sep}

PAYMENT DETAILS
${paymentInstructions || '[Add your payment method — bank transfer, PayPal, etc.]'}

${notes ? `NOTES\n${notes}\n\n` : ''}${sep}
Thank you for your business.

${freelancerName || '[Your Name]'} · ${freelancerEmail || '[your@email.com]'}
`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateInvoiceText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select text
    }
  }

  const hasMinInfo = freelancerName && clientName && lineItems.some((i) => i.description && i.rate)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <FileText className="w-3.5 h-3.5" />
          Free — no signup required
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-3">
          Freelance Invoice Template Generator
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl">
          Fill in your details below, add your line items, and copy a ready-to-send invoice in plain text. Works in any email client.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-6">
          {/* From */}
          <div className="bg-white border border-sand-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-ink mb-4">Your Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Your Name / Business Name *</label>
                <input
                  type="text"
                  value={freelancerName}
                  onChange={(e) => setFreelancerName(e.target.value)}
                  placeholder="Jane Smith / Jane Smith Design"
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Your Email</label>
                <input
                  type="email"
                  value={freelancerEmail}
                  onChange={(e) => setFreelancerEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Address / Location (optional)</label>
                <input
                  type="text"
                  value={freelancerAddress}
                  onChange={(e) => setFreelancerAddress(e.target.value)}
                  placeholder="City, Country"
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
            </div>
          </div>

          {/* To */}
          <div className="bg-white border border-sand-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-ink mb-4">Client Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Client Name / Company *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Acme Corp / Sarah Johnson"
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Client Email</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="billing@acme.com"
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
            </div>
          </div>

          {/* Invoice details */}
          <div className="bg-white border border-sand-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-ink mb-4">Invoice Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                />
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="bg-white border border-sand-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-ink mb-4">Line Items</h2>
            <div className="space-y-3 mb-4">
              {lineItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-[1fr_80px_80px_32px] gap-2 items-center">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    placeholder={index === 0 ? 'Service description (e.g. Website redesign)' : 'Description'}
                    className="text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', e.target.value)}
                    placeholder="Qty"
                    min="0"
                    step="0.5"
                    className="text-sm border border-sand-200 rounded-lg px-2 py-2 focus:outline-none focus:border-brand-400 bg-sand-50 text-center"
                  />
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateLineItem(item.id, 'rate', e.target.value)}
                    placeholder="Rate"
                    min="0"
                    className="text-sm border border-sand-200 rounded-lg px-2 py-2 focus:outline-none focus:border-brand-400 bg-sand-50 text-right"
                  />
                  <button
                    onClick={() => removeLineItem(item.id)}
                    disabled={lineItems.length === 1}
                    className="p-1.5 rounded-lg text-sand-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                    aria-label="Remove line item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={addLineItem}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add line item
              </button>
              <div className="text-right">
                <div className="text-xs text-sand-400">Total</div>
                <div className="font-display font-bold text-xl text-ink">{formatCurrency(subtotal)}</div>
              </div>
            </div>
          </div>

          {/* Payment + Notes */}
          <div className="bg-white border border-sand-200 rounded-2xl p-6">
            <h2 className="font-display font-bold text-ink mb-4">Payment & Notes</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Payment Instructions</label>
                <textarea
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  placeholder="Bank transfer: [Bank Name], Account [XXXX], Routing [XXXX]&#10;or: PayPal: your@email.com"
                  rows={3}
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sand-600 mb-1">Additional Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Late payments are subject to a 1.5% monthly fee after the due date."
                  rows={2}
                  className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-400 bg-sand-50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview + Copy */}
        <div className="space-y-4">
          <div className="sticky top-8">
            <div className="bg-white border border-sand-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-sand-50 border-b border-sand-200 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sand-400" />
                  <span className="text-sm font-semibold text-ink">Invoice Preview</span>
                </div>
                <button
                  onClick={handleCopy}
                  disabled={!hasMinInfo}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    copied
                      ? 'bg-emerald-100 text-emerald-700'
                      : hasMinInfo
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'bg-sand-100 text-sand-400 cursor-not-allowed'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy invoice
                    </>
                  )}
                </button>
              </div>
              <div className="p-5">
                {!hasMinInfo && (
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Fill in your name, client name, and at least one line item with a rate to generate your invoice.</span>
                  </div>
                )}
                <pre className="font-mono text-xs text-sand-700 whitespace-pre-wrap leading-relaxed overflow-auto max-h-[500px]">
                  {generateInvoiceText()}
                </pre>
              </div>
            </div>

            {/* Upsell */}
            <div className="mt-4 bg-brand-50 border border-brand-200 rounded-2xl p-5">
              <h3 className="font-display font-bold text-ink mb-1.5">
                Want to track invoices automatically?
              </h3>
              <p className="text-sand-600 text-sm mb-4 leading-relaxed">
                The Freelancer OS includes an invoice tracker with Outstanding / Paid views, automated totals, and revenue dashboard — all in Notion. One-time $29.
              </p>
              <Link
                href="/shop/freelancer-os"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Get Freelancer OS — $29 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Email capture */}
            <div className="mt-4 bg-white border border-sand-200 rounded-2xl p-5">
              <h3 className="font-display font-bold text-ink mb-1.5">Get the free Notion invoice tracker</h3>
              <p className="text-sand-500 text-sm mb-4">
                A simplified version of our invoice tracker — free, emailed to you instantly.
              </p>
              <EmailCapture source="invoice-template-tool" buttonText="Send me the tracker" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-2xl text-ink mb-8">Frequently asked questions</h2>
        <div className="space-y-6">
          {[
            {
              q: 'What format does this generate?',
              a: 'Plain text — designed to be pasted directly into an email body or a simple document. It works in any email client without formatting issues.',
            },
            {
              q: "What should I include on a freelance invoice?",
              a: 'At minimum: your name, the client\'s name, invoice number, date, due date, line items with descriptions and amounts, total, and payment instructions. This tool covers all of these.',
            },
            {
              q: 'How should I number my invoices?',
              a: 'Use a sequential system like INV-001, INV-002, or include the year: 2026-001. Consistent numbering makes it easy to reference invoices in follow-up conversations and helps with accounting.',
            },
            {
              q: 'When should I send an invoice?',
              a: 'Within 24 hours of delivering a milestone or completing a project. Client goodwill is highest immediately after delivery — don\'t wait.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-sand-200 pb-6">
              <h3 className="font-display font-bold text-ink mb-2">{q}</h3>
              <p className="text-sand-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom links */}
      <div className="mt-12 pt-8 border-t border-sand-100 flex flex-wrap gap-4 text-sm text-sand-500">
        <span>More free tools:</span>
        <Link href="/tools/rate-calculator" className="text-brand-600 hover:text-brand-700 font-medium">Rate Calculator</Link>
        <Link href="/tools/email-scripts" className="text-brand-600 hover:text-brand-700 font-medium">Email Scripts</Link>
        <Link href="/tools/contract-clauses" className="text-brand-600 hover:text-brand-700 font-medium">Contract Clauses</Link>
        <Link href="/tools/project-estimator" className="text-brand-600 hover:text-brand-700 font-medium">Project Estimator</Link>
      </div>
    </div>
  )
}
