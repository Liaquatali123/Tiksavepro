# TikSave Pro

A creator backup and editorial hub built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, and a secure server-side media proxy. The product is positioned for personal archiving of public creator work you own or have permission to save.

## Requirements

- Node.js 18.17 or later (Node 20 LTS recommended)
- A RapidAPI key for `tiktok-video-no-watermark2.p.rapidapi.com`
- Optional Resend API key for contact-form delivery

## Local setup

```bash
cp .env.example .env.local
# Set RAPIDAPI_KEY and NEXT_PUBLIC_SITE_URL in .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. Without a valid RapidAPI key, page rendering still works and the fetch route returns a friendly configuration message. The contact form sends mail only when `RESEND_API_KEY`, `CONTACT_EMAIL`, and a valid `CONTACT_FROM_EMAIL` are configured; otherwise it displays an email fallback.

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `RAPIDAPI_KEY` | For fetching | Server-side RapidAPI credential; never expose it with a `NEXT_PUBLIC_` prefix. |
| `RAPIDAPI_HOST` | Recommended | RapidAPI host; defaults to `tiktok-video-no-watermark2.p.rapidapi.com`. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical HTTPS origin used in metadata, sitemap, robots, and structured data. |
| `RESEND_API_KEY` | Optional | Enables contact-form email delivery through Resend. |
| `CONTACT_EMAIL` | Production | Actual support and privacy contact inbox. |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender configured with the email provider. |

## Routes and features

- `/` — interactive video fetch, responsive creator archive hero, 3-step guide, six feature cards, eight-question FAQ with JSON-LD, and labeled reserved ad placements.
- `/blog` and `/blog/[slug]` — eight original static articles, each written as long-form editorial content and rendered into statically generated pages.
- `/about`, `/contact`, `/privacy-policy`, `/terms`, and `/dmca` — original informational and legal pages.
- `/api/fetch-video` — validates TikTok post URLs and calls RapidAPI server-side.
- `/api/download` — streams a media response from an explicit TikTok CDN host allowlist, validates each redirect, filters media types, limits files to 300 MB, and sanitizes download names.
- `/api/contact` — validates contact form submissions and sends mail through Resend when configured.
- `/sitemap.xml` and `/robots.txt` — generated from the page and article routes.

## Deployment and launch checklist

1. Deploy to a Node-compatible host and set the production environment variables. Use HTTPS and keep provider secrets server-only.
2. Configure a distributed edge rate limiter for `/api/fetch-video`, `/api/download`, and `/api/contact`. The included in-memory limiter is best-effort per process and is not a substitute for a shared limiter on multi-instance/serverless deployments. Configure the trusted proxy so forwarded client IP headers cannot be spoofed.
3. Confirm the RapidAPI plan, data handling, response schema, rate limits, and terms. The provider receives the post URL; its own logging and retention are not controlled by this app.
4. Set a real support inbox and verified mail sender. Have counsel add the operating entity, service address, governing law, and any required registered copyright-agent details.
5. Add a consent-management experience before activating analytics or personalized advertising. The ad spaces are labeled reservations only; no AdSense script or publisher account is included. AdSense approval and indexing are not guaranteed by code or page content.
6. Verify the live canonical domain, sitemap, robots rules, HTTPS redirects, accessibility, and external provider behavior. Submit the sitemap in Google Search Console after the site is publicly crawlable.
7. Review the privacy, terms, and copyright policies against the actual vendors, jurisdictions, retention behavior, and contact details before launch.

## Framework security gate

This build stays on Next.js 14 as requested and pins the newest 14.2.x release available during generation. The current production dependency audit reports high/critical advisories for Next.js 14 and a nested PostCSS dependency; the registry identifies a fix only in a newer major release. Do not deploy this exact framework pin to a public production site until you approve a Next.js major upgrade, update the lockfile, and rerun type, lint, build, and integration checks. The request for Next.js 14 conflicts with a clean current security audit.

## Security notes

The API validates protocols and hostnames, rejects arbitrary download URLs, revalidates redirects, caps request sizes and response bytes, sanitizes filenames, applies no-store headers, and never returns the RapidAPI key to the browser. The CDN allowlist is intentionally explicit; update it only after verifying a provider’s legitimate media host. The contact route requires server-side Resend configuration and uses a per-process abuse limit.

## Build checks

```bash
npm run typecheck
npm run lint
npm run build
```
