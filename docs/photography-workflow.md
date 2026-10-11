# Photography gallery foundation

The first release is one curated selected-work gallery. Real photographs have not been supplied yet; the empty state is deliberate. Collections and the content-management editor are not connected yet.

## Interim content workflow

1. Keep original photographs backed up outside the repository.
2. Export edited sRGB JPEG web copies, roughly 2000–2400px on the long edge as a starting point. Check sharpness and file size; do not upscale small originals. Do not upload RAW files or unnecessary GPS metadata.
3. Place web copies in public/photography, using descriptive filenames.
4. Add records to src/data/photography.ts with dimensions, title, concise visual alt description, location, year, display order and published status. The src should start with /photography/. Full-width is optional for occasional landscape images. Draft photographs remain hidden.
5. Preview desktop and mobile, check sequencing and captions, then commit and deploy.

Example record (replace values with real image metadata):

```ts
{
  id: "manchester-001",
  src: "/photography/manchester-001.jpg",
  width: 2400,
  height: 1600,
  title: "Photograph title",
  alt: "A concise description of what is visible in this photograph.",
  location: "Manchester, UK",
  year: 2026,
  order: 1,
  published: true,
  fullWidth: true,
}
```

## Planned editor

After the first selection establishes the layout, connect a CMS to the same photograph fields. Intended workflow: upload, describe, arrange, preview, publish. CMS account setup, image storage, credentials, editorial preview and publishing integration remain pending; no upload interface is claimed in this release.

## Behaviour and verification

Two columns on desktop, one on mobile, original aspect ratios, optional wide entries, image captions, responsive Next.js image sizing and lazy loading below the first image. Each photograph links directly to its image as a native fallback; capable browsers enhance it with a native modal viewer. Viewer has explicit close, bounded previous/next controls, arrow-key navigation, Escape and focus restoration.

Temporary geometric test images verified portrait/landscape layout, wide entries, 320px reflow, modal navigation, disabled end controls and focus restoration. Test assets and records were removed. ESLint and TypeScript pass. Real photographic compression/quality, remote CMS delivery and physical iPhone 7 rendering still require verification after images are supplied. No full screen-reader conformance or production-build success is claimed.

## Editor integration prepared

A standalone Studio now lives in `studio/`; see its README for setup. The website's server loader reads Sanity's published perspective, excludes malformed/draft/version records defensively, validates the configured image path, and caches requests for 60 seconds. Project ID and dataset configuration, Studio package installation/version lock, deployment, and real upload/publish tests remain pending. Collection navigation and draft website preview are not included yet.
