import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { POSTS, formatDate } from '@/lib/blog'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog — Freelance Business Advice & Guides | FreelanceKit',
  description:
    'Practical guides on pricing, clients, contracts, and systems for freelancers. No fluff — just what actually works for independent contractors.',
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    type: 'website',
    title: 'Freelance Business Blog — FreelanceKit',
    description: 'Practical guides on pricing, clients, contracts, and systems for freelancers.',
    url: `${SITE.url}/blog`,
  },
}

const CATEGORY_ORDER = [
  'Getting Started',
  'Pricing',
  'Sales & Proposals',
  'Client Management',
  'Finance & Invoicing',
  'Legal & Contracts',
  'Business',
  'Tools & Systems',
  'Tools & Productivity',
  'Tools & Templates',
  'Marketing',
]

interface Props {
  searchParams: { category?: string }
}

export default function BlogPage({ searchParams }: Props) {
  const activeCategory = searchParams.category ?? ''

  const allSorted = [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const filtered = activeCategory
    ? allSorted.filter((p) => p.category === activeCategory)
    : allSorted

  // Derive categories that actually have posts, in preferred order
  const allCategories = Array.from(new Set(allSorted.map((p) => p.category)))
  const categories = [
    ...CATEGORY_ORDER.filter((c) => allCategories.includes(c)),
    ...allCategories.filter((c) => !CATEGORY_ORDER.includes(c)),
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'FreelanceKit Blog',
    description: 'Practical freelance business guides on pricing, clients, contracts, and systems.',
    url: `${SITE.url}/blog`,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    blogPost: allSorted.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `${SITE.url}/blog/${post.slug}`,
      author: { '@type': 'Organization', name: SITE.name },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-3">
          Freelance Business Blog
        </h1>
        <p className="text-sand-500 text-xl">
          Practical advice on pricing, clients, systems, and building a sustainable practice.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/blog"
          className={`text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
            !activeCategory
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-sand-600 border-sand-200 hover:border-brand-300 hover:text-brand-600'
          }`}
        >
          All ({allSorted.length})
        </Link>
        {categories.map((cat) => {
          const count = allSorted.filter((p) => p.category === cat).length
          const isActive = activeCategory === cat
          return (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-sand-600 border-sand-200 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {cat} ({count})
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sand-500">No posts in this category yet.</p>
      ) : (
        <>
          {/* Featured hero post (most recent) — only shown when no filter is active */}
          {!activeCategory && filtered[0] && (
            <article className="group border-2 border-brand-200 rounded-2xl p-8 bg-gradient-to-br from-brand-50 to-white hover:border-brand-400 hover:shadow-lg transition-all duration-200 mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full mb-4">
                Latest
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Link
                  href={`/blog?category=${encodeURIComponent(filtered[0].category)}`}
                  className="text-xs font-semibold bg-white text-brand-600 border border-brand-200 px-2.5 py-1 rounded-full hover:bg-brand-50 transition-colors"
                >
                  {filtered[0].category}
                </Link>
                <span className="text-xs text-sand-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {filtered[0].readingMinutes} min read
                </span>
                <span className="text-xs text-sand-400">{formatDate(filtered[0].publishedAt)}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4 group-hover:text-brand-700 transition-colors leading-tight">
                <Link href={`/blog/${filtered[0].slug}`}>{filtered[0].title}</Link>
              </h2>
              <p className="text-sand-600 leading-relaxed mb-6 max-w-2xl">{filtered[0].excerpt}</p>
              <Link
                href={`/blog/${filtered[0].slug}`}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Read article <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          )}

          {/* Rest of posts in 2-column grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {(activeCategory ? filtered : filtered.slice(1)).map((post) => (
              <article
                key={post.slug}
                className="group border border-sand-200 rounded-2xl p-6 bg-white hover:border-brand-300 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Link
                    href={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="text-xs font-semibold bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full hover:bg-brand-100 transition-colors"
                  >
                    {post.category}
                  </Link>
                  <span className="text-xs text-sand-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="font-display text-lg font-bold text-ink mb-2 group-hover:text-brand-700 transition-colors leading-snug flex-1">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sand-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-sand-400">{formatDate(post.publishedAt)}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  )
}
