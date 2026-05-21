'use client'

import { ShoppingCart } from 'lucide-react'

interface GumroadButtonProps {
  gumroadUrl: string
  gumroadId: string
  productName: string
  price: number
  className?: string
  size?: 'md' | 'lg'
}

export default function GumroadButton({
  gumroadUrl,
  gumroadId,
  productName,
  price,
  className = '',
  size = 'lg',
}: GumroadButtonProps) {
  function handleClick() {
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('purchase-click', {
        props: { product: productName, price },
      })
    }

    // Open Gumroad overlay if the script is loaded, otherwise navigate directly
    // Gumroad's embed script adds a global `GumroadOverlay` and detects .gumroad-button class
    // For the overlay to work, include the Gumroad embed script in layout.tsx
    // If the overlay isn't available, fall back to direct navigation
    if (typeof window !== 'undefined' && (window as any).GumroadOverlay) {
      ;(window as any).GumroadOverlay.show(gumroadUrl)
    } else {
      window.open(gumroadUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const sizeClasses =
    size === 'lg'
      ? 'px-8 py-4 text-base rounded-xl'
      : 'px-5 py-2.5 text-sm rounded-lg'

  return (
    <button
      onClick={handleClick}
      className={`gumroad-button inline-flex items-center justify-center gap-2 font-semibold bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white transition-all duration-150 ${sizeClasses} ${className}`}
      data-gumroad-product-id={gumroadId}
      aria-label={`Buy ${productName} for $${price}`}
    >
      <ShoppingCart className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      Get Instant Access — ${price}
    </button>
  )
}
