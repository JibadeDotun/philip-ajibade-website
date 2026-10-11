# Home, About and Contact review

Reviewed locally on 11 October 2026 against the WCAG 2.2 quick reference:
https://www.w3.org/WAI/WCAG22/quickref/

## Brand and consistency

All three pages share Hedvig Letters Serif headings, system sans body copy, the same colour tokens, system-selected light/dark theme, identity and menu, and Manchester footer. Home prioritises exploration, About uses editorial sections, Contact offers one email action. Mathematical details serve navigation and connection rather than adding decorative complexity. The portfolio destinations remain intentional placeholders.

## Verified

- Each page has one main landmark, one h1, a distinct page title and English document language.
- All three pages fit 320px mobile and 1440px desktop viewports without horizontal overflow.
- At 320px, the combined 200% root text-size and WCAG text-spacing simulation (1.5 line height, .12em letter spacing, .16em word spacing, 2em paragraph spacing) fits after the About reflow correction. Temporary overrides were removed. This is a text-resize simulation, not native browser zoom.
- Mobile main content and footer do not overlap. Primary main links have at least 44px height.
- Skip link sends focus to main content. The native menu opens with focus on Close, keeps keyboard focus inside the dialog during the tested backward tab, closes with Escape and restores focus to Open menu.
- The Contact email target is mailto:hello@philipajibade.com. No email was sent.
- Live-update pause/resume toggles pressed state and label; effects clean up timers and fetches when paused (source review).
- Normal text colour token contrast against page backgrounds: light primary 19.42:1, secondary 8.64:1, accent 7.78:1; dark primary 16.68:1, secondary 9.85:1, accent 11.62:1. All exceed the enhanced normal-text 7:1 threshold. Decorative divider contrast is not included in this claim.
- Source review confirms visible focus styles, reduced-motion alternatives, touch-specific homepage behaviour, decorative geometry hidden from assistive technology, labelled reading progress and headings, and weather fetch timeout/error fallback.
- ESLint and TypeScript checks pass.

## Corrections made

- Added a shared Skip to content link and focusable main targets, including placeholder routes.
- Disabled sticky reading-guide positioning on small or short screens so it cannot cover reading content or focus.
- About navigation uses two columns on mobile; long text can wrap under enlarged text/spacing.
- Weather loading and failure states now have matching accessible names.

## Remaining verification

This review does not establish full WCAG AA or AAA conformance. Real VoiceOver/Safari and NVDA/Chrome sessions, native browser zoom at 200% and 400%, actual touch-device interaction, forced-colour mode, visual dark-mode verification and a complete assistive-technology audit remain outstanding. The mailto link depends on the visitor's configured email app; inbox deliverability was not tested. Weather depends on Open-Meteo; its fallback is implemented but a simulated network failure was not tested in this run.

The production build was attempted but did not complete in this environment and was stopped. No production-build success is claimed. Verify the deployment build before publishing. No changes were pushed during this review.
