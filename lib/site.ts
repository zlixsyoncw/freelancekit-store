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
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ],
  footerLinks: {
    Products: [
      { label: 'Freelancer OS', href: '/shop/freelancer-os' },
      { label: 'Client Onboarding Bundle', href: '/shop/client-onboarding-bundle' },
      { label: 'AI Prompt Pack', href: '/shop/ai-prompt-pack' },
      { label: 'Complete Bundle', href: '/shop/complete-bundle' },
    ],
    Resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Affiliate Program', href: '/#affiliate' },
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
