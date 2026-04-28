# NETSO Website

Production marketing site and intake funnel for NETSO, built with Vite, React, and Supabase.

## Stack

- `Vite` + `React` + `TypeScript`
- `Tailwind CSS`
- `Framer Motion` + `GSAP`
- `Supabase` for assessment session intake

## Local Setup

1. Install dependencies:
   - `npm install`
2. Create a local env file from `.env.example`.
3. Set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SITE_URL` (optional override, defaults to `https://netsoenergy.com`)
   - `VITE_WHATSAPP_NUMBER` (optional override, defaults to the public NETSO intake number)
4. Start the app:
   - `npm run dev`

## Release Checks

Run the full release gate before deployment:

```bash
npm run verify:release
```

This runs:

- public config verification
- production build
- lint
- tests
- SEO build verification
- browser smoke tests against the built `dist/` output
- Supabase function type checks

## Production Notes

- The site prerenders route-specific HTML into `dist/` during build.
- Canonical and social metadata are driven by `VITE_SITE_URL`.
- Current production domain default is `https://netsoenergy.com`.
- Assessment intake depends on Supabase env vars and the WhatsApp number env var being present.

## Vercel Deployment

Recommended environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL=https://netsoenergy.com`
- `VITE_WHATSAPP_NUMBER`

Build settings:

- Build command: `npm run build`
- Output directory: `dist`
- Runtime preview / smoke server: `npm run preview:dist`

After deploy, attach the custom domain `netsoenergy.com` in Vercel project settings and point the registrar DNS records to the values Vercel provides.

Vercel is the authoritative deployment target for this repo. Any legacy Netlify-specific configuration should be considered removed or obsolete.
