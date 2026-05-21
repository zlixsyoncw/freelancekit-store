import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Star, CheckCircle, Shield, RefreshCw } from 'lucide-react'
import { PRODUCTS, getProduct } from '@/lib/products'
import GumroadButton from '@/components/GumroadButton'
import { SITE } from '@/lib/site'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.slug)
  if (!product) return {}

  return {
    title: `${product.name} — FreelanceKit`,
    description: product.description,
    alternates: { canonical: `${SITE.url}/shop/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
      url: `${SITE.url}/shop/${product.slug}`,
    },
  }
}

const categoryLabel: Record<string, string> = {
  notion: 'Notion Template',
  prompts: 'AI Prompt Pack',
  spreadsheets: 'Spreadsheet Template',
  bundle: 'Bundle',
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug)
  if (!product) notFound()

  const savings = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/shop/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* ── Left: Product details ───────────────────────────────────── */}
          <div>
            {/* Breadcrumb */}
            <nav className="text-xs text-sand-400 mb-6 flex items-center gap-2">
              <a href="/shop" className="hover:text-sand-600 transition-colors">Shop</a>
              <span>›</span>
              <span className="text-sand-600">{categoryLabel[product.category]}</span>
            </nav>

            {/* Badges */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="text-xs bg-brand-100 text-brand-700 font-semibold px-2.5 py-1 rounded-full">
                {categoryLabel[product.category]}
              </span>
              {product.badge && (
                <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-4 leading-tight">
              {product.name}
            </h1>

            <p className="text-sand-600 text-xl leading-relaxed mb-6">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-sand-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-sand-600 font-medium">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Long description */}
            <div
              className="prose mb-10"
              dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />

            {/* What's included */}
            <div className="bg-sand-50 rounded-2xl p-6 mb-10">
              <h2 className="font-display font-bold text-ink text-xl mb-4">
                Everything you get
              </h2>
              <ul className="space-y-3">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-sand-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials */}
            {product.testimonials.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-ink text-xl mb-6">
                  What customers say
                </h2>
                <div className="space-y-5">
                  {product.testimonials.map((t) => (
                    <blockquote
                      key={t.name}
                      className="border border-sand-200 rounded-xl p-6 bg-white"
                    >
                      <div className="flex mb-3">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-sand-700 text-sm leading-relaxed italic mb-4">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <footer className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-ink text-sm">{t.name}</div>
                          <div className="text-sand-400 text-xs">{t.role}</div>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Purchase card (sticky) ──────────────────────────── */}
          <div>
            <div className="sticky top-24 bg-white rounded-2xl border border-sand-200 p-7 shadow-xl shadow-sand-200/60">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-4xl font-bold text-ink">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-sand-400 line-through text-xl">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <span className="text-emerald-600 text-sm font-semibold">
                    You save {savings}%
                  </span>
                )}
                <p className="text-sand-400 text-xs mt-1">One-time payment. Instant access.</p>
              </div>

              {/* CTA */}
              <GumroadButton
                gumroadUrl={product.gumroadUrl}
                gumroadId={product.gumroadId}
                productName={product.name}
                price={product.price}
                className="w-full mb-4"
                size="lg"
              />

              {/* Guarantees */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-sand-600">
                  <Shield className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>30-day money-back guarantee, no questions</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-sand-600">
                  <RefreshCw className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>Free lifetime updates</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-sand-600">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Instant access after purchase</span>
                </div>
              </div>

              <div className="border-t border-sand-100 pt-4">
                <div className="text-xs text-sand-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Format</span>
                    <span className="font-medium text-sand-600">
                      {product.fileTypes.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-medium text-sand-600">{product.downloadSize}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-sand-400 mt-4">
                Secure checkout via{' '}
                <a
                  href="https://gumroad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-sand-600"
                >
                  Gumroad
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
