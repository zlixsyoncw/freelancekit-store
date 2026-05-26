'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Mail, Copy, Check, Search, ArrowRight, Filter } from 'lucide-react'
import EmailCapture from '@/components/EmailCapture'

type Script = {
  id: string
  title: string
  category: string
  subject: string
  body: string
  tags: string[]
}

const SCRIPTS: Script[] = [
  // ── Proposals & Sales ──────────────────────────────────────────────
  {
    id: 'follow-up-after-proposal',
    title: 'Follow-up After Sending a Proposal',
    category: 'Proposals',
    subject: 'Following up on the proposal for [Project Name]',
    body: `Hi [Name],

I wanted to follow up on the proposal I sent over on [date]. I know things get busy — just wanted to make sure it landed in your inbox and see if you had any questions.

I'm happy to jump on a quick call to walk through the scope or adjust anything before you decide. The [date] start slot is still available if you'd like to move forward.

Let me know either way — no pressure at all.

[Your name]`,
    tags: ['proposal', 'follow-up', 'sales'],
  },
  {
    id: 'inquiry-response',
    title: 'Responding to a New Inquiry',
    category: 'Proposals',
    subject: 'Re: [their subject line]',
    body: `Hi [Name],

Thanks for reaching out — this sounds like exactly the kind of project I enjoy working on.

To make sure I can put together a useful proposal, a few quick questions:

1. What's your target timeline for having this live/delivered?
2. Do you have a budget range in mind?
3. Have you worked with a freelancer on this type of project before?

Once I have a sense of the scope, I can usually turn around a proposal within 24–48 hours. I'm also happy to jump on a 20-minute call if you'd prefer to talk through it first — just let me know.

Looking forward to learning more.

[Your name]`,
    tags: ['inquiry', 'new client', 'proposals'],
  },
  {
    id: 'proposal-accepted-next-steps',
    title: 'Proposal Accepted — Next Steps',
    category: 'Proposals',
    subject: 'Proposal accepted — here are the next steps',
    body: `Hi [Name],

Great news — I'm excited to work on this together.

Here's what happens next:

1. **Contract** — I'll send the project contract to [email] within the next few hours via [DocuSign/HelloSign]. Please sign at your earliest convenience.
2. **Deposit invoice** — A deposit invoice for [amount] will follow shortly after. Work begins once both the contract is signed and the deposit is received.
3. **Kickoff** — Once those are done, I'll send you a short intake form to capture project details before our kickoff call.

Please don't hesitate to reach out if you have any questions in the meantime.

Looking forward to getting started.

[Your name]`,
    tags: ['onboarding', 'proposal', 'contract'],
  },

  // ── Invoicing & Payments ────────────────────────────────────────────
  {
    id: 'invoice-past-due-first',
    title: 'First Payment Reminder (3 Days Past Due)',
    category: 'Invoicing',
    subject: 'Invoice #[number] — gentle reminder',
    body: `Hi [Name],

Just a quick note — Invoice #[number] for [amount] was due on [date] and hasn't been processed yet.

If payment has already been sent, please ignore this — it may be crossing in transit. If not, you can pay here: [payment link]

Let me know if you have any questions about the invoice or if there's an issue I can help resolve.

Thanks,
[Your name]`,
    tags: ['invoice', 'payment', 'reminder'],
  },
  {
    id: 'invoice-past-due-second',
    title: 'Second Payment Reminder (2 Weeks Past Due)',
    category: 'Invoicing',
    subject: 'Invoice #[number] — 14 days past due',
    body: `Hi [Name],

I'm writing again about Invoice #[number] for [amount], which is now 14 days past its due date of [date].

I'd like to get this resolved as quickly as possible. Could you let me know:
- When you expect to be able to process this payment?
- Is there anything on the invoice that needs clarification?

If there's an issue, I'm happy to jump on a call to sort it out. I'd rather resolve this directly than let it linger.

Payment link: [link]

Thanks,
[Your name]`,
    tags: ['invoice', 'payment', 'overdue'],
  },
  {
    id: 'deposit-request',
    title: 'Deposit Invoice Request',
    category: 'Invoicing',
    subject: 'Deposit invoice for [Project Name]',
    body: `Hi [Name],

Attached is the deposit invoice for [Project Name] — [amount], representing [25/50]% of the total project fee.

As outlined in our contract, work begins once the contract is signed and this deposit is received. Once both are done, I'll send the intake form and we can schedule our kickoff call.

You can pay here: [payment link]

Looking forward to getting started!

[Your name]`,
    tags: ['invoice', 'deposit', 'onboarding'],
  },
  {
    id: 'final-invoice',
    title: 'Final Invoice with Deliverables',
    category: 'Invoicing',
    subject: 'Final delivery + invoice for [Project Name]',
    body: `Hi [Name],

It's been a pleasure working on [Project Name] — attached are the final deliverables:

[List files/links]

I've also attached the final invoice for [amount], due [date]. Per our agreement, final files are included with this delivery, with full transfer of rights upon receipt of final payment.

Payment link: [link]

It was a genuinely enjoyable project. I'd love to work together again — and if you know anyone looking for [your service], I'm always happy to take referrals.

Thanks again,
[Your name]`,
    tags: ['invoice', 'final delivery', 'wrap-up'],
  },

  // ── Scope & Contracts ───────────────────────────────────────────────
  {
    id: 'scope-creep-response',
    title: 'Responding to an Out-of-Scope Request',
    category: 'Scope & Contracts',
    subject: 'Re: [their request]',
    body: `Hi [Name],

Love this idea — I can see why you'd want to add it.

That said, it falls outside the scope we agreed on in the contract, so I'd need to quote it as an add-on rather than include it in the current engagement. I can put together a quick estimate if you'd like — usually a day or two turnaround.

Alternatively, if you'd like to replace something currently in scope with this instead, we can do that too.

Let me know how you'd like to handle it and I'll move quickly.

[Your name]`,
    tags: ['scope creep', 'boundaries', 'contracts'],
  },
  {
    id: 'contract-send',
    title: 'Sending the Contract',
    category: 'Scope & Contracts',
    subject: '[Project Name] — project contract',
    body: `Hi [Name],

As discussed, please find the project contract via [DocuSign/HelloSign] — a signature request should arrive separately at [email].

A few things to note:
- Scope, revision rounds, and payment terms are all outlined in sections 2, 3, and 4
- The deposit invoice will follow once the contract is signed
- Please don't hesitate to ask if anything needs clarification before you sign

I want to make sure we're both completely clear on expectations before we get started. That clarity is what makes the project run smoothly.

[Your name]`,
    tags: ['contract', 'onboarding', 'legal'],
  },
  {
    id: 'deadline-delay-client',
    title: 'Client-Caused Deadline Delay Notice',
    category: 'Scope & Contracts',
    subject: '[Project Name] — timeline update',
    body: `Hi [Name],

I wanted to flag a timeline update on [Project Name].

Our agreed delivery date was [original date], but I haven't received [the assets / feedback / sign-off] requested on [date]. Per our contract, client-caused delays extend the project timeline by the same number of business days.

The updated delivery date is now [new date], based on receiving what I need by [date].

If you'd like to keep the original deadline, I can accommodate that with a rush fee of [amount], applied to the final invoice.

No pressure either way — just wanted to be transparent and give you options.

[Your name]`,
    tags: ['deadline', 'timeline', 'client management'],
  },

  // ── Client Management ───────────────────────────────────────────────
  {
    id: 'project-status-update',
    title: 'Weekly Project Status Update',
    category: 'Client Management',
    subject: '[Project Name] — weekly update',
    body: `Hi [Name],

Quick update on where [Project Name] stands:

✅ Done this week:
- [Item 1]
- [Item 2]

🔄 In progress:
- [Item]

📋 Pending from your side:
- [Item — needed by date if applicable]

📅 On track for [delivery date].

Let me know if you have any questions or feedback. Next update on [day].

[Your name]`,
    tags: ['status update', 'communication', 'project management'],
  },
  {
    id: 'kickoff-call-confirmation',
    title: 'Kickoff Call Confirmation + Agenda',
    category: 'Client Management',
    subject: '[Project Name] — kickoff call confirmed',
    body: `Hi [Name],

Looking forward to our kickoff call on [day] at [time].

Here's the agenda so we can make the most of the time:

1. Confirm scope and deliverables (5 min)
2. Review the project brief and your intake form answers (10 min)
3. Discuss any open questions or decisions needed (10 min)
4. Agree on communication cadence and next milestones (5 min)

Please have the following ready if possible:
- [Required asset or access]
- [Decision on X]

I'll send a brief written summary after the call. See you [day]!

[Your name]`,
    tags: ['kickoff', 'onboarding', 'project management'],
  },
  {
    id: 'client-offboarding',
    title: 'Project Wrap-Up & Offboarding',
    category: 'Client Management',
    subject: '[Project Name] — wrapping up + final files',
    body: `Hi [Name],

With [Project Name] wrapped up, I wanted to send a proper close-out.

What's included in this email:
- [Final deliverable list with links/attachments]
- Summary of what we built and key decisions made

A few housekeeping items:
- Final invoice: already sent / see attached
- All working files are available at [link] for 30 days, then archived
- If you need anything adjusted post-delivery, let me know — minor tweaks within 7 days of delivery are included

It's been a pleasure. If there's anything else I can help with in the future, don't hesitate to reach out.

And if you know anyone looking for [your service], referrals are always appreciated!

[Your name]`,
    tags: ['wrap-up', 'offboarding', 'final delivery'],
  },
  {
    id: 'testimonial-request',
    title: 'Requesting a Testimonial',
    category: 'Client Management',
    subject: 'A quick favor — would you leave a review?',
    body: `Hi [Name],

Really glad [Project Name] went well — it was one of those projects I genuinely enjoyed.

If you have 3 minutes, I'd love a short testimonial I can share on my website and use in future proposals. The most useful reviews mention:
- What we worked on together
- A specific result or change you noticed
- Who you'd recommend me to

You can reply directly to this email — or if you'd prefer, I can send a Google Form.

No pressure at all if the timing isn't right. Either way, it was a pleasure working with you.

[Your name]`,
    tags: ['testimonial', 'social proof', 'relationship'],
  },
  {
    id: 'referral-ask',
    title: 'Asking for a Referral',
    category: 'Client Management',
    subject: 'Do you know anyone who could use [your service]?',
    body: `Hi [Name],

Now that [Project] is complete, I wanted to reach out about one thing: referrals.

The majority of my best projects have come through people I've already worked with. If you know anyone — a colleague, a founder you've met, someone in your network — who's looking for help with [your service], I'd genuinely appreciate an introduction.

I take referrals seriously: I'll always treat anyone you refer with the same level of care and professionalism you experienced.

Even just forwarding my website ([URL]) or mentioning my name would be a huge help.

Thank you, and I hope we get to work together again.

[Your name]`,
    tags: ['referral', 'business development', 'relationship'],
  },

  // ── Difficult Situations ───────────────────────────────────────────
  {
    id: 'difficult-feedback-response',
    title: 'Responding to Harsh or Unclear Feedback',
    category: 'Difficult Situations',
    subject: 'Re: [their feedback]',
    body: `Hi [Name],

Thank you for the feedback — I want to make sure I fully understand what you're looking for so we can get this right.

A few clarifying questions:

1. [Specific question about the feedback]
2. Could you point to any examples — even from a different context — that capture the direction you have in mind?
3. On a scale of "minor adjustment" to "rethink from scratch," where does this feel to you?

Once I have clearer direction, I can turn around a revised version quickly.

[Your name]`,
    tags: ['feedback', 'revision', 'communication'],
  },
  {
    id: 'missed-deadline-apology',
    title: 'Apologizing for a Missed Deadline',
    category: 'Difficult Situations',
    subject: '[Project Name] — delivery update',
    body: `Hi [Name],

I owe you an apology. [Project Name] was due on [date] and I'm running behind. I should have flagged this sooner rather than waiting.

The current status: [brief explanation, no over-sharing].

My revised delivery date is [date]. If this creates a problem on your end, please let me know and we'll discuss how to address it.

I'm sorry for the disruption. I'll keep you posted on progress and won't miss this revised date.

[Your name]`,
    tags: ['apology', 'deadline', 'difficult situations'],
  },
  {
    id: 'client-firing',
    title: 'Ending a Client Engagement Professionally',
    category: 'Difficult Situations',
    subject: '[Project Name] — engagement update',
    body: `Hi [Name],

I've given this careful thought, and I've decided this engagement isn't the right fit for either of us at this point.

I'll complete [specific remaining deliverable/milestone] and deliver it by [date]. I'll also prepare a full handoff document — all project files, decisions made, and current status — so whoever takes this forward has everything they need.

I want to make this transition as smooth as possible for you. Please let me know if you have questions.

[Your name]`,
    tags: ['offboarding', 'difficult situations', 'ending engagement'],
  },
  {
    id: 'rate-increase-notice',
    title: 'Rate Increase Notice to Existing Clients',
    category: 'Difficult Situations',
    subject: 'Rate update starting [date]',
    body: `Hi [Name],

I'm reaching out to let you know that my rates are adjusting starting [date], as part of an annual review.

Effective [date]:
- New rate: [amount]
- Current active work continues at our existing rate through [project milestone/date]

I've really enjoyed working together, and I hope to continue doing so. If you have any questions, please don't hesitate to reach out.

[Your name]`,
    tags: ['rates', 'pricing', 'existing clients'],
  },
  {
    id: 'unavailable-for-project',
    title: 'Turning Down a Project Professionally',
    category: 'Difficult Situations',
    subject: 'Re: [project inquiry]',
    body: `Hi [Name],

Thank you for thinking of me for this — it sounds like an interesting project.

Unfortunately, I'm not able to take on new work at this time / this isn't quite the right fit for my current focus. I want to make sure you get someone who can give it the attention it deserves.

A few people who might be a better fit: [referral names, if any]

I hope we get the chance to work together on something in the future. Best of luck with the project!

[Your name]`,
    tags: ['declining', 'new client', 'turning down work'],
  },

  // ── LinkedIn Outreach ──────────────────────────────────────────────
  {
    id: 'linkedin-connection-request',
    title: 'LinkedIn Connection Request Note',
    category: 'LinkedIn & Outreach',
    subject: '',
    body: `Hi [Name],

I've been following your posts on [topic] — lots of overlap with the work I do on the [service] side. Happy to connect.

[Your name]`,
    tags: ['linkedin', 'outreach', 'business development'],
  },
  {
    id: 'linkedin-first-message',
    title: 'First Message After LinkedIn Connection',
    category: 'LinkedIn & Outreach',
    subject: '',
    body: `Hi [Name],

Thanks for connecting. I read your post on [topic] — your point about [specific insight] resonated. I've seen a similar pattern with [one or two clients].

If you're ever curious how others have approached that, happy to share what's worked. No agenda — just thought it might be useful.

[Your name]`,
    tags: ['linkedin', 'outreach', 'warm approach'],
  },
  {
    id: 'cold-email-targeted',
    title: 'Targeted Cold Outreach Email',
    category: 'LinkedIn & Outreach',
    subject: '[Specific observation about their business]',
    body: `Hi [Name],

I noticed [specific thing you observed about their business — a landing page issue, a recent launch, a gap in their content]. [One sentence on the specific problem it creates.]

I've helped [1–2 similar companies] fix exactly this — in one case, it [specific result].

Would it be worth a 15-minute call to share what worked? No commitment — I'll bring the thinking and you decide if it's useful.

[Your name]`,
    tags: ['cold email', 'outreach', 'business development'],
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(SCRIPTS.map((s) => s.category)))]

