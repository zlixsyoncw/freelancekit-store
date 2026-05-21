'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { DollarSign, Clock, TrendingUp, Download, ArrowRight, Info } from 'lucide-react'
import EmailCapture from '@/components/EmailCapture'

// Free, fully client-side freelance rate calculator
// No backend needed. Drives email capture and upsell to Freelancer OS

type WorkingStyle = 'hourly' | 'project' | 'retainer'

interface Results {
  minimumHourly: number
  recommendedHourly: number
  premiumHourly: number
  annualAtMin: number
  annualAtRecommended: number
  billableHoursPerYear: number
  effectiveDailyRate: number
  monthlyToHitGoal: number
}

function calculate(
  annualGoal: number,
  weeklyHours: number,
  vacationWeeks: number,
  overhead: number,
  taxRate: number
): Results {
  const workingWeeks = 52 - vacationWeeks
  const grossGoal = annualGoal / (1 - taxRate / 100)
  const grossWithOverhead = grossGoal * (1 + overhead / 100)
  const billableHoursPerYear = workingWeeks * weeklyHours
  const minimumHourly = Math.ceil(grossWithOverhead / billableHoursPerYear)
  const recommendedHourly = Math.ceil(minimumHourly * 1.25)
  const premiumHourly = Math.ceil(minimumHourly * 1.6)

  return {
    minimumHourly,
    recommendedHourly,
    premiumHourly,
    annualAtMin: minimumHourly * billableHoursPerYear,
    annualAtRecommended: recommendedHourly * billableHoursPerYear,
    billableHoursPerYear,
    effectiveDailyRate: recommendedHourly * 8,
    monthlyToHitGoal: Math.ceil(grossWithOverhead / 12),
  }
}

function Slider({
  label, value, min, max, step, onChange, format, hint,
}: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void; format: (v: number) => string; hint?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-ink flex items-center gap-1.5">
          {label}
          {hint && (
            <span title={hint} className="cursor-help text-sand-400">
              <Info className="w-3.5 h-3.5" />
            </span>
          )}
        </label>
        <span className="text-brand-600 font-bold text-sm">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-sand-200 rounded-full appearance-none cursor-pointer accent-brand-600"
      />
      <div className="flex justify-between text-xs text-sand-400">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  )
}

function RateCard({ label, rate, highlight }: { label: string; rate: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 text-center ${highlight ? 'bg-brand-600 text-white' : 'bg-sand-50 border border-sand-200'}`}>
      <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? 'text-brand-200' : 'text-sand-500'}`}>{label}</div>
      <div className={`text-4xl font-extrabold font-display ${highlight ? 'text-white' : 'text-ink'}`}>
        ${rate}<span className={`text-lg font-normal ${highlight ? 'text-brand-200' : 'text-sand-400'}`}>/hr</span>
      </div>
    </div>
  )
}

