#!/usr/bin/env node
/**
 * Claude Design → Next.js Component Converter
 *
 * Usage:
 *   node scripts/design-to-component.mjs design/exports/hero.html HeroSection
 *   node scripts/design-to-component.mjs design/exports/pricing.html PricingCard --dir app/pricing
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ─── CLI args ────────────────────────────────────────────────────────────────
const [,, inputPath, componentName, ...flags] = process.argv
const dirFlag = flags.indexOf('--dir')
const outputDir = dirFlag !== -1 ? flags[dirFlag + 1] : 'components'

if (!inputPath || !componentName) {
  console.error('Usage: node scripts/design-to-component.mjs <input.html> <ComponentName> [--dir components]')
  process.exit(1)
}

// ─── Load design tokens for inline→Tailwind mapping ──────────────────────────
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'design-tokens.json'), 'utf8'))

// Map of hex values → Tailwind class suffixes
const COLOR_MAP = buildColorMap(tokens)

function buildColorMap(t) {
  const map = {}
  const addColor = (hex, tailwindName) => { map[hex.toLowerCase()] = tailwindName }

  Object.entries(t.color.brand).forEach(([k, v]) => addColor(v.value, `brand-${k}`))
  Object.entries(t.color.sand).forEach(([k, v]) => addColor(v.value, `sand-${k}`))
  addColor(t.color.ink.value, 'ink')
  // semantic aliases
  addColor('#ffffff', 'white')
  addColor('#000000', 'black')
  addColor('transparent', 'transparent')

  return map
}

// ─── Style → Tailwind mappings ────────────────────────────────────────────────
const FONT_SIZE_MAP = {
  '12px': 'text-xs', '14px': 'text-sm', '16px': 'text-base',
  '18px': 'text-lg', '20px': 'text-xl', '24px': 'text-2xl',
  '30px': 'text-3xl', '36px': 'text-4xl', '48px': 'text-5xl', '60px': 'text-6xl',
  '0.75rem': 'text-xs', '0.875rem': 'text-sm', '1rem': 'text-base',
  '1.125rem': 'text-lg', '1.25rem': 'text-xl', '1.5rem': 'text-2xl',
}

const FONT_WEIGHT_MAP = {
  '400': 'font-normal', '500': 'font-medium',
  '600': 'font-semibold', '700': 'font-bold', '800': 'font-extrabold',
}

const BORDER_RADIUS_MAP = {
  '2px': 'rounded-sm', '4px': 'rounded', '6px': 'rounded-md',
  '8px': 'rounded-lg', '12px': 'rounded-xl', '16px': 'rounded-2xl',
  '9999px': 'rounded-full', '50%': 'rounded-full',
}

const SPACING_MAP = {
  '4px': '1', '8px': '2', '12px': '3', '16px': '4', '20px': '5',
  '24px': '6', '32px': '8', '40px': '10', '48px': '12',
  '64px': '16', '80px': '20', '96px': '24',
}

function hexToTailwind(hex, property) {
  const clean = hex.toLowerCase().trim()
  const token = COLOR_MAP[clean]
  if (!token) return null

  if (token === 'white') {
    if (property === 'bg') return 'bg-white'
    if (property === 'text') return 'text-white'
    if (property === 'border') return 'border-white'
  }
  if (token === 'ink') {
    if (property === 'bg') return 'bg-ink'
    if (property === 'text') return 'text-ink'
  }

  if (property === 'bg') return `bg-${token}`
  if (property === 'text') return `text-${token}`
  if (property === 'border') return `border-${token}`
  return null
}

function spacingToTailwind(value, prefix) {
  const mapped = SPACING_MAP[value]
  if (mapped) return `${prefix}-${mapped}`
  // try rem conversion
  if (value.endsWith('rem')) {
    const px = Math.round(parseFloat(value) * 16)
    const mapped2 = SPACING_MAP[`${px}px`]
    if (mapped2) return `${prefix}-${mapped2}`
  }
  return null
}

// ─── Parse inline style string → Tailwind classes ─────────────────────────────
function styleToTailwind(styleStr) {
  if (!styleStr) return ''
  const classes = []
  const rules = styleStr.split(';').map(r => r.trim()).filter(Boolean)

  for (const rule of rules) {
    const colonIdx = rule.indexOf(':')
    if (colonIdx === -1) continue
    const prop = rule.slice(0, colonIdx).trim().toLowerCase()
    const val  = rule.slice(colonIdx + 1).trim()

    switch (prop) {
      case 'background-color':
      case 'background': {
        if (val.startsWith('#')) {
          const cls = hexToTailwind(val, 'bg')
          if (cls) classes.push(cls)
        }
        break
      }
      case 'color': {
        if (val.startsWith('#')) {
          const cls = hexToTailwind(val, 'text')
          if (cls) classes.push(cls)
        }
        break
      }
      case 'font-size': {
        const cls = FONT_SIZE_MAP[val]
        if (cls) classes.push(cls)
        break
      }
      case 'font-weight': {
        const cls = FONT_WEIGHT_MAP[val]
        if (cls) classes.push(cls)
        break
      }
      case 'font-family': {
        if (val.includes('Bricolage')) classes.push('font-display')
        else if (val.includes('Inter')) classes.push('font-body')
        else if (val.includes('Fira') || val.includes('mono')) classes.push('font-mono')
        break
      }
      case 'border-radius': {
        const cls = BORDER_RADIUS_MAP[val]
        if (cls) classes.push(cls)
        break
      }
      case 'padding': {
        const parts = val.split(' ')
        if (parts.length === 1) {
          const cls = spacingToTailwind(parts[0], 'p')
          if (cls) classes.push(cls)
        } else if (parts.length === 2) {
          const y = spacingToTailwind(parts[0], 'py')
          const x = spacingToTailwind(parts[1], 'px')
          if (y) classes.push(y)
          if (x) classes.push(x)
        }
        break
      }
      case 'padding-top':    { const c = spacingToTailwind(val, 'pt'); if (c) classes.push(c); break }
      case 'padding-bottom': { const c = spacingToTailwind(val, 'pb'); if (c) classes.push(c); break }
      case 'padding-left':   { const c = spacingToTailwind(val, 'pl'); if (c) classes.push(c); break }
      case 'padding-right':  { const c = spacingToTailwind(val, 'pr'); if (c) classes.push(c); break }
      case 'margin': {
        const parts = val.split(' ')
        if (parts.length === 1) {
          if (val === 'auto') classes.push('m-auto')
          else { const c = spacingToTailwind(val, 'm'); if (c) classes.push(c) }
        } else if (parts.length === 2) {
          const y = spacingToTailwind(parts[0], 'my')
          const x = parts[1] === 'auto' ? 'mx-auto' : spacingToTailwind(parts[1], 'mx')
          if (y) classes.push(y)
          if (x) classes.push(x)
        }
        break
      }
      case 'margin-top':    { const c = spacingToTailwind(val, 'mt'); if (c) classes.push(c); break }
      case 'margin-bottom': { const c = spacingToTailwind(val, 'mb'); if (c) classes.push(c); break }
      case 'display': {
        if (val === 'flex') classes.push('flex')
        else if (val === 'grid') classes.push('grid')
        else if (val === 'block') classes.push('block')
        else if (val === 'inline-flex') classes.push('inline-flex')
        break
      }
      case 'flex-direction': {
        if (val === 'column') classes.push('flex-col')
        else if (val === 'row') classes.push('flex-row')
        break
      }
      case 'align-items': {
        if (val === 'center') classes.push('items-center')
        else if (val === 'flex-start') classes.push('items-start')
        else if (val === 'flex-end') classes.push('items-end')
        break
      }
      case 'justify-content': {
        if (val === 'center') classes.push('justify-center')
        else if (val === 'space-between') classes.push('justify-between')
        else if (val === 'flex-start') classes.push('justify-start')
        else if (val === 'flex-end') classes.push('justify-end')
        break
      }
      case 'text-align': {
        if (val === 'center') classes.push('text-center')
        else if (val === 'left') classes.push('text-left')
        else if (val === 'right') classes.push('text-right')
        break
      }
      case 'width': {
        if (val === '100%') classes.push('w-full')
        else if (val === 'auto') classes.push('w-auto')
        break
      }
      case 'max-width': {
        if (val === '1152px' || val === '72rem') classes.push('max-w-6xl')
        else if (val === '1280px' || val === '80rem') classes.push('max-w-7xl')
        else if (val === '768px')  classes.push('max-w-3xl')
        else if (val === '1024px') classes.push('max-w-5xl')
        break
      }
      case 'gap': {
        const c = spacingToTailwind(val, 'gap')
        if (c) classes.push(c)
        break
      }
      case 'border': {
        if (val.includes('#')) {
          const hexMatch = val.match(/#[0-9a-fA-F]{3,6}/)
          if (hexMatch) {
            const cls = hexToTailwind(hexMatch[0], 'border')
            if (cls) { classes.push('border', cls) }
          } else {
            classes.push('border')
          }
        }
        break
      }
      case 'opacity': {
        const pct = Math.round(parseFloat(val) * 100)
        classes.push(`opacity-${pct}`)
        break
      }
      case 'cursor': {
        if (val === 'pointer') classes.push('cursor-pointer')
        break
      }
      case 'overflow': {
        if (val === 'hidden') classes.push('overflow-hidden')
        break
      }
      case 'position': {
        if (val === 'relative') classes.push('relative')
        else if (val === 'absolute') classes.push('absolute')
        else if (val === 'fixed') classes.push('fixed')
        else if (val === 'sticky') classes.push('sticky')
        break
      }
    }
  }

  return classes.join(' ')
}

// ─── HTML → TSX transformer ───────────────────────────────────────────────────
function transformHtml(html) {
  // Extract body content from full HTML doc
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  let content = bodyMatch ? bodyMatch[1] : html

  // Strip Claude Design wrapper divs (common outer shells)
  content = content
    .replace(/<div[^>]*class="[^"]*cd-canvas[^"]*"[^>]*>/gi, '')
    .replace(/<div[^>]*id="canvas"[^>]*>/gi, '')

  // Convert style="" → className=""
  content = content.replace(/\sstyle="([^"]*)"/g, (match, styleStr) => {
    const tailwind = styleToTailwind(styleStr)
    if (!tailwind) return ''
    return ` className="${tailwind}"`
  })

  // HTML → JSX attribute renames
  content = content
    .replace(/\sclass="/g, ' className="')
    .replace(/\sfor="/g, ' htmlFor="')
    .replace(/<br>/gi, '<br />')
    .replace(/<hr([^>]*)>/gi, '<hr$1 />')
    .replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')
    .replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />')

  // Self-close known void elements
  content = content.replace(/<(meta|link|area|base|col|embed|param|source|track|wbr)([^>]*?)(?<!\/)>/gi, '<$1$2 />')

  // Strip inline <script> and <style> blocks
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '')
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '')

  // Fix event handlers: onclick → onClick, onchange → onChange, etc.
  content = content.replace(/\son([a-z]+)="/g, (_, ev) => ` on${ev[0].toUpperCase()}${ev.slice(1)}="`)

  return content.trim()
}

// ─── Generate TSX component ───────────────────────────────────────────────────
function generateComponent(name, jsxContent) {
  return `import type { FC } from 'react'

interface ${name}Props {
  className?: string
}

const ${name}: FC<${name}Props> = ({ className }) => {
  return (
    <div className={className}>
${jsxContent.split('\n').map(l => `      ${l}`).join('\n')}
    </div>
  )
}

export default ${name}
`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const absInput = path.resolve(ROOT, inputPath)
if (!fs.existsSync(absInput)) {
  console.error(`File not found: ${absInput}`)
  process.exit(1)
}

const html = fs.readFileSync(absInput, 'utf8')
const jsx  = transformHtml(html)
const tsxContent = generateComponent(componentName, jsx)

const outDir = path.resolve(ROOT, outputDir)
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, `${componentName}.tsx`)
fs.writeFileSync(outPath, tsxContent)

console.log(`✓ Converted: ${inputPath}`)
console.log(`✓ Component: ${outPath}`)
console.log(`\nImport with:`)
console.log(`  import ${componentName} from '@/${outputDir}/${componentName}'`)
