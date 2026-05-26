import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Proposal Generator — Free | FreelanceKit',
  description:
    'Generate a professional freelance proposal in minutes. Fill in your project details and get a copy-paste proposal you can send today. Free, no signup required.',
  alternates: { canonical: `${SITE.url}/tools/proposal-generator` },
  openGraph: {
    title: 'Free Freelance Proposal Generator',
    description:
      'Build a professional project proposal in minutes. Free, no signup, instant copy.',
    url: `${SITE.url}/tools/proposal-generator`,
  },
}

export default function ProposalGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
