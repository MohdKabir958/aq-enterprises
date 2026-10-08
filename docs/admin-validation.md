# Admin and catalogue validation

Validated on 2026-10-08 in the cloud workspace using Next.js 16.4.0, Node.js 24, Chromium and a disposable local PostgreSQL database. No production Neon database, owner account or SMTP credentials were supplied, and no deployment was performed.

## Checks passed

- TypeScript: `npx tsc --noEmit`.
- ESLint: `npm run lint` — zero errors and zero warnings.
- Existing content: `npm run validate:content` — 22 services, 19 locations, 24 service/location pages, 8 projects and 26 blogs.
- Production build: `npm run build`.
- Browser integration suite: all 11 tests in `tests/admin.spec.ts` passed on the final code in 45.5 seconds.
- Diff whitespace: `git diff --check`.
- Runtime dependency audit: zero known vulnerabilities after updating Next.js, Nodemailer and affected runtime dependencies. Compatible dependency fixes were applied during the final review. The full audit still reports five high-severity affected development packages (`braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next`, `eslint-config-next`); its suggested eslint-config-next downgrade to version 14 was not applied to this Next.js 16 project.

The browser suite checks unauthenticated access, cross-origin writes, price validation, duplicate slugs, stale revision conflicts, owner-form product publishing, cart persistence, checkout pre-filled selections, canonical server product snapshots and durable enquiries when SMTP is absent. It also checks draft/deleted products, recreation after deletion, optional blog/service image editing, contact/structured-data changes, internet plan/hero publishing, image hide/restore/reapply, valid image uploads, reference-protected deletion, a product unpublished between page load and submission, responsive layouts and session revocation/login throttling.

All published sitemap routes in the test database were visited at 320px and 1440px with no browser exceptions or horizontal page overflow. Products, populated cart/checkout and authenticated admin were checked at 320, 390, 768, 1024, 1200 and 1440px. These are Chromium viewport checks, not certification of every physical device or browser.

The final code retains the client-side PostgreSQL query timeout without sending an extra server startup parameter to Neon's pooled connection. Production build, TypeScript, lint, content validation and all 11 browser tests passed after the final review fixes.

## Final quality review

- Explicitly enforce Secure login/logout cookies on Vercel, including when Next.js uses an internal request URL.
- Catch failed enquiry/upload deletion requests, restore the controls and retain saved records until deletion succeeds. Browser coverage simulates network failures and verifies a subsequent successful deletion.
- Validate editable content timestamps as dates or ISO timestamps before saving; malformed dates are rejected by the API.
- Index session and rate-limit expiry fields used by cleanup queries.
- Replace unsupported commercial-page uptime, latency, backbone, continuous monitoring and restoration promises with survey/quotation wording, including the structured-data description.
- Scan all 105 changed/new files for common credential patterns before staging; no matches were found. Production credentials were not supplied or committed.

## Deployment checks still required

Follow `docs/admin-and-neon-setup.md`: configure the actual Neon pooled connection, create database tables, set owner credentials and SMTP, then deploy. Test the deployed login, an admin edit, an uploaded image and a checkout enquiry; confirm the notification arrives in the intended inbox. Hosted video URLs and actual Vercel/Neon quotas must be checked on the chosen accounts.

Production catalogue entries remain empty until the owner adds actual products and prices. Fixtures used by automated tests are isolated to the disposable test database. Repository photos were not replaced.
