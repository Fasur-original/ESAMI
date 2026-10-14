# ESAMI Audit & Professional Services

Company website. React + TypeScript + Vite, served in production by a small
dependency-free Node server (`server.mjs`).

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — type-check and build to `dist/`
- `pnpm start` — serve `dist/` in production (uses `PORT`, default 10000)
- `pnpm lint` — run ESLint
- `pnpm preview` — Vite's preview server

This project uses pnpm 11 (pinned in `package.json`). If your global pnpm is a
different major version, run it as `npx pnpm@11 <command>`.

## Deploying to Render

The repo includes a Blueprint (`render.yaml`) for a Node **web service**.

1. Push this repository to GitHub or GitLab.
2. In Render: **New → Blueprint**, pick the repository. Render reads
   `render.yaml` and creates the `esami-website` service.

Or create it by hand (**New → Web Service**) with:

| Setting       | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| Runtime       | Node                                                               |
| Build command | `corepack enable && pnpm install --frozen-lockfile && pnpm build`  |
| Start command | `pnpm start`                                                       |
| Health check  | `/healthz`                                                         |
| Env var       | `NODE_VERSION=22.17.0`                                             |

The server listens on Render's `PORT`, caches hashed files in `/assets` for a
year, compresses text responses, sends security headers, and returns
`index.html` for client-side routes.

## Contact forms

"Book a consultation" and the Contact section build a `mailto:` link, so the
visitor's own email app opens with the message filled in. No backend is
involved. Run `node scripts/check-forms.mjs <url>` to smoke-test them.
