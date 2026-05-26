export const SITE = {
  name: 'FreelanceKit',
  tagline: 'The Complete Business OS for Freelancers',
  description:
    'Notion templates, AI prompt packs, and business tools that help independent freelancers and consultants run a professional, profitable business — without the overhead.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://freelancekit.co',
  twitter: '@freelancekit',
  email: 'hello@freelancekit.co',
  gumroadProfile: 'https://freelancekit.gumroad.com', // TODO: Replace with your Gumroad profile URL
  nav: [
    { label: 'Shop', href: '/shop' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
  ],
  footerLinks: {
    Products: [
      { label: 'Freelancer OS', href: '/shop/freelancer-os' },
      { label: 'Client Onboarding Bundle', href: '/shop/client-onboarding-bundle' },
      { label: 'AI Prompt Pack', href: '/shop/ai-prompt-pack' },
      { label: 'Complete Bundle', href: '/shop/complete-bundle' },
    ],
    Resources: [
      { label: 'Free Notion Template', href: '/free' },
      { label: 'Free Tools', href: '/tools' },
      { label: 'Rate Calculator', href: '/tools/rate-calculator' },
      { label: 'Email Scripts', href: '/tools/email-scripts' },
      { label: 'Contract Clauses', href: '/tools/contract-clauses' },
      { label: 'Invoice Template', href: '/tools/invoice-template' },
      { label: 'Notion Templates', href: '/notion-template' },
      { label: 'Compare', href: '/compare' },
      { label: 'Resources', href: '/resources' },
      { label: 'Affiliate Program', href: '/affiliate' },
      { label: 'Blog', href: '/blog' },
      { label: 'Wall of Love', href: '/wall-of-love' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/terms#refunds' },
    ],
  },
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
