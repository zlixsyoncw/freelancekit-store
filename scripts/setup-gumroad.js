#!/usr/bin/env node
/**
 * FreelanceKit — Gumroad Product URL Setup
 *
 * Run this once after creating your Gumroad products:
 *   node scripts/setup-gumroad.js
 *
 * It will prompt for each product URL and patch lib/products.ts automatically.
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise((resolve) => rl.question(q, resolve))

const PRODUCTS = [
  {
    key: 'freelancer-os',
    name: 'Freelancer OS',
    price: '$29',
    placeholder: 'https://freelancekit.gumroad.com/l/freelancer-os',
  },
  {
    key: 'client-onboarding-bundle',
    name: 'Client Onboarding Bundle',
    price: '$19',
    placeholder: 'https://freelancekit.gumroad.com/l/client-onboarding',
  },
  {
    key: 'ai-prompt-pack',
    name: 'AI Prompt Pack',
    price: '$17',
    placeholder: 'https://freelancekit.gumroad.com/l/ai-prompt-pack',
  },
  {
    key: 'complete-bundle',
    name: 'Complete Bundle',
    price: '$49',
    placeholder: 'https://freelancekit.gumroad.com/l/complete-bundle',
  },
]

async function main() {
  console.log('\n🎯 FreelanceKit — Gumroad Setup\n')
  console.log('For each product, paste the Gumroad product URL.')
  console.log('Format: https://yourname.gumroad.com/l/your-product-id\n')

  const productsFile = path.join(__dirname, '..', 'lib', 'products.ts')
  let content = fs.readFileSync(productsFile, 'utf8')

  const updates = []

  for (const product of PRODUCTS) {
    console.log(`\n📦 ${product.name} (${product.price})`)
    console.log(`   Example: ${product.placeholder}`)
    const url = await ask(`   Paste your Gumroad URL: `)

    if (!url || url.trim() === '') {
      console.log(`   ⏭  Skipping ${product.name}`)
      continue
    }

    const trimmedUrl = url.trim()

    // Extract the product ID from the URL (last segment after /l/)
    const idMatch = trimmedUrl.match(/\/l\/([^/?#]+)/)
    const productId = idMatch ? idMatch[1] : product.key

    // Replace the TODO placeholder for this product's slug
    // Look for the slug field and replace the gumroadUrl and gumroadId in that block
    const slugPattern = new RegExp(
      `(slug:\\s*'${product.key}'[^}]*?gumroadUrl:\\s*)'[^']*'(.*?gumroadId:\\s*)'[^']*'`,
      's'
    )
    const newContent = content.replace(slugPattern, `$1'${trimmedUrl}'$2'${productId}'`)

    if (newContent === content) {
      console.log(`   ⚠️  Could not find ${product.key} in products.ts — update manually`)
    } else {
      content = newContent
      updates.push({ name: product.name, url: trimmedUrl, id: productId })
      console.log(`   ✅ Updated ${product.name}`)
    }
  }

  if (updates.length > 0) {
    fs.writeFileSync(productsFile, content)
    console.log(`\n✅ Saved ${updates.length} product URL(s) to lib/products.ts`)
    console.log('\nUpdated products:')
    updates.forEach(({ name, url, id }) => {
      console.log(`  • ${name}: ${url} (ID: ${id})`)
    })
    console.log('\n🔄 Run `npm run build` to verify, then `git add lib/products.ts && git commit -m "Add Gumroad product URLs"` to save.')
  } else {
    console.log('\nNo updates made.')
  }

  rl.close()
}

main().catch((err) => {
  console.error('Error:', err)
  rl.close()
  process.exit(1)
})
