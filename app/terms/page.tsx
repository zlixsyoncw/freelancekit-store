import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${SITE.name} digital products.`,
  alternates: { canonical: `${SITE.url}/terms` },
}

export default function TermsPage() {
  const updated = 'May 21, 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl font-extrabold text-ink mb-2">Terms of Service</h1>
      <p className="text-sand-400 text-sm mb-12">Last updated: {updated}</p>

      <div className="prose space-y-8">
        <section>
          <h2>1. Agreement</h2>
          <p>
            By accessing or purchasing from {SITE.name} (&ldquo;we,&rdquo; &ldquo;our&rdquo;), you agree to
            these Terms. If you do not agree, do not use this site or purchase our products.
          </p>
        </section>

        <section>
          <h2>2. Digital Products</h2>
          <p>
            {SITE.name} sells digital products including Notion templates, AI prompt packs, and
            related digital resources. Upon purchase, you receive a non-exclusive, non-transferable
            license to use the product for your own personal and commercial freelance business
            activities.
          </p>
        </section>

        <section>
          <h2>3. License &amp; Restrictions</h2>
          <p>You may:</p>
          <ul>
            <li>Use our templates and prompts in your own freelance business</li>
            <li>Modify templates for your personal use</li>
            <li>Use AI-generated outputs from our prompt packs in your client deliverables</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Resell, redistribute, or share our products with others</li>
            <li>Claim our products as your own original work</li>
            <li>Include our templates in any competing product or template bundle</li>
            <li>Share your purchase link or access with anyone who has not paid</li>
          </ul>
        </section>

        <section id="refunds">
          <h2>4. Refund Policy</h2>
          <p>
            We offer a 30-day money-back guarantee on all products. If you are not satisfied with
            your purchase for any reason within 30 days of the purchase date, email us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your order confirmation and we
            will issue a full refund promptly. No questions asked, no forms required.
          </p>
          <p>
            After 30 days, refunds are not available. Because our products are digital goods
            delivered immediately, we cannot issue refunds for reasons of not &ldquo;needing&rdquo; the product
            anymore after the guarantee period.
          </p>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            All content on {SITE.name}, including product descriptions, blog posts, designs, and
            product files, is owned by or licensed to {SITE.name} and is protected by copyright.
            You may not reproduce, copy, or adapt any part of our site or products without written
            permission.
          </p>
        </section>

        <section>
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            Our products are provided &ldquo;as is.&rdquo; We make no guarantees about specific business
            results, income levels, or client outcomes that may result from using our templates or
            prompts. Results vary based on individual effort, niche, and market conditions.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE.name} shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of our products or
            services. Our total liability for any claim is limited to the amount you paid for the
            relevant product.
          </p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which {SITE.name} operates.
            Any disputes shall be resolved through good-faith negotiation before any legal action.
          </p>
        </section>

        <section>
          <h2>9. Changes to These Terms</h2>
          <p>
            We may update these Terms. Material changes will be communicated to newsletter
            subscribers. Continued use of the site after changes constitutes acceptance of the new
            Terms.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Questions? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </section>
      </div>
    </div>
  )
}
