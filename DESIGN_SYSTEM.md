# FreelanceKit Design System

> Machine-readable design context for Claude Design onboarding and Claude Code implementation.
> Source of truth: `design-tokens.json` | Tailwind config: `tailwind.config.ts`

## Product

**Name:** FreelanceKit  
**Tagline:** The Complete Business OS for Freelancers  
**Audience:** Independent freelancers and consultants  
**Goal:** Help them run a professional, profitable business without the overhead  
**Distribution:** Gumroad digital products (Notion templates, AI prompt packs, tools)

## Brand Style

**Aesthetic:** Warm minimalism — clean, premium, approachable  
**Mood:** Confident without being corporate. Professional without being cold.  
**Reference feel:** Linear meets Notion meets a high-end editorial blog  
**Color story:** Purple energy on a warm sand/cream canvas

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-600` | `#9333ea` | Primary actions, links, CTAs |
| `brand-500` | `#a855f7` | Accents, highlights |
| `brand-100` | `#f3e8ff` | Hover states, light badges |
| `ink` | `#1a1523` | All headings, primary text |
| `sand-800` | `#5a5249` | Body text, secondary copy |
| `sand-700` | `#7a6e61` | Muted/caption text |
| `sand-200` | `#ede8e0` | Borders, dividers |
| `sand-100` | `#f8f4ef` | Card backgrounds |
| `sand-50` | `#fdfcfb` | Page background |

**Never use:** Cold blues, pure greys, dark-mode-first designs, heavy drop shadows.

## Typography

| Role | Font | Weights |
|------|------|---------|
| Display / Headings | Bricolage Grotesque | 700, 800 |
| Subheadings / UI | Bricolage Grotesque | 500, 600 |
| Body / Labels | Inter | 400, 500, 600 |
| Code | Fira Code | 400 |

**Scale:** 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60px  
**Line height:** 1.5 body, 1.25 headings  
**Base:** 16px body, minimum

## Layout

- **Page background:** `#fdfcfb` (sand-50)
- **Max container:** `max-w-6xl` (1152px)
- **Section padding:** `py-20` (80px vertical)
- **Container padding:** `px-6` (24px horizontal)
- **Grid gap:** `gap-4` to `gap-8`
- **Card padding:** `p-6` (24px)
- **Border radius:** `rounded-lg` (8px) components, `rounded-xl` (12px) cards

## Components

### Button — Primary
```
bg: #9333ea  |  text: white  |  hover: #7e22ce
padding: 12px 24px  |  radius: 8px  |  font: Inter 600 14px
```

### Button — Secondary
```
bg: transparent  |  border: 1px solid #ddd5c8  |  text: #1a1523
hover bg: #f8f4ef
```

### Card
```
bg: #f8f4ef  |  border: 1px solid #ede8e0  |  radius: 12px
padding: 24px  |  shadow: 0 1px 2px rgb(0 0 0 / 0.05)
```

### Badge
```
default: bg #f3e8ff + text #6b21a8  (purple)
muted:   bg #ede8e0 + text #5a5249  (sand)
```

## Motion

- **Micro-interactions:** 150–300ms ease-out
- **Page entrances:** `fadeUp` (0.5s) or `fadeIn` (0.4s)
- **Stagger delays:** 100 / 200 / 300 / 400 / 500ms
- **Hover transitions:** `transition-colors duration-150`

## Page Structure (typical)

```
Navbar (sticky, bg sand-50/80 backdrop-blur)
  Hero
    Badge chip (brand-100 bg, brand-800 text)
    H1 — Bricolage Grotesque 700, ink
    Subtext — Inter 400, sand-800
    CTA button(s)
  Section (feature grid / product cards / testimonials)
  Section (pricing / CTA band)
Footer (sand-100 bg, sand-700 text)
```

## Anti-patterns

- No emoji as icons — use SVG (Heroicons or Lucide)
- No pure white background (use sand-50 `#fdfcfb`)
- No cold greys or blue-grey palettes
- No heavy box shadows
- No horizontal scroll
- No dark mode as default
- No compressed/tight layouts — use generous whitespace

## Integration: Claude Design ↔ Claude Code

### Connecting your codebase to Claude Design

During Claude Design onboarding at [claude.ai/design](https://claude.ai/design):
1. Link this repository
2. Claude Design reads `design-tokens.json` + `DESIGN_SYSTEM.md` + `tailwind.config.ts`
3. All generated designs will automatically use FreelanceKit brand

### Exporting from Claude Design → local component

1. In Claude Design, export as **Standalone HTML**
2. Drop the `.html` file into `design/exports/`
3. Run the converter:
   ```bash
   node scripts/design-to-component.mjs design/exports/your-file.html ComponentName
   ```
4. Converted `.tsx` appears in `components/` ready to use

### Handoff bundle → Claude Code

When Claude Design packages a handoff bundle:
1. Drop the bundle folder into `design/handoffs/`
2. Tell Claude Code: *"Implement the design in design/handoffs/[name]/ using our Tailwind tokens"*
3. Claude Code reads the bundle + `design-tokens.json` and implements it natively