function ScriptCard({ script }: { script: Script }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = script.subject
      ? `Subject: ${script.subject}\n\n${script.body}`
      : script.body
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-sand-200 rounded-2xl overflow-hidden hover:border-brand-300 hover:shadow-sm transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="inline-block text-xs font-semibold bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full mb-2">
              {script.category}
            </span>
            <h3 className="font-display font-bold text-ink leading-snug">{script.title}</h3>
            {script.subject && (
              <p className="text-xs text-sand-400 mt-1">
                Subject: <span className="italic text-sand-500">{script.subject}</span>
              </p>
            )}
          </div>
          <button
            onClick={handleCopy}
            className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
              copied
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-sand-100 text-sand-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
            aria-label="Copy email script"
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5" /> Copied!</>
            ) : (
              <><Copy className="w-3.5 h-3.5" /> Copy</>
            )}
          </button>
        </div>
        <pre className="text-sm text-sand-600 leading-relaxed font-sans whitespace-pre-wrap bg-sand-50 rounded-xl p-4 max-h-56 overflow-y-auto">
          {script.body}
        </pre>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {script.tags.map((tag) => (
            <span key={tag} className="text-xs text-sand-400 bg-sand-50 border border-sand-100 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EmailScriptsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [showCapture, setShowCapture] = useState(false)

  const filtered = useMemo(() => {
    return SCRIPTS.filter((s) => {
      const matchCat = activeCategory === 'All' || s.category === activeCategory
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        s.body.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Mail className="w-3.5 h-3.5" /> Free Tool
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
          Freelance Email Scripts
        </h1>
        <p className="text-sand-500 text-xl max-w-2xl mx-auto">
          25 copy-paste email templates for every freelance situation — proposals, late payments,
          scope creep, client wrap-ups, and more. No signup required.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-sand-200 rounded-xl text-sm text-ink placeholder-sand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Filter className="w-4 h-4 text-sand-400" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-sand-600 border-sand-200 hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scripts grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-sand-400">
          <p className="text-lg font-medium mb-1">No scripts found</p>
          <p className="text-sm">Try a different search term or category</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filtered.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>
      )}

      {/* Email capture banner */}
      {!showCapture ? (
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold mb-1">Want all 200 email scripts?</h3>
            <p className="text-brand-200">
              The AI Prompt Pack includes 200 tested prompts and templates — organized by workflow stage.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => setShowCapture(true)}
              className="flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              <Mail className="w-4 h-4" /> Get free weekly scripts
            </button>
            <Link
              href="/shop/ai-prompt-pack"
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Get the full pack — $17 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-bold text-ink mb-2">
            Get new scripts every week — free
          </h3>
          <p className="text-sand-500 mb-6 text-sm max-w-md mx-auto">
            We email new client email scripts every week. Plus the free Notion starter template instantly.
          </p>
          <div className="max-w-md mx-auto">
            <EmailCapture source="email-scripts-tool" buttonText="Send me weekly scripts" />
          </div>
          <p className="text-sand-400 text-xs mt-3">No spam. Unsubscribe any time.</p>
        </div>
      )}

      {/* Upsell to AI Prompt Pack */}
      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {[
          {
            title: 'These are just the email scripts',
            body: 'The AI Prompt Pack includes 200 tested prompts across proposals, client communication, deliverable creation, admin, and marketing.',
          },
          {
            title: 'Works with ChatGPT, Claude, or Gemini',
            body: "All prompts are model-agnostic. Notes indicate which ones perform best on which AI. No prompt engineering required — just copy, paste, and customize.",
          },
          {
            title: 'Organized by workflow stage',
            body: 'Not a random dump of prompts. Each one is tagged by situation so you find exactly what you need in seconds — without scrolling through 200 options.',
          },
        ].map(({ title, body }) => (
          <div key={title} className="bg-sand-50 rounded-2xl p-6">
            <h3 className="font-display font-bold text-ink mb-2">{title}</h3>
            <p className="text-sand-600 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
