---
name: Premium Monochrome
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfe4'
  on-secondary-container: '#626267'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1d'
  on-tertiary-container: '#838486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c7c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#e2e2e4'
  tertiary-fixed-dim: '#c6c6c8'
  on-tertiary-fixed: '#1a1c1d'
  on-tertiary-fixed-variant: '#454749'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is built on a foundation of **Modern Minimalism** with a **Corporate/Premium** finish. It draws inspiration from high-end hardware interfaces, prioritizing clarity, generous whitespace, and a sophisticated "quiet" luxury. The target audience values precision, reliability, and an unobtrusive user experience.

The aesthetic is characterized by:
- **Optical Balance:** Extreme attention to alignment and visual weight.
- **Intentional Negative Space:** Using emptiness to frame content and reduce cognitive load.
- **Subtle Motion:** Fluid transitions that mimic physical inertia.

## Colors
The palette is strictly curated to evoke a premium, monochromatic feel. 

- **Primary (#000000):** Used for high-emphasis actions, primary buttons, and critical active states. It represents authority and precision.
- **Secondary (#6E6E73):** A muted slate used for secondary text and icons, providing enough contrast for legibility without competing with the primary black.
- **Tertiary (#F5F5F7):** A "soft white" used for large background areas and container fills to reduce eye strain compared to pure hex white.
- **Neutral (#1D1D1F):** The "Eerie Black" used for body text and headings to ensure a softer, more sophisticated look than pure black on white.

## Typography
This design system utilizes **Inter** for its systematic, utilitarian, and neutral qualities. The scale is designed for high legibility and a structured information hierarchy.

- **Headlines:** Use tighter letter spacing and heavier weights to anchor the page.
- **Body:** Set with generous line heights to ensure readability in data-dense environments.
- **Labels:** Used for small metadata or all-caps utility text, featuring slight tracking increases for clarity at small sizes.

## Layout & Spacing
The system employs a **Fixed Grid** philosophy for desktop to maintain a premium, editorial feel, while transitioning to a **Fluid Grid** for mobile devices.

- **Grid:** 12-column structure for desktop with 24px gutters.
- **Rhythm:** All spacing is derived from an 8px base unit to ensure vertical consistency.
- **Breakpoints:** 
  - Mobile: < 768px (4 columns, 16px margins)
  - Tablet: 768px - 1024px (8 columns, 24px margins)
  - Desktop: > 1024px (12 columns, fixed 1200px max-width)

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. This maintains the flat, sleek aesthetic associated with premium modern UI.

- **Level 0 (Base):** Background color (`#F5F5F7`).
- **Level 1 (Card/Container):** Pure White (`#FFFFFF`) with a 1px subtle border (`#E5E5E7`).
- **Level 2 (Floating/Overlay):** Pure White with a very soft, highly diffused ambient shadow (0px 4px 20px rgba(0,0,0,0.04)).
- **Interactions:** Hover states should utilize a subtle darken or lighten of the surface, never a heavy shadow increase.

## Shapes
The shape language is **Rounded**, reflecting a friendly yet professional demeanor. 

- **Components:** Standard buttons and input fields use a `0.5rem` (8px) corner radius.
- **Large Containers:** Cards and modals use `1rem` (16px) to create a distinct visual enclosure.
- **Consistency:** Avoid mixing sharp corners with rounded elements to preserve the cohesive, premium feel.

## Components
- **Buttons:** 
  - *Primary:* Solid black background (`#000000`) with pure white text. No border.
  - *Secondary:* Transparent background with a 1px border (`#D2D2D7`) and black text.
- **Navigation:** Active states are indicated by a solid black underline (2px) or a high-contrast black label, while inactive states remain secondary grey (`#6E6E73`).
- **Input Fields:** Use a white background with a subtle border. On focus, the border transitions to a 1.5px solid black stroke.
- **Chips:** Light grey background (`#E8E8ED`) with medium-weight black text; used for filtering or categorization.
- **Cards:** White surfaces with a `1rem` radius. Use internal padding of `24px` (md) to maintain the minimalist feel.
- **Checkboxes/Radios:** When active, these are filled with solid black (`#000000`) with a white inner glyph.