export default function RateCalculatorPage() {
  const [annualGoal, setAnnualGoal] = useState(80000)
  const [weeklyHours, setWeeklyHours] = useState(25)
  const [vacationWeeks, setVacationWeeks] = useState(4)
  const [overhead, setOverhead] = useState(20)
  const [taxRate, setTaxRate] = useState(30)
  const [showEmail, setShowEmail] = useState(false)

  const results = useCallback(
    () => calculate(annualGoal, weeklyHours, vacationWeeks, overhead, taxRate),
    [annualGoal, weeklyHours, vacationWeeks, overhead, taxRate]
  )()

  const fmt = (n: number) => `$${n.toLocaleString()}`
  const fmtHr = (n: number) => `$${n}/hr`
  const fmtWk = (n: number) => `${n} wks`
  const fmtPct = (n: number) => `${n}%`
  const fmtHrs = (n: number) => `${n} hrs/wk`

  function handleDownload() {
    setShowEmail(true)
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('rate-calculator-download', { props: { rate: results.recommendedHourly } })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <DollarSign className="w-3.5 h-3.5" /> Free Tool
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          Freelance Rate Calculator
        </h1>
        <p className="text-sand-500 text-xl max-w-xl mx-auto">
          Enter your income goal and working style. Get your minimum, recommended, and premium hourly rates — instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-sand-200 p-8 space-y-8">
          <h2 className="font-display font-bold text-xl text-ink">Your situation</h2>

          <Slider label="Annual income goal" value={annualGoal} min={30000} max={300000} step={5000}
            onChange={setAnnualGoal} format={fmt} hint="Your target take-home pay after tax" />

          <Slider label="Billable hours per week" value={weeklyHours} min={10} max={40} step={1}
            onChange={setWeeklyHours} format={fmtHrs}
            hint="Not all 40 hours are billable — meetings, admin, sales take time" />

          <Slider label="Vacation weeks per year" value={vacationWeeks} min={0} max={12} step={1}
            onChange={setVacationWeeks} format={fmtWk} />

          <Slider label="Overhead & admin buffer" value={overhead} min={0} max={50} step={5}
            onChange={setOverhead} format={fmtPct}
            hint="Software, equipment, insurance, unpaid time between projects" />

          <Slider label="Effective tax rate" value={taxRate} min={10} max={50} step={1}
            onChange={setTaxRate} format={fmtPct}
            hint="Self-employment tax + income tax. Default 30% is typical for US freelancers." />

          <div className="bg-sand-50 rounded-xl p-4 text-sm text-sand-600">
            <strong className="text-ink">Your billable hours:</strong>{' '}
            {results.billableHoursPerYear.toLocaleString()} hrs/year
            ({(52 - vacationWeeks)} working weeks × {weeklyHours} hrs)
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-sand-200 p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-5">Your rates</h2>
            <div className="space-y-3">
              <RateCard label="Minimum (break-even)" rate={results.minimumHourly} />
              <RateCard label="Recommended ✦" rate={results.recommendedHourly} highlight />
              <RateCard label="Premium (aspirational)" rate={results.premiumHourly} />
            </div>
            <p className="text-xs text-sand-400 mt-4 text-center">
              Recommended = minimum × 1.25 (buffer for slow months + negotiation room)
            </p>
          </div>

          {/* Projections */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4">
            <h2 className="font-display font-bold text-lg text-ink">Annual projections</h2>
            {[
              { label: 'At minimum rate', value: fmt(results.annualAtMin), muted: true },
              { label: 'At recommended rate', value: fmt(results.annualAtRecommended), muted: false },
              { label: 'Daily rate (8 hrs)', value: fmt(results.effectiveDailyRate), muted: true },
              { label: 'Monthly gross needed', value: fmt(results.monthlyToHitGoal), muted: true },
            ].map(({ label, value, muted }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-sand-100 last:border-0">
                <span className={`text-sm ${muted ? 'text-sand-500' : 'font-semibold text-ink'}`}>{label}</span>
                <span className={`font-bold ${muted ? 'text-sand-700' : 'text-brand-600 text-lg'}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* Download / email capture */}
          {!showEmail ? (
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              <Download className="w-4 h-4" /> Save results to email
            </button>
          ) : (
            <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5">
              <p className="text-sm font-semibold text-ink mb-1">Enter your email to save your results</p>
              <p className="text-xs text-sand-500 mb-4">We'll also send freelance pricing tips weekly. Unsubscribe any time.</p>
              <EmailCapture source="rate-calculator" buttonText="Save results" />
            </div>
          )}
        </div>
      </div>

      {/* Insight section */}
      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {[
          {
            icon: TrendingUp,
            title: 'Why your rate feels too high',
            body: 'Most freelancers price against their anxiety, not the market. Your recommended rate is likely below what comparable specialists charge. The clients who push back hardest on price are usually the worst to work with.'
          },
          {
            icon: Clock,
            title: 'The billable hours reality',
            body: 'If you work 40 hours a week, plan for 20-25 billable hours. Sales calls, admin, revisions, and invoicing eat the rest. Building your rate around 40 billable hours guarantees you undercharge.'
          },
          {
            icon: DollarSign,
            title: 'Project pricing vs. hourly',
            body: 'Once you know your rate, use it to anchor project quotes — not to bill by the hour. A 10-hour project at $150/hr = $1,500 proposal. Clients respond better to a flat price with a clear scope.'
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-sand-50 rounded-2xl p-6">
            <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-4 h-4 text-brand-600" />
            </div>
            <h3 className="font-display font-bold text-ink mb-2">{title}</h3>
            <p className="text-sand-600 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Upsell to Freelancer OS */}
      <div className="mt-12 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white text-center">
        <h3 className="font-display text-2xl font-bold mb-2">Now track it all in one place.</h3>
        <p className="text-brand-200 mb-6 max-w-md mx-auto">
          The Freelancer OS Notion template includes an invoice tracker, profitability calculator, and revenue dashboard — so you always know if you're hitting your rate targets.
        </p>
        <Link
          href="/shop/freelancer-os"
          className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          Get Freelancer OS — $29 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
