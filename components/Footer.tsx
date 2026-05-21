import Link from 'next/link'
import { Package, Twitter, Mail } from 'lucide-react'
import { SITE } from '@/lib/site'
import EmailCapture from './EmailCapture'

export default function Footer() {
  return (
    <footer className="bg-ink text-sand-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Email signup strip */}
        <div className="mb-16 pb-16 border-b border-white/10">
          <div className="max-w-xl">
            <h3 className="font-display text-white text-2xl font-bold mb-2">
              Get freelance business tips weekly.
            </h3>
            <p className="text-sand-400 mb-6 text-sm">
              No fluff. Actionable advice on pricing, clients, systems, and growth. Unsubscribe any time.
            </p>
            <EmailCapture variant="dark" />
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">{SITE.name}</span>
            </Link>
            <p className="text-sand-500 text-sm leading-relaxed mb-4">
              Business tools for independent freelancers who want to run a professional, profitable practice.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/${SITE.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sand-500 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(SITE.footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sand-500 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sand-600">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Payments processed securely by{' '}
            <a
              href="https://gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sand-400 transition-colors"
            >
              Gumroad
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
