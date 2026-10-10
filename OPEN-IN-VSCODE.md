# Philip Ajibade website

This folder contains the complete Next.js website and separate Sanity Studio, including the homepage update merged in GitHub PR #1.

Open this folder using VS Code → File → Open Folder.

Run `npm ci`, then `npm run dev` from this folder. The local preview is http://localhost:3000.

Website routes live in `src/app`; the homepage styles are in `src/app/gateway.module.css`. The design guide is in `docs/design-system.md`.

The Sanity Studio has its own package.json in `sanity-studio/philip-ajibade-website`; install and run it separately when needed.

GitHub: https://github.com/JibadeDotun/philip-ajibade-website
Live domain: https://philipajibade.com

The local `main` branch tracks `origin/main` and shares GitHub’s commit history. The original downloaded snapshot is preserved on `codex/local-foundation`.

To publish changes, commit them and run `git push origin main`. Pushing to `main` triggers the connected Vercel deployment. Your VS Code terminal has confirmed GitHub network access.
