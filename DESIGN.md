# Design Brief

## Direction

**Chandu Jobs & Products** — Professional dual-marketplace platform combining IT & non-IT jobs with product listings. Clean, editorial, and trustworthy.

## Tone

Modern editorial with marketplace authority. Inspired by Vercel & Linear — minimal decoration, maximum clarity. Dark mode optimized for content focus.

## Differentiation

Dual-tier visual system: distinct accent colors for jobs (warm amber) and products (emerald green) create instant category recognition within a unified interface.

## Color Palette

| Token           | OKLCH            | Role                               |
| --------------- | ---------------- | ---------------------------------- |
| background      | 0.99 0.005 260   | Light primary (light mode)         |
| foreground      | 0.15 0.01 260    | Dark text (light mode)             |
| card            | 1.0 0.0 0        | Card surfaces                      |
| primary         | 0.75 0.15 190    | Cyan/teal CTAs & accents           |
| accent          | 0.75 0.15 190    | Same as primary                    |
| destructive     | 0.55 0.22 25     | Red for destructive actions        |
| muted           | 0.95 0.01 260    | Secondary surfaces, disabled state |
| chart-1         | 0.65 0.22 40     | Jobs category highlights (amber)   |
| chart-2         | 0.72 0.17 70     | Warm accent palette                |
| chart-3         | 0.65 0.18 145    | Products category (emerald)        |

## Typography

- **Display**: Space Grotesk — modern, geometric, confidence-building. Used for all headings, hero text, section titles.
- **Body**: DM Sans — neutral, highly legible. Used for descriptions, form labels, body paragraphs.
- **Mono**: Geist Mono — code blocks and technical listings.
- **Scale**: Hero `text-5xl font-bold tracking-tight`, H2 `text-3xl font-bold`, H3 `text-xl font-semibold`, Body `text-base`, Label `text-sm font-semibold`.

## Elevation & Depth

Subtle shadow hierarchy using single `shadow-sm` layer. Card elevation through 1px border and minimal shadow, not dramatic depth. Dark mode uses card background with 1px border for clarity.

## Structural Zones

| Zone    | Background              | Border              | Notes                                        |
| ------- | ----------------------- | ------------------- | -------------------------------------------- |
| Header  | bg-background           | border-b border-border | Logo + nav with dark mode toggle           |
| Jobs    | bg-background           | —                   | Alternating white cards, amber badges      |
| Products| bg-muted/5              | —                   | Alternating muted cards, emerald badges    |
| Footer  | bg-secondary            | border-t border-border | Minimalist footer with links               |

## Spacing & Rhythm

Section spacing: 2rem (md) to 4rem (lg). Content padding: 1.5rem cards, 1rem micro-spacing. Card gaps: 1.5rem. Consistent rhythm creates visual rest stops in dense marketplace content.

## Component Patterns

- **Buttons**: CTA = cyan primary with rounded corners, hover = darker shade, no secondary colors on primary CTAs.
- **Cards**: 6px border-radius, 1px border, subtle shadow, white/card background alternating between sections.
- **Badges**: Amber for jobs (`.badge-jobs`), emerald for products (`.badge-products`). Inline-flex with padding.
- **Form inputs**: 1px border on light background, focus ring in primary cyan.

## Motion

- **Entrance**: 0.2s fade-in on page load (subtle, no bouncing).
- **Hover**: 0.15s color transition on buttons and interactive elements.
- **Decorative**: None — marketplace focus requires clarity over motion effects.

## Constraints

- No gradients on cards or backgrounds.
- No neon or glow effects.
- Limit animations to functional feedback (hover, active states).
- Dark mode uses category-specific chart colors for badges only, not for general UI.

## Signature Detail

Dual-accent badge system (amber jobs, emerald products) creates immediate visual categorization in a single marketplace interface without requiring separate page navigation.
