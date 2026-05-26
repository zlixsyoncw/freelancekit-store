import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Email Scripts — 25 Copy-Paste Email Templates',
  description:
    '25 copy-paste email templates for freelancers: proposals, follow-ups, late payment requests, scope creep, client wrap-ups, and more. Free, no signup.',
  alternates: { canonical: `${SITE.url}/tools/email-scripts` },
  openGraph: {
    title: 'Freelance Email Scripts — FreelanceKit',
    description: '25 ready-to-use email templates for every freelance situation. Click to copy.',
    url: `${SITE.url}/tools/email-scripts`,
  },
}

export default function EmailScriptsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
