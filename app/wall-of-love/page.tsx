import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Wall of Love — Customer Testimonials | FreelanceKit',
  description:
    'Real reviews from freelancers who use FreelanceKit to run their business. Designers, developers, copywriters, consultants, and coaches share their results.',
  alternates: { canonical: `${SITE.url}/wall-of-love` },
  openGraph: {
    title: 'Wall of Love — FreelanceKit Customer Testimonials',
    description:
      'See what real freelancers say about FreelanceKit. 400+ customers across design, development, copywriting, and consulting.',
    url: `${SITE.url}/wall-of-love`,
  },
}

const EXTRA_TESTIMONIALS = [
  {
    name: 'Marcus R.',
    role: 'Freelance Video Editor',
    product: 'Freelancer OS',
    rating: 5,
    text: 'I used to have no idea which cut a client had approved — it was all in email. Now every project has a revision log in Notion and my client portal shows the current deliverable status. Revision disputes dropped completely.',
  },
  {
    name: 'Jordan K.',
    role: 'Brand Identity Designer',
    product: 'Freelancer OS',
    rating: 5,
    text: "I used to run everything through a mess of Google Docs and sticky notes. Now I open Notion in the morning and I know exactly what's due, what's unpaid, and which project is at risk. It changed how I pitch clients too — I actually know my numbers.",
  },
  {
    name: 'Jade T.',
    role: 'Freelance Social Media Manager',
    product: 'Freelancer OS',
    rating: 5,
    text: "Managing 5 clients' social media used to feel chaotic — I was always afraid of dropping the ball. Now I have a weekly view of what needs to go live across all accounts, and content approval is a single shared Notion page. Game-changer.",
  },
  {
    name: 'Rachel M.',
    role: 'Freelance Bookkeeper',
    product: 'Freelancer OS',
    rating: 5,
    text: 'I used to rebuild my monthly close checklist in a Google Doc for each client. Now I have one template in Notion that I duplicate in 30 seconds, link to the client record, and mark off as I go. Cut my admin time in half.',
  },
  {
    name: 'Daniel K.',
    role: 'Freelance SEO Consultant',
    product: 'Freelancer OS',
    rating: 5,
    text: "My clients used to ask 'what did we actually do this month?' because I had no central record. Now I keep a running task log in the client hub. Clients renew more often because they can see the work.",
  },
  {
    name: 'Elena B.',
    role: 'Independent Wedding Planner',
    product: 'Client Onboarding Bundle',
    rating: 5,
    text: "I plan 15–20 weddings a year. Before Notion, vendor tracking was a spreadsheet I dreaded opening. Now every event has its own hub — vendors, budget, timeline, and a client portal they can check anytime. My clients think I have a full team behind me.",
  },
]

type TestimonialEntry = {
  name: string
  role: string
  product: string
  rating: number
  text: string
}

function getAllTestimonials(): TestimonialEntry[] {
  const fromProducts = PRODUCTS.flatMap((p) =>
    p.testimonials.map((t) => ({
      name: t.name,
      role: t.role,
      product: p.name,
      rating: t.rating,
      text: t.text,
    }))
  )
  return [...fromProducts, ...EXTRA_TESTIMONIALS]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? 'fill-amber-400 text-amber-400' : 'text-sand-300'}`}
        />
      ))}
    </div>
  )
}

export default function WallOfLovePage() {
  const testimonials = getAllTestimonials()
  const totalCount = 400
  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'FreelanceKit Customer Reviews',
    description: 'Customer testimonials for FreelanceKit — Notion templates and AI prompt packs for freelancers.',
    url: `${SITE.url}/wall-of-love`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: totalCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            {totalCount}+ Happy Customers
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4">
            Wall of Love
          </h1>
          <p className="text-sand-500 text-xl max-w-xl mx-auto">
            Real reviews from freelancers who use FreelanceKit to land better clients, run
            smoother projects, and get paid faster.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-ink">{avgRating}</div>
              <div className="flex justify-center mt-1 mb-1">
                <StarRating rating={5} />
              </div>
              <div className="text-xs text-sand-500">Average rating</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-ink">{totalCount}+</div>
              <div className="text-xs text-sand-500 mt-2">Customers</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-extrabold text-ink">4</div>
              <div className="text-xs text-sand-500 mt-2">Products</div>
            </div>
          </div>
        </div>

        {/* Testimonial grid — masonry-style via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="break-inside-avoid bg-white border border-sand-200 rounded-2xl p-6 hover:border-brand-200 transition-colors"
            >
              <StarRating rating={t.rating} />
              <p className="text-sm text-sand-700 leading-relaxed mt-3 mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-sand-500">{t.role}</p>
                </div>
                <span className="text-xs font-medium bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full flex-shrink-0">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-brand-600 rounded-3xl p-10 text-center text-white">
          <h2 className="font-display text-3xl font-extrabold mb-3">
            Join 400+ freelancers running a smarter business
          </h2>
          <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
            One-time purchase. Instant access. 30-day money-back guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Browse products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop/complete-bundle"
              className="inline-flex items-center gap-2 bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-800 transition-colors border border-brand-500"
            >
              Get the Complete Bundle — $49
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
