import Link from 'next/link'
import { Star, ArrowRight, Zap } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'featured'
}

const categoryStyles: Record<string, { from: string; to: string; accent: string }> = {
  notion:    { from: '#7e22ce', to: '#4f46e5', accent: '#c084fc' },
  prompts:   { from: '#d97706', to: '#b45309', accent: '#fbbf24' },
  bundle:    { from: '#7e22ce', to: '#d97706', accent: '#f59e0b' },
  templates: { from: '#0d9488', to: '#0369a1', accent: '#34d399' },
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const savings = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0
  const style = categoryStyles[product.category] ?? categoryStyles.notion

  if (layout === 'featured') {
    return (
      <div
        className="relative rounded-2xl p-8 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${style.from}, ${style.to})` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white" />
        </div>
        <div className="relative">
          {product.badge && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/20 text-white border border-white/20 px-2.5 py-1 rounded-full mb-4">
              <Zap className="w-3 h-3" />
              {product.badge}
            </span>
          )}
          <h3
            className="font-display text-2xl font-semibold mb-2"
            style={{ fontVariationSettings: "'opsz' 48" }}
          >
            {product.name}
          </h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed">{product.tagline}</p>
          <ul className="space-y-2 mb-8">
            {product.includes.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-0.5 shrink-0" style={{ color: style.accent }}>✓</span>
                {item}
              </li>
            ))}
            {product.includes.length > 4 && (
              <li className="text-sm text-white/50">
                + {product.includes.length - 4} more included
              </li>
            )}
          </ul>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-white/40 line-through text-lg">${product.compareAtPrice}</span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-xs font-semibold" style={{ color: style.accent }}>
                  Save {savings}%
                </span>
              )}
            </div>
            <Link
              href={`/shop/${product.slug}`}
              className="flex items-center gap-2 bg-white hover:bg-white/90 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              style={{ color: style.from }}
            >
              Get Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl border border-sand-200 overflow-hidden hover:border-sand-300 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300">
      {/* Card thumbnail */}
      <div
        className="h-44 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${style.from}, ${style.to})` }}
      >
        {/* Abstract decorative shapes */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white" />
          <div className="absolute -bottom-6 right-1/3 w-32 h-32 rounded-full bg-white" />
        </div>
        {/* Diagonal accent line */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 24px,
              rgba(255,255,255,0.3) 24px,
              rgba(255,255,255,0.3) 25px
            )`,
          }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-semibold bg-white/20 text-white border border-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {product.badge === 'Bestseller' && <Star className="w-3 h-3 fill-white" />}
            {product.badge === 'New' && <Zap className="w-3 h-3" />}
            {product.badge}
          </span>
        )}
        {/* Price pill */}
        <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          ${product.price}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3
          className="font-display font-semibold text-ink text-lg leading-snug mb-1.5"
          style={{ fontVariationSettings: "'opsz' 36" }}
        >
          {product.name}
        </h3>
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
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/shop/${product.slug}`}
          className="group/btn flex items-center justify-between w-full bg-sand-50 hover:bg-ink text-ink hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
        >
          <span>View details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
