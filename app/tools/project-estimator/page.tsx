'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, Info, Briefcase } from 'lucide-react'
import EmailCapture from '@/components/EmailCapture'

type ProjectSize = 'small' | 'medium' | 'large' | 'xlarge'
type RevisionBuffer = 'tight' | 'standard' | 'generous'

const SIZE_HOURS: Record<ProjectSize, { low: number; high: number; label: string; example: string }> = {
  small:  { low: 8,   high: 25,  label: 'Small',       example: 'Landing page, logo, short article series, social media audit' },
  medium: { low: 25,  high: 60,  label: 'Medium',       example: '5-page website, branding package, 30-day content strategy, app feature' },
  large:  { low: 60,  high: 150, label: 'Large',        example: 'Full website, brand system, 3-month retainer deliverable set, MVP' },
  xlarge: { low: 150, high: 300, label: 'Extra large',  example: 'Enterprise project, complex application, multi-month strategy engagement' },
}

const BUFFER_MULTIPLIER: Record<RevisionBuffer, { multiplier: number; label: string; description: string }> = {
  tight:    { multiplier: 1.1,  label: 'Tight (10%)',    description: 'Clear scope, experienced client, minimal expected changes' },
  standard: { multiplier: 1.25, label: 'Standard (25%)', description: 'Typical project — some unknowns and revision rounds expected' },
  generous: { multiplier: 1.4,  label: 'Generous (40%)', description: 'Vague brief, new client, complex deliverable, or creative work' },
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
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

export default function ProjectEstimatorPage() {
  const [hourlyRate, setHourlyRate] = useState(100)
  const [size, setSize] = useState<ProjectSize>('medium')
  const [buffer, setBuffer] = useState<RevisionBuffer>('standard')
  const [showEmail, setShowEmail] = useState(false)

  const sizeConfig = SIZE_HOURS[size]
  const bufferConfig = BUFFER_MULTIPLIER[buffer]

  const hoursLow = Math.ceil(sizeConfig.low * bufferConfig.multiplier)
  const hoursHigh = Math.ceil(sizeConfig.high * bufferConfig.multiplier)
  const priceLow = hoursLow * hourlyRate
  const priceHigh = hoursHigh * hourlyRate
  const recommended = Math.ceil((priceLow + priceHigh) / 2 / 50) * 50
  const deposit = Math.ceil(recommended * 0.5 / 50) * 50
  const midMilestone = Math.ceil(recommended * 0.25 / 50) * 50
  const finalPayment = recommended - deposit - midMilestone

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Calculator className="w-3.5 h-3.5" /> Free Tool
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          Project Price Estimator
        </h1>
        <p className="text-sand-500 text-xl max-w-xl mx-auto">
          Enter your hourly rate and project scope. Get a project quote range, deposit amount, and suggested payment schedule — instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Inputs */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-sand-200 p-8">
            <h2 className="font-display font-bold text-xl text-ink mb-6">Your situation</h2>

            <Slider
              label="Your hourly rate"
              value={hourlyRate}
              min={25} max={500} step={5}
              onChange={setHourlyRate}
              format={(v) => `$${v}/hr`}
              hint="Use the Rate Calculator if you're not sure what to charge"
            />

            <div className="mt-4 text-xs text-sand-400">
              Don't know your rate?{' '}
              <Link href="/tools/rate-calculator" className="text-brand-600 hover:underline">
                Calculate it free →
              </Link>
            </div>
          </div>

          {/* Project size */}
          <div className="bg-white rounded-2xl border border-sand-200 p-8">
            <h2 className="font-display font-bold text-xl text-ink mb-2">Project scope</h2>
            <p className="text-sand-500 text-sm mb-5">How large is this project?</p>
            <div className="space-y-3">
              {(Object.entries(SIZE_HOURS) as [ProjectSize, typeof SIZE_HOURS[ProjectSize]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setSize(key)}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    size === key
                      ? 'border-brand-400 bg-brand-50'
                      : 'border-sand-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold text-sm ${size === key ? 'text-brand-700' : 'text-ink'}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-sand-400">
                      {cfg.low}–{cfg.high} hrs base
                    </span>
                  </div>
                  <p className="text-xs text-sand-500">{cfg.example}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Revision buffer */}
          <div className="bg-white rounded-2xl border border-sand-200 p-8">
            <h2 className="font-display font-bold text-xl text-ink mb-2">Revision & complexity buffer</h2>
            <p className="text-sand-500 text-sm mb-5">How clear is the scope? How many revisions do you expect?</p>
            <div className="space-y-3">
              {(Object.entries(BUFFER_MULTIPLIER) as [RevisionBuffer, typeof BUFFER_MULTIPLIER[RevisionBuffer]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setBuffer(key)}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    buffer === key
                      ? 'border-brand-400 bg-brand-50'
                      : 'border-sand-200 hover:border-brand-300'
                  }`}
                >
                  <div className="font-semibold text-sm mb-0.5 ${buffer === key ? 'text-brand-700' : 'text-ink'}">
                    {cfg.label}
                  </div>
                  <p className="text-xs text-sand-500">{cfg.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {/* Quote range */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-1">Your quote range</h2>
            <p className="text-xs text-sand-400 mb-5">Based on {hoursLow}–{hoursHigh} estimated hours at ${hourlyRate}/hr</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-sand-50 border border-sand-200 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-sand-500 uppercase tracking-widest mb-1">Low</div>
                <div className="text-2xl font-extrabold font-display text-ink">{fmt(priceLow)}</div>
              </div>
              <div className="bg-sand-50 border border-sand-200 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-sand-500 uppercase tracking-widest mb-1">High</div>
                <div className="text-2xl font-extrabold font-display text-ink">{fmt(priceHigh)}</div>
              </div>
            </div>
            <div className="bg-brand-600 rounded-xl p-4 text-center text-white">
              <div className="text-xs font-bold text-brand-200 uppercase tracking-widest mb-1">Recommended flat price</div>
              <div className="text-4xl font-extrabold font-display">{fmt(recommended)}</div>
              <p className="text-brand-200 text-xs mt-1">Midpoint, rounded to nearest $50</p>
            </div>
          </div>

          {/* Payment schedule */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-4">Suggested payment schedule</h2>
            {[
              { label: 'Deposit (50%) — due before work starts', value: deposit, accent: true },
              { label: 'Mid-project milestone — due at 50% completion', value: midMilestone, accent: false },
              { label: 'Final payment — due on delivery', value: finalPayment, accent: false },
            ].map(({ label, value, accent }) => (
              <div key={label} className="flex justify-between items-center py-3 border-b border-sand-100 last:border-0">
                <span className="text-xs text-sand-600 max-w-[180px] leading-tight">{label}</span>
                <span className={`font-bold text-lg ${accent ? 'text-brand-600' : 'text-ink'}`}>{fmt(value)}</span>
              </div>
            ))}
            <p className="text-xs text-sand-400 mt-3">
              50/25/25 split — industry standard for project-based freelance work.
            </p>
          </div>

          {/* Hours breakdown */}
          <div className="bg-sand-50 border border-sand-200 rounded-2xl p-5 text-sm space-y-2">
            <h3 className="font-semibold text-ink text-sm mb-3">Hours breakdown</h3>
            <div className="flex justify-between text-sand-600">
              <span>Base hours ({sizeConfig.label})</span>
              <span>{sizeConfig.low}–{sizeConfig.high} hrs</span>
            </div>
            <div className="flex justify-between text-sand-600">
              <span>Buffer ({bufferConfig.label})</span>
              <span>×{bufferConfig.multiplier}</span>
            </div>
            <div className="flex justify-between font-semibold text-ink border-t border-sand-200 pt-2 mt-2">
              <span>Estimated total hours</span>
              <span>{hoursLow}–{hoursHigh} hrs</span>
            </div>
          </div>

          {/* Email capture */}
          {!showEmail ? (
            <button
              onClick={() => setShowEmail(true)}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              Save my estimate to email
            </button>
          ) : (
            <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5">
              <p className="text-sm font-semibold text-ink mb-1">Enter your email to save your estimate</p>
              <p className="text-xs text-sand-500 mb-4">We'll also send freelance pricing tips weekly. Unsubscribe anytime.</p>
              <EmailCapture source="project-estimator" buttonText="Save estimate" />
            </div>
          )}
        </div>
      </div>

      {/* Tips section */}
      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {[
          {
            title: 'Why flat rates beat hourly',
            body: 'Clients prefer flat rates because they eliminate budget uncertainty. You benefit because your rate per hour goes up as you get more efficient — your speed is rewarded, not penalized.',
          },
          {
            title: 'The deposit is non-negotiable',
            body: 'Clients who push back on a 50% deposit almost always cause problems later. The deposit is a filter, not just cash flow. Require it on every project without exception.',
          },
          {
            title: 'Buffer for the unknown unknowns',
            body: 'Even experienced freelancers encounter surprise complexity. A 25% buffer absorbs two extra rounds of revisions and the inevitable "actually, can we change the direction?" conversation.',
          },
        ].map(({ title, body }) => (
          <div key={title} className="bg-sand-50 rounded-2xl p-6">
            <h3 className="font-display font-bold text-ink mb-2">{title}</h3>
            <p className="text-sand-600 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Upsell */}
      <div className="mt-12 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white text-center">
        <div className="inline-flex items-center gap-2 mb-3 text-brand-200">
          <Briefcase className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Turn estimates into signed contracts</span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">Get the proposal template that closes.</h3>
        <p className="text-brand-200 mb-6 max-w-md mx-auto">
          The Client Onboarding Bundle includes a proposal template with three-tier pricing, a contract with payment terms built in, and a welcome packet — so you go from estimate to signed project faster.
        </p>
        <Link
          href="/shop/client-onboarding-bundle"
          className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          Get Client Onboarding Bundle — $19 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
