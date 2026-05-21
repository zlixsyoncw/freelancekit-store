import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About FreelanceKit',
  description:
    'FreelanceKit was built by freelancers, for freelancers. Our mission is to give independent contractors the business infrastructure of a full agency.',
  alternates: { canonical: `${SITE.url}/about` },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold bg-brand-50 text-brand-600 px-3 py-1.5 rounded-full">
          Our story
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-4 mb-6 leading-tight">
          Built by freelancers who were tired of running their business in their head.
        </h1>
        <p className="text-sand-600 text-xl leading-relaxed">
          FreelanceKit started as a private Notion system shared between a group of independent
          designers, developers, and consultants. It grew into something hundreds of freelancers
          now rely on to run their entire practice.
        </p>
      </div>

      <div className="space-y-8 text-sand-700 text-[17px] leading-relaxed">
        <p>
          The problem with most freelance advice is that it treats business infrastructure as
          optional. &ldquo;Just start taking clients and figure the rest out.&rdquo; That works
          until it doesn&apos;t — usually when you&apos;re juggling five clients, an overflowing inbox, and
          a late invoice you forgot to send.
        </p>
        <p>
          We interviewed over 200 freelancers earning between $60K and $400K per year. We asked
          them what systems they actually used, what tools they&apos;d rebuilt from scratch if they
          could, and what gaps cost them the most in time and money. Then we built those systems.
        </p>
        <p>
          Everything in FreelanceKit is used by working independent contractors. Not designed for
          them — designed by them, iterated with their input, tested in real client engagements.
        </p>

        <blockquote className="border-l-4 border-brand-300 pl-6 py-1 bg-brand-50 rounded-r-xl">
          <p className="text-brand-800 italic mb-0">
            &ldquo;My goal was simple: give a solo freelancer the business infrastructure of a
            well-run agency, at the cost of a few cups of coffee.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-display text-2xl font-bold text-ink pt-4">Our principles</h2>
        <ul className="space-y-4 list-none">
          {[
            ['One-time pricing, always', 'We will never charge a monthly subscription for something that doesn\'t need one. These are tools, not services. You buy them once and own them.'],
            ['Real, not aspirational', 'Everything we ship has been used in production by actual freelancers. No templates designed to look good on a landing page and never opened again.'],
            ['Updates are free', 'When we improve a product, existing customers get the update at no cost. Always.'],
            ['Honest guarantees', 'If you buy something and it doesn\'t deliver value in 30 days, we refund you. No forms. Just an email.'],
          ].map(([title, desc]) => (
            <li key={title as string} className="flex gap-3">
              <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-ink">{title as string}</strong>
                <p className="text-sand-600 text-sm mt-0.5">{desc as string}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink pt-4">Get in touch</h2>
        <p>
          Questions, feedback, or just want to share how you&apos;re using FreelanceKit? Email us at{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-brand-600 underline underline-offset-2 hover:text-brand-700 transition-colors"
          >
            {SITE.email}
          </a>
          . We read every message and reply to most.
        </p>
        <p>
          Interested in an affiliate arrangement? We pay 30% commission on every referred sale.
          Same email address to get started.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          Browse all products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
