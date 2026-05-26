import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Invoice Template Generator — Free | FreelanceKit',
  description:
    'Generate a professional freelance invoice in 60 seconds. Fill in your details, add line items, and copy the formatted invoice text. Free, no signup required.',
  alternates: { canonical: `${SITE.url}/tools/invoice-template` },
  openGraph: {
    title: 'Free Freelance Invoice Template Generator',
    description:
      'Build a professional invoice in 60 seconds. Free, no signup, no watermark.',
    url: `${SITE.url}/tools/invoice-template`,
  },
}

export default function InvoiceTemplateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
