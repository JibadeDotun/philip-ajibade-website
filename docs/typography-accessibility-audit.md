# Typography and accessibility audit — 11 October 2026

Scope: all six current routes reviewed in source: homepage, Product and Service Design, Art Direction, Photography, About, Contact; shared header, menu, footer, and hover previews. Browser checks on homepage and product/service foundation, menu keyboard behavior, 1440×1024 and 320×568 target measurements. Previous alignment verification also covered 390×844. This is a targeted audit, not a complete WCAG conformance evaluation. No visual styles changed during this audit.

## Assessment

The editorial direction is coherent: Hedvig Letters Serif for display/identity, system sans-serif for supporting copy, regular weight, restrained accent, generous space. It is a usable initial foundation, but not yet a complete reusable typography system. Values are duplicated across modules rather than represented by semantic tokens. Supporting copy is smaller than advisable for comfortable reading. No AA or AAA conformance claim is justified: lower-level issues also need addressing.

## Current type inventory

| Role | Typeface | Size | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Homepage/menu display | Hedvig Letters Serif | desktop 32–64px; mobile 30–36px | 1.3; mobile 1.35 | −0.015em |
| Section H1 | Hedvig Letters Serif | 32–64px | 1.25 | default |
| Name | Hedvig Letters Serif | 19–23px | 1.3 | default |
| Job title | System sans | 11–13px | 1.4 | default |
| Section body/return link | System sans | 16px | 1.5 | default |
| Service description | System sans | 13–16px | 1.5 | default |
| Explore prompt | System sans | 13px | 1.5 inherited | default |
| Footer location/time/weather | System sans | 13px | 1.5 | default |
| Footer label | System sans | 12px | 1.5 | default |

Weight is 400 throughout. The clock uses tabular numerals. The serif does not need replacing. Supporting text can remain visually quiet through colour, spacing and weight while increasing size.

Recommended tokens: display 2–4rem (mobile 1.875–2.25rem), identity 1.1875–1.4375rem, body 1rem, secondary/action 0.875rem, metadata 0.875rem. Use shared tokens for family, size, line height, tracking and colour. Use rem-based bounds plus fluid viewport values, then explicitly verify text resizing; using rem alone does not establish compliance. Align section H1 and menu/homepage display roles deliberately. Keep body line height 1.5 and concise lines. These are design recommendations, not WCAG minimum font-size rules.

## Contrast calculations

Calculated from declared sRGB text/background values, blending opacity over the plain background. Not pixel sampling. The glow and translucent menu must also be checked at their worst-case compositions.

| Text | Light | Dark | AAA normal text requirement 7:1 |
| --- | --- | --- | --- |
| Primary | 19.42:1 | 16.68:1 | passes base colours |
| Accent/prompt | 7.78:1 | 11.62:1 | passes base colours |
| Job title at 65% opacity | 6.78:1 | 7.45:1 | light fails |
| Footer label at 60% opacity | 5.61:1 | 6.50:1 | both fail |

Large text has a 4.5:1 AAA threshold. Small supporting text does not qualify for that exception. All listed base pairs exceed AA's normal-text contrast threshold; this does not mean the site meets AA overall.

## Findings, in priority order

1. **Automatic updates — SC 2.2.2, A:** Clock updates automatically and weather refreshes every ten minutes. No pause, hide or frequency control is offered. These portfolio details are not essential to an activity. Provide one quiet control for the live footer, or make updates user initiated. Reduced-motion settings alone do not resolve auto-updating information.
2. **Hover content — SC 1.4.13, AA:** The desktop preview extends outside the link's resting hit box and has pointer-events:none. A pointer cannot reliably move onto that content and keep it visible. Make the preview hoverable and persistent while interacting with it; support dismissal when the criterion requires it. Escape dismissal is currently absent. Touch users navigate directly, with no discoverable preview; that is also a usability gap, distinct from a confirmed WCAG failure.
3. **Contrast — SC 1.4.6, AAA:** Job subtitle in light mode and footer label in both modes miss 7:1. Replace opacity styling with semantic secondary colours validated against the background and glow.
4. **Target size — SC 2.5.5, AAA:** At 320×568, Art Direction and Photography each measure 272×40.5 CSS px. Weather attribution is approximately 94.5×19.5px. These standalone targets do not meet 44×44px. Menu buttons are 48×48px and meet the size requirement. Keep lettering small if desired but enlarge hit areas. Recheck the menu's individual links on mobile.
5. **Resize/text-spacing risks — SC 1.4.4 and 1.4.12, AA:** Small pixel-sized metadata, viewport-based display sizing, absolutely positioned desktop previews, and mobile preview max-height:120px require testing with 200% text enlargement and user spacing overrides. Clipping is a risk, not a confirmed result from this audit. Test 1.5× line height, 2× paragraph spacing, 0.12em letter spacing and 0.16em word spacing. Standard 320px rendering is not a substitute for 400% browser zoom testing.

## Positive evidence

- Display contrast has ample margin on the base palettes.
- Real text, semantic links, named navigation, one H1 per page, named menu buttons and named sun/moon SVGs.
- Menu opens with Close focused. Escape closes it and returns focus to Open menu in a browser check. Full Tab-cycle containment remains to be tested.
- Focus outlines are 2px with high-contrast accent colours. AAA focus appearance/obscuration still needs checking for all states and geometries.
- Reduced-motion media queries disable entrance/menu/link transitions, and the cursor-following animation respects that preference.
- At 320px, homepage has no horizontal overflow. Desktop title group measures centered in both axes.
- Shared placeholder pages use a concise H1/body/return-link hierarchy; they do not yet exercise long-form typography.

## Remaining evaluation

Full screen-reader testing (VoiceOver and NVDA), 200% text resizing, 400% zoom, text-spacing overrides, forced colours, light/dark rendered contrast including glow/menu, touch behavior, keyboard traversal across every route, expanded menu reflow, accessible-name review, and all applicable AAA criteria. Static/source review and lint cannot certify WCAG compliance. Retest when case studies, galleries and contact content are added.

## Sources

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Enhanced contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html)
- [Enhanced target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)
- [Hover/focus content](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- [Pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [Text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [Visual presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html)
- [GOV.UK type scale](https://design-system.service.gov.uk/styles/type-scale/)

GOV.UK is a useful established-system benchmark for explicit sizes and line heights, not a visual template or a universal industry type scale.

## Remediation follow-up

Implemented shared rem-based type tokens; 16px base descriptions and 14px metadata; stronger secondary colours; 44px minimum targets; flowing hover previews, Escape dismissal and visible touch descriptions; pause/resume clock and weather updates. Browser verified pause control, preview dismissal and 320px target heights. Temporary text-spacing override showed no overflow or header/footer collision; 200% root-font simulation exposed a grid min-content overflow which was corrected and rechecked. This simulation is not a substitute for actual browser zoom or screen-reader testing. Original findings above document the pre-remediation state.
