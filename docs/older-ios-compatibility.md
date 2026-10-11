# Older iOS compatibility correction

The iPhone 7 report showed a nonresponsive JavaScript menu, an uninitialised clock and persistent loading weather, plus footer overlap. These observations suggest client startup failure, but the precise runtime exception is not known without device console access.

Next.js 16 and Tailwind 4 default to Safari 16.4+:
- https://nextjs.org/docs/architecture/supported-browsers
- https://tailwindcss.com/docs/compatibility

Changes:
- Added custom Safari/iOS Safari 15+ Browserslist build targets. This broadens compilation targets but does not establish full framework support for every older browser.
- Removed the unused Tailwind stylesheet import and PostCSS plugin. All site styles already use CSS modules and custom global CSS.
- Added vh fallbacks before svh/dvh, and an opaque background fallback for the enhanced menu.
- Menu trigger is now a native details/summary disclosure with ordinary anchor links. Successful hydration and showModal support enhance it to the existing animated native dialog; without scripts it still opens navigation.
- Without client initialisation, the footer hides the uninitialised time and pause control, and presents a working Manchester weather link instead of permanent loading text.

Verification: ESLint and TypeScript pass. Tested enhanced menu open/Escape, and a temporary rendered HTML fixture containing zero script elements: native disclosure opened and its About link navigated. Fixture removed. At 375x667, Art Direction fits horizontally and its back link ends before the footer begins. This is not testing on physical iOS 15 Safari. A fresh deployment and actual iPhone 7 check are required, including live time/weather, native fallback navigation, and the other routes. Production build remains to be confirmed by deployment; build target changes apply after rebuild.
