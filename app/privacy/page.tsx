import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/privacy` },
}

export default function PrivacyPage() {
  const updated = 'May 21, 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold text-ink mb-2">Privacy Policy</h1>
      <p className="text-sand-400 text-sm mb-12">Last updated: {updated}</p>

      <div className="prose space-y-8">
        <section>
          <h2>1. Who we are</h2>
          <p>
            {SITE.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website at{' '}
            <a href={SITE.url}>{SITE.url}</a>. This Privacy Policy explains how we collect, use, and
            protect information when you use our site and purchase our digital products.
          </p>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <p>
            <strong>Email address</strong> — if you subscribe to our newsletter or email list, we
            collect your email address. This is used only to send the content you opted in for.
          </p>
          <p>
            <strong>Purchase information</strong> — when you purchase a product, the transaction is
            processed by Gumroad. We receive your email address and purchase confirmation. We do not
            store payment card data. Gumroad&apos;s privacy policy governs payment processing.
          </p>
          <p>
            <strong>Analytics</strong> — we use Plausible Analytics, a privacy-first analytics
            service that does not use cookies, does not track individuals across sites, and does not
            collect personal data. Plausible aggregates page view data only.
          </p>
        </section>

        <section>
          <h2>3. How we use your information</h2>
          <ul>
            <li>To send you products and access links after purchase</li>
            <li>To send newsletter content if you subscribed</li>
            <li>To improve our website and products using aggregated analytics</li>
            <li>To respond to your support requests</li>
          </ul>
          <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2>4. Email communications</h2>
          <p>
            If you subscribe to our newsletter, you can unsubscribe at any time by clicking the
            unsubscribe link in any email we send, or by emailing us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will remove you from our list
            within 5 business days.
          </p>
        </section>

        <section>
          <h2>5. Third-party services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Gumroad</strong> — payment processing and digital product delivery</li>
            <li><strong>Plausible Analytics</strong> — privacy-friendly website analytics</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
          </ul>
          <p>Each of these services has its own privacy policy governing their data practices.</p>
        </section>

        <section>
          <h2>6. Data retention</h2>
          <p>
            We retain your email address for as long as you remain subscribed to our newsletter. If
            you unsubscribe, we will delete your email within 30 days. Purchase records are retained
            by Gumroad per their retention policy.
          </p>
        </section>

        <section>
          <h2>7. Your rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or port your
            personal data. To exercise these rights, email us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>
            Our website does not use tracking cookies. Plausible Analytics, our analytics provider,
            is cookieless by design. Gumroad may set cookies on their hosted checkout pages, governed
            by their policy.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            Questions about this Privacy Policy? Email{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
