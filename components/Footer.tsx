import Link from 'next/link'
import { Twitter, Mail } from 'lucide-react'
import { SITE } from '@/lib/site'
import EmailCapture from './EmailCapture'

export default function Footer() {
  return (
    <footer className="bg-ink text-sand-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        {/* Email signup strip */}
        <div className="mb-16 pb-16 border-b border-white/[0.08]">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-400 mb-4 font-body">
              Stay in the loop
            </p>
            <h3
              className="font-display text-white text-3xl font-medium mb-2 leading-snug"
              style={{ fontVariationSettings: "'opsz' 72" }}
            >
              Get freelance business tips{' '}
              <span className="italic text-sand-400">weekly.</span>
            </h3>
            <p className="text-sand-500 mb-6 text-sm font-body">
              No fluff. Actionable advice on pricing, clients, systems, and growth.
            </p>
            <EmailCapture variant="dark" />
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span
                  className="font-display text-white text-xs font-semibold"
                  style={{ fontVariationSettings: "'opsz' 9" }}
                >
                  FK
                </span>
              </div>
              <span className="font-body font-semibold text-white text-sm">{SITE.name}</span>
            </Link>
            <p className="text-sand-500 text-sm leading-relaxed mb-5 font-body">
              Business tools for independent freelancers who want to run a professional, profitable practice.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/${SITE.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-600 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sand-600 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(SITE.footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white text-[0.68rem] font-semibold uppercase tracking-[0.18em] mb-4 font-body">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sand-500 hover:text-sand-200 text-sm transition-colors font-body"
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
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sand-700 font-body">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Payments processed securely by{' '}
            <a
              href="https://gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sand-500 transition-colors"
            >
              Gumroad
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
