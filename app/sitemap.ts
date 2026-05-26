import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog'
import { PRODUCTS } from '@/lib/products'
import { SITE } from '@/lib/site'

const NICHES = [
  'designers', 'developers', 'copywriters', 'consultants', 'photographers',
  'coaches', 'marketers', 'virtual-assistants', 'writers', 'social-media-managers',
  'video-editors', 'accountants', 'translators', 'ux-researchers', 'project-managers',
  'bookkeepers', 'seo-consultants', 'wedding-planners',
]

const NOTION_PROFESSIONS = [
  'freelance-designers', 'freelance-developers', 'freelance-copywriters',
  'freelance-consultants', 'freelance-photographers', 'freelance-coaches',
  'freelance-marketers', 'freelance-writers', 'freelance-video-editors',
  'freelance-project-managers', 'virtual-assistants', 'social-media-managers',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE.url}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/tools/rate-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/tools/project-estimator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/tools/email-scripts`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/tools/contract-clauses`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/tools/invoice-template`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/tools/proposal-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/notion-template`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/free`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/affiliate`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/wall-of-love`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE.url}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const nichePages: MetadataRoute.Sitemap = NICHES.map((niche) => ({
    url: `${SITE.url}/for/${niche}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const notionProfessionPages: MetadataRoute.Sitemap = NOTION_PROFESSIONS.map((prof) => ({
    url: `${SITE.url}/notion-template/${prof}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...productPages, ...blogPages, ...nichePages, ...notionProfessionPages]
}
