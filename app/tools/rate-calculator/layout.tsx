import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator — Free Hourly Rate Tool',
  description:
    'Calculate your minimum, recommended, and premium freelance hourly rates based on your income goal, hours, taxes, and overhead. Free, no signup required.',
  alternates: { canonical: `${SITE.url}/tools/rate-calculator` },
  openGraph: {
    title: 'Freelance Rate Calculator',
    description: 'Find your ideal hourly rate in 30 seconds. Free tool for freelancers.',
    url: `${SITE.url}/tools/rate-calculator`,
  },
}

export default function RateCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
