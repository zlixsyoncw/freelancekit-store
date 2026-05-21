import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { POSTS, formatDate } from '@/lib/blog'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog — Freelance Business Advice & Guides',
  description:
    'Practical guides on pricing, clients, systems, and growing a profitable freelance practice. No fluff, just what works.',
  alternates: { canonical: `${SITE.url}/blog` },
}

export default function BlogPage() {
  const sorted = [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-3">
          Freelance Business Blog
        </h1>
        <p className="text-sand-500 text-xl">
          Practical advice on pricing, clients, systems, and building a sustainable practice.
        </p>
      </div>

      <div className="space-y-8">
        {sorted.map((post) => (
          <article
            key={post.slug}
            className="group border border-sand-200 rounded-2xl p-8 bg-white hover:border-brand-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-sand-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingMinutes} min read
              </span>
              <span className="text-xs text-sand-400">{formatDate(post.publishedAt)}</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-brand-700 transition-colors leading-snug">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sand-600 text-sm leading-relaxed mb-5">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group-hover:gap-2.5"
            >
              Read article <ArrowRight className="w-3.5 h-3.5 transition-all" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
