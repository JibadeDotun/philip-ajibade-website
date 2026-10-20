# Case-study access

Project cards remain public. Case-study pages check access on the server before rendering their content. The registered projects are `cws-cares` and `goldwise`; new case-study pages must use the same check and be added to the registry in `src/lib/project-access.ts`.

Set `PROJECT_PASSWORD` to your chosen strong shared password in the root `.env.local` for local development. Restart `npm run dev` after changing it. Set the same variable in Vercel's production environment and redeploy before publishing. Never prefix it with `NEXT_PUBLIC_`, commit the password, or put it in a URL.

No password is configured automatically. Without one, the gate stays locked. Successful access uses an HTTP-only, SameSite=Lax cookie scoped to the project, valid for eight hours, with Secure enabled in production. The token is signed using the password; changing the password invalidates existing access. Case-study routes are marked noindex.

This gate protects rendered case-study content, not files placed in `public/` or publicly accessible CMS assets. Future confidential media needs an authenticated delivery path too.
