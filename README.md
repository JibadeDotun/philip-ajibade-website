# Philip Ajibade website

A fresh portfolio foundation built with Next.js, React, and TypeScript.

The homepage links to Product and Service Design, Art Direction, and Photography. Each section has a clean placeholder, ready for new content. Appearance follows the viewer’s system light or dark preference. The display typeface is Hedvig Letters Serif; supporting text uses the system sans-serif font.

## Local development

Run `npm ci`, then `npm run dev`. Open http://localhost:3000.

Run `npm run lint` for lint checks and `npx tsc --noEmit` for TypeScript checks. Run `npm run build` for a production build.

## Source

- `src/app/page.tsx`: homepage
- `src/components/section-foundation.tsx`: shared section layout
- `src/app/gateway.module.css`: homepage and section styles
- `src/app/globals.css`: reset and system theme foundation
- `docs/design-system.md`: design guide

Pushing to GitHub’s `main` branch triggers the connected Vercel deployment for philipajibade.com.
