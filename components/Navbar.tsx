'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled ? 'nav-filled backdrop-blur-md' : 'nav-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center shrink-0 group-hover:bg-brand-600 transition-colors duration-300">
            <span
              className="font-display text-white text-xs font-semibold tracking-tight"
              style={{ fontVariationSettings: "'opsz' 9" }}
            >
              FK
            </span>
          </div>
          <span className="font-body font-semibold text-ink text-[0.9rem] tracking-tight leading-none">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {SITE.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.82rem] font-medium transition-colors duration-200 ${
                  active ? 'text-brand-600' : 'text-sand-700 hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/shop/complete-bundle"
            className="text-[0.82rem] font-semibold text-white bg-ink hover:bg-brand-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Get the Bundle →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-sand-700 hover:bg-sand-100 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-sand-200/60 bg-[#faf8f5]/98 backdrop-blur-md px-4 py-4 space-y-1">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-[0.88rem] font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-sand-700 hover:bg-sand-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Link
              href="/shop/complete-bundle"
              onClick={() => setOpen(false)}
              className="block w-full text-center text-[0.88rem] font-semibold text-white bg-ink hover:bg-brand-600 px-4 py-2.5 rounded-lg transition-colors"
            >
              Get the Bundle →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
