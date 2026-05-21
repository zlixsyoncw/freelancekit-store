import type { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/products'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Shop — Notion Templates & AI Prompts for Freelancers',
  description:
    'Buy once, own forever. Notion templates and AI prompt packs that help freelancers run a professional, profitable business.',
  alternates: { canonical: `${SITE.url}/shop` },
}

export default function ShopPage() {
  const bundles = PRODUCTS.filter((p) => p.category === 'bundle')
  const nonBundles = PRODUCTS.filter((p) => p.category !== 'bundle')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-3">
          All Products
        </h1>
        <p className="text-sand-500 text-xl max-w-xl">
          One-time purchases. Instant Notion and file access. No subscriptions.
        </p>
      </div>

      {/* Bundles */}
      {bundles.length > 0 && (
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-ink mb-6">
            🎁 Bundles — Best Value
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bundles.map((product) => (
              <ProductCard key={product.id} product={product} layout="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Individual products */}
      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-6">
          Individual Products
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonBundles.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Guarantee note */}
      <div className="mt-16 bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="text-3xl mb-3">🛡️</div>
        <h3 className="font-display font-bold text-ink text-xl mb-2">
          30-Day Money-Back Guarantee
        </h3>
        <p className="text-sand-600 text-sm max-w-sm mx-auto">
          If you don&apos;t find value in your first 30 days, email us for a full refund. No forms, no questions.
        </p>
      </div>
    </div>
  )
}
