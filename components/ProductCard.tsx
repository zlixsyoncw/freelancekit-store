import Link from 'next/link'
import { Star, ArrowRight, Zap } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'featured'
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const savings = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  if (layout === 'featured') {
    return (
      <div className="relative bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative">
          {product.badge && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full mb-4">
              <Zap className="w-3 h-3" />
              {product.badge}
            </span>
          )}
          <h3 className="font-display text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-brand-200 text-sm mb-6 leading-relaxed">{product.tagline}</p>

          <ul className="space-y-2 mb-8">
            {product.includes.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-100">
                <span className="mt-0.5 text-amber-400">✓</span>
                {item}
              </li>
            ))}
            {product.includes.length > 4 && (
              <li className="text-sm text-brand-300">
                + {product.includes.length - 4} more...
              </li>
            )}
          </ul>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-brand-300 line-through text-lg">${product.compareAtPrice}</span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-amber-400 text-xs font-semibold">Save {savings}%</span>
              )}
            </div>
            <Link
              href={`/shop/${product.slug}`}
              className="flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Get Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl border border-sand-200 overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all duration-200">
      {/* Card header / preview area */}
      <div className="h-40 bg-gradient-to-br from-sand-50 to-brand-50 relative flex items-center justify-center">
        {product.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
            {product.badge === 'Bestseller' && <Star className="w-3 h-3 fill-amber-500 text-amber-500" />}
            {product.badge === 'New' && <Zap className="w-3 h-3" />}
            {product.badge}
          </span>
        )}
        <div className="text-5xl opacity-20 select-none">
          {product.category === 'notion' ? '📋' : product.category === 'prompts' ? '⚡' : product.category === 'bundle' ? '📦' : '📊'}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-ink text-lg leading-snug">{product.name}</h3>
        </div>
        <p className="text-sand-600 text-sm mb-4 leading-relaxed line-clamp-2">{product.tagline}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-sand-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-sand-500">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-ink">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-sand-400 line-through text-sm">${product.compareAtPrice}</span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-emerald-600 text-xs font-semibold">Save {savings}%</span>
            )}
          </div>
          <Link
            href={`/shop/${product.slug}`}
            className="group/btn flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            View
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
