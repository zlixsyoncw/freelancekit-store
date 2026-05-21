export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  price: number
  compareAtPrice?: number
  badge?: string
  gumroadUrl: string       // TODO: Replace with your Gumroad product URL
  gumroadId: string        // TODO: Replace with your Gumroad product ID (for overlay embed)
  category: 'notion' | 'prompts' | 'spreadsheets' | 'bundle'
  includes: string[]
  previewImages: string[]  // paths inside /public/products/
  fileTypes: string[]
  downloadSize: string
  featured: boolean
  bestseller: boolean
  new: boolean
  rating: number
  reviewCount: number
  testimonials: Testimonial[]
}

export interface Testimonial {
  name: string
  role: string
  avatar?: string
  text: string
  rating: number
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string          // HTML string
  publishedAt: string      // ISO date
  readingMinutes: number
  category: string
  tags: string[]
  coverImage?: string
  metaTitle?: string
  metaDescription?: string
}

export interface CartItem {
  productId: string
  gumroadUrl: string
}
