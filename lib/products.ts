import type { Product } from './types'

export const PRODUCTS: Product[] = [
  {
    id: 'freelancer-os',
    slug: 'freelancer-os',
    name: 'Freelancer OS',
    tagline: 'Your entire freelance business, organized in one Notion workspace.',
    description:
      'Stop juggling spreadsheets, sticky notes, and separate apps. Freelancer OS is a complete Notion dashboard built for solo consultants — with everything from lead tracking to client delivery to invoicing in one interconnected system.',
    longDescription: `
      <p>Most freelancers run their business in their head. Leads pile up in email. Projects live in Slack threads. Invoices get sent late. The Freelancer OS fixes all of that.</p>
      <p>Built after 200+ interviews with six-figure freelancers, this Notion workspace gives you the infrastructure of an agency at the cost of a coffee.</p>
      <h3>What's Inside</h3>
      <ul>
        <li><strong>CRM Dashboard</strong> — Track every prospect from first contact to signed contract. Never miss a follow-up again.</li>
        <li><strong>Project Hub</strong> — One place for deliverables, deadlines, files, and client notes. Linked to your CRM automatically.</li>
        <li><strong>Invoice Tracker</strong> — Log every invoice, track payment status, and see your monthly revenue at a glance.</li>
        <li><strong>Time Logger</strong> — Log hours per project. See profitability. Know which clients are worth keeping.</li>
        <li><strong>Weekly Review Template</strong> — A 15-minute weekly ritual to stay on track with revenue goals.</li>
        <li><strong>Client Portal Template</strong> — A shareable Notion page you duplicate for each client. Impresses every time.</li>
      </ul>
      <h3>Who It's For</h3>
      <p>Freelance web developers, designers, copywriters, consultants, and coaches earning $3K–$20K/month who are ready to run their business like a business.</p>
    `,
    price: 29,
    compareAtPrice: 49,
    badge: 'Bestseller',
    // TODO: Replace with your actual Gumroad product URL after creating the product at gumroad.com
    gumroadUrl: 'https://freelancekit.gumroad.com/l/freelancer-os',
    // TODO: Replace with your actual Gumroad product ID (found in the embed code)
    gumroadId: 'freelancer-os',
    category: 'notion',
    includes: [
      'Freelancer OS Notion workspace (duplicate to your account)',
      'CRM with pipeline view + client database',
      'Project management hub with task tracking',
      'Invoice & payment tracker',
      'Time logging per project',
      'Weekly business review template',
      'Shareable client portal template',
      'Setup video walkthrough (20 min)',
      'Lifetime updates',
    ],
    previewImages: ['/products/freelancer-os/preview-1.jpg', '/products/freelancer-os/preview-2.jpg'],
    fileTypes: ['Notion Template Link'],
    downloadSize: 'Instant access link',
    featured: true,
    bestseller: true,
    new: false,
    rating: 4.9,
    reviewCount: 147,
    testimonials: [
      {
        name: 'Maya Chen',
        role: 'Freelance Brand Designer',
        text: 'I went from chaos to clarity in one afternoon. The CRM alone was worth the price — I closed two leads I had forgotten about within a week of setting it up.',
        rating: 5,
      },
      {
        name: 'James Okafor',
        role: 'Independent Web Developer',
        text: 'I\'ve bought five Notion templates. This is the only one I actually use. The invoice tracker showed me I was undercharging by 30% on one client. Fixed that fast.',
        rating: 5,
      },
      {
        name: 'Sarah Lindqvist',
        role: 'B2B Copywriter',
        text: 'Every consultant friend I have now uses this. The client portal template alone gets comments from every single client. Worth every penny.',
        rating: 5,
      },
    ],
  },
  {
    id: 'client-onboarding-bundle',
    slug: 'client-onboarding-bundle',
    name: 'Client Onboarding Bundle',
    tagline: 'Land clients confidently and kick off every project like a seasoned pro.',
    description:
      'The moment a client signs a contract is when the relationship is most fragile. This bundle gives you battle-tested Notion templates and documents that turn nervous new clients into excited collaborators — from first inquiry to project kickoff.',
    longDescription: `
      <p>The difference between a $50/hr freelancer and a $150/hr freelancer isn't usually the work — it's the experience they deliver. This bundle gives you the onboarding experience of a top agency.</p>
      <h3>What's Inside</h3>
      <ul>
        <li><strong>Discovery Call Template</strong> — A Notion doc with 25 questions organized by goal type. Nail every sales call.</li>
        <li><strong>Proposal Template</strong> — A clean, persuasive proposal structure with pricing page, timeline, and social proof slots.</li>
        <li><strong>Freelance Contract Template</strong> — Plain-English contracts for project-based, retainer, and hourly engagements. Lawyer-reviewed structure.</li>
        <li><strong>Project Brief Template</strong> — The document you send clients after signing. Captures scope, goals, stakeholders, and success metrics.</li>
        <li><strong>Welcome Packet</strong> — A polished Notion page that introduces working norms, communication expectations, and next steps.</li>
        <li><strong>Kickoff Meeting Agenda</strong> — Run the perfect first meeting. Every time.</li>
      </ul>
    `,
    price: 19,
    compareAtPrice: 35,
    badge: 'New',
    // TODO: Replace with your actual Gumroad product URL
    gumroadUrl: 'https://freelancekit.gumroad.com/l/client-onboarding-bundle',
    // TODO: Replace with your actual Gumroad product ID
    gumroadId: 'client-onboarding-bundle',
    category: 'notion',
    includes: [
      'Discovery call question bank (25 questions)',
      'Proposal template (with pricing + timeline)',
      'Freelance contract template (3 contract types)',
      'Project brief / scope document',
      'Client welcome packet template',
      'Kickoff meeting agenda',
      'Email scripts for each onboarding stage',
    ],
    previewImages: ['/products/client-onboarding/preview-1.jpg'],
    fileTypes: ['Notion Template Link', 'Google Doc versions'],
    downloadSize: 'Instant access link',
    featured: true,
    bestseller: false,
    new: true,
    rating: 4.8,
    reviewCount: 63,
    testimonials: [
      {
        name: 'Tom Reyes',
        role: 'UX Consultant',
        text: 'My clients keep complimenting how organized and professional the process feels. I just use the welcome packet template and they think I have a team behind me.',
        rating: 5,
      },
      {
        name: 'Priya Nair',
        role: 'Content Strategist',
        text: 'The contract templates alone saved me from a nightmare client situation. Now I send proper contracts to everyone, even small projects.',
        rating: 5,
      },
    ],
  },
  {
    id: 'ai-prompt-pack',
    slug: 'ai-prompt-pack',
    name: 'AI Prompt Pack for Freelancers',
    tagline: '200 prompts that save you 5+ hours every week on client work.',
    description:
      'Stop writing the same emails, proposals, and briefs from scratch. This curated pack of 200 ChatGPT and Claude prompts is organized by freelance workflow stage — so you can get to results fast without prompt engineering.',
    longDescription: `
      <p>Most AI prompt packs are generic. This one is built for freelancers. Every prompt was tested across real client engagements by working independent contractors.</p>
      <h3>What's Inside (200 Prompts)</h3>
      <ul>
        <li><strong>Sales & Proposals (40 prompts)</strong> — Write proposals, answer objections, follow up elegantly, price confidently.</li>
        <li><strong>Client Communication (35 prompts)</strong> — Status updates, scope creep responses, difficult conversations, check-in messages.</li>
        <li><strong>Deliverable Creation (55 prompts)</strong> — First drafts, frameworks, outlines, and quality checks for your specific niche (design, dev, copy, strategy).</li>
        <li><strong>Admin & Operations (30 prompts)</strong> — Invoice reminders, contract summaries, meeting prep, end-of-project retros.</li>
        <li><strong>Marketing Yourself (40 prompts)</strong> — LinkedIn posts, case study templates, testimonial requests, portfolio copy.</li>
      </ul>
      <h3>Works With</h3>
      <p>ChatGPT (any tier), Claude, Gemini. Prompts are model-agnostic with notes on which work best where.</p>
    `,
    price: 17,
    compareAtPrice: 29,
    badge: undefined,
    // TODO: Replace with your actual Gumroad product URL
    gumroadUrl: 'https://freelancekit.gumroad.com/l/ai-prompt-pack',
    // TODO: Replace with your actual Gumroad product ID
    gumroadId: 'ai-prompt-pack',
    category: 'prompts',
    includes: [
      '200 copy-paste prompts organized by workflow stage',
      'Prompt cheat sheet (1-page reference PDF)',
      'Notion database version (searchable)',
      'Google Sheets version',
      'Tips for customizing prompts to your niche',
      'Bi-annual updates as AI models evolve',
    ],
    previewImages: ['/products/ai-prompt-pack/preview-1.jpg'],
    fileTypes: ['PDF', 'Notion Template Link', 'Google Sheets'],
    downloadSize: '2.4 MB',
    featured: true,
    bestseller: false,
    new: false,
    rating: 4.7,
    reviewCount: 211,
    testimonials: [
      {
        name: 'Alex Petrov',
        role: 'Freelance Developer',
        text: 'The "scope creep response" prompts alone paid for this 10x over. Saved a client relationship and got paid for the extra work.',
        rating: 5,
      },
      {
        name: 'Dana Kowalski',
        role: 'Marketing Consultant',
        text: 'I use the LinkedIn post prompts every week. My engagement went up 3x and I landed two inbound leads in the first month.',
        rating: 4,
      },
    ],
  },
  {
    id: 'complete-bundle',
    slug: 'complete-bundle',
    name: 'Complete Bundle',
    tagline: 'Everything in FreelanceKit. Best value. Instant access.',
    description:
      'Get Freelancer OS, the Client Onboarding Bundle, and the AI Prompt Pack together at a steep discount. This is everything you need to run a professional, profitable freelance business — bought once, used forever.',
    longDescription: `
      <p>The Complete Bundle gives you every tool in the FreelanceKit library at one price. If you're serious about running your freelance business like a real business, this is the move.</p>
      <h3>Everything Included</h3>
      <ul>
        <li>✦ Freelancer OS Notion workspace (CRM, projects, invoicing, time tracking)</li>
        <li>✦ Client Onboarding Bundle (proposals, contracts, welcome packet, kickoff)</li>
        <li>✦ AI Prompt Pack for Freelancers (200 prompts across all workflows)</li>
        <li>✦ All future updates to every product, free forever</li>
        <li>✦ Priority email support</li>
      </ul>
      <p>Buying individually: $65. Bundle price: $49. Save $16 — or about 25%.</p>
    `,
    price: 49,
    compareAtPrice: 65,
    badge: 'Best Value',
    // TODO: Replace with your actual Gumroad product URL
    gumroadUrl: 'https://freelancekit.gumroad.com/l/complete-bundle',
    // TODO: Replace with your actual Gumroad product ID
    gumroadId: 'complete-bundle',
    category: 'bundle',
    includes: [
      'Freelancer OS Notion workspace',
      'Client Onboarding Bundle (all 6 templates)',
      'AI Prompt Pack (200 prompts)',
      'All future product updates',
      'Priority email support',
    ],
    previewImages: [],
    fileTypes: ['Notion Template Links', 'PDF', 'Google Sheets'],
    downloadSize: 'Instant access',
    featured: false,
    bestseller: false,
    new: false,
    rating: 5.0,
    reviewCount: 38,
    testimonials: [
      {
        name: 'Nadia Flores',
        role: 'Brand Strategist',
        text: 'I bought the bundle on a Friday, spent the weekend setting everything up, and by Monday I had sent my first Freelancer OS-powered proposal. Closed it two days later.',
        rating: 5,
      },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured)
}
