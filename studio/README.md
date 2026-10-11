# Photography editor setup

This Studio source is prepared but is not installed, connected or deployed yet.

## Connect the project

Create or choose a project at https://www.sanity.io/manage and a public dataset named `production`. A public dataset is used for published portfolio content; drafts are excluded by the website's published perspective. No API token is needed for the public gallery.

1. Copy `studio/.env.example` to `studio/.env.local` and enter the project ID.
2. Copy the website root `.env.example` to `.env.local` and enter the same project ID and dataset. Preserve any existing environment settings rather than overwriting them.
3. Add `SANITY_PROJECT_ID` and `SANITY_DATASET` to the website's deployment environment. Redeploy so the allowed image-host path is updated.

## Install and run

From the website folder, in a free VS Code terminal:

```bash
npm run studio:install
npm run studio:dev
```

Sign in to Sanity when prompted. The Studio CLI reports its local address (normally http://localhost:3333). Installation resolves the `latest` Sanity bootstrap dependency; commit the generated Studio package lock and pin the resolved Sanity version before deploying the editor. Packages could not be installed from the agent terminal because npm DNS/network access is unavailable.

Before deploying the editor, run `npm run build` in this folder and verify the upload/publish workflow against the actual project. `npm run deploy` then lets you choose a Sanity Studio hostname; that step has not been performed.

## Use the editor

Create a Photograph, upload a JPEG/PNG/WebP web copy, complete title, description, location and year, and assign a display-order number. Save as a draft while editing. Publish with Show in gallery enabled to make it visible. Unpublish or disable Show in gallery to remove it. Full-width is intended for occasional landscape images. Collection is reserved for future series pages.

The website reads published documents only, with a 60-second server cache. Publishing should appear on a subsequent page request after that cache expires; this is not real-time push. No website preview of drafts is implemented yet. Studio provides image/document previews only.

The website keeps working without project configuration, using the local selection. On a CMS request failure it falls back to that selection and logs a warning. No real assets, uploads, authentication or account changes have been performed.
