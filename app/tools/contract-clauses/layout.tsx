import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Contract Clauses Library — Free Copy-Paste Templates',
  description:
    '20+ freelance contract clauses covering payment, scope, IP, termination, and legal protection. Copy any clause directly into your contracts. Free, no signup.',
  alternates: { canonical: `${SITE.url}/tools/contract-clauses` },
  openGraph: {
    title: 'Freelance Contract Clauses Library — FreelanceKit',
    description: '20+ ready-to-use contract clauses for freelancers. Copy and paste into your contracts.',
    url: `${SITE.url}/tools/contract-clauses`,
  },
}

export default function ContractClausesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
