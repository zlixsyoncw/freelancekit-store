import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Project Price Estimator — Free Quoting Tool',
  description:
    'Estimate the right price for any freelance project. Enter your hourly rate and project scope — get a quote range, deposit amount, and payment schedule instantly. Free, no signup.',
  alternates: { canonical: `${SITE.url}/tools/project-estimator` },
  openGraph: {
    title: 'Freelance Project Price Estimator',
    description: 'Quote any freelance project in 30 seconds. Free tool — no signup required.',
    url: `${SITE.url}/tools/project-estimator`,
  },
}

export default function ProjectEstimatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
