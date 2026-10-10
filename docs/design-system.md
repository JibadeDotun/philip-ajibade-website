# Personal website — design foundation

Status: initial foundation. Portfolio content and final brand typography remain to be supplied.

## Direction

An editorial portfolio with expressive serif headings, quiet sans-serif supporting text, generous space, and work as the visual focus. Teslim Alabi’s website is a reference for hierarchy and pacing; the identity and content will be original.

## Structure

The homepage introduces the person and offers three equally prominent entrances:

- Product and Service Design: project index and case studies built around context, process, decisions, and outcomes.
- Art Direction: project index and visual stories built around concepts, identities, campaigns, and finished work.
- Street Photography: gallery and photo viewer built around images, with optional captions and series context.

Current navigation: the homepage’s three section links and an “All sections” return link on each section. Add navigation as new content is designed.

## Appearance

Follow `prefers-color-scheme` automatically, including changes while the site is open. No manual override in the initial foundation. Declare `color-scheme: light dark` so native controls match.

| Semantic token | Light | Dark |
| --- | --- | --- |
| Background | #F7F6F2 | #111210 |
| Surface | #EEEDE8 | #1D1F1B |
| Primary text | #20211F | #F1F2EB |
| Secondary text | #62645D | #B0B3A7 |
| Decorative border | #D4D5CD | #41453A |
| Accent/focus | #345444 | #B4D3BC |
| Text on accent | #FFFFFF | #15251A |

Use semantic tokens throughout components. Borders are decorative separators, not the sole indicator of interactive controls. Use the accent for focus and selected states, with text or shape also communicating state. Photography and project artwork keep their original colours in both themes; never invert images.

## Typography

Use Hedvig Letters Serif for display headings and the system sans-serif stack for supporting text. Next.js loads the display font through `next/font`.

| Role | Size | Treatment |
| --- | --- | --- |
| Hero | Fluid 44–96px | Serif, regular, line-height 1.08 |
| Section title | Fluid 32–64px | Serif, regular, line-height 1.15 |
| Lead | Fluid 18–24px | Sans-serif |
| Body | 16px | Sans-serif, line-height 1.6 |
| Caption/metadata | 14px | Sans-serif |

Keep paragraphs within a 42rem reading column. Use descriptive headings, sentence case, and short labels. Avoid wide tracking in body copy.

## Layout and spacing

Base spacing unit: 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Page gutters grow from 20px to 64px; content caps at 1440px. Section gaps grow from 64px to 128px.

Use a flexible grid: one column on phones, two for suitable tablet layouts, and up to twelve layout tracks on wide screens. Choose breakpoints when content needs them, beginning around 48rem and 75rem. Preserve DOM reading order when layouts change. Avoid horizontal overflow at 320px and support browser zoom.

## Shared component contracts

- Site header and footer: consistent identity, navigation order, current-page state, and contact destination.
- Section introduction: optional eyebrow, one heading, concise summary.
- Project preview: artwork, title, discipline, optional year; entire primary link has an accessible name. Avoid nested links.
- Image and caption: retain intrinsic dimensions to prevent layout shifts; alt text describes meaningful images, decorative images use empty alt text.
- Link/button: clear label, visible focus, at least 44px target where practical; hover has an equivalent focus state.
- Gallery viewer: close button, previous/next controls, keyboard navigation, focus containment, Escape to close, and focus return to the initiating image.

Components share type, space, colour, and interaction rules. Their composition varies by discipline: UI/UX supports narrative reading, art/design supports large visual sequences, and photography preserves image proportions with minimal interface.

## Image rules

Project previews may use a consistent crop only when the artwork tolerates it. Full project images and photographs preserve their original aspect ratios. Use responsive image sizes, lazy-load below-the-fold images, and reserve image space. Never add invented work, metrics, testimonials, or client names.

## Motion

Use short opacity or transform transitions: 160ms for controls, 280ms for larger changes. Respect reduced-motion preferences. Avoid autoplay galleries, scroll hijacking, and animation that delays access to content. Decorative effects should be optional and subordinate to work.

## Validation before building pages

Check both system themes, live theme changes, keyboard navigation, visible focus, reduced motion, text contrast, image integrity, and small-screen/zoom behaviour. Target WCAG AA: at least 4.5:1 for normal text and 3:1 for large text and essential interface indicators.

## Implementation source

`../foundation/tokens.css` contains the initial shared tokens and base styles. Future page and component styles should consume these variables rather than duplicate raw values.

## Remaining brand decisions

Display name and introduction; final typefaces; logo or wordmark; project and photo assets; contact/social destinations. These do not prevent establishing the shared system, but should be settled before populated portfolio pages are published.
