# Design Drop Zone

This folder is the bridge between **Claude Design** (claude.ai/design) and **Claude Code**.

## Folder Structure

```
design/
├── exports/      ← Drop Claude Design HTML exports here
├── handoffs/     ← Drop Claude Design handoff bundles here
└── references/   ← Reference screenshots, inspiration, wireframes
```

## Workflow

### 1. Create in Claude Design

Go to [claude.ai/design](https://claude.ai/design) and create your design.
Claude Design reads this repo's brand automatically via `design-tokens.json`.

### 2. Export

In Claude Design, click **Export → Standalone HTML** and save to `design/exports/`.
For full handoff bundles, save the folder to `design/handoffs/`.

### 3. Convert to Component

```bash
# Single HTML export → TSX component
node scripts/design-to-component.mjs design/exports/hero.html HeroSection

# Output: components/HeroSection.tsx
```

### 4. Handoff Bundle → Claude Code

For handoff bundles, tell Claude Code:
> "Implement the design in design/handoffs/[folder-name]/ using our Tailwind tokens from design-tokens.json"

Claude Code will read both the bundle and the tokens and implement natively in Next.js + Tailwind.

## Tips

- Name your exports descriptively: `pricing-hero.html`, `feature-grid.html`
- The converter strips Claude Design's wrapper and maps inline styles → Tailwind classes
- Always review converted TSX — the converter handles ~80% automatically
- For complex animations, keep the original HTML as reference in `references/`
