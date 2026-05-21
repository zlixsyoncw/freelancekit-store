import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { POSTS, getPost, formatDate } from '@/lib/blog'
import { SITE } from '@/lib/site'
import EmailCapture from '@/components/EmailCapture'

const CATEGORY_CTA: Record<string, { heading: string; body: string; href: string; label: string }> = {
  'Sales & Proposals': {
    heading: 'Turn this into a system, not just knowledge.',
    body: 'The Client Onboarding Bundle includes a ready-to-use proposal template with three-tier pricing, a contract, a welcome packet, and a kickoff doc — everything covered in this article, pre-built.',
    href: '/shop/client-onboarding-bundle',
    label: 'Get Client Onboarding Bundle — $19',
  },
  'Legal & Contracts': {
    heading: 'Get a contract template that covers all of this.',
    body: 'The Client Onboarding Bundle includes a plain-English freelance contract template with all the clauses covered in this article — scope, revisions, kill fee, IP, and more.',
    href: '/shop/client-onboarding-bundle',
    label: 'Get Client Onboarding Bundle — $19',
  },
  Pricing: {
    heading: 'Calculate your actual rate in 60 seconds.',
    body: 'The free FreelanceKit Rate Calculator gives you your minimum, recommended, and premium hourly rate based on your income goal, hours, taxes, and overhead.',
    href: '/tools/rate-calculator',
    label: 'Try the free rate calculator',
  },
  'Client Management': {
    heading: 'Build this system in Notion — today.',
    body: 'The Freelancer OS includes the complete onboarding workflow: a client CRM, project hub with revision tracking, shareable portal, and invoice tracker — all linked and ready to use.',
    href: '/shop/freelancer-os',
    label: 'Get Freelancer OS — $29',
  },
  'Finance & Invoicing': {
    heading: 'Track every invoice in one place.',
    body: 'The Freelancer OS includes an invoice tracker with Outstanding / Paid views, revenue dashboard, and automated follow-up reminders — all in Notion.',
    href: '/shop/freelancer-os',
    label: 'Get Freelancer OS — $29',
  },
  'Tools & Productivity': {
    heading: 'The tool that ties all of this together.',
    body: 'The Freelancer OS is a complete Notion workspace: CRM, project hub, invoice tracker, and client portal — all linked. One-time $29, no subscription.',
    href: '/shop/freelancer-os',
    label: 'Get Freelancer OS — $29',
  },
  'Getting Started': {
    heading: 'Start with the right infrastructure.',
    body: 'The Complete Bundle gives you the Freelancer OS workspace, Client Onboarding Bundle, and AI Prompt Pack — everything you need to launch a professional freelance practice.',
    href: '/shop/complete-bundle',
    label: 'Get the Complete Bundle — $49',
  },
}

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const cta = CATEGORY_CTA[post.category] ?? {
    heading: 'Ready to put this into practice?',
    body: "FreelanceKit's Notion templates and AI prompt packs give you the systems to run a professional, profitable freelance business — starting today.",
    href: '/shop',
    label: 'Browse products',
  }

  const allSorted = [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const currentIndex = allSorted.findIndex((p) => p.slug === post.slug)
  const prev = allSorted[currentIndex + 1]
  const next = allSorted[currentIndex - 1]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-sand-500 hover:text-brand-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs font-semibold bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-sand-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingMinutes} min read
          </span>
          <time className="text-xs text-sand-400" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-sand-500 text-xl leading-relaxed mb-10 pb-10 border-b border-sand-200">
          {post.excerpt}
        </p>

        {/* Article body */}
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-sand-200">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-sand-100 text-sand-600 px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA to shop — category-specific */}
        <div className="mt-12 bg-brand-50 border border-brand-200 rounded-2xl p-8">
          <h3 className="font-display font-bold text-ink text-xl mb-2">{cta.heading}</h3>
          <p className="text-sand-600 text-sm mb-5">{cta.body}</p>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            {cta.label} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Email capture */}
        <div className="mt-12 border border-sand-200 rounded-2xl p-8">
          <h3 className="font-display font-bold text-ink text-lg mb-2">
            Get more guides like this.
          </h3>
          <p className="text-sand-500 text-sm mb-5">
            Weekly freelance business tips. No spam. Unsubscribe anytime.
          </p>
          <EmailCapture source={`blog-${post.slug}`} />
        </div>

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex flex-col gap-1 border border-sand-200 rounded-xl p-5 hover:border-brand-300 transition-colors group"
              >
                <span className="text-xs text-sand-400 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="font-display font-bold text-ink text-sm leading-snug group-hover:text-brand-700 transition-colors">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="flex flex-col gap-1 border border-sand-200 rounded-xl p-5 hover:border-brand-300 transition-colors text-right group ml-auto w-full"
              >
                <span className="text-xs text-sand-400 flex items-center justify-end gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="font-display font-bold text-ink text-sm leading-snug group-hover:text-brand-700 transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  )
}
